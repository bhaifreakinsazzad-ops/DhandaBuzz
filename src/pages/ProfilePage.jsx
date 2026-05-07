import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { FiUser, FiBriefcase, FiMail, FiPhone, FiEdit2, FiCheck, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    businessName: user?.businessName || '',
    phone: user?.phone || '',
  })

  const handleEdit = () => {
    setForm({
      name: user?.name || '',
      businessName: user?.businessName || '',
      phone: user?.phone || '',
    })
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.businessName.trim()) {
      toast.error('নাম এবং ব্যবসার নাম দেওয়া আবশ্যক।')
      return
    }
    setSaving(true)
    const result = await updateProfile(form)
    setSaving(false)
    if (result.success) {
      toast.success('প্রোফাইল আপডেট হয়েছে!')
      setEditing(false)
    } else {
      toast.error(result.message || 'আপডেট ব্যর্থ হয়েছে।')
    }
  }

  const initials = (user?.name || user?.businessName || 'U').charAt(0).toUpperCase()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার বিজনেস প্রোফাইল তথ্য।</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          {/* Avatar + name header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-2xl font-heading">{initials}</span>
            </div>
            <div className="min-w-0">
              <h2 className="font-heading font-bold text-xl text-brand-dark truncate">
                {user?.businessName}
              </h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          {editing ? (
            <div className="space-y-4">
              <Input
                label="আপনার নাম"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="পূর্ণ নাম লিখুন"
              />
              <Input
                label="ব্যবসার নাম"
                value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                placeholder="আপনার ব্যবসার নাম"
              />
              <Input
                label="ফোন নম্বর"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="01XXXXXXXXX"
                type="tel"
              />
              <div className="flex gap-3 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  loading={saving}
                >
                  <FiCheck size={14} className="mr-1.5" />
                  সংরক্ষণ করুন
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={saving}>
                  <FiX size={14} className="mr-1.5" />
                  বাতিল
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                {[
                  { icon: FiUser, label: 'নাম', value: user?.name },
                  { icon: FiBriefcase, label: 'ব্যবসার নাম', value: user?.businessName },
                  { icon: FiMail, label: 'ইমেইল', value: user?.email },
                  { icon: FiPhone, label: 'ফোন', value: user?.phone },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 py-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center shrink-0">
                      <Icon className="text-brand-primary" size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="font-medium text-brand-dark truncate">{value || '—'}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <FiEdit2 size={14} className="mr-1.5" />
                  Edit Profile
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
