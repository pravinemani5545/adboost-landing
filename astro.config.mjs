import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { transformSync } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { PAGES, PREVIEW_ALL, gatedPaths, isLive, pageDate } from './src/lib/live.ts';
import { SEO_STRICT } from './src/lib/seo.ts';

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

// ── Published location: www.adboost.media/health/ ────────────────────────────
// Runs after every other build step, on the authored output they have checked:
//   1. moves the files into dist/health/ (404.html stays at the root, where
//      Vercel looks for the error page);
//   2. rewrites every text file: SITE becomes PUBLISHED, and root-relative URLs
//      (href/src/action/poster/srcset attributes, CSS url(), Markdown links in
//      the llms files) gain the BASE prefix;
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
          out = prefixUrls(out.replace(/(\s(?:href|src|action|poster)=["'])\/(?!\/)/g, `$1${BASE}/`))
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
    relocate,
  ],
});
