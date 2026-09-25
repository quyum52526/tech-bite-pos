// Business details shown on the landing page.
// PLACEHOLDERS — confirm contact details and pricing before going live.
export const site = {
  name: "Tech BitePOS",
  contactEmail: "hello@techbitepos.com",
  contactPhone: "+880 1XXX-XXXXXX",
  location: "Chattogram, Bangladesh",
};

export type Plan = {
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  highlight?: boolean;
  cta: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    description: "A single shop that wants a proper POS with real books.",
    monthly: 1500,
    yearly: 15000,
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
    monthly: 4500,
    yearly: 45000,
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
    monthly: null,
    yearly: null,
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
