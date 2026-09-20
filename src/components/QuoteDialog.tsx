import { useId, useRef, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { sendQuoteRequest } from "@/lib/quote-client";

const INSURANCE_TYPES = ["Home", "Flood", "Auto", "Condo", "Renters", "Business", "Boat & RV"];

export function QuoteDialog({
  trigger,
  initialType = "Home",
}: {
  trigger: ReactNode;
  initialType?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const sending = useRef(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) || "").trim();
    const street = value("street");
    const payload = {
      first_name: value("first_name"),
      last_name: value("last_name"),
      email: value("email"),
      phone: value("phone"),
      // Retain the existing API/database contract; the agent gathers remaining details.
      address: street
        ? street + ", ZIP " + value("zip")
        : "ZIP " + value("zip") + " (full address pending)",
      insurance_type: value("insurance_type"),
      notes: value("notes") || null,
    };
    sending.current = true;
    setSubmitting(true);
    setError("");
    try {
      await sendQuoteRequest(payload);
      trackEvent("generate_lead");
      setSubmitted(true);
    } catch {
      setError(
        "We couldn't confirm your request. Please call (305) 259-1910 for help. Your details are still here if you want to try again.",
      );
    } finally {
      sending.current = false;
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (submitting && !next) return;
        setOpen(next);
        if (next) {
          setSubmitted(false);
          setError("");
          started.current = false;
          trackEvent("quote_form_open");
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-primary">
            {submitted ? "Your request is received" : "Let's start your quote"}
          </DialogTitle>
          <DialogDescription>
            {submitted
              ? "The We Insure Miami team will review your request and contact you about next steps."
              : "Start with your contact details and ZIP code. Our team will help you gather the rest. No obligation."}
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="space-y-5 py-4" role="status">
            <p>
              Need help sooner? Call{" "}
              <a href="tel:+13052591910" className="underline">
                (305) 259-1910
              </a>
              . Office hours: Monday–Friday, 9 AM–5 PM.
            </p>
            <p className="text-sm text-muted-foreground">
              Coverage is not bound or changed by this request.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary px-6 py-3 text-primary-foreground"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            onChange={() => {
              if (!started.current) {
                started.current = true;
                trackEvent("quote_form_start");
              }
            }}
            className="mt-4 space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium" htmlFor={id + "-first"}>
                First name
                <Input
                  id={id + "-first"}
                  name="first_name"
                  autoComplete="given-name"
                  required
                  maxLength={100}
                />
              </label>
              <label className="space-y-2 text-sm font-medium" htmlFor={id + "-last"}>
                Last name
                <Input
                  id={id + "-last"}
                  name="last_name"
                  autoComplete="family-name"
                  required
                  maxLength={100}
                />
              </label>
              <label className="space-y-2 text-sm font-medium" htmlFor={id + "-email"}>
                Email
                <Input
                  id={id + "-email"}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                />
              </label>
              <label className="space-y-2 text-sm font-medium" htmlFor={id + "-phone"}>
                Phone
                <Input
                  id={id + "-phone"}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  minLength={7}
                  maxLength={30}
                />
              </label>
              <label className="space-y-2 text-sm font-medium" htmlFor={id + "-zip"}>
                Property ZIP code
                <Input
                  id={id + "-zip"}
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  pattern="[0-9]{5}(-[0-9]{4})?"
                  maxLength={10}
                  placeholder="33176"
                />
              </label>
              <label className="space-y-2 text-sm font-medium" htmlFor={id + "-type"}>
                Insurance type
                <select
                  id={id + "-type"}
                  name="insurance_type"
                  defaultValue={initialType}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {INSURANCE_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>
            <details className="rounded-xl border border-border p-4">
              <summary className="cursor-pointer text-sm font-medium">
                Add property details or timing (optional)
              </summary>
              <div className="mt-4 space-y-4">
                <label className="block space-y-2 text-sm" htmlFor={id + "-street"}>
                  Street address and city
                  <Input
                    id={id + "-street"}
                    name="street"
                    autoComplete="street-address"
                    maxLength={240}
                  />
                </label>
                <label className="block space-y-2 text-sm" htmlFor={id + "-notes"}>
                  Anything you would like us to know?
                  <Textarea
                    id={id + "-notes"}
                    name="notes"
                    maxLength={1800}
                    rows={3}
                    placeholder="For example: buying a home, renewal date, or roof age if known."
                  />
                </label>
                <p className="text-xs text-muted-foreground">
                  Do not include Social Security numbers, dates of birth or payment information.
                </p>
              </div>
            </details>
            <p className="text-xs leading-relaxed text-muted-foreground">
              By requesting a quote, you ask our team to contact you about this request using the
              details provided. This does not bind or change coverage.{" "}
              <a href="/privacy" className="underline">
                Privacy information
              </a>
              .
            </p>
            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}{" "}
                <a className="underline" href="tel:+13052591910">
                  Call now
                </a>
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Request my quote"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
