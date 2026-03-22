import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { FiUser, FiBriefcase, FiMail, FiPhone } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)

  const profileFields = [
    { icon: FiUser, label: 'নাম', value: user?.name },
    { icon: FiBriefcase, label: 'ব্যবসার নাম', value: user?.businessName },
    { icon: FiMail, label: 'ইমেইল', value: user?.email },
    { icon: FiPhone, label: 'ফোন', value: user?.phone },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার বিজনেস প্রোফাইল তথ্য।</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl font-heading">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-brand-dark">{user?.businessName}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            {profileFields.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
                  <Icon className="text-brand-primary" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-medium text-brand-dark">{value || '—'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast('প্রোফাইল এডিট ফিচার শীঘ্রই আসছে!')}
            >
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
