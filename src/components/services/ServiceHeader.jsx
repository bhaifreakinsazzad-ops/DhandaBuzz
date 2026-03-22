import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function ServiceHeader({ service }) {
  const navigate = useNavigate()
  const Icon = service.icon

  return (
    <div className="mb-8">
      <button
        onClick={() => navigate('/services')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary transition-colors mb-4"
      >
        <FiArrowLeft size={14} />
        All Services
      </button>

      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0`}>
          <Icon className="text-white" size={26} />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-brand-dark">{service.name}</h1>
          <p className="text-sm text-gray-400">{service.nameBn}</p>
          <p className="text-gray-500 mt-1">{service.description}</p>
        </div>
      </div>
    </div>
  )
}
