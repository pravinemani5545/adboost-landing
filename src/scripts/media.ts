// Videos load only as they approach the screen, play only while in view, and fade in over their
// still frame once they are actually playing. With reduced motion the still frame stays.
import { reduceMotion } from './env';

const probe = document.createElement('video');
const av1 = probe.canPlayType('video/mp4; codecs="av01.0.08M.08"') === 'probably';
/** A clip's file: AV1 where the browser can decode it and the clip has an AV1 twin, H.264 otherwise. */
export const clipUrl = (base: string, hasAv1 = true) => `${base}${av1 && hasAv1 ? '.av1' : ''}.mp4`;

// data-av1="0" (or data-portrait-av1="0") marks a clip that ships in H.264 only
function sourceFor(v: HTMLVideoElement) {
  const portrait = v.dataset.portrait && matchMedia('(max-aspect-ratio: 4/5)').matches;
  return portrait ? clipUrl(v.dataset.portrait!, v.dataset.portraitAv1 !== '0') : clipUrl(v.dataset.src!, v.dataset.av1 !== '0');
}

if (!reduceMotion) {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('video[data-src]')];

  const load = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const v = e.target as HTMLVideoElement;
        load.unobserve(v);
        v.src = sourceFor(v);
        v.preload = 'auto';
        v.addEventListener('playing', () => v.classList.add('ready'), { once: true });
        if (v.dataset.visible) v.play().catch(() => {});
      }
    },
    { rootMargin: '80% 0px 80% 0px' },
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
