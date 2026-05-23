import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') ?? 'rushikeshpawar@zevv.xyz';
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://rushikeshpawar.com';

function buildOwnerNotification(name: string, email: string, project_type: string, budget: string, timeline: string, message: string): string {
  return `
<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#14110d;border-bottom:1px solid #e8e2d9;padding-bottom:12px;">
    New Contact from ${name}
  </h2>
  <table style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tr><td style="padding:8px 0;color:#888;width:100px;">From</td><td>${name} &lt;${email}&gt;</td></tr>
    <tr><td style="padding:8px 0;color:#888;">Type</td><td>${project_type}</td></tr>
    <tr><td style="padding:8px 0;color:#888;">Budget</td><td>${budget}</td></tr>
    <tr><td style="padding:8px 0;color:#888;">Timeline</td><td>${timeline}</td></tr>
  </table>
  <div style="background:#f9f7f4;padding:20px;border-radius:4px;margin-top:16px;">
    <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${message}</p>
  </div>
  <p style="margin-top:24px;font-size:13px;color:#888;">
    Reply directly to this email to respond to ${name}.
  </p>
</div>`;
}

function buildAutoReply(name: string, project_type: string): string {
  const firstName = name.split(' ')[0];
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">

    <!-- Header -->
    <div style="margin-bottom:40px;">
      <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#a09888;margin-bottom:6px;">
        Rushikesh Pawar
      </div>
      <div style="width:40px;height:2px;background-color:#c45d3e;"></div>
    </div>

    <!-- Main -->
    <h1 style="font-size:28px;font-weight:400;letter-spacing:-0.03em;line-height:1.2;color:#14110d;margin:0 0 24px;">
      Got it, ${firstName}. Thanks for reaching out.
    </h1>

    <p style="font-size:16px;line-height:1.7;color:#3a3530;margin:0 0 20px;">
      Your message about <strong style="color:#14110d;">${project_type}</strong> just landed in my inbox.
      I read everything personally and usually reply within <strong style="color:#14110d;">48 hours</strong>.
    </p>

    <p style="font-size:16px;line-height:1.7;color:#3a3530;margin:0 0 20px;">
      In the meantime, feel free to explore some of my recent work and writing &mdash;
      it might give us a head start when we connect.
    </p>

    <!-- CTA buttons -->
    <div style="margin:32px 0;">
      <a href="${SITE_URL}/projects"
         style="display:inline-block;background-color:#14110d;color:#faf8f5;padding:14px 28px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:0.02em;margin-right:12px;margin-bottom:8px;">
        View projects &rarr;
      </a>
      <a href="${SITE_URL}/writing"
         style="display:inline-block;background-color:transparent;color:#14110d;padding:13px 28px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:0.02em;border:1px solid #14110d;">
        Read builder notes
      </a>
    </div>

    <p style="font-size:15px;line-height:1.7;color:#3a3530;margin:0 0 8px;">
      Talk soon,
    </p>
    <p style="font-size:16px;font-weight:500;color:#14110d;margin:0;">
      Rishi
    </p>

    <!-- Divider -->
    <div style="margin:40px 0 24px;border-top:1px solid #e8e2d9;"></div>

    <!-- Footer -->
    <div style="font-size:12px;color:#a09888;line-height:1.6;">
      <p style="margin:0 0 6px;">
        Rushikesh Pawar &middot; AI Product Engineer &middot; Mumbai
      </p>
      <p style="margin:0;">
        <a href="${SITE_URL}" style="color:#a09888;text-decoration:underline;">rushikeshpawar.com</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, project_type, budget, timeline, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ownerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <notifications@rushikeshpawar.com>',
        to: [NOTIFY_EMAIL],
        reply_to: email,
        subject: `New inquiry from ${name} — ${project_type}`,
        html: buildOwnerNotification(name, email, project_type, budget, timeline, message),
      }),
    });

    if (!ownerRes.ok) {
      const err = await ownerRes.text();
      throw new Error(`Resend API error (owner notify): ${err}`);
    }

    const replyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Rushikesh Pawar <hello@rushikeshpawar.com>',
        to: [email],
        reply_to: NOTIFY_EMAIL,
        subject: `Got your message, ${name.split(' ')[0]} — I'll be in touch`,
        html: buildAutoReply(name, project_type),
      }),
    });

    if (!replyRes.ok) {
      const replyErr = await replyRes.text();
      console.error(`Auto-reply failed: ${replyErr}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
