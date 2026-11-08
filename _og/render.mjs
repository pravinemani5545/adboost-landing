// Render _og/out/html/**.html (from genog.mjs) with agent-browser (session a3,
// 1200x630 at 2x), check each card for clipped text, then write the 1200x630 JPEG
// (<= 120KB) to public/og/<template>/<slug>.jpg. Closes the session when done.
// Usage: node _og/render.mjs [filter-substring]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, '..');
const sharp = require(path.join(ROOT, 'node_modules/.pnpm/sharp@0.34.5/node_modules/sharp'));
const HTML = path.join(HERE, 'out/html');
const PNG = path.join(HERE, 'out/png');
const OG = path.join(ROOT, 'public/og');
const MAX = 120 * 1024;
const SESSION = 'a3';

const filter = process.argv[2] || '';
const cards = JSON.parse(fs.readFileSync(path.join(HERE, 'out/cards.json'), 'utf8')).filter((c) => c.includes(filter));
fs.mkdirSync(PNG, { recursive: true });

const ab = (args, input) => execFileSync('agent-browser', ['--session', SESSION, ...args], { encoding: 'utf8', input, maxBuffer: 1 << 26 });

const report = [];
try {
  ab(['set', 'viewport', '1200', '630', '2']);
  // one batch per 10 cards keeps a single failure contained
  for (let i = 0; i < cards.length; i += 10) {
    const chunk = cards.slice(i, i + 10);
    const cmds = [];
    for (const c of chunk) {
      const png = path.join(PNG, c.replace(/\//g, '__').replace(/\.jpg$/, '.png'));
      cmds.push(['open', 'file://' + path.join(HTML, c.replace(/\.jpg$/, '.html'))]);
      cmds.push(['wait', 'body[data-done]']);
      cmds.push(['eval', 'JSON.stringify(window.__og)']);
      cmds.push(['screenshot', png]);
    }
    const out = JSON.parse(ab(['batch', '--json'], JSON.stringify(cmds)));
    chunk.forEach((c, j) => {
      const ev = out[j * 4 + 2];
      let info = null;
      const failed = out.slice(j * 4, j * 4 + 4).find((x) => !x.success);
      try { info = JSON.parse(ev.result.result); } catch { info = { parseError: JSON.stringify(failed || ev).slice(0, 300) }; }
      report.push({ card: c, ...info });
    });
  }
} finally {
  try { ab(['close']); } catch {}
}

for (const r of report) {
  const png = path.join(PNG, r.card.replace(/\//g, '__').replace(/\.jpg$/, '.png'));
  const dest = path.join(OG, r.card);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let buf;
  for (const q of [88, 85, 82, 79, 76, 72, 68]) {
    buf = await sharp(png).resize(1200, 630, { kernel: 'lanczos3' }).flatten({ background: '#ffffff' })
      .jpeg({ quality: q, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer();
    if (buf.length <= MAX) { r.q = q; break; }
  }
  if (buf.length > MAX) r.tooBig = buf.length;
  fs.writeFileSync(dest, buf);
  r.kb = +(buf.length / 1024).toFixed(1);
}
fs.writeFileSync(path.join(HERE, 'out/render-report.json'), JSON.stringify(report, null, 2) + '\n');
const problems = report.filter((r) => r.parseError || r.tooBig || (r.bad && r.bad.length) || (r.fonts && r.fonts.length));
console.log(`${report.length} rendered, ${problems.length} with problems`);
for (const p of problems) console.log(JSON.stringify(p));
console.log('max KB', Math.max(...report.map((r) => r.kb)), 'min h1', Math.min(...report.map((r) => r.h1 || 99)));
