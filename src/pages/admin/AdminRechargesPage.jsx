import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

function formatDate(isoString) {
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return isoString
  }
}

export default function AdminRechargesPage() {
  const { transactions, adminApproveRecharge, adminRejectRecharge } = useAuth()

  const handleApprove = async (docId, displayId) => {
    await adminApproveRecharge(docId)
    toast.success(`Recharge ${displayId} approved`)
  }

  const handleReject = async (docId, displayId) => {
    await adminRejectRecharge(docId)
    toast.success(`Recharge ${displayId} rejected`)
  }

  const pending = transactions.filter(t => t.status === 'Pending')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-gray-900">Recharge Management</h1>

      <div className="flex gap-3 text-sm">
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
          Pending: {pending.length}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
          Approved: {transactions.filter(t => t.status === 'Approved').length}
        </span>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
          Rejected: {transactions.filter(t => t.status === 'Rejected').length}
        </span>
      </div>

      {/* Pending first */}
      {pending.length > 0 && (
        <div>
          <h2 className="text-lg font-bold font-heading text-gray-900 mb-3">Pending Approvals</h2>
          <div className="bg-white rounded-2xl border border-yellow-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">TX ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Business</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Description</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">BDT</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Maal</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Note</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pending.map((tx, i) => (
                    <tr key={`${tx.docId}-${i}`} className="hover:bg-yellow-50/30">
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{formatDate(tx.date)}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{tx.id || tx.trxId}</td>
                      <td className="px-4 py-3 text-gray-700">{tx.businessName || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{tx.description}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">৳{tx.amountPaid || tx.bdt || '—'}</td>
                      <td className="px-4 py-3 font-semibold text-brand-accent">{tx.amount}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{tx.note || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(tx.docId, tx.id || tx.trxId)}
                            className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(tx.docId, tx.id || tx.trxId)}
                            className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* All transactions */}
      <div>
        <h2 className="text-lg font-bold font-heading text-gray-900 mb-3">All Transactions</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">TX ID</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Business</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">BDT</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Maal</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx, i) => (
                  <tr key={`${tx.docId}-all-${i}`} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{formatDate(tx.date)}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{tx.id || tx.trxId}</td>
                    <td className="px-4 py-3 text-gray-700 text-xs">{tx.businessName || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 capitalize">{tx.type}</td>
                    <td className="px-4 py-3 text-gray-700">{tx.description}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {tx.bdt ? `৳${tx.amountPaid || tx.bdt}` : '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-accent">{tx.amount}</td>
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
                {transactions.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No transactions yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
