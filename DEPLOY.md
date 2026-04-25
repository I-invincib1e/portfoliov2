# Deploying to Vercel

## One-time setup

1. Push the repo to GitHub / GitLab / Bitbucket.
2. On vercel.com → **Add New… → Project** → import the repo.
3. Vercel auto-detects Vite from `vercel.json`. Leave the build settings as-is.
4. Add the following **Environment Variables** (Production + Preview + Development):

   | Name                    | Value                              |
   | ----------------------- | ---------------------------------- |
   | `VITE_SUPABASE_URL`     | your Supabase project URL          |
   | `VITE_SUPABASE_ANON_KEY`| your Supabase anon (public) key    |

5. Click **Deploy**. The first deploy takes ~60s.

## Custom domain

`Project → Settings → Domains` → add your domain. Vercel auto-issues SSL.

## How routing works

The site is a Vite SPA. `vercel.json` rewrites every non-asset path to
`/index.html`, so direct visits to `/journal/:slug`, `/projects`, etc.
resolve correctly.

## Performance

- `/assets/*` and static binaries ship with `Cache-Control: public, max-age=31536000, immutable` so repeat visits are near-instant.
- `index.html` is `must-revalidate` so deploys roll out instantly.
- Speed Insights and Web Analytics are wired in `src/main.tsx` — view scores in the Vercel dashboard.

## Updating content

- **Projects**: insert / update rows in the Supabase `projects` table (`published = true` to publish).
- **Field Notes**: insert rows in the Supabase `posts` table. The journal index, slug page, tag page, series page, sitemap and RSS feed pick them up automatically.
- **Series metadata**: edit the Supabase `series` table to change colours and summaries.

## Rolling back

Vercel keeps every deployment. `Project → Deployments → … → Promote to Production` on any prior deploy to roll back instantly.
