# Kit contract (src/kit)

The shared design kit for AdBoost Health, built so AdBoost Media and AgenticBoost can adopt it later.
Kit CSS and components read **only** `--k-*` and the tone tokens `--t-*`. Never a site's legacy
names (`--blue`, `--mute`, ...). Brand values live in each site's `src/styles/site-tokens.css`.

Hard rules that bind every user of the kit (full list in `redesign/v2/HEALTH-BRIEF.md` section 1):
no em-dash anywhere (CSS comments included), no invented numbers, content visible without JS,
reduced motion is a complete static design, LCP paints on the first frame, t.js attribution unchanged.

## Files

```
css/        tokens.css chrome.css layers.css cards.css motion.css index.css (imports in that order)
scripts/    env scroll reveal count words pointer dots toc menu media lit app
components/ KitHead Band SectionHead Pic Video Count
diagram/    diagram kit (A2): Figure, Diagram and one component per kind
content/    markers.ts (A2)
```

The Shell (`src/layouts/Shell.astro`) imports `kit/css/index.css`, then `site-tokens.css`, then the
legacy `global.css` and `interior.css`, and renders `KitHead` in `<head>`. At the end of `<body>` it
inlines `reveal.ts` (compiled with esbuild at build time, about 1KB, so arrivals never wait on the
network), then loads `app.ts` as a module: scroll, count, menu, pointer and toc, plus dots, words,
media and lit as separate chunks only when the page has matching elements. Keep `reveal.ts`
self-contained (no imports).
Pages never import the Shell directly; they use a layout (BaseLayout, BlogLayout, LegalLayout,
LeadLayout), except `/` and `/404`.

## Tokens

### Site tokens (brand, per site: `src/styles/site-tokens.css`)

| Token | Health | Role |
|---|---|---|
| `--k-accent` | #0057ff | fill |
| `--k-accent-strong` | #0048d9 | fill on hover |
| `--k-accent-on` | #fff | text on the fill |
| `--k-accent-ink` | #0057ff | accent text on paper |
| `--k-accent-bright` | #9bbcff | accent text on night |
| `--k-accent-soft` | #e7efff | tinted backgrounds |
| `--k-accent-line` | rgba(0,87,255,.28) | accent hairlines, rings |
| `--k-accent-glow` | rgba(0,87,255,.22) | glows |
| `--k-paper`, `-2`, `-3` | #fff, #f6f7f9, #eceef3 | surfaces |
| `--k-ink`, `-2` | #0a0a0f, #1a1b22 | headings, body |
| `--k-ink-3` | #6b6f7a | muted text (AA on paper and paper-2) |
| `--k-ink-4` | #9aa0ac | **decorative only, never text** |
| `--k-line`, `-2`, `-3` | #e5e7ee, #d8dce4, #c8cdd8 | hairlines |
| `--k-night`, `-2` | #0a0a0f, #0f0f17 | night bands and slabs |
| `--k-on-night`, `-2` | #fff, rgba(255,255,255,.66) | text on night |
| `--k-shadow-rgb` | 10 10 15 | shadow colour channels |
| `--k-fw-display` | 600 | display weight |
| `--k-container` | 1240px (1440px from 2000px) | content width |
| `--k-ok`, `-ink`, `-soft`, `-bright` | #16a34a, #0a7a37, #e6f6ec, #7ee2a8 | status ok |
| `--k-warn`, `-ink`, `-soft`, `-bright` | #f5a623, #a15c00, #fdf6e7, #f5c26b | status warn |
| `--k-bad`, `-ink`, `-soft`, `-bright` | #dc2626, #b42318, #fdecea, #ff8a6b | status bad |

Use `-ink` for status text on paper, `-bright` for status text on night, the plain token for fills,
dots and bars, `-soft` for tinted backgrounds.

### Kit tokens (`css/tokens.css`, brand-agnostic)

