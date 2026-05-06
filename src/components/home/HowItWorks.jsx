import { FiUserPlus, FiCreditCard, FiSend, FiCheckCircle } from 'react-icons/fi'

const steps = [
  {
    icon: FiUserPlus,
    title: 'অ্যাকাউন্ট খুলুন',
    description: 'ফ্রি রেজিস্ট্রেশন করুন এবং ১০০ Maal বোনাস পান।',
    step: '01',
    color: 'from-brand-primary to-brand-secondary',
    glow: 'shadow-glow-md',
  },
  {
    icon: FiCreditCard,
    title: 'Wallet রিচার্জ করুন',
    description: 'bKash দিয়ে মিনিমাম ৳৫০ থেকে রিচার্জ করুন।',
    step: '02',
    color: 'from-brand-secondary to-brand-accent',
    glow: 'shadow-glow-accent',
  },
  {
    icon: FiSend,
    title: 'সার্ভিস অর্ডার করুন',
    description: 'আপনার প্রয়োজন অনুযায়ী সার্ভিস সিলেক্ট করে অর্ডার দিন।',
    step: '03',
    color: 'from-brand-accent to-brand-neon',
    glow: 'shadow-glow-md',
  },
  {
    icon: FiCheckCircle,
    title: 'ডেলিভারি নিন',
    description: 'প্রিভিউ দেখুন, ফিডব্যাক দিন এবং ফাইনাল ডেলিভারি নিন।',
    step: '04',
    color: 'from-brand-neon to-brand-primary',
    glow: 'shadow-glow-md',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 border border-brand-primary/20">
            ⚡ Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-brand-dark mb-4 leading-tight">
            মাত্র <span className="gradient-text-premium">৪টি ধাপে</span> শুরু করুন
          </h2>
          <p className="text-gray-500 text-lg">
            সাইনআপ থেকে ডেলিভারি — সব কিছু পরিষ্কার এবং সহজ।
          </p>
        </div>

        {/* Timeline grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Connecting dotted line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] border-t-2 border-dashed border-brand-primary/30 -z-0" />

          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="relative text-center group animate-slide-up opacity-0-init"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Number bubble */}
                <div className="relative mx-auto mb-6 w-fit">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity scale-150`} />
                  <div className={`relative w-24 h-24 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${item.glow} shadow-2xl`}>
                    <Icon className="text-white" size={36} strokeWidth={2.5} />
                  </div>
                  <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-brand-dark text-sm font-black flex items-center justify-center font-heading shadow-xl border-2 border-brand-primary/20 group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-primary transition-all">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[220px] mx-auto">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
