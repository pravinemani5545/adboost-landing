// Read-as-you-scroll statement: each word of the page's one [data-words] element brightens in
// reading order as the page carries it up the screen. The split walks text nodes, so inline
// markup (.serif accents, links, <br>) survives; it happens once, in idle time, with no layout
// read. Where scroll-driven CSS exists, motion.css does the rest; otherwise --p is written here.
// Skipped with reduced motion, on low-power devices and for statements over 80 words.
import { idle, lowPower, motionOn } from './env';
import { SDA, clamp, onMeasure, onScroll, pageTop, view } from './scroll';

const el = document.querySelector<HTMLElement>('[data-words]');
const count = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

if (el && motionOn() && !lowPower && count(el.textContent ?? '') <= 80) {
  idle(() => {
    let i = 0;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) if ((n.nodeValue ?? '').trim()) nodes.push(n as Text);
    for (const node of nodes) {
      const frag = document.createDocumentFragment();
      for (const part of node.nodeValue!.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { frag.append(part); continue; }
        const w = document.createElement('span');
        w.className = 'k-wd';
        w.style.setProperty('--i', String(i++));
        w.textContent = part;
        frag.append(w);
      }
      node.replaceWith(frag);
    }
    el.style.setProperty('--n', String(i));
    el.dataset.split = '1';
    if (SDA) return;

    /* ---------- without scroll-driven CSS: the statement's progress from the scroll position ---------- */
    const cs = getComputedStyle(el);
    const r0 = parseFloat(cs.getPropertyValue('--r0')) / 100 || 0.08;
    const r1 = parseFloat(cs.getPropertyValue('--r1')) / 100 || 0.56;
    let top = 0, h = 0, on = false, last = -1;
    new IntersectionObserver(([e]) => { on = e.isIntersecting; }, { rootMargin: '10% 0px 10% 0px' }).observe(el);
    onMeasure(() => { top = pageTop(el); h = el.offsetHeight; });
    onScroll((y) => {
      if (!on) return;
      // 0 when the top enters at the bottom of the screen, 1 when the bottom leaves at the top
      const cover = (y + view.h - top) / (h + view.h);
      const p = clamp((cover - r0) / (r1 - r0), 0, 2);
      if (Math.abs(p - last) > 0.004) {
        el.style.setProperty('--p', p.toFixed(3));
        last = p;
      }
    });
  }, 1500);
}
