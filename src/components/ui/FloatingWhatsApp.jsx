import { useState } from 'react'
import { FiX, FiMessageCircle } from 'react-icons/fi'
import { WHATSAPP_MESSAGE_LINK } from '../../data/constants'

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-[80px] right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat popup */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 overflow-hidden animate-slide-up">
          <div className="bg-green-500 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <FiMessageCircle className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">DhandaBuzz Support</p>
              <p className="text-green-100 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                সাধারণত ৫ মিনিটের মধ্যে reply দিই
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <FiX size={20} />
            </button>
          </div>

          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-xl p-3 shadow-sm text-sm text-gray-700 max-w-[90%]">
              <p>আসসালামু আলাইকুম! 👋</p>
              <p className="mt-1">DhandaBuzz এ স্বাগতম। আপনার ব্যবসার growth নিয়ে কথা বলতে চাইলে নিচের button এ চাপ দিন!</p>
            </div>
          </div>

          <div className="p-4 pt-0">
            <a
              href={WHATSAPP_MESSAGE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 px-4 font-semibold transition-all w-full text-sm"
            >
              <FiMessageCircle size={18} />
              WhatsApp এ কথা বলুন
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow relative group"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
        {isOpen ? <FiX size={28} /> : <FiMessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute right-full mr-3 bg-brand-dark text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            কথা বলুন! 💬
          </span>
        )}
      </button>
    </div>
  )
}
