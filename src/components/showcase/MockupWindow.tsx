"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FeatureKey } from "@/lib/features";
import { useI18n } from "@/lib/i18n";
import { mockups, type Block, type Cell, type MockCtx, type Tone } from "./mockups";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

const toneText: Record<Tone, string> = {
  brand: "text-brand-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
  sky: "text-sky-300",
  violet: "text-violet-300",
  slate: "text-slate-300",
};

const toneBadge: Record<Tone, string> = {
  brand: "bg-brand-500/15 text-brand-200 ring-brand-400/30",
  amber: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  rose: "bg-rose-500/15 text-rose-200 ring-rose-400/30",
  sky: "bg-sky-500/15 text-sky-200 ring-sky-400/30",
  violet: "bg-violet-500/15 text-violet-200 ring-violet-400/30",
  slate: "bg-white/5 text-slate-300 ring-white/10",
};

const toneFill: Record<Tone, string> = {
  brand: "bg-brand-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  sky: "bg-sky-400",
  violet: "bg-violet-400",
  slate: "bg-slate-500",
};

const kpiCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

function CellView({ cell }: { cell: Cell }) {
  if (typeof cell === "string") return <>{cell}</>;
  if (cell.badge) {
    return (
      <span
        className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold ring-1 ${toneBadge[cell.tone ?? "slate"]}`}
      >
        {cell.text}
      </span>
    );
  }
  return (
    <span
      className={`${cell.mono ? "font-mono text-[11px] text-slate-400" : ""} ${cell.strong ? "font-semibold text-white" : ""} ${
        cell.tone ? toneText[cell.tone] : ""
      }`}
    >
      {cell.text}
    </span>
  );
}

/** Deterministic bar pattern from the digits, so the label looks like a real barcode. */
function BarcodeBars({ code }: { code: string }) {
  const bars = useMemo(() => {
    const out: { x: number; w: number }[] = [];
    let x = 0;
    for (const ch of code) {
      const d = Number(ch);
      for (let i = 0; i < 4; i++) {
        const w = ((d + i * 3) % 3) + 1;
        if (i % 2 === 0) out.push({ x, w });
        x += w + 1;
      }
    }
    return { out, width: x };
  }, [code]);
  return (
    <svg viewBox={`0 0 ${bars.width} 40`} className="h-12 w-full" preserveAspectRatio="none" aria-hidden>
      {bars.out.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={40} fill="currentColor" />
      ))}
    </svg>
  );
}

function AreaChart({ points, labels, caption }: { points: number[]; labels: string[]; caption: string }) {
  const uid = useId().replace(/:/g, "");
  const w = 300;
  const h = 90;
  const max = Math.max(...points) * 1.1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - (p / max) * h] as const);
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <p className="text-[11px] font-medium text-slate-400">{caption}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-24 w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${uid}-reveal`}>
            <motion.rect
              x={0}
              y={-4}
              height={h + 8}
              initial={{ width: 0 }}
              animate={{ width: w }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-reveal)`}>
          <path d={area} fill={`url(#${uid}-fill)`} />
          <path d={line} fill="none" stroke="#43c19b" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "kpis":
      return (
        <div className={`grid gap-2 ${kpiCols[Math.min(block.items.length, 4)]}`}>
          {block.items.map((k) => (
            <div key={k.label} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
              <p className="text-[10.5px] font-medium leading-snug text-slate-400">{k.label}</p>
              <p className={`mt-1 text-base font-bold tabular-nums ${k.tone ? toneText[k.tone] : "text-white"}`}>{k.value}</p>
              {k.hint && <p className="mt-0.5 text-[10px] text-slate-500">{k.hint}</p>}
            </div>
          ))}
        </div>
      );
    case "table": {
      const right = new Set(block.right ?? []);
      const align = (i: number) => (right.has(i) ? "text-right" : "text-left");
      return (
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-xs">
            <thead className="bg-white/[0.03]">
              <tr>
                {block.columns.map((col, i) => (
                  <th
                    key={i}
                    className={`whitespace-nowrap px-2.5 py-2 text-[10.5px] sm:px-3 font-semibold uppercase tracking-wide text-slate-500 ${align(i)}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {block.rows.map((row, r) => (
                <motion.tr
                  key={r}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + r * 0.05 }}
                  className="text-slate-300"
                >
                  {row.map((cell, i) => (
                    <td key={i} className={`px-2.5 py-2 tabular-nums sm:px-3 ${align(i)}`}>
                      <CellView cell={cell} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
            {block.total && (
              <tfoot className="border-t border-white/10 bg-white/[0.03]">
                <tr>
                  {block.total.map((cell, i) => (
                    <td key={i} className={`px-2.5 py-2 tabular-nums sm:px-3 ${align(i)}`}>
                      <CellView cell={cell} />
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      );
    }
    case "bars": {
      const max = Math.max(...block.items.map((b) => b.value));
      return (
        <div className="space-y-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          {block.items.map((b, i) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between gap-3 text-[11px]">
                <span className="font-medium text-slate-300">{b.label}</span>
                <span className="tabular-nums text-slate-400">{b.display}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className={`h-full rounded-full ${toneFill[b.tone ?? "brand"]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(b.value / max) * 100}%` }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
    case "area":
      return <AreaChart points={block.points} labels={block.labels} caption={block.caption} />;
    case "journal":
      return (
        <div className="rounded-xl border border-brand-400/20 bg-brand-500/[0.06] p-3 font-mono text-[11.5px]">
          {block.lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className={`flex justify-between gap-3 py-0.5 ${l.side === "cr" ? "pl-6 text-slate-400" : "text-slate-200"}`}
            >
              <span>
                <span className={l.side === "dr" ? "text-brand-300" : "text-sky-300"}>{l.side === "dr" ? "Dr" : "Cr"}</span>{" "}
                {l.account}
              </span>
              <span className="tabular-nums">{l.amount}</span>
            </motion.div>
          ))}
          <p className="mt-2 flex items-center gap-1.5 border-t border-brand-400/15 pt-2 font-sans text-[11px] font-medium text-brand-300">
            <CheckCircle2 className="h-3.5 w-3.5" /> {block.footer}
          </p>
        </div>
      );
    case "steps":
      return (
        <ol className="flex flex-wrap items-center gap-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          {block.items.map((s, i) => {
            const done = i < block.active;
            const current = i === block.active;
            return (
              <li key={s} className="flex items-center">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    current
                      ? "bg-brand-500/20 text-brand-200 ring-1 ring-brand-400/40"
                      : done
                        ? "text-brand-300"
                        : "text-slate-500"
                  }`}
                >
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-full text-[9px] ${
                      done || current ? "bg-brand-400 text-ink-900" : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {done ? "✓" : ""}
                  </span>
                  {s}
                </span>
                {i < block.items.length - 1 && (
                  <span className={`mx-1 h-px w-4 sm:w-6 ${done ? "bg-brand-400/60" : "bg-white/10"}`} />
                )}
              </li>
            );
          })}
        </ol>
      );
    case "segments": {
      const total = block.items.reduce((n, s) => n + s.value, 0);
      return (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="flex h-3 overflow-hidden rounded-full bg-white/5">
            {block.items.map((s, i) => (
              <motion.div
                key={s.label}
                className={`${toneFill[s.tone]} ${i ? "border-l border-ink-900/60" : ""}`}
                initial={{ width: 0 }}
                animate={{ width: `${(s.value / total) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
            {block.items.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-2 text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${toneFill[s.tone]}`} />
                  {s.label}
                </span>
                <span className="font-semibold tabular-nums text-slate-200">{s.display}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "chips":
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          {block.label && <span className="mr-1 text-[11px] font-medium text-slate-500">{block.label}</span>}
          {block.items.map((c, i) => (
            <span
              key={c}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                block.active.includes(i)
                  ? "bg-brand-500/20 text-brand-200 ring-brand-400/40"
                  : "bg-white/[0.03] text-slate-400 ring-white/10"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      );
    case "note": {
      const tone = block.tone ?? "slate";
      return (
        <p className={`flex items-start gap-2 rounded-xl px-3 py-2 text-[11.5px] leading-relaxed ring-1 ${toneBadge[tone]}`}>
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{block.text}</span>
        </p>
      );
    }
    case "barcode":
      return (
        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="w-40 shrink-0 rounded-lg bg-white px-3 pb-1.5 pt-2 text-ink-900">
            <p className="truncate text-[10px] font-semibold">{block.name}</p>
            <BarcodeBars code={block.code} />
            <div className="flex justify-between font-mono text-[9px]">
              <span>{block.code}</span>
              <span className="font-bold">{block.price}</span>
            </div>
          </div>
          <motion.div
            className="h-0.5 flex-1 rounded-full bg-rose-400 shadow-[0_0_12px_2px_rgba(251,113,133,0.6)]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }}
          />
        </div>
      );
  }
}

type Props = {
  featureKey: FeatureKey;
  icon: LucideIcon;
  moduleLabel: string;
};

/** Browser-style app window that renders the mockup for one capability. */
export default function MockupWindow({ featureKey, icon: Icon, moduleLabel }: Props) {
  const { t, lang, num, taka } = useI18n();

  const spec = useMemo(() => {
    const ctx: MockCtx = {
      m: t.showcase.mock,
      p: t.products,
      pay: t.payment,
      num,
      taka,
      d: (s) => (lang === "bn" ? s.replace(/\d/g, (c) => BN_DIGITS[Number(c)]) : s),
    };
    return mockups[featureKey](ctx);
  }, [featureKey, t, lang, num, taka]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-brand-500/10 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 shadow-2xl shadow-black/40">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-400/70" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center text-[11px] text-slate-500">
            Tech BitePOS · {moduleLabel}
          </p>
          <span className="flex items-center gap-1.5 text-[10.5px] font-medium text-brand-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            {t.showcase.preview}
          </span>
        </div>

        <motion.div
          key={`${featureKey}-${lang}`}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-3 p-3 sm:p-5"
        >
          <motion.div variants={item} className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/20">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{t.features.items[featureKey].title}</p>
                <p className="truncate text-[11px] text-slate-500">{spec.context}</p>
              </div>
            </div>
            {spec.status && (
              <span
                className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold ring-1 ${toneBadge[spec.status.tone]}`}
              >
                {spec.status.text}
              </span>
            )}
          </motion.div>
          {spec.blocks.map((b, i) => (
            <motion.div key={i} variants={item}>
              <BlockView block={b} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
