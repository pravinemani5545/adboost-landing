// Small shared helpers for the diagram components (build time only).

import type { Tone } from './types';

/** Default glyph per tone. Decorative: the text beside it always carries the meaning. */
export const TONE_MARK: Record<Tone, string> = {
  ok: '✓',
  bad: '✕',
  warn: '●',
  accent: '●',
  muted: '·',
};

/** Diagram links are internal only (releaseGates unwraps links to unbuilt pages). */
export function internal(href: string | undefined, where: string): string | undefined {
  if (href === undefined || href === '') return undefined;
  if (!href.startsWith('/') || href.startsWith('//')) {
    if (!href.startsWith('#')) throw new Error(`Diagram link must be internal (got "${href}" in ${where})`);
  }
  return href;
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round to 4 decimals for compact style attributes. */
export const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

/** A round tick step for [lo, hi] giving about `target` ticks. */
export function niceTicks(lo: number, hi: number, target = 5): number[] {
  const span = hi - lo;
  if (!(span > 0)) return [lo];
  const raw = span / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(r4(v));
  return out;
}

/** "1000" → "1,000" (axis labels only; printed values always come from the copy). */
export const group = (n: number) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 2 });

let seq = 0;
/** Stable-enough ids for aria wiring inside one build. */
export const uid = (prefix: string) => `${prefix}-${(++seq).toString(36)}`;

/** Throw at build time with the diagram's caption in the message. */
export function fail(kind: string, caption: string, msg: string): never {
  throw new Error(`[diagram:${kind}] ${msg} (caption: "${caption}")`);
}
