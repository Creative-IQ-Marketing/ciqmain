import { loadEnv } from "vite";
import { handlePaymentFormRequest } from "./netlify/functions/lib/paymentFormHandler.mjs";

/**
 * Vite dev middleware that mirrors the Netlify Function at
 * `/.netlify/functions/payment-form` so local `npm run dev` works
 * without exposing GHL credentials to the browser.
 */
export function paymentFormApiPlugin() {
  return {
    name: "ciq-payment-form-api",
    configureServer(server) {
      attachPaymentFormMiddleware(server);
    },
    configurePreviewServer(server) {
      attachPaymentFormMiddleware(server);
    },
  };
}

function attachPaymentFormMiddleware(server) {
  const env = loadEnv(server.config.mode, server.config.root, "");
  for (const key of [
    "GHL_API_KEY",
    "GHL_LOCATION_ID",
    "VITE_GHL_API_KEY",
    "VITE_GHL_LOCATION_ID",
  ]) {
    if (env[key] && !process.env[key]) {
      process.env[key] = env[key];
    }
  }

  server.middlewares.use(async (req, res, next) => {
    const url = req.url?.split("?")[0] || "";
    if (url !== "/.netlify/functions/payment-form") {
      next();
      return;
    }

    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks).toString("utf8");

      const result = await handlePaymentFormRequest({
        httpMethod: req.method || "GET",
        headers: req.headers,
        body,
        isBase64Encoded: false,
      });

      const headers = result.headers || {};
      for (const [key, value] of Object.entries(headers)) {
        if (value != null) res.setHeader(key, String(value));
      }
      res.statusCode = result.statusCode || 200;
      res.end(result.body ?? "");
    } catch {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error: "Internal server error.",
        }),
      );
    }
  });
}
