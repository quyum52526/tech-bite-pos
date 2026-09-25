import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section id="contact" className="py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-brand-400/30 bg-gradient-to-br from-brand-600/40 via-ink-800 to-ink-900 p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="section-title">Ready to see your own store running on Tech BitePOS?</h2>
              <p className="mt-4 max-w-xl text-slate-300">
                Book a 30-minute walkthrough. We&apos;ll load a sample of your products and show you the POS, stock
                and ledger working together.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${site.contactEmail}?subject=Tech%20BitePOS%20demo%20request`} className="btn-primary px-6">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#demo" className="btn-ghost px-6">
                  Try the demo first
                </a>
              </div>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="h-5 w-5 text-brand-300" />
                <a href={`mailto:${site.contactEmail}`} className="hover:text-white">
                  {site.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Phone className="h-5 w-5 text-brand-300" /> {site.contactPhone}
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <MapPin className="h-5 w-5 text-brand-300" /> {site.location}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
