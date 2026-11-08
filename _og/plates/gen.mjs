// Generate decorative art plates with the Higgsfield CLI (nano_banana_pro, 4k).
// Usage: node _og/plates/gen.mjs <key>[,<key>...] [--take N] [--dry]
// Raw 4k sources go to redesign/v2/art-src (outside the repo); every submission is
// appended to _og/plates/ledger.jsonl so the credit total is auditable.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.resolve(HERE, '../../../redesign/v2/art-src');
const LEDGER = path.join(HERE, 'ledger.jsonl');
const CAP = 150;
const COST = 4;

const cfg = JSON.parse(fs.readFileSync(path.join(HERE, 'plates.json'), 'utf8'));
const args = process.argv.slice(2);
const keys = (args[0] || '').split(',').filter(Boolean);
const take = Number((args[args.indexOf('--take') + 1]) || 1) || 1;
const dry = args.includes('--dry');

export const promptFor = (p) =>
  [(p.takes && p.takes[take]) || p.scene, p.tone === 'dark' ? cfg.style_dark : cfg.style_light, cfg.rules].join('\n\n');

const spent = () =>
  fs.existsSync(LEDGER)
    ? fs.readFileSync(LEDGER, 'utf8').split('\n').filter(Boolean).map(JSON.parse).reduce((s, r) => s + (r.credits || 0), 0)
    : 0;

const plates = keys.map((k) => {
  const p = cfg.plates.find((x) => x.key === k);
  if (!p) throw new Error('unknown plate ' + k);
  return p;
});
for (const p of plates) {
  const pr = promptFor(p);
  if (/\u2014/.test(pr)) throw new Error('em-dash in prompt ' + p.key);
}
if (spent() + plates.length * COST > CAP) {
  throw new Error(`cap: spent ${spent()} + ${plates.length * COST} > ${CAP}`);
}
fs.mkdirSync(SRC, { recursive: true });

const run = (p) => {
  const prompt = promptFor(p);
  const out = path.join(SRC, `${p.key.replace('/', '__')}__t${take}.png`);
  if (dry) return console.log(p.key, '\n', prompt, '\n');
  let res;
  for (let i = 1; i <= 3; i++) {
    try {
      res = execFileSync('hf', ['generate', 'create', 'nano_banana_pro', '--prompt', prompt,
        '--aspect_ratio', p.ar, '--resolution', '4k', '--wait', '--wait-timeout', '15m', '--json'],
        { encoding: 'utf8', maxBuffer: 1 << 26 });
      break;
    } catch (e) {
      console.error(`${p.key} attempt ${i} failed: ${String(e.stderr || e.message).slice(0, 300)}`);
      if (i === 3) throw e;
    }
  }
  fs.writeFileSync(out.replace(/\.png$/, '.json'), res);
  const url = (res.match(/"result_url":\s*"([^"]+)"/) || [])[1];
  fs.appendFileSync(LEDGER, JSON.stringify({ key: p.key, take, credits: COST, at: new Date().toISOString(), url, file: path.basename(out) }) + '\n');
  if (!url) throw new Error('no image url for ' + p.key + ': ' + res.slice(0, 400));
  execFileSync('curl', ['-sSL', '-o', out, url]);
  console.log('saved', out);
};

for (const p of plates) run(p);
console.log('ledger total', spent());
