import { useNavigate } from 'react-router-dom'
import { FiGift, FiArrowRight, FiZap, FiStar } from 'react-icons/fi'
import Button from '../ui/Button'

export default function BonusHighlight() {
  const navigate = useNavigate()

  const ticker = ['🎁 ১০০ Maal Free', '⚡ Instant Activation', '💰 ৳50 থেকে রিচার্জ', '🚀 No Hidden Charges', '⭐ AI + Human Support']

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-[length:200%_200%] animate-gradient-shift">
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />

      {/* Edge glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-brand-accent/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-brand-neon/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-white/40 rounded-2xl blur-xl animate-pulse-glow" />
              <div className="relative w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-glow-accent">
                <FiGift className="text-white" size={30} />
                <FiStar className="absolute -top-1 -right-1 text-brand-accent fill-brand-accent" size={14} />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-heading flex items-center gap-2 flex-wrap justify-center md:justify-start">
                সাইনআপ বোনাস
                <span className="bg-brand-dark text-brand-accent px-3 py-0.5 rounded-full text-base sm:text-lg shadow-lg whitespace-nowrap">১০০ Maal ফ্রি!</span>
              </h3>
              <p className="text-white/90 text-sm mt-1.5 flex items-center gap-2 justify-center md:justify-start">
                <FiZap className="text-brand-accent" size={14} />
                মাত্র ৩০ সেকেন্ডে রেজিস্টার করুন — Instant Activation
              </p>
            </div>
          </div>

          <Button
            variant="dark"
            size="lg"
            onClick={() => navigate('/register')}
            className="whitespace-nowrap shadow-xl group shine"
          >
            এখনই শুরু করুন
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Marquee ticker */}
        <div className="mt-6 pt-5 border-t border-white/20 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...ticker, ...ticker, ...ticker].map((item, i) => (
              <span key={i} className="text-white/90 text-sm font-semibold tracking-wide flex items-center gap-2 shrink-0">
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
