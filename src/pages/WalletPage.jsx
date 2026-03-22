import { useState } from 'react'
import BalanceCard from '../components/wallet/BalanceCard'
import RechargePackages from '../components/wallet/RechargePackages'
import BkashInstructions from '../components/wallet/BkashInstructions'
import TransactionForm from '../components/wallet/TransactionForm'
import ComingPaymentMethods from '../components/wallet/ComingPaymentMethods'
import WalletPolicies from '../components/wallet/WalletPolicies'
import { useAuth } from '../hooks/useAuth'

function formatDate(isoString) {
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return isoString
  }
}

export default function WalletPage() {
  const [selectedPkg, setSelectedPkg] = useState(null)
  const { transactions } = useAuth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark">Wallet</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার Maal ব্যালেন্স, রিচার্জ এবং ট্র্যানজেকশন হিস্টোরি।</p>
      </div>

      <BalanceCard />

      <RechargePackages selected={selectedPkg} onSelect={setSelectedPkg} />

      {selectedPkg && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BkashInstructions selectedPkg={selectedPkg} />
          <TransactionForm selectedPkg={selectedPkg} />
        </div>
      )}

      <ComingPaymentMethods />

      {transactions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold font-heading text-brand-dark mb-4">রিচার্জ হিস্টোরি</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">তারিখ</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Transaction ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">বিবরণ</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">পেইড</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Maal</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((tx, index) => (
                    <tr key={`${tx.id}-${index}`} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{tx.id}</td>
                      <td className="px-4 py-3 text-gray-700">{tx.description}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {tx.bdt ? `৳${tx.amountPaid || tx.bdt}` : '—'}
                      </td>
                      <td className="px-4 py-3 font-semibold text-brand-accent whitespace-nowrap">
                        +{tx.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          tx.status === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : tx.status === 'Rejected'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <WalletPolicies />
    </div>
  )
}
