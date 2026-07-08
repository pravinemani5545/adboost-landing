// Central vertical dataset. NOTE: /industries/* and /benchmarks/* routes do NOT ship — never link to them.
// CAC/benchmark figures triangulated from 2025–2026 sources (First Page Sage,
// Telehealth Media, Foundry CRO, Pennock, BrighterClick, Shopify Commerce Report,
// et al.). Ranges reflect fully-loaded CAC (cost per PAYING customer/patient),
// not cost-per-lead/consult (which runs ~40–60% lower). Verify before publishing.

export interface BenchmarkRow {
  label: string;
  value: string;
  note?: string;
}

export interface Vertical {
  slug: string;
  name: string;              // full display name
  short: string;             // nav / chip label
  category: string;          // mono eyebrow tag
  // industry landing
  h1: string;
  lede: string;
  painPoint: string;
  adLandmine: string;        // the specific compliance landmine for this vertical
  proofLine: string;
  serviceDesc: string;       // for Service schema description
  // benchmark page
  cacDisplay: string;        // e.g. "$180–$400"
  cacLow: number;            // for calculator defaults / structured data
  cacHigh: number;
  benchLede: string;
  rows: BenchmarkRow[];      // the benchmark table
  goodVsConcerning: string;
  costDriver: string;
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
}

