"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, TrendingUp, X } from "lucide-react";
import { moduleHref, type FeatureModule, type GroupId } from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";

const POPOVER_WIDTH = 384; // px, shrinks to the container width on small screens
const EDGE = 20; // keeps the popover arrow clear of its rounded corners
const TREE_H = 56; // px between the module capsule and the pill tops (md and up)
const SPLIT_Y = 24; // where the trunk splits into branches
const MD = 768;

type Props = {
  mod: FeatureModule;
  /** The active tab in the module capsule above; the tree's trunk drops from its centre. */
  activeTab: HTMLElement | null;
  /** The scrolling capsule, so the trunk can follow the tab when the capsule scrolls. */
  capsule: HTMLElement | null;
};

type Tree = { trunk: number; pills: number[] };

/**
 * The active module's sub-categories as a small tree: from md up, an SVG trunk drops from the
 * active module tab, splits, and branches down into each sub-category pill; below md the pills
 * fall back to one sideways-scrolling row with no lines. Clicking a pill opens a quick-preview
 * popover beside it; clicking outside, pressing Escape or the close button dismisses it.
 */
export default function SubCategoryBar({ mod, activeTab, capsule }: Props) {
  const { t, num } = useI18n();
  const arrowId = `tree-arrow${useId().replace(/:/g, "")}`;
  const barRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Partial<Record<GroupId, HTMLButtonElement | null>>>({});
  const [tree, setTree] = useState<Tree | null>(null);
  const [open, setOpen] = useState<GroupId | null>(null);
  const [pop, setPop] = useState({ left: 0, width: POPOVER_WIDTH, arrow: 0 });

  const measureTree = useCallback(() => {
    const bar = barRef.current;
    if (!bar || !activeTab || window.innerWidth < MD) return setTree(null);
    const b = bar.getBoundingClientRect();
    const centre = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - b.left;
    };
    const pills = mod.groups.map((g) => pillRefs.current[g.id]).filter((el): el is HTMLButtonElement => !!el);
    setTree({ trunk: centre(activeTab), pills: pills.map(centre) });
  }, [activeTab, mod.groups]);

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
    measureTree();
    const remeasure = () => {
      measureTree();
      if (open) measurePopover(open);
    };
    // Tab and pill widths change with the language and web-font load, not just the window.
    const ro = new ResizeObserver(remeasure);
    [barRef.current, rowRef.current, capsule].forEach((el) => el && ro.observe(el));
    const row = rowRef.current;
    window.addEventListener("resize", remeasure);
    capsule?.addEventListener("scroll", measureTree, { passive: true });
    row?.addEventListener("scroll", remeasure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
      capsule?.removeEventListener("scroll", measureTree);
      row?.removeEventListener("scroll", remeasure);
    };
  }, [measureTree, measurePopover, capsule, open, mod.slug]);

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

  const spring = { type: "spring", bounce: 0.15, duration: 0.5 } as const;
  const span = tree && tree.pills.length ? [Math.min(tree.trunk, ...tree.pills), Math.max(tree.trunk, ...tree.pills)] : null;

  return (
    <div ref={barRef} className="relative mx-auto mt-4 w-full max-w-4xl md:mt-0 md:pt-14">
      {/* branching connector, md and up */}
      {tree && span && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 hidden w-full overflow-visible md:block"
          height={TREE_H}
        >
          <defs>
            <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M1,1 L9,5 L1,9 z" className="fill-emerald-400/80" />
            </marker>
          </defs>
          <g strokeWidth={1.5} strokeLinecap="round" fill="none">
            <motion.line
              className="stroke-emerald-500/60"
              initial={false}
              animate={{ x1: tree.trunk, x2: tree.trunk, y1: 2, y2: SPLIT_Y }}
              transition={spring}
            />
            <motion.line
              className="stroke-emerald-500/60"
              initial={false}
              animate={{ x1: span[0], x2: span[1], y1: SPLIT_Y, y2: SPLIT_Y }}
              transition={spring}
            />
            {tree.pills.map((x, i) => (
              <motion.line
                key={`${mod.slug}-${i}`}
                x1={x}
                x2={x}
                y1={SPLIT_Y}
                y2={TREE_H - 3}
                markerEnd={`url(#${arrowId})`}
                className={open === mod.groups[i]?.id ? "stroke-emerald-400" : "stroke-emerald-500/60"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
              />
            ))}
          </g>
          <motion.circle r={3.5} className="fill-emerald-400" initial={false} animate={{ cx: tree.trunk, cy: SPLIT_Y }} transition={spring} />
        </svg>
      )}

      <motion.ul
        ref={rowRef}
        key={mod.slug}
        role="group"
        aria-label={fill(t.matrix.preview.bar, { module: label })}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="-mx-1 flex items-center gap-2.5 overflow-x-auto px-1 py-2 [scrollbar-width:none] md:mx-0 md:justify-center md:gap-4 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
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
                className={`flex items-center gap-2.5 whitespace-nowrap rounded-full border py-2 pl-4 pr-2 text-sm font-medium shadow-lg shadow-black/40 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                  on
                    ? "border-emerald-400 bg-emerald-500/15 text-white shadow-emerald-500/10"
                    : "border-emerald-500/40 bg-slate-900 text-slate-200 hover:border-emerald-400 hover:bg-slate-800/80 hover:text-emerald-100"
                }`}
              >
                {t.features.groups[g.id]}
                <span
                  className={`grid h-6 min-w-[1.5rem] place-items-center rounded-full px-1.5 text-xs font-semibold tabular-nums ring-1 ${
                    on ? "bg-emerald-400 text-slate-950 ring-emerald-300" : "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30"
                  }`}
                >
                  {num(g.items.length)}
                </span>
              </button>
            </li>
          );
        })}
      </motion.ul>

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
