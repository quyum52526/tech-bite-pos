"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { featureCategories, type Feature } from "@/lib/features";

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-brand-400/30 hover:bg-white/[0.04]"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20 transition group-hover:bg-brand-500/20">
        <feature.icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  const [active, setActive] = useState(featureCategories[0].id);
  const [openMobile, setOpenMobile] = useState<string | null>(featureCategories[0].id);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
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
          <span className="eyebrow">Features</span>
          <h2 className="section-title mt-4">One platform. Every counter, shelf and ledger.</h2>
          <p className="mt-4 text-slate-400">
            Point of sale, deep inventory, accounting, CRM and branch security in one system that shares a single
            source of truth.
          </p>
        </div>

        {/* Desktop tabs */}
        <div className="mt-14 hidden md:block">
          <div role="tablist" className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-1.5">
            {featureCategories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active === c.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {active === c.id && (
                  <motion.span
                    layoutId="feature-tab"
                    className="absolute inset-0 rounded-xl bg-brand-500/20 ring-1 ring-brand-400/40"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <c.icon className="relative h-4 w-4" />
                <span className="relative">{c.label}</span>
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
              <p className="mb-6 text-center text-sm font-medium text-brand-300">{current.tagline}</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {current.features.map((f, i) => (
                  <FeatureCard key={f.title} feature={f} index={i} />
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
                      <span className="block font-semibold text-white">{c.label}</span>
                      <span className="block text-xs text-slate-400">{c.features.length} capabilities</span>
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
                          <FeatureCard key={f.title} feature={f} index={i} />
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
