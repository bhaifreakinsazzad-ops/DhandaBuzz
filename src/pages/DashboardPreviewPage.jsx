import { Link } from 'react-router-dom'
import { FiDollarSign, FiShoppingBag, FiCheckCircle, FiClock, FiImage, FiGlobe, FiTrendingUp } from 'react-icons/fi'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { BRAND_NAME, CURRENCY_NAME } from '../data/constants'

const mockStats = [
  { label: `${CURRENCY_NAME} Balance`, value: '100', icon: FiDollarSign, iconBg: 'bg-brand-accent' },
  { label: 'Active Orders', value: '2', icon: FiClock, iconBg: 'bg-blue-500' },
  { label: 'Completed', value: '5', icon: FiCheckCircle, iconBg: 'bg-green-500' },
  { label: 'Total Orders', value: '7', icon: FiShoppingBag, iconBg: 'bg-teal-500' },
]

const mockServices = [
  { name: 'Creative Engine', nameBn: 'ক্রিয়েটিভ ইঞ্জিন', icon: FiImage, color: 'from-emerald-500 to-teal-500', maal: 5 },
  { name: 'Web Launch Lab', nameBn: 'ওয়েব লঞ্চ ল্যাব', icon: FiGlobe, color: 'from-blue-500 to-cyan-500', maal: 300 },
  { name: 'AdScale Engine', nameBn: 'অ্যাডস্কেল ইঞ্জিন', icon: FiTrendingUp, color: 'from-green-500 to-emerald-500', maal: 50 },
]

const mockOrders = [
  { id: 'ORD-2024-001', service: 'Creative Engine', title: 'Facebook Ad Design', status: 'Preview Ready', date: '2024-12-20' },
  { id: 'ORD-2024-002', service: 'Web Launch Lab', title: 'Landing Page', status: 'Processing', date: '2024-12-18' },
  { id: 'ORD-2024-003', service: 'AdScale Engine', title: 'Campaign Setup', status: 'Completed', date: '2024-12-15' },
]

const statusColors = {
  'Preview Ready': 'bg-purple-100 text-purple-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
}

export default function DashboardPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt={BRAND_NAME} className="w-8 h-8" />
            <span className="font-heading font-bold text-brand-dark">{BRAND_NAME}</span>
            <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-medium">Preview</span>
          </div>
          <Link to="/register">
            <Button size="sm">ফ্রি অ্যাকাউন্ট তৈরি করুন</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-brand-dark to-brand-dark-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-brand-dark-border mb-6">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-2xl font-bold font-heading text-white">স্বাগতম, Demo User! 👋</h1>
            <p className="text-gray-400 text-sm mt-1">এটি একটি ডেমো ড্যাশবোর্ড। রেজিস্টার করে আপনার নিজের ড্যাশবোর্ড পান!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {mockStats.map((stat, i) => {
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

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-bold font-heading text-brand-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mockServices.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.name} dark glow className="cursor-default">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3`}>
                    <Icon className="text-white" size={18} />
                  </div>
                  <h3 className="font-heading font-semibold text-sm">{service.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{service.nameBn}</p>
                  <p className="text-brand-accent text-xs mt-2">শুরু {service.maal} Maal থেকে →</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-6">
          <h2 className="text-lg font-bold font-heading text-brand-dark mb-4">Recent Orders</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="text-left px-4 py-3">Order ID</th>
                    <th className="text-left px-4 py-3">Service</th>
                    <th className="text-left px-4 py-3">Title</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                      <td className="px-4 py-3">{order.service}</td>
                      <td className="px-4 py-3">{order.title}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Blurred Overlay CTA */}
        <div className="fixed inset-0 pointer-events-none z-10 flex items-end justify-center pb-8 sm:pb-12">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 text-center max-w-md mx-4">
            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt={BRAND_NAME} className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-heading text-brand-dark mb-2">
              আপনার নিজের ড্যাশবোর্ড পান!
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              ফ্রিতে রেজিস্টার করুন এবং 100 Maal বোনাস পান। আপনার ব্যবসার ডিজিটাল জার্নি শুরু করুন!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register">
                <Button className="w-full sm:w-auto">ফ্রি রেজিস্ট্রেশন করুন</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full sm:w-auto">Login করুন</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
