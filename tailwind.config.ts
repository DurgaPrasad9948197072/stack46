import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070B1A',
        bg2: '#0D1530',
        indigo: '#1E2A78',
        blue: '#2AACE2',
        cyan: '#00B8D9',
        teal: '#4DD0C4',
        gold: '#FFC845',
      },
      fontFamily: {
        sans: ['var(--font-dm)', 'sans-serif'],
        heading: ['var(--font-grotesk)', 'sans-serif'],
        display: ['var(--font-grotesk)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono-brand)', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 9s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
