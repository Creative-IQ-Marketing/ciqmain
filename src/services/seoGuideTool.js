const SEO_GUIDE_API_URL =
  "https://aitool-production-5b5e.up.railway.app/api/guide/send";

export async function requestSeoGuideEmail({ firstName, email }) {
  const response = await fetch(SEO_GUIDE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      firstName,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (response.ok) {
    return {
      ok: true,
      status: response.status,
      message: payload.message || "Guide email sent",
    };
  }

  const error = new Error(payload.error || payload.message || "Guide send failed");
  error.status = response.status;
  throw error;
}

