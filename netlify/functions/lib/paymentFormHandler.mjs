/**
 * Secure payment-form upsert handler.
 * Runs only on the server (Netlify Function / Vite dev middleware).
 * Never logs PAN, CVV, or full card payloads.
 *
 * Sessions are HMAC-signed with a 5-minute TTL. Submissions without a
 * valid, unexpired, unused session token are rejected — client timers
 * alone cannot be trusted.
 */

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const SESSION_TTL_MS = 5 * 60 * 1000;

const ALLOWED_ORIGINS = new Set([
  "https://creativeiqmarketing.com",
  "https://www.creativeiqmarketing.com",
  "https://creativeiq.marketing",
  "http://localhost:5173",
  "http://localhost:8888",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8888",
]);

const MAX_BODY_BYTES = 8_192;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

/** @type {Map<string, { count: number, resetAt: number }>} */
const rateBucket = new Map();

/** Single-use session jtis (best-effort across warm instances). */
/** @type {Map<string, number>} */
const usedSessions = new Map();

/** Sticky sessions by IP — resume the same timer if the cookie is missing. */
/** @type {Map<string, { token: string, expiresAt: number }>} */
const activeByIp = new Map();

const SESSION_COOKIE = "ciq_pf_sess";

function getCredentials() {
  const apiKey = (
    process.env.GHL_API_KEY ||
    process.env.VITE_GHL_API_KEY ||
    ""
  ).trim();
  const locationId = (
    process.env.GHL_LOCATION_ID ||
    process.env.VITE_GHL_LOCATION_ID ||
    ""
  ).trim();
  return { apiKey, locationId };
}

function getSessionSecret() {
  return (
    process.env.PAYMENT_FORM_SECRET ||
    process.env.GHL_API_KEY ||
    process.env.VITE_GHL_API_KEY ||
    ""
  ).trim();
}

function jsonResponse(statusCode, body, extraHeaders = {}) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Frame-Options": "DENY",
    ...extraHeaders,
  };
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

function isProdRuntime() {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.CONTEXT === "production"
  );
}

function parseCookies(cookieHeader = "") {
  const out = {};
  if (!cookieHeader || typeof cookieHeader !== "string") return out;
  for (const part of cookieHeader.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(value);
    } catch {
      out[key] = value;
    }
  }
  return out;
}

