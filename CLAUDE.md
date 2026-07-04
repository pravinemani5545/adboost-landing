# AdBoost Health — Landing + Blog (Astro 5, static, Vercel)

Marketing site for a health/telehealth growth agency. Conversion goal: booked strategy calls via Cal.com (`pira-ahilan-ef2dl8/strategy-call`).

**Canonical domain: `https://www.adboost.health`** (apex 308-redirects to www). It is set once in `astro.config.mjs` `site` and everything derives from it — never hardcode the apex domain in canonicals, schema, or sitemap references.

## SEO/GEO invariants — check on EVERY change

Any page or content change must keep these true:

1. **Every page** has: `<link rel="canonical">`, unique `<title>`/description, og:/twitter: tags with an og:image, and JSON-LD.
   - Home (`src/pages/index.astro`): Organization + WebSite + FAQPage schema. If the FAQ section copy changes, update the FAQPage JSON-LD in the frontmatter to match — they must stay in sync.
   - Posts (`src/layouts/BlogLayout.astro`): BlogPosting + BreadcrumbList schema, article og tags.
2. **og:image is always JPEG/PNG, never WebP** (Facebook's scraper won't render WebP). Post og images live at `public/blog/og/<slug>.jpg` (1200w); display heroes at `public/blog/<slug>.webp` (1600w). Both must exist for every post.
3. **Publish-date gate**: all post surfaces (blog index, `[slug]` routes, RSS, llms.txt, sitemap) must go through `getPublishedPosts()` in `src/lib/blog.ts`. Never call `getCollection('blog')` directly in a page — it would leak future-dated posts.
4. **GEO files**: `public/robots.txt` (AI crawlers explicitly allowed, sitemap pointer) and `src/pages/llms.txt.ts` (dynamic — regenerates from the collection, don't create a static llms.txt). New site sections should be added to llms.txt.ts's Pages list.
5. After changes run `pnpm build` and confirm: no schema errors, `dist/sitemap-index.xml` exists, future posts absent from `dist/blog/`.

## Blog publishing pipeline (don't break)

- Posts: `src/content/blog/<slug>.md`, schema in `src/content.config.ts`. Author: Amir Salihovic (photo `public/people/amir.webp`).
- **Friday auto-publish**: GH Actions `friday-publish.yml` (Fri 12:00 UTC) hits a Vercel deploy hook (repo secret `VERCEL_DEPLOY_HOOK_URL`) → rebuild picks up posts whose `pubDate` has arrived. Queue currently runs through 2026-09-11 — top it up with new Friday-dated posts before it dries out.
- New post checklist: markdown file with full frontmatter (incl. `heroImage`/`heroAlt`) → hero webp + og jpg generated → build check.

## Hero image system (Higgsfield)

Flat editorial vector, one oversized `#0057ff` focal glyph (~55% frame), faint blueprint grid, ≤2 light-gray support cards, single coral `#ff6b3d`/green `#16a34a` micro-dots, strictly no 3D/no text-in-image. Generate with GPT Image 2, 16:9, passing `public/blog/og/glp1-advertising-compliance-2026.jpg` as `--image` style reference so new heroes match the set. Then: `cwebp -q 82 -resize 1600 0` → `public/blog/`, 1200w JPEG → `public/blog/og/`.

## Design tokens

Palette from `src/styles/global.css`: blue `#0057ff` (primary), ink `#0a0a0f`, surfaces `#f6f7f9`/`#eceef3`, coral `#ff6b3d`, green `#16a34a`. Fonts: Geist + Instrument Serif (italic accents).

## Commands

- `pnpm dev` / `pnpm build` / `pnpm preview`
- Deploys: push to `main` → Vercel auto-deploy. Manual publish trigger: `gh workflow run friday-publish.yml`.

## Search Console

Property: `adboost.health` (domain property). Sitemap submitted: `https://www.adboost.health/sitemap-index.xml`.
