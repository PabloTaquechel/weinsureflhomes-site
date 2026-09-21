# SEO experiment and deployment log

## 2026-09-21 — Free cloud reporting migration (not a performance experiment)

- Owner requested operation without a running computer, approved encrypted GitHub
  storage of the existing read-only Google credential, and chose free reporting
  first rather than paid AI execution.
- Added a main-only, serialized GitHub-hosted biweekly reporting workflow. Kept
  Vercel's existing Git deployment path and daily cloud health checks unchanged.
- Added independent provider results, bounded execution, sanitized connection-only
  output, a deduplicated attention issue, and a schedule-inactivity warning.
- Raw reports remain in runner memory, not public artifacts/logs. No AI calls or
  autonomous website edits are enabled. No measured SEO improvement is claimed.
- Local live check: production health passed; Search Console available; Analytics
  access denied. All 27 tests passed during preparation. Cloud cutover verification
  will be reported using the actual GitHub run, not inferred from this local test.
- Prior setup corrections: sitemap was submitted successfully September 20;
  Google Cloud project/APIs and the private reporting key exist; Search Console
  Restricted permission is saved and API-tested. Analytics Viewer attempts still
  fail, including September 21. Marketing emails were declined. Those completed
  setup steps supersede the earlier pending notes below.
- No content experiment; existing post-installation observation dates are unchanged.

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
- Automation: active desktop heartbeat, every other Monday at 9 AM in the configured local timezone (America/New_York). Daily GitHub health workflow active. Hosted quality run [35519054707](https://github.com/PabloTaquechel/weinsureflhomes-site/actions/runs/35519054707) and separately dispatched live-health run [35519205195](https://github.com/PabloTaquechel/weinsureflhomes-site/actions/runs/35519205195) both succeeded.
- Deployment: initial release `3a24ab3e3e2bbf3062b27497488ef37811278161` reported Vercel success. All 11 production audit checks passed at 2026-09-20T15:17:38Z. Browser verified GA script absent after declining, present with the correct ID after opting in, and absent again after opting out and reloading. A consented QA page visit may appear in the new property's baseline; no synthetic lead was submitted. Analytics report receipt itself is not yet verified.
- Search Console ownership: verified through the published HTML tag on September 20, 2026. Google's dashboard shows performance/indexing reports processing, not observed zero traffic. Sitemap is prepared for submission, pending action-time approval.
- Remaining setup: sitemap submission; Google Cloud activation, read-only API identity and property grants; Analytics key-event confirmation and optional-email dialog. Exact security approvals were requested and remain pending. Until direct reporting is verified, this is a working website and scheduled agent with incomplete measurement access—not a fully autonomous closed-loop optimizer. No billing, paid trial or Windsor subscription was enabled.
- Strategy execution boundary: initial site/content work is published. Local Business Profile changes, outreach and later evidence-dependent experiments are not completed or implied; they require their own access/evidence and applicable communication approvals.

### Same-day measurement refinement

- Added `generate_home_lead` after a confirmed Home request so the agent can distinguish homeowner inquiries from all-coverage `generate_lead` events without a custom GA dimension. Home is a subset; counts must not be added. Local mocked tests cover Home vs other coverage types without sending a production lead.
- Google PageSpeed's unauthenticated API returned HTTP 429, and the public UI report failed with a rendering-resource error. No lab performance score or Core Web Vitals pass is claimed. Desktop/mobile layout checks passed; field performance needs sufficient real traffic and a working report.
