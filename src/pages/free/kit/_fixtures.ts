// Fixture specs for /free/kit/diagrams/ (visual QA only; the route never builds in production).
// Drawn from the Health data files wherever a diagram has a real counterpart; the two
// with none on the site yet (Matrix2, Swimlane) say "Fixture sample" in their caption.
import type { DiagramSpec, Tone } from '../../../kit/diagram/types';
import { parsePhase } from '../../../kit/diagram/parse';
import { AD_POLICIES, STATUS_LABEL, type PolicyStatus } from '../../../data/adPolicies';
import { VERTICALS } from '../../../data/verticals';
import { SERVICES } from '../../../data/services';
import { PLAYBOOKS } from '../../../data/vertical-playbooks';
import { COMPARES } from '../../../data/compare';

export interface Fixture { id: string; label: string; spec: DiagramSpec; demo?: 'gauge' | 'marker' }

const LEVEL: Record<PolicyStatus, Tone> = { allowed: 'ok', cert: 'accent', restricted: 'warn', prohibited: 'bad' };
const STATUS_LEGEND = (Object.keys(STATUS_LABEL) as PolicyStatus[]).map((s) => ({ level: LEVEL[s], label: STATUS_LABEL[s] }));

/* ---------- data-driven pieces ---------- */
const platforms = ['Meta', 'Google', 'TikTok'] as const;
const verticalRows = [...new Set(AD_POLICIES.map((p) => p.verticalSlug))].map((vs) => {
  const ps = AD_POLICIES.filter((p) => p.verticalSlug === vs);
  return {
    label: ps[0].vertical,
    cells: platforms.map((pl) => {
      const p = ps.find((x) => x.platform === pl);
      return p
        ? { text: STATUS_LABEL[p.status], level: LEVEL[p.status], href: `/advertising/${p.slug}/`, current: p.slug === 'glp-1-on-meta' || undefined, note: p.rejectionReasons[0] }
        : null;
    }),
  };
});
const glp1 = AD_POLICIES.filter((p) => p.verticalSlug === 'glp-1-weight-loss');
const meta = AD_POLICIES.filter((p) => p.platform === 'Meta');
const withNotes = AD_POLICIES.filter((p) => p.changeNotes?.length).slice(0, 3);

const cacBars = VERTICALS.map((v) => ({
  label: v.short,
  display: v.cacDisplay,
  range: [v.cacLow, v.cacHigh] as [number, number],
  approxStart: v.cacDisplay.startsWith('~') || undefined,
  openEnd: v.cacDisplay.endsWith('+') || undefined,
  unitNote: v.cacDisplay.includes('/ cycle') ? 'per cycle' : undefined,
  highlight: v.slug === 'glp-1-weight-loss' || undefined,
  href: v.slug === 'glp-1-weight-loss' ? undefined : `/industries/${v.slug}/`,
}));

const paid = SERVICES.find((s) => s.slug === 'paid-media')!;
const creative = SERVICES.find((s) => s.slug === 'creative')!;
const play = PLAYBOOKS['glp-1-weight-loss'];
const full = COMPARES.find((c) => c.slug === 'full-service-healthcare-agency-alternative') ?? COMPARES[0];

