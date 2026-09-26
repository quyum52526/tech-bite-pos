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

  // Scroll-spy: the active sub-module is the last section whose top has passed under the capsule.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      let current: GroupId = mod.groups[0].id;
      for (const g of mod.groups) {
        const el = document.getElementById(g.id);
        if (el && el.getBoundingClientRect().top <= 170) current = g.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
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
    // Transparent sticky rail; only the capsule itself is visible and clickable.
    <div className="pointer-events-none sticky top-[4.5rem] z-40 py-3">
      <div className="container-x flex justify-center">
        <nav
          ref={barRef}
          aria-label={t.showcase.subNav}
          className="pointer-events-auto inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-700/80 bg-slate-900/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <span
            aria-hidden
            className="mr-1 hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-800 text-emerald-400 sm:grid"
          >
            <mod.icon className="h-4 w-4" />
          </span>
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
                className={`relative shrink-0 whitespace-nowrap rounded-full py-2 text-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                  on ? "px-5 font-semibold text-slate-950" : "px-4 font-medium text-slate-400 hover:text-white"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="subnav-pill"
                    className="absolute inset-0 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30"
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
