import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiZap, FiCreditCard, FiShoppingBag, FiHeadphones,
  FiUser, FiLogOut, FiX, FiEdit3
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import LiveCallButton from '../ui/LiveCallButton'

const navItems = [
  { to: '/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/create', icon: FiEdit3, label: 'AI Create' },
  { to: '/services', icon: FiZap, label: 'Services' },
  { to: '/wallet', icon: FiCreditCard, label: 'Wallet' },
  { to: '/orders', icon: FiShoppingBag, label: 'Orders' },
  { to: '/support', icon: FiHeadphones, label: 'Support' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-brand-darker z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-brand-dark-border">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt="DhandaBuzz" className="w-8 h-8 object-contain" />
            <span className="font-heading font-bold text-white">
              Dhanda<span className="text-brand-primary">Buzz</span>
            </span>
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
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-dark-border space-y-2">
          <LiveCallButton variant="compact" />
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
