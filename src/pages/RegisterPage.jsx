import { Link } from 'react-router-dom'
import { FiGift, FiCheckCircle, FiUsers } from 'react-icons/fi'
import RegisterForm from '../components/auth/RegisterForm'
import { BRAND_NAME, SIGNUP_BONUS } from '../data/constants'

const perks = [
  { icon: FiGift, text: `${SIGNUP_BONUS} Maal বোনাস — সাইনআপেই পাচ্ছেন` },
  { icon: FiCheckCircle, text: 'কোনো হিডেন চার্জ নেই, বাতিল করার সুবিধা আছে' },
  { icon: FiUsers, text: '৫০০+ ব্যবসার ভরসার পার্টনার' },
]

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col justify-between gradient-hero px-12 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="blob bg-brand-primary/30 w-80 h-80 -top-20 -left-20" />
        <div className="blob bg-brand-accent/20 w-72 h-72 bottom-0 right-10" style={{ animationDelay: '5s' }} />

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
            <div className="inline-flex items-center gap-2 bg-brand-primary/20 border border-brand-primary/30 rounded-full px-4 py-1.5 mb-4">
              <FiGift className="text-brand-accent" size={14} />
              <span className="text-brand-accent text-xs font-bold tracking-wider uppercase">সাইনআপ বোনাস</span>
            </div>
            <h2 className="text-4xl font-black text-white font-heading leading-tight mb-4">
              শুরু করুন<br />
              <span className="gradient-text-premium">{SIGNUP_BONUS} Maal ফ্রি</span><br />
              নিয়ে
            </h2>
            <p className="text-gray-400 text-lg">
              ৩০ সেকেন্ডে অ্যাকাউন্ট খুলুন। কোনো ক্রেডিট কার্ড লাগবে না।
            </p>
          </div>

          <div className="space-y-4">
            {perks.map((item, i) => {
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

          {/* Live signups */}
          <div className="glass-strong rounded-2xl px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
              <span className="text-brand-neon text-xs font-semibold">এখন অনলাইন</span>
            </div>
            <div className="flex -space-x-2">
              {['🧑‍💼', '👩‍💻', '🧑‍🍳', '👨‍🎨', '👩‍🏫'].map((emoji, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-brand-dark-card border-2 border-brand-darker flex items-center justify-center text-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-2">আজ ১৮ জন নতুন ব্যবসা যোগ দিয়েছেন</p>
          </div>
        </div>

        <div className="relative" />
      </div>

      {/* Right — form */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-brand-light">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/">
              <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt={BRAND_NAME} className="w-14 h-14 mx-auto mb-3" />
            </Link>
            <h1 className="text-2xl font-black font-heading text-brand-dark">ফ্রি অ্যাকাউন্ট তৈরি করুন</h1>
            <p className="text-gray-500 text-sm mt-1">{SIGNUP_BONUS} Maal বোনাস সহ শুরু করুন</p>
          </div>

          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-black font-heading text-brand-dark">ফ্রি অ্যাকাউন্ট খুলুন</h1>
            <p className="text-gray-500 mt-1">মাত্র ৩০ সেকেন্ডে শুরু করুন</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 p-6 sm:p-8">
            <RegisterForm />
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            রেজিস্টার করে আপনি আমাদের{' '}
            <span className="text-brand-primary cursor-default">Terms of Service</span> মেনে নিচ্ছেন।
          </p>
        </div>
      </div>
    </div>
  )
}
