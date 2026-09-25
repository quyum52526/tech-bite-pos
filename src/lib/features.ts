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
    ],
  },
  {
    id: "crm",
    icon: HeartHandshake,
    features: [
      { key: "rfm", icon: PieChart },
      { key: "loyalty", icon: Trophy },
      { key: "coupons", icon: Cake },
      { key: "bxgy", icon: Gift },
    ],
  },
  {
    id: "security",
    icon: Building2,
    features: [
      { key: "attendance", icon: Fingerprint },
      { key: "commissions", icon: BadgePercent },
      { key: "roles", icon: ShieldCheck },
      { key: "audit", icon: History },
    ],
  },
];
