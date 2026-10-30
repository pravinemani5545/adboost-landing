// Platform policy hubs (health plan N2 and N3): /advertising/meta/ and
// /advertising/google/, rendered by src/components/PlatformHub.astro through
// src/pages/advertising/[hub].astro. A hub states the platform's shared health
// rules once, with a dated change log, and links that platform's five rule
// sheets, which keep only their vertical deltas.
//
// Release dates live in src/data/pages.json ("/advertising/meta/" publishes
// 2026-12-08, "/advertising/google/" 2027-01-12). Before that date the record is
// not built, is absent from the sitemap and llms files, and every link to it is
// unwrapped to plain text. `PREVIEW_ALL=1 pnpm build` renders it early.
//
// Every policy fact must match a followup-2 claim-matrix row and link its
// primary source; see docs/WRITING-GUIDE.md.

import { isLive } from '../lib/live';
import type { AdPolicy } from './adPolicies';

export interface PlatformHub {
  slug: string;                     // URL segment: 'meta' -> /advertising/meta/
  platform: AdPolicy['platform'];   // selects the platform's rule sheets for the vertical matrix
  seoTitle: string;                 // title tag from the plan, <= 60 chars
  metaDescription: string;          // from the plan, 140-160 chars
  h1: string;
  answer: string;                   // 40-60 word answer-first summary shown under the H1
  checkedOn: string;                // YYYY-MM-DD the rules were last checked against the live policy
  sections: {
    id: string;                     // anchor, e.g. 'what-changed'
    question: string;               // the H2, phrased as the buyer's question
    html: string;                   // body (trusted HTML: p, ul, ol, table, blockquote, a)
  }[];
  changeLog: { date: string; change: string; sourceUrl: string }[];  // newest first
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
}

const ALL_HUBS: PlatformHub[] = [];

// Only hubs released in this build (src/data/pages.json gates).
export const PLATFORM_HUBS = ALL_HUBS.filter((h) => isLive(`/advertising/${h.slug}/`));

export const getPlatformHub = (slug: string) => PLATFORM_HUBS.find((h) => h.slug === slug);
