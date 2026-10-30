// Newsletter signup (client side). Posts to the shared admin endpoint, which
// stores the signup in Supabase and subscribes the contact in Resend.
// The consent strings MUST match adboost-admin/lib/newsletter/brands.ts
// (the server stores its own copy as the CASL record).

export const SUBSCRIBE_URL = 'https://admin.adboost.health/api/subscribe';

export const CONSENT_NEWSLETTER =
  'Get the AdBoost Health newsletter: ad policy changes and growth notes for health and wellness brands. Unsubscribe anytime.';
export const CONSENT_LEAD_MAGNET =
  "We'll email you the protocol and add you to the AdBoost Health newsletter. Unsubscribe anytime.";

export const NL_KEYS = { sub: 'ab_nl_sub', dismiss: 'ab_nl_dismiss', visit: 'ab_nl_visit' } as const;

export function store(kind: 'local' | 'session', key: string, value?: string): string | null {
  try {
    const s = kind === 'local' ? localStorage : sessionStorage;
    if (value === undefined) return s.getItem(key);
    s.setItem(key, value);
  } catch {}
  return null;
}

/** Where this visitor came from: page, referrer, utm, plus t.js visitor id and first touch. */
export function attribution(): Record<string, unknown> {
  const qs = new URLSearchParams(location.search);
  const utm: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const v = qs.get(k);
    if (v) utm[k] = v;
  }
  let first: { landing?: string; channel?: string } = {};
  try {
    first = JSON.parse(store('local', 'ab_ft') || '{}');
  } catch {}
  return {
    page: location.pathname,
    referrer: document.referrer || null,
    utm,
    visitor_id: (store('local', 'ab_vid') || '').split('|')[0] || null,
    first_landing: first.landing ?? null,
    first_channel: first.channel ?? null,
  };
}

/** text/plain keeps it a "simple" CORS request: no preflight round trip. */
export async function subscribe(payload: Record<string, unknown>): Promise<void> {
  const res = await fetch(SUBSCRIBE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = 'Something went wrong. Please try again.';
    try {
      const j = await res.json();
      if (j?.error === 'Invalid email') msg = 'Please enter a valid email address.';
    } catch {}
    throw new Error(msg);
  }
  store('local', NL_KEYS.sub, '1');
}

export function track(location: string): void {
  const w = window as unknown as { abTrack?: (e: string, p: Record<string, string>) => void };
  try {
    w.abTrack?.('lead_captured', { cta_location: location });
  } catch {}
}
