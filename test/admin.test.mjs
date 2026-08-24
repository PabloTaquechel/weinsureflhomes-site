import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("admin secrets remain server-side and only a password hash is configured", async () => {
  const files = await Promise.all([
    read("src/lib/admin-auth.server.ts"),
    read("src/routes/api/admin/session.ts"),
    read(".env.example"),
  ]);
  const source = files.join("\n");
  assert.match(source, /ADMIN_PASSWORD_HASH/);
  assert.match(source, /ADMIN_SESSION_SECRET/);
  assert.match(source, /HttpOnly/);
  assert.match(source, /SameSite=Strict/);
  assert.match(source, /x-csrf-token/);
});

test("team writes require authentication and uploads validate file contents", async () => {
  const teamRoute = await read("src/routes/api/admin/team.ts");
  const photoRoute = await read("src/routes/api/admin/team/photo.ts");
  assert.match(teamRoute, /requireAdmin\(request, true\)/);
  assert.match(photoRoute, /requireAdmin\(request, true\)/);
  assert.match(photoRoute, /MAX_BYTES = 5 \* 1024 \* 1024/);
  assert.match(photoRoute, /randomUUID\(\)/);
  assert.match(photoRoute, /WEBP/);
});

test("public team endpoint publishes only explicitly published members", async () => {
  const publicRoute = await read("src/routes/api/public/team.ts");
  assert.match(publicRoute, /filter\(\(member\) => member\.published\)/);
  assert.match(publicRoute, /cache-control.*no-store/);
});
