// Encode the chosen raw plate of each key into the decorative web layers:
// public/art/<section>/<slug>.avif and .webp, each at or under 120KB.
// Hero plates stay full resolution (1920px) so the glass reads sharp on retina screens. On desktop a plate
// can be the LCP element; sharp art was chosen over that on 2026-11-08 (perf stays 100, desktop LCP about 0.45s).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, '../..');
const sharp = require(path.join(ROOT, 'node_modules/.pnpm/sharp@0.34.5/node_modules/sharp'));
const SRC = path.resolve(ROOT, '../redesign/v2/art-src');
const OUT = path.join(ROOT, 'public/art');
const MAX = 120 * 1024;
const WIDTH = { light: 1920, dark: 1920 };

const cfg = JSON.parse(fs.readFileSync(path.join(HERE, 'plates.json'), 'utf8'));
const only = process.argv.slice(2);
const plates = cfg.plates.filter((p) => !only.length || only.includes(p.key));

async function fit(img, fmt, qualities) {
  for (const q of qualities) {
    const buf = await (fmt === 'avif'
      ? img.clone().avif({ quality: q, effort: 7, chromaSubsampling: '4:2:0' })
      : img.clone().webp({ quality: q, effort: 6, smartSubsample: true })
    ).toBuffer();
    if (buf.length <= MAX) return { buf, q };
  }
  throw new Error(`cannot fit ${fmt} under ${MAX} bytes`);
}

const report = [];
for (const p of plates) {
  const take = p.selected || 1;
  const src = path.join(SRC, `${p.key.replace('/', '__')}__t${take}.png`);
  if (!fs.existsSync(src)) { report.push({ key: p.key, missing: src }); continue; }
  const img = sharp(src).resize({ width: WIDTH[p.tone], kernel: 'lanczos3' });
  const [section, slug] = p.key.split('/');
  fs.mkdirSync(path.join(OUT, section), { recursive: true });
  const avif = await fit(img, 'avif', [80, 74, 68, 62, 56, 50, 45, 40]);
  const webp = await fit(img, 'webp', [90, 86, 82, 78, 74, 70, 65, 60, 55]);
  fs.writeFileSync(path.join(OUT, section, `${slug}.avif`), avif.buf);
  fs.writeFileSync(path.join(OUT, section, `${slug}.webp`), webp.buf);
  const meta = await sharp(webp.buf).metadata();
  report.push({ key: p.key, take, w: meta.width, h: meta.height, avifKB: +(avif.buf.length / 1024).toFixed(1), avifQ: avif.q, webpKB: +(webp.buf.length / 1024).toFixed(1), webpQ: webp.q });
}
console.table(report);
// a partial run (some keys only) keeps the other plates' rows
const reportPath = path.join(HERE, 'encode-report.json');
const prev = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, 'utf8')) : [];
const merged = cfg.plates.map((p) => report.find((r) => r.key === p.key) ?? prev.find((r) => r.key === p.key)).filter(Boolean);
fs.writeFileSync(reportPath, JSON.stringify(merged, null, 2) + '\n');