- **Elevation:** `--k-e1` (rest), `--k-e2` (raised), `--k-e3` (lifted, hover), `--k-e4` (e3 + 1px ring: floating widgets, calculators, menus), `--k-edge-light` (inset top highlight on paper), `--k-edge-night` (on night), `--k-glow` (accent glow).
- **Radii:** `--k-r-xs` 6, `--k-r-sm` 10, `--k-r-md` 14, `--k-r-lg` 22, `--k-r-xl` 30, `--k-r-pill` 999.
- **Spacing:** `--k-sp-1..10` = 4 8 12 16 24 32 48 64 96 128. `--k-section` (band padding, clamp 64-112), `--k-section-sm` (44-72), `--k-gutter` (24, 16 below 760), `--k-measure` 68ch, `--k-nav-h` (68, 60 below 760).
- **Type:** `--k-font-sans|serif|mono`; `--k-fs-display|h1|h2|h3|lede|body|ui|small|micro`; `--k-lh-tight|snug|body`; `--k-ls-display` (-.04em), `--k-ls-mono` (.16em). **Geist Mono ships 400-500 only: never set a mono weight above 500.**
- **Durations:** `--k-d-instant` 90, `-fast` 160, `-base` 240, `-slow` 420, `-reveal` 600, `-draw` 1100, `-count` 1300, `-vt` 240 (ms); `--k-stagger` 60ms.
- **Easings:** `--k-ease`, `--k-ease-out`, `--k-ease-in`.
- **Springs:** `--k-spring-soft|snap|settle|bounce|air`, each with its duration `--k-t-soft|snap|settle|bounce|air`. Always use the pair (the spring is baked into a `linear()` curve for that duration). soft: entrances; snap: disclosure, hover shifts; settle: opacity, never overshoots; bounce: tiny travel only; air: big headlines.
- **Z-index:** `--k-z-below` -1, `-raised` 1, `-sticky` 30, `-mcta` 40, `-scrim` 45, `-nav` 50, `-sheet` 55, `-panel` 60, `-popup` 90, `-skip` 200.

### Tone tokens

Set on `:root` (paper) and by `.k-tone-paper|tint|night` or `[data-tone="paper|tint|night"]` on any
element. Components read these, so the same card or diagram works in any band.

| Token | Meaning |
|---|---|
| `--t-bg` | band background |
| `--t-fg` | headings, strong text |
| `--t-fg-2` | body copy |
| `--t-fg-3` | muted copy and captions (AA on its own background) |
| `--t-line`, `--t-line-2` | hairlines, stronger hairlines |
| `--t-accent` | accent text (accent-ink on paper, accent-bright on night) |
| `--t-card`, `--t-card-line` | card surface and border in this tone |
| `--t-btn-bg`, `--t-btn-fg` | primary button |
| `--t-glow` | cursor light colour |
| `--t-dot`, `--t-grid` | dot lattice and blueprint grid line colours |
| `--t-wd-lo` | dim-word opacity for `[data-words]` (keeps dim words AA) |

`[data-tone]` only sets variables. `.k-band`, `.k-slab`, `.k-card--night`, `.cta-band` and the footer paint.

Contrast pairs checked in QA (4.5:1 or better): ink-3 on paper and paper-2, accent-ink on paper and paper-2, accent-on on accent, on-night-2 on night.

## Motion gates (KitHead)

KitHead runs inline in `<head>` before first paint and sets on `<html>`:

| Class | When | Meaning |
|---|---|---|
| `js` | always | JS is running |
| `motion` | unless `prefers-reduced-motion: reduce` | **every hidden or pre-animation state is gated on `html.js.motion`** |
| `lowpower` | `hardwareConcurrency <= 4`, `deviceMemory <= 4` or Save-Data | solid nav and glass, no grain, no dot spotlight, no words, no aura drift, poster-only video, no pointer effects. Plain reveals stay. |
| `pre` | while prerendering | `.arrive` waits for `prerenderingchange` |

Failsafe: if `window.__kitReady` (set by `reveal.ts`) is missing 3s after DOMContentLoaded, `motion` is
removed and everything shows. KitHead also injects speculation rules on touch devices that
**prefetch** (never prerender) same-site links, excluding `/`, `[download]` and `[target]`. On mouse
devices Astro's hover prefetch does it (`prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`).
No `<ClientRouter/>`: t.js counts one pageview per real page load.

