// Layout plan for the Health industry pages (src/pages/industries/[slug].astro), the port of
// adboost-media src/components/industry/plan.ts.
//
// The copy lives in src/data/verticals.ts and src/data/vertical-playbooks.ts and is rendered as
// it is. This file only decides how each part is drawn: which real ad creative (if any) frames
// the hero, which chips float on it, which moments of the market paragraph mark the timeline,
// which drawing sits beside each growth-playbook step and which phrases of the ad-rules callout
// the review panel flags.
//
// Every visible word here is a phrase copied out of the same page (a segment, a platform status,
// a sentence of the market paragraph, a channel or hook the playbook names, a phrase of the
// callout). checkPlan() fails the build when one is not found word for word in the page's copy,
// so a copy edit can never leave a label behind that the page no longer says. Nothing here may
// add a claim, a number, a client or a result.

import type { Vertical } from '../../data/verticals';
import type { Playbook } from '../../data/vertical-playbooks';

export type FlagTone = 'bad' | 'warn' | 'ok' | 'info';

/** A drawing beside one growth-playbook step (StepArt.astro). */
export type StepArt =
  /** the channels the step names, each with the role it gives them; bars are shapes */
  | { kind: 'mix'; rows: { name: string; role?: string; icon: string; tone?: 'off' }[] }
  /** a search box with the queries the step quotes */
  | { kind: 'search'; queries: string[] }
  /** ad tiles carrying the hooks the step quotes (shapes when it quotes none) */
  | { kind: 'hooks'; hooks: string[] }
  /** the step's own chain as connected stages (the pathway, or a chain the step names) */
  | { kind: 'flow'; stages: string[] }
  /** a retention curve with the moment the step names */
  | { kind: 'curve'; note: string }
  /** revenue layers the step names, stacked */
  | { kind: 'stack'; layers: string[] }
  /** a repeat cycle with the cadence the step names */
  | { kind: 'cycle'; center: string; nodes: string[] };

export interface IndustryPlan {
  /** a real ad creative from public/ads that matches the vertical (framed as a phone feed card) */
  creative?: string;
  /** no creative: what the hero phone shows (the pathway as an intake, or a booking calendar) */
  phone?: { kind: 'intake' } | { kind: 'booking'; label: string };
  /** one segment from the page's own chips, floated on the hero */
  segment: string;
  /** moments of the market paragraph, in time order; `when` and `text` are both quoted from it */
  timeline: { when: string; text: string }[];
  /** one drawing per growth-playbook step */
  steps: StepArt[];
  /** phrases of the "Watch for this" callout, each with a mark */
  flags: { text: string; tone: FlagTone }[];
  /** a drawing under the answer of a buyer question that has no sources or table, by question id */
  questions?: Record<string, StepArt>;
  /** the hub card's glyph (Icon.astro) */
  glyph: string;
}

