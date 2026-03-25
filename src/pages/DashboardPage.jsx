import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import StatsOverview from '../components/dashboard/StatsOverview'
import QuickActions from '../components/dashboard/QuickActions'
import RecentOrders from '../components/dashboard/RecentOrders'
import LiveCallButton from '../components/ui/LiveCallButton'

export default function DashboardPage() {
  const { isAdmin, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin) navigate('/admin/dashboard', { replace: true })
  }, [isAdmin, navigate])

  if (isAdmin) return null

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-dark to-brand-dark-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-brand-dark-border">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        {/* Glowing orb */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-white">
              স্বাগতম, {user?.name || user?.businessName || 'User'}! 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              আপনার বিজনেসের সামগ্রিক অবস্থা দেখুন এবং নতুন অর্ডার দিন।
            </p>
          </div>
          <LiveCallButton variant="compact" />
        </div>
      </div>

      <StatsOverview />
      <QuickActions />
      <RecentOrders />
    </div>
  )
}
