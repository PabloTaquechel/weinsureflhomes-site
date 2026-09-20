import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  analyticsConfigured,
  loadAnalytics,
  publicPagePath,
  readConsent,
  saveConsent,
  trackEvent,
} from "@/lib/analytics";

export function Analytics() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState<string | null>("loading");
  const [settings, setSettings] = useState(false);
  useEffect(() => {
    setConsent(readConsent());
  }, []);

  useEffect(() => {
    const page = publicPagePath(pathname);
    if (!page || consent !== "accepted" || !analyticsConfigured) return;
    loadAnalytics();
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    let referrer = "";
    try {
      referrer = document.referrer ? new URL(document.referrer).origin : "";
    } catch {
      /* Ignore malformed referrers. */
    }
    window.gtag?.("event", "page_view", {
      page_location: `https://www.weinsureflhomes.com${page}`,
      page_referrer: referrer,
      page_title: document.title,
    });
  }, [pathname, consent]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a[href^="tel:"]')) trackEvent("call_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!analyticsConfigured || !publicPagePath(pathname)) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setSettings(true)}
        className="fixed bottom-2 left-2 z-40 rounded border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
      >
        Cookie settings
      </button>
      {(consent === null || settings) && (
        <section
          aria-label="Analytics cookie choices"
          className="fixed inset-x-3 bottom-12 z-50 mx-auto max-w-lg rounded-xl border border-border bg-background p-5 shadow-xl"
        >
          <p className="text-sm">
            May we use Google Analytics cookies to measure visits and quote requests? Your form
            details are not sent to Analytics.{" "}
            <a href="/privacy" className="underline">
              Privacy information
            </a>
          </p>
          <div className="mt-4 flex gap-3">
            {[false, true].map((accept) => (
              <button
                key={String(accept)}
                type="button"
                className="rounded-full border border-primary px-4 py-2 text-sm"
                onClick={() => {
                  saveConsent(accept);
                  setConsent(accept ? "accepted" : "declined");
                  setSettings(false);
                }}
              >
                {accept ? "Allow analytics" : "No thanks"}
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