export const PLANS: Record<string, IndustryPlan> = {
  'glp-1-weight-loss': {
    creative: '/ads/vnella.webp',
    segment: 'Oral GLP-1 (needle-averse)',
    timeline: [
      { when: '2024', text: 'up from 6M in 2024' },
      { when: '2026', text: 'Roughly 10 million Americans are on branded GLP-1s in 2026' },
      { when: '2026', text: 'Lilly (LillyDirect) and Novo (NovoCare) launched cash-pay programs' },
      { when: '2030', text: 'J.P. Morgan projecting 30M US patients' },
    ],
    steps: [
      { kind: 'mix', rows: [
        { name: 'Meta', role: 'scaled DTC weight-loss acquisition', icon: 'feed' },
        { name: 'Google', role: 'high-intent branded demand', icon: 'search' },
        { name: 'TikTok', role: 'top-of-funnel education', icon: 'video' },
      ] },
      { kind: 'hooks', hooks: ['do you qualify?', 'relatable UGC testimonials', 'cost/access reframes'] },
      { kind: 'flow', stages: [] },
      { kind: 'curve', note: 'the steepest churn in the first 3 months' },
    ],
    flags: [
      { text: 'promise a set result in a set time without qualifiers', tone: 'bad' },
      { text: 'attack how someone looks', tone: 'bad' },
      { text: 'naming the drug puts the ad under its prescription rules', tone: 'info' },
      { text: 'we still keep transformation imagery out of Rx programs', tone: 'warn' },
    ],
    questions: {
      retention: { kind: 'stack', layers: ['proactive coaching on side effects', 'slower titration', 'anti-nausea support', 'plateau and maintenance education'] },
    },
    glyph: 'scale',
  },
  telehealth: {
    creative: '/ads/sweating.webp',
    segment: 'Dermatology / skincare',
    timeline: [
      { when: '2025', text: 'The US telehealth market reached ~$52.8B in 2025' },
      { when: 'Dec 31, 2025', text: 'the DEA/HHS issued a fourth extension' },
      { when: 'Dec 31, 2026', text: 'a one-year regulatory window that could tighten overnight' },
      { when: '2030', text: 'DTC subscription telehealth growing fastest at ~30% CAGR toward $9.5B by 2030' },
    ],
    steps: [
      { kind: 'mix', rows: [
        { name: 'Google', role: 'captures demand', icon: 'search' },
        { name: 'Meta', role: 'creates it', icon: 'feed' },
        { name: 'TikTok', role: 'fuels the top', icon: 'video' },
      ] },
      { kind: 'hooks', hooks: ['skip the waiting room', 'discreet packaging', 'online visit to prescription in 24 hours'] },
      { kind: 'flow', stages: [] },
      { kind: 'stack', layers: ['30/90-day auto-refill', 'stack conditions', 'cross-sell across the lifecycle'] },
    ],
    flags: [
      { text: 'Prescription and “Rx” language', tone: 'warn' },
      { text: 'personal-health targeting', tone: 'bad' },
      { text: 'HIPAA-adjacent claims', tone: 'bad' },
      { text: 'Google requires LegitScript certification', tone: 'info' },
    ],
    questions: {
      'landing-page': { kind: 'flow', stages: ['condition-specific landing page', 'matching quiz', 'low-friction first visit', 'auto-refill membership'] },
      measure: { kind: 'flow', stages: ['ad click', 'quiz', 'consult', 'prescription', 'first refill'] },
    },
    glyph: 'video',
  },
  'supplements-dtc': {
    creative: '/ads/mentaid.webp',
    segment: 'Gut health / probiotics',
    timeline: [
      { when: 'since 2021', text: 'blended DTC CAC has risen 40–60% since 2021' },
      { when: '2025–2026', text: 'The global supplements market sits at ~$210–228B in 2025–2026' },
      { when: 'Feb 2026', text: '~$784M supplement GMV in the year ending Feb 2026' },
      { when: '2026', text: 'Winners default to subscription and go omnichannel' },
    ],
    steps: [
      { kind: 'mix', rows: [
        { name: 'Meta', role: 'the workhorse', icon: 'feed' },
        { name: 'TikTok Shop', role: 'the growth engine', icon: 'video' },
        { name: 'Amazon', role: 'the closer', icon: 'cart' },
      ] },
      { kind: 'hooks', hooks: ['supports gut health', 'ingredient-education', 'founder-story'] },
      { kind: 'flow', stages: ['find your formula', 'subscribe-and-save', 'post-purchase upsells'] },
      { kind: 'curve', note: '44% of cancellations happen in the first 90 days' },
    ],
    flags: [
      { text: 'Disease claims (“treats,” “cures,” “prevents”)', tone: 'bad' },
      { text: 'unsubstantiated structure/function claims', tone: 'bad' },
      { text: 'testimonials without disclaimers', tone: 'warn' },
      { text: 'Structure/function claims need the FDA disclaimer', tone: 'info' },
    ],
    glyph: 'bottle',
  },
  'trt-hormone': {
    phone: { kind: 'intake' },
    segment: 'Women’s HRT / menopause',
    timeline: [
      { when: '2025', text: 'Hims reporting 2.4M+ subscribers in 2025' },
      { when: '2026', text: 'the FDA removed testosterone’s cardiovascular black-box warning' },
      { when: 'Dec 31, 2026', text: 'keeps the no-prior-exam pathway open through Dec 31, 2026' },
      { when: 'Schedule III', text: 'prescribing still legally requires a synchronous video visit' },
    ],
    steps: [
      { kind: 'mix', rows: [
        { name: 'Google Search', role: 'high-intent queries', icon: 'search' },
        { name: 'YouTube', role: 'pre-roll', icon: 'video' },
        { name: 'Podcast/influencer', role: 'the education narrative', icon: 'mic' },
        { name: 'Meta', role: 'a minefield', icon: 'feed', tone: 'off' },
      ] },
      { kind: 'hooks', hooks: ['not feeling like yourself at 40', 'find out if your levels are low'] },
      { kind: 'flow', stages: [] },
      { kind: 'cycle', center: 'ongoing-to-lifelong', nodes: ['baseline', '~6–8 week titration', 'then quarterly'] },
    ],
    flags: [
      { text: 'Testosterone and hormone keywords trigger automatic review', tone: 'warn' },
      { text: 'Prescription drug promotion rules apply', tone: 'info' },
      { text: 'claims about virility, performance, or body composition are high-risk', tone: 'bad' },
    ],
    questions: {
      channels: { kind: 'mix', rows: [
        { name: 'Google Search', role: 'testosterone testing or a clinic', icon: 'search' },
        { name: 'YouTube pre-roll', role: 'the education story', icon: 'video' },
        { name: 'podcasts', role: 'men’s health, fitness and longevity', icon: 'mic' },
        { name: 'SEO, content and referral', icon: 'doc' },
      ] },
    },
    glyph: 'vial',
  },
  peptides: {
    phone: { kind: 'intake' },
    segment: 'Metabolic (AOD-9604)',
    timeline: [
      { when: '2025', text: 'The peptide therapeutics market is ~$140B in 2025' },
      { when: 'YoY', text: '"cost of peptide therapy" up ~300% YoY' },
      { when: 'April 2026', text: 'FDA pulled BPC-157/TB-500 out in April 2026' },
      { when: 'July 2026', text: 'a July 2026 review is pending' },
    ],
    steps: [
      { kind: 'mix', rows: [
        { name: 'education-led SEO', icon: 'search' },
        { name: 'practitioner/podcast influencers', icon: 'mic' },
        { name: 'email/SMS', icon: 'mail' },
        { name: 'community (Reddit, Discord)', icon: 'users' },
        { name: 'paid social', role: 'top-of-funnel amplification only', icon: 'feed', tone: 'off' },
      ] },
      { kind: 'search', queries: ['BPC-157 for tendon recovery', 'sermorelin vs CJC-1295', 'peptide therapy cost'] },
      { kind: 'flow', stages: [] },
      { kind: 'stack', layers: ['auto-refill subscriptions', 'protocol/stack bundles', 'cycling reminders', 'lab-retest touchpoints'] },
    ],
    flags: [
      { text: 'the same ad-policy restrictions as hormones', tone: 'warn' },
      { text: 'FDA compounding/regulatory scrutiny', tone: 'warn' },
      { text: 'Health claims are high-risk', tone: 'bad' },
    ],
    questions: {
      content: { kind: 'search', queries: ['what a peptide is used for in recovery', 'how two peptides compare', 'what therapy costs'] },
      trust: { kind: 'stack', layers: ['third-party certificates of analysis', 'the 503A or 503B pharmacy', 'a licensed prescriber'] },
      refills: { kind: 'cycle', center: 'second through tenth order', nodes: ['auto-refill subscriptions', 'protocol bundles', 'cycle reminders', 'lab retest touchpoints'] },
    },
    glyph: 'syringe',
  },
  'med-spa': {
    phone: { kind: 'intake' },
    segment: 'Laser & skin',
    timeline: [
      { when: 'since 2022', text: 'GLP-1/semaglutide programs have exploded 340% since 2022' },
      { when: 'now', text: 'The US medical aesthetics industry now exceeds $17B' },
      { when: 'YoY', text: '~8,000–12,000 med spas compounding ~14% YoY' },
      { when: '2026', text: 'pulling a younger "prejuvenation" cohort into the funnel' },
    ],
    steps: [
      { kind: 'mix', rows: [
        { name: 'Google Search', role: 'direct-response booking', icon: 'search' },
        { name: 'Meta', role: 'manufacture demand', icon: 'feed' },
        { name: 'Google Business Profile', role: 'the highest-leverage owned asset', icon: 'pin' },
      ] },
      { kind: 'hooks', hooks: [] },
      { kind: 'flow', stages: [] },
      { kind: 'cycle', center: '3–4 visits/year', nodes: ['neurotoxin wears off every 3–4 months', 'memberships', 'aesthetics memberships'] },
    ],
    flags: [
      { text: 'Meta allows before-and-after images for cosmetic procedures', tone: 'ok' },
      { text: 'still bans statements that attack how someone looks', tone: 'bad' },
      { text: 'Google treats Botox, Dysport and Xeomin as restricted prescription drug terms', tone: 'warn' },
      { text: 'High-intent local keywords are expensive and competitive', tone: 'info' },
    ],
    questions: {
      'booked-visits': { kind: 'flow', stages: ['speed to lead', 'show rate', 'consult-to-treatment conversion'] },
    },
    glyph: 'spark',
  },
  'mental-health': {
    phone: { kind: 'intake' },
    segment: 'Telepsychiatry & med management',
    timeline: [
      { when: '2025', text: 'The US telepsychiatry market hit ~$27.7B in 2025' },
      { when: 'Dec 2025', text: 'the DEA/HHS issued a fourth extension' },
      { when: 'Dec 31, 2026', text: 'legal without an in-person visit through Dec 31, 2026' },
      { when: '2030', text: 'projected to reach $64.5B by 2030' },
    ],
    steps: [
      { kind: 'search', queries: ['online therapist near me', 'psychiatrist that takes my insurance', 'ADHD treatment online'] },
      { kind: 'mix', rows: [
        { name: 'Meta/Instagram', role: 'top-of-funnel awareness', icon: 'feed' },
        { name: 'quiz, email', role: 'first-party data capture', icon: 'mail' },
      ] },
      { kind: 'hooks', hooks: ['Covered by your insurance - check in 60 seconds', 'First appointment in days, not months', 'You don’t have to be in crisis to get help'] },
      { kind: 'flow', stages: [] },
    ],
    flags: [
      { text: 'Controlled-substance (stimulant/ADHD) promotion is heavily restricted', tone: 'warn' },
      { text: 'sensitive-health personalization is prohibited', tone: 'bad' },
      { text: 'mental-health claims are policed', tone: 'warn' },
    ],
    questions: {
      'provider-supply': { kind: 'stack', layers: ['licensed providers', 'open appointment slots by state', 'add providers before raising budgets'] },
    },
    glyph: 'chat',
  },
  longevity: {
    creative: '/ads/alveos.webp',
    segment: 'IV therapy & NAD+',
    timeline: [
      { when: '2025', text: 'The core longevity services market sits at ~$27.6B in 2025' },
      { when: '2026', text: 'a validated DTC membership model plus a flood of capital' },
      { when: '2026', text: 'scalable, mainstream consumer demand' },
      { when: '2035', text: 'projected to reach ~$67B by 2035' },
    ],
    steps: [
      { kind: 'mix', rows: [
        { name: 'Meta (Instagram/Reels)', role: 'the volume workhorse', icon: 'feed' },
        { name: 'YouTube', role: 'education-heavy', icon: 'video' },
        { name: 'long-form podcasts', role: 'high-consideration purchase', icon: 'mic' },
        { name: 'Google Search', role: 'bottom-funnel intent', icon: 'search' },
      ] },
      { kind: 'hooks', hooks: ['your bloodwork tells the truth', 'know your biological age', 'optimize, don’t just treat'] },
      { kind: 'flow', stages: ['blood panel or biomarker test', 'recurring membership', 'high-AOV concierge upsells'] },
      { kind: 'cycle', center: 'retesting cadence', nodes: ['annual membership renewal', 'quarterly/biannual retesting', 'recurring peptide/TRT/NAD+/supplement fulfillment'] },
    ],
    flags: [
      { text: 'Anti-aging and longevity health claims are policed', tone: 'warn' },
      { text: '“reverse aging” language is high-risk', tone: 'bad' },
      { text: 'affluent-audience targeting carries above-baseline CPMs', tone: 'info' },
      { text: 'Substantiation matters', tone: 'ok' },
    ],
    questions: {
      channels: { kind: 'mix', rows: [
        { name: 'Instagram', role: 'reach among affluent 40 to 60 year olds', icon: 'feed' },
        { name: 'YouTube', role: 'education', icon: 'video' },
        { name: 'long-form podcasts', role: 'education', icon: 'mic' },
        { name: 'Google Search', role: 'people ready to buy', icon: 'search' },
      ] },
    },
    glyph: 'pulse',
  },
  'fertility-ivf': {
    phone: { kind: 'booking', label: 'booked consultation' },
    segment: 'IUI (lower-cost on-ramp)',
    timeline: [
      { when: 'two years', text: 'employer coverage has climbed ~33% in two years' },
      { when: '2025', text: 'The global fertility services market reached ~$51–55B in 2025' },
      { when: 'Jan 2026', text: 'California’s SB 729 IVF mandate took effect Jan 2026' },
      { when: '2030–2032', text: 'growing 7.5–8.3% CAGR toward ~$70–90B by 2030–2032' },
    ],
    steps: [
      { kind: 'search', queries: ['IVF clinic near me', 'egg freezing cost'] },
      { kind: 'hooks', hooks: ['Start your family with confidence', 'We see you', 'a low-friction first consult'] },
      { kind: 'flow', stages: ['booked consultation', 'transparent financing', 'long-window nurture'] },
      { kind: 'stack', layers: ['multiple cycles', 'frozen-embryo transfers', 'sibling journeys', 'reviews and referrals'] },
    ],
    flags: [
      { text: 'Sensitive personal-health targeting is prohibited', tone: 'bad' },
      { text: 'success-rate claims are regulated', tone: 'warn' },
      { text: 'emotionally manipulative creative draws scrutiny', tone: 'warn' },
      { text: 'Substantiated, compassionate messaging wins', tone: 'ok' },
    ],
    questions: {
      measure: { kind: 'flow', stages: ['cost per booked consult', 'consult show rate', 'consult-to-treatment conversion', 'cost per started cycle'] },
      nurture: { kind: 'stack', layers: ['welcome series', 'pre-education content', 'seminars or webinars', 'financing and benefits guidance'] },
    },
    glyph: 'heart2',
  },
};

