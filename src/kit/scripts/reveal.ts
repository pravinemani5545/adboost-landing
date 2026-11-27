// Arrivals: [data-reveal] (and the legacy .reveal markup) rise and fade in as they scroll into
// view; [data-draw] draws its lines without being hidden. The markup is never rewritten: the
// script only adds .in, so every hidden state lives in CSS under html.js.motion.
// Legacy .drawline paths get pathLength="1" here, so they draw like .k-draw.
// When the observers are attached it sets window.__kitReady, which stops KitHead's failsafe.
//
// Self-contained on purpose (no imports): the Shell compiles it at build time and inlines it at the
// end of <body>, so content waiting to arrive never waits on a network request.

declare global {
  interface Window { __kitReady?: boolean }
}

const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const SIDE = '[data-reveal="left"], [data-reveal="right"]';
const ALL = '[data-reveal], .reveal, [data-draw], .drawline';

const motionOn = () => document.documentElement.classList.contains('motion');
function whenShown(fn: () => void) {
  if ((document as Document & { prerendering?: boolean }).prerendering) document.addEventListener('prerenderingchange', fn, { once: true });
  else fn();
}

function arrive(el: Element) {
  el.classList.add('in');
  if (el.classList.contains('drawline')) el.closest('.demo')?.classList.add('drawn');
}

if (motionOn()) {
  // legacy sparklines and process demos: a unit path length, so the CSS draw works at any size
  for (const p of $$<SVGGeometryElement>('.drawline')) if (!p.hasAttribute('pathLength')) p.setAttribute('pathLength', '1');

  // side rows arriving in one batch (page load, a fast scroll) fan in 60ms apart, capped at 300ms
  const STEP = 60, CAP = 5;
  const land = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    let k = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      if (el.matches(SIDE) && !el.style.getPropertyValue('--d')) el.style.setProperty('--d', `${Math.min(k++, CAP) * STEP}ms`);
      arrive(el);
      io.unobserve(el);
    }
  };
  // a touch before the element reaches the screen, so it is already arriving as it comes into view
  const io = new IntersectionObserver(land, { rootMargin: '0px 0px 4% 0px', threshold: 0 });
  // lines and legacy paths draw once a quarter of them is on screen
  const ioDraw = new IntersectionObserver(land, { rootMargin: '0px 0px -40px 0px', threshold: 0.25 });

  whenShown(() => {
    for (const el of $$(ALL)) (el.matches('.drawline, [data-draw]') ? ioDraw : io).observe(el);
  });

  // keyboard users never land inside something still waiting to arrive
  document.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement).closest?.('[data-reveal]:not(.in), .reveal:not(.in)');
    if (el) { (el as HTMLElement).style.setProperty('--d', '0ms'); arrive(el); }
  });
}

window.__kitReady = true;

export {};
