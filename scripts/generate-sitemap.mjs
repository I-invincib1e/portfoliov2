import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';

const SITE_URL = process.env.VITE_SITE_URL || 'https://rushikeshpawar.com';
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

const baseUrls = [
  { loc: '/',               changefreq: 'weekly',  priority: '1.0' },
  { loc: '/projects',       changefreq: 'weekly',  priority: '0.9' },
  { loc: '/journal',        changefreq: 'weekly',  priority: '0.9' },
  { loc: '/certifications', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact',        changefreq: 'monthly', priority: '0.8' },
];

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const wrap = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url>
    <loc>${escape(`${SITE_URL}${e.loc}`)}</loc>${e.lastmod ? `
    <lastmod>${e.lastmod}</lastmod>` : ''}
    <changefreq>${e.changefreq ?? 'monthly'}</changefreq>
    <priority>${e.priority ?? '0.5'}</priority>
  </url>`).join('\n')}
</urlset>
`;

async function run() {
  const entries = [...baseUrls];

  if (url && key) {
    try {
      const sb = createClient(url, key);
      const { data: posts } = await sb
        .from('posts')
        .select('slug, published_at, updated_at, tags, series_slug')
        .eq('published', true);
      for (const p of posts ?? []) {
        entries.push({
          loc: `/journal/${p.slug}`,
          lastmod: (p.updated_at ?? p.published_at ?? '').slice(0, 10),
          changefreq: 'monthly', priority: '0.7',
        });
      }
      const tags = new Set();
      for (const p of posts ?? []) (p.tags ?? []).forEach(t => tags.add(t));
      for (const t of tags) {
        entries.push({ loc: `/journal/tag/${encodeURIComponent(t)}`, changefreq: 'weekly', priority: '0.5' });
      }
      const seriesSlugs = new Set();
      for (const p of posts ?? []) if (p.series_slug) seriesSlugs.add(p.series_slug);
      for (const s of seriesSlugs) {
        entries.push({ loc: `/journal/series/${s}`, changefreq: 'weekly', priority: '0.6' });
      }

      const { data: projects } = await sb.from('projects').select('slug, updated_at').eq('published', true);
      // Project detail pages aren't routed yet; skip.
      void projects;
    } catch (e) {
      console.warn('[sitemap] supabase fetch failed, falling back to static:', e?.message ?? e);
    }
  } else {
    console.warn('[sitemap] missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — generating static sitemap only.');
  }

  const xml = wrap(entries);
  const out = resolve(process.cwd(), 'dist', 'sitemap.xml');
  await writeFile(out, xml, 'utf8');
  console.log(`[sitemap] wrote ${entries.length} urls → ${out}`);
}

run().catch(e => { console.error(e); process.exit(1); });
