"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { en, type Dictionary } from "./en";
import { bn } from "./bn";

export type Lang = "en" | "bn";

const dictionaries: Record<Lang, Dictionary> = { en, bn };
const STORAGE_KEY = "tbp-lang";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  /** Locale-aware number: Bangla digits in BN, Latin digits in EN. */
  num: (n: number) => string;
  /** Taka amount, e.g. ৳1,500 / ৳১,৫০০ */
  taka: (n: number) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const isLang = (v: unknown): v is Lang => v === "en" || v === "bn";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore: ?lang= in the URL wins (shareable Bangla links), then the saved choice.
  useEffect(() => {
    let initial: Lang | null = null;
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLang(fromUrl)) initial = fromUrl;
    else {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (isLang(saved)) initial = saved;
      } catch {
        // storage unavailable (private mode) — stay on the default
      }
    }
    if (initial) setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const formatter = new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-IN");
    const num = (n: number) => formatter.format(n);
    return { lang, setLang, t: dictionaries[lang], num, taka: (n: number) => `৳${num(n)}` };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}

/** Replace {key} placeholders in a dictionary string. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}
