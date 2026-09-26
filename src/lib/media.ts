import fs from "node:fs";
import path from "node:path";
import type { ModuleSlug } from "@/lib/features";

// Server-only: resolved at build time. Drop a photo named after its slot into
// public/images/hero/ (home.jpg, pos-billing.webp, …) and the page picks it up on the
// next build; without one, the hero keeps its illustrated fallback. See docs/hero-photos.md.
export type HeroSlot = "home" | ModuleSlug;

const EXTENSIONS = ["avif", "webp", "jpg", "jpeg", "png"];

export function heroPhoto(slot: HeroSlot): string | undefined {
  for (const ext of EXTENSIONS) {
    const file = `/images/hero/${slot}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return file;
  }
  return undefined;
}
