// All copy lives here. Case studies are deliberately generic: no client names, URLs or data.

export const profile = {
  name: "Tho Phan",
  role: "Full-stack engineer",
  headline: "I build the commerce platform behind eSIMs sold in Vietnam and the US.",
  intro:
    "Flutter app, React portal, two TypeScript backends, one shared codebase. I ship features end to end, from the schema to the screen.",
  linkedin: "https://www.linkedin.com/in/tho-phan-70258132a/",
  email: "phannguyenvantho@gmail.com",
  school: "Computer Science at Duquesne University, class of 2028",
};

export const jobs = [
  {
    when: "Aug 2025 – now",
    where: "GoHub Inc., Ho Chi Minh City",
    what: "Full-stack developer on a multi-tenant eSIM commerce platform for Vietnam and the US. Typed REST APIs, event-driven catalog sync, a tenant-aware pricing engine, and Stripe and bank-transfer payments.",
  },
  {
    when: "May 2025 – Aug 2025",
    where: "GoHub Inc., Ho Chi Minh City",
    what: "Built a reporting module that calculates cost of goods sold across 500,000+ inventory items, plus authentication, product management and internal tools.",
  },
  {
    when: "May 2025 – Apr 2026",
    where: "Saola Labs, remote",
    what: "Frontend intern on Esri Intelligent Water Network. React features and live ArcGIS maps for water management across 20,000 km² of regional Australia.",
  },
];

export const cases = [
  {
    title: "Keeping a product catalog in sync",
    problem: "Supplier catalogs change all day. A missed update means a wrong price or a dead product on sale.",
    decision:
      "Syncs run as queued jobs (BullMQ and Redis). Incoming webhooks can be replayed, and every job reports its lifecycle so a failed sync is visible.",
    result: "Syncs are reliable and observable, and a bad run can be replayed instead of fixed by hand.",
  },
  {
    title: "One codebase, two markets",
    problem: "Each tenant needs its own prices, tax rules and look, and a fork per market would not stay maintainable.",
    decision:
      "Tenant price lists, VAT rules and theming are data, resolved at runtime. The web portal ships per-region builds from the same repo.",
    result: "A new tenant is configuration, not a new project.",
  },
  {
    title: "Reports over half a million items",
    problem: "Cost of goods sold had to be calculated across 500,000+ inventory items without timing out.",
    decision: "Aggregation moved into the database, and I added targeted indexes and parallelized independent queries.",
    result: "A heavy report became a request people can wait on.",
  },
];

export const tutoring =
  "Since December 2024 I tutor middle school math online, one-on-one and in small groups. Explaining a hard idea to a 12-year-old is the best practice I know for writing clear code and clear docs.";
