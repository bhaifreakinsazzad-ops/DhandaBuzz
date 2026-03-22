import { FiX } from 'react-icons/fi'

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-heading">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
