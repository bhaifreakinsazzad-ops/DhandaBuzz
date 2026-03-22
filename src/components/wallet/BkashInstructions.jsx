import { BKASH_NUMBER } from '../../data/constants'
import Card from '../ui/Card'

export default function BkashInstructions({ selectedPkg }) {
  return (
    <Card className="border-2 border-pink-100 bg-pink-50/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">b</span>
        </div>
        <div>
          <h3 className="font-heading font-bold text-brand-dark">bKash Send Money</h3>
          <p className="text-xs text-gray-500">নিচের নম্বরে টাকা পাঠান</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-500 mb-1">bKash নম্বর:</p>
        <p className="text-2xl font-bold font-heading text-brand-dark tracking-wider">
          {BKASH_NUMBER}
        </p>
      </div>

      {selectedPkg && (
        <div className="bg-white rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-500 mb-1">পাঠানোর পরিমাণ:</p>
          <p className="text-xl font-bold font-heading text-pink-600">
            ৳{selectedPkg.bdt}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            আপনি পাবেন: <span className="text-brand-accent font-semibold">{selectedPkg.maal.toLocaleString()} Maal</span>
          </p>
        </div>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <p className="font-semibold text-brand-dark">ধাপসমূহ:</p>
        <ol className="list-decimal list-inside space-y-1.5 text-xs">
          <li>bKash অ্যাপ বা *247# ডায়াল করুন</li>
          <li>"Send Money" সিলেক্ট করুন</li>
          <li>নম্বর: <span className="font-semibold">{BKASH_NUMBER}</span></li>
          <li>পরিমাণ: ৳{selectedPkg?.bdt || '...'} পাঠান</li>
          <li>Transaction ID কপি করুন</li>
          <li>নিচের ফর্মে Transaction ID সাবমিট করুন</li>
        </ol>
      </div>
    </Card>
  )
}
