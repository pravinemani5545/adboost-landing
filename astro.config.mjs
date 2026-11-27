import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { transformSync } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { PAGES, PREVIEW_ALL, gatedPaths, isLive, pageDate } from './src/lib/live.ts';
import { SEO_STRICT } from './src/lib/seo.ts';
import { LAYER_ORDER } from './src/lib/layers.ts';

// The site is authored as if it sat at the root of SITE: every link, canonical,
// sitemap entry and schema URL is written or derived that way, and the release
// gates and build guards below check that layout. The `relocate` integration
// runs last and publishes the result at PUBLISHED instead (see it for details).
// `pnpm dev` serves the authored layout at /; `pnpm preview` serves the
// published one at /health/.
const SITE = 'https://www.adboost.health';
const BASE = '/health';
const PUBLISHED = `https://www.adboost.media${BASE}`;
// vercel.json holds published paths. Authored form of one, or null when the
// path is outside this site (the deployment-root redirect on the preview).
const authored = (p) => (p === BASE || p.startsWith(`${BASE}/`) ? p.slice(BASE.length) || '/' : null);

if (PREVIEW_ALL && process.env.VERCEL_ENV === 'production') {
  throw new Error('PREVIEW_ALL=1 builds unreleased pages and posts; it is not allowed on a production build.');
}

// ── Blog frontmatter scan ────────────────────────────────────────────────────
// Same gate as getPublishedPosts() in src/lib/blog.ts: a post is live when it
// is not a draft and its pubDate has arrived (or PREVIEW_ALL=1).
const BLOG_DIR = './src/content/blog';
const postDates = {};        // live slug -> updatedDate ?? pubDate (sitemap lastmod)
const unpublishedSlugs = []; // future-dated or draft: no route in this build
let newestPostDate;          // newest live pubDate: lastmod of / and /blog/
for (const f of fs.readdirSync(BLOG_DIR)) {
  if (!f.endsWith('.md')) continue;
  const src = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
  const updated = src.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const pub = src.match(/^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const draft = /^draft:\s*true\s*$/m.test(src);
  const slug = f.replace(/\.md$/, '');
  const live = PREVIEW_ALL || (!draft && pub && Date.parse(`${pub}T00:00:00Z`) <= Date.now());
  if (!live) { unpublishedSlugs.push(slug); continue; }
  postDates[slug] = updated ?? pub;
  if (!newestPostDate || pub > newestPostDate) newestPostDate = pub;
}

// URL paths this build does not publish: links to them are unwrapped.
const UNBUILT = [...gatedPaths(), ...unpublishedSlugs.map((s) => `/blog/${s}/`)];

// ── Sitemap lastmod (health plan T1) ─────────────────────────────────────────
// Truthful content dates only, never the build date: posts use their
// frontmatter, other pages src/data/pages.json. / and /blog/ take the newest
// post; every other hub its newest live child (or its own date if newer).
const maxDate = (...ds) => ds.filter(Boolean).sort().at(-1);
function lastmodFor(p) {
  const post = p.match(/^\/blog\/([^/]+)\/$/);
  if (post) return postDates[post[1]];
  if (p === '/' || p === '/blog/') return maxDate(pageDate(p), newestPostDate);
  const children = Object.keys(PAGES).filter((c) => c !== p && c.startsWith(p) && isLive(c));
  return maxDate(pageDate(p), ...children.map(pageDate));
}

// ── Redirects (vercel.json) ──────────────────────────────────────────────────
// A built page whose path is also a redirect source is unreachable on Vercel
// (redirects run before the filesystem), so it stays out of the sitemap.
const REDIRECTS = JSON.parse(fs.readFileSync('./vercel.json', 'utf8')).redirects
  .filter((r) => !r.has && authored(r.source) !== null)
  .map((r) => ({ ...r, source: authored(r.source), destination: authored(r.destination) ?? r.destination }))
  .map((r) => ({
    ...r,
    re: new RegExp('^' + r.source.replace(/\./g, '\\.').replace(/:\w+\(([^)]*)\)/g, '($1)').replace(/:\w+/g, '([^/]+)') + '$'),
  }));
