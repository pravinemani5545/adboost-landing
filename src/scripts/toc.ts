// The page index in a document's aside: the section being read is marked as the page scrolls.
const toc = document.querySelector('[data-toc]');
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
    // a band just under the nav: a heading counts as read once it reaches the top fifth
    { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
  );
  targets.forEach((t) => spy.observe(t));
}
