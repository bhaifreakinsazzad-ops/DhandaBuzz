import { FiCreditCard, FiShield, FiClock, FiGift } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { CURRENCY_NAME, SIGNUP_BONUS } from '../../data/constants'

export default function BalanceCard() {
  const { balance } = useAuth()

  return (
    <div className="gradient-hero rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <FiCreditCard size={20} />
          <span className="text-sm text-gray-300">Current Balance</span>
        </div>
        <p className="text-4xl sm:text-5xl font-bold font-heading text-brand-accent">
          {balance.toLocaleString()}
        </p>
        <p className="text-gray-400 text-sm mt-1">{CURRENCY_NAME} Credit</p>

        <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-white/10">
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
            <FiClock size={13} className="text-brand-secondary" />
            <span className="text-xs text-gray-300">Maal কখনো expire হয় না</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
            <FiShield size={13} className="text-brand-secondary" />
            <span className="text-xs text-gray-300">নিরাপদ ও সুরক্ষিত</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
            <FiGift size={13} className="text-brand-accent" />
            <span className="text-xs text-gray-300">সাইনআপে {SIGNUP_BONUS} Maal ফ্রি</span>
          </div>
        </div>
      </div>
    </div>
  )
}
