import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { SIGNUP_BONUS } from '../../data/constants'
import toast from 'react-hot-toast'

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await register(form)
    if (result.success) {
      toast.success(`স্বাগতম! ${SIGNUP_BONUS} Maal বোনাস যোগ হয়েছে!`)
      navigate('/dashboard')
    } else {
      toast.error(result.message)
    }
    setLoading(false)
  }

  const handleGoogleClick = () => {
    toast('Google Sign-Up শীঘ্রই আসছে! এখন email দিয়ে রেজিস্টার করুন।', { icon: '🚀' })
  }

  return (
    <div className="space-y-4">
      {/* Google Sign-up Button */}
      <button
        type="button"
        onClick={handleGoogleClick}
        className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 px-4 hover:bg-gray-50 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="font-medium text-gray-700">Google দিয়ে Sign Up</span>
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">অথবা</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="আপনার নাম" name="name" placeholder="সম্পূর্ণ নাম" value={form.name} onChange={handleChange} required />
        <Input label="ব্যবসার নাম" name="businessName" placeholder="আপনার ব্যবসার নাম / পেজের নাম" value={form.businessName} onChange={handleChange} required />
        <Input label="ইমেইল" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
        <Input label="ফোন নম্বর" name="phone" type="tel" placeholder="01XXXXXXXXX" value={form.phone} onChange={handleChange} required />
        <Input label="পাসওয়ার্ড" name="password" type="password" placeholder="মিনিমাম ৬ অক্ষর" value={form.password} onChange={handleChange} minLength={6} required />

        <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-3 text-center">
          <span className="text-brand-primary font-semibold text-sm">
            🎁 সাইনআপ বোনাস: {SIGNUP_BONUS} Maal ফ্রি!
          </span>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'ফ্রি অ্যাকাউন্ট তৈরি করুন'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          আগে থেকে অ্যাকাউন্ট আছে?{' '}
          <Link to="/login" className="text-brand-primary font-semibold hover:underline">
            Login করুন
          </Link>
        </p>
      </form>
    </div>
  )
}
