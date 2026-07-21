export interface CaseStudy {
  slug: string;
  brand: string;
  vertical: string;
  categoryTag: string;
  illustrative: boolean;      // true = sample placeholder, not a real client
  title: string;
  seoTitle?: string;          // short <title> override (keep <=43 chars so brand suffix fits <=60)
  summary: string;
  hero: { metric: string; label: string }[];   // 3 headline stats
  challenge: string;
  approach: string[];
  results: { k: string; v: string }[];
  quote?: { text: string; who: string; role: string };
  datePublished: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'nova-metabolic-glp1',
    brand: 'Nova Metabolic',
    vertical: 'glp-1-weight-loss',
    categoryTag: 'GLP-1 · TELEHEALTH',
    illustrative: true,
    title: 'How a GLP-1 telehealth brand cut CAC 61% and scaled spend 5× in 74 days',
    seoTitle: 'Nova Metabolic: CAC Cut 61% in 74 Days',
    summary: 'A compounded-GLP-1 program was stuck: rising CAC, a creative account one rejection from disablement, and blended reporting hiding the real numbers. We rebuilt the compliance foundation, the creative engine, and the attribution - and the economics inverted.',
    hero: [
      { metric: '−61%', label: 'Fully-loaded CAC' },
      { metric: '5.2×', label: 'Monthly ad spend' },
      { metric: '74 days', label: 'To new floor' },
    ],
    challenge: 'Nova Metabolic was acquiring GLP-1 patients at a fully-loaded CAC north of $340 and climbing. Their Meta account had been flagged twice for before/after imagery and “lose 20 lbs” copy, spend was capped by fear of another disablement, and blended reporting mixed organic patients into the paid number - so no one actually knew what a paid patient cost.',
    approach: [
      'Ran a full compliance rebuild: stripped before/after and weight-claim creative, restructured the account to health-vertical policy, and confirmed LegitScript + geo-eligibility before relaunch.',
      'Stood up server-side tracking so paid CAC was separated from blended CAC - revealing true paid CAC was ~$290, not the $210 blended figure they’d been scaling on.',
      'Shipped 40+ compliant creatives/month against an indexed angle library, leading with the program and metabolic-health outcome rather than the drug or the scale.',
      'Rebuilt the intake lander for message-match and tuned the offer around 3-month retention, not first-order conversion.',
    ],
    results: [
      { k: 'Fully-loaded CAC', v: '$342 → $133' },
      { k: 'Monthly paid spend', v: '$48K → $250K' },
      { k: 'Month-3 retention', v: '44% → 63%' },
      { k: 'Payback period', v: '1.9 mo → 0.8 mo' },
      { k: 'Compliance rejections', v: '2 in Q1 → 0 since' },
    ],
    quote: {
      text: 'We stopped guessing. The compliance work alone let us finally scale without holding our breath - and once attribution was clean, every decision got easier.',
      who: 'VP Growth',
      role: 'Nova Metabolic (illustrative)',
    },
    datePublished: '2026-06-24',
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
