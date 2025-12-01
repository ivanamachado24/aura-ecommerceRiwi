/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        lila: "#E9C6FF",
        morado: "#5A2D82",
        negro_suave: "#1B1B1B",
      },
      dropShadow: {
        aura: '0 6px 20px rgba(89,45,130,0.12)'
      }
    },
  },
  plugins: [],
}
