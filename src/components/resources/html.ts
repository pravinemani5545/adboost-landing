// HTML helpers for the resource templates (blog posts, glossary terms). They read the HTML the
// build already rendered (Markdown output, the glossary's body strings) and never change a word of
// it: they find the FAQ, the opening paragraph, and add classes, roles and data attributes the
// styles hang on (resources.css). Every transform is a string pass over well-formed output.

const NAMED: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** Decode the entities rendered HTML uses (named, decimal, hex). */
export const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, e) => NAMED[e]);

/** An HTML fragment as the text a reader sees: tags out, entities decoded, spaces collapsed. */
export const textOf = (html: string) => decode(html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * The post's "FAQ" section as question/answer pairs, read from the rendered HTML: each h3 under
 * the FAQ h2 and the paragraph right under it. The FAQPage JSON-LD is built from this, so it
 * carries exactly the text the page shows (typographic quotes included).
 */
export function faqFromHtml(html: string): { q: string; a: string }[] {
  const section = /<h2\b[^>]*>\s*FAQ\s*<\/h2>([\s\S]*?)(?=<h2\b|$)/.exec(html.replace(/<!--[\s\S]*?-->/g, ''))?.[1];
  if (!section) return [];
  return [...section.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)]
    .map((m) => ({ q: textOf(m[1]), a: textOf(m[2]) }))
    .filter((f) => f.q && f.a);
}

/** Split the opening paragraph off rendered HTML: [lead paragraph, the rest]. */
export function splitLead(html: string): [string, string] {
  const m = /^\s*(<p>[\s\S]*?<\/p>)/.exec(html);
  return m ? [m[1], html.slice(m[0].length)] : ['', html];
}

/* ---------- top-level blocks ---------- */

interface Block { tag: string; start: number; end: number; open: string }

/** Every element of the given tags at the top level of the fragment (not nested in another one of
 *  them), with balanced nesting. */
function topLevel(html: string, tags: string[]): Block[] {
  const out: Block[] = [];
  const re = new RegExp(`<(/?)(${tags.join('|')})\\b[^>]*>`, 'g');
  let depth = 0;
  let cur: { tag: string; start: number; open: string } | null = null;
  for (const m of html.matchAll(re)) {
    const closing = m[1] === '/';
    if (!closing) {
      if (depth === 0) cur = { tag: m[2], start: m.index!, open: m[0] };
      depth++;
    } else {
      depth--;
      if (depth === 0 && cur) {
        out.push({ ...cur, end: m.index! + m[0].length });
        cur = null;
      }
    }
  }
  return out;
}

/** The direct <li> children of a list's inner HTML. */
function items(inner: string): string[] {
  return topLevel(inner, ['li']).map((b) => inner.slice(b.start, b.end));
}

const addClass = (open: string, cls: string) =>
  /\bclass="/.test(open) ? open.replace(/\bclass="/, `class="${cls} `) : open.replace(/^<(\w+)/, `<$1 class="${cls}"`);

/** The text of the element that ends right before index i (a heading or paragraph). */
function previousText(html: string, i: number): string {
  const before = html.slice(0, i).trimEnd();
  const m = /<(h[2-4]|p)\b[^>]*>([\s\S]*?)<\/\1>$/.exec(before);
  return m ? textOf(m[2]) : '';
}

/* ---------- tables ---------- */

/** Tables as cards: each table in the family's card frame (.cp-table, src/styles/family/content.css),
 *  each body cell with its column head as data-label (the stacked phone layout prints it), and
 *  explicit roles that keep the table semantics when CSS changes the display. */
