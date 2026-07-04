# Audit items fixed — 2026-07-04

## Schema
- FAQPage JSON-LD now byte-matches visible FAQ copy (curly quotes/contractions)
- BlogPosting headline de-suffixed; breadcrumb names shortened
- publisher/worksFor consolidated to @id https://www.adboost.health/#org
- Organization gained contactPoint (sales, hello@adboost.health)

## On-page
- All 15 post titles get seoTitle ≤60 chars (script-verified); home title keyword-first with pipe
- All 15 descriptions rewritten ≤155 chars, action-verb, number-front-loaded
- Footer h6 → styled <p class="foot-label"> site-wide (heading hierarchy fixed)
- favicon.png (96) + apple-touch-icon.png (180) + favicon.ico added and linked
- "undefined health" alt capitalized (brand confirm pending — see NEXT-STEPS #7)

## Content (all 15 posts)
- Live 5 expanded to 1,215–1,391 words; tables in all 5; 3-4 vetted outbound citations each (Meta/Google/FTC/LegitScript)
- GLP-1: not-legal-advice disclaimer + ban-trigger table + expanded recovery process
- CAC post: methodology note under benchmark table
- Answer-first opening sentence under every question-H2 (all 15)
- "AdBoost Health" + Toronto context woven into prose (self-attributing passages for AI citation)
- glp1 ↔ supplement reciprocal links added
- Per-post CTA banner variants (ctaHeading/ctaText frontmatter, wired in BlogLayout)
- Homepage FAQ answers now deep-link to 3 posts

## Technical / infra
- vercel.json: security headers (nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy)
- vercel.json: 7-day cache + SWR for /blog, /logos, /ads, /people, /og assets (was max-age=0)
- vercel.json: trailingSlash → /blog now 308s to /blog/
- Custom branded 404 page
- Sitemap <lastmod> from post dates via @astrojs/sitemap serialize()
- robots.txt: Amazonbot + Applebot-Extended explicitly allowed
- /llms-full.txt endpoint (full post bodies for AI crawlers)

## Trust & UX
- /privacy/ + /terms/ pages shipped (standard templates — have counsel review), footer now links them
- Mobile hamburger menu on all pages (Blog was unreachable on mobile)
- .btn height 40→44px; footer links + back-link tap padding added
- Sticky mobile CTA extended to blog index

## Not auto-fixed (needs your input) → NEXT-STEPS.md
Case studies · About/team page · sameAs profile URLs · GSC verification · lead magnet · digital PR · pricing signal · "Undefined Health" brand confirm
