import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, QuoteButton } from "@/components/MarketingLayout";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/wind-mitigation-inspection-florida")({
  head: () =>
    seoHead(
      "Florida Wind Mitigation Inspection: Homeowner Guide",
      "Learn what to ask about Florida wind mitigation reports, documentation and insurance credits. Prepare for a home insurance review with our Miami team.",
      "/wind-mitigation-inspection-florida",
    ),
  component: WindMitigation,
});
function WindMitigation() {
  return (
    <MarketingLayout>
      <article className="container-page max-w-3xl space-y-7 py-16 leading-relaxed">
        <p className="text-sm">
          <a href="/homeowners-insurance-miami" className="underline">
            Miami homeowners insurance
          </a>{" "}
          / Wind mitigation
        </p>
        <h1 className="text-5xl leading-tight text-primary">
          Florida wind mitigation inspections: what homeowners should ask
        </h1>
        <p className="text-lg text-muted-foreground">
          An inspection report can be useful when reviewing your home insurance, but the report, the
          premium and the underwriting decision are different things. Start by asking what
          documentation your insurer needs for your particular property.
        </p>
        <h2 className="text-3xl text-primary">Understand what the report is for</h2>
        <p>
          A wind mitigation report documents features relevant to hurricane-loss mitigation and
          potential insurance credits. Florida's Department of Financial Services explains that
          authorized professionals complete the verification form, and insurers can independently
          verify it. The report does not itself bind insurance or promise a particular savings
          amount.
        </p>
        <h2 className="text-3xl text-primary">Check the date and the form</h2>
        <p>
          Florida DFS states that inspections from April 1, 2026 use the revised OIR-B1-1802 form.
          Earlier inspections may use the prior form. A completed report can be valid for up to five
          years if there have been no material structural changes or inaccuracies. Ask your agent
          whether your existing report is appropriate before ordering another one.
        </p>
        <p className="text-sm">
          Source:{" "}
          <a
            className="underline"
            href="https://myfloridacfo.com/division/consumers/storm/mitigation-notices-inspections-and-forms"
          >
            Florida DFS: mitigation notices, inspections and forms
          </a>
          . Requirements can change; use the current official guidance and the insurer's
          instructions.
        </p>
        <h2 className="text-3xl text-primary">Bring useful records to the conversation</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>The complete existing report, including attachments—not only its cover page.</li>
          <li>
            Records you already have for roof replacement, window or door improvements, and other
            relevant work.
          </li>
          <li>The dates of changes made after the inspection.</li>
          <li>Your current declarations page or the quote being reviewed.</li>
        </ul>
        <p>
          Do not guess an answer on a report or describe a feature you cannot document. Ask the
          inspector what evidence they need and ask the agent how the insurer will review it. Our
          quote-request form does not require you to enter technical building details before
          speaking with the team.
        </p>
        <h2 className="text-3xl text-primary">
          Questions worth asking before paying for an inspection
        </h2>
        <ol className="list-decimal space-y-3 pl-6">
          <li>Do you need a new wind mitigation report, another type of inspection, or both?</li>
          <li>Is my current report complete and usable for the options being considered?</li>
          <li>What qualifications should the inspector hold for this report?</li>
          <li>What documents should I have ready for the inspector?</li>
          <li>What happens after the report is submitted, and is anything else outstanding?</li>
        </ol>
        <p>
          We do not provide an inspection through this website. Discuss the requirements with the
          team before arranging a service or assuming a discount will apply.
        </p>
        <section className="rounded-xl bg-secondary p-7">
          <h2 className="text-3xl text-primary">Review your home insurance with a Miami agent</h2>
          <p className="my-4">
            Tell us whether you are purchasing, renewing or comparing options. We can help you
            identify the next questions to ask.
          </p>
          <QuoteButton />
        </section>
        <p>
          Also helpful:{" "}
          <a href="/home-insurance-renewal-checklist" className="underline">
            Home insurance renewal checklist
          </a>
          .
        </p>
        <p className="text-sm text-muted-foreground">
          Updated September 20, 2026. General educational information; coverage, credits and
          eligibility depend on policy terms, underwriting and verified property details.
        </p>
      </article>
    </MarketingLayout>
  );
}
