import HeroSection from '../components/home/HeroSection'
import BonusHighlight from '../components/home/BonusHighlight'
import ServicesSection from '../components/home/ServicesSection'
import HowItWorks from '../components/home/HowItWorks'
import TrustSection from '../components/home/TrustSection'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BonusHighlight />
      <ServicesSection />
      <HowItWorks />
      <TrustSection />
      <CTASection />
    </>
  )
}
