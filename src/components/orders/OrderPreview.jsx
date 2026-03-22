import { useState } from 'react'
import { FiEye, FiImage } from 'react-icons/fi'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

export default function OrderPreview({ order }) {
  const [showPreview, setShowPreview] = useState(false)
  const statusIndex = ['Submitted', 'Review', 'Processing', 'Preview Ready', 'Delivered', 'Completed']
  const currentIndex = statusIndex.indexOf(order.status)
  const isAvailable = currentIndex >= 3 && order.previewUrl

  if (currentIndex < 3) return null

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <FiEye className="text-purple-500" size={18} />
          <h3 className="font-bold font-heading text-brand-dark">প্রিভিউ</h3>
        </div>

        {isAvailable ? (
          <div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 flex flex-col items-center justify-center border border-purple-100 mb-4">
              <FiImage className="text-purple-400 mb-2" size={40} />
              <p className="text-sm font-medium text-purple-600">প্রিভিউ রেডি</p>
              <p className="text-xs text-purple-400 mt-1">রিভিউ করে অ্যাপ্রুভ বা রিভিশন রিকুয়েস্ট করুন</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowPreview(true)}
            >
              <FiEye size={16} />
              প্রিভিউ দেখুন
            </Button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center border border-dashed border-gray-200">
            <FiImage className="text-gray-300 mb-2" size={36} />
            <p className="text-sm text-gray-400">প্রিভিউ এখনো রেডি হয়নি</p>
          </div>
        )}
      </div>

      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="অর্ডার প্রিভিউ">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-10 flex flex-col items-center justify-center border border-purple-100">
          <FiImage className="text-purple-400 mb-3" size={48} />
          <p className="font-semibold text-purple-700">{order.title}</p>
          <p className="text-xs text-purple-400 mt-2">প্রিভিউ ফাইল: {order.previewUrl}</p>
        </div>
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-xs text-purple-600">
            প্রিভিউ দেখার পর সন্তুষ্ট হলে অর্ডার ডেলিভারি নিন। পরিবর্তন লাগলে রিভিশন রিকুয়েস্ট করুন।
          </p>
        </div>
      </Modal>
    </>
  )
}
