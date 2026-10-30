// What this device can and should do. Read once; everything else keys off these.
const mm = (q: string) => matchMedia(q).matches;
const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

export const reduceMotion = mm('(prefers-reduced-motion: reduce)');
/** A mouse or trackpad: hover effects, magnetic buttons, cursor light. */
export const finePointer = mm('(hover: hover) and (pointer: fine)');
/** Older or busy phones get lighter versions of the heavy effects. */
export const lowPower =
  (nav.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory || 8) <= 4 || !!nav.connection?.saveData;
export const isPhone = () => innerWidth < 640;

/** Runs `fn` once the page is on screen: a page prepared ahead of a click waits until it is opened. */
export function whenShown(fn: () => void) {
  if ((document as Document & { prerendering?: boolean }).prerendering) document.addEventListener('prerenderingchange', fn, { once: true });
  else fn();
}
