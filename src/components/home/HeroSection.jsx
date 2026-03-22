import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiZap } from 'react-icons/fi'
import Button from '../ui/Button'
import { BRAND_NAME } from '../../data/constants'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <FiZap className="text-brand-accent" size={16} />
            <span className="text-brand-accent text-sm font-medium">
              AI-Powered Business Support
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 font-heading">
            আপনার অনলাইন ব্যবসার{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-300">
              ডিজিটাল পার্টনার
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            কনটেন্ট, ওয়েবসাইট, বিজ্ঞাপন, ট্র্যাকিং — সব সাপোর্ট এক পোর্টাল থেকে।{' '}
            <span className="text-white font-semibold">{BRAND_NAME}</span> আপনার ব্যবসার গ্রোথ পার্টনার।
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              ফ্রি অ্যাকাউন্ট খুলুন
              <FiArrowRight />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              কিভাবে কাজ করে?
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-secondary" />
              সাইনআপে ১০০ Maal ফ্রি
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent" />
              মিনিমাম রিচার্জ ৳৫০
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-primary" />
              bKash পেমেন্ট সাপোর্ট
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
