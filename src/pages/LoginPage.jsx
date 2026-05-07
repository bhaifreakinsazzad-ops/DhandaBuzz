import { Link } from 'react-router-dom'
import { FiShield, FiZap, FiStar } from 'react-icons/fi'
import LoginForm from '../components/auth/LoginForm'
import { BRAND_NAME } from '../data/constants'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2">
      {/* Left — brand panel (desktop only) */}
      <div className="hidden lg:flex flex-col justify-between gradient-hero px-12 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="blob bg-brand-primary/30 w-80 h-80 -top-20 -left-20" />
        <div className="blob bg-brand-accent/20 w-64 h-64 bottom-10 right-0" style={{ animationDelay: '4s' }} />

        <div className="relative">
          <Link to="/" className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt={BRAND_NAME} className="w-10 h-10" />
            <span className="font-heading font-black text-xl text-white">
              Dhanda<span className="text-brand-primary">Buzz</span>
            </span>
          </Link>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl font-black text-white font-heading leading-tight mb-4">
              আপনার ব্যবসার<br />
              <span className="gradient-text-premium">Digital HQ-তে</span><br />
              স্বাগতম
            </h2>
            <p className="text-gray-400 text-lg">
              অর্ডার ট্র্যাক করুন, Wallet ম্যানেজ করুন, সার্ভিস নিন — এক জায়গা থেকে।
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: FiZap, text: 'Real-time order tracking ও delivery updates' },
              { icon: FiShield, text: 'নিরাপদ Maal Wallet — bKash দিয়ে রিচার্জ' },
              { icon: FiStar, text: 'AI + Human Expert সাপোর্ট ২৪/৭' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center shrink-0">
                    <Icon className="text-brand-primary" size={16} />
                  </div>
                  <span className="text-gray-300 text-sm">{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative glass-strong rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-2xl shrink-0">
            🧑‍💼
          </div>
          <div>
            <p className="text-white text-sm font-semibold">"মাত্র ৩ দিনে ওয়েবসাইট পেয়েছি!"</p>
            <p className="text-gray-400 text-xs mt-0.5">— রহিম সাহেব, Dhaka</p>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-brand-light">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/">
              <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt={BRAND_NAME} className="w-14 h-14 mx-auto mb-3" />
            </Link>
            <h1 className="text-2xl font-black font-heading text-brand-dark">
              {BRAND_NAME}-তে Login করুন
            </h1>
            <p className="text-gray-500 text-sm mt-1">আপনার ড্যাশবোর্ডে প্রবেশ করুন</p>
          </div>

          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-black font-heading text-brand-dark">আবার স্বাগতম!</h1>
            <p className="text-gray-500 mt-1">আপনার অ্যাকাউন্টে লগইন করুন</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 p-6 sm:p-8">
            <LoginForm />
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            লগইন করে আপনি আমাদের{' '}
            <span className="text-brand-primary cursor-default">Terms of Service</span> এবং{' '}
            <span className="text-brand-primary cursor-default">Privacy Policy</span> মেনে নিচ্ছেন।
          </p>
        </div>
      </div>
    </div>
  )
}
