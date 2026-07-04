## Visual / Mobile — 78/100

### High
1. **No mobile menu — Blog + section links unreachable on mobile** — .nav-links display:none at 390px with no hamburger; footer has no Blog link either. Real internal-linking gap for mobile users. Fix: hamburger with same links, or at minimum a Blog link in mobile nav/footer.

### Medium
2. **CTA tap targets 40px tall** (nav "Book a call", "Start now", post inline CTA) — below 44px floor. Bump .btn padding.

### Low
3. Footer links + "← All articles" at 17–18px tap height — add clickable padding.
4. Sticky mobile CTA missing on /blog/ index (present + working on home and posts).
5. Google Fonts FOUT possible on slow mobile (well-mitigated; optional self-host).

### Passed
Correct viewport meta · zero horizontal overflow (all pages × viewports) · H1 + primary CTA above fold everywhere · smart sticky CTA works (52px target) · FAQ buttons 58-74px with aria-expanded · all 26 images load, descriptive alts · zero console errors/failed requests · no layout jank.
Screenshots: scratchpad/audit-shots/
