export default function Card({ children, dark = false, glow = false, className = '', ...props }) {
  return (
    <div
      className={`
        rounded-2xl p-6 transition-all duration-300
        ${dark
          ? `bg-brand-dark-card text-white border border-brand-dark-border ${glow ? 'glow-green' : ''} hover:border-brand-primary/30`
          : 'bg-white text-gray-800 border border-gray-100 shadow-sm hover:shadow-lg'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
