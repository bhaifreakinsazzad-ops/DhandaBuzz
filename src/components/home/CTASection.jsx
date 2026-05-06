import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiZap, FiShoppingBag, FiUser, FiCheckCircle } from 'react-icons/fi'
import Button from '../ui/Button'
import LiveCallButton from '../ui/LiveCallButton'

const paths = [
  {
    icon: FiZap,
    title: 'Hire Us',
    bnTitle: 'আমাদের দিয়ে করান',
    description: 'Custom প্রজেক্ট, Audit, ও Strategy Consultation',
    cta: 'Start a Project',
    bnCta: 'প্রজেক্ট শুরু করুন',
    href: '/register',
    color: 'from-brand-primary to-brand-secondary',
    glow: 'shadow-glow-md',
  },
  {
    icon: FiShoppingBag,
    title: 'Buy Products',
    bnTitle: 'প্রোডাক্ট কিনুন',
    description: 'Templates, Prompts, Automations — Instant Download',
    cta: 'Browse Marketplace',
    bnCta: 'মার্কেটপ্লেস দেখুন',
    href: '/services',
    color: 'from-brand-accent to-brand-neon',
    glow: 'shadow-glow-accent',
  },
  {
    icon: FiUser,
    title: 'Open Dashboard',
    bnTitle: 'ড্যাশবোর্ড খুলুন',
    description: 'লগইন করে আপনার অর্ডার ও Wallet দেখুন',
    cta: 'Login to Dashboard',
    bnCta: 'লগইন করুন',
    href: '/login',
    color: 'from-purple-500 to-pink-500',
    glow: 'shadow-glow-md',
  },
]

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="relative py-24 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 paths */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 border border-brand-primary/20">
            <FiArrowRight size={12} /> Choose Your Path
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-brand-dark mb-4 leading-tight">
            আপনি কীভাবে শুরু করতে চান?
          </h2>
          <p className="text-gray-500 text-lg">
            যেকোনো পথ বেছে নিন — আমরা পাশে আছি।
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {paths.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                onClick={() => navigate(p.href)}
                className="group relative cursor-pointer rounded-3xl animate-slide-up opacity-0-init"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-60 blur-md transition-opacity`} />

                <div className="relative bg-brand-darker text-white rounded-3xl p-8 h-full overflow-hidden border border-brand-dark-border group-hover:border-brand-primary/40 transition-colors">
                  <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${p.color} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity`} />

                  <div className="relative">
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${p.glow} shadow-2xl`}>
                      <Icon className="text-white" size={28} />
                    </div>

                    <div className="text-xs text-brand-accent font-bold tracking-wider uppercase mb-1">{p.title}</div>
                    <h3 className="font-heading font-black text-2xl mb-3">{p.bnTitle}</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">{p.description}</p>

                    <div className="flex items-center justify-between pt-5 border-t border-brand-dark-border">
                      <span className="text-brand-primary font-bold text-sm group-hover:text-brand-accent transition-colors">
                        {p.bnCta}
                      </span>
                      <div className={`w-9 h-9 rounded-full bg-brand-dark-card border border-brand-primary/30 flex items-center justify-center group-hover:bg-brand-primary group-hover:rotate-45 transition-all`}>
                        <FiArrowRight className="text-brand-primary group-hover:text-white transition-colors" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Final CTA banner */}
        <div className="relative gradient-hero rounded-3xl p-10 sm:p-14 lg:p-20 text-center overflow-hidden shadow-premium">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-mesh opacity-50" />
          <div className="blob bg-brand-primary/30 w-[500px] h-[500px] top-[-25%] left-[10%]" />
          <div className="blob bg-brand-accent/20 w-[400px] h-[400px] bottom-[-20%] right-[10%]" style={{ animationDelay: '4s' }} />

          <div className="relative">
            <div className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-neon" />
              </span>
              <span className="text-brand-accent text-xs font-semibold tracking-wide uppercase">আজই যোগ দিন ৫০০+ ব্যবসার সাথে</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white font-heading mb-5 leading-[1.1]">
              আজই খুলুন আপনার <br className="hidden sm:block" />
              <span className="gradient-text-premium">Business Account</span>
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-10 text-lg">
              সাইনআপ করলেই পাচ্ছেন <span className="text-brand-accent font-black">১০০ Maal ফ্রি ক্রেডিট</span>।
              <br />কোনো হিডেন চার্জ নেই, কোনো রিস্ক নেই।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="accent" size="xl" onClick={() => navigate('/register')} className="group shine animate-pulse-glow">
                <FiZap className="group-hover:rotate-12 transition-transform" />
                ফ্রি অ্যাকাউন্ট তৈরি করুন
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex justify-center">
              <LiveCallButton variant="hero" />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {['No Credit Card Required', 'Instant Activation', 'Cancel Anytime', '24/7 Support'].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FiCheckCircle className="text-brand-primary" size={14} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
