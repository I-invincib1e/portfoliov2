/*
  # Field Notes v2 — series, subscribers, view RPC

  1. New Tables
    - `series`
      - `slug` (text, primary key)
      - `title` (text), `summary` (text), `accent_color` (text)
      - `created_at` (timestamptz)
    - `subscribers`
      - `id` (uuid PK)
      - `email` (text, unique, not null)
      - `confirmed` (bool default false)
      - `created_at` (timestamptz)

  2. Posts
    - Add `series_slug` (text, FK-soft to series.slug)
    - Add `related_slugs` (text[]) for editorial-curated related posts
    - Backfill from existing `series` text where match exists

  3. RPC
    - `increment_post_view(slug text)` — atomic counter bump

  4. Security
    - RLS enabled on all
    - `series`: public SELECT
    - `subscribers`: public INSERT only (no SELECT, no UPDATE, no DELETE) so emails stay private
*/

CREATE TABLE IF NOT EXISTS series (
  slug text PRIMARY KEY,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  accent_color text NOT NULL DEFAULT '#e26a3d',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE series ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read series" ON series;
CREATE POLICY "Anyone can read series"
  ON series FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  confirmed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe" ON subscribers;
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND char_length(email) <= 254);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'series_slug'
  ) THEN
    ALTER TABLE posts ADD COLUMN series_slug text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'related_slugs'
  ) THEN
    ALTER TABLE posts ADD COLUMN related_slugs text[] NOT NULL DEFAULT '{}';
  END IF;
END $$;

INSERT INTO series (slug, title, summary, accent_color)
SELECT 'skillbarter-logs', 'SkillBarter Logs',
  'A live build log for SkillBarter — economy design, marketplace UX, and the friction in between.',
  '#e26a3d'
WHERE NOT EXISTS (SELECT 1 FROM series WHERE slug = 'skillbarter-logs');

UPDATE posts
SET series_slug = 'skillbarter-logs'
WHERE series = 'SkillBarter Logs' AND (series_slug IS NULL OR series_slug = '');

CREATE OR REPLACE FUNCTION increment_post_view(post_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE slug = post_slug AND published = true;
END;
$$;

REVOKE ALL ON FUNCTION increment_post_view(text) FROM public;
GRANT EXECUTE ON FUNCTION increment_post_view(text) TO anon, authenticated;
