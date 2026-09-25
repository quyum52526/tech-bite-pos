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
      "Point of sale, inventory, accounting, reports, online orders, CRM and branch security in one system that shares a single source of truth.",
    categories: {
      sales: { label: "Sales & POS", tagline: "A checkout built for rush hour, not demos." },
      inventory: { label: "Inventory & Production", tagline: "Know exactly what you hold, where, and until when." },
      accounting: { label: "Accounting & Ledgers", tagline: "Every sale is a journal entry. Automatically." },
      crm: { label: "CRM & Promotions", tagline: "Turn one-time buyers into regulars." },
      security: { label: "Multi-Branch & Security", tagline: "Run ten branches like you're standing in each one." },
      reports: { label: "Reports & Analytics", tagline: "Close the books daily, not just at year-end." },
      omnichannel: { label: "Omnichannel & Customer Growth", tagline: "Sell beyond the counter and collect every taka owed." },
    },
    items: {
      barcode: {
        title: "Barcode Scanning",
        description:
          "Scan any EAN, UPC or in-house label and the item lands in the cart instantly with its live price and stock. Weighted-item barcodes are decoded automatically so produce and meat sell at the correct amount.",
      },
      shifts: {
        title: "Cash Drawer Shifts",
        description:
          "Each cashier opens a shift with a counted float and closes it with a blind count. The system reconciles expected versus actual cash and flags every over or short.",
      },
      safeDrops: {
        title: "Safe Drops",
        description:
          "When the drawer crosses a limit you set, the cashier is prompted to drop excess cash into the safe. Every drop is logged with time, amount and user, so the drawer never holds more than it should.",
      },
      boxPiece: {
        title: "Box ⇄ Piece Toggle",
        description:
          "Sell a full carton or a single piece from the same product with one tap. Stock is tracked in the base unit, so conversions between box and piece never drift.",
      },
      layaways: {
        title: "Layaways",
        description:
          "Reserve goods against a deposit and collect the balance in instalments. Reserved stock is held back from sale until the layaway is completed or cancelled.",
      },
      quotations: {
        title: "Quotations",
        description:
          "Build a priced quote at the counter and send it to the customer as a PDF. When they accept, convert it to an invoice in one click without re-entering a single line.",
      },
      receipts: {
        title: "Digital SMS / WhatsApp Receipts",
        description:
          "Send the receipt to the customer's phone by SMS or WhatsApp instead of printing. It saves paper and captures a contact number for your CRM on every sale.",
      },
      fefo: {
        title: "Batch & Expiry Tracking (FEFO)",
        description:
          "Every receipt is recorded with its batch number and expiry date. The POS picks the batch that expires first, and alerts warn you before stock goes out of date.",
      },
      serial: {
        title: "Serial / IMEI Tracking",
        description:
          "Capture a serial or IMEI for each unit at purchase and again at sale. Warranty claims and returns trace back to the exact invoice in seconds.",
      },
      transfers: {
        title: "Inter-Branch Transfers with GRN",
        description:
          "Dispatch stock from one branch and hold it in transit until the receiving branch confirms a Goods Received Note. Shortages found on receipt are recorded against the transfer, not lost.",
      },
      audits: {
        title: "Physical Stock Audits",
        description:
          "Run full or cycle counts with a scanner while the store stays open. Variances are posted as adjustments with an approval step and a full audit trail.",
      },
      bom: {
        title: "BOM Repackaging",
        description:
          "Define a bill of materials to break bulk stock into retail packs or combine items into bundles. Raw material is consumed and finished goods are produced at the correct cost.",
      },
      journals: {
        title: "Automated Double-Entry Journals",
        description:
          "Sales, purchases, returns and payments post balanced debit and credit entries the moment they happen. Your trial balance is always current, with no month-end re-keying.",
      },
      landed: {
        title: "Landed Costs",
        description:
          "Spread freight, duty, LC charges and clearing costs across the items on an import. Product cost reflects the true landed cost, so your margins are real.",
      },
      mfs: {
        title: "MFS Payment Ledgers (bKash / Nagad / Rocket)",
        description:
          "Each mobile wallet gets its own ledger, with transaction IDs captured at the counter. Reconcile against your merchant statement line by line, including MFS charges.",
      },
      zreport: {
        title: "Daily Closing Z-Reports",
        description:
          "Close the day with a Z-report that breaks down sales, returns, discounts, tax and every payment method. Once closed, the day is locked against back-dated edits.",
      },
      vouchers: {
        title: "Expense Vouchers",
        description:
          "Record petty cash and branch expenses against the right expense head with a receipt photo attached. Vouchers post to the ledger and appear on the branch P&L immediately.",
      },
      rfm: {
        title: "RFM Customer Segmentation",
        description:
          "Customers are scored on recency, frequency and monetary value from real purchase history. Target champions, win back those at risk, and stop discounting people who would buy anyway.",
      },
      loyalty: {
        title: "4-Tier Loyalty Ladder",
        description:
          "Customers climb from Bronze to Silver, Gold and Platinum as they spend. Each tier earns points faster and unlocks its own perks at checkout.",
      },
      coupons: {
        title: "Birthday & Anniversary Coupons",
        description:
          "A personal coupon is issued automatically ahead of each customer's birthday or anniversary. It is delivered by SMS or WhatsApp and redeems at any branch.",
      },
      bxgy: {
        title: "Buy-X-Get-Y Promo Rules",
        description:
          "Build promotions like buy 2 get 1 free, or buy a phone and get a cover at half price. Rules apply at the till automatically, with start dates, end dates and branch limits.",
      },
      attendance: {
        title: "Branch Attendance & Payroll",
        description:
          "Staff clock in at their branch terminal and hours flow straight into payroll. Salaries, advances and deductions post to the ledger when payroll is approved.",
      },
      commissions: {
        title: "Sales Commissions",
        description:
          "Set commission rules by staff, product or category. Every sale is attributed to a salesperson and commission is calculated automatically for payroll.",
      },
      roles: {
        title: "Role Permissions",
        description:
          "Decide exactly who can give discounts, void bills, edit prices or see cost. Sensitive actions can require a manager PIN at the counter.",
      },
      audit: {
        title: "Audit Trail",
        description:
          "Every create, edit, delete and void is logged with the user, time, branch and before-and-after values. Nothing disappears, so disputes are settled with facts.",
      },
      dayBook: {
        title: "Day Book",
        description:
          "A chronological, real-time ledger of every cash, bank and MFS movement throughout the day. Filter by branch, user or account to trace any transaction back to its voucher in seconds.",
      },
      trialBalance: {
        title: "Trial Balance",
        description:
          "Live verification that total debits equal total credits across every ledger. Because entries post as they happen, there is no manual reconciliation delay before you can trust the numbers.",
      },
      cashMovement: {
        title: "Cash Movement Ledger",
        description:
          "A detailed audit of vault transfers, safe drops and drawer float adjustments. Every taka of physical cash is accounted for between the till, the safe and the bank.",
      },
      yearEnd: {
        title: "Year-End Closing",
        description:
          "Roll over to the new financial year automatically, closing income and expense ledgers into retained earnings. Opening balances carry forward and the closed year is locked against changes.",
      },
      inventoryBi: {
        title: "Inventory BI Analytics",
        description:
          "See your top-selling SKUs, stock turn ratios and gross profit margins by product, category and branch. Spot slow movers and dead stock before they tie up your working capital.",
      },
      socialOrders: {
        title: "Social Online Orders",
        description:
          "Log orders that arrive through Facebook, WhatsApp or a phone call in the same system as your counter sales. Each order gets a courier consignment with automated tracking until it is delivered.",
      },
      codSettlement: {
        title: "COD Settlement",
        description:
          "A dedicated ledger for Cash-on-Delivery money held by your couriers. Track what each courier has remitted, what is still pending and the charges deducted on every settlement.",
      },
      smsCampaigns: {
        title: "Targeted SMS Campaigns",
        description:
          "Broadcast custom SMS promotions to segmented customer groups straight from the platform. Pick an audience, write the message and send, without exporting lists to another tool.",
      },
      dueRecovery: {
        title: "Customer Balance & Due Recovery",
        description:
          "Keep a running receivable balance for every credit customer, updated with each sale and payment. Send a payment reminder in one click and record collections against the right invoice.",
      },
      rfmInsights: {
        title: "RFM Audience Insights",
        description:
          "Customers are grouped automatically into Champions, At-Risk and Dormant buyers based on how they actually shop. Use these audiences to target SMS campaigns and win back customers before they are lost.",
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
        body: "Fast barcode checkout, weighted items, Box⇄Piece selling and shift-level cash control for busy counters.",
        tags: ["Box⇄Piece", "Safe drops", "Z-reports"],
      },
      pharmacy: {
        title: "Pharmacies",
        body: "Batch and expiry tracking with FEFO picking, so the oldest stock sells first and nothing expires on the shelf.",
        tags: ["FEFO", "Expiry alerts", "Stock audits"],
      },
      electronics: {
        title: "Electronics & Mobile Shops",
        body: "Serial and IMEI captured on every unit, with warranty lookups, layaways and salesperson commissions.",
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
          "Role permissions & audit trail",
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
