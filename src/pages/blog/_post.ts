// Everything a post page needs besides its body, shared by the two post routes:
//   [slug].astro  posts without frontmatter diagrams
//   [id].astro    posts with them
// Astro bundles CSS per route file, not per built page, so a post that draws no diagram only
// stays free of diagram CSS if it is built by a route that never imports a diagram component.
import type { CollectionEntry } from 'astro:content';
import { splitMarkers, type MarkerPart } from '../../kit/content/markers';
import { faqFromBody } from '../../lib/blog';

type Post = CollectionEntry<'blog'>;

const MARKER_LINE = /^[ \t]*<!--\s*diagram:[^>]*-->[ \t]*$/gm;

/** A post's rendered HTML cut at its `<!-- diagram: id -->` markers. Throws (failing the build)
 *  on an unknown, duplicated, unplaced or inline marker. */
export function postParts(post: Post): MarkerPart[] {
  return splitMarkers(post.rendered?.html ?? '', post.data.diagrams, `src/content/blog/${post.id}.md`);
}

/** Words / 200. Marker lines are not words, so adding a diagram never changes the read time. */
export function readMinutes(post: Post): number {
  const words = (post.body ?? '').replace(MARKER_LINE, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export interface TocItem { id: string; html: string }

/** The h2s of the rendered post (markdown and raw-HTML headings alike), for the page index.
 *  Only long posts get one: four or more sections and at least six minutes of reading. */
export function postToc(post: Post): TocItem[] {
  const html = post.rendered?.html ?? '';
  const items = [...html.matchAll(/<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    html: m[2].replace(/<[^>]+>/g, '').trim(),
  }));
  return items.length >= 4 && readMinutes(post) >= 6 ? items : [];
}

/** Props for BlogLayout, from the post and every published post (for related reading). site: the
 *  origin without a trailing slash. */
export function postLayoutProps(post: Post, all: Post[], site: string) {
  // Related: most shared tags first, then recency. Top 3.
  const related = all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, overlap: p.data.tags.filter((t) => post.data.tags.includes(t)).length }))
    .sort((a, b) => b.overlap - a.overlap || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .slice(0, 3)
    .map(({ p }) => ({
      href: `/blog/${p.id}/`,
      title: p.data.title,
      description: p.data.description,
      heroImage: p.data.heroImage,
      heroAlt: p.data.heroAlt,
      pubDate: p.data.pubDate,
    }));

  return {
    title: `${post.data.title} | AdBoost Health`,
    pageTitle: post.data.seoTitle,
    description: post.data.description,
    canonical: `${site}/blog/${post.id}/`,
    slug: post.id,
    post: post.data,
    readMinutes: readMinutes(post),
    related,
    faq: faqFromBody(post.body),
    toc: postToc(post),
  };
}
