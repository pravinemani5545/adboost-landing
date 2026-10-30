// Dot grid: on sections marked data-dots, a disc of brighter dots follows the cursor.
// The section's position is read once when the cursor arrives (and again only after a scroll),
// never per move; the disc itself moves by transform alone (see surfaces.css).
import { finePointer, reduceMotion } from './env';

if (finePointer && !reduceMotion && document.querySelector('[data-dots]')) {
  let lit: HTMLElement | null = null, layer: HTMLElement | null = null, rect: DOMRect | null = null;
  let px = 0, py = 0, queued = false;

  addEventListener('scroll', () => { rect = null; }, { passive: true });

  const frame = () => {
    queued = false;
    if (!lit || !layer) return;
    rect ??= lit.getBoundingClientRect();
    layer.style.setProperty('--dx', `${(px - rect.left).toFixed(0)}px`);
    layer.style.setProperty('--dy', `${(py - rect.top).toFixed(0)}px`);
  };
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX;
      py = e.clientY;
      const s = (e.target as HTMLElement).closest?.<HTMLElement>('[data-dots]') ?? null;
      if (s !== lit) {
        lit?.classList.remove('lit');
        lit = s;
        layer = s?.querySelector<HTMLElement>(':scope > .dots') ?? null;
        rect = null;
        lit?.classList.add('lit');
      }
      if (lit && !queued) {
        queued = true;
        requestAnimationFrame(frame);
      }
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => {
    lit?.classList.remove('lit');
    lit = layer = null;
  });
}
