import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getServiceById } from '../data/services'
import { useAuth } from '../hooks/useAuth'
import ServiceHeader from '../components/services/ServiceHeader'
import PricingTable from '../components/services/PricingTable'
import MaalCostDisplay from '../components/services/MaalCostDisplay'
import FileUpload from '../components/services/FileUpload'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const service = getServiceById('creative-engine')

export default function CreativeEnginePage() {
  const navigate = useNavigate()
  const { addOrder, balance } = useAuth()
  const [selectedPkg, setSelectedPkg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    businessName: '',
    productName: '',
    targetAudience: '',
    creativeType: '',
    preferredStyle: '',
    referenceLinks: '',
    notes: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedPkg) {
      toast.error('প্রথমে একটি প্যাকেজ সিলেক্ট করুন।')
      return
    }
    if (selectedPkg.maal !== null && balance < selectedPkg.maal) {
      toast.error('ব্যালেন্স কম আছে। Wallet থেকে রিচার্জ করুন।')
      return
    }

    setLoading(true)
    try {
      await addOrder({
        service: service.name,
        title: `${selectedPkg.label} — ${form.productName || form.businessName}`,
        maalCost: selectedPkg.maal,
        details: { ...form, package: selectedPkg.label },
      })
      toast.success('অর্ডার সফলভাবে সাবমিট হয়েছে!')
      navigate('/orders')
    } catch {
      toast.error('অর্ডার সাবমিট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <ServiceHeader service={service} />

      <PricingTable
        pricing={service.pricing}
        selected={selectedPkg}
        onSelect={setSelectedPkg}
      />

      {selectedPkg && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-lg font-bold font-heading text-brand-dark mb-5">অর্ডার ফর্ম</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="ব্যবসার নাম"
                  name="businessName"
                  placeholder="আপনার ব্যবসা / পেজের নাম"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="প্রোডাক্ট / সার্ভিসের নাম"
                  name="productName"
                  placeholder="কোন প্রোডাক্ট বা সার্ভিসের জন্য?"
                  value={form.productName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="টার্গেট অডিয়েন্স"
                  name="targetAudience"
                  placeholder="কাদের জন্য এই ক্রিয়েটিভ? (যেমন: ১৮-৩৫, নারী, ঢাকা)"
                  value={form.targetAudience}
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ক্রিয়েটিভ টাইপ</label>
                  <select
                    name="creativeType"
                    value={form.creativeType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
                  >
                    <option value="">সিলেক্ট করুন</option>
                    {service.creativeTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="পছন্দের স্টাইল"
                  name="preferredStyle"
                  placeholder="মিনিমাল, কালারফুল, ডার্ক, প্রিমিয়াম..."
                  value={form.preferredStyle}
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">রেফারেন্স লিংক / নোটস</label>
                  <textarea
                    name="referenceLinks"
                    rows={3}
                    placeholder="রেফারেন্স ইমেজ লিংক, কম্পিটিটর লিংক, অথবা বিশেষ নির্দেশনা..."
                    value={form.referenceLinks}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary resize-none"
                  />
                </div>

                <FileUpload label="রেফারেন্স ফাইল আপলোড (ঐচ্ছিক)" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">অতিরিক্ত নোটস</label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="অন্য কিছু জানাতে চাইলে লিখুন..."
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary resize-none"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'সাবমিট হচ্ছে...' : 'অর্ডার সাবমিট করুন'}
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <MaalCostDisplay cost={selectedPkg.maal} />
          </div>
        </div>
      )}
    </div>
  )
}