## Data attributes and classes

### Entrances

| Hook | Behaviour |
|---|---|
| `[data-reveal]` | fades in and rises 24px (settle + soft springs) when it nears the screen. `="left"` / `="right"` come in from the side. `--i` (index) staggers by `--k-stagger`; `--d` adds a delay. Keyboard focus inside reveals it at once. **Never in the first viewport.** |
| `.reveal` (+ `.d1`-`.d4`) | legacy markup mapped onto `[data-reveal]` (`.d1..d4` = 80-320ms). Hidden only under `html.js.motion`. |
| `.arrive` | first-screen entrance: transform only (translate 28px on the air spring), never opacity, so the H1, lede and hero visual paint on the first frame. `--d` delays. No observer. |
| `[data-draw]` | gets `.in` when a quarter is on screen, but is never hidden itself: use it to draw lines without fading the container. |

### Draw-on (inside a `[data-reveal]` or `[data-draw]` ancestor)

| Hook | Behaviour |
|---|---|
| `.k-draw` on an SVG path, line, polyline or circle with `pathLength="1"` | stroke draws 0 to 1 over `--k-d-draw` when the ancestor gets `.in`. `--di` (index) and `--dd` (delay) offset it. |
| `.k-draw-x` / `.k-draw-y` | HTML connectors grow with `scale` from their transform-origin (left / top by default). |
| `.k-pop` | small marks (dots, labels) pop in after the line, on the bounce spring. |
| `.drawline` | legacy paths: `reveal.ts` adds `pathLength="1"`; they draw like `.k-draw`. A `.demo` container gets `.drawn` (its `.fill` washes in). |

The default CSS state (no JS, reduced motion, failsafe) is fully drawn.

### Scroll-driven (where `animation-timeline: view()` is supported)

| Hook | Behaviour |
|---|---|
| `.k-scrub-x`, `.k-scrub-y` | fill (scale) with the element's own passage through the screen (entry 10% to cover 50%). |
| `.k-scrub-scope` + `.k-spine` | the spine fills with the scope's passage (contain 0% to 100%): TOC progress, step spines. |
| `.k-progress` | fills with the page scroll (reading progress). Hidden where unsupported. |
| `.k-bg--aura` | drifts +-40px with scroll (not on lowpower). |
| `[data-lit]` | brightest at the middle of the screen (JS fallback in `lit.ts`). |

Without support, `.k-scrub-*` draw once on arrival (needs a `[data-reveal]`/`[data-draw]` ancestor) and
are complete without JS. **Hosts of scroll-driven effects use `overflow: clip`, never `hidden`**
(hidden makes the host the scroll container and kills `view()`). Build CSS is minified with esbuild
(`vite.build.cssMinify: 'esbuild'`) because Lightning CSS drops `animation-timeline`.

### Numbers and words

| Hook | Behaviour |
|---|---|
| `[data-count]` (or `<Count value="71+"/>`) | the server prints the final value. Only elements first seen **below** the fold count up from 0, to the number already printed (prefix, suffix, decimals and separators kept; only the first number moves, inner markup survives). Width is locked first (tabular nums, `--w` in ch, then the measured width). `data-count-delay="<ms>"` holds it at 0 that long before counting. Never pass a number the copy does not state. Numbers in the first viewport stay static (no flash from final to 0). |
| `[data-words]` | at most one per page, 80 words max: each word brightens in reading order as the page scrolls. Text nodes are split, so `.serif` spans and links survive. Skipped on lowpower and reduced motion. Dim words use `--t-wd-lo` (AA). |

### Pointer (fine pointer, motion on, not lowpower)

| Hook | Behaviour |
|---|---|
| `[data-magnetic]` | leans up to 8px toward the cursor via the CSS `translate` property; floats back on the soft spring. Use on the hero CTA, CTA band and nav Book only. |
| `.k-card--link`, `[data-k-light]` | a soft light follows the cursor (`--lx/--ly`, `.k-lit`) on `::after`. **Hosts keep `::after` free.** |
| `[data-dots]` + a `.k-bg--dots` child | a disc of brighter dots follows the cursor (Band `dots` builds it). |

