// Behaviour for the family landing kit (src/styles/family/landing.css). Everything here is
// decoration over a complete server render: without it every word is visible and every card
// is in place.
//
// 1. Words: every .fl-words heading is split into one span per word (.w), so the words can
//    rise one after another when the heading's .reveal ancestor gets .in. The text in the
//    page source stays as written; spaces stay text nodes. Each word also carries .k-wd, the
//    class the shared serif-gradient rules (globals.css) give a gradient of its own.
// 2. Pointer: [data-pointer] hosts get --fx / --fy (the backdrop spotlight), and the layers of
//    a [data-parallax] stage lean toward the pointer by their data-depth.
const root = document.documentElement;
const motion = root.classList.contains('motion');
const lowpower = root.classList.contains('lowpower');
const fine = window.matchMedia('(pointer: fine)').matches;

function splitWords(el: HTMLElement) {
  let i = 0;
  const walk = (node: Node) => Array.from(node.childNodes).forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      (n.textContent ?? '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const w = document.createElement('span');
        w.className = 'w k-wd';
        w.style.setProperty('--i', String(i++));
        w.textContent = part;
        frag.appendChild(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === Node.ELEMENT_NODE && (n as Element).tagName !== 'BR') walk(n);
  });
  walk(el);
  el.style.setProperty('--n', String(i));
  el.classList.add('is-split');
}

if (motion) document.querySelectorAll<HTMLElement>('.fl-words').forEach(splitWords);

if (fine && motion && !lowpower) {
  document.querySelectorAll<HTMLElement>('[data-pointer]').forEach((el) => el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--fx', `${e.clientX - r.left}px`);
    el.style.setProperty('--fy', `${e.clientY - r.top}px`);
  }, { passive: true }));

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((stage) => {
    const layers = [...stage.querySelectorAll<HTMLElement>('[data-depth]')];
    if (!layers.length) return;
    let mx = 0, my = 0, queued = false, active = false;
    const apply = () => {
      queued = false;
      for (const l of layers) {
        const d = parseFloat(l.dataset.depth ?? '1');
        l.style.setProperty('--px', `${(mx * -7 * d).toFixed(1)}px`);
        l.style.setProperty('--py', `${(my * -5 * d).toFixed(1)}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      if (!queued) { queued = true; requestAnimationFrame(apply); }
    };
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !active) { active = true; document.addEventListener('pointermove', onMove, { passive: true }); }
      else if (!e.isIntersecting && active) { active = false; document.removeEventListener('pointermove', onMove); mx = 0; my = 0; apply(); }
    }).observe(stage);
  });
}

export {};
