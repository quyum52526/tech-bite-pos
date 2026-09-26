"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { countItems, featureModules, moduleHref } from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";

/** Home overview: one card per module, each linking to its dedicated /features/[slug] page. */
export default function Features() {
  const { t, num } = useI18n();

  return (
    <section id="features" className="relative py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.features.eyebrow}</span>
          <h2 className="section-title mt-4">{t.features.title}</h2>
          <p className="mt-4 text-slate-400">{t.features.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureModules.map((m, i) => {
            const copy = t.features.modules[m.slug];
            return (
              <motion.div
                key={m.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={moduleHref(m.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-brand-400/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20 transition group-hover:bg-brand-500/20">
                      <m.icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                      {fill(t.nav.capabilities, { n: num(countItems(m)) })}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{copy.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{copy.tagline}</p>
                  <ul className="mt-5 flex flex-1 flex-wrap content-start gap-1.5">
                    {m.groups.map((g) => (
                      <li
                        key={g.id}
                        className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
                      >
                        {t.features.groups[g.id]}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
                    {t.features.explore}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
