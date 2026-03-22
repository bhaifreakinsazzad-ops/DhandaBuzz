import { FiShield, FiClock, FiUsers, FiAward } from 'react-icons/fi'
import Card from '../ui/Card'

const trustItems = [
  {
    icon: FiShield,
    title: 'নিরাপদ পেমেন্ট',
    description: 'bKash-এর মাধ্যমে সুরক্ষিত লেনদেন।',
  },
  {
    icon: FiClock,
    title: 'দ্রুত ডেলিভারি',
    description: 'নির্ধারিত সময়ের মধ্যে কাজ ডেলিভারি।',
  },
  {
    icon: FiUsers,
    title: 'এক্সপার্ট টিম',
    description: 'AI + হিউম্যান এক্সপার্ট কম্বো সাপোর্ট।',
  },
  {
    icon: FiAward,
    title: 'কোয়ালিটি গ্যারান্টি',
    description: 'প্রিভিউ দেখে অ্যাপ্রুভ না করা পর্যন্ত রিভিশন।',
  },
]

export default function TrustSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-dark mb-3">
            কেন DhandaBuzz?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            বিশ্বাসযোগ্য, পেশাদার এবং সাশ্রয়ী — আপনার ব্যবসার সেরা ডিজিটাল পার্টনার।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-brand-primary" size={22} />
                </div>
                <h3 className="font-heading font-semibold text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
