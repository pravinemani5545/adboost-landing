// Per-page Open Graph card. The OG pipeline writes 1200x630 JPEGs to
// public/og/<first-segment>/<rest-or-index>.jpg:
//   /advertising/glp-1-on-meta/  ->  /og/advertising/glp-1-on-meta.jpg
//   /advertising/                ->  /og/advertising/index.jpg
//   /glossary/cac/               ->  /og/glossary/cac.jpg
// A page whose card does not exist (yet) falls back to the site card. Checked at build time.
import fs from 'node:fs';
import path from 'node:path';

export const OG_FALLBACK = '/og/og-home.png';
const PUBLIC = path.join(process.cwd(), 'public');

export function ogImageFor(pathname: string): string {
  const parts = pathname.split(/[?#]/)[0].split('/').filter(Boolean);
  if (!parts.length) return OG_FALLBACK;
  const [first, ...rest] = parts;
  const rel = `/og/${first}/${rest.length ? rest.join('/') : 'index'}.jpg`;
  return fs.existsSync(path.join(PUBLIC, rel)) ? rel : OG_FALLBACK;
}
