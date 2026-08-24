import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  published: boolean;
  order: number;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Team Admin — Pablo Taquechel" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [csrfToken, setCsrfToken] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function loadTeam(token: string) {
    const response = await fetch("/api/admin/team", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load the team.");
    const data = (await response.json()) as { members: TeamMember[] };
    setMembers(data.members);
    setCsrfToken(token);
  }

  useEffect(() => {
    void fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((session: { authenticated: boolean; csrfToken?: string }) => {
        if (session.authenticated && session.csrfToken) return loadTeam(session.csrfToken);
      })
      .catch(() => setMessage("The admin service is temporarily unavailable."));
  }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { csrfToken?: string; error?: string };
      if (!response.ok || !data.csrfToken) throw new Error(data.error || "Unable to sign in.");
      setPassword("");
      await loadTeam(data.csrfToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "content-type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({ members }),
      });
      const data = (await response.json()) as { members?: TeamMember[]; error?: string };
      if (!response.ok || !data.members) throw new Error(data.error || "Unable to save the team.");
      setMembers(data.members);
      setMessage("Team saved. The public homepage now uses these published members.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save the team.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/session", {
      method: "DELETE",
      headers: { "x-csrf-token": csrfToken },
    });
    setCsrfToken("");
    setMembers([]);
    setMessage("");
  }

  async function uploadPhoto(index: number, file: File) {
    setBusy(true);
    setMessage("");
    try {
      const form = new FormData();
      form.set("photo", file);
      const response = await fetch("/api/admin/team/photo", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        body: form,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Unable to upload the photo.");
      setMembers((current) =>
        current.map((member, i) => (i === index ? { ...member, photoUrl: data.url! } : member)),
      );
      setMessage("Photo uploaded. Select Save team to publish it.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to upload the photo.");
    } finally {
      setBusy(false);
    }
  }

  function update(index: number, patch: Partial<TeamMember>) {
    setMembers((current) =>
      current.map((member, i) => (i === index ? { ...member, ...patch } : member)),
    );
  }

  function move(index: number, direction: -1 | 1) {
    setMembers((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((member, order) => ({ ...member, order }));
    });
  }

  if (!csrfToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary px-6">
        <form
          onSubmit={signIn}
          className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-xl"
        >
          <a href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to website
          </a>
          <h1 className="mt-8 text-4xl text-primary">Team admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the private site password.</p>
          <label className="mt-7 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            disabled={busy}
            className="mt-5 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
          {message && (
            <p role="status" className="mt-4 text-sm text-red-700">
              {message}
            </p>
          )}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <a href="/" className="text-sm text-muted-foreground hover:text-primary">
              ← View website
            </a>
            <h1 className="mt-4 text-5xl text-primary">Meet the team</h1>
            <p className="mt-2 text-muted-foreground">
              Only published members appear on the homepage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm text-muted-foreground"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={() =>
                setMembers((current) => [
                  ...current,
                  {
                    id: crypto.randomUUID(),
                    name: "",
                    email: "",
                    photoUrl: "",
                    published: false,
                    order: current.length,
                  },
                ])
              }
              className="rounded-full border border-primary px-5 py-2.5 text-sm text-primary"
            >
              Add team member
            </button>
          </div>
        </div>
        <div className="mt-10 space-y-5">
          {members.map((member, index) => (
            <section
              key={member.id}
              className="grid gap-6 rounded-2xl border border-border bg-background p-6 shadow-sm md:grid-cols-[150px_1fr]"
            >
              <div>
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt=""
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
                    No photo
                  </div>
                )}
                <label className="mt-3 block cursor-pointer text-center text-xs font-medium text-primary underline underline-offset-4">
                  Upload photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void uploadPhoto(index, file);
                    }}
                  />
                </label>
              </div>
              <div className="grid content-start gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  Name
                  <input
                    required
                    value={member.name}
                    onChange={(event) => update(index, { name: event.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5"
                  />
                </label>
                <label className="text-sm">
                  Email
                  <input
                    required
                    type="email"
                    value={member.email}
                    onChange={(event) => update(index, { email: event.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border px-3 py-2.5"
                  />
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={member.published}
                    onChange={(event) => update(index, { published: event.target.checked })}
                    className="h-4 w-4"
                  />
                  Published on homepage
                </label>
                <div className="flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-40"
                  >
                    Move up
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === members.length - 1}
                    className="rounded-md border px-3 py-1.5 text-xs disabled:opacity-40"
                  >
                    Move down
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMembers((current) =>
                        current
                          .filter((_, i) => i !== index)
                          .map((item, order) => ({ ...item, order })),
                      )
                    }
                    className="rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className="sticky bottom-4 mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
          <p role="status" className="text-sm text-muted-foreground">
            {message || "Changes stay private until you save."}
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void save()}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Working…" : "Save team"}
          </button>
        </div>
      </div>
    </main>
  );
}
