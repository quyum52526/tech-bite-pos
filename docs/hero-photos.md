# Hero photos

The home hero and each `/features/[slug]` hero can show a real store photo. Put the file in
`public/images/hero/`, named after its slot, and rebuild: `lib/media.ts` finds it at build time and the
page uses it instead of the default Unsplash photo set in `lib/media.ts`. No code change is needed.

| File (any of .avif .webp .jpg .jpeg .png) | Where it shows | Brief |
|---|---|---|
| `home.jpg` | Home hero, full-width backdrop behind the headline (darkened) | Modern retail store / checkout lane, real products, warm lighting |
| `pos-billing.jpg` | POS & Billing hero, right column | Checkout counter with a barcode scanner and a POS register |
| `inventory-supply-chain.jpg` | Inventory & Supply Chain hero | Organised supermarket or warehouse aisles, stocked shelves |
| `double-entry-accounting.jpg` | Double-Entry Accounting hero | Store manager's desk, financial statements, tablet |
| `hr-payroll.jpg` | HR & Payroll hero | Retail staff working together on the shop floor |
| `reports-analytics.jpg` | Reports & Analytics hero | Owner reviewing a dashboard in a busy boutique |
| `omnichannel-growth.jpg` | Omnichannel & Growth hero | Packed parcels at an online-order dispatch counter |

## Size and format

- Landscape, at least **2000 px wide** for `home`, **1600 × 1200 (4:3)** for the module photos.
  Module photos are cropped to 4:3 (`object-cover`), so keep the subject near the centre and the
  bottom-left corner quiet: the POS terminal overlaps it.
- JPEG at ~80% quality is fine. `next/image` converts to AVIF/WebP and serves the size each screen needs.
- The home photo sits under a dark overlay, so the headline stays legible over any photo.

## Licence

Use photos you own or ones whose licence allows commercial use. Unsplash's free licence does; photos
marked **Unsplash+** do not unless you subscribe. Keep a note of each photo's source and author here:

| File | Source / author | Licence |
|---|---|---|
| | | |

Alt text for each slot is in `media.alt` in `src/lib/i18n/en.ts` and `bn.ts`. If a photo's content
differs from the brief above, update its alt text too.
