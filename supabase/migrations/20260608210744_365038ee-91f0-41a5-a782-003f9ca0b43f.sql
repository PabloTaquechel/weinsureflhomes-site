ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS mailing_address text,
  ADD COLUMN IF NOT EXISTS prior_address text,
  ADD COLUMN IF NOT EXISTS title_holders text,
  ADD COLUMN IF NOT EXISTS prior_claims text;
