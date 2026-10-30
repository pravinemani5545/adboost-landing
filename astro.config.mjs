import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { transformSync } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { PAGES, PREVIEW_ALL, gatedPaths, isLive, pageDate } from './src/lib/live.ts';
import { SEO_STRICT } from './src/lib/seo.ts';

const SITE = 'https://www.adboost.health';

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
  .filter((r) => !r.has && r.source.startsWith('/'))
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

// ── Build guards (health plan T2) ────────────────────────────────────────────
// Errors (always fail the build):
//   - an internal link (<a href>, canonical, or a URL in llms*.txt) to a URL
//     that is neither built nor redirected
//   - an em-dash (U+2014 or its entities) anywhere in dist
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
        if (!isHtml && !isTxt && !f.endsWith('.xml')) continue;
        const body = fs.readFileSync(path.join(dist, f), 'utf8');
        if (/\u2014|&mdash;|&#8212;|&#x2014;/i.test(body)) errors.push(`${f} contains an em-dash`);
        if (isHtml) {
          for (const m of body.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) check(f, m[1]);
          for (const m of body.matchAll(/<link\b[^>]*?rel="canonical"[^>]*?href="([^"]*)"/g)) check(f, m[1]);
        } else if (isTxt) {
          for (const m of body.matchAll(new RegExp(`${escapeRe(SITE)}(/[^\\s)>\\]"]*)`, 'g'))) check(f, m[1]);
          for (const m of body.matchAll(/\]\((\/[^)\s]*)\)/g)) check(f, m[1]);
        }
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

export default defineConfig({
  site: SITE,
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => inSitemap(new URL(page).pathname),
      serialize(item) {
        const lastmod = lastmodFor(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    releaseGates,
    minifyInlineScripts,
    siteGuards,
  ],
});