### Chrome and other hooks

| Hook | Behaviour |
|---|---|
| `[data-toc]` (and legacy `.aside-toc`) | links to `#ids` get `.active` + `aria-current="location"` as sections pass under the nav. |
| `[data-menu]` group with `button[aria-controls]` | desktop disclosure menu (menu.ts). |
| `#mnav` + `[aria-controls="mnav"]` + `[data-scrim]` | phone sheet: clip-path reveal, scrim, inert when closed, scroll lock, focus first item, Esc returns focus. |
| `[data-mcta-anchor]` | the sticky phone CTA shows once this has scrolled off (default: the hero `.ctas`, else the H1). |
| `.cta-band`, `#cta`, `.cta-banner`, `[data-mcta-hide]` | the phone CTA steps aside while any is on screen. |
| `video[data-src]` (use `<Video>`) | decorative loop: poster first, loads near the screen, plays only while visible. Reduced motion and lowpower: poster only, no request. |

## Layers (`css/layers.css`)

- `.k-band` + `data-tone="paper|tint|night"`: `position: relative; isolation: isolate; overflow: clip`, padding `--k-section` (`.k-band--sm`, `.k-band--flush`). Tint bands fade in/out over 48px.
- `.k-slab` (`data-tone="night"`): an inset, rounded night panel on paper (margin-inline `clamp(8px,1.5vw,20px)`, `--k-r-xl`). Roughly one night slab per three screens; never more than two same-tone bands in a row.
- Layers (children, `aria-hidden`, z-index -1): `.k-bg.k-bg--grid` (56px blueprint grid, mask via `--k-grid-mask`), `--dots` (lattice; spotlight with `.k-dots-clip > .k-dots-spot`), `--aura` (accent bloom, stronger on night), `--mesh` (two quiet blooms), `--noise` (grain, night only, data-URI SVG).
- `.k-glass`: blur(14px) saturate(1.6), white .72, white .5 hairline, edge light, painted on `::before` (never on the host). Solid where unsupported and on lowpower. At most 3 per viewport.
- `.k-plate`: decorative art plate, masked, 20-40% opacity (`--k-plate-o`), never the LCP element; `.k-plate--fallback` is the gradient stand-in.
- `.k-container`: `min(--k-container, 100% - 2 * --k-gutter)`. The legacy `.container` is the same.

## Cards (`css/cards.css`)

`.k-card` + modifiers: `--flat` (line only), `--raised`, `--float` (hero widgets, calculators, menus), `--glass`,
`--night`, `--accent` (answer box), `--well` (callouts, TOC), `--warn`, `--link` (whole-card link: lift 3px,
e3, line-2, cursor light, focus ring), `--lit` (current / selected). Parts: `.k-card__media` (aspect box,
`--k-ar`, default 16/9), `.k-card__body`, `.k-card__foot`. Stats: `.k-stat` with `__value`, `__label`,
`__source`. Chips: `.k-chip`. Hover lift uses `translate`, so it composes with any entrance.

Legacy cards (`.lcard .gcard .bcard .ccard .tcard .post-card .related-card .latest-card .bio .stat .kpi
.aside-card .calc .hero-panel .step .pb`) share one recipe in `global.css` (surface, line, radius,
e1 + edge, one hover). Their own rules keep layout only.

## Components

