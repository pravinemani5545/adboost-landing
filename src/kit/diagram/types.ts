// Diagram kit props (design v2 brief, section 3). Colour-neutral: every component reads
// --k-* and the tone tokens --t-*, never site names. Each diagram is its own text
// alternative: nodes are semantic HTML, only connectors and decoration are aria-hidden.
// Rule for every prop: draw only strings and numbers that already exist in a data file or
// in the page copy. If a number is missing, drop that part instead of estimating it.

export type Tone = 'accent' | 'ok' | 'warn' | 'bad' | 'muted';

/** Shared by every diagram. */
export interface Base {
  /** Visible <figcaption>. Say "not to scale" here when a layout is uniform. */
  caption: string;
  /** Optional heading inside the figure (h3 by default, never h1/h2). */
  title?: string;
  headingLevel?: 3 | 4;
  /** Visible source line in the caption. href may be external (a citation). */
  source?: { label: string; href?: string };
  /** 'night' paints the figure as a night card; inside a night band leave it unset. */
  theme?: 'paper' | 'night';
  /** false: no reveal, no draw-on. Default true (data-reveal on the figure, draws on .in). */
  animate?: boolean;
  /** First-viewport placement (hero asides): [data-draw] instead of [data-reveal], so the
   *  figure is never hidden; its parts draw (transform only) once it gets .in. */
  arrive?: boolean;
  id?: string;
  /** Adds the "Illustrative example" tag to the caption. */
  illustrative?: boolean;
  /** Extra classes on the <figure>. */
  class?: string;
}

/* ---------- Flow ---------- */
export interface FlowNode {
  label: string;
  sub?: string;
  /** A short glyph shown in the badge instead of the number (→ ✓ ✕ · ●). */
  icon?: string;
  tone?: Tone;
  /** Internal links only. */
  href?: string;
  /** Alternatives that follow this node, drawn as a fork under it. */
  branches?: FlowNode[];
}
export interface FlowProps extends Base {
  nodes: FlowNode[];
  numbered?: boolean;
  orientation?: 'auto' | 'row' | 'column';
  /** One glow runs once along the nodes after they draw. */
  pulse?: boolean;
}

/* ---------- Timeline ---------- */
export interface Phase {
  label: string;
  detail?: string;
  /** Short qualifier as printed: "wk 1–2", "ongoing", a date "2026-07". */
  meta?: string;
  start?: number;
  end?: number | 'ongoing';
  /** log variant: kind badge ("changed", "corrected"). */
  badge?: string;
  tone?: Tone;
  href?: string;
}
export interface TimelineProps extends Base {
  phases: Phase[];
  /** steps: numbered spine (scroll-filled). gantt: bars on a unit axis.
   *  rail: milestones on one line. log: dated entries, newest first as given. */
  variant?: 'steps' | 'gantt' | 'rail' | 'log';
  /** Axis unit for gantt/rail ticks, e.g. "wk" or "day". */
  unit?: string;
  /** Last unit on the axis. Defaults to the largest end (plus room for open bars). */
  total?: number;
  /** gantt: prefix for row ids (`${rowIdPrefix}-${i}`) so a page can match rows to cards. */
  rowIdPrefix?: string;
}

/* ---------- Compare ---------- */
export interface Side {
  label: string;
  items: string[];
  tone?: Tone;
  mark?: '✓' | '✕' | '→' | '·';
}
export interface CompareRow { label: string; left: string; right: string }
export interface CompareProps extends Base {
  left: Side;
  right: Side;
  rows?: CompareRow[];
  /** split: two columns. vs: rows across a rail (left muted, right accented).
   *  diff: left items struck through (removed) vs right items (now). */
  variant?: 'split' | 'vs' | 'diff';
}

/* ---------- HeatMatrix ---------- */
export interface HeatCell {
  text: string;
  level: Tone;
  href?: string;
  current?: boolean;
  /** Shown on hover and focus, and announced as the cell's description. */
  note?: string;
}
export interface HeatRow { label: string; href?: string; cells: (HeatCell | null)[] }
export interface HeatMatrixProps extends Base {
  rowHeader: string;
  cols: string[];
  rows: HeatRow[];
  legend: { level: Tone; label: string }[];
}

/* ---------- Matrix2 ---------- */
export interface Cell {
  label: string;
  detail?: string;
  tone?: Tone;
  href?: string;
  current?: boolean;
}
export interface Axis { label: string; low: string; high: string }
export interface Matrix2Props extends Base {
  x: Axis;
  y: Axis;
  /** Order: [high y + low x, high y + high x, low y + low x, low y + high x]
   *  (top-left, top-right, bottom-left, bottom-right). */
  cells: [Cell, Cell, Cell, Cell];
}

/* ---------- Ladder ---------- */
export interface LadderProps extends Base {
  levels: { label: string; detail?: string }[];
  /** Index of the lit rung. */
  current?: number;
  /** up: the first level sits at the bottom. down: the first level sits at the top. */
  direction?: 'up' | 'down';
}

