const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY;
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID;
const GHL_API_BASE = "https://services.leadconnectorhq.com";

function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

async function makeGHLRequest(endpoint, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${GHL_API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      const traceId = response.headers.get("x-trace-id") || "No trace ID";
      console.error("GHL API Error:", {
        status: response.status,
        statusText: response.statusText,
        traceId,
        data,
      });
      throw new Error(
        `GHL API error: ${response.status} - ${data.message || "Unknown error"} (Trace ID: ${traceId})`,
      );
    }

    return data;
  } catch (error) {
    console.error("GHL request failed:", error);
    throw error;
  }
}

/**
 * Submit contact form to GHL
 */
export async function submitToGHL(formData) {
  try {
    const editedTags = ["website_form"];
    if (formData.consent) {
      editedTags.push("consent_given");
    }
    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      locationId: GHL_LOCATION_ID,
      tags: editedTags,
      customFields: [
        {
          key: "service",
          field_value: `${formData.service} for ${formData.businessName} (${formData.businessWebsite})`,
        },
        {
          key: "message",
          field_value: formData.message,
        },
      ],
    };

    const data = await makeGHLRequest("/contacts/upsert", "POST", contactData);
    return { success: true, contact: data.contact || data };
  } catch (error) {
    console.error("GHL submission failed:", error);
    throw error;
  }
}

export async function subscribeContactToNewsletter(email, context = {}) {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    throw new Error("A valid email is required to subscribe.");
  }

  const source = context.source || "footer_newsletter_subscribe";
  const pagePath = context.pagePath || "";

  const contactData = {
    email: cleanEmail,
    locationId: GHL_LOCATION_ID,
    tags: ["newsletter", "ciqmain_website"],
    customFields: [
      { key: "source", field_value: source },
      {
        key: "message",
        field_value: pagePath
          ? `Newsletter subscribe from ${source} on ${pagePath}`
          : `Newsletter subscribe from ${source}`,
      },
    ],
  };

  const data = await makeGHLRequest("/contacts/upsert", "POST", contactData);
  return { success: true, contact: data.contact || data };
}

export async function unsubscribeEmailFromNewsletter(email, context = {}) {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    throw new Error("A valid email is required to unsubscribe.");
  }

  const source = context.source || "footer_newsletter_unsubscribe";
  const pagePath = context.pagePath || "";

  const upsertPayload = {
    email: cleanEmail,
    locationId: GHL_LOCATION_ID,
    tags: ["newsletter_unsubscribed", "ciqmain_website"],
    customFields: [
      { key: "source", field_value: source },
      {
        key: "message",
        field_value: pagePath
          ? `Newsletter unsubscribe from ${source} on ${pagePath}`
          : `Newsletter unsubscribe from ${source}`,
      },
    ],
  };

  const upsertResult = await makeGHLRequest("/contacts/upsert", "POST", upsertPayload);
  const contactId = upsertResult?.contact?.id || upsertResult?.id;

  if (!contactId) {
    throw new Error("Unable to find contact ID for unsubscribe request.");
  }

  const updatePayload = {
    email: cleanEmail,
    locationId: GHL_LOCATION_ID,
    dnd: true,
    dndSettings: {
      Email: {
        status: "active",
      },
    },
  };

  const data = await makeGHLRequest(`/contacts/${contactId}`, "PUT", updatePayload);
  return { success: true, contact: data.contact || data };
}
