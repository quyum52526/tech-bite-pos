"use client";

import { useEffect } from "react";
import type { ModuleSlug } from "@/lib/features";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Keeps the tab title in the visitor's language: the home title, or "<Module> — Tech BitePOS". */
export default function DocumentTitle({ slug }: { slug?: ModuleSlug }) {
  const { t } = useI18n();
  const title = slug ? `${t.features.modules[slug].label} — ${site.name}` : t.meta.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
