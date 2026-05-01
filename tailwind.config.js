/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        primary: '#1b75bc',
        'primary-light': '#4da1e1',
        accent: '#5abeb0',
        dark: '#051923',
        'surface-dark': 'rgba(12, 45, 64, 0.6)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(90, 190, 176, 0.4), 0 0 40px rgba(90, 190, 176, 0.2)',
        'glow-primary': '0 0 20px rgba(27, 117, 188, 0.4), 0 0 40px rgba(27, 117, 188, 0.2)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'border-beam': 'border-beam 4s linear infinite',
        'marquee': 'marquee 80s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
