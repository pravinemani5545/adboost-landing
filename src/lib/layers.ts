// Cascade layers of the design system (src/styles/globals.css), lowest first. Tailwind and
// shadcn/ui own every layer except `legacy`, which holds everything this site wrote itself
// (astro.config.mjs, legacyLayer), so a utility class or a shadcn component always wins over
// the site's own CSS. The Shell prints LAYER_ORDER in <head> before any stylesheet, because the
// first stylesheet a browser reads would otherwise decide the order; the build guards check it.
export const LAYERS = ['properties', 'theme', 'base', 'legacy', 'components', 'utilities'] as const;
export const LAYER_ORDER = `@layer ${LAYERS.join(', ')};`;
