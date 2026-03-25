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
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(46, 204, 113, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(46, 204, 113, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
