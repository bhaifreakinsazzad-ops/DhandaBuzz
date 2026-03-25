import {
  BRAND_NAME, DOMAIN, WHATSAPP_LINK, TELEGRAM_LINK,
  FACEBOOK_LINK, INSTAGRAM_LINK, CONTACT_EMAIL, CONTACT_PHONE
} from '../../data/constants'
import { FiFacebook, FiInstagram, FiSend, FiMessageCircle, FiMail, FiPhone } from 'react-icons/fi'

const socialLinks = [
  { name: 'Facebook', url: FACEBOOK_LINK, icon: FiFacebook, color: 'hover:bg-blue-600 hover:text-white', hoverGlow: 'hover:shadow-blue-500/30' },
  { name: 'Instagram', url: INSTAGRAM_LINK, icon: FiInstagram, color: 'hover:bg-pink-500 hover:text-white', hoverGlow: 'hover:shadow-pink-500/30' },
  { name: 'WhatsApp', url: WHATSAPP_LINK, icon: FiMessageCircle, color: 'hover:bg-green-500 hover:text-white', hoverGlow: 'hover:shadow-green-500/30' },
  { name: 'Telegram', url: TELEGRAM_LINK, icon: FiSend, color: 'hover:bg-sky-500 hover:text-white', hoverGlow: 'hover:shadow-sky-500/30' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-darker relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src={`${import.meta.env.BASE_URL}logo-icon-green.svg`} alt="DhandaBuzz" className="w-10 h-10 object-contain" />
              <div>
                <span className="font-heading font-bold text-xl text-white">
                  Dhanda<span className="text-brand-primary">Buzz</span>
                </span>
                <p className="text-xs text-brand-primary/80 font-medium">DIGITAL AGENCY</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              বাংলাদেশের প্রথম AI-Powered Digital Agency। আমরা guarantee সহকারে আপনার
              অনলাইন ব্যবসার growth নিশ্চিত করি। Content, Website, Advertisement — সবকিছু এক ছাদের নিচে।
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} ${social.hoverGlow}`}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-2">→ Home</a></li>
              <li><a href="/register" className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-2">→ ফ্রি অ্যাকাউন্ট খুলুন</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-2">→ Login</a></li>
              <li><a href="/preview" className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-2">→ Dashboard Preview</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">যোগাযোগ</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-brand-primary" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-300">{CONTACT_EMAIL}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`tel:+880${CONTACT_PHONE}`} className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-brand-primary" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone / WhatsApp</p>
                    <p className="text-gray-300">+880 1778-307704</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <FiMessageCircle className="text-green-500" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp Business</p>
                    <p className="text-gray-300">সরাসরি মেসেজ করুন</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {BRAND_NAME} — {DOMAIN}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-gray-600 text-xs">
            🇧🇩 বাংলাদেশের প্রথম AI-Powered Digital Agency
          </p>
        </div>
      </div>
    </footer>
  )
}
