import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiStar, FiZap, FiTrendingUp, FiTarget, FiCpu, FiPackage, FiLayers } from 'react-icons/fi'
import Button from '../ui/Button'

const offers = [
  {
    id: 'launch-stack',
    name: 'Launch Stack',
    subtitle: 'Complete launch package',
    icon: FiPackage,
    tagline: 'নতুন ব্যবসা ও স্টার্টআপের জন্য আদর্শ',
    price: 1200,
    priceUnit: 'Maal থেকে',
    features: [
      'Professional Website / Landing Page',
      'Branded Messaging Setup',
      'Conversion Tracking Setup',
      'First Ad Campaign Launch',
      'Lead Capture Form Integration',
    ],
    color: 'from-brand-primary to-brand-secondary',
    badge: null,
  },
  {
    id: 'booked-calls',
    name: 'Booked Calls Funnel',
    subtitle: 'High-ticket lead generation',
    icon: FiTarget,
    tagline: 'High-Ticket Service Business-এর জন্য',
    price: 700,
    priceUnit: 'Maal থেকে',
    features: [
      'Landing Page + Calendar Integration',
      'Multi-stage Lead Form',
      'CRM Pipeline Setup',
      'Retargeting Campaign',
      'Email Follow-up Sequence',
    ],
    color: 'from-blue-500 to-cyan-500',
    badge: 'Hot',
  },
  {
    id: 'creative-sprint',
    name: 'Creative Sprint Pack',
    subtitle: 'Monthly creative subscription',
    icon: FiLayers,
    tagline: 'নিয়মিত কনটেন্ট ও অ্যাড দরকার?',
    price: 80,
    priceUnit: 'Maal/মাস',
    features: [
      '১০টি Hooks + Captions',
      '৫টি Static Ad Designs',
      '৩টি Reel Scripts',
      'Ad Concept Brainstorm',
      'Monthly Refresh',
    ],
    color: 'from-amber-500 to-orange-500',
    badge: 'Best Value',
    popular: true,
  },
  {
    id: 'ai-sales-assistant',
    name: 'AI Sales Assistant',
    subtitle: 'WhatsApp + Messenger automation',
    icon: FiCpu,
    tagline: 'Lead হারাচ্ছেন slow response-এর কারণে?',
    price: 500,
    priceUnit: 'Maal + recurring',
    features: [
      'WhatsApp Bot Setup',
      'Messenger Auto-reply',
      'Lead Qualification Flow',
      'Human Handoff Rules',
      '২৪/৭ Auto Response',
    ],
    color: 'from-purple-500 to-pink-500',
    badge: 'New',
  },
  {
    id: 'starter-growth',
    name: 'Starter Growth Engine',
    subtitle: 'Setup + monthly retainer',
    icon: FiTrendingUp,
    tagline: 'প্রথম ৯০ দিনে সঠিক গ্রোথ',
    price: 300,
    priceUnit: 'Maal + monthly',
    features: [
      'Marketing Strategy Plan',
      'Funnel Setup + Optimization',
      'Weekly Performance Review',
      'Monthly Creative Refresh',
      'Dedicated Account Manager',
    ],
    color: 'from-brand-accent to-brand-neon',
    badge: null,
  },
  {
    id: 'digital-products',
    name: 'Digital Product Packs',
    subtitle: 'Templates, prompts, automations',
    icon: FiZap,
    tagline: 'Self-serve quick wins',
    price: 50,
    priceUnit: 'Maal থেকে',
    features: [
      'Prompt Packs (AI-ready)',
      'Funnel Templates',
      'Email Sequences',
      'Automation Kits',
      'Instant Download',
    ],
    color: 'from-pink-500 to-rose-500',
    badge: null,
  },
]

export default function ProductizedOffers() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  function handleMouseMove(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section id="offers" className="relative py-24 sm:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 border border-brand-primary/20">
            <FiStar size={12} /> Productized Offers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-brand-dark mb-4 leading-tight">
            ৬টি <span className="gradient-text-premium">Ready-to-Launch</span> প্যাকেজ
          </h2>
          <p className="text-gray-500 text-lg">
            আপনার বিজনেসের প্রয়োজনে যেকোনো একটি বেছে নিন — আজই শুরু করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, i) => {
            const Icon = offer.icon
            const isPopular = offer.popular
            return (
              <div
                key={offer.id}
                onMouseEnter={() => setHovered(offer.id)}
                onMouseLeave={() => setHovered(null)}
                onMouseMove={handleMouseMove}
                className={`relative group spotlight tilt-card cursor-pointer rounded-3xl animate-slide-up opacity-0-init ${isPopular ? 'lg:scale-105 lg:-translate-y-2' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => navigate('/register')}
              >
                {/* Animated border glow */}
                <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500 ${isPopular ? 'opacity-30' : ''}`} />

                <div className={`relative bg-white border-2 rounded-3xl p-7 h-full flex flex-col overflow-hidden transition-all duration-300 ${isPopular ? 'border-brand-primary shadow-glow-md' : 'border-gray-100 hover:border-brand-primary/40 hover:shadow-xl'}`}>
                  {/* Badge */}
                  {offer.badge && (
                    <span className={`absolute top-5 right-5 inline-flex items-center gap-1 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full ${
                      offer.badge === 'Hot' ? 'bg-red-500 text-white' :
                      offer.badge === 'Best Value' ? 'bg-brand-accent text-brand-dark' :
                      'bg-brand-primary text-white'
                    }`}>
                      {offer.badge === 'Hot' && '🔥'} {offer.badge === 'Best Value' && '⭐'} {offer.badge === 'New' && '✨'} {offer.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className="relative mb-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>

                  <h3 className="font-heading font-black text-2xl text-brand-dark mb-1">{offer.name}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{offer.subtitle}</p>
                  <p className="text-sm text-gray-600 mb-5">{offer.tagline}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {offer.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <FiCheckCircle className="text-brand-primary mt-0.5 shrink-0" size={14} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="pt-5 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Price</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-brand-dark font-heading">{offer.price}</span>
                          <span className="text-xs text-gray-500">{offer.priceUnit}</span>
                        </div>
                      </div>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${offer.color} flex items-center justify-center group-hover:rotate-45 transition-transform shadow-md`}>
                        <FiArrowRight className="text-white" size={16} />
                      </div>
                    </div>
                    <Button
                      variant={isPopular ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                    >
                      Get Started <FiArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
