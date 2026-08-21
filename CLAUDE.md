---
created: 2026-07-24
updated: 2026-08-21
---

# AdBoost Health: Landing + Blog (Astro 5, static, Vercel)

Marketing site for a health/telehealth growth agency. Conversion goal: booked strategy calls via Cal.com (`pira-ahilan-ef2dl8/strategy-call`).

**Canonical domain: `https://www.adboost.health`** (apex 308-redirects to www). It is set once in `astro.config.mjs` `site` and everything derives from it. Never hardcode the apex domain in canonicals, schema, or sitemap references.

## Copy & content style

- **No em-dashes anywhere** (the em-dash character U+2014, or its `mdash` / `#8212` HTML entities). Not in page copy, UI text, emails (`api/subscribe.js`), blog content, meta descriptions, alt text, comments, or these docs. Use a comma, colon, period, or parentheses instead. They read as an "AI tell" and are banned across AdBoost.
- Applies to everything user-facing and to internal docs. When adding content, sweep for them before committing (a ripgrep for U+2014 or the `mdash` entity).

## SEO/GEO invariants: check on EVERY change

Any page or content change must keep these true:

1. **Every page** has: `<link rel="canonical">`, unique `<title>`/description, og:/twitter: tags with an og:image, and JSON-LD.
   - Home (`src/pages/index.astro`): Organization + WebSite + FAQPage schema. If the FAQ section copy changes, update the FAQPage JSON-LD in the frontmatter to match; they must stay in sync.
   - Posts (`src/layouts/BlogLayout.astro`): BlogPosting + BreadcrumbList schema, article og tags.
2. **og:image is always JPEG/PNG, never WebP** (Facebook's scraper won't render WebP). Post og images live at `public/blog/og/<slug>.jpg` (1200w); display heroes at `public/blog/<slug>.webp` (1600w). Both must exist for every post.
3. **Publish-date gate**: all post surfaces (blog index, `[slug]` routes, RSS, llms.txt, sitemap) must go through `getPublishedPosts()` in `src/lib/blog.ts`. Never call `getCollection('blog')` directly in a page; it would leak future-dated posts.
4. **GEO files**: `public/robots.txt` (AI crawlers explicitly allowed, sitemap pointer) and `src/pages/llms.txt.ts` (dynamic, regenerates from the collection, don't create a static llms.txt). New site sections should be added to llms.txt.ts's Pages list.
5. After changes run `pnpm build` and confirm: no schema errors, `dist/sitemap-index.xml` exists, future posts absent from `dist/blog/`.

## Blog publishing pipeline (don't break)

- Posts: `src/content/blog/<slug>.md`, schema in `src/content.config.ts`. Author: Amir Salihovic (photo `public/people/amir.webp`).
- **Friday auto-publish**: GH Actions `friday-publish.yml` (Fri 12:00 UTC) hits a Vercel deploy hook (repo secret `VERCEL_DEPLOY_HOOK_URL`) → rebuild picks up posts whose `pubDate` has arrived. Queue currently runs through 2026-09-11. Top it up with new Friday-dated posts before it dries out.
- New post checklist: markdown file with full frontmatter (incl. `heroImage`/`heroAlt`) → hero webp + og jpg generated via the skill-based hero system below (`_heroes/`) → build check.

## Hero image system: brand graphics via the social skills (since 2026-08-21)

Heroes are on-brand HTML brand graphics reproducing the `adboost-health-social` skill's design system (Geist 800 headline, ONE Instrument Serif `#0057ff` italic accent, mono eyebrow, white product-UI proof card, wordmark + blue pill footer). The old AI-generated Higgsfield "operator-premium" heroes are retired; do not generate heroes with Higgsfield/GPT Image.

Workflow (all 19 existing heroes were made this way):

1. `_heroes/genheroes.mjs`: add a POSTS entry per new post: `slug`, `eyebrow` (CATEGORY · TOPIC), headline `l1` + `accent` (the one serif-italic phrase), short `sub`, and a proof-card variant (`metric | ltv | list | test | ugc | cite | funnel | rejected | compliance`). Run `node genheroes.mjs`.
2. `_heroes/render-heroes.sh`: renders each `hero-<slug>.html` at 1600x900 @2x via headless Chrome.
3. Convert (Pillow via uv): 3200x1800 PNG → resize 1600x900 webp q84 → `public/blog/<slug>.webp`; resize 1200x675 jpg q86 → `public/blog/og/<slug>.jpg`.

Rules:
- **Hero HTML is self-contained. NEVER link the skill's `adboost.css`** into it: its class names (`.hero`, `.metric`, `.pill`, `.eyebrow`) collide and mangle the text (this bug shipped once).
- Keep heroes exactly 16:9: the blog index cards, related cards, and post hero all display 16:9 (`height: auto; aspect-ratio: 16/9`).
- **Cache-busting**: hero URLs carry `?v=N` in `src/pages/blog/index.astro` and `src/layouts/BlogLayout.astro` (cards, post hero, og:image). `/blog/*` images ship `max-age=604800`, so bump N whenever images are replaced under the same filenames (currently `?v=2`).
- Same no-em-dash rule applies to hero copy.
- For adboost.media blog posts (when that blog exists), use the same pattern with the `adboost-media-social` skill's cyan system instead.

## Design tokens

Palette from `src/styles/global.css`: blue `#0057ff` (primary), ink `#0a0a0f`, surfaces `#f6f7f9`/`#eceef3`, coral `#ff6b3d`, green `#16a34a`. Fonts: Geist + Instrument Serif (italic accents).

## Commands

- `pnpm dev` / `pnpm build` / `pnpm preview`
- Deploys: push to `main` → Vercel auto-deploy. Manual publish trigger: `gh workflow run friday-publish.yml`.

## Search Console

Property: `sc-domain:adboost.health` (domain property). Sitemap submitted: `https://www.adboost.health/sitemap-index.xml`.

### Programmatic GSC access (already set up , use it from any session)

Access is via a **service account (`gsc-bot@adboost-503106.iam.gserviceaccount.com`, siteOwner) impersonated with your machine's Application Default Credentials** , no key file. The ADC lives at `~/.config/gcloud/application_default_credentials.json` (machine-global, works from any dir). If a call fails with `Reauthentication`/`invalid_grant`, re-run once: `gcloud auth application-default login` (then `gcloud auth application-default set-quota-project adboost-503106`).

**Always run Python via `uv`** (system Python is broken). Ready-to-run:

```bash
uv run --python 3.12 --with google-api-python-client --with google-auth python - <<'PY'
from google.auth import default, impersonated_credentials
from googleapiclient.discovery import build
src,_=default()
creds=impersonated_credentials.Credentials(source_credentials=src,
  target_principal="gsc-bot@adboost-503106.iam.gserviceaccount.com",
  target_scopes=["https://www.googleapis.com/auth/webmasters"])
g=build("searchconsole","v1",credentials=creds)
print(g.sites().list().execute())                 # confirm access (siteOwner)
# g.searchanalytics().query(siteUrl="sc-domain:adboost.health", body={...})
# g.sitemaps().submit(siteUrl="sc-domain:adboost.health", feedpath="https://www.adboost.health/sitemap-index.xml")
# g.urlInspection().index().inspect(body={"inspectionUrl":"https://www.adboost.health/","siteUrl":"sc-domain:adboost.health"})
PY
```

Capabilities: Search Analytics, URL Inspection, Sitemaps (submit/get , owner-level). Request-Indexing is UI-only (not in the API).
