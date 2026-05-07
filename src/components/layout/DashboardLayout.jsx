import { useState, useRef, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiCreditCard, FiUser, FiLogOut, FiBell, FiChevronDown } from 'react-icons/fi'
import Sidebar from './Sidebar'
import FloatingWhatsApp from '../ui/FloatingWhatsApp'
import { useAuth } from '../../hooks/useAuth'
import { CURRENCY_NAME } from '../../data/constants'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, balance, orders, logout } = useAuth()
  const navigate = useNavigate()
  const profileRef = useRef(null)

  const pendingOrders = orders.filter(
    (o) => o.status !== 'Completed' && o.status !== 'Delivered'
  ).length

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = (user?.name || user?.businessName || 'U').charAt(0).toUpperCase()

  return (
    <div className="min-h-screen flex bg-brand-light">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: hamburger + welcome */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <div className="min-w-0 hidden sm:block">
              <p className="text-xs text-gray-400">স্বাগতম,</p>
              <p className="font-semibold text-brand-dark text-sm truncate max-w-[160px]">
                {user?.businessName || user?.name}
              </p>
            </div>
          </div>

          {/* Right: balance + notifications + profile */}
          <div className="flex items-center gap-2">
            {/* Wallet balance chip — links to /wallet */}
            <Link
              to="/wallet"
              className="flex items-center gap-2 bg-brand-dark-card border border-brand-dark-border rounded-xl px-3 py-2 hover:border-brand-primary/40 transition-colors"
            >
              <FiCreditCard size={14} className="text-brand-primary" />
              <span className="text-brand-primary font-bold font-heading text-sm">
                {balance.toLocaleString()}
              </span>
              <span className="text-gray-400 text-xs hidden sm:inline">{CURRENCY_NAME}</span>
            </Link>

            {/* Notification bell */}
            <Link
              to="/orders"
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
              title="Active Orders"
            >
              <FiBell size={18} className="text-gray-500" />
              {pendingOrders > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {pendingOrders > 9 ? '9+' : pendingOrders}
                </span>
              )}
            </Link>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm font-heading">
                  {initials}
                </div>
                <FiChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="font-semibold text-brand-dark text-sm truncate">
                      {user?.businessName || user?.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-colors"
                  >
                    <FiUser size={15} />
                    Profile Settings
                  </Link>
                  <Link
                    to="/wallet"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-colors"
                  >
                    <FiCreditCard size={15} />
                    Wallet ও Recharge
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <FiLogOut size={15} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <FloatingWhatsApp />
    </div>
  )
}
