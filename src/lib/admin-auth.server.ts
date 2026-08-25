import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "pablo_admin";
const SESSION_SECONDS = 60 * 60 * 8;

type AdminSession = {
  expiresAt: number;
  csrfToken: string;
};

function getRequiredSecret(name: "ADMIN_PASSWORD_HASH" | "ADMIN_SESSION_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function sign(value: string) {
  return createHmac("sha256", getRequiredSecret("ADMIN_SESSION_SECRET"))
    .update(value)
    .digest("base64url");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function parseCookies(header: string | null) {
  const cookies = new Map<string, string>();
  for (const item of (header ?? "").split(";")) {
    const index = item.indexOf("=");
    if (index < 1) continue;
    cookies.set(item.slice(0, index).trim(), item.slice(index + 1).trim());
  }
  return cookies;
}

export function verifyAdminPassword(password: string) {
  const configuredPassword = getRequiredSecret("ADMIN_PASSWORD_HASH");
  const [algorithm, salt, expected] = configuredPassword.split("$");
  if (algorithm !== "scrypt") return safeEqual(password, configuredPassword);
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 32).toString("hex");
  return safeEqual(actual, expected);
}

export function createAdminSessionCookie() {
  const session: AdminSession = {
    expiresAt: Date.now() + SESSION_SECONDS * 1000,
    csrfToken: randomBytes(24).toString("base64url"),
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return {
    session,
    cookie: `${COOKIE_NAME}=${payload}.${sign(payload)}; Path=/; HttpOnly; SameSite=Strict${secure}; Max-Age=${SESSION_SECONDS}`,
  };
}

export function clearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict${secure}; Max-Age=0`;
}

export function readAdminSession(request: Request): AdminSession | null {
  const value = parseCookies(request.headers.get("cookie")).get(COOKIE_NAME);
  if (!value) return null;
  const index = value.lastIndexOf(".");
  if (index < 1) return null;
  const payload = value.slice(0, index);
  if (!safeEqual(sign(payload), value.slice(index + 1))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (
      !session.csrfToken ||
      !Number.isFinite(session.expiresAt) ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function requireAdmin(request: Request, requireCsrf = false) {
  const session = readAdminSession(request);
  if (!session) return null;
  if (requireCsrf && !safeEqual(request.headers.get("x-csrf-token") ?? "", session.csrfToken)) {
    return null;
  }
  return session;
}
