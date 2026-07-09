import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        // Dark theme colors (kept as options)
        navy: {
          900: '#0d1224',
          950: '#0a0f1e',
        },
        charcoal: {
          800: '#1e2333',
          900: '#1a1f2e',
        },
        // Primary accent
        electric: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        cyan: {
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Light theme additions
        purple: {
          500: '#7c3aed',
          600: '#6d28d9',
        },
        pink: {
          500: '#ec4899',
          600: '#db2777',
        },
        // Light backgrounds
        surface: {
          50: '#ffffff',
          100: '#f8f9fa',
          200: '#f1f3f5',
          300: '#f8fafc',
        },
        // Dark text
        heading: {
          DEFAULT: '#1a1a2e',
          secondary: '#2d2d44',
        },
        body: {
          DEFAULT: '#4a5568',
          muted: '#6b7280',
        },
        // Borders
        border: {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '50': '12.5rem',
        '60': '15rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)',
        'card-lg': '0 4px 24px rgba(0, 0, 0, 0.06), 0 12px 48px rgba(0, 0, 0, 0.04)',
        'nav': '0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-sm': {
          'background': 'rgba(255, 255, 255, 0.03)',
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.glass-md': {
          'background': 'rgba(255, 255, 255, 0.08)',
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.12)',
        },
        '.glass-lg': {
          'background': 'rgba(255, 255, 255, 0.12)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.15)',
        },
        '.glass-navbar': {
          'background': 'rgba(255, 255, 255, 0.95)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'border-bottom': '1px solid rgba(0, 0, 0, 0.06)',
          'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.04)',
        },
      })
    }),
  ],
}

export default config
