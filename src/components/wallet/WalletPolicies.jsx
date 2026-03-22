import { FiClock, FiAlertCircle, FiCheckCircle, FiShield } from 'react-icons/fi'
import Card from '../ui/Card'

const policies = [
  {
    icon: FiClock,
    title: 'কোনো মেয়াদ নেই',
    description: 'আপনার Maal ক্রেডিট কখনো expire হয় না। যখন খুশি ব্যবহার করুন।',
    color: 'text-brand-secondary',
    bg: 'bg-green-50',
  },
  {
    icon: FiAlertCircle,
    title: 'রিফান্ড পলিসি',
    description: 'রিচার্জ সাধারণত নন-রিফান্ডেবল। বিশেষ ক্ষেত্রে ম্যানুয়ালি রিভিউ করা হবে।',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  {
    icon: FiCheckCircle,
    title: 'ম্যানুয়াল অ্যাপ্রুভাল',
    description: 'প্রতিটি রিচার্জ রিকোয়েস্ট আমাদের টিম ভেরিফাই করে অ্যাপ্রুভ করে। সাধারণত ১-৩ ঘণ্টা।',
    color: 'text-brand-primary',
    bg: 'bg-purple-50',
  },
  {
    icon: FiShield,
    title: 'নিরাপদ লেনদেন',
    description: 'bKash-এর মাধ্যমে সুরক্ষিত Send Money। কোনো তৃতীয় পক্ষ জড়িত নয়।',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
]

export default function WalletPolicies() {
  return (
    <div>
      <h2 className="text-lg font-bold font-heading text-brand-dark mb-4">Wallet নীতিমালা</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {policies.map((policy) => {
          const Icon = policy.icon
          return (
            <Card key={policy.title} className={`${policy.bg} border-0`}>
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${policy.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-brand-dark">{policy.title}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{policy.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
