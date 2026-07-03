import { useState } from "react";
import { submitBusinessUnpluggedRsvp } from "../../services/ghl";
import BusinessUnpluggedSuccess from "./BusinessUnpluggedSuccess";

export default function BusinessUnpluggedForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [vendorOrSpeaker, setVendorOrSpeaker] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      vendorOrSpeaker,
    };

    try {
      await submitBusinessUnpluggedRsvp(payload);
      setFirstName(payload.firstName);
      setStatus("success");
      form.reset();
      setVendorOrSpeaker(false);
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or contact us directly.",
      );
    }
  }

  return (
    <div className="bu-surface-card w-full max-w-[22rem] rounded-2xl p-6 sm:max-w-md sm:p-8">
      {status === "success" ? (
        <BusinessUnpluggedSuccess
          firstName={firstName}
          onReset={() => {
            setStatus("idle");
            setErrorMsg("");
          }}
        />
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-medium tracking-tight text-[#202124] sm:text-2xl">
              RSVP
            </h2>
            <p className="mt-1 text-sm text-[#5f6368]">
              Reserve your spot at Business Unplugged
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" id="bu-firstName" name="firstName" required autoComplete="given-name" />
              <Field label="Last name" id="bu-lastName" name="lastName" required autoComplete="family-name" />
            </div>
            <Field label="Email" id="bu-email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone" id="bu-phone" name="phone" type="tel" required autoComplete="tel" />

            <label className="bu-checkbox-row flex cursor-pointer items-start gap-3 rounded-xl p-3 sm:p-3.5">
              <input
                type="checkbox"
                checked={vendorOrSpeaker}
                onChange={(e) => setVendorOrSpeaker(e.target.checked)}
                className="bu-checkbox-input mt-0.5"
              />
              <span className="text-left text-sm leading-snug text-[#5f6368]">
                Would you like to be a vendor or speaker at this event?{" "}
                <span className="font-medium text-[#b8943f]">Let us know here.</span>
              </span>
            </label>

            {status === "error" ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
                {errorMsg}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bu-btn-primary w-full disabled:opacity-60"
            >
              {status === "loading" ? "Submitting…" : "Confirm RSVP"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

function Field({ label, id, name, type = "text", required, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="bu-field-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="bu-field-input w-full"
        placeholder={label}
      />
    </div>
  );
}
