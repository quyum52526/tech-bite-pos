# Tech BitePOS — Landing Page

Marketing site for Tech BitePOS, a multi-tenant POS, inventory and double-entry accounting platform.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

```
src/
  app/            layout, page, global styles, icon.svg (favicon)
  components/     Navbar, Hero, PosMockup, Features, PosDemo, UseCases, Pricing, CtaBanner, Footer
  lib/features.ts feature categories: structure and icons
  lib/i18n/       en.ts (source) + bn.ts (Bangla, type-checked against en) and the LanguageProvider
  lib/site.ts     contact details and pricing plans (yearly = 10 × monthly)
public/logo.svg   brand mark used in the navbar and footer
```

## Languages (EN / বাংলা)

All copy lives in `src/lib/i18n/en.ts` and `src/lib/i18n/bn.ts`. `bn.ts` is typed against `en.ts`, so a
missing Bangla string fails the build. The visitor's choice is saved in `localStorage`; a link with
`?lang=bn` opens the site directly in Bangla (useful for Bangla ads and posts).
