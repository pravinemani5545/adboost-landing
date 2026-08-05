import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
  ],
});
