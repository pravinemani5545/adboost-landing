# Action Plan — prioritized

## Critical (this week)
| # | Action | Fixes | Effort |
|---|---|---|---|
| 1 | Ship /privacy/ + /terms/ pages, link in footer | Trust, legal exposure (PII via Cal.com) | 2-3h |
| 2 | Fix FAQPage JSON-LD to byte-match visible FAQ text | Schema critical | 15m |
| 3 | Add source links (Meta health policy, Google healthcare cert, FTC) + "policies change — verify" disclaimer to GLP-1 post; methodology note on CAC table | YMYL risk | 1h |
| 4 | Build /about/ page: founder bios, credentials, LinkedIn; link bylines; Person schema url+sameAs | E-E-A-T + GEO #1 + SXO trust | 3-4h |
| 5 | Build 1-3 case-study/results pages; link homepage testimonials + stats to them | SXO trust (weakest dimension on all 6 pages) | 4-8h |

## High (next 2 weeks)
| # | Action | Effort |
|---|---|---|
| 6 | Shorten 5 post titles ≤60c + 5 meta descriptions ≤155c; home title → "Growth Marketing for Health & Telehealth Brands \| AdBoost Health" | 45m |
| 7 | Mobile hamburger menu (Blog currently unreachable on mobile home) | 1-2h |
| 8 | Organization sameAs (real LinkedIn/Crunchbase/Clutch) + contactPoint; consolidate publisher stubs via @id → #org | 1h |
| 9 | Homepage: add 2-3 contextual deep links into posts (FAQ→GLP-1 post etc.) | 30m |
| 10 | vercel.json: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (+report-only CSP) | 45m |
| 11 | Expand each post's 1-2 weakest H2s (examples, citations, a table per post — only 1/5 has one); target 1,200-1,500w bodies | 4-6h |
| 12 | Per-post CTA variants + one low-friction lead asset (GLP-1 compliance checklist or CAC calculator) | 2-8h |

## Medium (this month)
- Weave "AdBoost Health" + Toronto/vertical context into prose lead sentences (GEO self-attribution) — 30m/post
- Responsive images: astro:assets srcset for blog heroes — 2h
- vercel.json immutable cache rule for /blog/*, /logos/*, /ads/*, /people/* — 15m
- Fix undefined-health.webp logo bug — 15m
- Footer h6 → <p class>, apple-touch-icon + favicon.ico, 40px→44px tap targets — 1h
- Custom 404.astro — 30m
- Single-hop apex redirect + trailing-slash normalization — 30m
- glp1 ↔ supplement reciprocal links — 15m
- Answer-first rewrite of H2 openers (snippet capture) — 2h
- Annotated rejected-vs-approved creative examples in the creative post — 2-3h
- "How engagements work" pricing-signal section — 1h

## Low (backlog)
sitemap lastmod via serialize() · dateModified strategy + visible "Updated" lines · llms-full.txt · explicit robots policy for CCBot/cohere-ai/Bytespider · sticky CTA on /blog/ index · footer link tap padding · blog topic clustering (when >10 posts) · favicon weight (<10KB) · ad-rail images → <img loading=lazy> · IndexNow ping on deploy · HSTS includeSubDomains+preload · digital PR: get into "top health agencies" listicles, founder YouTube/Reddit presence (highest AI-citation leverage — ongoing)
