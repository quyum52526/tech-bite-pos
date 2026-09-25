"use client";

import { motion } from "framer-motion";
import { ArrowRight, CloudOff, GitBranch, MousePointerClick, RefreshCcw } from "lucide-react";
import PosMockup from "./PosMockup";
import RegisterButton from "./RegisterButton";
import { useI18n } from "@/lib/i18n";

const pillarIcons = [GitBranch, CloudOff, RefreshCcw];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.titleBefore}{" "}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-emerald-200 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>{" "}
            {t.hero.titleAfter}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{t.hero.subtitle}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <RegisterButton size="lg" className="w-full sm:w-auto" />
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <a href="#demo" className="btn-ghost w-full px-6 py-3 text-base sm:w-auto">
                <MousePointerClick className="h-5 w-5" /> {t.hero.tryDemo}
              </a>
              <a href="#features" className="btn-ghost w-full px-6 py-3 text-base sm:w-auto">
                {t.hero.exploreFeatures} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            {t.hero.pillars.map((label, i) => {
              const Icon = pillarIcons[i];
              return (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brand-400" /> {label}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <PosMockup />
        </motion.div>
      </div>
    </section>
  );
}
