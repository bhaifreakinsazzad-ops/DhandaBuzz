import { useNavigate } from 'react-router-dom'
import { services } from '../data/services'
import { comingSoonServices } from '../data/comingSoonServices'
import Card from '../components/ui/Card'
import ComingSoonCard from '../components/services/ComingSoonCard'
import { FiArrowRight } from 'react-icons/fi'

export default function ServicesPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark">Services</h1>
        <p className="text-gray-500 text-sm mt-1">আমাদের লাইভ এবং আসন্ন সার্ভিসসমূহ।</p>
      </div>

      <div>
        <h2 className="text-lg font-bold font-heading text-brand-dark mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-secondary" />
          লাইভ সার্ভিস
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.id}
                dark
                className="cursor-pointer hover:scale-[1.02] transition-transform group"
                onClick={() => navigate(service.path)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg">{service.name}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{service.nameBn}</p>
                <p className="text-gray-300 text-sm leading-relaxed mt-3">
                  {service.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                  <span className="text-brand-accent text-sm font-medium">
                    শুরু {service.startingMaal} Maal থেকে
                  </span>
                  <FiArrowRight className="text-gray-500 group-hover:text-brand-accent transition-colors" size={16} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold font-heading text-brand-dark mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          শীঘ্রই আসছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comingSoonServices.map((service) => (
            <ComingSoonCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}
