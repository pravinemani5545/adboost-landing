# AdBoost Health — Full SEO Audit
**Site:** https://www.adboost.health · **Date:** 2026-07-04 · **Pages:** 7 (home, blog index, 5 posts)
**Method:** 8 parallel specialist audits (technical, content, schema, performance, GEO, visual/mobile, SXO w/ live SERP checks, sitemap/on-page) against production.

## Executive Summary

# SEO Health Score: 70/100

| Category | Score | Weight |
|---|---|---|
| Technical SEO | 88 | 22% |
| Content Quality | 55 | 23% |
| On-Page SEO | 61 | 20% |
| Schema / Structured Data | 68 | 10% |
| Performance (CWV, lab) | 84 | 10% |
| AI Search Readiness (GEO) | 70 | 10% |
| Images | 70 | 5% |
| *Supplementary: Visual/Mobile* | *78* | — |
| *Supplementary: SXO* | *58* | — |
| *Supplementary: Sitemap* | *92* | — |

**Business type:** B2B professional services (health-vertical growth agency). Not local, not e-commerce.

**The one-sentence diagnosis:** the engineering layer is excellent (static, fast, crawlable, schema'd) — what holds the site back is *proof infrastructure*: every strong claim (results, team, ratings, policy expertise) dead-ends with no page, citation, or entity to verify it, which suppresses Content, SXO, and AI-citation scores simultaneously.

### Top 5 critical issues
1. **Trust pages don't exist** — Privacy/Terms/Cookies are unlinked footer text (404s) while the site collects PII via Cal.com; /about, /case-studies also 404.
2. **FAQPage JSON-LD text doesn't exactly match visible FAQ copy** (quote-stripping bug) — rich-result/citation eligibility risk.
3. **YMYL exposure on the GLP-1 compliance post** — specific regulatory claims, zero sources, no disclaimer, competing on a SERP with government/news authority.
4. **No entity/brand-mention infrastructure** — no sameAs, no author page, no external profiles; the strongest AI-citation signal set is at zero.
5. **Thin post bodies** — 762–871 words vs the format's ~1,500-word coverage floor; ~150-175 words per H2.

### Top 5 quick wins
1. Fix FAQ schema text mismatch (derive from the same string as rendered HTML).
2. Shorten titles (≤60 chars) + meta descriptions (≤155) on 5 pages; fix home title to "Growth Marketing for Health & Telehealth Brands | AdBoost Health".
3. vercel.json: security headers + immutable caching for /public images (2 config blocks).
4. Fix `undefined-health.webp` logo data bug; add apple-touch-icon + favicon.ico; footer h6 → styled p.
5. Add sitemap lastmod via @astrojs/sitemap serialize() + custom 404.astro.

(Full findings in section files: section-technical.md, section-content.md, section-onpage-sitemap.md, section-schema.md, section-performance.md, section-geo.md, section-visual.md, section-sxo.md)
