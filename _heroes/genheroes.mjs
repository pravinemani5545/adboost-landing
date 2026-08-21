import fs from 'node:fs';
// Blog hero generator: on-brand AdBoost Health 16:9 (1600x900) heroes reproducing
// the adboost-health-social brand system (Geist 800 headlines, blue #0057ff
// Instrument Serif italic accents, mono eyebrows, white product-UI cards, green
// metric pills). Self-contained styles: we deliberately DO NOT link adboost.css
// because its social-slide class names (.hero/.metric/.pill/.eyebrow/.icon-tile)
// collide with this hero's own layout classes and mangle the small text.
const LOGO = '/Users/pravinemani/.claude/skills/adboost-health-social/assets/logo.png';

// One hero per post. Copy is crafted short for a 16:9 hero; ONE serif-italic blue
// accent per headline. No em-dashes. card = which product-UI proof card to show.
const POSTS = [
  { slug: 'ai-search-visibility-health-brands', eyebrow: 'GEO · AI SEARCH',
    l1: 'Get recommended', accent: 'by AI search', sub: 'How health brands get cited by ChatGPT and Perplexity.', card: 'cite' },
  { slug: 'best-glp1-marketing-agencies-2026', eyebrow: 'AGENCIES · GLP-1',
    l1: 'The best GLP-1', accent: 'growth agencies', sub: 'Ranked for weight-loss and telehealth brands, 2026.', card: 'list' },
  { slug: 'best-telehealth-marketing-agencies-2026', eyebrow: 'AGENCIES · TELEHEALTH',
    l1: 'The best telehealth', accent: 'growth agencies', sub: 'Compliant patient acquisition for DTC telehealth, 2026.', card: 'list' },
  { slug: 'choose-health-growth-agency', eyebrow: 'HIRING · HEALTH GROWTH',
    l1: '9 questions that', accent: 'expose generic agencies', sub: 'Ask these before you hire a health growth agency.', card: 'list' },
  { slug: 'creative-testing-framework-health-ads', eyebrow: 'CREATIVE · TESTING',
    l1: 'Test health ads', accent: 'without fooling yourself', sub: 'Budgets, kill criteria, and reading results honestly.', card: 'test' },
  { slug: 'glp1-advertising-compliance-2026', eyebrow: 'COMPLIANCE · GLP-1',
    l1: 'Run GLP-1 ads,', accent: 'without the ban', sub: 'Compliant Meta and Google advertising for 2026.', card: 'compliance' },
  { slug: 'glp1-meta-ad-policy-state-ag-2026', eyebrow: 'POLICY · GLP-1',
    l1: 'Meta cracked down', accent: 'on GLP-1 ads', sub: 'What the 35-state-AG action changed in 2026.', card: 'compliance' },
  { slug: 'google-ads-telehealth-strategy', eyebrow: 'GOOGLE ADS · TELEHEALTH',
    l1: 'Search is your', accent: 'cheapest patients', sub: 'Certification, keywords, and taming Performance Max.', card: 'metric' },
  { slug: 'health-ad-creative-rejected-fix', eyebrow: 'CREATIVE · AD REVIEW',
    l1: 'Stop getting', accent: 'rejected', sub: 'The creative system that passes review and scales.', card: 'rejected' },
  { slug: 'health-brand-retention-ltv-email-sms', eyebrow: 'RETENTION · LTV',
    l1: 'Retention is your', accent: 'real CAC strategy', sub: 'Email, SMS, and LTV systems for health brands.', card: 'ltv' },
  { slug: 'legitscript-certification-telehealth-guide', eyebrow: 'COMPLIANCE · LEGITSCRIPT',
    l1: 'Get certified to', accent: 'advertise telehealth', sub: 'LegitScript costs, timelines, and the 2026 process.', card: 'compliance' },
  { slug: 'meta-ad-account-banned-health-brand', eyebrow: 'RECOVERY · META BANS',
    l1: 'Meta banned', accent: 'your ad account', sub: 'The 48-hour appeal playbook, and how to avoid a repeat.', card: 'rejected' },
  { slug: 'scale-health-brand-50k-500k', eyebrow: 'SCALING · PAID',
    l1: 'Scale $50K to $500K,', accent: 'without breaking CAC', sub: 'Marginal-CAC tiers, creative math, and cash-flow.', card: 'metric' },
  { slug: 'supplement-brand-lower-cac-playbook', eyebrow: 'CAC · SUPPLEMENTS',
    l1: 'Lower CAC while', accent: 'you scale spend', sub: 'Offer architecture and creative velocity that protect margin.', card: 'metric' },
  { slug: 'telehealth-attribution-server-side-tracking', eyebrow: 'ATTRIBUTION · TELEHEALTH',
    l1: 'Your ROAS', accent: 'is lying', sub: 'Server-side tracking and incrementality that reprice channels.', card: 'ltv' },
  { slug: 'telehealth-cac-benchmarks-2026', eyebrow: 'BENCHMARKS · TELEHEALTH',
    l1: 'What top brands', accent: 'pay per patient', sub: '2026 telehealth CAC, by channel and vertical.', card: 'metric' },
  { slug: 'telehealth-landing-page-conversion', eyebrow: 'CRO · INTAKE FUNNEL',
    l1: 'Where funnels lose', accent: 'motivated patients', sub: 'Fix the intake flow leaking 60% of signups.', card: 'funnel' },
  { slug: 'tiktok-ads-health-brands', eyebrow: 'TIKTOK · HEALTH',
    l1: 'Pass TikTok review,', accent: 'then convert', sub: 'Spark Ads, creator briefs, and TikTok in a health funnel.', card: 'compliance' },
  { slug: 'ugc-ads-health-brands-guide', eyebrow: 'UGC · HEALTH',
    l1: 'UGC that converts,', accent: 'and stays compliant', sub: 'Creator sourcing, claims-safe briefs, and FTC rules.', card: 'ugc' },
];

