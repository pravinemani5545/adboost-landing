// The kit's script entry, loaded by the Shell on every page (reveal.ts is loaded on its own, so
// Astro inlines it). The core is small and always runs; the heavier effects load as separate
// chunks only when the page has something for them.
import { SDA } from './scroll';
import './count';
import './menu';
import './pointer';
import './toc';

if (document.querySelector('[data-dots]')) import('./dots');
if (document.querySelector('[data-words]')) import('./words');
if (document.querySelector('video[data-src]')) import('./media');
if (!SDA && document.querySelector('[data-lit]')) import('./lit');

// A .tablewrap that scrolls sideways (a wide table on a phone) becomes a focusable region named
// by its column heads, so keyboard users can scroll it; one that fits stays out of the tab order.
const wraps = [...document.querySelectorAll<HTMLElement>('.tablewrap')];
if (wraps.length) {
  const mark = () => wraps.forEach((w) => {
    const scrolls = w.scrollWidth > w.clientWidth + 1;
    if (scrolls && !w.hasAttribute('tabindex')) {
      const heads = [...w.querySelectorAll('thead th')].map((th) => th.textContent?.trim()).filter(Boolean);
      w.tabIndex = 0;
      w.setAttribute('role', 'region');
      w.setAttribute('aria-label', heads.length ? `Table: ${heads.join(', ')}` : 'Table');
    } else if (!scrolls && w.getAttribute('role') === 'region') {
      w.removeAttribute('tabindex');
      w.removeAttribute('role');
      w.removeAttribute('aria-label');
    }
  });
  mark();
  new ResizeObserver(mark).observe(document.documentElement);
}
