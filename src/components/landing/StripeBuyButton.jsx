import { useEffect, useRef } from "react";
import { STRIPE_PUBLISHABLE_KEY } from "../../data/stripeBuyButtons";
import { ensureStripeBuyButtonReady } from "../../utils/stripeBuyButton";

export default function StripeBuyButton({ buyButtonId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const container = containerRef.current;

    if (!STRIPE_PUBLISHABLE_KEY) {
      container.textContent =
        "Payment is not configured yet. Add VITE_STRIPE_PUBLISHABLE_KEY to .env.";
      return undefined;
    }

    ensureStripeBuyButtonReady()
      .then(() => {
        if (!mounted || !container) return;

        container.replaceChildren();
        const button = document.createElement("stripe-buy-button");
        button.setAttribute("buy-button-id", buyButtonId);
        button.setAttribute("publishable-key", STRIPE_PUBLISHABLE_KEY);
        container.appendChild(button);
      })
      .catch(() => {
        if (!mounted || !container) return;
        container.textContent =
          "Payment button unavailable. Please refresh and try again.";
      });

    return () => {
      mounted = false;
    };
  }, [buyButtonId]);

  return <div ref={containerRef} className="stripe-buy-button-wrap min-h-[40px]" />;
}
