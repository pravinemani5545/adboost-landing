// String helpers that turn copy already on the page into diagram props. They never invent
// a value: anything they cannot read is left undefined and the diagram drops that part.

import type { Phase } from './types';

/* ---------- parsePhase ---------- */

const OPEN = /^(ongoing|rolling)$/i;
// "wk 1–2", "wk 3-8", "week 3", "day 5", "wk 3+", "2–4" (en-dash or hyphen)
const SPAN = /^(?:(?<unit>[A-Za-z]+\.?)\s*)?(?<a>\d+(?:\.\d+)?)\s*(?:(?:[–-]|to)\s*(?<b>\d+(?:\.\d+)?)|(?<open>\+))?$/;

export interface ParsedPhase extends Phase {
  /** The unit word as printed ("wk"), when the meta has one. */
  unit?: string;
}

/**
 * Split "Account & tracking audit · wk 1–2" into { label, meta, start, end, unit }.
 * "ongoing" and "rolling" give end: 'ongoing' with no start; "wk 3+" gives start 3, end 'ongoing'.
 * A string without " · " is all label.
 */
export function parsePhase(src: string, detail?: string): ParsedPhase {
  const at = src.lastIndexOf('·');
  const out: ParsedPhase = { label: src.trim() };
  if (detail) out.detail = detail;
  if (at < 0) return out;
  const label = src.slice(0, at).trim();
  const meta = src.slice(at + 1).trim();
  if (!label || !meta) return out;
  out.label = label;
  out.meta = meta;
  if (OPEN.test(meta)) {
    out.end = 'ongoing';
    return out;
  }
  const m = SPAN.exec(meta);
  if (m?.groups) {
    const { unit, a, b, open } = m.groups;
    if (unit) out.unit = unit;
    out.start = Number(a);
    out.end = open ? 'ongoing' : b !== undefined ? Number(b) : Number(a);
  }
  return out;
}

/* ---------- numbers ---------- */

export interface NumberParts {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  /** The number was printed with thousands separators. */
  grouped: boolean;
}

// One printed number with short affixes: "$250", "~$5,400", "3.0:1", "$199/mo", "64%".
// Phrases ("3-sec video views") and ranges ("1.4–1.8%") are not numbers.
const NUM = /^(?<pre>[^\d\s−-]{0,3}?)(?<sign>[−-]?)(?<int>\d{1,3}(?:,\d{3})+|\d+)(?<dec>\.\d+)?(?<suf>:\d+(?:\.\d+)?|[^\s\d.,][^\s\d]{0,5})?$/;

/** "$50,000" → { prefix: "$", value: 50000, suffix: "", decimals: 0, grouped: true }. */
export function parseNumber(text: string): NumberParts | undefined {
  const m = NUM.exec(text.trim());
  if (!m?.groups) return undefined;
  const { pre, sign, int, dec, suf } = m.groups;
  const value = Number(`${sign ? '-' : ''}${int.replace(/,/g, '')}${dec ?? ''}`);
  if (!Number.isFinite(value)) return undefined;
  return { prefix: pre, value, suffix: suf ?? '', decimals: dec ? dec.length - 1 : 0, grouped: int.includes(',') };
}

/* ---------- parseFormula ---------- */

export type Operator = '=' | '×' | '÷' | '+' | '−' | '/';
export type FormulaToken =
  | { type: 'term'; text: string; number?: NumberParts }
  | { type: 'op'; text: string; op: Operator }
  | { type: 'paren'; text: '(' | ')' };
export type TermToken = Extract<FormulaToken, { type: 'term' }>;

export interface ParsedEquation {
  text: string;
  tokens: FormulaToken[];
  /** Tokens left of the last "=" (empty when there is none). */
  lhs: FormulaToken[];
  rhs: FormulaToken[];
  /** The single term right of the last "=" when it is a number (an example's answer). */
  result?: TermToken & { number: NumberParts };
}

// Operators count only with whitespace on both sides, so "3-sec", "LTV:CAC" and
// "Conversions(exposed)" stay whole terms.
const OP = /\s+(=|×|÷|\+|−|-|\/)\s+/;
const count = (s: string, c: string) => s.split(c).length - 1;

function pushTerm(out: FormulaToken[], raw: string) {
  const text = raw.trim();
  if (!text) return;
  const number = parseNumber(text);
  out.push(number ? { type: 'term', text, number } : { type: 'term', text });
}

function segmentTokens(seg: string): FormulaToken[] {
  const lead: FormulaToken[] = [];
  const trail: FormulaToken[] = [];
  let s = seg.trim();
  while (s.startsWith('(') && count(s, '(') > count(s, ')')) {
    lead.push({ type: 'paren', text: '(' });
    s = s.slice(1).trim();
  }
  while (s.endsWith(')') && count(s, ')') > count(s, '(')) {
    trail.unshift({ type: 'paren', text: ')' });
    s = s.slice(0, -1).trim();
  }
  const mid: FormulaToken[] = [];
  // a qualifier group opened or closed inside a segment: "customers (paid" / "organic) x"
  const open = s.lastIndexOf(' (');
  const close = s.indexOf(') ');
  if (count(s, '(') > count(s, ')') && open > 0) {
    pushTerm(mid, s.slice(0, open));
    mid.push({ type: 'paren', text: '(' });
    pushTerm(mid, s.slice(open + 2));
  } else if (count(s, ')') > count(s, '(') && close > 0) {
    pushTerm(mid, s.slice(0, close));
    mid.push({ type: 'paren', text: ')' });
    pushTerm(mid, s.slice(close + 2));
  } else {
    pushTerm(mid, s);
  }
  return [...lead, ...mid, ...trail];
}

/**
 * Tokenise a printed formula or worked example. " · " separates equations:
 * "Churn rate = A ÷ B · Retention rate = 1 − Churn rate" gives two.
 */
export function parseFormula(src: string): ParsedEquation[] {
  return src
    .split(/\s+·\s+/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => {
      const tokens: FormulaToken[] = [];
      const parts = text.split(OP);
      parts.forEach((part, i) => {
        if (i % 2 === 1) {
          const op = (part === '-' ? '−' : part) as Operator;
          tokens.push({ type: 'op', text: part, op });
        } else {
          tokens.push(...segmentTokens(part));
        }
      });
      let eq = -1;
      tokens.forEach((t, i) => { if (t.type === 'op' && t.op === '=') eq = i; });
      const lhs = eq < 0 ? [] : tokens.slice(0, eq);
      const rhs = eq < 0 ? tokens : tokens.slice(eq + 1);
      const only = rhs.length === 1 ? rhs[0] : undefined;
      const result = eq >= 0 && only?.type === 'term' && only.number
        ? (only as TermToken & { number: NumberParts })
        : undefined;
      return { text, tokens, lhs, rhs, result };
    });
}
