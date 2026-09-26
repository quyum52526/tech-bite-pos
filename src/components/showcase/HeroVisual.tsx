"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Wifi } from "lucide-react";
import { countItems, type FeatureModule } from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";
import MockupWindow from "./MockupWindow";

// Decorative shelf stock behind the counter: [width, colour] per product block.
const shelves: [number, string][][] = [
  [[10, "bg-amber-400/25"], [7, "bg-emerald-400/20"], [12, "bg-sky-400/20"], [8, "bg-rose-400/20"], [10, "bg-amber-300/20"], [6, "bg-violet-400/20"]],
  [[8, "bg-sky-400/20"], [11, "bg-amber-400/20"], [9, "bg-emerald-400/25"], [7, "bg-amber-300/25"], [12, "bg-rose-400/15"]],
];

/**
 * Hero illustration for a module page: a shop counter with a POS terminal showing the
 * module's first capability, a receipt printing beside it, and store shelves behind.
 */
export default function HeroVisual({ mod, photo }: { mod: FeatureModule; photo?: string }) {
  if (photo) return <PhotoVisual mod={mod} photo={photo} />;
  return <Illustration mod={mod} />;
}

/**
 * With a store photo for the module: the product leads. The module's first capability fills
 * the main frame as a full-size app window; the store photo sits in a small window anchored
 * over its bottom-left corner. The window keeps empty room at the bottom so no data is hidden.
 */
