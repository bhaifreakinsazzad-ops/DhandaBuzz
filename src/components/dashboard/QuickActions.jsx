import { useNavigate } from 'react-router-dom'
import { services } from '../../data/services'
import Card from '../ui/Card'

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div>
      <h2 className="text-lg font-bold font-heading text-brand-dark mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card
              key={service.id}
              dark
              className="cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => navigate(service.path)}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3`}>
                <Icon className="text-white" size={18} />
              </div>
              <h3 className="font-heading font-semibold text-sm">{service.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{service.nameBn}</p>
              <p className="text-brand-accent text-xs mt-2">
                শুরু {service.startingMaal} Maal থেকে →
              </p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
