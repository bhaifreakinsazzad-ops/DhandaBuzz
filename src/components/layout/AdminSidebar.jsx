import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiShoppingBag, FiCreditCard, FiUsers, FiDatabase, FiLogOut, FiX
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
  { to: '/admin/recharges', icon: FiCreditCard, label: 'Recharges' },
  { to: '/admin/users', icon: FiUsers, label: 'Users' },
  { to: '/admin/crm', icon: FiDatabase, label: 'HubSpot CRM' },
]

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt="DhandaBuzz" className="w-8 h-8 object-contain" />
            <span className="font-heading font-bold text-white">DB <span className="text-red-400">Admin</span></span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 w-full"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
