import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Input from '../ui/Input'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const result = login(email, password)
      if (result.success) {
        toast.success('সফলভাবে লগইন হয়েছে!')
        navigate('/dashboard')
      } else {
        toast.error(result.message)
      }
      setLoading(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="ইমেইল"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="পাসওয়ার্ড"
        type="password"
        placeholder="আপনার পাসওয়ার্ড"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'লগইন হচ্ছে...' : 'Login'}
      </Button>
      <p className="text-center text-sm text-gray-500">
        অ্যাকাউন্ট নেই?{' '}
        <Link to="/register" className="text-brand-primary font-semibold hover:underline">
          ফ্রি রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </form>
  )
}
