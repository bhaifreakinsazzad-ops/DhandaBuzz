import { BRAND_NAME, DOMAIN, WHATSAPP_LINK, TELEGRAM_LINK } from '../../data/constants'

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs font-heading">DB</span>
              </div>
              <span className="font-heading font-bold text-lg text-white">{BRAND_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed">
              বাংলাদেশের অনলাইন ব্যবসার জন্য AI-পাওয়ারড ডিজিটাল বিজনেস সাপোর্ট পোর্টাল।
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">অ্যাকাউন্ট খুলুন</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Telegram Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME} — {DOMAIN}। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}
