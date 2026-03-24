import { createContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
} from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { SIGNUP_BONUS, REVISION_COSTS } from '../data/constants'
import { SYNC_TYPES } from '../data/hubspotConfig'
import {
  buildContactPayload,
  buildCompanyPayload,
  buildDealPayload,
  buildDealUpdatePayload,
  createSyncEvent,
} from '../services/hubspot'

export const AuthContext = createContext(null)

// localStorage key for HubSpot sync queue only (harmless UI data)
const HUBSPOT_SYNC_KEY = 'dhandabuzz_hubspot_sync'

function loadHubspotSync() {
  try {
    const raw = localStorage.getItem(HUBSPOT_SYNC_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(undefined) // undefined = initializing
  const [userProfile, setUserProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [transactions, setTransactions] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [hubspotSync, setHubspotSync] = useState(loadHubspotSync)

  // Persist HubSpot sync queue to localStorage
  useEffect(() => {
    localStorage.setItem(HUBSPOT_SYNC_KEY, JSON.stringify(hubspotSync))
  }, [hubspotSync])

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser)
      if (!fbUser) {
        setUserProfile(null)
        setOrders([])
        setTransactions([])
      }
    })
    return unsubscribe
  }, [])

  // Listen to user profile (real-time for balance updates)
  useEffect(() => {
    if (!firebaseUser) return
    const unsubProfile = onSnapshot(doc(db, 'users', firebaseUser.uid), (snap) => {
      if (snap.exists()) {
        const data = snap.data()
        setUserProfile({
          uid: firebaseUser.uid,
          ...data,
          // map ownerName -> name for backward compatibility with UI
          name: data.ownerName || data.name || '',
        })
      }
    })
    return unsubProfile
  }, [firebaseUser])

  const isAdmin = userProfile?.role === 'admin'

  // Listen to current user's orders
  useEffect(() => {
    if (!firebaseUser || isAdmin) return
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', firebaseUser.uid),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((d) => ({ ...d.data(), id: d.id })))
    })
    return unsub
  }, [firebaseUser, isAdmin])

  // Listen to current user's recharge requests
  useEffect(() => {
    if (!firebaseUser || isAdmin) return
    const q = query(
      collection(db, 'rechargeRequests'),
      where('userId', '==', firebaseUser.uid),
      orderBy('submittedAt', 'desc')
    )
    const unsub = onSnapshot(q, (snapshot) => {
      setTransactions(snapshot.docs.map((d) => ({ ...d.data(), docId: d.id })))
    })
    return unsub
  }, [firebaseUser, isAdmin])

  // Admin: listen to all data
  useEffect(() => {
    if (!isAdmin) return
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      setAllUsers(
        snap.docs.map((d) => {
          const data = d.data()
          return { uid: d.id, ...data, name: data.ownerName || data.name || '' }
        })
      )
    })
    const qOrders = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const unsubOrders = onSnapshot(qOrders, (snap) => {
      setAllOrders(snap.docs.map((d) => ({ ...d.data(), id: d.id })))
    })
    const qRecharges = query(collection(db, 'rechargeRequests'), orderBy('submittedAt', 'desc'))
    const unsubRecharges = onSnapshot(qRecharges, (snap) => {
      setAllTransactions(snap.docs.map((d) => ({ ...d.data(), docId: d.id })))
    })
    return () => {
      unsubUsers()
      unsubOrders()
      unsubRecharges()
    }
  }, [isAdmin])

  // ── AUTH ──────────────────────────────────────────────────────────────────

  const register = async ({ name, businessName, email, phone, password }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const uid = cred.user.uid
      await setDoc(doc(db, 'users', uid), {
        uid,
        businessName,
        ownerName: name,
        email,
        phone,
        role: 'client',
        maalBalance: SIGNUP_BONUS,
        createdAt: serverTimestamp(),
        isActive: true,
      })
      // Create signup bonus recharge record
      await addDoc(collection(db, 'rechargeRequests'), {
        id: 'TXN-BONUS',
        userId: uid,
        businessName,
        amountBDT: 0,
        maalAmount: SIGNUP_BONUS,
        trxId: 'SIGNUP_BONUS',
        paymentMethod: 'bonus',
        status: 'Approved',
        type: 'bonus',
        amount: SIGNUP_BONUS,
        bdt: 0,
        description: 'সাইনআপ বোনাস',
        date: new Date().toISOString(),
        submittedAt: serverTimestamp(),
        reviewedAt: serverTimestamp(),
        reviewedBy: 'system',
      })
      // HubSpot sync events
      const newUser = { name, businessName, email, phone }
      const contactEvent = createSyncEvent(
        SYNC_TYPES.CONTACT_CREATE,
        buildContactPayload(newUser),
        { email, source: 'registration' }
      )
      const companyEvent = createSyncEvent(
        SYNC_TYPES.COMPANY_CREATE,
        buildCompanyPayload(newUser),
        { businessName, source: 'registration' }
      )
      setHubspotSync((prev) => [...prev, contactEvent, companyEvent])
      return { success: true }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        return { success: false, message: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট তৈরি হয়েছে।' }
      }
      return { success: false, message: err.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।' }
    }
  }

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch {
      return { success: false, message: 'ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।' }
    }
  }

  const logout = () => signOut(auth)

  // ── WALLET ────────────────────────────────────────────────────────────────

  const addTransaction = async (data) => {
    const pkg = data.pkg
    await addDoc(collection(db, 'rechargeRequests'), {
      id: data.txId,
      trxId: data.txId,
      userId: firebaseUser.uid,
      businessName: data.businessName || userProfile?.businessName || '',
      amountBDT: pkg.bdt,
      maalAmount: pkg.maal,
      paymentMethod: 'bkash',
      status: 'Pending',
      type: 'recharge',
      amount: pkg.maal,
      bdt: pkg.bdt,
      amountPaid: data.amountPaid || pkg.bdt,
      note: data.note || '',
      description: `${pkg.label} প্যাকেজ — ৳${pkg.bdt}`,
      date: new Date().toISOString(),
      submittedAt: serverTimestamp(),
      reviewedAt: null,
      reviewedBy: null,
    })
  }

  // ── ORDERS ────────────────────────────────────────────────────────────────

  const addOrder = async (order) => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    const orderId = `ORD-${Date.now()}`
    const orderData = {
      id: orderId,
      orderId,
      userId: firebaseUser.uid,
      businessName: userProfile?.businessName || '',
      serviceType: order.service,
      serviceName: order.service,
      service: order.service,
      title: order.title,
      maalCost: order.maalCost || 0,
      status: 'Submitted',
      requestData: order.details || {},
      details: order.details || {},
      revisions: [],
      revisionCount: 0,
      attachments: order.attachments || [],
      previewFiles: [],
      finalFiles: [],
      previewUrl: null,
      downloadUrl: null,
      adminNotes: [],
      date: dateStr,
      timeline: [
        { status: 'Submitted', date: dateStr, time: timeStr, note: 'অর্ডার সাবমিট হয়েছে' },
      ],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    // Use orderId as Firestore document ID for easy lookup
    await setDoc(doc(db, 'orders', orderId), orderData)

    // HubSpot sync event
    const dealEvent = createSyncEvent(
      SYNC_TYPES.DEAL_CREATE,
      buildDealPayload(orderData, userProfile),
      { orderId, source: 'order_submit' }
    )
    setHubspotSync((prev) => [...prev, dealEvent])
  }

  const getOrderById = (id) => {
    const list = isAdmin ? allOrders : orders
    return list.find((o) => o.id === id || o.orderId === id) || null
  }

  const addRevision = async (orderId, message) => {
    const order = getOrderById(orderId)
    if (!order) return
    const isFirstRevision = !order.revisions || order.revisions.length === 0
    const cost = isFirstRevision ? 0 : (REVISION_COSTS[order.service] || 10)
    const newRevision = {
      id: `REV-${Date.now()}`,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      cost,
    }
    await updateDoc(doc(db, 'orders', orderId), {
      revisions: arrayUnion(newRevision),
      revisionCount: increment(1),
      updatedAt: serverTimestamp(),
    })
    if (cost > 0) {
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        maalBalance: increment(-cost),
      })
    }
  }

  // ── ADMIN ─────────────────────────────────────────────────────────────────

  const adminUpdateOrderStatus = async (orderId, newStatus, note = '') => {
    const now = new Date()
    const timelineEntry = {
      status: newStatus,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      note: note || `Status updated to ${newStatus}`,
    }
    await updateDoc(doc(db, 'orders', orderId), {
      status: newStatus,
      timeline: arrayUnion(timelineEntry),
      updatedAt: serverTimestamp(),
    })
    // HubSpot sync
    const order = getOrderById(orderId)
    if (order) {
      const dealUpdateEvent = createSyncEvent(
        SYNC_TYPES.DEAL_UPDATE,
        buildDealUpdatePayload({ ...order, status: newStatus }, note),
        { orderId, newStatus, source: 'admin_status_update' }
      )
      setHubspotSync((prev) => [...prev, dealUpdateEvent])
    }
  }

  const adminSetOrderUrls = async (orderId, urls) => {
    const updates = { updatedAt: serverTimestamp() }
    if (urls.previewUrl !== undefined) updates.previewUrl = urls.previewUrl
    if (urls.downloadUrl !== undefined) updates.downloadUrl = urls.downloadUrl
    await updateDoc(doc(db, 'orders', orderId), updates)
  }

  // txDocId is the Firestore document ID of the rechargeRequest
  const adminApproveRecharge = async (txDocId) => {
    const tx = allTransactions.find((t) => t.docId === txDocId)
    if (!tx || tx.status !== 'Pending') return
    await updateDoc(doc(db, 'rechargeRequests', txDocId), {
      status: 'Approved',
      reviewedAt: serverTimestamp(),
      reviewedBy: firebaseUser.uid,
    })
    await updateDoc(doc(db, 'users', tx.userId), {
      maalBalance: increment(tx.amount),
    })
  }

  const adminRejectRecharge = async (txDocId) => {
    await updateDoc(doc(db, 'rechargeRequests', txDocId), {
      status: 'Rejected',
      reviewedAt: serverTimestamp(),
      reviewedBy: firebaseUser.uid,
    })
  }

  const adminAddOrderNote = async (orderId, note) => {
    const noteEntry = { text: note, date: new Date().toISOString() }
    await updateDoc(doc(db, 'orders', orderId), {
      adminNotes: arrayUnion(noteEntry),
      updatedAt: serverTimestamp(),
    })
  }

  const adminUpdateUserBalance = async (uid, newBalance) => {
    await updateDoc(doc(db, 'users', uid), { maalBalance: newBalance })
  }

  // ── HUBSPOT SYNC ──────────────────────────────────────────────────────────

  const markSyncEvent = (syncId, status, error = null) => {
    setHubspotSync((prev) =>
      prev.map((ev) =>
        ev.id === syncId
          ? {
              ...ev,
              status,
              syncedAt: status === 'synced' ? new Date().toISOString() : ev.syncedAt,
              error,
            }
          : ev
      )
    )
  }

  const clearSyncedEvents = () => {
    setHubspotSync((prev) => prev.filter((ev) => ev.status !== 'synced'))
  }

  // ── CONTEXT VALUE ─────────────────────────────────────────────────────────

  const balance = userProfile?.maalBalance ?? 0
  const authLoading = firebaseUser === undefined

  const value = {
    user: userProfile,
    isAuthenticated: !!firebaseUser && !!userProfile,
    isAdmin,
    authLoading,
    balance,
    // Admin sees all; client sees own
    users: isAdmin ? allUsers : [],
    orders: isAdmin ? allOrders : orders,
    transactions: isAdmin ? allTransactions : transactions,
    hubspotSync,
    register,
    login,
    logout,
    addTransaction,
    addOrder,
    getOrderById,
    addRevision,
    adminUpdateOrderStatus,
    adminSetOrderUrls,
    adminApproveRecharge,
    adminRejectRecharge,
    adminAddOrderNote,
    adminUpdateUserBalance,
    markSyncEvent,
    clearSyncedEvents,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
