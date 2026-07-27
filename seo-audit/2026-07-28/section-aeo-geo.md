## AEO/GEO — 76/100

### High (code-fixable)
1. **llms-full.txt omits 23 of 85 URLs** — only blog/glossary/advertising wired in; industries (the "who does compliant GLP-1 ads" buyer pages), services, tools, compare, faq all missing from the LLM-ingestion feed. Fix: extend llms-full.txt.ts mapping VERTICALS/SERVICES/COMPARE/FAQ data (sources already exist in src/data/). Effort S.

### Medium
2. **5 calculators lack SoftwareApplication schema** (only HowTo+FAQPage) — the "usable tool" signal for AIO tool surfacing. Add applicationCategory BusinessApplication, offers.price 0, featureList. Effort S.
3. **/compare/ under-schema'd** — index missing CollectionPage (siblings have it); sub-pages need ItemList of comparison dimensions. Effort S-M.
4. **llms.txt lists glossary/compare hubs only, not the 29+3 children** — highest-citability content least discoverable. Effort XS.

### Off-page (the real AEO-leads bottleneck, not code)
5. Zero YouTube/Reddit/Wikipedia footprint; Person sameAs = LinkedIn only. YouTube mentions ~0.737 corr with AI citations. Repurpose blog answers into short videos, genuine subreddit answers, Wikipedia citation on existing articles.

### Passed
robots.txt exhaustive incl. CCBot/Bytespider/Applebot; GPTBot/ClaudeBot/PerplexityBot live-fetch verified SSR; FAQ schema byte-matches (10/10 + 4/4); answer-first openers 20-48w stat-led; entity consistency everywhere; zero-ban-protocol correctly noindex-gated (intentional).
