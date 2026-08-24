import { createFileRoute } from "@tanstack/react-router";
import { getTeamMembers } from "@/lib/team-store.server";

export const Route = createFileRoute("/api/public/team")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const members = (await getTeamMembers()).filter((member) => member.published);
          return Response.json({ members }, { headers: { "cache-control": "no-store" } });
        } catch (error) {
          console.error("[team] public read failed", error);
          return Response.json(
            { error: "Team information is temporarily unavailable." },
            { status: 500 },
          );
        }
      },
    },
  },
});
