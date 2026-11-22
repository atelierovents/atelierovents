/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Palette reprise du logo : le pétrole du lettrage, l'or et le brun du monogramme.
        brand: {
          DEFAULT: '#003c50',
          dark: '#002a38',
          light: '#0b5a72',
          50: '#eef4f6',
          100: '#d8e6ea',
        },
        gold: {
          DEFAULT: '#b8860b',
          dark: '#8f6908',
          light: '#d9a521',
          50: '#fdf8ea',
        },
        wood: {
          DEFAULT: '#6b4423',
          dark: '#4f321a',
        },
      },
      // Nunito Sans pour tout le texte : ses terminaisons arrondies prolongent
      // la géométrie de Quicksand, la police du logo (vectorisée dans le SVG).
      fontFamily: {
        sans: ['"Nunito Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      // Le contenu Markdown (prose) suit la même palette que le reste du site.
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.stone.700'),
            '--tw-prose-lead': theme('colors.stone.600'),
            '--tw-prose-headings': theme('colors.brand.DEFAULT'),
            '--tw-prose-links': theme('colors.gold.dark'),
            '--tw-prose-bold': theme('colors.stone.900'),
            '--tw-prose-hr': theme('colors.stone.200'),
            '--tw-prose-bullets': theme('colors.gold.DEFAULT'),
            '--tw-prose-counters': theme('colors.gold.dark'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