export const VERTICALS: Vertical[] = [
  {
    slug: 'glp-1-weight-loss',
    name: 'GLP-1 & weight-loss brands',
    short: 'GLP-1 & weight loss',
    category: 'GLP-1 · WEIGHT CARE',
    h1: 'Growth marketing for GLP-1 & weight-loss brands',
    lede: 'Compliant paid acquisition for compounded and brand-name GLP-1 programs — engineered for the one economics that actually matters here: retention-adjusted payback, not vanity ROAS.',
    painPoint: 'Demand is red-hot, but ad accounts get disabled overnight and retention — not CAC — decides whether the model survives.',
    adLandmine: 'Before/after imagery, “lose X lbs” claims, and content implying negative self-perception are the fastest routes to a Meta rejection or a state-AG complaint. Naming the drug in-ad triggers pharma review.',
    proofLine: 'Scaled a GLP-1 support brand 6× while cutting CAC 64% in 60 days.',
    serviceDesc: 'Compliant paid media, creative, and funnel optimization for GLP-1 and medical weight-loss brands.',
    cacDisplay: '$180–$400',
    cacLow: 180,
    cacHigh: 400,
    benchLede: 'What GLP-1 and weight-loss brands actually pay to acquire a paying patient in 2026 — by program type, with the retention context that determines whether that number is good.',
    rows: [
      { label: 'Compounded semaglutide/tirzepatide CAC', value: '$180–$320', note: 'Fully-loaded, at $100–300K/mo spend' },
      { label: 'Brand-name (Wegovy/Zepbound) CAC', value: '$250–$400', note: 'Tighter qualification gates' },
      { label: 'Public-company blended CAC (reference)', value: '~$929', note: 'Hims & Hers 2024 — blends all lines + brand spend, not a channel unit CAC' },
      { label: 'Subscription price', value: '$199–$299 / mo', note: 'Gross margins 74–79%' },
      { label: '18-month membership revenue', value: '~$5,382', note: 'At $299/mo' },
      { label: 'Target payback', value: '< 1 month', note: 'High intent, deep cold pool' },
    ],
    goodVsConcerning: 'Good: payback under one month and retention above 50% past month 3. Concerning: retention collapse after compounded-supply normalization — the FDA crackdown on compounded semaglutide is the model’s biggest risk, not acquisition cost.',
    costDriver: 'CAC is relatively low because buyer intent is extreme; the real battle is retention and staying inside ad policy, not the auction price.',
    faq: [
      { q: 'What is a good CAC for a GLP-1 brand in 2026?', a: 'Fully-loaded CAC for compounded GLP-1 programs typically runs $180–$320, and $250–$400 for brand-name programs. Because subscriptions run $199–$299/month with 74–79% gross margins, a healthy program pays that CAC back in under a month.' },
      { q: 'Can you still advertise GLP-1 on Meta and Google?', a: 'Yes, but within strict rules. You cannot use before/after weight-loss imagery, promise specific pound losses, or imply negative self-perception. Naming the drug typically triggers pharmaceutical ad review. Compliant brands sell the program and outcome, not the molecule.' },
    ],
    sources: [
      { label: 'Telehealth Media — patient acquisition cost', url: 'https://telehealthmedia.com/blog/telehealth-paid-social/telehealth-patient-acquisition-cost' },
      { label: 'IQVIA — outlook for obesity 2026', url: 'https://www.iqvia.com/locations/emea/blogs/2026/01/outlook-for-obesity-in-2026' },
    ],
  },
  {
    slug: 'telehealth',
    name: 'Telehealth & patient-acquisition brands',
    short: 'Telehealth',
    category: 'TELEHEALTH · PATIENT ACQUISITION',
    h1: 'Growth marketing for telehealth brands',
    lede: 'Paid acquisition built for telehealth economics — LTV:CAC and payback by sub-vertical, with the creative volume it actually takes to hold your benchmark.',
    painPoint: 'Most telehealth brands quote consult CAC as if it were paying-patient CAC — and starve their ad account of the 30–60 fresh creatives a month it takes to stay efficient.',
    adLandmine: 'Prescription and “Rx” language, personal-health targeting, and HIPAA-adjacent claims. Google requires LegitScript certification for telehealth/pharmacy advertisers.',
    proofLine: 'Built a telehealth acquisition engine from a cold start to $1.6M in 90 days.',
    serviceDesc: 'Paid media, creative, CRO, and attribution for telehealth and virtual-care brands.',
    cacDisplay: '$150–$500',
    cacLow: 150,
    cacHigh: 500,
    benchLede: 'Telehealth patient-acquisition costs by sub-vertical in 2026 — and the LTV:CAC and payback targets that separate a scalable program from one buying revenue at a loss.',
    rows: [
      { label: 'D2C telehealth CAC (blended)', value: '$150–$500', note: 'Complex/behavioral programs push to $500–$2,500+' },
      { label: 'ED', value: '$70–$140', note: 'Cheapest — decisive buyer, short script' },
      { label: 'Hair loss', value: '$90–$170' },
      { label: 'GLP-1 / weight loss', value: '$180–$400' },
      { label: 'Mental health', value: '$200–$400' },
      { label: 'Meta CPC / CPM (health)', value: '$1.32 / ~$13' },
      { label: 'Target LTV:CAC', value: '≥ 3:1', note: '2–4 month payback is strong' },
    ],
    goodVsConcerning: 'Good: LTV:CAC of at least 3:1 and payback under 12 months. Concerning: quoting consult CAC (40–60% below true paying-patient CAC) as if it were real — the single most common misreport in the category.',
    costDriver: 'State-by-state prescriber availability creates artificial scarcity that distorts auctions, and holding benchmark CAC requires 30–60 fresh ads/month; running 5–10 runs 40–80% over.',
    faq: [
      { q: 'What is a good CAC for a telehealth brand?', a: 'It depends heavily on sub-vertical: ED runs $70–$140, hair loss $90–$170, GLP-1 $180–$400, and mental health $200–$400. Across the board, aim for an LTV:CAC of at least 3:1 and payback under 12 months.' },
      { q: 'Do I need LegitScript certification to run telehealth ads?', a: 'For Google Ads, telehealth and online-pharmacy advertisers generally need LegitScript certification before running. Meta also restricts prescription-related advertising. Certification and a compliance review before launch prevent the account disruptions that wreck telehealth CAC.' },
    ],
    sources: [
      { label: 'Telehealth Media', url: 'https://telehealthmedia.com/blog/telehealth-paid-social/telehealth-patient-acquisition-cost' },
      { label: 'First Page Sage — patient acquisition cost 2026', url: 'https://firstpagesage.com/seo-blog/average-patient-acquisition-cost/' },
    ],
  },
  {
    slug: 'supplements-dtc',
    name: 'Supplement & DTC wellness brands',
    short: 'Supplements & DTC',
    category: 'SUPPLEMENTS · DTC',
    h1: 'Growth marketing for supplement & DTC brands',
    lede: 'Paid acquisition and retention for supplement and nutraceutical brands — built around contribution margin and LTV:CAC, in the category paying the steepest compliance tax in DTC.',
    painPoint: 'Health & wellness ROAS fell 15.6% YoY to ~2.12 — the worst-declining category — while supplements pay a 20–60% CPL premium over unregulated DTC.',
    adLandmine: 'Disease claims (“treats,” “cures,” “prevents”), unsubstantiated structure/function claims, and testimonials without disclaimers draw FTC and platform enforcement. Structure/function claims need the FDA disclaimer.',
    proofLine: 'Cut a daily-supplement brand’s CAC 40% inside 14 days and held the floor for six months.',
    serviceDesc: 'Paid media, UGC creative, and retention/LTV work for supplement and DTC wellness brands.',
    cacDisplay: '$40–$200',
    cacLow: 40,
    cacHigh: 200,
    benchLede: 'What supplement and DTC nutraceutical brands pay to acquire a customer in 2026, the ROAS reality, and the LTV:CAC math that decides whether you’re profitable.',
    rows: [
      { label: 'Vitamins CAC', value: '$45–$80', note: 'Scalable-channel target: < $40' },
      { label: 'Greens / superfood powders CAC', value: '$100–$200+' },
      { label: 'Meta cost / purchase', value: '$45.62', note: '30–52% above cross-category $30–35' },
      { label: 'Meta CPC / CPM', value: '$1.46 / $17.78' },
      { label: 'Google health/fitness CPC', value: '$5.00', note: '+69% vs cross-industry' },
      { label: 'Health & wellness ROAS', value: '2.12', note: 'Down 15.6% YoY — worst-declining category' },
      { label: 'AOV / 12-mo LTV', value: '$25–$99 / $300–$1,200' },
    ],
    goodVsConcerning: 'Good: LTV:CAC of 3:1–5:1 with contribution margin above 35%. Concerning: ROAS under 2 with sub-3:1 LTV:CAC — you’re buying revenue at a loss.',
    costDriver: 'The compliance-friction tax (FTC/FDA claim review) plus a saturated creative auction: supplements structurally pay 20–60% more per lead than unregulated DTC.',
    faq: [
      { q: 'What is a good CAC for a supplement brand?', a: 'Vitamins typically run $45–$80 and greens/powders $100–$200+, with scalable operators targeting a sub-$40 CAC ceiling. The number only makes sense against LTV — aim for 3:1–5:1 LTV:CAC and 35%+ contribution margin.' },
      { q: 'Why do supplement ads cost more than other DTC?', a: 'Supplements pay a 20–60% cost-per-lead premium over unregulated DTC because of FTC/FDA claim review and platform restrictions, plus a saturated creative auction. Meta cost-per-purchase for supplements runs ~$45.62 vs $30–35 cross-category.' },
    ],
    sources: [
      { label: 'Foundry CRO — DTC supplements benchmarks 2026', url: 'https://foundrycro.com/blog/dtc-supplements-marketing-benchmarks-2026/' },
      { label: 'MHI — DTC advertising benchmarks 2026', url: 'https://mhigrowthengine.com/blog/dtc-advertising-benchmarks-2026/' },
    ],
  },
  {
    slug: 'trt-hormone',
    name: 'TRT & hormone-therapy brands',
    short: 'TRT & hormone',
    category: 'TRT · HRT',
    h1: 'Growth marketing for TRT & hormone brands',
    lede: 'Acquisition for testosterone and hormone-therapy brands in the most ad-restricted corner of health — where the winning move is channel diversification, not paying the restricted-auction premium.',
    painPoint: 'Google and Meta auto-flag “testosterone/TRT/HRT” ads, so brands leaning on a single paid channel are one policy update away from zero.',
    adLandmine: 'Testosterone and hormone keywords trigger automatic review and disapprovals. Prescription drug promotion rules apply; claims about virility, performance, or body composition are high-risk.',
    proofLine: 'Helped launch a $99/mo all-inclusive TRT offer that cut CAC 54%.',
    serviceDesc: 'Compliant acquisition, creative, and channel diversification for TRT and hormone-therapy brands.',
    cacDisplay: '$180–$300',
    cacLow: 180,
    cacHigh: 300,
    benchLede: 'TRT and hormone-therapy acquisition costs in 2026 — and why retention, not the restricted paid auction, is where this model is won.',
    rows: [
      { label: 'Fully-loaded CAC', value: '$180–$300' },
      { label: 'Cost per qualified lead', value: '$15–$50' },
      { label: 'Subscription price', value: '$99–$300 / mo', note: 'High stickiness once titrated' },
      { label: 'Target payback', value: '~1.5 months', note: 'At ~$240 CAC, ~70% retention' },
      { label: 'Market size', value: '$2.3B → $3.5B (2025–2030)', note: '11M scripts in 2024' },
    ],
    goodVsConcerning: 'Good: retention above 70% with payback under two months. Concerning: over-reliance on paid search/social that a single policy update can zero out.',
    costDriver: 'Regulatory/channel restriction is the dominant driver — the winners build channel-diversified acquisition (SEO, content, referral) rather than paying the restricted-auction premium.',
    faq: [
      { q: 'What is a good CAC for a TRT brand?', a: 'Fully-loaded CAC typically runs $180–$300, with qualified leads at $15–$50. Because TRT subscriptions ($99–$300/month) are extremely sticky once a patient is titrated, payback under ~1.5 months with 70%+ retention is a strong position.' },
      { q: 'Can you advertise TRT on Google and Meta?', a: 'It’s heavily restricted — testosterone/TRT/HRT ads are auto-flagged and frequently disapproved, and prescription-drug promotion rules apply. Sustainable TRT brands diversify into SEO, content, and referral so no single policy update can zero out acquisition.' },
    ],
    sources: [
      { label: 'Telehealth Media', url: 'https://telehealthmedia.com/blog/telehealth-paid-social/telehealth-patient-acquisition-cost' },
      { label: 'OpenLoop — how to start a TRT company', url: 'https://openloophealth.com/blog/how-to-start-a-trt-company' },
    ],
  },
  {
    slug: 'peptides',
    name: 'Peptide-therapy brands',
    short: 'Peptides',
    category: 'PEPTIDES',
    h1: 'Growth marketing for peptide brands',
    lede: 'Acquisition for peptide-therapy clinics and brands — a high-LTV, high-compliance category where a diversified funnel beats a fragile single-channel paid play.',
    painPoint: 'Marketing eats ~60% of revenue in many peptide clinics today, often concentrated on one paid channel that shares TRT’s ad-policy minefield.',
    adLandmine: 'Peptides like BPC-157 face the same ad-policy restrictions as hormones, plus FDA compounding/regulatory scrutiny of the products themselves. Health claims are high-risk.',
    proofLine: 'Restructured a peptide clinic’s funnel to cut marketing from 60% toward 40% of revenue.',
    serviceDesc: 'Acquisition, consultation-funnel, and retention marketing for peptide-therapy brands.',
    cacDisplay: '~$200–$400+',
    cacLow: 200,
    cacHigh: 400,
    benchLede: 'Peptide-therapy acquisition economics in 2026 — an opaque, immature category where very high per-patient LTV supports a generous payback tolerance.',
    rows: [
      { label: 'Estimated fully-loaded CAC', value: '~$200–$400+', note: 'Opaque; telehealth peptide CAC runs 20–40% below in-clinic' },
      { label: 'Marketing as % of revenue', value: '~60% today', note: 'Target: 40% by year 4 via retention/referral' },
      { label: 'Annual revenue / patient', value: '$4,000–$6,000', note: 'Monthly protocols + quarterly labs' },
    ],
    goodVsConcerning: 'Good: marketing under 40% of revenue with diversified channels. Concerning: 60%+ of revenue to acquisition on a single paid channel one policy update from disappearing — plus FDA overhang on peptides themselves.',
    costDriver: 'Compliance/channel risk and an immature creative market; the offsetting lever is very high LTV ($4–6K/patient/year), which makes generous payback tolerable.',
    faq: [
      { q: 'How much does it cost to acquire a peptide-therapy patient?', a: 'Published CAC is opaque, but telehealth peptide acquisition runs 20–40% below in-clinic, landing roughly $200–$400+ fully-loaded with wide variance. With $4,000–$6,000 in annual revenue per patient, the LTV easily supports that CAC.' },
      { q: 'Can you run paid ads for peptides?', a: 'It’s restricted — peptides face the same ad-policy landmines as hormones, plus FDA compounding scrutiny. The durable approach is a diversified funnel (SEO, content, referral, consultation) rather than betting the clinic on one restricted paid channel.' },
    ],
    sources: [
      { label: 'PeptideLeads — peptide + telemedicine', url: 'https://peptideleads.com/blog/peptide-therapy-and-telemedicine-the-marketing-opportunity' },
      { label: 'OptimantRA — peptide marketing 2026', url: 'https://www.optimantra.com/blog/how-to-market-peptide-therapy-services-to-attract-new-clients-in-2026' },
    ],
  },
  {
    slug: 'med-spa',
    name: 'Med spa & aesthetics brands',
    short: 'Med spa',
    category: 'MED SPA · AESTHETICS',
    h1: 'Growth marketing for med spa & aesthetics brands',
    lede: 'Paid acquisition for med spas and aesthetics clinics — where Google intent is expensive, Meta is cheap but noisy, and show-rate, not lead volume, is the number that matters.',
    painPoint: 'Leaning on Meta lead-forms alone floods you with junk leads; the metric that actually pays rent is booked-and-showed appointments.',
    adLandmine: 'Before/after imagery is restricted, health/medical claims about injectables are policed, and personal-attribute targeting is prohibited. High-intent local keywords are expensive and competitive.',
    proofLine: 'Drove booked aesthetics appointments under $100 while holding a 3×+ Google ROAS.',
    serviceDesc: 'Paid media, local demand capture, and booking-funnel optimization for med spas and aesthetics clinics.',
    cacDisplay: '$130–$285',
    cacLow: 130,
    cacHigh: 285,
    benchLede: 'Med spa and aesthetics paid-media benchmarks for 2026 — Google vs Meta, cost per booked appointment, and the ROAS targets top clinics actually hit.',
    rows: [
      { label: 'Cost per booked appointment', value: '$130–$285', note: 'Target < $100; specialty surgery up to $610' },
      { label: 'Google CPC', value: '$2.62–$10.00+', note: '“Botox near me” drives the high end' },
      { label: 'Meta CPC / CPM (beauty)', value: '$0.77 / $12.78', note: 'CVR 5.93% — beats Google by ~76%' },
      { label: 'Google median ROAS', value: '3.33×', note: 'Meta avg ~1.80×' },
      { label: 'Avg visit value / LTV', value: '$450–$700 / ~$9,000' },
    ],
    goodVsConcerning: 'Good: cost per booking under $100 and Google ROAS above 3×. Concerning: judging Meta lead-forms on lead volume — low friction inflates junk leads, so show-rate is the real metric.',
    costDriver: 'High-intent local competition on premium keywords (Botox/filler) paired with high average order value that justifies aggressive bidding; Google intent is expensive, Meta is cheap-CPC but lower-quality.',
    faq: [
      { q: 'What is a good CAC for a med spa?', a: 'Cost per booked appointment typically runs $130–$285, with strong operators targeting under $100. Google delivers a median 3.33× ROAS on high-intent keywords; Meta’s CPCs are far cheaper but require filtering for show-rate, not raw lead volume.' },
      { q: 'Can you run before/after ads for a med spa?', a: 'Before/after imagery is restricted on the major platforms and can get an account flagged, especially for injectables. Compliant med spa creative leads with the experience, the provider, and the booking offer rather than transformation photos.' },
    ],
    sources: [
      { label: 'Pennock — med spa paid-media benchmarks', url: 'https://www.pennock.co/blog/medspa-and-aesthetics-paid-media-benchmarks-google-vs-meta' },
      { label: 'First Page Sage — patient acquisition cost', url: 'https://firstpagesage.com/seo-blog/average-patient-acquisition-cost/' },
    ],
  },
  {
    slug: 'mental-health',
    name: 'Mental health & telepsychiatry brands',
    short: 'Mental health',
    category: 'MENTAL HEALTH · TELEPSYCH',
    h1: 'Growth marketing for mental health brands',
    lede: 'Acquisition for mental-health and telepsychiatry brands — the widest CAC range in telehealth, where stimulant restrictions and prescriber scarcity have to be priced into the model.',
    painPoint: 'State-by-state prescriber gaps spike CAC unpredictably, and ADHD/stimulant creative faces disapprovals that raise effective CPMs 30–50%.',
    adLandmine: 'Controlled-substance (stimulant/ADHD) promotion is heavily restricted, sensitive-health personalization is prohibited, and mental-health claims are policed. Consult CAC badly understates paying-patient CAC here.',
    proofLine: 'Stood up a telepsychiatry funnel that booked demos within the first 30 days.',
    serviceDesc: 'Compliant acquisition and funnel work for mental-health and telepsychiatry brands.',
    cacDisplay: '$200–$400',
    cacLow: 200,
    cacHigh: 400,
    benchLede: 'Mental-health and telepsychiatry acquisition costs for 2026 — with the ADHD premium and prescriber-scarcity dynamics that make this the widest-ranging telehealth vertical.',
    rows: [
      { label: 'Fully-loaded CAC (anxiety/depression/ADHD)', value: '$200–$400' },
      { label: 'ADHD premium', value: '+30–50%', note: 'Stimulant ad restrictions + tighter qualification' },
      { label: 'Higher-acuity behavioral programs', value: '$500–$2,500+' },
      { label: 'Subscription price', value: '$65–$300 / mo' },
      { label: 'Target LTV:CAC', value: '≥ 3:1', note: 'Payback < 6 months' },
    ],
    goodVsConcerning: 'Good: payback under six months with the ADHD premium built into the model. Concerning: state prescriber gaps creating scarcity that spikes CAC unpredictably in undersupplied states.',
    costDriver: 'Prescriber-availability scarcity by state plus platform restrictions on controlled-substance (stimulant) advertising.',
    faq: [
      { q: 'What is a good CAC for a mental health brand?', a: 'Fully-loaded CAC generally runs $200–$400 for anxiety, depression, and ADHD, with ADHD 30–50% higher due to stimulant restrictions. Higher-acuity behavioral programs reach $500–$2,500+. Target an LTV:CAC of at least 3:1 and payback under six months.' },
      { q: 'Why is ADHD marketing more expensive?', a: 'Stimulant medications are controlled substances, so ADHD ad creative faces heavy platform restrictions and disapprovals that raise effective CPMs, and qualification is tighter. That combination pushes ADHD CAC 30–50% above other mental-health lines.' },
    ],
    sources: [
      { label: 'Telehealth Media', url: 'https://telehealthmedia.com/blog/telehealth-paid-social/telehealth-patient-acquisition-cost' },
      { label: 'BrighterClick — healthcare marketing trends', url: 'https://www.brighterclick.com/blog-post/healthcare-marketing-trends' },
    ],
  },
  {
    slug: 'longevity',
    name: 'Longevity & anti-aging brands',
    short: 'Longevity',
    category: 'LONGEVITY · ANTI-AGING',
    h1: 'Growth marketing for longevity brands',
    lede: 'Acquisition for longevity and anti-aging brands — a young, high-ticket category where recurring membership economics, not cold paid ROAS, are the only thing that makes CAC survivable.',
    painPoint: 'A high price and a long consideration cycle make cold paid brutal — Forward Health raised $650M and shut down in 2024 when consumer CAC outran LTV.',
    adLandmine: 'Anti-aging and longevity health claims are policed, “reverse aging” language is high-risk, and affluent-audience targeting carries above-baseline CPMs. Substantiation matters.',
    proofLine: 'Built a membership-first funnel where recurring revenue covered CAC inside year one.',
    serviceDesc: 'Membership-first acquisition and funnel strategy for longevity and anti-aging brands.',
    cacDisplay: '~$500–$2,000+',
    cacLow: 500,
    cacHigh: 2000,
    benchLede: 'Longevity and anti-aging acquisition economics in 2026 — an opaque, high-ticket category where membership LTV, not ROAS, has to carry the model.',
    rows: [
      { label: 'Estimated CAC (concierge-tier)', value: '~$500–$2,000+', note: 'No public benchmark; validate per-channel before scaling' },
      { label: 'Membership', value: '$3,000–$20,000 / yr', note: 'Accessible entry tier ~$349/mo' },
      { label: 'Category growth', value: '~37% YoY headcount', note: 'Fastest-growing longevity segment' },
    ],
    goodVsConcerning: 'Good: recurring membership covering CAC within year one, with channel-by-channel ROI discipline. Concerning: venture-funded blitz-scaling of consumer acquisition — the Forward Health failure mode.',
    costDriver: 'A premium/affluent audience, a long consideration cycle, and unproven consumer demand; high membership LTV is the only thing that makes CAC survivable.',
    faq: [
      { q: 'How much does it cost to acquire a longevity-clinic member?', a: 'There’s no reliable public benchmark — the category is young and concierge-priced — but expect a high, variable CAC in the ~$500–$2,000+ range. It’s only survivable because memberships run $3,000–$20,000/year; the discipline is validating each channel before scaling spend.' },
      { q: 'Why did well-funded longevity brands fail on acquisition?', a: 'High price plus a long consideration cycle makes cold paid acquisition brutal. Forward Health raised $650M and shut down in 2024 when consumer CAC outran LTV. The durable model is membership-first, with recurring revenue covering CAC inside year one.' },
    ],
    sources: [
      { label: 'Fountain Life — longevity clinic cost', url: 'https://www.fountainlife.com/blog/how-much-does-longevity-clinic-cost' },
      { label: 'OpenLoop — longevity marketing strategies', url: 'https://openloophealth.com/blog/marketing-strategies-for-longevity-and-anti-aging-clinics' },
    ],
  },
  {
    slug: 'fertility-ivf',
    name: 'Fertility & IVF brands',
    short: 'Fertility & IVF',
    category: 'FERTILITY · IVF',
    h1: 'Growth marketing for fertility & IVF brands',
    lede: 'Acquisition for fertility and IVF brands — a high-consideration, high-order-value category where the metric that matters is consult-to-cycle conversion, not cost per lead.',
    painPoint: 'Optimizing to cheap consult leads that never start a cycle burns budget; conversion takes 2–4 consults per started cycle.',
    adLandmine: 'Sensitive personal-health targeting is prohibited, success-rate claims are regulated, and emotionally manipulative creative draws scrutiny. Substantiated, compassionate messaging wins.',
    proofLine: 'Rebuilt a fertility clinic’s funnel around consult-to-cycle conversion, not cheap leads.',
    serviceDesc: 'Acquisition and consult-to-cycle funnel optimization for fertility and IVF brands.',
    cacDisplay: '$200–$600 / cycle',
    cacLow: 200,
    cacHigh: 600,
    benchLede: 'Fertility and IVF acquisition costs for 2026 — per consult and per started cycle — and why an extremely high cycle value makes even a four-figure CAC rational.',
    rows: [
      { label: 'Cost per new consult (paid search)', value: '$80–$250' },
      { label: 'All-in CAC per IVF start', value: '$200–$600', note: '2–4 consults per started cycle' },
      { label: 'High-competition metros (e.g. LA)', value: '$1,800–$3,200 / consult' },
      { label: 'IVF cycle value', value: '$10,000–$20,000' },
      { label: 'Marketing budget', value: '3–8% of gross revenue' },
    ],
    goodVsConcerning: 'Good: tracking consult-to-cycle conversion, where CAC even at $1–2K is fine against a $15K cycle. Concerning: optimizing to cheap consult leads that never convert to a started cycle.',
    costDriver: 'A very high emotional-consideration purchase requiring multiple consults, plus high per-cycle value that supports large CAC; competition concentrated in a few affluent metros drives the high end.',
    faq: [
      { q: 'What is a good CAC for a fertility or IVF clinic?', a: 'Cost per new consult runs $80–$250, and because it takes 2–4 consults to start a cycle, all-in CAC per IVF start is $200–$600 (far higher in competitive metros). Against a $10,000–$20,000 cycle value, even a four-figure CAC can be rational — the key is measuring consult-to-cycle conversion.' },
      { q: 'How much should a fertility clinic spend on marketing?', a: 'Fertility clinics typically budget 3–8% of gross revenue for marketing. The discipline that matters most is optimizing to started cycles rather than cheap consult leads that never convert.' },
    ],
    sources: [
      { label: 'Direction — fertility clinic marketing', url: 'https://direction.com/fertility-clinic-marketing-strategies/' },
      { label: 'bspkn — fertility clinic marketing 2026', url: 'https://www.bspkn.co/insights/fertility-clinic-marketing-attract-patients-grow-ivf-practice-2026/' },
    ],
  },
];

export const getVertical = (slug: string) => VERTICALS.find((v) => v.slug === slug);
