import { list, put } from "@vercel/blob";
import { z } from "zod";

const TEAM_PATH = "team/team.json";

export const teamMemberSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  photoUrl: z.union([z.string().url().max(2000), z.literal("")]),
  published: z.boolean(),
  order: z.number().int().min(0).max(1000),
});

export const teamSchema = z.array(teamMemberSchema).max(30);
export type TeamMember = z.infer<typeof teamMemberSchema>;

const initialTeam: TeamMember[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    name: "Pablo Taquechel",
    email: "pablo.taquechel@weinsuregroup.com",
    photoUrl:
      "https://weinsuregroup.com/wp-content/uploads/2024/07/1596641476_1549890384_WeInsureMiami-Pablo_Taquechel.jpg",
    published: true,
    order: 0,
  },
];

export async function getTeamMembers() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return initialTeam;
  const result = await list({ prefix: TEAM_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === TEAM_PATH);
  if (!blob) return initialTeam;
  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to read team data.");
  return teamSchema.parse(await response.json()).sort((a, b) => a.order - b.order);
}

export async function saveTeamMembers(input: unknown) {
  const members = teamSchema.parse(input).map((member, order) => ({ ...member, order }));
  await put(TEAM_PATH, JSON.stringify(members), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
  return members;
}
