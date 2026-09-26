import type { Dictionary } from "@/lib/i18n/en";
import type { FeatureKey } from "@/lib/features";

// Data-driven UI mockups for the feature pages. Every visible word comes from the
// dictionary (t.showcase.mock), so each screen renders in EN and BN.

export type Tone = "brand" | "amber" | "rose" | "sky" | "violet" | "slate";

export type Cell = string | { text: string; tone?: Tone; badge?: boolean; mono?: boolean; strong?: boolean };

export type Block =
  | { type: "kpis"; items: { label: string; value: string; tone?: Tone; hint?: string }[] }
  | { type: "table"; columns: string[]; rows: Cell[][]; right?: number[]; total?: Cell[] }
  | { type: "bars"; items: { label: string; value: number; display: string; tone?: Tone }[] }
  | { type: "area"; points: number[]; labels: string[]; caption: string }
  | { type: "journal"; lines: { side: "dr" | "cr"; account: string; amount: string }[]; footer: string }
  | { type: "steps"; items: string[]; active: number }
  | { type: "segments"; items: { label: string; value: number; display: string; tone: Tone }[] }
  | { type: "chips"; label?: string; items: string[]; active: number[] }
  | { type: "note"; text: string; tone?: Tone }
  | { type: "barcode"; name: string; code: string; price: string };

export type MockSpec = { context: string; status?: { text: string; tone: Tone }; blocks: Block[] };

export type MockCtx = {
  m: Dictionary["showcase"]["mock"];
  p: Dictionary["products"];
  pay: Dictionary["payment"];
  num: (n: number) => string;
  taka: (n: number) => string;
  /** Localise the digits inside a date, time or ratio string. */
  d: (s: string) => string;
};

const signed = (c: MockCtx, n: number) => (n === 0 ? c.taka(0) : n < 0 ? `−${c.taka(-n)}` : `+${c.taka(n)}`);
const pct = (c: MockCtx, n: number) => `${c.num(n)}%`;
const badge = (text: string, tone: Tone): Cell => ({ text, tone, badge: true });
const mono = (text: string): Cell => ({ text, mono: true });
const strong = (text: string, tone?: Tone): Cell => ({ text, strong: true, tone });

