import { useEffect } from 'react'
import HeroSection from '../components/home/HeroSection'
import BonusHighlight from '../components/home/BonusHighlight'
import ServicesSection from '../components/home/ServicesSection'
import HowItWorks from '../components/home/HowItWorks'
import ProductizedOffers from '../components/home/ProductizedOffers'
import AuditSection from '../components/home/AuditSection'
import TrustSection from '../components/home/TrustSection'
import FAQSection from '../components/home/FAQSection'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.opacity-0-init')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <HeroSection />
      <BonusHighlight />
      <ServicesSection />
      <HowItWorks />
      <ProductizedOffers />
      <AuditSection />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
