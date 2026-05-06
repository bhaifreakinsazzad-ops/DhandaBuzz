import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiZap, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'
import Button from '../ui/Button'
import LiveCallButton from '../ui/LiveCallButton'
import { BRAND_NAME } from '../../data/constants'

const rotatingWords = ['ডিজিটাল গ্রোথ', 'বিক্রি বৃদ্ধি', 'ব্র্যান্ড পরিচিতি', 'অনলাইন সফলতা']

export default function HeroSection() {
  const navigate = useNavigate()
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % rotatingWords.length), 2800)
    return () => clearInterval(t)
  }, [])

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="gradient-hero relative overflow-hidden min-h-screen flex items-center">
      {/* Animated mesh blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="blob bg-brand-primary/30 w-[480px] h-[480px] top-[-10%] left-[-5%]" style={{ animationDelay: '0s' }} />
        <div className="blob bg-brand-secondary/20 w-[520px] h-[520px] bottom-[-15%] right-[-10%]" style={{ animationDelay: '4s' }} />
        <div className="blob bg-brand-accent/15 w-[400px] h-[400px] top-[40%] left-[55%]" style={{ animationDelay: '8s' }} />
        <div className="absolute inset-0 bg-dots opacity-30" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-brand-neon/60 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-strong rounded-full px-5 py-2.5 mb-6 animate-fade-in shadow-glow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-neon" />
              </span>
              <span className="text-brand-accent text-xs sm:text-sm font-semibold tracking-wide">
                🇧🇩 বাংলাদেশের প্রথম AI-Powered Digital Agency
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 font-heading animate-slide-up">
              গ্যারান্টি সহকারে<br className="hidden sm:block" />
              আপনার ব্যবসার{' '}
              <span className="relative inline-block">
                <span className="gradient-text-premium">{rotatingWords[wordIdx]}</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-neon rounded-full opacity-60 animate-gradient-x" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-up animation-delay-200 opacity-0-init">
              কনটেন্ট, ওয়েবসাইট, বিজ্ঞাপন, ট্র্যাকিং — সব AI-powered সাপোর্ট এক পোর্টাল থেকে।{' '}
              <span className="text-white font-semibold">{BRAND_NAME}</span> — আপনার গ্রোথ পার্টনার।
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-400 opacity-0-init">
              <Button size="lg" onClick={() => navigate('/register')} className="group shine animate-pulse-glow">
                <FiZap className="group-hover:rotate-12 transition-transform" />
                ফ্রি অ্যাকাউন্ট খুলুন
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline-white" size="lg" onClick={scrollToHowItWorks} className="group">
                <FiPlay size={16} className="group-hover:scale-110 transition-transform" />
                কিভাবে কাজ করে?
              </Button>
            </div>

            {/* AI Call */}
            <div className="mt-6 flex justify-center lg:justify-start animate-slide-up animation-delay-600 opacity-0-init">
              <LiveCallButton variant="hero" />
            </div>

            {/* Trust pills */}
            <div className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 animate-fade-in animation-delay-800 opacity-0-init justify-center lg:justify-start">
              {[
                { color: 'bg-brand-primary', text: 'সাইনআপে ১০০ Maal ফ্রি' },
                { color: 'bg-brand-accent', text: 'মিনিমাম রিচার্জ ৳৫০' },
                { color: 'bg-brand-secondary', text: 'bKash পেমেন্ট' },
                { color: 'bg-brand-neon', text: 'AI + Human Support' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 glass rounded-full px-3 py-1.5">
                  <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Preview link */}
            <p className="text-gray-400 text-sm mt-6 animate-fade-in animation-delay-1000 opacity-0-init">
              অ্যাকাউন্ট ছাড়াই দেখুন →{' '}
              <Link to="/preview" className="text-brand-primary hover:text-brand-accent transition-colors font-semibold underline-offset-4 hover:underline">
                Dashboard Preview
              </Link>
            </p>
          </div>

          {/* Right: animated dashboard mockup */}
          <div className="lg:col-span-5 perspective-container animate-scale-in animation-delay-400 opacity-0-init">
            <div className="relative tilt-card">
              {/* Glow halo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/30 via-brand-accent/20 to-brand-neon/30 rounded-3xl blur-2xl animate-pulse-glow" />

              {/* Mockup card */}
              <div className="relative glass-card rounded-3xl p-6 shadow-premium overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-brand-neon/70" />
                  <div className="ml-3 px-3 py-1 bg-black/30 rounded-md text-[10px] text-gray-400 font-mono flex-1 truncate">
                    dhandabuzz.online/dashboard
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/10 border border-brand-primary/20 rounded-xl p-3">
                    <div className="text-xs text-gray-400">Wallet</div>
                    <div className="text-2xl font-black text-white font-heading mt-1">৳1,250</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-brand-neon">
                      <FiTrendingUp size={10} /> +12% this week
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-brand-accent/20 to-brand-neon/10 border border-brand-accent/20 rounded-xl p-3">
                    <div className="text-xs text-gray-400">Active Orders</div>
                    <div className="text-2xl font-black text-white font-heading mt-1">7</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-brand-accent">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" /> 3 in review
                    </div>
                  </div>
                </div>

                {/* Activity feed */}
                <div className="space-y-2.5">
                  {[
                    { color: 'bg-brand-primary', text: 'Web Launch Lab — Order delivered', time: '2 min ago' },
                    { color: 'bg-brand-accent', text: 'Creative Engine — Preview ready', time: '12 min ago' },
                    { color: 'bg-brand-secondary', text: 'AdScale Engine — Setup complete', time: '1 hr ago' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-brand-primary/30 transition-colors animate-slide-up"
                      style={{ animationDelay: `${0.8 + i * 0.15}s` }}
                    >
                      <div className={`w-7 h-7 rounded-lg ${item.color}/20 border border-current/30 flex items-center justify-center shrink-0`}>
                        <FiCheckCircle className="text-white" size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-white truncate">{item.text}</div>
                        <div className="text-[10px] text-gray-500">{item.time}</div>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    </div>
                  ))}
                </div>

                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-brand-neon/10 border border-brand-neon/30 rounded-full px-2 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                  <span className="text-[10px] text-brand-neon font-bold">LIVE</span>
                </div>
              </div>

              {/* Floating chips */}
              <div className="hidden md:block absolute -top-6 -left-6 glass-strong rounded-2xl px-4 py-3 shadow-glow-md animate-float">
                <div className="text-xs text-gray-400">Today's Sales</div>
                <div className="text-lg font-black text-brand-accent font-heading">৳18,420</div>
              </div>
              <div className="hidden md:block absolute -bottom-6 -right-6 glass-strong rounded-2xl px-4 py-3 shadow-glow-md animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                    <FiZap className="text-white" size={14} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">AI Agent</div>
                    <div className="text-xs text-white font-bold">Online Now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-light to-transparent" />
    </section>
  )
}
