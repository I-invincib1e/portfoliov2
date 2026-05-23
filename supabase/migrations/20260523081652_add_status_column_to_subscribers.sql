/*
  # Add status column to subscribers

  1. Modified Tables
    - `subscribers`
      - Add `status` (text, default 'pending') - tracks subscription state (pending, active, unsubscribed)

  2. Notes
    - Existing rows get 'active' if confirmed=true, 'pending' otherwise
    - Column is NOT NULL with a default
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscribers' AND column_name = 'status' AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.subscribers ADD COLUMN status text NOT NULL DEFAULT 'pending';

    UPDATE public.subscribers SET status = 'active' WHERE confirmed = true;
    UPDATE public.subscribers SET status = 'pending' WHERE confirmed = false;
  END IF;
END $$;