"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpenCheck,
  CheckCircle2,
  Minus,
  MousePointerClick,
  Plus,
  Printer,
  RotateCcw,
  ShoppingCart,
  Smartphone,
  Split,
  Trash2,
  Wallet,
} from "lucide-react";
import { fill, useI18n } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/en";

type ProductId = keyof Dictionary["products"];
type Product = { id: ProductId; price: number; emoji: string };

const catalog: Product[] = [
  { id: "rice", price: 420, emoji: "🍚" },
  { id: "oil", price: 360, emoji: "🛢️" },
  { id: "milk", price: 110, emoji: "🥛" },
  { id: "tea", price: 185, emoji: "🍵" },
  { id: "water", price: 30, emoji: "💧" },
  { id: "soap", price: 75, emoji: "🧼" },
  { id: "lentil", price: 140, emoji: "🫘" },
  { id: "biscuit", price: 60, emoji: "🍪" },
];

type PayMode = "cash" | "bkash" | "split";

type Receipt = {
  invoice: string;
  trxId: string | null;
  time: Date;
  lines: { id: ProductId; qty: number; price: number }[];
  total: number;
  cash: number;
  bkash: number;
};

function randomTrxId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function PosDemo() {
  const { t, lang, taka: fmt, num } = useI18n();
  const d = t.demo;
  const [cart, setCart] = useState<Record<string, number>>({ rice: 1, oil: 1 });
  const [mode, setMode] = useState<PayMode>("split");
  const [cashInput, setCashInput] = useState("400");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const lines = useMemo(
    () =>
      catalog
        .filter((p) => cart[p.id])
        .map((p) => ({ id: p.id, qty: cart[p.id], price: p.price })),
    [cart]
  );
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);

  const cashValue = Math.max(0, Math.floor(Number(cashInput) || 0));
  const cash = mode === "cash" ? total : mode === "bkash" ? 0 : Math.min(cashValue, total);
  const bkash = total - cash;
  const splitInvalid = mode === "split" && (cashValue <= 0 || cashValue >= total);

  const change = (id: string, delta: number) => {
    setReceipt(null);
    setCart((c) => {
      const next = { ...c, [id]: (c[id] ?? 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const checkout = () => {
    if (!total || splitInvalid) return;
    setReceipt({
      invoice: `INV-${Math.floor(10000 + Math.random() * 89999)}`,
      trxId: bkash > 0 ? randomTrxId() : null,
      time: new Date(),
      lines,
      total,
      cash,
      bkash,
    });
  };

  const reset = () => {
    setCart({});
    setReceipt(null);
  };

  return (
    <section id="demo" className="relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-96 max-w-4xl rounded-full bg-brand-500/10 blur-3xl" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <MousePointerClick className="h-3.5 w-3.5" /> {d.eyebrow}
          </span>
          <h2 className="section-title mt-4">{d.title}</h2>
          <p className="mt-4 text-slate-400">{d.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_22rem_20rem]">
          {/* Catalog */}
          <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <p className="text-sm font-semibold text-white">{d.step1}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {catalog.map((p) => (
                <motion.button
                  key={p.id}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => change(p.id, 1)}
                  className="relative rounded-xl border border-white/5 bg-ink-900/60 p-3 text-left transition hover:border-brand-400/40 hover:bg-ink-900"
                >
                  {cart[p.id] ? (
                    <span className="absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white">
                      {num(cart[p.id])}
                    </span>
                  ) : null}
                  <span className="text-2xl" aria-hidden>
                    {p.emoji}
                  </span>
                  <span className="mt-2 block text-xs font-medium leading-snug text-slate-200">{t.products[p.id]}</span>
                  <span className="mt-1 block text-sm font-semibold text-brand-300">{fmt(p.price)}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Cart + payment */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShoppingCart className="h-4 w-4 text-brand-400" /> {d.step2}
              </p>
              {lines.length > 0 && (
                <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-300">
                  <Trash2 className="h-3.5 w-3.5" /> {d.clear}
                </button>
              )}
            </div>

            <ul className="mt-3 min-h-[8rem] space-y-2">
              <AnimatePresence initial={false}>
                {lines.length === 0 && (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid h-32 place-items-center rounded-xl border border-dashed border-white/10 text-xs text-slate-500"
                  >
                    {d.empty}
                  </motion.li>
                )}
                {lines.map((l) => (
                  <motion.li
                    key={l.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] p-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-slate-200">{t.products[l.id]}</p>
                      <p className="text-[11px] text-slate-500">{fmt(l.qty * l.price)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => change(l.id, -1)}
                        aria-label={`${d.removeOne}: ${t.products[l.id]}`}
                        className="grid h-6 w-6 place-items-center rounded bg-white/5 text-slate-300 hover:bg-white/10"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-white">{num(l.qty)}</span>
                      <button
                        onClick={() => change(l.id, 1)}
                        aria-label={`${d.addOne}: ${t.products[l.id]}`}
                        className="grid h-6 w-6 place-items-center rounded bg-white/5 text-slate-300 hover:bg-white/10"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-white/10 pt-3">
              <span className="text-sm text-slate-400">{d.total}</span>
              <span className="text-2xl font-bold text-white">{fmt(total)}</span>
            </div>

            <p className="mt-5 text-sm font-semibold text-white">{d.step3}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(
                [
                  { id: "cash", label: t.payment.cash, icon: Wallet },
                  { id: "bkash", label: t.payment.bkash, icon: Smartphone },
                  { id: "split", label: t.payment.split, icon: Split },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setReceipt(null);
                  }}
                  className={`flex flex-col items-center gap-1 rounded-lg border py-2 text-xs transition ${
                    mode === m.id
                      ? "border-brand-400/60 bg-brand-500/15 text-white"
                      : "border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <m.icon className="h-4 w-4" /> {m.label}
                </button>
              ))}
            </div>

            <AnimatePresence initial={false}>
              {mode === "split" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 rounded-xl bg-ink-900/60 p-3">
                    <label className="flex items-center justify-between gap-3 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Wallet className="h-3.5 w-3.5 text-emerald-300" /> {t.payment.cash}
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        value={cashInput}
                        onChange={(e) => {
                          setCashInput(e.target.value);
                          setReceipt(null);
                        }}
                        className="w-28 rounded-md border border-white/10 bg-ink-800 px-2 py-1 text-right text-sm text-white outline-none focus:border-brand-400"
                      />
                    </label>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="h-3.5 w-3.5 text-pink-300" /> {d.bkashAuto}
                      </span>
                      <span className="w-28 text-right text-sm font-semibold text-pink-200">{fmt(bkash)}</span>
                    </div>
                    {splitInvalid && total > 0 && (
                      <p className="text-[11px] text-amber-300">{fill(d.splitError, { min: fmt(1), max: fmt(total - 1) })}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={checkout}
              disabled={!total || splitInvalid}
              className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {d.complete} · {fmt(total)}
            </button>
          </div>

          {/* Receipt */}
          <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <Printer className="h-4 w-4 text-brand-400" /> {d.step4}
            </p>
            <AnimatePresence mode="wait">
              {receipt ? (
                <motion.div
                  key={receipt.invoice}
                  initial={{ opacity: 0, y: -30, scaleY: 0.6 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.25 }}
                  style={{ transformOrigin: "top" }}
                  className="mt-4"
                >
                  <div className="relative rounded-lg bg-white p-4 font-mono text-[11px] leading-relaxed text-slate-800 shadow-xl">
                    <div className="text-center">
                      <p className="text-sm font-bold">{d.receipt.shop}</p>
                      <p>{d.receipt.branch}</p>
                      <p>
                        {receipt.time.toLocaleString(lang === "bn" ? "bn-BD" : "en-GB", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <p className="font-semibold">{receipt.invoice}</p>
                    </div>
                    <div className="my-2 border-t border-dashed border-slate-400" />
                    {receipt.lines.map((l) => (
                      <div key={l.id} className="flex justify-between gap-2">
                        <span className="truncate">
                          {num(l.qty)} × {t.products[l.id]}
                        </span>
                        <span>{num(l.qty * l.price)}</span>
                      </div>
                    ))}
                    <div className="my-2 border-t border-dashed border-slate-400" />
                    <div className="flex justify-between text-xs font-bold">
                      <span>{d.receipt.total}</span>
                      <span>{fmt(receipt.total)}</span>
                    </div>
                    {receipt.cash > 0 && (
                      <div className="flex justify-between">
                        <span>{t.payment.cash}</span>
                        <span>{num(receipt.cash)}</span>
                      </div>
                    )}
                    {receipt.bkash > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span>{t.payment.bkash}</span>
                          <span>{num(receipt.bkash)}</span>
                        </div>
                        <p className="text-slate-500">{d.receipt.trxId}: {receipt.trxId}</p>
                      </>
                    )}
                    <div className="my-2 border-t border-dashed border-slate-400" />
                    <p className="text-center">{d.receipt.thanks}</p>
                    <span className="absolute right-3 top-3 rotate-12 rounded border-2 border-emerald-600 px-1.5 text-xs font-bold text-emerald-600">
                      {d.receipt.paid}
                    </span>
                  </div>

                  <div className="mt-3 rounded-lg border border-brand-400/20 bg-brand-500/5 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-300">
                      <BookOpenCheck className="h-3.5 w-3.5" /> {d.journal.title}
                    </p>
                    <div className="mt-2 space-y-0.5 font-mono text-[11px] text-slate-300">
                      {receipt.cash > 0 && (
                        <div className="flex justify-between">
                          <span>{d.journal.drCash}</span>
                          <span>{num(receipt.cash)}</span>
                        </div>
                      )}
                      {receipt.bkash > 0 && (
                        <div className="flex justify-between">
                          <span>{d.journal.drBkash}</span>
                          <span>{num(receipt.bkash)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-500">
                        <span className="pl-3">{d.journal.crSales}</span>
                        <span>{num(receipt.total)}</span>
                      </div>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                      <CheckCircle2 className="h-3 w-3 text-brand-400" /> {d.journal.balanced}
                    </p>
                  </div>

                  <button onClick={reset} className="btn-ghost mt-3 w-full py-2 text-xs">
                    <RotateCcw className="h-3.5 w-3.5" /> {d.newSale}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 grid h-64 place-items-center rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-slate-500"
                >
                  {d.receiptEmpty}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
