import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { inspectHtml, fetchWithRetry } from "../scripts/seo-audit.mjs";
import { reportingWindows } from "../scripts/seo-metrics.mjs";

test("reporting uses complete, adjacent, non-overlapping 28-day windows", () => {
  assert.deepEqual(reportingWindows(new Date("2026-09-20T20:00:00Z")), {
    current: { startDate: "2026-08-21", endDate: "2026-09-17" },
    previous: { startDate: "2026-07-24", endDate: "2026-08-20" },
  });
});
test("reporting windows cross leap day safely", () => {
  const ranges = reportingWindows(new Date("2024-03-03T00:00:00Z"));
  assert.equal(ranges.current.endDate, "2024-02-29");
  assert.equal(ranges.current.startDate, "2024-02-02");
});
test("audit catches missing metadata, H1 and contact routes", () => {
  assert.ok(inspectHtml("<html><h1>A</h1><h1>B</h1></html>", "/privacy").length >= 3);
});
test("audit accepts canonical SSR metadata", () => {
  const html =
    '<title>Website Privacy | We Insure Miami</title><meta name="description" content="How this website handles quote requests and optional website analytics."><link rel="canonical" href="https://www.weinsureflhomes.com/privacy"><h1>Privacy</h1><a href="tel:+13052591910">Call</a>';
  assert.deepEqual(inspectHtml(html, "/privacy"), []);
  assert.ok(
    inspectHtml(
      html.replace("<h1>", '<meta name="robots" content="noindex"><h1>'),
      "/privacy",
    ).includes("Marketing page marked noindex"),
  );
});
test("permanent HTTP failures do not trigger retries", async () => {
  let attempts = 0;
  const response = await fetchWithRetry("https://example.com", {}, async () => {
    attempts++;
    return new Response("", { status: 403 });
  });
  assert.equal(response.status, 403);
  assert.equal(attempts, 1);
});
test("analytics does not load until configured and consented", async () => {
  const source = await readFile("src/lib/analytics.ts", "utf8");
  assert.match(source, /readConsent\(\) !== "accepted"/);
  assert.match(source, /send_page_view: false/);
  assert.match(source, /allow_google_signals: false/);
  assert.doesNotMatch(source, /user_id:|user_data: \{|email:|phone:/);
});
test("successful quote event is gated by confirmed API response", async () => {
  const source = await readFile("src/components/QuoteDialog.tsx", "utf8");
  const successGuard = source.indexOf("await sendQuoteRequest(payload)");
  const conversion = source.indexOf('trackEvent("generate_lead")');
  assert.ok(successGuard >= 0 && conversion > successGuard);
  assert.match(source, /if \(sending.current\) return/);
  assert.doesNotMatch(source, /name="title_holders"/);
});
