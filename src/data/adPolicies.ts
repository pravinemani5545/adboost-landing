// Ad-platform compliance pages (pSEO Template B): /advertising/{vertical}-on-{platform}.
// One record per platform x vertical. Every platform claim matches a row of the
// claim matrix in seo-research/2026-10-30/followup-2.md (section 4) and links the
// platform's own policy page. Anything the platform does not say in writing is
// either left out or labelled as AdBoost's guidance (`guidance`), never stated as
// a platform rule. Rules last checked against the live policies: RULES_CHECKED_ON.
//
// Shared rules live in one place (health plan 2.2) and the sheets link them:
//   Meta:   the /advertising/ hub block #meta-july-2026, then /advertising/meta/ (N2)
//   Google: /advertising/telehealth-on-google/ owns the certification steps;
//           the hub block #google-ads, then /advertising/google/ (N3)
//   TikTok: the policy table in /blog/tiktok-ads-health-brands/
// Fields rendered as trusted HTML: certification, requirements, enforcement,
// howToComply, sections[].html, FAQ answers.

import { isLive } from '../lib/live';

export type PolicyStatus = 'allowed' | 'restricted' | 'cert' | 'prohibited';
export type Platform = 'Meta' | 'Google' | 'TikTok';

/** Year in policy titles and H1s. Roll it only after the January policy re-check (plan O26). */
export const POLICY_YEAR = 2026;
/** Day every sheet's rules were last checked against the platform's live policy text. */
export const RULES_CHECKED_ON = '2026-10-30';

export interface SourceLink { label: string; url: string }

export interface ChangeNote {
  kind: 'changed' | 'corrected' | 'clarified';  // changed = the platform changed; corrected/clarified = our page was wrong or unclear
  date: string;                                  // YYYY-MM-DD the page changed
  text: string;                                  // the vertical's own delta, 1-2 sentences
  sources?: SourceLink[];
}

export interface AdPolicy {
  slug: string;                 // e.g. "glp-1-on-meta"
  published: string;            // ISO date the page was first published (content dates: src/data/pages.json)
  vertical: string;             // display
  verticalSlug: string;         // groups related policies across platforms
  platform: Platform;
  status: PolicyStatus;
  seoTitle?: string;            // title tag; defaults to the template in [slug].astro
  metaDescription: string;      // hand-written, 140-160 chars (src/lib/seo.ts)
  h1: string;
  answer: string;               // answer-first summary under the H1, 40-60 words
  changeNotes?: ChangeNote[];   // dated notes under the answer box
  checklist?: { title: string; items: string[]; source: SourceLink };  // above-the-fold checklist
  certification: string;        // what authorization/cert is required (HTML)
  prohibited: string[];         // the platform's own written rules
  guidance?: string[];          // what AdBoost also keeps out, labelled as ours, not the platform's
  requirements: string;         // disclaimers / landing-page requirements (HTML)
  rejectionReasons: string[];   // top reasons ads get rejected
  enforcement: string;          // what enforcement looks like for this platform x vertical (HTML)
  howToComply: string;          // how compliant brands still advertise (HTML)
  sections?: { id: string; question: string; html: string }[];  // extra vertical-specific question H2s
  faq: { q: string; a: string }[];
  sources: SourceLink[];
}

export const STATUS_LABEL: Record<PolicyStatus, string> = {
  allowed: 'Allowed with conditions',
  restricted: 'Restricted',
  cert: 'Requires certification',
  prohibited: 'Prohibited',
};

/** Each platform's overview: where its shared rules are stated once (health plan 2.2, CN 3.4). */
export function platformOverview(platform: Platform): { href: string; label: string; lead: string } {
  if (platform === 'Meta') {
    return isLive('/advertising/meta/')
      ? { href: '/advertising/meta/', label: 'Meta health and wellness ad policy overview', lead: 'Meta’s July 2026 change in full, and which Meta standard applies to your ad:' }
      : { href: '/advertising/#meta-july-2026', label: 'Meta’s July 2026 change and which standard applies', lead: 'Meta’s July 2026 Health and Wellness change in full, and which Meta standard applies to your ad:' };
  }
  if (platform === 'Google') {
    return isLive('/advertising/google/')
      ? { href: '/advertising/google/', label: 'Google Ads healthcare policy overview', lead: 'Google’s shared health rules (drug terms, unapproved substances, 2026 market changes):' }
      : { href: '/advertising/#google-ads', label: 'Google’s shared health ad rules', lead: 'Google’s shared health rules (drug terms and certification):' };
  }
  return { href: '/blog/tiktok-ads-health-brands/', label: 'TikTok health ad policy at a glance', lead: 'TikTok’s rules for all five verticals, market by market:' };
}

// Primary sources (all checked 2026-10-30; see followup-2.md section 1).
const MHW = 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/';
const MDP = 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/';
const G_HEALTH = 'https://support.google.com/adspolicy/answer/176031';
const G_TERMS = 'https://support.google.com/adspolicy/answer/15595717';
const G_TERM_LIST = 'https://support.google.com/adspolicy/answer/2430794';
const G_UNAPPROVED = 'https://support.google.com/adspolicy/answer/15595718';
const G_UNAPPROVED_LIST = 'https://support.google.com/adspolicy/answer/2423645';
const G_RX_SERVICES = 'https://support.google.com/adspolicy/answer/15598647';
const G_NZ = 'https://support.google.com/adspolicy/answer/16985077';
const G_INDIA = 'https://support.google.com/adspolicy/answer/16990310';
const G_SPAIN = 'https://support.google.com/adspolicy/answer/17219940';
const G_UNRELIABLE = 'https://support.google.com/adspolicy/answer/15936857';
const G_TARGETING = 'https://support.google.com/adspolicy/answer/143465';
const TT_HEALTH = 'https://ads.tiktok.com/help/article/tiktok-ads-policy-healthcare-pharmaceuticals';
const TT_WEIGHT = 'https://ads.tiktok.com/help/article/tiktok-ads-policy-weight-management';
const TT_DANGER = 'https://ads.tiktok.com/help/article/tiktok-ads-policy-dangerous-products-or-services';
const FDA_COMPOUNDED = 'https://www.fda.gov/drugs/human-drug-compounding/fda-telehealth-companies-what-know-when-promoting-compounded-drugs';
const FDA_STRUCTURE = 'https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/structurefunction-claims';
const FDA_FILLERS = 'https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers';
const FTC_HEALTH = 'https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance';
const CFR_SCHEDULE_III = 'https://www.ecfr.gov/current/title-21/section-1308.13';
const HHS_HIPAA = 'https://www.hhs.gov/hipaa/index.html';

const TELEHEALTH_ON_GOOGLE = '<a href="/advertising/telehealth-on-google/">telehealth on Google sheet</a>';
const TIKTOK_TABLE = '<a href="/blog/tiktok-ads-health-brands/">TikTok health ad policy table</a>';

const D1 = '2026-10-30';  // deploy D1: the dated notes below
const Y = POLICY_YEAR;

