// Ad-platform compliance pages (pSEO Template B): /advertising/{vertical}-on-{platform}.
// One record per genuinely-distinct platform×vertical policy reality - sourced from
// Meta/Google/TikTok ad policies + FTC/FDA/LegitScript (2025–2026). Policies change
// constantly and enforcement is tightening; every page is framed "verify against
// live policy". Each record carries ≥5 unique content blocks so pages are not thin.

export type PolicyStatus = 'allowed' | 'restricted' | 'cert' | 'prohibited';

export interface AdPolicy {
  slug: string;                 // e.g. "glp-1-on-meta"
  published: string;            // ISO date - page first published
  updated: string;              // ISO date - last policy review/update
  vertical: string;             // display
  verticalSlug: string;         // groups related policies across platforms
  platform: 'Meta' | 'Google' | 'TikTok';
  status: PolicyStatus;
  h1: string;
  answer: string;               // answer-first (AEO)
  certification: string;        // what authorization/cert is required
  prohibited: string[];         // prohibited claims/content
  requirements: string;         // disclaimers / landing-page requirements
  rejectionReasons: string[];   // top reasons ads get rejected
  howToComply: string;          // how compliant brands still advertise
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
}

export const STATUS_LABEL: Record<PolicyStatus, string> = {
  allowed: 'Allowed with conditions',
  restricted: 'Restricted',
  cert: 'Requires certification',
  prohibited: 'Prohibited',
};

