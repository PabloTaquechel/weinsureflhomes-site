import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Props = {
  trigger: React.ReactNode;
};

const INSURANCE_TYPES = ["Home", "Flood", "Auto", "Condo", "Renters", "Business", "Boat & RV"];

const HOME_LIKE = new Set(["Home", "Condo", "Renters"]);

export function QuoteDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<string>("Home");
  const [occupancy, setOccupancy] = useState<string>("");
  const [roof, setRoof] = useState<string>("");
  const [hurricane, setHurricane] = useState<string>("");

  const showHome = HOME_LIKE.has(type);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(e.currentTarget);
    const street = String(fd.get("address_street") || "").trim();
    const city = String(fd.get("address_city") || "").trim();
    const state = String(fd.get("address_state") || "")
      .trim()
      .toUpperCase();
    const zip = String(fd.get("address_zip") || "").trim();
    const address = [street, [city, state].filter(Boolean).join(", "), zip]
      .filter(Boolean)
      .join(", ");
    const payload = {
      first_name: String(fd.get("first_name") || "").trim(),
      last_name: String(fd.get("last_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      address,
      insurance_type: type,
      occupancy: showHome ? occupancy || null : null,
      year_of_roof: type === "Home" ? roof || null : null,
      hurricane_protection: type === "Home" ? hurricane || null : null,
      mailing_address: showHome ? String(fd.get("mailing_address") || "").trim() || null : null,
      prior_address: showHome ? String(fd.get("prior_address") || "").trim() || null : null,
      title_holders: showHome ? String(fd.get("title_holders") || "").trim() || null : null,
      prior_claims: showHome ? String(fd.get("prior_claims") || "").trim() || null : null,
      notes: String(fd.get("notes") || "").trim() || null,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/public/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed");
      toast.success("Quote request sent — Pablo will be in touch shortly.");
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please call (305) 259-1910.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-primary">Get a free quote</DialogTitle>
          <DialogDescription>
            Tell us a bit about you and what you'd like covered. Most clients hear back the same
            day.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name">
              <Input name="first_name" required maxLength={100} />
            </Field>
            <Field label="Last name">
              <Input name="last_name" required maxLength={100} />
            </Field>
            <Field label="Email">
              <Input type="email" name="email" required maxLength={255} />
            </Field>
            <Field label="Phone">
              <Input type="tel" name="phone" required placeholder="(305) 555-1234" />
            </Field>
          </div>

          <Field label="Property street address">
            <Input name="address_street" required maxLength={200} placeholder="123 Ocean Dr" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-[1fr_120px_140px]">
            <Field label="City">
              <Input name="address_city" required maxLength={100} placeholder="Miami" />
            </Field>
            <Field label="State">
              <Input
                name="address_state"
                required
                maxLength={2}
                placeholder="FL"
                defaultValue="FL"
                className="uppercase"
              />
            </Field>
            <Field label="ZIP code">
              <Input
                name="address_zip"
                required
                inputMode="numeric"
                maxLength={10}
                placeholder="33139"
                pattern="[0-9]{5}(-[0-9]{4})?"
              />
            </Field>
          </div>

          <Field label="Type of insurance">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INSURANCE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {showHome && (
            <div className="space-y-4 rounded-xl bg-secondary p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Mailing address (if different)">
                  <Input
                    name="mailing_address"
                    maxLength={300}
                    placeholder="Leave blank if same as property"
                  />
                </Field>
                <Field label="Prior address (if <3 yrs at current)">
                  <Input
                    name="prior_address"
                    maxLength={300}
                    placeholder="Street, City, State ZIP"
                  />
                </Field>
              </div>

              <Field label="Occupancy">
                <Select value={occupancy} onValueChange={setOccupancy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary">Primary residence</SelectItem>
                    <SelectItem value="Secondary / 2nd Home">Secondary / 2nd home</SelectItem>
                    <SelectItem value="Seasonal">Seasonal home</SelectItem>
                    <SelectItem value="Rental">Rental property</SelectItem>
                    <SelectItem value="Short-term rental">Vacation / short-term rental</SelectItem>
                    <SelectItem value="Vacant">Vacant</SelectItem>
                    <SelectItem value="Builders Risk">Builders risk</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {type === "Home" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Year of roof">
                    <Input
                      value={roof}
                      onChange={(e) => setRoof(e.target.value)}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="e.g. 2018"
                    />
                  </Field>
                  <Field label="Hurricane protection">
                    <Select value={hurricane} onValueChange={setHurricane}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Impact windows">Impact windows</SelectItem>
                        <SelectItem value="Shutters">Shutters</SelectItem>
                        <SelectItem value="Accordion">Accordion</SelectItem>
                        <SelectItem value="Both">Impact + shutters</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Unsure">Not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              )}

              <Field label="Names & DOB of everyone on title">
                <Textarea
                  name="title_holders"
                  rows={2}
                  maxLength={1000}
                  placeholder="Legal name + DOB for each person or entity on title"
                />
              </Field>

              <Field label="Claims in the last 5 yrs on any property you own (explain)">
                <Textarea
                  name="prior_claims"
                  rows={2}
                  maxLength={1000}
                  placeholder="None, or describe each claim briefly"
                />
              </Field>
            </div>
          )}

          <Field label="Anything else? (optional)">
            <Textarea
              name="notes"
              rows={3}
              maxLength={2000}
              placeholder="Current carrier, renewal date, specific questions..."
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send quote request"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to be contacted about your quote. No spam.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
