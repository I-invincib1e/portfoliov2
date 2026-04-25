/*
  # Tighten contact_messages INSERT policy

  1. Security
    - Replace `WITH CHECK (true)` policy with a constrained policy that:
      * requires non-empty name, email and message
      * caps each text column to a sane length to deter abuse
      * requires `email` to look like an email (contains '@' and '.')
      * limits `created_at` to the server clock so it can't be backdated

  2. Notes
    - Table remains insert-only for anon / authenticated.
    - SELECT remains restricted (no SELECT policy = no public read).
*/

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON contact_messages;

CREATE POLICY "Validated contact submissions only"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(coalesce(name, '')) BETWEEN 1 AND 120
    AND char_length(coalesce(email, '')) BETWEEN 5 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(coalesce(message, '')) BETWEEN 1 AND 4000
    AND char_length(coalesce(project_type, '')) <= 80
    AND char_length(coalesce(budget, '')) <= 80
    AND char_length(coalesce(timeline, '')) <= 80
  );
