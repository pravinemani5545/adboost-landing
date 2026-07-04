## Schema / Structured Data — 68/100

### Critical
1. **FAQPage answers don't exactly match visible copy** — JSON-LD strips the quotes in "DTC agency" (Q1) and expands "We've"→"We have" (Q2). Google requires exact match. Fix: derive schema strings from the same source as rendered HTML.

### High
2. **Organization missing sameAs + contactPoint** — no social/profile URLs, no structured contact. Add real LinkedIn/Crunchbase URLs + email contactPoint.

### Medium
3. **dateModified == datePublished on all posts** (all midnight UTC) — freshness signal wasted; bump on real edits.
4. **headline carries "| AdBoost Health" suffix** (one at 110-char ceiling) and same bloated string reused as breadcrumb name. Strip suffix from headline; short breadcrumb labels.

### Low/Info
5. FAQPage won't earn Google rich results (commercial site, post-Aug 2023) — keep for AI citation, fix #1 anyway.
6. **No @id entity linking** — blog/posts re-declare stub Organizations instead of referencing `#org`. Consolidate via @id.
7. Author Person lacks url/sameAs — blocked on author page existing (content gap).
8. **Do NOT add AggregateRating for "4.9/5"** without a verifiable review source — policy-violation risk.
9. Organization (not LocalBusiness/ProfessionalService) is the right call; SearchAction correctly absent.

### Passed
All JSON-LD parses · https @context · JSON-LD only · absolute URLs · valid ISO dates · logo resolves 332×379 · post images 1200×678 (16:9, ≥1200w) · BlogPosting+BreadcrumbList on all posts · Blog type on index · mainEntityOfPage self-referential.
