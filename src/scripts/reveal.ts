// Arrivals: sections and lines rise and fade in as they scroll into view, on a spring.
// Scroll-lit lines: large statements brighten at the middle of the screen and dim as they leave.
// Where the browser supports scroll-driven CSS (SDA), the lit lines run entirely in CSS.
import { reduceMotion, whenShown } from './env';
import { SDA, onMeasure, onScroll, pageTop, view } from './scroll';

const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(fn, 60));

/* ---------- split large statements into lines, so they can arrive line by line ----------
   Done once, in idle time, for every statement at once (one layout read for the lot), never mid-scroll. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const originals = new WeakMap<HTMLElement, string>();
function split(els: HTMLElement[]) {
  // write: every word in its own span
  for (const el of els) {
    const html = originals.get(el) ?? el.innerHTML;
    originals.set(el, html);
    el.innerHTML = html
      .split(/<br\s*\/?>/i)
      .map((part) => part.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).map((w) => `<span class="w">${w}</span>`).join(' '))
      .join('<br>');
  }
  // read: group the words by line (a single layout for all of them)
  const groups = els.map((el) => {
    const lines: string[][] = [];
    let top = -1;
    for (const node of el.childNodes) {
      if (node.nodeName === 'BR') { top = -1; continue; }
      if (!(node instanceof HTMLElement)) continue;
      if (node.offsetTop !== top) { lines.push([]); top = node.offsetTop; }
      lines[lines.length - 1].push(node.textContent!);
    }
    return lines;
  });
  // write: one span per line
  els.forEach((el, i) => {
    el.innerHTML = groups[i].map((words, l) => `<span class="ln"><span style="--l:${l}">${esc(words.join(' '))}</span></span>`).join('');
    el.dataset.split = '1';
  });
}

if (!reduceMotion) {
  const SIDE = '[data-reveal="side"], [data-reveal="left"]';
  // several side rows arriving in one batch (page load, a fast scroll, a tall screen) fan in 60ms
  // apart in document order, capped at 300ms; a lone row starts at once
  const STEP = 60, CAP = 5;
  const land = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    let k = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      if (el.matches(SIDE)) el.style.setProperty('--d', `${Math.min(k++, CAP) * STEP}ms`);
      el.classList.add('in');
      io.unobserve(el);
    }
  };
  // a touch before the element reaches the screen, so it is already arriving as it comes into view
  const arrive = new IntersectionObserver(land, { rootMargin: '0px 0px 4% 0px', threshold: 0 });
  // side rows start exactly at the screen's edge, so scrolling a list gives a natural cascade
  const arriveSide = new IntersectionObserver(land, { rootMargin: '0px', threshold: 0 });
  const watch = (el: Element) => (el.matches(SIDE) ? arriveSide : arrive).observe(el);
  whenShown(() => $$('[data-reveal]').forEach(watch));
  // keyboard users must never land inside something still waiting to arrive
  document.addEventListener('focusin', (e) => (e.target as HTMLElement).closest?.('[data-reveal]:not(.in)')?.classList.add('in'));

  const statements = $$('[data-lines]');
  if (statements.length) {
    document.fonts.ready.then(() =>
      idle(() => {
        split(statements);
        whenShown(() => statements.forEach((el) => arrive.observe(el)));
        // if the width changes, the line breaks change: split again (in idle time)
        let w = innerWidth;
        onMeasure(() => {
          if (innerWidth === w) return;
          w = innerWidth;
          idle(() => split(statements.filter((el) => !el.classList.contains('in'))));
        });
      }),
    );
  }

  /* ---------- scroll-lit, for browsers without scroll-driven CSS ---------- */
  if (!SDA) {
    type Lit = { el: HTMLElement; mid: number; on: boolean; last: number };
    const lits: Lit[] = $$('[data-lit]').map((el) => ({ el, mid: 0, on: false, last: -1 }));
    if (lits.length) {
      const near = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const l = lits.find((x) => x.el === e.target);
            if (l) l.on = e.isIntersecting;
          }
        },
        { rootMargin: '25% 0px 25% 0px' },
      );
      lits.forEach((l) => near.observe(l.el));
      onMeasure(() => {
        for (const l of lits) l.mid = pageTop(l.el) + l.el.offsetHeight / 2;
      });
      onScroll((y) => {
        const half = view.h / 2;
        for (const l of lits) {
          if (!l.on) continue;
          const d = Math.abs(l.mid - y - half) / half;
          const o = Math.max(0.22, Math.min(1, 1 - (d - 0.16) * 1.1));
          if (Math.abs(o - l.last) > 0.01) {
            l.el.style.opacity = o.toFixed(2);
            l.last = o;
          }
        }
      });
    }
  }
}
