// Shared site constants + navigation. Single source of truth for booking + nav.
// Canonical domain is derived from Astro.site (astro.config.mjs) — never hardcode apex here.

export const CAL_LINK = 'pira-ahilan-ef2dl8/strategy-call';
export const CAL_NAMESPACE = 'strategy-call';
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
export const EMAIL = 'hello@adboost.health';

export function siteBase(site: URL | undefined): string {
  return site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
}

// Primary nav: grouped so the header can render dropdowns.
export const NAV = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Paid media', href: '/services/paid-media/' },
      { label: 'Creative production', href: '/services/creative/' },
      { label: 'CRO & funnels', href: '/services/cro/' },
      { label: 'Compliance review', href: '/services/compliance/' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries/',
    children: [
      { label: 'GLP-1 & weight loss', href: '/industries/glp-1-weight-loss/' },
      { label: 'Telehealth', href: '/industries/telehealth/' },
      { label: 'Supplements & DTC', href: '/industries/supplements-dtc/' },
      { label: 'TRT & hormone', href: '/industries/trt-hormone/' },
      { label: 'Peptides', href: '/industries/peptides/' },
      { label: 'Med spa', href: '/industries/med-spa/' },
      { label: 'Mental health', href: '/industries/mental-health/' },
      { label: 'Longevity', href: '/industries/longevity/' },
      { label: 'Fertility & IVF', href: '/industries/fertility-ivf/' },
    ],
  },
  {
    label: 'Resources',
    href: '/benchmarks/',
    children: [
      { label: 'CAC benchmarks', href: '/benchmarks/' },
      { label: 'Ad compliance', href: '/advertising/' },
      { label: 'Free tools', href: '/tools/' },
      { label: 'Guides', href: '/guides/' },
      { label: 'Glossary', href: '/glossary/' },
      { label: 'Blog', href: '/blog/' },
    ],
  },
  { label: 'About', href: '/about/' },
];
