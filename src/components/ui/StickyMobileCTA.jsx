import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowRight, FiZap } from 'react-icons/fi'

export default function StickyMobileCTA() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (pathname !== '/') return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-3 pb-3 pt-2 bg-gradient-to-t from-brand-darker via-brand-darker/95 to-transparent">
      <button
        onClick={() => navigate('/register')}
        className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-black text-sm py-3.5 rounded-2xl shadow-glow-md active:scale-95 transition-transform"
      >
        <FiZap size={16} />
        ফ্রি অ্যাকাউন্ট খুলুন — ১০০ Maal বোনাস
        <FiArrowRight size={16} />
      </button>
    </div>
  )
}