| Component | Props | Notes |
|---|---|---|
| `KitHead` | none | the pre-paint gate above. Inline; first thing after the viewport meta. |
| `Band` | `tone?: 'paper'\|'tint'\|'night'`, `layers?: ('grid'\|'dots'\|'aura'\|'mesh'\|'noise')[]`, `slab?`, `size?: 'md'\|'sm'\|'flush'`, `container?` (default true), `dots?` (spotlight), `as?`, `id?`, `class?`, `label?`, `data-*` | `<section class="k-band" data-tone>`; `slab` + night renders paper around a `.k-slab`. noise is dropped on non-night bands. |
| `SectionHead` | `eyebrow?`, `title` (HTML), `lede?` (HTML), `align?: 'center'\|'start'`, `level?: 2\|3`, `id?`, `reveal?` (default true), `class?`; slot `actions` | eyebrow + h2/h3 + lede, tone-aware. |
| `Pic` | `src: ImageMetadata`, `portrait?`, `alt`, `sizes`, `widths?`, `portraitWidths?`, `eager?`, `class?`, `quality?` | AVIF/WebP/JPEG srcsets via `astro:assets` (sharp 0.34.5, a devDependency). Only for images imported from `src/`. |
| `Video` | `src` (mp4), `webm?`, `poster`, `width`, `height`, `class?` | always `aria-hidden`, muted, looped; self-hosted only (CSP). |
| `Count` | `value` (exact printed text), `class?` | `<span data-count>`; see Numbers. |

### Site components (`src/components`, Health)

| Component | Props | Notes |
|---|---|---|
| `layouts/Shell` | SiteHead props + `chrome?: 'full'\|'lead'`, `navTransparentTop?`, `preloadSerif?`, `popup?: boolean\|'none'`, `leadTag?`, `bodyClass?`, `mainClass?`; slots: default, `head`, `scripts` | head, skip link, nav, `<main id="main">`, phone CTA, footer, kit script, popup or visit mark (never on `/book/`, `/zero-ban-protocol/checklist/`, `/newsletter/`). |
| `site/SiteHead` | `title`, `description?`, `canonicalPath?` or `canonical?` (absolute), `robots?`, `ogType?`, `ogTitle?`, `ogDescription?`, `ogImage?`, `ogImageAlt?`, `twitterTitle?`, `twitterDescription?`, `article?`, `jsonLd?`, `bingVerify?`, `social?` | og:image defaults to `ogImageFor(path)` (`src/lib/og.ts`): `/og/<first-segment>/<rest-or-index>.jpg` when it exists in `public/`, else `/og/og-home.png`. Always JPEG/PNG. |
| `site/Nav`, `site/Footer`, `site/MobileCta` | `Nav`: `transparentTop?` | see Tracker contract. |
| `PageHero` | `crumbs?`, `eyebrow?`, `title` (HTML), `lede?` (HTML), `answer?` (HTML), `meta?: string[]`, `wide?`, `art?` (public path without extension), `layers?: ('dots'\|'mesh')[]`, `id?`, `class?`; slots: default (under the lede), `aside` | renders `.phero` (and `.phero-grid` with an aside: right column from 1024px). H1, lede, aside use `.arrive`. Art plate: `public/art/...{avif,webp}` if present, else a gradient; hidden below 1024px, lazy, alt="". |
| `Faq` | `items: {q, a}[]`, `idPrefix?` | native `<details class="qa">` in `.faq-list.k-disclosure`; works without JS; eases open where `::details-content` is supported. Keep the page's FAQPage JSON-LD word for word in sync. |
| `CtaBand` | `heading?` (HTML), `text?` | night slab with grid, aura, grain; `.cta-band` + `data-magnetic` button. |
| `Breadcrumbs` | `items: {label, href?}[]` | `<nav class="crumbs"><ol>`; last item `aria-current="page"`. |

## Diagrams (`diagram/`)

Props for every kind are in `diagram/types.ts`; `src/pages/free/kit/_fixtures.ts` has a worked
example of each, built from the Health data files.

- **Import one component** (`kit/diagram/HeatMatrix.astro`), never `Diagram.astro` in a template:
  the dispatcher imports every kind, so the page would ship every diagram's CSS. `Diagram.astro`
  is for data-driven specs (blog frontmatter).
- **Each figure is its own text alternative:** `<figure class="k-dg k-dg--{kind}">` with a visible
  `<figcaption>`; nodes are real `ol`/`ul`/`table`/`p`, only wires, glows and marks are
  `aria-hidden`. An optional `title` renders h3 (or h4 with `headingLevel: 4`), never h1/h2.
