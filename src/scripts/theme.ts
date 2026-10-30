// The colour scheme. The site follows the system until the toggle is used; a choice is kept in
// localStorage "<brand>:theme" and set on <html data-theme> (BaseLayout does that before first paint,
// so this file only has to keep it current). A choice that matches the system is forgotten again, so
// the site follows the system from then on. The key and the two browser colours come from brand.css,
// via data attributes BaseLayout writes on <html>.
import { reduceMotion } from './env';

type Theme = 'light' | 'dark';
const root = document.documentElement;
const KEY = `${root.dataset.brand ?? 'site'}:theme`;
const system = matchMedia('(prefers-color-scheme: dark)');
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

const stored = (): Theme | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};
const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : system.matches);

/** the parts CSS cannot see: the toggle's state and the browser's own colour */
function reflect() {
  const dark = isDark();
  if (meta) meta.content = (dark ? root.dataset.tcDark : root.dataset.tcLight) ?? meta.content;
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', (dark ? toggle.dataset.toLight : toggle.dataset.toDark) ?? '');
  }
}
function apply(theme: Theme | null) {
  if (theme) root.dataset.theme = theme;
  else delete root.dataset.theme;
  reflect();
}

// the switch cross-fades (base.css: html.theming), on a toggle only and never under reduced motion
let settling = 0;
function settle() {
  if (reduceMotion) return;
  root.classList.add('theming');
  clearTimeout(settling);
  settling = window.setTimeout(() => root.classList.remove('theming'), 350);
}

toggle?.addEventListener('click', () => {
  const next: Theme = isDark() ? 'light' : 'dark';
  settle();
  const same = next === (system.matches ? 'dark' : 'light');
  try {
    if (same) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
  } catch {}
  apply(same ? null : next);
});

// nothing stored: the system preference is live
system.addEventListener('change', () => { if (!stored()) reflect(); });
// a page prepared ahead of a click, one restored from the cache, or another tab: pick up the current choice
addEventListener('storage', (e) => { if (e.key === KEY) apply(stored()); });
addEventListener('pageshow', (e) => { if (e.persisted) apply(stored()); });
document.addEventListener('prerenderingchange', () => apply(stored()), { once: true });
reflect();

// the toggle steps aside while the footer plate is uncovered, so it never sits on "Back to top"
const plate = document.querySelector('[data-plate-space]');
if (plate) new IntersectionObserver(([e]) => root.classList.toggle('plate-on', e.isIntersecting)).observe(plate);
