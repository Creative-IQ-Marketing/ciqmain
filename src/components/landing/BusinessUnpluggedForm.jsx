import { useState } from "react";
import { submitBusinessUnpluggedRsvp } from "../../services/ghl";
import BusinessUnpluggedPackages from "./BusinessUnpluggedPackages";
import BusinessUnpluggedSuccess from "./BusinessUnpluggedSuccess";

export default function BusinessUnpluggedForm({ embedded = false, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");

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
    };

    try {
      await submitBusinessUnpluggedRsvp(payload);
      setFirstName(payload.firstName);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or contact us directly.",
      );
    }
  }

  const content =
    status === "success" ? (
      <BusinessUnpluggedSuccess
        firstName={firstName}
        embedded={embedded}
        onClose={onClose}
        onReset={() => {
          setStatus("idle");
          setErrorMsg("");
        }}
      />
    ) : (
      <>
        {!embedded && (
          <div className="mb-6">
            <h2 className="text-xl font-medium tracking-tight text-[#202124] sm:text-2xl">
              RSVP
            </h2>
            <p className="mt-1 text-sm text-[#5f6368]">
              Reserve your spot at Business Unplugged
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="First name"
              id="bu-firstName"
              name="firstName"
              required
              autoComplete="given-name"
              embedded={embedded}
            />
            <Field
              label="Last name"
              id="bu-lastName"
              name="lastName"
              required
              autoComplete="family-name"
              embedded={embedded}
            />
          </div>
          <Field
            label="Email"
            id="bu-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            embedded={embedded}
          />
          <Field
            label="Phone"
            id="bu-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            embedded={embedded}
          />

          <div
            className={
              embedded
                ? "border-t border-slate-200 pt-4"
                : "border-t border-[#e8e0d4] pt-4"
            }
          >
            <BusinessUnpluggedPackages embedded={embedded} />
          </div>

          {status === "error" ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
              {errorMsg}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className={
              embedded
                ? "h-12 w-full rounded-xl bg-[#1a1410] text-sm font-semibold text-white transition hover:bg-[#2a211a] disabled:opacity-60"
                : "bu-btn-primary w-full disabled:opacity-60"
            }
          >
            {status === "loading" ? "Submitting…" : "Confirm RSVP"}
          </button>
        </form>
      </>
    );

  if (embedded) return content;

  return (
    <div className="bu-surface-card w-full max-w-sm rounded-2xl p-6 sm:max-w-lg sm:p-8">
      {content}
    </div>
  );
}

function Field({ label, id, name, type = "text", required, autoComplete, embedded }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={
          embedded
            ? "mb-1.5 block text-xs font-medium text-slate-600"
            : "bu-field-label"
        }
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={
          embedded
            ? "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#b8943f] focus:ring-2 focus:ring-[#b8943f]/15"
            : "bu-field-input w-full"
        }
        placeholder={label}
      />
    </div>
  );
}
