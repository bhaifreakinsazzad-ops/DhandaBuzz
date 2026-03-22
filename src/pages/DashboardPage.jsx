import StatsOverview from '../components/dashboard/StatsOverview'
import QuickActions from '../components/dashboard/QuickActions'
import RecentOrders from '../components/dashboard/RecentOrders'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার বিজনেসের সামগ্রিক অবস্থা দেখুন।</p>
      </div>

      <StatsOverview />
      <QuickActions />
      <RecentOrders />
    </div>
  )
}
