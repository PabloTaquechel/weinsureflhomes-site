# SEO experiment and deployment log

## 2026-09-20 — Baseline foundation

- Status: initial release prepared; not yet a measured performance experiment.
- Objective: create crawlable homeowner-intent pages and reduce initial quote-request friction.
- Initial findings: homepage was the only marketing route; sitemap/robots/canonical/structured data and analytics were absent. No historical GA4/Search Console baseline is available to this agent.
- Implemented: homeowner-focused homepage, Miami homeowners service page, renewal checklist, sourced wind mitigation guide, privacy page, canonical/social metadata, InsuranceAgency schema, sitemap/robots, consent-gated GA4 events, six-field initial request with optional property details, explicit received/error states and API-confirmed conversion event. Production build now also runs TypeScript and tests so failed checks abort the normal build command.
- Measurement: free GA4 account/stream created, enhanced measurement off; public measurement ID `G-0W64ZQBM5M`. Search Console verification prepared. Durable read-only API access still pending. No Windsor dependency.
- Validation: initial `seo:verify` passed build, TypeScript, 14 tests and nine local HTTP checks on 2026-09-20. Expanded suite now includes mocked quote success/error/HTML/network cases (18 tests). Browser QA checked the homeowners page and quote form on desktop and at 390×844, required-field behavior, consent decline, and the mobile homepage. No valid production lead was submitted. Final expanded verification is recorded below.
- Baseline metrics: unavailable (not zero). Qualified leads and policies bound: unavailable without business-system feedback.
- Evaluation: begin collection after deployment; first full 28-day post-launch assessment no earlier than 2026-10-21, excluding recent incomplete days. Biweekly checks can identify technical issues before then.
- Final prepublication verification: build and TypeScript passed; all 18 tests and 11 local health checks passed on 2026-09-20. Git diff whitespace check passed. The metrics collector correctly reports missing read-only credentials rather than returning invented zeroes.
- Automation: active desktop heartbeat, every other Monday at 9 AM in the configured local timezone. Daily GitHub health workflow added; first hosted run and deployment verification pending.
- Deployment: pending; update with verified SHA and live results.
