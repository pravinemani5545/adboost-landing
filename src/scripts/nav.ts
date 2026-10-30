// Navigation: the logo and links switch between PAPER and FRAME as sections pass beneath them,
// the mega menus, the phone menu, and the sticky phone bar stepping aside.
import { lockScroll, onMeasure, view } from './scroll';
import { finePointer } from './env';

const root = document.documentElement;
const header = document.querySelector<HTMLElement>('.site-nav');

/* ---------- colour handoff ---------- */
// Each section says what sits under the nav: data-nav="frame" (PAPER ink on a FRAME bar),
// "paper" (FRAME ink on a PAPER bar) or "media" (PAPER ink, no bar, over video and photos).
// Sections may nest (a FRAME band inside a PAPER page), so the innermost one under the line wins:
// the last in document order among those crossing it.
const sections = [...document.querySelectorAll<HTMLElement>('[data-nav]:not(html)')];
const under = new Set<Element>();
let io: IntersectionObserver | null = null;
onMeasure(() => {
  io?.disconnect();
  under.clear();
  const line = Math.round((header?.offsetHeight ?? 76) / 2);
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) (e.isIntersecting ? under.add(e.target) : under.delete(e.target));
      const top = sections.findLast((s) => under.has(s));
      if (top) root.dataset.nav = top.dataset.nav;
    },
    // a one-pixel band through the middle of the nav
    { rootMargin: `-${line}px 0px -${Math.max(0, view.h - line - 1)}px 0px` },
  );
  sections.forEach((s) => io!.observe(s));
});

/* ---------- mega menus: one per group, at most one open ---------- */
const items = [...document.querySelectorAll<HTMLElement>('.nav-item.has-menu')];
let closeTimer = 0;
function setMenu(item: HTMLElement, open: boolean) {
  const toggle = item.querySelector<HTMLButtonElement>(':scope > button');
  if (open) for (const other of items) if (other !== item) setMenu(other, false);
  item.classList.toggle('open', open);
  toggle?.setAttribute('aria-expanded', String(open));
  root.classList.toggle('mega-open', items.some((i) => i.classList.contains('open')));
}
for (const item of items) {
  const toggle = item.querySelector<HTMLButtonElement>(':scope > button');
  if (!toggle) continue;
  toggle.addEventListener('click', () => setMenu(item, !item.classList.contains('open')));
  if (finePointer) {
    item.addEventListener('pointerenter', () => { clearTimeout(closeTimer); setMenu(item, true); });
    item.addEventListener('pointerleave', () => { closeTimer = window.setTimeout(() => setMenu(item, false), 220); });
  }
  item.addEventListener('focusout', (e) => {
    if (!item.contains(e.relatedTarget as Node)) setMenu(item, false);
  });
}
if (items.length) {
  addEventListener('keydown', (e) => {
    const open = items.find((i) => i.classList.contains('open'));
    if (e.key === 'Escape' && open) { setMenu(open, false); open.querySelector<HTMLButtonElement>(':scope > button')?.focus(); }
  });
  document.addEventListener('click', (e) => {
    for (const item of items) if (!item.contains(e.target as Node)) setMenu(item, false);
  });
}

/* ---------- the sticky phone bar steps aside while another of its buttons is on screen ---------- */
const bar = document.querySelector('.mobile-bar');
const barHref = bar?.querySelector('a')?.getAttribute('href');
if (bar && barHref) {
  const shown = new Set<Element>();
  const watch = new IntersectionObserver((entries) => {
    for (const e of entries) (e.isIntersecting ? shown.add(e.target) : shown.delete(e.target));
    root.classList.toggle('cta-in-view', shown.size > 0);
  });
  document.querySelectorAll(`main .btn[href="${barHref}"]`).forEach((b) => watch.observe(b));
}

/* ---------- phone menu ---------- */
const menuBtn = document.querySelector<HTMLButtonElement>('.nav-menu-btn');
const sheet = document.getElementById('mobile-menu');
function setSheet(open: boolean) {
  if (!menuBtn || !sheet) return;
  root.classList.toggle('sheet-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.querySelector('.when-closed')!.toggleAttribute('hidden', open);
  menuBtn.querySelector('.when-open')!.toggleAttribute('hidden', !open);
  sheet.inert = !open;
  lockScroll(open);
  if (open) sheet.querySelector<HTMLElement>('a, button, summary')?.focus({ preventScroll: true });
}
if (menuBtn && sheet) {
  sheet.inert = true;
  menuBtn.addEventListener('click', () => setSheet(!root.classList.contains('sheet-open')));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('sheet-open')) { setSheet(false); menuBtn.focus(); }
  });
  sheet.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setSheet(false);
  });
  addEventListener('resize', () => { if (innerWidth >= 960) setSheet(false); }, { passive: true });
}
