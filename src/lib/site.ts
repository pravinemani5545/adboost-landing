// Shared site constants + navigation. Single source of truth for booking + nav.
// Canonical domain is derived from Astro.site (astro.config.mjs) - never hardcode apex here.

export const CAL_LINK = 'pira-ahilan-ef2dl8/strategy-call';
export const CAL_NAMESPACE = 'strategy-call';
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
export const EMAIL = 'hello@adboost.health';

export function siteBase(site: URL | undefined): string {
  return site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
}

// Primary nav. Items with `children` render as hover dropdowns in the header
// (and as grouped sub-links in the mobile menu).
export const NAV = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Paid media', href: '/services/paid-media/' },
      { label: 'Creative production', href: '/services/creative/' },
      { label: 'CRO & funnels', href: '/services/cro/' },
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
    href: '/tools/',
    children: [
      { label: 'Ad compliance', href: '/advertising/' },
      { label: 'Free tools', href: '/tools/' },
      { label: 'Glossary', href: '/glossary/' },
      { label: 'Compare', href: '/compare/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Blog', href: '/blog/' },
    ],
  },
  { label: 'About', href: '/about/' },
];
