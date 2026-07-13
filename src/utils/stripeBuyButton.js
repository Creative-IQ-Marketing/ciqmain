const STRIPE_SCRIPT = "https://js.stripe.com/v3/buy-button.js";

let stripeReady = null;

function waitForCustomElement() {
  if (customElements.get("stripe-buy-button")) {
    return Promise.resolve();
  }

  return customElements.whenDefined("stripe-buy-button");
}

export function ensureStripeBuyButtonReady() {
  if (!stripeReady) {
    stripeReady = new Promise((resolve, reject) => {
      const finish = () => {
        waitForCustomElement().then(resolve).catch(reject);
      };

      const existing = document.querySelector(`script[src="${STRIPE_SCRIPT}"]`);
      if (existing) {
        finish();
        return;
      }

      const script = document.createElement("script");
      script.src = STRIPE_SCRIPT;
      script.async = true;
      script.onload = finish;
      script.onerror = () => reject(new Error("Failed to load Stripe"));
      document.head.appendChild(script);
    });
  }

  return stripeReady;
}
