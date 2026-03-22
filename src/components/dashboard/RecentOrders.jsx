import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { STATUS_COLORS } from '../../data/constants'

export default function RecentOrders() {
  const { orders } = useAuth()
  const navigate = useNavigate()
  const recent = orders.slice(0, 3)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold font-heading text-brand-dark">Recent Orders</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('/orders')}>
          View All →
        </Button>
      </div>

      <Card>
        {recent.length === 0 ? (
          <p className="text-gray-500 text-center py-4">এখনও কোনো অর্ডার নেই।</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recent.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm text-brand-dark">{order.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.id} • {order.service}</p>
                </div>
                <span className={`${STATUS_COLORS[order.status]} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