const ALL_AD_POLICIES: AdPolicy[] = [
  // ───────────────────────── GLP-1 ─────────────────────────
  {
    slug: 'glp-1-on-meta',
    published: '2026-05-05',
    vertical: 'GLP-1 & weight loss',
    verticalSlug: 'glp-1-weight-loss',
    platform: 'Meta',
    status: 'cert',
    seoTitle: `GLP-1 Ads on Meta: ${Y} Policy, LegitScript & Bans`,
    metaDescription: `You can advertise GLP-1 on Meta, but naming semaglutide or tirzepatide needs LegitScript plus Meta authorization. The ${Y} rules, banned creative and fixes.`,
    h1: `Advertising GLP-1 on Meta: ${Y} rules, restrictions & what gets you banned`,
    answer: 'Naming a prescription GLP-1 such as semaglutide, tirzepatide, Wegovy or Zepbound in a Meta ad requires active LegitScript certification, Meta authorization, US, Canada or New Zealand targeting and an 18+ audience. Ads that promote a weight-loss program or telehealth service generally need no authorization, but still target 18+ and cannot attack anyone’s appearance.',
    changeNotes: [
      { kind: 'changed', date: D1, text: 'What changed in July 2026: Meta removed its ban on side-by-side weight-loss comparisons. Prescription GLP-1 ads still follow the Drugs and Pharmaceuticals rules, which say nothing about imagery; we still advise against transformation imagery for Rx weight loss (our recommendation, not Meta’s rule).', sources: [{ label: 'Meta Health and Wellness standard, change log', url: MHW }] },
    ],
    certification: 'Meta’s Drugs and Pharmaceuticals standard lets advertisers that are actively certified with LegitScript promote prescription drugs if they target only the United States, Canada or New Zealand, only countries where they are certified, and only people 18 or older, and if they obtain authorization from Meta. Telehealth providers and online pharmacies must hold the LegitScript certification; pharmaceutical manufacturers can apply through Meta’s internal review instead. Ads that educate about prescription drugs or promote telehealth services generally need no written authorization, but a weight-loss product or service ad must still target 18+ under the Health and Wellness standard.',
    prohibited: [
      'Promoting a prescription GLP-1 by name without LegitScript certification and Meta authorization',
      'Prescription drug ads targeted outside the United States, Canada or New Zealand, or outside the countries you are certified in',
      'Weight-loss product or service ads shown to anyone under 18',
      'Statements of inferiority about physical appearance: terms, descriptions or questions that attack a person’s appearance, specific body parts or hygiene',
      'Clickbait: sensational or exaggerated claims, or promises of specific outcomes within a set timeframe without disclaimers or qualifiers',
      'In weight-loss ads, close-ups that pinch fat on a body area, or claims that a wearable product alone delivers results',
    ],
    guidance: [
      'Before and after or side-by-side transformation imagery for prescription weight loss. Meta’s Drugs and Pharmaceuticals standard is silent on imagery; we still leave it out.',
      'Calling a compounded GLP-1 FDA-approved, a generic, or the same as Wegovy or Zepbound. That is an FDA and FTC issue, not a Meta rule, and FDA has warned telehealth companies about it.',
      '“Lose X lbs” headlines, even with a qualifier, for prescription programs.',
    ],
    requirements: 'Prescription drug ads must include a disclaimer to consult a licensed health professional or obtain a valid prescription, and may target only the countries the advertiser is certified in. Any result promised within a set timeframe needs a disclaimer or qualifier. Meta’s text does not say whether its Health and Wellness imagery rules also apply to a prescription GLP-1 ad: it routes prescription weight-loss products to Drugs and Pharmaceuticals, which is silent on imagery.',
    rejectionReasons: [
      'Naming the drug without active LegitScript certification and Meta authorization',
      'Targeting outside the United States, Canada or New Zealand, or under 18',
      'No consult-a-professional or valid-prescription disclaimer on an Rx ad',
      'Timed weight-loss promises with no disclaimer or qualifier',
      'Copy or questions that attack the viewer’s appearance or body',
    ],
    enforcement: 'Naming the molecule is what moves an ad from one Meta standard to another. Meta’s Health and Wellness standard sends prescription weight-loss products to its Drugs and Pharmaceuticals rules, so an ad that says “semaglutide” or “tirzepatide” is judged on certification, authorization and geography, not on the creative alone. An uncertified account that keeps naming the drug is asking to be rejected on the same basis every time, and repeated rejections can move the problem from single ads to the account.',
    howToComply: 'Certified telehealth brands: keep LegitScript active, get Meta authorization, target only the certified countries among the US, Canada and New Zealand, gate to 18+ and add the consult disclaimer. Uncertified brands: promote the program or the telehealth service generally, never the molecule, with 18+ targeting, qualified outcome language and no copy that attacks appearance. Move the clinical intake off the ad.',
    faq: [
      { q: 'Can I run before/after weight-loss ads on Meta?', a: 'Meta deleted its written ban on side-by-side weight-loss comparisons in July 2026. For non-prescription weight-loss products, ads targeted 18+ may now show people using the product and its impact, with the time taken to see results. Prescription GLP-1 ads follow the Drugs and Pharmaceuticals standard, which says nothing about imagery. We still advise against transformation imagery for Rx weight loss; that is our recommendation, not Meta’s rule.' },
      { q: 'Do I need LegitScript to advertise GLP-1 on Meta?', a: 'To name the prescription drug, yes: active LegitScript certification, Meta authorization, US, Canada or New Zealand targeting and 18+. Ads that promote a telehealth service generally, or educate about prescription drugs, need no written authorization. They still target 18+ and follow the Health and Wellness rules on appearance and outcome claims.' },
      { q: 'Can I advertise compounded semaglutide or tirzepatide on Meta?', a: `Meta’s ad standards do not mention compounded drugs. Its Drugs and Pharmaceuticals rules cover ads that promote prescription drugs: LegitScript certification, Meta authorization, US, Canada or New Zealand targeting and 18+. How you describe a compounded product is an FDA and FTC matter: <a href="${FDA_COMPOUNDED}" target="_blank" rel="noopener">FDA’s guidance for telehealth companies</a> warns against calling a compounded drug FDA-approved, a generic, or the same as an FDA-approved drug.` },
    ],
    sources: [
      { label: 'Meta: Health and Wellness ad standard (with the July 2026 change log)', url: MHW },
      { label: 'Meta: Drugs and Pharmaceuticals ad standard', url: MDP },
      { label: 'FDA: What to know when promoting compounded drugs (content current as of June 15, 2026)', url: FDA_COMPOUNDED },
    ],
  },
  {
    slug: 'glp-1-on-google',
    published: '2026-05-05',
    vertical: 'GLP-1 & weight loss',
    verticalSlug: 'glp-1-weight-loss',
    platform: 'Google',
    status: 'cert',
    seoTitle: `GLP-1 Ads on Google: ${Y} Policy & Certification Rules`,
    metaDescription: `Google allows GLP-1 drug names like semaglutide in ad text only in the US, Canada and New Zealand, and bidding on them needs certification. The ${Y} rules.`,
    h1: `Advertising GLP-1 on Google Ads: ${Y} certification & keyword rules`,
    answer: 'Google lets ads and landing pages use GLP-1 drug terms such as semaglutide, tirzepatide, Ozempic, Wegovy, Mounjaro and Zepbound only in campaigns targeting the US, Canada or New Zealand, and keyword-targeting them requires certification. Providers that prescribe need LegitScript, then Google certification. hCG for weight loss and “as effective as a prescription drug” claims are banned.',
    changeNotes: [
      { kind: 'corrected', date: D1, text: 'The US, Canada and New Zealand limit applies to drug names in ads and landing pages; certified online pharmacies and telemedicine providers may keyword-target prescription drug terms in more locations. We also removed compounded-drug rules we had attributed to Google; those are FDA and FTC matters.', sources: [{ label: 'Google: Restricted drug terms', url: G_TERMS }, { label: 'Google: Prescription drug services', url: G_RX_SERVICES }] },
    ],
    certification: `In campaigns targeting the US, Canada or New Zealand you need no certification to use prescription drug terms in ad text and landing pages, but you must be certified to keyword-target them. Outside those three countries, ads and landing pages may not use the terms for promotion, though certified online pharmacies and telemedicine providers may target them in the locations Google lists. A provider that prescribes or dispenses GLP-1s needs LegitScript first and then Google’s certification; the steps are on our ${TELEHEALTH_ON_GOOGLE}.`,
    prohibited: [
      'Prescription drug terms in ads or landing pages for campaigns outside the US, Canada and New Zealand (non-promotional uses such as regulatory warnings are permitted)',
      'Keyword-targeting GLP-1 drug terms without certification',
      'Products containing hCG in relation to weight loss or weight control',
      'Products that imply they are as effective as a prescription drug, or with names confusingly similar to one (a “natural Ozempic”)',
      'Claims of unrealistic weight loss within a specific time frame or with little effort',
      'Products on Google’s unapproved list, such as Lishou and Magic Slim Tea',
    ],
    guidance: [
      'Calling a compounded GLP-1 FDA-approved, a generic, or the same as a branded drug. Google’s healthcare pages do not mention compounded drugs; FDA warns against these claims.',
    ],
    requirements: 'Landing pages must match the ad and follow local law, with no way to obtain a prescription drug without a prescription. If you guarantee a result, Google requires a clear, easy-to-find refund policy, and testimonials that claim specific results need a visible disclaimer that results can vary.',
    rejectionReasons: [
      'Keyword-targeting a GLP-1 drug term without certification',
      'Drug names in ads or landing pages for campaigns outside the US, Canada or New Zealand',
      'Rapid or effortless weight-loss claims',
      '“Natural alternative to [drug]” or equivalence claims',
      'A prescribing flow without LegitScript and Google certification',
    ],
    enforcement: 'Disapprovals land on individual ads and keywords while the rest of the campaign keeps serving, which tempts teams into quietly resubmitting variants of the same drug-term keyword. Google separates two kinds of violation: under its Prescription drug services policy it warns at least 7 days before suspending an account, while offering prescription drugs without a prescription is treated as egregious and suspended on detection, without warning.',
    howToComply: 'Certify first if you prescribe (LegitScript, then Google). Keep any ad that names a drug in US, Canadian or New Zealand campaigns. Bid on condition and program keywords (“medical weight loss program”) unless certified, keep weight-loss claims realistic, and gate every prescription behind a genuine licensed consult.',
    faq: [
      { q: 'Can I bid on “Ozempic” or “semaglutide” keywords?', a: 'Only with certification. In the US, Canada and New Zealand anyone may use these terms in ad text and landing pages, but keyword-targeting them requires certification. Certified online pharmacies and telemedicine providers may bid on prescription drug keywords in the locations Google lists, which go beyond those three countries. Most uncertified brands bid on condition and program terms instead.' },
      { q: 'Is compounded GLP-1 advertisable on Google?', a: `Google’s healthcare pages do not mention compounded drugs, so no Google rule singles them out. The drug-term and certification rules above still apply to any ad that names semaglutide or tirzepatide. How you describe a compounded product is an FDA and FTC matter: <a href="${FDA_COMPOUNDED}" target="_blank" rel="noopener">FDA warns telehealth companies</a> against calling it FDA-approved, a generic, or the same as an approved drug.` },
    ],
    sources: [
      { label: 'Google: Restricted drug terms', url: G_TERMS },
      { label: 'Google: Prescription drug term list', url: G_TERM_LIST },
      { label: 'Google: Prescription drug services', url: G_RX_SERVICES },
      { label: 'Google: Unapproved substances', url: G_UNAPPROVED },
      { label: 'Google: Unreliable claims', url: G_UNRELIABLE },
      { label: 'FDA: What to know when promoting compounded drugs', url: FDA_COMPOUNDED },
    ],
  },
  {
    slug: 'glp-1-on-tiktok',
    published: '2026-05-08',
    vertical: 'GLP-1 & weight loss',
    verticalSlug: 'glp-1-weight-loss',
    platform: 'TikTok',
    status: 'restricted',
    metaDescription: `TikTok lists weight loss drugs as not allowed, yet may allow some Rx ads in the US and Canada with regulator approval. What GLP-1 brands can run in ${Y}.`,
    h1: `Advertising GLP-1 on TikTok: ${Y} rules by market (and what to run instead)`,
    answer: 'TikTok’s Dangerous Products policy lists drugs for weight loss as not allowed, while its Healthcare policy may allow prescription medicine in the US and Canada with regulator approval. The two conflict, and neither names GLP-1. In the UK, EU and Australia, prescription medicine is not allowed. Since September 2026, weight loss supplements may run in more markets.',
    changeNotes: [
      { kind: 'changed', date: D1, text: 'What changed in September 2026: TikTok’s Weight Management policy now lists weight loss supplements and meal replacements as possible in the US, Canada and most of Europe, 18+ with healthy lifestyle framing.', sources: [{ label: 'TikTok Weight Management policy', url: TT_WEIGHT }] },
      { kind: 'corrected', date: D1, text: 'TikTok’s policies conflict on prescription weight-loss drugs in the US and Canada. This page previously said GLP-1 ads were banned outright there and that no certification could unlock them.', sources: [{ label: 'TikTok Dangerous Products policy', url: TT_DANGER }] },
    ],
    certification: `No LegitScript-style certification applies. The prescription medicine exception (see the ${TIKTOK_TABLE}) asks for proof of approval from the regional regulator, such as the FDA or Health Canada, and 18+ targeting. Neither TikTok page names GLP-1 or says who can supply that proof. TikTok’s Asia-Pacific weight-management list covers weight loss surgical procedures (through a TikTok sales representative), supplements and meal replacements, not prescription drugs.`,
    prohibited: [
      'Drugs for the purpose of weight loss (Dangerous Products policy)',
      'Prescription medicine ads in the UK, EU, Australia and other markets outside the US, Canada and New Zealand',
      'Claims that a product alone, without diet or exercise, leads to weight loss, or that losing weight is easy or guaranteed',
      'References to unrealistic weight loss',
      'Shaming users about their bodies, suggesting an ideal body type, or promising a better life or self-image from losing weight',
      'Weight-loss claims shown to under-18s, or not framed as part of a healthy lifestyle',
    ],
    guidance: [
      'GLP-1 drug names in any TikTok ad. With TikTok’s two policies in conflict, we keep them out.',
      'Before and after imagery for weight loss. TikTok’s Weight Management page does not mention it; we leave it out.',
    ],
    requirements: 'Any weight-loss claim must target 18+ and be made through the promotion of a healthy lifestyle, subject to local licensing (Weight Management policy).',
    rejectionReasons: [
      'A prescription weight-loss ad in a market where prescription medicine is not allowed',
      'A weight-loss drug ad with no proof of regulator approval',
      '“No diet or exercise”, “easy” or “guaranteed” weight-loss language',
      'Body-shaming or ideal-body framing',
      'Weight-loss claims without 18+ targeting',
    ],
    enforcement: 'For a GLP-1 drug ad in the US or Canada there is no written rule that clearly says yes: one TikTok policy may allow prescription medicine with regulator proof, the other lists drugs for weight loss as not allowed. That leaves nothing to cite in an appeal. For everything else, the Weight Management rules are applied in every market, so one “no diet needed” line rejects an otherwise clean healthy-lifestyle ad.',
    howToComply: 'Use TikTok for GLP-1 education and demand: healthy-lifestyle content with no drug names, no unrealistic or effortless weight-loss claims and no body-shaming, targeted 18+. A non-prescription weight loss supplement or meal replacement may now run in the US, Canada and listed European markets. Capture prescription demand on Google and Meta, where the certified paths are written down.',
    faq: [
      { q: 'Can I advertise a GLP-1 program on TikTok?', a: 'Not with confidence. TikTok lists drugs for weight loss as not allowed, its prescription medicine exception for the US and Canada does not name GLP-1, and the UK, EU and Australia do not allow prescription medicine at all. Healthy-lifestyle content that names no drug is the route that clearly fits TikTok’s written rules.' },
      { q: 'What changed in TikTok’s weight management policy in September 2026?', a: 'TikTok’s Weight Management page (last updated September 2026) now lists weight loss supplements and meal replacement products as possible in the United States and Canada and in a UK and EU group (“select countries”, which the page does not list), for 18+ with healthy lifestyle framing. A July 2026 snapshot of the page had neither group. Prescription weight-loss drugs were not part of the change.' },
    ],
    sources: [
      { label: 'TikTok: Weight Management and Body Image policy (September 2026)', url: TT_WEIGHT },
      { label: 'TikTok: Healthcare and Pharmaceuticals policy (September 2026)', url: TT_HEALTH },
      { label: 'TikTok: Dangerous Products or Services policy (April 2025)', url: TT_DANGER },
    ],
  },
  // ───────────────────────── Supplements ─────────────────────────
  {
    slug: 'supplements-on-meta',
    published: '2026-05-12',
    vertical: 'Supplements & DTC',
    verticalSlug: 'supplements-dtc',
    platform: 'Meta',
    status: 'restricted',
    metaDescription: `Supplement ads on Facebook and Instagram must target 18+. Meta's ${Y} rules on cure claims, clickbait and body image, plus the FDA claim limits that apply.`,
    h1: `Advertising supplements on Meta: ${Y} claims rules & what gets rejected`,
    answer: 'Every supplement ad on Facebook and Instagram must target people 18 or older; no certification is needed. Meta bans claims to cure eleven listed incurable diseases, clickbait, timed results without a qualifier, and statements of inferiority about appearance. The structure/function line (“supports energy”, never “treats”) comes from FDA rules, not Meta’s wording.',
    changeNotes: [
      { kind: 'changed', date: D1, text: 'What changed in July 2026: Meta removed its ban on side-by-side weight-loss comparisons and added a closed list of incurable diseases that ads cannot claim to cure, a clickbait rule and a ban on statements of inferiority about appearance.', sources: [{ label: 'Meta Health and Wellness standard, change log', url: MHW }] },
      { kind: 'corrected', date: D1, text: 'Meta requires 18+ targeting for all dietary and health supplement ads, not only appearance-related ones.' },
    ],
    certification: 'None for ordinary dietary supplements. Meta’s standards name no certification for them; CBD is the exception, handled under Drugs and Pharmaceuticals. What applies to every supplement is 18+ targeting and Meta’s Health and Wellness claim rules.',
    prohibited: [
      'Claims to cure, heal or eliminate any of eleven listed diseases: diabetes, herpes, thyroid, psoriasis, Ebola, cancer, autism, Alzheimer’s, Parkinson’s, ALS and HIV (claims about treating or managing symptoms are outside this rule)',
      'Clickbait: sensational or exaggerated claims, or promises of specific outcomes within a set timeframe without disclaimers or qualifiers',
      'For weight-loss or weight-gain supplements: statements of inferiority about appearance, fat-pinching close-ups, and claims that a wearable alone delivers results',
      'Unsafe substances, products or supplements “as determined by Meta at its sole discretion” (the standard publishes no list)',
      'Targeting anyone under 18',
    ],
    guidance: [
      'Any disease claim (“treats bloating”, “prevents colds”), not just Meta’s eleven. Under FDA rules only a drug can claim to diagnose, treat, cure or prevent a disease.',
      'Anabolic steroids, ephedra, HGH or DHEA in the formula. Meta publishes no unsafe-substance list in the standard, so we treat them as out.',
      'Second-person health openers (“Struggling with your thyroid?”). We avoid them as a matter of practice.',
    ],
    requirements: `Target 18+ for every supplement ad. Qualify any time-bound result, keep the landing page’s claims consistent with the ad, and hold substantiation for every health claim before it runs, as the <a href="${FTC_HEALTH}" target="_blank" rel="noopener">FTC’s health products guidance</a> expects. US supplement labels that carry a structure/function claim also need <a href="${FDA_STRUCTURE}" target="_blank" rel="noopener">FDA’s disclaimer</a>.`,
    rejectionReasons: [
      'A cure claim for one of Meta’s listed diseases',
      'Timed results (“in 7 days”) with no disclaimer or qualifier',
      'Sensational or exaggerated health claims',
      'Copy that attacks the viewer’s appearance or body',
      'Under-18 targeting',
    ],
    enforcement: 'The July 2026 rewrite added a closed list of eleven incurable diseases that ads cannot claim to cure, and Meta’s standard names no other disease claims, so for supplements most of the claim risk sits with FDA and FTC rules rather than Meta’s standard. That makes the creative review your job: we check on-screen text, thumbnails and captions as carefully as primary text, because a cure claim in a video overlay is still a claim the ad makes.',
    howToComply: 'Lead with structure/function benefits and ingredient education (“supports gut health”) in third-person, lifestyle framing; target 18+; qualify any timed result; and keep substantiation on file with a landing page whose claims match the ad.',
    faq: [
      { q: 'What claims can I make about a supplement on Meta?', a: `Meta’s own rule is narrow: no claims to cure, heal or eliminate its eleven listed incurable diseases, no clickbait, and no timed outcomes without qualifiers. FDA goes further: a supplement may describe support for normal body function (“supports immune health”), but <a href="${FDA_STRUCTURE}" target="_blank" rel="noopener">only a drug can claim to diagnose, treat, cure or prevent a disease</a>. Hold substantiation before the claim runs.` },
      { q: 'Do all supplement ads on Meta need 18+ targeting?', a: 'Yes. Meta’s Health and Wellness standard requires ads promoting dietary, health, weight loss or weight gain products and services to target people at least 18 years old. The rule is not limited to appearance-related products, and Meta’s December 2024 version said the same. Meta exempts general food products, including protein products, from the age rule.' },
    ],
    sources: [
      { label: 'Meta: Health and Wellness ad standard (with the July 2026 change log)', url: MHW },
      { label: 'Meta: Drugs and Pharmaceuticals ad standard (CBD)', url: MDP },
      { label: 'FDA: Structure/function claims', url: FDA_STRUCTURE },
      { label: 'FTC: Health Products Compliance Guidance', url: FTC_HEALTH },
    ],
  },
  {
    slug: 'supplements-on-google',
    published: '2026-05-12',
    vertical: 'Supplements & DTC',
    verticalSlug: 'supplements-dtc',
    platform: 'Google',
    status: 'restricted',
    seoTitle: `Supplement Ads on Google: ${Y} Policy & Banned Ingredients`,
    metaDescription: `Supplements can run on Google Ads, but ephedra, hCG for weight loss, DHEA outside the US and prescription drug equivalence claims get disapproved. ${Y} rules.`,
    h1: `Advertising supplements on Google Ads: ${Y} policy & banned ingredients`,
    answer: 'Supplements can run on Google Ads; the only certification on Google’s Unapproved substances page is for CBD. What gets disapproved is ingredient- and claim-based: active pharmaceutical or dangerous ingredients, ephedra, hCG for weight loss, DHEA outside the US, drug-equivalence claims, drug look-alike names and disease claims. Google warns at least 7 days before suspending an account.',
    changeNotes: [
      { kind: 'corrected', date: D1, text: 'We added DHEA (banned outside US-targeted campaigns) and Google’s 7-day warning before suspension, and removed DMAA, “sexual-enhancement products” and “prohormones” as categories, which Google’s pages do not name.', sources: [{ label: 'Google: Unapproved substances', url: G_UNAPPROVED }] },
    ],
    checklist: {
      title: 'Google’s unapproved substances checklist',
      items: [
        'Herbal and dietary supplements with active pharmaceutical or dangerous ingredients',
        'Products that contain ephedra',
        'Products containing hCG in relation to weight loss or weight control, or promoted with anabolic steroids',
        'DHEA products, except in campaigns targeting the United States',
        'Products that imply they are as effective as prescription drugs or controlled substances',
        'Names confusingly similar to an unapproved pharmaceutical, supplement or controlled substance (Google’s list includes “SleepWell (Herbal Xanax)”)',
        'Non-government-approved products marketed as preventing, curing or treating a disease or ailment',
        'Products named on Google’s unapproved list, such as superdrol, M-Drol, Lishou and Magic Slim Tea',
      ],
      source: { label: 'Google: Unapproved substances', url: G_UNAPPROVED },
    },
    certification: 'None for ordinary dietary supplements: the only certification on Google’s Unapproved substances page is for CBD. The line is drawn by ingredient and by claim, not by credential.',
    prohibited: [
      'Claims that a supplement prevents, cures or treats a disease or ailment',
      'Claims that it works as well as a prescription drug or controlled substance',
      'Product names that echo a drug (“Herbal Xanax”)',
      'Unrealistic weight-loss claims within a specific time frame or with little effort',
      'Guaranteed results without a clear, easy-to-find refund policy',
    ],
    requirements: 'Google’s policy covers supplements with active pharmaceutical ingredients, so list every ingredient on the landing page and keep its claims consistent with the ad. Testimonials that claim specific results need a visible disclaimer that results can vary.',
    rejectionReasons: [
      'An ingredient or product on Google’s unapproved lists',
      'DHEA in a campaign targeting outside the US',
      'Disease prevention, cure or treatment claims',
      'Prescription-drug equivalence claims or drug-like product names',
      'Unrealistic or effortless weight-loss claims',
    ],
    enforcement: 'This policy is judged on the product as much as the ad, so an ingredient list on the landing page that shows a listed substance can draw a disapproval even when the ad copy is clean. Repeat violations can end in suspension, but Google states it will issue a warning at least 7 days before suspending an account under this policy, which leaves time to fix the formula page or pull the product.',
    howToComply: 'Check the formula against Google’s unapproved substances page and product list before launch; target DHEA products to the US only; make structure/function claims with substantiation; avoid drug comparisons and drug-like names; and keep the landing page’s ingredient list complete.',
    faq: [
      { q: 'Do I need certification to advertise supplements on Google?', a: 'Google names no certification for ordinary dietary supplements; the only certification on its Unapproved substances page is for CBD. The risk is ingredient- and claim-based: listed substances, drug-equivalence claims and disease claims get disapproved.' },
      { q: 'Which supplement ingredients does Google prohibit?', a: 'Its Unapproved substances page bans ephedra, hCG for weight loss, DHEA outside US-targeted campaigns, and supplements with active pharmaceutical or dangerous ingredients. Its product list also names items such as superdrol, M-Drol and Lishou. DMAA and “prohormones” as a category do not appear on the pages we checked, so check your exact product against the list.' },
    ],
    sources: [
      { label: 'Google: Unapproved substances', url: G_UNAPPROVED },
      { label: 'Google: Unapproved pharmaceuticals and supplements (product list)', url: G_UNAPPROVED_LIST },
      { label: 'Google: Unreliable claims', url: G_UNRELIABLE },
    ],
  },
  {
    slug: 'supplements-on-tiktok',
    published: '2026-05-15',
    vertical: 'Supplements & DTC',
    verticalSlug: 'supplements-dtc',
    platform: 'TikTok',
    status: 'restricted',
    seoTitle: `Supplement Ads on TikTok: ${Y} Policy & Claim Rules`,
    metaDescription: `TikTok now lists weight loss supplements as possible in the US, Canada, the UK and most EU markets for 18+ with healthy lifestyle framing. The ${Y} rules.`,
    h1: `Advertising supplements on TikTok: ${Y} policy & claim rules by market`,
    answer: 'TikTok sets supplement rules market by market. Since September 2026 its Weight Management policy lists weight loss supplements as possible in the US, Canada and a UK and EU group, for 18+ with healthy lifestyle framing. Elsewhere it varies: Australia may allow healthcare supplements for 18+, and the Albania market group does not allow dietary supplements.',
    changeNotes: [
      { kind: 'changed', date: D1, text: 'What changed in September 2026: TikTok’s Weight Management policy now lists weight loss supplements and meal replacements as possible in the US, Canada and most of Europe, 18+ with healthy lifestyle framing.', sources: [{ label: 'TikTok Weight Management policy', url: TT_WEIGHT }] },
      { kind: 'corrected', date: D1, text: 'The documentation requirements we listed (cGMP certificate, Supplement Facts label, facility registration) come from TikTok Shop’s seller rules, not TikTok’s ads policies.' },
    ],
    certification: 'TikTok’s ads policies name no certification or document pre-approval for supplements in the US, Canada or the UK and EU. Some markets ask for regulator proof instead: the Gulf market group requires proof of approval and certification from local authorities. TikTok Shop has its own seller requirements for supplements, which govern selling in the Shop, not running ads.',
    prohibited: [
      'Weight loss or muscle gain claims shown to under-18s, or not made through the promotion of a healthy lifestyle',
      'References to unrealistic weight loss or muscle gain, or claims that the product alone, without diet or exercise, delivers results',
      'Suggesting that losing weight or gaining muscle is easy or guaranteed',
      'Body-shaming, ideal-body framing, or promising a better life from a changed body',
      'Before and after comparisons for food supplements in the Gulf, Jordan, Lebanon, Pakistan, Qatar, South Africa, UAE and Turkey market groups',
      'Medicinal claims to treat, cure, heal or prevent a condition (Gulf group) and herbal remedies that claim to cure illness (Latin America)',
    ],
    guidance: [
      'Disease or cure claims in the US. TikTok’s US rules are silent, but FDA allows only drugs to claim to treat, cure or prevent a disease.',
      'Before and after imagery in the US and Canada. TikTok’s rules there say nothing about it; we leave it out.',
      'Sexual-health and mental-health claims. The TikTok pages we checked do not address them, so we treat them as high risk.',
    ],
    requirements: 'Weight loss and muscle gain claims must target 18+ and promote a healthy lifestyle, subject to local licensing. Several markets set 18+ for any supplement ad (Australia’s healthcare supplements, for example). Keep the landing page’s claims identical to the ad’s.',
    rejectionReasons: [
      'Effortless, guaranteed or unrealistic weight or muscle claims',
      'Weight claims without 18+ targeting or healthy lifestyle framing',
      'Running in a market that does not allow dietary supplements',
      'Before and after comparisons in markets that bar them for supplements',
      'Medicinal cure or treatment claims where a market bars them',
    ],
    enforcement: 'Because approval is set per market, the same supplement ad can pass for a US audience and be rejected when targeting expands to a market with a stricter supplement row. The other trigger is a single weight claim: one fat-loss or physique line brings the whole ad under the Weight Management policy’s 18+ and healthy-lifestyle rules, whatever the rest of the creative says.',
    howToComply: 'Use general wellness and structure/function benefit language, target 18+, frame any weight or muscle claim inside a healthy lifestyle, check the market row for every country you target, and keep sports nutrition to performance and lifestyle rather than physique change.',
    faq: [
      { q: 'Does TikTok require documents to run supplement ads?', a: 'TikTok’s ads policies do not list supplement documents for the US, Canada or the UK and EU. The cGMP certificate, Supplement Facts label and facility registration requirements come from TikTok Shop’s seller rules, which cover selling in the Shop. Some markets, such as the Gulf group, require proof of approval from local authorities.' },
      { q: 'Can I run a fat-burner or weight loss supplement ad on TikTok?', a: 'Since September 2026, TikTok lists weight loss supplements as possible in the US, Canada and a UK and EU group, for 18+ with healthy lifestyle framing and subject to local licensing. Claims that the product works without diet or exercise, or that results are easy, guaranteed or unrealistic, are still not allowed.' },
    ],
    sources: [
      { label: 'TikTok: Weight Management and Body Image policy (September 2026)', url: TT_WEIGHT },
      { label: 'TikTok: Healthcare and Pharmaceuticals policy (September 2026)', url: TT_HEALTH },
      { label: 'TikTok Shop: Dietary supplements seller requirements (Shop, not ads)', url: 'https://seller-us.tiktok.com/university/essay?knowledge_id=1411277869713198' },
      { label: 'FDA: Structure/function claims', url: FDA_STRUCTURE },
    ],
  },
  // ───────────────────────── Telehealth ─────────────────────────
  {
    slug: 'telehealth-on-meta',
    published: '2026-05-19',
    vertical: 'Telehealth & Rx',
    verticalSlug: 'telehealth',
    platform: 'Meta',
    status: 'cert',
    seoTitle: `Telehealth Ads on Meta: ${Y} LegitScript & Rx Rules`,
    metaDescription: 'Promoting prescription telehealth on Meta needs LegitScript, Meta authorization, US/Canada/NZ targeting and 18+. What uncertified brands can still run.',
    h1: `Advertising telehealth on Meta: ${Y} LegitScript & authorization rules`,
    answer: 'Meta splits telehealth ads in two. Promoting prescription drugs or naming a medication requires active LegitScript certification, Meta authorization, US, Canada or New Zealand targeting and an 18+ audience. Ads that promote telehealth services generally, or educate about prescription drugs, need no written authorization, which is the main route for uncertified providers.',
    changeNotes: [
      { kind: 'clarified', date: D1, text: 'The lines on inferred health-condition audiences and on handling patient data are our guidance and HIPAA law, not text from Meta’s ad standards. Meta’s Drugs and Pharmaceuticals standard has not changed since February 2025.', sources: [{ label: 'Meta Drugs and Pharmaceuticals standard', url: MDP }] },
    ],
    certification: 'Meta requires online pharmacies and telehealth providers that promote prescription drugs to be actively certified with LegitScript and to obtain authorization from Meta. Those ads may target only the United States, Canada or New Zealand, only the countries the advertiser is certified in, and only people 18 or older. Pharmaceutical manufacturers can instead apply through Meta’s internal review, which needs no LegitScript certification.',
    prohibited: [
      'Promoting a specific prescription drug without LegitScript certification and Meta authorization',
      'Prescription drug ads targeted to countries you are not certified in, or outside the US, Canada and New Zealand',
      'Prescription drug ads shown to anyone under 18',
      'Promoting illicit or recreational drugs, or other unsafe substances, products or supplements “as determined by Meta at its sole discretion”',
    ],
    guidance: [
      'Audiences built from inferred health conditions. We avoid them; this is our practice, not a line in Meta’s standards.',
      `Pixels or events that collect patient data from intake pages. Patient data is governed by <a href="${HHS_HIPAA}" target="_blank" rel="noopener">HIPAA</a> where it applies, not by Meta’s ad standards.`,
    ],
    requirements: 'Prescription drug ads must include a disclaimer to consult a licensed health professional or obtain a valid prescription. We also recommend that the landing page show licensure for each targeted country and handle patient data in a HIPAA-compliant way; those are legal and practical requirements, not Meta text.',
    rejectionReasons: [
      'Promoting prescription drugs without active LegitScript certification and Meta authorization',
      'Targeting a country the advertiser is not certified in',
      'Naming a specific medication from an unauthorized account',
      'Missing the consult-a-professional or valid-prescription disclaimer',
      'An Rx ad targeted to under-18s',
    ],
    enforcement: 'Plan for the landing page to be read with the ad. A clean, condition-agnostic ad that links to a page naming prescription medications, or to an intake flow that reads as prescribing, leaves an uncertified account promoting prescription drugs in substance. Recovery means fixing the destination and appealing, not uploading new creative against the same page.',
    howToComply: 'Certified providers: keep LegitScript active, get Meta authorization, target only certified countries among the US, Canada and New Zealand, gate to 18+ and add the consult disclaimer. Uncertified providers: promote the telehealth service generally or educate, with no drug names, and keep the prescribing flow off the ad.',
    faq: [
      { q: 'Can I run telehealth ads on Meta without LegitScript?', a: 'Yes, if the ads promote telehealth services generally or educate about prescription drugs: Meta says those need no written authorization. To promote a prescription drug or name a medication, you need active LegitScript certification, Meta authorization, US, Canada or New Zealand targeting and 18+.' },
      { q: 'What disclaimer do telehealth Rx ads need on Meta?', a: 'Meta requires prescription drug ads to include a disclaimer to consult a licensed health professional or obtain a valid prescription. How the landing page handles patient data is a separate legal question (HIPAA, where it applies), not part of Meta’s ad standards.' },
    ],
    sources: [
      { label: 'Meta: Drugs and Pharmaceuticals ad standard', url: MDP },
      { label: 'Meta Business Help: Prescription drugs', url: 'https://www.facebook.com/business/help/263390265553560' },
      { label: 'LegitScript: Healthcare certification', url: 'https://www.legitscript.com/certification/healthcare-certification/' },
      { label: 'HHS: HIPAA', url: HHS_HIPAA },
    ],
  },
  {
    slug: 'telehealth-on-google',
    published: '2026-05-19',
    vertical: 'Telehealth & Rx',
    verticalSlug: 'telehealth',
    platform: 'Google',
    status: 'cert',
    seoTitle: `Telehealth Ads on Google: ${Y} Certification Rules`,
    metaDescription: `Telehealth prescribing ads on Google need LegitScript first, then Google's Prescription drug services certification. The ${Y} rules, limits and rejections.`,
    h1: `Advertising telehealth on Google Ads: ${Y} Prescription drug services certification`,
    answer: 'Telehealth providers that prescribe need two approvals before advertising on Google: LegitScript certification first, then Google’s Prescription drug services certification, applied for at the child-account level. Offering prescription drugs without a prescription is an egregious violation. In 2026 Google opened telemedicine to certified providers in New Zealand and, from August, Spain.',
    changeNotes: [
      { kind: 'changed', date: D1, text: 'What changed in 2026: Google opened prescription drug services to LegitScript-certified telemedicine providers in New Zealand (April 2026) and Spain (from August 2026), and to certified online pharmacies in India (April 2026). Spain and India still bar prescription drug promotion in ads and landing pages. We also added Google’s 7-day warning for ordinary violations.', sources: [{ label: 'Google update, New Zealand (April 7, 2026)', url: G_NZ }, { label: 'Google update, Spain (July 22, 2026)', url: G_SPAIN }] },
    ],
    certification: `<p>This page owns the certification steps; our other Google rule sheets link here.</p>
<ol>
<li><strong>Get LegitScript certification.</strong> Google allows telemedicine providers in the US and Canada if they are accredited by LegitScript’s Healthcare Merchant Certification Program. Online pharmacies in the US and Canada may hold NABP Digital Pharmacy Accreditation.</li>
<li><strong>Apply for Google’s certification</strong> for Prescription drug services, at the child-account level, not the manager (MCC) account.</li>
<li><strong>Target only permitted locations.</strong> Prescription drug services may be promoted in the 32 locations Google lists, and certified advertisers may bid on prescription drug keywords in 23 listed locations, including the US, Canada, New Zealand and the UK.</li>
<li><strong>Keep drug names in ads and landing pages to the US, Canada and New Zealand.</strong> Elsewhere, prescription drug terms may not be used for promotion.</li>
</ol>
<p>Pharmaceutical manufacturers use a separate certification track.</p>`,
    prohibited: [
      'Offering prescription drugs without a prescription (egregious: suspension on detection, without warning)',
      'Promoting prescription drug services without LegitScript and Google certification',
      'Opioid promotion, outside narrow exceptions',
      'Promoting speculative or experimental treatments',
      'Prescription drug promotion in ads or landing pages outside the US, Canada and New Zealand, including Spain and India',
    ],
    requirements: 'Identify the certified entity, gate every prescription behind a genuine licensed consult, and offer no way to buy a prescription drug without a prescription. Google says it errs on the side of caution with landing pages that link to, or appear to facilitate, online prescriptions, so audit every page the ad can reach. Non-promotional uses of drug terms, such as regulatory warnings, are permitted.',
    rejectionReasons: [
      'Promoting prescription services without LegitScript and Google certification',
      'Any path to a prescription drug without a prescription',
      'Targeting a location outside Google’s permitted list',
      'Keyword-targeting a prescription drug term without certification',
      'Opioid promotion outside Google’s narrow exceptions',
    ],
    enforcement: 'Google runs two speeds. Ordinary violations of the Prescription drug services policy come with a warning at least 7 days before the account is suspended. Offering prescription drugs without a prescription is egregious: Google suspends the account on detection, without prior warning. Keep LegitScript current as well, because Google’s telemedicine rule requires both certifications and a lapse puts the account outside the policy.',
    howToComply: 'Complete LegitScript, then Google’s Prescription drug services certification at the child-account level; restrict targeting to permitted locations; advertise the service and condition rather than drug names outside the US, Canada and New Zealand; keep drug names off keywords unless certified; and route every prescription through a real licensed-consult flow.',
    sections: [
      {
        id: 'markets-2026',
        question: 'Which markets did Google open to telemedicine in 2026?',
        html: `<div class="tablewrap"><table class="dtable">
<thead><tr><th>Market</th><th>What Google allows</th><th>Posted</th><th>Still not allowed</th></tr></thead>
<tbody>
<tr><td class="row-h">New Zealand</td><td>Telemedicine providers may promote prescription drug services, with LegitScript and Google certification</td><td><a href="${G_NZ}" target="_blank" rel="noopener">April 7, 2026</a></td><td>Drug-term rules unchanged</td></tr>
<tr><td class="row-h">India</td><td>Certified online pharmacies may promote prescription drug services</td><td><a href="${G_INDIA}" target="_blank" rel="noopener">April 7, 2026</a></td><td>Promoting prescription drugs in ads or landing pages</td></tr>
<tr><td class="row-h">Spain</td><td>Telemedicine providers may promote prescription drug services, from August 2026</td><td><a href="${G_SPAIN}" target="_blank" rel="noopener">July 22, 2026</a></td><td>Promoting prescription drugs in ads or landing pages</td></tr>
</tbody></table></div>
<p>Google’s own pages disagree on Spain: it appears in the Healthcare and medicines country specifics but not in the Prescription drug services location list. Confirm eligibility with Google before launching there. None of these changes widened where drug names can appear in ads: promotional use of prescription drug terms is still limited to the US, Canada and New Zealand.</p>`,
      },
    ],
    faq: [
      { q: 'What certification do I need to advertise telehealth on Google?', a: 'LegitScript certification first, then Google’s Prescription drug services certification, applied for at the child-account level rather than the manager account. Pharmaceutical manufacturers use a separate track. Prescription service ads cannot run until both are in place.' },
      { q: 'Can I advertise online prescriptions on Google Search?', a: 'Only as a certified provider, with a genuine licensed consult before any prescription and no way to buy without one. Google treats offering prescription drugs without a prescription as egregious and suspends accounts on detection, without warning.' },
      { q: 'Can telehealth providers advertise in New Zealand or Spain on Google?', a: 'Yes, with conditions. Since April 2026, telemedicine providers with LegitScript and Google certification may promote prescription drug services in New Zealand. From August 2026 Spain is open too, but ads and landing pages there may not promote prescription drugs, and Google’s Prescription drug services location list does not include Spain.' },
    ],
    sources: [
      { label: 'Google: Healthcare and medicines policy', url: G_HEALTH },
      { label: 'Google: Prescription drug services', url: G_RX_SERVICES },
      { label: 'Google: Restricted drug terms', url: G_TERMS },
      { label: 'Google: Update to Healthcare and Medicines Policy, New Zealand (April 7, 2026)', url: G_NZ },
      { label: 'Google: Update to Healthcare and Medicines Policy, India (April 7, 2026)', url: G_INDIA },
      { label: 'Google: Update to Healthcare and Medicines Policy, Spain (July 22, 2026)', url: G_SPAIN },
    ],
  },
  {
    slug: 'telehealth-on-tiktok',
    published: '2026-05-22',
    vertical: 'Telehealth & Rx',
    verticalSlug: 'telehealth',
    platform: 'TikTok',
    status: 'restricted',
    seoTitle: `Telehealth Ads on TikTok: ${Y} Rx Rules by Market`,
    metaDescription: 'TikTok\'s policies do not name telehealth. Rx drug ads are barred in most markets and may be allowed in the US and Canada with regulator approval and 18+.',
    h1: `Advertising telehealth on TikTok: ${Y} prescription rules by market`,
    answer: 'TikTok’s ads policies never mention telehealth or telemedicine, so a telehealth ad is judged by what it promotes. Prescription medicine is not allowed in most markets and may be allowed in the US and Canada with regulator approval. Austria bars remote diagnosis and treatment services by name. Pharmacies and medical institutions follow their own market rows.',
    changeNotes: [
      { kind: 'corrected', date: D1, text: 'TikTok’s Healthcare policy may allow prescription medicine ads in the US, Canada (18+) and New Zealand (25+) with regulator approval; its Dangerous Products policy limits that exception to the US and Canada. Neither mentions telehealth. This page previously labelled telehealth ads prohibited.', sources: [{ label: 'TikTok Healthcare and Pharmaceuticals policy', url: TT_HEALTH }] },
    ],
    certification: `No LegitScript requirement applies to telehealth as such. For prescription medicine, the market exception in the note above applies (full table: ${TIKTOK_TABLE}); New Zealand also asks you to contact a TikTok sales representative. US pharmacy ads need NABP or LegitScript accreditation, or a regional equivalent.`,
    prohibited: [
      'Prescription medicine promotion in every market group outside the US, Canada and New Zealand',
      'In Austria: medical services provided online or through apps that include remote diagnosis and remote treatment',
      'Miracle or “secret cure” claims (barred in listed non-Western market groups)',
      'Prescription medicine ads shown to under-18s (under-25s in New Zealand)',
    ],
    guidance: [
      'Pixels or events that collect health data from intake pages. TikTok’s ads policies do not address this; we configure tracking to avoid it.',
      'Medication names in creative until TikTok has accepted your regulator proof.',
    ],
    requirements: 'Prescription medicine ads need proof of approval from the regional regulator and 18+ targeting (25+ in New Zealand). Keep that proof on file, and make sure every landing page is accurate and follows the targeted market’s pharmacy law.',
    rejectionReasons: [
      'Prescription medicine promotion in a market that does not allow it',
      'No proof of regulator approval for a US or Canadian prescription ad',
      'Remote diagnosis and treatment services targeted to Austria',
      'Prescription ads targeted below 18 (25 in New Zealand)',
      'Miracle-cure claims in market groups that bar them',
    ],
    enforcement: 'The failure is usually geographic. TikTok writes its healthcare rules per market, so creative that passes for a US audience can be rejected when targeting adds the UK, the EU or Australia, where prescription medicine is not allowed, or Austria, which bars remote diagnosis and treatment services by name.',
    howToComply: 'Advertise the service and condition awareness rather than a drug: brand-level creative (“talk to a licensed provider”), no medication names, the clinical flow on the landing page, and targeting limited to markets whose rows allow it. To name a prescription medicine in the US or Canada, gather regulator proof first.',
    faq: [
      { q: 'Can I advertise a telehealth Rx service on TikTok?', a: 'In most markets, no: prescription medicine is not allowed. In the US and Canada it may be allowed with proof of regulator approval and 18+ targeting, though TikTok’s two policies differ on the details. TikTok never names telehealth, so the ad is judged on what it promotes.' },
      { q: 'What can a telehealth brand run on TikTok?', a: 'Brand-level and condition-awareness creative that names no drug, makes no miracle or cure claims and sends the viewer to a compliant landing page. Check each target market’s row first: Austria, for example, bars remote diagnosis and treatment services.' },
    ],
    sources: [
      { label: 'TikTok: Healthcare and Pharmaceuticals policy (September 2026)', url: TT_HEALTH },
      { label: 'TikTok: Dangerous Products or Services policy (April 2025)', url: TT_DANGER },
    ],
  },
  // ───────────────────────── TRT / hormone ─────────────────────────
  {
    slug: 'trt-on-meta',
    published: '2026-05-26',
    vertical: 'TRT & hormone',
    verticalSlug: 'trt-hormone',
    platform: 'Meta',
    status: 'cert',
    seoTitle: `TRT & Testosterone Ads on Meta: ${Y} Policy Rules`,
    metaDescription: 'Naming testosterone in Meta ads needs LegitScript, Meta authorization, 18+ and US, Canada or NZ targeting. What TRT and hormone brands can run without it.',
    h1: `Advertising TRT on Meta: ${Y} rules for testosterone & hormone brands`,
    answer: 'Meta has no TRT-specific rule. Naming testosterone or another hormone prescription follows its Drugs and Pharmaceuticals standard: LegitScript certification, Meta authorization, US, Canada or New Zealand targeting and 18+. Without them, a TRT clinic can promote its telehealth service generally or educate about men’s health, with no drug names and no unqualified timed-outcome promises.',
    changeNotes: [
      { kind: 'corrected', date: D1, text: 'Certified and Meta-authorized advertisers can name prescription treatments. The bans on naming testosterone and showing vials apply to uncertified accounts and are our creative guidance, not Meta’s wording. We also removed a before and after rule that Meta does not apply to TRT.', sources: [{ label: 'Meta Drugs and Pharmaceuticals standard', url: MDP }] },
    ],
    certification: 'To name testosterone or another hormone prescription, an online pharmacy or telehealth provider must be actively LegitScript-certified and authorized by Meta, targeting only certified countries among the US, Canada and New Zealand, 18+. Meta’s standards never name TRT; this follows from the prescription drug rules. Meta also bans “unsafe substances, products or supplements, as determined by Meta at its sole discretion” without publishing a list in the standard.',
    prohibited: [
      'Promoting testosterone or another hormone prescription without LegitScript certification and Meta authorization',
      'Prescription ads targeted to under-18s, or outside the US, Canada and New Zealand',
      'Unsafe substances, products or supplements, as Meta determines at its sole discretion',
      'Promises of specific outcomes within a set timeframe without disclaimers or qualifiers (Meta’s clickbait rule)',
    ],
    guidance: [
      'Naming testosterone, showing vials or needles, or promising a prescription from an uncertified account.',
      '“Do you have low T?” and other symptom questions aimed at the viewer.',
      'Steroid, HGH or “get jacked” muscle-building positioning. With no published unsafe-substance list, we keep well clear of it.',
    ],
    requirements: 'If you promote the prescription, include a disclaimer to consult a licensed health professional or obtain a valid prescription. We recommend sending traffic to an educational landing page that handles patient data under HIPAA, with the clinical qualification done after the click.',
    rejectionReasons: [
      'Naming the hormone prescription without certification and authorization',
      'Targeting outside the certified countries, or under 18',
      'No consult-a-professional disclaimer on an Rx ad',
      'Timed outcome promises (“higher T in 30 days”) with no qualifier',
    ],
    enforcement: 'The costly failure is confusing two problems. A certified, authorized clinic can name testosterone; an uncertified one cannot, and its fix is certification or a general telehealth angle. Creative that drifts toward steroid or muscle-building imagery adds a second problem: Meta bans unsafe substances at its own discretion and publishes no list in the standard, so there is no written line to stay behind.',
    howToComply: 'Uncertified clinics: run men’s health and energy education that promotes the telehealth service generally, with no drug names, no unqualified outcome promises and 18+ targeting, and send traffic to an educational landing page. Certified clinics: add Meta authorization, geo-restrict to certified countries, gate to 18+ and include the consult disclaimer before naming the treatment.',
    faq: [
      { q: 'Can I say “testosterone” in a Meta ad?', a: 'Only with active LegitScript certification and Meta authorization, targeting certified countries among the US, Canada and New Zealand, 18+, with the consult disclaimer. Meta’s prescription rules let only certified, authorized advertisers promote the drug, so our guidance for uncertified accounts is to leave the word out.' },
      { q: 'How do uncertified TRT clinics advertise on Meta?', a: 'They promote the telehealth service generally or educate about men’s health, which Meta says needs no written authorization, with no drug names, qualified outcome language and 18+ targeting. The clinical qualification happens on the landing page and in the consult.' },
    ],
    sources: [
      { label: 'Meta: Drugs and Pharmaceuticals ad standard', url: MDP },
      { label: 'Meta: Health and Wellness ad standard (clickbait rule)', url: MHW },
      { label: 'Meta Business Help: Prescription drugs', url: 'https://www.facebook.com/business/help/263390265553560' },
    ],
  },
  {
    slug: 'trt-on-google',
    published: '2026-05-26',
    vertical: 'TRT & hormone',
    verticalSlug: 'trt-hormone',
    platform: 'Google',
    status: 'cert',
    seoTitle: `TRT & Testosterone Ads on Google: ${Y} Policy Rules`,
    metaDescription: 'Testosterone drug keywords on Google need certification, Rx equivalence claims are banned, and TRT prescribing ads need LegitScript plus Google certification.',
    h1: `Advertising TRT on Google Ads: ${Y} certification & restricted-term rules`,
    answer: 'Testosterone drug names such as Depo-Testosterone and AndroGel are on Google’s prescription drug term list: they can appear in US, Canadian and New Zealand ads, but keyword-targeting them needs certification. Clinics that prescribe need LegitScript plus Google certification. Boosters that claim prescription-drug equivalence, and listed products such as superdrol, are banned.',
    changeNotes: [
      { kind: 'corrected', date: D1, text: 'Google bans testosterone boosters that claim prescription-drug equivalence or contain listed substances, not boosters as a category. Testosterone’s controlled-substance status is a DEA classification, not a Google rule.', sources: [{ label: 'Google: Unapproved substances', url: G_UNAPPROVED }] },
    ],
    certification: `Prescribing TRT online needs LegitScript and then Google’s Prescription drug services certification (the steps are on our ${TELEHEALTH_ON_GOOGLE}). Separately, Google’s prescription drug term list includes Depo-Testosterone and AndroGel. The list is non-exhaustive and does not say whether the bare word “testosterone” counts, so our guidance is to treat it as a drug term in keywords. Under US federal law testosterone is a <a href="${CFR_SCHEDULE_III}" target="_blank" rel="noopener">Schedule III controlled substance</a>; that is a DEA classification, not a Google rule.`,
    prohibited: [
      'Keyword-targeting testosterone drug terms (such as Depo-Testosterone or AndroGel) without certification',
      'Prescription drug terms in ads or landing pages for campaigns outside the US, Canada and New Zealand',
      'Products that imply they are as effective as a prescription drug or controlled substance, including boosters sold that way',
      'Products on Google’s unapproved list, such as superdrol, M-Drol and Anabolic Formulation M1, 4AD',
      'hCG promoted in conjunction with anabolic steroids',
      'Targeting personalized ads on health, which Google lists as a restricted category',
    ],
    guidance: [
      'Second-person symptom copy (“your low T”, “your symptoms”). Google restricts health-based targeting; we hold the same line in copy.',
      'Sexual-enhancement or performance claims tied to hormones. Google has a separate sexual health policy; we keep these out of TRT ads.',
      'Misspelled or spaced-out drug names to get past review. We never use them.',
    ],
    requirements: 'Gate any prescription behind a licensed medical evaluation, identify the certified entity, and provide no way to buy testosterone without a prescription. Testimonials that claim specific results need a visible disclaimer that results can vary.',
    rejectionReasons: [
      'Testosterone drug terms in keywords without certification',
      'Online prescribing without LegitScript and Google certification',
      'Booster claims of prescription-drug equivalence',
      'Listed unapproved products on the landing page',
      'Health-based personalized targeting',
    ],
    enforcement: 'Search accounts run many responsive ad variants, so one drug term in a shared headline or keyword list can show up as a batch of disapprovals rather than one. Under the Prescription drug services policy Google warns at least 7 days before suspending an account; offering a prescription drug without a prescription is egregious and suspended on detection, without warning.',
    howToComply: 'Certify if you prescribe (LegitScript, then Google); keep any ad that names a drug in US, Canadian or New Zealand campaigns; bid on condition and service terms (“low testosterone treatment”, “men’s health clinic”) unless certified; gate behind a licensed consult and labs; and sell over-the-counter boosters on their ingredients, never as a prescription alternative.',
    faq: [
      { q: 'Can I run Google Search ads for a TRT clinic?', a: 'Yes. Prescribing needs LegitScript and Google certification, testosterone drug keywords need certification, and drug names can appear in ads only for the US, Canada and New Zealand. Most clinics bid on condition and service terms, such as “low testosterone treatment”, gated behind a licensed consult.' },
      { q: 'Are over-the-counter testosterone boosters advertisable on Google?', a: 'Boosters as a category are not banned. Google disapproves products that imply they are as effective as a prescription drug or controlled substance, products on its unapproved list (such as superdrol and M-Drol), and DHEA outside US-targeted campaigns.' },
    ],
    sources: [
      { label: 'Google: Restricted drug terms', url: G_TERMS },
      { label: 'Google: Prescription drug term list', url: G_TERM_LIST },
      { label: 'Google: Unapproved substances', url: G_UNAPPROVED },
      { label: 'Google: Unapproved pharmaceuticals and supplements (product list)', url: G_UNAPPROVED_LIST },
      { label: 'Google: Restricted targeting in personalized advertising', url: G_TARGETING },
      { label: 'Google: Healthcare and medicines policy', url: G_HEALTH },
      { label: 'eCFR: 21 CFR 1308.13, Schedule III', url: CFR_SCHEDULE_III },
    ],
  },
  {
    slug: 'trt-on-tiktok',
    published: '2026-07-27',
    vertical: 'TRT & hormone',
    verticalSlug: 'trt-hormone',
    platform: 'TikTok',
    status: 'prohibited',
    seoTitle: `TRT Ads on TikTok: ${Y} Rules for Testosterone Clinics`,
    metaDescription: 'TikTok bars controlled and performance drugs, and its US and Canada Rx exception does not say whether it covers them. What TRT and hormone clinics can run.',
    h1: `Advertising TRT on TikTok: ${Y} rules for testosterone and hormone clinics`,
    answer: 'Treat testosterone ads on TikTok as not allowed. TikTok’s Dangerous Products policy bars controlled drugs and drugs for performance or enhancement, and its US and Canada prescription exception neither names testosterone nor says whether it covers controlled drugs. In the UK and EU, prescription medicine is not allowed at all. Men’s health education without drug names can run.',
    changeNotes: [
      { kind: 'corrected', date: D1, text: 'TikTok bars controlled drugs and drugs for performance or enhancement, and separately may allow prescription drug ads in the US and Canada with regulator approval. Its policies do not say whether that exception covers controlled drugs or name testosterone.', sources: [{ label: 'TikTok Dangerous Products policy', url: TT_DANGER }] },
    ],
    certification: `None that clearly applies. The US and Canada prescription exception (see the ${TIKTOK_TABLE}) asks for regulator approval and 18+, but the Dangerous Products policy lists controlled drugs and drugs for enhancement or performance as not allowed. Under US federal law testosterone is a <a href="${CFR_SCHEDULE_III}" target="_blank" rel="noopener">Schedule III controlled substance</a>; TikTok’s pages do not mention it.`,
    prohibited: [
      'Controlled drugs, and drugs for enhancement or performance (Dangerous Products policy)',
      'Prescription medicine in the UK, EU, Australia and other markets outside the US, Canada and New Zealand',
      'References to unrealistic muscle gain, or suggesting that gaining muscle is easy or guaranteed',
      'Promising improved life circumstances or self-image from changing your body',
      'Muscle gain claims shown to under-18s or not made through the promotion of a healthy lifestyle',
    ],
    guidance: [
      'Naming testosterone or any hormone prescription in creative, captions or display names.',
      '“Low T” symptom quizzes that steer toward a prescription. TikTok bars encouraging self-diagnosis only in some non-Western markets; we keep them out everywhere.',
      'Before and after physique transformations.',
    ],
    requirements: 'Men’s health creative that can run must target 18+ for any muscle or body-change claim and promote a healthy lifestyle. We also keep any prescription path off the landing page the ad links to.',
    rejectionReasons: [
      'Promoting a controlled drug, which TikTok bars',
      'Performance or enhancement framing',
      'Unrealistic or guaranteed muscle-gain claims',
      'A prescription ad in a market where prescription medicine is not allowed',
      'Muscle or body-change claims without 18+ targeting',
    ],
    enforcement: 'TikTok’s text gives a TRT clinic no written path. The controlled-drugs ban and the US and Canada prescription exception were written in separate policies and neither mentions hormones, so a rejected testosterone ad has nothing to cite on appeal. Keep the clinical funnel off TikTok and judge the channel on awareness, not on patient acquisition.',
    howToComply: 'Run broad men’s health, energy and training education with no hormone names, no symptom quizzes and no physique transformations, targeted 18+. Keep the clinical funnel on Google Search and Meta, where certified advertisers have written paths to name the treatment.',
    faq: [
      { q: 'Can a TRT clinic run ads on TikTok?', a: 'Not for the therapy itself with any certainty. TikTok bars controlled drugs and performance drugs, testosterone is a Schedule III controlled substance in the US, and TikTok’s US and Canada prescription exception does not say whether it covers controlled drugs. Brand-level men’s health content with no hormone names is what can run.' },
      { q: 'Does age-gating to 18+ let me advertise testosterone on TikTok?', a: 'No. 18+ targeting is a condition for prescription medicine and for muscle-gain claims, not a way around the controlled-drugs ban. In the UK and EU, prescription medicine is not allowed at any age.' },
    ],
    sources: [
      { label: 'TikTok: Dangerous Products or Services policy (April 2025)', url: TT_DANGER },
      { label: 'TikTok: Healthcare and Pharmaceuticals policy (September 2026)', url: TT_HEALTH },
      { label: 'TikTok: Weight Management and Body Image policy (September 2026)', url: TT_WEIGHT },
      { label: 'eCFR: 21 CFR 1308.13, Schedule III', url: CFR_SCHEDULE_III },
    ],
  },
  // ───────────────────────── Med spa ─────────────────────────
  {
    slug: 'med-spa-on-meta',
    published: '2026-06-02',
    vertical: 'Med spa & aesthetics',
    verticalSlug: 'med-spa',
    platform: 'Meta',
    status: 'allowed',
    seoTitle: `Botox & Med Spa Ads on Meta: ${Y} Policy | AdBoost Health`,
    metaDescription: 'Meta now allows before and after images for cosmetic procedures like fillers and injectables, 18+ only. What changed in July 2026 and what still gets rejected.',
    h1: `Advertising a med spa on Meta: ${Y} rules after the July before-and-after change`,
    answer: 'Since July 2026, Meta lets med spa and cosmetic procedure ads show before and after transformations, including for dermal fillers and injectable treatments, as long as they target 18+. What still gets rejected: statements of inferiority about appearance, timed results without a qualifier, and weight-loss injections without LegitScript certification and Meta authorization.',
    changeNotes: [
      { kind: 'changed', date: D1, text: 'What changed in July 2026: Meta removed its ban on side-by-side before and after images for wrinkle treatments such as Botox and dermal fillers, and now allows before and after transformation for cosmetic procedures, 18+ only.', sources: [{ label: 'Meta Health and Wellness standard, change log', url: MHW }] },
    ],
    certification: 'None for cosmetic procedures. Meta lists dermal fillers, skin rejuvenation treatments, injectable treatments, chemical peels, micro-needling and non-ablative laser treatments as allowed for 18+. Weight-loss injections are different: Meta routes prescription weight-loss products to its Drugs and Pharmaceuticals rules (LegitScript, Meta authorization, US, Canada or New Zealand, 18+). Meta does not say whether naming Botox in a med spa ad counts as promoting a prescription drug.',
    prohibited: [
      'Statements of inferiority about appearance: terms, descriptions or questions that attack a person’s appearance, specific body parts or hygiene (“Hate your double chin?”)',
      'Cosmetic product or procedure ads shown to anyone under 18',
      'Clickbait: exaggerated claims, or results promised within a set timeframe without disclaimers or qualifiers',
      'Promoting a prescription weight-loss injection without LegitScript certification and Meta authorization',
    ],
    guidance: [
      'Toxin brand names such as Botox in ad copy. Meta does not say whether naming them counts as promoting a prescription drug, so we use generic descriptors (“wrinkle relaxer”) unless the account is authorized.',
    ],
    requirements: 'Target 18+ for every cosmetic ad. Meta mandates no standard disclaimer for cosmetic procedures, but a result promised within a set timeframe needs a disclaimer or qualifier, and a prescription drug ad needs the consult-a-professional disclaimer.',
    rejectionReasons: [
      'Copy or questions that attack the viewer’s appearance',
      'Under-18 targeting',
      'Timed results with no qualifier (“erase lines in 7 days”)',
      'Weight-loss injection offers from an uncertified account',
    ],
    enforcement: 'Since the July 2026 rewrite the trigger is the words, not the photos. A before and after carousel can now run for 18+, but an opener such as “Hate your double chin?” is a question that attacks a body part, which the Health and Wellness standard now bans explicitly. The other trap is the menu: a weight-loss injection offer moves those ads under Meta’s prescription drug rules.',
    howToComply: 'Show real results with before and after images targeted 18+, write about the treatment and the outcome rather than the viewer’s flaws, qualify any time-bound result, use generic treatment names unless authorized, and run weight-loss injections in a separate, certified campaign.',
    faq: [
      { q: 'Can a med spa run before/after ads on Meta?', a: 'Yes, since July 2026. Meta’s Health and Wellness standard now allows cosmetic products, procedures and surgeries “depicting before and after transformation”, and lists dermal fillers and injectable treatments as allowed, for audiences 18 and older. The ad still cannot attack the viewer’s appearance or promise timed results without a qualifier.' },
      { q: 'Can I name Botox in a Meta ad?', a: 'Meta’s standards do not say. Health and Wellness allows “injectable treatments” for 18+, and Drugs and Pharmaceuticals gates the promotion of prescription drugs, but neither says whether a med spa naming Botox is promoting a prescription drug. Until Meta does, we use generic terms such as “wrinkle relaxer”.' },
    ],
    sources: [
      { label: 'Meta: Health and Wellness ad standard (with the July 2026 change log)', url: MHW },
      { label: 'Meta: Drugs and Pharmaceuticals ad standard', url: MDP },
    ],
  },
  {
    slug: 'med-spa-on-google',
    published: '2026-07-27',
    vertical: 'Med spa & aesthetics',
    verticalSlug: 'med-spa',
    platform: 'Google',
    status: 'restricted',
    seoTitle: `Botox & Med Spa Ads on Google: ${Y} Policy Rules`,
    metaDescription: 'Med spa ads can run on Google as local healthcare, but Botox, Dysport and Xeomin are restricted drug terms and improbable outcome claims get disapproved.',
    h1: `Advertising a med spa on Google Ads: ${Y} keyword, claim & certification rules`,
    answer: 'Med spa services can run on Google as local healthcare. Botox, botulinum toxin, Dysport and Xeomin are on Google’s prescription drug term list, so keyword-targeting them needs certification. Dermal fillers are FDA-regulated medical devices and are not on that list. Improbable results get disapproved, and weight-loss injections need LegitScript plus Google certification.',
    changeNotes: [
      { kind: 'corrected', date: D1, text: 'Botox, Dysport and Xeomin are on Google’s prescription drug term list. Dermal fillers are FDA-regulated medical devices and are not on that list.', sources: [{ label: 'Google: Prescription drug term list', url: G_TERM_LIST }, { label: 'FDA: Dermal fillers', url: FDA_FILLERS }] },
    ],
    certification: `None for cosmetic services such as facials, laser or microneedling. Botox, botulinum toxin, Dysport and Xeomin are prescription drug terms: in the US, Canada and New Zealand they may appear in ads and landing pages, but keyword-targeting them requires certification. FDA classes dermal fillers as medical device implants, and no filler brand (Juvederm, Restylane, Radiesse, Sculptra) is on Google’s term list. Any prescribing or dispensing offer, such as weight-loss injections, needs LegitScript and Google’s Prescription drug services certification (steps on our ${TELEHEALTH_ON_GOOGLE}).`,
    prohibited: [
      'Keyword-targeting Botox, botulinum toxin, Dysport or Xeomin without certification',
      'Prescription drug terms in ads or landing pages for campaigns outside the US, Canada and New Zealand',
      'Improbable or unrealistic results',
      'Guaranteed results without a clear, easy-to-find refund policy',
      'Testimonials that claim specific results without a visible disclaimer that results can vary',
      'Weight-loss injection offers without LegitScript and Google certification',
    ],
    guidance: [
      'Second-person flaw copy (“your acne scars”). The Google pages we checked do not address it; we avoid it.',
      'Before and after galleries. Google’s pages do not mention them; we give them the same “results vary” disclaimer Google requires for result testimonials.',
    ],
    requirements: 'Landing pages must match the ad, show the clinic’s real credentials and offer no prescription path unless certified. If you guarantee a result, publish a clear refund policy; if a testimonial claims a specific result, add a visible disclaimer that results can vary.',
    rejectionReasons: [
      'Botox or another toxin brand in keywords without certification',
      'Improbable outcome claims (“permanent results”)',
      'A guarantee with no refund policy',
      'Result testimonials missing a “results vary” disclaimer',
      'A weight-loss injection page that reads as online prescribing',
    ],
    enforcement: 'The surprise is usually the keyword list: an uncertified account bidding on “Botox” draws restricted-drug-term disapprovals wherever that keyword sits, even when the ads only say “wrinkle relaxer”. The bigger risk is the site. Google says it errs on the side of caution with landing pages that link to, or appear to facilitate, online prescriptions, so a new weight-loss injection page can change how the clinic’s other ads are judged.',
    howToComply: 'Advertise the service category and the consult (“lip filler consultation”, “laser skin resurfacing”), bid on treatment terms rather than toxin brand names unless certified, keep outcome claims realistic with a refund policy behind any guarantee, and keep weight-loss injections behind the certified pathway on separate pages.',
    faq: [
      { q: 'Can I bid on “Botox” as a keyword for my med spa?', a: 'Only with certification. Botox is on Google’s prescription drug term list: promotional use in ads and landing pages is limited to the US, Canada and New Zealand, and keyword-targeting it requires certification. Most med spas bid on treatment terms (“wrinkle relaxer”, “forehead lines treatment”) instead.' },
      { q: 'Are filler brand names restricted on Google?', a: 'Not as prescription drug terms. FDA classes dermal fillers as medical device implants, and no filler brand appears on Google’s prescription drug term list. The claim rules still apply: no improbable results, a refund policy behind any guarantee, and a “results vary” disclaimer on result testimonials.' },
      { q: 'Do med spas need LegitScript to advertise on Google?', a: 'Not for cosmetic services like facials, laser or microneedling. The requirement starts when the offer involves prescribing or dispensing, most often weight-loss injections, which need LegitScript and then Google’s Prescription drug services certification.' },
    ],
    sources: [
      { label: 'Google: Restricted drug terms', url: G_TERMS },
      { label: 'Google: Prescription drug term list', url: G_TERM_LIST },
      { label: 'Google: Unreliable claims', url: G_UNRELIABLE },
      { label: 'Google: Prescription drug services', url: G_RX_SERVICES },
      { label: 'FDA: Dermal fillers (soft tissue fillers)', url: FDA_FILLERS },
    ],
  },
  {
    slug: 'med-spa-on-tiktok',
    published: '2026-07-27',
    vertical: 'Med spa & aesthetics',
    verticalSlug: 'med-spa',
    platform: 'TikTok',
    status: 'restricted',
    seoTitle: `Med Spa & Botox Ads on TikTok: ${Y} Rules by Market`,
    metaDescription: 'TikTok may allow cosmetic clinic ads like fillers in the US and Canada for 18+, bans them in Australia and NZ, and lists Botox as not allowed in the UK and EU.',
    h1: `Advertising a med spa on TikTok: ${Y} cosmetic-procedure ad rules`,
    answer: 'TikTok sets cosmetic clinic rules by market. In the US and Canada, ads may be allowed for 18+, with fillers and microdermabrasion as examples. Australia, New Zealand and several other markets do not allow cosmetic clinic ads. In the UK and EU, aesthetic treatments need a TikTok sales representative’s permission, and Botox is listed as not allowed.',
    changeNotes: [
      { kind: 'changed', date: D1, text: 'What changed in September 2026: TikTok’s Weight Management policy now lists weight loss supplements, meal replacements and (through a sales representative) weight loss surgical procedures as possible in the US and Canada. Weight management is not a banned category there.', sources: [{ label: 'TikTok Weight Management policy', url: TT_WEIGHT }] },
      { kind: 'corrected', date: D1, text: 'TikTok’s US and Canada rules allow cosmetic clinic ads such as fillers for 18+ and say nothing about before and after images; the before and after limit and the Botox exclusion apply in listed European markets.', sources: [{ label: 'TikTok Healthcare and Pharmaceuticals policy', url: TT_HEALTH }] },
    ],
    certification: 'No LegitScript requirement. In the US and Canada, cosmetic clinics may be allowed with 18+ targeting; Canada adds that certifications from local regulators may be required. In the UK and EU group, advertisers must work with a TikTok sales representative to confirm eligibility and get permission. Australia, New Zealand, Belgium, Estonia, Pakistan, Turkey and the Albania market group list cosmetic clinics as not allowed.',
    prohibited: [
      'Cosmetic clinic ads in Australia, New Zealand, Belgium, Estonia, Pakistan, Turkey and the Albania market group',
      'Botox in the UK and EU group (listed as not allowed for aesthetic treatments)',
      'In the UK and EU: misleading or exaggerated claims, unsafe or exploitative messaging, prohibited testimonials, and before and after imagery where restricted',
      'Targeting under-18s in any market that allows cosmetic clinic ads',
      'Body contouring sold with unrealistic, effortless or guaranteed weight-loss claims (Weight Management policy)',
    ],
    guidance: [
      'Before and after content in the US and Canada. TikTok’s rows there are silent on it; we treat it as reviewable, not safe.',
      'Toxin brand names in US and Canada creative. The US cosmetic clinic row does not mention Botox, and prescription medicine needs regulator proof, so we use generic descriptors.',
    ],
    requirements: '18+ targeting in every market that allows the category, and a sales representative’s permission first in the UK and EU. Keep claims qualified, avoid graphic procedure footage, and make sure the landing page promises nothing the ad could not.',
    rejectionReasons: [
      'Running in a market that does not allow cosmetic clinic ads',
      'Botox in creative targeted to the UK or EU',
      'No sales representative permission for UK or EU aesthetic treatments',
      'Under-18 targeting',
      'Before and after imagery in a market that restricts it',
    ],
    enforcement: 'Expansion is where med spa ads fail: creative approved for a US audience can be rejected when targeting adds the UK, the EU or Australia, because the market rows differ on the category itself, on Botox and on before and after imagery. Body contouring framed as weight loss also brings in the Weight Management policy, which since September 2026 allows some weight-loss offers in the US and Canada but still bars unrealistic, effortless or guaranteed results.',
    howToComply: 'Lead with the experience and the consult: treatment-room content, practitioner credibility, “what a visit looks like” and generic treatment descriptors rather than toxin brands. Target 18+, check each market’s row before expanding, get sales representative permission for the UK and EU, and keep body contouring away from unrealistic weight-loss promises.',
    faq: [
      { q: 'Can I show before/after results in TikTok ads for my med spa?', a: 'It depends on the market. TikTok’s US and Canada cosmetic clinic rows say nothing about before and after imagery. Its UK and EU aesthetic treatments row bars it “where restricted” without listing where, and several Gulf and other market groups bar before and after comparisons for some health products. Check each market before you run it.' },
      { q: 'What age targeting do med spa ads need on TikTok?', a: '18+ in every market that allows cosmetic clinic ads. Australia, New Zealand and several other markets do not allow the category at all, and the UK and EU need a sales representative’s permission first.' },
    ],
    sources: [
      { label: 'TikTok: Healthcare and Pharmaceuticals policy (September 2026)', url: TT_HEALTH },
      { label: 'TikTok: Weight Management and Body Image policy (September 2026)', url: TT_WEIGHT },
    ],
  },
];

// Only pages released in this build (src/data/pages.json gates).
export const AD_POLICIES = ALL_AD_POLICIES.filter((p) => isLive(`/advertising/${p.slug}/`));

export const getAdPolicy = (slug: string) => AD_POLICIES.find((p) => p.slug === slug);
