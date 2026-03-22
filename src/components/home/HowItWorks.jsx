import { FiUserPlus, FiCreditCard, FiSend, FiCheckCircle } from 'react-icons/fi'

const steps = [
  {
    icon: FiUserPlus,
    title: 'অ্যাকাউন্ট খুলুন',
    description: 'ফ্রি রেজিস্ট্রেশন করুন এবং ১০০ Maal বোনাস পান।',
    step: '০১',
  },
  {
    icon: FiCreditCard,
    title: 'Wallet রিচার্জ করুন',
    description: 'bKash দিয়ে মিনিমাম ৳৫০ থেকে রিচার্জ করুন।',
    step: '০২',
  },
  {
    icon: FiSend,
    title: 'সার্ভিস অর্ডার করুন',
    description: 'আপনার প্রয়োজন অনুযায়ী সার্ভিস সিলেক্ট করে অর্ডার দিন।',
    step: '০৩',
  },
  {
    icon: FiCheckCircle,
    title: 'ডেলিভারি নিন',
    description: 'প্রিভিউ দেখুন, ফিডব্যাক দিন এবং ফাইনাল ডেলিভারি নিন।',
    step: '০৪',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-dark mb-3">
            কিভাবে কাজ করে?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            মাত্র ৪টি সহজ স্টেপে আপনার ব্যবসার ডিজিটাল সাপোর্ট শুরু করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="text-center group">
                <div className="relative mx-auto mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center mx-auto group-hover:bg-brand-primary/10 transition-colors">
                    <Icon className="text-brand-primary" size={28} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center font-heading">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
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