export const AD_POLICIES: AdPolicy[] = [
  // ───────────────────────── GLP-1 ─────────────────────────
  {
    slug: 'glp-1-on-meta',
    published: '2026-05-05',
    updated: '2026-07-01',
    vertical: 'GLP-1 & weight loss',
    verticalSlug: 'glp-1-weight-loss',
    platform: 'Meta',
    status: 'cert',
    h1: 'Advertising GLP-1 on Meta: 2026 rules, restrictions & what gets you banned',
    answer: 'You can advertise a GLP-1 program on Meta, but naming the prescription drug (semaglutide, tirzepatide, Wegovy, Zepbound) requires active LegitScript certification plus Meta authorization, US/Canada/New Zealand targeting, and an 18+ age-gate. Before/after imagery, “lose X lbs” claims, and any framing that implies negative self-perception are prohibited and are the fastest route to a rejection or account restriction.',
    certification: 'To promote the Rx by name, the advertiser must be actively LegitScript-certified (or a pharma manufacturer authorized by Meta) AND obtain Meta authorization, targeting only US / Canada / New Zealand, 18+. A non-Rx “metabolic health” program needs no certification but still carries the 18+ age-gate and body-image rules.',
    prohibited: [
      'Before/after or side-by-side weight-loss transformation images',
      '“Lose X lbs”, guaranteed-outcome, or rapid-results claims',
      'Content implying negative self-perception or a “perfect body” ideal (quoted policy language)',
      'Marketing compounded GLP-1 as equivalent to branded Wegovy/Zepbound',
      'Under-18 targeting or youth-appealing creative',
    ],
    requirements: 'Rx ads must include a disclaimer to consult a licensed health professional or obtain a valid prescription, and the landing page must match the certified country and show lawful licensure. Non-Rx programs still need FTC-grade substantiation for any health claim.',
    rejectionReasons: [
      'Naming the drug without active LegitScript + Meta authorization',
      'Before/after or “lose X lbs” imagery',
      'Negative self-perception / body-shaming framing',
      'Pixel or landing-page signals that classify you as an uncertified Rx pharmacy',
      'Targeting outside US/CA/NZ or under 18',
    ],
    howToComply: 'Certified telehealth brands: complete LegitScript, get Meta authorization, geo-restrict to US/CA/NZ, add the consult disclaimer, and gate to 18+. Non-certified brands: sell the program and the outcome - never the molecule. Lead with metabolic-health education and a “GLP-1 companion program” framing, no scales, no before/after, no drug names, and move the clinical intake off-platform.',
    faq: [
      { q: 'Can I run before/after weight-loss ads on Meta?', a: 'No. Before/after and side-by-side transformation imagery is prohibited for weight-loss on Meta and is a top account-restriction trigger. Use single lifestyle shots, testimonials with disclaimers, and outcome-neutral education instead.' },
      { q: 'Do I need LegitScript to advertise GLP-1 on Meta?', a: 'To name the prescription drug, yes - you need active LegitScript certification plus Meta authorization and US/CA/NZ targeting. A program that never names the Rx and makes no drug claims can run without it, but still can’t use before/after or negative-self-perception framing.' },
    ],
    sources: [
      { label: 'Meta - Health & Wellness ad standard', url: 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/' },
      { label: 'Meta - Drugs & Pharmaceuticals ad standard', url: 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/' },
    ],
  },
  {
    slug: 'glp-1-on-google',
    published: '2026-05-05',
    updated: '2026-06-29',
    vertical: 'GLP-1 & weight loss',
    verticalSlug: 'glp-1-weight-loss',
    platform: 'Google',
    status: 'cert',
    h1: 'Advertising GLP-1 on Google Ads: 2026 certification & keyword rules',
    answer: 'On Google, promotional use of GLP-1 drug terms (semaglutide, tirzepatide, Ozempic, Wegovy, Mounjaro, Zepbound) is allowed only in the US, Canada, and New Zealand - and keyword-targeting those drug terms requires certification. Online pharmacies and telehealth providers dispensing them also need Google’s Prescription drug services certification (LegitScript first). “Natural Ozempic” equivalence claims and hCG for weight loss are prohibited outright.',
    certification: 'Drug-term promotion is limited to US/CA/NZ. Ad-copy and landing-page use of the terms needs no cert in those countries, but keyword-targeting the drug names does - and any advertiser prescribing or dispensing needs Prescription drug services certification (LegitScript accreditation, then Google’s own application). The pharmaceutical-manufacturer track is separate.',
    prohibited: [
      'hCG for weight loss (prohibited outright)',
      '“As effective as a prescription drug” / “natural Ozempic” equivalence claims',
      'Miracle, guaranteed, or rapid weight-loss claims',
      'Compounded pages implying FDA approval or brand equivalence',
      'Named banned weight-loss products (e.g. Magic Slim, Lishou)',
    ],
    requirements: 'The landing page must match the ad and comply with local law, with no “buy without a prescription” path. Compounded pages must not claim FDA approval or brand equivalence. Note: Google loosened restricted-drug-terms in non-promotional contexts (regulatory/public-health/academic) on Oct 29, 2025.',
    rejectionReasons: [
      'Naming or keyword-targeting drug terms without certification',
      'Targeting outside US/CA/NZ',
      'Miracle/guaranteed or “natural alternative to [drug]” claims',
      'Compounded pages implying FDA approval/equivalence',
      'Online prescribing without LegitScript + Google certification',
    ],
    howToComply: 'Complete LegitScript then Google’s Prescription drug services certification; geo-restrict to US/CA/NZ; advertise the condition and program (“medical weight-loss program”) rather than naming the drug; keep drug names off keywords unless certified; and gate everything behind a genuine licensed consult.',
    faq: [
      { q: 'Can I bid on “Ozempic” or “semaglutide” keywords?', a: 'Only in the US, Canada, and New Zealand and only if you’re certified - keyword-targeting GLP-1 drug terms requires certification. Most compliant brands target condition and program keywords (“medical weight loss”, “GLP-1 program”) instead.' },
      { q: 'Is compounded GLP-1 advertisable on Google?', a: 'It’s high-risk and often treated as unapproved. You cannot imply FDA approval or brand equivalence, and the shortage exemption that once covered mass compounding has ended - advertise only what you can lawfully dispense through a certified pathway.' },
    ],
    sources: [
      { label: 'Google - Healthcare and medicines policy', url: 'https://support.google.com/adspolicy/answer/176031' },
      { label: 'Google - Restricted drug terms', url: 'https://support.google.com/adspolicy/answer/15595717' },
    ],
  },
  {
    slug: 'glp-1-on-tiktok',
    published: '2026-05-08',
    updated: '2026-06-26',
    vertical: 'GLP-1 & weight loss',
    verticalSlug: 'glp-1-weight-loss',
    platform: 'TikTok',
    status: 'prohibited',
    h1: 'Advertising GLP-1 on TikTok: why it’s banned in 2026 (and what to do instead)',
    answer: 'GLP-1 and weight-loss drug advertising is prohibited on TikTok for paid ads, Shop, and branded content across the US, Canada, UK, EU, and Oceania. Products with “GLP” in the name or description are not permitted, and no certification unlocks the category in Western markets - it’s banned outright, not gated. Use TikTok for top-of-funnel brand awareness only, and acquire on Google and Meta.',
    certification: 'No certification unlocks GLP-1/weight-loss advertising in Western markets. A narrow, rep-approval-only path exists in a specific APAC/MENA country list (Australia, NZ, Singapore, and others) with local licensing - not LegitScript. For US/UK/EU brands, treat it as unavailable.',
    prohibited: [
      'Any weight-loss, fat-burn, appetite-suppressant, or “GLP” claim in Western markets',
      'Before/after imagery and body-shaming / “ideal body” framing',
      '“Easy”, “guaranteed”, or “no diet/exercise” language',
      'Products with “GLP” in the name/description; GLP-1 mentions in affiliate handles or bios',
      'Ingestible fat-burners, detox teas, and weight-loss injections',
    ],
    requirements: 'Where conditionally allowed (specific non-Western markets), ads require 18+ gating, healthy-lifestyle messaging, and local licensing. No disclaimer unlocks a banned category in Western markets.',
    rejectionReasons: [
      'Any weight-loss/fat/GLP claim in a Western market',
      'Before/after imagery',
      'Body-shaming or “ideal body” framing',
      '“Easy/guaranteed/no diet” language',
      'Missing local license in the few markets where it’s conditionally allowed',
    ],
    howToComply: 'Pivot to a general-wellness or healthy-lifestyle brand angle with zero weight/fat/appetite/GLP claims and no before/after. Handle the clinical conversation off-platform. Most GLP-1 clinics use TikTok purely for top-of-funnel awareness and convert on Google and Meta.',
    faq: [
      { q: 'Can I sell a GLP-1 program through TikTok Shop?', a: 'No - GLP-1/weight-loss products are prohibited in TikTok Shop and paid ads across Western markets, and products with “GLP” in the name aren’t permitted. Use TikTok for brand awareness only.' },
      { q: 'What can I actually post about on TikTok as a GLP-1 brand?', a: 'General wellness and healthy-lifestyle content with no weight, fat, appetite, or GLP claims and no before/after. Think education and brand-building; the acquisition happens on Google and Meta.' },
    ],
    sources: [
      { label: 'TikTok - Weight Management ad policy', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-weight-management' },
      { label: 'TikTok - Healthcare & Pharmaceuticals ad policy', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-healthcare-pharmaceuticals' },
    ],
  },
  // ───────────────────────── Supplements ─────────────────────────
  {
    slug: 'supplements-on-meta',
    published: '2026-05-12',
    updated: '2026-06-10',
    vertical: 'Supplements & DTC',
    verticalSlug: 'supplements-dtc',
    platform: 'Meta',
    status: 'restricted',
    h1: 'Advertising supplements on Meta: 2026 claims rules & what gets rejected',
    answer: 'Supplements are allowed on Meta with conditions - you must use structure/function language (“supports energy”) rather than disease or cure claims, and avoid banned ingredients. Since January 2025, health advertisers also can’t optimize on Purchase/Add-to-Cart events, so you build for Landing Page View and lean on server-side tracking. Disease claims, before/after imagery, and personal-attribute health language are the top rejection triggers.',
    certification: 'No certification is required for ordinary dietary supplements on Meta. Claims must be substantiated to the FTC standard, and certain ingredients Meta deems “unsafe” are prohibited outright.',
    prohibited: [
      'Disease / cure / treat / prevent claims (turns a supplement into an unapproved drug)',
      'Banned ingredients (e.g. anabolic steroids, ephedra, HGH, DHEA)',
      'Before/after or body-shaming imagery for appearance-related products',
      'Personal-attribute language (“Struggling with your thyroid?”)',
      'Miracle or guaranteed-outcome claims',
    ],
    requirements: 'Use structure/function phrasing with substantiation available; 18+ if the product is appearance-related; landing pages must be claim-consistent. Verify current ingredients against Meta’s prohibited list - it changes.',
    rejectionReasons: [
      'Disease/cure claims in copy or on-screen text',
      'A banned ingredient in the product',
      'Miracle or guaranteed claims',
      'Before/after or body-shaming creative',
      'Personal-attribute health targeting language',
    ],
    howToComply: 'Lead with structure/function benefits and ingredient education (“supports gut health”), third-person and lifestyle framing, and substantiation on the landing page. Optimize on Landing Page View, deploy CAPI to recover signal, and warm the account before scaling.',
    faq: [
      { q: 'What claims can I make about a supplement on Meta?', a: 'Structure/function claims about supporting normal body function (“supports immune health”) - never that it treats, cures, or prevents a disease, which reclassifies it as an unapproved drug. Hold competent, reliable scientific substantiation before the claim runs.' },
      { q: 'Why did Meta stop letting me optimize supplement ads for purchases?', a: 'Meta’s 2025 health restrictions removed Purchase/Add-to-Cart optimization for many health advertisers. Optimize on Landing Page View or engagement, rebuild signal with the Conversions API, and warm the account before scaling.' },
    ],
    sources: [
      { label: 'Meta - Health & Wellness ad standard', url: 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/' },
      { label: 'FTC - Health Products Compliance Guidance', url: 'https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance' },
    ],
  },
  {
    slug: 'supplements-on-google',
    published: '2026-05-12',
    updated: '2026-06-03',
    vertical: 'Supplements & DTC',
    verticalSlug: 'supplements-dtc',
    platform: 'Google',
    status: 'restricted',
    h1: 'Advertising supplements on Google Ads: 2026 policy & banned ingredients',
    answer: 'Compliant dietary supplements are generally allowed on Google Ads with no certification, but a large sub-set is prohibited: supplements with active pharmaceutical or dangerous ingredients, ephedra, hCG for weight loss, prohormones, and drug-analog names (“Herbal Xanax”). Disease-treatment claims and “as effective as prescription drugs” language get disapproved.',
    certification: 'No certification for compliant dietary supplements. The line is ingredient- and claim-based, not credential-based.',
    prohibited: [
      'Supplements with active pharmaceutical or dangerous ingredients',
      'Ephedra, hCG for weight loss, DMAA, prohormones/anabolics (Superdrol, M-Drol, etc.)',
      'Disease prevent/cure/treat claims',
      'Drug-equivalence claims or drug-analog product names',
      'Listed sexual-enhancement products',
    ],
    requirements: 'Keep landing pages to structure/function claims with substantiation and ingredient transparency (no hidden actives). Verify ingredients aren’t on Google’s unapproved list before launch.',
    rejectionReasons: [
      'Disease/cure claims',
      'Equivalence-to-drug claims or drug-analog names',
      'Banned ingredients (ephedra, hCG, DMAA, prohormones)',
      'Unsubstantiated “clinically proven” / miracle claims',
      'Weight-loss or sexual-enhancement claims tripping the unapproved-substances list',
    ],
    howToComply: 'Make structure/function claims with substantiation, avoid disease/equivalence language, confirm no banned ingredients, and keep landing pages claim-consistent and transparent about ingredients.',
    faq: [
      { q: 'Do I need certification to advertise supplements on Google?', a: 'No - compliant dietary supplements don’t require certification. The risk is ingredient- and claim-based: banned ingredients and disease claims get disapproved, so keep to structure/function language with substantiation on file.' },
      { q: 'Which supplement ingredients does Google prohibit?', a: 'Anything with active pharmaceutical or dangerous ingredients, plus ephedra, hCG for weight loss, DMAA, and prohormones/anabolics. Check your formula against Google’s unapproved-substances list before you launch.' },
    ],
    sources: [
      { label: 'Google - Unapproved pharmaceuticals and supplements', url: 'https://support.google.com/adspolicy/answer/2423645' },
      { label: 'Google - Unapproved substances', url: 'https://support.google.com/adspolicy/answer/15595718' },
    ],
  },
  {
    slug: 'supplements-on-tiktok',
    published: '2026-05-15',
    updated: '2026-06-08',
    vertical: 'Supplements & DTC',
    verticalSlug: 'supplements-dtc',
    platform: 'TikTok',
    status: 'cert',
    h1: 'Advertising supplements on TikTok: 2026 pre-approval & claim rules',
    answer: 'Supplements are restricted on TikTok - allowed in some markets with pre-authorization and clean claims, prohibited or age-gated in others. You must pre-approve via TikTok Ads Manager with documentation (cGMP cert, Supplement Facts label, facility registration), and any drift into weight-loss, muscle, sexual, or mental-health claims converts the ad to a prohibited category.',
    certification: 'Pre-authorization through TikTok Ads Manager with documentation - cGMP certification, a Supplement Facts label, and facility registration. TikTok Shop supplement selling is invite-only/restricted. This is TikTok’s own review, not LegitScript.',
    prohibited: [
      'Disease / cure / prevention claims and “proven to cure” outcomes',
      'Weight-loss, muscle-gain, sexual, or mental-health claims (converts to prohibited category)',
      'Before/after imagery',
      'Implied medical outcomes without documentation',
      'Claims that don’t match the approved label',
    ],
    requirements: 'Claims must match the approved Supplement Facts label; landing pages must be accurate, balanced, and not misleading; 18+ where the market restricts to adults. Complete Ads Manager pre-approval with full documentation.',
    rejectionReasons: [
      'Health/disease/cure claims',
      'Slipping into weight/muscle/sexual/mental-health claims',
      'Missing or mismatched documentation',
      'Before/after imagery',
      'Running in a market where the category is banned',
    ],
    howToComply: 'Complete Ads Manager pre-approval with full docs, use general-wellness / structure-function benefit language only, keep sports nutrition to performance-lifestyle framing (not physique change), gate to 18+, and match every claim to the approved label.',
    faq: [
      { q: 'What documents does TikTok need to run supplement ads?', a: 'Pre-authorization via Ads Manager typically requires a cGMP certificate, a Supplement Facts label, and facility registration. Missing or mismatched documentation is a top rejection reason.' },
      { q: 'Can I run a “fat-burner” or “muscle-builder” supplement on TikTok?', a: 'That drifts into weight-loss/muscle claims, which convert the ad into a prohibited category. Keep to general-wellness, structure/function language and match claims to the approved label.' },
    ],
    sources: [
      { label: 'TikTok - Healthcare & Pharmaceuticals ad policy', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-healthcare-pharmaceuticals' },
      { label: 'TikTok Shop - Dietary Supplements requirements', url: 'https://seller-us.tiktok.com/university/essay?knowledge_id=1411277869713198' },
    ],
  },
  // ───────────────────────── Telehealth ─────────────────────────
  {
    slug: 'telehealth-on-meta',
    published: '2026-05-19',
    updated: '2026-06-17',
    vertical: 'Telehealth & Rx',
    verticalSlug: 'telehealth',
    platform: 'Meta',
    status: 'cert',
    h1: 'Advertising telehealth on Meta: 2026 LegitScript & authorization rules',
    answer: 'To promote prescription-related telehealth services on Meta you must be actively LegitScript-certified and obtain Meta authorization, target only US/Canada/New Zealand, and gate to 18+. Purely educational or brand-awareness ads that don’t name a specific medication generally don’t require the Rx authorization - that’s the main lever for uncertified brands.',
    certification: 'Online pharmacies and telehealth providers must be “actively certified with LegitScript” and obtain Meta authorization, targeting only countries where they’re certified (US/CA/NZ), 18+. Pharma manufacturers may use LegitScript or Meta internal review.',
    prohibited: [
      'Promoting specific Rx drugs without certification + authorization',
      'Building audiences on inferred health conditions (post-2025 targeting removal)',
      'Unsafe-substance promotion',
      'Naming a specific Rx in a non-authorized account',
    ],
    requirements: 'Ads must include a “consult a licensed health professional or obtain a valid prescription” disclaimer; landing pages must show lawful licensure matching the country; handle PHI in a HIPAA-compliant way. Educational/PSA telehealth ads not naming a specific medication generally don’t need the Rx authorization.',
    rejectionReasons: [
      'No active LegitScript + Meta authorization while promoting Rx',
      'Targeting outside the certified country',
      'Naming a specific Rx in a non-authorized account',
      'Missing the consult disclaimer',
      'Landing-page or pixel prescribing signals without licensure',
    ],
    howToComply: 'Get LegitScript + Meta authorization, geo-restrict, add the consult disclaimer, gate to 18+. If uncertified, run condition-agnostic educational or brand-awareness creative (no drug names) and keep the Rx flow off the ad.',
    faq: [
      { q: 'Can I run telehealth ads on Meta without LegitScript?', a: 'You can run educational or brand-awareness ads that don’t name a specific medication or promote prescribing. To promote Rx services or name a drug, you need active LegitScript certification plus Meta authorization and US/CA/NZ targeting.' },
      { q: 'What disclaimer do telehealth Rx ads need on Meta?', a: 'A disclaimer to consult a licensed health professional or obtain a valid prescription, with a landing page that shows lawful licensure for the targeted country and handles health data in a HIPAA-compliant way.' },
    ],
    sources: [
      { label: 'Meta - Business Help: Prescription Drugs', url: 'https://www.facebook.com/business/help/263390265553560' },
      { label: 'LegitScript - Healthcare Certification', url: 'https://www.legitscript.com/certification/healthcare-certification/' },
    ],
  },
  {
    slug: 'telehealth-on-google',
    published: '2026-05-19',
    updated: '2026-06-22',
    vertical: 'Telehealth & Rx',
    verticalSlug: 'telehealth',
    platform: 'Google',
    status: 'cert',
    h1: 'Advertising telehealth on Google Ads: 2026 Prescription drug services certification',
    answer: 'Telehealth prescribing on Google is restricted and requires certification: LegitScript accreditation first, then Google’s Prescription drug services certification at the child-account level. Offering Rx drugs without a prescription is an “egregious” violation. Certification covers ~30+ countries, but promotional drug-term use is limited to the US, Canada, and New Zealand.',
    certification: 'Two-step: (1) third-party accreditation - LegitScript (NABP in some cases); (2) apply for Google’s certification at the child-account level. Pharmaceutical manufacturers use a separate certification track. Don’t conflate the two.',
    prohibited: [
      'Offering Rx drugs without a prescription (egregious violation)',
      'Opioid promotion (narrow exceptions only)',
      'Speculative or experimental treatment promotion',
      'Misrepresenting licensure',
      'Geo-targeting non-permitted countries',
    ],
    requirements: 'Clearly identify the certified entity; gate any Rx behind a genuine licensed-prescriber consult; provide no no-prescription purchase path; comply with each targeted country’s pharmacy law. Restricted-drug-terms loosened for non-promotional contexts on Oct 29, 2025.',
    rejectionReasons: [
      'Rx services without LegitScript + Google certification',
      'Any “buy without prescription” implication',
      'Geo-targeting non-permitted countries',
      'Naming/keyword-targeting an Rx without certification',
      'Opioid/controlled-substance promotion or licensing misrepresentation',
    ],
    howToComply: 'Complete LegitScript → Google Prescription drug services certification; restrict geo to approved countries; advertise the service and condition rather than drug names; keep drug names off keywords unless certified; and route every Rx through a real licensed-consult flow.',
    faq: [
      { q: 'What certification do I need to advertise telehealth on Google?', a: 'LegitScript accreditation first, then Google’s Prescription drug services certification at the child-account level. Pharma manufacturers have a separate track. Budget several weeks - you can’t spend until it clears.' },
      { q: 'Can I advertise online prescriptions on Google Search?', a: 'Only as a certified entity, with a genuine licensed-consult gating any prescription and no “buy without a prescription” path. Offering Rx drugs without a prescription is treated as an egregious policy violation.' },
    ],
    sources: [
      { label: 'Google - Prescription drug services', url: 'https://support.google.com/adspolicy/answer/15598647' },
      { label: 'Google - Healthcare and medicines policy', url: 'https://support.google.com/adspolicy/answer/176031' },
    ],
  },
  {
    slug: 'telehealth-on-tiktok',
    published: '2026-05-22',
    updated: '2026-06-12',
    vertical: 'Telehealth & Rx',
    verticalSlug: 'telehealth',
    platform: 'TikTok',
    status: 'prohibited',
    h1: 'Advertising telehealth on TikTok: 2026 prescription rules (mostly prohibited)',
    answer: 'Consumer prescription-drug promotion is prohibited on TikTok in most markets, and unauthorized online pharmacies are banned. OTC medicines, pharmacies, medical institutions, and telehealth are restricted/allowed only in a couple of markets with certification - and TikTok’s own docs conflict on which. Treat TikTok as brand-awareness only and verify the live article for your market.',
    certification: 'A narrow Rx exception exists only in a couple of markets, and TikTok’s own pages conflict (Canada/US vs Canada/NZ). Where allowed, the product must be approved by the regional regulator, with no misleading claims and 18+. TikTok’s own review, not LegitScript.',
    prohibited: [
      'Direct-to-consumer Rx promotion in most markets',
      'Treat / cure / prevent claims',
      '“Product equals prescription medicine” claims',
      'Miracle or secret-cure claims; before/after imagery',
      'Using tracking tech to collect healthcare data',
    ],
    requirements: '18+ mandatory (some Rx contexts reportedly 25+ - verify); pages must be accurate, balanced, and substantiated, and compliant with each market’s pharma law; keep authorization docs on file for OTC/pharmacy where permitted.',
    rejectionReasons: [
      'Any consumer-facing Rx promotion',
      'Missing regulatory documentation for OTC/pharmacy/telehealth',
      'Treat/cure or “equal to prescription” claims',
      'Running in a market that bans the category',
      'Under-18 targeting or a healthcare-data pixel',
    ],
    howToComply: 'Advertise the platform/service and condition awareness, not the drug - brand-level creative (“talk to a licensed provider”), drug named nowhere, clinical flow on the landing page and off-platform. Secure market-specific regulatory approval where OTC/pharmacy is permitted, and configure pixels to avoid collecting health data.',
    faq: [
      { q: 'Can I advertise a telehealth Rx service on TikTok?', a: 'In most markets, no - consumer Rx promotion is prohibited and the market exceptions are narrow and inconsistent across TikTok’s own docs. Use TikTok for brand awareness and condition education, and convert elsewhere.' },
      { q: 'What can a telehealth brand run on TikTok?', a: 'Brand-level, condition-awareness creative that names no drug and makes no treatment claims (“talk to a licensed provider”), with the clinical flow handled off-platform and pixels configured to avoid collecting health data.' },
    ],
    sources: [
      { label: 'TikTok - Healthcare & Pharmaceuticals ad policy', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-healthcare-pharmaceuticals' },
      { label: 'TikTok - Dangerous Products or Services', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-dangerous-products-or-services' },
    ],
  },
  // ───────────────────────── TRT / hormone ─────────────────────────
  {
    slug: 'trt-on-meta',
    published: '2026-05-26',
    updated: '2026-06-15',
    vertical: 'TRT & hormone',
    verticalSlug: 'trt-hormone',
    platform: 'Meta',
    status: 'cert',
    h1: 'Advertising TRT on Meta: 2026 rules for testosterone & hormone brands',
    answer: 'TRT sits in a Meta gray zone: it falls under Prescription Drugs (naming testosterone/hormone Rx needs LegitScript + authorization, US/CA/NZ, 18+) and Unsafe Substances (anabolic steroids and HGH are prohibited outright). You cannot name testosterone, promise a prescription, or show vials/needles. Compliant brands advertise the evaluation, not the molecule.',
    certification: 'To promote the hormone as an Rx: LegitScript + Meta authorization, US/CA/NZ, 18+ (by category inference - Meta has no clause literally naming “TRT”). Anabolic steroids and HGH are prohibited outright, so any ad reading as steroid/HGH promotion is banned, not restricted.',
    prohibited: [
      'Naming testosterone, showing vials/needles, or promising to “boost your T”',
      'Anything reading as anabolic-steroid or HGH promotion (prohibited outright)',
      'Symptom/condition targeting or “Do you have low T?” copy',
      'Before/after imagery and quantified outcome claims (“increase T by X%”)',
      'Muscle-building / “get jacked” positioning (PED policy flag)',
    ],
    requirements: 'If promoting the Rx, include the consult-a-professional/valid-prescription disclaimer. Route to a HIPAA-compliant educational landing page rather than a direct booking/Rx page; do the clinical work off the ad.',
    rejectionReasons: [
      'Reads as anabolic-steroid or HGH promotion',
      'Naming the hormone Rx without certification + authorization',
      'Symptom/condition targeting or “low T?” copy',
      'Before/after or quantified outcome claims',
      'Missing disclaimer or non-compliant landing page',
    ],
    howToComply: 'Run educational “men’s wellness / vitality / energy” angles - no drug names, no numeric promises, no before/after. Send broad wellness creative to a HIPAA-compliant landing page that does the clinical work, and get LegitScript + Meta authorization if you intend to name the treatment. Gate to 18+.',
    faq: [
      { q: 'Can I say “testosterone” or “boost your T” in a Meta ad?', a: 'No. Naming testosterone, promising a prescription, or “boost your T” claims get disapproved, and anything reading as steroid/HGH promotion is prohibited outright. Advertise the symptoms and the evaluation instead.' },
      { q: 'How do compliant TRT brands advertise on Meta at all?', a: 'They run men’s-wellness/vitality education with no drug names, no before/after, and no numeric promises, driving to a HIPAA-compliant landing page that qualifies the patient - with LegitScript + authorization if they name the treatment.' },
    ],
    sources: [
      { label: 'Meta - Drugs & Pharmaceuticals ad standard', url: 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/' },
      { label: 'Meta - Business Help: Prescription Drugs', url: 'https://www.facebook.com/business/help/263390265553560' },
    ],
  },
  {
    slug: 'trt-on-google',
    published: '2026-05-26',
    updated: '2026-06-19',
    vertical: 'TRT & hormone',
    verticalSlug: 'trt-hormone',
    platform: 'Google',
    status: 'cert',
    h1: 'Advertising TRT on Google Ads: 2026 certification & restricted-term rules',
    answer: 'TRT is among the most-disapproved categories on Google. Testosterone is a controlled, prescription substance, so online prescribing/dispensing needs LegitScript + Google’s Prescription drug services certification, and naming “testosterone” or hormone drugs triggers the Restricted drug terms policy (US/CA/NZ; keyword-targeting needs certification). Prohormone “test boosters” are prohibited outright.',
    certification: 'Online prescribing/dispensing requires LegitScript + Google Prescription drug services certification (industry consensus - Google has no clause literally naming “TRT”; verify). Naming testosterone/hormone drugs triggers Restricted drug terms; keyword-targeting them needs certification.',
    prohibited: [
      'Sexual-enhancement or performance claims tied to hormones',
      'Equivalence claims for OTC “test boosters”',
      'Prohormones / anabolics (on the unapproved-substances list)',
      'Unproven disease-treatment claims',
      'Personalized-ad targeting (“your low T”, “your symptoms”)',
    ],
    requirements: 'Gate prescribing behind a licensed medical evaluation and lab testing; clearly identify the certified entity; provide no “buy testosterone without prescription” path; substantiate any non-enhancement claims.',
    rejectionReasons: [
      'Naming testosterone/hormone drugs without certification',
      'Online prescribing without LegitScript + Google certification',
      'Sexual-enhancement or muscle-building claims',
      'OTC “test boosters” implying Rx equivalence',
      'Personalized-health targeting',
    ],
    howToComply: 'LegitScript-certify if prescribing, then Google-certify; geo-target US/CA; advertise “low testosterone treatment”, “bioidentical hormone therapy”, or “men’s health clinic” as brand-agnostic condition education; gate behind a licensed consult + labs; keep drug names off keywords unless certified.',
    faq: [
      { q: 'Can I run Google Search ads for a TRT clinic?', a: 'Yes, but it’s heavily restricted: prescribing needs LegitScript + Google certification, “testosterone” triggers restricted-term rules, and you advertise the condition/evaluation (“low testosterone treatment”, “men’s health clinic”) rather than the drug, gated behind a licensed consult and labs.' },
      { q: 'Are OTC “testosterone boosters” advertisable on Google?', a: 'Not if they imply Rx equivalence or contain prohormones/anabolics - those are on Google’s unapproved-substances list. Enhancement claims tied to hormones are also disapproved.' },
    ],
    sources: [
      { label: 'Google - Restricted drug terms', url: 'https://support.google.com/adspolicy/answer/15595717' },
      { label: 'Google - Healthcare and medicines policy', url: 'https://support.google.com/adspolicy/answer/176031' },
    ],
  },
  // ───────────────────────── Med spa ─────────────────────────
  {
    slug: 'med-spa-on-meta',
    published: '2026-06-02',
    updated: '2026-06-24',
    vertical: 'Med spa & aesthetics',
    verticalSlug: 'med-spa',
    platform: 'Meta',
    status: 'restricted',
    h1: 'Advertising a med spa on Meta: 2026 before/after & body-image rules',
    answer: 'Med spa and aesthetics ads are allowed on Meta with an 18+ age-gate, but before/after side-by-sides for wrinkle/anti-aging treatments (Botox, fillers) and body-contouring are prohibited, and copy can’t exploit insecurities or reinforce negative body image. Single “after” shots, testimonials, and gradual-improvement carousels are the compliant alternative. Weight-loss-injection offers cross into GLP-1 certification rules.',
    certification: 'None specific to procedures/services (no LegitScript). But a med spa offering weight-loss injections crosses into GLP-1/telehealth rules, which do require certification to name the drug.',
    prohibited: [
      'Before/after side-by-sides for wrinkle/anti-aging (Botox, filler) and body contouring',
      'Copy that exploits insecurities or reinforces negative/unhealthy body image or body-shaming',
      'Brand drug names in restricted contexts',
      'Under-18 targeting or youth-appealing creative',
    ],
    requirements: 'Cosmetic ads must target 18+. There’s no Meta-mandated disclaimer, but the main constraint is that “Appointment Booked”/Lead pixel events trigger a Health & Wellness classification that removes conversion optimization - keep booking/PHI off the ad-level pixel and optimize on upper-funnel events.',
    rejectionReasons: [
      'Botox/filler/CoolSculpting before/after side-by-sides',
      'Body-shaming or insecurity-exploiting copy',
      'Brand drug names in restricted contexts',
      'Under-18 targeting or creative',
      'Health & Wellness classification killing optimization',
    ],
    howToComply: 'Replace before/after with testimonials, single “after” shots, and gradual-improvement carousels/video; use generic descriptors (“wrinkle relaxer”) over brand names; optimize on upper-funnel events (Landing Page View) with broad local audiences (10–25 mi), 18+; and keep booking/PHI off the ad-level pixel.',
    faq: [
      { q: 'Can a med spa run before/after ads on Meta?', a: 'Not side-by-sides for wrinkle/anti-aging or body-contouring treatments - those are prohibited and can get the account flagged. Single “after” shots, testimonials, and gradual-improvement carousels are the compliant alternative.' },
      { q: 'Why did my med spa ad account lose conversion optimization?', a: 'Booking/Lead pixel events on a health page trigger Meta’s Health & Wellness classification, which removes lower-funnel optimization. Keep booking and PHI off the ad-level pixel and optimize on upper-funnel events like Landing Page View.' },
    ],
    sources: [
      { label: 'Meta - Cosmetic Procedures and Wellness', url: 'https://transparency.meta.com/policies/ad-standards/content-specific-restrictions/cosmetic-procedures-and-wellness' },
      { label: 'Meta - Health & Wellness ad standard', url: 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/' },
    ],
  },
];

export const getAdPolicy = (slug: string) => AD_POLICIES.find((p) => p.slug === slug);
