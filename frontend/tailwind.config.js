/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          crudo: '#F9F7F2',       // Crudo/Marfil
          lavanda: '#E6E6FA',     // Lavanda Suave
          turquesa: '#2C8C99',    // Turquesa Patagónico
          verde: '#5D7052',       // Verde Lenga
          marron: '#8B5A2B',      // Marrón Tierra
          gris: '#708090',        // Gris Piedra
          text: '#4A4A4A'         // Texto general suave
        }
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        serif: ['"Lora"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1621245656752-16632483569c?q=80&w=1920&auto=format&fit=crop')",
        'texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')"
      }
    }
  },
  plugins: [],
}
