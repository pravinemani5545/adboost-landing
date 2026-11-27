// Decorative video (Video.astro): the poster paints first; the clip loads only as it approaches
// the screen, plays only while in view, pauses when the tab is hidden, and fades in over its
// poster once it is actually playing. Reduced motion and low-power devices keep the poster:
// no video request is ever made. Sources are self-hosted (CSP: no remote or blob video).
// Loaded by app.ts only when the page has a video[data-src].
import { lowPower, motionOn } from './env';

function sourceFor(v: HTMLVideoElement) {
  const webm = v.dataset.webm;
  return webm && v.canPlayType('video/webm; codecs="vp9"') ? webm : v.dataset.src!;
}

if (motionOn() && !lowPower) {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('video[data-src]')];

  const load = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const v = e.target as HTMLVideoElement;
        load.unobserve(v);
        v.src = sourceFor(v);
        v.preload = 'auto';
        v.addEventListener('playing', () => v.classList.add('is-ready'), { once: true });
        if (v.dataset.visible) v.play().catch(() => {});
      }
    },
    { rootMargin: '60% 0px 60% 0px' },
  );
  const playing = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        v.dataset.visible = e.isIntersecting ? '1' : '';
        if (!v.src) continue;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }
    },
    { threshold: 0.15 },
  );
  for (const v of videos) {
    v.muted = true;
    load.observe(v);
    playing.observe(v);
  }
  document.addEventListener('visibilitychange', () => {
    for (const v of videos) {
      if (document.hidden) v.pause();
      else if (v.dataset.visible && v.src) v.play().catch(() => {});
    }
  });
}
