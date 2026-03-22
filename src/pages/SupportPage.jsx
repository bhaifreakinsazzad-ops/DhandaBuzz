import ContactChannels from '../components/support/ContactChannels'
import SupportForm from '../components/support/SupportForm'

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-brand-dark">Support</h1>
        <p className="text-gray-500 text-sm mt-1">যেকোনো সমস্যায় আমাদের সাথে যোগাযোগ করুন।</p>
      </div>

      <ContactChannels />
      <SupportForm />
    </div>
  )
}
