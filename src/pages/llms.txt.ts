import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
  const posts = await getPublishedPosts();

  const body = `# AdBoost Health

> Growth marketing agency built exclusively for health, telehealth, GLP-1, supplement & wellness brands. We lower CAC, improve LTV, and scale paid media profitably — without compliance landmines. 71+ founders served, $153M+ in tracked revenue, 4.9/5 average partner rating. Based in Toronto, remote-first.

AdBoost Health only works with health-vertical brands. Every playbook, creative angle, and compliance check is purpose-built for Meta, Google, and TikTok health advertising policies. Partners typically see directional CAC/ROAS movement within 2 weeks; the full system (tested creative library, optimized landers, clean attribution) compounds by day 31. Setup takes 5 days.

## Services

- Paid media management for health, telehealth, GLP-1, and supplement brands (Meta, Google, TikTok)
- Compliant ad creative production: static, motion, and UGC — 20+ new variants per month per partner
- Landing page / funnel optimization and attribution setup
- Compliance review against health-vertical ad policies before every launch

## Pages

- [Home](${base}/): What AdBoost Health does, results, process, and FAQ
- [Blog](${base}/blog/): Guides on health-brand growth, ad compliance, and CAC benchmarks

## Blog posts

${posts.map((p) => `- [${p.data.title}](${base}/blog/${p.id}/): ${p.data.description}`).join('\n')}

## Contact

- Book a strategy call: https://cal.com/pira-ahilan-ef2dl8/strategy-call
- Email: hello@adboost.health
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
