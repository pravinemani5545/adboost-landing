// The kit's script entry, loaded by the Shell on every page (reveal.ts is loaded on its own, so
// Astro inlines it). The core is small and always runs; the heavier effects load as separate
// chunks only when the page has something for them.
import { SDA } from './scroll';
import './count';
import './menu';
import './pointer';
import './toc';

if (document.querySelector('[data-dots]')) import('./dots');
if (document.querySelector('[data-words]')) import('./words');
if (document.querySelector('video[data-src]')) import('./media');
if (!SDA && document.querySelector('[data-lit]')) import('./lit');
