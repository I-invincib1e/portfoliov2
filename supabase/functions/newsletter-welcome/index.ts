import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://www.rushikeshpawar.dev";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">

    <!-- Header -->
    <div style="margin-bottom:40px;">
      <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#a09888;margin-bottom:6px;">
        Rishi's Newsletter
      </div>
      <div style="width:40px;height:2px;background-color:#c45d3e;"></div>
    </div>

    <!-- Main -->
    <h1 style="font-size:32px;font-weight:400;letter-spacing:-0.03em;line-height:1.15;color:#14110d;margin:0 0 24px;">
      You're in. Welcome.
    </h1>

    <p style="font-size:16px;line-height:1.7;color:#3a3530;margin:0 0 20px;">
      Thanks for subscribing. I write about what I'm building, what broke, what
      worked, and the messy middle of shipping AI products and tools.
    </p>

    <p style="font-size:16px;line-height:1.7;color:#3a3530;margin:0 0 20px;">
      These aren't polished think-pieces. They're field notes &mdash; raw, honest,
      and written while the build is still warm.
    </p>

    <p style="font-size:16px;line-height:1.7;color:#3a3530;margin:0 0 32px;">
      You'll hear from me when there's something worth sharing. No filler, no fluff.
    </p>

    <!-- CTA -->
    <a href="${SITE_URL}/writing"
       style="display:inline-block;background-color:#14110d;color:#faf8f5;padding:14px 32px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:0.02em;">
      Read past notes &rarr;
    </a>

    <!-- Divider -->
    <div style="margin:48px 0 24px;border-top:1px solid #e8e2d9;"></div>

    <!-- Footer -->
    <div style="font-size:12px;color:#a09888;line-height:1.6;">
      <p style="margin:0 0 6px;">
        Rushikesh Pawar &middot; AI Product Engineer &middot; Mumbai
      </p>
      <p style="margin:0;">
        <a href="${SITE_URL}" style="color:#a09888;text-decoration:underline;">rushikeshpawar.dev</a>
      </p>
    </div>

  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rushikesh Pawar <hello@rushikeshpawar.dev>",
        to: [email],
        subject: "Welcome to Rishi's Newsletter",
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend API error: ${err}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
