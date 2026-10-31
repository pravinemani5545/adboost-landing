# META-TODO: hand-written descriptions and merge clean-up

Generated 2026-10-30 on branch `seo/optimizations` from the build warnings. Plan:
`seo-research/2026-10-30/plan/FINAL-health-plan.md` (paths below are relative to `adboost/`).

The advertising, industries, glossary and compare templates no longer derive a
description from body copy (`.slice(0, 155)` is gone). Each record needs a
hand-written `metaDescription`. Until it has one, `pnpm build` prints
`[seo] <path>: metaDescription missing` and the page ships with **no** meta
description (and no og/twitter description). Nothing falls back to truncated text.

Rules for every description: 140-160 characters, only facts that are on the
page, no em-dashes, no spaced hyphens used as dashes, policy facts matching the
followup-2 claim matrix. Titles stay at 60 characters or fewer. `src/lib/seo.ts`
checks both lengths.

Check progress with `pnpm build 2>&1 | grep '\[seo\]'`. The full gate is
`SEO_STRICT=1 pnpm build`: it fails on every item in sections 1 and 2.

## 1. Missing `metaDescription` (56 records)

Paste the plan's text where it gives one, after the page body it describes is
written. Where the plan points at `ctr.md`, adapt that draft to the page as it
now reads (`seo-research/2026-10-30/ctr.md`).

### Advertising rule sheets (15): `src/data/adPolicies.ts`, plan O2-O4 (D1, 2026-11-03)

Field `metaDescription` (and optional `seoTitle`) on each `AdPolicy` record.

- [ ] `/advertising/glp-1-on-meta/` (O2 table)
- [ ] `/advertising/supplements-on-meta/` (O2 table; title stays the template)
- [ ] `/advertising/telehealth-on-meta/` (O2 table)
- [ ] `/advertising/trt-on-meta/` (O2 table)
- [ ] `/advertising/med-spa-on-meta/` (O2 table)
- [ ] `/advertising/glp-1-on-tiktok/` (O3 table; title stays the template)
- [ ] `/advertising/supplements-on-tiktok/` (O3 table)
- [ ] `/advertising/telehealth-on-tiktok/` (O3 table, reordered description)
- [ ] `/advertising/trt-on-tiktok/` (O3 table, reordered description)
- [ ] `/advertising/med-spa-on-tiktok/` (O3 table)
- [ ] `/advertising/supplements-on-google/` (O4 table)
- [ ] `/advertising/glp-1-on-google/` (O4 table)
- [ ] `/advertising/telehealth-on-google/` (O4 table)
- [ ] `/advertising/trt-on-google/` (O4 table, reordered description)
- [ ] `/advertising/med-spa-on-google/` (O4 table)

### Compare pages (3): `src/data/compare.ts`, plan O11 (D2a, 2026-11-10)

- [ ] `/compare/full-service-healthcare-agency-alternative/` (O11, 156)
- [ ] `/compare/generalist-dtc-agency-alternative/` (O11, reframed, 141)
- [ ] `/compare/in-house-growth-team-alternative/` (O11, reframed, 141)

### Industry pages (9): `src/data/verticals.ts`, plan O17 (D2b, 2026-11-12)

Field `metaDescription` (and optional `seoTitle`, per O17) on each `Vertical` record.

- [ ] `/industries/glp-1-weight-loss/` (O17, reworded, 150; no "compounded")
- [ ] `/industries/telehealth/` (O17, 160)
- [ ] `/industries/supplements-dtc/` (O17, 157)
- [ ] `/industries/trt-hormone/` (O17, 154)
- [ ] `/industries/peptides/` (O17, stance-neutral, 151; O25 is on hold)
- [ ] `/industries/med-spa/` (ctr.md 5b / 4)
- [ ] `/industries/mental-health/` (ctr.md 5b / 4)
- [ ] `/industries/longevity/` (ctr.md 5b / 4)
- [ ] `/industries/fertility-ivf/` (ctr.md 5b / 4)

### Glossary terms (25 after the merges): `src/data/glossary.ts`, plan O12 (D2a, 2026-11-10)

Source: ctr.md 5d. Do not copy the CAC ranges into descriptions. The four merge
targets may mention the concept they absorb. Titles are held.

