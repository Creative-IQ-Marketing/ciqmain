import { handlePaymentFormRequest } from "./lib/paymentFormHandler.mjs";

export async function handler(event) {
  return handlePaymentFormRequest(event);
}
