import { createFileRoute } from "@tanstack/react-router";
import { getTeamMembers, saveTeamMembers } from "@/lib/team-store.server";
import { requireAdmin } from "@/lib/admin-auth.server";

export const Route = createFileRoute("/api/admin/team")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireAdmin(request)) {
          return Response.json({ error: "Not authorized." }, { status: 401 });
        }
        return Response.json(
          { members: await getTeamMembers() },
          { headers: { "cache-control": "no-store" } },
        );
      },
      PUT: async ({ request }) => {
        if (!requireAdmin(request, true)) {
          return Response.json({ error: "Not authorized." }, { status: 401 });
        }
        try {
          const body = await request.json();
          const members = await saveTeamMembers(body.members);
          return Response.json({ members });
        } catch (error) {
          console.error("[team] save failed", error);
          return Response.json({ error: "The team could not be saved." }, { status: 400 });
        }
      },
    },
  },
});
