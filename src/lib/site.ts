// Shared site constants + navigation. Single source of truth for booking + nav.
// Canonical domain is derived from Astro.site (astro.config.mjs) - never hardcode apex here.

// Every booking CTA links to the first-party /book/ page, which embeds the Google
// Calendar appointment schedule (Pira's calendar; each booking gets a Google Meet link).
export const BOOK_PATH = '/book/';
export const BOOKING_EMBED_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3zojIwc77IB2k7y11etonn4j7oKffkeWbm-ErHiwITTBBInv12Tu8XUYsVJHJLUeUWng2BFkEs?gv=true';
export const EMAIL = 'hello@adboost.health';
// CASL: newsletter signups and emails must show a mailing address (a PO box or
// virtual mailbox is fine). Shown on /privacy/ and /newsletter/ once set.
export const MAILING_ADDRESS = '';
// Row 1 of the navigation: the AdBoost family bar, the same on every page of
// www.adboost.media (src/components/FamilyBar.astro is a copy of the one in the
// adboost-media repo; keep the two files and this list identical to that site's
// src/lib/family.ts, including each section's dot colour). The other sections are absolute links because another project
// serves them; "/" is this site's own home, published at /health/. The same list feeds the
// "The AdBoost family" group of the phone menu and the footer's "Who we serve" column.
const FAMILY_SITE = 'https://www.adboost.media';
export const FAMILY_HOME = `${FAMILY_SITE}/`;
export const FAMILY_LINKS = [
  { id: 'ecommerce', tab: 'Ecommerce', dot: '#66d2df', href: `${FAMILY_SITE}/ecommerce/` },
  { id: 'tech', tab: 'SaaS & Apps', dot: '#a78bfa', href: `${FAMILY_SITE}/tech/` },
  { id: 'health', tab: 'Health', dot: '#4d8dff', href: '/' },
  { id: 'automation', tab: 'Automation', dot: '#22c55e', href: `${FAMILY_SITE}/automation/` },
];

export function siteBase(site: URL | undefined): string {
  return site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
}

// Primary nav. Items with `children` render as hover dropdowns in the header
// (and as grouped sub-links in the mobile menu); `external` opens in a new tab. The
// link to the rest of www.adboost.media is the family bar above this nav.
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
      { label: 'Newsletter', href: '/newsletter/' },
    ],
  },
  { label: 'About', href: '/about/' },
];
