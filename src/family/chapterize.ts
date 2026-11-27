// The reading column as chapters (src/family/FamilyPage.astro).
// Port of chapterize() from adboost-media src/lib/slots.ts; the logic is unchanged.
//
// FamilyPage receives a page's body as one rendered HTML string: prose in .pg-prose
// wrappers (Markdown, or a template's own headings and paragraphs) with designed blocks
// between them. It regroups that HTML at build time, without changing a word of it:
//   - every H2 inside a .pg-prose opens a chapter (<section class="cp-ch">), numbered in CSS
//     only (the number is a counter, never text);
//   - a block outside .pg-prose that carries its own <h2 id> opens a chapter of its own;
//   - a graphic the template supplies goes after a given heading (`figureAt`);
//   - Markdown tables get a card frame and data-label cells for the phone layout;
//   - "Illustrative example" passages become a callout;
//   - an "A good fit:" list followed by a "Not a fit:" list becomes two columns.
// Every element, heading, sentence and link stays in the HTML, in the same order.
// Content before the first H2 is an unnumbered intro chapter (.cp-intro).

export interface Block { tag: string; html: string; attrs: string; text: string }
export interface FigureAt {
  /** id of the H2 or H3 the graphic follows */
  id: string;
  /** how many prose blocks (paragraphs, lists, tables) after that heading to place it; default 1 */
  skip?: number;
}

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea']);
const TAG_SRC = String.raw`<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>`;
const stripTags = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const attrOf = (attrs: string, name: string) => attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*"([^"]*)"`))?.[1];
const hasClass = (b: Block, c: string) => (attrOf(b.attrs, 'class') ?? '').split(/\s+/).includes(c);
const synth = (html: string): Block => ({ tag: 'div', html, attrs: '', text: stripTags(html) });

/** The top-level elements of an HTML fragment, in order (whitespace between them dropped). */
export function topBlocks(html: string): Block[] {
  const out: Block[] = [];
  const re = new RegExp(TAG_SRC, 'g');
  let i = 0;
  while (i < html.length) {
    re.lastIndex = i;
    const m = re.exec(html);
    if (!m) { const t = html.slice(i); if (t.trim()) out.push({ tag: '#text', html: t, attrs: '', text: t.trim() }); break; }
    if (m.index > i) { const t = html.slice(i, m.index); if (t.trim()) out.push({ tag: '#text', html: t, attrs: '', text: t.trim() }); }
    const start = m.index;
    if (m[0].startsWith('<!--') || m[1]) { out.push({ tag: '#other', html: m[0], attrs: '', text: '' }); i = re.lastIndex; continue; }
    const name = m[2].toLowerCase();
    let end = re.lastIndex;
    if (RAW.has(name)) {
      const close = html.indexOf(`</${name}`, end);
      end = close < 0 ? html.length : html.indexOf('>', close) + 1;
    } else if (!VOID.has(name) && !m[4]) {
      let depth = 1;
      while (depth > 0) {
        re.lastIndex = end;
        const n = re.exec(html);
        if (!n) { end = html.length; break; }
        end = re.lastIndex;
        if (n[0].startsWith('<!--')) continue;
        const nm = n[2].toLowerCase();
        if (n[1]) { depth--; continue; }
        if (RAW.has(nm)) { const close = html.indexOf(`</${nm}`, end); end = close < 0 ? html.length : html.indexOf('>', close) + 1; continue; }
        if (!VOID.has(nm) && !n[4]) depth++;
      }
    }
    const piece = html.slice(start, end);
    out.push({ tag: name, html: piece, attrs: m[3] ?? '', text: stripTags(piece) });
    i = end;
  }
  return out;
}

