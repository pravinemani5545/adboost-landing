// "[Competitor] alternative" pages: decision pages written at the category
// level. Frame trade-offs, never generalize about a competitor type, quote no
// prices (none are published for either side), and say when the other option
// is the better call (health plan O11, TR H7). The generalist page holds the
// canonical "how to choose a health growth agency" question list (P1, CN 3.5).

import { isLive } from '../lib/live';

const MHW = 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/';
const MDP = 'https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/';
const GHM = 'https://support.google.com/adspolicy/answer/176031';
const GRX = 'https://support.google.com/adspolicy/answer/15598647';
const FTC = 'https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance';
const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

export interface Compare {
  slug: string;
  competitor: string;          // "a full-service healthcare agency" (cards, llms-full)
  themLabel: string;           // table and choose headers: "A full-service agency"
  h1: string;
  metaTitle: string;           // title tag, kept distinct from h1 and <= 60 chars
  metaDescription?: string;    // REQUIRED, hand-written, 140-160 chars (src/lib/seo.ts)
  intent: string;              // who's searching
  answer: string;              // answer-first summary under the H1, 40-60 words
  chooseThem: string[];        // "Choose <them> if"
  chooseUs: string[];          // "Choose AdBoost Health if"
  rows: { dimension: string; them: string; us: string }[];
  tradeoffs: { id: string; q: string; html: string }[];  // buyer-question H2s (trusted HTML)
  theirFocus: string;
  ourDifference: string;
  bestWhen: string;            // when the competitor is the better fit (honesty)
  notFit: string[];            // when AdBoost Health is not the right fit
  questions?: { intro: string; items: { q: string; a: string; strong: string; flag: string }[] };
  faq: { q: string; a: string }[];
}

