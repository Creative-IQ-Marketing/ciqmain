import {
  INTEREST_ALIASES,
  SECTION_INTEREST_MAP,
  isValidFormInterest,
  normalizeFormInterest,
} from "../data/serviceFormOptions";

export const FORM_INTEREST_EVENT = "ciq:set-form-interest";

export function getContactAnchorId(pathname) {
  const path =
    pathname ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  return path.startsWith("/services") ? "services-contact" : "contact";
}

export function resolveFormInterest(searchParams, hash) {
  const raw =
    searchParams.get("interest") ||
    searchParams.get("service") ||
    "";
  const fromQuery = normalizeFormInterest(raw);
  if (fromQuery) return fromQuery;

  const sectionId = hash?.replace(/^#/, "");
  if (sectionId && SECTION_INTEREST_MAP[sectionId]) {
    return SECTION_INTEREST_MAP[sectionId];
  }

  return "";
}

export function publishFormInterest(interest, { source, updateUrl = true } = {}) {
  const normalized = normalizeFormInterest(interest);
  if (!normalized || !isValidFormInterest(normalized)) return;

  if (updateUrl && typeof window !== "undefined") {
    const url = new URL(window.location.href);
    url.searchParams.set("interest", normalized);
    window.history.replaceState({}, "", url);
  }

  window.dispatchEvent(
    new CustomEvent(FORM_INTEREST_EVENT, {
      detail: { interest: normalized, source },
    }),
  );
}

export function scrollToContactForm(interest, source, anchorId) {
  if (interest) {
    publishFormInterest(interest, { source });
  }

  const targetId = anchorId ?? getContactAnchorId();

  window.setTimeout(() => {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, interest ? 50 : 0);
}

/** @deprecated Use scrollToContactForm */
export const scrollToServicesContact = scrollToContactForm;

export { INTEREST_ALIASES, SECTION_INTEREST_MAP };
