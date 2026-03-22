import { FiLock } from 'react-icons/fi'

export default function ComingSoonCard({ service }) {
  const Icon = service.icon

  return (
    <div className="relative rounded-2xl p-5 bg-white border border-gray-100 opacity-75 cursor-default">
      <div className="absolute top-3 right-3">
        <span className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
          <FiLock size={9} />
          Coming Soon
        </span>
      </div>

      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 opacity-60`}>
        <Icon className="text-white" size={18} />
      </div>
      <h3 className="font-heading font-semibold text-sm text-gray-600">{service.name}</h3>
      <p className="text-xs text-gray-400 mt-0.5">{service.nameBn}</p>
      <p className="text-gray-400 text-xs leading-relaxed mt-2">{service.description}</p>
    </div>
  )
}
