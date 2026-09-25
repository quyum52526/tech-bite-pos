"use client";

import { ArrowRight, Gift } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

type Props = {
  size?: "sm" | "lg";
  className?: string;
  onClick?: () => void;
};

/** Primary conversion CTA: app registration with the 3-months-free offer. */
export default function RegisterButton({ size = "sm", className = "", onClick }: Props) {
  const { t } = useI18n();
  const lg = size === "lg";

  return (
    <a
      href={site.registerUrl}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center rounded-2xl ${className}`}
    >
      {/* glow */}
      <span
        aria-hidden
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 opacity-60 blur-md transition group-hover:opacity-90 ${
          lg ? "animate-pulse" : ""
        }`}
      />
      <span
        className={`relative flex w-full items-center justify-center gap-2.5 rounded-2xl border border-amber-100/70 bg-gradient-to-b from-amber-300 to-amber-500 text-ink-900 shadow-lg shadow-amber-500/30 transition group-hover:from-amber-200 group-hover:to-amber-400 ${
          lg ? "px-7 py-3" : "px-4 py-1.5"
        }`}
      >
        <Gift className={lg ? "h-6 w-6" : "h-4 w-4"} aria-hidden />
        <span className="flex flex-col items-start text-left leading-tight">
          <span className={`font-extrabold ${lg ? "text-lg" : "text-sm"}`}>{t.register.cta}</span>
          <span
            className={`font-semibold text-ink-900/75 ${lg ? "text-xs" : "text-[10px]"}`}
          >
            {t.register.badge}
          </span>
        </span>
        {lg && <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden />}
      </span>
    </a>
  );
}
