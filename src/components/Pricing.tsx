"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { plans } from "@/lib/site";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title mt-4">Simple pricing that scales with your branches</h2>
          <p className="mt-4 text-slate-400">Every plan includes offline mode, updates and the full accounting core.</p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm">
            {[
              { label: "Monthly", value: false },
              { label: "Yearly", value: true },
            ].map((o) => (
              <button
                key={o.label}
                onClick={() => setYearly(o.value)}
                className={`relative rounded-full px-4 py-1.5 font-medium transition ${
                  yearly === o.value ? "text-white" : "text-slate-400"
                }`}
              >
                {yearly === o.value && (
                  <motion.span layoutId="billing" className="absolute inset-0 rounded-full bg-brand-500" />
                )}
                <span className="relative">
                  {o.label}
                  {o.value && <span className="ml-1.5 text-xs text-brand-200">2 months free</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  plan.highlight
                    ? "border-brand-400/50 bg-gradient-to-b from-brand-500/15 to-ink-800/40 shadow-2xl shadow-brand-500/10"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-8 flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles className="h-3.5 w-3.5" /> Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  {price === null ? (
                    <span className="text-4xl font-bold text-white">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-white">৳{price.toLocaleString("en-IN")}</span>
                      <span className="text-sm text-slate-400">/{yearly ? "year" : "month"}</span>
                    </>
                  )}
                </div>
                <a href="#contact" className={`${plan.highlight ? "btn-primary" : "btn-ghost"} mt-6`}>
                  {plan.cta}
                </a>
                <ul className="mt-8 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
