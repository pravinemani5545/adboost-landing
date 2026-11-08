// Loads the site's own data modules (TypeScript) with esbuild so the OG cards are
// built only from existing records. PREVIEW_ALL=1 so gated records get a card too
// (their pages go live later; the card file is harmless until then).
import path from 'node:path';
import { build } from 'esbuild';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

export async function loadData() {
  process.env.PREVIEW_ALL = '1';
  const entry = `
    export * as adPolicies from './src/data/adPolicies.ts';
    export * as verticals from './src/data/verticals.ts';
    export * as glossary from './src/data/glossary.ts';
    export * as compare from './src/data/compare.ts';
    export * as services from './src/data/services.ts';
    export * as platformHubs from './src/data/platformHubs.ts';
    export * as faq from './src/data/faq.ts';
    export * as status from './src/components/adv/status.ts';
    export { default as pages } from './src/data/pages.json';
  `;
  const out = await build({
    stdin: { contents: entry, resolveDir: ROOT, loader: 'ts' },
    bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent',
  });
  const code = out.outputFiles[0].text;
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}
