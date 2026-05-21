import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') ?? 'rushikesh@rushikeshpawar.com';

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

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #14110d; border-bottom: 1px solid #e8e2d9; padding-bottom: 12px;">
          New Contact from ${name}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px 0; color: #888; width: 100px;">From</td><td>${name} &lt;${email}&gt;</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Type</td><td>${project_type}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Budget</td><td>${budget}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Timeline</td><td>${timeline}</td></tr>
        </table>
        <div style="background: #f9f7f4; padding: 20px; border-radius: 4px; margin-top: 16px;">
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 13px; color: #888;">
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
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
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend API error: ${err}`);
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
