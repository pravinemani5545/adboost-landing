// The page index in a document's aside ([data-toc], or the legacy .aside-toc): the section being
// read is marked .active (and aria-current="location") as the page scrolls.
for (const toc of document.querySelectorAll('[data-toc], .aside-toc')) {
  const links = new Map<string, HTMLAnchorElement>();
  toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => links.set(decodeURIComponent(a.getAttribute('href')!.slice(1)), a));
  const targets = [...links.keys()].map((id) => document.getElementById(id)).filter((t): t is HTMLElement => !!t);
  let current: string | null = null;
  const spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) current = e.target.id;
      links.forEach((a) => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
      const a = current ? links.get(current) : undefined;
      if (a) { a.classList.add('active'); a.setAttribute('aria-current', 'location'); }
    },
    // a band just under the nav: a heading counts as read once it reaches the top fifth
    { rootMargin: '-88px 0px -70% 0px', threshold: 0 },
  );
  targets.forEach((t) => spy.observe(t));
}
