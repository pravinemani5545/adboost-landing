// Cursor: a soft light follows the cursor across cards, and buttons lean gently toward it, with a
// rim light under the pill that follows the cursor too. When the cursor leaves, the button floats
// back on a longer spring (.release). On touch screens, buttons give the same small lean toward
// the finger as it presses.
// Positions are read once when the cursor arrives (and again only after a scroll), never per move.
import { finePointer, reduceMotion } from './env';

if (!reduceMotion) {
  const PULL = 0.22;   // share of the distance a button leans toward the cursor
  const MAX = 9;       // px
  const RELEASE = 700; // ms the return spring is given before the button goes back to the short curve

  const setLean = (el: HTMLElement, x: number, y: number) => {
    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);
  };
  const leanFrom = (el: HTMLElement, r: DOMRect, cx: number, cy: number, k = 1) => {
    const dx = (cx - (r.left + r.width / 2)) * PULL * k;
    const dy = (cy - (r.top + r.height / 2)) * PULL * 1.3 * k;
    setLean(el, Math.max(-MAX, Math.min(MAX, dx)), Math.max(-MAX, Math.min(MAX, dy)));
  };
  // the return: lean back to rest on the long curve; a quick re-entry cancels the pending reset
  const releasing = new WeakMap<HTMLElement, number>();
  const release = (el: HTMLElement) => {
    setLean(el, 0, 0);
    el.style.removeProperty('--bx');
    el.style.removeProperty('--by');
    el.classList.add('release');
    clearTimeout(releasing.get(el));
    releasing.set(el, window.setTimeout(() => el.classList.remove('release'), RELEASE));
  };

  if (finePointer) {
    let target: HTMLElement | null = null, targetRect: DOMRect | null = null;
    let card: HTMLElement | null = null, cardRect: DOMRect | null = null;
    let px = 0, py = 0, queued = false;

    // a scroll moves everything; re-read the rectangles on the next move
    addEventListener('scroll', () => { targetRect = cardRect = null; }, { passive: true });

    const frame = () => {
      queued = false;
      if (target) {
        targetRect ??= target.getBoundingClientRect();
        leanFrom(target, targetRect, px, py);
        // the rim light sits where the cursor is, as a share of the button's box
        target.style.setProperty('--bx', `${(((px - targetRect.left) / targetRect.width) * 100).toFixed(1)}%`);
        target.style.setProperty('--by', `${(((py - targetRect.top) / targetRect.height) * 100).toFixed(1)}%`);
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
        const t = e.target as HTMLElement;
        const btn = t.closest<HTMLElement>('.btn, [data-magnetic]');
        if (btn !== target) {
          if (target) release(target);
          target = btn;
          targetRect = null;
          if (btn) { clearTimeout(releasing.get(btn)); btn.classList.remove('release'); }
        }
        const c = t.closest<HTMLElement>('.card');
        if (c !== card) {
          card?.classList.remove('lit');
          card = c;
          cardRect = null;
          card?.classList.add('lit');
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
      card?.classList.remove('lit');
      target = card = null;
    });
  } else {
    addEventListener(
      'pointerdown',
      (e) => {
        const btn = (e.target as HTMLElement).closest<HTMLElement>('.btn, [data-magnetic]');
        if (!btn) return;
        leanFrom(btn, btn.getBoundingClientRect(), e.clientX, e.clientY, 0.6);
        const up = () => release(btn);
        addEventListener('pointerup', up, { once: true });
        addEventListener('pointercancel', up, { once: true });
      },
      { passive: true },
    );
  }
}
