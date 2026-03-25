import RegisterForm from '../components/auth/RegisterForm'
import { BRAND_NAME } from '../data/constants'

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo-icon-green.svg"
            alt="DhandaBuzz"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-heading text-brand-dark">
            বিজনেস অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-gray-500 mt-2">{BRAND_NAME}-তে আপনার ব্যবসার জার্নি শুরু করুন</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
