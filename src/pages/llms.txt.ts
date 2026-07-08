import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';
import { VERTICALS } from '../data/verticals';
import { SERVICES } from '../data/services';
import { AD_POLICIES } from '../data/adPolicies';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
  const posts = await getPublishedPosts();

  const body = `# AdBoost Health

> Growth marketing agency built exclusively for health, telehealth, GLP-1, supplement & wellness brands. We lower CAC, improve LTV, and scale paid media profitably — without compliance landmines. 71+ founders served, $153M+ in tracked revenue, 4.9/5 average partner rating. Based in Toronto, remote-first.

AdBoost Health only works with health-vertical brands. Every playbook, creative angle, and compliance check is purpose-built for Meta, Google, and TikTok health advertising policies. Partners typically see directional CAC/ROAS movement within 2 weeks; the full system (tested creative library, optimized landers, clean attribution) compounds by day 31. Setup takes 5 days.

## Services

${SERVICES.map((s) => `- [${s.name}](${base}/services/${s.slug}/): ${s.lede}`).join('\n')}

## Industries (specialist playbooks)

${VERTICALS.map((v) => `- [${v.short} marketing](${base}/industries/${v.slug}/): ${v.painPoint}`).join('\n')}

## Data & benchmarks (original, citable)

- [Health & telehealth CAC benchmarks](${base}/benchmarks/): Acquisition cost by vertical for 2026, from real spend
${VERTICALS.map((v) => `- [${v.short} CAC benchmarks](${base}/benchmarks/${v.slug}/): Typical CAC ${v.cacDisplay}`).join('\n')}

## Free tools

- [CAC calculator](${base}/tools/cac-calculator/): Calculate customer acquisition cost vs vertical benchmarks
- [LTV:CAC calculator](${base}/tools/ltv-cac-calculator/): Unit economics, ratio, and payback period
- [Ad budget calculator](${base}/tools/ad-budget-calculator/): Budget needed to hit a customer target

## Ad compliance by platform × vertical

- [Health ad compliance hub](${base}/advertising/): What's allowed advertising each health vertical on Meta, Google, and TikTok
${AD_POLICIES.map((p) => `- [${p.vertical} on ${p.platform}](${base}/advertising/${p.slug}/): Certification, prohibited claims, rejection triggers, and the compliant path`).join('\n')}

## Guides & reference

- [Compliant health advertising in 2026](${base}/guides/health-ad-compliance/): Meta, Google & TikTok rules for GLP-1, supplements, telehealth, TRT, med spa
- [Health & performance marketing glossary](${base}/glossary/): CAC, LTV:CAC, ROAS, payback, LegitScript, structure/function claims — with health examples
- [Compare AdBoost](${base}/compare/): vs full-service agencies, in-house teams, and generalist DTC agencies
- [About](${base}/about/): The health-only growth agency, team, and approach

## FAQ

- [Frequently asked questions](${base}/faq/): How we work, compliance, creative, and timelines

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
