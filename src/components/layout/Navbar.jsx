import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import { BRAND_NAME } from '../../data/constants'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm font-heading">DB</span>
            </div>
            <span className="font-heading font-bold text-xl text-brand-dark">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-brand-primary transition-colors font-medium">
              Home
            </Link>
            {isAuthenticated ? (
              <Button size="sm" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  ফ্রি অ্যাকাউন্ট খুলুন
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block py-2 text-gray-600 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <Button className="w-full" size="sm" onClick={() => { navigate('/dashboard'); setMobileOpen(false) }}>
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="outline" className="w-full" size="sm" onClick={() => { navigate('/login'); setMobileOpen(false) }}>
                Login
              </Button>
              <Button className="w-full" size="sm" onClick={() => { navigate('/register'); setMobileOpen(false) }}>
                ফ্রি অ্যাকাউন্ট খুলুন
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
