# Writing guide: adboost.health SEO plan (Nov 2026 to Jan 2027)

Branch: `seo/optimizations`. Plan: `adboost/seo-research/2026-10-30/plan/FINAL-health-plan.md`
(machine-readable twin `FINAL-health-changes.json`). Policy facts: the claim matrix in
`seo-research/2026-10-30/followup-2.md` (section 4, rows 1-113 and O1-O24). Title and
snippet rules: `ctr.md`. Answer-engine rules: `aeo.md`.

This file maps every plan item to the files that implement it, says what the technical
foundation already does, and lists the owner decisions of 2026-10-30 that override the plan.
Open checklist for descriptions and merges: `docs/META-TODO.md`.

## 1. Owner decisions that override the plan (2026-10-30)

1. **Trust figures stay.** "71+ founders served", "$153M+ tracked revenue", "4.9 / 5 average
   rating", "24% lower CAC" and the related figures already on the site are owner-confirmed.
   Do not remove or soften them anywhere. **O20 and O24 are cancelled.** New pages may use these
   figures where natural. Never invent any other number; never add `aggregateRating`.
   Items this touches beyond O20 and O24:
   - O15 removes the "$153M+" line from the CAC benchmark post: **keep it.** O15 also relabels
     the CAC table "illustrative" and drops the "AdBoost Health partner accounts" provenance;
     O12 drops the same provenance from `glossary.ts`. Those ranges are figures already on the
     site, so the reading of decision 1 used here is: **keep them as written** unless the
     orchestrator says otherwise. The rest of O15 (vertical links, "Check your number" step,
     calculator and `/book/` links, the best-of link, the new description) still applies.
   - O21 and N1 say the publisher box carries "no trust figures": they may use them.
   - O20 also changes the `authorTitle` default in `src/content.config.ts` to
     "Co-Founder & CEO, AdBoost Health". That is not a trust figure, but O20 is cancelled as an
     item; change it only if the orchestrator confirms.
2. **Existing service claims stay.** Do not remove or expand them.
3. (Media only.)
4. **N1, N2 and N3 publish on their planned dates** (2026-11-24, 2026-12-08, 2027-01-12)
   through the date gates below. Policy facts must match the claim matrix.
5. **On hold, do not do:** C1 (consolidating live zero-impression posts), the
   `medical-device-marketing` 301 (keep that post as it is), O25 (peptides stance), O26 and X2
   (January 2027). Unanswered owner questions take the plan's conservative default (for
   example O23: the six queued posts get `draft: true`; decision 7: schema author is the
   Organization).

