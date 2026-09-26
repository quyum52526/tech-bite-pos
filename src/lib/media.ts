import fs from "node:fs";
import path from "node:path";
import type { ModuleSlug } from "@/lib/features";

// Server-only: resolved at build time. Drop a photo named after its slot into
// public/images/hero/ (home.jpg, pos-billing.webp, …) and the page picks it up on the
// next build; without one, the hero uses the default Unsplash photo below. See docs/hero-photos.md.
export type HeroSlot = "home" | ModuleSlug;

const unsplash = (id: string, w: number) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const DEFAULT_PHOTOS: Record<HeroSlot, string> = {
  home: unsplash("photo-1578916171728-46686eac8d58", 1600),
  "inventory-supply-chain": unsplash("photo-1586528116311-ad8dd3c8310d", 1200),
  "pos-billing": unsplash("photo-1556742049-0a67c5574f73", 1200),
  "double-entry-accounting": unsplash("photo-1554224155-8d04cb21cd6c", 1200),
  "hr-payroll": unsplash("photo-1522071820081-009f0129c71c", 1200),
  "reports-analytics": unsplash("photo-1460925895917-afdab827c52f", 1200),
  "omnichannel-growth": unsplash("photo-1586528116493-a029325540fa", 1200),
};

const EXTENSIONS = ["avif", "webp", "jpg", "jpeg", "png"];

export function heroPhoto(slot: HeroSlot): string {
  for (const ext of EXTENSIONS) {
    const file = `/images/hero/${slot}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return file;
  }
  return DEFAULT_PHOTOS[slot];
}
