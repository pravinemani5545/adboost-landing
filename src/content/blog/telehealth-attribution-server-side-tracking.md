---
title: "Attribution for Telehealth in the Privacy Era: Why Your ROAS Is Lying and How to Fix It"
description: "Signal loss, HIPAA-aware tracking constraints, and health-data pixel restrictions mean your platform-reported ROAS is fiction. Here's the attribution stack telehealth brands actually need: server-side tracking done legally, post-purchase surveys, and incrementality basics."
pubDate: 2026-07-17
author: "Amir Salihovic"
authorTitle: "Co-Founder, AdBoost Health"
tags: ["attribution", "telehealth", "server-side tracking", "HIPAA", "measurement"]
heroImage: "/blog/telehealth-attribution-server-side-tracking.webp"
heroAlt: "Diagram of ad platform signals flowing through a server-side tracking layer, rendered in AdBoost blue"
---

A telehealth founder shows us Ads Manager reporting 1.4 ROAS and asks whether to kill the channel. Their bank account says the business grew 30% the same quarter. Both numbers are real. One of them is measuring the wrong thing.

This is the normal state of telehealth attribution now. Between iOS privacy changes, browser tracking prevention, and — specific to this vertical — restrictions on what health businesses can legally send to ad platforms at all, the default pixel setup undercounts conversions badly. Founders then make the two classic errors in sequence: first they under-invest in channels that are working, then they over-trust a "fixed" dashboard that's now over-counting. Here's how we actually measure paid media for health brands.

## Why is your platform-reported ROAS wrong?

Three compounding causes:

1. **Signal loss.** iOS App Tracking Transparency, Safari and Firefox cookie expiry, and ad blockers mean a meaningful share of your conversions never make it back to Meta or Google through a browser pixel. The platforms backfill with modeled conversions — statistical guesses that get worse as your volume gets smaller.
2. **Delayed conversion windows.** Telehealth buyers research. A patient who clicks your ad, reads reviews for six days, then converts through a branded search often gets credited to the wrong channel — or nothing.
3. **Health-data restrictions.** This is the vertical-specific one. Meta and Google both restrict what health and medical businesses can transmit through tracking tools, and regulators have made pixel misuse on health sites an enforcement priority. Many telehealth brands responded by stripping tracking to almost nothing — legally cautious, analytically blind.

The result: your dashboard ROAS is neither your true ROAS nor a consistent fraction of it. It drifts, which makes it dangerous for decisions.

## What can a telehealth brand legally send to ad platforms?

This is where telehealth diverges from a normal ecommerce brand, and where most agencies get it wrong in one of two directions.

The constraint, stated plainly: **no PHI in pixels — ever.** If you're a HIPAA-covered entity (or business associate), patient health information cannot flow to Meta or Google, because ad platforms will not sign a BAA. And even outside strict HIPAA coverage, the FTC has pursued health platforms for sharing user health data with advertisers. That means:

- **Never send:** condition or diagnosis data, medication or treatment selections, intake answers, appointment details, or URLs that encode any of these (a `thank-you?med=semaglutide` URL is a data leak).
- **Generally workable:** conversion *events* stripped of health context — "a purchase happened, of this value" — fired from pages and parameters that reveal nothing about the condition, with hashed identifiers handled under proper consent and legal review.
- **The structural fix:** keep marketing pages and authenticated patient flows on separated infrastructure, so tracking lives where PHI doesn't.

We are marketers, not your lawyers — the architecture below is what we implement, but your counsel signs off on the data map. Any agency that shrugs at this question shouldn't be running your ads; it's one of the sharper filters in our guide to [choosing a health growth agency](/blog/choose-health-growth-agency/).

## Does server-side tracking (CAPI) fix signal loss?

Partially — and the partial matters. Meta's Conversions API and Google's Enhanced Conversions move event transmission from the user's browser to your server. That recovers conversions lost to ad blockers and browser restrictions, improves match quality, and — critically for health brands — gives you a **filtering layer**: your server decides exactly which fields leave the building, instead of a pixel vacuuming up whatever's on the page.

What it doesn't do: server-side tracking recovers *delivery* of signals, not *attribution truth*. It will not un-break cross-device journeys or credit the podcast ad that started the journey. Across partner accounts we typically see server-side implementations recover a meaningful double-digit percentage of previously invisible conversions — enough to change bidding behavior and reported CAC, not enough to be the whole answer.

Implementation order that works: define your event schema and PHI exclusion list first, deploy CAPI with deduplication against the remaining pixel, verify match quality in Events Manager, *then* start trusting directional platform data again.

## Where do post-purchase surveys fit?

A one-question survey at checkout or post-booking — "Where did you first hear about us?" — is the cheapest attribution instrument in the stack, and for telehealth it's disproportionately valuable because it's zero-tracking: no cookies, no identifiers, no health data, no consent complexity.

What we see across partner accounts: survey data consistently surfaces channels the pixel undercounts (podcast, YouTube, TikTok organic, word of mouth) and reveals that "branded search" conversions were mostly created somewhere else. Run it continuously, hold response bias loosely (respondents over-remember memorable channels), and use it as a **correction factor** on platform data rather than a replacement for it.

## When do you need incrementality testing?

Attribution asks "which touchpoint gets credit?" Incrementality asks the only question the CFO cares about: **"would these patients have converted without the spend?"** For telehealth brands with strong organic demand or brand search, the gap between the two can be enormous.

You don't need a data science team to start:

- **Geo holdouts.** Pause or reduce a channel in matched markets for 3–4 weeks and compare conversion trends against control markets. The classic first test: brand search, which frequently harvests demand that would have arrived anyway.
- **Platform lift tests.** Meta and Google both offer conversion-lift tooling at sufficient spend; use them when eligible.
- **Spend-step analysis.** When you change budgets sharply, watch blended CAC and total conversions — not platform ROAS — over the following weeks.

Incrementality is a quarterly discipline, not a dashboard. Two or three clean tests a year will reprice your channels more accurately than any attribution model.

## What should your measurement stack look like?

| Layer | Tool | What it answers |
|---|---|---|
| Signal delivery | CAPI / server-side with PHI filtering | Are platforms seeing (compliant) conversions? |
| Directional optimization | Platform dashboards | Which ad/audience wins *within* a channel? |
| Channel truth | Post-purchase survey + blended CAC | Where do patients actually come from? |
| Budget allocation | Incrementality tests | What spend is actually causal? |

The north-star metric through all of it is **blended CAC against LTV by vertical** — platform ROAS is an input, never the verdict. If you don't know what a healthy CAC even looks like for your category, start with our [telehealth CAC benchmarks](/blog/telehealth-cac-benchmarks-2026/).

Fixing measurement is usually the first month of work with a new partner, because every scaling decision downstream depends on it — it's a big part of why our partners' results compound by day 31 instead of day one. If you suspect your ROAS is lying to you, [book a free 30-minute strategy call](https://cal.com/pira-ahilan-ef2dl8/strategy-call): we'll audit your tracking and account setup and send you a written plan either way.