export const mockups: Record<FeatureKey, (c: MockCtx) => MockSpec> = {
  // ---------------------------------------------------------------- POS & Billing
  registers: (c) => {
    const { m } = c;
    return {
      context: m.branches.agrabad,
      status: { text: m.live, tone: "brand" },
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.openTills, value: c.d("3 / 4") },
            { label: m.todaysSales, value: c.taka(184250), tone: "brand" },
            { label: m.offlineQueue, value: c.num(6), tone: "amber", hint: m.autoSync },
          ],
        },
        {
          type: "table",
          columns: [m.till, m.cashier, m.status, m.sales],
          right: [3],
          rows: [
            [mono(c.d(`${m.till} 01`)), m.names.rafi, badge(m.online, "brand"), c.taka(62400)],
            [mono(c.d(`${m.till} 02`)), m.names.nusrat, badge(m.online, "brand"), c.taka(58900)],
            [mono(c.d(`${m.till} 03`)), m.names.tanvir, badge(m.offlineSyncing, "amber"), c.taka(41350)],
            [mono(c.d(`${m.till} 04`)), "—", badge(m.closed, "slate"), c.taka(21600)],
          ],
        },
        { type: "note", text: m.offlineNote, tone: "sky" },
      ],
    };
  },
  barcode: (c) => {
    const { m, p } = c;
    return {
      context: c.d(`${m.branches.agrabad} · ${m.till} 02`),
      status: { text: m.scanned, tone: "brand" },
      blocks: [
        { type: "barcode", name: p.rice, code: "8941100500128", price: c.taka(420) },
        {
          type: "table",
          columns: [m.item, m.barcode, m.qty, m.price],
          right: [2, 3],
          rows: [
            [strong(p.rice), mono("8941100500128"), c.num(1), c.taka(420)],
            [p.oil, mono("8941161003215"), c.num(1), c.taka(365)],
            [p.milk, mono("8941100654302"), c.num(2), c.taka(220)],
            [p.tea, mono(m.generated), c.num(1), c.taka(185)],
          ],
        },
        { type: "note", text: m.barcodeNote, tone: "brand" },
      ],
    };
  },
  boxPiece: (c) => {
    const { m, p } = c;
    return {
      context: p.biscuit,
      blocks: [
        { type: "chips", label: m.sellAs, items: [m.units.piece, m.units.pack, m.units.box, m.units.dozen], active: [2] },
        {
          type: "table",
          columns: [m.unit, m.contains, m.price],
          right: [1, 2],
          rows: [
            [m.units.piece, `${c.num(1)} ${m.pcs}`, c.taka(25)],
            [m.units.pack, `${c.num(6)} ${m.pcs}`, c.taka(145)],
            [strong(m.units.box, "brand"), strong(`${c.num(24)} ${m.pcs}`, "brand"), strong(c.taka(560), "brand")],
            [m.units.dozen, `${c.num(12)} ${m.pcs}`, c.taka(290)],
          ],
        },
        {
          type: "kpis",
          items: [
            { label: m.stockBaseUnit, value: `${c.num(480)} ${m.pcs}` },
            { label: m.equalsBoxes, value: c.num(20), tone: "brand" },
          ],
        },
      ],
    };
  },
  receipts: (c) => {
    const { m } = c;
    return {
      context: m.receiptLog,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.sentToday, value: c.num(214) },
            { label: m.delivered, value: pct(c, 98), tone: "brand" },
            { label: m.printed, value: c.num(63) },
          ],
        },
        {
          type: "table",
          columns: [m.invoice, m.channel, m.customer, m.status],
          rows: [
            [mono("INV-10482"), m.whatsapp, mono("017•• ••4321"), badge(m.delivered, "brand")],
            [mono("INV-10481"), m.sms, mono("018•• ••9087"), badge(m.delivered, "brand")],
            [mono("INV-10480"), m.thermal, m.walkIn, badge(m.printed, "sky")],
            [mono("INV-10479"), m.sms, mono("019•• ••1150"), badge(m.failed, "rose")],
          ],
        },
      ],
    };
  },
  shifts: (c) => {
    const { m } = c;
    return {
      context: c.d(`${m.names.nusrat} · ${m.till} 02`),
      status: { text: m.closingShift, tone: "amber" },
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.openingFloat, value: c.taka(5000) },
            { label: m.expectedCash, value: c.taka(48720) },
            { label: m.countedCash, value: c.taka(48650) },
            { label: m.overShort, value: signed(c, -70), tone: "rose" },
          ],
        },
        {
          type: "table",
          columns: [m.movement, m.amount],
          right: [1],
          rows: [
            [m.cashSales, signed(c, 52900)],
            [m.refunds, signed(c, -1480)],
            [m.payOuts, signed(c, -1200)],
            [m.safeDrops, signed(c, -6500)],
          ],
        },
        { type: "note", text: m.shortPosted, tone: "amber" },
      ],
    };
  },
  safeDrops: (c) => {
    const { m } = c;
    return {
      context: c.d(`${m.names.rafi} · ${m.till} 01`),
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.drawerExpected, value: c.taka(23460) },
            { label: m.inSafe, value: c.taka(18000), tone: "brand" },
          ],
        },
        {
          type: "table",
          columns: [m.time, m.type, m.reason, m.amount],
          right: [3],
          rows: [
            [mono(c.d("11:40")), badge(m.safeDrop, "violet"), m.midShiftDrop, c.taka(10000)],
            [mono(c.d("13:15")), badge(m.payOut, "rose"), m.vanFuel, c.taka(850)],
            [mono(c.d("15:02")), badge(m.payIn, "brand"), m.changeFloat, c.taka(2000)],
            [mono(c.d("17:30")), badge(m.safeDrop, "violet"), m.midShiftDrop, c.taka(8000)],
          ],
        },
        { type: "note", text: m.safeDropNote, tone: "sky" },
      ],
    };
  },
  layaways: (c) => {
    const { m } = c;
    return {
      context: `LAY-0192 · ${m.names.sadia}`,
      blocks: [
        { type: "steps", items: [m.booked, m.partiallyPaid, m.fullyPaid, m.fulfilled], active: 1 },
        {
          type: "kpis",
          items: [
            { label: m.total, value: c.taka(38500) },
            { label: m.paid, value: c.taka(15000), tone: "brand" },
            { label: m.balance, value: c.taka(23500), tone: "amber" },
          ],
        },
        {
          type: "table",
          columns: [m.date, m.method, m.amount],
          right: [2],
          rows: [
            [mono(c.d("02/09")), m.depositCash, c.taka(10000)],
            [mono(c.d("16/09")), c.pay.bkash, c.taka(5000)],
          ],
        },
      ],
    };
  },
  quotations: (c) => {
    const { m, p } = c;
    return {
      context: `QT-0457 · ${m.names.karimStore}`,
      status: { text: c.d(`${m.validUntil} 30/09`), tone: "sky" },
      blocks: [
        { type: "steps", items: [m.draft, m.sent, m.accepted, m.convertedToSale], active: 2 },
        {
          type: "table",
          columns: [m.item, m.qty, m.rate, m.amount],
          right: [1, 2, 3],
          rows: [
            [p.rice, c.num(20), c.taka(410), c.taka(8200)],
            [p.oil, c.num(12), c.taka(355), c.taka(4260)],
            [p.lentil, c.num(25), c.taka(118), c.taka(2950)],
          ],
          total: [strong(m.total), "", "", strong(c.taka(15410), "brand")],
        },
      ],
    };
  },
  returns: (c) => {
    const { m, p } = c;
    return {
      context: `RET-0311 ← INV-10455`,
      blocks: [
        {
          type: "table",
          columns: [m.item, m.qty, m.refund],
          right: [1, 2],
          rows: [
            [p.soap, c.num(2), c.taka(140)],
            [p.oil, c.num(2), c.taka(700)],
          ],
        },
        {
          type: "chips",
          label: m.refundTo,
          items: [c.pay.cash, c.pay.bkash, m.nagad, m.storeCredit, m.dueAdjustment, m.exchange],
          active: [3],
        },
        {
          type: "journal",
          lines: [
            { side: "dr", account: m.acc.salesReturns, amount: c.taka(840) },
            { side: "cr", account: m.acc.storeCredit, amount: c.taka(840) },
          ],
          footer: m.stockBack,
        },
      ],
    };
  },

  // ---------------------------------------------------------------- Inventory & Supply Chain
  fefo: (c) => {
    const { m } = c;
    return {
      context: m.goods.paracetamol,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.expiring30, value: c.num(3), tone: "amber" },
            { label: m.valueAtRisk, value: c.taka(4860), tone: "rose" },
          ],
        },
        {
          type: "table",
          columns: [m.batch, m.expiry, m.qty, m.status],
          right: [2],
          rows: [
            [mono("B-2291"), mono(c.d("15/10/2026")), c.num(120), badge(m.sellFirst, "brand")],
            [mono("B-2310"), mono(c.d("02/01/2027")), c.num(300), badge(m.queued, "slate")],
            [mono("B-2344"), mono(c.d("18/03/2027")), c.num(240), badge(m.queued, "slate")],
          ],
        },
        { type: "note", text: m.fefoNote, tone: "brand" },
      ],
    };
  },
  serial: (c) => {
    const { m } = c;
    return {
      context: m.goods.phone,
      blocks: [
        { type: "steps", items: [m.inStock, m.sold, m.transferred, m.returnedVendor], active: 1 },
        {
          type: "table",
          columns: [m.imei, m.status, m.reference],
          rows: [
            [mono("356789104512334"), badge(m.sold, "brand"), mono("INV-10455")],
            [mono("356789104518841"), badge(m.inStock, "sky"), m.branches.agrabad],
            [mono("356789104522210"), badge(m.transferred, "violet"), `→ ${m.branches.gec}`],
            [mono("356789104527719"), badge(m.returnedVendor, "amber"), mono("RTN-118")],
          ],
        },
      ],
    };
  },
  transfers: (c) => {
    const { m, p } = c;
    return {
      context: `TR-0877 · ${m.branches.warehouse} → ${m.branches.gec}`,
      status: { text: m.priorityHigh, tone: "rose" },
      blocks: [
        { type: "steps", items: [m.requested, m.approved, m.inTransit, m.grnReceived], active: 3 },
        {
          type: "table",
          columns: [m.item, m.sent, m.good, m.damaged, m.short],
          right: [1, 2, 3, 4],
          rows: [
            [p.rice, c.num(50), c.num(48), strong(c.num(2), "rose"), c.num(0)],
            [p.oil, c.num(40), c.num(38), c.num(0), strong(c.num(2), "amber")],
            [p.water, c.num(60), c.num(60), c.num(0), c.num(0)],
          ],
        },
        { type: "kpis", items: [{ label: m.lossValue, value: c.taka(1570), tone: "rose" }] },
      ],
    };
  },
  purchasing: (c) => {
    const { m } = c;
    return {
      context: m.purchases,
      blocks: [
        { type: "kpis", items: [{ label: m.payableVendors, value: c.taka(342800), tone: "amber" }] },
        {
          type: "table",
          columns: [m.document, m.vendor, m.status, m.amount],
          right: [3],
          rows: [
            [mono("PO-3321"), m.vendors.karnaphuli, badge(m.received, "brand"), c.taka(124000)],
            [mono("PO-3322"), m.vendors.padma, badge(m.partReceived, "amber"), c.taka(86500)],
            [mono("PI-2210"), m.vendors.karnaphuli, badge(m.onCredit, "violet"), c.taka(124000)],
            [mono("RTN-118"), m.vendors.padma, badge(m.exchange, "sky"), c.taka(9800)],
          ],
        },
        { type: "chips", label: m.payVia, items: [c.pay.cash, m.bank, m.credit], active: [1] },
      ],
    };
  },
  audits: (c) => {
    const { m, p } = c;
    return {
      context: `${m.scope}: ${m.beverage}`,
      status: { text: m.awaitingApproval, tone: "amber" },
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.counted, value: c.d("86 / 92") },
            { label: m.variance, value: signed(c, -2340), tone: "rose" },
          ],
        },
        {
          type: "table",
          columns: [m.item, m.system, m.counted, m.variance],
          right: [1, 2, 3],
          rows: [
            [p.water, c.num(120), c.num(116), strong(`−${c.num(4)}`, "rose")],
            [p.tea, c.num(64), c.num(64), c.num(0)],
            [p.milk, c.num(48), c.num(49), strong(`+${c.num(1)}`, "brand")],
          ],
        },
        { type: "note", text: m.auditNote, tone: "amber" },
      ],
    };
  },
  bom: (c) => {
    const { m, p } = c;
    return {
      context: `PB-0064 · ${p.lentil}`,
      blocks: [
        {
          type: "table",
          columns: [m.line, m.qty, m.cost],
          right: [1, 2],
          rows: [
            [badge(m.input, "sky"), `${c.num(50)} ${m.kg}`, c.taka(5250)],
            [badge(m.packaging, "violet"), c.num(49), c.taka(300)],
            [badge(m.wastage, "rose"), `${c.num(1)} ${m.kg}`, "—"],
            [badge(m.output, "brand"), c.num(49), strong(c.taka(5550), "brand")],
          ],
        },
        {
          type: "kpis",
          items: [
            { label: m.unitCost, value: c.taka(113.27), tone: "brand" },
            { label: m.wastageRate, value: pct(c, 2) },
          ],
        },
      ],
    };
  },

  // ---------------------------------------------------------------- Double-Entry Accounting
  journals: (c) => {
    const { m } = c;
    return {
      context: `JE-8841 · INV-10482`,
      status: { text: m.postedIn, tone: "brand" },
      blocks: [
        {
          type: "journal",
          lines: [
            { side: "dr", account: m.acc.cash, amount: c.taka(1000) },
            { side: "dr", account: m.acc.bkash, amount: c.taka(1285) },
            { side: "cr", account: m.acc.sales, amount: c.taka(2175) },
            { side: "cr", account: m.acc.vatPayable, amount: c.taka(110) },
          ],
          footer: m.balanced,
        },
        {
          type: "table",
          columns: [m.entry, m.source, m.amount],
          right: [2],
          rows: [
            [mono("JE-8840"), badge(m.purchase, "sky"), c.taka(124000)],
            [mono("JE-8839"), badge(m.payrollSrc, "violet"), c.taka(63750)],
            [mono("JE-8838"), badge(m.returnSrc, "amber"), c.taka(840)],
          ],
        },
      ],
    };
  },
  vouchers: (c) => {
    const { m } = c;
    return {
      context: m.voucherRegister,
      blocks: [
        {
          type: "table",
          columns: [m.voucher, m.head, m.status, m.amount],
          right: [3],
          rows: [
            [mono("PV-221"), m.heads.rent, badge(m.posted, "brand"), c.taka(45000)],
            [mono("RV-093"), m.heads.customerDue, badge(m.posted, "brand"), c.taka(12000)],
            [mono("JV-047"), m.heads.depreciation, badge(m.posted, "brand"), c.taka(3400)],
            [mono("PV-220"), m.heads.electricity, badge(m.voided, "rose"), c.taka(6200)],
          ],
        },
        { type: "note", text: m.voidNote, tone: "rose" },
      ],
    };
  },
  accountTransfers: (c) => {
    const { m } = c;
    return {
      context: m.transfersTitle,
      blocks: [
        {
          type: "table",
          columns: [m.from, m.to, m.amount],
          right: [2],
          rows: [
            [m.acc.cash, m.acc.vault, c.taka(50000)],
            [m.acc.bkash, m.acc.bank, c.taka(80000)],
            [m.acc.vault, m.acc.bank, c.taka(120000)],
          ],
        },
        {
          type: "journal",
          lines: [
            { side: "dr", account: m.acc.bank, amount: c.taka(80000) },
            { side: "cr", account: m.acc.bkash, amount: c.taka(80000) },
          ],
          footer: m.balanced,
        },
      ],
    };
  },
  landed: (c) => {
    const { m } = c;
    return {
      context: `PI-2231 · ${m.vendors.importer}`,
      blocks: [
        {
          type: "table",
          columns: [m.charge, m.basis, m.amount],
          right: [2],
          rows: [
            [m.freight, badge(m.byWeight, "sky"), c.taka(18000)],
            [m.customsDuty, badge(m.byValue, "violet"), c.taka(42500)],
            [m.handling, badge(m.byQuantity, "amber"), c.taka(3200)],
            [m.insurance, badge(m.byValue, "violet"), c.taka(2300)],
          ],
        },
        {
          type: "kpis",
          items: [
            { label: m.invoiceUnitCost, value: c.taka(460) },
            { label: m.landedUnitCost, value: c.taka(526), tone: "brand", hint: `+${pct(c, 14.3)}` },
          ],
        },
      ],
    };
  },
  mfs: (c) => {
    const { m } = c;
    return {
      context: m.walletReconciliation,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: c.pay.bkash, value: c.taka(84320), tone: "rose" },
            { label: m.nagad, value: c.taka(36150), tone: "amber" },
            { label: m.rocket, value: c.taka(9800), tone: "violet" },
          ],
        },
        {
          type: "table",
          columns: [m.trxId, m.invoice, m.amount, m.status],
          right: [2],
          rows: [
            [mono("9GH4K2LQ7T"), mono("INV-10482"), c.taka(1285), badge(m.matched, "brand")],
            [mono("7NX2P8RD1C"), mono("INV-10477"), c.taka(640), badge(m.matched, "brand")],
            [mono("3KD9W0QZ5M"), mono("INV-10471"), c.taka(2100), badge(m.unmatched, "amber")],
          ],
        },
      ],
    };
  },
  zreport: (c) => {
    const { m } = c;
    return {
      context: `${m.branches.agrabad} · ${c.d("26/09/2026")}`,
      status: { text: m.dayClosed, tone: "brand" },
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.grossSales, value: c.taka(184250) },
            { label: m.returnsLabel, value: c.taka(2310) },
            { label: m.discounts, value: c.taka(4120) },
            { label: m.vatLabel, value: c.taka(8770) },
          ],
        },
        {
          type: "segments",
          items: [
            { label: c.pay.cash, value: 52, display: pct(c, 52), tone: "brand" },
            { label: c.pay.bkash, value: 28, display: pct(c, 28), tone: "rose" },
            { label: c.pay.card, value: 12, display: pct(c, 12), tone: "sky" },
            { label: m.nagad, value: 8, display: pct(c, 8), tone: "amber" },
          ],
        },
        {
          type: "table",
          columns: [m.shift, m.cashier, m.overShort],
          right: [2],
          rows: [
            [mono("S-5521"), m.names.rafi, c.taka(0)],
            [mono("S-5522"), m.names.nusrat, strong(signed(c, -70), "rose")],
            [mono("S-5523"), m.names.tanvir, strong(signed(c, 20), "brand")],
          ],
        },
      ],
    };
  },
  yearEnd: (c) => {
    const { m } = c;
    return {
      context: c.d(`${m.fy} 2025–26`),
      status: { text: m.yearClosed, tone: "brand" },
      blocks: [
        { type: "steps", items: [m.reviewTb, m.postClosing, m.yearClosed], active: 2 },
        {
          type: "journal",
          lines: [
            { side: "dr", account: m.acc.income, amount: c.taka(24050000) },
            { side: "cr", account: m.acc.expenses, amount: c.taka(21230000) },
            { side: "cr", account: m.acc.retained, amount: c.taka(2820000) },
          ],
          footer: m.balanced,
        },
        { type: "note", text: m.reopenNote, tone: "slate" },
      ],
    };
  },

  // ---------------------------------------------------------------- HR & Payroll
  staffDirectory: (c) => {
    const { m } = c;
    return {
      context: m.staffTitle,
      blocks: [
        {
          type: "table",
          columns: [m.name, m.designation, m.branch, m.login],
          rows: [
            [strong(m.names.rafi), m.roles.cashier, m.branches.agrabad, badge(m.linked, "brand")],
            [strong(m.names.nusrat), m.roles.seniorCashier, m.branches.gec, badge(m.linked, "brand")],
            [strong(m.names.tanvir), m.roles.salesperson, m.branches.agrabad, badge(m.linked, "brand")],
            [strong(m.names.karim), m.roles.storeKeeper, m.branches.warehouse, badge(m.noLogin, "slate")],
          ],
        },
        { type: "chips", label: m.salaryType, items: [m.monthly, m.daily], active: [0] },
      ],
    };
  },
  roles: (c) => {
    const { m } = c;
    const yes = badge("✓", "brand");
    const no = badge("✕", "slate");
    return {
      context: m.permissions,
      blocks: [
        {
          type: "table",
          columns: [m.permission, m.roles.admin, m.roles.manager, m.roles.cashier],
          rows: [
            [m.perm.discount, yes, yes, no],
            [m.perm.voidSale, yes, yes, no],
            [m.perm.approveTransfer, yes, yes, no],
            [m.perm.costPrice, yes, no, no],
          ],
        },
        { type: "note", text: c.d(m.lockedNote), tone: "rose" },
      ],
    };
  },
  attendance: (c) => {
    const { m } = c;
    return {
      context: c.d(`${m.today} · 26/09`),
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.present, value: c.num(18), tone: "brand" },
            { label: m.late, value: c.num(3), tone: "amber" },
            { label: m.halfDay, value: c.num(1), tone: "violet" },
            { label: m.absent, value: c.num(2), tone: "rose" },
          ],
        },
        {
          type: "table",
          columns: [m.name, m.checkIn, m.checkOut, m.status],
          rows: [
            [m.names.rafi, mono(c.d("08:55")), mono(c.d("17:05")), badge(m.present, "brand")],
            [m.names.nusrat, mono(c.d("09:22")), mono(c.d("17:10")), badge(m.late, "amber")],
            [m.names.tanvir, mono(c.d("09:00")), mono(c.d("13:00")), badge(m.halfDay, "violet")],
            [m.names.karim, "—", "—", badge(m.absent, "rose")],
          ],
        },
      ],
    };
  },
  shiftLogs: (c) => {
    const { m } = c;
    return {
      context: m.shiftLogTitle,
      blocks: [
        {
          type: "table",
          columns: [m.shift, m.cashier, m.opened, m.closed, m.overShort],
          right: [4],
          rows: [
            [mono("S-5521"), m.names.rafi, mono(c.d("09:00")), mono(c.d("17:00")), c.taka(0)],
            [mono("S-5522"), m.names.nusrat, mono(c.d("09:30")), mono(c.d("17:30")), strong(signed(c, -70), "rose")],
            [mono("S-5523"), m.names.tanvir, mono(c.d("13:00")), mono(c.d("21:00")), strong(signed(c, 20), "brand")],
            [mono("S-5524"), m.names.rafi, mono(c.d("09:00")), badge(m.openNow, "sky"), "—"],
          ],
        },
        { type: "note", text: m.shiftLogNote, tone: "sky" },
      ],
    };
  },
  payroll: (c) => {
    const { m } = c;
    return {
      context: c.d(`${m.payrollMonth} · 09/2026`),
      status: { text: m.paid, tone: "brand" },
      blocks: [
        {
          type: "table",
          columns: [m.name, m.basic, m.bonus, m.deduction, m.net],
          right: [1, 2, 3, 4],
          rows: [
            [m.names.rafi, c.taka(18000), c.taka(1500), strong(`−${c.taka(600)}`, "rose"), strong(c.taka(18900))],
            [m.names.nusrat, c.taka(22000), c.taka(2000), c.taka(0), strong(c.taka(24000))],
            [m.names.tanvir, c.taka(16000), c.taka(4850), c.taka(0), strong(c.taka(20850))],
          ],
          total: [strong(m.total), "", "", "", strong(c.taka(63750), "brand")],
        },
        {
          type: "journal",
          lines: [
            { side: "dr", account: m.acc.salaryExpense, amount: c.taka(63750) },
            { side: "cr", account: m.acc.bank, amount: c.taka(63750) },
          ],
          footer: m.payrollPosted,
        },
      ],
    };
  },
  commissions: (c) => {
    const { m } = c;
    return {
      context: m.commissionRule,
      blocks: [
        {
          type: "table",
          columns: [m.salesBand, m.rate],
          right: [1],
          rows: [
            [`${c.taka(0)} – ${c.taka(100000)}`, pct(c, 1)],
            [`${c.taka(100001)} – ${c.taka(300000)}`, pct(c, 1.5)],
            [`${c.taka(300000)}+`, strong(pct(c, 2), "brand")],
            [badge(m.electronicsOverride, "violet"), strong(pct(c, 3), "violet")],
          ],
        },
        {
          type: "bars",
          items: [
            { label: m.names.tanvir, value: 342000, display: `${c.taka(342000)} → ${c.taka(4850)}`, tone: "brand" },
            { label: m.names.sadia, value: 214000, display: `${c.taka(214000)} → ${c.taka(2710)}`, tone: "sky" },
            { label: m.names.rafi, value: 88000, display: `${c.taka(88000)} → ${c.taka(880)}`, tone: "slate" },
          ],
        },
      ],
    };
  },

  // ---------------------------------------------------------------- Reports & Analytics
  pnl: (c) => {
    const { m } = c;
    return {
      context: c.d(`${m.fy} 2026–27 · ${m.toDate}`),
      status: { text: m.live, tone: "brand" },
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.netSales, value: c.taka(1845200) },
            { label: m.grossMargin, value: pct(c, 27.4), tone: "brand" },
            { label: m.netProfit, value: c.taka(214600), tone: "brand" },
          ],
        },
        {
          type: "area",
          points: [58, 64, 61, 72, 70, 84, 91],
          labels: m.months,
          caption: m.netSalesTrend,
        },
        {
          type: "table",
          columns: [m.line, m.amount],
          right: [1],
          rows: [
            [m.cogs, `−${c.taka(1339600)}`],
            [strong(m.grossProfit), strong(c.taka(505600))],
            [m.opex, `−${c.taka(291000)}`],
          ],
          total: [strong(m.netProfit), strong(c.taka(214600), "brand")],
        },
      ],
    };
  },
  vat: (c) => {
    const { m } = c;
    return {
      context: m.vatSummary,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.vatCollected, value: c.taka(92260) },
            { label: m.netVatLiability, value: c.taka(92260), tone: "amber" },
          ],
        },
        {
          type: "table",
          columns: [m.month, m.taxableSales, m.vatLabel],
          right: [1, 2],
          rows: [
            [m.months[4], c.taka(598000), c.taka(29900)],
            [m.months[5], c.taka(612400), c.taka(30620)],
            [m.months[6], c.taka(634800), c.taka(31740)],
          ],
          total: [strong(m.total), strong(c.taka(1845200)), strong(c.taka(92260), "amber")],
        },
      ],
    };
  },
  trialBalance: (c) => {
    const { m } = c;
    return {
      context: c.d(`${m.asOf} 26/09/2026`),
      status: { text: m.balanced, tone: "brand" },
      blocks: [
        {
          type: "table",
          columns: [m.account, m.debit, m.creditCol],
          right: [1, 2],
          rows: [
            [m.acc.cash, c.taka(148200), ""],
            [m.acc.bkash, c.taka(84320), ""],
            [m.acc.inventory, c.taka(1264000), ""],
            [m.acc.payable, "", c.taka(342800)],
            [m.acc.vatPayable, "", c.taka(92260)],
            [m.acc.capital, "", c.taka(1061460)],
          ],
          total: [strong(m.total), strong(c.taka(1496520), "brand"), strong(c.taka(1496520), "brand")],
        },
      ],
    };
  },
  payablesReceivables: (c) => {
    const { m } = c;
    return {
      context: m.receivablesAging,
      blocks: [
        {
          type: "segments",
          items: [
            { label: c.d(`0–30 ${m.days}`), value: 46, display: c.taka(96400), tone: "brand" },
            { label: c.d(`31–60 ${m.days}`), value: 27, display: c.taka(56200), tone: "sky" },
            { label: c.d(`61–90 ${m.days}`), value: 17, display: c.taka(35800), tone: "amber" },
            { label: c.d(`90+ ${m.days}`), value: 10, display: c.taka(21300), tone: "rose" },
          ],
        },
        {
          type: "table",
          columns: [m.customer, m.overdue, m.amount],
          right: [1, 2],
          rows: [
            [m.names.karimStore, badge(c.d(`94 ${m.days}`), "rose"), c.taka(21300)],
            [m.names.hasanTraders, badge(c.d(`72 ${m.days}`), "amber"), c.taka(18650)],
            [m.names.sadia, badge(c.d(`38 ${m.days}`), "sky"), c.taka(7200)],
          ],
        },
      ],
    };
  },
  dayBook: (c) => {
    const { m } = c;
    return {
      context: m.dayBookTitle,
      status: { text: m.exportCsv, tone: "sky" },
      blocks: [
        {
          type: "table",
          columns: [m.entry, m.account, m.debit, m.creditCol],
          right: [2, 3],
          rows: [
            [mono("JE-8841"), m.acc.bkash, c.taka(1285), ""],
            [mono("JE-8841"), m.acc.sales, "", c.taka(1285)],
            [mono("JE-8842"), m.acc.rentExpense, c.taka(45000), ""],
            [mono("JE-8842"), m.acc.cash, "", c.taka(45000)],
          ],
          total: [strong(c.d(`26/09 · ${m.subtotal}`)), "", strong(c.taka(46285)), strong(c.taka(46285))],
        },
      ],
    };
  },
  cashMovement: (c) => {
    const { m } = c;
    return {
      context: m.allAccounts,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.moneyIn, value: c.taka(412600), tone: "brand" },
            { label: m.moneyOut, value: c.taka(298350), tone: "rose" },
          ],
        },
        {
          type: "bars",
          items: [
            { label: m.salesIn, value: 358000, display: signed(c, 358000), tone: "brand" },
            { label: m.receiptsIn, value: 54600, display: signed(c, 54600), tone: "brand" },
            { label: m.purchasesOut, value: 189600, display: signed(c, -189600), tone: "rose" },
            { label: m.salariesOut, value: 63750, display: signed(c, -63750), tone: "rose" },
            { label: m.rentOut, value: 45000, display: signed(c, -45000), tone: "rose" },
          ],
        },
      ],
    };
  },
  cashierPerformance: (c) => {
    const { m } = c;
    return {
      context: m.thisMonth,
      blocks: [
        {
          type: "bars",
          items: [
            { label: m.names.nusrat, value: 612000, display: c.taka(612000), tone: "brand" },
            { label: m.names.rafi, value: 548500, display: c.taka(548500), tone: "brand" },
            { label: m.names.tanvir, value: 402300, display: c.taka(402300), tone: "sky" },
          ],
        },
        {
          type: "table",
          columns: [m.cashier, m.invoices, m.avgBasket, m.overShort],
          right: [1, 2, 3],
          rows: [
            [m.names.nusrat, c.num(1284), c.taka(477), strong(signed(c, -70), "rose")],
            [m.names.rafi, c.num(1162), c.taka(472), c.taka(0)],
            [m.names.tanvir, c.num(911), c.taka(442), strong(signed(c, 20), "brand")],
          ],
        },
      ],
    };
  },
  inventoryHealth: (c) => {
    const { m, p } = c;
    return {
      context: m.inventoryBi,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.gmroi, value: c.num(2.8), tone: "brand" },
            { label: m.deadStock, value: c.taka(64200), tone: "rose" },
          ],
        },
        {
          type: "segments",
          items: [
            { label: m.classA, value: 78, display: pct(c, 78), tone: "brand" },
            { label: m.classB, value: 16, display: pct(c, 16), tone: "sky" },
            { label: m.classC, value: 6, display: pct(c, 6), tone: "slate" },
          ],
        },
        {
          type: "table",
          columns: [m.item, m.daysCover, m.capitalHeld],
          right: [1, 2],
          rows: [
            [p.soap, badge(c.num(186), "rose"), c.taka(28400)],
            [p.biscuit, badge(c.num(92), "amber"), c.taka(19600)],
          ],
        },
      ],
    };
  },
  auditLogs: (c) => {
    const { m } = c;
    return {
      context: m.activityTimeline,
      blocks: [
        {
          type: "table",
          columns: [m.time, m.event, m.user, m.amount],
          right: [3],
          rows: [
            [mono(c.d("10:12")), badge(m.ev.stockAdj, "sky"), m.names.karim, signed(c, -2340)],
            [mono(c.d("10:40")), badge(m.ev.voucherVoid, "rose"), m.names.nusrat, c.taka(6200)],
            [mono(c.d("11:05")), badge(m.ev.refund, "amber"), m.names.rafi, c.taka(840)],
            [mono(c.d("12:30")), badge(m.ev.shiftClose, "brand"), m.names.tanvir, signed(c, 20)],
            [mono(c.d("13:02")), badge(m.ev.accountLocked, "rose"), m.names.sadia, "—"],
          ],
        },
      ],
    };
  },

  // ---------------------------------------------------------------- Omnichannel & Growth
  socialOrders: (c) => {
    const { m } = c;
    return {
      context: m.onlineOrders,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.facebook, value: c.num(42) },
            { label: m.whatsapp, value: c.num(27) },
            { label: m.website, value: c.num(11) },
          ],
        },
        {
          type: "table",
          columns: [m.order, m.channel, m.courier, m.status],
          rows: [
            [mono("OO-2041"), m.facebook, "—", badge(m.pending, "amber")],
            [mono("OO-2040"), m.whatsapp, mono("TRK 88213"), badge(m.shipped, "sky")],
            [mono("OO-2038"), m.phoneCall, mono("TRK 88107"), badge(m.deliveredOrder, "brand")],
            [mono("OO-2033"), m.facebook, mono("TRK 87990"), badge(m.returned, "rose")],
          ],
        },
      ],
    };
  },
  codSettlement: (c) => {
    const { m } = c;
    return {
      context: m.codLedger,
      blocks: [
        {
          type: "kpis",
          items: [
            { label: m.pendingCod, value: c.taka(48650), tone: "amber" },
            { label: m.remittedWeek, value: c.taka(112300), tone: "brand" },
          ],
        },
        {
          type: "table",
          columns: [m.order, m.cod, m.advance, m.status],
          right: [1, 2],
          rows: [
            [mono("OO-2038"), c.taka(2450), c.taka(200), badge(m.remitted, "brand")],
            [mono("OO-2036"), c.taka(1890), c.taka(0), badge(m.remitted, "brand")],
            [mono("OO-2040"), c.taka(3120), c.taka(500), badge(m.awaitingCourier, "amber")],
          ],
        },
        { type: "note", text: m.remitNote, tone: "brand" },
      ],
    };
  },
  dueRecovery: (c) => {
    const { m } = c;
    return {
      context: m.creditCustomers,
      blocks: [
        { type: "kpis", items: [{ label: m.totalDue, value: c.taka(209700), tone: "amber" }] },
        {
          type: "table",
          columns: [m.customer, m.due, m.creditLimit, m.reminder],
          right: [1, 2],
          rows: [
            [m.names.karimStore, c.taka(21300), c.taka(25000), badge(m.smsSent, "brand")],
            [m.names.hasanTraders, c.taka(18650), c.taka(20000), badge(m.smsSent, "brand")],
            [m.names.sadia, c.taka(7200), c.taka(10000), badge(m.sendReminder, "sky")],
          ],
        },
        { type: "note", text: m.creditLimitNote, tone: "amber" },
      ],
    };
  },
  smsCampaigns: (c) => {
    const { m } = c;
    return {
      context: m.campaignName,
      status: { text: c.d(`${m.scheduled} 28/09 · 10:00`), tone: "sky" },
      blocks: [
        { type: "chips", label: m.segment, items: [m.seg.champions, m.seg.atRisk, m.seg.lost], active: [1] },
        { type: "note", text: m.smsPreview, tone: "slate" },
        {
          type: "kpis",
          items: [
            { label: m.recipients, value: c.num(1240) },
            { label: m.estCost, value: c.taka(620) },
            { label: m.sentLabel, value: c.num(1212), tone: "brand" },
            { label: m.failed, value: c.num(28), tone: "rose" },
          ],
        },
      ],
    };
  },
  rfmInsights: (c) => {
    const { m } = c;
    return {
      context: m.rfmTitle,
      blocks: [
        {
          type: "segments",
          items: [
            { label: m.seg.champions, value: 18, display: c.num(412), tone: "brand" },
            { label: m.seg.loyal, value: 26, display: c.num(598), tone: "sky" },
            { label: m.seg.needAttention, value: 22, display: c.num(506), tone: "violet" },
            { label: m.seg.atRisk, value: 20, display: c.num(461), tone: "amber" },
            { label: m.seg.lost, value: 14, display: c.num(322), tone: "rose" },
          ],
        },
        {
          type: "table",
          columns: [m.customer, "R", "F", "M", m.segment],
          right: [1, 2, 3],
          rows: [
            [m.names.sadia, c.num(5), c.num(5), c.num(4), badge(m.seg.champions, "brand")],
            [m.names.hasanTraders, c.num(2), c.num(4), c.num(5), badge(m.seg.atRisk, "amber")],
            [m.names.karimStore, c.num(1), c.num(2), c.num(2), badge(m.seg.lost, "rose")],
          ],
        },
      ],
    };
  },
  loyalty: (c) => {
    const { m } = c;
    return {
      context: m.loyaltyLadder,
      blocks: [
        {
          type: "table",
          columns: [m.tier, m.spendFrom, m.earn, m.members],
          right: [1, 2, 3],
          rows: [
            [badge(m.tiers.standard, "slate"), c.taka(0), c.d("1×"), c.num(2140)],
            [badge(m.tiers.silver, "sky"), c.taka(20000), c.d("1.25×"), c.num(612)],
            [badge(m.tiers.gold, "amber"), c.taka(60000), c.d("1.5×"), c.num(208)],
            [badge(m.tiers.platinum, "violet"), c.taka(150000), c.d("2×"), c.num(47)],
          ],
        },
        { type: "note", text: m.tierNote, tone: "amber" },
      ],
    };
  },
  coupons: (c) => {
    const { m } = c;
    return {
      context: m.occasionRewards,
      blocks: [
        {
          type: "table",
          columns: [m.customer, m.occasion, m.code, m.status],
          rows: [
            [m.names.sadia, m.birthday, mono("BDAY-7K2Q"), badge(`${m.claimed} · INV-10470`, "brand")],
            [m.names.nusrat, m.anniversary, mono("ANNV-3M8P"), badge(m.issued, "sky")],
            [m.names.hasanTraders, m.birthday, mono("BDAY-9T4X"), badge(m.issued, "sky")],
          ],
        },
        {
          type: "kpis",
          items: [
            { label: m.discount, value: pct(c, 10), tone: "brand" },
            { label: m.validity, value: c.d(`7 ${m.days}`) },
          ],
        },
      ],
    };
  },
  tieredPromos: (c) => {
    const { m, p } = c;
    return {
      context: p.biscuit,
      blocks: [
        {
          type: "table",
          columns: [m.quantity, m.unitPrice],
          right: [1],
          rows: [
            [c.d("1 – 5"), c.taka(25)],
            [c.d("6+"), strong(c.taka(22), "brand")],
            [badge(`${m.combo}: ${p.tea} + ${p.biscuit}`, "violet"), strong(c.taka(200), "violet")],
          ],
        },
        { type: "chips", label: m.stacking, items: [m.bestDeal, m.byPriority, m.exclusive], active: [0] },
      ],
    };
  },
  bxgy: (c) => {
    const { m } = c;
    return {
      context: m.activeOffers,
      blocks: [
        {
          type: "table",
          columns: [m.offer, m.schedule, m.status],
          rows: [
            [strong(m.offers.b2g1), c.d(m.offers.b2g1When), badge(m.active, "brand")],
            [strong(m.offers.happyHour), c.d(m.offers.happyHourWhen), badge(m.active, "brand")],
            [strong(m.offers.cart), c.d(m.offers.cartWhen), badge(m.scheduled, "sky")],
          ],
        },
        { type: "note", text: m.autoApplyNote, tone: "brand" },
      ],
    };
  },
};
