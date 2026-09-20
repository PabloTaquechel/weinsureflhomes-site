import { spawn } from "node:child_process";
import { audit } from "./seo-audit.mjs";

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: "inherit", windowsHide: true });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${args.join(" ")} exited ${code}`)),
    );
  });
}
// Building first regenerates TanStack's route types for any new routes.
await run(["node_modules/vite/bin/vite.js", "build"]);
await run(["node_modules/typescript/bin/tsc", "--noEmit"]);
await run(["--test"]);
const port = 4317;
const server = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "dev",
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
    "--strictPort",
  ],
  { stdio: "pipe", windowsHide: true },
);
let exited = false;
server.on("exit", () => {
  exited = true;
});
server.stdout.on("data", () => {});
server.stderr.on("data", () => {});
try {
  let ready = false;
  for (let attempt = 0; attempt < 45; attempt++) {
    if (exited) throw new Error("Verification server exited; check that port 4317 is free");
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`, {
        signal: AbortSignal.timeout(3000),
      });
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Wait for startup. */
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (!ready) throw new Error("Local verification server did not become ready");
  const report = await audit(`http://127.0.0.1:${port}`);
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exitCode = 1;
} finally {
  server.kill();
}
