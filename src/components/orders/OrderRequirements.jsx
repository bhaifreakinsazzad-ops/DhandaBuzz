import { FiFileText, FiPaperclip } from 'react-icons/fi'

export default function OrderRequirements({ details, attachments }) {
  if (!details || Object.keys(details).length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <FiFileText className="text-brand-primary" size={18} />
        <h3 className="font-bold font-heading text-brand-dark">সাবমিটেড রিকোয়ারমেন্টস</h3>
      </div>

      <div className="space-y-3">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
            <span className="text-xs font-medium text-gray-400 sm:w-40 flex-shrink-0">{key}</span>
            <span className="text-sm text-brand-dark">{value}</span>
          </div>
        ))}
      </div>

      {attachments && attachments.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <FiPaperclip className="text-gray-400" size={14} />
            <span className="text-xs font-medium text-gray-400">অ্যাটাচড ফাইলস</span>
          </div>
          <div className="space-y-2">
            {attachments.map((file, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-sm text-brand-dark truncate">{file.name}</span>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{file.size}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
