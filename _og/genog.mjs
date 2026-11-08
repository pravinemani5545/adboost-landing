// OG card generator (1200x630 JPEG) for the design v2 templates.
// Every string and number on a card comes from the site's data modules
// (src/data/*.ts) or from copy already printed on the page; nothing is invented.
// Step 1 (this file): write one self-contained HTML per card to _og/out/html/.
// Step 2: node _og/render.mjs renders them with agent-browser and writes
//         public/og/<template>/<slug>.jpg (index.jpg for a hub path).
import fs from 'node:fs';
import path from 'node:path';
import { loadData } from './data.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, '..');
const OUT = path.join(HERE, 'out/html');

const d = await loadData();
const { AD_POLICIES, STATUS_LABEL, RULES_CHECKED_ON, POLICY_YEAR } = d.adPolicies;
const { VERTICALS } = d.verticals;
const { GLOSSARY } = d.glossary;
const { COMPARES } = d.compare;
const { SERVICES } = d.services;
const { PLATFORM_HUBS } = d.platformHubs;
const { FAQ_GROUPS } = d.faq;

// ---------- assets (fonts from public/fonts/v1, never Google Fonts) ----------
const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString('base64');
const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const LATIN_EXT = 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF';
const face = (family, file, extra, range) =>
  `@font-face{font-family:'${family}';${extra}font-display:block;src:url(data:font/woff2;base64,${b64('public/fonts/v1/' + file)}) format('woff2');unicode-range:${range}}`;
