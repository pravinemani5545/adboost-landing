// Enriched per-vertical content (2025–2026 research). Keyed by vertical slug.
// Feeds /industries/[slug]. Figures are directional industry benchmarks - verify
// fast-moving 2026 facts (cash-pay prices, peptide reclassification, DEA rules)
// before publishing as hard claims.

export interface Playbook {
  marketContext: string;
  growthPlaybook: { h: string; p: string }[];
  commonMistakes: string[];
  whatGoodLooksLike: string[];
  subSegments: string[];
  extraFaq: { q: string; a: string }[];
}

export const PLAYBOOKS: Record<string, Playbook> = {
  'glp-1-weight-loss': {
    marketContext: 'Roughly 10 million Americans are on branded GLP-1s in 2026 (up from 6M in 2024), with J.P. Morgan projecting 30M US patients and a $200B global incretin market by 2030. The 2026 land-grab: the FDA declared the shortages resolved (removing legal cover for mass-market compounding), and Lilly (LillyDirect) and Novo (NovoCare) launched cash-pay programs - Zepbound $299–$449/mo, Wegovy $199–$349/mo - collapsing the price umbrella compounders lived under. Distribution, trust, and CAC efficiency now decide winners.',
    growthPlaybook: [
      { h: 'Advertise the program, not the molecule', p: 'Meta drives the bulk of scaled DTC weight-loss acquisition, but its Health & Wellness policy bans before/after imagery, negative self-perception framing, and marketing compounded GLP-1s as equivalent to branded drugs - and 35+ state AGs pressured Meta in late 2025 to purge misleading ads. Google captures high-intent branded demand but needs LegitScript/pharmacy certification for Rx terms. Use TikTok for cheap top-of-funnel education, then retarget on Meta/Google.' },
      { h: 'Creative: specific, credible, native', p: 'Buyer sophistication has spiked - generic "lose weight fast" no longer converts. What works: relatable UGC testimonials with compliant disclaimers, "do you qualify?" eligibility hooks, and cost/access reframes ("brand-name Wegovy from $199/mo"). Segment hard (a 45-year-old woman researching Rx needs a different ad than a 32-year-old man) and ship 3+ hook variants per concept - the hook carries ~70% of performance.' },
      { h: 'The quiz → async-Rx → subscription machine', p: 'A 2–3 minute eligibility quiz (BMI ≥30, or ≥27 with a comorbidity) qualifies and segments the lead, feeding an asynchronous clinical intake that turns a script within 24–48 hours. Default users into a monthly subscription, not one-off fills, and use the cash-pay reframe as the offer wedge. The quiz doubles as your CRM entry point, so instrument SMS/email abandonment recovery.' },
      { h: 'Retention is the whole game', p: '50–65% of non-diabetic GLP-1 patients discontinue within 12 months, with GI distress driving ~62% of drop-offs and the steepest churn in the first 3 months - before meaningful weight loss lands. The LTV lever is proactive side-effect coaching, slower titration, anti-nausea support, and plateau/maintenance education - not more ad spend.' },
    ],
    commonMistakes: [
      'Running before/after or side-by-side transformation creative on Meta - an automatic policy rejection and account-risk trigger.',
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
      'Launching paid before securing LegitScript certification - Google, Meta, Bing and TikTok reject telehealth/pharmacy ads without it.',
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
      'Running literal before/after transformation creative that gets ads disapproved under Meta’s 2025 restrictions.',
    ],
    whatGoodLooksLike: [
      'Subscription attach rate 40–70% of new customers',
      'Monthly subscription churn 4–7% (keep month-1 under ~15%)',
      '90-day reorder rate 80%+ (top performers 82–93%)',
      'LTV:CAC 3:1–5:1 with contribution margin >35%; AOV $60 → $80–120 with bundles',
    ],
    subSegments: ['Greens & superfood powders', 'Gut health / probiotics', 'Sleep, stress & nootropics', 'Women’s hormonal health', 'Longevity / metabolic', 'Sports nutrition'],
    extraFaq: [
      { q: 'What can I legally claim about a supplement in ads?', a: 'You can make structure/function claims describing how an ingredient supports normal body function ("supports immune health"), but not that it diagnoses, treats, cures, or prevents disease - that reclassifies it as an unapproved drug. Both FTC and FDA require competent, reliable scientific substantiation (ideally human RCTs) held before the claim runs.' },
      { q: 'What subscription churn should I expect, and where do I lose people?', a: 'Budget 4–7% monthly if well-run (8–12% is average), but the real danger is the front end: 12–20% cancel in month one and 44% of cancellations land within 90 days. The fix is onboarding education, cadence-matched shipments, and pushing annual prepay (28% month-12 retention vs 11% monthly).' },
    ],
  },
  'trt-hormone': {
    marketContext: 'The global TRT market is ~$2.4–2.5B in 2025–2026, but the real story is the DTC/telehealth layer: online men’s-health platforms have blown past $400M in US spend and grow ~9%/year, with Hims reporting 2.4M+ subscribers in 2025 (+31% YoY). The 2026 urgency is regulatory: the FDA removed testosterone’s cardiovascular black-box warning (easing prescribing), demand from men in their 30s–40s is exploding, and the DEA’s fourth telemedicine extension keeps the no-prior-exam pathway open through Dec 31, 2026 - but testosterone is Schedule III, so prescribing still legally requires a synchronous video visit and documented hypogonadism.',
    growthPlaybook: [
      { h: 'Google + YouTube + podcast carry the load; Meta is a minefield', p: 'Meta’s 2025 restrictions strip lower-funnel optimization from clinics linking to patient portals, and you cannot name testosterone or promise a prescription in creative - so Meta works only for top-funnel symptom/education driving to a compliant quiz. Google Search is the workhorse for high-intent queries but requires LegitScript and Restricted-Drug-Term compliance. Podcast/influencer (men’s-health, fitness, longevity) and YouTube pre-roll are highest-leverage - they sell the education narrative natively without tripping substance policies.' },
      { h: 'Sell the symptom and the evaluation, never the molecule', p: 'Winning hooks lead with the felt experience of low-T: fatigue, low libido, brain fog, stubborn belly fat, "not feeling like yourself at 40" - routing to a free symptom quiz with the CTA on assessment, not the drug. Keep testosterone, dosages, and "boost your T" claims out of copy and imagery. Frame outcomes as "find out if your levels are low," which converts the deliberating buyer (a 2–6 week consideration cycle) while staying in policy.' },
      { h: 'Quiz → at-home lab → consult → membership', p: 'The proven structure: symptom quiz as lead magnet, an at-home or lab-draw panel to confirm eligibility (often $65–$99 as a low-friction tripwire), a synchronous video consult, then a monthly membership bundling labs + medication + provider access. Tiering works - a low entry tier (~$25/mo + meds) and premium (~$99–$149/mo). Automating labs end-to-end is critical; manual lab handling is the single biggest killer of TRT retention.' },
      { h: 'Monitoring is the moat', p: 'Unlike ED (episodic) or GLP-1 (weight-goal churn), TRT is ongoing-to-lifelong once dialed in, so LTV is structurally high and retention is the whole game. Build around a scheduled lab-monitoring cadence (baseline, ~6–8 week titration, then quarterly) that protects safety and creates re-engagement. Ancillary prescriptions (HCG, anastrozole, PT-141) raise AOV and stickiness; tightly qualified programs see 2–3× the retention of loose ones.' },
    ],
    commonMistakes: [
      'Running creative that names testosterone, shows vials/needles, or promises "boost your T" - an instant Meta/Google rejection that can nuke the account.',
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
    extraFaq: [
      { q: 'Can you advertise testosterone directly on Meta and Google in 2026?', a: 'Not the drug itself - you can advertise the clinic, the consultation, and the evaluation, but you cannot name testosterone, promise a prescription, or make treatment claims. Meta restricts lower-funnel optimization for clinics tied to patient portals, and Google requires LegitScript plus Restricted-Drug-Term compliance. The compliant play is symptom-and-quiz creative on Meta/YouTube and certified, evaluation-framed Search on Google.' },
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
    extraFaq: [
      { q: 'Why can’t I run peptide ads on Meta or Google?', a: 'Both platforms classify peptides under prohibited/unsafe substances and unapproved health-product policies - Meta explicitly bans HGH, DHEA, and "unsafe supplements," and neither allows ads linking to a peptide product or checkout. With a documented 308% YoY spike in problematic peptide ads and AI-driven enforcement, attempts get disapproved fast and put your ad account and domain at risk.' },
      { q: 'What does a compliant marketing path look like for a peptide brand?', a: 'Route everything through a licensed prescriber and a 503A/503B compounding pharmacy, market with structure/function benefit language (never cure/treat claims), and lean on education-led SEO, credentialed-expert (MD/PharmD) influencer and podcast content, owned email/SMS, and performance-based affiliates. Publish third-party COAs and pharmacy provenance for trust, and wall off any "research use only" catalog from human-use messaging.' },
    ],
  },
  'med-spa': {
    marketContext: 'The US medical aesthetics industry now exceeds $17B and grows more than $1B/year, with ~8,000–12,000 med spas compounding ~14% YoY. The 2026 urgency: GLP-1/semaglutide programs have exploded 340% since 2022 and are now the fastest-growing revenue line, pulling a younger "prejuvenation" cohort into the funnel - med spas that don’t capture the weight-loss-patient → long-term-injectables-member cross-sell cede the highest-LTV acquisition channel the category has ever had.',
    growthPlaybook: [
      { h: 'Google for intent, Meta for demand-gen - not one or the other', p: 'Med spa demand is intensely local and high-intent: "Botox near me" converts because the buyer is in-market, and Google delivers a median 3.33× ROAS vs Meta’s ~1.80×. Use Google Search for direct-response booking; use Meta to manufacture demand and fill retargeting pools where CPLs run $15–$50. Your Google Business Profile is the highest-leverage owned asset - ranking in the local 3-pack drives free high-intent bookings no ad budget replaces.' },
      { h: 'UGC video + offer-forward hooks, refreshed every 30–45 days', p: 'Video produces 2.5–3.8× more leads per dollar than static, and iPhone-shot patient UGC beats polished studio video by 40–60% on Meta. Put the offer, star rating, and location in the first line, and keep before/afters inside split-screen carousels for retargeting to survive Meta’s ban on injectable imagery. Rotate 4–6 variants per ad set and ship 4–6 fresh video assets monthly - creative fatigue, not audience size, is the usual ceiling.' },
      { h: 'Sell the consult, not the discount - and answer in under 5 minutes', p: 'The funnel that works is offer → booked consultation → in-person close, not a $99 coupon that attracts no-shows (deep-discount lead-gen drives no-show rates as high as 40%). Speed-to-lead is decisive: leads contacted within 5 minutes book far higher, so pair ads with instant SMS/CRM follow-up and let patients self-book - over 40% of bookings happen outside business hours.' },
      { h: 'Monetize the re-treatment cycle with memberships', p: 'Med spa LTV is a subscription in disguise: neurotoxin wears off every 3–4 months, so a first Botox visit is really 3–4 visits/year. Members spend ~67% more and add ~$1,100/patient/year; membership programs drive +31% neuromodulator and +43% filler sales and can supply 20–30% of revenue through slow months. Treat GLP-1 weight-loss patients as top-of-funnel that graduates into aesthetics memberships.' },
    ],
    commonMistakes: [
      'Discount-led acquisition ($99 offers) that fills the calendar with 40%-no-show, low-commitment leads instead of consult-qualified buyers.',
      'No speed-to-lead system - leads sit for hours while the 5-minute contact window (and the booking) evaporates.',
      'Running before/after and injectable imagery in Meta primary text and getting the ad account restricted.',
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
    extraFaq: [
      { q: 'Should a new med spa spend on Google or Meta first?', a: 'Start on Google Search - you’re harvesting existing local intent, which books faster and returns 3:1–5:1 ROAS while you’re small. Layer Meta once you have creative and a retargeting pool; it manufactures demand and feeds cheaper leads, but those need aggressive sub-5-minute follow-up, so don’t turn it on until your booking/CRM response is tight.' },
      { q: 'Why are my leads cheap but my calendar still empty?', a: 'Cheap CPL usually means the leak is downstream - slow lead response, no-show-prone discount bookers, and weak consult-to-close. Track speed-to-lead, show rate, and consult conversion, not just CPL: moving consult conversion from 50% to 80% cuts real acquisition cost ~37% without spending another ad dollar.' },
    ],
  },
  'mental-health': {
    marketContext: 'The US telepsychiatry market hit ~$27.7B in 2025 and is projected to reach $64.5B by 2030 (18.4% CAGR), riding a structural demand-supply gap: 137M Americans live in a Mental Health Professional Shortage Area, and only 27.3% of national need is met. The 2026 urgency is regulatory whiplash - in Dec 2025 the DEA/HHS issued a fourth extension keeping telemedicine controlled-substance prescribing (including ADHD stimulants) legal without an in-person visit through Dec 31, 2026, so operators are racing to capture ADHD/med-management demand before permanent rules tighten the funnel.',
    growthPlaybook: [
      { h: 'Own high-intent Google search - it converts, but you pay to play', p: 'Search captures active demand ("online therapist near me," "psychiatrist that takes my insurance," "ADHD treatment online"). Healthcare search ads convert at ~8%, but mental health is now the most competitive healthcare vertical - a $4.22 average CPC, up 42% YoY. Non-negotiable prerequisite: LegitScript Healthcare Merchant Certification, the gatekeeper Google, Microsoft, and Meta require before you run a single telehealth ad.' },
      { h: 'Meta is for demand-gen, not lead-capture - and the rules changed', p: 'Use Meta/Instagram for top-of-funnel awareness and destigmatizing creative. Under Meta’s 2025 Sensitive Ad Categories, health advertisers are blocked from optimizing on Purchase/lower-funnel events and from lead-form fields asking whether someone has depression/anxiety - optimize to Landing Page Views, Leads, or Engagement. A 2026 wave is expected to hit healthcare lead-gen directly, so build first-party data capture (quiz, email) now.' },
      { h: 'Winning angles: insurance-covered, fast, de-stigmatized', p: 'The three hooks that move prospects: (1) "Covered by your insurance - check in 60 seconds," (2) "First appointment in days, not months," and (3) permission-giving copy ("You don’t have to be in crisis to get help"). Avoid outcome claims ("cure your anxiety") - they trigger Meta unapproved-health-claim rejections and LegitScript violations.' },
      { h: 'Eligibility check → matching quiz → fast first session → defend retention', p: 'The highest-converting structure is an insurance-eligibility check up front (removes the #1 objection), a short matching quiz, and a booked first appointment within 3–5 days. But the real P&L lever is retention: guided online therapy sees ~72% adherence vs ~26% self-guided, and LTV lives or dies on session-2 show rates, med-management refills, and reactivation of lapsed patients.' },
    ],
    commonMistakes: [
      'Running paid ads without LegitScript certification first - accounts get suspended and domains blacklisted across Google/Meta/Microsoft simultaneously.',
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
    extraFaq: [
      { q: 'Do I need LegitScript certification to advertise, and what does it cost?', a: 'Yes - it’s the de facto prerequisite for telehealth ads on Google, Meta, Microsoft, and TikTok. Budget ~$975 application plus ~$2,150 annually per website (addiction/MAT runs higher), and factor 4–8 weeks lead time before you can spend a dollar.' },
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
    extraFaq: [
      { q: 'Can we advertise our IVF success rates?', a: 'Yes, but tightly. The Wyden Law and SART’s guidelines require current, standardized figures reported as live birth per cycle/retrieval/transfer within SART age categories, with the SART disclaimer and link. Avoid unsubstantiated, comparative, or "best/highest" superiority claims - the most-cited violation types, which also carry FTC deceptive-advertising risk.' },
      { q: 'How should we message cost without scaring people off?', a: 'Lead with transparency and pair every price with a path forward - multi-cycle bundles, lending/financing partners, and insurance or employer-benefit navigation. Only about a third of employees can independently afford treatment, so surfacing financing and new employer-benefit pathways before the objection lands turns sticker shock into a booked consult.' },
    ],
  },
};

export const getPlaybook = (slug: string) => PLAYBOOKS[slug];
