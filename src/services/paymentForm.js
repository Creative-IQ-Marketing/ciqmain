const ENDPOINT = "/.netlify/functions/payment-form";

async function postJson(body) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    cache: "no-store",
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return { response, data };
}

/**
 * Resume or mint a server-signed 5-minute session.
 * Sticky via HttpOnly cookie — leaving and returning does not reset the timer.
 */
export async function createPaymentFormSession() {
  const { response, data } = await postJson({ action: "session" });

  if (!response.ok || !data?.success || !data?.token || !data?.expiresAt) {
    const error = new Error(
      data?.error || "Unable to start a secure session. Please reload.",
    );
    error.status = response.status;
    throw error;
  }

  return {
    token: String(data.token),
    expiresAt: Number(data.expiresAt),
    expiresIn: Number(data.expiresIn) || 5 * 60 * 1000,
    resumed: Boolean(data.resumed),
  };
}

/**
 * Submit payment-form details through the single server endpoint.
 * Never calls GHL from the browser. Requires a live session token.
 */
export async function submitPaymentForm(payload) {
  const { response, data } = await postJson(payload);

  if (!response.ok || !data?.success) {
    const error = new Error(
      data?.error || "We could not save your details. Please try again.",
    );
    error.status = response.status;
    throw error;
  }

  return { success: true };
}
