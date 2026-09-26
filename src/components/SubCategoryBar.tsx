"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, TrendingUp, X } from "lucide-react";
import { moduleHref, type FeatureModule, type GroupId } from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";

const POPOVER_WIDTH = 384; // px, shrinks to the bar width on small screens
const EDGE = 20; // keeps the notch clear of the bar's rounded corners

type Props = {
  mod: FeatureModule;
  /** The active tab in the module capsule above; the bar's notch points at its centre. */
  activeTab: HTMLElement | null;
  /** The scrolling capsule, so the notch can follow the tab when the capsule scrolls. */
  capsule: HTMLElement | null;
};

/**
 * Compact row of the active module's sub-categories (one scrollable line on phones, wrapping from sm up), hung under the module capsule with a notch
 * pointing at the active tab. Clicking a pill opens a quick-preview popover beside it; clicking
 * outside, pressing Escape or the close button dismisses it.
 */
export default function SubCategoryBar({ mod, activeTab, capsule }: Props) {
  const { t, num } = useI18n();
  const barRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Partial<Record<GroupId, HTMLButtonElement | null>>>({});
  const [notchX, setNotchX] = useState<number | null>(null);
  const [open, setOpen] = useState<GroupId | null>(null);
  const [pop, setPop] = useState({ left: 0, width: POPOVER_WIDTH, arrow: 0 });

  const measureNotch = useCallback(() => {
    const bar = barRef.current;
    if (!bar || !activeTab) return;
    const b = bar.getBoundingClientRect();
    const tab = activeTab.getBoundingClientRect();
    const x = tab.left + tab.width / 2 - b.left;
    setNotchX(Math.min(Math.max(x, EDGE), b.width - EDGE));
  }, [activeTab]);

  const measurePopover = useCallback((id: GroupId) => {
    const bar = barRef.current;
    const pill = pillRefs.current[id];
    if (!bar || !pill) return;
    const b = bar.getBoundingClientRect();
    const p = pill.getBoundingClientRect();
    const width = Math.min(POPOVER_WIDTH, b.width);
    const center = p.left + p.width / 2 - b.left;
    const left = Math.min(Math.max(center - width / 2, 0), b.width - width);
    setPop({ left, width, arrow: Math.min(Math.max(center - left, EDGE), width - EDGE) });
  }, []);

  // Close the preview when the module changes.
  useEffect(() => setOpen(null), [mod.slug]);

  useLayoutEffect(() => {
    measureNotch();
    const onResize = () => {
      measureNotch();
      if (open) measurePopover(open);
    };
    const onRowScroll = () => open && measurePopover(open);
    const row = rowRef.current;
    window.addEventListener("resize", onResize);
    capsule?.addEventListener("scroll", measureNotch, { passive: true });
    row?.addEventListener("scroll", onRowScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      capsule?.removeEventListener("scroll", measureNotch);
      row?.removeEventListener("scroll", onRowScroll);
    };
  }, [measureNotch, measurePopover, capsule, open, mod.slug]);

  // Outside click and Escape dismiss the preview.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (popRef.current?.contains(target)) return;
      if (Object.values(pillRefs.current).some((el) => el?.contains(target))) return;
      setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      pillRefs.current[open]?.focus();
      setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (id: GroupId) => {
    if (open === id) return setOpen(null);
    measurePopover(id);
    setOpen(id);
  };

  const label = t.features.modules[mod.slug].label;
  const group = open ? mod.groups.find((g) => g.id === open) : undefined;

  return (
    <div ref={barRef} className="relative mx-auto mt-4 w-full max-w-4xl">
      {/* notch pointing up at the active module tab */}
      {notchX !== null && (
        <motion.span
          aria-hidden
          className="absolute -top-[7px] z-10 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-tl-[3px] border-l border-t border-emerald-400/25 bg-slate-900"
          initial={false}
          animate={{ left: notchX }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
        />
      )}

      <div
        role="group"
        aria-label={fill(t.matrix.preview.bar, { module: label })}
        className="rounded-2xl border border-emerald-400/25 bg-slate-900/95 px-2.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            ref={rowRef}
            key={mod.slug}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {mod.groups.map((g) => {
              const on = open === g.id;
              return (
                <li key={g.id} className="shrink-0">
                  <button
                    ref={(el) => {
                      pillRefs.current[g.id] = el;
                    }}
                    type="button"
                    onClick={() => toggle(g.id)}
                    aria-expanded={on}
                    aria-controls={on ? "matrix-subcategory-preview" : undefined}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                      on
                        ? "border-emerald-400/60 bg-emerald-500/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-emerald-400/40 hover:text-white"
                    }`}
                  >
                    {t.features.groups[g.id]}
                    <span
                      className={`rounded-full px-1.5 text-[11px] font-semibold tabular-nums ${
                        on ? "bg-emerald-400/20 text-emerald-200" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {num(g.items.length)}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {group && (
          <motion.div
            ref={popRef}
            id="matrix-subcategory-preview"
            role="dialog"
            aria-label={t.features.groups[group.id]}
            key={group.id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            style={{ left: pop.left, width: pop.width }}
            className="absolute top-full z-40 mt-3 text-left"
          >
            <span
              aria-hidden
              className="absolute -top-[7px] h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-tl-[3px] border-l border-t border-white/10 bg-slate-900"
              style={{ left: pop.arrow }}
            />
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/60">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300/80">{label}</p>
                  <h4 className="mt-0.5 font-semibold text-white">{t.features.groups[group.id]}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    pillRefs.current[group.id]?.focus();
                    setOpen(null);
                  }}
                  aria-label={t.matrix.preview.close}
                  className="-mr-1.5 -mt-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">{t.features.groupInfo[group.id].summary}</p>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {t.matrix.preview.capabilities}
              </p>
              <ul className="mt-2 space-y-1.5">
                {group.items.map((f) => (
                  <li key={f.key} className="flex items-start gap-2 text-[13px] leading-snug text-slate-200">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {t.features.items[f.key].title}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-400/15 bg-amber-400/[0.06] px-3 py-2.5">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p className="text-[13px] leading-snug text-slate-200">
                  <span className="font-semibold text-amber-200">{t.matrix.preview.value}: </span>
                  {t.features.groupInfo[group.id].value}
                </p>
              </div>

              <Link
                href={`${moduleHref(mod.slug)}#${group.id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                {t.matrix.preview.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
