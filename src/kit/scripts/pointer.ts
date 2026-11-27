// Cursor effects, on a mouse or trackpad with motion on and enough power only:
//  - [data-magnetic] (hero CTA, CTA band, nav Book) leans toward the cursor through the CSS
//    translate property, and floats back on the soft spring (.k-release) when it leaves;
//  - a soft light follows the cursor inside .k-card--link and [data-k-light] (.k-lit, --lx/--ly).
// Rectangles are read once when the cursor arrives (and again only after a scroll), never per move.
import { pointerFx } from './env';

if (pointerFx()) {
  const PULL = 0.22;   // share of the distance a button leans toward the cursor
  const MAX = 8;       // px
  const RELEASE = 700; // ms on the long return spring

  const setLean = (el: HTMLElement, x: number, y: number) => {
    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);
  };
  const releasing = new WeakMap<HTMLElement, number>();
  const release = (el: HTMLElement) => {
    setLean(el, 0, 0);
    el.classList.add('k-release');
    clearTimeout(releasing.get(el));
    releasing.set(el, window.setTimeout(() => el.classList.remove('k-release'), RELEASE));
  };

  let target: HTMLElement | null = null, targetRect: DOMRect | null = null;
  let card: HTMLElement | null = null, cardRect: DOMRect | null = null;
  let px = 0, py = 0, queued = false;

  addEventListener('scroll', () => { targetRect = cardRect = null; }, { passive: true });

  const frame = () => {
    queued = false;
    if (target) {
      targetRect ??= target.getBoundingClientRect();
      const dx = (px - (targetRect.left + targetRect.width / 2)) * PULL;
      const dy = (py - (targetRect.top + targetRect.height / 2)) * PULL * 1.3;
      setLean(target, Math.max(-MAX, Math.min(MAX, dx)), Math.max(-MAX, Math.min(MAX, dy)));
    }
    if (card) {
      cardRect ??= card.getBoundingClientRect();
      card.style.setProperty('--lx', `${(px - cardRect.left).toFixed(0)}px`);
      card.style.setProperty('--ly', `${(py - cardRect.top).toFixed(0)}px`);
    }
  };

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX;
      py = e.clientY;
      const t = e.target as Element;
      const mag = t.closest?.<HTMLElement>('[data-magnetic]') ?? null;
      if (mag !== target) {
        if (target) release(target);
        target = mag;
        targetRect = null;
        if (mag) { clearTimeout(releasing.get(mag)); mag.classList.remove('k-release'); }
      }
      const c = t.closest?.<HTMLElement>('.k-card--link, [data-k-light]') ?? null;
      if (c !== card) {
        card?.classList.remove('k-lit');
        card = c;
        cardRect = null;
        card?.classList.add('k-lit');
      }
      if ((target || card) && !queued) {
        queued = true;
        requestAnimationFrame(frame);
      }
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => {
    if (target) release(target);
    card?.classList.remove('k-lit');
    target = card = null;
  });
}
