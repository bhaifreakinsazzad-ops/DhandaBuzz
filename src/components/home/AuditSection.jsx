import { useEffect, useState } from 'react'
import { FiCheckCircle, FiZap, FiClock, FiTrendingUp, FiShield } from 'react-icons/fi'
import Button from '../ui/Button'
import AuditModal from './AuditModal'
import { AUDIT_PRICE_BDT } from '../../data/constants'

const deliverables = [
  { icon: FiTrendingUp, text: 'আপনার ব্যবসার সম্পূর্ণ Digital Presence বিশ্লেষণ' },
  { icon: FiShield, text: 'প্রতিযোগীদের তুলনায় আপনি কোথায় পিছিয়ে আছেন' },
  { icon: FiZap, text: 'সামাজিক মিডিয়া ও Website-এর দুর্বলতা চিহ্নিত' },
  { icon: FiCheckCircle, text: 'AI-powered ৯০ দিনের Growth Roadmap' },
  { icon: FiClock, text: 'বিনামূল্যে ১৫ মিনিটের কৌশল পরামর্শ সেশন' },
]

function getCountdown() {
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  const diff = Math.max(0, end - now)
  return {
    h: Math.floor(diff / 3.6e6),
    m: Math.floor((diff % 3.6e6) / 6e4),
    s: Math.floor((diff % 6e4) / 1e3),
  }
}

export default function AuditSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [time, setTime] = useState(getCountdown())

  useEffect(() => {
    const t = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(t)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  return (
    <section className="relative bg-brand-darker py-24 sm:py-28 px-4 overflow-hidden">
      {/* Background mesh blobs */}
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="blob bg-brand-accent/15 w-[400px] h-[400px] top-[20%] left-[10%]" />
      <div className="blob bg-brand-secondary/15 w-[400px] h-[400px] bottom-[10%] right-[10%]" style={{ animationDelay: '4s' }} />

      <div className="relative max-w-5xl mx-auto">
        {/* Top countdown bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full animate-pulse">
            <FiClock size={12} /> অফার শেষ হচ্ছে আজ মধ্যরাতে
          </span>
          <div className="flex items-center gap-2">
            {[
              { l: 'HRS', v: pad(time.h) },
              { l: 'MIN', v: pad(time.m) },
              { l: 'SEC', v: pad(time.s) },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center bg-brand-dark-card border border-brand-primary/30 rounded-xl px-3 py-1.5 min-w-[54px] shadow-glow-sm">
                <span className="text-white font-black text-xl font-heading tabular-nums">{t.v}</span>
                <span className="text-[9px] text-gray-500 tracking-wider">{t.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10 animate-slide-up opacity-0-init">
          <span className="inline-flex items-center gap-2 glass-strong text-brand-accent text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 border border-brand-accent/30">
            <FiZap size={12} /> সীমিত সময়ের অফার
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white leading-[1.1] mb-4">
            পান <span className="gradient-text-premium">AI Business Audit</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            মাত্র ৳{AUDIT_PRICE_BDT}-তে জানুন কোথায় টাকা নষ্ট হচ্ছে এবং কীভাবে দ্রুত বিক্রি বাড়ানো যায়।
          </p>
        </div>

        {/* Main offer card */}
        <div className="relative group animate-scale-in opacity-0-init">
          {/* Animated gradient halo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-neon rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity animate-gradient-shift bg-[length:200%_200%]" />

          <div className="relative gradient-border-animated rounded-3xl p-8 md:p-12 grid md:grid-cols-5 gap-8 items-center bg-brand-dark-card overflow-hidden">
            {/* Deliverables */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-primary/40" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-primary">আপনি যা পাচ্ছেন</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-primary/40" />
              </div>
              <ul className="space-y-3">
                {deliverables.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all group/item animate-slide-up opacity-0-init"
                      style={{ animationDelay: `${0.1 * i}s` }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-primary/30 to-brand-secondary/20 border border-brand-primary/30 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                        <Icon className="text-brand-primary" size={16} />
                      </div>
                      <p className="text-gray-200 text-sm pt-1.5">{item.text}</p>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Pricing block */}
            <div className="md:col-span-2 flex flex-col items-center text-center gap-5 md:border-l md:border-brand-dark-border md:pl-8">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">আজকের বিশেষ মূল্য</div>
                <div className="flex items-baseline gap-2 justify-center">
                  <span className="text-gray-500 text-xl line-through">৳২,০০০</span>
                  <span className="bg-red-500/20 text-red-300 text-[10px] px-2 py-0.5 rounded-md font-bold">৭৫% OFF</span>
                </div>
                <div className="text-7xl font-black gradient-text-premium leading-none my-1 font-heading neon-text">৳{AUDIT_PRICE_BDT}</div>
                <div className="text-gray-400 text-xs">একবারের পেমেন্ট</div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full animate-pulse-glow shine group"
                onClick={() => setModalOpen(true)}
              >
                <FiZap className="group-hover:rotate-12 transition-transform" />
                এখনই বুক করুন
              </Button>

              <div className="flex flex-col gap-2 text-xs text-gray-400">
                <div className="flex items-center gap-1.5 justify-center">
                  <FiShield className="text-brand-primary" size={12} />
                  bKash পেমেন্ট • ১০০% নিরাপদ
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <FiClock className="text-brand-accent" size={12} />
                  ২৪ ঘণ্টায় ডেলিভারি
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
