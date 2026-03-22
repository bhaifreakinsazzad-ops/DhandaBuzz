import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import Sidebar from './Sidebar'
import { useAuth } from '../../hooks/useAuth'
import { CURRENCY_NAME } from '../../data/constants'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, balance } = useAuth()

  return (
    <div className="min-h-screen flex bg-brand-light">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <div>
              <p className="text-sm text-gray-500">স্বাগতম,</p>
              <p className="font-semibold text-brand-dark text-sm">
                {user?.businessName || user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-brand-dark rounded-xl px-4 py-2">
            <span className="text-brand-accent font-bold font-heading">
              {balance.toLocaleString()}
            </span>
            <span className="text-gray-400 text-sm">{CURRENCY_NAME}</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
