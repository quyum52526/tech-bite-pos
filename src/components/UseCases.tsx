"use client";

import { motion } from "framer-motion";
import { Pill, ShoppingBasket, Shirt, Smartphone, Warehouse, CloudOff, Scale, Layers } from "lucide-react";

const useCases = [
  {
    icon: ShoppingBasket,
    title: "Supermarkets & Grocers",
    body: "Fast barcode checkout, weighted items, Box⇄Piece selling and shift-level cash control for busy counters.",
    tags: ["Box⇄Piece", "Safe drops", "Z-reports"],
  },
  {
    icon: Pill,
    title: "Pharmacies",
    body: "Batch and expiry tracking with FEFO picking, so the oldest stock sells first and nothing expires on the shelf.",
    tags: ["FEFO", "Expiry alerts", "Stock audits"],
  },
  {
    icon: Smartphone,
    title: "Electronics & Mobile Shops",
    body: "Serial and IMEI captured on every unit, with warranty lookups, layaways and salesperson commissions.",
    tags: ["IMEI", "Layaways", "Commissions"],
  },
  {
    icon: Shirt,
    title: "Fashion & Lifestyle",
    body: "Loyalty tiers, birthday coupons and Buy-X-Get-Y promotions that bring customers back across every branch.",
    tags: ["Loyalty", "Promotions", "RFM"],
  },
  {
    icon: Warehouse,
    title: "Distributors & Wholesalers",
    body: "Quotations, landed costs on imports, BOM repackaging and inter-branch transfers with GRN confirmation.",
    tags: ["Landed cost", "BOM", "GRN"],
  },
];

const proofPoints = [
  {
    icon: CloudOff,
    title: "Offline-first",
    body: "Tills keep selling without internet and sync every sale the moment the connection returns.",
  },
  {
    icon: Scale,
    title: "Books that balance",
    body: "Every transaction posts a balanced journal, so your accountant starts from a correct trial balance.",
  },
  {
    icon: Layers,
    title: "Multi-tenant by design",
    body: "Each business and branch keeps its data isolated while head office sees the consolidated picture.",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Use Cases</span>
          <h2 className="section-title mt-4">Built for the way your business actually sells</h2>
          <p className="mt-4 text-slate-400">
            The same core, configured for the problems each type of retailer faces every day.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u, i) => (
            <motion.article
              key={u.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 ${
                i === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <u.icon className="h-7 w-7 text-brand-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{u.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {u.tags.map((t) => (
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
              <h3 className="text-lg font-semibold text-white">Different setup?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Restaurants, hardware, cosmetics or a mix of all three — tell us how you sell and we&apos;ll show you
                the workflow.
              </p>
            </div>
            <a href="#contact" className="btn-primary mt-6 self-start">
              Book a walkthrough
            </a>
          </motion.article>
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:grid-cols-3">
          {proofPoints.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
