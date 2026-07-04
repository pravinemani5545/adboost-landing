## Technical SEO — 88/100

### High
1. **Missing security headers site-wide** — only HSTS present; no CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. Fix via vercel.json headers.

### Medium
2. **Apex→www is a 2-hop redirect chain** (http→https 308, then apex→www 308). Configure single-hop rule.
3. **/blog (no slash) serves 200 instead of redirecting to /blog/** — duplicate serving; canonical mitigates. Set trailingSlash normalization.
4. **No custom 404 page** — correct 404 status but generic Vercel text/plain body. Add src/pages/404.astro.

### Low
5. **Sitemap lacks <lastmod>** — add from pubDate/updatedDate via sitemap integration.
6. **HSTS without includeSubDomains/preload.**
7. **IndexNow not implemented** — optional; ping on deploy for same-day Bing indexing.

### Passed
robots.txt (incl. AI crawlers + sitemap directive) · sitemap 1:1 with site, all 200 · exact canonicals on all 7 pages · single canonical host enforced · HTTPS+HSTS · true 404 status (no soft-404) · no accidental noindex · Brotli · correct HTML/asset cache split · zero mixed content · lang=en · viewport meta · fully static HTML (no JS-rendering risk) · schema on every page type · optimal font-loading pattern · all 34 internal links return 200 · valid RSS + alternate link · clean URL structure.
