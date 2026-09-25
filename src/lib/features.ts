import type { LucideIcon } from "lucide-react";
import {
  ScanBarcode,
  Wallet,
  Vault,
  Boxes,
  CalendarClock,
  FileText,
  MessageSquareText,
  CalendarX,
  Cpu,
  Truck,
  ClipboardCheck,
  PackageOpen,
  BookOpenCheck,
  Ship,
  Smartphone,
  Receipt,
  FileMinus,
  PieChart,
  Trophy,
  Cake,
  Gift,
  Fingerprint,
  BadgePercent,
  ShieldCheck,
  History,
  ShoppingCart,
  Package,
  Calculator,
  HeartHandshake,
  Building2,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type FeatureCategory = {
  id: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  features: Feature[];
};

export const featureCategories: FeatureCategory[] = [
  {
    id: "sales",
    label: "Sales & POS",
    tagline: "A checkout built for rush hour, not demos.",
    icon: ShoppingCart,
    features: [
      {
        icon: ScanBarcode,
        title: "Barcode Scanning",
        description:
          "Scan any EAN, UPC or in-house label and the item lands in the cart instantly with its live price and stock. Weighted-item barcodes are decoded automatically so produce and meat sell at the correct amount.",
      },
      {
        icon: Wallet,
        title: "Cash Drawer Shifts",
        description:
          "Each cashier opens a shift with a counted float and closes it with a blind count. The system reconciles expected versus actual cash and flags every over or short.",
      },
      {
        icon: Vault,
        title: "Safe Drops",
        description:
          "When the drawer crosses a limit you set, the cashier is prompted to drop excess cash into the safe. Every drop is logged with time, amount and user, so the drawer never holds more than it should.",
      },
      {
        icon: Boxes,
        title: "Box ⇄ Piece Toggle",
        description:
          "Sell a full carton or a single piece from the same product with one tap. Stock is tracked in the base unit, so conversions between box and piece never drift.",
      },
      {
        icon: CalendarClock,
        title: "Layaways",
        description:
          "Reserve goods against a deposit and collect the balance in instalments. Reserved stock is held back from sale until the layaway is completed or cancelled.",
      },
      {
        icon: FileText,
        title: "Quotations",
        description:
          "Build a priced quote at the counter and send it to the customer as a PDF. When they accept, convert it to an invoice in one click without re-entering a single line.",
      },
      {
        icon: MessageSquareText,
        title: "Digital SMS / WhatsApp Receipts",
        description:
          "Send the receipt to the customer's phone by SMS or WhatsApp instead of printing. It saves paper and captures a contact number for your CRM on every sale.",
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory & Production",
    tagline: "Know exactly what you hold, where, and until when.",
    icon: Package,
    features: [
      {
        icon: CalendarX,
        title: "Batch & Expiry Tracking (FEFO)",
        description:
          "Every receipt is recorded with its batch number and expiry date. The POS picks the batch that expires first, and alerts warn you before stock goes out of date.",
      },
      {
        icon: Cpu,
        title: "Serial / IMEI Tracking",
        description:
          "Capture a serial or IMEI for each unit at purchase and again at sale. Warranty claims and returns trace back to the exact invoice in seconds.",
      },
      {
        icon: Truck,
        title: "Inter-Branch Transfers with GRN",
        description:
          "Dispatch stock from one branch and hold it in transit until the receiving branch confirms a Goods Received Note. Shortages found on receipt are recorded against the transfer, not lost.",
      },
      {
        icon: ClipboardCheck,
        title: "Physical Stock Audits",
        description:
          "Run full or cycle counts with a scanner while the store stays open. Variances are posted as adjustments with an approval step and a full audit trail.",
      },
      {
        icon: PackageOpen,
        title: "BOM Repackaging",
        description:
          "Define a bill of materials to break bulk stock into retail packs or combine items into bundles. Raw material is consumed and finished goods are produced at the correct cost.",
      },
    ],
  },
  {
    id: "accounting",
    label: "Accounting & Ledgers",
    tagline: "Every sale is a journal entry. Automatically.",
    icon: Calculator,
    features: [
      {
        icon: BookOpenCheck,
        title: "Automated Double-Entry Journals",
        description:
          "Sales, purchases, returns and payments post balanced debit and credit entries the moment they happen. Your trial balance is always current, with no month-end re-keying.",
      },
      {
        icon: Ship,
        title: "Landed Costs",
        description:
          "Spread freight, duty, LC charges and clearing costs across the items on an import. Product cost reflects the true landed cost, so your margins are real.",
      },
      {
        icon: Smartphone,
        title: "MFS Payment Ledgers (bKash / Nagad / Rocket)",
        description:
          "Each mobile wallet gets its own ledger, with transaction IDs captured at the counter. Reconcile against your merchant statement line by line, including MFS charges.",
      },
      {
        icon: Receipt,
        title: "Daily Closing Z-Reports",
        description:
          "Close the day with a Z-report that breaks down sales, returns, discounts, tax and every payment method. Once closed, the day is locked against back-dated edits.",
      },
      {
        icon: FileMinus,
        title: "Expense Vouchers",
        description:
          "Record petty cash and branch expenses against the right expense head with a receipt photo attached. Vouchers post to the ledger and appear on the branch P&L immediately.",
      },
    ],
  },
  {
    id: "crm",
    label: "CRM & Promotions",
    tagline: "Turn one-time buyers into regulars.",
    icon: HeartHandshake,
    features: [
      {
        icon: PieChart,
        title: "RFM Customer Segmentation",
        description:
          "Customers are scored on recency, frequency and monetary value from real purchase history. Target champions, win back those at risk, and stop discounting people who would buy anyway.",
      },
      {
        icon: Trophy,
        title: "4-Tier Loyalty Ladder",
        description:
          "Customers climb from Bronze to Silver, Gold and Platinum as they spend. Each tier earns points faster and unlocks its own perks at checkout.",
      },
      {
        icon: Cake,
        title: "Birthday & Anniversary Coupons",
        description:
          "A personal coupon is issued automatically ahead of each customer's birthday or anniversary. It is delivered by SMS or WhatsApp and redeems at any branch.",
      },
      {
        icon: Gift,
        title: "Buy-X-Get-Y Promo Rules",
        description:
          "Build promotions like buy 2 get 1 free, or buy a phone and get a cover at half price. Rules apply at the till automatically, with start dates, end dates and branch limits.",
      },
    ],
  },
  {
    id: "security",
    label: "Multi-Branch & Security",
    tagline: "Run ten branches like you're standing in each one.",
    icon: Building2,
    features: [
      {
        icon: Fingerprint,
        title: "Branch Attendance & Payroll",
        description:
          "Staff clock in at their branch terminal and hours flow straight into payroll. Salaries, advances and deductions post to the ledger when payroll is approved.",
      },
      {
        icon: BadgePercent,
        title: "Sales Commissions",
        description:
          "Set commission rules by staff, product or category. Every sale is attributed to a salesperson and commission is calculated automatically for payroll.",
      },
      {
        icon: ShieldCheck,
        title: "Role Permissions",
        description:
          "Decide exactly who can give discounts, void bills, edit prices or see cost. Sensitive actions can require a manager PIN at the counter.",
      },
      {
        icon: History,
        title: "Audit Trail",
        description:
          "Every create, edit, delete and void is logged with the user, time, branch and before-and-after values. Nothing disappears, so disputes are settled with facts.",
      },
    ],
  },
];
