import { FiArrowRight, FiBot, FiCalendar, FiMessageCircle, FiPenTool, FiTarget } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import Button from '../ui/Button'

const offers = [
  {
    icon: FiTarget,
    name: 'Starter Growth Engine',
    desc: 'Website or landing page, starter content, basic ad angles and WhatsApp lead flow for a fast launch.',
    price: 'Starter setup'
  },
  {
    icon: FiMessageCircle,
    name: 'Messenger Sales Machine',
    desc: 'Messenger and WhatsApp sales script, lead qualification flow and follow-up system for Bangladeshi businesses.',
    price: 'Lead flow setup'
  },
  {
    icon: FiBot,
    name: 'AI Moderator by DhandaBuzz',
    desc: 'AI sales and support assistant for chat reply, lead qualification and smart human handoff.',
    price: 'Featured product'
  },
  {
    icon: FiPenTool,
    name: 'Creative Sprint Pack',
    desc: 'Monthly content, ad creative, captions and offer visuals so the business never stops posting.',
    price: 'Monthly sprint'
  },
  {
    icon: FiCalendar,
    name: 'Booked Calls Funnel',
    desc: 'Premium funnel for service businesses that need qualified calls, not random inbox messages.',
    price: 'Premium funnel'
  }
]

export default function ServicesSection() {
  const navigate = useNavigate()

  return (
    <section id="services" className="py-16 sm:py-20 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-brand-primary text-sm font-semibold tracking-wider uppercase mb-2">Revenue Offers</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-brand-dark mb-3">
            5 sellable offers. Less confusion. Faster revenue.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            DhandaBuzz এখন সব service একসাথে দেখাবে না। প্রথম launch-এ শুধু যেগুলো দ্রুত sell, deliver এবং scale করা যায় সেগুলো সামনে থাকবে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon
            return (
              <Card key={offer.name} dark glow className="group hover:scale-[1.02] cursor-pointer h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{offer.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed min-h-[72px]">{offer.desc}</p>
                <div className="mt-4 pt-4 border-t border-brand-dark-border flex items-center justify-between gap-3">
                  <span className="text-brand-accent text-sm font-medium">{offer.price}</span>
                  <button onClick={() => navigate('/start-project')} className="text-brand-primary text-sm font-semibold inline-flex items-center gap-1">
                    Start <FiArrowRight />
                  </button>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-dark">AI Moderator becomes the featured product.</h3>
            <p className="text-gray-600 mt-2 max-w-2xl">WhatsApp, Messenger, Instagram and website chat support for reply, qualification and handoff. This keeps the brand simple while still showing a strong AI product.</p>
          </div>
          <Button size="lg" onClick={() => navigate('/start-project')}>
            Request AI Moderator
            <FiArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
