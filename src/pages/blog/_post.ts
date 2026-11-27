// Everything a post page needs besides its body, shared by the two post routes:
//   [slug].astro  posts without frontmatter diagrams
//   [id].astro    posts with them
// Astro bundles CSS per route file, not per built page, so a post that draws no diagram only
// stays free of diagram CSS if it is built by a route that never imports a diagram component.
import type { CollectionEntry } from 'astro:content';
import { splitMarkers, type MarkerPart } from '../../kit/content/markers';
import { enhanceProse, faqFromHtml, splitLead } from '../../components/resources/html';

type Post = CollectionEntry<'blog'>;

const MARKER_LINE = /^[ \t]*<!--\s*diagram:[^>]*-->[ \t]*$/gm;

/** A post's rendered HTML cut at its `<!-- diagram: id -->` markers. Throws (failing the build)
 *  on an unknown, duplicated, unplaced or inline marker. */
export function postParts(post: Post): MarkerPart[] {
  return splitMarkers(post.rendered?.html ?? '', post.data.diagrams, `src/content/blog/${post.id}.md`);
}

/**
 * The post body for the layout: the opening paragraph (the answer-first summary every post opens
 * with, shown under the H1) and the rest, cut at the diagram markers, each run of prose with the
 * card classes added (tables, key lists, steps, examples, FAQ cards). No word changes.
 */
export function postBody(post: Post): { lead: string; parts: MarkerPart[] } {
  const parts = postParts(post);
  let lead = '';
  const first = parts[0];
  if (first?.type === 'html') {
    const [p, rest] = splitLead(first.html);
    lead = p;
    parts[0] = { type: 'html', html: rest };
  }
  return {
    lead,
    parts: parts
      .map((p) => (p.type === 'html' ? { type: 'html' as const, html: enhanceProse(p.html) } : p))
      .filter((p) => p.type !== 'html' || p.html.trim()),
  };
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

/** The label a card shows for a post: its first tag. */
export const category = (post: Post) => post.data.tags[0];

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
      category: category(p),
      minutes: readMinutes(p),
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
    // From the rendered HTML, so the FAQPage JSON-LD carries exactly the text the page shows.
    faq: faqFromHtml(post.rendered?.html ?? ''),
    toc: postToc(post),
  };
}
