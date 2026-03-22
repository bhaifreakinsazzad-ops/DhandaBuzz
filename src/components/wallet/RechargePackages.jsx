import { rechargePackages } from '../../data/rechargePackages'
import Card from '../ui/Card'

export default function RechargePackages({ selected, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-bold font-heading text-brand-dark mb-4">রিচার্জ প্যাকেজ বাছাই করুন</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {rechargePackages.map((pkg) => (
          <div
            key={pkg.bdt}
            onClick={() => onSelect(pkg)}
            className={`
              relative rounded-2xl p-4 cursor-pointer transition-all duration-200 border-2
              ${selected?.bdt === pkg.bdt
                ? 'border-brand-primary bg-brand-primary/5 shadow-lg shadow-brand-primary/10'
                : 'border-gray-100 bg-white hover:border-brand-primary/30 hover:shadow-md'
              }
            `}
          >
            {pkg.popular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                Popular
              </span>
            )}
            <p className="text-2xl font-bold font-heading text-brand-dark">৳{pkg.bdt}</p>
            <p className="text-brand-accent font-semibold text-sm mt-1">
              {pkg.maal.toLocaleString()} Maal
            </p>
            <p className="text-gray-400 text-xs mt-1">{pkg.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
