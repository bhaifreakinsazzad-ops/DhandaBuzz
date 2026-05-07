import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiX, FiArrowRight, FiZap } from 'react-icons/fi'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (dismissed || pathname !== '/') return null

  return (
    <div className="relative bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-[length:200%_100%] animate-gradient-x text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2">
      <FiZap size={14} className="shrink-0" />
      <span>
        সাইনআপে <strong>১০০ Maal ফ্রি</strong> পাচ্ছেন — অফার সীমিত সময়ের!{' '}
        <button
          onClick={() => navigate('/register')}
          className="underline underline-offset-2 hover:no-underline inline-flex items-center gap-1"
        >
          এখনই নিন <FiArrowRight size={12} />
        </button>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <FiX size={16} />
      </button>
    </div>
  )
}
