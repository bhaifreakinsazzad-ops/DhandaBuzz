import { createContext, useState, useEffect } from 'react'
import { mockOrders } from '../data/mockOrders'
import { SIGNUP_BONUS, REVISION_COSTS, ADMIN_EMAIL, ADMIN_PASSWORD } from '../data/constants'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'dhandabuzz_data'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = loadData()
    if (saved) return saved
    return {
      users: [],
      currentUser: null,
      balance: 0,
      orders: [],
      transactions: [],
    }
  })

  useEffect(() => {
    saveData(state)
  }, [state])

  const register = ({ name, businessName, email, phone, password }) => {
    const existingUser = state.users.find(u => u.email === email)
    if (existingUser) {
      return { success: false, message: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট তৈরি হয়েছে।' }
    }

    const newUser = { name, businessName, email, phone, password }
    setState(prev => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUser: newUser,
      balance: SIGNUP_BONUS,
      orders: [...mockOrders],
      transactions: [
        {
          id: 'TXN-BONUS',
          type: 'bonus',
          amount: SIGNUP_BONUS,
          description: 'সাইনআপ বোনাস',
          date: new Date().toISOString(),
          status: 'Approved',
        },
      ],
    }))
    return { success: true }
  }

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { name: 'Admin', businessName: 'DhandaBuzz', email: ADMIN_EMAIL, phone: '' }
      setState(prev => ({ ...prev, currentUser: adminUser }))
      return { success: true }
    }
    const user = state.users.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, message: 'ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।' }
    }
    setState(prev => ({ ...prev, currentUser: user }))
    return { success: true }
  }

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }))
  }

  const addTransaction = (data) => {
    const isLegacy = typeof data === 'string'
    const pkg = isLegacy ? arguments[1] : data.pkg
    const transaction = {
      id: isLegacy ? data : data.txId,
      type: 'recharge',
      bdt: pkg.bdt,
      amount: pkg.maal,
      amountPaid: isLegacy ? pkg.bdt : (data.amountPaid || pkg.bdt),
      businessName: isLegacy ? '' : (data.businessName || ''),
      note: isLegacy ? '' : (data.note || ''),
      description: `${pkg.label} প্যাকেজ — ৳${pkg.bdt}`,
      date: new Date().toISOString(),
      status: 'Pending',
    }
    setState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }))
  }

  const addOrder = (order) => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    const newOrder = {
      ...order,
      id: `ORD-${1000 + state.orders.length + 1}`,
      status: 'Submitted',
      date: dateStr,
      revisions: [],
      attachments: order.attachments || [],
      previewUrl: null,
      downloadUrl: null,
      timeline: [
        { status: 'Submitted', date: dateStr, time: timeStr, note: 'অর্ডার সাবমিট হয়েছে' },
      ],
    }
    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
    }))
  }

  const getOrderById = (id) => {
    return state.orders.find(o => o.id === id) || null
  }

  const addRevision = (orderId, message) => {
    setState(prev => {
      const orders = prev.orders.map(order => {
        if (order.id !== orderId) return order
        const isFirstRevision = !order.revisions || order.revisions.length === 0
        const cost = isFirstRevision ? 0 : (REVISION_COSTS[order.service] || 10)
        const newRevision = {
          id: `REV-${Date.now()}`,
          message,
          date: new Date().toISOString().split('T')[0],
          status: 'Submitted',
          cost,
        }
        return {
          ...order,
          revisions: [...(order.revisions || []), newRevision],
        }
      })
      const order = orders.find(o => o.id === orderId)
      const latestRevision = order?.revisions?.[order.revisions.length - 1]
      const newBalance = latestRevision ? prev.balance - latestRevision.cost : prev.balance
      return { ...prev, orders, balance: newBalance }
    })
  }

  const isAdmin = state.currentUser?.email === ADMIN_EMAIL

  const adminUpdateOrderStatus = (orderId, newStatus, note = '') => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(order => {
        if (order.id !== orderId) return order
        const now = new Date()
        return {
          ...order,
          status: newStatus,
          timeline: [
            ...(order.timeline || []),
            {
              status: newStatus,
              date: now.toISOString().split('T')[0],
              time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
              note: note || `Status updated to ${newStatus}`,
            },
          ],
        }
      }),
    }))
  }

  const adminSetOrderUrls = (orderId, urls) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(order => {
        if (order.id !== orderId) return order
        return {
          ...order,
          ...(urls.previewUrl !== undefined && { previewUrl: urls.previewUrl }),
          ...(urls.downloadUrl !== undefined && { downloadUrl: urls.downloadUrl }),
        }
      }),
    }))
  }

  const adminApproveRecharge = (txId) => {
    setState(prev => {
      const tx = prev.transactions.find(t => t.id === txId)
      if (!tx || tx.status !== 'Pending') return prev
      return {
        ...prev,
        balance: prev.balance + tx.amount,
        transactions: prev.transactions.map(t =>
          t.id === txId ? { ...t, status: 'Approved' } : t
        ),
      }
    })
  }

  const adminRejectRecharge = (txId) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t =>
        t.id === txId ? { ...t, status: 'Rejected' } : t
      ),
    }))
  }

  const adminAddOrderNote = (orderId, note) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(order => {
        if (order.id !== orderId) return order
        return {
          ...order,
          adminNotes: [
            ...(order.adminNotes || []),
            { text: note, date: new Date().toISOString() },
          ],
        }
      }),
    }))
  }

  const value = {
    user: state.currentUser,
    isAuthenticated: !!state.currentUser,
    isAdmin,
    balance: state.balance,
    users: state.users,
    orders: state.orders,
    transactions: state.transactions,
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
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
