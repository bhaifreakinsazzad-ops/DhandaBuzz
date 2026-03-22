import StatusBadge from './StatusBadge'
import Card from '../ui/Card'
import { FiCalendar } from 'react-icons/fi'

export default function OrderCard({ order }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-brand-dark truncate">{order.title}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="font-mono">{order.id}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{order.service}</span>
            <span className="flex items-center gap-1">
              <FiCalendar size={12} />
              {order.date}
            </span>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">খরচ:</span>
        <span className="font-semibold text-brand-accent text-sm">{order.maalCost} Maal</span>
      </div>
    </Card>
  )
}
