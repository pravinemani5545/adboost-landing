// Shared site constants + navigation. Single source of truth for booking + nav.
// Canonical domain is derived from Astro.site (astro.config.mjs) - never hardcode apex here.

// Every booking CTA links to the first-party /book/ page, which embeds the Google
// Calendar appointment schedule (Pira's calendar; each booking gets a Google Meet link).
export const BOOK_PATH = '/book/';
export const BOOKING_EMBED_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3zojIwc77IB2k7y11etonn4j7oKffkeWbm-ErHiwITTBBInv12Tu8XUYsVJHJLUeUWng2BFkEs?gv=true';
export const EMAIL = 'hello@adboost.health';
// Sister agency for ecommerce / DTC brands (mirrors adboost.media's link back to this site).
export const SISTER = { label: 'AdBoost Media', href: 'https://www.adboost.media/' };

export function siteBase(site: URL | undefined): string {
  return site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
}

// Primary nav. Items with `children` render as mega menus in the header (and as groups in the
// phone sheet), with `blurb` as the menu's line and `all` linking the hub; `external` opens in a new tab.
export const NAV = [
  {
    label: 'Services',
    href: '/services/',
    all: 'All services',
    blurb: 'A unified performance system: paid media, creative strategy and CRO.',
    children: [
      { label: 'Paid media', href: '/services/paid-media/' },
      { label: 'Creative production', href: '/services/creative/' },
      { label: 'CRO & funnels', href: '/services/cro/' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries/',
    all: 'All industries',
    blurb: 'Every vertical has its own economics, ad-policy landmines, and definition of a good CAC.',
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
    all: 'All free tools',
    blurb: 'Run your own numbers in seconds, with 2026 health benchmark context.',
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
  { label: SISTER.label, href: SISTER.href, external: true },
];

// The brand as the chrome sets it: the name in the nav, the footer and the plate. The second word is
// set lighter. NAV groups carry a short line (from the hub pages' own copy) for their mega menu.
export const BRAND = { name: 'AdBoost', sub: 'Health', full: 'AdBoost Health' };
export const CTA = { label: 'Book a call', href: BOOK_PATH };
export const LOCATION = 'Toronto';
export const TIMEZONE = 'America/Toronto';
export const ABOUT_LINE = 'Growth marketing built exclusively for health, telehealth, GLP-1, supplement & wellness brands.';
