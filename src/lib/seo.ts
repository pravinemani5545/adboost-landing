// Hand-written titles and meta descriptions for the data-driven templates
// (advertising, industries, glossary, compare). Descriptions are never derived
// from body copy: a missing one ships no description at all.
//
// SEO_STRICT turns every SEO build warning into a build error: a missing or
// out-of-range metaDescription, an over-long title, and (in astro.config.mjs)
// internal links to redirected URLs, built pages shadowed by a redirect and
// sitemap URLs with no content date. Run `SEO_STRICT=1 pnpm build` to check.
// Final step (docs/META-TODO.md): once that build passes, set SEO_STRICT_DEFAULT
// to true and make `metaDescription` non-optional in the four data types.
const SEO_STRICT_DEFAULT = false;
export const SEO_STRICT = SEO_STRICT_DEFAULT || process.env.SEO_STRICT === '1';

export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 140;
export const DESCRIPTION_MAX = 160;

function report(msg: string) {
  if (SEO_STRICT) throw new Error(`[seo] ${msg}`);
  console.warn(`[seo] ${msg}`);
}

/** The record's hand-written description, checked against 140-160 chars. */
export function metaDescription(page: string, value: string | undefined): string | undefined {
  if (!value) {
    report(`${page}: metaDescription missing (docs/META-TODO.md)`);
    return undefined;
  }
  if (value.length < DESCRIPTION_MIN || value.length > DESCRIPTION_MAX) {
    report(`${page}: metaDescription is ${value.length} chars (want ${DESCRIPTION_MIN}-${DESCRIPTION_MAX})`);
  }
  return value;
}

/** The page title, checked against the 60-char limit. */
export function seoTitle(page: string, value: string): string {
  if (value.length > TITLE_MAX) report(`${page}: title is ${value.length} chars (max ${TITLE_MAX}): ${value}`);
  return value;
}
