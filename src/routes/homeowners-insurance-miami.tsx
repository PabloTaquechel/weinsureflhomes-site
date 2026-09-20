import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, QuoteButton } from "@/components/MarketingLayout";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/homeowners-insurance-miami")({
  head: () =>
    seoHead(
      "Homeowners Insurance in Miami, FL | We Insure",
      "Compare home insurance options with Pablo Taquechel's Miami team. Get help reviewing your roof, hurricane deductible and flood coverage. Request a quote.",
      "/homeowners-insurance-miami",
    ),
  component: HomeInsurance,
});

function HomeInsurance() {
  return (
    <MarketingLayout>
      <section className="bg-secondary">
        <div className="container-page py-16 md:py-24">
          <p className="text-sm text-muted-foreground">
            <a href="/" className="underline">
              Home
            </a>{" "}
            / Homeowners insurance
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-tight text-primary md:text-6xl">
            Homeowners insurance in Miami, with a local team on your side.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Buying a home, reviewing a renewal, or shopping for a different policy? Start with a
            conversation about your property and priorities. Pablo Taquechel and the We Insure Miami
            team can help you compare available options.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <QuoteButton />
            <a href="tel:+13052591910" className="underline">
              Call (305) 259-1910
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No obligation. A request is not a binder or a guarantee of coverage.
          </p>
        </div>
      </section>
      <div className="container-page max-w-4xl space-y-14 py-16 text-base leading-relaxed">
        <section>
          <h2 className="text-3xl text-primary">
            A home quote should answer more than “what does it cost?”
          </h2>
          <p className="mt-4">
            A lower premium is only useful if the coverage fits your home. We can walk through the
            options available for your address and explain the differences before you decide. Our
            office is at 10749 SW 104 Street in Miami; you can also work with us by phone or email.
          </p>
          <ul className="mt-5 list-disc space-y-3 pl-6">
            <li>Buying a home? Tell us your closing date and any lender requirements.</li>
            <li>
              Renewing? Have your current declarations page and renewal offer ready so we can
              compare like-for-like limits.
            </li>
            <li>
              Received a nonrenewal? Let us know the policy end date and the reason stated in the
              notice.
            </li>
            <li>
              Insuring a second home or rental? Tell us how the property is used, including any
              short-term rentals.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-3xl text-primary">What to review in a Miami homeowners policy</h2>
          <p className="mt-4">
            Homeowners policies commonly include protection for the home, belongings, personal
            liability and certain additional living expenses after a covered loss. Limits,
            deductibles and exclusions vary. Review the actual policy, not just the quote summary.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-secondary p-6">
              <h3 className="text-2xl text-primary">Roof and inspections</h3>
              <p className="mt-3">
                An insurer may request information about your roof or a four-point inspection.
                Gather roof records and existing inspection reports before you shop.
              </p>
            </div>
            <div className="rounded-xl bg-secondary p-6">
              <h3 className="text-2xl text-primary">Deductibles and settlement</h3>
              <p className="mt-3">
                Ask how hurricane and other deductibles apply, and how damaged property would be
                valued. Compare these terms alongside the premium.
              </p>
            </div>
            <div className="rounded-xl bg-secondary p-6">
              <h3 className="text-2xl text-primary">Wind mitigation</h3>
              <p className="mt-3">
                Documented wind-resistant features may qualify for premium credits. A mitigation
                inspection can help identify eligible features; savings are not guaranteed.
              </p>
            </div>
            <div className="rounded-xl bg-secondary p-6">
              <h3 className="text-2xl text-primary">Flood is a separate question</h3>
              <p className="mt-3">
                Most homeowners policies do not cover flood damage. Ask about separate flood
                coverage rather than assuming a home policy includes it.
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Read more:{" "}
            <a
              className="underline"
              href="https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview"
            >
              Florida Department of Financial Services homeowners overview
            </a>{" "}
            and{" "}
            <a className="underline" href="https://www.floodsmart.gov/flood-insurance-basics">
              FEMA flood insurance basics
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-3xl text-primary">How to get started</h2>
          <ol className="mt-5 list-decimal space-y-4 pl-6">
            <li>
              <strong>Send your contact details and ZIP code.</strong> You do not need to upload
              documents or enter dates of birth to request a conversation.
            </li>
            <li>
              <strong>Discuss the property with our team.</strong> We will ask about occupancy, roof
              details, your timing and the coverage you want to review.
            </li>
            <li>
              <strong>Compare the available options.</strong> Carrier availability, price and
              eligibility depend on the property and underwriting. Your agent can explain next steps
              before coverage is bound.
            </li>
          </ol>
        </section>
        <section>
          <h2 className="text-3xl text-primary">Questions homeowners ask</h2>
          <div className="mt-5 space-y-6">
            <div>
              <h3 className="text-2xl text-primary">
                Can I get a quote without knowing my roof's age?
              </h3>
              <p className="mt-2">
                You can start a request now. Let us know what information you have; our team will
                explain which details or documents are needed to complete the quote.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-primary">Do you only help homeowners in Miami?</h3>
              <p className="mt-2">
                Our office is in Miami and we help Florida customers. Share your property's ZIP code
                so we can check the options available for that location.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-primary">
                Will sending the form change my current insurance?
              </h3>
              <p className="mt-2">
                No. A quote request does not cancel, change or bind a policy. Do not cancel existing
                coverage until replacement coverage and its effective date are confirmed.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-primary">Is the cheapest quote always the best fit?</h3>
              <p className="mt-2">
                Compare limits, deductibles, exclusions and claim-settlement terms, not just the
                price. Ask your agent to explain any meaningful differences between the options
                offered.
              </p>
            </div>
          </div>
        </section>
        <section className="rounded-2xl bg-secondary p-8">
          <h2 className="text-3xl text-primary">Let's review your home's next step.</h2>
          <p className="my-5">
            Connect with the Miami team about a purchase, renewal or new quote.
          </p>
          <QuoteButton />
        </section>
        <section className="rounded-2xl border border-border p-8">
          <h2 className="text-3xl text-primary">Prepare for your conversation</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6">
            <li>
              <a href="/home-insurance-renewal-checklist" className="underline">
                Home insurance renewal checklist
              </a>{" "}
              — dates, documents and comparison questions.
            </li>
            <li>
              <a href="/wind-mitigation-inspection-florida" className="underline">
                Florida wind mitigation inspections
              </a>{" "}
              — reports, records and questions to ask.
            </li>
          </ul>
        </section>
        <p className="text-sm text-muted-foreground">
          General information only; not a coverage determination or an offer of insurance. Policy
          terms, underwriting and carrier availability govern. Page updated September 20, 2026.
        </p>
      </div>
    </MarketingLayout>
  );
}
