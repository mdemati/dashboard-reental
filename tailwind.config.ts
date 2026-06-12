import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Amapola Menorca — artesanal, cálida, natural
        clay: {
          DEFAULT: '#C8956B', // ocre / tierra cálida (principal)
          50: '#FAF3EC',
          100: '#F2E4D5',
          200: '#E6CBB0',
          300: '#D9B28B',
          400: '#C8956B',
          500: '#B97E50',
          600: '#9C6840',
          700: '#7C5333',
        },
        sage: {
          DEFAULT: '#8B9D77', // verde sage (secundario)
          100: '#E7ECE0',
          200: '#CBD6BD',
          300: '#A9BB94',
          400: '#8B9D77',
          500: '#6F825C',
          600: '#586848',
        },
        terracotta: {
          DEFAULT: '#B85C38', // acento
          600: '#9E4B2C',
          700: '#7E3B22',
        },
        cream: '#FAF7F0', // base / fondo
        charcoal: '#2C2C2C', // texto
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
