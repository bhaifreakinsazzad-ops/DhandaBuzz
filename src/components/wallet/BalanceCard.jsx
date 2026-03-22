import { FiCreditCard } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { CURRENCY_NAME } from '../../data/constants'

export default function BalanceCard() {
  const { balance } = useAuth()

  return (
    <div className="gradient-hero rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/30 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <FiCreditCard size={20} />
          <span className="text-sm text-gray-300">Current Balance</span>
        </div>
        <p className="text-4xl sm:text-5xl font-bold font-heading text-brand-accent">
          {balance.toLocaleString()}
        </p>
        <p className="text-gray-400 text-sm mt-1">{CURRENCY_NAME} Credit</p>
      </div>
    </div>
  )
}
