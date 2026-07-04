import { getCollection } from 'astro:content';

/**
 * Posts whose pubDate has passed at build time, newest first.
 * Future-dated posts stay out of every surface (pages, RSS, sitemap,
 * llms.txt) until the weekly Friday rebuild picks them up.
 */
export async function getPublishedPosts() {
  const now = Date.now();
  return (await getCollection('blog'))
    .filter((post) => post.data.pubDate.valueOf() <= now)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
