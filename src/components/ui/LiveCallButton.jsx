import { FiPhone, FiZap } from 'react-icons/fi'
import { ELEVENLABS_CALL_URL } from '../../data/constants'

export default function LiveCallButton({ variant = 'hero' }) {
  if (variant === 'hero') {
    return (
      <a
        href={ELEVENLABS_CALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 bg-brand-dark-card border border-brand-neon/30 rounded-2xl px-6 py-4 hover:border-brand-neon/60 transition-all duration-300 hover:shadow-lg hover:shadow-brand-neon/10"
      >
        <div className="w-12 h-12 rounded-xl bg-brand-neon/10 flex items-center justify-center group-hover:bg-brand-neon/20 transition-colors relative">
          <FiPhone className="text-brand-neon" size={22} />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-neon animate-pulse" />
        </div>
        <div>
          <p className="text-white font-heading font-semibold text-sm flex items-center gap-2">
            <FiZap className="text-brand-neon" size={14} />
            AI Assistant-এর সাথে কথা বলুন
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            সরাসরি ফোন কলের মতো কথা বলুন — ২৪/৭ Available
          </p>
        </div>
      </a>
    )
  }

  return (
    <a
      href={ELEVENLABS_CALL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-brand-neon/10 border border-brand-neon/20 rounded-xl px-4 py-2.5 text-brand-neon text-sm font-medium hover:bg-brand-neon/20 transition-all"
    >
      <FiPhone size={16} />
      <span>AI Call</span>
      <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
    </a>
  )
}