const redirectFor = (p) => {
  const bare = p.replace(/(.)\/$/, '$1');
  return REDIRECTS.find((r) => r.re.test(p) || r.re.test(bare))?.destination;
};

// Lead-magnet opt-in + asset pages and the noindex /book page stay out.
const inSitemap = (p) =>
  !p.startsWith('/free/') && !p.startsWith('/zero-ban-protocol') && !p.startsWith('/book') &&
  isLive(p) && !redirectFor(p);

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ── Release gates (health plan T2) ───────────────────────────────────────────
// Unreleased posts have no route, but their hero/og images and figures live in
// public/ so the publish pipeline has them ready: strip them from dist. A gated
// non-blog page (pages.json) that was still emitted, e.g. a static .astro file,
// is removed too. Then every <a> pointing at an unbuilt URL is rendered as its
// text; each link comes back on the first rebuild after its target publishes.
// dist/build.txt (commit SHA + build time) lets the IndexNow workflows wait for
// this exact deploy instead of sleeping.
const releaseGates = {
  name: 'release-gates',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const dist = new URL(dir).pathname;
      const figDir = path.join(dist, 'blog/figures');
      const figs = fs.existsSync(figDir) ? fs.readdirSync(figDir) : [];
      for (const slug of unpublishedSlugs) {
        for (const rel of [`blog/${slug}.webp`, `blog/og/${slug}.jpg`]) {
          fs.rmSync(path.join(dist, rel), { force: true });
        }
        const own = new RegExp(`^${escapeRe(slug)}-\\d+\\.webp$`);
        for (const f of figs) if (own.test(f)) fs.rmSync(path.join(figDir, f), { force: true });
      }
      for (const p of gatedPaths()) fs.rmSync(path.join(dist, p, 'index.html'), { force: true });

      if (UNBUILT.length) {
        const link = new RegExp(
          `<a\\b[^>]*\\bhref="(?:${escapeRe(SITE)})?(?:${UNBUILT.map(escapeRe).join('|')})(?:[?#][^"]*)?"[^>]*>([\\s\\S]*?)</a>`,
          'g',
        );
        for (const f of walk(dist)) {
          if (!f.endsWith('.html')) continue;
          const html = fs.readFileSync(f, 'utf8');
          const out = html.replace(link, '$1');
          if (out !== html) fs.writeFileSync(f, out);
        }
      }

      fs.writeFileSync(path.join(dist, 'build.txt'), `${process.env.VERCEL_GIT_COMMIT_SHA ?? 'local'}\n${new Date().toISOString()}\n`);
    },
  },
};

