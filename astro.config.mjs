import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adboost.health',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
