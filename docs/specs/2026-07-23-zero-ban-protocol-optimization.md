# Zero-Ban Protocol Lead Magnet — Optimization

**Date:** 2026-07-23
**Owner:** Pravine
**Branch:** `optimize/zero-ban-protocol` (off `main`)
**Status:** Draft for review

## Goal

Surgically optimize the **existing** Zero-Ban Protocol lead magnet — do not rebuild.
Bring the delivered content to the quality of the Gamma reference (worked examples,
strong hook), sharpen the opt-in LP's conversion, rewrite the confirmation email to a
personal style, rename the route, add an optional phone field, and layer subtle-premium
motion. Preserve all existing attribution.

Reference the user gave: a Gamma long-form guide (worked examples + named framework +
mistakes + funnel) and a personal plain-text confirmation email ("Your 4-part hook guide
is ready" — from a named human, teaches one insight, two access links).

## What already exists (inventory — do not recreate)

| Asset | Path | State |
|---|---|---|
| Opt-in LP | `src/pages/free/zero-ban-protocol/index.astro` | 2-col: $50K/mo hook, 5-checkpoint preview, RESTRICTED→CLEARED status card, Name+Email form, success→book-a-call. On-brand, motion, reduced-motion safe |
| Delivered checklist | `src/pages/free/zero-ban-protocol/checklist.astro` | 5 checkpoints (Lane/Warm-up/Copy/Creative/Scale), "why bans happen" frame, do/don't lists, PDF download, print styles. `noindex` |
| Endpoint | `api/subscribe.js` (raw Vercel function) | Resend audience `99818d9d-b799-47ed-85f0-0e1b24f9eaa6`, confirmation email, inbox notify to `hello@adboost.health`. `RESEND_API_KEY` set in Vercel |
| PDF | `public/downloads/zero-ban-protocol.pdf` | 245 KB, delivered via email + checklist download |
| Minimal layout | `src/layouts/LeadLayout.astro` | noindex, loads tracker `admin.adboost.health/t.js` |
| Redirects | `vercel.json` | `/protocol/` and `/zero-ban-protocol/` → `/free/zero-ban-protocol/` (302) |

Attribution already works: the tracker stamps `visitor_id` onto Cal links and fires
`pageview / book_call_click / book_call_scheduled` into the admin analytics, so a call
booked from this magnet is already traceable by `visitor_id` + `path`. **No new backend
system is needed.**

## Decisions (locked)

- **Route:** promote to `/zero-ban-protocol/` as the clean primary (drop the `/free/`
  nesting). Every old path stays as a redirect.
- **Phone:** add as **optional**, with a country-code selector (US/CA/UK/AU/NZ).
- **Confirmation email sender/signer:** `Pira Ahilan <hello@adboost.health>`, personal voice.
- **Motion:** subtle-premium, `prefers-reduced-motion` safe.
- **Content posture:** surgical edits to approved originals; verify every output before review.

## Changes

### 1. Route rename → `/zero-ban-protocol/`

- Move `src/pages/free/zero-ban-protocol/` → `src/pages/zero-ban-protocol/`
  (`index.astro` + `checklist.astro`). New canonicals:
  `/zero-ban-protocol/` and `/zero-ban-protocol/checklist/`.
- `vercel.json` redirects (301 permanent for the SEO-relevant move; keep the rest):
  - `/free/zero-ban-protocol/` → `/zero-ban-protocol/`
  - `/free/zero-ban-protocol/checklist/` → `/zero-ban-protocol/checklist/`
  - `/protocol/` → `/zero-ban-protocol/` (keep)
  - existing `/zero-ban-protocol/` self-redirect removed (now a real page)
- Update internal references: `api/subscribe.js` `GUIDE_URL`, the LP form's `source`,
  the checklist `path`/canonical, PDF link, and any sitemap/llms references (LP + checklist
  are `noindex`, so confirm they're excluded from sitemap/llms — they should stay excluded).

### 2. Opt-in LP optimization (`index.astro`) — surgical

- **Animate the signature card:** RESTRICTED→CLEARED pills settle in on load (red fades,
  green resolves, connector draws) — the page's whole promise in one motion. Reduced-motion
  shows the final CLEARED state statically.
- **Count-up** the `$50K/mo` proof number on first view.
- **Scroll-reveal** the 5 checkpoint rows with a short stagger.
- **Proof/authority strip** (honest only): a single line of real substance under the form
  or hook — e.g. spend managed / accounts kept live / verticals. No fabricated ratings or
  logos. Exact numbers confirmed with Pravine before shipping; placeholder marked TODO if
  not confirmed.
- **Phone field** (optional): country-code `<select>` + `<input type="tel">`, light
  validation, sits below Email. Form posts `phone` + `country` to `/api/subscribe/`.
- **Headline hierarchy / CTA microcopy:** tighten only if it reads cleaner; keep the proven
  structure and copy voice.

### 3. Delivered checklist upgrade (`checklist.astro`) — the Gamma-quality lever

- **Stronger hook** at top (credibility + stakes), keeping the existing voice.
- **Worked teardowns** — the reference's killer move, inserted into the existing Copy (02)
  and Creative (03) checkpoints: a concrete **rejected ad → the exact line/element that
  killed it → the compliant rewrite that still converts**. 1 in Copy, 1 in Creative
  (expandable to more). Styled as red "REJECTED" → green "COMPLIANT" blocks, reusing the
  existing do/don't visual language.
- **"Top rejection triggers" recap** near the end — a scannable list mapping the mistakes
  to the checkpoints (the reference's "mistakes to avoid").
- Keep the dark CTA, disclaimer, PDF download, and print styles intact.

### 4. Confirmation email rewrite (`api/subscribe.js` → `guideEmail`)

Model on the reference: personal, plain-text feel, from a named human, teaches one insight,
two access links. Fix the current "4-part" mislabel (it's 5 checkpoints).

- **From:** `Pira Ahilan <hello@adboost.health>`; `reply_to` stays `hello@adboost.health`.
- **Subject:** "Your Zero-Ban Protocol is ready" (keep — matches the reference's "…is ready").
- **Body:**
  - "Hey {first name}," (fallback "Hey there,")
  - "Here's the Zero-Ban Protocol you asked for. → **Open the protocol**" (link to checklist)
  - "Quick thing before your next launch:" + one bolded insight pair, e.g.
    "**Most health accounts don't get banned for lying — they get banned for the format.**
    A single before/after or one 'peptide' in the caption flags an otherwise-clean ad."
  - "Inside, I break down the exact 5-checkpoint protocol we run on every peptide/GLP-1
    account before we spend a dollar — lane, warm-up, copy, creative, scale — plus the
    rejected ads and the compliant rewrites."
  - "→ **Open the Zero-Ban Protocol**" (second link)
  - "— Pira" + one-line role/sig.
- Links carry `?utm_source=lead-magnet&utm_medium=email&utm_campaign=zero-ban-protocol`.
- Inbox-notify email: add the phone/country when present.

### 5. PDF regeneration

Regenerate `public/downloads/zero-ban-protocol.pdf` from the upgraded checklist (print CSS
already exists). Render via Playwright print-to-PDF against the built page, brand-matched,
verify visually before shipping.

### 6. Attribution (mostly already done)

- Confirm the moved LP still loads the tracker (LeadLayout unchanged) and Cal CTAs on the
  LP + checklist keep `data-cal` attribution. Add `utm_campaign=zero-ban-protocol` to the
  checklist/LP Cal links so bookings are attributable to this magnet specifically.
- Optional (nice-to-have, only if low-risk): fire a `lead_magnet_submit` beacon on
  successful opt-in. Requires adding the event to the admin `/api/collect` `ALLOWED_EVENTS`
  and a small tracker hook — deferred unless Pravine wants it now.

## Non-goals

- No rebuild of the LP/checklist/endpoint from scratch.
- No changes to `/guides/health-ad-compliance/` (separate SEO page, not the lead magnet).
- No new email/analytics backend — reuse the existing Vercel function + Resend + tracker.
- No hard gate; no phone-required (optional only).

## Verification

- `pnpm build` clean; `/zero-ban-protocol/` + `/checklist/` render; old paths 301/302.
- LP + checklist visually verified (Playwright screenshot) at desktop + mobile widths.
- Motion respects `prefers-reduced-motion`.
- Confirmation email rendered/previewed; links resolve; "5" not "4".
- PDF opens, is brand-correct, no site chrome.
- Both pages stay `noindex`; sitemap/llms unaffected.

## Deploy

Work on `optimize/zero-ban-protocol`, verify, hand back for Pravine's review. On approval:
merge to `main` → Vercel auto-deploys. Confirm redirects live and a test opt-in delivers
the email post-deploy.
