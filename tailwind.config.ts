import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FCA311',
          dark: '#1F2937',
          light: '#FEEDCF',
        },
        meta: {
          blue: '#1877F2',
        },
      },
    },
  },
  plugins: [],
}

export default config
