import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import toast from 'react-hot-toast'

export default function TransactionForm({ selectedPkg }) {
  const [form, setForm] = useState({
    businessName: '',
    txId: '',
    amountPaid: '',
    note: '',
  })
  const [loading, setLoading] = useState(false)
  const { addTransaction, user } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedPkg) {
      toast.error('প্রথমে একটি প্যাকেজ সিলেক্ট করুন।')
      return
    }
    if (!form.txId.trim()) {
      toast.error('bKash Transaction ID লিখুন।')
      return
    }
    if (!form.amountPaid) {
      toast.error('পেইড অ্যামাউন্ট লিখুন।')
      return
    }

    setLoading(true)
    setTimeout(() => {
      addTransaction({
        txId: form.txId.trim(),
        businessName: form.businessName || user?.businessName || '',
        amountPaid: Number(form.amountPaid),
        note: form.note,
        pkg: selectedPkg,
      })
      toast.success('রিচার্জ রিকোয়েস্ট সাবমিট হয়েছে! অ্যাপ্রুভালের জন্য অপেক্ষা করুন।')
      setForm({ businessName: '', txId: '', amountPaid: '', note: '' })
      setLoading(false)
    }, 800)
  }

  return (
    <Card>
      <h3 className="font-heading font-bold text-brand-dark mb-1">রিচার্জ রিকোয়েস্ট সাবমিট</h3>
      <p className="text-xs text-gray-400 mb-5">
        bKash-এ Send Money করার পর নিচের ফর্মটি পূরণ করুন।
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {selectedPkg && (
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">সিলেক্টেড প্যাকেজ:</span>
              <span className="font-bold text-brand-dark">
                {selectedPkg.label}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">৳{selectedPkg.bdt} পেমেন্ট →</span>
              <span className="font-bold text-brand-accent">
                {selectedPkg.maal.toLocaleString()} Maal
              </span>
            </div>
          </div>
        )}

        <Input
          label="ব্যবসার নাম"
          name="businessName"
          placeholder={user?.businessName || 'আপনার ব্যবসা / পেজের নাম'}
          value={form.businessName}
          onChange={handleChange}
        />

        <Input
          label="পেইড অ্যামাউন্ট (BDT)"
          name="amountPaid"
          type="number"
          placeholder={selectedPkg ? `৳${selectedPkg.bdt}` : '৳...'}
          value={form.amountPaid}
          onChange={handleChange}
          required
        />

        <Input
          label="bKash Transaction ID"
          name="txId"
          placeholder="যেমন: TXN9A3B5C7D8E"
          value={form.txId}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            নোট (ঐচ্ছিক)
          </label>
          <textarea
            name="note"
            rows={2}
            placeholder="অতিরিক্ত কিছু জানাতে চাইলে লিখুন..."
            value={form.note}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary resize-none text-sm"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading || !selectedPkg}>
          {loading ? 'সাবমিট হচ্ছে...' : 'রিচার্জ রিকোয়েস্ট সাবমিট করুন'}
        </Button>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
          <p className="text-yellow-800 text-xs font-medium">
            ম্যানুয়াল ভেরিফিকেশনের পর আপনার Maal যোগ হবে। সাধারণত ১-৩ ঘণ্টা সময় লাগে।
          </p>
        </div>
      </form>
    </Card>
  )
}
