const variants = {
  primary: 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/25',
  secondary: 'bg-brand-secondary hover:bg-brand-secondary/90 text-white shadow-lg shadow-brand-secondary/25',
  outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
  ghost: 'text-gray-600 hover:bg-gray-100',
  dark: 'bg-brand-dark hover:bg-brand-darker text-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