/** Every visible label of a drawing. */
export const labelsOf = (s: StepArt): string[] =>
  s.kind === 'mix' ? s.rows.flatMap((r) => [r.name, ...(r.role ? [r.role] : [])])
  : s.kind === 'search' ? s.queries
  : s.kind === 'hooks' ? s.hooks
  : s.kind === 'flow' ? s.stages
  : s.kind === 'curve' ? [s.note]
  : s.kind === 'stack' ? s.layers
  : [s.center, ...s.nodes];

/** Capitalised first letter, as the pathway stages are printed (the old Flow did the same). */
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Every label of a vertical's plan, checked against the copy it restates. Throws (failing the
 * build) on the first label that is no longer printed word for word on the page.
 */
export function checkPlan(v: Vertical, pb: Playbook, plan: IndustryPlan): void {
  const fail = (what: string, text: string) => {
    throw new Error(`[industries/${v.slug}] plan.ts ${what} "${text}" is not in the page's copy`);
  };
  const has = (hay: string, needle: string) => hay.includes(needle);
  if (!pb.subSegments.includes(plan.segment)) fail('segment', plan.segment);
  for (const t of plan.timeline) {
    if (!has(pb.marketContext, t.when)) fail('timeline date', t.when);
    if (!has(pb.marketContext, t.text)) fail('timeline text', t.text);
  }
  if (plan.steps.length !== pb.growthPlaybook.length) fail('steps count', String(plan.steps.length));
  plan.steps.forEach((s, i) => {
    const step = `${pb.growthPlaybook[i].h} ${pb.growthPlaybook[i].p}`;
    for (const w of labelsOf(s)) if (!has(step, w)) fail(`step ${i + 1} label`, w);
    if (s.kind === 'flow' && !s.stages.length && !pb.pathway?.length) fail(`step ${i + 1} flow`, 'pathway');
  });
  for (const f of plan.flags) if (!has(v.adLandmine, f.text)) fail('flag', f.text);
  for (const [id, art] of Object.entries(plan.questions ?? {})) {
    const q = pb.questions.find((x) => x.id === id);
    if (!q) fail('question', id);
    const text = q!.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    for (const w of labelsOf(art)) if (!has(text, w)) fail(`question ${id} label`, w);
  }
  if (plan.phone?.kind === 'intake' && !pb.pathway?.length) fail('phone', 'pathway');
  if (plan.phone?.kind === 'booking' && !pb.growthPlaybook.some((s) => has(s.p, plan.phone!.kind === 'booking' ? plan.phone!.label : ''))) fail('phone', plan.phone.label);
}
