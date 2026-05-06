import { useEffect, useRef, useState } from 'react'
import { FiShield, FiClock, FiUsers, FiAward, FiTrendingUp, FiStar } from 'react-icons/fi'

const trustItems = [
  {
    icon: FiShield,
    title: 'নিরাপদ পেমেন্ট',
    description: 'bKash-এর মাধ্যমে সুরক্ষিত লেনদেন।',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiClock,
    title: 'দ্রুত ডেলিভারি',
    description: '২৪-৪৮ ঘণ্টায় কাজ ডেলিভারি।',
    gradient: 'from-brand-primary to-brand-secondary',
  },
  {
    icon: FiUsers,
    title: 'এক্সপার্ট টিম',
    description: 'AI + হিউম্যান এক্সপার্ট সাপোর্ট।',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: FiAward,
    title: 'কোয়ালিটি গ্যারান্টি',
    description: 'অ্যাপ্রুভ না করা পর্যন্ত আনলিমিটেড রিভিশন।',
    gradient: 'from-purple-500 to-pink-500',
  },
]

const stats = [
  { value: 500, suffix: '+', label: 'সফল প্রজেক্ট', icon: FiTrendingUp, color: 'text-brand-primary' },
  { value: 250, suffix: '+', label: 'খুশি ক্লায়েন্ট', icon: FiUsers, color: 'text-brand-accent' },
  { value: 4.9, suffix: '★', label: 'গড় রেটিং', icon: FiStar, color: 'text-amber-400' },
  { value: 24, suffix: 'h', label: 'দ্রুত ডেলিভারি', icon: FiClock, color: 'text-brand-neon' },
]

const testimonials = [
  {
    name: 'রহিম উদ্দিন',
    role: 'Restaurant Owner, Dhaka',
    text: 'মাত্র ৩ দিনে পুরো ওয়েবসাইট ডেলিভার পেয়েছি। আগে যা ২ মাসেও পাইনি!',
    avatar: '🧑‍🍳',
  },
  {
    name: 'সানজিদা খান',
    role: 'E-commerce, Chittagong',
    text: 'AdScale Engine দিয়ে আমার Facebook Ads-এর ROAS ৩x বেড়েছে। অসাধারণ!',
    avatar: '👩‍💼',
  },
  {
    name: 'আশিকুর রহমান',
    role: 'Tech Startup, Sylhet',
    text: 'AI অডিট রিপোর্ট পড়ে যা শিখেছি, তা ১০ লাখ টাকার কনসালটেন্সির সমান।',
    avatar: '🧑‍💻',
  },
]

function useCounter(target, duration = 1500, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const isFloat = target % 1 !== 0
    let raf
    function tick(now) {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = target * eased
      setVal(isFloat ? Number(v.toFixed(1)) : Math.floor(v))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return val
}

function StatCard({ stat, start }) {
  const Icon = stat.icon
  const value = useCounter(stat.value, 1800, start)
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-dark border border-brand-dark-border mb-3 group-hover:border-brand-primary/50 group-hover:scale-110 transition-all">
        <Icon className={`${stat.color}`} size={24} />
      </div>
      <div className={`text-4xl sm:text-5xl font-black font-heading ${stat.color} tabular-nums`}>
        {stat.value % 1 !== 0 ? value : value}{stat.suffix}
      </div>
      <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
    </div>
  )
}

export default function TrustSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why-us" className="relative bg-brand-darker py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 glass-strong text-brand-accent text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 border border-brand-accent/30">
            <FiAward size={12} /> Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4 leading-tight">
            ৫০০+ ব্যবসা যে কারণে <span className="gradient-text-premium">DhandaBuzz</span> বেছে নিয়েছে
          </h2>
          <p className="text-gray-400 text-lg">
            বিশ্বাসযোগ্য, পেশাদার এবং সাশ্রয়ী — আপনার ব্যবসার সেরা ডিজিটাল পার্টনার।
          </p>
        </div>

        {/* Animated stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 glass-card rounded-3xl p-8 sm:p-10 shadow-premium">
          {stats.map((s, i) => <StatCard key={i} stat={s} start={visible} />)}
        </div>

        {/* Trust grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group relative animate-slide-up opacity-0-init"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent opacity-0 group-hover:opacity-50 blur transition-opacity" />
                <div className="relative bg-brand-dark-card border border-brand-dark-border rounded-2xl p-6 h-full hover:border-brand-primary/40 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg`}>
                    <Icon className="text-white" size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-white mb-1 text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl p-6 hover:border-brand-primary/40 transition-colors animate-slide-up opacity-0-init"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} className="text-brand-accent fill-brand-accent" size={14} />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-dark-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-2xl shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
