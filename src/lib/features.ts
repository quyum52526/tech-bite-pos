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

export type FeatureItem = { key: FeatureKey; icon: LucideIcon };
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
          { key: "registers", icon: MonitorSmartphone },
          { key: "barcode", icon: ScanBarcode },
          { key: "boxPiece", icon: Boxes },
          { key: "receipts", icon: MessageSquareText },
        ],
      },
      {
        id: "cashControl",
        items: [
          { key: "shifts", icon: Wallet },
          { key: "safeDrops", icon: Vault },
        ],
      },
      {
        id: "ordersReturns",
        items: [
          { key: "layaways", icon: CalendarClock },
          { key: "quotations", icon: FileText },
          { key: "returns", icon: Undo2 },
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
          { key: "fefo", icon: CalendarX },
          { key: "serial", icon: Cpu },
        ],
      },
      {
        id: "supplyChain",
        items: [
          { key: "transfers", icon: Truck },
          { key: "purchasing", icon: ClipboardList },
        ],
      },
      {
        id: "stockControl",
        items: [
          { key: "audits", icon: ClipboardCheck },
          { key: "bom", icon: PackageOpen },
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
          { key: "journals", icon: BookOpenCheck },
          { key: "vouchers", icon: FileMinus },
          { key: "accountTransfers", icon: Landmark },
        ],
      },
      {
        id: "costPayments",
        items: [
          { key: "landed", icon: Ship },
          { key: "mfs", icon: Smartphone },
        ],
      },
      {
        id: "closing",
        items: [
          { key: "zreport", icon: Receipt },
          { key: "yearEnd", icon: CalendarCheck },
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
          { key: "staffDirectory", icon: IdCard },
          { key: "roles", icon: ShieldCheck },
        ],
      },
      {
        id: "time",
        items: [
          { key: "attendance", icon: Fingerprint },
          { key: "shiftLogs", icon: Clock },
        ],
      },
      {
        id: "pay",
        items: [
          { key: "payroll", icon: Banknote },
          { key: "commissions", icon: BadgePercent },
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
          { key: "pnl", icon: FileSpreadsheet },
          { key: "vat", icon: Percent },
          { key: "trialBalance", icon: Scale },
        ],
      },
      {
        id: "balances",
        items: [
          { key: "payablesReceivables", icon: Hourglass },
          { key: "dayBook", icon: BookText },
          { key: "cashMovement", icon: ArrowLeftRight },
        ],
      },
      {
        id: "performance",
        items: [
          { key: "cashierPerformance", icon: UserCheck },
          { key: "inventoryHealth", icon: Activity },
          { key: "auditLogs", icon: History },
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
          { key: "socialOrders", icon: ShoppingBag },
          { key: "codSettlement", icon: HandCoins },
          { key: "dueRecovery", icon: BellRing },
        ],
      },
      {
        id: "marketing",
        items: [
          { key: "smsCampaigns", icon: Megaphone },
          { key: "rfmInsights", icon: UsersRound },
        ],
      },
      {
        id: "loyalty",
        items: [
          { key: "loyalty", icon: Trophy },
          { key: "coupons", icon: Cake },
          { key: "tieredPromos", icon: Layers },
          { key: "bxgy", icon: Gift },
        ],
      },
    ],
  },
];

export const moduleSlugs = featureModules.map((m) => m.slug);

export const getModule = (slug: string) => featureModules.find((m) => m.slug === slug);

export const moduleHref = (slug: ModuleSlug) => `/features/${slug}`;

export const countItems = (m: FeatureModule) => m.groups.reduce((n, g) => n + g.items.length, 0);
