"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Layers3, MousePointerClick, Sparkles } from "lucide-react";
import RegisterButton from "@/components/RegisterButton";
import { countItems, featureModules, getModule, moduleHref, type ModuleSlug } from "@/lib/features";
import { fill, useI18n } from "@/lib/i18n";
import GroupShowcase from "./GroupShowcase";
import SubNav from "./SubNav";
import HeroVisual from "./HeroVisual";

export default function FeaturePage({ slug }: { slug: ModuleSlug }) {
  const { t, num } = useI18n();
  const mod = getModule(slug);
  if (!mod) return null;
  const copy = t.features.modules[slug];
  const others = featureModules.filter((m) => m.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
        {/* soft ambience: a faint grid that fades out fast, plus brand and warm-light glows */}
        <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_30%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -left-40 -top-32 h-[32rem] w-[40rem] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-24 h-[28rem] w-[32rem] rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-[36rem] rounded-full bg-sky-500/[0.07] blur-[100px]" />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300">
              {t.showcase.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#features" className="hover:text-slate-300">
              {t.showcase.features}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span aria-current="page" className="text-slate-300">
              {copy.label}
            </span>
          </nav>

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="eyebrow">
                <mod.icon className="h-3.5 w-3.5" /> {copy.label}
              </span>
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{copy.subtitle}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <RegisterButton size="lg" className="w-full sm:w-auto" />
                <Link href="/#demo" className="btn-ghost w-full px-6 py-3 text-base sm:w-auto">
                  <MousePointerClick className="h-5 w-5" /> {t.showcase.tryDemo}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-brand-300" />
                  {fill(t.showcase.capabilities, { n: num(countItems(mod)) })}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Layers3 className="h-3.5 w-3.5 text-brand-300" />
                  {fill(t.showcase.subModules, { n: num(mod.groups.length) })}
                </span>
              </div>
            </motion.div>

            <HeroVisual mod={mod} />
          </div>
        </div>
      </section>

      <SubNav mod={mod} />

      {mod.groups.map((g, i) => (
        <GroupShowcase key={g.id} mod={mod} group={g} index={i} />
      ))}

      {/* Other modules */}
      <section className="py-20">
        <div className="container-x">
          <div className="max-w-5xl">
            <h2 className="section-title section-title-line">{t.showcase.otherModules}</h2>
            <p className="mt-3 max-w-2xl text-slate-400">{t.showcase.otherModulesSubtitle}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={moduleHref(m.slug)}
                className="group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-brand-400/30 hover:bg-white/[0.04]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20">
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="mt-4 font-semibold text-white">{t.features.modules[m.slug].label}</span>
                <span className="mt-1 flex-1 text-xs leading-relaxed text-slate-400">{t.features.modules[m.slug].tagline}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-300">
                  {t.features.explore}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