/* ---------- HubSpoke ---------- */
export interface HubSpokeProps extends Base {
  hub: { label: string; sub?: string };
  /** 3 to 8 spokes. */
  spokes: { label: string; sub?: string; href?: string }[];
  /** Labels on the links between neighbouring spokes: edges[i] joins spoke i and i+1
   *  (the last joins back to the first). Same length as spokes. */
  edges?: string[];
}

/* ---------- Funnel ---------- */
export interface FunnelStage { label: string; display?: string; value?: number; note?: string }
export interface FunnelProps extends Base {
  stages: FunnelStage[];
  /** proportional: widths follow value (every stage needs one). uniform: fixed taper,
   *  not data; say "not to scale" in the caption. */
  scale?: 'proportional' | 'uniform';
}

/* ---------- Bars ---------- */
export interface BarItem {
  label: string;
  /** Printed value, exactly as the copy has it ("~$200–$400+"). */
  display: string;
  value?: number;
  range?: [number, number];
  /** "~" start: the left end fades in. */
  approxStart?: boolean;
  /** "+" end: the bar fades out past its last value. */
  openEnd?: boolean;
  /** e.g. "per cycle": a different unit from the rest of the axis. */
  unitNote?: string;
  tone?: Tone;
  /** Lights this item and ghosts the others. */
  highlight?: boolean;
  href?: string;
}
export interface BarMarker {
  value: number;
  /** Printed value shown at the marker. */
  display: string;
  label?: string;
  /** Element id; a calculator moves it with setLive(id, value, display). */
  live?: string;
}
export interface BarsProps extends Base {
  variant?: 'bar' | 'range';
  items: BarItem[];
  min?: number;
  max?: number;
  /** Values above this sit on a compressed segment after an axis break. */
  axisBreakAbove?: number;
  axisLabel?: string;
  /** Tick values. Default: a round step from min to the break (or max). */
  ticks?: number[];
  /** Tick label affixes, e.g. prefix "$". */
  prefix?: string;
  suffix?: string;
  marker?: BarMarker;
}

/* ---------- Gauge ---------- */
export interface GaugeProps extends Base {
  value: number;
  min: number;
  max: number;
  /** Printed readout, e.g. "3.0:1". Also the aria-valuetext unless valueText is set. */
  display: string;
  valueText?: string;
  /** Bands run from the previous band's `to` (or min) to `to`. */
  bands?: { to: number; tone: Tone; label: string }[];
  ticks?: { at: number; label: string }[];
  /** Element id; a calculator updates it with setLive(id, value, display). */
  live?: string;
  /** Label for the readout (e.g. "Your LTV:CAC"). Defaults to the caption. */
  label?: string;
}

/* ---------- Cycle ---------- */
export interface CycleProps extends Base {
  steps: { label: string; detail?: string }[];
  center?: string;
}

/* ---------- Swimlane ---------- */
export interface SwimlaneProps extends Base {
  lanes: { id: string; label: string }[];
  steps: { lane: string; label: string; detail?: string }[];
}

/* ---------- Equation ---------- */
export interface EquationProps extends Base {
  /** "CAC = Total acquisition spend ÷ New customers acquired". " · " separates equations. */
  formula: string;
  /** Tokens copied verbatim from the page's own worked example: "$50,000 ÷ 200 = $250". */
  example?: string;
}

/* ---------- DecisionTree ---------- */
export interface Leaf { result: string; tone?: Tone; href?: string; detail?: string }
export interface DecisionNode { q: string; yes: DecisionNode | Leaf; no: DecisionNode | Leaf }
export interface DecisionTreeProps extends Base {
  root: DecisionNode;
  yesLabel?: string;
  noLabel?: string;
  /** The copy's own caveat, printed under the tree. */
  note?: string;
}

/* ---------- StatusStrip ---------- */
export interface StatusItem { label: string; status: string; level: Tone; href?: string; current?: boolean }
export interface StatusStripProps extends Base {
  items: StatusItem[];
  /** Chips under the strip; the chip whose label matches the current item's status is lit. */
  legend?: { level: Tone; label: string }[];
  orientation?: 'row' | 'column';
  compact?: boolean;
}

/* ---------- Dispatch ---------- */
export type DiagramSpec =
  | ({ kind: 'flow' } & FlowProps)
  | ({ kind: 'timeline' } & TimelineProps)
  | ({ kind: 'compare' } & CompareProps)
  | ({ kind: 'heatmatrix' } & HeatMatrixProps)
  | ({ kind: 'matrix2' } & Matrix2Props)
  | ({ kind: 'ladder' } & LadderProps)
  | ({ kind: 'hubspoke' } & HubSpokeProps)
  | ({ kind: 'funnel' } & FunnelProps)
  | ({ kind: 'bars' } & BarsProps)
  | ({ kind: 'gauge' } & GaugeProps)
  | ({ kind: 'cycle' } & CycleProps)
  | ({ kind: 'swimlane' } & SwimlaneProps)
  | ({ kind: 'equation' } & EquationProps)
  | ({ kind: 'decisiontree' } & DecisionTreeProps)
  | ({ kind: 'statusstrip' } & StatusStripProps);

export type DiagramKind = DiagramSpec['kind'];
