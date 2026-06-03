-- Spusťte v Supabase SQL Editoru (Dashboard → SQL → New query)

CREATE TABLE IF NOT EXISTS public.spoluvkondici_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT,
  zip TEXT,
  city TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS spoluvkondici_registrations_created_at_idx
  ON public.spoluvkondici_registrations (created_at DESC);

CREATE INDEX IF NOT EXISTS spoluvkondici_registrations_email_idx
  ON public.spoluvkondici_registrations (email);

COMMENT ON TABLE public.spoluvkondici_registrations IS 'Přihlášky do projektu Spolu v Kondici z formuláře /spolu-v-kondici';

ALTER TABLE public.spoluvkondici_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "spoluvkondici_select"
  ON public.spoluvkondici_registrations FOR SELECT
  USING (true);

CREATE POLICY "spoluvkondici_insert"
  ON public.spoluvkondici_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "spoluvkondici_delete"
  ON public.spoluvkondici_registrations FOR DELETE
  USING (true);
