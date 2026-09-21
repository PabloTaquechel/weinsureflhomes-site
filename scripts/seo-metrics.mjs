import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createSign } from "node:crypto";
import { pathToFileURL } from "node:url";
import { homedir } from "node:os";
import { join } from "node:path";
import { fetchWithRetry } from "./seo-audit.mjs";

const scopes =
  "https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly";
export function reportingWindows(now = new Date()) {
  // Exclude three recent days to avoid optimizing on incomplete Search Console data.
  const day = 86400000;
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - 3 * day;
  const iso = (value) => new Date(value).toISOString().slice(0, 10);
  return {
    current: { startDate: iso(end - 27 * day), endDate: iso(end) },
    previous: { startDate: iso(end - 55 * day), endDate: iso(end - 28 * day) },
  };
}

async function tokenFor(credentials) {
  const encoded = (object) => Buffer.from(JSON.stringify(object)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${encoded({ alg: "RS256", typ: "JWT" })}.${encoded({ iss: credentials.client_email, scope: scopes, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .sign(credentials.private_key, "base64url");
  const response = await fetchWithRetry("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!response.ok)
    throw new Error(`Google authentication failed (${response.status}); no metrics were assumed`);
  const body = await response.json();
  if (!body.access_token) throw new Error("No Google access token returned");
  return body.access_token;
}

export async function collectMetricsReport() {
  const config = JSON.parse(
    await readFile(new URL("../src/config/measurement.json", import.meta.url), "utf8"),
  );
  if (!/^\d+$/.test(config.ga4PropertyId))
    throw new Error("Metrics unavailable: GA4 property ID is missing or invalid");
  // Use a task-specific location outside the OneDrive-synced repository.
  // Never search unrelated Google identities or credential stores.
  const credentialPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    join(homedir(), ".codex", "private", "weinsure-seo", "google-service-account.json");
  let credentials;
  try {
    credentials = JSON.parse(
      process.env.SEO_GOOGLE_CREDENTIALS_JSON || (await readFile(credentialPath, "utf8")),
    );
  } catch {
    throw new Error(
      "Metrics unavailable: the task-specific read-only Google service account is not configured. Missing metrics are NOT zero traffic.",
    );
  }
  if (!credentials.client_email || !credentials.private_key)
    throw new Error("Invalid service account configuration");
  const token = await tokenFor(credentials);
  async function query(url, body) {
    const response = await fetchWithRetry(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = new Error("Google reporting request failed");
      error.status = response.status;
      throw error;
    }
    return response.json();
  }
  return queryMetrics(query, config, reportingWindows());
}

// A provider outage must not conceal the other provider's results. Keep unavailable
// values null, never fabricated zeroes. Error bodies may contain private data.
export function reportingErrorCode(error) {
  if (error?.status === 401 || error?.status === 403) return "access_denied";
  if (error?.status === 429) return "rate_limited";
  return "unavailable";
}

export async function queryMetrics(query, config, windows) {
  const report = {
    collectedAt: new Date().toISOString(),
    status: "available",
    provenance: "Google Search Console API and Google Analytics Data API",
    windows,
    properties: { ga4: config.ga4PropertyId, searchConsole: config.searchConsoleProperty },
    sources: {
      analytics: { status: "available" },
      searchConsole: { status: "available" },
    },
    periods: {},
  };
  for (const [label, range] of Object.entries(windows)) {
    const gaURL = `https://analyticsdata.googleapis.com/v1beta/properties/${config.ga4PropertyId}:runReport`;
    const organicFilter = {
      filter: {
        fieldName: "sessionDefaultChannelGroup",
        stringFilter: { matchType: "EXACT", value: "Organic Search" },
      },
    };
    const attempt = async (source, url, body) => {
      if (report.sources[source].status !== "available") return null;
      try {
        return await query(url, body);
      } catch (error) {
        report.sources[source] = { status: reportingErrorCode(error) };
        return null;
      }
    };
    const traffic = await attempt("analytics", gaURL, {
      dateRanges: [range],
      dimensions: [{ name: "landingPage" }],
      metrics: [{ name: "sessions" }, { name: "engagedSessions" }],
      dimensionFilter: organicFilter,
      limit: 10000,
    });
    const conversions = await attempt("analytics", gaURL, {
      dateRanges: [range],
      dimensions: [{ name: "pagePath" }, { name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            organicFilter,
            {
              filter: {
                fieldName: "eventName",
                inListFilter: {
                  values: [
                    "generate_lead",
                    "generate_home_lead",
                    "quote_form_open",
                    "quote_form_start",
                    "call_click",
                  ],
                },
              },
            },
          ],
        },
      },
      limit: 10000,
    });
    const scURL = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.searchConsoleProperty)}/searchAnalytics/query`;
    const searchTotals = await attempt("searchConsole", scURL, {
      ...range,
      type: "web",
      dataState: "final",
    });
    const searchPages = await attempt("searchConsole", scURL, {
      ...range,
      type: "web",
      dataState: "final",
      dimensions: ["page"],
      rowLimit: 25000,
    });
    const searchQueries = await attempt("searchConsole", scURL, {
      ...range,
      type: "web",
      dataState: "final",
      dimensions: ["query", "page"],
      rowLimit: 25000,
    });
    report.periods[label] = {
      traffic,
      conversions,
      searchTotals,
      searchPages,
      searchQueries,
      caveats: [
        "Search Console excludes some anonymized queries; query rows do not necessarily sum to totals.",
        "GA4 only measures consenting, unblocked visitors; event counts are not qualified leads or policies sold.",
        "Call clicks are not verified calls. Compare within a source; do not divide GSC clicks by GA4 leads.",
        "Row limits may truncate detail; inspect rowCount, sampling and thresholding metadata before interpreting.",
      ],
    };
  }
  if (Object.values(report.sources).some((source) => source.status !== "available"))
    report.status = "partial";
  return report;
}

export async function collectMetrics() {
  const report = await collectMetricsReport();
  if (report.status !== "available")
    throw new Error("Google reporting access is incomplete; no optimization is allowed");
  // Reports can contain search queries: never commit or upload them to public artifacts.
  await mkdir(".seo/private", { recursive: true });
  const file = `.seo/private/metrics-${report.collectedAt.slice(0, 10)}.json`;
  await writeFile(file, JSON.stringify(report, null, 2), { mode: 0o600 });
  return file;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(`Private metrics report saved: ${await collectMetrics()}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
  }
}
