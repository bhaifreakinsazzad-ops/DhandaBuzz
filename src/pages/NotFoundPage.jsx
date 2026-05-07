import { Link } from 'react-router-dom'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import { BRAND_NAME } from '../data/constants'

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative mb-6 inline-block">
          <span className="text-[120px] font-black font-heading leading-none gradient-text-premium select-none">
            404
          </span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark mb-3">
          পেজটি খুঁজে পাওয়া গেল না
        </h1>
        <p className="text-gray-500 mb-8">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে বা ঠিকানা পরিবর্তন হয়েছে।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <FiHome size={16} />
            হোমে ফিরে যান
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft size={16} />
            আগের পেজে যান
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-8">
          সমস্যা হলে{' '}
          <a href="https://wa.me/8801778307704" className="text-brand-primary hover:underline">
            WhatsApp-এ যোগাযোগ করুন
          </a>
        </p>
      </div>
    </div>
  )
}
