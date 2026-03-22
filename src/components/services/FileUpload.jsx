import { FiUploadCloud } from 'react-icons/fi'

export default function FileUpload({ label = 'ফাইল আপলোড করুন (ঐচ্ছিক)' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-brand-primary/40 transition-colors cursor-pointer">
        <input type="file" multiple className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="cursor-pointer">
          <FiUploadCloud className="mx-auto text-gray-400 mb-2" size={28} />
          <p className="text-sm text-gray-500">
            ক্লিক করে ফাইল সিলেক্ট করুন
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG, PDF, ZIP (সর্বোচ্চ 10MB)
          </p>
        </label>
      </div>
    </div>
  )
}
