import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
  const posts = await getPublishedPosts();

  const body = `# AdBoost Health

> Growth marketing agency built exclusively for health, telehealth, GLP-1, supplement & wellness brands. We lower CAC, improve LTV, and scale paid media profitably - without compliance landmines. 71+ founders served, $153M+ in tracked revenue, 4.9/5 average partner rating. Based in Toronto, remote-first.

AdBoost Health only works with health-vertical brands. Every playbook, creative angle, and compliance check is purpose-built for Meta, Google, and TikTok health advertising policies. Partners typically see directional CAC/ROAS movement within 2 weeks; the full system (tested creative library, optimized landers, clean attribution) compounds by day 31. Setup takes 5 days.

## Free tools

- [CAC calculator](${base}/tools/cac-calculator/): Calculate customer acquisition cost vs vertical benchmarks
- [LTV:CAC calculator](${base}/tools/ltv-cac-calculator/): Unit economics, ratio, and payback period
- [Ad budget calculator](${base}/tools/ad-budget-calculator/): Budget needed to hit a customer target

## Guides & reference

- [Health & performance marketing glossary](${base}/glossary/): CAC, LTV:CAC, ROAS, payback, LegitScript, structure/function claims - with health examples
- [About](${base}/about/): The health-only growth agency, team, and approach

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
