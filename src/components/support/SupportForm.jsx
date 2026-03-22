import { useState } from 'react'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import toast from 'react-hot-toast'

export default function SupportForm() {
  const [form, setForm] = useState({ subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('সাপোর্ট রিকোয়েস্ট সাবমিট হয়েছে! শীঘ্রই যোগাযোগ করা হবে।')
      setForm({ subject: '', message: '' })
      setLoading(false)
    }, 800)
  }

  return (
    <Card>
      <h3 className="font-heading font-bold text-brand-dark mb-4">সাপোর্ট রিকোয়েস্ট পাঠান</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="বিষয়"
          name="subject"
          placeholder="আপনার সমস্যা বা প্রশ্নের বিষয়"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">বিস্তারিত</label>
          <textarea
            name="message"
            rows={4}
            placeholder="আপনার সমস্যা বা প্রশ্ন বিস্তারিত লিখুন..."
            value={form.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary resize-none"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'পাঠানো হচ্ছে...' : 'সাবমিট করুন'}
        </Button>
      </form>
    </Card>
  )
}
