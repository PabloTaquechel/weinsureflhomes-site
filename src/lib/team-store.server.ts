import { list, put } from "@vercel/blob";
import { z } from "zod";

const TEAM_PATH = "team/team.json";

export const teamMemberSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  photoUrl: z.union([
    z.string().url().max(2000),
    z
      .string()
      .regex(/^\/[a-zA-Z0-9._/-]+$/)
      .max(2000),
    z.literal(""),
  ]),
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
    photoUrl: "/pablo-headshot.jpg",
    published: true,
    order: 0,
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    name: "Bryan Faulmann",
    email: "bryan.faulmann@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 1,
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    name: "Vilmarie Torres",
    email: "vilmarie.torres@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 2,
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    name: "Marcos Gomero",
    email: "marcos.gomero@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 3,
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    name: "Mayrelin Hernandez",
    email: "mayrelin.hernandez@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 4,
  },
  {
    id: "00000000-0000-4000-8000-000000000006",
    name: "Georgina Aguaswolf",
    email: "georgina.aguaswolf@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 5,
  },
  {
    id: "00000000-0000-4000-8000-000000000007",
    name: "Caridad Calvin",
    email: "caridad.calvin@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 6,
  },
  {
    id: "00000000-0000-4000-8000-000000000008",
    name: "Samantha Marinoff",
    email: "samantha.marinoff@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 7,
  },
  {
    id: "00000000-0000-4000-8000-000000000009",
    name: "Daniel Fuentes",
    email: "daniel.fuentes@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 8,
  },
  {
    id: "00000000-0000-4000-8000-000000000010",
    name: "Gianella Constante",
    email: "gianella.constante@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 9,
  },
  {
    id: "00000000-0000-4000-8000-000000000011",
    name: "Eli Selleza",
    email: "eli.selleza@weinsuregroup.com",
    photoUrl: "",
    published: true,
    order: 10,
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
