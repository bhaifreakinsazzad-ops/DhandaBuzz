import { ORDER_STATUSES, STATUS_COLORS } from '../../data/constants'
import { FiCheck, FiCpu } from 'react-icons/fi'

export default function OrderTimeline({ timeline, currentStatus }) {
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <FiCpu className="text-brand-primary" size={18} />
        <h3 className="font-bold font-heading text-brand-dark">AI Workflow Progress</h3>
      </div>

      <div className="relative">
        {ORDER_STATUSES.map((status, index) => {
          const timelineEntry = timeline?.find(t => t.status === status)
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isFuture = index > currentIndex

          return (
            <div key={status} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Vertical line */}
              {index < ORDER_STATUSES.length - 1 && (
                <div
                  className={`absolute left-[15px] top-[32px] w-0.5 h-[calc(100%-16px)] ${
                    isCompleted ? 'bg-emerald-400' : isCurrent ? 'bg-gradient-to-b from-brand-primary to-gray-200' : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Circle icon */}
              <div className="relative z-10 flex-shrink-0">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-200">
                    <FiCheck className="text-white" size={16} />
                  </div>
                ) : isCurrent ? (
                  <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/30">
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 ${isFuture ? 'opacity-40' : ''}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-semibold ${isCurrent ? 'text-brand-primary' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {status}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-medium">
                      Current
                    </span>
                  )}
                </div>

                {timelineEntry ? (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">{timelineEntry.note}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {timelineEntry.date} {timelineEntry.time && `• ${timelineEntry.time}`}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-300 mt-1">পেন্ডিং...</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Processing indicator */}
      {currentStatus !== 'Completed' && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-brand-primary">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="font-medium">AI সিস্টেম প্রসেস করছে...</span>
          </div>
        </div>
      )}
    </div>
  )
}
