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
      {
        primary: "#42e3ff",
        "primary-focus": "#0fdbff",
        "primary-content": "#000000",
        secondary: "#966fb3",
        "secondary-focus": "#7d539d",
        "secondary-content": "#ffffff",
        accent: "#ffe999",
        "accent-focus": "#ffde66",
        "accent-content": "#ffffff",
        neutral: "#132795",
        "neutral-focus": "#18277c",
        "neutral-content": "#ffffff",
        "base-100": "#0b25b7",
        "base-200": "#132795",
        "base-300": "#18277c",
        "base-content": "#ffffff",
        info: "#e0f2fe",
        "info-content": "#2563eb",
        success: "#dcfce7",
        "success-content": "#16a34a",
        warning: "#fef3c7",
        "warning-content": "#d97706",
        error: "#fee2e2",
        "error-content": "#dc2626",
        "--border-color": "var(--b3)",
        "--rounded-box": "1rem",
        "--rounded-btn": "0.5rem",
        "--rounded-badge": "1.9rem",
        "--animation-btn": "0.25s",
        "--animation-input": ".2s",
        "--btn-text-case": "uppercase",
        "--btn-focus-scale": "0.95",
        "--navbar-padding": ".5rem",
        "--border-btn": "1px",
        "--tab-border": "1px",
        "--tab-radius": "0.5rem",
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
