import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 30)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (y / h) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinkClass = `relative text-sm font-semibold transition-colors px-2 py-1 ${
    scrolled || !isHome ? 'text-gray-700 hover:text-brand-primary' : 'text-white/90 hover:text-brand-accent'
  }`

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled || !isHome ? 'bg-white/85 backdrop-blur-2xl border-b border-gray-100/60 shadow-sm' : 'bg-transparent border-b border-white/5'
    }`}>
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-primary via-brand-accent to-brand-neon transition-all duration-150" style={{ width: `${progress}%` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary/30 rounded-xl blur-lg group-hover:bg-brand-primary/50 transition-colors" />
              <img
                src={`${import.meta.env.BASE_URL}logo-icon-green.svg`}
                alt="DhandaBuzz"
                className="relative w-10 h-10 object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-black text-xl leading-none transition-colors ${scrolled || !isHome ? 'text-brand-dark' : 'text-white'}`}>
                Dhanda<span className="text-brand-primary">Buzz</span>
              </span>
              <span className={`text-[10px] font-medium tracking-wider uppercase hidden sm:block transition-colors ${scrolled || !isHome ? 'text-brand-muted' : 'text-brand-accent/80'}`}>
                AI-Powered Digital Agency
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', id: null, to: '/' },
              { label: 'Services', id: 'services' },
              { label: 'Offers', id: 'offers' },
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'FAQ', id: 'faq' },
            ].map(item => (
              item.to ? (
                <Link key={item.label} to={item.to} className={navLinkClass}>{item.label}</Link>
              ) : (
                <button key={item.label} onClick={() => scrollToSection(item.id)} className={navLinkClass}>{item.label}</button>
              )
            ))}
            {isAuthenticated ? (
              <Button size="sm" onClick={() => navigate('/dashboard')} className="ml-3">Dashboard</Button>
            ) : (
              <div className="flex items-center gap-2 ml-3">
                <Button variant={scrolled || !isHome ? 'ghost' : 'outline-white'} size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')} className="shine">
                  ফ্রি শুরু করুন
                </Button>
              </div>
            )}
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || !isHome ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 animate-slide-down">
          <Link to="/" className="block py-2.5 px-3 rounded-lg text-gray-700 font-semibold hover:bg-brand-primary/5 hover:text-brand-primary" onClick={() => setMobileOpen(false)}>Home</Link>
          <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2.5 px-3 rounded-lg text-gray-700 font-semibold hover:bg-brand-primary/5 hover:text-brand-primary">Services</button>
          <button onClick={() => scrollToSection('offers')} className="block w-full text-left py-2.5 px-3 rounded-lg text-gray-700 font-semibold hover:bg-brand-primary/5 hover:text-brand-primary">Offers</button>
          <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2.5 px-3 rounded-lg text-gray-700 font-semibold hover:bg-brand-primary/5 hover:text-brand-primary">How It Works</button>
          <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2.5 px-3 rounded-lg text-gray-700 font-semibold hover:bg-brand-primary/5 hover:text-brand-primary">FAQ</button>
          {isAuthenticated ? (
            <Button className="w-full mt-2" size="md" onClick={() => { navigate('/dashboard'); setMobileOpen(false) }}>Dashboard</Button>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="w-full" size="md" onClick={() => { navigate('/login'); setMobileOpen(false) }}>Login</Button>
              <Button className="w-full" size="md" onClick={() => { navigate('/register'); setMobileOpen(false) }}>ফ্রি শুরু করুন</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
