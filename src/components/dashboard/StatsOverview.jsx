import { FiDollarSign, FiShoppingBag, FiCheckCircle, FiClock } from 'react-icons/fi'
import Card from '../ui/Card'
import { useAuth } from '../../hooks/useAuth'
import { CURRENCY_NAME } from '../../data/constants'

export default function StatsOverview() {
  const { balance, orders } = useAuth()

  const activeOrders = orders.filter(o => !['Completed', 'Delivered'].includes(o.status)).length
  const completedOrders = orders.filter(o => o.status === 'Completed').length

  const stats = [
    {
      label: `${CURRENCY_NAME} Balance`,
      value: balance.toLocaleString(),
      icon: FiDollarSign,
      color: 'bg-brand-accent/10 text-brand-accent',
      iconBg: 'bg-brand-accent',
    },
    {
      label: 'Active Orders',
      value: activeOrders,
      icon: FiClock,
      color: 'bg-blue-50 text-blue-500',
      iconBg: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: completedOrders,
      icon: FiCheckCircle,
      color: 'bg-green-50 text-green-500',
      iconBg: 'bg-green-500',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: FiShoppingBag,
      color: 'bg-teal-50 text-teal-500',
      iconBg: 'bg-teal-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                <Icon className="text-white" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold font-heading text-brand-dark">{stat.value}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
