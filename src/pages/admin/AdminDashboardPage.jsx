import { useAuth } from '../../hooks/useAuth'
import Card from '../../components/ui/Card'
import StatusBadge from '../../components/orders/StatusBadge'
import { FiUsers, FiShoppingBag, FiClock, FiDollarSign } from 'react-icons/fi'

function formatDate(isoString) {
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  } catch {
    return isoString
  }
}

export default function AdminDashboardPage() {
  const { users, orders, transactions } = useAuth()

  const pendingRecharges = transactions.filter(t => t.status === 'Pending')
  const totalMaalDistributed = transactions
    .filter(t => t.status === 'Approved')
    .reduce((sum, t) => sum + t.amount, 0)

  const stats = [
    { label: 'Total Users', value: users.length, icon: FiUsers, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Orders', value: orders.length, icon: FiShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Pending Recharges', value: pendingRecharges.length, icon: FiClock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Maal Distributed', value: totalMaalDistributed.toLocaleString(), icon: FiDollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={color} size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div>
          <h2 className="text-lg font-bold font-heading text-gray-900 mb-3">Recent Orders</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{order.id}</td>
                      <td className="px-4 py-3 text-gray-700 truncate max-w-[200px]">{order.title}</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-400">No orders yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pending Recharges */}
        <div>
          <h2 className="text-lg font-bold font-heading text-gray-900 mb-3">Pending Recharges</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">TX ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Maal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pendingRecharges.slice(0, 5).map((tx, i) => (
                    <tr key={`${tx.id}-${i}`} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{tx.id}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{formatDate(tx.date)}</td>
                      <td className="px-4 py-3 font-semibold text-brand-accent">{tx.amount}</td>
                    </tr>
                  ))}
                  {pendingRecharges.length === 0 && (
                    <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-400">No pending recharges</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
