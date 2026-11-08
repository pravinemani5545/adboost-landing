// Zod schema for a DiagramSpec, for content collections (blog frontmatter `diagrams`):
//
//   import { diagramsSchema } from './kit/diagram/schema';
//   schema: z.object({ ..., diagrams: diagramsSchema.optional() })
//
// Objects are strict, so a misspelt prop fails the build instead of being ignored.
import { z } from 'astro/zod';

const tone = z.enum(['accent', 'ok', 'warn', 'bad', 'muted']);
const internalHref = z.string().regex(/^(\/(?!\/)|#)/, 'diagram links must be internal (start with / or #)');

const base = {
  caption: z.string().min(1),
  title: z.string().optional(),
  headingLevel: z.union([z.literal(3), z.literal(4)]).optional(),
  source: z.object({ label: z.string(), href: z.string().optional() }).strict().optional(),
  theme: z.enum(['paper', 'night']).optional(),
  animate: z.boolean().optional(),
  arrive: z.boolean().optional(),
  id: z.string().optional(),
  illustrative: z.boolean().optional(),
  class: z.string().optional(),
};

const flowLeaf = z.object({
  label: z.string(), sub: z.string().optional(), icon: z.string().optional(), tone: tone.optional(), href: internalHref.optional(),
}).strict();
const flowNode = flowLeaf.extend({ branches: z.array(flowLeaf).optional() }).strict();

const phase = z.object({
  label: z.string(),
  detail: z.string().optional(),
  meta: z.string().optional(),
  start: z.number().optional(),
  end: z.union([z.number(), z.literal('ongoing')]).optional(),
  badge: z.string().optional(),
  tone: tone.optional(),
  href: internalHref.optional(),
}).strict();

const side = z.object({
  label: z.string(), items: z.array(z.string()), tone: tone.optional(), mark: z.enum(['✓', '✕', '→', '·']).optional(),
}).strict();

const heatCell = z.object({
  text: z.string(), level: tone, href: internalHref.optional(), current: z.boolean().optional(), note: z.string().optional(),
}).strict();

const cell = z.object({
  label: z.string(), detail: z.string().optional(), tone: tone.optional(), href: internalHref.optional(), current: z.boolean().optional(),
}).strict();
const axis = z.object({ label: z.string(), low: z.string(), high: z.string() }).strict();

type Leaf = { result: string; tone?: z.infer<typeof tone>; href?: string; detail?: string };
type DNode = { q: string; yes: DNode | Leaf; no: DNode | Leaf };
const leaf = z.object({ result: z.string(), tone: tone.optional(), href: internalHref.optional(), detail: z.string().optional() }).strict();
const decisionNode: z.ZodType<DNode> = z.lazy(() =>
  z.object({ q: z.string(), yes: z.union([leaf, decisionNode]), no: z.union([leaf, decisionNode]) }).strict(),
);

export const diagramSpecSchema = z.discriminatedUnion('kind', [
  z.object({ ...base, kind: z.literal('flow'), nodes: z.array(flowNode).min(1), numbered: z.boolean().optional(), orientation: z.enum(['auto', 'row', 'column']).optional(), pulse: z.boolean().optional() }).strict(),
  z.object({ ...base, kind: z.literal('timeline'), phases: z.array(phase).min(1), variant: z.enum(['steps', 'gantt', 'rail', 'log']).optional(), unit: z.string().optional(), total: z.number().optional(), rowIdPrefix: z.string().optional() }).strict(),
  z.object({ ...base, kind: z.literal('compare'), left: side, right: side, rows: z.array(z.object({ label: z.string(), left: z.string(), right: z.string() }).strict()).optional(), variant: z.enum(['split', 'vs', 'diff']).optional() }).strict(),
  z.object({ ...base, kind: z.literal('heatmatrix'), rowHeader: z.string(), cols: z.array(z.string()).min(1), rows: z.array(z.object({ label: z.string(), href: internalHref.optional(), cells: z.array(heatCell.nullable()) }).strict()).min(1), legend: z.array(z.object({ level: tone, label: z.string() }).strict()) }).strict(),
  z.object({ ...base, kind: z.literal('matrix2'), x: axis, y: axis, cells: z.tuple([cell, cell, cell, cell]) }).strict(),
  z.object({ ...base, kind: z.literal('ladder'), levels: z.array(z.object({ label: z.string(), detail: z.string().optional() }).strict()).min(1), current: z.number().int().optional(), direction: z.enum(['up', 'down']).optional() }).strict(),
  z.object({ ...base, kind: z.literal('hubspoke'), hub: z.object({ label: z.string(), sub: z.string().optional() }).strict(), spokes: z.array(z.object({ label: z.string(), sub: z.string().optional(), href: internalHref.optional() }).strict()).min(3).max(8), edges: z.array(z.string()).optional() }).strict(),
  z.object({ ...base, kind: z.literal('funnel'), stages: z.array(z.object({ label: z.string(), display: z.string().optional(), value: z.number().optional(), note: z.string().optional() }).strict()).min(2), scale: z.enum(['proportional', 'uniform']).optional() }).strict(),
  z.object({ ...base, kind: z.literal('bars'), variant: z.enum(['bar', 'range']).optional(), items: z.array(z.object({ label: z.string(), display: z.string(), value: z.number().optional(), range: z.tuple([z.number(), z.number()]).optional(), approxStart: z.boolean().optional(), openEnd: z.boolean().optional(), unitNote: z.string().optional(), tone: tone.optional(), highlight: z.boolean().optional(), href: internalHref.optional() }).strict()).min(1), min: z.number().optional(), max: z.number().optional(), axisBreakAbove: z.number().optional(), axisLabel: z.string().optional(), ticks: z.array(z.number()).optional(), prefix: z.string().optional(), suffix: z.string().optional(), marker: z.object({ value: z.number(), display: z.string(), label: z.string().optional(), live: z.string().optional() }).strict().optional() }).strict(),
  z.object({ ...base, kind: z.literal('gauge'), value: z.number(), min: z.number(), max: z.number(), display: z.string(), valueText: z.string().optional(), bands: z.array(z.object({ to: z.number(), tone, label: z.string() }).strict()).optional(), ticks: z.array(z.object({ at: z.number(), label: z.string() }).strict()).optional(), live: z.string().optional(), label: z.string().optional() }).strict(),
  z.object({ ...base, kind: z.literal('cycle'), steps: z.array(z.object({ label: z.string(), detail: z.string().optional() }).strict()).min(3).max(8), center: z.string().optional() }).strict(),
  z.object({ ...base, kind: z.literal('swimlane'), lanes: z.array(z.object({ id: z.string(), label: z.string() }).strict()).min(1), steps: z.array(z.object({ lane: z.string(), label: z.string(), detail: z.string().optional() }).strict()).min(1) }).strict(),
  z.object({ ...base, kind: z.literal('equation'), formula: z.string().min(1), example: z.string().optional() }).strict(),
  z.object({ ...base, kind: z.literal('decisiontree'), root: decisionNode, yesLabel: z.string().optional(), noLabel: z.string().optional(), note: z.string().optional() }).strict(),
  z.object({ ...base, kind: z.literal('statusstrip'), items: z.array(z.object({ label: z.string(), status: z.string(), level: tone, href: internalHref.optional(), current: z.boolean().optional() }).strict()).min(1), legend: z.array(z.object({ level: tone, label: z.string() }).strict()).optional(), orientation: z.enum(['row', 'column']).optional(), compact: z.boolean().optional() }).strict(),
]);

/** Frontmatter `diagrams`: id → spec. Ids are what `<!-- diagram: id -->` markers name. */
export const diagramsSchema = z.record(z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'diagram ids are lowercase, digits and hyphens'), diagramSpecSchema);