const ALL_COMPARES: Compare[] = [
  {
    slug: 'full-service-healthcare-agency-alternative',
    competitor: 'a full-service healthcare agency',
    themLabel: 'A full-service healthcare agency',
    h1: 'AdBoost Health vs. a full-service healthcare agency',
    metaTitle: 'Full-Service Healthcare Agency Alternative | AdBoost Health',
    metaDescription: 'How AdBoost Health compares to a full-service healthcare agency: paid acquisition and compliant creative for DTC health brands, not broad brand, web and PR.',
    intent: 'Health founders deciding between a broad, full-service healthcare agency and a specialist paid-acquisition partner.',
    answer: 'Choose a full-service healthcare agency when you need brand, website, PR and patient marketing from one team. Choose AdBoost Health when paid acquisition is your growth engine: we run Meta, Google and TikTok ads, in-house creative and landing pages for DTC health brands, and do not sell brand, web or PR work.',
    chooseThem: [
      'You need brand strategy, a website rebuild, PR or offline patient marketing in the same engagement.',
      'You are a clinic, practice group or hospital system whose patients come mostly from local and referral channels.',
      'You want one vendor accountable for every channel, and paid ads are a small part of the plan.',
    ],
    chooseUs: [
      'You sell direct to consumers (telehealth, GLP-1, supplements, wellness) and paid ads drive most new customers.',
      'Rejected ads, account restrictions or certification questions are slowing your launches.',
      'You need new creative every month to keep testing, not a quarterly campaign.',
      'You judge marketing on CAC, payback and contribution margin rather than reach.',
    ],
    rows: [
      { dimension: 'Primary focus', them: 'Brand, web, PR and patient marketing under one roof', us: 'Paid acquisition, in-house creative and CRO for DTC health' },
      { dimension: 'Built for', them: 'Practices, hospital systems and healthcare companies of many kinds', us: 'DTC health, telehealth, GLP-1 and supplement brands' },
      { dimension: 'Health ad policy review', them: 'Varies by agency: ask who reviews creative before launch', us: 'Every creative reviewed against Meta, Google and TikTok health policies before launch' },
      { dimension: 'Creative', them: 'Depends on the agency’s studio and scope', us: '20+ compliant variants a month, produced in-house' },
      { dimension: 'Setup', them: 'Depends on how many disciplines are in scope', us: '5-day setup' },
      { dimension: 'What you can hand over', them: 'Most of a marketing department', us: 'Paid media, creative, landing pages and quiz funnels' },
    ],
    tradeoffs: [
      {
        id: 'cost',
        q: 'How do the costs compare?',
        html: `<p>Neither model has a standard price, so compare scope rather than headline fees. A full-service retainer pays for several disciplines at once, so part of it funds brand, web and PR work whether or not you need it this quarter. An AdBoost Health retainer covers paid media, creative and conversion work by one senior team; if you also need a website or PR, you buy that separately.</p><p>Ask any agency to break its fee into the work it covers and the people doing it. If most of the fee goes to channels that do not drive your new customers, the cheaper-looking option may cost more per patient or subscriber.</p>`,
      },
      {
        id: 'speed',
        q: 'How fast does each one start?',
        html: `<p>AdBoost Health’s setup takes 5 days. Most partners see directional movement on CAC or ROAS within two weeks, and the full system compounds by day 31 (<a href="/services/">how the three services work together</a>). A full-service engagement’s timeline depends on its scope: a brand project or website rebuild runs on its own schedule before or alongside media.</p><p>Whichever you pick, ask for a week-by-week plan for the first 30 days, and check that measurement is fixed before spend goes up.</p>`,
      },
      {
        id: 'policy',
        q: 'Who keeps up with health ad policy?',
        html: `<p>Health ad rules change, and they change per platform. Meta revised its ${ext(MHW, 'Health and Wellness ad standard')} in July 2026, and its ${ext(MDP, 'Drugs and Pharmaceuticals standard')} requires LegitScript certification and Meta’s authorization for telehealth providers and online pharmacies that promote prescription drugs. Google requires LegitScript and then its own certification for telemedicine providers (${ext(GHM, 'Google’s Healthcare and medicines policy')}).</p><p>A full-service agency can know these rules well; ask who on the team reads them and reviews creative before launch. At AdBoost Health that review is part of every launch, and the rules we track are on our <a href="/advertising/">health ad policy pages by platform</a>.</p>`,
      },
    ],
    theirFocus: 'Multi-discipline marketing across healthcare (brand, creative, web, PR and patient acquisition), often for practices, hospital systems and healthcare companies.',
    ourDifference: 'We do one thing: profitable, compliant paid acquisition for DTC health and telehealth brands, with senior strategists, in-house creative and clean attribution in one team.',
    bestWhen: 'A full-service agency is the better fit if you need brand strategy, a website rebuild, PR and offline patient marketing bundled together, especially for a clinic or hospital system rather than a DTC brand.',
    notFit: [
      'You need brand, website, PR or offline marketing from the same team. We do not sell those.',
      'Your patients come mainly from referrals and local search, and paid social is not part of the plan.',
      'You sell outside health. Our sister brand AdBoost Media works with DTC ecommerce brands outside health.',
    ],
    faq: [
      { q: 'Do you do brand, web, and PR too?', a: 'No, deliberately. We focus on paid acquisition, compliant creative and conversion for DTC health brands. If you need a full marketing department, a full-service healthcare agency is the better fit; if you need CAC down and spend scaled, that is us.' },
      { q: 'Can we use a full-service agency and AdBoost Health together?', a: 'Yes. One workable split is brand, website and PR with the full-service agency, and paid acquisition, creative testing and landing pages with us. Agree up front who owns tracking and landing pages so the two teams are not changing the same things.' },
      { q: 'Do you build landing pages?', a: 'Yes. We design, write and A/B test landing pages and quiz funnels as part of CRO, and you own everything we build. We do not rebuild full websites.' },
    ],
  },
  {
    slug: 'in-house-growth-team-alternative',
    competitor: 'building an in-house growth team',
    themLabel: 'An in-house growth team',
    h1: 'AdBoost Health vs. hiring an in-house growth team',
    metaTitle: 'In-House Growth Team Alternative | AdBoost Health',
    metaDescription: 'Building in-house means hiring for paid media, creative and health ad policy. How AdBoost Health compares, and how the two can work together.',
    intent: 'Founders weighing whether to hire a growth lead, media buyer and creative in-house or partner with a specialist agency.',
    answer: 'An in-house team gives you full-time owners who build knowledge inside the company, at the cost of recruiting, managing and keeping every role. AdBoost Health gives you a senior health team, in-house creative and ad policy review from a 5-day setup. Many brands combine both: an internal growth lead plus a specialist partner.',
    chooseThem: [
      'Acquisition is a permanent core competency and you want full-time owners for it.',
      'Your spend is large and stable enough to keep each specialist fully used.',
      'You need people embedded daily with product, retention and analytics.',
      'You already have a growth leader who can hire and manage the team.',
    ],
    chooseUs: [
      'You need a working acquisition system now rather than after a hiring round.',
      'You want health ad policy review built in instead of hired for.',
      'You need more tested creative each month than one or two designers can make.',
      'You want senior strategy without adding several senior hires.',
    ],
    rows: [
      { dimension: 'Time to productive', them: 'Recruiting each role, then ramp on your account', us: '5-day setup' },
      { dimension: 'What you pay for', them: 'Salaries, benefits, recruiting, tools and management time', us: 'One retainer, senior team included' },
      { dimension: 'Creative volume', them: 'Limited by how many creators you hire', us: '20+ compliant variants a month' },
      { dimension: 'Health ad policy knowledge', them: 'Hire for it or build it on the job', us: 'Built in from day one' },
      { dimension: 'Continuity', them: 'Yours to keep; turnover is your risk', us: 'Cancel-and-keep-the-plan flexibility' },
    ],
    tradeoffs: [
      {
        id: 'cost',
        q: 'What does building in-house cost compared to an agency?',
        html: `<p>Compare a fully loaded team with an agency retainer plus the internal owner you would keep anyway. A complete in-house acquisition function usually needs several skills: strategy, media buying on each platform, creative production, and analytics. Add salaries, benefits, recruiting fees, ad tools and the management time each hire takes.</p><p>Salaries depend on your market and the seniority you need, so price your own roles rather than trusting a national average. The question that decides it is whether each person would be fully used at your current spend. If one creative would sit idle half the month, or one media buyer would have to cover three platforms, a partner can cover those gaps without another full-time salary.</p>`,
      },
      {
        id: 'speed',
        q: 'How long until each one is productive?',
        html: `<p>An in-house team becomes productive after each role is recruited and has learned your account, offer and funnel, and the timeline depends on how quickly you can hire. AdBoost Health’s setup takes 5 days; most partners see directional movement on CAC or ROAS within two weeks, and the system compounds by day 31.</p><p>Speed matters most when a launch date or a cash runway is fixed. If you can wait for the team, in-house is a sound long-term answer; if you cannot, a partner buys you the months.</p>`,
      },
      {
        id: 'together',
        q: 'Can an in-house team and AdBoost Health work together?',
        html: `<p>Yes, and many partners work this way. The internal growth lead owns strategy, retention, analytics and the relationship with product. We run paid execution, compliant creative volume and attribution: the pieces that are slowest to build in-house. Everything we produce for your brand is yours to keep, so moving work in-house later does not mean starting over.</p><p>Agree the split in writing: who approves creative, who owns the ad accounts and tracking, and which numbers the two teams report against (blended <a href="/glossary/cac/">CAC</a> and <a href="/glossary/cac-payback-period/">payback</a> rather than each platform’s own attribution).</p>`,
      },
    ],
    theirFocus: 'A dedicated internal team (growth lead, media buyer, creative, analyst) that owns acquisition full-time and builds knowledge inside the company.',
    ourDifference: 'You get a senior strategist, a compliant-creative engine and an attribution stack now, with health ad policy expertise built in, and no recruiting, ramp or turnover risk.',
    bestWhen: 'In-house wins once you are at real scale and want acquisition as a permanent core competency with dedicated, full-time owners. Many brands graduate there, and we help set the foundation they inherit.',
    notFit: [
      'Your in-house team already ships enough tested creative and keeps your ad accounts in good standing.',
      'You need someone embedded full-time across product, retention and analytics rather than an acquisition partner.',
      'You sell outside health. Our sister brand AdBoost Media works with DTC ecommerce brands outside health.',
    ],
    faq: [
      { q: 'Can you work alongside our in-house team?', a: 'Yes. Many partners keep an internal growth lead and use us for compliant creative volume, paid execution and attribution, the pieces that are hardest and slowest to build in-house.' },
      { q: 'When should a brand move acquisition in-house?', a: 'When acquisition is a permanent core competency, spend is large and stable enough to keep each specialist fully used, and you have a leader who can hire and manage the team. Many brands graduate there, and we help set the foundation they inherit.' },
      { q: 'Who owns the creative and accounts if we bring the work in-house later?', a: 'You do. Everything we produce for your brand is yours to keep.' },
    ],
  },
  {
    slug: 'generalist-dtc-agency-alternative',
    competitor: 'a generalist DTC agency',
    themLabel: 'A generalist DTC agency',
    h1: 'AdBoost Health vs. a generalist DTC agency',
    metaTitle: 'Generalist DTC Agency Alternative | AdBoost Health',
    metaDescription: 'Generalist DTC agency or a health specialist? The trade-offs in ad policy review, creative and account risk, and how AdBoost Health compares.',
    intent: 'Health founders who have worked with, or are considering, a general ecommerce or DTC agency that does not specialize in health.',
    answer: 'A generalist DTC agency runs proven ecommerce playbooks and is often the better fit for products with no health claims. For telehealth, GLP-1 and supplement brands, the trade-off is ad policy: claims, certification and account risk. AdBoost Health pairs the same performance discipline with health-only policy review. The nine questions below help you vet either.',
    chooseThem: [
      'Your product makes no health claims and needs no certification to advertise.',
      'You sell across several categories and want one agency for all of them.',
      'The agency can show live health accounts today and a written pre-launch policy review.',
    ],
    chooseUs: [
      'You sell telehealth, prescription or supplement products where claims and certification decide what can run.',
      'Ads keep getting rejected, or the ad account has been restricted.',
      'You want benchmarks and creative angles drawn only from health accounts.',
    ],
    rows: [
      { dimension: 'Vertical focus', them: 'Many DTC categories', us: 'Health, telehealth, GLP-1 and supplements only' },
      { dimension: 'Health ad policy review', them: 'Depends on the agency’s health experience: ask how many health accounts it runs now', us: 'Every creative reviewed against Meta, Google and TikTok health policies before launch' },
      { dimension: 'Creative angles', them: 'Built across many categories', us: 'Health-specific, claims-safe angle library' },
      { dimension: 'Benchmarks', them: 'Cross-category', us: 'Per-vertical health CAC benchmarks' },
      { dimension: 'Best for', them: 'Products with no health claims', us: 'Regulated health, telehealth and supplement brands' },
    ],
    tradeoffs: [
      {
        id: 'policy',
        q: 'What changes when a health brand hires a generalist agency?',
        html: `<p>The performance playbook stays the same; the rules around it do not. On Meta, telehealth providers and online pharmacies need active LegitScript certification and Meta’s authorization before ads promote a prescription drug (${ext(MDP, 'Meta Drugs and Pharmaceuticals standard')}), and Meta revised its ${ext(MHW, 'Health and Wellness standard')} in July 2026. On Google, telemedicine providers need LegitScript and then Google’s own certification (<a href="/advertising/telehealth-on-google/">the steps</a>). Supplements may make structure/function claims but not disease claims (<a href="/glossary/structure-function-claim/">what the FDA allows</a>).</p><p>An agency that already runs health accounts works inside these rules from the first brief. One that does not can still learn them; ask how it will, and whose budget pays for the learning.</p>`,
      },
      {
        id: 'risk',
        q: 'Who carries the account risk?',
        html: `<p>You do. A policy problem lands on your ad account, your landing pages and your launch date, not on the agency. Google, for example, says it treats offering prescription drugs without a prescription as egregious and suspends those accounts on detection without prior warning (${ext(GHM, 'Healthcare and medicines policy')}), while other prescription drug services violations get a warning at least 7 days before suspension (${ext(GRX, 'Prescription drug services policy')}).</p><p>That is why the most useful thing to learn about any agency, generalist or specialist, is its pre-launch review process. The nine questions below are built to surface it.</p>`,
      },
      {
        id: 'disclosure',
        q: 'Is this page biased against generalist agencies?',
        html: `<p>We are a specialist, so read this page with that in mind. Our sister brand, <a href="https://www.adboost.media/">AdBoost Media</a>, is itself a DTC ecommerce agency for brands outside health, run by the same senior team. This page does not argue that generalists are worse at ecommerce. It argues that health adds a policy layer, and that you should check whether any agency you hire has it.</p>`,
      },
    ],
    theirFocus: 'Broad DTC and ecommerce growth across categories such as apparel, beauty, food and consumer goods, built on the general paid social, search and email playbook.',
    ourDifference: 'We work only in health, so ad policy review, claims-safe creative and certification sequencing are part of every launch, alongside the same performance discipline.',
    bestWhen: 'A generalist is a good fit if you sell a consumer product with no health claims: the policy layer we specialize in does not apply to you.',
    notFit: [
      'Your product makes no health claims and needs no certification. Our sister brand AdBoost Media works with DTC ecommerce brands outside health.',
      'You need one agency across several non-health brands in a portfolio.',
      'You want a short test sprint: our system takes about 31 days to compound.',
    ],
    questions: {
      intro: 'Ask every agency on your shortlist these nine questions, including us. Each one has an answer-first note on what a strong answer includes; the table at the end lists the red flags.',
      items: [
        {
          q: 'How many health brands are in your current portfolio?',
          a: `A strong answer is a number of live health accounts today, not a story about one wellness client years ago. Health ad policy keeps moving (Meta revised its ${ext(MHW, 'Health and Wellness standard')} in July 2026), so an agency needs current accounts to know what is being enforced now. Ask about the current portfolio rather than “have you worked with,” which invites the story.`,
          strong: 'A number of live health accounts today',
          flag: 'One past wellness client',
        },
        {
          q: 'What is your compliance review process before launch?',
          a: `A strong answer names a pre-launch process: every creative checked against ${ext(MHW, 'Meta’s Health and Wellness')} and ${ext(MDP, 'Drugs and Pharmaceuticals')} standards and ${ext(GHM, 'Google’s Healthcare and medicines policy')}, every claim mapped to the substantiation the ${ext(FTC, 'FTC’s Health Products Compliance Guidance')} expects, and the landing page reviewed together with the ad. For prescription and telehealth brands, follow up on certification: <a href="/glossary/legitscript-certification/">LegitScript</a> first, then each platform’s own authorization.`,
          strong: 'A named process: policy check, claim substantiation, landing page review',
          flag: '“We’re careful with claims”',
        },
        {
          q: 'What CAC ranges do you see for brands like mine?',
          a: `A strong answer gives ranges by vertical and channel, with the caveats that make them honest: blended or platform-reported, at what spend, subscription or one-off. “Every brand is different” is true, but it leaves you nothing to judge your account against. Compare what you hear with our <a href="/blog/telehealth-cac-benchmarks-2026/">telehealth CAC benchmarks</a>.`,
          strong: 'Ranges by vertical and channel, with caveats',
          flag: '“Every brand is different”',
        },
        {
          q: 'How many creative variants will you produce a month, and who makes them?',
          a: `A strong answer is a concrete monthly number produced in-house, an angle library, and a process for passing <a href="/blog/health-ad-creative-rejected-fix/">health ad review</a>. AdBoost Health’s standard is 20+ variants per partner per month. “We’ll work with your assets” leaves the creative pipeline to you.`,
          strong: 'A monthly number, made in-house, with an angle library',
          flag: '“We’ll work with your assets”',
        },
        {
          q: 'What happens in the first 30 days?',
          a: `A strong answer is a week-by-week plan specific enough to hold the agency to: measurement fixed first, a compliance audit, and a creative pipeline live early. Ours is public: setup in 5 days, directional movement inside two weeks, and the system compounding by day 31 (<a href="/services/">our services</a>).`,
          strong: 'A week-by-week plan: measurement, compliance, creative',
          flag: '“It’s a learning phase”',
        },
        {
          q: 'Can you show a full-funnel result, not a ROAS screenshot?',
          a: 'A strong answer is a mechanism story you can question: what was broken, what changed, in what order, and what happened in the months after the case-study window. A cropped platform ROAS screenshot cannot be checked, and a result that ends exactly where the case study ends should make you ask about month three.',
          strong: 'A mechanism story with data past the case-study window',
          flag: 'A cropped platform ROAS screenshot',
        },
        {
          q: 'Which metrics will you report, and which will you be accountable to?',
          a: `A strong answer is business metrics: blended CAC, <a href="/blog/scale-health-brand-50k-500k/">marginal CAC at your current spend tier</a>, cohort <a href="/glossary/cac-payback-period/">payback</a> and intake or checkout conversion. Platform ROAS and CPA by campaign cover only the part of the system that is easiest to make look good.`,
          strong: 'Blended and marginal CAC, cohort payback, funnel conversion',
          flag: 'Platform ROAS and CPA only',
        },
        {
          q: 'What do you need from us to succeed?',
          a: 'A strong answer is a demanding list: claim substantiation documents, provider time for creative, flexibility on offers, and access to deploy landing pages. “Just access and budget” means the agency plans to work only at the surface of your business.',
          strong: 'A demanding list: substantiation, provider time, deploy access',
          flag: '“Just access and budget”',
        },
        {
          q: 'Why shouldn’t we hire you?',
          a: 'A strong answer names a real disqualifier. Ours: we are a Toronto-based team that works only in health, telehealth and supplements, so a fashion brand should hire someone else; and our system takes about 31 days to compound, so if you need a miracle by Friday, we will say so on the call.',
          strong: 'A real disqualifier with a shape',
          flag: 'Deflection or flattery',
        },
      ],
    },
    faq: [
      { q: 'We already use a DTC agency. Should we switch?', a: 'Not necessarily. If your ads are approved, the account is in good standing and CAC holds, keep what works. Ads that keep getting rejected, a restricted account, or creative that cannot clear health review are the signs that a health-specific layer is missing. Run the nine questions on this page with your current agency first.' },
      { q: 'Can a generalist agency run supplement ads?', a: 'Yes, if it knows the claim rules. Supplements may make structure/function claims but not disease claims, and Meta, Google and TikTok each set their own rules for weight-loss and supplement ads, which also vary by market.' },
      { q: 'Is AdBoost Media the same company as AdBoost Health?', a: 'They are sister brands run by the same senior team. AdBoost Health works only with health, telehealth and supplement brands; AdBoost Media works with DTC ecommerce brands outside health.' },
    ],
  },
];

// Only pages released in this build (src/data/pages.json gates).
export const COMPARES = ALL_COMPARES.filter((c) => isLive(`/compare/${c.slug}/`));

export const getCompare = (slug: string) => COMPARES.find((c) => c.slug === slug);
