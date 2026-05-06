import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'

const serviceOptions = [
  'Starter Growth Engine',
  'Messenger Sales Machine',
  'AI Moderator',
  'Creative Sprint Pack',
  'Booked Calls Funnel',
  'Website or Landing Page',
  'Digital Marketing / Ads',
  'Other Custom Project'
]

export default function StartProjectPage() {
  const navigate = useNavigate()
  const { isAuthenticated, addOrder, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    businessName: user?.businessName || '',
    ownerName: user?.name || '',
    phone: user?.phone || '',
    serviceNeeded: 'Starter Growth Engine',
    budget: '',
    timeline: '',
    link: '',
    problem: '',
    notes: ''
  })

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.businessName || !form.ownerName || !form.phone || !form.problem) {
      toast.error('নাম, WhatsApp, Business এবং সমস্যা লিখুন।')
      return
    }

    if (!isAuthenticated) {
      sessionStorage.setItem('dhandabuzz_start_project_draft', JSON.stringify(form))
      toast('প্রথমে account খুলুন, তারপর request submit হবে।')
      navigate('/register')
      return
    }

    setLoading(true)
    try {
      await addOrder({
        service: 'Start Project',
        title: form.serviceNeeded,
        maalCost: 0,
        details: {
          type: 'apollo-start-project',
          ...form
        }
      })
      toast.success('Project request received. Team WhatsApp-এ contact করবে।')
      navigate('/orders')
    } catch (error) {
      toast.error(error?.message || 'Request submit করা যায়নি।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-brand-light py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 text-brand-primary px-4 py-2 text-sm font-semibold">
            Apollo Start Project
          </span>
          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold font-heading text-brand-dark">
            আপনার Business Growth System শুরু করুন
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Website, content, ads, AI sales assistant বা full growth setup — brief দিন, DhandaBuzz team manual-first execution plan তৈরি করবে।
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-5 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-brand-dark">Business Name *</span>
                <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.businessName} onChange={(e) => updateField('businessName', e.target.value)} placeholder="Your business name" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-brand-dark">Owner Name *</span>
                <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.ownerName} onChange={(e) => updateField('ownerName', e.target.value)} placeholder="Your name" />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-brand-dark">WhatsApp Number *</span>
                <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="01XXXXXXXXX" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-brand-dark">Service Needed</span>
                <select className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.serviceNeeded} onChange={(e) => updateField('serviceNeeded', e.target.value)}>
                  {serviceOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-brand-dark">Budget Range</span>
                <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.budget} onChange={(e) => updateField('budget', e.target.value)} placeholder="Example: 5k-20k BDT" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-brand-dark">Timeline</span>
                <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.timeline} onChange={(e) => updateField('timeline', e.target.value)} placeholder="Example: this week / 30 days" />
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-brand-dark">Website / Facebook / Store Link</span>
              <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.link} onChange={(e) => updateField('link', e.target.value)} placeholder="https://..." />
            </label>

            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-brand-dark">Main Problem / Goal *</span>
              <textarea rows="4" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.problem} onChange={(e) => updateField('problem', e.target.value)} placeholder="আপনার business-এর main problem বা goal লিখুন।" />
            </label>

            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-brand-dark">Extra Notes</span>
              <textarea rows="3" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.notes} onChange={(e) => updateField('notes', e.target.value)} placeholder="Reference, preferred style, competitor, etc." />
            </label>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Project Request'}
              <FiArrowRight />
            </Button>
          </form>

          <aside className="bg-brand-dark rounded-3xl p-6 text-white shadow-xl sticky top-24">
            <h2 className="font-heading text-xl font-bold">Manual-first, premium flow</h2>
            <p className="mt-2 text-gray-400 text-sm">Automation পরে; এখন fastest revenue path হচ্ছে clean brief, WhatsApp qualification, proposal, payment, delivery.</p>
            <div className="mt-6 space-y-4">
              {['Request received', 'Team review', 'Proposal sent', 'Payment confirmed', 'Execution starts'].map((step) => (
                <div key={step} className="flex items-center gap-3 text-sm">
                  <FiCheckCircle className="text-brand-primary" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
