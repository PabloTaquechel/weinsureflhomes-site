import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, QuoteButton } from "@/components/MarketingLayout";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/home-insurance-renewal-checklist")({
  head: () =>
    seoHead(
      "Home Insurance Renewal Checklist | Miami Homeowners",
      "Prepare for your home insurance renewal with a practical document checklist and questions to ask your Miami agent about coverage, deductibles and timing.",
      "/home-insurance-renewal-checklist",
    ),
  component: RenewalChecklist,
});
function RenewalChecklist() {
  return (
    <MarketingLayout>
      <article className="container-page max-w-3xl space-y-7 py-16 leading-relaxed">
        <p className="text-sm">
          <a href="/homeowners-insurance-miami" className="underline">
            Miami homeowners insurance
          </a>{" "}
          / Renewal checklist
        </p>
        <h1 className="text-5xl leading-tight text-primary">
          A practical home insurance renewal checklist
        </h1>
        <p className="text-lg text-muted-foreground">
          Before you decide whether to renew or shop, organize the information that makes a
          comparison useful. This checklist helps you prepare for a conversation with our Miami
          team—not just compare two annual prices.
        </p>
        <h2 className="text-3xl text-primary">1. Put the dates first</h2>
        <p>
          Find the current policy's expiration date, the renewal payment deadline and any lender
          deadline. If you received a cancellation or nonrenewal notice, keep the entire notice and
          tell your agent about it at the start. Do not assume a new quote means new coverage is
          already in place.
        </p>
        <h2 className="text-3xl text-primary">2. Gather a small document packet</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>Your current declarations page and renewal offer.</li>
          <li>Any notices or requests you received from the insurer.</li>
          <li>Existing inspection reports, roof records and documentation of improvements.</li>
          <li>A list of changes in how you use the home, such as renting it out.</li>
          <li>
            Your questions about the current policy, including anything you do not understand.
          </li>
        </ul>
        <p>
          You do not need to upload these documents to send an initial quote request. Start with
          your contact details and ZIP code; the team can explain what is needed next and how to
          provide it.
        </p>
        <h2 className="text-3xl text-primary">3. Ask for a side-by-side explanation</h2>
        <p>
          Write down the answers for each option. Ask: Are the coverage limits comparable? What are
          the hurricane and other deductibles? What exclusions or endorsements are important for
          this property? How are damaged items valued? Is flood coverage separate? What still needs
          to happen before the insurer can offer coverage?
        </p>
        <p>
          If one quote is lower, ask which terms differ. A useful comparison makes those differences
          understandable rather than treating price as the only decision.
        </p>
        <h2 className="text-3xl text-primary">4. Confirm the transition before making a change</h2>
        <p>
          Ask the team to explain the proposed effective date, payment requirements and any
          outstanding underwriting items. If there is a mortgage, ask what the lender needs. Do not
          cancel your existing policy until replacement coverage and its start date are confirmed.
        </p>
        <h2 className="text-3xl text-primary">When the deadline is close</h2>
        <p>
          Call{" "}
          <a href="tel:+13052591910" className="underline">
            (305) 259-1910
          </a>{" "}
          during office hours and explain your timing. Availability and eligibility depend on the
          property and insurer; we cannot promise same-day placement or acceptance.
        </p>
        <section className="rounded-xl bg-secondary p-7">
          <h2 className="text-3xl text-primary">Ready for a renewal conversation?</h2>
          <p className="my-4">
            Tell the We Insure Miami team what you are reviewing and when your current policy ends.
          </p>
          <QuoteButton>Request a renewal review</QuoteButton>
        </section>
        <p>
          Related:{" "}
          <a href="/wind-mitigation-inspection-florida" className="underline">
            Preparing for a wind mitigation discussion
          </a>
          .
        </p>
        <p className="text-sm text-muted-foreground">
          Updated September 20, 2026. This is a conversation checklist, not advice about the terms
          or cancellation of a specific policy. Your policy and insurer's requirements govern.
        </p>
      </article>
    </MarketingLayout>
  );
}
