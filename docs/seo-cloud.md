# Cloud reporting operations

## Scope chosen by the owner on September 21, 2026

Keep this phase free: move reporting and health checks to GitHub-hosted runners;
do not enable paid AI APIs or autonomous AI-written changes. Vercel continues to
host the website and deploy normal main-branch pushes through its existing Git integration.
There is no dependency on the owner's computer for these cloud workflows.

This is **cloud reporting and monitoring**, not a complete autonomous SEO optimizer.
Google Analytics reporting access remains blocked; Search Console's read-only API
has been verified. Never equate a denied report with zero traffic or leads.

## Schedule and execution

- `seo-cloud-review.yml`: every other Monday at 9:37 AM America/New_York,
  anchored to September 21, 2026. The next regular review is October 5.
  A weekly trigger plus a tested 14-day calendar gate handles month/year/DST changes.
  Manual **Run workflow** on main bypasses the calendar gate, not access safeguards.
- `seo-quality.yml`: existing daily production checks and build/tests on pushes/PRs.
- Reporting jobs are serialized, main-only, and time-limited. Google network requests
  retry transient failures a bounded number of times. Each provider reports its own
  access state, so a GA4 failure does not hide Search Console.
- Windows are adjacent 28-day periods, excluding three recent days. Data is queried
  from Google each time; Google remains the historical system of record.
- There is no model call, billing activation, code-writing permission, or automatic
  deployment in the reporting workflow. The owner's paid-AI decision remains deferred.

## Privacy and credentials

The owner approved storing the existing service-account JSON in the encrypted
repository Actions secret `SEO_GOOGLE_CREDENTIALS_JSON`. It is decrypted only for
the reporting step on the trusted default branch; no dependency installation runs
with this secret. Only pinned setup/checkout actions run before that step.

The cloud collector handles raw reports in memory. It does not upload them as
artifacts or publish traffic, lead counts, search queries, or Google error bodies
to this public repository. The public run summary and issue contain only fixed
health/access status labels. Google dashboards retain the actual reporting data.
The local `seo:metrics` command still saves a complete report to ignored
`.seo/private/` only when both sources are available.

No credential is committed, placed in a frontend environment variable, or copied
to Vercel. The service account has Search Console Restricted access, no Cloud
project role, and is awaiting the approved property-level GA4 Viewer grant.
Only repository maintainers should be allowed to change workflows or secrets.
Do not run this workflow against pull-request code or use `pull_request_target`.

## Alerts and realistic reliability

A connection or health failure fails the reporting job and creates/updates one
`Cloud SEO reporting needs attention` issue assigned to the repository owner.
Changed status gets one comment; unchanged failures do not create duplicate issues
or comments. Recovery closes it with a verified-run link.
Unexpected runner failures also create a generic attention issue when the notification
job can execute. Delivery of GitHub emails/push alerts depends on the owner's
GitHub notification settings; no email-delivery claim is made.

GitHub schedules are best-effort: delayed/dropped jobs and platform outages are
possible. Public-repository schedules may be disabled after 60 days without
repository activity. The review warns when the last push is at least 45 days old.
This warning is not an independent always-on watchdog, nor a guarantee of uptime.
Do not create artificial keepalive commits or promise that maintenance will never
be needed. Re-enable a disabled workflow in GitHub Actions and run it manually.

Standard GitHub-hosted runners on public repositories are free under current
GitHub terms. No paid overages, new Vercel plan, or AI API subscription was enabled.
Review terms if the repository becomes private or the scope grows.

## Cutover and remaining work

Do not disable the desktop heartbeat until a real GitHub cloud run verifies the
new secret and Search Console access. A red reporting job from the known GA4
permission error is an honest blocked connection, not a runner migration failure.
After verification, pause the desktop heartbeat to avoid duplicate review schedules.

Remaining before data-driven AI publishing: resolve GA4 property access, verify
lead-event receipt, collect sufficient post-installation data, select/authorize an
AI execution provider, and implement independent diff/test/deployment gates. Keep
automatic performance edits disabled until these dependencies are actually verified.

## References

- [GitHub schedule limitations and timezones](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
- [GitHub Actions usage](https://docs.github.com/en/actions/concepts/billing-and-usage)
- [GitHub encrypted secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
