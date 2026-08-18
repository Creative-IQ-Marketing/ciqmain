import { ACTIVE_EVENT } from "../data/activeEvent.js";

const GHL_API_KEY = (import.meta.env.VITE_GHL_API_KEY || "").trim();
const GHL_LOCATION_ID = (import.meta.env.VITE_GHL_LOCATION_ID || "").trim();
const GHL_API_BASE = "https://services.leadconnectorhq.com";

function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

function isGhlConfigured() {
  if (!GHL_API_KEY) {
    console.error("GHL configuration error: VITE_GHL_API_KEY is not set");
    return false;
  }
  if (!GHL_LOCATION_ID) {
    console.error("GHL configuration error: VITE_GHL_LOCATION_ID is not set");
    return false;
  }
  return true;
}

async function makeGHLRequest(
  endpoint,
  method = "GET",
  body = null,
  config = {},
) {
  try {
    const suppressLogs = Boolean(config?.suppressLogs);
    const apiKey = (config?.apiKey || GHL_API_KEY || "").trim();
    const locationId = (config?.locationId || GHL_LOCATION_ID || "").trim();

    if (!apiKey || !locationId) {
      const missingVars = [];
      if (!apiKey) missingVars.push("apiKey / VITE_GHL_API_KEY");
      if (!locationId) missingVars.push("locationId / VITE_GHL_LOCATION_ID");

      const error = new Error(
        `GHL is not configured. Missing: ${missingVars.join(", ")}.`,
      );
      error.status = 0;
      error.code = "MISSING_CONFIG";

      if (!suppressLogs) {
        console.error("GHL request failed:", error);
      }
      throw error;
    }

    const options = {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
      const errorMessage = data?.message || data?.error || "Unknown error";

      if (!suppressLogs) {
        console.error("GHL API Error:", {
          status: response.status,
          statusText: response.statusText,
          traceId,
          data,
        });
      }

      const error = new Error(
        `GHL API error: ${response.status} - ${errorMessage} (Trace ID: ${traceId})`,
      );
      error.status = response.status;
      error.code = "GHL_API_ERROR";
      error.traceId = traceId;

      throw error;
    }

    return data;
  } catch (error) {
    const suppressLogs = Boolean(config?.suppressLogs);

    // Ensure error has expected properties
    if (!(error instanceof Error)) {
      const wrappedError = new Error(`Unexpected error: ${String(error)}`);
      wrappedError.status = null;
      wrappedError.code = "UNKNOWN_ERROR";
      if (!suppressLogs) {
        console.error("GHL request failed:", wrappedError);
      }
      throw wrappedError;
    }

    if (!suppressLogs) {
      console.error("GHL request failed:", {
        message: error.message,
        status: error.status,
        code: error.code,
      });
    }
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
          field_value: formData.businessName
            ? `${formData.service} for ${formData.businessName} (${formData.businessWebsite || "n/a"})`
            : String(formData.service || ""),
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

export async function upsertSeoAuditLead({
  firstName,
  lastName,
  email,
  website,
}) {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    throw new Error("A valid email is required.");
  }

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  const contactData = {
    firstName: firstName?.trim() || undefined,
    lastName: lastName?.trim() || undefined,
    name: fullName || undefined,
    email: cleanEmail,
    locationId: GHL_LOCATION_ID,
    tags: ["seo_audit_lead", "website_form"],
    customFields: [
      { key: "source", field_value: "free_ai_seo_audit" },
      {
        key: "message",
        field_value: website
          ? `Free AI SEO audit request for ${website}`
          : "Free AI SEO audit request",
      },
    ],
  };

  const data = await makeGHLRequest("/contacts/upsert", "POST", contactData, {
    suppressLogs: true,
  });
  return { success: true, contact: data.contact || data };
}

export async function submitAiSeoGuideLead({ firstName, email }) {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    throw new Error("A valid email is required.");
  }

  const first = firstName?.trim() || undefined;
  const contactData = {
    firstName: first,
    name: first,
    email: cleanEmail,
    locationId: GHL_LOCATION_ID,
    tags: ["ai_seo_guide", "ai_seo_guide_lead", "ciqmain_website"],
    customFields: [
      { key: "source", field_value: "ai_seo_growth_guide" },
      {
        key: "message",
        field_value: "AI SEO Growth Guide request — send PDF to inbox",
      },
    ],
  };

  const data = await makeGHLRequest("/contacts/upsert", "POST", contactData);
  return { success: true, contact: data.contact || data };
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

  const upsertResult = await makeGHLRequest(
    "/contacts/upsert",
    "POST",
    upsertPayload,
  );
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

  const data = await makeGHLRequest(
    `/contacts/${contactId}`,
    "PUT",
    updatePayload,
  );
  return { success: true, contact: data.contact || data };
}

export async function submitEventRsvp(formData) {
  const { name, nextDate, schedule, time, ghl } = ACTIVE_EVENT;
  const tags = [ghl.tags.RSVP, ghl.tags.EVENT, ghl.tags.SOURCE];
  const locationId = ghl.locationId || GHL_LOCATION_ID;
  const apiKey = ghl.apiKey || GHL_API_KEY;

  const contactData = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    locationId,
    tags,
    customFields: [
      { key: "event_name", field_value: name },
      {
        key: "event_date",
        field_value: nextDate || `${schedule} · ${time}`,
      },
      { key: "source", field_value: ghl.tags.SOURCE },
    ],
  };

  const data = await makeGHLRequest("/contacts/upsert", "POST", contactData, {
    apiKey,
    locationId,
  });
  return { success: true, contact: data.contact || data };
}

/** @deprecated Use submitEventRsvp */
export async function submitBusinessUnpluggedRsvp(formData) {
  return submitEventRsvp(formData);
}
