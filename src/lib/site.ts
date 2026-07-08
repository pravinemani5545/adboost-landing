// Shared site constants + navigation. Single source of truth for booking + nav.
// Canonical domain is derived from Astro.site (astro.config.mjs) — never hardcode apex here.

export const CAL_LINK = 'pira-ahilan-ef2dl8/strategy-call';
export const CAL_NAMESPACE = 'strategy-call';
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
export const EMAIL = 'hello@adboost.health';

export function siteBase(site: URL | undefined): string {
  return site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
}

// Primary nav. Items with `children` render as hover dropdowns in the header
// (and as grouped sub-links in the mobile menu).
export const NAV: Array<{ label: string; href: string; children?: Array<{ label: string; href: string }> }> = [
  {
    label: 'Resources',
    href: '/tools/',
    children: [
      { label: 'Ad compliance', href: '/advertising/' },
      { label: 'Free tools', href: '/tools/' },
      { label: 'Glossary', href: '/glossary/' },
      { label: 'Blog', href: '/blog/' },
    ],
  },
  { label: 'About', href: '/about/' },
];
