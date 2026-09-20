import test from "node:test";
import assert from "node:assert/strict";
import { sendQuoteRequest } from "../src/lib/quote-client.ts";

const payload = {
  first_name: "Test",
  last_name: "Local",
  email: "test@example.invalid",
  phone: "5551234567",
  address: "ZIP 33176 (full address pending)",
  insurance_type: "Home",
  notes: null,
};
test("quote client confirms a stored request with a local mock (never network)", async () => {
  let calls = 0;
  await sendQuoteRequest(payload, async (url, request) => {
    calls++;
    assert.equal(url, "/api/public/quote");
    assert.deepEqual(JSON.parse(request.body), payload);
    return Response.json({ ok: true, notification: "sent" });
  });
  assert.equal(calls, 1);
});
test("HTML, failed HTTP, or missing confirmation never counts as success", async () => {
  for (const response of [
    new Response("<!doctype html>"),
    Response.json({ ok: true }, { status: 500 }),
    Response.json({}),
    Response.json({ ok: false }),
  ]) {
    await assert.rejects(
      sendQuoteRequest(payload, async () => response),
      /not confirmed/,
    );
  }
});
test("network failure is not automatically retried", async () => {
  let calls = 0;
  await assert.rejects(
    sendQuoteRequest(payload, async () => {
      calls++;
      throw new Error("offline");
    }),
    /offline/,
  );
  assert.equal(calls, 1);
});
test("stored quote remains successful when notification reports failure", async () => {
  await sendQuoteRequest(payload, async () => Response.json({ ok: true, notification: "failed" }));
});
