// One scroll engine for the whole page, on the browser's own scrolling: it runs off the main thread,
// so it never stutters, even on a busy machine. Where the browser supports scroll-driven CSS
// animations, the scroll effects run there too (see SDA); the few things left subscribe here and
// read layout measured on resize, never per frame.

type ScrollFn = (y: number) => void;
const subs = new Set<ScrollFn>();
const measures = new Set<() => void>();

export const view = { y: window.scrollY, h: innerHeight, w: innerWidth };

/** Scroll-driven CSS animations are available, so scroll effects run on the compositor, not in JS. */
export const SDA = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');

let ticking = false;
function run() {
  ticking = false;
  view.y = window.scrollY;
  for (const fn of subs) fn(view.y);
}
addEventListener(
  'scroll',
  () => {
    if (ticking || !subs.size) return;
    ticking = true;
    requestAnimationFrame(run);
  },
  { passive: true },
);

/** Call fn on scroll (at most once a frame) and once right away. Returns an unsubscribe. */
export function onScroll(fn: ScrollFn) {
  subs.add(fn);
  fn(view.y);
  return () => subs.delete(fn);
}

/** Call fn whenever layout may have changed (resize, fonts, late images). */
export function onMeasure(fn: () => void) {
  measures.add(fn);
  fn();
  return () => measures.delete(fn);
}

/** Hold the page still behind a menu or panel. */
export function lockScroll(on: boolean) {
  document.documentElement.classList.toggle('scroll-locked', on);
}

/** Absolute top of an element in the document, read once at measure time. */
export const pageTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

export const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => t * t * (3 - 2 * t);

let lastW = innerWidth;
let timer = 0;
function remeasure() {
  view.w = innerWidth;
  // Phones resize as the browser toolbar slides away mid-scroll; ignore those small height changes.
  const toolbarOnly = innerWidth === lastW && Math.abs(innerHeight - view.h) < 160 && matchMedia('(hover: none)').matches;
  if (!toolbarOnly) view.h = innerHeight;
  lastW = innerWidth;
  view.y = window.scrollY;
  for (const fn of measures) fn();
  for (const fn of subs) fn(view.y);
}
const schedule = () => {
  clearTimeout(timer);
  timer = window.setTimeout(remeasure, 150);
};
addEventListener('resize', schedule, { passive: true });
document.fonts?.ready.then(remeasure);
new ResizeObserver(schedule).observe(document.body);
