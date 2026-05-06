import { useState } from 'react'
import { FiCheckCircle, FiZap } from 'react-icons/fi'
import Button from '../ui/Button'
import AuditModal from './AuditModal'
import { AUDIT_PRICE_BDT } from '../../data/constants'

const deliverables = [
  'আপনার ব্যবসার সম্পূর্ণ Digital Presence বিশ্লেষণ',
  'প্রতিযোগীদের তুলনায় আপনি কোথায় পিছিয়ে আছেন',
  'সামাজিক মিডিয়া ও Website-এর দুর্বলতা চিহ্নিত',
  'AI-powered Growth Roadmap (৯০ দিনের পরিকল্পনা)',
  'বিনামূল্যে ১৫ মিনিটের কৌশল পরামর্শ সেশন',
]

export default function AuditSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="bg-brand-dark py-20 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-10">
          <span className="inline-block bg-brand-primary/20 text-brand-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-brand-primary/30">
            <FiZap className="inline mr-1" />সীমিত সময়ের অফার
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-white leading-tight">
            আপনার ব্যবসার{' '}
            <span className="text-brand-primary">AI Business Audit</span>{' '}
            পান
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            মাত্র ৳{AUDIT_PRICE_BDT}-তে জানুন কোথায় টাকা নষ্ট হচ্ছে এবং কীভাবে দ্রুত বিক্রি বাড়ানো যায়।
          </p>
        </div>

        <div className="bg-brand-dark-card border border-brand-dark-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Deliverables */}
          <ul className="flex-1 space-y-3">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                <FiCheckCircle className="text-brand-primary mt-0.5 shrink-0" size={18} />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA block */}
          <div className="md:w-56 flex flex-col items-center text-center gap-4 shrink-0">
            <div>
              <p className="text-gray-500 text-sm line-through">৳২,০০০</p>
              <p className="text-5xl font-black font-heading text-brand-primary leading-none">৳{AUDIT_PRICE_BDT}</p>
              <p className="text-gray-400 text-sm mt-1">একবারের পেমেন্ট</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full animate-pulse-glow"
              onClick={() => setModalOpen(true)}
            >
              এখনই বুক করুন
            </Button>
            <p className="text-xs text-gray-500">bKash-এ পেমেন্ট গ্রহণযোগ্য</p>
          </div>
        </div>
      </div>

      <AuditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
