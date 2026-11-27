// The severity scale in each rule sheet's #enforcement band (src/family/adrules/SeverityScale.astro).
// Each step is a phrase copied verbatim from that sheet's own `enforcement` text, ordered from the
// first consequence the text describes to the most serious one it names (a rejected ad, then
// repeated rejections or a warning, then the account). The scale adds no claim: scaleFor() fails
// the build if a phrase is not, word for word, in the sheet's text (so a copy edit cannot leave
// the drawing stale). Checked against all 15 sheets on 2026-11-27.
import type { AdPolicy } from '../../data/adPolicies';
import { stripTags } from '../../components/adv/status';

const SCALE: Record<string, string[]> = {
  'glp-1-on-meta': ['rejected on the same basis every time', 'repeated rejections', 'from single ads to the account'],
  'glp-1-on-google': ['Disapprovals land on individual ads and keywords', 'warns at least 7 days before suspending an account', 'suspended on detection, without warning'],
  'glp-1-on-tiktok': ['one “no diet needed” line rejects an otherwise clean healthy-lifestyle ad', 'nothing to cite in an appeal'],
  'supplements-on-meta': ['on-screen text, thumbnails and captions', 'a cure claim in a video overlay is still a claim the ad makes'],
  'supplements-on-google': ['can draw a disapproval even when the ad copy is clean', 'a warning at least 7 days before suspending an account', 'Repeat violations can end in suspension'],
  'supplements-on-tiktok': ['pass for a US audience', 'rejected when targeting expands to a market with a stricter supplement row'],
  'telehealth-on-meta': ['links to a page naming prescription medications', 'an uncertified account promoting prescription drugs in substance'],
  'telehealth-on-google': ['a warning at least 7 days before the account is suspended', 'suspends the account on detection, without prior warning'],
  'telehealth-on-tiktok': ['passes for a US audience', 'rejected when targeting adds the UK, the EU or Australia'],
  'trt-on-meta': ['an uncertified one cannot', 'steroid or muscle-building imagery adds a second problem', 'no written line to stay behind'],
  'trt-on-google': ['a batch of disapprovals', 'warns at least 7 days before suspending an account', 'suspended on detection, without warning'],
  'trt-on-tiktok': ['a rejected testosterone ad', 'nothing to cite on appeal'],
  'med-spa-on-meta': ['a question that attacks a body part', 'moves those ads under Meta’s prescription drug rules'],
  'med-spa-on-google': ['restricted-drug-term disapprovals wherever that keyword sits', 'change how the clinic’s other ads are judged'],
  'med-spa-on-tiktok': ['approved for a US audience', 'rejected when targeting adds the UK, the EU or Australia'],
};

/** The sheet's severity steps, low to high, each verbatim from its enforcement text. */
export function scaleFor(p: AdPolicy): string[] {
  const steps = SCALE[p.slug];
  if (!steps) throw new Error(`[adr enforcement] no severity scale for ${p.slug}`);
  const text = stripTags(p.enforcement).toLowerCase();
  for (const s of steps) {
    if (!text.includes(s.toLowerCase())) throw new Error(`[adr enforcement] "${s}" is not in the ${p.slug} enforcement text`);
  }
  return steps;
}
