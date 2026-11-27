// What this device can and should do. KitHead sets the classes on <html> before first paint
// (js, motion, lowpower, pre); everything else keys off them, so CSS and scripts always agree.
const root = document.documentElement;
const mm = (q: string) => matchMedia(q).matches;

/** Motion is on: not reduced motion, and the failsafe has not switched it off. Read live. */
export const motionOn = () => root.classList.contains('motion');
export const reduceMotion = mm('(prefers-reduced-motion: reduce)');
/** Older or busy devices: lighter versions of the heavy effects (no pointer, dots, words, video). */
export const lowPower = root.classList.contains('lowpower');
/** A mouse or trackpad: hover effects, magnetic buttons, cursor light. */
export const finePointer = mm('(hover: hover) and (pointer: fine)');
/** Pointer effects run only with a fine pointer, motion on and enough power. */
export const pointerFx = () => finePointer && motionOn() && !lowPower;

/** Runs `fn` once the page is on screen: a page prepared ahead of a click waits until it is opened. */
export function whenShown(fn: () => void) {
  if ((document as Document & { prerendering?: boolean }).prerendering) document.addEventListener('prerenderingchange', fn, { once: true });
  else fn();
}

/** Runs `fn` in idle time (or soon, where idle callbacks are missing). */
export const idle = (fn: () => void, timeout = 1200) =>
  'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout }) : setTimeout(fn, 60);
