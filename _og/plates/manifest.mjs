// Writes _og/plates/MANIFEST.md from plates.json, ledger.jsonl and encode-report.json.
// Usage: node _og/plates/manifest.mjs
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, '../..');
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, 'plates.json'), 'utf8'));
const ledger = fs.readFileSync(path.join(HERE, 'ledger.jsonl'), 'utf8').split('\n').filter(Boolean).map(JSON.parse);
const enc = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(HERE, 'encode-report.json'), 'utf8')).map((r) => [r.key, r]));
const total = ledger.reduce((s, r) => s + r.credits, 0);
const kb = (p) => (fs.statSync(path.join(ROOT, 'public', p)).size / 1024).toFixed(1);

const L = [];
L.push('# Generated art plates (AdBoost Health design v2)');
L.push('');
L.push('Status of every file below: **needs owner sign-off**. Nothing here has been approved yet.');
L.push('');
L.push('How to use them (brief section 6): decorative layers only, `alt=""`, masked at 20-40% opacity behind the hero aside or CTA band, never the LCP element. Templates fall back to a gradient when a file is missing. Each still ships as AVIF and WebP, 1920px wide, 120KB or less.');
L.push('');
L.push(`Model: Higgsfield \`nano_banana_pro\` at 4k (4 credits each). Loop: \`seedance_2_0\` 720p, 5s, no audio. Budget cap 150 credits; **spent ${total} credits** (including retakes). Raw 4k sources and job JSON are kept outside the repo in \`projects/adboost/redesign/v2/art-src/\`. Scripts: \`_og/plates/\` (gen.mjs, encode.mjs, loop.sh, loop-encode.sh, manifest.mjs).`);
L.push('');
L.push('## Files');
L.push('');
L.push('| Plate | Files | Size (px) | AVIF / WebP KB | Credits | Status |');
L.push('|---|---|---|---|---|---|');
for (const p of cfg.plates) {
  const [section, slug] = p.key.split('/');
  const e = enc[p.key] || {};
  const spent = ledger.filter((r) => r.key === p.key).reduce((s, r) => s + r.credits, 0);
  const takes = ledger.filter((r) => r.key === p.key).length;
  L.push(`| ${p.key} (${p.ar}${takes > 1 ? `, take ${p.selected || 1} of ${takes}` : ''}) | \`/art/${section}/${slug}.avif\`, \`.webp\` | ${e.w}x${e.h} | ${e.avifKB} / ${e.webpKB} | ${spent} | needs owner sign-off |`);
}
const loop = ledger.filter((r) => r.key === 'advertising/hub-loop').reduce((s, r) => s + r.credits, 0);
L.push(`| advertising/hub-loop (ambient loop for the /advertising/ hero) | \`/art/advertising/hub-loop.mp4\` (H.264), \`hub-loop.webm\` (VP9), poster \`hub-loop-poster.avif\`, \`.webp\` | 1280x720, 4.5s seamless loop, no audio | mp4 ${kb('art/advertising/hub-loop.mp4')}, webm ${kb('art/advertising/hub-loop.webm')}, poster ${kb('art/advertising/hub-loop-poster.avif')} / ${kb('art/advertising/hub-loop-poster.webp')} | ${loop} | needs owner sign-off |`);
L.push('');
L.push('Loop notes: generated from the `advertising/hub` still as both start and end frame, then the last 0.6s is crossfaded into the first 0.6s so it loops without a seam. Show the poster (first frame) under reduced motion, on lowpower devices and until the video can play; pause it off screen.');
L.push('');
L.push('## Prompts');
L.push('');
L.push('Every still prompt is `SCENE` + the tone\'s `STYLE` block + `RULES`, exactly as below.');
L.push('');
L.push('**STYLE (light):** ' + cfg.style_light);
L.push('');
L.push('**STYLE (dark, CTA plates):** ' + cfg.style_dark);
L.push('');
L.push('**RULES (all):** ' + cfg.rules);
L.push('');
for (const p of cfg.plates) {
  L.push(`**${p.key}** (${p.tone}, ${p.ar}): ${(p.takes && p.selected && p.takes[p.selected]) || p.scene}`);
  if (p.takes && p.selected) L.push(`  Take 1 (not used, kept in art-src): ${p.scene}`);
  L.push('');
}
const loopSh = fs.readFileSync(path.join(HERE, 'loop.sh'), 'utf8');
const motion = (loopSh.match(/MOTION="([^"]+)"/) || [])[1];
L.push(`**advertising/hub-loop** (seedance_2_0, start and end image = advertising/hub take 1): ${motion}`);
L.push('');
L.push('## Credit ledger');
L.push('');
L.push('| When (UTC) | Plate | Take | Credits |');
L.push('|---|---|---|---|');
for (const r of ledger) L.push(`| ${r.at.replace('T', ' ').slice(0, 16)} | ${r.key} | ${r.take} | ${r.credits} |`);
L.push(`| | **Total** | | **${total} of 150** |`);
L.push('');
const md = L.join('\n');
if (md.includes('\u2014')) throw new Error('em-dash in manifest');
fs.writeFileSync(path.join(ROOT, '_og/plates/MANIFEST.md'), md);
console.log('wrote _og/plates/MANIFEST.md, total credits', total);
