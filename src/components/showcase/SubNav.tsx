"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { FeatureModule, GroupId } from "@/lib/features";
import { useI18n } from "@/lib/i18n";

/** Sticky pill bar under the navbar: jumps to each sub-module and tracks the one in view. */
export default function SubNav({ mod }: { mod: FeatureModule }) {
  const { t } = useI18n();
  const [active, setActive] = useState<GroupId>(mod.groups[0].id);
  const barRef = useRef<HTMLElement>(null);
  const lockUntil = useRef(0);

  // Scroll-spy: the section crossing the upper part of the viewport is the active one.
  useEffect(() => {
    const sections = mod.groups
      .map((g) => document.getElementById(g.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id as GroupId);
      },
      { rootMargin: "-130px 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [mod]);

  // Keep the active pill visible when the bar overflows on small screens.
  useEffect(() => {
    const bar = barRef.current;
    const pill = bar?.querySelector<HTMLElement>(`[data-pill="${active}"]`);
    if (!bar || !pill) return;
    bar.scrollTo({ left: pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const jump = useCallback((id: GroupId) => {
    setActive(id);
    lockUntil.current = Date.now() + 900;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }, []);

  return (
    <div className="sticky top-16 z-40 border-y border-white/5 bg-ink-900/85 backdrop-blur-xl">
      <div className="container-x flex items-center gap-4">
        <span className="hidden shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 md:flex">
          <mod.icon className="h-4 w-4 text-brand-400" />
          {t.showcase.subNav}
        </span>
        <nav
          ref={barRef}
          aria-label={t.showcase.subNav}
          className="-mx-4 flex flex-1 gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {mod.groups.map((g) => {
            const on = g.id === active;
            return (
              <a
                key={g.id}
                href={`#${g.id}`}
                data-pill={g.id}
                aria-current={on ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  jump(g.id);
                }}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  on ? "text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="subnav-pill"
                    className="absolute inset-0 rounded-full bg-brand-500/20 ring-1 ring-brand-400/40"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <span className="relative">{t.features.groups[g.id]}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
