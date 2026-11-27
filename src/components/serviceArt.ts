// Decorative drawings of the three services (paid media, creative, CRO), shared by the services hub
// and the "What we do" cards on the industry pages. Inline SVG in the section hues; colours come
// from CSS variables through style attributes (presentation attributes do not resolve var()).
// Always rendered inside an aria-hidden wrapper. Keys are service slugs.
const GRAD = (id: string) => `<defs><linearGradient id="${id}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:rgb(var(--hue-a))"/><stop offset=".6" style="stop-color:rgb(var(--hue-b))"/><stop offset="1" style="stop-color:rgb(var(--hue-c))"/></linearGradient></defs>`;
export const SERVICE_ART: Record<string, string> = {
  // campaign structure: three campaigns, their spend bars, and the blended line rising
  'paid-media': `<svg viewBox="0 0 320 150" fill="none">${GRAD('gpm')}
    <rect x="18" y="18" width="186" height="114" rx="12" style="fill:var(--k-paper);stroke:var(--k-line)"/>
    <g><rect x="32" y="34" width="34" height="8" rx="4" style="fill:var(--k-line-2)"/><rect x="76" y="34" width="112" height="8" rx="4" fill="url(#gpm)" class="k-draw-x" style="--di:1"/></g>
    <g><rect x="32" y="58" width="34" height="8" rx="4" style="fill:var(--k-line-2)"/><rect x="76" y="58" width="78" height="8" rx="4" fill="url(#gpm)" opacity=".75" class="k-draw-x" style="--di:2"/></g>
    <g><rect x="32" y="82" width="34" height="8" rx="4" style="fill:var(--k-line-2)"/><rect x="76" y="82" width="52" height="8" rx="4" fill="url(#gpm)" opacity=".5" class="k-draw-x" style="--di:3"/></g>
    <rect x="32" y="106" width="70" height="12" rx="6" style="fill:var(--k-accent-soft)"/>
    <rect x="186" y="56" width="118" height="80" rx="12" style="fill:var(--k-paper);stroke:var(--k-line)"/>
    <path d="M198 120 C220 116 230 104 248 100 S280 78 292 70" stroke="url(#gpm)" stroke-width="2.4" stroke-linecap="round" pathLength="1" class="k-draw"/>
    <circle cx="292" cy="70" r="4" stroke-width="2" class="k-pop" style="fill:rgb(var(--hue-b));stroke:var(--k-paper)"/>
  </svg>`,
  // creative: three ad frames fanned out, the front one cleared
  creative: `<svg viewBox="0 0 320 150" fill="none">${GRAD('gcr')}
    <g transform="rotate(-8 112 82)"><rect x="80" y="22" width="64" height="112" rx="12" style="fill:var(--k-paper);stroke:var(--k-line)"/><rect x="88" y="32" width="48" height="58" rx="7" style="fill:rgb(var(--hue-c) / .25)"/><rect x="88" y="98" width="38" height="6" rx="3" style="fill:var(--k-line-2)"/><rect x="88" y="110" width="26" height="6" rx="3" style="fill:var(--k-line-2)"/></g>
    <g transform="rotate(8 208 82)"><rect x="176" y="22" width="64" height="112" rx="12" style="fill:var(--k-paper);stroke:var(--k-line)"/><rect x="184" y="32" width="48" height="58" rx="7" style="fill:rgb(var(--hue-b) / .22)"/><rect x="184" y="98" width="38" height="6" rx="3" style="fill:var(--k-line-2)"/><rect x="184" y="110" width="26" height="6" rx="3" style="fill:var(--k-line-2)"/></g>
    <rect x="126" y="14" width="68" height="122" rx="13" style="fill:var(--k-paper);stroke:var(--k-line-2)"/>
    <rect x="134" y="24" width="52" height="66" rx="8" fill="url(#gcr)"/>
    <path d="M155 49 l12 8 -12 8z" fill="#fff"/>
    <rect x="134" y="98" width="40" height="6" rx="3" style="fill:var(--k-line-2)"/><rect x="134" y="110" width="28" height="6" rx="3" style="fill:var(--k-line-2)"/>
    <circle cx="190" cy="22" r="11" class="k-pop" style="fill:var(--k-ok)"/><path d="M185 22l3.4 3.4 6-6.4" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="k-pop"/>
  </svg>`,
  // conversion: the funnel narrowing, and the step that converts lit
  cro: `<svg viewBox="0 0 320 150" fill="none">${GRAD('gcv')}
    <rect x="70" y="18" width="180" height="20" rx="10" style="fill:rgb(var(--hue-a) / .16)"/>
    <rect x="92" y="46" width="136" height="20" rx="10" style="fill:rgb(var(--hue-b) / .2)"/>
    <rect x="114" y="74" width="92" height="20" rx="10" style="fill:rgb(var(--hue-c) / .26)"/>
    <rect x="134" y="102" width="52" height="24" rx="12" fill="url(#gcv)" class="k-pop"/>
    <path d="M160 108v12M155 115l5 5 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="k-pop"/>
    <path d="M262 28 C292 40 292 104 214 114" stroke-width="1.4" stroke-dasharray="3 4" pathLength="1" class="k-draw" style="--di:2;stroke:var(--k-line-3)"/>
    <rect x="24" y="58" width="40" height="40" rx="10" style="fill:var(--k-paper);stroke:var(--k-line)"/><rect x="32" y="68" width="24" height="5" rx="2.5" style="fill:var(--k-line-2)"/><rect x="32" y="79" width="16" height="5" rx="2.5" style="fill:rgb(var(--hue-a) / .45)"/>
  </svg>`,
};
export const SERVICE_ICON = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2.5"/><path d="M11 9.5l3 2-3 2z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18l-7 8v6l-4-2v-4L3 5z"/></svg>',
];
