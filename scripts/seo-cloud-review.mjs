import { appendFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { audit } from "./seo-audit.mjs";
import { collectMetricsReport } from "./seo-metrics.mjs";

export function reviewDue(now = new Date()) {
  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const days = Math.round(
    (Date.parse(`${localDate}T00:00:00Z`) - Date.parse("2026-09-21T00:00:00Z")) / 86400000,
  );
  return days >= 0 && days % 14 === 0;
}

const allowed = new Set(["available", "access_denied", "rate_limited", "unavailable"]);
// Public repository: expose connectivity and safety state only. Never copy queries,
// page-level reports, lead counts, Google errors, or credential material into logs.
export function publicStatus(report, health) {
  const source = (name) =>
    allowed.has(report?.sources?.[name]?.status) ? report.sources[name].status : "unavailable";
  return {
    health: health?.ok === true ? "passed" : "failed",
    analytics: source("analytics"),
    searchConsole: source("searchConsole"),
    optimization: "disabled_pending_ai_setup",
  };
}

export async function cloudReview({ collector = collectMetricsReport, auditor = audit } = {}) {
  let report, health;
  try {
    health = await auditor();
  } catch {
    /* Report a fixed status, not response bodies. */
  }
  try {
    report = await collector();
  } catch {
    /* Missing credential/auth is not zero traffic. */
  }
  return publicStatus(report, health);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--due")) {
    const due = process.env.GITHUB_EVENT_NAME === "workflow_dispatch" || reviewDue();
    if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `due=${due}\n`);
    console.log(due ? "Cloud review is due." : "Between biweekly review dates; skipped.");
  } else {
    const result = await cloudReview();
    // Multiline JSON credentials can cause GitHub to mask standalone braces.
    // Transfer fixed enum labels individually, never as a JSON job output.
    const statusLines =
      Object.entries(result)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n") + "\n";
    if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, statusLines);
    if (process.env.GITHUB_STEP_SUMMARY)
      await appendFile(
        process.env.GITHUB_STEP_SUMMARY,
        `## Cloud SEO reporting\n\n- Production health: ${result.health}\n- Analytics: ${result.analytics}\n- Search Console: ${result.searchConsole}\n- Automatic SEO edits: disabled pending AI setup\n\nPrivate reports remain in runner memory only. Missing access is not zero traffic.\n`,
      );
    console.log(statusLines.trim());
    if (
      result.health !== "passed" ||
      result.analytics !== "available" ||
      result.searchConsole !== "available"
    )
      process.exitCode = 1;
  }
}
