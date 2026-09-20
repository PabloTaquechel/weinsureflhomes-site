import type { ReactNode } from "react";
import { QuoteDialog } from "@/components/QuoteDialog";

export function QuoteButton({
  children = "Request a home insurance quote",
}: {
  children?: ReactNode;
}) {
  return (
    <QuoteDialog
      trigger={
        <button
          type="button"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          {children}
        </button>
      }
    />
  );
}

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5">
          <a href="/" className="font-display text-2xl">
            Pablo Taquechel · We Insure
          </a>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-5 text-sm">
            <a href="/homeowners-insurance-miami">Home insurance</a>
            <a href="/#team">Our team</a>
            <a href="tel:+13052591910">(305) 259-1910</a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 bg-primary text-primary-foreground">
        <div className="container-page space-y-4 py-10 text-sm">
          <p>Pablo Taquechel · We Insure Miami</p>
          <p>10749 SW 104 Street, Miami, FL 33176 · Mon–Fri, 9 AM–5 PM</p>
          <p>
            <a href="tel:+13052591910">(305) 259-1910</a> ·{" "}
            <a href="mailto:pablo.taquechel@weinsuregroup.com">Email our team</a>
          </p>
          <p>
            <a href="/privacy" className="underline">
              Privacy
            </a>{" "}
            ·{" "}
            <a href="/" className="underline">
              Back to home
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
