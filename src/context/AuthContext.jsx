import { createContext, useState, useEffect } from 'react'
import { mockOrders } from '../data/mockOrders'
import { SIGNUP_BONUS } from '../data/constants'

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
    const newOrder = {
      ...order,
      id: `ORD-${1000 + state.orders.length + 1}`,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
    }
    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
    }))
  }

  const value = {
    user: state.currentUser,
    isAuthenticated: !!state.currentUser,
    balance: state.balance,
    orders: state.orders,
    transactions: state.transactions,
    register,
    login,
    logout,
    addTransaction,
    addOrder,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
