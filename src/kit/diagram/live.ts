// Client helper for calculators: move a live diagram without re-rendering it.
// Gauge (live="id") and Bars (marker.live="id") read the value from the CSS custom
// property --k-v on the element with that id, so this sets --k-v, the visible readout
// ([data-live-text]) and, on a meter, aria-valuenow / aria-valuetext.
//
//   import { setLive } from '../../kit/diagram/live';
//   setLive('ltv-gauge', ratio, `${ratio.toFixed(1)}:1`);
//
// Only feed it the visitor's own inputs run through the formula printed on the page.

export function setLive(target: string | HTMLElement, value: number, display: string, valueText?: string): void {
  const el = typeof target === 'string' ? document.getElementById(target) : target;
  if (!el || !Number.isFinite(value)) return;
  el.style.setProperty('--k-v', String(value));
  el.querySelectorAll<HTMLElement>('[data-live-text]').forEach((n) => { n.textContent = display; });
  if (el.getAttribute('role') === 'meter') {
    const lo = Number(el.getAttribute('aria-valuemin'));
    const hi = Number(el.getAttribute('aria-valuemax'));
    const now = Number.isFinite(lo) && Number.isFinite(hi) ? Math.min(hi, Math.max(lo, value)) : value;
    el.setAttribute('aria-valuenow', String(now));
    el.setAttribute('aria-valuetext', valueText ?? display);
  }
}
