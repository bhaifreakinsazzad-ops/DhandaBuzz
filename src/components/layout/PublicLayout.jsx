import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingWhatsApp from '../ui/FloatingWhatsApp'
import StickyMobileCTA from '../ui/StickyMobileCTA'
import CursorSpotlight from '../ui/CursorSpotlight'
import SocialProofToast from '../ui/SocialProofToast'
import AnnouncementBar from '../ui/AnnouncementBar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <CursorSpotlight />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pb-[68px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <SocialProofToast />
      <StickyMobileCTA />
    </div>
  )
}
