// Business details shown on the landing page.
export const site = {
  name: "Tech BitePOS",
  contactEmail: "quyum52526@gmail.com",
  contactPhone: "+8801962434901",
  contactPhoneDisplay: "+880 1962-434901",
  whatsappUrl: "https://wa.me/8801962434901",
  address: "Ruby Gate, East Nasirabad, Baizid, Chittagong, Bangladesh",
  city: "Chittagong, Bangladesh",
};

// Yearly billing = 10 × monthly (2 months free).
export const YEARLY_MONTHS_BILLED = 10;

export type Plan = {
  name: string;
  description: string;
  monthly: number;
  highlight?: boolean;
  cta: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    description: "A single shop that wants a proper POS with real books.",
    monthly: 1500,
    cta: "Start free trial",
    features: [
      "1 branch · 2 tills",
      "Barcode POS with offline mode",
      "Stock, purchases & returns",
      "Automated double-entry ledger",
      "bKash / Nagad / Rocket ledgers",
      "Daily Z-report",
    ],
  },
  {
    name: "Growth",
    description: "Growing retailers with several branches and a team to manage.",
    monthly: 3000,
    highlight: true,
    cta: "Start free trial",
    features: [
      "Up to 5 branches · unlimited tills",
      "Everything in Starter",
      "Batch/expiry (FEFO) & Serial/IMEI",
      "Inter-branch transfers with GRN",
      "RFM segments & 4-tier loyalty",
      "SMS / WhatsApp receipts",
      "Role permissions & audit trail",
    ],
  },
  {
    name: "Enterprise",
    description: "Chains and distributors that need custom workflows and SLAs.",
    monthly: 5000,
    cta: "Talk to sales",
    features: [
      "Unlimited branches & tenants",
      "Everything in Growth",
      "BOM repackaging & landed costs",
      "Attendance, payroll & commissions",
      "Custom integrations & data migration",
      "Dedicated onboarding & priority support",
    ],
  },
];
