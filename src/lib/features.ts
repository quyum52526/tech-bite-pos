import type { LucideIcon } from "lucide-react";
import {
  // module icons
  ShoppingCart,
  Package,
  Calculator,
  Users,
  BarChart3,
  TrendingUp,
  // pos & billing
  MonitorSmartphone,
  ScanBarcode,
  Wallet,
  Vault,
  Boxes,
  CalendarClock,
  FileText,
  MessageSquareText,
  Undo2,
  // inventory & supply chain
  CalendarX,
  Cpu,
  Truck,
  ClipboardCheck,
  PackageOpen,
  ClipboardList,
  // accounting
  BookOpenCheck,
  Ship,
  Smartphone,
  Receipt,
  FileMinus,
  Landmark,
  CalendarCheck,
  // hr & payroll
  IdCard,
  ShieldCheck,
  Fingerprint,
  Clock,
  Banknote,
  BadgePercent,
  // reports
  FileSpreadsheet,
  Percent,
  Scale,
  Hourglass,
  BookText,
  ArrowLeftRight,
  UserCheck,
  Activity,
  History,
  // omnichannel & growth
  ShoppingBag,
  HandCoins,
  BellRing,
  Megaphone,
  UsersRound,
  Trophy,
  Cake,
  Layers,
  Gift,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/en";

// Structure and icons only — all copy lives in src/lib/i18n/{en,bn}.ts.
export type FeatureKey = keyof Dictionary["features"]["items"];
export type ModuleSlug = keyof Dictionary["features"]["modules"];
export type GroupId = keyof Dictionary["features"]["groups"];

/** `anchor` is the capability's URL hash on its module page, e.g. /features/hr-payroll#attendance-shift-logs. */
export type FeatureItem = { key: FeatureKey; anchor: string; icon: LucideIcon };
export type FeatureGroup = { id: GroupId; items: FeatureItem[] };
export type FeatureModule = { slug: ModuleSlug; icon: LucideIcon; groups: FeatureGroup[] };

/** One dedicated page per module at /features/[slug]; groups become the sticky pill bar. */
export const featureModules: FeatureModule[] = [
  {
    slug: "pos-billing",
    icon: ShoppingCart,
    groups: [
      {
        id: "checkout",
        items: [
          { key: "registers", anchor: "multi-till-registers", icon: MonitorSmartphone },
          { key: "barcode", anchor: "barcode-scanning-labels", icon: ScanBarcode },
          { key: "boxPiece", anchor: "box-piece-multi-unit", icon: Boxes },
          { key: "receipts", anchor: "digital-printed-receipts", icon: MessageSquareText },
        ],
      },
      {
        id: "cashControl",
        items: [
          { key: "shifts", anchor: "cash-drawer-shifts", icon: Wallet },
          { key: "safeDrops", anchor: "safe-drops-pay-ins-outs", icon: Vault },
        ],
      },
      {
        id: "ordersReturns",
        items: [
          { key: "layaways", anchor: "layaways", icon: CalendarClock },
          { key: "quotations", anchor: "quotations", icon: FileText },
          { key: "returns", anchor: "returns-exchanges-store-credit", icon: Undo2 },
        ],
      },
    ],
  },
  {
    slug: "inventory-supply-chain",
    icon: Package,
    groups: [
      {
        id: "tracking",
        items: [
          { key: "fefo", anchor: "batch-expiry-fefo", icon: CalendarX },
          { key: "serial", anchor: "serial-imei-tracking", icon: Cpu },
        ],
      },
      {
        id: "supplyChain",
        items: [
          { key: "transfers", anchor: "stock-transfers-grn", icon: Truck },
          { key: "purchasing", anchor: "purchase-orders-vendor-returns", icon: ClipboardList },
        ],
      },
      {
        id: "stockControl",
        items: [
          { key: "audits", anchor: "physical-stock-audits", icon: ClipboardCheck },
          { key: "bom", anchor: "production-repackaging", icon: PackageOpen },
        ],
      },
    ],
  },
  {
    slug: "double-entry-accounting",
    icon: Calculator,
    groups: [
      {
        id: "ledger",
        items: [
          { key: "journals", anchor: "automated-journals", icon: BookOpenCheck },
          { key: "vouchers", anchor: "vouchers-expenses", icon: FileMinus },
          { key: "accountTransfers", anchor: "cash-bank-wallet-transfers", icon: Landmark },
        ],
      },
      {
        id: "costPayments",
        items: [
          { key: "landed", anchor: "landed-costs", icon: Ship },
          { key: "mfs", anchor: "mfs-payment-ledgers", icon: Smartphone },
        ],
      },
      {
        id: "closing",
        items: [
          { key: "zreport", anchor: "daily-closing-z-reports", icon: Receipt },
          { key: "yearEnd", anchor: "year-end-closing", icon: CalendarCheck },
        ],
      },
    ],
  },
  {
    slug: "hr-payroll",
    icon: Users,
    groups: [
      {
        id: "people",
        items: [
          { key: "staffDirectory", anchor: "staff-directory", icon: IdCard },
          { key: "roles", anchor: "role-permissions-security", icon: ShieldCheck },
        ],
      },
      {
        id: "time",
        items: [
          { key: "attendance", anchor: "attendance-shift-logs", icon: Fingerprint },
          { key: "shiftLogs", anchor: "cashier-shift-logs", icon: Clock },
        ],
      },
      {
        id: "pay",
        items: [
          { key: "payroll", anchor: "payroll-pay-slips", icon: Banknote },
          { key: "commissions", anchor: "tiered-commissions", icon: BadgePercent },
        ],
      },
    ],
  },
  {
    slug: "reports-analytics",
    icon: BarChart3,
    groups: [
      {
        id: "financials",
        items: [
          { key: "pnl", anchor: "real-time-pnl", icon: FileSpreadsheet },
          { key: "vat", anchor: "vat-balance", icon: Percent },
          { key: "trialBalance", anchor: "trial-balance", icon: Scale },
        ],
      },
      {
        id: "balances",
        items: [
          { key: "payablesReceivables", anchor: "payables-receivables-aging", icon: Hourglass },
          { key: "dayBook", anchor: "day-book", icon: BookText },
          { key: "cashMovement", anchor: "cash-movement", icon: ArrowLeftRight },
        ],
      },
      {
        id: "performance",
        items: [
          { key: "cashierPerformance", anchor: "cashier-performance", icon: UserCheck },
          { key: "inventoryHealth", anchor: "inventory-health-bi", icon: Activity },
          { key: "auditLogs", anchor: "audit-logs", icon: History },
        ],
      },
    ],
  },
  {
    slug: "omnichannel-growth",
    icon: TrendingUp,
    groups: [
      {
        id: "online",
        items: [
          { key: "socialOrders", anchor: "social-online-orders", icon: ShoppingBag },
          { key: "codSettlement", anchor: "cod-settlement", icon: HandCoins },
          { key: "dueRecovery", anchor: "due-recovery", icon: BellRing },
        ],
      },
      {
        id: "marketing",
        items: [
          { key: "smsCampaigns", anchor: "sms-campaigns", icon: Megaphone },
          { key: "rfmInsights", anchor: "rfm-insights", icon: UsersRound },
        ],
      },
      {
        id: "loyalty",
        items: [
          { key: "loyalty", anchor: "loyalty-tiers", icon: Trophy },
          { key: "coupons", anchor: "birthday-anniversary-coupons", icon: Cake },
          { key: "tieredPromos", anchor: "tiered-bundle-promos", icon: Layers },
          { key: "bxgy", anchor: "buy-x-get-y-offers", icon: Gift },
        ],
      },
    ],
  },
];

export const moduleSlugs = featureModules.map((m) => m.slug);

export const getModule = (slug: string) => featureModules.find((m) => m.slug === slug);

export const moduleHref = (slug: ModuleSlug) => `/features/${slug}`;

export const countItems = (m: FeatureModule) => m.groups.reduce((n, g) => n + g.items.length, 0);

export const capabilityHref = (slug: ModuleSlug, anchor: string) => `${moduleHref(slug)}#${anchor}`;

export const totalCapabilities = featureModules.reduce((n, m) => n + countItems(m), 0);
export const totalGroups = featureModules.reduce((n, m) => n + m.groups.length, 0);
