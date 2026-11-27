// Certification Flows for the rule sheets (#cert). A Flow is drawn only where that page's own
// `certification` copy states the chain; the nodes reuse its words. Checked 2026-11-08 against
// all 15 sheets:
//   drawn  glp-1-on-meta, telehealth-on-meta, trt-on-meta  (LegitScript, Meta authorization,
//          US/Canada/New Zealand 18+, all in the copy)
//          glp-1-on-google  ("LegitScript first and then Google's certification"; "certified
//          to keyword-target them")
//          trt-on-google    ("needs LegitScript and then Google's Prescription drug services
//          certification")
//          telehealth-on-google (its own four-step <ol>, step labels as printed)
//   none   med-spa-on-meta, med-spa-on-google: "None for cosmetic procedures/services"; the chain
//          they mention covers weight-loss injections only, so a Flow would imply a requirement
//          the page says does not exist. TikTok and supplement sheets: no certification applies.
// certFlowFor() throws at build time if a node uses a word that is not in that page's copy.
import type { AdPolicy } from '../../data/adPolicies';
import type { FlowNode } from '../../kit/diagram/types';
import { stripTags } from './status';

export interface CertFlow { caption: string; nodes: FlowNode[] }

const STEPS = '/advertising/telehealth-on-google/';

const META_STD: Record<string, CertFlow> = {
  'glp-1-on-meta': {
    caption: 'Meta’s Drugs and Pharmaceuticals standard, in the order this page gives it for naming a prescription GLP-1.',
    nodes: [
      { label: 'Actively certified with LegitScript', sub: 'Telehealth providers and online pharmacies' },
      { label: 'Authorization from Meta' },
      { label: 'Target only the United States, Canada or New Zealand', sub: 'Only countries where they are certified, and only people 18 or older', tone: 'ok' },
    ],
  },
  'telehealth-on-meta': {
    caption: 'What Meta requires of online pharmacies and telehealth providers that promote prescription drugs.',
    nodes: [
      { label: 'Actively certified with LegitScript', sub: 'Online pharmacies and telehealth providers' },
      { label: 'Authorization from Meta' },
      { label: 'Target only the United States, Canada or New Zealand', sub: 'Only the countries the advertiser is certified in, and only people 18 or older', tone: 'ok' },
    ],
  },
  'trt-on-meta': {
    caption: 'To name testosterone or another hormone prescription on Meta.',
    nodes: [
      { label: 'Actively LegitScript-certified', sub: 'An online pharmacy or telehealth provider' },
      { label: 'Authorized by Meta' },
      { label: 'Only certified countries among the US, Canada and New Zealand', sub: '18+', tone: 'ok' },
    ],
  },
  'glp-1-on-google': {
    caption: 'A provider that prescribes or dispenses GLP-1s needs LegitScript first and then Google’s certification; you must be certified to keyword-target prescription drug terms. The steps are on the telehealth on Google sheet.',
    nodes: [
      { label: 'LegitScript first', sub: 'A provider that prescribes or dispenses GLP-1s' },
      { label: 'Then Google’s certification', href: STEPS },
      { label: 'Keyword-target prescription drug terms', tone: 'ok' },
    ],
  },
  'trt-on-google': {
    caption: 'Prescribing TRT online needs LegitScript and then Google’s Prescription drug services certification. The steps are on the telehealth on Google sheet.',
    nodes: [
      { label: 'LegitScript' },
      { label: 'Then Google’s Prescription drug services certification', href: STEPS },
      { label: 'Prescribing TRT online', tone: 'ok' },
    ],
  },
  'telehealth-on-google': {
    caption: 'The four certification steps below, in order.',
    nodes: [
      { label: 'Get LegitScript certification', sub: 'LegitScript’s Healthcare Merchant Certification Program' },
      { label: 'Apply for Google’s certification', sub: 'At the child-account level, not the manager (MCC) account' },
      { label: 'Target only permitted locations', sub: 'The 32 locations Google lists' },
      { label: 'Keep drug names in ads and landing pages to the US, Canada and New Zealand', tone: 'ok' },
    ],
  },
};

const words = (s: string) =>
  stripTags(s)
    .toLowerCase()
    .replace(/[’']/g, '’')
    .split(/[^a-z0-9’+-]+/)
    .map((w) => w.replace(/^[-’]+|[-’]+$/g, ''))
    .filter(Boolean);

/** The page's certification Flow, or undefined where its copy states no chain. */
export function certFlowFor(p: AdPolicy): CertFlow | undefined {
  const flow = META_STD[p.slug];
  if (!flow) return undefined;
  const vocab = new Set(words(`${p.certification} ${p.h1} ${p.answer}`));
  for (const n of flow.nodes) {
    for (const w of words(`${n.label} ${n.sub ?? ''}`)) {
      if (!vocab.has(w)) throw new Error(`[adv cert flow] "${w}" in "${n.label}" is not in the ${p.slug} copy`);
    }
  }
  return flow;
}
