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

type Product = { id: string; name: string; price: number; sku: string; emoji: string };

const catalog: Product[] = [
  { id: "rice", name: "Miniket Rice 5kg", price: 420, sku: "8941100500011", emoji: "🍚" },
  { id: "oil", name: "Soybean Oil 2L", price: 360, sku: "8941100500028", emoji: "🛢️" },
  { id: "milk", name: "Full Cream Milk 1L", price: 110, sku: "8941100500035", emoji: "🥛" },
  { id: "tea", name: "Tea Bags (50)", price: 185, sku: "8941100500042", emoji: "🍵" },
  { id: "water", name: "Mineral Water 1.5L", price: 30, sku: "8941100500059", emoji: "💧" },
  { id: "soap", name: "Bath Soap 150g", price: 75, sku: "8941100500066", emoji: "🧼" },
  { id: "lentil", name: "Red Lentils 1kg", price: 140, sku: "8941100500073", emoji: "🫘" },
  { id: "biscuit", name: "Family Biscuits", price: 60, sku: "8941100500080", emoji: "🍪" },
];

type PayMode = "cash" | "bkash" | "split";

type Receipt = {
  invoice: string;
  trxId: string | null;
  time: string;
  lines: { name: string; qty: number; price: number }[];
  total: number;
  cash: number;
  bkash: number;
};

const fmt = (n: number) => `৳${n.toLocaleString("en-IN")}`;

function randomTrxId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function PosDemo() {
  const [cart, setCart] = useState<Record<string, number>>({ rice: 1, oil: 1 });
  const [mode, setMode] = useState<PayMode>("split");
  const [cashInput, setCashInput] = useState("400");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const lines = useMemo(
    () =>
      catalog
        .filter((p) => cart[p.id])
        .map((p) => ({ name: p.name, qty: cart[p.id], price: p.price, id: p.id })),
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
      time: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
      lines: lines.map(({ name, qty, price }) => ({ name, qty, price })),
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
            <MousePointerClick className="h-3.5 w-3.5" /> Interactive Demo
          </span>
          <h2 className="section-title mt-4">Ring up a sale. Right here.</h2>
          <p className="mt-4 text-slate-400">
            Add items, split the payment between cash and bKash, and watch the receipt and the journal entry generate
            instantly. This is exactly how it works at the counter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_22rem_20rem]">
          {/* Catalog */}
          <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <p className="text-sm font-semibold text-white">1. Tap products to add</p>
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
                      {cart[p.id]}
                    </span>
                  ) : null}
                  <span className="text-2xl" aria-hidden>
                    {p.emoji}
                  </span>
                  <span className="mt-2 block text-xs font-medium leading-snug text-slate-200">{p.name}</span>
                  <span className="mt-1 block text-sm font-semibold text-brand-300">{fmt(p.price)}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Cart + payment */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShoppingCart className="h-4 w-4 text-brand-400" /> 2. Cart
              </p>
              {lines.length > 0 && (
                <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-300">
                  <Trash2 className="h-3.5 w-3.5" /> Clear
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
                    Cart is empty — tap a product.
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
                      <p className="truncate text-xs font-medium text-slate-200">{l.name}</p>
                      <p className="text-[11px] text-slate-500">{fmt(l.qty * l.price)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => change(l.id, -1)}
                        aria-label={`Remove one ${l.name}`}
                        className="grid h-6 w-6 place-items-center rounded bg-white/5 text-slate-300 hover:bg-white/10"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-white">{l.qty}</span>
                      <button
                        onClick={() => change(l.id, 1)}
                        aria-label={`Add one ${l.name}`}
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
              <span className="text-sm text-slate-400">Total</span>
              <span className="text-2xl font-bold text-white">{fmt(total)}</span>
            </div>

            <p className="mt-5 text-sm font-semibold text-white">3. Payment method</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(
                [
                  { id: "cash", label: "Cash", icon: Wallet },
                  { id: "bkash", label: "bKash", icon: Smartphone },
                  { id: "split", label: "Split", icon: Split },
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
                        <Wallet className="h-3.5 w-3.5 text-emerald-300" /> Cash
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
                        <Smartphone className="h-3.5 w-3.5 text-pink-300" /> bKash (auto)
                      </span>
                      <span className="w-28 text-right text-sm font-semibold text-pink-200">{fmt(bkash)}</span>
                    </div>
                    {splitInvalid && total > 0 && (
                      <p className="text-[11px] text-amber-300">Enter a cash amount between ৳1 and {fmt(total - 1)}.</p>
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
              Complete Sale · {fmt(total)}
            </button>
          </div>

          {/* Receipt */}
          <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <Printer className="h-4 w-4 text-brand-400" /> 4. Receipt preview
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
                      <p className="text-sm font-bold">TECH BITE MART</p>
                      <p>Agrabad Branch · Till 02</p>
                      <p>{receipt.time}</p>
                      <p className="font-semibold">{receipt.invoice}</p>
                    </div>
                    <div className="my-2 border-t border-dashed border-slate-400" />
                    {receipt.lines.map((l) => (
                      <div key={l.name} className="flex justify-between gap-2">
                        <span className="truncate">
                          {l.qty} × {l.name}
                        </span>
                        <span>{(l.qty * l.price).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                    <div className="my-2 border-t border-dashed border-slate-400" />
                    <div className="flex justify-between text-xs font-bold">
                      <span>TOTAL</span>
                      <span>{fmt(receipt.total)}</span>
                    </div>
                    {receipt.cash > 0 && (
                      <div className="flex justify-between">
                        <span>Cash</span>
                        <span>{receipt.cash.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    {receipt.bkash > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span>bKash</span>
                          <span>{receipt.bkash.toLocaleString("en-IN")}</span>
                        </div>
                        <p className="text-slate-500">TrxID: {receipt.trxId}</p>
                      </>
                    )}
                    <div className="my-2 border-t border-dashed border-slate-400" />
                    <p className="text-center">Thank you! Receipt sent via WhatsApp.</p>
                    <span className="absolute right-3 top-3 rotate-12 rounded border-2 border-emerald-600 px-1.5 text-xs font-bold text-emerald-600">
                      PAID
                    </span>
                  </div>

                  <div className="mt-3 rounded-lg border border-brand-400/20 bg-brand-500/5 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-300">
                      <BookOpenCheck className="h-3.5 w-3.5" /> Auto journal entry
                    </p>
                    <div className="mt-2 space-y-0.5 font-mono text-[11px] text-slate-300">
                      {receipt.cash > 0 && (
                        <div className="flex justify-between">
                          <span>Dr Cash in Hand</span>
                          <span>{receipt.cash.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      {receipt.bkash > 0 && (
                        <div className="flex justify-between">
                          <span>Dr bKash Wallet</span>
                          <span>{receipt.bkash.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-500">
                        <span className="pl-3">Cr Sales Revenue</span>
                        <span>{receipt.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                      <CheckCircle2 className="h-3 w-3 text-brand-400" /> Balanced · posted to ledger
                    </p>
                  </div>

                  <button onClick={reset} className="btn-ghost mt-3 w-full py-2 text-xs">
                    <RotateCcw className="h-3.5 w-3.5" /> New sale
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
                  Complete the sale to print the receipt and post the journal entry.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
