import { useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { isValidFormInterest } from "../data/serviceFormOptions";
import { FORM_INTEREST_EVENT, resolveFormInterest } from "../utils/formInterest";

export function useFormInterest(onApply) {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();

  const apply = useCallback(
    (interest, source = "url") => {
      if (interest && isValidFormInterest(interest)) {
        onApply(interest, source);
      }
    },
    [onApply],
  );

  useEffect(() => {
    const interest = resolveFormInterest(searchParams, hash);
    if (interest) apply(interest, "url");

    const handler = (event) => {
      apply(event.detail?.interest, event.detail?.source || "action");
    };

    window.addEventListener(FORM_INTEREST_EVENT, handler);
    return () => window.removeEventListener(FORM_INTEREST_EVENT, handler);
  }, [searchParams, hash, apply]);
}
