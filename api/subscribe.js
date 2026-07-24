// Vercel serverless function: lead-magnet opt-in handler.
// Adds the subscriber to a Resend audience, emails them the Zero-Ban Protocol,
// and notifies the AdBoost inbox. Uses RESEND_API_KEY (set in Vercel env).

const RESEND = 'https://api.resend.com';
const AUDIENCE_ID = '99818d9d-b799-47ed-85f0-0e1b24f9eaa6'; // "AdBoost Health - Lead Magnet"
const FROM = 'Pira Ahilan <hello@adboost.health>';
const NOTIFY = 'hello@adboost.health';
const UTM = '?utm_source=lead-magnet&utm_medium=email&utm_campaign=zero-ban-protocol';
const GUIDE_URL = `https://www.adboost.health/zero-ban-protocol/checklist/${UTM}`;
const CAL_URL = `https://cal.com/pira-ahilan-ef2dl8/strategy-call${UTM}`;

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
  const hi = name ? `Hey ${name.split(' ')[0]},` : 'Hey there,';
  const link = 'color:#0057ff;font-weight:600;text-decoration:underline;text-underline-offset:2px';
  return `
  <div style="font-family:Geist,Arial,sans-serif;max-width:540px;margin:0 auto;color:#0a0a0f;font-size:15px;line-height:1.62">
    <p>${hi}</p>
    <p>Here's the Zero-Ban Protocol you asked for.</p>
    <p style="margin:4px 0 22px"><a href="${GUIDE_URL}" style="${link}">&rarr; Open the protocol</a></p>
    <p>Quick thing before your next launch.</p>
    <p><strong>Most health accounts don't get banned for lying &mdash; they get banned for the format.</strong> A single before-and-after image, or the word &ldquo;peptide&rdquo; sitting in a caption, will flag an otherwise-clean ad. Meta's review reads the surface first.</p>
    <p><strong>The fix isn't softer claims. It's sequencing.</strong> Warm the account, stay conservative while you have no history to spend, and earn the right to run the aggressive angles later &mdash; not on day one.</p>
    <p>Inside, I break down the exact 5-checkpoint protocol we run on every peptide and GLP-1 account before we spend a dollar &mdash; lane, warm-up, copy, creative, scale &mdash; with the rejected ads and the compliant rewrites that still convert.</p>
    <p style="margin:4px 0 26px"><a href="${GUIDE_URL}" style="${link}">&rarr; Open the Zero-Ban Protocol</a></p>
    <p>If you'd rather we just run it for you &mdash; compliance, creative, attribution, and scale &mdash; reply to this email or <a href="${CAL_URL}" style="${link}">book a strategy call</a> and we'll pressure-test your account against this exact protocol.</p>
    <p style="margin-top:26px">&mdash; Pira</p>
    <p style="font-size:13.5px;color:#6b7280;margin-top:4px">Pira Ahilan · AdBoost Health<br/>Growth for peptide &amp; GLP-1 brands &mdash; compliance, creative, and scale.</p>
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
    const phoneRaw = (body.phone || '').toString().trim().slice(0, 32);
    const country = (body.country || '').toString().trim().slice(0, 4);
    // Keep only digits, +, spaces, dashes, parens; drop anything else.
    const phone = phoneRaw.replace(/[^0-9+\-() ]/g, '').slice(0, 24);

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
    const phoneLine = phone
      ? `<p>Phone: ${country ? country + ' ' : ''}${phone}</p>`
      : '';
    resend('/emails', {
      from: FROM,
      to: [NOTIFY],
      subject: `New lead: ${name || email} (${source})`,
      html: `<p><strong>${name || '(no name)'}</strong> &lt;${email}&gt;</p>${phoneLine}<p>Source: ${source}</p><p>Requested: Zero-Ban Protocol</p>`,
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
