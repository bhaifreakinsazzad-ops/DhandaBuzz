const variants = {
  primary: 'bg-brand-primary hover:bg-brand-primary-dark text-white shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40',
  secondary: 'bg-brand-secondary hover:bg-brand-secondary/90 text-white shadow-lg shadow-brand-secondary/25',
  accent: 'bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-bold shadow-lg',
  outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
  'outline-white': 'border-2 border-white/30 text-white hover:bg-white/10',
  ghost: 'text-gray-600 hover:bg-gray-100',
  dark: 'bg-brand-dark hover:bg-brand-darker text-white',
  neon: 'bg-brand-neon/10 border border-brand-neon/30 text-brand-neon hover:bg-brand-neon/20 backdrop-blur-sm',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
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
        transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
