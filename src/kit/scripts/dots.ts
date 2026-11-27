// Dot spotlight: on [data-dots] hosts, a disc of brighter dots follows the cursor across the
// host's .k-bg--dots layer. The host's position is read once when the cursor arrives (and again
// only after a scroll), never per move; the disc moves by transform alone (layers.css).
// Loaded by app.ts only when the page has a [data-dots] host.
import { pointerFx } from './env';

if (pointerFx()) {
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
      const s = (e.target as Element).closest?.<HTMLElement>('[data-dots]') ?? null;
      if (s !== lit) {
        lit?.classList.remove('k-lit');
        lit = s;
        layer = s?.querySelector<HTMLElement>(':scope > .k-bg--dots') ?? null;
        rect = null;
        lit?.classList.add('k-lit');
      }
      if (lit && !queued) {
        queued = true;
        requestAnimationFrame(frame);
      }
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => {
    lit?.classList.remove('k-lit');
    lit = layer = null;
  });
}
