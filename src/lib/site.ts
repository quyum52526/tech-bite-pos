import type { Dictionary } from "@/lib/i18n/en";

// Business details shown on the landing page.
export const site = {
  name: "Tech BitePOS",
  registerUrl: "https://bitepos-rho.vercel.app/register",
  contactEmail: "quyum52526@gmail.com",
  contactPhone: "+8801962434901",
  contactPhoneDisplay: "+880 1962-434901",
  whatsappUrl: "https://wa.me/8801962434901",
  address: "Ruby Gate, East Nasirabad, Baizid, Chittagong, Bangladesh",
  addressBn: "রুবি গেট, পূর্ব নাসিরাবাদ, বায়েজিদ, চট্টগ্রাম, বাংলাদেশ",
  city: "Chittagong, Bangladesh",
  cityBn: "চট্টগ্রাম, বাংলাদেশ",
};

// Yearly billing = 10 × monthly (2 months free).
export const YEARLY_MONTHS_BILLED = 10;

export type PlanId = keyof Dictionary["pricing"]["plans"];

export type Plan = {
  id: PlanId;
  monthly: number;
  highlight?: boolean;
  /** register → app sign-up (3 months free); contact → sales conversation */
  cta: "register" | "contact";
};

// Plan names, descriptions and feature lists live in src/lib/i18n/{en,bn}.ts.
export const plans: Plan[] = [
  { id: "starter", monthly: 1500, cta: "register" },
  { id: "growth", monthly: 3000, highlight: true, cta: "register" },
  { id: "enterprise", monthly: 5000, cta: "contact" },
];
