import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import StatusBadge from '../components/orders/StatusBadge'
import OrderTimeline from '../components/orders/OrderTimeline'
import OrderRequirements from '../components/orders/OrderRequirements'
import OrderPreview from '../components/orders/OrderPreview'
import OrderDownload from '../components/orders/OrderDownload'
import OrderRevisions from '../components/orders/OrderRevisions'
import { FiArrowLeft, FiCalendar, FiHash, FiLayers } from 'react-icons/fi'

export default function OrderDetailPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { getOrderById } = useAuth()

  const order = getOrderById(orderId)

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">অর্ডার পাওয়া যায়নি।</p>
        <button
          onClick={() => navigate('/orders')}
          className="mt-4 text-brand-primary font-medium text-sm hover:underline"
        >
          অর্ডার লিস্টে ফিরে যান
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary transition-colors"
      >
        <FiArrowLeft size={16} />
        সকল অর্ডার
      </button>

      {/* Order header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold font-heading text-brand-dark">{order.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1 font-mono">
                <FiHash size={12} />
                {order.id}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                <FiLayers size={12} />
                {order.service}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar size={12} />
                {order.date}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-brand-accent">{order.maalCost} Maal</span>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      {/* Main content - 2 column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column - Timeline & Requirements */}
        <div className="lg:col-span-3 space-y-6">
          <OrderTimeline timeline={order.timeline} currentStatus={order.status} />
          <OrderRequirements details={order.details} attachments={order.attachments} />
        </div>

        {/* Right column - Preview, Download, Revisions */}
        <div className="lg:col-span-2 space-y-6">
          <OrderPreview order={order} />
          <OrderDownload order={order} />
          <OrderRevisions order={order} />
        </div>
      </div>
    </div>
  )
}
