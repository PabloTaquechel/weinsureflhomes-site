import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
export interface QuoteRequestEmailProps {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  insurance_type?: string;
  occupancy?: string | null;
  year_of_roof?: string | null;
  hurricane_protection?: string | null;
  mailing_address?: string | null;
  prior_address?: string | null;
  title_holders?: string | null;
  prior_claims?: string | null;
  notes?: string | null;
}

const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <Text style={row}>
      <strong style={lbl}>{label}:</strong> {value}
    </Text>
  ) : null;

export default function QuoteRequestEmail(p: QuoteRequestEmailProps) {
  const name = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || "New lead";
  return (
    <Html lang="en">
      <Head />
      <Preview>{`New ${p.insurance_type ?? "insurance"} quote — ${name}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Quote Request</Heading>
          <Text style={sub}>
            {p.insurance_type ?? "Insurance"} — {name}
          </Text>
          <Hr style={hr} />
          <Section>
            <Row label="Name" value={name} />
            <Row label="Email" value={p.email} />
            <Row label="Phone" value={p.phone} />
            <Row label="Property address" value={p.address} />
            <Row label="Mailing address" value={p.mailing_address ?? undefined} />
            <Row label="Prior address (<3 yrs)" value={p.prior_address ?? undefined} />
            <Row label="Occupancy" value={p.occupancy ?? undefined} />
            <Row label="Year of roof" value={p.year_of_roof ?? undefined} />
            <Row label="Hurricane protection" value={p.hurricane_protection ?? undefined} />
          </Section>
          {p.title_holders ? (
            <>
              <Hr style={hr} />
              <Text style={lbl}>Title holders (Name & DOB):</Text>
              <Text style={pre}>{p.title_holders}</Text>
            </>
          ) : null}
          {p.prior_claims ? (
            <>
              <Hr style={hr} />
              <Text style={lbl}>Prior claims (last 5 yrs):</Text>
              <Text style={pre}>{p.prior_claims}</Text>
            </>
          ) : null}
          {p.notes ? (
            <>
              <Hr style={hr} />
              <Text style={lbl}>Notes:</Text>
              <Text style={pre}>{p.notes}</Text>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}

export function quoteRequestSubject(data: QuoteRequestEmailProps) {
  const name = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim();
  return `New ${data.insurance_type ?? "insurance"} quote — ${name || "New lead"}`;
}

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container = { padding: "24px", maxWidth: "600px" };
const h1 = { color: "#0f172a", fontSize: "22px", margin: "0 0 4px" };
const sub = { color: "#475569", fontSize: "14px", margin: "0" };
const hr = { borderColor: "#e2e8f0", margin: "16px 0" };
const row = { color: "#0f172a", fontSize: "14px", margin: "4px 0" };
const lbl = { color: "#0f172a", fontSize: "14px", fontWeight: 600 as const };
const pre = {
  color: "#0f172a",
  fontSize: "13px",
  whiteSpace: "pre-wrap" as const,
  background: "#f8fafc",
  padding: "10px",
  borderRadius: "6px",
};
