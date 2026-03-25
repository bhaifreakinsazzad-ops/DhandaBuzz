import LoginForm from '../components/auth/LoginForm'
import { BRAND_NAME } from '../data/constants'

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src={`${import.meta.env.BASE_URL}logo-icon-green.svg`}
            alt="DhandaBuzz"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-heading text-brand-dark">
            {BRAND_NAME}-তে Login করুন
          </h1>
          <p className="text-gray-500 mt-2">আপনার বিজনেস ড্যাশবোর্ডে প্রবেশ করুন</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
