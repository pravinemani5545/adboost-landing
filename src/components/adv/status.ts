// Ad policy status: one tone per status, the same mapping the OG cards use
// (_og/genog.mjs TONE), so badges, diagrams and share cards agree and every
// status has its own colour. The data never ranks the statuses: legends list
// them in STATUS_LABEL order, never as a ladder.
import { STATUS_LABEL, type AdPolicy, type Platform, type PolicyStatus } from '../../data/adPolicies';
import type { Tone } from '../../kit/diagram/types';

export const STATUS_TONE: Record<PolicyStatus, Tone> = {
  allowed: 'ok',
  restricted: 'warn',
  cert: 'accent',
  prohibited: 'bad',
};

export const STATUS_LEGEND = (Object.keys(STATUS_LABEL) as PolicyStatus[]).map((s) => ({
  level: STATUS_TONE[s],
  label: STATUS_LABEL[s],
}));

export const PLATFORMS: Platform[] = ['Meta', 'Google', 'TikTok'];

export const policyHref = (p: Pick<AdPolicy, 'slug'>) => `/advertising/${p.slug}/`;

/** "2026-10-30" -> "October 30, 2026"; "2026-07" -> "July 2026" (a platform's month, no day). */
export const fmtDay = (d: string) =>
  d.length === 7
    ? new Date(`${d}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Plain text of a trusted HTML fragment from the data files (tags dropped, entities kept as typed). */
export const stripTags = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** External links inside a trusted HTML fragment, in order, deduplicated by URL. */
export function linksIn(html: string): { label: string; url: string }[] {
  const out = new Map<string, string>();
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g)) {
    if (!out.has(m[1])) out.set(m[1], stripTags(m[2]));
  }
  return [...out].map(([url, label]) => ({ url, label }));
}
