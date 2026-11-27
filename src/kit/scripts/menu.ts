// Site chrome behaviour:
//  - nav: .scrolled / .elevated once the page leaves the top;
//  - desktop disclosure menus ([data-menu] groups with a button[aria-controls]): hover intent
//    (80ms in, 200ms out) on a fine pointer, click toggle, close on focus leaving, outside click
//    and Esc (which returns focus to the button). At most one open;
//  - phone sheet (#mnav, opened by [aria-controls="mnav"]): clip-path reveal, scrim, inert when
//    closed, scroll lock, focus to the first item, Esc closes and returns focus;
//  - sticky phone CTA (.mobile-cta): shows once the hero CTA (or the H1) has scrolled off, and
//    steps aside while any .cta-band, #cta, .cta-banner or [data-mcta-hide] is on screen.
import { finePointer } from './env';
import { lockScroll, onScroll } from './scroll';

const root = document.documentElement;
const nav = document.querySelector<HTMLElement>('.k-nav');

/* ---------- nav state ---------- */
if (nav) {
  let was = false;
  onScroll((y) => {
    const past = y > 6;
    if (past === was) return;
    was = past;
    nav.classList.toggle('scrolled', past);
    nav.classList.toggle('elevated', past);
  });
}

/* ---------- desktop disclosure menus ---------- */
const groups = [...document.querySelectorAll<HTMLElement>('[data-menu]')];
const toggleOf = (g: HTMLElement) => g.querySelector<HTMLButtonElement>('button[aria-controls]');
let openTimer = 0, closeTimer = 0;
function setMenu(g: HTMLElement, open: boolean) {
  if (open) for (const other of groups) if (other !== g) setMenu(other, false);
  g.classList.toggle('is-open', open);
  toggleOf(g)?.setAttribute('aria-expanded', String(open));
}
for (const g of groups) {
  const btn = toggleOf(g);
  if (!btn) continue;
  btn.addEventListener('click', () => setMenu(g, !g.classList.contains('is-open')));
  if (finePointer) {
    g.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      openTimer = window.setTimeout(() => setMenu(g, true), 80);
    });
    g.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(openTimer);
      closeTimer = window.setTimeout(() => setMenu(g, false), 200);
    });
  }
  g.addEventListener('focusout', (e) => {
    if (!g.contains(e.relatedTarget as Node)) setMenu(g, false);
  });
}
if (groups.length) {
  document.addEventListener('click', (e) => {
    for (const g of groups) if (!g.contains(e.target as Node)) setMenu(g, false);
  });
}

/* ---------- phone sheet ---------- */
const sheet = document.getElementById('mnav');
const burger = document.querySelector<HTMLButtonElement>('[aria-controls="mnav"]');
const scrim = document.querySelector<HTMLElement>('[data-scrim]');
function setSheet(open: boolean, focusBack = false) {
  if (!sheet || !burger) return;
  root.classList.toggle('k-sheet-open', open);
  sheet.classList.toggle('is-open', open);
  scrim?.classList.toggle('is-open', open);
  sheet.inert = !open;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  lockScroll(open);
  if (open) sheet.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true });
  else if (focusBack) burger.focus();
}
if (sheet && burger) {
  sheet.inert = true;
  burger.addEventListener('click', () => setSheet(!sheet.classList.contains('is-open')));
  scrim?.addEventListener('click', () => setSheet(false, true));
  sheet.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) setSheet(false);
  });
  addEventListener('resize', () => { if (innerWidth > 760 && sheet.classList.contains('is-open')) setSheet(false); }, { passive: true });
}

/* ---------- Esc: the open sheet first, then an open menu ---------- */
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (sheet?.classList.contains('is-open')) { setSheet(false, true); return; }
  const g = groups.find((x) => x.classList.contains('is-open'));
  if (g) { setMenu(g, false); toggleOf(g)?.focus(); }
});

/* ---------- sticky phone CTA ---------- */
const mcta = document.querySelector<HTMLElement>('.mobile-cta');
const anchor =
  document.querySelector('[data-mcta-anchor]') ??
  document.querySelector('main :is(.hero, .phero) .ctas') ??
  document.querySelector('main h1');
if (mcta && anchor) {
  let past = false;
  const over = new Set<Element>();
  const update = () => mcta.classList.toggle('show', past && over.size === 0);
  new IntersectionObserver(([e]) => {
    past = !e.isIntersecting && e.boundingClientRect.top < 0;
    update();
  }).observe(anchor);
  const hide = new IntersectionObserver((entries) => {
    for (const e of entries) (e.isIntersecting ? over.add(e.target) : over.delete(e.target));
    update();
  });
  document.querySelectorAll('.cta-band, #cta, .cta-banner, [data-mcta-hide]').forEach((el) => hide.observe(el));
}
