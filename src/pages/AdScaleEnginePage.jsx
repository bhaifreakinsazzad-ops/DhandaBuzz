import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getServiceById } from '../data/services'
import { useAuth } from '../hooks/useAuth'
import ServiceHeader from '../components/services/ServiceHeader'
import PricingTable from '../components/services/PricingTable'
import MaalCostDisplay from '../components/services/MaalCostDisplay'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const service = getServiceById('adscale-engine')

export default function AdScaleEnginePage() {
  const navigate = useNavigate()
  const { addOrder, balance } = useAuth()
  const [selectedPkg, setSelectedPkg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    businessName: '',
    productService: '',
    objective: '',
    budget: '',
    targetLocation: '',
    ageRange: '',
    gender: '',
    hasPage: '',
    hasAdAccount: '',
    needCard: '',
    needCreative: '',
    notes: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedPkg) {
      toast.error('প্রথমে একটি প্যাকেজ সিলেক্ট করুন।')
      return
    }
    if (balance < selectedPkg.maal) {
      toast.error('ব্যালেন্স কম আছে। Wallet থেকে রিচার্জ করুন।')
      return
    }

    setLoading(true)
    setTimeout(() => {
      addOrder({
        service: service.name,
        title: `${selectedPkg.label} — ${form.businessName}`,
        maalCost: selectedPkg.maal,
        details: { ...form, package: selectedPkg.label },
      })
      toast.success('অর্ডার সফলভাবে সাবমিট হয়েছে!')
      navigate('/orders')
      setLoading(false)
    }, 800)
  }

  const RadioGroup = ({ label, name, value, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex gap-4">
        {['Yes', 'No'].map((opt) => (
          <label
            key={opt}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm
              ${value === opt
                ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-medium'
                : 'border-gray-200 text-gray-600 hover:border-brand-primary/30'
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="hidden"
            />
            {opt === 'Yes' ? 'হ্যাঁ' : 'না'}
          </label>
        ))}
      </div>
    </div>
  )

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
                  label="প্রোডাক্ট / সার্ভিস"
                  name="productService"
                  placeholder="কোন প্রোডাক্ট বা সার্ভিস প্রমোট করবেন?"
                  value={form.productService}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">উদ্দেশ্য (Objective)</label>
                  <select
                    name="objective"
                    value={form.objective}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
                  >
                    <option value="">সিলেক্ট করুন</option>
                    <option value="Sales">সেলস বাড়ানো</option>
                    <option value="Leads">লিড জেনারেশন</option>
                    <option value="Messages">মেসেজ পাওয়া</option>
                    <option value="Traffic">ওয়েবসাইট ট্রাফিক</option>
                    <option value="Awareness">ব্র্যান্ড সচেতনতা</option>
                    <option value="Engagement">এনগেজমেন্ট</option>
                  </select>
                </div>

                <Input
                  label="দৈনিক বাজেট (BDT)"
                  name="budget"
                  type="number"
                  placeholder="যেমন: 500"
                  value={form.budget}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="টার্গেট লোকেশন"
                  name="targetLocation"
                  placeholder="সারা বাংলাদেশ, ঢাকা, চট্টগ্রাম..."
                  value={form.targetLocation}
                  onChange={handleChange}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="বয়সসীমা (Age Range)"
                    name="ageRange"
                    placeholder="যেমন: 18-45"
                    value={form.ageRange}
                    onChange={handleChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">জেন্ডার</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
                    >
                      <option value="">সিলেক্ট করুন</option>
                      <option value="All">সবাই</option>
                      <option value="Male">পুরুষ</option>
                      <option value="Female">নারী</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RadioGroup
                    label="Facebook পেজ আছে?"
                    name="hasPage"
                    value={form.hasPage}
                    onChange={handleChange}
                  />
                  <RadioGroup
                    label="Ad Account আছে?"
                    name="hasAdAccount"
                    value={form.hasAdAccount}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RadioGroup
                    label="কার্ড সাপোর্ট লাগবে?"
                    name="needCard"
                    value={form.needCard}
                    onChange={handleChange}
                  />
                  <RadioGroup
                    label="ক্রিয়েটিভ সাপোর্ট লাগবে?"
                    name="needCreative"
                    value={form.needCreative}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">অতিরিক্ত নোটস</label>
                  <textarea
                    name="notes"
                    rows={3}
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
