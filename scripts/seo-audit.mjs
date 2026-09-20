import { pathToFileURL } from "node:url";

export const canonicalOrigin = "https://www.weinsureflhomes.com";
export const marketingPaths = [
  "/",
  "/homeowners-insurance-miami",
  "/privacy",
  "/home-insurance-renewal-checklist",
  "/wind-mitigation-inspection-florida",
];

export async function fetchWithRetry(url, options = {}, fetcher = fetch) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetcher(url, { ...options, signal: AbortSignal.timeout(20000) });
      if (response.status !== 429 && response.status < 500) return response;
      if (attempt === 2) return response;
    } catch (error) {
      if (attempt === 2) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
  }
}

export function inspectHtml(html, path) {
  const issues = [];
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (!title || title.length < 15 || title.length > 100) issues.push("Missing or unsuitable title");
  const headings = html.match(/<h1(?:\s|>)/gi) || [];
  if (headings.length !== 1) issues.push("Expected exactly one server-rendered H1");
  const links = html.match(/<link\b[^>]*>/gi) || [];
  const canonicals = links.filter((tag) => /rel="canonical"/i.test(tag));
  if (canonicals.length !== 1 || !canonicals[0].includes(`href="${canonicalOrigin}${path}"`))
    issues.push("Incorrect canonical");
  const meta = html.match(/<meta\b[^>]*>/gi) || [];
  if (!meta.some((tag) => /name="description"/i.test(tag) && /content="[^"]{50,}"/.test(tag)))
    issues.push("Missing description");
  if (meta.some((tag) => /name="robots"/i.test(tag) && /noindex/i.test(tag)))
    issues.push("Marketing page marked noindex");
  if (!html.includes("tel:+13052591910")) issues.push("Missing telephone conversion path");
  if (path === "/") {
    const json = html.match(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i,
    )?.[1];
    try {
      if (JSON.parse(json)["@type"] !== "InsuranceAgency") throw new Error();
    } catch {
      issues.push("Missing or invalid InsuranceAgency structured data");
    }
    if (!html.includes('href="/homeowners-insurance-miami"'))
      issues.push("Home insurance page not linked");
  }
  return issues;
}

export async function audit(base = canonicalOrigin) {
  const target = new URL(base);
  if (
    ![
      "www.weinsureflhomes.com",
      "weinsureflhomes-site.vercel.app",
      "127.0.0.1",
      "localhost",
    ].includes(target.hostname)
  )
    throw new Error("Audit target is not allowlisted");
  const checks = [];
  for (const path of marketingPaths) {
    const response = await fetchWithRetry(new URL(path, target));
    const html = await response.text();
    const issues = response.status === 200 ? inspectHtml(html, path) : [`HTTP ${response.status}`];
    checks.push({ path, ok: issues.length === 0, issues });
  }
  for (const path of ["/robots.txt", "/sitemap.xml"]) {
    const response = await fetchWithRetry(new URL(path, target));
    const content = await response.text();
    const ok =
      response.status === 200 &&
      (path.endsWith("xml")
        ? marketingPaths.every((p) => content.includes(`<loc>${canonicalOrigin}${p}</loc>`))
        : content.includes(`${canonicalOrigin}/sitemap.xml`) &&
          !/^Disallow:\s*\/\s*$/m.test(content));
    checks.push({ path, ok, issues: ok ? [] : ["Missing/invalid crawl discovery file"] });
  }
  const admin = await fetchWithRetry(new URL("/admin", target));
  const adminHtml = await admin.text();
  checks.push({
    path: "/admin",
    ok: admin.status === 200 && /name="robots"[^>]*content="noindex,nofollow"/.test(adminHtml),
  });
  const absent = await fetchWithRetry(new URL("/seo-health-nonexistent-page-404", target));
  checks.push({ path: "404 behavior", ok: absent.status === 404 });
  // Intentionally invalid request: validation must reject it before any DB/email write.
  const quote = await fetchWithRetry(new URL("/api/public/quote", target), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  const quoteBody = await quote.json().catch(() => null);
  checks.push({
    path: "Quote API validation (no lead created)",
    ok: quote.status === 400 && quoteBody?.error === "Invalid input",
  });
  const session = await fetchWithRetry(new URL("/api/admin/session", target));
  const sessionBody = await session.json().catch(() => null);
  checks.push({
    path: "Admin API JSON contract",
    ok: session.status === 200 && sessionBody?.authenticated === false,
  });
  return {
    checkedAt: new Date().toISOString(),
    base: target.origin,
    ok: checks.every((check) => check.ok),
    checks,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await audit(process.argv[2]);
    console.log(JSON.stringify(result, null, 2));
    if (!result.ok) process.exitCode = 1;
  } catch (error) {
    console.error(`SEO audit failed: ${error.message}`);
    process.exitCode = 1;
  }
}
