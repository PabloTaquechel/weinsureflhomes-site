import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { reviewDue, publicStatus, cloudReview } from "../scripts/seo-cloud-review.mjs";
import { queryMetrics, reportingWindows } from "../scripts/seo-metrics.mjs";

test("biweekly dates survive month, year and DST boundaries", () => {
  for (const date of [
    "2026-09-21T13:37Z",
    "2026-10-05T13:37Z",
    "2026-11-02T14:37Z",
    "2027-01-11T14:37Z",
  ])
    assert.equal(reviewDue(new Date(date)), true, date);
  for (const date of [
    "2026-09-07T13:37Z",
    "2026-09-28T13:37Z",
    "2026-10-06T13:37Z",
    "2026-09-21T01:00Z",
  ])
    assert.equal(reviewDue(new Date(date)), false, date);
});
const config = { ga4PropertyId: "123", searchConsoleProperty: "https://www.weinsureflhomes.com/" };

test("Analytics failure does not conceal Search Console and never becomes zero", async () => {
  let gaCalls = 0,
    scCalls = 0;
  const report = await queryMetrics(
    async (url) => {
      if (url.includes("analyticsdata")) {
        gaCalls++;
        throw Object.assign(new Error("PRIVATE RESPONSE MUST NOT ESCAPE"), { status: 403 });
      }
      scCalls++;
      return { rows: [] };
    },
    config,
    reportingWindows(),
  );
  assert.equal(report.status, "partial");
  assert.equal(report.sources.analytics.status, "access_denied");
  assert.equal(report.sources.searchConsole.status, "available");
  assert.equal(report.periods.current.traffic, null);
  assert.equal(report.periods.previous.conversions, null);
  assert.equal(gaCalls, 1);
  assert.equal(scCalls, 6);
  assert.doesNotMatch(JSON.stringify(report), /PRIVATE RESPONSE/);
});

test("Search Console failures leave Analytics available", async () => {
  const report = await queryMetrics(
    async (url) => {
      if (url.includes("webmasters")) throw Object.assign(new Error("private"), { status: 429 });
      return { rows: [] };
    },
    config,
    reportingWindows(),
  );
  assert.equal(report.sources.analytics.status, "available");
  assert.equal(report.sources.searchConsole.status, "rate_limited");
  assert.equal(report.periods.current.searchTotals, null);
});

test("empty authenticated reports are available, not an authentication failure", async () => {
  const report = await queryMetrics(async () => ({ rows: [] }), config, reportingWindows());
  assert.equal(report.status, "available");
  assert.equal(publicStatus(report, { ok: true }).optimization, "disabled_pending_ai_setup");
});

test("public output is a strict allowlist and cannot leak query data or error bodies", () => {
  const status = publicStatus(
    {
      sources: { analytics: { status: "secret" }, searchConsole: { status: "available" } },
      token: "secret",
      rows: ["private query"],
    },
    { ok: true, secret: "secret" },
  );
  assert.deepEqual(status, {
    health: "passed",
    analytics: "unavailable",
    searchConsole: "available",
    optimization: "disabled_pending_ai_setup",
  });
  assert.doesNotMatch(JSON.stringify(status), /secret|private query/);
});

test("credential and health exceptions fail closed without leaking details", async () => {
  const status = await cloudReview({
    collector: async () => {
      throw Error("PRIVATE KEY");
    },
    auditor: async () => {
      throw Error("PRIVATE RESPONSE");
    },
  });
  assert.equal(status.health, "failed");
  assert.equal(status.analytics, "unavailable");
  assert.doesNotMatch(JSON.stringify(status), /PRIVATE/);
});

test("cloud reporting is main-only, no pull requests, no raw artifacts or write-code permission", async () => {
  const workflow = await readFile(".github/workflows/seo-cloud-review.yml", "utf8");
  assert.match(workflow, /github.ref == 'refs\/heads\/main'/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /timezone: America\/New_York/);
  assert.doesNotMatch(
    workflow,
    /pull_request:|pull_request_target:|contents: write|upload-artifact|npm ci/,
  );
});
