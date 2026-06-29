# Prisma — Creative Studio Landing

Dark, cinematic one-page landing (Hero, About, Features) built with **React**, **Vite**, **TypeScript**, **Tailwind CSS v3**, **Framer Motion**, and **Lucide React**.

## Run locally

```bash
cd prisma-landing
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Fonts

Configured in `index.css` (global **Almarai**) and Tailwind **`font-serif`** (**Instrument Serif** for italic accents in About). Families are loaded from Google Fonts in `index.html`.

## Stack notes

- **Tailwind** is pinned to **v3** so the classic `@tailwind` directives and `tailwind.config.js` work with PostCSS (`tailwindcss v4` uses a separate PostCSS package).
