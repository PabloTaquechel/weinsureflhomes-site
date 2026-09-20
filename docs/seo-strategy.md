# Homeowner lead growth: September 2026–March 2027

## Objective and honest expectations

Increase qualified homeowner inquiries from unpaid search for weinsureflhomes.com. Traffic is an input, not the business result. No ranking, lead-volume or timeline guarantee is made. This is a six-month learning plan, not a promise that repeated AI edits automatically improve rankings.

Start with Miami, where the agency has a real office and local experience. Do not compete with national aggregators by copying their broad pages, inventing cheap rates, or generating near-identical city pages. Serve people already facing a real insurance decision: a purchase, renewal, nonrenewal, roof/inspection questions or a flood-coverage gap.

## Measurement

- Search Console: indexed pages, impressions, clicks, CTR and average position, segmented by page and query. Distinguish branded searches (Pablo/We Insure) from homeowner-intent discovery. Query detail omits anonymized searches; retain property-level totals separately.
- GA4: organic landing-page sessions and engaged sessions; quote opens, starts and confirmed `generate_lead` events; `call_click` separately. Call clicks are not completed calls. Consent and blocking mean GA4 is not a count of every visitor.
- Business outcome: qualified homeowner inquiries, quotes delivered and policies bound. These require agency/CRM feedback; do not call a form submission a qualified lead or claim a sale without evidence. Do not export customer records into the public repository.
- Compare complete 28-day windows with the most recent three days excluded; supplement with 90-day trends and year-over-year data once it exists. Account for storms, seasonality, carrier availability, consent changes and tracking changes.
- Baseline is unavailable until measurement is installed and account access works. Unavailable is not zero. The first few weeks are for collection and indexation, not declaring winners.

## Phase 1: foundation and homeowner conversion (initial release)

1. Give the homepage a clear home-insurance focus while preserving other services and the team.
2. Publish one useful Miami homeowners service page with local contact details, a simple comparison process and official consumer-resource references.
3. Publish supporting renewal and inspection guides, each answering a distinct task and linking to the service page. Avoid unverified savings, carrier acceptance or underwriting promises.
4. Install canonical tags, crawlable server-rendered metadata, sitemap, robots guidance and truthful InsuranceAgency structured data. Do not mark up fabricated review ratings.
5. Shorten the initial inquiry to contact details, ZIP and coverage type. Additional property details are optional. Do not collect DOB/SSN at this stage. Keep click-to-call visible.
6. Install consent-based analytics and explicit successful-request tracking. Add privacy information.
7. Validate deployment, crawl metadata, missing-page status and API response contracts. A synthetic invalid quote checks validation only, not database delivery or email receipt. Do not describe that as an end-to-end lead-delivery test.

## Phase 2: weeks 2–8

- Verify Google ownership and submit the sitemap; inspect the homeowners page's index status. Do not repeatedly request indexing or use Google's Indexing API for ordinary insurance pages.
- Review the real Google Business Profile for consistent name, address, phone, hours, website and accurate categories. No keyword-stuffed business name, fake location, invented service area or paid/incentivized reviews. External profile changes and review requests need the relevant account access and communication approval.
- Repair demonstrated crawl, broken-link, mobile usability or form problems immediately within the permitted scope.
- Use actual impressions to choose the next content question. If performance data is sparse, improve existing explanations based on verified primary sources; do not invent search volume or mass-publish speculative articles.
- Review lead follow-up operations with the owner when available. Fast, useful follow-up matters; the SEO agent must not autonomously contact prospects or promise service response times.

## Phase 3: months 2–3

- Focus on existing pages with meaningful impressions and a clear intent mismatch, low CTR or friction between quote starts and completed requests.
- Change one hypothesis per review, at most two existing pages or one genuinely useful new page. Preserve an unchanged comparator where possible.
- Let a page experiment run at least 28 days, preferably 4–6 weeks for SEO changes. Do not rewrite titles every two weeks solely because the agent ran.
- Prioritize improvements relevant to qualified homeowners over broad informational traffic. Create separate location pages only for genuine local demand, service capability and distinctive useful material.

## Phase 4: months 4–6

- Keep successful changes; revise or revert measured underperformers after checking tracking integrity and external factors. An observed association is not proof of causation.
- Expand the most useful homeowner topic clusters, strengthen relevant internal links, refresh verified insurance information, and review mobile performance.
- Suggest genuine local partnerships and editorial links to the owner. Never buy backlinks, create fake reviews, send unsolicited outreach or purchase ads as part of this automation.
- Evaluate organic leads and business outcomes over 90 days. If search traction is weak, reassess positioning and local profile strength rather than increasing automated page volume.

## Costs and dependencies

Google Analytics Standard and Search Console are the measurement tools; Windsor.ai is not required. The collector uses Google's read-only APIs and requires one-time authentication/access setup. Do not enable paid billing or a paid analytics tier.

The biweekly AI review is a Codex desktop heartbeat and uses the owner's Codex allowance. The computer must be awake, online and running Codex. GitHub Actions performs separate daily technical checks on GitHub's servers; it is not an always-on cloud AI optimizer. Public-repository standard runners are normally free; verify current account terms and never enable paid overages without permission. Scheduled Actions on inactive public repositories can be disabled by GitHub; inspect their status at every review.

## Sources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google spam policies: doorway and scaled-content abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google local ranking guidance](https://support.google.com/business/answer/7091)
- [Florida DFS homeowners overview](https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview)
- [FEMA flood insurance basics](https://www.floodsmart.gov/flood-insurance-basics)
- [Search Console API pricing](https://developers.google.com/webmaster-tools/pricing)
- [Codex automations](https://learn.chatgpt.com/docs/automations?surface=app)
