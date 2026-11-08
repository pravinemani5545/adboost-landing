// Count-up: [data-count] elements carry their final value, rendered by the server. Only the ones
// first seen below the fold animate, from 0 up to the number already printed (prefix, suffix,
// decimals and thousands separators kept). Only the first number in the element moves; any
// markup inside it stays. The element's width is locked first, so nothing around it shifts.
// data-count-delay="<ms>" holds the count at 0 for that long once the element is on screen
// (e.g. an equation's result waits for its terms to land).
import { motionOn, whenShown } from './env';

const NUM = /\d[\d,]*(?:\.\d+)?/;

/** A CSS time token in ms. The minifier rewrites "1300ms" as "1.3s", so read the unit. */
function durationMs(v: string, fallback: number): number {
  const n = parseFloat(v);
  if (!isFinite(n)) return fallback;
  return /ms\s*$/.test(v) ? n : /s\s*$/.test(v) ? n * 1000 : n;
}

function firstNumberNode(el: Element): Text | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if (NUM.test(n.nodeValue ?? '')) return n as Text;
  return null;
}

function run(el: HTMLElement) {
  const node = firstNumberNode(el);
  if (!node) return;
  const text = node.nodeValue!;
  const m = text.match(NUM)!;
  const raw = m[0];
  const target = parseFloat(raw.replace(/,/g, ''));
  if (!isFinite(target) || target === 0) return;
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  const commas = raw.includes(',');
  const before = text.slice(0, m.index), after = text.slice(m.index! + raw.length);
  const fmt = (v: number) => {
    const s = v.toFixed(decimals);
    if (!commas) return s;
    const [i, d] = s.split('.');
    return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? `.${d}` : '');
  };
  // lock the width at the final value before the digits change
  el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  const dur = durationMs(getComputedStyle(document.documentElement).getPropertyValue('--k-d-count'), 1300);
  const delay = Math.max(0, parseFloat(el.dataset.countDelay ?? '') || 0);
  let t0 = 0;
  const tick = (t: number) => {
    t0 ||= t;
    const k = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    node.nodeValue = k < 1 ? before + fmt(target * eased) + after : text;
    if (k < 1) requestAnimationFrame(tick);
  };
  node.nodeValue = before + fmt(0) + after;
  if (delay) setTimeout(() => requestAnimationFrame(tick), delay);
  else requestAnimationFrame(tick);
}

const els = [...document.querySelectorAll<HTMLElement>('[data-count]')];
if (els.length && motionOn()) {
  whenShown(() => {
    // one layout read for all of them: only those starting below the fold count
    const fold = innerHeight;
    const below = els.filter((el) => el.getBoundingClientRect().top > fold);
    if (!below.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          run(e.target as HTMLElement);
        }
      },
      { threshold: 0.6 },
    );
    below.forEach((el) => io.observe(el));
  });
}
