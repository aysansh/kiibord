# KIIBORD Auth Portal — Next.js 16

A fully integrated App Router experience for KIIBORD’s OTP-based authentication
flow. The original Vite UI has been migrated into the standard Next.js `app`
directory with proper metadata, sitemap, robots, and semantic markup for SEO.

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project structure

- `app/` – App Router entry points, global layout, SEO routes (robots + sitemap)
- `src/` – Feature code from the original UI (`components`, `hooks`, `lib`, etc.)
- `public/` – Static assets, including the Open Graph image

## Production build

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```
