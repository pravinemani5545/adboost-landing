// Release gates and content dates for every non-blog URL. Blog posts use their
// own frontmatter instead (pubDate, draft, updatedDate; see src/lib/blog.ts).
//
// src/data/pages.json maps a URL path ("/advertising/meta/") to:
//   publish  YYYY-MM-DD  first day the page is built (UTC); before it, no route
//   updated  YYYY-MM-DD  last significant content change: sitemap lastmod, the
//                        visible "Updated" label and Article dateModified
//   draft    true        never built, whatever the date
// A path with no entry is an ordinary live page. Only set `updated` when the
// page's own content changes; a title, description or link-only edit keeps it.
//
// PREVIEW_ALL=1 builds every gated page and post (drafts and future dates) for
// review. astro.config.mjs refuses it on a Vercel production build.
import pages from '../data/pages.json';

export interface PageEntry {
  publish?: string;
  updated?: string;
  draft?: boolean;
}

export const PAGES: Record<string, PageEntry> = pages;
export const PREVIEW_ALL = process.env.PREVIEW_ALL === '1';

const dayStart = (d: string) => Date.parse(`${d}T00:00:00Z`);

/** Whether a non-blog path is built in this build. */
export function isLive(path: string, now = Date.now()): boolean {
  if (PREVIEW_ALL) return true;
  const e = PAGES[path];
  if (!e) return true;
  if (e.draft) return false;
  return !e.publish || dayStart(e.publish) <= now;
}

/** Paths listed in pages.json that this build does not publish. */
export function gatedPaths(now = Date.now()): string[] {
  return Object.keys(PAGES).filter((p) => !isLive(p, now));
}

/** The page's content date (YYYY-MM-DD): `updated`, else `publish`. */
export function pageDate(path: string): string | undefined {
  const e = PAGES[path];
  return e?.updated ?? e?.publish;
}