function PhotoVisual({ mod, photo }: { mod: FeatureModule; photo: string }) {
  const { t } = useI18n();
  const first = mod.groups[0].items[0];
  const moduleLabel = t.features.modules[mod.slug].label;

  return (
    <div className="relative mx-auto w-full max-w-xl pb-16 sm:pb-20 lg:max-w-none">
      <div aria-hidden className="pointer-events-none absolute -right-10 top-4 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-10 bottom-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />

      {/* main frame: the app window */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <MockupWindow featureKey={first.key} icon={first.icon} moduleLabel={moduleLabel} bodyClassName="pb-24 sm:pb-28" />
      </motion.div>

      {/* overlay window: the store photo, anchored over the main frame's bottom-left corner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-0 left-3 z-10 w-[58%] sm:-left-6 sm:w-[46%]"
      >
        <div className="rounded-[1.25rem] border border-slate-700 bg-slate-950 p-1.5 shadow-2xl shadow-black/70 ring-1 ring-white/5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src={photo}
              alt={t.media.alt[mod.slug]}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 264px, 58vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/80 px-2.5 py-1 text-[11px] font-semibold text-slate-100 backdrop-blur">
              <MapPin className="h-3 w-3 shrink-0 text-emerald-400" />
              <span className="truncate">{t.media.badge[mod.slug]}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Fallback without a photo: the illustrated shop counter. */
function Illustration({ mod }: { mod: FeatureModule }) {
  const { t, num, taka } = useI18n();
  const first = mod.groups[0].items[0];
  const moduleLabel = t.features.modules[mod.slug].label;
  const lines = [
    { name: t.products.rice, amount: 420 },
    { name: t.products.oil, amount: 365 },
    { name: t.products.tea, amount: 185 },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-hidden>
      {/* warm store light + brand glow */}
      <div className="pointer-events-none absolute -right-10 top-4 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900/80 via-ink-900/80 to-ink-900 px-5 pb-6 pt-8 shadow-2xl shadow-black/50 sm:px-8">
        {/* shelves */}
        <div className="pointer-events-none absolute inset-x-6 top-6 space-y-7 opacity-80">
          {shelves.map((row, r) => (
            <div key={r}>
              <div className="flex items-end gap-1.5 px-2">
                {row.map(([w, c], i) => (
                  <span key={i} className={`rounded-t-md ${c}`} style={{ width: `${w}%`, height: `${18 + ((i * 7 + r * 5) % 16)}px` }} />
                ))}
              </div>
              <div className="h-1.5 rounded-full bg-gradient-to-r from-amber-900/40 via-amber-700/30 to-amber-900/40" />
            </div>
          ))}
        </div>

        {/* POS terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 mx-auto mt-10 w-[88%] sm:w-[82%]"
        >
          <div className="rounded-[1.4rem] border border-slate-700 bg-slate-950 p-2 shadow-2xl shadow-black/60 ring-1 ring-white/5">
            <div className="relative h-[17rem] overflow-hidden rounded-xl sm:h-[19rem]">
              <div className="origin-top scale-[0.92]">
                <MockupWindow featureKey={first.key} icon={first.icon} moduleLabel={moduleLabel} />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
            </div>
          </div>
          {/* stand */}
          <div className="mx-auto h-6 w-16 bg-gradient-to-b from-slate-700 to-slate-800 [clip-path:polygon(20%_0,80%_0,100%_100%,0_100%)]" />
          <div className="mx-auto h-2 w-40 rounded-full bg-slate-700" />
        </motion.div>

        {/* counter top */}
        <div className="relative z-0 -mx-8 -mt-1 h-10 bg-gradient-to-b from-amber-900/40 via-slate-800 to-slate-900 shadow-[inset_0_1px_0_rgba(251,191,36,0.25)]" />

        {/* receipt printer */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-7 left-3 z-20 w-36 sm:left-5 sm:w-40"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.8, ease: "easeOut" }}
            className="mx-auto w-[86%] rounded-t-sm bg-slate-100 px-2.5 pb-2 pt-2 font-mono text-[8.5px] leading-tight text-slate-800 shadow-lg"
          >
            <p className="text-center font-bold tracking-wide">{t.demo.receipt.shop}</p>
            <div className="my-1 border-t border-dashed border-slate-400" />
            {lines.map((l) => (
              <p key={l.name} className="flex justify-between gap-1">
                <span className="truncate">{l.name}</span>
                <span>{taka(l.amount)}</span>
              </p>
            ))}
            <div className="my-1 border-t border-dashed border-slate-400" />
            <p className="flex justify-between font-bold">
              <span>{t.demo.receipt.total}</span>
              <span>{taka(970)}</span>
            </p>
            <p className="mt-1 text-center text-[8px] font-bold text-emerald-700">✓ {t.demo.receipt.paid}</p>
          </motion.div>
          <div className="h-9 rounded-xl border border-slate-600 bg-gradient-to-b from-slate-700 to-slate-800 shadow-xl">
            <div className="mx-auto mt-1.5 h-1 w-[80%] rounded-full bg-slate-950" />
            <div className="ml-3 mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          </div>
        </motion.div>

        {/* card reader */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-7 right-4 z-20 hidden w-16 rounded-2xl border border-slate-600 bg-gradient-to-b from-slate-700 to-slate-900 p-1.5 shadow-xl sm:block"
        >
          <div className="grid h-8 place-items-center rounded-lg bg-slate-950 text-emerald-300">
            <Wifi className="h-4 w-4 rotate-90" />
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-1.5 rounded-sm bg-slate-600" />
            ))}
          </div>
        </motion.div>
      </div>

      {/* floating status chips */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -top-3 right-3 z-30 flex sm:right-6 items-center gap-2 rounded-full border border-emerald-400/30 bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> {t.mockup.synced}
        <span className="hidden sm:inline">· {t.hero.pillars[2]}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05 }}
        className="absolute -bottom-4 right-3 z-30 flex sm:right-8 items-center gap-2.5 rounded-2xl border border-white/10 bg-slate-900/95 px-3.5 py-2 shadow-xl backdrop-blur"
      >
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500 text-slate-950">
          <mod.icon className="h-4 w-4" />
        </span>
        <span className="text-xs leading-tight">
          <span className="block font-semibold text-white">{fill(t.showcase.capabilities, { n: num(countItems(mod)) })}</span>
          <span className="flex items-center gap-1 text-slate-400">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {t.hero.pillars[1]}
          </span>
        </span>
      </motion.div>
    </div>
  );
}
