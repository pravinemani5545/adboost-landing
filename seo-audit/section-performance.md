## Performance (CWV, lab) — 84/100

### Medium
1. **No responsive images on blog heroes** — 1600×905/45KB served to all viewports (~4× oversized on mobile, the CWV-graded segment). Fix: astro:assets Image/getImage → 640/980/1600w srcset + sizes="(max-width:980px) 100vw, 980px". Applies to all /blog/*.webp.
2. **All /public images cached max-age=0, must-revalidate** (blog heroes, logos, ads, favicon) — 304 round trip per asset per repeat view. Fix: vercel.json Cache-Control immutable rule for /blog/*, /logos/*, /ads/*, /people/*, or move into astro:assets pipeline.

### Low
3. 8 phone-rail ad creatives (~328KB) as CSS background-image — can't lazy-load; convert to <img loading="lazy">.
4. Favicon PNG is 332×379/81KB — re-export <10KB.
5. font-display:swap without size-adjust metric-matched fallback — minor FOUT shift risk.

### Passed
TTFB 55–140ms (edge HIT) · single render-blocking CSS (10.4KB br) · fonts async preload+swap pattern · Cal.com fully deferred (idle/interaction, modal = no CLS) · every img has width/height · fetchpriority=high on LCP hero · tabular-nums grid on live dashboard (no CLS) · tiny DOM (759/192 elements) · zero framework JS · Brotli on HTML+CSS · hashed CSS immutable.
