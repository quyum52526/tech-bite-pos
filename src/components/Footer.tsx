import Logo from "./Logo";
import { featureCategories } from "@/lib/features";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Interactive Demo", href: "#demo" },
      { label: "Pricing", href: "#pricing" },
      { label: "Use Cases", href: "#use-cases" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: site.contactPhoneDisplay, href: `tel:${site.contactPhone}` },
      { label: "WhatsApp", href: site.whatsappUrl },
      { label: site.contactEmail, href: `mailto:${site.contactEmail}` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Multi-tenant POS, inventory and double-entry accounting for modern retail.
            </p>
            <p className="mt-4 max-w-xs text-sm text-slate-500">{site.address}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Features</p>
            <ul className="mt-4 space-y-2 text-sm">
              {featureCategories.map((c) => (
                <li key={c.id}>
                  <a href="#features" className="text-slate-400 hover:text-white">
                    {c.label}
                  </a>
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
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.city}</p>
        </div>
      </div>
    </footer>
  );
}
