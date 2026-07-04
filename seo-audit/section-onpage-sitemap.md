## Sitemap — 92/100 · On-Page — 61/100

### High
1. **Title tags: 5/7 pages truncate in SERPs** — post titles 85–110 chars (cutoff ~60). Worst: choose-agency (110), glp1 (105). Fix: cap ~60 chars incl. "| AdBoost Health"; move explainer clause to H1/meta desc.
2. **Meta descriptions: 5/7 over 160 chars** (167–182) — truncate mid-sentence. Tighten to ≤155, front-load numbers, add CTA verb.

### Medium
3. **Home title uses comma, brand-first** ("AdBoost Health, Growth Marketing…") — inconsistent + buries keywords. Fix: "Growth Marketing for Health & Telehealth Brands | AdBoost Health".
4. **Footer H6 heading-hierarchy skip site-wide** — H2/H3 → H6 ("BY THE NUMBERS", "GET IN TOUCH"). Replace h6 with styled <p>.
5. **Missing apple-touch-icon + /favicon.ico** — both 404; only one PNG link rel=icon. Add 180×180 apple-touch-icon + favicon.ico.
6. **"undefined health" logo bug** — /logos/undefined-health.webp with alt="undefined health" live on home; a client-name variable resolved to undefined. Fix data + rename asset.

### Low
7. Sitemap lacks lastmod (wire via @astrojs/sitemap serialize() from pubDate/updatedDate; don't fake identical dates).
8. og:title/og:description inherit oversized title/desc on posts — resolves with #1/#2.

### Passed
Sitemap valid, 7/7 URLs match site, zero 404/redirect entries, robots reference, priority/changefreq correctly omitted · unique titles/descs · exactly one H1/page, H1≠title · full alt-text coverage (30 imgs) · descriptive internal anchors, no "click here" · correct canonicals.