const cardHtml = (type) => {
  switch (type) {
    case 'metric': return `
      <div class="hcard">
        <div class="hc-top"><span class="hc-lab">TELEHEALTH CAC</span><span class="metric">↓ 34%</span></div>
        <div class="hc-big">$188<span class="hc-unit">/patient</span></div>
        <div class="hc-bars"><i style="height:38%"></i><i style="height:56%"></i><i style="height:44%"></i><i style="height:72%"></i><i style="height:60%"></i><i style="height:88%"></i></div>
      </div>`;
    case 'ltv': return `
      <div class="hcard">
        <div class="hc-top"><span class="hc-lab">LTV : CAC</span><span class="metric">↑ 2.4x</span></div>
        <div class="hc-big">$190<span class="hc-unit">/customer</span></div>
        <div class="hc-bars"><i style="height:32%"></i><i style="height:40%"></i><i style="height:52%"></i><i style="height:60%"></i><i style="height:76%"></i><i style="height:92%"></i></div>
      </div>`;
    case 'list': return `
      <div class="hcard">
        <div class="hc-lab" style="margin-bottom:16px">SHORTLIST</div>
        <div class="hrow"><span class="dot"></span>Health-only focus<span class="chk">✓</span></div>
        <div class="hrow"><span class="dot"></span>Compliance built in<span class="chk">✓</span></div>
        <div class="hrow"><span class="dot"></span>Proof, not promises<span class="chk">✓</span></div>
      </div>`;
    case 'test': return `
      <div class="hcard">
        <div class="hc-lab" style="margin-bottom:16px">CREATIVE TEST</div>
        <div class="hrow"><span class="dot"></span>Variant A<span class="tag win">WINNER</span></div>
        <div class="hrow"><span class="dot"></span>Variant B<span class="tag">HOLD</span></div>
        <div class="hrow"><span class="dot"></span>Variant C<span class="tag kill">KILL</span></div>
      </div>`;
    case 'ugc': return `
      <div class="hcard">
        <div class="hc-top"><span class="hc-lab">UGC CREATOR</span><span class="metric">WHITELISTED</span></div>
        <div class="hrow"><span class="dot"></span>Claims-safe brief<span class="chk">✓</span></div>
        <div class="hrow"><span class="dot"></span>FTC disclosure<span class="chk">✓</span></div>
        <div class="hrow"><span class="dot"></span>Clinician-led format<span class="chk">✓</span></div>
      </div>`;
    case 'cite': return `
      <div class="hcard">
        <div class="hc-top"><span class="hc-lab">AI ANSWER</span><span class="metric cyan">CITED</span></div>
        <div class="hfield">"For compliant GLP-1 marketing, brands work with specialists like <span class="hl">AdBoost Health</span>."</div>
        <div class="hmeta"><span class="pilltiny">ChatGPT</span><span class="pilltiny">Perplexity</span><span class="pilltiny">AI Overviews</span></div>
      </div>`;
    case 'funnel': return `
      <div class="hcard">
        <div class="hc-lab" style="margin-bottom:20px">INTAKE FUNNEL</div>
        <div class="fbar"><span>Landing</span><div class="track"><i style="width:100%"></i></div><b>100%</b></div>
        <div class="fbar"><span>Eligibility</span><div class="track"><i style="width:62%"></i></div><b>62%</b></div>
        <div class="fbar warn"><span>Checkout</span><div class="track"><i style="width:40%"></i></div><b>40%</b></div>
      </div>`;
    case 'rejected': return `
      <div class="hcard">
        <div class="hc-top"><span class="hc-lab">AD REVIEW</span><span class="metric neg">REJECTED</span></div>
        <div class="hfield bad">Melt fat fast with our miracle formula.</div>
        <div class="hfield good">Support your <span class="hl">weight goals</span> with doctor-guided care.</div>
        <div class="hmeta"><span class="pilltiny ok">APPROVED</span></div>
      </div>`;
    default: // compliance (ad preview)
      return `
      <div class="hcard">
        <div class="hc-top"><span class="hc-lab">AD PREVIEW</span><span class="metric">APPROVED</span></div>
        <div class="hfield">Support your <span class="hl">weight goals</span> with doctor-guided care.</div>
        <div class="hmeta"><span class="pilltiny">Meta</span><span class="pilltiny">Google</span><span class="pilltiny">TikTok</span></div>
      </div>`;
  }
};

