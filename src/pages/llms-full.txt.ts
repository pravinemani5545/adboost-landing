import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';
import { GLOSSARY } from '../data/glossary';
import { AD_POLICIES, STATUS_LABEL } from '../data/adPolicies';

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
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
