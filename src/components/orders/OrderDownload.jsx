import { FiDownload, FiPackage } from 'react-icons/fi'
import Button from '../ui/Button'

export default function OrderDownload({ order }) {
  const statusIndex = ['Submitted', 'Review', 'Processing', 'Preview Ready', 'Delivered', 'Completed']
  const currentIndex = statusIndex.indexOf(order.status)
  const isAvailable = currentIndex >= 4 && order.downloadUrl

  if (currentIndex < 4) return null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <FiDownload className="text-emerald-500" size={18} />
        <h3 className="font-bold font-heading text-brand-dark">ডাউনলোড</h3>
      </div>

      {isAvailable ? (
        <div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 flex flex-col items-center justify-center border border-emerald-100 mb-4">
            <FiPackage className="text-emerald-500 mb-2" size={36} />
            <p className="text-sm font-medium text-emerald-600">ফাইনাল ফাইল রেডি</p>
            <p className="text-xs text-emerald-400 mt-1">{order.downloadUrl}</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => alert('ডাউনলোড শুরু হচ্ছে... (Demo)')}
          >
            <FiDownload size={16} />
            ফাইনাল ফাইল ডাউনলোড করুন
          </Button>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center border border-dashed border-gray-200">
          <FiPackage className="text-gray-300 mb-2" size={36} />
          <p className="text-sm text-gray-400">ডেলিভারি সম্পন্ন হলে ডাউনলোড করতে পারবেন</p>
        </div>
      )}
    </div>
  )
}
