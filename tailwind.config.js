/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
    theme: {
      extend: {
        colors: {
          white: 'var(--color-white)',
          dark: 'var(--color-dark)',

          'gray-50': 'var(--color-gray-50)',
          'gray-100': 'var(--color-gray-100)',
          'gray-150': 'var(--color-gray-150)',
          'gray-200': 'var(--color-gray-200)',
          'gray-250': 'var(--color-gray-250)',
          'gray-300': 'var(--color-gray-300)',
          'gray-350': 'var(--color-gray-350)',
          'gray-400': 'var(--color-gray-400)',
          'gray-450': 'var(--color-gray-450)',
          'gray-500': 'var(--color-gray-500)',
          'gray-550': 'var(--color-gray-550)',
          'gray-600': 'var(--color-gray-600)',
          'gray-650': 'var(--color-gray-650)',
          'gray-700': 'var(--color-gray-700)',
          'gray-750': 'var(--color-gray-750)',
          'gray-800': 'var(--color-gray-800)',
          'gray-850': 'var(--color-gray-850)',
          'gray-900': 'var(--color-gray-900)',

          'primary-100': 'var(--color-primary-100)',
          'primary-200': 'var(--color-primary-200)',
          'primary-300': 'var(--color-primary-300)',
          'primary-400': 'var(--color-primary-400)',
          'primary-500': 'var(--color-primary-500)',
          'primary-600': 'var(--color-primary-600)',
          'primary-700': 'var(--color-primary-700)',
          'primary-800': 'var(--color-primary-800)',
          'primary-900': 'var(--color-primary-900)',

          'secondary-100': 'var(--color-secondary-100)',
          'secondary-200': 'var(--color-secondary-200)',
          'secondary-300': 'var(--color-secondary-300)',
          'secondary-400': 'var(--color-secondary-400)',
          'secondary-500': 'var(--color-secondary-500)',
          'secondary-600': 'var(--color-secondary-600)',
          'secondary-700': 'var(--color-secondary-700)',
          'secondary-800': 'var(--color-secondary-800)',
          'secondary-900': 'var(--color-secondary-900)',

          'warning-100': 'var(--color-warning-100)',
          'warning-200': 'var(--color-warning-200)',
          'warning-300': 'var(--color-warning-300)',
          'warning-400': 'var(--color-warning-400)',
          'warning-500': 'var(--color-warning-500)',
          'warning-600': 'var(--color-warning-600)',
          'warning-700': 'var(--color-warning-700)',
          'warning-800': 'var(--color-warning-800)',
          'warning-900': 'var(--color-warning-900)',

          'success-100': 'var(--color-success-100)',
          'success-200': 'var(--color-success-200)',
          'success-300': 'var(--color-success-300)',
          'success-400': 'var(--color-success-400)',
          'success-500': 'var(--color-success-500)',
          'success-600': 'var(--color-success-600)',
          'success-700': 'var(--color-success-700)',
          'success-800': 'var(--color-success-800)',
          'success-900': 'var(--color-success-900)',
        }
      }
    },
    variants: {
      extend: {},
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4E19E0",
          "secondary": "#00A8E8",
          "accent": "#37cdbe",
          "neutral": "#1c1825",
          "base-100": "#1c1825",
          "base-200": "#272334",
          "base-300": "#403956",
          "base-400": "#7b6f9f",
          "base-content": "#ffffff",
          "success": "#93CB00",
          "warning": "#E88700",
          "error": "#e83058",
          "info":"#3449E2"
        },
      },
      "mytheme",
    ],
  },
}