"use client";

import { motion } from "framer-motion";
import { Pill, ShoppingBasket, Shirt, Smartphone, Warehouse, CloudOff, Scale, Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const useCases = [
  { id: "grocery", icon: ShoppingBasket },
  { id: "pharmacy", icon: Pill },
  { id: "electronics", icon: Smartphone },
  { id: "fashion", icon: Shirt },
  { id: "wholesale", icon: Warehouse },
] as const;

const proofPoints = [
  { id: "offline", icon: CloudOff },
  { id: "balance", icon: Scale },
  { id: "tenant", icon: Layers },
] as const;

export default function UseCases() {
  const { t } = useI18n();
  const u = t.useCases;
  return (
    <section id="use-cases" className="relative py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{u.eyebrow}</span>
          <h2 className="section-title mt-4">{u.title}</h2>
          <p className="mt-4 text-slate-400">{u.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 ${
                i === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <c.icon className="h-7 w-7 text-brand-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">{u.items[c.id].title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{u.items[c.id].body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {u.items[c.id].tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col justify-between rounded-2xl border border-brand-400/30 bg-brand-500/10 p-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{u.other.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{u.other.body}</p>
            </div>
            <a href="#contact" className="btn-primary mt-6 self-start">
              {u.other.cta}
            </a>
          </motion.article>
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:grid-cols-3">
          {proofPoints.map((p) => (
            <div key={p.id} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-white">{u.proof[p.id].title}</h3>
                <p className="mt-1 text-sm text-slate-400">{u.proof[p.id].body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
