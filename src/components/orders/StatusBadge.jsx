import { STATUS_COLORS } from '../../data/constants'

export default function StatusBadge({ status }) {
  return (
    <span className={`${STATUS_COLORS[status] || 'bg-gray-500'} text-white text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap`}>
      {status}
    </span>
  )
}
