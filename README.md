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
  app/            layout, page, global styles, favicon
  components/     Navbar, Hero, PosMockup, Features, PosDemo, UseCases, Pricing, CtaBanner, Footer
  lib/features.ts feature categories (icon, title, description) — edit copy here
  lib/site.ts     contact details and pricing plans — edit before launch
```

> Contact details and plan prices in `src/lib/site.ts` are placeholders. Confirm them before going live.
