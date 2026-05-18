-- Spusťte v Supabase SQL Editoru (Dashboard → SQL → New query)

CREATE TABLE IF NOT EXISTS public.spoluprace_registrations (
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

CREATE INDEX IF NOT EXISTS spoluprace_registrations_created_at_idx
  ON public.spoluprace_registrations (created_at DESC);

CREATE INDEX IF NOT EXISTS spoluprace_registrations_email_idx
  ON public.spoluprace_registrations (email);

COMMENT ON TABLE public.spoluprace_registrations IS 'Žádosti o spolupráci z formuláře /spoluprace';

ALTER TABLE public.spoluprace_registrations ENABLE ROW LEVEL SECURITY;

-- Stejné oprávnění jako u beautybox_registrations (admin přes anon klíč)
CREATE POLICY "spoluprace_select"
  ON public.spoluprace_registrations FOR SELECT
  USING (true);

CREATE POLICY "spoluprace_insert"
  ON public.spoluprace_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "spoluprace_delete"
  ON public.spoluprace_registrations FOR DELETE
  USING (true);
