// Blog diagram markers. A post lists its diagrams in frontmatter (`diagrams: { id: spec }`)
// and places `<!-- diagram: id -->` on its own line, directly before the table or list the
// diagram visualises (the table stays). The markdown pipeline keeps the comment as its own
// block in post.rendered.html; splitMarkers cuts the HTML there.
//
//   ---
//   const parts = splitMarkers(post.rendered?.html ?? '', post.data.diagrams, post.id);
//   ---
//   {parts.map((p) => p.type === 'html' ? <Fragment set:html={p.html} /> : <Diagram {...p.spec} />)}
//
// It throws (failing the build) on a marker id the frontmatter does not define, an id
// placed twice, an id defined but never placed, and a marker that is not on its own line
// (one inside a paragraph would split the paragraph's HTML).

import type { DiagramSpec } from '../diagram/types';

export type MarkerPart =
  | { type: 'html'; html: string }
  | { type: 'diagram'; id: string; spec: DiagramSpec };

const MARKER = /<!--\s*diagram:\s*([^\s>]*?)\s*-->/g;

export function splitMarkers(
  html: string,
  diagrams: Record<string, DiagramSpec> | undefined,
  where = 'post',
): MarkerPart[] {
  const specs = diagrams ?? {};
  const parts: MarkerPart[] = [];
  const placed = new Set<string>();
  let last = 0;

  for (const m of html.matchAll(MARKER)) {
    const id = m[1];
    const start = m.index ?? 0;
    const end = start + m[0].length;
    const lineStart = html.lastIndexOf('\n', start - 1) + 1;
    const nl = html.indexOf('\n', end);
    const lineEnd = nl < 0 ? html.length : nl;
    if (html.slice(lineStart, start).trim() || html.slice(end, lineEnd).trim()) {
      throw new Error(`${where}: "${m[0]}" must sit on its own line between blocks, not inside a paragraph or list item`);
    }
    if (!id) throw new Error(`${where}: "${m[0]}" has no id`);
    if (!Object.hasOwn(specs, id)) {
      const known = Object.keys(specs);
      throw new Error(`${where}: marker names unknown diagram "${id}" (frontmatter diagrams: ${known.length ? known.join(', ') : 'none'})`);
    }
    if (placed.has(id)) throw new Error(`${where}: diagram "${id}" is placed twice`);
    placed.add(id);

    const chunk = html.slice(last, start);
    if (chunk.trim()) parts.push({ type: 'html', html: chunk });
    parts.push({ type: 'diagram', id, spec: specs[id] });
    last = end;
  }

  const rest = html.slice(last);
  if (rest.trim() || parts.length === 0) parts.push({ type: 'html', html: rest });

  const unplaced = Object.keys(specs).filter((id) => !placed.has(id));
  if (unplaced.length) {
    throw new Error(`${where}: diagram${unplaced.length > 1 ? 's' : ''} ${unplaced.join(', ')} defined in frontmatter but no <!-- diagram: id --> marker places ${unplaced.length > 1 ? 'them' : 'it'}`);
  }
  return parts;
}
