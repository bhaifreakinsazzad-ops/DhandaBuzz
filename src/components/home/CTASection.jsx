import { useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Button from '../ui/Button'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-hero rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-40 h-40 bg-brand-accent rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-brand-primary rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
              আজই আপনার বিজনেস অ্যাকাউন্ট খুলুন
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg">
              সাইনআপ করলেই পাচ্ছেন ১০০ Maal ফ্রি ক্রেডিট। কোনো হিডেন চার্জ নেই।
            </p>
            <Button size="lg" className="bg-brand-accent text-brand-dark hover:bg-yellow-400" onClick={() => navigate('/register')}>
              ফ্রি অ্যাকাউন্ট তৈরি করুন <FiArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
