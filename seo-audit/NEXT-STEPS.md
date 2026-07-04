# Next Steps — what only you can do

Everything code-level from the audit is fixed and deployed (see `FIXED.md` alongside this file). These items need **your input, accounts, or outreach** — ordered by SEO/conversion impact.

## 1. Case studies (Critical — biggest conversion lever)
Trust scored 8–10/25 on every page: the site claims $153M+/71+ founders/named CAC results with nothing to click. Send me for 1–3 clients (anonymized is fine if needed):
- Brand + vertical, starting CAC/ROAS → result + timeframe
- Spend level, channel mix, what we actually changed (creative/funnel/attribution)
- Any dashboard screenshots you can share
→ I'll build `/case-studies/` pages and wire every homepage testimonial + stat to them.

## 2. About / team page (Critical)
Send me: founder bios (Amir + anyone else), years in health media buying, notable accounts/spend managed, LinkedIn URLs, photos. → I'll build `/about/`, link every byline, add Person schema with `sameAs`. This is also the #1 AI-citation (GEO) gap.

## 3. Real profile URLs for `sameAs` (High)
The Organization schema needs verifiable profiles. Send whichever exist (or create them):
- LinkedIn company page (create if missing — 20 min, high value)
- Founder LinkedIn, X/Twitter, Crunchbase, Clutch/G2
Do NOT want: I will not mark up the "4.9/5" rating as AggregateRating schema unless it's backed by a public review source (Clutch/G2/Google) — doing it unbacked risks a Google manual action. If you have a review profile, share it and I'll wire it properly.

## 4. Google Search Console follow-through (High)
- Verify the domain property (DNS TXT — say the word and I'll add it via the Vercel API)
- After this deploy: request indexing for `/`, `/blog/choose-health-growth-agency/`, `/blog/telehealth-cac-benchmarks-2026/`
- One-click import into Bing Webmaster Tools (Bing powers ChatGPT search)

## 5. Lead magnet (High — conversion)
Every CTA is "book a call" — high friction for cold blog readers. Pick one and I'll build it:
- **GLP-1 compliance checklist** (gated PDF/email) — fits the compliance post
- **CAC benchmark calculator** (interactive page) — fits the benchmarks post, and nothing like it exists on competing SERPs

## 6. Digital PR / brand mentions (Ongoing — biggest AI-visibility lever)
AI engines recommend brands they see discussed elsewhere. YouTube mentions correlate strongest with citations, then Reddit. Realistic plays: podcast guest spots (health DTC/telehealth pods), founder answers in r/PPC / r/telehealth threads, pitch inclusion in "top health marketing agencies" listicles (Avenue Z's owns that SERP today).

## 7. Confirm one thing for me
- Is **"Undefined Health"** a real client brand (logo strip on the home page, `undefined-health.webp`)? It reads like a templating bug to an auditor. If it's real, I'll leave it; if not, tell me which logo belongs there.

## 8. Decide (optional)
- **AI training bots**: robots.txt currently allows everything. Explicitly block CCBot/Bytespider (training-only, no citation value) or leave open? Current stance = open, which favors maximum AI visibility.
- **Pricing signal**: a "how engagements are structured" section (retainer range, minimum spend) would pre-qualify leads. Needs your numbers or at least ranges.

## Standing cadence (automated, no action needed)
- Friday 8am ET: next scheduled post auto-publishes (queue runs through **Sep 11**) — after that, ask me for the next batch
- When you edit an old post meaningfully: tell me and I'll set `updatedDate` (freshness signal now wired end-to-end: schema + sitemap lastmod)
