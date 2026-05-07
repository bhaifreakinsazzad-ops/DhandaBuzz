import { useState, useEffect } from 'react'
import { FiUser } from 'react-icons/fi'

const notifications = [
  { name: 'রহিম সাহেব', city: 'ঢাকা', action: 'সাইনআপ করেছেন', avatar: '🧑‍💼', time: '২ মিনিট আগে' },
  { name: 'সানজিদা', city: 'চট্টগ্রাম', action: 'Web Launch Lab অর্ডার করেছেন', avatar: '👩‍💻', time: '৫ মিনিট আগে' },
  { name: 'আশিকুর ভাই', city: 'সিলেট', action: 'Business Audit বুক করেছেন', avatar: '🧑‍🏫', time: '৮ মিনিট আগে' },
  { name: 'মিথুন', city: 'রাজশাহী', action: 'Creative Engine অর্ডার করেছেন', avatar: '🎨', time: '১২ মিনিট আগে' },
  { name: 'ফাতেমা', city: 'খুলনা', action: 'Wallet রিচার্জ করেছেন', avatar: '👩‍🍳', time: '১৫ মিনিট আগে' },
  { name: 'কামাল সাহেব', city: 'বগুড়া', action: 'AdScale Engine শুরু করেছেন', avatar: '📊', time: '১৮ মিনিট আগে' },
]

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const delay = setTimeout(() => {
      setVisible(true)
    }, 4000)

    return () => clearTimeout(delay)
  }, [])

  useEffect(() => {
    if (!visible) return

    const hideTimer = setTimeout(() => setVisible(false), 4500)
    const nextTimer = setTimeout(() => {
      setCurrent((c) => (c + 1) % notifications.length)
      setVisible(true)
    }, 12000)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(nextTimer)
    }
  }, [visible, current])

  const n = notifications[current]

  return (
    <div
      className={`fixed bottom-[88px] left-4 md:bottom-6 md:left-6 z-50 max-w-[280px] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-xl shrink-0">
          {n.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-800 truncate">
            {n.name} ({n.city})
          </p>
          <p className="text-[11px] text-gray-500 truncate">{n.action}</p>
          <p className="text-[10px] text-brand-primary font-semibold mt-0.5">{n.time}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-300 hover:text-gray-500 transition-colors shrink-0 text-lg leading-none"
          aria-label="dismiss"
        >
          ×
        </button>
      </div>
    </div>
  )
}
