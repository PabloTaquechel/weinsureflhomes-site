import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  clearAdminSessionCookie,
  createAdminSessionCookie,
  readAdminSession,
  requireAdmin,
  verifyAdminPassword,
} from "@/lib/admin-auth.server";

const loginSchema = z.object({ password: z.string().min(1).max(200) });
const attempts = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(request: Request) {
  const key = clientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 8;
}

export const Route = createFileRoute("/api/admin/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = readAdminSession(request);
        return Response.json(
          session
            ? { authenticated: true, csrfToken: session.csrfToken }
            : { authenticated: false },
          { headers: { "cache-control": "no-store" } },
        );
      },
      POST: async ({ request }) => {
        if (isRateLimited(request)) {
          return Response.json({ error: "Unable to sign in." }, { status: 429 });
        }
        const parsed = loginSchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success || !verifyAdminPassword(parsed.data.password)) {
          await new Promise((resolve) => setTimeout(resolve, 350));
          return Response.json({ error: "Unable to sign in." }, { status: 401 });
        }
        attempts.delete(clientKey(request));
        const { session, cookie } = createAdminSessionCookie();
        return Response.json(
          { authenticated: true, csrfToken: session.csrfToken },
          { headers: { "set-cookie": cookie, "cache-control": "no-store" } },
        );
      },
      DELETE: async ({ request }) => {
        if (!requireAdmin(request, true)) {
          return Response.json({ error: "Not authorized." }, { status: 401 });
        }
        return Response.json(
          { ok: true },
          { headers: { "set-cookie": clearAdminSessionCookie(), "cache-control": "no-store" } },
        );
      },
    },
  },
});
