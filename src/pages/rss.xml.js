import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/blog';

export async function GET(context) {
  const blog = await getPublishedPosts();
  return rss({
    title: 'AdBoost Health Blog',
    description:
      'Playbooks on compliant health advertising, telehealth CAC benchmarks, and scaling paid media for GLP-1, supplement & wellness brands.',
    site: context.site,
    items: blog.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        author: post.data.author,
        link: `/blog/${post.id}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
