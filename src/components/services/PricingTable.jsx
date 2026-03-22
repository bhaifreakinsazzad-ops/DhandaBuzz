export default function PricingTable({ pricing, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-bold font-heading text-brand-dark mb-3">প্যাকেজ / প্রাইসিং</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pricing.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`
              rounded-xl p-4 cursor-pointer transition-all duration-200 border-2
              ${selected?.id === item.id
                ? 'border-brand-primary bg-brand-primary/5 shadow-md'
                : 'border-gray-100 bg-white hover:border-brand-primary/30 hover:shadow-sm'
              }
            `}
          >
            <p className="font-medium text-brand-dark text-sm">{item.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{item.labelBn}</p>
            <p className="mt-2 font-bold font-heading text-brand-accent">
              {item.maal !== null ? `${item.maal} Maal` : 'Custom Quote'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
