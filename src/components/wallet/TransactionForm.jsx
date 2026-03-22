import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import toast from 'react-hot-toast'

export default function TransactionForm({ selectedPkg }) {
  const [txId, setTxId] = useState('')
  const [loading, setLoading] = useState(false)
  const { addTransaction } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedPkg) {
      toast.error('প্রথমে একটি প্যাকেজ সিলেক্ট করুন।')
      return
    }
    if (!txId.trim()) {
      toast.error('Transaction ID লিখুন।')
      return
    }

    setLoading(true)
    setTimeout(() => {
      addTransaction(txId.trim(), selectedPkg)
      toast.success('Transaction সাবমিট হয়েছে! অ্যাপ্রুভালের জন্য অপেক্ষা করুন।')
      setTxId('')
      setLoading(false)
    }, 800)
  }

  return (
    <Card>
      <h3 className="font-heading font-bold text-brand-dark mb-4">Transaction ID সাবমিট করুন</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {selectedPkg && (
          <div className="bg-brand-light rounded-xl p-3 text-sm">
            <span className="text-gray-500">সিলেক্টেড প্যাকেজ: </span>
            <span className="font-semibold text-brand-dark">
              ৳{selectedPkg.bdt} → {selectedPkg.maal.toLocaleString()} Maal
            </span>
          </div>
        )}
        <Input
          label="bKash Transaction ID"
          placeholder="যেমন: TXN123456789"
          value={txId}
          onChange={(e) => setTxId(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading || !selectedPkg}>
          {loading ? 'সাবমিট হচ্ছে...' : 'সাবমিট করুন'}
        </Button>
        <p className="text-xs text-gray-400 text-center">
          সাবমিটের পর আমাদের টিম ভেরিফাই করে আপনার Maal যোগ করবে।
        </p>
      </form>
    </Card>
  )
}
