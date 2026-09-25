"use client";

import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function CtaBanner() {
  const { t, lang } = useI18n();
  const c = t.contact;
  return (
    <section id="contact" className="py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-brand-400/30 bg-gradient-to-br from-brand-600/40 via-ink-800 to-ink-900 p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="section-title">{c.title}</h2>
              <p className="mt-4 max-w-xl text-slate-300">{c.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(c.mailSubject)}`} className="btn-primary px-6">
                  {c.bookDemo} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#demo" className="btn-ghost px-6">
                  {c.tryDemo}
                </a>
              </div>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={`tel:${site.contactPhone}`} className="flex items-center gap-3 text-slate-300 hover:text-white">
                  <Phone className="h-5 w-5 shrink-0 text-brand-300" /> {site.contactPhoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <MessageCircle className="h-5 w-5 shrink-0 text-brand-300" /> {c.whatsapp} {site.contactPhoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contactEmail}`} className="flex items-center gap-3 break-all text-slate-300 hover:text-white">
                  <Mail className="h-5 w-5 shrink-0 text-brand-300" /> {site.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" /> {lang === "bn" ? site.addressBn : site.address}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
