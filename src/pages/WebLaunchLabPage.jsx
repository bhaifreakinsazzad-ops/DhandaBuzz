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

const service = getServiceById('web-launch-lab')

export default function WebLaunchLabPage() {
  const navigate = useNavigate()
  const { addOrder, balance } = useAuth()
  const [selectedPkg, setSelectedPkg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    businessName: '',
    websiteType: '',
    referenceLinks: '',
    requiredPages: '',
    designStyle: '',
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
        title: `${selectedPkg.label} — ${form.businessName}`,
        maalCost: selectedPkg.maal || 0,
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
                  placeholder="আপনার ব্যবসা / ব্র্যান্ডের নাম"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ওয়েবসাইট টাইপ</label>
                  <select
                    name="websiteType"
                    value={form.websiteType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
                  >
                    <option value="">সিলেক্ট করুন</option>
                    {service.websiteTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">রেফারেন্স ওয়েবসাইট লিংক</label>
                  <textarea
                    name="referenceLinks"
                    rows={2}
                    placeholder="আপনার পছন্দের ওয়েবসাইটের লিংক দিন (১-৩টি)"
                    value={form.referenceLinks}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">প্রয়োজনীয় পেজ / ফিচার</label>
                  <textarea
                    name="requiredPages"
                    rows={3}
                    placeholder="কোন কোন পেজ লাগবে? (Home, About, Contact, Product...) কোন স্পেশাল ফিচার?"
                    value={form.requiredPages}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary resize-none"
                  />
                </div>

                <Input
                  label="ডিজাইন স্টাইল"
                  name="designStyle"
                  placeholder="মডার্ন, মিনিমাল, কালারফুল, কর্পোরেট..."
                  value={form.designStyle}
                  onChange={handleChange}
                />

                <FileUpload label="লোগো, ছবি বা ডকুমেন্ট আপলোড (ঐচ্ছিক)" />

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
