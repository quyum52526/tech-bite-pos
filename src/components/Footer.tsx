"use client";

import Link from "next/link";
import Logo from "./Logo";
import { featureModules, moduleHref } from "@/lib/features";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer() {
  const { t, lang, num } = useI18n();
  const f = t.footer;
  const columns = [
    {
      title: f.product,
      links: [
        { label: f.interactiveDemo, href: "/#demo" },
        { label: t.nav.pricing, href: "/#pricing" },
        { label: t.nav.useCases, href: "/#use-cases" },
      ],
    },
    {
      title: f.contact,
      links: [
        { label: site.contactPhoneDisplay, href: `tel:${site.contactPhone}` },
        { label: t.contact.whatsapp, href: site.whatsappUrl },
        { label: site.contactEmail, href: `mailto:${site.contactEmail}` },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 py-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              {f.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm text-slate-500">{lang === "bn" ? site.addressBn : site.address}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{f.features}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {featureModules.map((m) => (
                <li key={m.slug}>
                  <Link href={moduleHref(m.slug)} className="text-slate-400 hover:text-white">
                    {t.features.modules[m.slug].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="break-all text-slate-400 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {num(new Date().getFullYear()).replace(/[,،]/g, "")} {site.name}. {f.rights}
          </p>
          <p>{lang === "bn" ? site.cityBn : site.city}</p>
        </div>
      </div>
    </footer>
  );
}
