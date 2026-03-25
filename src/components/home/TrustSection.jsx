import { FiShield, FiClock, FiUsers, FiAward } from 'react-icons/fi'
import Card from '../ui/Card'

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
    description: 'নির্ধারিত সময়ের মধ্যে কাজ ডেলিভারি।',
    gradient: 'from-brand-primary to-brand-secondary',
  },
  {
    icon: FiUsers,
    title: 'এক্সপার্ট টিম',
    description: 'AI + হিউম্যান এক্সপার্ট কম্বো সাপোর্ট।',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: FiAward,
    title: 'কোয়ালিটি গ্যারান্টি',
    description: 'প্রিভিউ দেখে অ্যাপ্রুভ না করা পর্যন্ত রিভিশন।',
    gradient: 'from-purple-500 to-pink-500',
  },
]

export default function TrustSection() {
  return (
    <section id="why-us" className="py-16 sm:py-20 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-brand-primary text-sm font-semibold tracking-wider uppercase mb-2">Why Choose Us</span>
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
              <Card key={index} className="text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="text-white" size={22} />
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
