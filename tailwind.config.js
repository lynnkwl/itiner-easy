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
    extend: {},
  },
  daisyui: {
    themes: [
      {mytheme: {
          
        "primary": "#93c5fd",
                 
        "secondary": "#a5b4fc",
                 
        "accent": "#7dd3fc",
                 
        "neutral": "#60a5fa",
                 
        "base-100": "#ffffff",
                 
        "info": "#3abff8",
                 
        "success": "#36d399",
                 
        "warning": "#fbbd23",
                 
        "error": "#f87272",
                 },
              },
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