// Top-level blocks of a stylesheet as [prelude, body] pairs (strings, comments and escapes skipped),
// and the class names a block's selectors use. For the cascade-layer guards below.
const cssBlocks = (css) => {
  const out = [];
  let depth = 0, start = 0, open = 0, pre = '';
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '\\') { i++; continue; }
    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end < 0 ? css.length : end + 1;
      if (depth === 0) start = i + 1;
      continue;
    }
    if (c === '"' || c === "'") { for (i++; i < css.length && css[i] !== c; i++) if (css[i] === '\\') i++; continue; }
    if (c === '{') { if (depth++ === 0) { pre = css.slice(start, i).trim(); open = i + 1; } }
    else if (c === '}') { if (--depth === 0) { out.push([pre, css.slice(open, i)]); start = i + 1; } }
    else if (c === ';' && depth === 0) start = i + 1;
  }
  return out;
};
const cssClassNames = (block) =>
  [...block.replace(/\{[^{}]*\}/g, '{}').replace(/"[^"]*"|'[^']*'/g, '').matchAll(/\.((?:\\.|[A-Za-z_-])(?:\\.|[\w-])*)/g)]
    .map((m) => m[1].replace(/\\/g, ''));

// ── Build guards (health plan T2) ────────────────────────────────────────────
// Errors (always fail the build):
//   - an internal link (<a href>, canonical, or a URL in llms*.txt) to a URL
//     that is neither built nor redirected
//   - an em-dash (U+2014 or its entities) anywhere in dist: HTML, XML, llms text and the built
//     CSS and JS (stylesheets are external, so a CSS comment or content string is checked too)
//   - a page that loads a stylesheet before it has declared the cascade-layer order (the first
//     sheet a browser reads would then decide whether utilities or the site's own CSS win)
//   - a class name styled by both systems: a rule in the site's own CSS (`legacy` layer) and a
//     Tailwind utility of the same name. Rename the class, or switch the utility off with
//     `@source not inline("name")` in src/styles/globals.css.
// Warnings (fail only with SEO_STRICT, see src/lib/seo.ts):
//   - an internal link to a redirected URL (link the destination instead)
//   - a built page shadowed by a vercel.json redirect (finish the merge)
//   - a sitemap URL with no content date (add it to src/data/pages.json)
//   - a live pages.json entry with no built page (stale entry)
const siteGuards = {
  name: 'site-guards',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const dist = new URL(dir).pathname;
      const files = walk(dist).map((f) => '/' + path.relative(dist, f));
      const built = new Set();
      for (const f of files) {
        built.add(f);
        if (f.endsWith('/index.html')) built.add(f.slice(0, -'index.html'.length));
      }
      const errors = [];
      const warnings = [];
      const layered = { legacy: new Set(), utilities: new Set() };
      const readLayers = (css) => {
        for (const [pre, body] of cssBlocks(css)) {
          const layer = /^@layer (legacy|utilities)$/.exec(pre)?.[1];
          if (layer) for (const name of cssClassNames(body)) layered[layer].add(name);
        }
      };

      const check = (from, href) => {
        let target = href.startsWith(SITE) ? href.slice(SITE.length) || '/' : href;
        if (!target.startsWith('/') || target.startsWith('//')) return;
        target = target.replace(/[?#].*$/, '');
        const dest = redirectFor(target);
        if (dest) warnings.push(`${from} links to ${target}, which redirects to ${dest}`);
        else if (built.has(target)) return;
        else if (built.has(`${target}/`)) warnings.push(`${from} links to ${target} without the trailing slash`);
        else errors.push(`${from} links to ${target}, which is not built`);
      };

      for (const f of files) {
        const isHtml = f.endsWith('.html');
        const isTxt = /^\/llms(-full)?\.txt$/.test(f);
        const isAsset = /\.(css|js)$/.test(f);
        if (!isHtml && !isTxt && !isAsset && !f.endsWith('.xml')) continue;
        const body = fs.readFileSync(path.join(dist, f), 'utf8');
        if (/\u2014|&mdash;|&#8212;|&#x2014;/i.test(body)) errors.push(`${f} contains an em-dash`);
        if (isHtml) {
          for (const m of body.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) check(f, m[1]);
          for (const m of body.matchAll(/<link\b[^>]*?rel="canonical"[^>]*?href="([^"]*)"/g)) check(f, m[1]);
          const order = body.indexOf(`<style>${LAYER_ORDER}</style>`);
          const firstSheet = body.search(/<link\b[^>]*\brel="stylesheet"|@layer [a-z]+\s*\{/);
          if (firstSheet > -1 && (order < 0 || order > firstSheet)) errors.push(`${f} loads a stylesheet before declaring the cascade-layer order`);
          for (const m of body.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) readLayers(m[1]);
        } else if (f.endsWith('.css')) {
          readLayers(body);
        } else if (isTxt) {
          for (const m of body.matchAll(new RegExp(`${escapeRe(SITE)}(/[^\\s)>\\]"]*)`, 'g'))) check(f, m[1]);
          for (const m of body.matchAll(/\]\((\/[^)\s]*)\)/g)) check(f, m[1]);
        }
      }

      for (const name of layered.utilities) {
        if (layered.legacy.has(name)) errors.push(`the class "${name}" is styled by the site's own CSS and by a Tailwind utility of the same name`);
      }

      for (const p of built) {
        if (!p.endsWith('/')) continue;
        const dest = redirectFor(p);
        if (dest) warnings.push(`${p} is built but vercel.json redirects it to ${dest}`);
        else if (inSitemap(p) && !lastmodFor(p)) warnings.push(`${p} has no content date for the sitemap (src/data/pages.json)`);
      }
      for (const p of Object.keys(PAGES)) {
        if (isLive(p) && !built.has(p)) warnings.push(`src/data/pages.json lists ${p}, which is not built`);
      }

      const uniq = (xs) => [...new Set(xs)];
      for (const w of uniq(warnings)) logger.warn(w);
      const fatal = uniq(SEO_STRICT ? [...errors, ...warnings] : errors);
      if (fatal.length) {
        throw new Error(`Build guards failed (${fatal.length}):\n${fatal.slice(0, 60).join('\n')}`);
      }
      logger.info(`build guards passed (${uniq(warnings).length} warning(s)${SEO_STRICT ? ', strict' : ''})`);
    },
  },
};

// Astro emits is:inline scripts verbatim (unminified). Minify inline JS and
// JSON-LD in the built HTML. Whitespace + syntax only (no identifier mangling)
// so global hooks like window.abTrack and cross-script references stay intact.
const minifyInlineScripts = {
  name: 'minify-inline-scripts',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const distPath = new URL(dir).pathname;
      const scriptRe = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
      for (const file of walk(distPath).filter((f) => f.endsWith('.html'))) {
        const html = fs.readFileSync(file, 'utf8');
        const out = html.replace(scriptRe, (full, attrs, body) => {
          if (!body.trim()) return full;
          if (/application\/(ld\+json|json)/i.test(attrs)) {
            try { return `<script${attrs}>${JSON.stringify(JSON.parse(body))}</script>`; } catch { return full; }
          }
          const tm = /type\s*=\s*["']([^"']+)["']/i.exec(attrs);
          if (tm && !/javascript|module/i.test(tm[1])) return full;
          try {
            const code = transformSync(body, {
              loader: 'js', minifyWhitespace: true, minifySyntax: true,
              minifyIdentifiers: false, legalComments: 'none',
            }).code.trim();
            return `<script${attrs}>${code}</script>`;
          } catch { return full; }
        });
        if (out !== html) fs.writeFileSync(file, out);
      }
    },
  },
};

