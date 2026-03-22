import { services } from '../../data/services'
import Card from '../ui/Card'

export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-dark mb-3">
            আমাদের লাইভ সার্ভিস
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            আপনার অনলাইন ব্যবসার জন্য প্রয়োজনীয় সব ডিজিটাল সার্ভিস এক জায়গায়।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.id} dark className="group hover:scale-[1.02] cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{service.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{service.nameBn}</p>
                <p className="text-gray-300 text-sm leading-relaxed mt-3">
                  {service.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-brand-accent text-sm font-medium">
                    শুরু {service.startingMaal} Maal থেকে
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
