import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.104.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://www.rushikeshpawar.dev';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const escape = (s: string) =>
  (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const sb = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: posts, error } = await sb
      .from('posts')
      .select('slug, title, excerpt, published_at, updated_at, tags, series, sections')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    const items = (posts ?? []).map((p) => {
      const premise = (p.sections ?? []).find((s: { kind: string }) => s.kind === 'premise');
      const description = escape(p.excerpt || (premise?.body ?? ''));
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE_URL}/journal/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/journal/${p.slug}</guid>
      <pubDate>${p.published_at ? new Date(p.published_at).toUTCString() : new Date().toUTCString()}</pubDate>
      ${(p.tags ?? []).map((t: string) => `<category>${escape(t)}</category>`).join('')}
      ${p.series ? `<category>${escape(p.series)}</category>` : ''}
      <description>${description}</description>
    </item>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Field Notes — Rushikesh Pawar</title>
    <link>${SITE_URL}/journal</link>
    <description>A builder journal — premise, friction, resolution.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/journal/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=600, s-maxage=3600',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