// React is a build-time renderer on this site (shadcn/ui components become plain HTML).
// @astrojs/react still emits its browser runtime for islands (_astro/client.*.js, about 220KB),
// and no page has an island: when nothing in the build refers to that file it is removed, so the
// deployment carries no React runtime. A page that hydrates a component (client:*) keeps it.
const dropUnusedReactRuntime = {
  name: 'drop-unused-react-runtime',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const dist = new URL(dir).pathname;
      const assets = path.join(dist, '_astro');
      if (!fs.existsSync(assets)) return;
      const runtimes = fs.readdirSync(assets).filter((f) => /^client\.[\w-]+\.js$/.test(f));
      if (!runtimes.length) return;
      const sources = walk(dist).filter((f) => /\.(html|js)$/.test(f));
      for (const name of runtimes) {
        const used = sources.some((f) => path.basename(f) !== name && fs.readFileSync(f, 'utf8').includes(name));
        if (used) logger.warn(`${name} (the React browser runtime) is referenced by a page: an island ships React to visitors`);
        else fs.rmSync(path.join(assets, name));
      }
    },
  },
};

// Diagram kit fixtures (/free/kit/diagrams/, /free/kit/diagrams-night/): visual QA only. The route
// lives in src/kit/fixtures/ and is injected in dev and PREVIEW_ALL builds only, so a production
// build has no fixture page in its module graph.
const kitFixtures = {
  name: 'kit-fixtures',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev' || PREVIEW_ALL) {
        injectRoute({ pattern: '/free/kit/[fixture]', entrypoint: './src/kit/fixtures/[fixture].astro' });
      }
    },
  },
};

