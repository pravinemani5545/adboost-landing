// CAC range bars for the industry hub and the 9 industry pages. Every value comes from
// src/data/verticals.ts (cacDisplay printed exactly, cacLow/cacHigh as the bar). One axis for
// all verticals; longevity's $2,000 sits behind an axis break so the other 8 stay readable.
import type { BarItem } from '../../kit/diagram/types';
import type { Vertical } from '../../data/verticals';

export const CAC_BREAK = 700;

/** Fertility is quoted per cycle ("$200–$600 / cycle"), a different unit from the rest. */
const perCycle = (v: Vertical) => /\/\s*cycle\s*$/i.test(v.cacDisplay);

export function cacItem(v: Vertical, current?: string): BarItem {
  const lit = v.slug === current;
  return {
    label: v.short,
    display: v.cacDisplay,
    range: [v.cacLow, v.cacHigh],
    approxStart: v.cacDisplay.trim().startsWith('~') || undefined,
    openEnd: v.cacDisplay.trim().endsWith('+') || undefined,
    unitNote: perCycle(v) ? 'Different unit: per cycle' : undefined,
    highlight: lit || undefined,
    href: lit ? undefined : `/industries/${v.slug}/`,
  };
}

/** Caption notes for whatever this set of verticals actually contains. */
export function cacNotes(vs: Vertical[]): string {
  const notes: string[] = [];
  if (vs.some((v) => v.cacHigh > CAC_BREAK)) notes.push(`The axis breaks above $${CAC_BREAK}.`);
  if (vs.some((v) => v.cacDisplay.trim().startsWith('~') || v.cacDisplay.trim().endsWith('+'))) {
    notes.push('Faded ends mark a "~" or "+" in the quoted range.');
  }
  const cyc = vs.filter(perCycle);
  if (cyc.length) notes.push(`${cyc.map((v) => v.short).join(', ')} is quoted per cycle.`);
  return notes.join(' ');
}

/**
 * The same piecewise axis as the Bars diagram (src/kit/diagram/Bars.astro: 84% of the track up
 * to the break, a 4% gap, the rest above it), for the mini bars on the hub cards. Returns the
 * segments of [lo, hi] in % of the track.
 */
export function miniScale(vs: Vertical[]) {
  const lo = Math.min(0, ...vs.map((v) => v.cacLow));
  const hi = Math.max(...vs.map((v) => v.cacHigh));
  const brk = CAC_BREAK > lo && CAC_BREAK < hi ? CAC_BREAK : undefined;
  const MAIN = brk === undefined ? 1 : 0.84;
  const GAP = 0.04;
  const r = (n: number) => Math.round(n * 1e4) / 1e2;
  const pos = (x: number) => {
    if (brk === undefined) return Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
    if (x <= brk) return Math.max(0, ((x - lo) / (brk - lo)) * MAIN);
    return MAIN + GAP + Math.min(1, (x - brk) / (hi - brk)) * (1 - MAIN - GAP);
  };
  const segs = (a: number, b: number) =>
    brk === undefined || b <= brk || a > brk
      ? [{ l: r(pos(a)), w: r(pos(b) - pos(a)) }]
      : [{ l: r(pos(a)), w: r(MAIN - pos(a)) }, { l: r(MAIN + GAP), w: r(pos(b) - MAIN - GAP) }];
  return { segs, breakAt: brk === undefined ? undefined : r(MAIN + GAP / 2) };
}
