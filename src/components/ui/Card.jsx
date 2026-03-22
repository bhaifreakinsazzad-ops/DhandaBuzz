export default function Card({ children, dark = false, className = '', ...props }) {
  return (
    <div
      className={`
        rounded-2xl p-6 shadow-lg transition-all duration-200
        ${dark
          ? 'bg-brand-dark text-white'
          : 'bg-white text-gray-800 border border-gray-100'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
