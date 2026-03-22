-- ============================================================
-- RESURGE AFFILIATE FUNNEL — SUPABASE DATABASE SETUP
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/kqcitkqsoyjgutygtwmr/sql/new
-- ============================================================

-- 1. LEADS TABLE
-- Stores every email submitted on the funnel landing page
CREATE TABLE IF NOT EXISTS public.leads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  source          TEXT DEFAULT 'funnel',          -- where they came from
  ip              TEXT,                            -- optional: track traffic source
  user_agent      TEXT,                            -- optional: device info
  redirected      BOOLEAN DEFAULT TRUE,            -- did they get sent to Resurge?
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);

-- 2. EMAIL SEQUENCE TRACKING TABLE
-- Tracks which follow-up emails have been sent to each lead
CREATE TABLE IF NOT EXISTS public.email_log (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id         UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  sequence_day    INT NOT NULL,                    -- Day 1, Day 2, Day 3...
  subject         TEXT,
  status          TEXT DEFAULT 'pending',          -- pending | sent | failed
  sent_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS email_log_lead_idx ON public.email_log (lead_id);
CREATE INDEX IF NOT EXISTS email_log_status_idx ON public.email_log (status);

-- 3. CLICKS TABLE (optional but powerful)
-- Track every click on your affiliate link from the funnel
CREATE TABLE IF NOT EXISTS public.clicks (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id         UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  source          TEXT DEFAULT 'funnel_redirect',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- Allow anon to INSERT leads (funnel signup)
CREATE POLICY "Anyone can submit their email"
  ON public.leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only service role can SELECT leads (your backend/dashboard only)
CREATE POLICY "Service role reads all leads"
  ON public.leads FOR SELECT
  TO service_role
  USING (true);

-- Service role full access to email_log
CREATE POLICY "Service role manages email log"
  ON public.email_log FOR ALL
  TO service_role
  USING (true);

-- Service role full access to clicks
CREATE POLICY "Service role manages clicks"
  ON public.clicks FOR ALL
  TO service_role
  USING (true);

-- ============================================================
-- VIEWS — Easy dashboards
-- ============================================================

-- Daily leads summary
CREATE OR REPLACE VIEW public.leads_daily AS
  SELECT
    DATE(created_at AT TIME ZONE 'Asia/Manila') AS date_ph,
    COUNT(*) AS total_leads
  FROM public.leads
  GROUP BY 1
  ORDER BY 1 DESC;

-- Email sequence status summary
CREATE OR REPLACE VIEW public.sequence_status AS
  SELECT
    l.email,
    l.created_at,
    COUNT(el.id) AS emails_sent,
    MAX(el.sequence_day) AS last_day_sent,
    MAX(el.sent_at) AS last_sent_at
  FROM public.leads l
  LEFT JOIN public.email_log el ON el.lead_id = l.id AND el.status = 'sent'
  GROUP BY l.id, l.email, l.created_at
  ORDER BY l.created_at DESC;

-- ============================================================
-- DONE. Your database is ready.
-- ============================================================
