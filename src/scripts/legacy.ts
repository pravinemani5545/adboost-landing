// Bridges for the pre-redesign inner pages until run 2 moves them onto the system components.
// It runs before reveal.ts, so the old markup joins the system's arrivals instead of keeping its own.

// the old .reveal (and its .d1-.d4 delays) become system arrivals
const DELAY: Record<string, number> = { d1: 1, d2: 2, d3: 3, d4: 4 };
for (const el of document.querySelectorAll<HTMLElement>('.legacy .reveal')) {
  el.classList.remove('reveal');
  el.dataset.reveal = '';
  const step = Object.keys(DELAY).find((d) => el.classList.contains(d));
  if (step) el.style.setProperty('--i', String(DELAY[step]));
}

// "On this page": the section being read is marked in the sidebar
const toc = document.querySelector('.aside-toc');
if (toc) {
  const links = new Map<string, HTMLAnchorElement>();
  toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => links.set(a.getAttribute('href')!.slice(1), a));
  const targets = [...links.keys()].map((id) => document.getElementById(id)).filter((t): t is HTMLElement => !!t);
  let current: string | null = null;
  const spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) current = e.target.id;
      links.forEach((a) => a.classList.remove('active'));
      if (current) links.get(current)?.classList.add('active');
    },
    { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
  );
  targets.forEach((t) => spy.observe(t));
}
