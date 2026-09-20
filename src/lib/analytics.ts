import measurement from "@/config/measurement.json";

export const measurementId = measurement.ga4MeasurementId;
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
const consentKey = "weinsure-analytics-consent";
const publicPaths = new Set([
  "/",
  "/homeowners-insurance-miami",
  "/home-insurance-renewal-checklist",
  "/wind-mitigation-inspection-florida",
  "/privacy",
]);
type EventName =
  "quote_form_open" | "quote_form_start" | "generate_lead" | "generate_home_lead" | "call_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function readConsent(): string | null {
  try {
    return localStorage.getItem(consentKey);
  } catch {
    return null;
  }
}

export function saveConsent(accepted: boolean) {
  window[`ga-disable-${measurementId}`] = !accepted;
  try {
    localStorage.setItem(consentKey, accepted ? "accepted" : "declined");
  } catch {
    /* Optional storage. */
  }
  if (!accepted && window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
}

export function publicPagePath(pathname: string) {
  return publicPaths.has(pathname) ? pathname : null;
}

export function trackEvent(name: EventName) {
  if (!analyticsConfigured || typeof window === "undefined" || readConsent() !== "accepted") return;
  const page = publicPagePath(window.location.pathname);
  if (!page) return;
  // Never send form values, email, phone, addresses, query strings or customer identifiers.
  window.gtag?.("event", name, { page_location: `https://www.weinsureflhomes.com${page}` });
}

export function loadAnalytics() {
  if (!analyticsConfigured || readConsent() !== "accepted") return;
  if (window.location.hostname !== "www.weinsureflhomes.com") return;
  const page = publicPagePath(window.location.pathname);
  if (!page) return;
  window[`ga-disable-${measurementId}`] = false;
  if (document.getElementById("weinsure-ga4")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    page_location: `https://www.weinsureflhomes.com${page}`,
    page_referrer: safeReferrer(),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.id = "weinsure-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function safeReferrer() {
  try {
    return document.referrer ? new URL(document.referrer).origin : "";
  } catch {
    return "";
  }
}
