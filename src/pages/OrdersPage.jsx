import OrderList from '../components/orders/OrderList'
import { useAuth } from '../hooks/useAuth'
import { ORDER_STATUSES } from '../data/constants'

export default function OrdersPage() {
  const { orders } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার সকল অর্ডার এবং তাদের বর্তমান অবস্থা।</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ORDER_STATUSES.map((status) => {
          const count = orders.filter(o => o.status === status).length
          return (
            <span
              key={status}
              className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-600"
            >
              {status} <span className="font-semibold text-brand-dark">({count})</span>
            </span>
          )
        })}
      </div>

      <OrderList />
    </div>
  )
}
