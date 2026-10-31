import { getCollection } from 'astro:content';
import { PREVIEW_ALL } from './live';

const isPublished = (data: { pubDate: Date; draft?: boolean }, now: number) =>
  PREVIEW_ALL || (!data.draft && data.pubDate.valueOf() <= now);

/**
 * Posts whose pubDate has passed at build time and are not drafts, newest
 * first. Future-dated and draft posts stay out of every surface (pages, RSS,
 * sitemap, llms.txt) until a scheduled rebuild after their pubDate.
 * PREVIEW_ALL=1 includes them all (see src/lib/live.ts).
 */
export async function getPublishedPosts() {
  const now = Date.now();
  return (await getCollection('blog'))
    .filter((post) => isPublished(post.data, now))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** URL paths of posts this build does not publish (for unwrapping links to them). */
export async function getUnpublishedPostPaths() {
  const now = Date.now();
  return (await getCollection('blog'))
    .filter((post) => !isPublished(post.data, now))
    .map((post) => `/blog/${post.id}/`);
}

/** Markdown inline syntax to the plain text a reader sees (links keep their text). */
const plainText = (md: string) =>
  md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[^\w*])[*_]([^*_\n]+)[*_](?=[^\w*]|$)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * The post's "## FAQ" section as question/answer pairs for FAQPage JSON-LD:
 * each "### question" and the paragraph under it. Later paragraphs after the
 * last answer (corrections line, call to action) are not part of an answer.
 */
export function faqFromBody(body: string | undefined): { q: string; a: string }[] {
  const section = body?.match(/^## FAQ[ \t]*\r?\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1];
  if (!section) return [];
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [heading, ...rest] = block.split('\n');
      const answer = rest.join('\n').split(/\n\s*\n/).map((p) => p.trim()).find(Boolean) ?? '';
      return { q: plainText(heading), a: plainText(answer) };
    })
    .filter((f) => f.q && f.a);
}
