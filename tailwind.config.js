// tailwind.config.js
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'navbar':['Fjalla One', 'sans-serif'],
        'body':['Rubik', 'sans-serif']
      }
    },
  },
  daisyui: {
    themes: [
      {
        aqua: {
          "base-100": "#F0F8FF"
        }
      }
    ],
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
    require("daisyui"),
    require("tailwindcss")
  ],
}
