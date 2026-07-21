// Vercel serverless function: lead-magnet opt-in handler.
// Adds the subscriber to a Resend audience, emails them the Zero-Ban Protocol,
// and notifies the AdBoost inbox. Uses RESEND_API_KEY (set in Vercel env).

const RESEND = 'https://api.resend.com';
const AUDIENCE_ID = '99818d9d-b799-47ed-85f0-0e1b24f9eaa6'; // "AdBoost Health - Lead Magnet"
const FROM = 'AdBoost Health <hello@adboost.health>';
const NOTIFY = 'hello@adboost.health';
const GUIDE_URL = 'https://www.adboost.health/free/zero-ban-protocol/checklist/';
const CAL_URL = 'https://cal.com/pira-ahilan-ef2dl8/strategy-call';

const isEmail = (e) => typeof e === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

async function resend(path, body) {
  return fetch(`${RESEND}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

function guideEmail(name) {
  const hi = name ? `Hi ${name.split(' ')[0]},` : 'Hi,';
  return `
  <div style="font-family:Geist,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0a0a0f;line-height:1.6">
    <p style="font-size:15px">${hi}</p>
    <p style="font-size:15px">Here's the <strong>Zero-Ban Protocol</strong> — the exact 4-part compliance framework we run on every peptide and GLP-1 Meta account before we spend a dollar: lane, warm-up, copy, creative, and escalation.</p>
    <p style="margin:26px 0">
      <a href="${GUIDE_URL}" style="background:#0057ff;color:#fff;text-decoration:none;padding:13px 22px;border-radius:10px;font-weight:600;font-size:15px;display:inline-block">Open the Zero-Ban Protocol &rarr;</a>
    </p>
    <p style="font-size:15px">Run it top to bottom against your own account before your next launch — and don't skip the foundation (knowing your lane decides everything else).</p>
    <p style="font-size:15px">If you'd rather we just handle compliance, creative, attribution, and scale for you, book a free strategy call and we'll pressure-test your account against this exact protocol:</p>
    <p style="margin:22px 0">
      <a href="${CAL_URL}" style="border:1px solid #0057ff;color:#0057ff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600;font-size:15px;display:inline-block">Book a strategy call &rarr;</a>
    </p>
    <p style="font-size:14px;color:#6b7280;margin-top:28px">— The AdBoost Health team<br/>Growth marketing built exclusively for health &amp; telehealth brands.</p>
  </div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
    body = body || {};
    const name = (body.name || '').toString().trim().slice(0, 120);
    const email = (body.email || '').toString().trim().toLowerCase();
    const source = (body.source || 'unknown').toString().slice(0, 60);

    if (!isEmail(email)) return res.status(400).json({ error: 'Invalid email' });
    if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'Email not configured' });

    // 1. Add to the Resend audience (best-effort; don't fail the request if this errors)
    try {
      await resend(`/audiences/${AUDIENCE_ID}/contacts`, {
        email,
        first_name: name || undefined,
        unsubscribed: false,
      });
    } catch (_) { /* non-fatal */ }

    // 2. Send the guide to the subscriber
    const sent = await resend('/emails', {
      from: FROM,
      to: [email],
      reply_to: NOTIFY,
      subject: 'Your Zero-Ban Protocol is ready',
      html: guideEmail(name),
    });

    // 3. Notify the AdBoost inbox (lead capture)
    resend('/emails', {
      from: FROM,
      to: [NOTIFY],
      subject: `New lead: ${name || email} (${source})`,
      html: `<p><strong>${name || '(no name)'}</strong> &lt;${email}&gt;</p><p>Source: ${source}</p><p>Requested: Zero-Ban Protocol</p>`,
    }).catch(() => {});

    if (!sent.ok) {
      const detail = await sent.text().catch(() => '');
      // The contact was still captured; report a soft error so the UI can decide.
      return res.status(502).json({ error: 'Email send failed', detail: detail.slice(0, 300) });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
