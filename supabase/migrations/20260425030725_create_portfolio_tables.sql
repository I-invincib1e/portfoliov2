/*
  # Portfolio Content & Contact Tables

  1. New Tables
    - `availability`
      - `id` (uuid, primary key)
      - `status` (text) - "available", "selectively_open", "closed"
      - `message` (text) - short status note
      - `updated_at` (timestamptz)
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `project_type` (text)
      - `budget` (text)
      - `timeline` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - `availability`: anyone (anon + authenticated) can SELECT (public status badge)
    - `contact_messages`: anon + authenticated can INSERT (submit form), SELECT restricted to authenticated users only

  3. Seed
    - Insert one default availability row
*/

CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'available',
  message text NOT NULL DEFAULT 'Available for select Q3 collaborations',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read availability" ON availability;
CREATE POLICY "Anyone can read availability"
  ON availability FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  budget text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON contact_messages;
CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can read their inbox" ON contact_messages;
CREATE POLICY "Authenticated can read their inbox"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO availability (status, message)
SELECT 'available', 'Available for select Q3 collaborations'
WHERE NOT EXISTS (SELECT 1 FROM availability);
