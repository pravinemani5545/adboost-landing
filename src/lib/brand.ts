// The few brand values a script or a meta tag needs, read at build time from the one file that
// holds the brand (src/styles/system/brand.css), so a second site changes that file only.
import css from '../styles/system/brand.css?raw';

const read = (name: string) => {
  const m = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`brand.css is missing --${name}`);
  return m[1].trim().replace(/^["']|["']$/g, '');
};

export const brand = {
  /** localStorage "<key>:theme" holds the scheme chosen with the toggle */
  key: read('brand-key'),
  themeLight: read('theme-light'),
  themeDark: read('theme-dark'),
};
