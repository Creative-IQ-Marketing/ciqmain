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
    // Keep hash (e.g. #services-contact / #contact) while updating interest.
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  window.dispatchEvent(
    new CustomEvent(FORM_INTEREST_EVENT, {
      detail: { interest: normalized, source },
    }),
  );
}

export function scrollToContactForm(interest, source, anchorId) {
  const targetId = anchorId ?? getContactAnchorId();

  if (interest) {
    publishFormInterest(interest, { source });
  }

  // Wait a tick so the form can apply interest, then scroll to it.
  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Re-dispatch so late-mounted listeners still pick up the selection.
      if (interest) {
        publishFormInterest(interest, { source, updateUrl: false });
      }
    }, 80);
  });
}

/** @deprecated Use scrollToContactForm */
export const scrollToServicesContact = scrollToContactForm;

export { INTEREST_ALIASES, SECTION_INTEREST_MAP };