export function tables(html: string): string {
  return html.replace(/<table\b[^>]*>[\s\S]*?<\/table>/g, (table) => {
    const heads = [...(/<thead>([\s\S]*?)<\/thead>/.exec(table)?.[1] ?? '').matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((m) => textOf(m[1]));
    const cols = heads.length;
    let t = table
      .replace(/<table\b([^>]*)>/, (_, a) => `<table${a} role="table" data-cols="${cols}">`)
      .replace(/<(thead|tbody)>/g, '<$1 role="rowgroup">')
      .replace(/<tr>/g, '<tr role="row">');
    t = t.replace(/(<thead[^>]*>)([\s\S]*?)(<\/thead>)/, (_, a, inner, z) => a + inner.replace(/<th\b(?![^>]*\brole=)/g, '<th role="columnheader"') + z);
    t = t.replace(/(<tbody[^>]*>)([\s\S]*?)(<\/tbody>)/, (_, a, inner, z) =>
      a +
      inner.replace(/<tr role="row">([\s\S]*?)<\/tr>/g, (_row: string, cells: string) => {
        let i = 0;
        const out = cells.replace(/<(td|th)\b([^>]*)>/g, (_c: string, tag: string, rest: string) => {
          const label = heads[i] ?? '';
          const role = tag === 'th' ? (/scope="row"/.test(rest) ? 'rowheader' : 'columnheader') : 'cell';
          i++;
          return `<${tag}${rest}${/\brole=/.test(rest) ? '' : ` role="${role}"`}${label ? ` data-label="${attr(label)}"` : ''}>`;
        });
        return `<tr role="row">${out}</tr>`;
      }) +
      z,
    );
    return `<div class="cp-table reveal" data-cols="${cols}">${t}</div>`;
  });
}

/* ---------- lists ---------- */

/** Lists whose every item opens with a bold lead-in become key-point cards (ul) or a step track
 *  (ol); a list right after a heading or line that names a checklist gets check boxes. */
export function lists(html: string): string {
  const blocks = topLevel(html, ['ul', 'ol']);
  let out = '';
  let last = 0;
  for (const b of blocks) {
    const el = html.slice(b.start, b.end);
    const inner = el.slice(b.open.length, el.length - `</${b.tag}>`.length);
    const lis = items(inner);
    const leads = lis.length >= 2 && lis.every((li) => /^<li\b[^>]*>\s*(?:<p>\s*)?<strong>/.test(li));
    const check = b.tag === 'ul' && /checklist/i.test(previousText(html, b.start));
    let cls = '';
    if (check) cls = 'rs-check';
    else if (leads) cls = b.tag === 'ul' ? 'rs-keys' : 'rs-steps';
    out += html.slice(last, b.start) + (cls ? addClass(b.open, cls) + el.slice(b.open.length) : el);
    last = b.end;
  }
  return out + html.slice(last);
}

/* ---------- callouts ---------- */

const EXAMPLE = /illustrative example/i;
const EXAMPLE_HEAD = /\b(illustrative|worked) example\b/i;

/** A paragraph that introduces an illustrative example (in its opening words) becomes an example
 *  callout; when it ends with a colon, the table or list it introduces goes in with it. An h3 that
 *  names a worked or illustrative example ("A worked example") becomes one with everything under it
 *  up to the next h2 or h3, the heading as the card's title (as adboost-media's post-html.ts does).
 *  Never inside the FAQ (answers stay plain Q and A). */
export function examples(html: string): string {
  const blocks = topLevel(html, ['p', 'div', 'ul', 'ol', 'blockquote', 'h2', 'h3', 'h4', 'table']);
  let out = '';
  let last = 0;
  let inFaq = false;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const el = html.slice(b.start, b.end);
    if (b.tag === 'h2') inFaq = /^\s*FAQ\s*$/.test(textOf(el));
    if (!inFaq && b.tag === 'h3' && EXAMPLE_HEAD.test(textOf(el))) {
      let j = i + 1;
      while (j < blocks.length && blocks[j].tag !== 'h2' && blocks[j].tag !== 'h3') j++;
      const end = blocks[j - 1].end;
      out += html.slice(last, b.start) + `<div class="rs-callout rs-callout--example rs-callout--section">${html.slice(b.start, end)}</div>`;
      last = end;
      i = j - 1;
      continue;
    }
    if (inFaq || b.tag !== 'p') continue;
    const text = textOf(el);
    if (!EXAMPLE.test(text.slice(0, 90))) continue;
    let end = b.end;
    const next = blocks[i + 1];
    if (/:\s*$/.test(text) && next && ['ul', 'ol', 'div', 'table'].includes(next.tag) && !html.slice(b.end, next.start).trim()) {
      end = next.end;
      i++;
    }
    out += html.slice(last, b.start) + `<div class="rs-callout rs-callout--example"><span class="rs-callout__k" aria-hidden="true">Illustrative example</span>${html.slice(b.start, end)}</div>`;
    last = end;
  }
  return out + html.slice(last);
}

/** Each FAQ question and its answer as one card (the h3 and its paragraph, unchanged). */
export function faqCards(html: string): string {
  return html.replace(/(<h2\b[^>]*>\s*FAQ\s*<\/h2>)([\s\S]*?)(?=<h2\b|$)/, (_, h2, body) =>
    h2 + body.replace(/(<h3\b[^>]*>[\s\S]*?<\/h3>)\s*(<p>[\s\S]*?<\/p>)/g, '<div class="rs-qa">$1$2</div>'),
  );
}

/** Everything a post body gets, in order. */
export const enhanceProse = (html: string) => faqCards(examples(lists(tables(html))));
