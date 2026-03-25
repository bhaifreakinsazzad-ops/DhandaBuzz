import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import Button from '../ui/Button'
import LiveCallButton from '../ui/LiveCallButton'
import { BRAND_NAME } from '../../data/constants'

export default function HeroSection() {
  const navigate = useNavigate()

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="gradient-hero relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-brand-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-brand-neon/5 rounded-full blur-[150px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-dots opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
            <span className="text-brand-accent text-sm font-semibold tracking-wide">
              🇧🇩 বাংলাদেশের প্রথম AI-Powered Digital Agency
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6 font-heading animate-slide-up">
            গ্যারান্টি সহকারে{' '}
            <br className="hidden sm:block" />
            আপনার ব্যবসার{' '}
            <span className="gradient-text-green">
              ডিজিটাল গ্রোথ
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            কনটেন্ট, ওয়েবসাইট, বিজ্ঞাপন, ট্র্যাকিং — সব AI-powered সাপোর্ট এক পোর্টাল থেকে।
            <br />
            <span className="text-white font-semibold">{BRAND_NAME}</span> — আপনার ব্যবসার গ্রোথ পার্টনার।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" onClick={() => navigate('/register')} className="group">
              ফ্রি অ্যাকাউন্ট খুলুন
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline-white"
              size="lg"
              onClick={scrollToHowItWorks}
              className="group"
            >
              <FiPlay size={16} className="group-hover:scale-110 transition-transform" />
              কিভাবে কাজ করে?
            </Button>
          </div>

          {/* AI Call Button */}
          <div className="mt-8 animate-slide-up flex justify-center" style={{ animationDelay: '0.6s' }}>
            <LiveCallButton variant="hero" />
          </div>

          {/* Preview link */}
          <p className="text-gray-500 text-sm mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            অ্যাকাউন্ট ছাড়াই দেখুন →{' '}
            <Link to="/preview" className="text-brand-primary hover:underline font-medium">Dashboard Preview</Link>
          </p>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
              <span>সাইনআপে ১০০ Maal ফ্রি</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
              <span>মিনিমাম রিচার্জ ৳৫০</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary" />
              <span>bKash পেমেন্ট সাপোর্ট</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-neon" />
              <span>AI + Human Expert Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-light to-transparent" />
    </section>
  )
}
