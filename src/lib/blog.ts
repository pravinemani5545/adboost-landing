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
