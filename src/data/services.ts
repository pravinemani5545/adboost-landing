export interface Service {
  seoTitle?: string;   // overrides the derived `${h1} | AdBoost Health` title
  slug: string;
  name: string;
  navLabel: string;
  h1: string;
  lede: string;
  answer: string;              // answer-first block (AEO)
  desc: string;                // Service schema description
  outcomes: string[];          // checklist
  process: { phase: string; detail: string }[];
  deliverables: string[];
  howMeasured: string[];
  deepPoints: { h: string; p: string }[];
  stat: { text: string; source: string; url: string };
  sections: { h: string; p: string }[];
  faq: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: 'paid-media',
    name: 'Paid media',
    navLabel: 'Paid media',
    h1: 'Paid media for health & telehealth brands',
    lede: 'Meta, Google, and TikTok acquisition run by senior strategists who only work in health - so spend scales without tripping a policy landmine.',
    answer: 'AdBoost Health manages paid media across Meta, Google, and TikTok exclusively for health, telehealth, GLP-1, supplement, and wellness brands. Every account is structured for compliant scale - clean server-side attribution, tested creative, and spend bands that expand only as CAC holds - with partners averaging 24% lower CAC in the first 30 days.',
    desc: 'Full-funnel paid media management (Meta, Google, TikTok) for health, telehealth, GLP-1, and supplement brands.',
    outcomes: [
      '24% average CAC reduction in the first 30 days',
      'Compliant account structure reviewed before every launch',
      'Clean, server-side attribution so you scale on real numbers',
      'Spend bands that expand only as efficiency holds',
    ],
    process: [
      { phase: 'Account & tracking audit · wk 1–2', detail: 'Audit ad accounts, LegitScript status, Conversions API coverage, event match quality, and the blended-vs-platform ROAS gap before touching spend. Map real CAC by condition - not the consultation CAC.' },
      { phase: 'Structure & measurement build · wk 2–3', detail: 'Consolidate campaigns for Advantage+/broad targeting, deploy CAPI with deduplication, set the attribution window, and stand up a blended-MER dashboard as the true-north metric.' },
      { phase: 'Controlled scaling · wk 3–8', detail: 'Scale winning audiences and creative while holding cold-audience frequency under 3.0; expand from Meta into branded/non-branded Search and retargeting only where CAC holds at or below vertical benchmark.' },
      { phase: 'Incrementality & efficiency · ongoing', detail: 'Run geo-holdout and conversion-lift tests to separate incremental spend from spend claiming credit for organic demand, then reallocate budget to what actually causes revenue.' },
    ],
    deliverables: [
      'Full-funnel account restructure (Meta + Google Search + retargeting) with naming/UTM conventions',
      'Conversions API / server-side tracking with event deduplication and EMQ monitoring',
      'Blended MER + platform-ROAS reconciliation dashboard',
      'CAC-by-condition model separating consultation CAC from paying-patient CAC',
      'Weekly optimization cadence with documented kill/scale rules and frequency guardrails',
      'Incrementality test plan (geo-holdout or conversion lift) with read-out schedule',
    ],
    howMeasured: ['Blended MER / true CAC (bank-account math, not platform-claimed)', 'CAC payback against contribution margin', 'Incremental ROAS (holdout-verified), not platform-reported ROAS'],
    deepPoints: [
      { h: 'Consultation CAC is not patient CAC - and the gap is ~2×', p: 'Cost per booked telehealth visit runs 40–60% below cost per first prescription. Brands that budget against consultation CAC discover the real number the month they scale. We model fully-loaded paying-patient CAC per condition from day one.' },
      { h: 'Platform ROAS lies harder in health because the auction is thin', p: 'Meta overstates ROAS ~28% on average and blended platform inflation runs 30–40%. In restricted health verticals with fewer eligible advertisers, over-attribution compounds - a wide platform-vs-blended gap usually means you’re paying to reach demand that would convert anyway.' },
      { h: 'CAC by condition is not one number', p: 'ED runs ~$70–140 fully-loaded, hair loss ~$90–170 (but a 4–6 month results window stretches payback), and ADHD/mental health $200–400. A single blended target across conditions overspends on the hard ones and underspends on the easy ones.' },
    ],
    stat: { text: 'Advertisers with the Meta Conversions API configured for web events saw an average 17.8% lower cost per result versus those without it.', source: 'Meta benchmark data', url: 'https://adlibrary.com/posts/conversions-api' },
    sections: [
      { h: 'Built for the health auction, not a generic playbook', p: 'Health verticals pay a 20–60% cost premium over unregulated DTC and get throttled by policy enforcement. We structure campaigns around that reality - the right optimization events, exclusions, and creative volume to hold benchmark CAC instead of watching it drift 40–80% over.' },
      { h: 'Attribution you can actually scale on', p: 'iOS privacy has gutted in-platform reporting. We stand up server-side tracking and blended measurement so the CAC you scale on is the CAC you actually pay - not an under- or over-counted platform estimate.' },
      { h: 'Channel strategy that survives a policy update', p: 'For restricted categories like TRT and peptides, a single-channel paid play is one enforcement action from zero. We diversify across paid, search, and referral so no one policy change can take the funnel down.' },
    ],
    faq: [
      { q: 'Which ad platforms do you run?', a: 'Meta (Facebook/Instagram), Google (Search, PMax, YouTube), and TikTok - the three channels that carry the vast majority of health-brand acquisition. We weight the mix by vertical and compliance reality.' },
      { q: 'How fast do you launch?', a: 'Setup takes 5 days. Most partners see directional CAC or ROAS movement within 2 weeks, and the full system compounds by day 31.' },
      { q: 'What does "true CAC" mean?', a: 'The fully-loaded cost per paying customer measured on blended MER (total revenue ÷ total spend), not the platform-reported number - which over-counts because multiple platforms claim the same conversion.' },
    ],
  },
  {
    slug: 'creative',
    name: 'Creative production',
    navLabel: 'Creative production',
    h1: 'Compliant ad creative, produced in-house',
    lede: 'Static, motion, and UGC built for the scroll and pre-cleared against every health platform’s rules - 20+ new variants a month, per partner.',
    answer: 'AdBoost Health produces compliant static, motion, and UGC ad creative in-house - 20+ new variants per partner per month - every asset reviewed against Meta, Google, and TikTok health-vertical policies before it launches. We’ve shipped over 8,400 creatives at a 38% win rate.',
    desc: 'In-house compliant ad creative production (static, motion, UGC) for health and wellness brands.',
    outcomes: [
      '20+ new creative variants per partner per month',
      'Every asset pre-cleared against health-vertical ad policy',
      'Tested against an indexed library of winning angles',
      '140+ UGC creators across health categories',
    ],
    process: [
      { phase: 'Research & angle mining · wk 1–2', detail: 'Mine winning competitor angles, patient objections, and compliant proof points; build a claims-safe messaging matrix (structure/function language, no disease claims) before any production.' },
      { phase: 'Concept & production sprint · wk 2–4', detail: 'Produce a first batch of 15–30 assets across formats (UGC, static, founder/expert, problem-solution), each mapped to a hook, an audience, and a compliant claim tier.' },
      { phase: 'Structured testing · ongoing', detail: 'Test at the hook and concept level, not the tweak level; read hook rate first (does it earn distribution?), then hold rate and cost-per-result, killing losers fast.' },
      { phase: 'Iteration & fatigue management · rolling', detail: 'Refresh top performers every 2–4 weeks before fatigue sets in, iterating on winning concepts rather than restarting, to keep frequency and CPM in check.' },
    ],
    deliverables: [
      'Monthly batch of 15–30+ production-ready ads across static, UGC, and video',
      'Compliant hook library mapped to audiences and claim tiers',
      'Claims-safe scripting and on-screen-text review baked into every asset',
      'Creative testing matrix with hook-rate and hold-rate reporting per concept',
      'Winning-concept iteration roadmap (variations, hooks, formats)',
      'Fatigue-refresh calendar tied to frequency and CPM thresholds',
    ],
    howMeasured: ['Hook rate (3-sec views ÷ impressions) and hold rate', 'Cost per result / CAC of net-new winning creatives', 'Creative win rate and time-to-fatigue'],
    deepPoints: [
      { h: 'Volume is a CAC lever, not a vanity metric', p: 'The average user sees the same creative ~4.2 times, and at four exposures conversion likelihood drops ~45%; top ads lose ~38% of effectiveness after five weeks. Sustained volume keeps frequency low and CAC flat - and in health every new asset must clear claims review, so a compliant production engine is the moat.' },
      { h: 'Hook rate is the algorithm’s relevance vote', p: 'On Meta, >25% hook rate is table stakes, >30% good, >40% elite - the point where the algorithm rewards the creative with lower CPMs and broader delivery. In restricted health auctions where CPMs are already elevated, winning the first three seconds is disproportionately valuable.' },
      { h: 'The claim tier is a creative decision, not a legal afterthought', p: 'The difference between "supports healthy testosterone" (defensible) and "boosts low T / treats ED" (a disease claim needing drug-level substantiation and FTC risk) is made in the script and on-screen text. Compliance has to live inside the creative brief, not get bolted on at review.' },
    ],
    stat: { text: 'Meta recommends 20–50 creative assets per ad set, and brands that master creative velocity see 30–50% ROAS improvements.', source: 'Logical Position / AdAmigo, 2025', url: 'https://www.adamigo.ai/blog/meta-ad-creative-testing-benchmarks-2025' },
    sections: [
      { h: 'Volume is the algorithm', p: 'Holding benchmark CAC in health takes 30–60 fresh ads a month; running 5–10 runs you 40–80% over. Our in-house studio ships the volume the auction demands, then scales only the winners.' },
      { h: 'Compliance baked into the brief', p: 'The fastest way to lose 30 days is a rejected launch. Before/after imagery, "lose X lbs" claims, negative self-perception framing, disease claims - we design around every landmine so creative clears review the first time.' },
      { h: 'An indexed angle library', p: 'Every asset is tagged against the hooks, formats, and offers that have won across our health accounts, so new creative starts from evidence, not a blank page.' },
    ],
    faq: [
      { q: 'Do you produce UGC?', a: 'Yes - scripted UGC is a core format, with 140+ creators across health categories. We write the scripts, brief the creators, and edit for platform-compliant delivery.' },
      { q: 'Who owns the creative?', a: 'You do. Every asset we produce for your brand is yours to keep.' },
      { q: 'What is a good hook rate?', a: 'On Meta, above 25% is table stakes, above 30% is good, and above 40% is elite. Hook rate is the algorithm’s first relevance signal and the biggest lever on CPM and distribution.' },
    ],
  },
  {
    slug: 'cro',
    name: 'CRO & funnels',
    navLabel: 'CRO & funnels',
    h1: 'Conversion rate optimization for health funnels',
    seoTitle: 'Conversion Rate Optimization for Health Brands | AdBoost',
    lede: 'We A/B test landers and rewrite hooks weekly so every dollar of traffic lands somewhere it converts - not on a page that leaks.',
    answer: 'AdBoost Health optimizes the full post-click funnel - landing pages, quizzes, offers, and lifecycle - for health and telehealth brands. We A/B test landers and rewrite hooks weekly so traffic finds its highest-converting offer, lifting conversion against baseline without spending a dollar more on media.',
    desc: 'Landing page and funnel conversion rate optimization for health, telehealth, and DTC brands.',
    outcomes: [
      'Weekly A/B tests on landers, offers, and hooks',
      'Message-match from ad to page so quality traffic converts',
      'Quiz funnels that double as compliant qualification',
      'Offer architecture tuned to LTV and payback, not just first order',
    ],
    process: [
      { phase: 'Funnel & analytics audit · wk 1–2', detail: 'Instrument the full path (ad → landing/quiz → checkout → rebill), find the biggest drop-off, and baseline conversion rate by traffic source and device.' },
      { phase: 'Funnel architecture · wk 2–5', detail: 'Build or rebuild the primary path - typically a personalized quiz funnel for condition/product-fit categories - with compliant qualification logic and correct price-reveal timing.' },
      { phase: 'Prioritized experimentation · ongoing', detail: 'Run a ranked A/B roadmap (hero, social proof, quiz length, price placement, checkout), one high-leverage test at a time, powered to significance.' },
      { phase: 'Post-purchase & LTV · rolling', detail: 'Optimize the subscription opt-in, first-90-day retention, and rebill experience - where DTC brands lose 60–70% of subscribers between orders 1 and 3.' },
    ],
    deliverables: [
      'Funnel audit with drop-off map and source/device conversion baseline',
      'Personalized quiz funnel (or optimized product path) with compliant qualification logic',
      'Prioritized A/B test roadmap with hypotheses and required sample sizes',
      'Mobile-first landing page / system rebuild',
      'Post-purchase / subscription-retention flow optimization',
      'Conversion + retention dashboard tracking CVR, AOV, and early rebill rate',
    ],
    howMeasured: ['Landing/quiz-to-purchase conversion rate (by source and device)', 'AOV and first-order contribution margin', 'Rebill / retention rate through orders 1–3'],
    deepPoints: [
      { h: 'Quizzes win in health because fit is the buying decision', p: 'Most supplement brands at least double conversion moving from a static page to a quiz funnel; in condition-driven categories the quiz doubles as compliant qualification and conversion engine. But sequencing matters - showing price before the quiz cut one brand’s conversions by 30%.' },
      { h: 'First-order break-even means the funnel’s real job is retention', p: 'Most DTC brands are break-even or negative on the first order (the median public DTC brand ran a −2.4% operating margin in FY2025). CRO that lifts front-end conversion while ignoring the 60–70% who cancel by order 3 optimizes the wrong number - the rebill experience is a CRO surface.' },
      { h: 'Mobile is where health traffic and drop-off both concentrate', p: 'Mobile converts ~2.9% vs ~4.8% on desktop, yet most paid health traffic is mobile. A funnel tuned on desktop quietly leaks its biggest audience - quiz length, tap targets, and checkout friction have to be solved mobile-first.' },
    ],
    stat: { text: 'The average health/wellness Shopify store converts at 1.4–1.8%; the top 10% clear 4.7% - a 3–4× spread that is almost entirely funnel quality.', source: 'MHI Growth Engine, 2025', url: 'https://mhigrowthengine.com/blog/dtc-landing-page-conversion-benchmarks/' },
    sections: [
      { h: 'The cheapest CAC reduction is on the page', p: 'You’ve already paid for the click. Lifting landing-page conversion drops CAC without touching media spend - usually the fastest win in the first 30 days.' },
      { h: 'Message-match, end to end', p: 'The ad promise and the page have to line up or quality traffic bounces. We rebuild landers around the winning ad angle so the story is continuous from scroll to checkout.' },
      { h: 'Optimize for LTV, not the first click', p: 'In subscription health, the first order isn’t the win - retention is. We architect offers and post-purchase flows around payback and LTV:CAC, not vanity conversion rate.' },
    ],
    faq: [
      { q: 'Do you build the landing pages?', a: 'We design, write, and test them, and integrate with your stack. You keep full ownership of everything we build.' },
      { q: 'How do you measure CRO impact?', a: 'On blended CAC and payback, not just raw conversion rate - a higher conversion rate that hurts retention isn’t a win in subscription health.' },
      { q: 'Why a quiz funnel?', a: 'In fit-driven health categories a quiz doubles conversion versus a static page and doubles as compliant qualification - as long as price is revealed after the quiz, not before.' },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
