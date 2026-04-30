const SEO_AUDIT_API_URL =
  "https://aitool-production-04db.up.railway.app/api/reports/generate";

export async function requestSeoAuditReport({
  firstName,
  lastName,
  email,
  url,
}) {
  const response = await fetch(SEO_AUDIT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      url,
      firstName,
      lastName,
      firstname: firstName,
      lastname: lastName,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (response.status === 202) {
    return {
      ok: true,
      status: response.status,
      message: payload.message || "Report generating, check your email shortly",
    };
  }

  const error = new Error(payload.error || "Request failed");
  error.status = response.status;
  throw error;
}
