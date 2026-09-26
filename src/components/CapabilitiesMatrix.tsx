"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MousePointerClick } from "lucide-react";
import {
  capabilityHref,
  countItems,
  featureModules,
  moduleHref,
  totalCapabilities,
  totalGroups,
  type ModuleSlug,
} from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";
import SubCategoryBar from "./SubCategoryBar";

/**
 * Home "Capabilities Matrix": module tabs → a sub-category quick-preview bar → sub-category
 * cards → one pill per capability,
 * each deep-linking to /features/[slug]#[anchor], which opens that capability's mockup.
 */
export default function CapabilitiesMatrix() {
  const { t, num } = useI18n();
  const [active, setActive] = useState<ModuleSlug>(featureModules[0].slug);
  const tabRefs = useRef<Partial<Record<ModuleSlug, HTMLButtonElement | null>>>({});
  // state (not a ref) so the sub-category bar re-renders once the capsule has mounted
  const [capsule, setCapsule] = useState<HTMLDivElement | null>(null);
  const mod = featureModules.find((m) => m.slug === active) ?? featureModules[0];
  const copy = t.features.modules[mod.slug];

  const select = (slug: ModuleSlug) => {
    setActive(slug);
    tabRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = featureModules[(index + step + featureModules.length) % featureModules.length].slug;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const stats = [
    { value: totalCapabilities, label: t.matrix.stats.capabilities },
    { value: featureModules.length, label: t.matrix.stats.modules },
    { value: totalGroups, label: t.matrix.stats.groups },
  ];

  return (
    <section id="features" className="relative py-24">
      <div className="container-x">
        <div className="mx-auto max-w-6xl text-center">
          <span className="eyebrow">{t.matrix.eyebrow}</span>
          {/* One line from lg up: the size steps down at lg so the full sentence fits the container. */}
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:whitespace-nowrap lg:text-[2.15rem] xl:text-4xl">
            {t.matrix.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-400">{t.matrix.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {stats.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-baseline gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-400"
              >
                <span className="text-sm font-bold text-white">{num(s.value)}</span> {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Module selector: one elevated capsule, centred (uses the container gutter on xl); scrolls sideways when it doesn't fit */}
        <div className="mt-12 flex justify-center xl:-mx-8">
          <div
            ref={setCapsule}
            role="tablist"
            aria-label={t.matrix.tablist}
            className="inline-flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-slate-700/80 bg-slate-900/90 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featureModules.map((m, i) => {
              const on = m.slug === active;
              return (
                <button
                  key={m.slug}
                  ref={(el) => {
                    tabRefs.current[m.slug] = el;
                  }}
                  id={`matrix-tab-${m.slug}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls="matrix-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(m.slug)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                    on ? "font-semibold text-slate-950" : "font-medium text-slate-400 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="matrix-tab"
                      className="absolute inset-0 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  <span className="relative">{t.features.modules[m.slug].label}</span>
                  <span
                    className={`relative min-w-[1.25rem] rounded-full px-1.5 py-px text-center text-[11px] font-semibold tabular-nums ${
                      on ? "bg-slate-950/15 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {num(countItems(m))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-category quick-preview bar, notched to the active tab */}
        <SubCategoryBar mod={mod} activeTab={capsule ? (tabRefs.current[mod.slug] ?? null) : null} capsule={capsule} />

        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <MousePointerClick className="h-4 w-4 shrink-0 text-brand-400" /> {t.matrix.helper}
        </p>

        {/* Active module panel */}
        <div
          id="matrix-panel"
          role="tabpanel"
          aria-labelledby={`matrix-tab-${mod.slug}`}
          className="mt-8 rounded-3xl border border-white/5 bg-white/[0.015] p-4 sm:p-6 lg:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mod.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25">
                    <mod.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{copy.label}</h3>
                    <p className="mt-0.5 text-sm text-slate-400">{copy.tagline}</p>
                  </div>
                </div>
                <Link href={moduleHref(mod.slug)} className="btn-ghost w-full shrink-0 py-2.5 text-center sm:w-auto">
                  {fill(t.matrix.openModule, { module: copy.label })} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {mod.groups.map((g, gi) => (
                  <motion.div
                    key={g.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + gi * 0.06 }}
                    className={`flex flex-col rounded-2xl border border-white/5 bg-ink-900/60 p-4 sm:p-5 ${
                      mod.groups.length === 3 && gi === 2 ? "md:col-span-2 xl:col-span-1" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {t.matrix.subCategory} {num(gi + 1)}
                        </p>
                        <Link
                          href={`${moduleHref(mod.slug)}#${g.id}`}
                          className="mt-1 block font-semibold text-white hover:text-brand-200"
                        >
                          {t.features.groups[g.id]}
                        </Link>
                      </div>
                      <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">
                        {fill(t.matrix.count, { n: num(g.items.length) })}
                      </span>
                    </div>
                    <ul
                      className={`mt-4 grid gap-2 ${
                        mod.groups.length === 3 && gi === 2 ? "md:grid-cols-2 xl:grid-cols-1" : ""
                      }`}
                    >
                      {g.items.map((f) => (
                        <li key={f.key}>
                          <Link
                            href={capabilityHref(mod.slug, f.anchor)}
                            className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm text-slate-300 transition hover:border-brand-400/40 hover:bg-brand-500/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300"
                          >
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-slate-400 ring-1 ring-white/10 transition group-hover:bg-brand-500/20 group-hover:text-brand-200 group-hover:ring-brand-400/40">
                              <f.icon className="h-4 w-4" />
                            </span>
                            <span className="flex-1 leading-snug">{t.features.items[f.key].title}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
