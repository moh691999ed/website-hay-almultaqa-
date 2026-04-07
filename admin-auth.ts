/**
 * جلسة الإدارة — Web Crypto فقط (متوافق مع Edge / middleware).
 * لا تستخدم node:crypto هنا لأن middleware يستورد هذا الملف.
 */

const COOKIE_NAME = "am_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

const DEFAULT_DEV_SECRET = "al-multaqa-dev-admin-secret-min-32-chars!!";
const DEFAULT_DEV_PASSWORD = "123456";

type SessionPayload = {
  exp: number;
};

function resolveSecret(): string {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV !== "production") return DEFAULT_DEV_SECRET;
  throw new Error("ADMIN_SECRET is required in production (min 16 characters).");
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSha256Base64Url(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bytesToBase64Url(new Uint8Array(sig));
}

function timingSafeEqualUtf8(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function encodePayload(payload: SessionPayload): string {
  return bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
}

function base64UrlDecodeToUtf8(value: string): string | null {
  try {
    const pad = value.length % 4 ? 4 - (value.length % 4) : 0;
    const b64 = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function decodePayload(value: string): SessionPayload | null {
  const raw = base64UrlDecodeToUtf8(value);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return null;
    const exp = (parsed as { exp?: unknown }).exp;
    if (typeof exp !== "number") return null;
    return { exp };
  } catch {
    return null;
  }
}

export function adminCookieName() {
  return COOKIE_NAME;
}

export async function makeAdminSessionCookie() {
  const secret = resolveSecret();
  const payload = encodePayload({ exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS });
  const sig = await hmacSha256Base64Url(secret, payload);
  const token = `${payload}.${sig}`;

  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    },
  };
}

export function clearAdminSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 0,
    },
  };
}

export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  let secret: string;
  try {
    secret = resolveSecret();
  } catch {
    return false;
  }

  const expected = await hmacSha256Base64Url(secret, payload);
  if (expected.length !== sig.length || !timingSafeEqualUtf8(expected, sig)) {
    return false;
  }

  const decoded = decodePayload(payload);
  if (!decoded) return false;
  return decoded.exp > Math.floor(Date.now() / 1000);
}

export function validateAdminPassword(password: string): boolean {
  const expected = (process.env.ADMIN_PASSWORD ?? DEFAULT_DEV_PASSWORD).trim();
  if (!expected) return false;
  return password.trim() === expected;
}
