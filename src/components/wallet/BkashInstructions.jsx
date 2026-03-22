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

      <div className="bg-pink-600 rounded-xl p-4 mb-4 text-center">
        <p className="text-pink-200 text-xs mb-1">Send Money করুন এই নম্বরে</p>
        <p className="text-2xl font-bold font-heading text-white tracking-wider">
          {BKASH_NUMBER}
        </p>
        <p className="text-pink-200 text-xs mt-2">
          তারপর Transaction ID সাবমিট করুন
        </p>
      </div>

      {selectedPkg && (
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">পাঠানোর পরিমাণ</p>
              <p className="text-xl font-bold font-heading text-pink-600">
                ৳{selectedPkg.bdt}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">আপনি পাবেন</p>
              <p className="text-xl font-bold font-heading text-brand-accent">
                {selectedPkg.maal.toLocaleString()} Maal
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <p className="font-semibold text-brand-dark">কিভাবে পাঠাবেন:</p>
        <ol className="list-decimal list-inside space-y-1.5 text-xs leading-relaxed">
          <li>bKash অ্যাপ ওপেন করুন বা <span className="font-mono bg-gray-100 px-1 rounded">*247#</span> ডায়াল করুন</li>
          <li><span className="font-semibold">"Send Money"</span> সিলেক্ট করুন</li>
          <li>নম্বর দিন: <span className="font-semibold text-pink-600">{BKASH_NUMBER}</span></li>
          <li>পরিমাণ দিন: <span className="font-semibold">৳{selectedPkg?.bdt || '...'}</span></li>
          <li>পেমেন্ট কনফার্ম করুন ও <span className="font-semibold">Transaction ID</span> কপি করুন</li>
          <li>পাশের ফর্মে Transaction ID সাবমিট করুন</li>
        </ol>
      </div>

      <div className="mt-4 pt-3 border-t border-pink-200">
        <p className="text-xs text-gray-500 text-center">
          পেমেন্ট ভেরিফাই হলে আপনার Maal অটোমেটিক যোগ হবে।
        </p>
      </div>
    </Card>
  )
}
