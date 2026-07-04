import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// slug -> lastmod (updatedDate if present, else pubDate) read from post frontmatter
const BLOG_DIR = './src/content/blog';
const postDates = {};
for (const f of fs.readdirSync(BLOG_DIR)) {
  if (!f.endsWith('.md')) continue;
  const src = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
  const updated = src.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  const pub = src.match(/^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m);
  postDates[f.replace(/\.md$/, '')] = (updated ?? pub)?.[1];
}

export default defineConfig({
  site: 'https://www.adboost.health',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      serialize(item) {
        const m = item.url.match(/\/blog\/([^/]+)\/$/);
        if (m && postDates[m[1]]) return { ...item, lastmod: postDates[m[1]] };
        return item;
      },
    }),
  ],
});
