import { useNavigate } from 'react-router-dom'
import { FiGift, FiArrowRight } from 'react-icons/fi'
import Button from '../ui/Button'

export default function BonusHighlight() {
  const navigate = useNavigate()

  return (
    <section className="py-12 bg-gradient-to-r from-brand-primary to-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FiGift className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                সাইনআপ বোনাস — <span className="text-brand-accent">১০০ Maal ফ্রি!</span>
              </h3>
              <p className="text-green-100 text-sm mt-1">
                এখনই অ্যাকাউন্ট খুলুন এবং ১০০ Maal ক্রেডিট পান একদম ফ্রিতে।
              </p>
            </div>
          </div>
          <Button
            variant="dark"
            size="md"
            onClick={() => navigate('/register')}
            className="whitespace-nowrap"
          >
            এখনই শুরু করুন <FiArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
