// Enriched per-vertical content (2025–2026 research). Keyed by vertical slug.
// Feeds /industries/[slug]. Figures are directional industry benchmarks - verify
// fast-moving 2026 facts (cash-pay prices, peptide reclassification, DEA rules)
// before publishing as hard claims.

export interface Source { label: string; url: string }

/**
 * A vertical-specific question H2 (health plan O17). The first sentence answers
 * the question. `html` is trusted markup (paragraphs, lists, tables, links); every
 * platform fact traces to a row of the claim matrix in
 * seo-research/2026-10-30/followup-2.md and links the platform's own page.
 */
export interface VerticalQuestion {
  id: string;        // anchor
  nav: string;       // short label for "On this page"
  q: string;         // the H2
  html: string;
  sources: Source[]; // listed under "Sources" on the page
}

export interface Playbook {
  marketContext: string;
  growthPlaybook: { h: string; p: string }[];
  commonMistakes: string[];
  whatGoodLooksLike: string[];
  subSegments: string[];
  questions: VerticalQuestion[];
  extraFaq: { q: string; a: string }[];
}

// Primary sources, read 2026-10-30 (followup-2.md section 1).
const SRC = {
  metaHW: { label: 'Meta Ad Standards: Health and Wellness (change log, July 2026)', url: 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/' },
  metaDP: { label: 'Meta Ad Standards: Drugs and Pharmaceuticals', url: 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/' },
  gRestricted: { label: 'Google Ads: Restricted drug terms', url: 'https://support.google.com/adspolicy/answer/15595717' },
  gRxList: { label: 'Google Ads: Prescription drug term list', url: 'https://support.google.com/adspolicy/answer/2430794' },
  gHealthcare: { label: 'Google Ads: Healthcare and medicines', url: 'https://support.google.com/adspolicy/answer/176031' },
  gUnapproved: { label: 'Google Ads: Unapproved substances', url: 'https://support.google.com/adspolicy/answer/15595718' },
  gUnreliable: { label: 'Google Ads: Unreliable claims', url: 'https://support.google.com/adspolicy/answer/15936857' },
  ttHealthcare: { label: 'TikTok ads policy: Healthcare and Pharmaceuticals (September 2026)', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-healthcare-pharmaceuticals' },
  ttWeight: { label: 'TikTok ads policy: Weight Management and Body Image (September 2026)', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-weight-management' },
  ttDangerous: { label: 'TikTok ads policy: Dangerous Products or Services (April 2025)', url: 'https://ads.tiktok.com/help/article/tiktok-ads-policy-dangerous-products-or-services' },
  fdaFillers: { label: 'FDA: Dermal Fillers (Soft Tissue Fillers)', url: 'https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers' },
  fdaSupplements: { label: 'FDA: Questions and Answers on Dietary Supplements', url: 'https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements' },
} satisfies Record<string, Source>;

const ext = (s: Source, text: string) => `<a href="${s.url}" target="_blank" rel="noopener">${text}</a>`;
const table = (head: string[], rows: string[][]) =>
  `<div class="tablewrap"><table class="dtable"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<td class="row-h">${c}</td>` : `<td>${c}</td>`)).join('')}</tr>`)
    .join('')}</tbody></table></div>`;

export const PLAYBOOKS: Record<string, Playbook> = {
  'glp-1-weight-loss': {
    marketContext: 'Roughly 10 million Americans are on branded GLP-1s in 2026 (up from 6M in 2024), with J.P. Morgan projecting 30M US patients and a $200B global incretin market by 2030. The 2026 land-grab: the FDA declared the shortages resolved (removing legal cover for mass-market compounding), and Lilly (LillyDirect) and Novo (NovoCare) launched cash-pay programs - Zepbound $299–$449/mo, Wegovy $199–$349/mo - collapsing the price umbrella compounders lived under. Distribution, trust, and CAC efficiency now decide winners.',
    growthPlaybook: [
      { h: 'Advertise the program, not the molecule', p: 'Meta drives the bulk of scaled DTC weight-loss acquisition. Prescription GLP-1 ads follow its Drugs and Pharmaceuticals rules (LegitScript certification, Meta authorization, 18+, US, Canada or New Zealand), its Health and Wellness standard bans statements that attack how someone looks, and 35+ state AGs pressured Meta in late 2025 to purge misleading ads. Google captures high-intent branded demand: drug names can appear in US, Canadian and New Zealand ads, but keyword-targeting them needs certification. Use TikTok for cheap top-of-funnel education, then retarget on Meta and Google.' },
      { h: 'Creative: specific, credible, native', p: 'Buyer sophistication has spiked - generic "lose weight fast" no longer converts. What works: relatable UGC testimonials with compliant disclaimers, "do you qualify?" eligibility hooks, and cost/access reframes ("brand-name Wegovy from $199/mo"). Segment hard (a 45-year-old woman researching Rx needs a different ad than a 32-year-old man) and ship 3+ hook variants per concept - the hook carries ~70% of performance.' },
      { h: 'The quiz → async-Rx → subscription machine', p: 'A 2–3 minute eligibility quiz (BMI ≥30, or ≥27 with a comorbidity) qualifies and segments the lead, feeding an asynchronous clinical intake that turns a script within 24–48 hours. Default users into a monthly subscription, not one-off fills, and use the cash-pay reframe as the offer wedge. The quiz doubles as your CRM entry point, so instrument SMS/email abandonment recovery.' },
      { h: 'Retention is the whole game', p: '50–65% of non-diabetic GLP-1 patients discontinue within 12 months, with GI distress driving ~62% of drop-offs and the steepest churn in the first 3 months - before meaningful weight loss lands. The LTV lever is proactive side-effect coaching, slower titration, anti-nausea support, and plateau/maintenance education - not more ad spend.' },
    ],
    commonMistakes: [
      'Running before-and-after transformation creative for a prescription program. Meta deleted its weight-loss side-by-side ban in July 2026, but its prescription drug rules say nothing about imagery, so we treat it as an avoidable account risk (our guidance, not a Meta rule).',
      'Marketing compounded GLP-1 as equivalent to branded Wegovy/Zepbound, or leaning on compounding as if the shortage exemption still exists.',
      'Skipping LegitScript/pharmacy certification and getting Rx ad accounts suspended before you scale.',
      'Optimizing to first-fill CAC while ignoring month-1 GI-distress churn - you buy patients who quit before margin turns positive.',
      'Using fear/shame framing or AI-generated fake testimonials - now an active state-AG enforcement target.',
    ],
    whatGoodLooksLike: [
      'Blended CAC $250–$500 per paying patient',
      'Quiz completion rate 45–60%+ from ad click',
      'Consult-to-Rx (qualified intake → prescription) 60–75%',
      '90-day retention above 65–70%; LTV:CAC ≥ 3:1, payback under ~6–12 months',
    ],
    subSegments: ['Brand-name cash-pay pass-through (LillyDirect / NovoCare)', 'Compounded (personalization carve-outs only)', 'Oral GLP-1 (needle-averse)', 'Women’s / perimenopause weight loss', 'GLP-1 + muscle preservation'],
    questions: [
      {
        id: 'before-after',
        nav: 'Before-and-after ads on Meta',
        q: 'Can a GLP-1 program run before-and-after ads on Meta?',
        html: `<p>Not with confidence: Meta’s written rules do not settle it for prescription GLP-1, so we still advise against transformation imagery for Rx weight loss (our recommendation, not Meta’s rule). In July 2026 Meta deleted its ban on side-by-side weight-loss comparisons from its ${ext(SRC.metaHW, 'Health and Wellness standard')}, but that standard sends prescription weight-loss products to the ${ext(SRC.metaDP, 'Drugs and Pharmaceuticals standard')}, which says nothing about imagery.</p><p>Non-prescription weight-loss products may now show people using the product and its impact, with the time it took, for audiences 18 and over. Ads still cannot attack how someone looks or promise a specific result in a set time without qualifiers. The full rule set for this vertical is on <a href="/advertising/glp-1-on-meta/">GLP-1 ads on Meta</a>.</p>`,
        sources: [SRC.metaHW, SRC.metaDP],
      },
      {
        id: 'drug-names',
        nav: 'Naming the drug in ads',
        q: 'What does it take to name semaglutide or tirzepatide in an ad?',
        html: `<p>Certification, a short list of eligible countries and an adult audience, with different details on each platform.</p>${table(['Platform', 'Naming the drug', 'What it takes'], [
          ['Meta', 'Allowed for qualified advertisers', `Active LegitScript certification, authorization from Meta, and targeting only people 18+ in the United States, Canada or New Zealand (${ext(SRC.metaDP, 'Meta')})`],
          ['Google', 'Allowed in ad and landing-page text in the US, Canada and New Zealand', `Certification to keyword-target the drug terms (${ext(SRC.gRestricted, 'Google')}). Telemedicine providers also need LegitScript, then Google’s own certification: <a href="/advertising/telehealth-on-google/">the steps</a>`],
          ['TikTok', 'Unclear in the US and Canada; not allowed in the UK, EU and Australia', `TikTok’s ${ext(SRC.ttHealthcare, 'Healthcare policy')} says prescription medicine may be allowed in the US and Canada with regulator approval and 18+, while its ${ext(SRC.ttDangerous, 'Dangerous Products policy')} lists weight-loss drugs as not allowed. <a href="/blog/tiktok-ads-health-brands/">TikTok’s rules by market</a>`],
        ])}`,
        sources: [SRC.metaDP, SRC.gRestricted, SRC.ttHealthcare, SRC.ttDangerous],
      },
      {
        id: 'retention',
        nav: 'Keeping patients past month three',
        q: 'How do GLP-1 programs keep patients past the first three months?',
        html: '<p>By making side-effect support part of the program, because the steepest churn comes early, before meaningful weight loss shows. That means proactive coaching on side effects, slower titration, anti-nausea support and plateau and maintenance education, with a monthly subscription as the default instead of one-off fills.</p><p>Retention is what separates GLP-1 weight loss marketing that compounds from medical weight loss marketing that only buys first fills, so we report on retention-adjusted payback, not first-fill CAC. Run your own numbers with the <a href="/tools/ltv-cac-calculator/">LTV:CAC calculator</a>.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'Can I still legally sell compounded GLP-1s in 2026?', a: 'Only in narrow cases. The FDA resolved the tirzepatide (Dec 2024) and semaglutide (Feb 2025) shortages and 503A/503B enforcement deadlines ended by mid-2025, so mass-market compounded copies are no longer protected - compounding is now limited to genuinely personalized formulations for a specific patient, not marketed as equivalent to the branded drug.' },
      { q: 'How do I message side effects without killing conversion?', a: 'Be proactive and honest - GI side effects drive ~62% of discontinuations and hit early, so front-loading realistic expectations plus your titration/support system actually improves retention and reduces chargeback risk. Include fair-balance safety language and frame side-effect management as a core program benefit.' },
    ],
  },
  telehealth: {
    marketContext: 'The US telehealth market reached ~$52.8B in 2025 and is projected at ~$65.4B in 2026, with DTC subscription telehealth growing fastest at ~30% CAGR toward $9.5B by 2030. The urgent 2026 dynamic: on Dec 31, 2025 the DEA/HHS issued a fourth extension keeping telemedicine controlled-substance prescribing legal without a prior in-person visit through Dec 31, 2026 - but the permanent rule is unfinalized, so operators are marketing into a one-year regulatory window that could tighten overnight.',
    growthPlaybook: [
      { h: 'Google captures demand, Meta creates it, TikTok fuels the top', p: 'Google Search wins on high-intent, condition-specific queries where buyers are ready. Meta remains the volume workhorse for stigma-sensitive conditions, but its Nov 2025 health restrictions block Purchase/Lead optimization for many telehealth advertisers (30–40% efficiency drops reported) - shift to upper-funnel events and rebuild signal with server-side/CAPI. Add TikTok as a lower-CPM top-funnel channel for de-stigmatized categories.' },
      { h: 'Creative: convenience, privacy, speed-to-Rx', p: 'The three hooks that outperform: convenience ("skip the waiting room"), stigma-free discretion (ED, mental health, hair loss - "discreet packaging"), and speed ("online visit to prescription in 24 hours"). Founder/patient UGC beats polished brand spots. Lead with the outcome and the ease - avoid disease/symptom claims that trip platform policy.' },
      { h: 'Symptom quiz → condition-specific LP → membership', p: 'A short symptom/eligibility quiz feeds a dedicated condition page, not a generic homepage (wellness LPs median ~8.2% conversion vs ~5.1% general healthcare). Use a low-friction first-visit offer ($0–$20) to clear the async hurdle, then convert to an auto-refill membership. Price the subscription, not the visit - the visit is a loss-leader to acquire a recurring Rx relationship.' },
      { h: 'LTV: refill cadence + condition stacking', p: 'Episodic care becomes subscription revenue - Hims grew online revenue per subscriber to ~$73/mo in 2024 (+38% YoY) largely via cross-sell. Lock in 30/90-day auto-refill, stack conditions (finasteride + minoxidil, or ED + GLP-1) to raise ARPU without new CAC, and cross-sell across the lifecycle. This is what justifies $700–$930 CACs at scaled players.' },
    ],
    commonMistakes: [
      'Launching prescription ads before securing LegitScript certification. Google requires it for telemedicine prescription services and Meta for telehealth providers promoting prescription drugs (Meta ads that promote telehealth services generally need no authorization).',
      'Running generic "see a doctor online" messaging instead of condition-specific angles - it buries intent and forfeits the 8%+ conversion dedicated LPs deliver.',
      'Pointing high-intent traffic at a homepage instead of a condition-specific landing page with a matching quiz.',
      'Still optimizing Meta for Purchase/Lead events after the Nov 2025 health-tier restrictions blocked them, inflating CPAs 30–40%.',
      'Nailing the async quiz but losing patients at the async-to-sync handoff (ID verification, provider review, pharmacy fulfillment).',
    ],
    whatGoodLooksLike: [
      'Blended CAC $150–$400 early/niche; $700–$930 scaled multi-category',
      'Quiz-to-paid-subscription conversion 10–20%',
      'Monthly churn 5–8% (target sub-5% for refill categories)',
      'Condition-specific LP conversion 8–12% vs ~2.3% generic ecommerce',
    ],
    subSegments: ['Men’s sexual health & hair loss', 'Mental health & psychiatry', 'Weight management / GLP-1', 'Dermatology / skincare', 'Sexual health & STI / women’s health'],
    questions: [
      {
        id: 'legitscript',
        nav: 'Do you need LegitScript?',
        q: 'Do telehealth ads need LegitScript certification?',
        html: `<p>Only some of them: it depends on the platform and on whether the ad promotes prescriptions.</p>${table(['Platform', 'When certification applies'], [
          ['Meta', `Telehealth providers that promote prescription drugs need active LegitScript certification and Meta’s authorization, and can target only people 18+ in the US, Canada or New Zealand. Ads that promote telehealth services generally, or educate about prescription drugs, need no written authorization (${ext(SRC.metaDP, 'Meta')}).`],
          ['Google', `Telemedicine providers that prescribe need LegitScript certification first, then Google’s own certification (${ext(SRC.gHealthcare, 'Google')}). The order and steps: <a href="/advertising/telehealth-on-google/">telehealth ads on Google</a>.`],
          ['TikTok', `TikTok’s ads policies do not mention telehealth. Prescription medicine may be allowed in the US and Canada with proof of regulator approval and 18+ targeting, and is not allowed in most other markets (${ext(SRC.ttHealthcare, 'TikTok')}; <a href="/blog/tiktok-ads-health-brands/">rules by market</a>).`],
        ])}<p>What LegitScript itself involves: <a href="/glossary/legitscript-certification/">LegitScript certification, defined</a>.</p>`,
        sources: [SRC.metaDP, SRC.gHealthcare, SRC.ttHealthcare],
      },
      {
        id: 'landing-page',
        nav: 'Homepage or condition page?',
        q: 'Should telehealth ads send traffic to the homepage or a condition page?',
        html: '<p>A condition-specific landing page with a matching quiz, not the homepage. Someone who clicks a hair loss ad should land on a hair loss page whose quiz checks eligibility for that condition, then move to a low-friction first visit and an auto-refill membership. A generic “see a doctor online” page buries the intent that made the click worth paying for.</p><p>The page should lead with the outcome and the ease (convenience, discretion, speed to a prescription) and avoid disease or symptom claims that trip platform review. We build these pages as part of <a href="/services/cro/">CRO and funnels</a>.</p>',
        sources: [],
      },
      {
        id: 'measure',
        nav: 'What to measure',
        q: 'How should a telehealth brand measure paid acquisition?',
        html: '<p>On the cost per paying patient, then LTV:CAC and payback, not on the cost per consult. Consult CAC runs well below paying-patient CAC, and quoting it as if it were the real number is the most common misreport in the category. Track the full path from ad click to quiz, consult, prescription and first refill, and judge each channel on <a href="/glossary/ltv-cac-ratio/">LTV:CAC</a> of at least 3:1 and payback under 12 months.</p><p>Check your own numbers with the <a href="/tools/cac-calculator/">CAC calculator</a>.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'Can we still market async controlled-substance prescribing in 2026?', a: 'For now, yes. The DEA/HHS fourth extension (through Dec 31, 2026) preserves flexibility to prescribe Schedule II–V without a prior in-person visit. But the permanent Special Registration rule is unfinalized and could impose in-person requirements after 2026 - don’t build a growth model that assumes these flexibilities are permanent.' },
      { q: 'How do state licensing rules constrain multi-state marketing?', a: 'You can only treat patients in states where you have a licensed provider, and controlled-substance prescribing must comply with each state’s law on top of federal rules. Geo-gate paid campaigns and landing-page eligibility to your covered states, and add states to your provider network before scaling spend into them.' },
    ],
  },
  'supplements-dtc': {
    marketContext: 'The global supplements market sits at ~$210–228B in 2025–2026, compounding ~9% CAGR - but the urgent 2026 dynamic is a channel and cost inversion: blended DTC CAC has risen 40–60% since 2021 (supplements carry the highest CAC of any DTC category at ~$85–89), while TikTok Shop exploded into the largest Health & Beauty category (~$784M supplement GMV in the year ending Feb 2026). Winners default to subscription and go omnichannel (TikTok Shop + Amazon + retail) rather than fighting a losing paid-Meta-only CAC war under tightening FTC/FDA enforcement.',
    growthPlaybook: [
      { h: 'Meta is the workhorse, TikTok Shop is the growth engine, Amazon is the closer', p: 'Meta/Advantage+ remains the highest-intent scaled channel (~$45 cost-per-purchase, $1.46 CPC), but Jan 2025 changes stripped health advertisers of Purchase/ATC optimization - forcing landing-page-view or engagement events. TikTok Shop is where net-new demand and virality live (US GMV $15.8B in 2025 → ~$23.4B in 2026), best for lower-consideration formats sold via creator affiliate armies. Treat Amazon/Google as bottom-funnel conversion, not leaks to ignore.' },
      { h: 'Creative: raw UGC + ingredient education', p: 'Across 500 top supplement ads, product demos were 43.7% of winners, testimonial UGC 17.4%. Ship 10–20 hook variations per concept and hold a >30% 3-second hook-rate bar, rotating pain-point, founder-story, ingredient-education, and social-proof angles. Because FTC/FDA bar disease claims, lean on mechanism-of-action education and structure/function language ("supports gut health") - avoid literal before/after imagery.' },
      { h: 'Quiz-to-regimen funnel, subscription default, Day-1 AOV', p: 'Wire a "find your formula" quiz to a subscribe-and-save-default results page - quiz pages convert 20–35% higher than standard PDPs, yet only ~1.4% of supplement brands use them. Push AOV from ~$60 to $80–120 with goal-based bundles (15–20% discount) plus one-click post-purchase upsells. Favor annual prepay: 28% retention at month 12 vs 11% for monthly (2.5×).' },
      { h: 'LTV is won in the first 90 days', p: 'Supplements are near-pure replenishment (82–93% reorder among strong brands), but 44% of cancellations happen in the first 90 days and 12–20% churn in month 1. The biggest LTV lever is surviving that window: onboarding/education flows, "how to take it" content, cadence-matched shipping, and a second-order incentive. A one-time buyer averages 1–1.5 lifetime orders; a retained subscriber 8–18.' },
    ],
    commonMistakes: [
      'Making disease/cure or unsubstantiated claims - the FTC noticed ~700 supplement companies in April 2025 demanding substantiation or fines.',
      'Selling one-time purchase as the default instead of subscribe-and-save - you eat the highest CAC in DTC with none of the replenishment LTV.',
      'Ignoring Amazon leakage - running Meta/TikTok demand that converts on Amazon at lower margin and zero owned customer data.',
      'Under-investing in the first-90-day retention window where 44% of cancellations occur.',
      'Weight-loss supplement creative that attacks how people look, pinches fat for a close-up, or promises a result in a set time without qualifiers. Meta dropped its before-and-after ban in July 2026, but it still bans all three.',
    ],
    whatGoodLooksLike: [
      'Subscription attach rate 40–70% of new customers',
      'Monthly subscription churn 4–7% (keep month-1 under ~15%)',
      '90-day reorder rate 80%+ (top performers 82–93%)',
      'LTV:CAC 3:1–5:1 with contribution margin >35%; AOV $60 → $80–120 with bundles',
    ],
    subSegments: ['Greens & superfood powders', 'Gut health / probiotics', 'Sleep, stress & nootropics', 'Women’s hormonal health', 'Longevity / metabolic', 'Sports nutrition'],
    questions: [
      {
        id: 'platform-rules',
        nav: 'Platform rules for supplement ads',
        q: 'Which platform rules apply to supplement ads in 2026?',
        html: `<p>Each platform adds its own limits on top of FDA and FTC claim law, which bars supplements from claiming to treat, cure or prevent a disease (${ext(SRC.fdaSupplements, 'FDA')}).</p><ul><li><strong>Meta</strong> requires 18+ targeting for every dietary and health supplement ad, and bans claims to cure a closed list of incurable diseases, such as diabetes and cancer (${ext(SRC.metaHW, 'Meta')}).</li><li><strong>Google</strong> disapproves supplements that imply they are as effective as prescription drugs, products containing ephedra, hCG for weight loss, and DHEA outside the United States (${ext(SRC.gUnapproved, 'Google')}).</li><li><strong>TikTok</strong> sets supplement rules market by market, and any weight-loss or muscle-gain claim must target 18+ and promote a healthy lifestyle (${ext(SRC.ttWeight, 'TikTok')}).</li></ul><p>Platform detail: <a href="/advertising/supplements-on-meta/">supplement ads on Meta</a>, <a href="/advertising/supplements-on-google/">on Google</a> and <a href="/advertising/supplements-on-tiktok/">on TikTok</a>.</p>`,
        sources: [SRC.fdaSupplements, SRC.metaHW, SRC.gUnapproved, SRC.ttWeight],
      },
      {
        id: 'tiktok-weight-loss',
        nav: 'Weight-loss supplements on TikTok',
        q: 'Can supplement brands advertise weight-loss supplements on TikTok?',
        html: `<p>Yes, in more markets than before: since its September 2026 update, TikTok’s ${ext(SRC.ttWeight, 'Weight Management policy')} lists weight-loss supplements and meal replacements as possibly allowed in the United States and Canada and in select UK and EU markets. Ads must target 18+ and present results within a healthy lifestyle. Claims that the product works without diet or exercise, or that losing weight is easy or guaranteed, are not allowed, and ads cannot shame people about their bodies.</p><p>Which markets allow what: <a href="/advertising/supplements-on-tiktok/">supplement ads on TikTok</a>.</p>`,
        sources: [SRC.ttWeight],
      },
    ],
    extraFaq: [
      { q: 'What can I legally claim about a supplement in ads?', a: 'You can make structure/function claims describing how an ingredient supports normal body function ("supports immune health"), but not that it diagnoses, treats, cures, or prevents disease - that reclassifies it as an unapproved drug. Both FTC and FDA require competent, reliable scientific substantiation (ideally human RCTs) held before the claim runs.' },
      { q: 'What subscription churn should I expect, and where do I lose people?', a: 'Budget 4–7% monthly if well-run (8–12% is average), but the real danger is the front end: 12–20% cancel in month one and 44% of cancellations land within 90 days. The fix is onboarding education, cadence-matched shipments, and pushing annual prepay (28% month-12 retention vs 11% monthly).' },
    ],
  },
  'trt-hormone': {
    marketContext: 'The global TRT market is ~$2.4–2.5B in 2025–2026, but the real story is the DTC/telehealth layer: online men’s-health platforms have blown past $400M in US spend and grow ~9%/year, with Hims reporting 2.4M+ subscribers in 2025 (+31% YoY). The 2026 urgency is regulatory: the FDA removed testosterone’s cardiovascular black-box warning (easing prescribing), demand from men in their 30s–40s is exploding, and the DEA’s fourth telemedicine extension keeps the no-prior-exam pathway open through Dec 31, 2026 - but testosterone is Schedule III, so prescribing still legally requires a synchronous video visit and documented hypogonadism.',
    growthPlaybook: [
      { h: 'Google + YouTube + podcast carry the load; Meta is a minefield', p: 'In the clinic accounts we run, Meta gives clinics that link to patient portals little room for lower-funnel optimization (our observation, not a line in Meta’s ad standards), and without LegitScript certification and Meta’s authorization you cannot promote testosterone as a prescription drug, so for most clinics Meta works best for top-funnel symptom and education content driving to a compliant quiz. Google Search is the workhorse for high-intent queries but requires LegitScript and Restricted-Drug-Term compliance. Podcast/influencer (men’s-health, fitness, longevity) and YouTube pre-roll are highest-leverage - they sell the education narrative natively without tripping substance policies.' },
      { h: 'Sell the symptom and the evaluation, never the molecule', p: 'Winning hooks lead with the felt experience of low-T: fatigue, low libido, brain fog, stubborn belly fat, "not feeling like yourself at 40" - routing to a free symptom quiz with the CTA on assessment, not the drug. Keep testosterone, dosages, and "boost your T" claims out of copy and imagery. Frame outcomes as "find out if your levels are low," which converts the deliberating buyer (a 2–6 week consideration cycle) while staying in policy.' },
      { h: 'Quiz → at-home lab → consult → membership', p: 'The proven structure: symptom quiz as lead magnet, an at-home or lab-draw panel to confirm eligibility (often $65–$99 as a low-friction tripwire), a synchronous video consult, then a monthly membership bundling labs + medication + provider access. Tiering works - a low entry tier (~$25/mo + meds) and premium (~$99–$149/mo). Automating labs end-to-end is critical; manual lab handling is the single biggest killer of TRT retention.' },
      { h: 'Monitoring is the moat', p: 'Unlike ED (episodic) or GLP-1 (weight-goal churn), TRT is ongoing-to-lifelong once dialed in, so LTV is structurally high and retention is the whole game. Build around a scheduled lab-monitoring cadence (baseline, ~6–8 week titration, then quarterly) that protects safety and creates re-engagement. Ancillary prescriptions (HCG, anastrozole, PT-141) raise AOV and stickiness; tightly qualified programs see 2–3× the retention of loose ones.' },
    ],
    commonMistakes: [
      'Naming testosterone, showing vials or needles, or promising "boost your T" from an account without LegitScript certification and platform authorization: an avoidable rejection and account risk (keeping vials and needles out of creative is our guidance, not Meta’s wording).',
      'Treating TRT like an unregulated supplement and ignoring that it’s a Schedule III controlled substance requiring a synchronous video visit and documented diagnosis.',
      'Positioning as muscle-building / "get jacked," which triggers PED policy flags and attracts non-clinical buyers who churn.',
      'Over-promising outcomes ("cure fatigue," "10x your energy") instead of framing an evaluation.',
      'Handling labs manually or skipping the monitoring cadence, creating refill-stage friction and safety gaps that collapse retention.',
    ],
    whatGoodLooksLike: [
      'Fully-loaded CAC $180–$300 per acquired patient',
      'Symptom-quiz-to-lab-kit ~25–40%; consult-to-membership ~50–70%',
      '12-month retention 70–85%; payback under 6 months',
      'LTV ~$1,500–$3,000+ (near-lifelong therapy + ancillaries); LTV:CAC ≥ 3:1',
    ],
    subSegments: ['Men’s TRT telehealth', 'Women’s HRT / menopause', 'Longevity / hormone-optimization concierge', 'Thyroid & endocrine optimization', 'Sexual-wellness adjacency (PT-141, HCG)'],
    questions: [
      {
        id: 'naming-testosterone',
        nav: 'Naming testosterone in ads',
        q: 'Can a TRT clinic name testosterone in its ads?',
        html: `<p>On Meta only with certification, and Google and TikTok each draw the line differently.</p>${table(['Platform', 'What the policy says'], [
          ['Meta', `Advertisers with active LegitScript certification and Meta’s authorization can promote prescription drugs to people 18+ in the US, Canada or New Zealand (${ext(SRC.metaDP, 'Meta')}). Without both, advertise the clinic and the evaluation, not the drug.`],
          ['Google', `Testosterone products on Google’s ${ext(SRC.gRxList, 'prescription drug list')}, such as depo-testosterone and AndroGel, can appear in ad text only in the US, Canada and New Zealand, and keyword-targeting them needs certification (${ext(SRC.gRestricted, 'Google')}). The list does not include the bare word “testosterone”, and Google does not say whether it triggers the policy. Online prescribing needs LegitScript plus Google’s certification: <a href="/advertising/telehealth-on-google/">the steps</a>.`],
          ['TikTok', `TikTok’s ${ext(SRC.ttDangerous, 'Dangerous Products policy')} lists controlled drugs as not allowed, while its ${ext(SRC.ttHealthcare, 'Healthcare policy')} says prescription medicine may be allowed in the US and Canada with regulator approval. Neither names testosterone, so the two conflict for TRT. Prescription medicine is not allowed in the UK and EU.`],
        ])}`,
        sources: [SRC.metaDP, SRC.gRxList, SRC.gRestricted, SRC.ttDangerous, SRC.ttHealthcare],
      },
      {
        id: 'channels',
        nav: 'Channels beyond paid social',
        q: 'Which channels work for TRT when paid social is restricted?',
        html: '<p>Search, YouTube and podcasts carry most of the load, with Meta used for top-of-funnel education that drives to a symptom quiz. Google Search captures men already looking for testosterone testing or a clinic; YouTube pre-roll and men’s health, fitness and longevity podcasts carry the education story without leaning on drug claims; and SEO, content and referral reduce dependence on any one ad platform.</p><p>Every channel should route to the same place: a symptom quiz, then a lab panel and a video consult, so the offer is the evaluation rather than the drug. Spread this way, a policy change on one platform does not cut off every source of patients.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'Can you advertise testosterone directly on Meta and Google in 2026?', a: 'Only with certification. On Meta, promoting a prescription drug such as testosterone needs active LegitScript certification, Meta’s authorization and 18+ targeting in the US, Canada or New Zealand; without them, advertise the clinic, the consultation and the evaluation, not the drug. On Google, online prescribing needs LegitScript plus Google’s certification, and keyword-targeting prescription drug terms needs certification. The practical play for most clinics is symptom-and-quiz creative on Meta and YouTube and certified, evaluation-framed Search on Google.' },
      { q: 'What are the Schedule III telehealth prescribing rules for 2026?', a: 'Testosterone is Schedule III, so the DEA’s fourth extension (through Dec 31, 2026) is what currently allows initiating TRT without a prior in-person exam - via real-time video, for a legitimate medical purpose, in compliance with state law. A permanent DEA rule expected before end of 2026 will likely add registration and identity-verification requirements, so build the compliance stack now.' },
    ],
  },
  peptides: {
    marketContext: 'The peptide therapeutics market is ~$140B in 2025, but the operator-relevant slice - compounded/telehealth "wellness" peptides (BPC-157, TB-500, sermorelin, CJC-1295/ipamorelin, PT-141) - is a consumer-awareness rocket, with Google interest in "peptides" up ~80% and "cost of peptide therapy" up ~300% YoY. The 2026 urgency is regulatory whiplash: HHS moved ~14 of 19 restricted peptides off the FDA’s Category 2 list and FDA pulled BPC-157/TB-500 out in April 2026 - but none are FDA-approved, none have a USP monograph, and a July 2026 review is pending, so brands operate in a gray zone where a licensed 503A/503B telehealth path is the only defensible model.',
    growthPlaybook: [
      { h: 'Paid is mostly closed - build an organic + influencer moat', p: 'Meta and Google effectively prohibit direct peptide advertising (Meta bans HGH, DHEA, "unsafe substances"), and both tolerate only neutral educational content that does NOT link to a product/checkout. LegitScript logged a 308% YoY jump in problematic peptide ads with a matching enforcement surge. The durable channels are education-led SEO, practitioner/podcast influencers, email/SMS, affiliate, and community (Reddit, Discord) - treat paid social as top-of-funnel amplification only, never a conversion channel.' },
      { h: 'Win the SERP and the podcast, not the ad auction', p: 'The highest-ROI content is deep education mapped to intent keywords ("BPC-157 for tendon recovery," "sermorelin vs CJC-1295," "peptide therapy cost") plus credentialed-expert influencer content - physician/pharmacist/researcher voices convert and clear review, while consumer influencer claims are a compliance landmine. Angle around recovery, longevity, biohacking, and metabolic optimization with benefit framing, never disease-treatment claims.' },
      { h: 'Gate the funnel through telehealth', p: 'The compliant, scalable structure is education-led SEO → free or low-cost async provider consult → prescriber-gated 503A compounded script → recurring vial subscription. Gating behind a licensed practitioner is both the compliance shield and the trust unlock; "research use only" gray-market SKUs cap you at low-trust one-off buyers and maximal liability.' },
      { h: 'LTV lives in stacks, cycles, and refills', p: 'Peptides are inherently recurring - vials deplete, protocols run in cycles (e.g., 8-week BPC-157 courses), and biohackers stack complementary peptides. Build retention on auto-refill subscriptions, protocol/stack bundles, cycling reminders, and lab-retest touchpoints; the money is in the second-through-tenth order.' },
    ],
    commonMistakes: [
      'Trying to run Meta/Google paid ads on peptides at all - you’ll burn ad accounts, trip AI enforcement, and land on warning-letter lists.',
      'Making disease-treatment claims ("heals injuries," "reverses aging") instead of compliant structure/function benefit language.',
      'Selling "research use only / not for human consumption" vials while implying human dosing - the disclaimer doesn’t shield you and signals a gray-market brand.',
      'Ignoring the moving FDA 503A/Category 2 list - building a catalog on a peptide that could face a compliance reversal overnight.',
      'Skipping sourcing/quality proof (third-party COAs, 503A/503B pharmacy provenance) - trust gaps are the #1 conversion killer in a category buyers know is unregulated.',
    ],
    whatGoodLooksLike: [
      'Organic/SEO + referral ≥ 70–80% of sessions (paid social is off the table)',
      'Email/SMS-driven revenue ≥ 30–40% of total',
      'Subscription/auto-refill attach ≥ 40–50% of orders',
      'Blended CAC ~$80–150 via content/affiliate/influencer; 12-mo LTV 4–6× first order',
    ],
    subSegments: ['Recovery/healing (BPC-157, TB-500)', 'GH secretagogues (sermorelin, CJC-1295/ipamorelin)', 'Metabolic (AOD-9604)', 'Sexual wellness (PT-141)', 'Cosmetic/skin (GHK-Cu)', 'Longevity (epitalon, thymosin alpha-1)'],
    // Platform-rule questions wait for the owner's peptides stance (health plan O25).
    questions: [
      {
        id: 'content',
        nav: 'Content that brings in patients',
        q: 'What content brings in peptide therapy patients?',
        html: '<p>Deep education mapped to what people search, delivered by credentialed experts. Pages that answer specific questions, such as what a peptide is used for in recovery, how two peptides compare, or what therapy costs, meet buyers while they research. Physician, pharmacist and researcher voices on podcasts and video build the trust that consumer influencer claims do not, and they hold up better in review.</p><p>Frame benefits around recovery, longevity and metabolic health, never as treatment of a disease, and send readers to a consult rather than a checkout.</p>',
        sources: [],
      },
      {
        id: 'trust',
        nav: 'Earning buyer trust',
        q: 'How do peptide brands earn buyer trust?',
        html: '<p>By showing where the product comes from and who prescribes it. Publish third-party certificates of analysis and name the 503A or 503B pharmacy that compounds the product, gate every order behind a licensed prescriber, and keep any “research use only” catalog separate from anything aimed at human use. Buyers in this category know quality varies, so provenance does work that ad copy cannot.</p>',
        sources: [],
      },
      {
        id: 'refills',
        nav: 'Revenue after the first order',
        q: 'Where does peptide therapy revenue come from after the first order?',
        html: '<p>From refills, protocol cycles and stacks. Vials run out, protocols run in cycles, and patients often combine complementary peptides, so retention is built on auto-refill subscriptions, protocol bundles, cycle reminders and lab retest touchpoints. Most of the margin sits in the second through tenth order, which is why we judge peptide acquisition against lifetime revenue rather than first-order return. Email and SMS carry most of that work: see <a href="/blog/health-brand-retention-ltv-email-sms/">retention flows for health brands</a>.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'Why can’t I run peptide ads on Meta or Google?', a: 'Both platforms classify peptides under prohibited/unsafe substances and unapproved health-product policies - Meta explicitly bans HGH, DHEA, and "unsafe supplements," and neither allows ads linking to a peptide product or checkout. With a documented 308% YoY spike in problematic peptide ads and AI-driven enforcement, attempts get disapproved fast and put your ad account and domain at risk.' },
      { q: 'What does a compliant marketing path look like for a peptide brand?', a: 'Route everything through a licensed prescriber and a 503A/503B compounding pharmacy, market with structure/function benefit language (never cure/treat claims), and lean on education-led SEO, credentialed-expert (MD/PharmD) influencer and podcast content, owned email/SMS, and performance-based affiliates. Publish third-party COAs and pharmacy provenance for trust, and wall off any "research use only" catalog from human-use messaging.' },
    ],
  },
  'med-spa': {
    marketContext: 'The US medical aesthetics industry now exceeds $17B and grows more than $1B/year, with ~8,000–12,000 med spas compounding ~14% YoY. The 2026 urgency: GLP-1/semaglutide programs have exploded 340% since 2022 and are now the fastest-growing revenue line, pulling a younger "prejuvenation" cohort into the funnel - med spas that don’t capture the weight-loss-patient → long-term-injectables-member cross-sell cede the highest-LTV acquisition channel the category has ever had.',
    growthPlaybook: [
      { h: 'Google for intent, Meta for demand-gen - not one or the other', p: 'Med spa demand is intensely local and high-intent: "Botox near me" converts because the buyer is in-market, and Google delivers a median 3.33× ROAS vs Meta’s ~1.80×. Use Google Search for direct-response booking; use Meta to manufacture demand and fill retargeting pools where CPLs run $15–$50. Your Google Business Profile is the highest-leverage owned asset - ranking in the local 3-pack drives free high-intent bookings no ad budget replaces.' },
      { h: 'UGC video + offer-forward hooks, refreshed every 30–45 days', p: 'Video produces 2.5–3.8× more leads per dollar than static, and iPhone-shot patient UGC beats polished studio video by 40–60% on Meta. Put the offer, star rating, and location in the first line. Since July 2026, Meta allows before-and-after images for cosmetic procedures, injectables included, for 18+ audiences, so realistic results can lead the creative instead of hiding in retargeting carousels. Rotate 4–6 variants per ad set and ship 4–6 fresh video assets monthly: creative fatigue, not audience size, is the usual ceiling.' },
      { h: 'Sell the consult, not the discount - and answer in under 5 minutes', p: 'The funnel that works is offer → booked consultation → in-person close, not a $99 coupon that attracts no-shows (deep-discount lead-gen drives no-show rates as high as 40%). Speed-to-lead is decisive: leads contacted within 5 minutes book far higher, so pair ads with instant SMS/CRM follow-up and let patients self-book - over 40% of bookings happen outside business hours.' },
      { h: 'Monetize the re-treatment cycle with memberships', p: 'Med spa LTV is a subscription in disguise: neurotoxin wears off every 3–4 months, so a first Botox visit is really 3–4 visits/year. Members spend ~67% more and add ~$1,100/patient/year; membership programs drive +31% neuromodulator and +43% filler sales and can supply 20–30% of revenue through slow months. Treat GLP-1 weight-loss patients as top-of-funnel that graduates into aesthetics memberships.' },
    ],
    commonMistakes: [
      'Discount-led acquisition ($99 offers) that fills the calendar with 40%-no-show, low-commitment leads instead of consult-qualified buyers.',
      'No speed-to-lead system - leads sit for hours while the 5-minute contact window (and the booking) evaporates.',
      'Showing before-and-after results to under-18 audiences, or pairing them with copy that attacks how someone looks. Meta allows the images for 18+ only and bans statements of inferiority about appearance.',
      'Treating Google and Meta as interchangeable instead of Google-for-intent / Meta-for-demand, and letting 2 creatives run until they fatigue.',
      'Neglecting the Google Business Profile and review velocity, so the clinic never enters the local 3-pack.',
    ],
    whatGoodLooksLike: [
      'Google Ads CPL $25–$78 (sub-$30 in efficient markets); Meta lead-form CPL $15–$50',
      'Google Ads ROAS 3:1–5:1 (3.33× median)',
      'Consult show rate 80%+ (vs the 40% no-show floor of discount leads)',
      'Membership contribution 20–30% of revenue; member spend ~67% higher',
    ],
    subSegments: ['Injectables (neurotoxins + fillers)', 'Medical weight loss / GLP-1', 'Body contouring (CoolSculpting, EmSculpt)', 'Laser & skin', 'IV therapy / drip bars'],
    questions: [
      {
        id: 'botox',
        nav: 'Advertising Botox by name',
        q: 'Can a med spa advertise Botox by name?',
        html: `<p>On Google, only within its restricted drug terms rules; on Meta and TikTok, the written rules are silent or vary by market.</p>${table(['Platform', 'What the policy says'], [
          ['Google', `Botox, Dysport and Xeomin are on Google’s ${ext(SRC.gRxList, 'prescription drug term list')}: promotional use is limited to the US, Canada and New Zealand, and keyword-targeting them needs certification (${ext(SRC.gRestricted, 'Google')}). Dermal filler brands are not on the list, and FDA regulates fillers as ${ext(SRC.fdaFillers, 'medical devices')}.`],
          ['Meta', `Meta allows ads for dermal fillers and injectable treatments for audiences 18 and over (${ext(SRC.metaHW, 'Health and Wellness')}), but neither that standard nor the ${ext(SRC.metaDP, 'Drugs and Pharmaceuticals')} standard says whether naming Botox counts as promoting a prescription drug.`],
          ['TikTok', `In the US and Canada, cosmetic clinic ads such as fillers may be allowed for 18+, and the policy does not mention Botox. In the UK and EU, Botox is listed as not allowed, and Australia and New Zealand do not allow cosmetic clinic ads (${ext(SRC.ttHealthcare, 'TikTok')}).`],
        ])}<p>Platform detail: <a href="/advertising/med-spa-on-google/">Botox and med spa ads on Google</a> and <a href="/advertising/med-spa-on-tiktok/">on TikTok</a>.</p>`,
        sources: [SRC.gRxList, SRC.gRestricted, SRC.fdaFillers, SRC.metaHW, SRC.metaDP, SRC.ttHealthcare, SRC.gUnreliable],
      },
      {
        id: 'booked-visits',
        nav: 'Leads or booked visits?',
        q: 'Should med spa ads optimize for leads or booked visits?',
        html: '<p>Booked and attended consultations, not lead volume. Cheap Meta lead forms and deep-discount offers fill the calendar with people who do not show, so the numbers to watch are speed to lead, show rate and consult-to-treatment conversion. Pair ads with instant SMS follow-up and self-booking, and sell the consultation rather than a coupon.</p><p>Then treat the first visit as the start of a re-treatment cycle: neurotoxin wears off in months, so memberships and rebooking reminders are where a patient’s value builds.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'Should a new med spa spend on Google or Meta first?', a: 'Start on Google Search - you’re harvesting existing local intent, which books faster and returns 3:1–5:1 ROAS while you’re small. Layer Meta once you have creative and a retargeting pool; it manufactures demand and feeds cheaper leads, but those need aggressive sub-5-minute follow-up, so don’t turn it on until your booking/CRM response is tight.' },
      { q: 'Why are my leads cheap but my calendar still empty?', a: 'Cheap CPL usually means the leak is downstream - slow lead response, no-show-prone discount bookers, and weak consult-to-close. Track speed-to-lead, show rate, and consult conversion, not just CPL: moving consult conversion from 50% to 80% cuts real acquisition cost ~37% without spending another ad dollar.' },
    ],
  },
  'mental-health': {
    marketContext: 'The US telepsychiatry market hit ~$27.7B in 2025 and is projected to reach $64.5B by 2030 (18.4% CAGR), riding a structural demand-supply gap: 137M Americans live in a Mental Health Professional Shortage Area, and only 27.3% of national need is met. The 2026 urgency is regulatory whiplash - in Dec 2025 the DEA/HHS issued a fourth extension keeping telemedicine controlled-substance prescribing (including ADHD stimulants) legal without an in-person visit through Dec 31, 2026, so operators are racing to capture ADHD/med-management demand before permanent rules tighten the funnel.',
    growthPlaybook: [
      { h: 'Own high-intent Google search - it converts, but you pay to play', p: 'Search captures active demand ("online therapist near me," "psychiatrist that takes my insurance," "ADHD treatment online"). Healthcare search ads convert at ~8%, but mental health is now the most competitive healthcare vertical - a $4.22 average CPC, up 42% YoY. Prerequisite for prescription services: LegitScript Healthcare Merchant Certification, which Google requires before telemedicine providers advertise prescribing and Meta requires before telehealth providers promote prescription drugs.' },
      { h: 'Meta is for demand-gen, not lead-capture - and the rules changed', p: 'Use Meta/Instagram for top-of-funnel awareness and destigmatizing creative. Under Meta’s 2025 Sensitive Ad Categories, health advertisers are blocked from optimizing on Purchase/lower-funnel events and from lead-form fields asking whether someone has depression/anxiety - optimize to Landing Page Views, Leads, or Engagement. A 2026 wave is expected to hit healthcare lead-gen directly, so build first-party data capture (quiz, email) now.' },
      { h: 'Winning angles: insurance-covered, fast, de-stigmatized', p: 'The three hooks that move prospects: (1) "Covered by your insurance - check in 60 seconds," (2) "First appointment in days, not months," and (3) permission-giving copy ("You don’t have to be in crisis to get help"). Avoid outcome claims ("cure your anxiety") - they trigger Meta unapproved-health-claim rejections and LegitScript violations.' },
      { h: 'Eligibility check → matching quiz → fast first session → defend retention', p: 'The highest-converting structure is an insurance-eligibility check up front (removes the #1 objection), a short matching quiz, and a booked first appointment within 3–5 days. But the real P&L lever is retention: guided online therapy sees ~72% adherence vs ~26% self-guided, and LTV lives or dies on session-2 show rates, med-management refills, and reactivation of lapsed patients.' },
    ],
    commonMistakes: [
      'Running prescription-service ads without LegitScript certification. Google and Meta both require it for that, and an uncertified launch puts the ad account at risk.',
      'Optimizing Meta campaigns on Purchase/lead-form health questions that are now prohibited, so the algorithm never learns and CPLs balloon.',
      'Leading with cash-pay pricing when 42%+ of category revenue growth is insurance-driven - burying "we take your insurance" kills conversion.',
      'Ignoring provider supply: pouring spend into demand you can’t fulfill within days recreates the waitlist that made the patient churn.',
      'Baking outcome promises ("eliminate depression") into creative, guaranteeing ad disapprovals and compliance flags.',
    ],
    whatGoodLooksLike: [
      'Fully-loaded CAC $200–$400 (ADHD/controlled-substance 30–50% higher)',
      'Cost per qualified lead under $60–80 (top performers below $30)',
      'First-session show rate 70–80%',
      '3-month retention 50%+; blended LTV:CAC 3:1 or better',
    ],
    subSegments: ['Teletherapy (CBT for anxiety/depression)', 'Telepsychiatry & med management', 'ADHD care (eval + stimulant management)', 'Substance use / MAT', 'Employer / EAP & payer-sponsored'],
    questions: [
      {
        id: 'intake-funnel',
        nav: 'The intake funnel',
        q: 'What should a mental health intake funnel include?',
        html: `<p>An insurance eligibility check, a short matching quiz and a booked first session, in that order. The eligibility check removes the biggest objection up front, the quiz matches the patient to the right provider or program, and a first appointment within days keeps intent from going cold. After that, second-session show rates, medication-management refills and reactivating lapsed patients decide lifetime value.</p><p>Keep diagnosis questions out of lead forms and outcome promises out of the ads, and remember that prescription-service ads need LegitScript on ${ext(SRC.gHealthcare, 'Google')} and ${ext(SRC.metaDP, 'Meta')} (<a href="/advertising/telehealth-on-meta/">what Meta allows without it</a>). More on <a href="/glossary/quiz-funnel/">quiz funnels</a> and our <a href="/services/cro/">CRO and funnel work</a>.</p>`,
        sources: [SRC.gHealthcare, SRC.metaDP],
      },
      {
        id: 'provider-supply',
        nav: 'Scaling with provider supply',
        q: 'How should a mental health brand scale ad spend around provider supply?',
        html: '<p>Only into states where you have licensed providers who can see new patients within days. Patients can only be treated where a provider is licensed, and demand you cannot serve quickly recreates the waitlist that sent them searching in the first place, so it churns before the first session.</p><p>Geo-target campaigns and landing-page eligibility to covered states, watch open appointment slots by state alongside CAC, and add providers before raising budgets in a state. Expect ADHD and medication-management lines to cost more to acquire than therapy, and plan prescriber capacity for them separately.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'Do I need LegitScript certification to advertise, and what does it cost?', a: 'For ads that promote prescription services, yes: Google requires it before telemedicine providers advertise prescribing, and Meta requires it before telehealth providers promote prescription drugs. Meta ads that promote telehealth services generally need no authorization. Budget ~$975 application plus ~$2,150 annually per website (addiction/MAT runs higher), and factor 4–8 weeks lead time before prescription ads can run.' },
      { q: 'Insurance funnel or cash-pay funnel - which converts better in 2026?', a: 'Insurance-led wins on volume and CAC because the eligibility check removes the biggest objection, and payer revenue is the fastest-growing line (Talkspace +42% YoY payer revenue). Most winners run a hybrid: lead with "covered by insurance," verify benefits instantly, and offer a transparent self-pay fallback.' },
    ],
  },
  longevity: {
    marketContext: 'The core longevity services market sits at ~$27.6B in 2025 and is projected to reach ~$67B by 2035 (9.4% CAGR), nested inside a ~$1.8T global wellness market. The 2026 urgency is a validated DTC membership model plus a flood of capital - Function Health closed a $298M Series B in Nov 2025 at a $2.5B valuation (200K+ members at $365/yr), Superpower raised $30M at $300M+, and Bryan Johnson’s Blueprint raised $60M - signaling life-extension has crossed from billionaire experiment into scalable, mainstream consumer demand.',
    growthPlaybook: [
      { h: 'Match channel to consideration level, not just CPMs', p: 'Meta (Instagram/Reels) is the volume workhorse for affluent 40–60 buyers - Health & Wellness posts the highest Meta conversion rate of any category at 2.70% - but CPMs rose ~20% in 2025, so it can’t stand alone. Layer YouTube and long-form podcasts for the education-heavy, high-consideration purchase (a $4K–$40K decision gets researched, not impulse-bought), and reserve Google Search for bottom-funnel intent.' },
      { h: 'Lead with "biological age" and truth-from-bloodwork hooks', p: 'The winning angle reframes aging as measurable and fixable: "your bloodwork tells the truth," "know your biological age," "optimize, don’t just treat." Pair it with founder/physician authority on camera - the Function/Fountain Life/Bryan Johnson playbook proves a credible face plus a specific biomarker promise out-converts generic "feel younger" messaging.' },
      { h: 'Use a diagnostic tripwire into a membership', p: 'The dominant structure is a blood panel or biomarker test as a low-friction tripwire ($199–$500; $365/yr at Function), which converts into a recurring membership plus high-AOV concierge upsells ($2K–$5K/yr tiers). The panel monetizes acquisition and creates the personalized "here’s what’s wrong" hook that sells the ongoing relationship.' },
      { h: 'Engineer LTV through retesting cadence + recurring Rx', p: 'Retention is the entire game. Stack the levers: annual membership renewal, quarterly/biannual retesting (a natural re-engagement trigger), and recurring peptide/TRT/NAD+/supplement fulfillment. Bi-monthly and quarterly replenishment retains better than monthly, and the telehealth-supplement hybrid benchmark (Hims) runs ~85% retention on 2.2M+ subscribers.' },
    ],
    commonMistakes: [
      'Making implied disease-treatment claims ("reverse aging," "prevent Alzheimer’s") on supplements/peptides - DSHEA only permits structure/function claims with the FDA disclaimer.',
      'Selling the blood panel as a one-off transaction instead of a tripwire into a subscription - you eat CAC once and never earn the LTV.',
      'Weak scientific credibility: no named physician, no cited biomarkers - affluent 40–60 buyers won’t convert on vibes.',
      'Treating GLP-1/peptides as a standalone commodity in a price war instead of bundling into a membership with diagnostics.',
      'Optimizing to first-purchase ROAS on Meta and killing winning campaigns - 1.5–3× first-order ROAS is fine if blended LTV lands.',
    ],
    whatGoodLooksLike: [
      'LTV:CAC 3:1 or better; rework if CAC exceeds ~40% of LTV',
      'Blended ROAS 3–6× on repeat/membership; 1.5–3× acceptable on new acquisition',
      'Cost-per-lead $15–$50; supplement/DTC CPA $30–$70',
      'Monthly churn under 5–8% (top-quartile under 3%); annual renewal 80%+',
    ],
    subSegments: ['Hormone optimization (TRT/HRT)', 'Biomarker diagnostics DTC (Function, Superpower, Prenuvo)', 'Peptides', 'IV therapy & NAD+', 'Functional/precision medicine & concierge memberships'],
    questions: [
      {
        id: 'claims',
        nav: 'What you can claim',
        q: 'What can longevity brands claim about supplements and therapies?',
        html: `<p>Benefits you can substantiate, framed as support for normal body function, not treatment or prevention of disease. FDA treats a product marketed to treat, cure or prevent a disease as a drug, and supplement structure/function claims carry the disclaimer that the product “is not intended to diagnose, treat, cure, or prevent any disease” (${ext(SRC.fdaSupplements, 'FDA')}). Meta separately bans ad claims to cure, heal or eliminate a closed list of incurable diseases that includes Alzheimer’s and Parkinson’s (${ext(SRC.metaHW, 'Meta')}).</p><p>“Reverse aging” and “prevent Alzheimer’s” are the phrases that cause trouble. Hold the substantiation before the ad runs, and review landing pages and affiliate content as well as the ads. Definitions: <a href="/glossary/structure-function-claim/">structure/function claim</a>.</p>`,
        sources: [SRC.fdaSupplements, SRC.metaHW],
      },
      {
        id: 'channels',
        nav: 'Channels for a long decision',
        q: 'Which channels work for a high-consideration longevity purchase?',
        html: '<p>A mix matched to how long people research: Instagram for reach among affluent 40 to 60 year olds, YouTube and long-form podcasts for education, and Google Search for people ready to buy. A membership costing thousands a year gets researched, not bought on impulse, so cold paid social rarely carries it alone.</p><p>Put a named physician on camera and lead with a specific biomarker promise, such as knowing your biological age from a blood panel, rather than generic “feel younger” messaging. Then let a diagnostic offer start the relationship and the membership carry the economics.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'How do we advertise supplements and peptides without triggering FDA/FTC action?', a: 'Stick to DSHEA structure/function claims ("supports healthy testosterone levels") - never disease claims like "treats," "cures," or "prevents." Carry the mandatory "not intended to diagnose, treat, cure, or prevent any disease" disclaimer, hold substantiation before publishing, and audit ad copy, landing pages, and influencer/affiliate content since unmonitored marketing is the #1 warning-letter trigger.' },
      { q: 'Should the offer be a subscription or a one-time test?', a: 'Lead with a low-friction one-time diagnostic as a tripwire, then convert to a membership - the panel monetizes acquisition and generates the personalized hook. One-off testing leaves LTV on the table; retention (renewals, retests, recurring Rx/supplements) is the biggest profit lever, which is why Function anchors on a $365 annual model.' },
    ],
  },
  'fertility-ivf': {
    marketContext: 'The global fertility services market reached ~$51–55B in 2025 and is growing 7.5–8.3% CAGR toward ~$70–90B by 2030–2032, driven by delayed parenthood (average age at first egg-freezing cycle has fallen to 35.4; egg-freezing cycles jumped 39% YoY). The 2026 urgency is a convergence of coverage tailwinds - California’s SB 729 IVF mandate took effect Jan 2026, a new "excepted fertility benefits" rule created a pathway for employers to offer standalone fertility benefits, and employer coverage has climbed ~33% in two years - flooding the funnel with newly-covered, high-intent patients.',
    growthPlaybook: [
      { h: 'Google is the high-intent workhorse; Meta seeds a months-long funnel', p: 'Bottom-funnel search ("IVF clinic near me," "egg freezing cost") is where booked consults are won - $15–50 CPC in competitive metros, but it converts because the searcher is deep in a months-to-years journey. Meta/Instagram earns its keep on awareness and egg-freezing demand-gen among women 30–38 (empathy creative, "is now the right time?"), feeding retargeting rather than expecting same-session bookings.' },
      { h: 'Creative must be empathy-first and authority-backed, not clinical', p: 'Emotional headlines ("Start your family with confidence," "We see you") consistently beat feature-led copy, because the patient - not the physician - must be the hero. The four proven angles: empathy/we-understand, doctor-and-lab authority (embryology credentials, board-certified REIs), transparent financing, and a low-friction first consult. Present success rates compliantly (per-live-birth by SART age band) - never a cherry-picked "highest success rate" claim.' },
      { h: 'A free/low-cost first consult wrapped in financing and a long nurture', p: 'The conversion event is a booked consultation ($150–400 cost-per-consult), backed by transparent financing (multi-cycle bundles, lending partners, benefits navigation) surfaced before the price objection lands. Because the decision spans months, the machine is a long-window nurture - welcome sequence, pre-education, seminars/webinars, follow-up - with speed-to-lead the biggest lever (under-5-minute response lifts consult-booking ~78% vs 30 minutes).' },
      { h: 'LTV lives in multi-cycle, sibling journeys, and reviews', p: 'A single IVF start is $15–30k, but true value compounds across multiple cycles, frozen-embryo transfers, and "sibling journeys" when patients return 1–3 years later for baby #2 - so first-cycle ROAS understates lifetime economics. In a word-of-mouth category, reviews and referrals ARE the growth engine: aggressively earn Google reviews from successful patients and build structured referral loops.' },
    ],
    commonMistakes: [
      'Overpromising success rates or running "highest/best success rate" claims - violates the Fertility Clinic Success Rate & Certification Act and SART guidelines; ~27% of clinics already carry violations.',
      'Publishing stale success stats - only ~53% of clinics showing rates use current data.',
      'Clinical, physician-centric copy that ignores the emotional reality - the patient must be the hero.',
      'Weak or nonexistent nurture over a decision that takes months to years, so hard-won leads go cold.',
      'Hiding cost and skipping financing - burying pricing at a $15–30k sticker kills conversion.',
    ],
    whatGoodLooksLike: [
      'Cost per booked consult $150–400 ($80–250 in less-saturated markets)',
      'Consult-to-treatment conversion 30–50% for well-qualified leads',
      'Landing-page conversion 8–15% on treatment-specific pages vs 2–3% generic',
      'All-in CAC $200–600 per IVF start; marketing at 5–8% of revenue; 4.7+ review rating',
    ],
    subSegments: ['IVF (core, highest AOV)', 'Egg & embryo freezing (fastest-growing, elective)', 'IUI (lower-cost on-ramp)', 'LGBTQ+ / inclusive family building', 'Donor / surrogacy & fertility-benefit platforms'],
    questions: [
      {
        id: 'measure',
        nav: 'What to measure',
        q: 'What should fertility clinics measure instead of cost per lead?',
        html: '<p>Consult-to-cycle conversion: how many booked consultations become started cycles, and what each started cycle cost. It takes several consults to start one cycle, so a campaign that produces cheap consult leads that never start treatment looks efficient while burning budget.</p><p>Report cost per booked consult, consult show rate, consult-to-treatment conversion and cost per started cycle, by channel. Judge those against the value of a cycle and of the return journeys that follow, such as frozen-embryo transfers and a second child, not against first-month revenue.</p>',
        sources: [],
      },
      {
        id: 'nurture',
        nav: 'Nurturing patients who are not ready',
        q: 'How should fertility clinics nurture patients who are not ready to book?',
        html: '<p>With a long-window sequence that keeps educating and makes the next step easy, because the decision often spans months. A welcome series, pre-education content, seminars or webinars, and financing and benefits guidance shown before the price objection lands all keep the clinic present while the patient decides.</p><p>Speed still matters when someone does reach out: answer new inquiries within minutes, and let Meta and Instagram keep retargeting pools warm while Google captures people who are ready to book.</p>',
        sources: [],
      },
    ],
    extraFaq: [
      { q: 'Can we advertise our IVF success rates?', a: 'Yes, but tightly. The Wyden Law and SART’s guidelines require current, standardized figures reported as live birth per cycle/retrieval/transfer within SART age categories, with the SART disclaimer and link. Avoid unsubstantiated, comparative, or "best/highest" superiority claims - the most-cited violation types, which also carry FTC deceptive-advertising risk.' },
      { q: 'How should we message cost without scaring people off?', a: 'Lead with transparency and pair every price with a path forward - multi-cycle bundles, lending/financing partners, and insurance or employer-benefit navigation. Only about a third of employees can independently afford treatment, so surfacing financing and new employer-benefit pathways before the objection lands turns sticker shock into a booked consult.' },
    ],
  },
};

export const getPlaybook = (slug: string) => PLAYBOOKS[slug];
