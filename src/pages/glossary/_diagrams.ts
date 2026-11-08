// Glossary diagram specs (not a route). Every string a diagram draws comes from the term's own
// definition or body: table cells and list items are parsed straight out of the body HTML, and
// every hand-picked phrase is checked against the copy at build time (a phrase the copy does not
// contain fails the build), so nothing is reworded or invented.
import type { CompareProps, CycleProps, FlowProps, FunnelProps } from '../../kit/diagram/types';
import type { Term } from '../../data/glossary';

export type Concept =
  | ({ kind: 'flow' } & FlowProps)
  | ({ kind: 'compare' } & CompareProps)
  | ({ kind: 'cycle' } & CycleProps)
  | ({ kind: 'funnel' } & FunnelProps);

const ENT: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
/** Body HTML to plain text (tags out, entities decoded, whitespace collapsed). */
export const plain = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e) => ENT[e]).replace(/\s+/g, ' ').trim();
/** Upper-case the first letter (a phrase lifted from mid-sentence). */
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "CAC (Customer Acquisition Cost)" -> { name: "CAC", expansion: "Customer Acquisition Cost" }. */
export function splitTerm(term: string) {
  const m = /^(.*?)\s*\((.+)\)\s*$/.exec(term);
  return m ? { name: m[1], expansion: m[2] } : { name: term, expansion: undefined };
}

/** Throw unless the term's own copy contains this phrase (case-insensitive). */
function from(t: Term, phrase: string): string {
  const copy = plain(`${t.definition} ${t.body ?? ''}`).toLowerCase();
  if (!copy.includes(phrase.toLowerCase())) {
    throw new Error(`[glossary diagram] "${phrase}" is not in the copy of /glossary/${t.slug}/`);
  }
  return cap(phrase);
}

/** The first table in the body: header cells and body rows, as plain text. */
function table(t: Term) {
  const html = /<table[\s\S]*?<\/table>/.exec(t.body ?? '')?.[0];
  if (!html) throw new Error(`[glossary diagram] /glossary/${t.slug}/ has no table`);
  const cells = (row: string) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((m) => plain(m[1]));
  const head = cells(/<thead>([\s\S]*?)<\/thead>/.exec(html)?.[1] ?? '');
  const rows = [...(/<tbody>([\s\S]*?)<\/tbody>/.exec(html)?.[1] ?? '').matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) => cells(m[1]));
  return { head, rows };
}

/** The bold lead-ins of the first <ol> in the body ("Search the public lookup."), stop dropped. */
function olLeads(t: Term) {
  const ol = /<ol>([\s\S]*?)<\/ol>/.exec(t.body ?? '')?.[1] ?? '';
  return [...ol.matchAll(/<li><strong>([\s\S]*?)<\/strong>/g)].map((m) => plain(m[1]).replace(/\.$/, ''));
}

/** Table with two columns (claim pairs): one side per column, rows kept in order. */
function twoColumn(t: Term, caption: string, tones: ['ok' | 'bad', 'ok' | 'bad']): Concept {
  const { head, rows } = table(t);
  if (head.length !== 2 || rows.some((r) => r.length !== 2)) throw new Error(`[glossary diagram] /glossary/${t.slug}/ table is not two columns`);
  return {
    kind: 'compare', variant: 'split', caption,
    left: { label: head[0], tone: tones[0], items: rows.map((r) => r[0]) },
    right: { label: head[1], tone: tones[1], items: rows.map((r) => r[1]) },
  };
}

/**
 * Concept diagrams for the terms without a formula (design v2 brief 5.5). iOS ATT has none:
 * its copy explains a cause and lists three responses, but states no ordered steps.
 */
export function concept(t: Term): Concept | undefined {
  switch (t.slug) {
    case 'legitscript-certification': {
      const leads = olLeads(t);
      if (leads.length !== 4) throw new Error('[glossary diagram] LegitScript "How to check" list changed');
      return {
        kind: 'flow', orientation: 'column',
        caption: 'How to check a LegitScript certification, in the order this page lists the steps.',
        nodes: leads.map((label, i) => (i === 1
          ? {
              label,
              sub: from(t, 'renewed annually'),
              branches: [
                { label: from(t, 'a current “Certified” status'), tone: 'ok' },
                { label: from(t, 'expired, suspended, or “no longer certified”'), tone: 'bad' },
              ],
            }
          : { label })),
      };
    }
    case 'structure-function-claim':
      return twoColumn(t, 'Permitted structure/function wording beside the disease claim it must not become, row by row from the table on this page.', ['ok', 'bad']);
    case 'hipaa-compliant-marketing':
      return twoColumn(t, 'Non-compliant and compliant tracking, row by row from the table on this page.', ['bad', 'ok']);
    case 'capi':
      return {
        kind: 'flow', orientation: 'column',
        caption: 'How CAPI recovers a conversion the browser pixel missed while sending only the minimum, as this page describes it.',
        nodes: [
          { label: from(t, 'your server records the conversion'), sub: from(t, 'alongside the browser pixel, not instead of it') },
          { label: from(t, 'you choose which fields are sent'), sub: from(t, 'event name, value, and a hashed identifier') },
          { label: from(t, 'both send the same event'), sub: from(t, 'carrying a shared event_id') },
          { label: from(t, 'Meta deduplicates'), sub: from(t, 'a conversion seen by both is counted once'), tone: 'ok' },
        ],
      };
    case 'creative-testing':
      return {
        kind: 'cycle',
        caption: 'Creative testing as a pipeline that keeps running: launch, measure, scale, and rotate as winners fatigue.',
        center: from(t, 'a volume discipline'),
        steps: [
          { label: from(t, 'launching many ad variants'), detail: from(t, 'build the angle library on compliant, claims-safe messaging') },
          { label: from(t, 'measuring performance against clean benchmarks'), detail: from(t, 'judge them on hook rate and CTR first and CAC once volume lands') },
          { label: from(t, 'scaling only the winners'), detail: from(t, 'kill the low-hook variants early') },
          { label: from(t, 'creative fatigue'), detail: from(t, 'rotation is the cure') },
        ],
      };
    case 'quiz-funnel':
      return {
        kind: 'funnel', scale: 'uniform',
        caption: 'A quiz funnel from lander visitor to recommendation, with the internal bars from this page. Not to scale.',
        stages: [
          { label: from(t, 'lander visitors') },
          { label: from(t, 'start the quiz'), note: from(t, 'above 25% of lander visitors starting the flow') },
          { label: from(t, 'completed intakes'), note: from(t, 'above 50% completing it') },
          { label: from(t, 'personalized recommendation') },
        ],
      };
    default:
      return undefined;
  }
}

/**
 * The Equation card's worked example: only a string the body prints verbatim. Marked
 * illustrative when the paragraph that holds it calls its numbers illustrative.
 */
export function workedExample(t: Term) {
  if (!t.example) return undefined;
  const para = [...(t.body ?? '').matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1]).find((p) => p.includes(t.example!));
  if (!para) throw new Error(`[glossary] example "${t.example}" is not printed in the body of /glossary/${t.slug}/`);
  return { example: t.example, illustrative: /illustrative/i.test(para) };
}

/** Undirected links between live terms, from each entry's related[] (deduplicated). */
export function relatedEdges(terms: Term[]) {
  const live = new Set(terms.map((t) => t.slug));
  const seen = new Set<string>();
  const edges: [string, string][] = [];
  for (const t of terms) {
    for (const r of t.related ?? []) {
      if (!live.has(r) || r === t.slug) continue;
      const key = [t.slug, r].sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push(key.split('|') as [string, string]);
    }
  }
  return edges;
}
