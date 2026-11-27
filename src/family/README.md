# The family layer (Health)

Health's long-form interior layout, ported from www.adboost.media (adboost-media
`src/layouts/ContentPage.astro`, `src/styles/content.css`, `src/lib/slots.ts`, the `.pg-*` rules of
`src/styles/app.css`, Backdrop and Stage from `src/styles/blocks.css`, `src/components/site/{Toc,LinkCard,InlineCta}`,
`src/components/graphics/content/*`). Same layout, components and drawing style, in Health's blue,
indigo and cyan. Reference pages: `/services/` and `/services/{paid-media,creative,cro}/`.

## Files

| File | What it is |
|---|---|
| `FamilyPage.astro` | the page layout (hero, rail, chapters, FAQ, sources, related, closing card) |
| `chapterize.ts` | regroups the body into numbered chapters (port of Media's `chapterize`), plus `headingsOf` |
| `Toc.astro` | "On this page": sticky rail with a progress line from 1180px, a collapsed box below |
| `LinkCard.astro` | a link as a small card with an icon tile (kind read from the path) |
| `InlineCta.astro` | the dark closing card with the booking-calendar drawing |
| `Backdrop.astro` | hero background: dots, line grid, aura in the three hues, grain, pointer spotlight |
| `dates.ts` | `updatedLabel(path)`: "October 2026" from `src/data/pages.json`, as every template prints it |
| `graphics/` | product-UI primitives: `Win`, `Row`, `Chip`, `Pill`, `Fig`, `Ic` + `icons.ts` |
| `graphics/services/` | the services pages' graphics (examples of the primitives in use) |
| `../styles/family/tokens.css` | Media's token names mapped to Health's values, on `.family` only |
| `../styles/family/content.css` | every family class, all scoped under `.family` |

### Area folders

Each area of the site keeps its own components in a folder here and its styles in `src/styles/family/`:

| Folder | Pages | Stylesheets (`src/styles/family/`) |
|---|---|---|
| `industry/` | `/industries/` and the vertical pages | `industry.css` |
| `adrules/` | `/advertising/` (hub, rule sheets, platform hubs: `PlatformHubPage.astro`) and `/compare/` | `adrules.css` |
| `blog/` | `/blog/` and the posts (`BlogLayout`) | `blog-cards.css`, `blog-index.css`, `blog-post.css` |
| `resources/` | the glossary terms and the calculators in `/tools/` | `resources.css`, `glossary.css`, `tools.css`, `grain.css` |
| `landing/` | home, about, FAQ, book, newsletter, legal pages, 404, Zero-Ban Protocol | `landing.css`, `landing-pages.css` |

Nothing here touches a page that does not use it: the CSS is imported by FamilyPage (and the
primitives), and every rule is scoped under `.family`. A page that is not a FamilyPage but wants the
classes or primitives (an industry or tool template) imports both CSS files and puts
`class="family"` on its root. Do not name anything `.fam`: that is the family bar.

## Putting a page on it

```astro
---
import FamilyPage from '../../family/FamilyPage.astro';
import { updatedLabel } from '../../family/dates';
// build title, description and jsonLd exactly as the page does today
const updated = updatedLabel(path);
---
<FamilyPage
  path={path}                       {/* canonical path, authored form */}
  schema={jsonLd}                   {/* the page's JSON-LD, unchanged: FamilyPage adds none */}
  crumbs={[{ label: 'Home', href: '/' }, { label: 'Glossary', href: '/glossary/' }, { label: t.term }]}
  eyebrow="GLOSSARY"                {/* printed as given, keep the page's casing */}
  data={{
    seoTitle: title, metaDescription: description,   // + ogImage, ogType, noindex if the page set them
    h1: t.term,                     // plain: the last words get the serif accent
    // h1Html: 'CAC <span class="serif">calculator</span>',  // or mark it yourself
    summary: t.answerHtml, summaryLabel: 'The short answer',  // the answer box, under the H1
    lede: t.lede,                   // optional paragraph under the answer box
    keyFacts: [{ label: 'Formula', value: '...' }],   // optional spec card
    faqs: t.faq,                    // must match the FAQPage JSON-LD word for word
    sources: [{ title, url, note }],
    related: [{ heading: 'Related terms', links: [{ href, label, note }] }],
    // ctaHeading / ctaText / ctaPerks: default to CtaBand's copy
  }}
  byline={[{ text: 'AdBoost Health', icon: 'org' }, ...(updated ? [{ text: `Updated ${updated}`, icon: 'date' }] : [])]}
  toc={[...]}                       {/* optional: labels that differ from the H2s; false for none */}
  faqHeading="FAQ"                  {/* default "Frequently asked questions"; faqId default "faq" */}
  figureAt={{ id: 'how-it-works', skip: 1 }}
>
  <MyHeroGraphic slot="hero" />     {/* right of the title from 1080px, under it below */}
  <MyFigure slot="figure" />        {/* placed after heading #how-it-works and 1 prose block */}
  <div slot="aside" class="pg-card">...</div>   {/* the rail, from 1180px; after the text on phones */}

  <div class="pg-prose" set:html={bodyHtml} />  {/* prose: H2s open numbered chapters */}
  <div class="cp-cards" data-n="3">...</div>    {/* any designed block between prose runs */}
</FamilyPage>
```

Rules that keep SEO parity (`seo-parity.mjs compare` must stay strict "none", lost text 0):

- Pass the head and JSON-LD the page passed to `BaseLayout` before, untouched.
- Keep every heading's text, level and order. An old sidebar heading (`h4`) that moves to the end
  of the page stays an `h4`: use `related: [{ heading, level: 4, links }]`.
- Keep every string. `summary`, `lede`, `faqs[].a` and `keyFacts[].value` are HTML: escape plain
  text (`&`, `<`, `>`) before passing it. Text that was in a control ("Book a call →") keeps its
  characters (`Book a call <span aria-hidden="true">→</span>`).
- Every family page ends with the closing card, which carries CtaBand's copy by default and the
  `.cta-band` class (t.js labels its click "cta-band"; the phone CTA hides while it is on screen).
  Drop the page's `<CtaBand />`; pass `ctaHeading`/`ctaText` if the page customised it.
- DOM order: hero, "On this page", body, FAQ, sources, related, aside, closing card. The aside comes
  after the text in the HTML (where the old sidebar was) and is drawn in the rail on wide screens.

## What chapterize does

The default slot is rendered to HTML, then regrouped without changing a word:

- an `<h2>` inside a `.pg-prose` div opens a numbered chapter (`<section class="cp-ch">`, the number
  is a CSS counter, never text); a `<p class="cp-kicker">` right above it joins the chapter head;
- a top-level `<div>`/`<section>` that contains its own `<h2 id>` becomes a chapter of its own;
- anything before the first H2 is an unnumbered intro;
- prose tables (bare or in Health's `.tablewrap`) become card tables with `data-label` cells (they
  stack as cards on phones); an "Illustrative example" passage becomes a callout; an "A good fit:"
  list followed by a "Not a fit:" list becomes two fit cards;
- the `figure` slot goes after the heading `figureAt.id` and `figureAt.skip` prose blocks (default 1).
  Only prose blocks are counted: a designed block right after the heading ends the count.

The "On this page" list defaults to every `<h2 id>` in the body plus the FAQ, and shows from 3 entries.

## Graphics

Draw in product-UI style from the primitives, in an Astro component per graphic with its own scoped
`<style>`. Every label restates the page's own words; numbers only from the page (bars are shapes).

- Hero graphic: decorative, `aria-hidden="true"` on its root. `Win` (window: dots, mono name, pill),
  `Row` inside `<ul class="ui-rows">` (toggle, icon tile, name + sub-label, meter), `Chip` (floating
  glass chip; position with `style`, hidden below 1080px), `Pill` (tones `''|b|c|n|ok|warn|bad`),
  `Ic` (icons.ts). Bars with `.ui-fill` fill in on arrival. See `graphics/services/PaidMediaHero.astro`.
- In-body figure: `<Fig caption="...">` (framed dotted panel + caption, `.reveal`); labels stay readable
  text, never `aria-hidden`. See `graphics/services/CacModel.astro`, `HookRate.astro`, `QuizFlow.astro`.
- Scoped-style gotcha: an element rendered by a primitive (the `<figure>` of `Fig`, the `.ui` of `Win`,
  a `Row`) does not carry your component's scope: select it with `:global(...)`.
- Motion: hidden states only under `.js.motion` (`:global(.js.motion) ...` in scoped styles);
  animate transform/translate/scale/opacity. Reduced motion stops everything (kit rule).

## Classes (content.css, all under `.family`)

| Area | Classes |
|---|---|
| hero | `cp-hero`, `cp-head`, `kicker`, `pg-answer` (`pg-answer-lab`), `cp-lede`, `pg-byline`, `cp-art`, `stage` (`stage-plate`, `stage-ring`), `bd*` |
| key facts | `cp-facts`, `cp-facts-wide`, `cp-facts-bar`, `cp-fact`, `cp-bar` (window bar without label), `cp-bar-ghost`, `cp-dots` |
| layout | `cp-grid`, `cp-toc-cell`, `cp-main`, `cp-aside`, `cp-cta`, `toc`, `read-bar`, `pg-card` (`is-night`), `pg-card-lab`, `pg-checks`, `pg-chips` |
| chapters | `cp-ch`, `cp-intro`, `cp-ch-head`, `cp-kicker`, `pg-prose` (bullets as gradient dots, `ol` as a numbered step track) |
| tables, callouts | `cp-table`, `cp-callout`, `cp-fit` / `cp-fit-col is-yes|is-no`, `cp-fig` |
| blocks | `cp-spec` + `cp-spec-list` (fact grid with icon tiles), `cp-tile`, `cp-steps` / `cp-step` / `cp-step-node` / `cp-step-card` / `cp-when` (step track), `cp-receipt` + `cp-receipt-rows` / `cp-tick` / `cp-receipt-foot` / `cp-pills` / `cp-k`, `cp-ledger`, `cp-stat` (`cp-stat-value`, `cp-stat-text`, `cp-stat-src`), `cp-night`, `cp-cards` (`data-n="3"`) + `cp-card`, `cp-rows` + `cp-row` (`cp-row-ic`, `cp-row-body`, `cp-row-go`), `cp-band` |
| end | `cp-faq`, `pg-qa`, `cp-sources`, `cp-related` (`ul[data-n="3"]`) |
| graphics | `ui`, `ui-bar`, `ui-name`, `ui-pill`, `ui-lab`, `ui-sk`, `ui-tog`, `ui-ic`, `ui-rows`, `ui-row`, `ui-meter`, `ui-fill`, `ui-rise`, `ui-chip`, `gi` |
| motion | `reveal` (+ `d1`..`d4`), `arrive` (first screen only): the kit's, see `src/kit/KIT.md` |

Tokens available inside `.family` (tokens.css): `--text --text-2 --mute --bg --bg-2 --bg-3 --line
--line-2 --line-3 --shadow-stack --pill --nav-h --top --on-dark --on-dark-2 --coral --cp-vivid
--on-grad --fw-display`, plus the section tokens from globals.css (`--hue-a/-b/-c`, `--deep-*`,
`--grad-brand`, `--grad-text`, `--brand*`).
