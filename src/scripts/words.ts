// Read-as-you-scroll statements: each word of a [data-words] statement brightens in reading order
// as the page carries it up the screen. The split into word spans happens once, in idle time, with
// no layout read. Where the browser can drive the words from the scroll position itself (SDA), the
// CSS in surfaces.css does the rest; otherwise the statement's progress (--p) is written here.
import { lowPower, reduceMotion } from './env';
import { SDA, clamp, onMeasure, onScroll, pageTop, view } from './scroll';

const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 80));
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// a long statement would mean too many animated words on screen at once; it stays plain text
const words = reduceMotion || lowPower
  ? []
  : [...document.querySelectorAll<HTMLElement>('[data-words]')].filter((el) => el.textContent!.trim().split(/\s+/).length <= 80);

if (words.length) {
  idle(() => {
    for (const el of words) {
      const ws = el.textContent!.replace(/\s+/g, ' ').trim().split(' ');
      el.innerHTML = ws.map((w, i) => `<span class="wd" style="--i:${i}">${esc(w)}</span>`).join(' ');
      el.style.setProperty('--n', String(ws.length));
      el.dataset.split = '1';
    }
    if (SDA) return;

    /* ---------- without scroll-driven CSS: the statement's progress from the scroll position ---------- */
    // an end of the travel: a share of the passage (%), or a distance risen into the screen (vh)
    type End = { v: number; vh: boolean };
    type W = { el: HTMLElement; sub: HTMLElement; top: number; h: number; r0: End; r1: End; on: boolean; last: number };
    const list: W[] = words.map((el) => {
      const cs = getComputedStyle(el);
      const end = (name: string): End => { const s = cs.getPropertyValue(name).trim(); return { v: parseFloat(s), vh: s.endsWith('vh') }; };
      return { el, sub: el.closest<HTMLElement>('[data-words-scope]') ?? el, top: 0, h: 0, r0: end('--r0'), r1: end('--r1'), on: false, last: -1 };
    });
    // as a share of the passage (the card's height plus the screen's), as the CSS reads it
    const share = (e: End, w: W) => (e.vh ? (e.v / 100) * view.h / (w.h + view.h) : e.v / 100);
    const near = new IntersectionObserver(
      (entries) => {
        for (const e of entries) for (const w of list) if (w.sub === e.target) w.on = e.isIntersecting;
      },
      { rootMargin: '10% 0px 10% 0px' },
    );
    list.forEach((w) => near.observe(w.sub));
    onMeasure(() => {
      for (const w of list) { w.top = pageTop(w.sub); w.h = w.sub.offsetHeight; }
    });
    onScroll((y) => {
      for (const w of list) {
        if (!w.on) continue;
        // 0 when the top enters at the bottom of the screen, 1 when the bottom leaves at the top
        const cover = (y + view.h - w.top) / (w.h + view.h);
        const r0 = share(w.r0, w), r1 = share(w.r1, w);
        // past 1 too, so the last words (whose ramps run beyond --r1) finish
        const p = clamp((cover - r0) / (r1 - r0), 0, 2);
        if (Math.abs(p - w.last) > 0.004) {
          w.el.style.setProperty('--p', p.toFixed(3));
          w.last = p;
        }
      }
    });
  });
}
