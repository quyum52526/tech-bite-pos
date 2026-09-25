export const en = {
  meta: {
    title: "Tech BitePOS — Enterprise POS & Double-Entry Accounting",
    description:
      "Multi-tenant POS, inventory and double-entry accounting for modern retail. Multi-branch control, offline mode and real-time ledger sync.",
  },
  register: {
    cta: "Register Now",
    badge: "3 Months Free",
  },
  nav: {
    features: "Features",
    demo: "Demo",
    useCases: "Use Cases",
    pricing: "Pricing",
    contact: "Contact",
    liveDemo: "Live Demo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    capabilities: "{n} capabilities",
    language: "Language",
  },
  hero: {
    eyebrow: "Multi-tenant POS · Inventory · Accounting",
    titleBefore: "The Enterprise POS &",
    titleHighlight: "Double\u2011Entry Accounting",
    titleAfter: "System for Modern Retail",
    subtitle:
      "Control every branch from one dashboard, keep selling when the internet drops, and watch each sale post to your ledger the second it happens. No end-of-day re-keying, no mismatched books.",
    tryDemo: "Try Interactive Demo",
    exploreFeatures: "Explore Features",
    pillars: ["Multi-branch control", "Works offline", "Real-time ledger sync"],
  },
  mockup: {
    branch: "Agrabad Branch · Till 02",
    cashier: "Cashier: Rafi",
    synced: "Synced",
    search: "Search or scan product…",
    categories: ["All", "Grocery", "Beverage", "Dairy", "Personal Care", "Snacks"],
    currentSale: "Current Sale",
    subtotal: "Subtotal",
    loyalty: "Loyalty (Gold −2%)",
    total: "Total",
    charge: "Charge",
    journalPosted: "Journal posted · 0.4s",
    drWallet: "Dr bKash Wallet",
    drDiscount: "Dr Discount Allowed",
    crSales: "Cr Sales Revenue",
    units: { bag: "Bag", bottle: "Btl", box: "Box", piece: "Pc" },
  },
  products: {
    rice: "Miniket Rice 5kg",
    oil: "Soybean Oil 2L",
    milk: "Full Cream Milk 1L",
    tea: "Tea Bags (50)",
    water: "Mineral Water 1.5L",
    soap: "Bath Soap 150g",
    lentil: "Red Lentils 1kg",
    biscuit: "Family Biscuits",
  },
  payment: {
    cash: "Cash",
    bkash: "bKash",
    card: "Card",
    split: "Split",
  },
  features: {
    eyebrow: "Features",
    title: "One platform. Every counter, shelf and ledger.",
    subtitle:
      "Point of sale, inventory, accounting, reports, online orders, CRM, HR and branch security in one system that shares a single source of truth.",
    categories: {
      sales: { label: "Sales & POS", tagline: "A checkout built for rush hour, not demos." },
      inventory: { label: "Inventory & Production", tagline: "Know exactly what you hold, where, and until when." },
      accounting: { label: "Accounting & Ledgers", tagline: "Every sale is a journal entry. Automatically." },
      crm: { label: "CRM & Promotions", tagline: "Turn one-time buyers into regulars." },
      security: { label: "Multi-Branch, HR & Security", tagline: "Your people, payroll and permissions in one place." },
      reports: { label: "Reports & Analytics", tagline: "Close the books daily, not just at year-end." },
      omnichannel: { label: "Omnichannel & Customer Growth", tagline: "Sell beyond the counter and collect every taka owed." },
    },
    items: {
      // ---- Sales & POS
      barcode: {
        title: "Barcode Scanning & Labels",
        description:
          "Scan any EAN, UPC or in-house barcode and the item lands in the cart with its live price and stock. Products without a barcode get one generated, and labels print straight from the inventory screen.",
      },
      shifts: {
        title: "Cash Drawer Shifts",
        description:
          "Each cashier opens a shift with a float and closes it by counting the drawer. Expected cash is calculated from sales, refunds, pay-outs and safe drops, and any over or short is posted to the ledger automatically.",
      },
      safeDrops: {
        title: "Safe Drops, Pay-Ins & Pay-Outs",
        description:
          "Move excess cash from the drawer to the safe mid-shift, or record cash paid in and out, each with a reason and the user who did it. Safe drops come off the drawer's expected cash without being counted as an expense.",
      },
      boxPiece: {
        title: "Box ⇄ Piece & Multi-Unit Selling",
        description:
          "Sell the same product by the piece, pack, box, dozen or weight, each with its own conversion. Stock is kept in the base unit, so conversions between units never drift.",
      },
      layaways: {
        title: "Layaways",
        description:
          "Book goods against a deposit and collect the rest in instalments, tracked from Booked to Partially Paid, Fully Paid and Fulfilled. Cancelled layaways refund through the normal refund methods.",
      },
      quotations: {
        title: "Quotations",
        description:
          "Build a priced quote with a validity date at the counter and print it for the customer. When they accept, convert it to a sale without re-entering a single line.",
      },
      receipts: {
        title: "Digital & Printed Receipts",
        description:
          "Send the receipt to the customer's phone by SMS or WhatsApp, or print it on a thermal or A4 printer. Every digital receipt is logged with its delivery status.",
      },
      returns: {
        title: "Returns, Exchanges & Store Credit",
        description:
          "Take a return against the original invoice and refund by cash, bKash, Nagad, store credit, due adjustment or exchange. Returned stock and the refund post to inventory and the ledger in the same step.",
      },
      // ---- Inventory & Production
      fefo: {
        title: "Batch & Expiry Tracking (FEFO)",
        description:
          "Every receipt is recorded with its batch number, expiry date and cost. The POS sells the batch that expires first, so older stock leaves the shelf before it goes out of date.",
      },
      serial: {
        title: "Serial / IMEI Tracking",
        description:
          "Capture a serial or IMEI for each unit and follow it through In Stock, Sold, Transferred, Damaged or Returned to Vendor. Any unit can be traced to the invoice it was sold on.",
      },
      transfers: {
        title: "Stock Requests & Transfers with GRN",
        description:
          "Branches request stock with a priority, or the warehouse pushes it, and transfers go through approval. The receiving branch confirms a Goods Received Note that records good, damaged, short and over quantities with the loss value.",
      },
      audits: {
        title: "Physical Stock Audits",
        description:
          "Count the whole store, one category or one brand. Variances are costed and posted as adjustments only after a manager approves the audit.",
      },
      bom: {
        title: "Production & Repackaging",
        description:
          "Turn bulk stock into retail packs or combine items into bundles with a production batch. Inputs, outputs, packaging cost and wastage are all costed, so finished goods carry their true cost.",
      },
      purchasing: {
        title: "Purchase Orders & Vendor Returns",
        description:
          "Raise purchase orders, receive them into purchase invoices and pay vendors in cash, by bank or on credit. Return faulty goods for a refund or an exchange, with the vendor ledger updated every time.",
      },
      // ---- Accounting & Ledgers
      journals: {
        title: "Automated Double-Entry Journals",
        description:
          "Sales, purchases, returns, payments, payroll and stock movements post balanced debit and credit entries to your chart of accounts the moment they happen. There is no month-end re-keying.",
      },
      landed: {
        title: "Landed Costs",
        description:
          "Add freight, customs duty, handling and insurance to a purchase and spread them by value, quantity, weight or volume. Product cost reflects the true landed cost, so your margins are real.",
      },
      mfs: {
        title: "MFS Payment Ledgers (bKash / Nagad / Rocket)",
        description:
          "Each mobile wallet maps to its own ledger account, and the transaction reference is captured at the counter. Reconcile each wallet against your merchant statement line by line.",
      },
      zreport: {
        title: "Daily Closing Z-Reports",
        description:
          "Close the day with a report that breaks down sales, returns, discounts, VAT and every payment method. Each shift's counted cash and over/short is shown alongside.",
      },
      vouchers: {
        title: "Vouchers & Expenses",
        description:
          "Record payment, receipt and journal vouchers, and branch expenses against the right expense head. Mistakes are voided with a reason rather than deleted, so the trail stays intact.",
      },
      accountTransfers: {
        title: "Cash, Bank & Wallet Transfers",
        description:
          "Move money between cash in hand, the branch vault, bank accounts and MFS wallets with a proper journal entry. Every account's balance stays correct without manual adjustments.",
      },
      // ---- CRM & Promotions
      loyalty: {
        title: "4-Tier Loyalty Ladder",
        description:
          "Customers move from Standard to Silver, Gold and Platinum as they spend. Each tier sets its own earn multiplier, redemption limit, point expiry and birthday bonus.",
      },
      coupons: {
        title: "Birthday & Anniversary Coupons",
        description:
          "A personal coupon code is issued automatically before each customer's birthday or anniversary, with the discount and validity you set. Each coupon can be claimed once and is linked to the invoice it was used on.",
      },
      tieredPromos: {
        title: "Tiered Volume & Bundle Promos",
        description:
          "Price by quantity, such as a lower unit price from 6 pieces up, or sell a fixed bundle of products at a combo price. Choose whether offers stack as the best deal, by priority or exclusively.",
      },
      bxgy: {
        title: "Buy-X-Get-Y, Happy Hour & Cart Offers",
        description:
          "Run buy 2 get 1 free, time-of-day happy hours and spend-over-a-threshold discounts, limited by dates and days of the week. Rules apply at the till automatically.",
      },
      // ---- Multi-Branch, HR & Security
      staffDirectory: {
        title: "Staff Directory & Designations",
        description:
          "Keep every employee's designation, branch, contact details and salary type in one directory. Link an employee to their user login so their sales, shifts and attendance connect.",
      },
      attendance: {
        title: "Attendance & Shift Logs",
        description:
          "Record daily check-in and check-out and mark each day Present, Late, Half-Day or Absent. Half-days and absences flow into payroll, and each cashier's shift is reconciled at close.",
      },
      payroll: {
        title: "Payroll & Pay Slips",
        description:
          "Process monthly salaries with bonuses and deductions, and print a pay slip for each employee. When payroll is paid, the salary expense posts straight to the ledger.",
      },
      commissions: {
        title: "Tiered Commission Rules",
        description:
          "Give each salesperson a base percentage plus higher tiers once sales pass set thresholds, with overrides by category. Commission is calculated from the sales tagged to each salesperson.",
      },
      roles: {
        title: "Role Permissions & Account Security",
        description:
          "Decide which roles can override discounts, void sales or purchases, approve transfers or see cost prices. Accounts lock after five failed sign-in attempts, and password changes are logged.",
      },
      // ---- Reports & Analytics
      pnl: {
        title: "Real-Time P&L & Financial Statements",
        description:
          "Net sales, COGS, operating expenses, gross and net margin, and the balance sheet are calculated straight from posted journals. A VAT summary shows tax collected and your net VAT liability.",
      },
      payablesReceivables: {
        title: "Payables & Receivables Aging",
        description:
          "See what you owe each vendor and what each customer owes you, bucketed by how overdue it is. Chase the oldest balances first on both sides.",
      },
      cashierPerformance: {
        title: "Sales & Cashier Performance",
        description:
          "Break revenue down by branch, cashier and salesperson for any period. Each cashier's shift over/short sits next to their sales, so discrepancies stand out.",
      },
      dayBook: {
        title: "Day Book",
        description:
          "Every journal entry in date order, grouped by day with daily debit and credit subtotals. Filter by account or search by entry number, and export to CSV.",
      },
      trialBalance: {
        title: "Trial Balance",
        description:
          "Live verification that total debits equal total credits across every ledger. Because entries post as they happen, there is no reconciliation delay before you can trust the numbers.",
      },
      cashMovement: {
        title: "Cash Movement",
        description:
          "See the money that came into and went out of every cash, bank and MFS account, and what caused it. Sales, receipts, purchases, rent and salaries are each shown separately.",
      },
      yearEnd: {
        title: "Year-End Closing",
        description:
          "Close the financial year with a closing entry that moves income and expenses into retained earnings. A closed year can be reopened only with a recorded reason, and nothing is deleted.",
      },
      inventoryHealth: {
        title: "Inventory Health & Dead Stock BI",
        description:
          "ABC analysis ranks products by revenue, and GMROI shows the gross margin each taka of stock earns. Dead and slow-moving items are listed with their days of cover and the capital they are holding.",
      },
      auditLogs: {
        title: "Audit Logs",
        description:
          "One timeline of stock adjustments, manual journals, voucher posts and voids, refunds, shift closes, coupons, campaigns and account security events. Each entry shows who did it, when and for how much.",
      },
      // ---- Omnichannel & Customer Growth
      socialOrders: {
        title: "Social & Online Orders",
        description:
          "Log orders from Facebook, WhatsApp, phone calls or your website in the same system as counter sales. Track each one from Pending to Delivered or Returned, with the courier name and tracking number.",
      },
      codSettlement: {
        title: "COD Settlement",
        description:
          "Record the cash-on-delivery amount and any advance on every courier order. When the courier remits the money, the remittance posts to the ledger and pending COD is always visible.",
      },
      smsCampaigns: {
        title: "Targeted SMS Campaigns",
        description:
          "Send custom SMS promotions to a chosen customer segment now or at a scheduled time. See the estimated cost before sending, then sent and failed counts for every campaign.",
      },
      dueRecovery: {
        title: "Customer Balance & Due Recovery",
        description:
          "Keep a running due balance for every credit customer, with a credit limit enforced at checkout. Send an SMS reminder to overdue customers in one click and record collections against their account.",
      },
      rfmInsights: {
        title: "RFM Audience Insights",
        description:
          "Customers are scored on recency, frequency and spend and grouped into segments such as Champions, Loyal, Need Attention, At Risk and Lost. Target each segment with its own SMS campaign to win buyers back.",
      },
    },
  },
  demo: {
    eyebrow: "Interactive Demo",
    title: "Ring up a sale. Right here.",
    subtitle:
      "Add items, split the payment between cash and bKash, and watch the receipt and the journal entry generate instantly. This is exactly how it works at the counter.",
    step1: "1. Tap products to add",
    step2: "2. Cart",
    step3: "3. Payment method",
    step4: "4. Receipt preview",
    clear: "Clear",
    empty: "Cart is empty — tap a product.",
    total: "Total",
    bkashAuto: "bKash (auto)",
    splitError: "Enter a cash amount between {min} and {max}.",
    complete: "Complete Sale",
    removeOne: "Remove one",
    addOne: "Add one",
    receiptEmpty: "Complete the sale to print the receipt and post the journal entry.",
    receipt: {
      shop: "TECH BITE MART",
      branch: "Agrabad Branch · Till 02",
      total: "TOTAL",
      trxId: "TrxID",
      thanks: "Thank you! Receipt sent via WhatsApp.",
      paid: "PAID",
    },
    journal: {
      title: "Auto journal entry",
      drCash: "Dr Cash in Hand",
      drBkash: "Dr bKash Wallet",
      crSales: "Cr Sales Revenue",
      balanced: "Balanced · posted to ledger",
    },
    newSale: "New sale",
  },
  useCases: {
    eyebrow: "Use Cases",
    title: "Built for the way your business actually sells",
    subtitle: "The same core, configured for the problems each type of retailer faces every day.",
    items: {
      grocery: {
        title: "Supermarkets & Grocers",
        body: "Fast barcode checkout, selling by weight, Box⇄Piece units and shift-level cash control for busy counters.",
        tags: ["Box⇄Piece", "Safe drops", "Z-reports"],
      },
      pharmacy: {
        title: "Pharmacies",
        body: "Batch and expiry tracking with FEFO picking, so the oldest stock sells first and nothing expires on the shelf.",
        tags: ["FEFO", "Expiry alerts", "Stock audits"],
      },
      electronics: {
        title: "Electronics & Mobile Shops",
        body: "Serial and IMEI captured on every unit, with unit-level history, layaways and tiered salesperson commissions.",
        tags: ["IMEI", "Layaways", "Commissions"],
      },
      fashion: {
        title: "Fashion & Lifestyle",
        body: "Loyalty tiers, birthday coupons and Buy-X-Get-Y promotions that bring customers back across every branch.",
        tags: ["Loyalty", "Promotions", "RFM"],
      },
      wholesale: {
        title: "Distributors & Wholesalers",
        body: "Quotations, landed costs on imports, BOM repackaging and inter-branch transfers with GRN confirmation.",
        tags: ["Landed cost", "BOM", "GRN"],
      },
    },
    other: {
      title: "Different setup?",
      body: "Restaurants, hardware, cosmetics or a mix of all three — tell us how you sell and we'll show you the workflow.",
      cta: "Book a walkthrough",
    },
    proof: {
      offline: {
        title: "Offline-first",
        body: "Tills keep selling without internet and sync every sale the moment the connection returns.",
      },
      balance: {
        title: "Books that balance",
        body: "Every transaction posts a balanced journal, so your accountant starts from a correct trial balance.",
      },
      tenant: {
        title: "Multi-tenant by design",
        body: "Each business and branch keeps its data isolated while head office sees the consolidated picture.",
      },
    },
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple pricing that scales with your branches",
    subtitle: "Every plan includes offline mode, updates and the full accounting core.",
    monthly: "Monthly",
    yearly: "Yearly",
    monthsFree: "{n} months free",
    perMonth: "month",
    perYear: "year",
    mostPopular: "Most popular",
    talkToSales: "Talk to sales",
    plans: {
      starter: {
        name: "Starter",
        description: "A single shop that wants a proper POS with real books.",
        features: [
          "1 branch · 2 tills",
          "Barcode POS with offline mode",
          "Stock, purchases & returns",
          "Automated double-entry ledger",
          "bKash / Nagad / Rocket ledgers",
          "Daily Z-report",
        ],
      },
      growth: {
        name: "Growth",
        description: "Growing retailers with several branches and a team to manage.",
        features: [
          "Up to 5 branches · unlimited tills",
          "Everything in Starter",
          "Batch/expiry (FEFO) & Serial/IMEI",
          "Inter-branch transfers with GRN",
          "RFM segments & 4-tier loyalty",
          "SMS / WhatsApp receipts",
          "Role permissions & audit log",
        ],
      },
      enterprise: {
        name: "Enterprise",
        description: "Chains and distributors that need custom workflows and SLAs.",
        features: [
          "Unlimited branches & tenants",
          "Everything in Growth",
          "BOM repackaging & landed costs",
          "Attendance, payroll & commissions",
          "Custom integrations & data migration",
          "Dedicated onboarding & priority support",
        ],
      },
    },
  },
  contact: {
    title: "Ready to see your own store running on Tech BitePOS?",
    body: "Book a 30-minute walkthrough. We'll load a sample of your products and show you the POS, stock and ledger working together.",
    bookDemo: "Book a demo",
    tryDemo: "Try the demo first",
    whatsapp: "WhatsApp",
    mailSubject: "Tech BitePOS demo request",
  },
  footer: {
    tagline: "Multi-tenant POS, inventory and double-entry accounting for modern retail.",
    features: "Features",
    product: "Product",
    contact: "Contact",
    interactiveDemo: "Interactive Demo",
    rights: "All rights reserved.",
  },
};

export type Dictionary = typeof en;
