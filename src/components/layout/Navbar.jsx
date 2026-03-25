import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const scrollToSection = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}logo-icon-green.svg`}
              alt="DhandaBuzz"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-brand-dark leading-none">
                Dhanda<span className="text-brand-primary">Buzz</span>
              </span>
              <span className="text-[10px] text-brand-muted font-medium tracking-wider uppercase hidden sm:block">
                AI-Powered Digital Agency
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-brand-primary transition-colors font-medium">
              Home
            </Link>
            <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-brand-primary transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-brand-primary transition-colors font-medium">
              How It Works
            </button>
            {isAuthenticated ? (
              <Button size="sm" onClick={() => navigate('/dashboard')} className="group">
                Dashboard
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  ফ্রি শুরু করুন
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 animate-slide-up">
          <Link to="/" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <button onClick={() => scrollToSection('services')} className="block py-2 text-gray-600 font-medium w-full text-left">
            Services
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="block py-2 text-gray-600 font-medium w-full text-left">
            How It Works
          </button>
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
                ফ্রি শুরু করুন
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
