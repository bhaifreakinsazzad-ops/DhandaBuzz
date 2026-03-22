import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FiMenu, FiShield } from 'react-icons/fi'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b-2 border-red-500 px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <FiShield className="text-red-500" size={20} />
              <p className="font-bold text-gray-900 font-heading">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-red-600 rounded-xl px-4 py-2">
            <span className="text-white font-bold text-sm font-heading">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
