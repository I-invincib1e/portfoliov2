import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.104.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://www.rushikeshpawar.dev';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { type, record, old_record } = payload;

    if (type !== 'UPDATE') {
      return new Response(
        JSON.stringify({ skipped: true, reason: 'Not an UPDATE event' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const wasPublished = old_record?.published === true;
    const isNowPublished = record?.published === true;

    if (wasPublished || !isNowPublished) {
      return new Response(
        JSON.stringify({ skipped: true, reason: 'Not a new publish event' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sb = createClient(SUPABASE_URL, SERVICE_KEY);

    const { data: subscribers, error: subErr } = await sb
      .from('subscribers')
      .select('email')
      .eq('status', 'active');

    if (subErr || !subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ skipped: true, reason: 'No active subscribers' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const post = record;
    const postUrl = `${SITE_URL}/journal/${post.slug}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">

    <div style="margin-bottom:40px;">
      <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#a09888;margin-bottom:6px;">
        New Field Note
      </div>
      <div style="width:40px;height:2px;background-color:#c45d3e;"></div>
    </div>

    <h1 style="font-size:28px;font-weight:400;letter-spacing:-0.03em;line-height:1.2;color:#14110d;margin:0 0 20px;">
      ${post.title}
    </h1>

    ${post.series ? `<p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#a09888;margin:0 0 16px;">Series: ${post.series}</p>` : ''}

    <p style="font-size:16px;line-height:1.7;color:#3a3530;margin:0 0 28px;">
      ${post.excerpt || 'A new field note just dropped. Read the full thing below.'}
    </p>

    <a href="${postUrl}"
       style="display:inline-block;background-color:#14110d;color:#faf8f5;padding:14px 32px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:0.02em;">
      Read the full note &rarr;
    </a>

    <div style="margin:48px 0 24px;border-top:1px solid #e8e2d9;"></div>

    <div style="font-size:12px;color:#a09888;line-height:1.6;">
      <p style="margin:0 0 6px;">Rushikesh Pawar &middot; AI Product Engineer &middot; Mumbai</p>
      <p style="margin:0;">
        You're receiving this because you subscribed at
        <a href="${SITE_URL}" style="color:#a09888;text-decoration:underline;">rushikeshpawar.dev</a>
      </p>
    </div>

  </div>
</body>
</html>`;

    const emails = subscribers.map((s: { email: string }) => s.email);
    const batchSize = 50;
    let sent = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Rushikesh Pawar <hello@rushikeshpawar.dev>',
          bcc: batch,
          to: ['hello@rushikeshpawar.dev'],
          subject: `New: ${post.title}`,
          html,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Resend batch failed at offset ${i}: ${err}`);
      }
      sent += batch.length;
    }

    return new Response(
      JSON.stringify({ success: true, sent, post: post.title }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
