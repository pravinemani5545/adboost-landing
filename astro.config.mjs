import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { transformSync } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

// slug -> lastmod (updatedDate if present, else pubDate) read from post frontmatter
const BLOG_DIR = './src/content/blog';
const postDates = {};
const futureSlugs = [];
for (const f of fs.readdirSync(BLOG_DIR)) {
  if (!f.endsWith('.md')) continue;
  const src = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
  const updated = src.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  const pub = src.match(/^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  const slug = f.replace(/\.md$/, '');
  postDates[slug] = (updated ?? pub)?.[1];
  // Same gate as getPublishedPosts() in src/lib/blog.ts: pubDate <= now is live.
  if (pub && new Date(pub[1]).valueOf() > Date.now()) futureSlugs.push(slug);
}

// Fallback lastmod for non-blog routes (data-module pages carry no per-page
// date): the build date, so every sitemap URL has a freshness signal.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// Queued posts have no route until their Friday rebuild, but their hero/og
// images live in public/ (the publish pipeline needs them ready). Strip those
// static assets from dist so future slugs/artwork aren't pre-exposed.
const pruneQueuedAssets = {
  name: 'prune-queued-post-assets',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const dist = new URL(dir).pathname;
      for (const slug of futureSlugs) {
        for (const rel of [`blog/${slug}.webp`, `blog/og/${slug}.jpg`]) {
          fs.rmSync(path.join(dist, rel), { force: true });
        }
      }
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
      const walk = (d) =>
        fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
          const p = path.join(d, e.name);
          return e.isDirectory() ? walk(p) : e.name.endsWith('.html') ? [p] : [];
        });
      const scriptRe = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
      for (const file of walk(distPath)) {
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
  site: 'https://www.adboost.health',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      // Keep gated/noindex pages out of the sitemap: lead-magnet opt-in + asset
      // pages, and the /book Cal.com redirect bridge (noindex, was leaking in).
      filter: (page) =>
        !page.includes('/free/') &&
        !page.includes('/zero-ban-protocol') &&
        !page.includes('/book'),
      serialize(item) {
        const m = item.url.match(/\/blog\/([^/]+)\/$/);
        if (m && postDates[m[1]]) return { ...item, lastmod: postDates[m[1]] };
        // Every other URL gets the build date so it carries a lastmod signal.
        return { ...item, lastmod: BUILD_DATE };
      },
    }),
    pruneQueuedAssets,
    minifyInlineScripts,
  ],
});
