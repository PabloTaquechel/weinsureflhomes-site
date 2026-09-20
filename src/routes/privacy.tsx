import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seoHead(
      "Website Privacy | We Insure Miami",
      "How this website handles quote requests and optional website analytics, and how to contact the We Insure Miami team about your information.",
      "/privacy",
    ),
  component: Privacy,
});
function Privacy() {
  return (
    <MarketingLayout>
      <article className="container-page max-w-3xl space-y-6 py-16 leading-relaxed">
        <h1 className="text-5xl text-primary">Website privacy</h1>
        <p className="text-sm text-muted-foreground">Updated September 20, 2026</p>
        <h2 className="text-3xl text-primary">Quote requests</h2>
        <p>
          When you submit a quote request, this website sends the details you provide to our team so
          we can respond about insurance. Requests are stored using our database provider, Supabase,
          and notification emails are sent using Resend. Vercel hosts the website. Please do not
          enter Social Security numbers, payment information, dates of birth or other sensitive
          documents in the initial request.
        </p>
        <h2 className="text-3xl text-primary">Optional analytics</h2>
        <p>
          When enabled, Google Analytics is loaded only after you choose “Allow analytics.” It
          measures page visits, quote-form activity, successful requests and clicks on telephone
          links. We do not send your form entries, email address, phone number or property address
          to Google Analytics. Advertising personalization and Google signals are disabled in our
          website integration.
        </p>
        <p>
          Analytics uses cookies and online identifiers. You can decline without affecting your
          ability to request a quote, or change your choice using “Cookie settings.” Declining stops
          future analytics collection from this integration; it does not erase information already
          collected. Browser privacy settings can also remove stored cookies. See{" "}
          <a className="underline" href="https://policies.google.com/privacy">
            Google's privacy policy
          </a>
          .
        </p>
        <h2 className="text-3xl text-primary">Service and security data</h2>
        <p>
          Hosting and service providers may process technical information needed to deliver and
          protect the website, such as request logs and IP addresses. Admin sign-in uses a necessary
          session cookie. Optional analytics consent is stored in your browser.
        </p>
        <h2 className="text-3xl text-primary">Questions or requests</h2>
        <p>
          For questions about information submitted through this website, contact{" "}
          <a href="mailto:pablo.taquechel@weinsuregroup.com" className="underline">
            pablo.taquechel@weinsuregroup.com
          </a>{" "}
          or call{" "}
          <a href="tel:+13052591910" className="underline">
            (305) 259-1910
          </a>
          . Our office is at 10749 SW 104 Street, Miami, FL 33176.
        </p>
      </article>
    </MarketingLayout>
  );
}
