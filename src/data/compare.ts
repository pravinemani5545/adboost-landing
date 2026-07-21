// "[Competitor] alternative" pages - an open lane where directories, not
// agencies, currently rank. Framing is honest and category-level (positioning
// differences), not disparaging. Verify competitor descriptions before deploy.

export interface Compare {
  slug: string;
  competitor: string;
  h1: string;
  intent: string;             // who's searching
  answer: string;             // answer-first
  theirFocus: string;
  ourDifference: string;
  rows: { dimension: string; them: string; us: string }[];
  bestWhen: string;           // when the competitor is the better fit (honesty)
  faq: { q: string; a: string }[];
}

export const COMPARES: Compare[] = [
  {
    slug: 'full-service-healthcare-agency-alternative',
    competitor: 'a full-service healthcare agency',
    h1: 'AdBoost Health vs. a full-service healthcare agency',
    intent: 'Health founders deciding between a broad, full-service healthcare/medical agency and a specialist paid-acquisition partner.',
    answer: 'Full-service healthcare agencies cover brand, web, PR, and patient marketing broadly - often for clinics, hospitals, and pharma. AdBoost Health is the opposite: a focused, paid-performance-first partner for regulated health, telehealth, and supplement DTC brands, built to lower CAC and scale spend compliantly rather than manage a whole marketing department.',
    theirFocus: 'Broad, multi-discipline marketing (brand, creative, web, PR, patient acquisition) across the healthcare industry, frequently oriented toward practices, hospitals, and enterprise pharma.',
    ourDifference: 'We do one thing: profitable, compliant paid acquisition for DTC health and telehealth brands. Senior strategists, in-house compliant creative, and clean attribution - not a generalist retainer stretched across every channel.',
    rows: [
      { dimension: 'Primary focus', them: 'Full-funnel marketing across healthcare', us: 'Paid acquisition + creative + CRO for DTC health' },
      { dimension: 'Typical client', them: 'Clinics, hospitals, pharma, enterprise', us: 'Early-to-growth DTC health & telehealth brands' },
      { dimension: 'Compliance', them: 'General healthcare marketing knowledge', us: 'Pre-launch review vs Meta/Google/TikTok health policy' },
      { dimension: 'Creative', them: 'Often outsourced or brand-led', us: '20+ compliant variants/month in-house' },
      { dimension: 'Speed', them: 'Multi-week onboarding', us: '5-day setup, results by day 31' },
    ],
    bestWhen: 'A full-service agency is the better fit if you need brand strategy, a website rebuild, PR, and offline patient marketing bundled together - especially for a clinic or hospital system rather than a DTC brand.',
    faq: [
      { q: 'Do you do brand, web, and PR too?', a: 'No - we deliberately don’t. We focus on paid acquisition, compliant creative, and conversion for DTC health brands. If you need a full marketing department, a full-service healthcare agency is the better fit; if you need CAC down and spend scaled, that’s us.' },
    ],
  },
  {
    slug: 'in-house-growth-team-alternative',
    competitor: 'building an in-house growth team',
    h1: 'AdBoost Health vs. hiring an in-house growth team',
    intent: 'Founders weighing whether to hire a growth lead + media buyer + creative in-house or partner with a specialist agency.',
    answer: 'Building in-house gives you dedicated headcount but takes months to hire, costs $300K+ fully loaded, and rarely comes with health-specific compliance expertise on day one. AdBoost Health gives you a senior health-growth team, an in-house creative studio, and compliance review immediately - for less than a single senior hire.',
    theirFocus: 'A dedicated internal team (growth lead, media buyer, creative, analyst) that owns acquisition full-time and builds institutional knowledge.',
    ourDifference: 'You get a senior strategist plus a compliant-creative engine and attribution stack now - not in six months - with health-vertical policy expertise built in, and no ramp, benefits, or turnover risk.',
    rows: [
      { dimension: 'Time to productive', them: '3–6 months to hire + ramp', us: '5-day setup' },
      { dimension: 'Cost', them: '$300K+/yr fully loaded (multiple hires)', us: 'One retainer, senior team included' },
      { dimension: 'Creative volume', them: 'Limited by 1–2 in-house designers', us: '20+ compliant variants/month' },
      { dimension: 'Compliance depth', them: 'Must be hired for or learned', us: 'Built in from day one' },
      { dimension: 'Risk', them: 'Hiring, ramp, turnover', us: 'Cancel-and-keep-the-plan flexibility' },
    ],
    bestWhen: 'In-house wins once you’re at real scale and want acquisition as a permanent core competency with dedicated, full-time owners - many brands graduate there, and we help set the foundation they inherit.',
    faq: [
      { q: 'Can you work alongside our in-house team?', a: 'Yes. Many partners keep an internal growth lead and use us for compliant creative volume, paid execution, and attribution - the pieces that are hardest and slowest to build in-house.' },
    ],
  },
  {
    slug: 'generalist-dtc-agency-alternative',
    competitor: 'a generalist DTC agency',
    h1: 'AdBoost Health vs. a generalist DTC agency',
    intent: 'Health founders who’ve worked with (or are considering) a general ecommerce/DTC agency that doesn’t specialize in health.',
    answer: 'Generalist DTC agencies are strong on ecommerce mechanics but routinely lose health brands 30 days to rejected launches and disabled accounts because they don’t know health-vertical ad policy. AdBoost Health brings the same performance discipline plus compliance expertise purpose-built for GLP-1, telehealth, and supplement advertising.',
    theirFocus: 'Broad DTC/ecommerce growth across apparel, beauty, food, and consumer goods - good at the general paid-social and email playbook.',
    ourDifference: 'We only work in health, so we know every Meta health policy by heart, structure accounts to survive enforcement, and design creative that clears review the first time - the exact place generalists cost health brands time and spend.',
    rows: [
      { dimension: 'Vertical focus', them: 'All DTC categories', us: 'Health, telehealth, GLP-1, supplements only' },
      { dimension: 'Compliance', them: 'Generic ad-policy awareness', us: 'Health-vertical policy + FTC/FDA review' },
      { dimension: 'Rejected launches', them: 'Common - costs 30 days', us: 'Pre-cleared before launch' },
      { dimension: 'Creative angles', them: 'General DTC hooks', us: 'Health-specific, compliance-safe library' },
      { dimension: 'Benchmarks', them: 'Cross-category', us: 'Per-vertical health CAC data' },
    ],
    bestWhen: 'A generalist is perfectly good if you sell an unregulated consumer product with no health claims - the compliance overhead we specialize in simply doesn’t apply to you.',
    faq: [
      { q: 'We already use a DTC agency - why switch?', a: 'If your ads keep getting rejected, your account has been flagged, or your agency treats GLP-1 like a hoodie launch, that’s the specialization gap. We keep the performance discipline and add the health compliance layer that protects your spend.' },
    ],
  },
];

export const getCompare = (slug: string) => COMPARES.find((c) => c.slug === slug);