- **Class prefix:** every class inside a diagram starts with `dg-` (`k-dg` on the figure), so page
  CSS never collides with it. Page and prose rules must not style inside `.k-dg`: interior.css
  scopes its `.prose` element rules with `:where(:not(.k-dg *))`.
- **Width:** a diagram sizes from its container (`container: k-dg / inline-size`; layouts switch at
  container widths), so give each figure a definite-width parent (a grid column with
  `minmax(0, 1fr)`, a card), never a shrink-to-fit flex item.
- **Motion (`data-dg-anim` on the figure):**
  - `reveal` (default): the figure is `[data-reveal]`; it fades and rises in, and its parts draw
    when it gets `.in`.
  - `arrive` (`arrive` prop, first viewport and hero asides): the figure is `[data-draw]` instead,
    so it is never hidden; only its parts draw (transform only) once it gets `.in`.
  - none (`animate={false}`): static.
  Parts wait at their keyframe start (paused) until `.in`. Without `html.js.motion` every diagram
  is fully drawn.
- **Live values:** calculators move a Gauge (`live="id"`) or a Bars marker (`marker.live`) with
  `setLive(id, value, display)` from `kit/diagram/live.ts`: it sets `--k-v`, the visible
  `[data-live-text]` readout and, on a meter, `aria-valuenow` / `aria-valuetext`. Feed it only the
  visitor's inputs run through the formula printed on the page.
- **`.is-lit`:** add it to a Timeline row (`rowIdPrefix` gives rows ids `${prefix}-${i}`) to light
  it from outside, e.g. while the matching process card is hovered.
- **Count-ups:** an Equation's worked result carries `data-count` + `data-count-delay`, so it
  counts after its terms land (see Numbers).
- **Links** are internal only (build error otherwise); links to unbuilt pages are unwrapped by
  `releaseGates`.
- **Fixtures:** `/free/kit/diagrams/` and `/free/kit/diagrams-night/` show every kind for visual
  QA. They build only with `PREVIEW_ALL=1` (or in dev) and never ship.

## Tracker contract (t.js, never change)

`adboost-admin` t.js labels `/book/` clicks by ancestry, in order: `closest('nav')` = header,
`.mobile-cta` = mobile, `.cta-band` = cta-band, `footer` = footer, else inline.

- The Book button stays inside `<nav class="nav k-nav">`. The phone sheet `#mnav` is a sibling of the
  nav and has no Book link. Breadcrumb and TOC `<nav>`s never carry a `/book/` link.
- Keep the `.mobile-cta` and `.cta-band` class names and the `<footer>` element.
- One pageview per real load: no `<ClientRouter/>`, prefetch only, never prerender.

## Page transitions

`chrome.css` opts in to cross-document view transitions under `prefers-reduced-motion: no-preference`:
the old page fades out (160ms), the new one fades in with an 8px rise (240ms). The nav (`k-nav`) and
phone CTA (`k-mcta`) are named, so they hold still. No H1 morph. A `view-transition-name` must be
unique on a page (a duplicate aborts the whole transition): name per-item elements per page only,
e.g. `post-<slug>`.

## Markdown

Blog markdown tables are wrapped at build time (`rehypeTableWrap` in `astro.config.mjs`):
`<div class="tablewrap"><table class="dtable">`. A `<!-- diagram: id -->` marker placed before a table
sits before its `.tablewrap`.

## For template agents

- Write page CSS in `src/styles/pages/<name>.css`, on `--k-*` / `--t-*`. If you need a kit change, report it.
- First viewport: `.arrive` only, never `[data-reveal]`. Reserve aspect ratios; counts reserve their width.
- The legacy inline styles are now redundant and can be deleted with the markup you touch:
  `style="display:block;margin-top:16px"` on `.phero .sec-eyebrow`, `style="color:#fff"` on
  `.aside-card.dark h4`, `style="color:var(--blue)"` on body links in `.doc-main`.
- `.callout.ok` exists for the green "how to comply" callout.
- `--mute-2` now resolves to `--k-ink-3` (it was used for dates, which must pass AA).
