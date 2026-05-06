/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2ECC71',
          'primary-dark': '#27AE60',
          'primary-light': '#A8E6CF',
          secondary: '#1ABC9C',
          accent: '#C4E538',
          neon: '#00FF88',
          dark: '#0A1628',
          darker: '#060F1E',
          'dark-card': '#0F1F35',
          'dark-border': '#1A2D47',
          light: '#F0FFF4',
          surface: '#F7FDFB',
          white: '#FFFFFF',
          muted: '#64748B',
        }
      },
      fontFamily: {
        bangla: ['Hind Siliguri', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.9s ease-out forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradient-shift': 'gradientShift 12s ease infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'blob': 'blob 18s infinite',
        'aurora': 'aurora 14s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'tilt': 'tilt 10s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'count-up': 'countUp 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-24px) translateX(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(46, 204, 113, 0.35)' },
          '50%': { boxShadow: '0 0 60px rgba(46, 204, 113, 0.7)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(46, 204, 113, 0.5)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 18px rgba(46, 204, 113, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(46, 204, 113, 0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientX: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(50px,-30px) rotate(180deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(46, 204, 113, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(46, 204, 113, 0.8))' },
        },
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(46,204,113,0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(26,188,156,0.12) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(196,229,56,0.08) 0px, transparent 50%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(46, 204, 113, 0.2)',
        'glow-md': '0 0 40px rgba(46, 204, 113, 0.35)',
        'glow-lg': '0 0 60px rgba(46, 204, 113, 0.5)',
        'glow-accent': '0 0 40px rgba(196, 229, 56, 0.4)',
        'inner-glow': 'inset 0 0 30px rgba(46, 204, 113, 0.1)',
        'premium': '0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(46, 204, 113, 0.3)',
      },
    },
  },
  plugins: [],
}
