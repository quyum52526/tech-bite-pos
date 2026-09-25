"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "bn", label: "বাংলা" },
];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  // Unique per instance: desktop and mobile switchers are both mounted, and a
  // shared layoutId would make the pill animate into the hidden one.
  const pillId = `lang-pill-${useId()}`;

  return (
    <div
      role="radiogroup"
      aria-label={t.nav.language}
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs font-semibold ${className}`}
    >
      <Languages className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-slate-400" aria-hidden />
      {options.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={lang === o.value}
          lang={o.value}
          onClick={() => setLang(o.value)}
          className={`relative rounded-full px-2.5 py-1 transition ${
            lang === o.value ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {lang === o.value && (
            <motion.span
              layoutId={pillId}
              className="absolute inset-0 rounded-full bg-brand-500"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
