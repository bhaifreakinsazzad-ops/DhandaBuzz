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

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const result = register(form)
      if (result.success) {
        toast.success(`স্বাগতম! ${SIGNUP_BONUS} Maal বোনাস যোগ হয়েছে!`)
        navigate('/dashboard')
      } else {
        toast.error(result.message)
      }
      setLoading(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="আপনার নাম"
        name="name"
        placeholder="সম্পূর্ণ নাম"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        label="ব্যবসার নাম"
        name="businessName"
        placeholder="আপনার ব্যবসার নাম / পেজের নাম"
        value={form.businessName}
        onChange={handleChange}
        required
      />
      <Input
        label="ইমেইল"
        name="email"
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        label="ফোন নম্বর"
        name="phone"
        type="tel"
        placeholder="01XXXXXXXXX"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <Input
        label="পাসওয়ার্ড"
        name="password"
        type="password"
        placeholder="মিনিমাম ৬ অক্ষর"
        value={form.password}
        onChange={handleChange}
        minLength={6}
        required
      />

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
  )
}
