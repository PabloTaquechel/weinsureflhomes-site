export type QuotePayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  insurance_type: string;
  notes: string | null;
};

export async function sendQuoteRequest(payload: QuotePayload, fetcher: typeof fetch = fetch) {
  // No automatic retry of a valid lead: a timeout could occur after the server stored it.
  const response = await fetcher("/api/public/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(25000),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) throw new Error("Request not confirmed");
}
