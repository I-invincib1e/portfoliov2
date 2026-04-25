/*
  # Now Widget Table

  1. New Tables
    - `now_widget`
      - `id` (uuid, primary key)
      - `location` (text) - "Mumbai, IN"
      - `status` (text) - short status line
      - `currently_reading` (text)
      - `currently_listening` (text)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Public SELECT (it's displayed in the hero)

  3. Seed
    - Insert one default row
*/

CREATE TABLE IF NOT EXISTS now_widget (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL DEFAULT 'Mumbai, IN',
  status text NOT NULL DEFAULT 'Open for Q3 / 2026',
  currently_reading text NOT NULL DEFAULT 'Designing Programmes — Karl Gerstner',
  currently_listening text NOT NULL DEFAULT 'Bonobo — Fragments',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE now_widget ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read now_widget" ON now_widget;
CREATE POLICY "Anyone can read now_widget"
  ON now_widget FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO now_widget (location, status, currently_reading, currently_listening)
SELECT 'Mumbai, IN', 'Open for Q3 / 2026', 'Designing Programmes — Karl Gerstner', 'Bonobo — Fragments'
WHERE NOT EXISTS (SELECT 1 FROM now_widget);
