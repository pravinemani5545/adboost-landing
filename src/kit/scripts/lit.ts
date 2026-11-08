// Scroll-lit lines ([data-lit]): brightest at the middle of the screen. motion.css drives them
// where scroll-driven animations exist; this is the fallback, loaded by app.ts only when needed.
import { motionOn } from './env';
import { onMeasure, onScroll, pageTop, view } from './scroll';

const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];

if (motionOn()) {
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