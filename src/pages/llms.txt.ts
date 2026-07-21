import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
  const posts = await getPublishedPosts();

  const body = `# AdBoost Health

> Growth marketing agency built exclusively for health, telehealth, GLP-1, supplement & wellness brands. We lower CAC, improve LTV, and scale paid media profitably - without compliance landmines. 71+ founders served, $153M+ in tracked revenue, 4.9/5 average partner rating. Based in Toronto, remote-first.

AdBoost Health only works with health-vertical brands. Every playbook, creative angle, and compliance check is purpose-built for Meta, Google, and TikTok health advertising policies. Partners typically see directional CAC/ROAS movement within 2 weeks; the full system (tested creative library, optimized landers, clean attribution) compounds by day 31. Setup takes 5 days.

## Services

- [Paid media](${base}/services/paid-media/): Compliant Meta, Google & TikTok media buying for health brands
- [Creative production](${base}/services/creative/): In-house, compliant ad creative built around winning angles
- [CRO & funnels](${base}/services/cro/): Quiz funnels and landing pages tuned to LTV and payback

## Industries we grow

- [GLP-1 & weight loss](${base}/industries/glp-1-weight-loss/)
- [Telehealth](${base}/industries/telehealth/)
- [Supplements & DTC](${base}/industries/supplements-dtc/)
- [TRT & hormone](${base}/industries/trt-hormone/)
- [Peptides](${base}/industries/peptides/)
- [Med spa](${base}/industries/med-spa/)
- [Mental health](${base}/industries/mental-health/)
- [Longevity](${base}/industries/longevity/)
- [Fertility & IVF](${base}/industries/fertility-ivf/)

## Free tools

- [CAC calculator](${base}/tools/cac-calculator/): Calculate customer acquisition cost vs vertical benchmarks
- [LTV:CAC calculator](${base}/tools/ltv-cac-calculator/): Unit economics, ratio, and payback period
- [Ad budget calculator](${base}/tools/ad-budget-calculator/): Budget needed to hit a customer target

## Guides & reference

- [Health & performance marketing glossary](${base}/glossary/): CAC, LTV:CAC, ROAS, payback, LegitScript, structure/function claims - with health examples
- [Compare](${base}/compare/): AdBoost Health vs. full-service agencies, in-house teams, and generalist DTC shops
- [FAQ](${base}/faq/): Answers on pricing, engagement, compliance, and how we work
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
