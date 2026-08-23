import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("runtime dependencies no longer use Lovable", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  assert.equal(
    Object.keys(dependencies).some((name) => name.startsWith("@lovable.dev/")),
    false,
  );

  const quoteRoute = await read("src/routes/api/public/quote.ts");
  assert.doesNotMatch(quoteRoute, /\/lovable\/email|@lovable\.dev/);
  assert.match(quoteRoute, /new Resend/);
});

test("private runtime values are represented by names only", async () => {
  const example = await read(".env.example");
  for (const key of [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
    "VITE_SUPABASE_URL",
    "VITE_SUPABASE_PUBLISHABLE_KEY",
  ]) {
    assert.match(example, new RegExp(`^${key}=\\s*$`, "m"));
  }

  const gitignore = await read(".gitignore");
  assert.match(gitignore, /^\.env\.\*$/m);
  assert.match(gitignore, /^!\.env\.example$/m);
});

test("only quote-request database migrations remain", async () => {
  const migrationA = await read(
    "supabase/migrations/20260608193527_e7b218e3-b67a-48e5-ac44-74e13079ef3e.sql",
  );
  const migrationB = await read(
    "supabase/migrations/20260608210744_365038ee-91f0-41a5-a782-003f9ca0b43f.sql",
  );
  assert.match(migrationA, /CREATE TABLE public\.quote_requests/);
  assert.match(migrationB, /ADD COLUMN IF NOT EXISTS mailing_address/);
  assert.doesNotMatch(migrationA + migrationB, /email_send_log|pgmq|lovable/i);
});
