import type { LucideIcon } from "lucide-react";
import {
  // category icons
  ShoppingCart,
  Package,
  Calculator,
  HeartHandshake,
  Building2,
  BarChart3,
  TrendingUp,
  // sales
  ScanBarcode,
  Wallet,
  Vault,
  Boxes,
  CalendarClock,
  FileText,
  MessageSquareText,
  Undo2,
  // inventory
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
  // crm
  Trophy,
  Cake,
  Layers,
  Gift,
  // hr & security
  IdCard,
  Fingerprint,
  Banknote,
  BadgePercent,
  ShieldCheck,
  // reports
  FileSpreadsheet,
  Hourglass,
  UserCheck,
  BookText,
  Scale,
  ArrowLeftRight,
  CalendarCheck,
  Activity,
  History,
  // omnichannel
  ShoppingBag,
  HandCoins,
  Megaphone,
  BellRing,
  UsersRound,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/en";

// Structure and icons only — all copy lives in src/lib/i18n/{en,bn}.ts.
export type FeatureKey = keyof Dictionary["features"]["items"];
export type CategoryId = keyof Dictionary["features"]["categories"];

export type FeatureCategory = {
  id: CategoryId;
  icon: LucideIcon;
  features: { key: FeatureKey; icon: LucideIcon }[];
};

export const featureCategories: FeatureCategory[] = [
  {
    id: "sales",
    icon: ShoppingCart,
    features: [
      { key: "barcode", icon: ScanBarcode },
      { key: "shifts", icon: Wallet },
      { key: "safeDrops", icon: Vault },
      { key: "boxPiece", icon: Boxes },
      { key: "layaways", icon: CalendarClock },
      { key: "quotations", icon: FileText },
      { key: "receipts", icon: MessageSquareText },
      { key: "returns", icon: Undo2 },
    ],
  },
  {
    id: "inventory",
    icon: Package,
    features: [
      { key: "fefo", icon: CalendarX },
      { key: "serial", icon: Cpu },
      { key: "transfers", icon: Truck },
      { key: "audits", icon: ClipboardCheck },
      { key: "bom", icon: PackageOpen },
      { key: "purchasing", icon: ClipboardList },
    ],
  },
  {
    id: "accounting",
    icon: Calculator,
    features: [
      { key: "journals", icon: BookOpenCheck },
      { key: "landed", icon: Ship },
      { key: "mfs", icon: Smartphone },
      { key: "zreport", icon: Receipt },
      { key: "vouchers", icon: FileMinus },
      { key: "accountTransfers", icon: Landmark },
    ],
  },
  {
    id: "crm",
    icon: HeartHandshake,
    features: [
      { key: "loyalty", icon: Trophy },
      { key: "coupons", icon: Cake },
      { key: "tieredPromos", icon: Layers },
      { key: "bxgy", icon: Gift },
    ],
  },
  {
    id: "security",
    icon: Building2,
    features: [
      { key: "staffDirectory", icon: IdCard },
      { key: "attendance", icon: Fingerprint },
      { key: "payroll", icon: Banknote },
      { key: "commissions", icon: BadgePercent },
      { key: "roles", icon: ShieldCheck },
    ],
  },
  {
    id: "reports",
    icon: BarChart3,
    features: [
      { key: "pnl", icon: FileSpreadsheet },
      { key: "payablesReceivables", icon: Hourglass },
      { key: "cashierPerformance", icon: UserCheck },
      { key: "dayBook", icon: BookText },
      { key: "trialBalance", icon: Scale },
      { key: "cashMovement", icon: ArrowLeftRight },
      { key: "yearEnd", icon: CalendarCheck },
      { key: "inventoryHealth", icon: Activity },
      { key: "auditLogs", icon: History },
    ],
  },
  {
    id: "omnichannel",
    icon: TrendingUp,
    features: [
      { key: "socialOrders", icon: ShoppingBag },
      { key: "codSettlement", icon: HandCoins },
      { key: "smsCampaigns", icon: Megaphone },
      { key: "dueRecovery", icon: BellRing },
      { key: "rfmInsights", icon: UsersRound },
    ],
  },
];