export const FIXTURES: Fixture[] = [
  {
    id: 'flow-cert', label: 'Flow · row, pulse',
    spec: {
      kind: 'flow', pulse: true, title: 'Meta prescription drug ads',
      caption: 'Meta’s Drugs and Pharmaceuticals standard: the chain a prescription advertiser follows.',
      nodes: [
        { label: 'LegitScript certification', sub: 'Online pharmacies and telehealth providers' },
        { label: 'Meta authorization' },
        { label: 'Target US, CA or NZ, 18+', tone: 'ok' },
      ],
    },
  },
  {
    id: 'flow-check', label: 'Flow · 4 steps, branches',
    spec: {
      kind: 'flow',
      caption: 'How to check a LegitScript certification (glossary: LegitScript Certification).',
      nodes: [
        { label: 'Search the public lookup' },
        { label: 'Confirm the certification is active', branches: [
          { label: 'Certified', tone: 'ok' },
          { label: 'Expired, suspended or no longer certified', tone: 'bad' },
        ] },
        { label: 'Match the certified domain to the real landing page' },
        { label: 'Check that the badge links back to LegitScript', href: '/glossary/legitscript-certification/' },
      ],
    },
  },
  {
    id: 'tl-steps', label: 'Timeline · steps',
    spec: {
      kind: 'timeline', variant: 'steps',
      caption: 'GLP-1 growth playbook, in the order the industry page gives it.',
      phases: play.growthPlaybook.map((g) => ({ label: g.h, detail: g.p })),
    },
  },
  {
    id: 'tl-gantt', label: 'Timeline · gantt (paid media)',
    spec: {
      kind: 'timeline', variant: 'gantt', unit: 'wk', rowIdPrefix: 'pm-phase', arrive: true,
      caption: 'Paid media process, from the phase weeks on the service page. Open bars are ongoing work.',
      phases: paid.process.map((p) => parsePhase(p.phase)),
    },
  },
  {
    id: 'tl-gantt-2', label: 'Timeline · gantt, two open phases (creative)',
    spec: {
      kind: 'timeline', variant: 'gantt', unit: 'wk',
      caption: 'Creative process. "Ongoing" and "rolling" phases have no end.',
      phases: creative.process.map((p) => parsePhase(p.phase)),
    },
  },
  {
    id: 'tl-rail', label: 'Timeline · rail',
    spec: {
      kind: 'timeline', variant: 'rail',
      caption: 'Setup takes 5 days; directional movement within two weeks; the system compounds by day 31.',
      phases: [
        { meta: '5 days', label: 'Setup' },
        { meta: 'Two weeks', label: 'Directional movement on CAC or ROAS' },
        { meta: 'Day 31', label: 'The full system compounds' },
      ],
    },
  },
  {
    id: 'tl-log', label: 'Timeline · log',
    spec: {
      kind: 'timeline', variant: 'log',
      caption: 'Change notes from the rule sheets, newest first.',
      phases: withNotes.map((p) => ({
        label: p.changeNotes![0].text, meta: p.changeNotes![0].date, badge: p.changeNotes![0].kind,
        tone: p.changeNotes![0].kind === 'changed' ? 'accent' : 'warn', detail: p.h1,
      })),
    },
  },
  {
    id: 'cmp-split', label: 'Compare · split',
    spec: {
      kind: 'compare', variant: 'split',
      caption: 'GLP-1: common mistakes against what good looks like.',
      left: { label: 'Common mistakes', items: play.commonMistakes.slice(0, 3) },
      right: { label: 'What good looks like', items: play.whatGoodLooksLike },
    },
  },
  {
    id: 'cmp-tiers', label: 'Compare · split, rule vs guidance',
    spec: {
      kind: 'compare', variant: 'split',
      caption: 'Platform rule against our guidance, labelled as ours.',
      left: { label: 'Platform’s written rule', tone: 'bad', items: glp1[0].prohibited.slice(0, 3) },
      right: { label: 'Our guidance, not the platform’s', tone: 'warn', items: glp1[0].guidance?.slice(0, 2) ?? ['(none)'] },
    },
  },
  {
    id: 'cmp-diff', label: 'Compare · diff',
    spec: {
      kind: 'compare', variant: 'diff',
      caption: 'Meta Health and Wellness, July 2026: what the change log struck through and what the standard says now.',
      left: { label: 'Deleted from the standard', items: [
        'The ban on “Side-by-side comparison after the use of a product or transformation for weight loss”',
        'The line that anti-aging close-ups “should not include side-by-side comparisons”',
        'Every negative self-perception sentence',
      ] },
      right: { label: 'In the standard now', items: [
        'Allowed for 18+: “General cosmetic products, procedures, surgeries depicting before and after transformation”',
        'Banned for weight loss, weight gain and cosmetic ads: “statements of inferiority about physical appearance”',
        'Still required: 18+ targeting for dietary, health, weight loss or weight gain products and services',
      ] },
    },
  },
  {
    id: 'cmp-vs', label: 'Compare · vs (rows)',
    spec: {
      kind: 'compare', variant: 'vs',
      caption: `${full.themLabel} against AdBoost Health, row by row.`,
      left: { label: full.themLabel, items: [] },
      right: { label: 'AdBoost Health', items: [] },
      rows: full.rows.map((r) => ({ label: r.dimension, left: r.them, right: r.us })),
    },
  },
  {
    id: 'heat', label: 'HeatMatrix · 5 × 3, linked, current, notes',
    spec: {
      kind: 'heatmatrix', rowHeader: 'Vertical', cols: [...platforms],
      caption: 'Ad policy status by vertical and platform. Hover or focus a cell for its top rejection reason.',
      rows: verticalRows, legend: STATUS_LEGEND,
    },
  },
  {
    id: 'matrix2', label: 'Matrix2',
    spec: {
      kind: 'matrix2',
      caption: 'Fixture sample: quadrant layout only, not site data.',
      x: { label: 'Creative volume', low: 'Low', high: 'High' },
      y: { label: 'Monthly spend', low: 'Lower', high: 'Higher' },
      cells: [
        { label: 'Quadrant A', detail: 'High y, low x' },
        { label: 'Quadrant B', detail: 'High y, high x', tone: 'accent', current: true },
        { label: 'Quadrant C', detail: 'Low y, low x', tone: 'muted' },
        { label: 'Quadrant D', detail: 'Low y, high x' },
      ],
    },
  },
  {
    id: 'ladder', label: 'Ladder · up, current',
    spec: {
      kind: 'ladder', current: 1,
      caption: 'Monthly spend tiers and what usually breaks at each (scale-health-brand post).',
      levels: [
        { label: '$50–100K', detail: 'Creative fatigue outpaces production' },
        { label: '$100–250K', detail: 'Single-channel marginal CAC turns ugly' },
        { label: '$250–500K', detail: 'Measurement and cash flow, not ads' },
      ],
    },
  },
  {
    id: 'hub-tri', label: 'HubSpoke · triangle with edges',
    spec: {
      kind: 'hubspoke',
      caption: 'Three services run as one acquisition system; the losses sit in the gaps between them.',
      hub: { label: 'AdBoost Health', sub: 'One acquisition system' },
      spokes: [
        { label: 'Paid media', href: '/services/paid-media/' },
        { label: 'Creative', href: '/services/creative/' },
        { label: 'CRO', href: '/services/cro/' },
      ],
      edges: [
        'Creative the ad platform rejects',
        'Attribution that cannot tell which spend produced a patient',
        'Landing pages that leak the traffic media buys',
      ],
    },
  },
  {
    id: 'hub-6', label: 'HubSpoke · 6 spokes',
    spec: {
      kind: 'hubspoke',
      caption: 'Related terms around CAC and LTV in the glossary.',
      hub: { label: 'CAC', sub: 'Customer Acquisition Cost' },
      spokes: [
        { label: 'LTV', href: '/glossary/ltv/' },
        { label: 'LTV:CAC Ratio', href: '/glossary/ltv-cac-ratio/' },
        { label: 'ROAS', href: '/glossary/roas/' },
        { label: 'Blended CAC', href: '/glossary/blended-cac/' },
        { label: 'Paid CAC', href: '/glossary/paid-cac/' },
        { label: 'Churn Rate', href: '/glossary/churn-rate/' },
      ],
    },
  },
  {
    id: 'funnel-prop', label: 'Funnel · proportional, illustrative',
    spec: {
      kind: 'funnel', scale: 'proportional', illustrative: true,
      caption: 'A clinic’s month: 1,000 visits down to 24 patients who showed (healthcare lead generation post).',
      stages: [
        { label: 'Visits', display: '1,000', value: 1000 },
        { label: 'Inquiries', display: '80', value: 80, note: '8% of visits' },
        { label: 'Qualified leads', display: '60', value: 60, note: '75% of inquiries' },
        { label: 'Booked', display: '30', value: 30, note: '50% of qualified' },
        { label: 'Showed', display: '24', value: 24, note: '80% of booked' },
      ],
    },
  },
  {
    id: 'funnel-uni', label: 'Funnel · uniform',
    spec: {
      kind: 'funnel', scale: 'uniform',
      caption: 'The same stages, not to scale.',
      stages: [{ label: 'Visits' }, { label: 'Inquiries' }, { label: 'Qualified leads' }, { label: 'Booked' }, { label: 'Showed' }],
    },
  },
  {
    id: 'bars-range', label: 'Bars · range, highlight, break, approx/open, unit note',
    spec: {
      kind: 'bars', variant: 'range', prefix: '$', axisBreakAbove: 700, axisLabel: 'Fully-loaded CAC',
      caption: 'CAC range by vertical, from each industry page. The axis breaks above $700.',
      items: cacBars,
    },
  },
  {
    id: 'bars-marker', label: 'Bars · range with live marker', demo: 'marker',
    spec: {
      kind: 'bars', variant: 'range', prefix: '$', min: 0, max: 600,
      caption: 'GLP-1 CAC range with the visitor’s own CAC (fixture input).',
      items: [{ label: 'GLP-1 & weight loss', display: '$180–$400', range: [180, 400], highlight: true }],
      marker: { value: 260, display: '$260', label: 'Your CAC', live: 'fx-cac-marker' },
    },
  },
  {
    id: 'bars-bar', label: 'Bars · bar',
    spec: {
      kind: 'bars', variant: 'bar', illustrative: true, ticks: [],
      caption: 'Counts at each stage from the same worked example.',
      items: [
        { label: 'Visits', display: '1,000', value: 1000 },
        { label: 'Inquiries', display: '80', value: 80 },
        { label: 'Qualified leads', display: '60', value: 60 },
        { label: 'Booked', display: '30', value: 30, tone: 'ok' },
        { label: 'Showed', display: '24', value: 24, tone: 'ok' },
      ],
    },
  },
  {
    id: 'gauge', label: 'Gauge · bands, ticks, live', demo: 'gauge',
    spec: {
      kind: 'gauge', min: 0, max: 8, value: 3.4, display: '3.4:1', label: 'Your LTV:CAC', live: 'fx-ltv-gauge',
      caption: 'LTV:CAC against the 3:1 benchmark; far above 5:1 can mean under-investing in growth.',
      bands: [
        { to: 3, tone: 'bad', label: 'Below 3:1' },
        { to: 5, tone: 'ok', label: '3:1 or higher' },
        { to: 8, tone: 'warn', label: 'Far above 5:1' },
      ],
      ticks: [{ at: 3, label: '3:1' }, { at: 5, label: '5:1' }],
    },
  },
  {
    id: 'cycle', label: 'Cycle · 4 steps',
    spec: {
      kind: 'cycle', center: 'Creative',
      caption: 'The creative service process: testing and iteration keep running.',
      steps: creative.process.map((p) => {
        const ph = parsePhase(p.phase);
        return { label: ph.label, detail: ph.meta };
      }),
    },
  },
  {
    id: 'swimlane', label: 'Swimlane',
    spec: {
      kind: 'swimlane',
      caption: 'Fixture sample: who acts at each step of Meta’s prescription drug chain.',
      lanes: [{ id: 'adv', label: 'Advertiser' }, { id: 'ls', label: 'LegitScript' }, { id: 'meta', label: 'Meta' }],
      steps: [
        { lane: 'adv', label: 'Apply for certification' },
        { lane: 'ls', label: 'Active certification' },
        { lane: 'meta', label: 'Authorization' },
        { lane: 'adv', label: 'Target US, CA or NZ, 18+' },
      ],
    },
  },
  {
    id: 'eq', label: 'Equation · formula + example',
    spec: {
      kind: 'equation', illustrative: true, arrive: true,
      caption: 'The CAC formula and the glossary’s worked example.',
      formula: 'CAC = Total acquisition spend ÷ New customers acquired',
      example: '$50,000 ÷ 200 = $250',
    },
  },
  {
    id: 'eq-2', label: 'Equation · two equations, groups',
    spec: {
      kind: 'equation',
      caption: 'Churn and retention; contribution margin.',
      formula: 'Churn rate = Customers lost in period ÷ Customers at start of period · Retention rate = 1 − Churn rate · Contribution margin % = (Revenue − Variable costs) ÷ Revenue',
    },
  },
  {
    id: 'tree', label: 'DecisionTree',
    spec: {
      kind: 'decisiontree',
      caption: 'Which Meta standard applies to a weight-loss ad.',
      root: {
        q: 'Prescription weight-loss product?',
        yes: { result: 'Drugs and Pharmaceuticals', detail: 'LegitScript, Meta authorization, US, CA or NZ only, 18+', tone: 'accent' },
        no: { result: 'Health and Wellness', detail: '18+ targeting for weight loss or weight gain products', tone: 'ok' },
      },
      note: 'Whether the Health and Wellness imagery rules also apply to a prescription ad is not stated.',
    },
  },
  {
    id: 'strip', label: 'StatusStrip · row, current, legend',
    spec: {
      kind: 'statusstrip', arrive: true,
      caption: 'GLP-1 and weight loss across the three platforms.',
      items: glp1.map((p) => ({ label: p.platform, status: STATUS_LABEL[p.status], level: LEVEL[p.status], href: `/advertising/${p.slug}/`, current: p.platform === 'Meta' || undefined })),
      legend: STATUS_LEGEND,
    },
  },
  {
    id: 'strip-col', label: 'StatusStrip · column, compact',
    spec: {
      kind: 'statusstrip', orientation: 'column', compact: true,
      caption: 'Meta, all five verticals.',
      items: meta.map((p) => ({ label: p.vertical, status: STATUS_LABEL[p.status], level: LEVEL[p.status], href: `/advertising/${p.slug}/` })),
    },
  },
];
