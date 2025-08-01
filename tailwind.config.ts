import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Professional cybersecurity color system
      colors: {
        // Primary brand colors - Deep blue with cyber aesthetics
        primary: {
          25: '#f0f4ff',   // Light mode subtle backgrounds
          50: '#e6f0ff',   // Light mode cards
          100: '#cce0ff',  // Light mode hover states
          200: '#99c2ff',  // Light accents
          300: '#66a3ff',  // Interactive elements
          400: '#3385ff',  // Primary interactions
          500: '#0066ff',  // Main brand color
          600: '#0052cc',  // Primary buttons
          700: '#003d99',  // Dark primary
          800: '#002966',  // Darker primary
          900: '#001433',  // Very dark primary
          950: '#000a1a',  // Nearly black primary
        },
        // Accent color - Cyber green with security connotations
        accent: {
          25: '#f0fff4',   // Light mode subtle
          50: '#e6ffed',   // Light mode cards
          100: '#ccffdb',  // Light mode hover
          200: '#99ffb7',  // Light accents
          300: '#66ff93',  // Interactive
          400: '#33ff6f',  // Bright accent
          500: '#00ff4b',  // Main accent
          600: '#00cc3c',  // Accent buttons
          700: '#00992d',  // Dark accent
          800: '#00661e',  // Darker accent
          900: '#00330f',  // Very dark accent
          950: '#001a08',  // Nearly black accent
        },
        // Sophisticated neutral palette
        gray: {
          25: '#fefefe',   // Light mode pure
          50: '#f8fafc',   // Light mode backgrounds
          100: '#f1f5f9',  // Light mode cards
          200: '#e2e8f0',  // Light mode borders
          300: '#cbd5e1',  // Light mode muted
          400: '#94a3b8',  // Light mode text secondary
          500: '#64748b',  // Balanced middle
          600: '#475569',  // Dark mode text secondary
          700: '#334155',  // Dark mode borders
          800: '#1e293b',  // Dark mode cards
          900: '#0f172a',  // Dark mode backgrounds
          950: '#020617',  // Dark mode pure
        },
        // Dark mode specific colors
        dark: {
          bg: {
            primary: '#0a0f1c',     // Main background
            secondary: '#111827',   // Card backgrounds
            tertiary: '#1f2937',    // Elevated surfaces
          },
          text: {
            primary: '#f8fafc',     // Main text
            secondary: '#cbd5e1',   // Secondary text
            tertiary: '#94a3b8',    // Muted text
          },
          border: {
            primary: '#334155',     // Main borders
            secondary: '#475569',   // Subtle borders
          }
        },
        // Light mode specific colors (sophisticated, not vanilla)
        light: {
          bg: {
            primary: '#fefefe',     // Main background (off-white)
            secondary: '#f8fafc',   // Card backgrounds
            tertiary: '#f1f5f9',    // Elevated surfaces
          },
          text: {
            primary: '#0f172a',     // Main text
            secondary: '#334155',   // Secondary text
            tertiary: '#64748b',    // Muted text
          },
          border: {
            primary: '#e2e8f0',     // Main borders
            secondary: '#cbd5e1',   // Subtle borders
          }
        },
        // Semantic colors - cybersecurity focused
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Secure/safe
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Caution/alert
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Danger/threat
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Cybersecurity specific colors
        threat: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#dc2626',  // High threat
          600: '#b91c1c',
          700: '#991b1b',
        },
        secure: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',  // Secure state
          600: '#16a34a',
          700: '#15803d',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',  // Unknown/neutral
          600: '#475569',
          700: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      // Enhanced mobile-first breakpoints
      screens: {
        'xs': '475px',   // Small phones in landscape
        'sm': '640px',   // Large phones / small tablets
        'md': '768px',   // Tablets
        'lg': '1024px',  // Desktop
        'xl': '1280px',  // Large desktop
        '2xl': '1536px', // Extra large desktop
        '3xl': '1920px', // Ultra-wide displays
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '120rem',
      },
      minHeight: {
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config