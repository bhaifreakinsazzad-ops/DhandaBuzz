import { useState } from 'react'
import { FiCopy, FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { BKASH_NUMBER, AUDIT_PRICE_BDT, AUDIT_PRODUCT_NAME } from '../../data/constants'

export default function AuditModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [trxId, setTrxId] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  function handleClose() {
    setStep(1)
    setTrxId('')
    setError('')
    setCopied(false)
    onClose()
  }

  function copyNumber() {
    navigator.clipboard.writeText(BKASH_NUMBER).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleNext() {
    if (trxId.trim().length < 6) {
      setError('Transaction ID কমপক্ষে ৬ সংখ্যার হতে হবে')
      return
    }
    setError('')

    if (window.fbq) {
      fbq('track', 'Purchase', {
        value: AUDIT_PRICE_BDT,
        currency: 'BDT',
        content_name: AUDIT_PRODUCT_NAME,
      })
    }

    setStep(3)
  }

  const waText = encodeURIComponent(
    `হ্যালো DhandaBuzz! আমি Business Audit বুক করেছি।\n\nbKash TrxID: ${trxId}\nপরিমাণ: ৳${AUDIT_PRICE_BDT}\n\nঅনুগ্রহ করে কনফার্ম করুন।`
  )
  const waLink = `https://wa.me/8801778307704?text=${waText}`

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="৳499 Business Audit বুক করুন">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className={`h-0.5 w-8 transition-colors ${step > s ? 'bg-brand-primary' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <span className="ml-auto text-sm text-gray-500">
          {step === 1 ? 'পেমেন্ট করুন' : step === 2 ? 'TrxID দিন' : 'কনফার্ম করুন'}
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔴</span>
              <span className="font-bold text-pink-700 font-heading">bKash Send Money</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">নিচের নম্বরে <strong>৳{AUDIT_PRICE_BDT}</strong> পাঠান:</p>
            <div className="flex items-center gap-2 bg-white rounded-lg border border-pink-200 px-4 py-3">
              <span className="font-mono font-bold text-lg text-gray-800 flex-1">{BKASH_NUMBER}</span>
              <button
                onClick={copyNumber}
                className="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-800 font-semibold transition-colors"
              >
                {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2"><span className="font-bold text-brand-primary">১.</span> bKash অ্যাপ খুলুন → Send Money চাপুন</li>
            <li className="flex gap-2"><span className="font-bold text-brand-primary">২.</span> উপরের নম্বরে ৳{AUDIT_PRICE_BDT} পাঠান</li>
            <li className="flex gap-2"><span className="font-bold text-brand-primary">৩.</span> Transaction ID টি সংরক্ষণ করুন</li>
          </ol>
          <Button variant="primary" size="lg" className="w-full" onClick={() => setStep(2)}>
            পেমেন্ট করেছি <FiArrowRight />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">bKash-এ পেমেন্টের পর প্রাপ্ত Transaction ID টি লিখুন:</p>
          <div>
            <input
              type="text"
              value={trxId}
              onChange={(e) => {
                setTrxId(e.target.value.toUpperCase())
                setError('')
              }}
              placeholder="যেমন: ABC1234567"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-primary uppercase"
              autoFocus
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="md" onClick={() => setStep(1)}>
              <FiArrowLeft /> পিছনে
            </Button>
            <Button variant="primary" size="md" className="flex-1" onClick={handleNext}>
              পরবর্তী <FiArrowRight />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FiCheck size={32} className="text-brand-primary" />
          </div>
          <div>
            <p className="font-bold text-lg text-gray-800">পেমেন্ট নিশ্চিত করুন</p>
            <p className="text-sm text-gray-500 mt-1">TrxID: <span className="font-mono font-bold text-gray-700">{trxId}</span></p>
          </div>
          <p className="text-sm text-gray-600">
            WhatsApp-এ আপনার TrxID পাঠান — আমরা ২৪ ঘণ্টার মধ্যে আপনার Audit শুরু করব।
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="primary" size="lg" className="w-full bg-green-500 hover:bg-green-600">
              <span>📱</span> WhatsApp-এ কনফার্ম করুন
            </Button>
          </a>
          <button onClick={handleClose} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            পরে করব
          </button>
        </div>
      )}
    </Modal>
  )
}
