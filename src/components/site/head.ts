// Props of SiteHead.astro, shared with the Shell and the layouts.
export interface SiteHeadProps {
  title: string;
  description?: string;
  /** site path, e.g. "/industries/telehealth/" (or pass canonical as an absolute URL) */
  canonicalPath?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  /** root-relative path or absolute URL */
  ogImage?: string;
  ogImageAlt?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  /** article:published_time and article:author */
  article?: { publishedTime: string; author: string };
  /** object or array of schema.org nodes, or a complete graph object */
  jsonLd?: unknown;
  /** both Bing Webmaster verification tags (home only) */
  bingVerify?: boolean;
  /** false: no Open Graph or Twitter tags (404) */
  social?: boolean;
}

