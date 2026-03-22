export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
