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
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://rushikeshpawar.dev';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { post_slug, subject_override } = await req.json();

    if (!post_slug) {
      return new Response(
        JSON.stringify({ error: 'post_slug is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sb = createClient(SUPABASE_URL, SERVICE_KEY);

    const { data: post, error: postErr } = await sb
      .from('posts')
      .select('title, excerpt, slug, series, tags')
      .eq('slug', post_slug)
      .eq('published', true)
      .maybeSingle();

    if (postErr || !post) {
      return new Response(
        JSON.stringify({ error: 'Post not found or not published' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: subscribers, error: subErr } = await sb
      .from('subscribers')
      .select('email')
      .eq('status', 'active');

    if (subErr || !subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No active subscribers', count: 0 }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const postUrl = `${SITE_URL}/journal/${post.slug}`;
    const subject = subject_override || `New: ${post.title}`;

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 580px; margin: 0 auto; color: #14110d;">
        <div style="border-bottom: 1px solid #e8e2d9; padding-bottom: 16px; margin-bottom: 24px;">
          <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888;">
            Rushikesh Pawar — Field Note
          </span>
        </div>

        <h1 style="font-size: 28px; font-weight: 400; letter-spacing: -0.02em; line-height: 1.2; margin: 0 0 16px;">
          ${post.title}
        </h1>

        ${post.series ? `<p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 16px;">Series: ${post.series}</p>` : ''}

        <p style="font-size: 16px; line-height: 1.6; color: #444; margin: 0 0 28px;">
          ${post.excerpt}
        </p>

        <a href="${postUrl}" style="display: inline-block; background: #14110d; color: #faf8f5; padding: 14px 28px; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 0;">
          Read the full note →
        </a>

        <div style="margin-top: 48px; padding-top: 20px; border-top: 1px solid #e8e2d9; font-size: 12px; color: #aaa;">
          <p>You're receiving this because you subscribed at rushikeshpawar.dev</p>
        </div>
      </div>
    `;

    const emails = subscribers.map((s: { email: string }) => s.email);

    // Resend supports batch sending up to 100 recipients per call
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
          from: 'Rushikesh Pawar <newsletter@rushikeshpawar.dev>',
          bcc: batch,
          to: ['newsletter@rushikeshpawar.dev'],
          subject,
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
