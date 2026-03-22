import { useState } from 'react'
import { FiRefreshCw, FiSend, FiAlertCircle } from 'react-icons/fi'
import { REVISION_COSTS } from '../../data/constants'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import StatusBadge from './StatusBadge'

export default function OrderRevisions({ order }) {
  const { addRevision, balance } = useAuth()
  const [message, setMessage] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const revisions = order.revisions || []
  const isFirstRevision = revisions.length === 0
  const revisionCost = isFirstRevision ? 0 : (REVISION_COSTS[order.service] || 10)
  const canRequestRevision = order.status === 'Preview Ready'
  const hasEnoughBalance = balance >= revisionCost

  const handleSubmit = () => {
    if (!message.trim()) return
    if (!isFirstRevision && !showConfirm) {
      setShowConfirm(true)
      return
    }
    addRevision(order.id, message.trim())
    setMessage('')
    setShowConfirm(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <FiRefreshCw className="text-orange-500" size={18} />
        <h3 className="font-bold font-heading text-brand-dark">রিভিশন</h3>
      </div>

      {/* Revision policy */}
      <div className="bg-orange-50 rounded-xl p-4 mb-4 border border-orange-100">
        <div className="flex items-start gap-2">
          <FiAlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" size={14} />
          <div className="text-xs text-orange-700 space-y-1">
            <p className="font-semibold">রিভিশন পলিসি:</p>
            <p>• প্রথম রিভিশন <span className="font-bold text-emerald-600">ফ্রি</span></p>
            <p>• পরবর্তী রিভিশন: <span className="font-bold">{REVISION_COSTS[order.service] || '—'} Maal</span></p>
          </div>
        </div>
      </div>

      {/* Revision history */}
      {revisions.length > 0 && (
        <div className="space-y-3 mb-4">
          <p className="text-xs font-medium text-gray-400">রিভিশন হিস্ট্রি</p>
          {revisions.map((rev) => (
            <div key={rev.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-gray-400">{rev.id}</span>
                  <StatusBadge status={rev.status} />
                </div>
                <span className="text-xs text-gray-400">{rev.date}</span>
              </div>
              <p className="text-sm text-gray-700">{rev.message}</p>
              <div className="mt-2 text-xs text-gray-400">
                খরচ: <span className={rev.cost === 0 ? 'text-emerald-600 font-medium' : 'text-orange-600 font-medium'}>
                  {rev.cost === 0 ? 'ফ্রি' : `${rev.cost} Maal`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revision request form */}
      {canRequestRevision ? (
        <div className="space-y-3">
          <textarea
            value={message}
            onChange={(e) => { setMessage(e.target.value); setShowConfirm(false) }}
            placeholder="কী পরিবর্তন চান তা বিস্তারিত লিখুন..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            rows={3}
          />

          {showConfirm && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-700 font-medium">
                এই রিভিশনের জন্য {revisionCost} Maal চার্জ হবে। আপনার ব্যালেন্স: {balance} Maal
              </p>
              {!hasEnoughBalance && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  পর্যাপ্ত ব্যালেন্স নেই। অনুগ্রহ করে রিচার্জ করুন।
                </p>
              )}
            </div>
          )}

          <Button
            variant={showConfirm ? 'secondary' : 'outline'}
            size="sm"
            className="w-full"
            onClick={handleSubmit}
            disabled={!message.trim() || (showConfirm && !hasEnoughBalance)}
          >
            <FiSend size={14} />
            {showConfirm ? `কনফার্ম — ${revisionCost} Maal চার্জ হবে` : isFirstRevision ? 'ফ্রি রিভিশন রিকুয়েস্ট করুন' : `রিভিশন রিকুয়েস্ট করুন (${revisionCost} Maal)`}
          </Button>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-dashed border-gray-200">
          <p className="text-sm text-gray-400">
            {order.status === 'Completed'
              ? 'অর্ডার সম্পন্ন হয়েছে।'
              : 'প্রিভিউ রেডি হলে রিভিশন রিকুয়েস্ট করতে পারবেন।'}
          </p>
        </div>
      )}
    </div>
  )
}
