"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  CreditCard,
  Minus,
  MousePointerClick,
  Plus,
  Printer,
  RotateCcw,
  ShoppingCart,
  ScanBarcode,
  Smartphone,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import { fill, useI18n } from "@/lib/i18n";
import ProductArt, { productTint, type ProductArtId } from "./ProductArt";

export const LIVE_POS_URL = "https://bitepos-rho.vercel.app/pos";

type ProductId = ProductArtId;
/** Demo catalogue: the live POS's store items. Stock figures are demo values. */
type Product = { id: ProductId; price: number; stock: number };

const catalog: Product[] = [
  { id: "ace", price: 1.2, stock: 118 },
  { id: "cef3", price: 25, stock: 99 },
  { id: "cerelac", price: 480, stock: 24 },
  { id: "dove", price: 520, stock: 36 },
  { id: "rice", price: 420, stock: 42 },
  { id: "oil", price: 360, stock: 58 },
];

type PayMode = "cash" | "bkash" | "card";

type Receipt = {
  invoice: string;
  ref: string | null;
  mode: PayMode;
  time: Date;
  lines: { id: ProductId; qty: number; price: number }[];
  total: number;
};

function randomRef(mode: PayMode) {
  if (mode === "card") return `**** ${Math.floor(1000 + Math.random() * 9000)}`;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function PosDemo() {
  const { t, lang, num } = useI18n();
  const d = t.demo;
  // Two decimals, like the till: ৳1.20, ৳480.00.
  const fmt = useMemo(() => {
    const f = new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (n: number) => `৳${f.format(n)}`;
  }, [lang]);
  const [cart, setCart] = useState<Partial<Record<ProductId, number>>>({ rice: 1, cerelac: 1 });
  const [mode, setMode] = useState<PayMode>("cash");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [modal, setModal] = useState(false);
  const checkoutRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const lines = useMemo(
    () => catalog.filter((p) => cart[p.id]).map((p) => ({ id: p.id, qty: cart[p.id] ?? 0, price: p.price })),
    [cart]
  );
  // Sum in paisa so ৳1.20 × n never drifts.
  const total = lines.reduce((s, l) => s + Math.round(l.price * 100) * l.qty, 0) / 100;
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  const change = (p: Product, delta: number) => {
    setReceipt(null);
    setCart((c) => {
      const qty = Math.min((c[p.id] ?? 0) + delta, p.stock);
      const next = { ...c, [p.id]: qty };
      if (qty <= 0) delete next[p.id];
      return next;
    });
  };

  const printDemoReceipt = () => {
    setModal(false);
    if (!total) return;
    setReceipt({
      invoice: `INV-${Math.floor(10000 + Math.random() * 89999)}`,
      ref: mode === "cash" ? null : randomRef(mode),
      mode,
      time: new Date(),
      lines,
      total,
    });
  };

  const reset = () => {
    setCart({});
    setReceipt(null);
  };

  // Focus moves into the modal; Escape closes it and focus returns to the checkout button.
  useEffect(() => {
    if (!modal) return;
    const trigger = checkoutRef.current;
    ctaRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [modal]);

  const payModes = [
    { id: "cash", label: t.payment.cash, icon: Wallet },
    { id: "bkash", label: t.payment.bkash, icon: Smartphone },
    { id: "card", label: t.payment.card, icon: CreditCard },
  ] as const;

  return (
    <section id="demo" className="relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-96 max-w-4xl rounded-full bg-brand-500/10 blur-3xl" />
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl text-center">
          <span className="eyebrow">
            <MousePointerClick className="h-3.5 w-3.5" /> {d.eyebrow}
          </span>
          <h2 className="section-title section-title-line mt-4">{d.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">{d.subtitle}</p>
        </div>

        {/* terminal top bar */}
        <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-800/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-400/70" />
            </div>
            <ScanBarcode className="h-4 w-4 shrink-0 text-brand-300" />
            <p className="truncate text-sm font-medium text-slate-300">{d.terminal}</p>
          </div>
          <a
            href={LIVE_POS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-500/25 hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {d.launch} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_22rem_20rem]">
          {/* Catalog */}
          <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <p className="text-sm font-semibold text-white">{d.step1}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {catalog.map((p) => {
                const inCart = cart[p.id] ?? 0;
                const left = p.stock - inCart;
                return (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => change(p, 1)}
                    disabled={left <= 0}
                    aria-label={`${d.addOne}: ${t.products[p.id]}`}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-ink-900/60 text-left transition hover:border-brand-400/40 hover:bg-ink-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className={`relative grid aspect-[4/3] place-items-center bg-gradient-to-br ${productTint[p.id]}`}>
                      <ProductArt id={p.id} className="h-[72%] w-[72%] drop-shadow-lg transition group-hover:scale-105" />
                      <span
                        className={`absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ring-1 backdrop-blur ${
                          left > 0 ? "bg-slate-950/70 text-emerald-300 ring-emerald-400/30" : "bg-rose-950/80 text-rose-300 ring-rose-400/30"
                        }`}
                      >
                        {left > 0 ? fill(d.inStock, { n: num(left) }) : d.outOfStock}
                      </span>
                      {inCart > 0 && (
                        <span className="absolute right-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white">
                          {num(inCart)}
                        </span>
                      )}
                    </span>
                    <span className="flex flex-1 flex-col p-2.5">
                      <span className="block text-xs font-medium leading-snug text-slate-200">{t.products[p.id]}</span>
                      <span className="mt-auto block pt-1 text-sm font-semibold text-brand-300">{fmt(p.price)}</span>
                    </span>
                  </motion.button>
                );
              })}
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
                    <div className="flex min-w-0 items-center gap-2">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br ${productTint[l.id]}`}>
                        <ProductArt id={l.id} className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-slate-200">{t.products[l.id]}</p>
                        <p className="text-[11px] text-slate-500">
                          {num(l.qty)} × {fmt(l.price)} = {fmt((Math.round(l.price * 100) * l.qty) / 100)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => change(catalog.find((p) => p.id === l.id)!, -1)}
                        aria-label={`${d.removeOne}: ${t.products[l.id]}`}
                        className="grid h-6 w-6 place-items-center rounded bg-white/5 text-slate-300 hover:bg-white/10"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-white">{num(l.qty)}</span>
                      <button
                        onClick={() => change(catalog.find((p) => p.id === l.id)!, 1)}
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
              {payModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setReceipt(null);
                  }}
                  aria-pressed={mode === m.id}
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

            <button
              ref={checkoutRef}
              onClick={() => setModal(true)}
              disabled={!total}
              className="mt-4 w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
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
                        <span>{fmt((Math.round(l.price * 100) * l.qty) / 100)}</span>
                      </div>
                    ))}
                    <div className="my-2 border-t border-dashed border-slate-400" />
                    <div className="flex justify-between text-xs font-bold">
                      <span>{d.receipt.total}</span>
                      <span>{fmt(receipt.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.payment[receipt.mode]}</span>
                      <span>{fmt(receipt.total)}</span>
                    </div>
                    {receipt.ref && (
                      <p className="text-slate-500">
                        {receipt.mode === "bkash" ? d.receipt.trxId : d.receipt.cardRef}: {receipt.ref}
                      </p>
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
                      <div className="flex justify-between">
                        <span>{receipt.mode === "cash" ? d.journal.drCash : receipt.mode === "bkash" ? d.journal.drBkash : d.journal.drCard}</span>
                        <span>{fmt(receipt.total)}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span className="pl-3">{d.journal.crSales}</span>
                        <span>{fmt(receipt.total)}</span>
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

      {/* checkout → live POS */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/75 p-4 backdrop-blur-sm"
            onClick={() => setModal(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="live-pos-title"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/60"
            >
              <button
                onClick={() => setModal(false)}
                aria-label={d.modal.close}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                <ScanBarcode className="h-6 w-6" />
              </span>
              <h3 id="live-pos-title" className="mt-4 text-lg font-bold text-white">
                {d.modal.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{d.modal.body}</p>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 text-sm">
                <span className="text-slate-400">
                  {fill(d.modal.items, { n: num(itemCount) })} · {t.payment[mode]}
                </span>
                <span className="font-bold text-white">{fmt(total)}</span>
              </div>

              <a
                href={LIVE_POS_URL}
                target="_blank"
                rel="noopener noreferrer"
                ref={ctaRef}
                onClick={() => setModal(false)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
              >
                {d.modal.cta} <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
              <button
                onClick={printDemoReceipt}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <Printer className="h-4 w-4" /> {d.modal.local}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
