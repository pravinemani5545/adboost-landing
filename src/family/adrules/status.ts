// Status helpers for the ad compliance pages on the family layer (src/family/adrules).
// The colours are the ones every status already has (src/components/adv/status.ts, STATUS_TONE:
// allowed green, restricted amber, requires certification blue, prohibited red); this file only
// maps them onto the family pill tones and picks a platform icon. Statuses are never ranked.
import { STATUS_LABEL, type Platform, type PolicyStatus } from '../../data/adPolicies';
import { STATUS_TONE } from '../../components/adv/status';
import { TONE_MARK } from '../../kit/diagram/util';
import type { Tone as KitTone } from '../../kit/diagram/types';
import type { Tone } from '../graphics/types';

const PILL: Record<KitTone, Tone> = { ok: 'ok', warn: 'warn', accent: '', bad: 'bad', muted: 'n' };

/** The family pill tone of a kit tone (accent is the section blue). */
export const pillOf = (t: KitTone): Tone => PILL[t];
/** The family pill tone of a policy status. */
export const statusPill = (s: PolicyStatus): Tone => PILL[STATUS_TONE[s]];
/** The mark a status badge carries (decorative; the label carries the meaning). */
export const statusMark = (s: PolicyStatus) => TONE_MARK[STATUS_TONE[s]];

/** The four statuses in STATUS_LABEL order, as legend rows. */
export const LEGEND = (Object.keys(STATUS_LABEL) as PolicyStatus[]).map((s) => ({
  status: s,
  label: STATUS_LABEL[s],
  level: STATUS_TONE[s],
  mark: TONE_MARK[STATUS_TONE[s]],
}));

/** Icon per platform (graphics/icons.ts): a feed post, a search result, a short video. */
export const PLATFORM_ICON: Record<Platform, string> = { Meta: 'feed', Google: 'search', TikTok: 'video' };

/** HTML-escape plain text from the data files before passing it as trusted HTML. */
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
