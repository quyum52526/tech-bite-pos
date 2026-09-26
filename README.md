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
  app/                    layout, home page, global styles, icon.svg (favicon)
  app/features/[slug]/    one statically generated page per feature module
  components/             Navbar, Hero, PosMockup, CapabilitiesMatrix (home feature directory), PosDemo,
                          UseCases, Pricing, CtaBanner, Footer, DocumentTitle
  components/showcase/    feature-page UI: FeaturePage, HeroVisual (counter illustration), SubNav (floating capsule), GroupShowcase
                          (accordion + mockup split), MockupWindow (renderer), mockups.ts (screen data)
  lib/features.ts         modules → sub-modules → capabilities: structure, icons and URL anchors
  lib/i18n/               en.ts (source) + bn.ts (Bangla, type-checked against en) and the LanguageProvider
  lib/site.ts             contact details and pricing plans (yearly = 10 × monthly)
public/logo.svg           brand mark used in the navbar and footer
```

## Feature pages

| Route | Sub-modules |
|---|---|
| `/features/pos-billing` | Checkout & Registers · Cash Control · Layaways, Quotes & Returns |
| `/features/inventory-supply-chain` | Batch & Serial Tracking · Transfers & Purchasing · Audits & Production |
| `/features/double-entry-accounting` | Journals & Vouchers · Landed Cost & MFS · Daily & Year-End Closing |
| `/features/hr-payroll` | Staff & Access · Attendance & Shifts · Payroll & Commissions |
| `/features/reports-analytics` | Financial Statements · Books & Balances · Performance & BI |
| `/features/omnichannel-growth` | Online Orders & Dues · SMS & RFM · Loyalty & Promotions |

### Deep links

Every capability has an `anchor` in `lib/features.ts`, e.g. `/features/hr-payroll#attendance-shift-logs`.
Opening that URL (or clicking the capability in the home Capabilities Matrix) scrolls to its sub-module,
opens its accordion item and switches the mockup to it. Sub-module ids (`#time`, `#pay`, …) also work, and
clicking an accordion item updates the hash so the address bar is always shareable. Keep anchors stable:
they are public URLs.

To add a capability: add its copy to `features.items` in `en.ts` and `bn.ts`, list it (with an anchor) under a group in
`lib/features.ts`, and give it a screen in `components/showcase/mockups.ts` (the `Record<FeatureKey, …>`
type makes a missing screen a build error). Every word on a mockup comes from `showcase.mock` in the
dictionaries, so screens switch language with the rest of the site.

## Languages (EN / বাংলা)

All copy lives in `src/lib/i18n/en.ts` and `src/lib/i18n/bn.ts`. `bn.ts` is typed against `en.ts`, so a
missing Bangla string fails the build. The visitor's choice is saved in `localStorage`; a link with
`?lang=bn` opens the site directly in Bangla (useful for Bangla ads and posts).
