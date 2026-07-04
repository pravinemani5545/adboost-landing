## AI Search Readiness (GEO) — 70/100
(Citability 82 · Structure 88 · Multi-modal 45 · Authority/brand signals 35 · Technical access 92)

### High
1. **No brand-mention/entity infrastructure** — /about, /team, author pages all 404; zero `sameAs` in schema; no LinkedIn/YouTube/Reddit/Crunchbase/Clutch footprint linked. This is the signal set most correlated with AI citations (YouTube mentions ~0.737 corr). Fix: build /about + author entity page w/ Person schema + sameAs (LinkedIn company+founder, Crunchbase, Clutch/G2); seed YouTube/Reddit mentions (outreach).

### Medium
2. **Passages aren't self-attributing** — "AdBoost Health" never appears in article prose (only nav/footer/byline). Lifted quotes carry no source. Fix: weave "AdBoost Health" + "Toronto health-vertical agency" into lead sentences of 2-3 sections per post (~30 min/post).
3. **Entity context lives only in schema/footer, not visible prose** — same fix.

### Low
4. **dateModified never diverges from datePublished** — no freshness signal; bump on real refreshes + visible "Updated" line.
5. **robots.txt silent on training-only bots** (CCBot, cohere-ai, Bytespider, anthropic-ai) — implicitly allowed via wildcard; make the policy explicit.
6. **/llms-full.txt missing** (optional spec extension) — trivial to generate from post markdown.

### Passed
All 8 target AI crawlers explicitly allowed (verified via live GPTBot-UA fetch, no cloaking) · llms.txt spec-compliant and above average · question-form H2s with stable anchors, 4/5 sections in optimal 130-155w citation window · real HTML tables with concrete numbers · full SSR, zero JS-gated content · visible dates matching schema.