const inner = (b: Block) => b.html.slice(b.html.indexOf('>') + 1, b.html.lastIndexOf('</'));
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** A table in a card frame, every body cell labelled with its column name for phones. */
export function tableCard(table: string): string {
  if (/data-label=/.test(table)) return table;
  const head = table.match(/<thead>([\s\S]*?)<\/thead>/)?.[1] ?? '';
  const labels = [...head.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((m) => stripTags(m[1]));
  const body = table.replace(/<tbody>([\s\S]*?)<\/tbody>/, (_, rows: string) => '<tbody>' + rows.replace(/<tr>([\s\S]*?)<\/tr>/g, (__, cells: string) => {
    let k = 0;
    return '<tr>' + cells.replace(/<(td|th)\b([^>]*)>/g, (_m, t: string, a: string) => `<${t}${a} data-label="${esc(labels[k++] ?? '')}">`) + '</tr>';
  }) + '</tbody>');
  return `<div class="cp-table reveal" data-cols="${labels.length}">${body}</div>`;
}

const isHeading = (b: Block, ...levels: string[]) => levels.includes(b.tag);
const startsIllustrative = (b: Block) => /^illustrative examples?\b/i.test(b.text);
const isTableCard = (b: Block) => b.html.startsWith('<div class="cp-table');

/** Prose blocks with the table, callout and fit treatments applied. */
function treatProse(list: Block[]): Block[] {
  // a Markdown table, bare or in Health's .tablewrap, becomes a card table
  let bs = list.map((b) => {
    if (b.tag === 'table') return synth(tableCard(b.html));
    if (b.tag === 'div' && hasClass(b, 'tablewrap')) {
      const t = topBlocks(inner(b));
      if (t.length === 1 && t[0].tag === 'table') return synth(tableCard(t[0].html));
    }
    return b;
  });
  // "Illustrative example" passages: from the heading that introduces them (or the paragraph
  // that starts with the words) to the next heading; a passage with no heading of its own
  // takes the paragraph and the table or list directly under it.
  const out: Block[] = [];
  for (let i = 0; i < bs.length; i++) {
    const b = bs[i];
    const h3Start = isHeading(b, 'h3', 'h4') && (startsIllustrative(b) || (bs[i + 1]?.tag === 'p' && startsIllustrative(bs[i + 1])));
    const pStart = b.tag === 'p' && startsIllustrative(b);
    if (!h3Start && !pStart) { out.push(b); continue; }
    let j = i + 1;
    if (h3Start) while (j < bs.length && !isHeading(bs[j], 'h2', 'h3')) j++;
    else while (j < bs.length && (bs[j].tag === 'ul' || bs[j].tag === 'ol' || isTableCard(bs[j]))) j++;
    const html = bs.slice(i, j).map((x) => x.html).join('');
    out.push(synth(`<div class="cp-callout reveal"><span class="cp-callout-ic" aria-hidden="true"></span><div class="cp-callout-body">${html}</div></div>`));
    i = j - 1;
  }
  bs = out;
  // "A good fit:" + list and "Not a fit:" + list, side by side.
  const yes = bs.findIndex((b, i) => b.tag === 'p' && /^a good fit\b/i.test(b.text) && bs[i + 1]?.tag === 'ul');
  const no = bs.findIndex((b, i) => b.tag === 'p' && /^not a fit\b/i.test(b.text) && bs[i + 1]?.tag === 'ul');
  if (yes > -1 && no === yes + 2) {
    const col = (k: number, cls: string) => `<div class="cp-fit-col ${cls}">${bs[k].html}${bs[k + 1].html}</div>`;
    bs.splice(yes, 4, synth(`<div class="cp-fit reveal">${col(yes, 'is-yes')}${col(no, 'is-no')}</div>`));
  }
  return bs;
}

type Seg = { kind: 'prose'; b: Block } | { kind: 'raw'; html: string };

/**
 * The body regrouped into chapters. `figure` is placed after the heading `at.id` and
 * `at.skip` prose blocks below it (after the heading's first paragraph by default).
 */
export function chapterize(body: string, figure?: { html: string; at: FigureAt }): string {
  const segs: Seg[] = [];
  for (const b of topBlocks(body)) {
    if (b.tag === 'div' && hasClass(b, 'pg-prose')) for (const x of topBlocks(inner(b))) segs.push({ kind: 'prose', b: x });
    else segs.push({ kind: 'raw', html: b.html });
  }
  if (figure?.html.trim()) {
    let k = segs.findIndex((s) => s.kind === 'prose' && /^h[23]$/.test(s.b.tag) && attrOf(s.b.attrs, 'id') === figure.at.id);
    if (k < 0) {
      console.warn(`[family] figure anchor #${figure.at.id} not found; placed after the first chapter's opening paragraph`);
      k = segs.findIndex((s) => s.kind === 'prose' && s.b.tag === 'h2');
    }
    let left = figure.at.skip ?? 1;
    while (k > -1 && left > 0 && segs[k + 1]?.kind === 'prose' && !/^h[23]$/.test((segs[k + 1] as { b: Block }).b.tag)) { k++; left--; }
    segs.splice(k + 1, 0, { kind: 'raw', html: figure.html });
  }

  // Chapters: an H2 (with the small label paragraph just above it, if any) opens one;
  // so does a generated block or panel that carries its own H2.
  type Ch = { head: string; id?: string; segs: Seg[]; own?: boolean };
  const chapters: Ch[] = [{ head: '', segs: [] }];
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const next = segs[i + 1];
    if (s.kind === 'prose' && s.b.tag === 'h2') {
      chapters.push({ head: s.b.html, id: attrOf(s.b.attrs, 'id'), segs: [] });
      continue;
    }
    if (s.kind === 'prose' && s.b.tag === 'p' && hasClass(s.b, 'cp-kicker') && next?.kind === 'prose' && next.b.tag === 'h2') {
      chapters.push({ head: s.b.html + next.b.html, id: attrOf(next.b.attrs, 'id'), segs: [] });
      i++;
      continue;
    }
    const html = s.kind === 'prose' ? s.b.html : s.html;
    const h2 = /^<(?:div|section)\b/.test(html) && html.match(/<h2\b[^>]*\bid="([^"]+)"/);
    if (h2 && (s.kind === 'raw' || s.b.tag === 'div')) {
      chapters.push({ head: '', id: h2[1], segs: [s], own: true });
      continue;
    }
    chapters[chapters.length - 1].segs.push(s);
  }

  let n = 0;
  return chapters.map((c, ci) => {
    if (ci === 0 && !c.segs.length) return '';
    const parts: string[] = [];
    let run: Block[] = [];
    const flush = () => { if (run.length) parts.push(`<div class="pg-prose">${treatProse(run).map((b) => b.html).join('')}</div>`); run = []; };
    for (const s of c.segs) { if (s.kind === 'prose') run.push(s.b); else { flush(); parts.push(s.html); } }
    flush();
    if (ci === 0) return `<div class="cp-ch cp-intro">${parts.join('')}</div>`;
    const num = String(++n).padStart(2, '0');
    const head = c.head ? `<div class="cp-ch-head reveal">${c.head}</div>` : '';
    return `<section class="cp-ch${c.own ? ' cp-ch-own' : ''}" data-n="${num}"${c.id ? ` aria-labelledby="${c.id}"` : ''}>${head}${parts.join('')}</section>`;
  }).join('');
}

/** Every <h2 id="..."> in a rendered HTML string, in order: the default "On this page" list. */
export function headingsOf(html: string): { id: string; label: string }[] {
  const decode = (s: string) => s
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  return [...html.matchAll(/<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)]
    .map((m) => ({ id: m[1], label: decode(m[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim() }));
}
