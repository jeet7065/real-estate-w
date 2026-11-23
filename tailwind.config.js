/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#252525',
        'muted-foreground': '#666666',
        secondary: '#F1F1EF',
        luxury: {
          gold: '#D89031',
          bronze: '#A96D23',
          softGold: '#E8BD7D',
          ivory: '#F8F5EF',
          lightGrey: '#F1F1EF',
          charcoal: '#252525',
          darkBg: '#211F1C',
          muted: '#666666',
          border: '#E8E5DF',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        widestLuxury: '0.2em',
        ultraWide: '0.35em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D89031 0%, #A96D23 100%)',
        'soft-gold-gradient': 'linear-gradient(135deg, #F8F5EF 0%, #F1F1EF 100%)',
      }
    },
  },
  plugins: [],
}
