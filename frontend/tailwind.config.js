/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"Rajdhani"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      colors: {
        dmk: {
          red: '#CC0000',
          dark: '#1a0000',
          black: '#0d0000',
        },
        tvk: {
          gold: '#FFD700',
          amber: '#FF8C00',
          dark: '#1a1000',
          black: '#0d0800',
        },
        neon: {
          cyan: '#00FFFF',
          green: '#39FF14',
          yellow: '#FFE600',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spark': 'spark 1.5s ease-in-out infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700' },
          '100%': { boxShadow: '0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 60px #FF8C00' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        spark: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      }
    },
  },
  plugins: [],
}
