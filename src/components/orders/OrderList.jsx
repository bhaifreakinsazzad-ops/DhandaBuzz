import { useAuth } from '../../hooks/useAuth'
import OrderCard from './OrderCard'

export default function OrderList() {
  const { orders } = useAuth()

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">এখনও কোনো অর্ডার নেই।</p>
        <p className="text-gray-400 text-sm mt-1">Dashboard থেকে নতুন অর্ডার দিন।</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
