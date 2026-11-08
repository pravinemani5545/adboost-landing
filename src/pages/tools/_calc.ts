// The five calculators' math, as pure functions. Each page's server render (its default inputs)
// and its client script call the same function, so the printed defaults and the live result can
// never disagree. The formulas, rounding and result notes are the ones the pages have always run;
// only the LTV:CAC "very high" note now starts above 5:1, as the FAQ on that page says.
// (Not a route: files starting with "_" are ignored by Astro's router.)

export type Verdict = '' | 'good' | 'bad';

export const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

/** The class the result value has always carried: "cr-value", "cr-value good", "cr-value bad". */
export const valueClass = (v: Verdict) => (v ? `cr-value ${v}` : 'cr-value');

/* ---------- CAC ---------- */
export interface CacResult { cac: number | null; value: string; verdict: Verdict; note: string }
export function cacCalc(spend: number, customers: number, lo: number, hi: number): CacResult {
  if (customers <= 0) return { cac: null, value: '-', verdict: '', note: 'Enter the number of customers acquired.' };
  const cac = spend / customers;
  const range = money(lo) + '–' + money(hi);
  if (cac < lo) return { cac, value: money(cac), verdict: 'good', note: 'Below the typical ' + range + ' range for your vertical - strong, if retention holds.' };
  if (cac <= hi) return { cac, value: money(cac), verdict: '', note: 'Within the typical ' + range + ' range for your vertical.' };
  return { cac, value: money(cac), verdict: 'bad', note: 'Above the typical ' + range + ' range - there’s likely room to bring this down.' };
}

/* ---------- LTV:CAC and payback ---------- */
export interface LtvResult {
  gp: number;
  ltv: number;
  ltvText: string;
  payback: number | null;
  paybackText: string;
  ratio: number | null;
  ratioText: string;
  verdict: Verdict;
  note: string;
}
/** Above this ratio the note adds the under-investing warning ("far above 5:1" in the FAQ). */
export const LTV_VERY_HIGH = 5;
export function ltvCalc(mrev: number, margin: number, months: number, cac: number): LtvResult {
  const gp = mrev * (margin / 100);
  const ltv = gp * months;
  const payback = gp > 0 ? cac / gp : null;
  const base = { gp, ltv, ltvText: money(ltv), payback, paybackText: payback === null ? '-' : payback.toFixed(1) + ' mo' };
  if (cac <= 0) return { ...base, ratio: null, ratioText: '-', verdict: '', note: 'Enter your CAC to see the ratio.' };
  const ratio = ltv / cac;
  const ratioText = ratio.toFixed(1) + '×';
  if (ratio >= 3) {
    return { ...base, ratio, ratioText, verdict: 'good', note: 'Healthy - at or above the 3:1 benchmark.' + (ratio > LTV_VERY_HIGH ? ' Very high - you may be under-investing in growth.' : '') };
  }
  return { ...base, ratio, ratioText, verdict: 'bad', note: 'Below the 3:1 benchmark - you’re likely buying revenue at a loss after overhead.' };
}

/* ---------- ad budget ---------- */
export interface BudgetResult { budget: number; budgetText: string; revText: string; roasText: string }
export function budgetCalc(target: number, cac: number, aov: number): BudgetResult {
  const budget = target * cac;
  const rev = target * aov;
  return { budget, budgetText: money(budget), revText: money(rev), roasText: budget > 0 ? (rev / budget).toFixed(1) + '×' : '-' };
}

/* ---------- MER ---------- */
export interface MerResult { mer: number | null; value: string; verdict: Verdict; note: string }
export function merCalc(rev: number, spend: number): MerResult {
  if (spend <= 0) return { mer: null, value: '-', verdict: '', note: 'Enter your total marketing spend.' };
  const mer = rev / spend;
  const x = mer.toFixed(1);
  const value = x + '×';
  if (mer >= 3) return { mer, value, verdict: 'good', note: 'Total revenue is ' + x + '× total spend - efficient for most health/DTC models.' };
  if (mer >= 2) return { mer, value, verdict: '', note: 'Total revenue is ' + x + '× total spend - workable, watch margin and overhead.' };
  return { mer, value, verdict: 'bad', note: 'Total revenue is only ' + x + '× total spend - likely unprofitable after costs.' };
}

/* ---------- POAS ---------- */
export interface PoasResult {
  poas: number | null;
  value: string;
  gpText: string;
  roasText: string;
  breakEvenText: string;
  verdict: Verdict;
  note: string;
}
/** margin is the percentage as typed (70 for 70%). */
export function poasCalc(rev: number, margin: number, spend: number): PoasResult {
  const m = margin / 100;
  const gp = rev * m;
  const base = {
    gpText: money(gp),
    roasText: spend > 0 ? (rev / spend).toFixed(1) + '×' : '-',
    breakEvenText: m > 0 ? (1 / m).toFixed(1) + '×' : '-',
  };
  if (spend <= 0) return { ...base, poas: null, value: '-', verdict: '', note: 'Enter your ad spend.' };
  const poas = gp / spend;
  const value = poas.toFixed(1) + '×';
  if (poas >= 1.5) return { ...base, poas, value, verdict: 'good', note: 'Healthy: each ad dollar returns well over a dollar of profit.' };
  if (poas >= 1) return { ...base, poas, value, verdict: '', note: 'Above break-even, but thin once overhead is included.' };
  return { ...base, poas, value, verdict: 'bad', note: 'Below break-even: these ads lose money after cost of goods.' };
}

/** Reads a calculator input the way the pages always have: parseFloat, else 0. */
export const num = (el: HTMLInputElement | HTMLSelectElement) => parseFloat(el.value) || 0;
