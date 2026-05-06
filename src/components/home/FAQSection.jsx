import { useState } from 'react'
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi'

const faqs = [
  {
    q: 'DhandaBuzz কি সত্যিই বিশ্বাসযোগ্য? টাকা পাঠালে কি কাজ পাব?',
    a: 'হ্যাঁ! আমাদের ৫০০+ সফল প্রজেক্ট ইতিমধ্যে ডেলিভার হয়েছে। প্রতিটি অর্ডারে আপনি প্রথমে preview দেখবেন, অ্যাপ্রুভ করার পর ফাইনাল ডেলিভারি পাবেন। কাজ পছন্দ না হলে আনলিমিটেড রিভিশন।',
  },
  {
    q: 'Maal কী? এটা কীভাবে কাজ করে?',
    a: 'Maal হল আমাদের ভার্চুয়াল কারেন্সি। ১ Maal = ১ টাকা। আপনি bKash দিয়ে রিচার্জ করেন, তারপর যেকোনো সার্ভিস অর্ডার দেওয়ার সময় Maal দিয়ে পেমেন্ট হয়। সাইনআপে ১০০ Maal ফ্রি পাবেন।',
  },
  {
    q: 'কত দিনে ডেলিভারি পাব?',
    a: 'Creative Engine: ১২-২৪ ঘণ্টা। Web Launch Lab: ৩-৭ দিন (প্যাকেজ অনুযায়ী)। AdScale Engine: ২৪-৪৮ ঘণ্টা। Audit রিপোর্ট: ২৪ ঘণ্টা।',
  },
  {
    q: 'কাজ পছন্দ না হলে কী হবে?',
    a: 'আমাদের কোয়ালিটি গ্যারান্টি — আপনি অ্যাপ্রুভ না করা পর্যন্ত আনলিমিটেড রিভিশন পাবেন। প্রিভিউ stage-এ মেজর change request করতে পারেন কোনো অতিরিক্ত চার্জ ছাড়াই।',
  },
  {
    q: 'পেমেন্ট কীভাবে করব?',
    a: 'আমরা বর্তমানে bKash গ্রহণ করি। ভবিষ্যতে Nagad, Rocket, Card Payment, এবং Bank Transfer যুক্ত হবে। সব পেমেন্ট ১০০% নিরাপদ এবং ট্র্যাকিং সহ।',
  },
  {
    q: 'AI দিয়ে কাজ করো? Quality কেমন হবে?',
    a: 'আমরা AI + Human Expert একসাথে ব্যবহার করি। AI দ্রুত প্রাথমিক drafts তৈরি করে, তারপর Human Expert review করে এবং polish করে। ফলাফল: দ্রুত ডেলিভারি + প্রিমিয়াম কোয়ালিটি।',
  },
  {
    q: 'WhatsApp/Phone-এ কথা বলতে পারব?',
    a: 'অবশ্যই! WhatsApp: 01778307704 অথবা সাইটের ফ্লোটিং বাটনে ক্লিক করুন। ২৪/৭ AI Voice Agent আছে, বিজনেস আওয়ারে Human Expert পাবেন।',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative py-24 sm:py-28 bg-brand-light overflow-hidden">
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 border border-brand-primary/20">
            <FiHelpCircle size={12} /> Frequently Asked
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-brand-dark mb-4 leading-tight">
            আপনার <span className="gradient-text-premium">প্রশ্নের উত্তর</span>
          </h2>
          <p className="text-gray-500 text-lg">
            শুরু করার আগে যা জানা দরকার — সব এক জায়গায়।
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`group rounded-2xl border-2 transition-all duration-300 overflow-hidden animate-slide-up opacity-0-init ${
                  isOpen ? 'bg-white border-brand-primary shadow-lg' : 'bg-white/50 border-gray-200 hover:border-brand-primary/30'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="flex items-center gap-3 flex-1">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black font-heading shrink-0 transition-colors ${
                      isOpen ? 'bg-brand-primary text-white' : 'bg-brand-primary/10 text-brand-primary'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading font-bold text-brand-dark text-base sm:text-lg">{faq.q}</span>
                  </span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-brand-primary text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                  }`}>
                    <FiChevronDown size={18} />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-16 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom helper */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            আরও প্রশ্ন আছে?{' '}
            <a href="https://wa.me/8801778307704" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-bold hover:text-brand-secondary transition-colors">
              WhatsApp-এ মেসেজ করুন →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
