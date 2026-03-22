import { useAuth } from '../../hooks/useAuth'
import Card from '../ui/Card'

export default function MaalCostDisplay({ cost }) {
  const { balance } = useAuth()
  const isCustom = cost === null
  const canAfford = isCustom || balance >= cost

  return (
    <Card className={`border-2 ${canAfford ? 'border-brand-primary/20' : 'border-red-200'}`}>
      <h3 className="font-heading font-semibold text-sm text-gray-500 mb-3">প্রত্যাশিত খরচ</h3>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">বর্তমান ব্যালেন্স</span>
          <span className="font-bold font-heading text-brand-dark">{balance.toLocaleString()} Maal</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">এই অর্ডারের খরচ</span>
          <span className="font-bold font-heading text-brand-accent">
            {isCustom ? 'Custom Quote' : `−${cost} Maal`}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">অর্ডারের পর ব্যালেন্স</span>
            <span className={`font-bold font-heading ${canAfford ? 'text-brand-dark' : 'text-red-500'}`}>
              {isCustom ? '—' : `${(balance - cost).toLocaleString()} Maal`}
            </span>
          </div>
        </div>
      </div>

      {!canAfford && !isCustom && (
        <div className="mt-3 bg-red-50 rounded-lg p-2 text-center">
          <p className="text-red-600 text-xs font-medium">
            ব্যালেন্স কম আছে। Wallet থেকে রিচার্জ করুন।
          </p>
        </div>
      )}
    </Card>
  )
}
