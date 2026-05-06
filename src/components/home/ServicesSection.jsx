import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiZap } from 'react-icons/fi'
import { services } from '../../data/services'

export default function ServicesSection() {
  function handleMouseMove(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section id="services" className="relative py-24 sm:py-28 bg-brand-darker overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 glass-strong text-brand-accent text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5">
            <FiZap size={12} /> Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4 leading-tight">
            তিনটি শক্তিশালী{' '}
            <span className="gradient-text-premium">AI সার্ভিস ইঞ্জিন</span>
          </h2>
          <p className="text-gray-400 text-lg">
            আপনার ব্যবসার ডিজিটাল প্রয়োজন পূরণে সবচেয়ে কার্যকর সমাধান।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <Link
                to={service.path}
                key={service.id}
                onMouseMove={handleMouseMove}
                className="group relative spotlight tilt-card animate-slide-up opacity-0-init"
                style={{ animationDelay: `${idx * 0.12}s` }}
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

                <div className="relative gradient-border-animated rounded-3xl p-7 h-full flex flex-col bg-brand-dark-card overflow-hidden">
                  {/* Floating glow */}
                  <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} blur-xl opacity-50 group-hover:opacity-80 transition-opacity`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-glow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="text-white" size={28} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-black text-2xl text-white mb-1 group-hover:gradient-text-premium transition-all">
                    {service.name}
                  </h3>
                  <p className="text-sm text-brand-primary font-semibold mb-4">{service.nameBn}</p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Footer pricing + arrow */}
                  <div className="pt-5 border-t border-brand-dark-border flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Starts From</div>
                      <div className="text-brand-accent font-black text-lg font-heading">{service.startingMaal} <span className="text-xs text-gray-400">Maal</span></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:rotate-45 transition-all">
                      <FiArrowUpRight className="text-brand-primary group-hover:text-white transition-colors" size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-accent transition-colors group"
          >
            সব সার্ভিস দেখুন
            <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
