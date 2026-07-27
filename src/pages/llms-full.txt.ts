import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';
import { GLOSSARY } from '../data/glossary';
import { AD_POLICIES, STATUS_LABEL } from '../data/adPolicies';
import { VERTICALS } from '../data/verticals';
import { PLAYBOOKS } from '../data/vertical-playbooks';
import { SERVICES } from '../data/services';
import { COMPARES } from '../data/compare';
import { FAQ_GROUPS } from '../data/faq';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://www.adboost.health';
  const posts = await getPublishedPosts();

  const body = `# AdBoost Health - Full Content

> Growth marketing agency built exclusively for health, telehealth, GLP-1, supplement & wellness brands. 71+ founders served, $153M+ in tracked revenue, 4.9/5 average partner rating. Toronto, remote-first. Book: https://cal.com/pira-ahilan-ef2dl8/strategy-call

${posts
  .map(
    (p) => `---

# ${p.data.title}
URL: ${base}/blog/${p.id}/
Author: ${p.data.author}, ${p.data.authorTitle}
Published: ${p.data.pubDate.toISOString().slice(0, 10)}

${p.body ?? ''}`
  )
  .join('\n\n')}

---

# Health & performance marketing glossary
URL: ${base}/glossary/

${GLOSSARY.map(
  (t) => `## ${t.term}
URL: ${base}/glossary/${t.slug}/

${t.definition}`
).join('\n\n')}

---

# Ad compliance by platform and vertical
URL: ${base}/advertising/

${AD_POLICIES.map(
  (p) => `## ${p.h1}
URL: ${base}/advertising/${p.slug}/
Status: ${STATUS_LABEL[p.status]}

${p.answer}`
).join('\n\n')}

---

# Services
URL: ${base}/services/

${SERVICES.map(
  (s) => `## ${s.h1}
URL: ${base}/services/${s.slug}/

${s.answer}

Outcomes:
${s.outcomes.map((o) => `- ${o}`).join('\n')}

Process:
${s.process.map((p) => `- ${p.phase}: ${p.detail}`).join('\n')}

Deliverables:
${s.deliverables.map((d) => `- ${d}`).join('\n')}

How we measure:
${s.howMeasured.map((m) => `- ${m}`).join('\n')}

${s.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}`
).join('\n\n')}

---

# Health verticals we grow
URL: ${base}/industries/

${VERTICALS.map((v) => {
  const pb = PLAYBOOKS[v.slug];
  return `## ${v.h1}
URL: ${base}/industries/${v.slug}/
Typical fully-loaded CAC: ${v.cacDisplay}

${v.lede}

${pb ? `Market context: ${pb.marketContext}\n\n` : ''}Ad-policy landmine: ${v.adLandmine}

Benchmarks:
${v.rows.map((r) => `- ${r.label}: ${r.value}${r.note ? ` (${r.note})` : ''}`).join('\n')}

Good vs concerning: ${v.goodVsConcerning}
Cost driver: ${v.costDriver}
${pb
  ? `
Growth playbook:
${pb.growthPlaybook.map((g) => `- ${g.h}: ${g.p}`).join('\n')}

Common mistakes:
${pb.commonMistakes.map((m) => `- ${m}`).join('\n')}

What good looks like:
${pb.whatGoodLooksLike.map((w) => `- ${w}`).join('\n')}
`
  : ''}
${[...v.faq, ...(pb?.extraFaq ?? [])].map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}`;
}).join('\n\n')}

---

# AdBoost Health compared to the alternatives
URL: ${base}/compare/

${COMPARES.map(
  (c) => `## ${c.h1}
URL: ${base}/compare/${c.slug}/

${c.answer}

Comparison by dimension:
${c.rows.map((r) => `- ${r.dimension}: ${c.competitor} - ${r.them}; AdBoost Health - ${r.us}`).join('\n')}

Their focus: ${c.theirFocus}
Our difference: ${c.ourDifference}
When the other option wins: ${c.bestWhen}

${c.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}`
).join('\n\n')}

---

# Frequently asked questions
URL: ${base}/faq/

${FAQ_GROUPS.map(
  (g) => `## ${g.title}

${g.items.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}`
).join('\n\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