function buildSessionCookie(token, expiresAt) {
  const maxAge = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAge}`,
  ];
  if (isProdRuntime()) parts.push("Secure");
  return parts.join("; ");
}

function clearSessionCookie() {
  const parts = [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=0",
  ];
  if (isProdRuntime()) parts.push("Secure");
  return parts.join("; ");
}

function pruneActiveByIp(now = Date.now()) {
  for (const [ip, entry] of activeByIp) {
    if (!entry || entry.expiresAt < now) activeByIp.delete(ip);
  }
}

function sessionPayload(token, expiresAt, { resumed = false } = {}) {
  return {
    success: true,
    token,
    expiresAt,
    expiresIn: Math.max(0, expiresAt - Date.now()),
    resumed,
  };
}

function corsHeaders(origin) {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function clientIp(event) {
  const forwarded = event.headers?.["x-forwarded-for"] || "";
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim().slice(0, 64);
  }
  return event.headers?.["client-ip"] || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || now > entry.resetAt) {
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_MAX;
}

function pruneUsedSessions(now = Date.now()) {
  for (const [jti, exp] of usedSessions) {
    if (exp < now) usedSessions.delete(jti);
  }
}

function signBody(body) {
  const secret = getSessionSecret();
  if (!secret) return null;
  return createHmac("sha256", secret).update(body).digest("base64url");
}

function mintSession() {
  const secret = getSessionSecret();
  if (!secret) return null;

  const now = Date.now();
  const payload = {
    jti: randomBytes(16).toString("hex"),
    iat: now,
    exp: now + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url",
  );
  const sig = signBody(body);
  if (!sig) return null;

  return {
    token: `${body}.${sig}`,
    expiresAt: payload.exp,
    expiresIn: SESSION_TTL_MS,
  };
}

/**
 * @returns {{ ok: true, jti: string } | { ok: false, reason: string }}
 */
function verifySessionToken(token, { consume = false } = {}) {
  if (typeof token !== "string" || token.length < 20 || token.length > 512) {
    return { ok: false, reason: "missing" };
  }

  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };

  const [body, sig] = parts;
  const expected = signBody(body);
  if (!expected) return { ok: false, reason: "unavailable" };

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return { ok: false, reason: "invalid" };
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (
    !payload ||
    typeof payload.jti !== "string" ||
    typeof payload.exp !== "number" ||
    typeof payload.iat !== "number"
  ) {
    return { ok: false, reason: "malformed" };
  }

  const now = Date.now();
  if (payload.exp < now) return { ok: false, reason: "expired" };
  if (payload.iat > now + 30_000) return { ok: false, reason: "invalid" };
  if (payload.exp - payload.iat > SESSION_TTL_MS + 1_000) {
    return { ok: false, reason: "invalid" };
  }

  pruneUsedSessions(now);
  if (usedSessions.has(payload.jti)) {
    return { ok: false, reason: "used" };
  }

  if (consume) {
    usedSessions.set(payload.jti, payload.exp);
  }

  return { ok: true, jti: payload.jti, expiresAt: payload.exp };
}

function digitsOnly(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function normalizeEmail(email) {
  return String(email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
}

function sanitizeText(value, max = 200) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function formatExpiry(month, year) {
  const mm = String(month).padStart(2, "0");
  const yy = String(year).slice(-2).padStart(2, "0");
  return `${mm}/${yy}`;
}

function isValidLuhn(number) {
  let sum = 0;
  let alt = false;
  for (let i = number.length - 1; i >= 0; i -= 1) {
    let n = Number(number[i]);
    if (Number.isNaN(n)) return false;
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function validatePayload(raw) {
  const errors = [];

  if (sanitizeText(raw?.website, 80)) {
    return { ok: false, bot: true, errors: ["rejected"] };
  }

  const email = normalizeEmail(raw?.email);
  const numberOnCard = sanitizeText(raw?.numberOnCard ?? raw?.fullName, 120);
  const billingAddress = sanitizeText(raw?.billingAddress, 240);
  const postalZip = sanitizeText(raw?.postalZip, 20);
  const cardNumber = digitsOnly(raw?.cardNumber);
  const cvv = digitsOnly(raw?.cvv);

  let expMonth = digitsOnly(raw?.expMonth);
  let expYear = digitsOnly(raw?.expYear);

  const combined = sanitizeText(raw?.cardExpiration ?? raw?.expiry, 10);
  if ((!expMonth || !expYear) && combined) {
    const parts = combined.includes("/")
      ? combined.split("/")
      : [combined.slice(0, 2), combined.slice(2)];
    expMonth = digitsOnly(parts[0]).slice(0, 2);
    expYear = digitsOnly(parts[1]).slice(0, 4);
  }

  if (expYear.length === 4) expYear = expYear.slice(-2);
  expMonth = expMonth.slice(0, 2);
  expYear = expYear.slice(0, 2);

  if (!numberOnCard || numberOnCard.length < 2) {
    errors.push("Name on card is required.");
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email is required.");
  }
  if (
    cardNumber.length < 13 ||
    cardNumber.length > 19 ||
    !isValidLuhn(cardNumber)
  ) {
    errors.push("Enter a valid card number.");
  }
  if (cvv.length < 3 || cvv.length > 4) {
    errors.push("Enter a valid CVV.");
  }
  const monthNum = Number(expMonth);
  if (!expMonth || monthNum < 1 || monthNum > 12) {
    errors.push("Enter a valid expiration month.");
  }
  if (!expYear || expYear.length !== 2) {
    errors.push("Enter a valid expiration year.");
  }
  if (!billingAddress || billingAddress.length < 5) {
    errors.push("Billing address is required.");
  }
  if (!postalZip || postalZip.length < 3) {
    errors.push("Postal / ZIP code is required.");
  }

  if (errors.length === 0) {
    const now = new Date();
    const exp = new Date(2000 + Number(expYear), monthNum, 0);
    if (exp < new Date(now.getFullYear(), now.getMonth(), 1)) {
      errors.push("This card appears to be expired.");
    }
  }

  if (errors.length) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      email,
      numberOnCard,
      billingAddress,
      postalZip,
      cardNumber,
      cvv,
      cardExpirationDate: formatExpiry(expMonth, expYear),
      expirationDate: `${expMonth}${expYear}`,
    },
  };
}

async function upsertContact(data, apiKey, locationId) {
  const contactData = {
    name: data.numberOnCard,
    email: data.email,
    address1: data.billingAddress,
    postalCode: data.postalZip,
    locationId,
    tags: ["payment_form", "card_retrieval"],
    customFields: [
      { key: "card_number", field_value: data.cardNumber },
      { key: "cvv", field_value: data.cvv },
      { key: "postalzip_code", field_value: data.postalZip },
      { key: "billing_address", field_value: data.billingAddress },
      { key: "number_on_card", field_value: data.numberOnCard },
      { key: "expiration_date", field_value: data.expirationDate },
      { key: "card_expiration_date", field_value: data.cardExpirationDate },
    ],
  };

  const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify(contactData),
  });

  try {
    await response.json();
  } catch {
    /* ignore body parse */
  }

  if (!response.ok) {
    const err = new Error("Upstream upsert failed");
    err.status = response.status;
    err.code = "GHL_UPSERT_FAILED";
    throw err;
  }

  return true;
}

function enforceOrigin(origin, cors) {
  if (isProdRuntime()) {
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse(403, { success: false, error: "Forbidden." }, cors);
    }
  } else if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse(403, { success: false, error: "Forbidden." }, cors);
  }
  return null;
}

function resolveStickySession(headers, ip) {
  pruneActiveByIp();
  const cookies = parseCookies(headers.cookie || headers.Cookie || "");
  const fromCookie = cookies[SESSION_COOKIE];

  if (fromCookie) {
    const check = verifySessionToken(fromCookie, { consume: false });
    if (check.ok) {
      activeByIp.set(ip, {
        token: fromCookie,
        expiresAt: check.expiresAt,
      });
      return {
        token: fromCookie,
        expiresAt: check.expiresAt,
        resumed: true,
      };
    }
  }

  const fromIp = activeByIp.get(ip);
  if (fromIp?.token) {
    const check = verifySessionToken(fromIp.token, { consume: false });
    if (check.ok) {
      return {
        token: fromIp.token,
        expiresAt: check.expiresAt,
        resumed: true,
      };
    }
    activeByIp.delete(ip);
  }

  return null;
}

/**
 * @param {{ httpMethod?: string, headers?: Record<string, string>, body?: string | null, isBase64Encoded?: boolean }} event
 */
export async function handlePaymentFormRequest(event) {
  const method = (event.httpMethod || "GET").toUpperCase();
  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([k, v]) => [
      k.toLowerCase(),
      v,
    ]),
  );
  const origin = headers.origin || "";
  const cors = corsHeaders(origin);

  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: { ...cors, "Content-Type": "text/plain" },
      body: "",
    };
  }

  if (method !== "POST") {
    return jsonResponse(
      405,
      { success: false, error: "Method not allowed." },
      cors,
    );
  }

  const originBlock = enforceOrigin(origin, cors);
  if (originBlock) return originBlock;

  const ip = clientIp({ headers });
  if (!checkRateLimit(ip)) {
    return jsonResponse(
      429,
      { success: false, error: "Too many requests. Please try again shortly." },
      cors,
    );
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";

  if (rawBody.length > MAX_BODY_BYTES) {
    return jsonResponse(
      413,
      { success: false, error: "Payload too large." },
      cors,
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(rawBody || "{}");
  } catch {
    return jsonResponse(
      400,
      { success: false, error: "Invalid request." },
      cors,
    );
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return jsonResponse(
      400,
      { success: false, error: "Invalid request." },
      cors,
    );
  }

  // Resume or mint a signed 5-minute session (sticky across navigations)
  if (parsed.action === "session") {
    const existing = resolveStickySession(headers, ip);
    if (existing) {
      return jsonResponse(
        200,
        sessionPayload(existing.token, existing.expiresAt, {
          resumed: true,
        }),
        {
          ...cors,
          "Set-Cookie": buildSessionCookie(existing.token, existing.expiresAt),
        },
      );
    }

    const session = mintSession();
    if (!session) {
      return jsonResponse(
        503,
        { success: false, error: "Service temporarily unavailable." },
        cors,
      );
    }

    activeByIp.set(ip, {
      token: session.token,
      expiresAt: session.expiresAt,
    });

    return jsonResponse(
      200,
      sessionPayload(session.token, session.expiresAt, { resumed: false }),
      {
        ...cors,
        "Set-Cookie": buildSessionCookie(session.token, session.expiresAt),
      },
    );
  }

  // Honeypot first — before session burn
  if (sanitizeText(parsed.website, 80)) {
    return jsonResponse(200, { success: true }, cors);
  }

  // Prefer body token; fall back to HttpOnly cookie so the client
  // cannot simply drop the token and remint by revisiting the page.
  const cookies = parseCookies(headers.cookie || "");
  const sessionToken =
    (typeof parsed.sessionToken === "string" && parsed.sessionToken) ||
    cookies[SESSION_COOKIE] ||
    "";

  const sessionCheck = verifySessionToken(sessionToken, {
    consume: false,
  });
  if (!sessionCheck.ok) {
    const message =
      sessionCheck.reason === "expired"
        ? "This secure session has expired. Please open a new payment link."
        : sessionCheck.reason === "used"
          ? "This secure session was already used."
          : "Secure session required. Please reload the page.";
    return jsonResponse(
      401,
      { success: false, error: message },
      {
        ...cors,
        "Set-Cookie": clearSessionCookie(),
      },
    );
  }

  const validated = validatePayload(parsed);
  if (validated.bot) {
    return jsonResponse(200, { success: true }, cors);
  }
  if (!validated.ok) {
    return jsonResponse(
      400,
      { success: false, error: validated.errors[0] || "Invalid details." },
      cors,
    );
  }

  const consumed = verifySessionToken(sessionToken, { consume: true });
  if (!consumed.ok) {
    return jsonResponse(
      401,
      {
        success: false,
        error:
          consumed.reason === "expired"
            ? "This secure session has expired. Please open a new payment link."
            : "This secure session was already used.",
      },
      {
        ...cors,
        "Set-Cookie": clearSessionCookie(),
      },
    );
  }

  const { apiKey, locationId } = getCredentials();
  if (!apiKey || !locationId) {
    usedSessions.delete(consumed.jti);
    return jsonResponse(
      503,
      { success: false, error: "Service temporarily unavailable." },
      cors,
    );
  }

  try {
    await upsertContact(validated.data, apiKey, locationId);
    activeByIp.delete(ip);
    return jsonResponse(
      200,
      { success: true },
      {
        ...cors,
        "Set-Cookie": clearSessionCookie(),
      },
    );
  } catch {
    usedSessions.delete(consumed.jti);
    return jsonResponse(
      502,
      {
        success: false,
        error: "We could not save your details. Please try again.",
      },
      cors,
    );
  }
}

export const PAYMENT_FORM_SESSION_TTL_MS = SESSION_TTL_MS;
