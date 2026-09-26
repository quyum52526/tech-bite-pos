"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FeatureGroup, FeatureModule } from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";
import MockupWindow from "./MockupWindow";

type Props = { mod: FeatureModule; group: FeatureGroup; index: number };

/** Zoho-style split: capability accordion on one side, the matching live UI mockup on the other. */
export default function GroupShowcase({ mod, group, index }: Props) {
  const { t, num } = useI18n();
  const [activeKey, setActiveKey] = useState(group.items[0].key);
  const active = group.items.find((i) => i.key === activeKey) ?? group.items[0];
  const moduleLabel = t.features.modules[mod.slug].label;
  const flipped = index % 2 === 1;

  // Deep links: /features/[slug]#[anchor] opens that capability, switches the mockup and scrolls to it.
  useEffect(() => {
    let timer: number | undefined;
    const apply = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const hit = group.items.find((i) => i.anchor === hash);
      if (!hit) return;
      setActiveKey(hit.key);
      // Let the accordion settle, then scroll: the whole section on desktop (the mockup is beside it),
      // the capability itself on small screens (its mockup opens inside it).
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        document.getElementById(desktop ? group.id : hit.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      window.clearTimeout(timer);
    };
  }, [group]);

  const choose = (key: typeof activeKey, anchor: string) => {
    setActiveKey(key);
    // Keep the address bar shareable without triggering another scroll.
    history.replaceState(null, "", `#${anchor}`);
  };

  return (
    <section
      id={group.id}
      aria-labelledby={`${group.id}-title`}
      className={`scroll-mt-32 py-16 sm:py-20 ${flipped ? "border-y border-white/5 bg-white/[0.015]" : ""}`}
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
            {num(index + 1).padStart(2, num(0))} · {fill(t.showcase.capabilities, { n: num(group.items.length) })}
          </p>
          <h2 id={`${group.id}-title`} className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.features.groups[group.id]}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          {/* Accordion */}
          <div className={`min-w-0 space-y-3 ${flipped ? "lg:order-2" : ""}`}>
            {group.items.map((f) => {
              const open = f.key === active.key;
              const copy = t.features.items[f.key];
              const panelId = `${group.id}-${f.key}-panel`;
              const buttonId = `${group.id}-${f.key}-button`;
              return (
                <div
                  key={f.key}
                  id={f.anchor}
                  className={`relative scroll-mt-32 overflow-hidden rounded-2xl border transition-colors ${
                    open ? "border-brand-400/30 bg-white/[0.04]" : "border-white/5 bg-white/[0.015] hover:border-white/15"
                  }`}
                >
                  {open && (
                    <motion.span
                      layoutId={`accent-${group.id}`}
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-300 to-brand-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <h3>
                    <button
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => choose(f.key, f.anchor)}
                      className="flex w-full items-center gap-3 p-4 text-left sm:p-5"
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 transition ${
                          open
                            ? "bg-brand-500/20 text-brand-200 ring-brand-400/40"
                            : "bg-white/[0.03] text-slate-400 ring-white/10"
                        }`}
                      >
                        <f.icon className="h-5 w-5" />
                      </span>
                      <span className={`flex-1 text-[15px] font-semibold leading-snug ${open ? "text-white" : "text-slate-300"}`}>
                        {copy.title}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-180 text-brand-300" : ""}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-5 text-sm leading-relaxed text-slate-400 sm:pl-[4.75rem] sm:pr-6">
                          {copy.description}
                        </p>
                        {/* Small screens: the mockup sits inside the open item */}
                        <div className="px-2 pb-3 sm:px-3 sm:pb-4 lg:hidden">
                          <MockupWindow featureKey={f.key} icon={f.icon} moduleLabel={moduleLabel} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Large screens: the mockup follows the active item */}
          <div className={`sticky top-36 hidden lg:block ${flipped ? "lg:order-1" : ""}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <MockupWindow featureKey={active.key} icon={active.icon} moduleLabel={moduleLabel} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 text-center text-xs text-slate-500">
              {fill(t.showcase.step, {
                i: num(group.items.findIndex((i) => i.key === active.key) + 1),
                n: num(group.items.length),
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
