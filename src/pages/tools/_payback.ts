// Payback chart for the LTV:CAC calculator, from the visitor's inputs only: cumulative gross
// profit per customer by month (monthly gross profit × month, out to the average months retained)
// against a flat CAC line. Where the two cross is the payback month the calculator prints
// (CAC ÷ monthly gross profit); the end of the line is the lifetime value it prints.
// Pure geometry, shared by the server render and the client script. The plot is an SVG with a
// 0-100 viewBox stretched to the box (non-scaling strokes); labels live in HTML around it.

/** Heights as a share of the plot (0 = baseline, 1 = top): a = lifetime value at the last month, c = CAC. */
export interface Shape { a: number; c: number }

/** Head room above the taller of LTV and CAC, so the top mark never touches the frame. */
const HEAD = 1.2;

export function shape(gp: number, months: number, cac: number): Shape {
  const ltv = Math.max(0, gp) * Math.max(0, months);
  const k = Math.max(0, cac);
  const top = Math.max(ltv, k) * HEAD;
  if (!(top > 0) || !Number.isFinite(top)) return { a: 0, c: 0 };
  return { a: ltv / top, c: k / top };
}

const r = (n: number) => Math.round(n * 100) / 100;
const Y = (v: number) => r(100 - v * 100);

export interface Paths {
  line: string;
  cac: string;
  /** between the CAC line and the profit line, before payback (still repaying CAC) */
  owed: string;
  /** between the CAC line and the profit line, after payback */
  ahead: string;
  /** dotted drop from the payback point to the month axis */
  guide: string;
  /** payback crossing along the month axis (0..1), or null when it falls after the last month */
  p: number | null;
}

export function paths(s: Shape): Paths {
  const ya = Y(s.a);
  const yc = Y(s.c);
  const cross = s.a > 0 ? s.c / s.a : Infinity;
  const p = cross <= 1 ? cross : null;
  const px = p === null ? 100 : r(p * 100);
  return {
    line: `M0 100L100 ${ya}`,
    cac: `M0 ${yc}H100`,
    owed: p === null ? `M0 100L0 ${yc}L100 ${yc}L100 ${ya}Z` : `M0 100L0 ${yc}L${px} ${yc}Z`,
    ahead: p === null ? 'M0 0Z' : `M${px} ${yc}L100 ${yc}L100 ${ya}Z`,
    guide: p === null ? 'M0 0Z' : `M${px} ${yc}V100`,
    p,
  };
}

/** Month tick marks along the baseline: every month up to 24, then every 6, then every 12. */
export function monthTicks(months: number): string {
  if (!(months > 0) || !Number.isFinite(months)) return 'M0 0Z';
  let step = months <= 24 ? 1 : months <= 72 ? 6 : 12;
  while (months / step > 40) step *= 2;
  let d = '';
  for (let m = step; m < months; m += step) d += `M${r((m / months) * 100)} 100V96.5`;
  return d || 'M0 0Z';
}

/** "12" or "12.5": the months input as the axis prints it. */
export const monthLabel = (months: number) => (Number.isInteger(months) ? String(months) : months.toFixed(1));
