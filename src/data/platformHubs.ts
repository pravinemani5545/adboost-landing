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
  changeLog: { date: string; change: string; sourceUrl: string }[];  // newest first; date YYYY-MM-DD, or YYYY-MM when the platform's day is ambiguous
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
}

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
const FDA_STRUCTURE = 'https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/structurefunction-claims';
const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

const ALL_HUBS: PlatformHub[] = [
  // N2: health plan section 6, publishes 2026-12-08 (src/data/pages.json).
  {
    slug: 'meta',
    platform: 'Meta',
    seoTitle: 'Meta Health & Wellness Ad Policy: July 2026 Update',
    metaDescription: 'Meta changed its Health and Wellness ad standard in July 2026: cosmetic before and after images are now allowed for 18+. What changed, and how Rx rules differ.',
    h1: 'Meta health and wellness ad policy: what changed in July 2026',
    answer: 'In July 2026 Meta rewrote its Health and Wellness ad standard. Cosmetic before and after images are now allowed for 18+, the side-by-side bans for weight loss and wrinkle treatments are gone, and negative self-perception became a ban on statements of inferiority about appearance. Prescription drugs, including GLP-1s, still follow Drugs and Pharmaceuticals.',
    checkedOn: '2026-10-30',
    sections: [
      {
        id: 'what-changed',
        question: 'What did Meta change in July 2026?',
        html: `<p>Meta’s ${ext(MHW, 'Health and Wellness ad standard')} keeps a change log, and its July 2026 entry shows the deleted text struck through. Meta deleted:</p>
<ul>
<li>The ban on “Side-by-side comparison after the use of a product or transformation for weight loss” (fitness classes such as Pilates were the exception).</li>
<li>The ban on “Side-by-side comparison after the use of a product or transformation for wrinkles treatment such as; Botox, dermal fillers, or any other anti-aging treatment.”</li>
<li>The line that anti-aging close-ups “should not include side-by-side comparisons”.</li>
<li>Every negative self-perception sentence, including “Ads must not imply or attempt to generate negative self-perception or declare there is a perfect body type or appearance one should aspire to in order to promote diet, weight loss, cosmetic procedures or any other health-related products.”</li>
</ul>
<p>Meta added four rules: a ban on “statements of inferiority about physical appearance”, a closed list of incurable diseases that ads cannot claim to cure, a clickbait rule, and a ban on claiming results come solely from wearable products. The cosmetic allowance now reads “General cosmetic products, procedures, surgeries depicting before and after transformation”, for 18+.</p>`,
      },
      {
        id: 'which-standard',
        question: 'Which Meta standard applies to your ad?',
        html: `<p>The Health and Wellness standard covers non-prescription products and cosmetic procedures. It sends prescription products elsewhere: “For weight loss products that require prescription, please refer to Drugs and Pharmaceuticals ads policy and comply with the geo-targeting, and written permission requirements.”</p>
<div class="tablewrap"><table class="dtable">
<thead><tr><th>Your ad promotes</th><th>Standard</th><th>What it requires</th></tr></thead>
<tbody>
<tr><td class="row-h">A cosmetic product, procedure or surgery (fillers, injectables, peels, laser)</td><td>Health and Wellness</td><td>18+; before and after allowed; no statements of inferiority about appearance</td></tr>
<tr><td class="row-h">A non-prescription weight loss or weight gain product or service</td><td>Health and Wellness</td><td>18+; no statements of inferiority; no fat-pinching close-ups or wearable-only claims; no clickbait</td></tr>
<tr><td class="row-h">A dietary or health supplement</td><td>Health and Wellness</td><td>18+; no claims to cure the listed diseases; no clickbait</td></tr>
<tr><td class="row-h">A prescription drug, including prescription weight-loss drugs such as GLP-1s</td><td>Drugs and Pharmaceuticals</td><td>LegitScript (pharmacies and telehealth providers), Meta authorization, US, Canada or New Zealand, certified countries only, 18+, consult disclaimer</td></tr>
<tr><td class="row-h">Telehealth services generally, or education about prescription drugs</td><td>Drugs and Pharmaceuticals</td><td>No written authorization needed</td></tr>
</tbody></table></div>`,
      },
      {
        id: 'health-wellness-rules',
        question: 'What does the Health and Wellness standard require now?',
        html: `<ul>
<li><strong>Age:</strong> ads for dietary, health, weight loss or weight gain products and services, and for cosmetic products, procedures or surgeries, must target people at least 18 years old. Meta exempts general wellbeing products and services such as fitness, general food and protein products, non-permanent cosmetic and beauty products such as creams and makeup, and dental products.</li>
<li><strong>Allowed for 18+:</strong> cosmetic procedures including “dermal fillers, skin rejuvenation treatments, injectable treatments, chemical peels, micro-needling, non-ablative laser treatments”, and before and after transformation for cosmetic products, procedures and surgeries.</li>
<li><strong>Allowed for 18+:</strong> dietary weight loss or weight gain products such as supplements or pills, where “The ad can illustrate people using the product or the service, and its impact of using it, and clearly indicate the time taken to achieve noticeable results.”</li>
<li><strong>Banned:</strong> statements of inferiority about physical appearance, meaning “terms, descriptions, or questions that are negative and attack an individual’s appearance, specific body parts, or hygiene”, in weight loss, weight gain and cosmetic ads.</li>
<li><strong>Banned:</strong> claims to cure, heal or eliminate diabetes, herpes, thyroid, psoriasis, Ebola, cancer, autism, Alzheimer’s, Parkinson’s, ALS or HIV. Meta calls the list exhaustive, and it does not apply to claims about treating or managing symptoms.</li>
<li><strong>Banned:</strong> clickbait in a health, weight loss or weight gain context, “such as sensational language with exaggerated or extreme claims, or promises of specific outcomes within a set timeframe without disclaimers or qualifiers”.</li>
<li><strong>Banned in weight loss and gain ads:</strong> a “Close up on specific body area by pinching fat” and “Claims that results can be achieved solely by using wearable products”.</li>
</ul>`,
      },
      {
        id: 'rx-rules',
        question: 'What do the Drugs and Pharmaceuticals rules require?',
        html: `<p>Meta’s ${ext(MDP, 'Drugs and Pharmaceuticals standard')} was last changed in February 2025.</p>
<ul>
<li>Advertisers actively certified with LegitScript can promote prescription drugs if they target only the United States, Canada or New Zealand, only the countries they are certified in, and only people 18 or older, and if they obtain authorization from Meta.</li>
<li>Online pharmacies and telehealth providers must hold the LegitScript certification. Pharmaceutical manufacturers can apply through Meta’s internal review instead.</li>
<li>Ads that educate, advocate or give public service announcements about prescription drugs, or promote telehealth services generally, need no written authorization.</li>
<li>Prescription drug ads must include a disclaimer to consult a licensed health professional or obtain a valid prescription.</li>
<li>Ads must not promote illicit or recreational drugs, or other unsafe substances, products or supplements, “as determined by Meta at its sole discretion”.</li>
</ul>`,
      },
      {
        id: 'not-said',
        question: 'What do Meta’s standards not say?',
        html: `<p>Where Meta’s text is silent, we say so rather than guess:</p>
<ul>
<li><strong>Prescription weight-loss imagery.</strong> Drugs and Pharmaceuticals says nothing about imagery, and Meta does not say whether the Health and Wellness imagery rules also apply to a prescription GLP-1 ad.</li>
<li><strong>Weight-loss side-by-sides for non-prescription products.</strong> The ban was deleted, but the current text neither names nor permits side-by-sides. It permits showing the product’s impact and the time taken to see results.</li>
<li><strong>Naming Botox.</strong> Health and Wellness allows “injectable treatments” for 18+; Drugs and Pharmaceuticals gates prescription drugs. Neither says whether a med spa naming Botox is promoting a prescription drug.</li>
<li><strong>Unsafe substances.</strong> Meta decides “at its sole discretion” and publishes no list in the standard, so claims that Meta bans a named ingredient cannot be checked against it.</li>
<li><strong>Compounded drugs.</strong> Neither standard mentions them.</li>
</ul>`,
      },
    ],
    changeLog: [
      { date: '2026-07', change: 'Health and Wellness rewritten: weight-loss and wrinkle-treatment side-by-side bans and negative self-perception wording deleted; before and after allowed for cosmetic procedures (18+); statements of inferiority, a closed incurable-disease list, clickbait and wearable-product rules added.', sourceUrl: MHW },
      { date: '2025-02', change: 'Drugs and Pharmaceuticals last changed. Its LegitScript, authorization, US, Canada or New Zealand and 18+ rules apply to prescription weight-loss drugs.', sourceUrl: MDP },
      { date: '2024-12', change: 'Previous Health and Wellness version: banned side-by-sides for weight loss and wrinkle treatments, and required 18+ for dietary, health and weight loss products.', sourceUrl: MHW },
    ],
    faq: [
      { q: 'Are before and after photos allowed in Meta ads now?', a: 'For cosmetic products, procedures and surgeries, yes: since July 2026 Meta allows ads “depicting before and after transformation” for audiences 18 and older. For non-prescription weight-loss products, the side-by-side ban was deleted and ads may show the product’s impact with the time taken to see results. For prescription weight-loss drugs, Meta’s text is silent.' },
      { q: 'Does the July 2026 change affect GLP-1 ads?', a: 'Only indirectly. Meta sends prescription weight-loss products to its Drugs and Pharmaceuticals standard (LegitScript, Meta authorization, US, Canada or New Zealand, 18+), which has not changed since February 2025 and says nothing about imagery. Non-prescription weight-loss products follow the rewritten Health and Wellness rules.' },
      { q: 'What replaced Meta’s negative self-perception rule?', a: 'A ban on weight loss, weight gain and cosmetic ads that contain “statements of inferiority about physical appearance”: terms, descriptions or questions that are negative and attack an individual’s appearance, specific body parts or hygiene.' },
      { q: 'Can a supplement ad on Meta say it cures a disease?', a: `Not for the eleven diseases on Meta’s list, which includes diabetes, cancer and HIV. Claims about other diseases fall outside Meta’s rule, but under FDA rules ${ext(FDA_STRUCTURE, 'only a drug can claim to diagnose, treat, cure or prevent a disease')}, so a supplement should not make them.` },
    ],
    sources: [
      { label: 'Meta: Health and Wellness ad standard (with the July 2026 change log)', url: MHW },
      { label: 'Meta: Drugs and Pharmaceuticals ad standard', url: MDP },
      { label: 'FDA: Structure/function claims', url: FDA_STRUCTURE },
    ],
  },
  // N3: health plan section 6, publishes 2027-01-12 (src/data/pages.json).
  {
    slug: 'google',
    platform: 'Google',
    seoTitle: 'Google Ads Healthcare Policy (2027): Drug Terms & Markets',
    metaDescription: 'Google Ads healthcare policy: restricted drug terms, unapproved substances, the 2026 telemedicine market changes, and where certification fits in.',
    h1: 'Google Ads healthcare policy: drug terms, unapproved substances and markets',
    answer: 'Google lets ads and landing pages use prescription drug terms for promotion only in campaigns targeting the US, Canada or New Zealand, and only certified advertisers may keyword-target them. Prescribing needs LegitScript plus Google certification. Ephedra, hCG for weight loss and drug-equivalence claims are banned, and in 2026 Google opened telemedicine in New Zealand and Spain.',
    checkedOn: '2026-10-30',
    sections: [
      {
        id: 'drug-terms',
        question: 'Where can Google ads use prescription drug terms?',
        html: `<p>Google’s ${ext(G_TERMS, 'restricted drug terms policy')} sets the rule by campaign location:</p>
<div class="tablewrap"><table class="dtable">
<thead><tr><th>Campaign targets</th><th>Drug terms in ads and landing pages</th><th>Keyword-targeting drug terms</th></tr></thead>
<tbody>
<tr><td class="row-h">US, Canada or New Zealand</td><td>Allowed for promotion, no certification needed</td><td>Certification required</td></tr>
<tr><td class="row-h">Anywhere else</td><td>Not for promotion; regulatory warnings, legal notices, public health campaigns and academic publications are permitted</td><td>Certified online pharmacies and telemedicine providers only, in the locations Google lists</td></tr>
</tbody></table></div>
<p>Google’s ${ext(G_TERM_LIST, 'prescription drug term list')} is non-exhaustive. It includes semaglutide, tirzepatide, Ozempic, Wegovy, Mounjaro, Zepbound, Botox, botulinum toxin, Dysport, Xeomin, Depo-Testosterone and AndroGel. It does not include the bare word “testosterone” or any dermal filler brand.</p>`,
      },
      {
        id: 'certification',
        question: 'Who needs Google’s healthcare certification?',
        html: '<p>Online pharmacies and telemedicine providers that promote prescription drug services need third-party accreditation first (LegitScript for telemedicine providers) and then Google’s own certification, applied for at the child-account level. Pharmaceutical manufacturers use a separate track. The step-by-step order, and the locations each certification covers, are on our <a href="/advertising/telehealth-on-google/">telehealth on Google rule sheet</a>.</p>',
      },
      {
        id: 'markets-2026',
        question: 'Which healthcare markets did Google change in 2026?',
        html: `<ul>
<li><strong>New Zealand</strong> (${ext(G_NZ, 'posted April 7, 2026')}): telemedicine providers with LegitScript and Google certification may promote prescription drug services.</li>
<li><strong>India</strong> (${ext(G_INDIA, 'posted April 7, 2026')}): certified online pharmacies may promote prescription drug services; ads and landing pages targeting India may not promote prescription drugs.</li>
<li><strong>Spain</strong> (${ext(G_SPAIN, 'posted July 22, 2026')}): from August 2026, telemedicine providers may promote prescription drug services, but “Advertisers cannot promote prescription drugs in their ads and landing pages.”</li>
</ul>
<p>Google’s own pages disagree on Spain: it is in the Healthcare and medicines country specifics but not in the Prescription drug services location list. None of these changes widened where drug terms can appear in ads, which is still the US, Canada and New Zealand.</p>`,
      },
      {
        id: 'unapproved-substances',
        question: 'Which substances and supplements does Google ban?',
        html: `<p>Google’s ${ext(G_UNAPPROVED, 'unapproved substances policy')} bans, among others:</p>
<ul>
<li>Products that contain ephedra.</li>
<li>Products containing hCG in relation to weight loss or weight control, or promoted with anabolic steroids.</li>
<li>Herbal and dietary supplements with active pharmaceutical or dangerous ingredients.</li>
<li>Products that imply they are as effective as prescription drugs or controlled substances, or with names confusingly similar to an unapproved product.</li>
<li>DHEA products, except in campaigns targeting the United States.</li>
<li>Non-government-approved products marketed as preventing, curing or treating a disease or ailment.</li>
</ul>
<p>Its ${ext(G_UNAPPROVED_LIST, 'product list')} names items such as Lishou, Magic Slim Tea, SleepWell (Herbal Xanax), superdrol and M-Drol.</p>`,
      },
      {
        id: 'claims',
        question: 'Which health claims does Google disapprove?',
        html: `<p>Google’s ${ext(G_UNRELIABLE, 'unreliable claims policy')} does not allow claims of unrealistic weight loss within a specific time frame or requiring little effort, or improbable results. If you guarantee a result you need a clear, easy-to-find refund policy, and testimonials that claim specific results need a visible disclaimer that there is no guarantee and results can vary. None of the Google healthcare pages we checked mention before and after imagery or compounded drugs.</p>`,
      },
      {
        id: 'suspension',
        question: 'Does Google warn before suspending a healthcare advertiser?',
        html: `<p>It depends on the violation. Under the ${ext(G_RX_SERVICES, 'Prescription drug services')} and unapproved substances policies, Google says it will issue a warning at least 7 days before suspending an account. Offering prescription drugs without a prescription is different: Google’s ${ext(G_HEALTH, 'Healthcare and medicines policy')} treats it as egregious and suspends accounts upon detection, without prior warning.</p>`,
      },
    ],
    changeLog: [
      { date: '2026-07-22', change: 'Spain: telemedicine providers may promote prescription drug services from August 2026; ads and landing pages may not promote prescription drugs.', sourceUrl: G_SPAIN },
      { date: '2026-04-07', change: 'New Zealand: telemedicine providers with LegitScript and Google certification may promote prescription drug services.', sourceUrl: G_NZ },
      { date: '2026-04-07', change: 'India: certified online pharmacies may promote prescription drug services; ads and landing pages may not promote prescription drugs.', sourceUrl: G_INDIA },
    ],
    faq: [
      { q: 'Can I use “Ozempic” or “semaglutide” in Google ads?', a: 'In campaigns targeting the US, Canada or New Zealand, yes, in ad text and landing pages, with no certification. Keyword-targeting those terms needs certification. Everywhere else, ads and landing pages may not use them for promotion.' },
      { q: 'Did Spain open to prescription drug ads on Google?', a: 'No. From August 2026 Google lets telemedicine providers promote prescription drug services in Spain, but advertisers cannot promote prescription drugs in their ads and landing pages there. Google’s own pages also disagree on Spain: it is in the Healthcare and medicines country specifics but not in the Prescription drug services location list.' },
      { q: 'Does Google ban before and after images in health ads?', a: 'None of the Google healthcare pages we checked mention before and after imagery. Its unreliable claims policy bans unrealistic weight loss within a specific time frame or requiring little effort, and requires a visible results-vary disclaimer on testimonials that claim specific results.' },
      { q: 'Is “testosterone” a restricted drug term on Google?', a: 'Google’s non-exhaustive list includes Depo-Testosterone and AndroGel but not the bare word “testosterone”, and Google does not say whether the bare word counts. Our guidance is to treat it as a drug term in keywords unless you are certified.' },
    ],
    sources: [
      { label: 'Google: Healthcare and medicines policy', url: G_HEALTH },
      { label: 'Google: Restricted drug terms', url: G_TERMS },
      { label: 'Google: Prescription drug term list', url: G_TERM_LIST },
      { label: 'Google: Prescription drug services', url: G_RX_SERVICES },
      { label: 'Google: Unapproved substances', url: G_UNAPPROVED },
      { label: 'Google: Unapproved pharmaceuticals and supplements (product list)', url: G_UNAPPROVED_LIST },
      { label: 'Google: Unreliable claims', url: G_UNRELIABLE },
      { label: 'Google: Update to Healthcare and Medicines Policy, New Zealand (April 7, 2026)', url: G_NZ },
      { label: 'Google: Update to Healthcare and Medicines Policy, India (April 7, 2026)', url: G_INDIA },
      { label: 'Google: Update to Healthcare and Medicines Policy, Spain (July 22, 2026)', url: G_SPAIN },
    ],
  },
];

// Only hubs released in this build (src/data/pages.json gates).
export const PLATFORM_HUBS = ALL_HUBS.filter((h) => isLive(`/advertising/${h.slug}/`));

export const getPlatformHub = (slug: string) => PLATFORM_HUBS.find((h) => h.slug === slug);
