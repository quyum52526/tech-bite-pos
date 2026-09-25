"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { featureCategories, type CategoryId, type FeatureKey } from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";

function FeatureCard({ featureKey, icon: Icon, index }: { featureKey: FeatureKey; icon: LucideIcon; index: number }) {
  const { t } = useI18n();
  const feature = t.features.items[featureKey];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-brand-400/30 hover:bg-white/[0.04]"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20 transition group-hover:bg-brand-500/20">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  const { t, num } = useI18n();
  const [active, setActive] = useState(featureCategories[0].id);
  const [openMobile, setOpenMobile] = useState<CategoryId | null>(featureCategories[0].id);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<CategoryId>).detail;
      setActive(id);
      setOpenMobile(id);
    };
    window.addEventListener("select-feature-tab", onSelect);
    return () => window.removeEventListener("select-feature-tab", onSelect);
  }, []);

  const current = featureCategories.find((c) => c.id === active) ?? featureCategories[0];

  return (
    <section id="features" className="relative py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.features.eyebrow}</span>
          <h2 className="section-title mt-4">{t.features.title}</h2>
          <p className="mt-4 text-slate-400">{t.features.subtitle}</p>
        </div>

        {/* Desktop tabs */}
        <div className="mt-14 hidden md:block">
          {/* 7 modules: a grid instead of a single row, so long labels (and Bangla) wrap inside their cell */}
          <div
            role="tablist"
            className="grid grid-cols-4 gap-1.5 rounded-2xl border border-white/5 bg-white/[0.02] p-1.5 lg:grid-cols-7"
          >
            {featureCategories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`relative flex min-h-[5.5rem] flex-col items-center justify-center gap-2 rounded-xl px-2 py-3 text-center text-[13px] font-medium leading-snug transition ${
                  active === c.id ? "text-white" : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200"
                }`}
              >
                {active === c.id && (
                  <motion.span
                    layoutId="feature-tab"
                    className="absolute inset-0 rounded-xl bg-brand-500/20 ring-1 ring-brand-400/40"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <c.icon className={`relative h-5 w-5 ${active === c.id ? "text-brand-300" : ""}`} />
                <span className="relative">{t.features.categories[c.id].label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-10"
            >
              <p className="mb-6 text-center text-sm font-medium text-brand-300">{t.features.categories[current.id].tagline}</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {current.features.map((f, i) => (
                  <FeatureCard key={f.key} featureKey={f.key} icon={f.icon} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 space-y-3 md:hidden">
          {featureCategories.map((c) => {
            const open = openMobile === c.id;
            return (
              <div key={c.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <button
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenMobile(open ? null : c.id)}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/15 text-brand-300">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">{t.features.categories[c.id].label}</span>
                      <span className="block text-xs text-slate-400">{fill(t.nav.capabilities, { n: num(c.features.length) })}</span>
                    </span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 px-4 pb-4">
                        {c.features.map((f, i) => (
                          <FeatureCard key={f.key} featureKey={f.key} icon={f.icon} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
