import { FiImage, FiGlobe, FiTrendingUp } from 'react-icons/fi'

export const services = [
  {
    id: 'creative-engine',
    name: 'Creative Engine',
    nameBn: 'ক্রিয়েটিভ ইঞ্জিন',
    description: 'কনটেন্ট, গ্রাফিক্স, সোশ্যাল মিডিয়া ক্রিয়েটিভ — সব এক জায়গায়।',
    icon: FiImage,
    color: 'from-emerald-500 to-teal-500',
    startingMaal: 5,
    path: '/services/creative-engine',
    pricing: [
      { id: 'ce-caption', label: 'Caption / Ad Copy', labelBn: 'ক্যাপশন / অ্যাড কপি', maal: 5 },
      { id: 'ce-1img', label: '1 Image (Ad/Poster/Post)', labelBn: '১টি ইমেজ', maal: 10 },
      { id: 'ce-5img', label: '5 Images', labelBn: '৫টি ইমেজ', maal: 45 },
      { id: 'ce-10img', label: '10 Images', labelBn: '১০টি ইমেজ', maal: 80 },
      { id: 'ce-video', label: '1 Short Promo Video', labelBn: '১টি শর্ট প্রোমো ভিডিও', maal: 50 },
    ],
    creativeTypes: ['Ad Image', 'Offer Poster', 'Social Media Post', 'Short Promo Video', 'Caption / Ad Copy'],
  },
  {
    id: 'web-launch-lab',
    name: 'Web Launch Lab',
    nameBn: 'ওয়েব লঞ্চ ল্যাব',
    description: 'প্রফেশনাল ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট আপনার ব্যবসার জন্য।',
    icon: FiGlobe,
    color: 'from-blue-500 to-cyan-500',
    startingMaal: 300,
    path: '/services/web-launch-lab',
    pricing: [
      { id: 'wl-landing', label: 'Landing / Order Page', labelBn: 'ল্যান্ডিং / অর্ডার পেজ', maal: 300 },
      { id: 'wl-portfolio', label: 'Portfolio / Profile Site', labelBn: 'পোর্টফোলিও / প্রোফাইল সাইট', maal: 450 },
      { id: 'wl-business', label: 'Business Website', labelBn: 'বিজনেস ওয়েবসাইট', maal: 700 },
      { id: 'wl-ecommerce', label: 'E-commerce Starter', labelBn: 'ই-কমার্স স্টার্টার', maal: 1200 },
      { id: 'wl-custom', label: 'Custom Web App', labelBn: 'কাস্টম ওয়েব অ্যাপ', maal: null },
    ],
    websiteTypes: ['Landing / Order Page', 'Portfolio / Profile Site', 'Business Website', 'E-commerce Starter', 'Custom Web App'],
  },
  {
    id: 'adscale-engine',
    name: 'AdScale Engine',
    nameBn: 'অ্যাডস্কেল ইঞ্জিন',
    description: 'বিজ্ঞাপন ম্যানেজমেন্ট ও স্কেলিং সাপোর্ট — বেশি সেল, কম খরচ।',
    icon: FiTrendingUp,
    color: 'from-green-500 to-emerald-500',
    startingMaal: 50,
    path: '/services/adscale-engine',
    pricing: [
      { id: 'as-plan', label: 'Ad Plan Unlock', labelBn: 'অ্যাড প্ল্যান আনলক', maal: 50 },
      { id: 'as-bundle', label: 'Full Planning Bundle', labelBn: 'ফুল প্ল্যানিং বান্ডেল', maal: 100 },
      { id: 'as-setup', label: 'Campaign Setup', labelBn: 'ক্যাম্পেইন সেটআপ', maal: 300 },
      { id: 'as-launch', label: 'Full Launch Support', labelBn: 'ফুল লঞ্চ সাপোর্ট', maal: 700 },
    ],
  },
]

export function getServiceById(id) {
  return services.find(s => s.id === id)
}