- [ ] `/glossary/aov/`
- [ ] `/glossary/blended-cac/`
- [ ] `/glossary/cac/`
- [ ] `/glossary/cac-payback-period/` (absorbs payback period, P2)
- [ ] `/glossary/capi/` (absorbs server-side tracking, P3)
- [ ] `/glossary/churn-rate/` (absorbs retention rate, P4)
- [ ] `/glossary/contribution-margin/`
- [ ] `/glossary/cpc/`
- [ ] `/glossary/cpm/`
- [ ] `/glossary/creative-testing/` (absorbs creative fatigue, P5)
- [ ] `/glossary/hipaa-compliant-marketing/`
- [ ] `/glossary/hook-rate/`
- [ ] `/glossary/incrementality/`
- [ ] `/glossary/ios-att/`
- [ ] `/glossary/landing-page-conversion-rate/`
- [ ] `/glossary/legitscript-certification/`
- [ ] `/glossary/ltv/`
- [ ] `/glossary/ltv-cac-ratio/`
- [ ] `/glossary/mer/`
- [ ] `/glossary/paid-cac/`
- [ ] `/glossary/poas/`
- [ ] `/glossary/quiz-funnel/`
- [ ] `/glossary/rebill-rate/`
- [ ] `/glossary/roas/`
- [ ] `/glossary/structure-function-claim/`

The four merged terms (`payback-period`, `server-side-tracking`, `retention-rate`,
`creative-fatigue`) get no description: they are deleted (section 2).

## 2. Merge clean-up (P1-P5): redirects are live in `vercel.json`, the content side is not

The five 301s are already in `vercel.json`. On Vercel a redirect runs before the
filesystem, so these built pages are unreachable and are kept out of the sitemap.
Finish each merge, then the warnings below disappear.

| Merge | Source to delete | Target that absorbs it |
|---|---|---|
| P1 | `/blog/choose-health-growth-agency/`: `src/content/blog/choose-health-growth-agency.md`, `public/blog/choose-health-growth-agency.webp`, `public/blog/og/choose-health-growth-agency.jpg` | `/compare/generalist-dtc-agency-alternative/` (9 vetting questions as an H2 with question H3s) |
| P2 | `/glossary/payback-period/`: its record in `src/data/glossary.ts` and its line in `src/data/pages.json` | `/glossary/cac-payback-period/` (gross-profit variant) |
| P3 | `/glossary/server-side-tracking/`: same | `/glossary/capi/` ("Server-side tracking beyond Meta") |
| P4 | `/glossary/retention-rate/`: same | `/glossary/churn-rate/` (retention as the complement of churn) |
| P5 | `/glossary/creative-fatigue/`: same | `/glossary/creative-testing/` ("Creative fatigue" section) |

Then repoint every internal link to a merged URL at its target. As of this
commit the build reports links from:

- Glossary data: `related` arrays and body links in `src/data/glossary.ts` (terms cac, cac-payback-period, capi, churn-rate, cpm, creative-testing, hipaa-compliant-marketing, hook-rate, ios-att, ltv, ltv-cac-ratio, quiz-funnel, rebill-rate, roas)
- Glossary template: the `RESOURCES` map in `src/pages/glossary/[term].astro` (drop the entries keyed by the merged slugs; repoint the two `/blog/choose-health-growth-agency/` links, which surface on quiz-funnel and landing-page-conversion-rate)
- Blog posts: `ai-search-visibility-health-brands`, `best-glp1-marketing-agencies-2026` and `best-telehealth-marketing-agencies-2026` (O21 repoints these), `health-ad-creative-rejected-fix`, `meta-ad-account-banned-health-brand` (O6 repoints it), `scale-health-brand-50k-500k`, `telehealth-attribution-server-side-tracking`, `medical-device-marketing` (on hold: a link-only repoint, nothing else), and the queued `healthcare-ad-creative-strategy`
- Pages: `src/pages/services/index.astro`, `src/pages/services/[slug].astro` (creative), `src/pages/tools/index.astro`, `src/pages/tools/ltv-cac-calculator.astro`
- `llms.txt` and `llms-full.txt` follow automatically once the records are gone

Re-run `pnpm build` and read the `[site-guards]` warnings for the current list.
After a merge, give each target page and its hub a new `updated` date in
`src/data/pages.json` (the content changed).

## 3. Final step: make the field required

When `SEO_STRICT=1 pnpm build` passes (sections 1 and 2 empty):

1. In `src/lib/seo.ts` set `SEO_STRICT_DEFAULT = true`, so every build fails on a
   missing or out-of-range description, an over-long title, a link to a
   redirected URL, a page shadowed by a redirect, or a sitemap URL with no date.
2. Make `metaDescription` non-optional (`metaDescription: string;`) in
   `AdPolicy` (`src/data/adPolicies.ts`), `Vertical` (`src/data/verticals.ts`),
   `Term` (`src/data/glossary.ts`) and `Compare` (`src/data/compare.ts`).
3. Run `pnpm build` and `PREVIEW_ALL=1 pnpm build`, then delete this file.
