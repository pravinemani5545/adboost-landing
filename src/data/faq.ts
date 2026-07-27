// FAQ page content - single source of truth for /faq/ (page copy + FAQPage
// JSON-LD) and the llms-full.txt feed. Keep strings identical across both.

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'Working with AdBoost',
    items: [
      { q: 'How is AdBoost different from other agencies?', a: 'We only work with health, telehealth, and supplement brands, so every playbook, creative angle, and compliance check is purpose-built for your category. No generic “DTC agency” mistakes that cost you 30 days.' },
      { q: 'How fast can we launch?', a: 'Setup takes 5 days. Most partners see directional movement on CAC or ROAS within 2 weeks, and the full system compounds by day 31.' },
      { q: 'Do you work with brands outside health?', a: 'No - deliberately. Health is the only category we work in, which is exactly why we’re faster and safer in it than a generalist.' },
      { q: 'How many brands do you take on?', a: 'A limited number each month so every partner gets a senior strategist, not a junior pod. We’re typically booking around 4 founders per month.' },
    ],
  },
  {
    title: 'Compliance',
    items: [
      { q: 'Do you have experience with compliant health advertising?', a: 'Yes. Every account is reviewed against Meta, Google, and TikTok health-vertical policies before launch. We’ve shipped thousands of compliant creatives across GLP-1, supplement, and Rx-adjacent brands.' },
      { q: 'Can you help with LegitScript certification?', a: 'Yes - for telehealth and pharmacy advertisers we guide the LegitScript and platform-certification process and geo-eligibility, so you’re not blocked at the starting line.' },
      { q: 'Will my ads get rejected?', a: 'No one can guarantee a platform’s decision, but pre-clearing creative against the actual rejection triggers is why our partners’ accounts stay live through scale instead of getting flagged.' },
    ],
  },
  {
    title: 'Creative & performance',
    items: [
      { q: 'Do you create ad creatives too?', a: 'Absolutely. Static, motion, and UGC are produced in-house weekly - most partners get 20+ new variants per month, tested against an indexed library of winning angles.' },
      { q: 'When can I expect results?', a: 'Most partners see directional CAC or ROAS movement within 2 weeks. The 31-day mark is when the system compounds: tested creative library, optimized landers, and clean attribution all working in lockstep.' },
      { q: 'Who owns the creative and landing pages?', a: 'You do. Everything we produce for your brand is yours to keep.' },
    ],
  },
];
