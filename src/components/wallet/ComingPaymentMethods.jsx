import { FiLock } from 'react-icons/fi'
import Card from '../ui/Card'

const methods = [
  { name: 'Nagad', color: 'bg-orange-500' },
  { name: 'Rocket', color: 'bg-purple-600' },
  { name: 'Card', color: 'bg-blue-600' },
  { name: 'Bank Transfer', color: 'bg-teal-600' },
  { name: 'Crypto', color: 'bg-gray-700' },
]

export default function ComingPaymentMethods() {
  return (
    <Card>
      <h3 className="font-heading font-bold text-brand-dark mb-1">আরও পেমেন্ট মেথড আসছে</h3>
      <p className="text-xs text-gray-400 mb-4">
        শীঘ্রই নিচের পেমেন্ট মেথডগুলো যোগ হবে।
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {methods.map((m) => (
          <div
            key={m.name}
            className="relative flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/50 p-4 opacity-60"
          >
            <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center`}>
              <span className="text-white font-bold text-xs font-heading">
                {m.name.charAt(0)}
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500">{m.name}</span>
            <span className="absolute top-1.5 right-1.5">
              <FiLock size={10} className="text-gray-400" />
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        বর্তমানে শুধুমাত্র <span className="font-semibold text-pink-600">bKash Send Money</span> চালু আছে।
      </p>
    </Card>
  )
}
