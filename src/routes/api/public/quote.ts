import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Resend } from "resend";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import QuoteRequestEmail, { quoteRequestSubject } from "@/lib/email-templates/quote-request";

const schema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(3).max(300),
  insurance_type: z.string().trim().min(1).max(50),
  occupancy: z.string().trim().max(50).optional().nullable(),
  year_of_roof: z.string().trim().max(20).optional().nullable(),
  hurricane_protection: z.string().trim().max(50).optional().nullable(),
  mailing_address: z.string().trim().max(300).optional().nullable(),
  prior_address: z.string().trim().max(300).optional().nullable(),
  title_holders: z.string().trim().max(1000).optional().nullable(),
  prior_claims: z.string().trim().max(1000).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
});

export const Route = createFileRoute("/api/public/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = schema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const data = parsed.data;

        const { data: storedQuote, error: insertError } = await supabaseAdmin
          .from("quote_requests")
          .insert(data)
          .select("id")
          .single();
        if (insertError || !storedQuote) {
          console.error("[quote] insert failed", insertError);
          return Response.json({ error: "Storage failed" }, { status: 500 });
        }

        let notification: "sent" | "failed" = "failed";
        try {
          if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
          const resend = new Resend(process.env.RESEND_API_KEY);
          const { error: emailError } = await resend.emails.send(
            {
              from:
                process.env.QUOTE_FROM_EMAIL ?? "Pablo Taquechel Insurance <onboarding@resend.dev>",
              to: process.env.QUOTE_NOTIFICATION_EMAIL ?? "pablo.taquechel@weinsuregroup.com",
              replyTo: data.email,
              subject: quoteRequestSubject(data),
              react: QuoteRequestEmail(data),
            },
            { idempotencyKey: `quote-request-${storedQuote.id}` },
          );
          if (emailError) throw emailError;
          notification = "sent";
        } catch (e) {
          console.warn(
            "[quote] notification failed",
            e instanceof Error ? e.message : "Unknown error",
          );
        }

        return Response.json({ ok: true, notification });
      },
    },
  },
});
