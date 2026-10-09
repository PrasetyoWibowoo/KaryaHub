import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: '#FAFAFA',
        surface: '#FFFFFF',
        'surface-alt': '#F3F4F6',
        
        // Borders
        border: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
          subtle: '#F3F4F6',
        },

        // Primary (Charcoal) - Main buttons, navigation, links
        primary: {
          DEFAULT: '#27272A',
          hover: '#18181B',
          light: '#F4F4F5',
          glow: 'rgba(39,39,42,0.16)',
        },

        // Black - Professional CTAs, premium actions
        black: {
          DEFAULT: '#000000',
          hover: '#1F2937',
          light: '#F3F4F6',
        },

        // Accent (Muted Emerald) - Only for special highlights, badges
        accent: {
          DEFAULT: '#15803D',
          hover: '#166534',
          light: '#ECFDF3',
        },

        // Success (Neutral) - Success states, "Hired" badges, active status
        success: {
          DEFAULT: '#3F3F46',
          light: '#F4F4F5',
        },

        // Warning (Muted Amber)
        warning: {
          DEFAULT: '#9A5B13',
          light: '#FEF3C7',
        },

        // Error remains semantic red for destructive states
        error: {
          DEFAULT: '#B91C1C',
          light: '#FEE2E2',
        },

        // Info (Neutral)
        info: {
          DEFAULT: '#52525B',
          light: '#F4F4F5',
        },

        // Text colors
        text: {
          heading: '#111827',
          body: '#374151',
          muted: '#6B7280',
          subtle: '#9CA3AF',
          inverse: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(0,0,0,0.02)',
        'card': '0 4px 20px -2px rgba(0,0,0,0.05), 0 2px 10px -1px rgba(0,0,0,0.02)',
        'card-hover': '0 12px 30px -8px rgba(0,0,0,0.08), 0 4px 15px -4px rgba(0,0,0,0.04)',
        'primary': '0 8px 24px -4px rgba(39,39,42,0.18)',
        'primary-lg': '0 16px 48px -8px rgba(39,39,42,0.22)',
        'glow': '0 0 0 3px rgba(39,39,42,0.16)',
        'glass': '0 8px 32px 0 rgba(0,0,0,0.05)',
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(50% 50% at 50% 50%, rgba(39,39,42,0.06) 0%, rgba(250,250,250,0) 100%)',
        'gradient-mesh': 'radial-gradient(at 20% 40%, rgba(39,39,42,0.05) 0px, transparent 50%), radial-gradient(at 80% 60%, rgba(82,82,91,0.04) 0px, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #27272A 0%, #18181B 100%)',
        'gradient-accent': 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
    }
  },
  plugins: [],
}
export default config
