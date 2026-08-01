import { useState } from "react";
import { ACTIVE_EVENT } from "../../data/activeEvent";
import { submitEventRsvp } from "../../services/ghl";
import EventRsvpSuccess from "./EventRsvpSuccess";

export default function EventRsvpForm({ embedded = false, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const { host } = ACTIVE_EVENT;

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
      await submitEventRsvp(payload);
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

  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg lg:ml-0 lg:max-w-xl">
        <EventRsvpSuccess
          firstName={firstName}
          embedded={embedded}
          onClose={onClose}
          onReset={() => {
            setStatus("idle");
            setErrorMsg("");
          }}
        />
      </div>
    );
  }

  if (embedded) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <EmbeddedField
            label="First name"
            id="event-firstName"
            name="firstName"
            required
            autoComplete="given-name"
          />
          <EmbeddedField
            label="Last name"
            id="event-lastName"
            name="lastName"
            required
            autoComplete="family-name"
          />
        </div>
        <EmbeddedField
          label="Email"
          id="event-email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <EmbeddedField
          label="Phone"
          id="event-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />
        {status === "error" ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
            {errorMsg}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 w-full rounded-xl bg-[#1a1410] text-sm font-semibold text-white disabled:opacity-60"
        >
          {status === "loading" ? "Submitting…" : "Confirm free RSVP"}
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-lg lg:ml-0 lg:max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="mb-8">
          <h3 className="lc-display text-2xl font-bold tracking-tight text-[#ece7dc]">
            Confirm free RSVP
          </h3>
          <p className="mt-2 text-sm text-[#8b93a1]">Hosted by {host}</p>
        </div>

        <div className="grid gap-1 sm:grid-cols-2 sm:gap-8">
          <Field
            label="First name"
            id="event-firstName"
            name="firstName"
            required
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            id="event-lastName"
            name="lastName"
            required
            autoComplete="family-name"
          />
        </div>
        <Field
          label="Email"
          id="event-email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <Field
          label="Phone"
          id="event-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />

        {status === "error" ? (
          <p className="mt-4 border border-red-400/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-200">
            {errorMsg}
          </p>
        ) : null}

        <div className="pt-8">
          <button
            type="submit"
            disabled={status === "loading"}
            className="lc-btn-submit"
          >
            {status === "loading" ? "Submitting…" : "Confirm free RSVP"}
          </button>
          <p className="mt-4 text-center text-[11px] text-[#8b93a1]">
            No payment required.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ label, id, name, type = "text", required, autoComplete }) {
  return (
    <div className="py-3">
      <label htmlFor={id} className="lc-field-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="lc-field-input"
        placeholder={label}
      />
    </div>
  );
}

function EmbeddedField({
  label,
  id,
  name,
  type = "text",
  required,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-slate-600"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none"
        placeholder={label}
      />
    </div>
  );
}
