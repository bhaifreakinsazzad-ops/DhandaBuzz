import { FiMessageCircle, FiSend } from 'react-icons/fi'
import { WHATSAPP_LINK, TELEGRAM_LINK } from '../../data/constants'

const channels = [
  {
    name: 'WhatsApp Support',
    description: 'সরাসরি WhatsApp-এ মেসেজ করুন।',
    icon: FiMessageCircle,
    link: WHATSAPP_LINK,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  {
    name: 'Telegram Support',
    description: 'Telegram-এ আমাদের সাথে যোগাযোগ করুন।',
    icon: FiSend,
    link: TELEGRAM_LINK,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
]

export default function ContactChannels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {channels.map((ch) => {
        const Icon = ch.icon
        return (
          <a
            key={ch.name}
            href={ch.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ch.color} ${ch.hoverColor} rounded-2xl p-5 text-white transition-colors flex items-center gap-4`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon size={24} />
            </div>
            <div>
              <p className="font-heading font-bold">{ch.name}</p>
              <p className="text-sm text-white/80 mt-0.5">{ch.description}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}
