"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Play, X } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import RegisterButton from "./RegisterButton";
import { featureModules, moduleHref } from "@/lib/features";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const pathname = usePathname();

  // Home sections are addressed from every page ("/#demo"); the contact banner is on every page.
  const links = [
    { href: "/#demo", label: t.nav.demo },
    { href: "/#use-cases", label: t.nav.useCases },
    { href: "/#pricing", label: t.nav.pricing },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigating to another page.
  useEffect(() => {
    setFeaturesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-white/5 bg-ink-900/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white"
              aria-expanded={featuresOpen}
              onClick={() => setFeaturesOpen((v) => !v)}
            >
              {t.nav.features} <ChevronDown className={`h-4 w-4 transition ${featuresOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {featuresOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-2"
                >
                  <div className="rounded-2xl border border-white/10 bg-ink-800/95 p-2 shadow-2xl backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-1">
                      {featureModules.map((m) => {
                        const href = moduleHref(m.slug);
                        const current = pathname === href;
                        return (
                          <Link
                            key={m.slug}
                            href={href}
                            aria-current={current ? "page" : undefined}
                            onClick={() => setFeaturesOpen(false)}
                            className={`flex gap-3 rounded-xl p-3 transition hover:bg-white/5 ${current ? "bg-white/5" : ""}`}
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-brand-300">
                              <m.icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-white">
                                {t.features.modules[m.slug].label}
                              </span>
                              <span className="block text-xs text-slate-400">{t.features.modules[m.slug].tagline}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/#features"
                      onClick={() => setFeaturesOpen(false)}
                      className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border-t border-white/5 px-3 py-2.5 text-xs font-semibold text-brand-300 hover:bg-white/5"
                    >
                      {t.nav.allModules} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white xl:hidden"
          >
            {t.nav.contact}
          </a>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a href="#contact" className="btn-ghost hidden whitespace-nowrap py-2 xl:inline-flex">
            {t.nav.contact}
          </a>
          <a href="/#demo" className="btn-ghost hidden whitespace-nowrap py-2 xl:inline-flex">
            <Play className="h-4 w-4" /> {t.nav.liveDemo}
          </a>
          <RegisterButton />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            className="rounded-lg p-2 text-slate-300"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-white/5 bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x space-y-1 py-4">
              <RegisterButton className="mb-4 w-full" onClick={() => setMobileOpen(false)} />
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t.nav.features}
              </p>
              {featureModules.map((m) => {
                const href = moduleHref(m.slug);
                return (
                  <Link
                    key={m.slug}
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 ${
                      pathname === href ? "bg-white/5 text-white" : ""
                    }`}
                  >
                    <m.icon className="h-4 w-4 text-brand-400" /> {t.features.modules[m.slug].label}
                  </Link>
                );
              })}
              <div className="my-2 h-px bg-white/5" />
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-ghost">
                  {t.nav.contact}
                </a>
                <a href="/#demo" onClick={() => setMobileOpen(false)} className="btn-ghost">
                  <Play className="h-4 w-4" /> {t.nav.liveDemo}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