const FONTS = [
  face('Geist', 'geist-latin.woff2', 'font-style:normal;font-weight:300 700;', LATIN),
  face('Geist', 'geist-latin-ext.woff2', 'font-style:normal;font-weight:300 700;', LATIN_EXT),
  face('Geist Mono', 'geist-mono-latin.woff2', 'font-style:normal;font-weight:400 500;', LATIN),
  face('Geist Mono', 'geist-mono-latin-ext.woff2', 'font-style:normal;font-weight:400 500;', LATIN_EXT),
  face('Instrument Serif', 'instrument-serif-italic-latin.woff2', 'font-style:italic;font-weight:400;', LATIN),
  face('Instrument Serif', 'instrument-serif-italic-latin-ext.woff2', 'font-style:italic;font-weight:400;', LATIN_EXT),
].join('\n');
const LOGO = `data:image/png;base64,${b64('public/logos/adboost-mark.png')}`;

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Wrap the first occurrence of `phrase` in the serif accent; plain text if it is not there. */
const accent = (text, phrase) => {
  const i = phrase ? text.indexOf(phrase) : -1;
  if (i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<em>' + esc(phrase) + '</em>' + esc(text.slice(i + phrase.length));
};
const fmtDay = (s) => new Date(`${s}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const TONE = { allowed: 'ok', restricted: 'warn', cert: 'accent', prohibited: 'bad' };
const PLATFORMS = ['Meta', 'Google', 'TikTok'];
const termShort = (t) => t.term.replace(/\s*\(.*\)\s*$/, '');

/** Split a printed formula into chips at top-level operators (parenthesised groups stay whole). */
function tokens(formula) {
  const out = []; let cur = ''; let depth = 0;
  const ops = new Set(['=', '÷', '×', '+', '−', '≈']);
  const parts = formula.split(/(\s+)/);
  for (const part of parts) {
    if (/^\s+$/.test(part)) { cur += part; continue; }
    for (const ch of part) { if (ch === '(') depth++; if (ch === ')') depth--; }
    if (depth === 0 && ops.has(part)) {
      if (cur.trim()) out.push({ t: cur.trim() });
      out.push({ op: part }); cur = '';
    } else cur += part;
  }
  if (cur.trim()) out.push({ t: cur.trim() });
  return out;
}
const equation = (formula) => {
  const toks = tokens(formula);
  const eq = toks.findIndex((x) => x.op === '=' || x.op === '≈');
  return `<div class="eq">${toks.map((x, i) => x.op
    ? `<span class="op">${esc(x.op)}</span>`
    : `<span class="tok${i < eq ? ' lhs' : ''}">${esc(x.t)}</span>`).join('')}</div>`;
};
const badge = (status) => `<span class="badge t-${TONE[status]}"><i></i>${esc(STATUS_LABEL[status])}</span>`;

// ---------- page shell ----------
const page = ({ eyebrow, title, extra = '', vis, visW = 440, url, note = '', h1Size = 60 }) => {
  // keep hyphenated words whole ("weight-loss", "in-house") so the headline never breaks at a hyphen
  title = title.replace(/([A-Za-z0-9]+(?:-[A-Za-z0-9]+)+)/g, '<span class="nw">$1</span>');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
${FONTS}
:root{--accent:#0057ff;--accent-soft:#e7efff;--accent-line:rgba(0,87,255,.28);--ink:#0a0a0f;--ink-2:#1a1b22;--ink-3:#6b6f7a;--ink-4:#9aa0ac;--line:#e5e7ee;--line-2:#d8dce4;--paper-2:#f6f7f9;--paper-3:#eceef3;
--ok:#16a34a;--ok-ink:#0a7a37;--ok-soft:#e6f6ec;--warn:#f5a623;--warn-ink:#a15c00;--warn-soft:#fdf6e7;--bad:#dc2626;--bad-ink:#b42318;--bad-soft:#fdecea}
*{box-sizing:border-box}html,body{margin:0;background:#fff}
body{font-family:'Geist',system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
.og{position:relative;width:1200px;height:630px;overflow:hidden;padding:46px 60px 40px;display:flex;flex-direction:column;isolation:isolate;
 background:linear-gradient(150deg,#f7f9fe 0%,#ffffff 44%,#edf2fd 100%)}
.grid{position:absolute;inset:0;z-index:-1;background-image:linear-gradient(rgba(10,10,15,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(10,10,15,.05) 1px,transparent 1px);background-size:48px 48px;
 -webkit-mask-image:radial-gradient(ellipse 80% 90% at 70% 40%,#000 30%,transparent 80%)}
.aura{position:absolute;z-index:-1;width:900px;height:900px;right:-300px;top:-380px;border-radius:50%;background:radial-gradient(circle,rgba(0,87,255,.13),rgba(0,87,255,0) 62%)}
.top{display:flex;align-items:center;justify-content:space-between;height:40px;flex:none}
.brand{display:flex;align-items:center;gap:11px;font-size:22px;letter-spacing:-.015em;color:var(--ink-2)}
.brand img{height:30px;width:auto}.brand b{font-weight:600;color:var(--ink)}
.eyebrow{display:flex;align-items:center;gap:10px;font-family:'Geist Mono',monospace;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#3a4150;
 padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.75);white-space:nowrap}
.eyebrow i{width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px var(--accent-soft)}
.mid{flex:1;display:flex;align-items:center;gap:44px;min-height:0;padding:10px 0}
.lead{flex:1 1 0;min-width:0;padding:6px 0}
h1{margin:0;font-weight:600;font-size:${h1Size}px;line-height:1.03;letter-spacing:-.037em;color:var(--ink);text-wrap:balance}
h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:var(--accent);letter-spacing:-.005em;font-size:1.08em;line-height:.95}
.sub{margin:18px 0 0;font-size:20px;line-height:1.42;color:#565c69;max-width:34ch;text-wrap:pretty}
.vis{flex:0 0 ${visW}px;width:${visW}px;min-width:0}
.card{position:relative;background:#fff;border:1px solid var(--line);border-radius:22px;padding:22px 24px;
 box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 2px 4px rgba(10,10,15,.03),0 34px 64px -34px rgba(12,26,74,.30)}
.lab{font-family:'Geist Mono',monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);margin:0 0 14px;white-space:nowrap;overflow:hidden}
.foot{display:flex;align-items:center;justify-content:space-between;gap:24px;flex:none;font-family:'Geist Mono',monospace;font-size:14px;color:var(--ink-3);height:30px}
.foot .url{white-space:nowrap;overflow:hidden}.foot .url b{color:var(--ink-2);font-weight:500}
.foot .note{display:flex;align-items:center;gap:9px;white-space:nowrap}.foot .note i{width:6px;height:6px;border-radius:50%;background:var(--ok)}
/* status */
.badge{display:inline-flex;align-items:center;gap:8px;font-family:'Geist Mono',monospace;font-size:13px;letter-spacing:.02em;padding:5px 11px;border-radius:999px;border:1px solid;white-space:nowrap}
.badge i{width:7px;height:7px;border-radius:50%;background:currentColor}
.t-ok{color:var(--ok-ink);background:var(--ok-soft);border-color:#bfe6cd}
.t-warn{color:var(--warn-ink);background:var(--warn-soft);border-color:#f3e0b8}
.t-bad{color:var(--bad-ink);background:var(--bad-soft);border-color:#f3c6c1}
.t-accent{color:var(--accent);background:var(--accent-soft);border-color:var(--accent-line)}
.spill{margin-top:26px;display:inline-flex}.spill .badge{font-size:17px;padding:10px 18px 10px 16px;gap:11px}.spill .badge i{width:10px;height:10px}
.srow{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;border:1px solid transparent;border-radius:14px;font-size:19px;font-weight:500;letter-spacing:-.01em}
.srow + .srow{margin-top:4px}
.srow.cur{border-color:var(--accent-line);background:linear-gradient(180deg,#fff,#f6f9ff);box-shadow:0 0 0 4px var(--accent-soft),0 14px 30px -18px rgba(0,87,255,.45)}
.srow .nm{white-space:nowrap;overflow:hidden;text-overflow:clip}
.srow.dim{color:var(--ink-3)}
.compact .srow{font-size:15.5px;padding:10px 12px}.compact .badge{font-size:12px;padding:4px 10px}
/* matrix */
.mx{display:grid;grid-template-columns:1fr repeat(3,74px);gap:6px;align-items:center}
.mx .ch{font-family:'Geist Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--ink-3);text-align:center}
.mx .rh{font-size:15px;font-weight:500;letter-spacing:-.01em;white-space:nowrap;overflow:hidden}
.mx .cell{height:34px;border-radius:9px;border:1px solid;display:flex;align-items:center;justify-content:center}
.mx .cell i{width:8px;height:8px;border-radius:50%;background:currentColor}
.legend{display:grid;grid-template-columns:1fr 1fr;gap:8px 10px;margin-top:16px}
.legend .badge{font-size:11.5px;padding:4px 9px;justify-self:start}
/* range bars */
.rb{display:grid;grid-template-columns:128px 1fr 132px;gap:6px 12px;align-items:center}
.rb .nm{font-size:13.5px;font-weight:500;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;color:var(--ink-2)}
.rb .vl{font-family:'Geist Mono',monospace;font-size:12px;color:var(--ink-3);white-space:nowrap;text-align:right;overflow:hidden}
.rb .tr{position:relative;height:12px;border-radius:6px;background:var(--paper-2)}
.rb .bar{position:absolute;top:0;bottom:0;border-radius:6px;background:#c9d6ee}
.rb .bar.open{-webkit-mask-image:linear-gradient(90deg,#000 70%,transparent)}
.rb .bar.approx{-webkit-mask-image:linear-gradient(90deg,transparent,#000 22%)}
.rb .bar.approx.open{-webkit-mask-image:linear-gradient(90deg,transparent,#000 22%,#000 70%,transparent)}
.rb .brk{position:absolute;right:-3px;top:-4px;bottom:-4px;width:7px;background:#fff;transform:skewX(-18deg);border-left:2px solid var(--line-2);border-right:2px solid var(--line-2)}
.rb .row-lit .bar,.rb .bar.lit{background:linear-gradient(90deg,#0057ff,#4b8bff);box-shadow:0 0 14px rgba(0,87,255,.45)}
.rb .nm.lit,.rb .vl.lit{color:var(--accent);font-weight:600}
.rb.all .bar{background:linear-gradient(90deg,#5d8fff,#0057ff)}
.stat{margin-top:26px;display:flex;align-items:baseline;gap:14px}
.stat .k{font-family:'Geist Mono',monospace;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3)}
.stat .v{font-size:40px;font-weight:600;letter-spacing:-.03em;color:var(--accent);white-space:nowrap}
/* equation */
.eq{display:flex;flex-wrap:wrap;align-items:center;gap:8px 8px}
.eq + .eq{margin-top:14px;padding-top:14px;border-top:1px dashed var(--line-2)}
.tok{font-size:16.5px;font-weight:500;letter-spacing:-.01em;padding:8px 12px;border-radius:11px;background:var(--paper-2);border:1px solid var(--line);color:var(--ink-2);line-height:1.2}
.tok.lhs{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}
.op{font-family:'Instrument Serif',serif;font-style:italic;font-size:30px;line-height:1;color:var(--accent);padding:0 2px}
.def{font-size:16.5px;line-height:1.5;color:var(--ink-2)}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{font-size:14px;font-weight:500;padding:6px 12px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--ink-2);white-space:nowrap}
.chip.f{border-color:var(--accent-line);color:var(--accent);background:var(--accent-soft)}
.sep{height:1px;background:var(--line);margin:18px 0 16px}
.note2{margin-top:14px;font-family:'Geist Mono',monospace;font-size:12.5px;color:var(--ink-3)}
/* versus */
.vs{display:grid;grid-template-columns:1fr 36px 1fr;align-items:center;gap:10px;margin-bottom:14px}
.vs .side{font-size:16px;font-weight:600;letter-spacing:-.015em;line-height:1.2;padding:12px 14px;border-radius:13px;border:1px solid var(--line);background:var(--paper-2);color:var(--ink-3)}
.vs .side.us{background:var(--accent);border-color:var(--accent);color:#fff}
.vs .x{font-family:'Instrument Serif',serif;font-style:italic;font-size:26px;color:var(--accent);text-align:center}
.dims{list-style:none;margin:0;padding:0}
.dims li{display:grid;grid-template-columns:10px 1fr 10px;gap:12px;align-items:center;padding:8px 2px;border-top:1px solid #f0f1f5;font-size:15px;font-weight:500;color:var(--ink-2);text-align:center}
.dims li:first-child{border-top:0}
.dims .a{width:8px;height:8px;border-radius:50%;background:var(--ink-4)}.dims .b{width:8px;height:8px;border-radius:50%;background:var(--accent)}
/* gantt */
.gt .gr{display:grid;grid-template-columns:150px 1fr;gap:12px;align-items:center;padding:8px 0;border-top:1px solid #f0f1f5}
.gt .gr:first-of-type{border-top:0}
.gt .gl{font-size:13.5px;font-weight:500;line-height:1.25;color:var(--ink-2)}
.gt .gl small{display:block;font-family:'Geist Mono',monospace;font-size:11px;color:var(--ink-3);font-weight:400;margin-top:2px}
.gt .gtr{position:relative;height:18px;border-radius:6px;background:repeating-linear-gradient(90deg,var(--paper-2) 0 calc(100%/var(--n) - 2px),#fff calc(100%/var(--n) - 2px) calc(100%/var(--n)))}
.gt .gb{position:absolute;top:0;bottom:0;border-radius:6px;background:linear-gradient(90deg,#0057ff,#4b8bff)}
.gt .gb.open{-webkit-mask-image:linear-gradient(90deg,#000 45%,transparent);background:linear-gradient(90deg,#4b8bff,#0057ff)}
.gt .ax{display:grid;grid-template-columns:150px 1fr;gap:12px;margin-top:6px;font-family:'Geist Mono',monospace;font-size:11px;color:var(--ink-3)}
.gt .ax div{display:flex;justify-content:space-between}
.nw{white-space:nowrap}
/* list rows */
.lr{padding:12px 0;border-top:1px solid #f0f1f5}.lr:first-child{border-top:0;padding-top:2px}
.lr .t{font-size:17px;font-weight:600;letter-spacing:-.015em;color:var(--ink)}
.lr .s{margin-top:5px;font-family:'Geist Mono',monospace;font-size:12px;color:var(--ink-3);line-height:1.4}
.lr .q{margin-top:5px;font-size:14px;color:var(--ink-3);line-height:1.35}
.lr .t em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:var(--accent);font-size:1.15em;margin-right:4px}
/* stats */
.stats{display:grid;gap:12px}
.st{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:14px 16px;border-radius:14px;background:var(--paper-2);border:1px solid var(--line)}
.st .v{font-size:38px;font-weight:600;letter-spacing:-.035em;color:var(--accent);white-space:nowrap}
.st .v small{font-size:20px;color:var(--ink-3);font-weight:500;letter-spacing:0}
.st .k{font-size:15px;color:var(--ink-2);font-weight:500;text-align:right}
/* triangle */
.tri{position:relative;height:330px}
.tri svg{position:absolute;inset:0;width:100%;height:100%}
.tri .node{position:absolute;transform:translate(-50%,-50%);padding:12px 16px;border-radius:14px;background:#fff;border:1px solid var(--accent-line);box-shadow:0 0 0 4px var(--accent-soft),0 18px 34px -20px rgba(0,87,255,.5);font-size:17px;font-weight:600;letter-spacing:-.015em;white-space:nowrap}
</style></head><body>
<div class="og">
  <div class="grid"></div><div class="aura"></div>
  <header class="top"><span class="brand"><img src="${LOGO}" alt=""><span><b>AdBoost</b> Health</span></span><span class="eyebrow"><i></i>${esc(eyebrow)}</span></header>
  <main class="mid">
    <div class="lead"><h1>${title}</h1>${extra}</div>
    <div class="vis">${vis}</div>
  </main>
  <footer class="foot"><span class="url">adboost.health<b>${esc(url)}</b></span>${note ? `<span class="note"><i></i>${esc(note)}</span>` : ''}</footer>
</div>
<script>
(async () => {
  await document.fonts.ready;
  const h = document.querySelector('h1'), lead = document.querySelector('.lead');
  let size = parseFloat(getComputedStyle(h).fontSize);
  const midEl = document.querySelector(".mid");
  const room = () => midEl.clientHeight - 20;
  const lines = () => Math.round(h.getBoundingClientRect().height / (size * 1.03));
  while ((lead.getBoundingClientRect().height > room() || lines() > 4) && size > 34) { size -= 2; h.style.fontSize = size + 'px'; }
  const bad = [];
  if (lead.getBoundingClientRect().height > room()) bad.push("lead-overflow");
  const og = document.querySelector('.og').getBoundingClientRect();
  for (const el of document.querySelectorAll('.og *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'inline' || el.matches('.grid,.aura,svg,svg *')) continue;
    if (el.scrollWidth > el.clientWidth + 1 && cs.overflow !== 'visible') bad.push('clipX:' + el.className + ':' + el.textContent.slice(0, 40));
    if (el.scrollHeight > el.clientHeight + 1 && cs.overflow !== 'visible') bad.push('clipY:' + el.className + ':' + el.textContent.slice(0, 40));
    const r = el.getBoundingClientRect();
    if (r.width && (r.right > og.right - 24 || r.left < og.left + 24 || r.bottom > og.bottom - 16 || r.top < og.top + 16)) bad.push('edge:' + el.className + ':' + el.textContent.slice(0, 40));
  }
  const vis = document.querySelector('.vis').getBoundingClientRect(), mid = document.querySelector('.mid').getBoundingClientRect();
  if (vis.bottom > mid.bottom + 1 || vis.top < mid.top - 1) bad.push('vis-overflow');
  const fonts = [...document.fonts].filter((f) => f.status !== 'loaded' && f.status !== 'unloaded').map((f) => f.family + ':' + f.status);
  window.__og = { h1: size, bad, fonts };
  document.body.setAttribute('data-done', '1');
})();
</script></body></html>`;
  if (html.includes('\u2014')) throw new Error('em-dash in card ' + url);
  return html;
};

// ---------- card builders ----------
const cards = [];
const add = (out, spec) => cards.push({ out, html: page(spec) });
const policiesOf = (verticalSlug) => PLATFORMS.map((pf) => AD_POLICIES.find((x) => x.verticalSlug === verticalSlug && x.platform === pf));
const VERTICAL_ORDER = [...new Set(AD_POLICIES.map((p) => p.verticalSlug))];

// 15 rule sheets
for (const p of AD_POLICIES) {
  const rows = policiesOf(p.verticalSlug).map((x) => x
    ? `<div class="srow${x.slug === p.slug ? ' cur' : ' dim'}"><span class="nm">${x.platform}</span>${badge(x.status)}</div>` : '').join('');
  add(`advertising/${p.slug}.jpg`, {
    eyebrow: `AD COMPLIANCE · ${POLICY_YEAR}`,
    title: `${esc(p.vertical)} on <em>${esc(p.platform)}</em>`,
    extra: `<div class="spill">${badge(p.status)}</div>`,
    vis: `<div class="card"><div class="lab">${esc(p.vertical)}</div>${rows}</div>`,
    visW: 420,
    url: `/advertising/${p.slug}/`,
    note: `Rules checked ${fmtDay(RULES_CHECKED_ON)}`,
    h1Size: 72,
  });
}

// 2 platform hubs (gated: Meta 2026-12-08, Google 2027-01-12)
for (const h of PLATFORM_HUBS) {
  const rows = AD_POLICIES.filter((x) => x.platform === h.platform)
    .map((x) => `<div class="srow"><span class="nm">${esc(x.vertical)}</span>${badge(x.status)}</div>`).join('');
  const colon = h.h1.indexOf(': ');
  add(`advertising/${h.slug}.jpg`, {
    eyebrow: `AD COMPLIANCE · ${h.platform}`,
    title: accent(h.h1, colon > 0 ? h.h1.slice(colon + 2) : ''),
    vis: `<div class="card compact"><div class="lab">Status by vertical</div>${rows}</div>`,
    visW: 470,
    url: `/advertising/${h.slug}/`,
    note: `Rules checked ${fmtDay(h.checkedOn)}`,
    h1Size: 50,
  });
}

// /advertising/ hub: 5 x 3 matrix
{
  const head = `<span></span>${PLATFORMS.map((pf) => `<span class="ch">${pf}</span>`).join('')}`;
  const body = VERTICAL_ORDER.map((vs) => {
    const ps = policiesOf(vs);
    return `<span class="rh">${esc(ps.find(Boolean).vertical)}</span>${ps.map((x) => x ? `<span class="cell t-${TONE[x.status]}"><i></i></span>` : '<span></span>').join('')}`;
  }).join('');
  const legend = ['allowed', 'restricted', 'cert', 'prohibited'].map(badge).join('');
  add('advertising/index.jpg', {
    eyebrow: `AD COMPLIANCE · ${POLICY_YEAR}`,
    title: 'What’s allowed, by <em>platform</em> and vertical',
    vis: `<div class="card"><div class="lab">Status by vertical and platform</div><div class="mx">${head}${body}</div><div class="legend">${legend}</div></div>`,
    visW: 480,
    url: '/advertising/',
    note: `Rules checked ${fmtDay(RULES_CHECKED_ON)}`,
    h1Size: 58,
  });
}

// Industries: range bars of cacLow-cacHigh on one axis (0-600; anything above is broken)
const AXIS = 600;
const rangeBars = (litSlug) => `<div class="rb${litSlug ? '' : ' all'}">${VERTICALS.map((v) => {
  const lit = v.slug === litSlug;
  const approx = v.cacDisplay.trim().startsWith('~');
  const open = /\+\s*$/.test(v.cacDisplay.trim());
  const broken = v.cacHigh > AXIS;
  const left = (v.cacLow / AXIS) * 100;
  const right = (Math.min(v.cacHigh, AXIS) / AXIS) * 100;
  const cls = ['bar', lit ? 'lit' : '', approx ? 'approx' : '', open && !broken ? 'open' : ''].filter(Boolean).join(' ');
  return `<span class="nm${lit ? ' lit' : ''}">${esc(v.short)}</span><span class="tr"><span class="${cls}" style="left:${left.toFixed(2)}%;width:${(right - left).toFixed(2)}%"></span>${broken ? '<span class="brk"></span>' : ''}</span><span class="vl${lit ? ' lit' : ''}">${esc(v.cacDisplay)}</span>`;
}).join('')}</div>`;

for (const v of VERTICALS) {
  const m = v.h1.match(/^Growth marketing for (.+) brands$/);
  add(`industries/${v.slug}.jpg`, {
    eyebrow: v.category,
    title: accent(v.h1, m ? m[1] : ''),
    extra: `<div class="stat"><span class="k">Typical CAC</span><span class="v">${esc(v.cacDisplay)}</span></div>`,
    vis: `<div class="card"><div class="lab">Typical CAC</div>${rangeBars(v.slug)}</div>`,
    visW: 470,
    url: `/industries/${v.slug}/`,
    h1Size: 54,
  });
}
add('industries/index.jpg', {
  eyebrow: 'Industries',
  title: 'We only grow <em>health</em> brands.',
  vis: `<div class="card"><div class="lab">Typical CAC</div>${rangeBars(null)}</div>`,
  visW: 500,
  url: '/industries/',
  h1Size: 66,
});

// Glossary: 25 terms
const bySlug = Object.fromEntries(GLOSSARY.map((t) => [t.slug, t]));
for (const t of GLOSSARY) {
  const paren = t.term.match(/\(.*\)$/);
  const words = t.term.split(' ');
  const acc = paren ? paren[0] : words.length > 1 ? words[words.length - 1] : '';
  const related = (t.related || []).map((s) => bySlug[s]).filter(Boolean)
    .map((r) => `<span class="chip${r.formula ? ' f' : ''}">${esc(termShort(r))}</span>`).join('');
  const main = t.formula
    ? `<div class="lab">Formula</div>${t.formula.split(' · ').map(equation).join('')}`
    : `<div class="lab">Definition</div><div class="def">${esc(t.definition)}</div>`;
  add(`glossary/${t.slug}.jpg`, {
    eyebrow: 'Glossary',
    title: accent(t.term, acc),
    extra: `<p class="sub">${esc(t.short)}</p>`,
    vis: `<div class="card">${main}${related ? `<div class="sep"></div><div class="lab">Related terms</div><div class="chips">${related}</div>` : ''}</div>`,
    visW: 470,
    url: `/glossary/${t.slug}/`,
    h1Size: t.term.length > 26 ? 50 : 60,
  });
}
add('glossary/index.jpg', {
  eyebrow: 'Glossary',
  title: 'Health &amp; performance marketing <em>glossary</em>',
  vis: `<div class="card"><div class="lab">The metrics and rules</div><div class="chips">${GLOSSARY.map((t) => `<span class="chip${t.formula ? ' f' : ''}">${esc(termShort(t))}</span>`).join('')}</div></div>`,
  visW: 500,
  url: '/glossary/',
  h1Size: 58,
});

// Compare: 3 pages + hub
for (const c of COMPARES) {
  add(`compare/${c.slug}.jpg`, {
    eyebrow: 'Compare',
    title: accent(c.h1, 'vs.'),
    vis: `<div class="card"><div class="vs"><span class="side">${esc(c.themLabel)}</span><span class="x">vs.</span><span class="side us">AdBoost Health</span></div><ul class="dims">${c.rows.map((r) => `<li><span class="a"></span><span>${esc(r.dimension)}</span><span class="b"></span></li>`).join('')}</ul></div>`,
    visW: 450,
    url: `/compare/${c.slug}/`,
    h1Size: 54,
  });
}
add('compare/index.jpg', {
  eyebrow: 'Compare',
  title: 'Weighing your <em>options?</em>',
  vis: `<div class="card">${COMPARES.map((c) => `<div class="lr"><div class="t">AdBoost Health <em>vs.</em></div><div class="q">${esc(c.competitor)}</div></div>`).join('')}</div>`,
  visW: 430,
  url: '/compare/',
  h1Size: 70,
});

// Services: Gantt parsed from process[].phase ("Label · wk 1–2", "· ongoing", "· rolling")
const SERVICE_ACCENT = { 'paid-media': 'health & telehealth', creative: 'produced in-house', cro: 'health funnels' };
const parsePhase = (s) => {
  const [label, meta = ''] = s.split(' · ');
  const m = meta.match(/wk\s*(\d+)\s*[–-]\s*(\d+)/);
  return { label, meta, start: m ? +m[1] : null, end: m ? +m[2] : null };
};
for (const s of SERVICES) {
  const ph = s.process.map((p) => parsePhase(p.phase));
  const n = Math.max(...ph.map((p) => p.end || 0));
  // open phases (ongoing/rolling) sit in one extra column after the last dated week
  const N = ph.some((p) => !p.start) ? n + 1 : n;
  let prevEnd = 0;
  const rows = ph.map((p) => {
    let left, width, open = false;
    if (p.start) { left = ((p.start - 1) / N) * 100; width = ((p.end - p.start + 1) / N) * 100; prevEnd = p.end; }
    else { open = true; left = (prevEnd / N) * 100; width = 100 - left; }
    return `<div class="gr"><div class="gl">${esc(p.label)}<small>${esc(p.meta)}</small></div><div class="gtr" style="--n:${N}"><span class="gb${open ? ' open' : ''}" style="left:${left.toFixed(2)}%;width:${width.toFixed(2)}%"></span></div></div>`;
  }).join('');
  add(`services/${s.slug}.jpg`, {
    eyebrow: `Services · ${s.name}`,
    title: accent(s.h1, SERVICE_ACCENT[s.slug]),
    vis: `<div class="card gt"><div class="lab">How it works</div>${rows}<div class="ax"><span></span><div style="width:${((n / N) * 100).toFixed(2)}%"><span>wk 1</span><span>wk ${n}</span></div></div></div>`,
    visW: 470,
    url: `/services/${s.slug}/`,
    h1Size: 56,
  });
}
{
  // triangle: three services, equal sides (uniform layout, no data encoded in distances)
  const pts = [[50, 14], [16, 84], [84, 84]];
  const svg = `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="rgba(0,87,255,.04)" stroke="#0057ff" stroke-width=".5" stroke-dasharray="1.6 1.2" vector-effect="non-scaling-stroke"/></svg>`;
  const nodes = SERVICES.map((s, i) => `<span class="node" style="left:${pts[i][0]}%;top:${pts[i][1]}%">${esc(s.name)}</span>`).join('');
  add('services/index.jpg', {
    eyebrow: 'Services',
    title: 'One <em>compliant</em> acquisition system, built for health.',
    vis: `<div class="card"><div class="tri">${svg}${nodes}</div></div>`,
    visW: 440,
    url: '/services/',
    h1Size: 56,
  });
}

// Tools: formulas exactly as printed on each calculator page
const TOOLS = [
  { slug: 'cac-calculator', h1: 'CAC calculator', lede: 'Work out your true customer acquisition cost, then see how it stacks up against 2026 health-vertical benchmarks.',
    formulas: ['CAC = total acquisition spend ÷ new customers'] },
  { slug: 'ltv-cac-calculator', h1: 'LTV:CAC & payback calculator', lede: null,
    formulas: ['LTV ≈ monthly revenue × gross margin × average months retained', 'Payback (months) = CAC ÷ monthly gross profit per customer'], note: 'The ratio is lifetime value ÷ acquisition cost - aim for at least 3:1.' },
  { slug: 'mer-calculator', h1: 'MER calculator', lede: null,
    formulas: ['MER = total revenue ÷ total marketing spend'] },
  { slug: 'poas-calculator', h1: 'POAS calculator', lede: 'Work out your profit on ad spend, the version of ROAS that accounts for margin, so you scale what is actually profitable, not just what looks efficient.',
    formulas: ['POAS = (revenue × margin) ÷ ad spend'], note: 'Break-even on ad spend is a POAS of 1.0, before overhead.' },
  { slug: 'ad-budget-calculator', h1: 'Ad budget calculator', lede: 'Work backwards from a customer target to the monthly ad budget it takes - with the revenue and ROAS that budget should return.',
    formulas: ['Ad budget = target new customers × CAC'] },
];
// Guard: every tool string must still be printed on its page.
for (const t of TOOLS) {
  const src = fs.readFileSync(path.join(ROOT, `src/pages/tools/${t.slug}.astro`), 'utf8');
  for (const s of [t.h1, t.lede, t.note, ...t.formulas.map((f) => f.replace(/^[^=≈]*[=≈]\s*/, ''))].filter(Boolean)) {
    if (!src.includes(s)) throw new Error(`tool copy not on page ${t.slug}: ${s}`);
  }
}
for (const t of TOOLS) {
  add(`tools/${t.slug}.jpg`, {
    eyebrow: 'Free tool',
    title: accent(t.h1, 'calculator'),
    extra: t.lede ? `<p class="sub">${esc(t.lede)}</p>` : '',
    vis: `<div class="card"><div class="lab">How it is calculated</div>${t.formulas.map(equation).join('')}${t.note ? `<div class="note2">${esc(t.note)}</div>` : ''}</div>`,
    visW: 470,
    url: `/tools/${t.slug}/`,
    note: 'Runs in your browser',
    h1Size: 64,
  });
}
add('tools/index.jpg', {
  eyebrow: 'Free tools',
  title: 'Free <em>health-marketing</em> calculators',
  vis: `<div class="card">${TOOLS.map((t) => `<div class="lr"><div class="t">${esc(t.h1)}</div><div class="s">${esc(t.formulas[0])}</div></div>`).join('')}</div>`,
  visW: 480,
  url: '/tools/',
  h1Size: 62,
});

// About (owner-confirmed trust figures, labels as printed on /about/)
add('about/index.jpg', {
  eyebrow: 'About',
  title: 'The growth agency that only works in <em>health</em>.',
  vis: `<div class="card stats">${[['71+', 'Founders served'], ['$153M+', 'Tracked revenue'], ['4.9<small> / 5</small>', 'Average partner rating']]
    .map(([v, k]) => `<div class="st"><span class="v">${v}</span><span class="k">${k}</span></div>`).join('')}</div>`,
  visW: 420,
  url: '/about/',
  h1Size: 58,
});

// FAQ
add('faq/index.jpg', {
  eyebrow: 'FAQ',
  title: 'Answers to <em>popular questions</em>',
  vis: `<div class="card">${FAQ_GROUPS.map((g) => `<div class="lr"><div class="t">${esc(g.title)}</div><div class="q">${esc(g.items[0].q)}</div></div>`).join('')}</div>`,
  visW: 440,
  url: '/faq/',
  h1Size: 66,
});

// ---------- write ----------
fs.rmSync(OUT, { recursive: true, force: true });
for (const c of cards) {
  const file = path.join(OUT, c.out.replace(/\.jpg$/, '.html'));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, c.html);
}
fs.writeFileSync(path.join(HERE, 'out/cards.json'), JSON.stringify(cards.map((c) => c.out), null, 2) + '\n');
console.log(`${cards.length} cards written to ${path.relative(ROOT, OUT)}`);