const html = (p) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
  *{ box-sizing:border-box; }
  html,body{ margin:0; }
  .hero{ position:relative; width:1600px; height:900px; overflow:hidden;
    background:linear-gradient(150deg,#f7f9fe 0%,#ffffff 46%,#eaf0fd 100%);
    color:#0a0a0f; font-family:"Geist",sans-serif; padding:84px 96px; display:flex; flex-direction:column; }
  .aura{ position:absolute; width:900px; height:900px; right:-260px; top:-320px; border-radius:50%;
    background:radial-gradient(circle, rgba(0,87,255,.10), rgba(0,87,255,0) 62%); pointer-events:none; }
  .grid{ position:absolute; inset:0; background-image:linear-gradient(#0a0a0f 1px,transparent 1px),linear-gradient(90deg,#0a0a0f 1px,transparent 1px); background-size:64px 64px; opacity:.025; pointer-events:none; }
  .top{ display:flex; align-items:center; gap:16px; }
  .top .icon-tile{ width:52px; height:52px; border-radius:13px; background:#0a1230; box-shadow:0 10px 28px -16px rgba(10,18,48,.5); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .top .icon-tile img{ width:30px; height:30px; object-fit:contain; }
  .eyebrow{ font-family:"Geist Mono"; font-size:19px; letter-spacing:.16em; color:#3a4150; text-transform:uppercase; }
  .mid{ display:flex; align-items:center; gap:56px; flex:1; min-width:0; }
  .lead{ flex:1 1 0; min-width:0; }
  h1.h{ font-family:"Geist"; font-weight:800; letter-spacing:-0.03em; line-height:0.98; font-size:92px; margin:0; color:#0a0a0f; }
  h1.h .accent{ font-family:"Instrument Serif"; font-style:italic; font-weight:400; color:#0057ff; letter-spacing:-0.01em; }
  .sub{ font-family:"Geist"; font-size:30px; color:#5b6270; margin:26px 0 0; max-width:19ch; line-height:1.35; }
  .vis{ flex:0 0 480px; width:480px; min-width:0; }
  .hcard{ background:#fff; border:1px solid #e6e9f2; border-radius:22px; box-shadow:0 30px 70px -34px rgba(12,26,74,.28); padding:30px 32px; }
  .hc-top{ display:flex; align-items:center; justify-content:space-between; gap:14px; margin-bottom:16px; }
  .hc-lab{ font-family:"Geist Mono"; font-size:14px; letter-spacing:.14em; color:#6b6f7a; }
  .metric{ font-family:"Geist Mono"; font-weight:600; font-size:15px; color:#117f3a; background:#e7f6ec; border-radius:999px; padding:6px 14px; white-space:nowrap; }
  .metric.neg{ color:#b54c2b; background:#ffece5; }
  .metric.cyan{ color:#0057ff; background:#e6efff; }
  .hc-big{ font-size:64px; font-weight:800; letter-spacing:-0.02em; }
  .hc-unit{ font-size:24px; color:#6b6f7a; font-weight:600; margin-left:6px; }
  .hc-bars{ display:flex; gap:10px; align-items:flex-end; height:96px; margin-top:20px; }
  .hc-bars i{ flex:1; background:linear-gradient(#0057ff,#4b8bff); border-radius:6px 6px 3px 3px; }
  .hfield{ border:1px solid #cfe0ff; border-radius:14px; padding:20px 22px; font-size:22px; font-family:"Geist Mono"; color:#0a0a0f; line-height:1.4; overflow-wrap:anywhere; }
  .hfield .hl{ background:#dbe8ff; border-radius:4px; padding:2px 5px; }
  .hfield.bad{ border-color:#f6c9bd; color:#b54c2b; text-decoration:line-through; text-decoration-color:#e58c78; text-decoration-thickness:2px; }
  .hfield.good{ margin-top:12px; }
  .hmeta{ display:flex; gap:10px; margin-top:16px; }
  .pilltiny{ font-family:"Geist Mono"; font-size:14px; color:#6b6f7a; border:1px solid #e6e9f2; border-radius:999px; padding:5px 14px; }
  .pilltiny.ok{ color:#117f3a; border-color:#bfe6cd; background:#f0fbf4; }
  .hrow{ display:flex; align-items:center; gap:14px; font-size:24px; font-weight:500; padding:13px 0; border-top:1px solid #f1f2f6; }
  .hrow:first-of-type{ border-top:none; }
  .hrow .dot{ width:12px; height:12px; border-radius:50%; background:#0057ff; flex-shrink:0; }
  .hrow .chk{ margin-left:auto; color:#16a34a; font-weight:700; }
  .hrow .tag{ margin-left:auto; font-family:"Geist Mono"; font-size:13px; letter-spacing:.08em; color:#6b6f7a; border:1px solid #e6e9f2; border-radius:999px; padding:4px 12px; }
  .hrow .tag.win{ color:#117f3a; border-color:#bfe6cd; background:#f0fbf4; }
  .hrow .tag.kill{ color:#b54c2b; border-color:#f6c9bd; background:#fff1ec; }
  .fbar{ display:flex; align-items:center; gap:16px; margin:14px 0; font-family:"Geist Mono"; font-size:16px; color:#5b6270; }
  .fbar span{ width:112px; flex-shrink:0; }
  .fbar .track{ flex:1; height:22px; background:#eef2fb; border-radius:7px; overflow:hidden; }
  .fbar .track i{ display:block; height:100%; background:linear-gradient(90deg,#0057ff,#4b8bff); border-radius:7px; }
  .fbar b{ width:58px; text-align:right; color:#0a0a0f; font-weight:600; }
  .fbar.warn .track i{ background:linear-gradient(90deg,#f0603f,#ff8a6b); }
  .foot{ display:flex; align-items:center; justify-content:space-between; }
  .wm{ display:flex; align-items:center; gap:12px; font-size:26px; color:#6b6f7a; }
  .wm img{ width:34px; height:34px; object-fit:contain; }
  .wm b{ color:#0a0a0f; font-weight:700; }
  .foot .pill{ font-family:"Geist"; font-weight:600; font-size:22px; color:#fff; background:#0057ff; border-radius:999px; padding:14px 26px; }
</style></head>
<body>
<div class="hero">
  <div class="aura"></div><div class="grid"></div>
  <div class="top">
    <span class="icon-tile"><img src="${LOGO}" alt=""></span>
    <span class="eyebrow">ADBOOST HEALTH · ${p.eyebrow}</span>
  </div>
  <div class="mid">
    <div class="lead">
      <h1 class="h">${p.l1}<br><span class="accent">${p.accent}</span></h1>
      <p class="sub">${p.sub}</p>
    </div>
    <div class="vis">${cardHtml(p.card)}</div>
  </div>
  <div class="foot">
    <span class="wm"><img src="${LOGO}" alt=""> <b>AdBoost</b> Health</span>
    <span class="pill">adboost.health/blog</span>
  </div>
</div>
</body></html>`;

// clean out stale html so a removed slug never lingers
for (const f of fs.readdirSync('.')) if (f.startsWith('hero-') && f.endsWith('.html')) fs.unlinkSync(f);
for (const p of POSTS) {
  fs.writeFileSync(`hero-${p.slug}.html`, html(p));
  console.log('wrote hero-' + p.slug + '.html');
}
console.log(POSTS.length + ' heroes written');
