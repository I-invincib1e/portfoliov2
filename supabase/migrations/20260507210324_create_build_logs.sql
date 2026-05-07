/*
  # Create build_logs table

  1. New Tables
    - `build_logs`
      - `id` (uuid, primary key)
      - `slug` (text, unique) — URL slug for the log entry
      - `title` (text) — short title
      - `body_md` (text) — markdown body
      - `tags` (text[]) — short tags like ['shopify', 'billing']
      - `published` (bool) — only published entries render publicly
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `build_logs`
    - Add policy allowing anyone (anon, authenticated) to SELECT only rows where `published = true`
    - No INSERT/UPDATE/DELETE policies — the owner writes via service role or SQL console
  3. Seed
    - Insert four real build log entries from today
*/

CREATE TABLE IF NOT EXISTS build_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  body_md text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE build_logs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'build_logs' AND policyname = 'Public can read published build logs'
  ) THEN
    CREATE POLICY "Public can read published build logs"
      ON build_logs FOR SELECT
      TO anon, authenticated
      USING (published = true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS build_logs_published_created_idx
  ON build_logs (published, created_at DESC);

INSERT INTO build_logs (slug, title, body_md, tags, published, created_at)
VALUES
  (
    'adloom-published-on-shopify',
    'Adloom is live on the Shopify App Store',
    'After weeks of review cycles, Adloom is published. Submitted a final build with tightened billing logic, updated screenshots, and a cleaner onboarding flow. First install within the hour — small, but it counts.\n\nThe biggest lesson: Shopify review prefers boring and predictable. Every "smart" shortcut I had in the billing layer was flagged. Rewriting them to be explicit made both the reviewer and the code happier.',
    ARRAY['shopify', 'launch', 'adloom'],
    true,
    now() - interval '2 hours'
  ),
  (
    'pricing-corruption-bug-fix',
    'Hunting down a pricing corruption bug',
    'A subset of stores saw prices drift by a few cents after applying tiered discounts. Root cause: floating-point drift compounding across a reduce() that re-applied percentages on already-rounded subtotals.\n\nFix: compute every line item against the original amount in integer cents, round exactly once at the end. Added a regression test with a store fixture that used to reproduce the drift. Clean run now.',
    ARRAY['adloom', 'bugfix', 'billing'],
    true,
    now() - interval '5 hours'
  ),
  (
    'tightening-coupon-logic',
    'Tightening coupon and stacking rules',
    'Coupons could silently stack in ways the merchant never configured. Rewrote the eligibility check as a small state machine: one explicit path per combination instead of a chain of nested conditionals.\n\nSide effect: the code is now actually readable. A future me is going to appreciate this.',
    ARRAY['adloom', 'product'],
    true,
    now() - interval '8 hours'
  ),
  (
    'ux-pass-onboarding',
    'A UX pass on Adloom onboarding',
    'Shrunk the first-run flow from 5 steps to 3. Cut the "connect your catalog" modal entirely — it was doing work the install callback could do on its own. Replaced a wall of copy with a three-line explainer and a single primary action.\n\nTime-to-first-campaign on staging: down from ~4 min to ~90 seconds.',
    ARRAY['adloom', 'ux'],
    true,
    now() - interval '11 hours'
  )
ON CONFLICT (slug) DO NOTHING;
