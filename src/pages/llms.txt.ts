import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';
import { AD_POLICIES, STATUS_LABEL } from '../data/adPolicies';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
  const posts = await getPublishedPosts();

  const body = `# AdBoost Health

> Growth marketing agency built exclusively for health, telehealth, GLP-1, supplement & wellness brands. We lower CAC, improve LTV, and scale paid media profitably — without compliance landmines. 71+ founders served, $153M+ in tracked revenue, 4.9/5 average partner rating. Based in Toronto, remote-first.

AdBoost Health only works with health-vertical brands. Every playbook, creative angle, and compliance check is purpose-built for Meta, Google, and TikTok health advertising policies. Partners typically see directional CAC/ROAS movement within 2 weeks; the full system (tested creative library, optimized landers, clean attribution) compounds by day 31. Setup takes 5 days.

## Pages

- [Home](${base}/): The health-only growth agency — services, results, and how we work
- [Blog](${base}/blog/): Health advertising compliance, CAC benchmarks, and paid-media playbooks
- [About](${base}/about/): The health-only growth agency, team, and approach
- [Privacy policy](${base}/privacy/)
- [Terms of service](${base}/terms/)

## Ad compliance guides

- [Health advertising policies](${base}/advertising/): What's allowed when advertising GLP-1, supplements, telehealth, TRT and med spa on Meta, Google, and TikTok
${AD_POLICIES.map((p) => `- [${p.vertical} on ${p.platform}](${base}/advertising/${p.slug}/): ${STATUS_LABEL[p.status]}`).join('\n')}

## Free tools

- [Free calculators](${base}/tools/): CAC, LTV:CAC, and ad-budget calculators with health benchmark context
- [CAC calculator](${base}/tools/cac-calculator/): Calculate customer acquisition cost and compare it to 2026 health-vertical benchmarks
- [LTV:CAC calculator](${base}/tools/ltv-cac-calculator/): Lifetime value, LTV:CAC ratio, and payback period for subscription health brands
- [Ad budget calculator](${base}/tools/ad-budget-calculator/): Reverse-engineer the monthly ad budget needed to hit a new-customer target

## Glossary

- [Health marketing glossary](${base}/glossary/): Plain-English definitions of CAC, LTV:CAC, ROAS, payback, LegitScript, structure/function claims, and more — with health-specific examples

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
