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
