import { useMemo, useState } from 'react'
import { FiCopy, FiZap } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'

const defaultInput = {
  businessType: '',
  audience: '',
  country: 'Bangladesh',
  goal: 'Get more leads and sales'
}

function buildKit(input) {
  const business = input.businessType || 'your business'
  const audience = input.audience || 'your ideal customers'
  const country = input.country || 'your market'
  const goal = input.goal || 'growth'

  return {
    positioning: `${business} helps ${audience} in ${country} get a cleaner, faster and more trusted buying experience with DhandaBuzz-style AI + human execution.`,
    offer: `Starter offer: a 7-day ${business} growth setup with landing page, 5 social posts, 2 ad copies and WhatsApp lead follow-up plan.`,
    socialPost: `Struggling to grow your ${business}? We help ${audience} in ${country} move from random posting to a clear growth system. Get your audit, offer plan and launch-ready content in one place.`,
    adCopy: `Stop guessing. Launch your ${business} growth system with a clear offer, conversion-focused content and WhatsApp-ready lead flow. Built for ${audience}.`,
    cta: `Book your DhandaBuzz growth audit today.`,
    actionPlan: [
      'Day 1: Audit the current offer, page, website and WhatsApp flow.',
      'Day 2: Create one clear starter offer and one premium upsell.',
      'Day 3: Build or improve the landing/order page CTA.',
      'Day 4: Prepare 5 content pieces and 2 ad copy angles.',
      'Day 5: Set up WhatsApp/Messenger lead qualification script.',
      'Day 6: Launch small test campaign or organic outreach.',
      'Day 7: Review leads, fix weak points and prepare next sprint.'
    ]
  }
}

export default function CreateAIPage() {
  const [input, setInput] = useState(defaultInput)
  const [generated, setGenerated] = useState(false)
  const kit = useMemo(() => buildKit(input), [input])

  const updateField = (key, value) => setInput((prev) => ({ ...prev, [key]: value }))

  const copyKit = async () => {
    const text = [
      `Positioning: ${kit.positioning}`,
      `Offer: ${kit.offer}`,
      `Social Post: ${kit.socialPost}`,
      `Ad Copy: ${kit.adCopy}`,
      `CTA: ${kit.cta}`,
      '7-Day Action Plan:',
      ...kit.actionPlan.map((item) => `- ${item}`)
    ].join('\n\n')
    await navigator.clipboard.writeText(text)
    toast.success('AI Business Kit copied')
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-dark to-brand-dark-card rounded-2xl p-6 sm:p-8 border border-brand-dark-border text-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 text-brand-primary px-4 py-2 text-sm font-semibold mb-4">
            <FiZap /> AI Create MVP
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">AI Business Kit Generator</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">Business type, audience, country এবং goal দিলে DhandaBuzz-style positioning, offer, post, ad copy ও 7-day action plan তৈরি হবে।</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[360px_1fr] gap-6 items-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-brand-dark">Business Type</span>
            <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={input.businessType} onChange={(e) => updateField('businessType', e.target.value)} placeholder="Example: clothing store" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-brand-dark">Audience</span>
            <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={input.audience} onChange={(e) => updateField('audience', e.target.value)} placeholder="Example: young women in Dhaka" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-brand-dark">Country</span>
            <input className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={input.country} onChange={(e) => updateField('country', e.target.value)} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-brand-dark">Goal</span>
            <textarea rows="3" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={input.goal} onChange={(e) => updateField('goal', e.target.value)} />
          </label>
          <Button className="w-full" size="lg" onClick={() => setGenerated(true)}>
            Generate Kit
            <FiZap />
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="font-heading font-bold text-xl text-brand-dark">Generated Output</h2>
              <p className="text-sm text-gray-500">MVP version: deterministic generator now, API-powered version later.</p>
            </div>
            <Button variant="outline" size="sm" onClick={copyKit}>
              <FiCopy /> Copy
            </Button>
          </div>

          {!generated ? (
            <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
              Fill the inputs and click Generate Kit.
            </div>
          ) : (
            <div className="space-y-5">
              <OutputBlock title="Brand Positioning" text={kit.positioning} />
              <OutputBlock title="Offer Idea" text={kit.offer} />
              <OutputBlock title="Social Post" text={kit.socialPost} />
              <OutputBlock title="Ad Copy" text={kit.adCopy} />
              <OutputBlock title="CTA" text={kit.cta} />
              <div className="rounded-2xl bg-brand-light p-5">
                <h3 className="font-bold text-brand-dark mb-3">7-Day Action Plan</h3>
                <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                  {kit.actionPlan.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function OutputBlock({ title, text }) {
  return (
    <div className="rounded-2xl bg-brand-light p-5">
      <h3 className="font-bold text-brand-dark mb-2">{title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  )
}
