/*
  # Projects + Field Notes (Posts)

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `summary` (text)
      - `description` (text)
      - `tags` (text[])
      - `cover_url` (text)
      - `repo_url` (text)
      - `live_url` (text)
      - `featured` (bool)
      - `position` (int) — manual sort
      - `published` (bool)
      - `created_at`, `updated_at` (timestamptz)
    - `posts` — Field Notes
      - `id`, `slug` (unique), `title`, `excerpt`, `cover_url`,
        `tags` (text[]), `series` (text), `stage` (text),
        `confidence` (int 1-5), `reading_time_min` (int),
        `sections` (jsonb)  — chapter schema for "Field Notes"
        `published` (bool), `published_at`, `updated_at`,
        `view_count` (int)

  2. Security
    - RLS enabled on both
    - Public SELECT only for `published = true`

  3. Notes
    - Seed projects from current site config so nothing is lost
    - Seed one example Field Note so /journal isn't empty
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  cover_url text NOT NULL DEFAULT '',
  repo_url text NOT NULL DEFAULT '',
  live_url text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  position integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read published projects" ON projects;
CREATE POLICY "Anyone can read published projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  cover_url text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  series text NOT NULL DEFAULT '',
  stage text NOT NULL DEFAULT 'idea',
  confidence integer NOT NULL DEFAULT 3,
  reading_time_min integer NOT NULL DEFAULT 4,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  view_count integer NOT NULL DEFAULT 0
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read published posts" ON posts;
CREATE POLICY "Anyone can read published posts"
  ON posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- seed projects
INSERT INTO projects (slug, title, summary, description, tags, cover_url, repo_url, live_url, featured, position)
SELECT * FROM (VALUES
  ('pyscrape', 'Pyscrape',
   'Professional Python web scraper with multi-backend support.',
   'Built by analyzing simple scrapers and integrating powerful libraries for resilient extraction.',
   ARRAY['Python','Web Scraping','BeautifulSoup','Selenium'],
   'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   'https://github.com/I-invincib1e/Pyscrape', '', true, 10),
  ('cleanengine', 'CleanEngine',
   'Automated data cleaning, profiling and EDA in one engine.',
   'Streamlines preprocessing so you can move from raw rows to model-ready data without yak-shaving.',
   ARRAY['Python','Data Cleaning','EDA','Pandas'],
   'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   'https://github.com/I-invincib1e/CleanEngine', '', true, 20),
  ('go-pro', 'Go-Pro',
   'Practical, beginner-friendly Go projects.',
   'A growing toolkit of small Go programs designed to teach idiomatic patterns.',
   ARRAY['Go','Backend','Learning'],
   'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   'https://github.com/I-invincib1e/Go-Pro', '', true, 30),
  ('quick-link', 'Quick-Link',
   'Fast URL shortener with a clean dashboard.',
   'Custom slugs, click metrics and a backend designed for low-latency redirects.',
   ARRAY['JavaScript','Backend','URL Shortener'],
   'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   'https://github.com/I-invincib1e/Quick-Link', '', true, 40),
  ('here-i-come-python', 'Here I Come, Python',
   'A complete Python learning guide from basics to advanced.',
   'Tutorials and exercises designed to take a curious reader from zero to building.',
   ARRAY['Python','Education','Tutorial'],
   'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   'https://github.com/I-invincib1e/Here-i-come-Python', '', false, 50)
) AS v(slug, title, summary, description, tags, cover_url, repo_url, live_url, featured, position)
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE projects.slug = v.slug);

-- seed one Field Note
INSERT INTO posts (slug, title, excerpt, cover_url, tags, series, stage, confidence, reading_time_min, sections, published, published_at)
SELECT
  'designing-credit-system-skillbarter',
  'Designing the credit system for SkillBarter',
  'How a "fair" fixed-price exchange almost killed the marketplace, and the dynamic credit bands that brought it back.',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1',
  ARRAY['marketplace','economy','design'],
  'SkillBarter Logs',
  'live',
  4,
  6,
  '[
    {"kind":"premise","body":"A simple economy is rarely fair, and a fair economy is never simple."},
    {"kind":"stakes","body":"SkillBarter let people trade hours of skill for hours of skill. The pitch was clean. The reality was that an hour of legal advice and an hour of resume editing are not the same hour, and pretending otherwise broke trust faster than any bug ever did."},
    {"kind":"hypothesis","body":"My first instinct was a flat 1:1 credit. Everyone gets the same currency, everyone trades freely. I assumed liquidity would solve everything.","confidence":2},
    {"kind":"friction","body":"Liquidity collapsed. High-skill users left in the first two weeks because their hour was worth more than they were getting back. Low-skill users hoarded credits. The marketplace silently turned into a charity drive."},
    {"kind":"resolution","body":"I introduced credit bands tied to category demand and median session ratings. The credit you earn floats inside a band, the credit you spend follows the same rule. The result is closer to an FX market than a fixed price-list, and incentives finally pointed the same way."},
    {"kind":"field_note","body":"Economy is the feature. If your trade loop is broken, no UI polish will save it. Next time I would model the economy in a spreadsheet for a weekend before writing a single migration."}
  ]'::jsonb,
  true,
  now()
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug = 'designing-credit-system-skillbarter');
