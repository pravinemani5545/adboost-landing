// "The compliant path" of a rule sheet as a step track (src/pages/advertising/[slug].astro). The
// sheet's howToComply text is split, without changing a character, at its sentences, or at its
// semicolons when it is one sentence, so each step card holds one instruction in the page's order.
// A step that opens with a label ("Certified telehealth brands:") keeps it, set in bold.
export function pathSteps(text: string): { lead?: string; rest: string }[] {
  const t = text.trim();
  if (t.includes('<')) return [{ rest: t }];
  let parts = t.split(/(?<=[.!?])\s+(?=[A-Z“(])/);
  if (parts.length < 2) parts = t.split(/(?<=;)\s+/);
  if (parts.join(' ').replace(/\s+/g, ' ') !== t.replace(/\s+/g, ' ')) throw new Error('[adr path] split changed the text');
  return parts.map((p) => {
    const m = p.match(/^([A-Z][^:.;]{2,40}):\s+([\s\S]+)$/);
    return m ? { lead: `${m[1]}:`, rest: m[2] } : { rest: p };
  });
}
