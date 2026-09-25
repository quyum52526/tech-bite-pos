"use client";

import { motion } from "framer-motion";
import {
  BookOpenCheck,
  CreditCard,
  Minus,
  Plus,
  ScanBarcode,
  Search,
  Smartphone,
  Store,
  User,
  Wallet,
  Wifi,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/en";

type ProductId = keyof Dictionary["products"];
type UnitId = keyof Dictionary["mockup"]["units"];

const products: { id: ProductId; price: number; tone: string }[] = [
  { id: "rice", price: 420, tone: "from-amber-400/30 to-amber-600/10" },
  { id: "oil", price: 360, tone: "from-yellow-300/30 to-yellow-500/10" },
  { id: "milk", price: 110, tone: "from-sky-300/30 to-sky-500/10" },
  { id: "water", price: 30, tone: "from-cyan-300/30 to-cyan-500/10" },
  { id: "tea", price: 185, tone: "from-rose-300/30 to-rose-500/10" },
  { id: "soap", price: 75, tone: "from-violet-300/30 to-violet-500/10" },
  { id: "lentil", price: 140, tone: "from-orange-300/30 to-orange-500/10" },
  { id: "biscuit", price: 60, tone: "from-lime-300/30 to-lime-500/10" },
];

const cart: { id: ProductId; qty: number; price: number; unit: UnitId }[] = [
  { id: "rice", qty: 2, price: 420, unit: "bag" },
  { id: "oil", qty: 1, price: 360, unit: "bottle" },
  { id: "water", qty: 12, price: 30, unit: "box" },
  { id: "tea", qty: 1, price: 185, unit: "piece" },
];

const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
const discount = Math.round(subtotal * 0.02);
const total = subtotal - discount;

export default function PosMockup() {
  const { t, taka: fmt, num } = useI18n();
  const m = t.mockup;

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-brand-500/30 to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-ink-900/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <div className="hidden items-center gap-4 text-xs text-slate-400 sm:flex">
            <span className="flex items-center gap-1.5">
              <Store className="h-3.5 w-3.5" /> {m.branch}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {m.cashier}
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-500/15 px-2.5 py-0.5 text-xs font-medium text-brand-300">
            <Wifi className="h-3.5 w-3.5" /> {m.synced}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_20rem]">
          {/* Product area */}
          <div className="p-4">
            <div className="flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-sm text-slate-500">
                <Search className="h-4 w-4" /> {m.search}
              </div>
              <div className="grid place-items-center rounded-lg bg-brand-500/15 px-3 text-brand-300">
                <ScanBarcode className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex gap-2 overflow-hidden">
              {m.categories.map((c, i) => (
                <span
                  key={c}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${
                    i === 0 ? "bg-brand-500 text-white" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="rounded-xl border border-white/5 bg-ink-900/40 p-2.5"
                >
                  <div className={`h-14 rounded-lg bg-gradient-to-br ${p.tone}`} />
                  <p className="mt-2 truncate text-xs font-medium text-slate-200">{t.products[p.id]}</p>
                  <p className="text-xs font-semibold text-brand-300">{fmt(p.price)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="flex flex-col border-t border-white/5 bg-ink-900/50 p-4 md:border-l md:border-t-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{m.currentSale}</p>
              <span className="font-mono text-xs text-slate-500">#INV-24817</span>
            </div>
            <ul className="mt-3 space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] p-2">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-200">{t.products[item.id]}</p>
                    <p className="text-[11px] text-slate-500">
                      {fmt(item.price)} / {m.units[item.unit]}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="grid h-5 w-5 place-items-center rounded bg-white/5 text-slate-400">
                      <Minus className="h-3 w-3" />
                    </span>
                    <span className="w-5 text-center text-xs font-semibold text-white">{num(item.qty)}</span>
                    <span className="grid h-5 w-5 place-items-center rounded bg-white/5 text-slate-400">
                      <Plus className="h-3 w-3" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 border-t border-dashed border-white/10 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{m.subtotal}</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{m.loyalty}</span>
                <span>−{fmt(discount)}</span>
              </div>
              <div className="flex justify-between pt-1 text-base font-bold text-white">
                <span>{m.total}</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { icon: Wallet, label: t.payment.cash },
                { icon: Smartphone, label: t.payment.bkash },
                { icon: CreditCard, label: t.payment.card },
              ].map((m, i) => (
                <span
                  key={m.label}
                  className={`flex flex-col items-center gap-1 rounded-lg border py-2 text-[11px] ${
                    i === 1 ? "border-pink-400/40 bg-pink-500/10 text-pink-200" : "border-white/10 text-slate-400"
                  }`}
                >
                  <m.icon className="h-4 w-4" /> {m.label}
                </span>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-brand-500 py-2.5 text-center text-sm font-semibold text-white">
              {m.charge} {fmt(total)}
            </div>
          </div>
        </div>
      </div>

      {/* Floating ledger card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-8 -left-2 hidden w-64 rounded-xl border border-white/10 bg-ink-800/95 p-3 shadow-xl backdrop-blur lg:block xl:-left-10"
      >
        <p className="flex items-center gap-2 text-xs font-semibold text-white">
          <BookOpenCheck className="h-4 w-4 text-brand-400" /> {m.journalPosted}
        </p>
        <div className="mt-2 space-y-1 font-mono text-[11px]">
          <div className="flex justify-between text-slate-300">
            <span>{m.drWallet}</span>
            <span>{num(total)}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>{m.drDiscount}</span>
            <span>{num(discount)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span className="pl-3">{m.crSales}</span>
            <span>{num(subtotal)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