// CSS delivery. Astro splits shared CSS by the exact set of pages that use each component, so the
// diagram kit (one scoped <style> per kind) became up to 9 render-blocking sheets on one page.
// Group every diagram's styles into one stylesheet instead (about 10KB brotli): a page with any
// diagram loads it once and later pages reuse it from cache, so a page links 3 sheets at most.
// Lighthouse mobile on HTTP/2 + brotli (10 pages, median of 3) put this level with or ahead of
// inlineStylesheets: 'always', which re-sends ~20KB brotli of CSS in every page's HTML.
const kitDiagramCss = (id) => (id.includes('/src/kit/diagram/') && /[?&]type=style/.test(id) ? 'kit-diagrams' : undefined);

// ── Cascade layers ───────────────────────────────────────────────────────────
// src/styles/globals.css is the design-system entry shared with the other sections of
// www.adboost.media (Tailwind v4 + shadcn/ui). Its cascade layers are, lowest first:
//   properties, theme, base, legacy, components, utilities
// Everything this site wrote itself (the kit, global.css, interior.css, page CSS and every scoped
// <style>) is wrapped in `legacy` here, so a shadcn component or a utility class always wins over
// it, while the site's own rules keep exactly the order they always had among themselves.
// The wrap runs after Vite's CSS step (imports are inlined, Astro has scoped the selectors) and
// before the bundle is minified with esbuild, so the kit never passes through Tailwind's
// Lightning CSS (which drops animation-timeline). @view-transition stays outside the layer.
// The Shell prints LAYER_ORDER (src/lib/layers.ts) in <head> before any stylesheet; the build
// guards check that, and that no class name is styled by both systems.
const TW_ENTRY = '/src/styles/globals.css';
const legacyLayer = {
  name: 'legacy-layer',
  transform(code, id) {
    // Every stylesheet of this site: a .css file or an .astro <style> (its id ends in lang.css),
    // also when the dev server asks for it as ?inline. Never the raw or url form, never the
    // Tailwind entry.
    const file = id.split('?')[0];
    if (!/\.css(?:$|[?&])/.test(id) || /[?&](?:raw|url)(?:$|&)/.test(id)) return;
    if (!file.includes('/src/') || file.includes('/node_modules/') || file.endsWith(TW_ENTRY)) return;
    const hoisted = [];
    const body = code.replace(
      /@media[^{}]*\{\s*@view-transition\s*\{[^{}]*\}\s*\}|@view-transition\s*\{[^{}]*\}/g,
      (rule) => { hoisted.push(rule); return ''; },
    );
    const bare = body.replace(/\/\*[\s\S]*?\*\//g, '');
    if (/@(view-transition|import|charset|namespace)\b/.test(bare)) {
      this.error(`legacy-layer: ${id} has an @import, @charset, @namespace or nested @view-transition rule that cannot be moved into a cascade layer`);
    }
    if (!bare.trim()) return hoisted.length ? { code: hoisted.join('\n'), map: null } : undefined;
    return { code: `${hoisted.join('\n')}\n@layer legacy {\n${body}\n}\n`, map: null };
  },
};

// Markdown tables (blog posts): one table look site-wide. Each table gets the .dtable class and
// a .tablewrap wrapper that scrolls on phones instead of crushing the columns. No dependencies:
// a plain walk over the hast tree.
function rehypeTableWrap() {
  const visit = (node) => {
    if (!node.children) return;
    node.children = node.children.map((c) => {
      if (c.type === 'element' && c.tagName === 'table') {
        const cls = [].concat(c.properties?.className ?? []);
        c.properties = { ...c.properties, className: [...cls, 'dtable'] };
        return { type: 'element', tagName: 'div', properties: { className: ['tablewrap'] }, children: [c] };
      }
      visit(c);
      return c;
    });
  };
  return (tree) => visit(tree);
}

// ── Published location: www.adboost.media/health/ ────────────────────────────
// Runs after every other build step, on the authored output they have checked:
//   1. moves the files into dist/health/ (404.html stays at the root, where
//      Vercel looks for the error page);
//   2. rewrites every text file: SITE becomes PUBLISHED, and root-relative URLs
//      (href/src/action/poster/srcset attributes, the kit Video's data-src and
//      data-webm, CSS url(), Markdown links in the llms files) gain the BASE prefix;
//   3. re-checks the published tree. Errors (always fail the build): the old
//      address anywhere, a root-relative URL outside BASE, or a same-site URL
//      that is neither a file nor a vercel.json redirect. Warning (fails only
//      with SEO_STRICT): a root-relative path inside a script, which this step
//      does not rewrite.
// Email addresses (@adboost.health) and the tracker and signup host
// (admin.adboost.health) are not site URLs and are left alone, as are links to
// the rest of www.adboost.media.
const TEXT = /\.(html|css|js|xml|txt|json|svg|webmanifest)$/;
const relocate = {
  name: 'relocate',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const dist = new URL(dir).pathname;
      const pub = path.join(dist, BASE);
      fs.mkdirSync(pub);
      for (const e of fs.readdirSync(dist)) {
        if (e === BASE.slice(1) || e === '404.html') continue;
        fs.renameSync(path.join(dist, e), path.join(pub, e));
      }

      const host = (u) => u.replace(/^https:\/\//, '');
      const prefixUrls = (s) => s.replace(/(url\(\s*['"]?)\/(?!\/)/g, `$1${BASE}/`);
      const texts = walk(dist).filter((f) => TEXT.test(f));
      for (const f of texts) {
        const body = fs.readFileSync(f, 'utf8');
        let out = body.split(SITE).join(PUBLISHED).split(host(SITE)).join(host(PUBLISHED));
        if (f.endsWith('.html')) {
          out = prefixUrls(out.replace(/(\s(?:href|src|action|poster|data-src|data-webm)=["'])\/(?!\/)/g, `$1${BASE}/`))
            .replace(/(\s(?:srcset|imagesrcset)=)(["'])([^"']*)\2/g, (_, attr, q, list) =>
              `${attr}${q}${list.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}/`)}${q}`);
        } else if (f.endsWith('.css')) {
          out = prefixUrls(out);
        } else if (f.endsWith('.txt')) {
          out = out.replace(/(\]\()\/(?!\/)/g, `$1${BASE}/`);
        }
        if (out !== body) fs.writeFileSync(f, out);
      }

      const redirects = JSON.parse(fs.readFileSync('./vercel.json', 'utf8')).redirects
        .filter((r) => !r.has)
        .map((r) => new RegExp('^' + r.source.replace(/\./g, '\\.').replace(/:\w+\(([^)]*)\)/g, '($1)').replace(/:\w+/g, '([^/]+)') + '$'));
      const exists = (p) => {
        const clean = decodeURI(p.replace(/[?#].*$/, ''));
        const file = path.join(dist, clean);
        if (fs.existsSync(file) && (fs.statSync(file).isFile() || fs.existsSync(path.join(file, 'index.html')))) return true;
        return redirects.some((re) => re.test(clean) || re.test(clean.replace(/(.)\/$/, '$1')));
      };
      const errors = [];
      const warnings = [];
      const inBase = (p) => p === BASE || p.startsWith(`${BASE}/`) || p.startsWith(`${BASE}?`) || p.startsWith(`${BASE}#`);
      const scriptPaths = (rel, code) => {
        for (const m of code.matchAll(/["'`](\/(?!\/)[A-Za-z_][^"'`\s]*)/g)) {
          if (!inBase(m[1])) warnings.push(`${rel} has the root-relative path ${m[1]} in a script; relocate does not rewrite it`);
        }
      };
      const stray = fs.readdirSync(dist).filter((e) => e !== BASE.slice(1) && e !== '404.html');
      if (stray.length) errors.push(`left at the deployment root: ${stray.join(', ')}`);
      for (const f of texts) {
        const rel = '/' + path.relative(dist, f);
        const body = fs.readFileSync(f, 'utf8');
        if (body.includes(host(SITE))) errors.push(`${rel} still contains ${host(SITE)}`);
        const refs = [];
        if (/\.(html|css)$/.test(f)) {
          for (const m of body.matchAll(/url\(\s*['"]?(\/(?!\/)[^'")\s]*)/g)) refs.push(m[1]);
        }
        if (f.endsWith('.html')) {
          const markup = body.replace(/(<script\b[^>]*>)([\s\S]*?)<\/script>/g, (tag, open, code) => {
            if (!/application\/(ld\+json|json)/.test(open)) scriptPaths(rel, code);
            return `${open}</script>`;
          });
          for (const m of markup.matchAll(/\s[a-zA-Z:-]+=["'](\/(?!\/)[^"']*)["']/g)) refs.push(m[1]);
          for (const m of markup.matchAll(/\s(?:srcset|imagesrcset)=["']([^"']*)["']/g)) {
            for (const part of m[1].split(',')) {
              const u = part.trim().split(/\s+/)[0];
              if (u.startsWith('/') && !u.startsWith('//')) refs.push(u);
            }
          }
          for (const m of body.matchAll(new RegExp(`${escapeRe(PUBLISHED)}(?=[/?#"'<\\s)]|$)([^"'<>\\s)]*)`, 'g'))) refs.push(BASE + m[1]);
          if (/href=\\"\/(?!\/)/.test(body)) errors.push(`${rel} has an escaped root-relative href (HTML inside JSON) that was not rewritten`);
        } else if (f.endsWith('.txt')) {
          for (const m of body.matchAll(/\]\((\/(?!\/)[^)\s]*)\)/g)) refs.push(m[1]);
          for (const m of body.matchAll(new RegExp(`${escapeRe(PUBLISHED)}(/[^\\s)>\\]"]*)`, 'g'))) refs.push(BASE + m[1]);
        } else if (f.endsWith('.js')) {
          scriptPaths(rel, body);
        } else if (f.endsWith('.xml')) {
          for (const m of body.matchAll(new RegExp(`${escapeRe(PUBLISHED)}(/[^<"'\\s]*)`, 'g'))) refs.push(BASE + m[1]);
        }
        for (const ref of new Set(refs)) {
          if (!inBase(ref)) errors.push(`${rel} has the root-relative URL ${ref}, outside ${BASE}/`);
          else if (!exists(ref)) errors.push(`${rel} points at ${ref}, which is not in the published output`);
        }
      }

      const uniq = (xs) => [...new Set(xs)];
      for (const w of uniq(warnings)) logger.warn(w);
      const fatal = uniq(SEO_STRICT ? [...errors, ...warnings] : errors);
      if (fatal.length) {
        throw new Error(`Relocation to ${PUBLISHED} failed (${fatal.length}):\n${fatal.slice(0, 60).join('\n')}`);
      }
      logger.info(`published at ${PUBLISHED}/ (${texts.length} text files checked, ${uniq(warnings).length} warning(s))`);
    },
  },
};

export default defineConfig({
  site: SITE,
  devToolbar: { enabled: false },
  // Hover (and focus) prefetch for every internal link. Prefetch only: never prerender (t.js would
  // log a pageview for a page that was never opened), so no experimental clientPrerender and no
  // <ClientRouter/>. Touch devices get speculation-rules prefetch from KitHead instead.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  markdown: { rehypePlugins: [rehypeTableWrap] },
  vite: {
    // Tailwind compiles src/styles/globals.css only; legacyLayer puts every other stylesheet of
    // this site in the `legacy` cascade layer (see above).
    plugins: [tailwindcss(), legacyLayer],
    // esbuild, not Lightning CSS: Lightning CSS drops animation-timeline (scroll-driven motion).
    build: { cssMinify: 'esbuild', rollupOptions: { output: { manualChunks: kitDiagramCss } } },
  },
  integrations: [
    kitFixtures,
    // React only renders shadcn/ui components to HTML at build time; no page ships a React
    // runtime unless a component is given a client: directive (none is).
    react(),
    sitemap({
      filter: (page) => inSitemap(new URL(page).pathname),
      serialize(item) {
        const lastmod = lastmodFor(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    releaseGates,
    dropUnusedReactRuntime,
    minifyInlineScripts,
    siteGuards,
    relocate,
  ],
});