People and facts you may use: Amir Salihovic, Co-Founder & CEO
(https://www.linkedin.com/in/amir-salihovic-7b2844157/); Pira Ahilan, Co-Founder; based in
Toronto; hello@adboost.health.

House rules: no em-dashes anywhere (the build fails on one); no invented statistics, client
names, results, testimonials or ratings; every external fact links its primary source (Meta,
Google, TikTok, FDA, FTC, LegitScript, DEA).

## 2. The technical foundation (already on this branch)

### Content dates: `src/data/pages.json` (T1)

One entry per non-blog URL, keyed by path:

```json
"/advertising/glp-1-on-meta/": {"updated": "2026-07-27"},
"/advertising/meta/": {"publish": "2026-12-08"}
```

- `updated` is the last **significant** content change. It drives the sitemap `lastmod`, and
  on `/advertising/*` the visible "Updated" label and the Article `dateModified`. It was seeded
  from git (the newest commit that changed the page's own record or file, skipping the em-dash
  sweeps, the July take-down and revert pair, and sitewide nav, CTA and verification-tag
  commits).
- When you change a page's content, set its `updated` to the deploy date of the plan item
  (D1 2026-11-03, D2a 2026-11-10, D2b 2026-11-12, D3 2026-11-17, D4 2026-12-01). Follow plan
  section 2.3: Group A and B edits move the date; a title, description or link-only change
  does not; a visible "Rules checked against ... on Oct 30, 2026" line does not.
- Hubs compute their own `lastmod` (newest live child, or their own `updated` if newer);
  bump a hub's own `updated` only when its own body changes (for example O9 on `/advertising/`).
  `/` and `/blog/` follow the newest post.
- Blog posts keep using frontmatter: `updatedDate` (or `pubDate`).
- The `updated` field is gone from the `AdPolicy` records; do not re-add it.

### Release gates (T2)

- Non-blog page: add `publish` (and `draft: true` to hold it indefinitely) to its
  `pages.json` entry. Before that date the page is not built, is absent from the sitemap and
  llms files, and every `<a>` to it anywhere on the site renders as plain text. The scheduled
  rebuild (Tue and Thu 12:00 UTC) publishes it on the day.
- Blog post: a future `pubDate` gates it; `draft: true` holds it even after the date. Hero,
  og image and figures of unpublished posts are stripped from `dist/`. Links to it unwrap.
- To switch content on a release date (for example trim the `/advertising/` Meta block when
  N2 goes live, or point the Meta sheets' up-link at N2), branch on
  `isLive('/advertising/meta/')` from `src/lib/live.ts`.
- `PREVIEW_ALL=1 pnpm build` builds every gated page, draft and future post so you can review
  them. It is refused on a Vercel production build.
- The data modules export only live records: `AD_POLICIES`, `VERTICALS`, `GLOSSARY`,
  `COMPARES`, `SERVICES`, `PLATFORM_HUBS`. Use them as before.

### Build guards (T2)

`pnpm build` fails on:
- an internal link (`<a href>`, canonical, or a URL in `llms.txt` / `llms-full.txt`) to a URL
  that is neither built nor redirected;
- an em-dash (U+2014, `&mdash;`, `&#8212;`) anywhere in `dist/`.

It warns (and `SEO_STRICT=1 pnpm build` fails) on: a missing or out-of-range
`metaDescription` (140-160), a title over 60 characters, an internal link to a redirected URL,
a built page shadowed by a `vercel.json` redirect, a sitemap URL with no content date, and a
live `pages.json` entry with no built page.

Not implemented from the plan's T2 list: the trust-string guard (cancelled by decision 1); the
best-of `ItemList` guard (O21 and N1 writers check by hand that AdBoost Health is not in any
`ItemList` and that entries are alphabetical); U+2013 (the AdBoost house rule allows en-dashes
in numeric ranges such as 45-55, and the site uses them in CAC ranges).

### Titles and descriptions

- Advertising, industries, glossary and compare templates take the description only from the
  record's `metaDescription`. No `.slice()` fallback: a missing one ships no description and a
  build warning. Checklist: `docs/META-TODO.md`.
- Optional `seoTitle` on `AdPolicy` and `Vertical` overrides the template title (O2-O4, O17).
  Compare keeps `metaTitle`. Glossary titles are held.
- Both pass through `src/lib/seo.ts` (`seoTitle()`, `metaDescription()`).

### Schema helpers

- `articleNode(..., { authorIsOrg: true })` credits the Organization `@id` (plan O1, N2, N3;
  decision 7 default). The rule sheets still pass a Person: switching them is part of O1.
- `breadcrumb()`, `faqPage()`, `serviceNode()`, `definedTerm()` as before.

### Platform hubs N2 and N3

`src/data/platformHubs.ts` (type + empty list), `src/components/PlatformHub.astro` (template),
`src/pages/advertising/[hub].astro` (route). Add one record per hub; `pages.json` already holds
the publish dates. The template renders: breadcrumbs, H1, "Rules checked against <platform>'s
live policy on <checkedOn>" and "Updated <date>", the answer box, your question H2 sections,
"Which <platform> rule sheet covers your vertical?" (generated from the five live sheets),
"What changed, and when?" (your `changeLog`), FAQ, sources with the not-legal-advice line,
the Zero-Ban card (`?utm_campaign=zbp-advertising`), Article (Organization author), BreadcrumbList
and FAQPage JSON-LD. Records also feed `llms.txt` and `llms-full.txt` once live.

### IndexNow and publishing (T3)

`.github/workflows/indexnow-on-push.yml` (every content push to `main`) and
`.github/workflows/friday-publish.yml` (renamed "Scheduled publish": Tue and Thu 12:00 UTC, no
Friday run) wait for `/build.txt` to show the new build, then `scripts/indexnow.sh` submits only
sitemap URLs whose `lastmod` is today, plus redirect sources a push added or changed in
`vercel.json`. One key: `70b8bdc92dc75dde445e7495e95258f2` (the second key file is deleted).
A correct `updated` date is therefore what gets a page resubmitted.

### Redirects

`vercel.json` now holds R1 (`/guides/health-ad-compliance/` to `/advertising/`, final target)
and the five merge 301s (P1-P5). Redirects are not date-gated: merging this branch to `main`
activates all of them at once, so finish the merge content (META-TODO section 2) before the
branch ships, or ship R1 and P1-P5 in separate deploys.

## 3. The AEO/SEO page standard, mapped to this codebase

| Requirement | Where |
|---|---|
| Title from the plan, 60 characters or fewer, explicit field | `seoTitle` (`AdPolicy`, `Vertical`, `PlatformHub`), `metaTitle` (`Compare`), `seoTitle` frontmatter (posts) |
| Description 140-160 characters, explicit field, never truncated | `metaDescription` (data records), `description` frontmatter (posts) |
| One H1 | `h1` field; templates render exactly one |
| 40-60 word answer-first summary under the H1 | `answer` (advertising, compare, platform hubs); industries use `lede`; posts open with it in the body |
| H2s phrased as buyer questions | Hubs: `sections[].question`. Rule sheets and industry pages have fixed template H2s ("Certification & authorization", "Market context"): O1 and O17 change those templates; O17 adds 2-3 vertical question H2s |
| Tables and lists where they help | Trusted HTML in `sections[].html`; markdown tables in posts |
| FAQ block with FAQPage JSON-LD | `faq` arrays (`Faq.astro` + `faqPage()`); posts via `BlogLayout.astro` |
| BreadcrumbList JSON-LD | Every template already emits it |
| Schema types the plan lists | Article with Organization author (`/advertising/*`, N2, N3), BlogPosting (posts), Service (industries, services), DefinedTerm (glossary), alphabetical `ItemList` without AdBoost Health (best-of posts) |
| Internal links in and out per the plan | Data fields and template maps listed per item below; links to unreleased pages unwrap themselves |
| Visible last-updated date | `/advertising/*` and hubs read `pages.json`; posts show `updatedDate`; for other templates read `pageDate(path)` from `src/lib/live.ts` |
| Author and publisher | Posts: `author` / `authorTitle` frontmatter (Amir Salihovic). Policy pages and hubs: Organization |
| Every external fact sourced | `sources` arrays, `changeLog[].sourceUrl`, inline links |

## 4. Plan items to files

Status: **done** = in this commit; **writers** = content work still to do; **hold** /
**cancelled** = decision 1 or 5.

### Technical

| ID | Date | Status | Files |
|---|---|---|---|
| T1 truthful `lastmod` | 11-03 | done | `src/data/pages.json`, `src/lib/live.ts`, `astro.config.mjs`, `src/pages/advertising/[slug].astro`, `src/data/adPolicies.ts` |
| T2 gates, drafts, unwrapping, guards | 11-03 | done (guard scope above) | `src/lib/live.ts`, `src/lib/blog.ts`, `src/content.config.ts`, `astro.config.mjs`, the data modules, `src/pages/llms*.txt.ts`, `src/layouts/BaseLayout.astro` |
| T3 IndexNow, Tue/Thu cron, build.txt | 11-03 | done | `.github/workflows/indexnow-on-push.yml`, `.github/workflows/friday-publish.yml`, `scripts/indexnow.sh`, `scripts/wait-for-deploy.sh`, `astro.config.mjs`, `CLAUDE.md` |
| T4 llms and robots hygiene | 11-03 | done (trust figures stay, decision 1) | `src/pages/llms.txt.ts` (sheets use `metaDescription`, live-only lists, hubs), `src/pages/llms-full.txt.ts` (live-only, unwraps links in post bodies), `public/robots.txt` |
| T5 July-cohort recrawl | 11-03 to 11-17 | ops (GSC UI) | none; request each URL only after its fix is live |
| R1 `/guides/health-ad-compliance/` to `/advertising/` | 11-03 | done | `vercel.json` |
| P1-P5 merge redirects | 11-10 | done (301s only) | `vercel.json` |

### Existing pages

| ID | Date | Status | Files |
|---|---|---|---|
| O1 advertising template | 11-03 | writers (field + `.slice` removal + `seoTitle` + org-author option done) | `src/pages/advertising/[slug].astro` (`changeNotes`, `POLICY_YEAR`, metabar "Rules checked ...", CTA `inline` label, disclaimer dash, `authorIsOrg: true`, per-vertical sidebar map, platform up-links via `isLive`, Zero-Ban card), `src/data/adPolicies.ts`, `src/data/verticals.ts` (`inline` label), `src/lib/schema.ts` |
| O2 Meta sheets | 11-03 | writers | `src/data/adPolicies.ts` (5 Meta records: `seoTitle`, `metaDescription`, H1, status, rows, notes, FAQs), `src/data/pages.json` (`updated`) |
| O3 TikTok sheets | 11-03 | writers | same, 5 TikTok records |
| O4 Google sheets | 11-03 | writers | same, 5 Google records |
| O5 stale before/after copy | 11-03 | writers | `src/data/verticals.ts`, `src/data/vertical-playbooks.ts`, `src/data/services.ts` (body and FAQ text only) |
| O6 Meta-policy posts | 11-03 | writers | `src/content/blog/glp1-advertising-compliance-2026.md`, `glp1-meta-ad-policy-state-ag-2026.md`, `health-ad-creative-rejected-fix.md`, `meta-ad-account-banned-health-brand.md`, `patient-acquisition-cost.md`, `telehealth-landing-page-conversion.md` |
| O7 TikTok post table and retitle | 11-03 | writers | `src/content/blog/tiktok-ads-health-brands.md` |
| O8 Zero-Ban checklist and PDF | 11-03 | writers | `src/pages/zero-ban-protocol/checklist.astro`, `public/downloads/zero-ban-protocol.pdf` |
| O9 `/advertising/` Meta July 2026 block | 11-03 | writers | `src/pages/advertising/index.astro` (anchor `#meta-july-2026`; trim on N2 day with `isLive('/advertising/meta/')`), `src/data/pages.json` (`/advertising/` `updated`) |
| O10 industry pages link best-of posts | 11-03 | writers | `src/pages/industries/[slug].astro` (`VERTICAL_LISTICLE`; the supplements line to N1 unwraps itself until 11-24) |
| O11 compare pages | 11-10 | writers (field + `.slice` removal done) | `src/data/compare.ts`, `src/pages/compare/[slug].astro` |
| O12 glossary descriptions | 11-10 | writers (field + `.slice` removal done); provenance removal: see decision 1 | `src/data/glossary.ts`, `src/pages/glossary/[term].astro` |
| O13 LegitScript guide | 11-10 | writers | `src/content/blog/legitscript-certification-telehealth-guide.md` |
| O14 supplement playbook | 11-10 | writers | `src/content/blog/supplement-brand-lower-cac-playbook.md` |
| O15 CAC benchmark post | 11-03 | writers, partly overridden (decision 1) | `src/content/blog/telehealth-cac-benchmarks-2026.md` |
| O16 POAS tool, description dashes | 11-10 | writers | `src/pages/tools/poas-calculator.astro`, `src/pages/tools/ad-budget-calculator.astro`, `src/pages/faq.astro` |
| O17 industry template rollout | 11-12 | writers (fields + `.slice` removal done) | `src/data/verticals.ts` (`seoTitle`, `metaDescription`), `src/data/vertical-playbooks.ts`, `src/pages/industries/[slug].astro` (question H2s, `inline` label, `VERTICAL_BLOG` remap, related posts, DEA note) |
| O18 FAQ answers without JavaScript | 11-12 | writers | `src/components/Faq.astro` (`open` prop), `src/pages/faq.astro`, `src/pages/industries/[slug].astro` |
| O19 homepage latest posts | 11-12 | writers | `src/pages/index.astro` (body only; use `getPublishedPosts()`) |
| X1 `/about/` links media `/about/` | 11-12 | writers, only if `https://www.adboost.media/about/` is live | `src/pages/about/index.astro` |
| O20 blog layout figures | 11-03 | **cancelled** (decision 1) | `src/layouts/BlogLayout.astro` keeps "BY THE NUMBERS" |
| O21 best-of upgrades | 11-17 | writers | `src/content/blog/best-glp1-marketing-agencies-2026.md`, `best-telehealth-marketing-agencies-2026.md` |
| O22 services descriptions, CRO quiz section | 12-01 | writers | `src/data/services.ts`, `src/pages/services/[slug].astro` |
| O23 queued posts | 11-19 | writers (default) | `draft: true` in `multi-location-healthcare-marketing.md`, `capacity-based-healthcare-marketing.md`, `de-novo-healthcare-marketing.md`, `healthcare-service-line-marketing.md`, `healthcare-ad-creative-strategy.md`, `ai-search-healthcare-providers.md` |
| O24 trust figures | 11-03 | **cancelled** (decision 1) | none |
| C1 consolidation pass | 11-19 | **hold** (decision 5) | none; `medical-device-marketing` stays as it is |
| O25 peptides stance | | **hold** | none |
| O26 January rollover | 2027-01-05 | **hold** | none |
| X2 glossary links media calculator | 2027-01-05 | **hold** | none |

### New pages

| ID | Publish | Status | Files |
|---|---|---|---|
| N1 `/blog/best-supplement-marketing-agencies/` | 2026-11-24 (`pubDate`, no draft) | writers | `src/content/blog/best-supplement-marketing-agencies.md`, `_heroes/genheroes.mjs`, `public/blog/best-supplement-marketing-agencies.webp`, `public/blog/og/best-supplement-marketing-agencies.jpg`, links from `src/pages/industries/[slug].astro` (supplements), `src/pages/advertising/[slug].astro` (3 supplement sheets' sidebar), `supplement-brand-lower-cac-playbook.md`. Links unwrap and images are stripped until the date. B1-B8 rules, alphabetical `ItemList` without AdBoost Health, FAQPage, no `aggregateRating` |
| N2 `/advertising/meta/` | 2026-12-08 (`pages.json`) | writers (gate, route and template done) | record in `src/data/platformHubs.ts`; gated links in `src/pages/advertising/index.astro`, the 5 Meta sheets (`src/pages/advertising/[slug].astro` or `adPolicies.ts`), `glp1-advertising-compliance-2026.md`, `meta-ad-account-banned-health-brand.md`. No redirect change |
| N3 `/advertising/google/` | 2027-01-12 (`pages.json`) | writers (gate, route and template done) | record in `src/data/platformHubs.ts`; gated links in `src/pages/advertising/index.astro`, the 5 Google sheets, `google-ads-telehealth-strategy.md`. Certification steps stay on `telehealth-on-google` |

A body link from an older page to N2 or N3 can be written now, and to N1 once its post file
exists with its future `pubDate`: it renders as plain text until the page is live and as a link
from the first rebuild on or after the publish date. A link to a URL with no post file and no
`pages.json` entry fails the build.

## 5. Before you commit

1. `pnpm build`: passes, and read the `[seo]` and `[site-guards]` warnings for your pages.
2. `PREVIEW_ALL=1 pnpm build`: passes; check gated pages render (`dist/advertising/meta/`).
3. `SEO_STRICT=1 pnpm build` when your part of META-TODO is done.
4. `pages.json` `updated` set for every page whose content you changed, and only those.
5. No em-dashes; every policy fact traces to a matrix row and a primary-source link.
