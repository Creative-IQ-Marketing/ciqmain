import { useState } from "react";
import { ACTIVE_EVENT } from "../../data/activeEvent";
import { submitEventRsvp } from "../../services/ghl";
import EventRsvpSuccess from "./EventRsvpSuccess";

export default function EventRsvpForm({ embedded = false, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const { host, theme } = ACTIVE_EVENT;

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

  const content =
    status === "success" ? (
      <EventRsvpSuccess
        firstName={firstName}
        embedded={embedded}
        onClose={onClose}
        onReset={() => {
          setStatus("idle");
          setErrorMsg("");
        }}
      />
    ) : (
      <form onSubmit={handleSubmit} className="space-y-1">
        {!embedded ? (
          <div className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#ece7dc]">
              Confirm free RSVP
            </h3>
            <p className="mt-2 text-sm text-[#8b93a1]">Hosted by {host}</p>
          </div>
        ) : null}

        <div className="grid gap-1 sm:grid-cols-2 sm:gap-8">
          <Field
            label="First name"
            id="event-firstName"
            name="firstName"
            required
            autoComplete="given-name"
            embedded={embedded}
            accent={theme.accent}
          />
          <Field
            label="Last name"
            id="event-lastName"
            name="lastName"
            required
            autoComplete="family-name"
            embedded={embedded}
            accent={theme.accent}
          />
        </div>
        <Field
          label="Email"
          id="event-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          embedded={embedded}
          accent={theme.accent}
        />
        <Field
          label="Phone"
          id="event-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          embedded={embedded}
          accent={theme.accent}
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
            className={
              embedded
                ? "h-12 w-full rounded-xl bg-[#1a1410] text-sm font-semibold text-white transition hover:bg-[#2a211a] disabled:opacity-60"
                : "flex min-h-[56px] w-full items-center justify-center text-[13px] font-bold uppercase tracking-[0.16em] text-[#070d18] disabled:opacity-50"
            }
            style={!embedded ? { background: theme.accent } : undefined}
          >
            {status === "loading" ? "Submitting…" : "Confirm free RSVP"}
          </button>
          {!embedded ? (
            <p className="mt-4 text-center text-[11px] text-[#8b93a1]">
              No payment required.
            </p>
          ) : null}
        </div>
      </form>
    );

  if (embedded) return content;

  return <div className="mx-auto max-w-lg lg:ml-0 lg:max-w-xl">{content}</div>;
}

function Field({
  label,
  id,
  name,
  type = "text",
  required,
  autoComplete,
  embedded,
  accent,
}) {
  if (embedded) {
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
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2"
          placeholder={label}
        />
      </div>
    );
  }

  return (
    <div className="py-3">
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b93a1]"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full border-0 border-b border-white/15 bg-transparent py-3.5 text-base text-[#ece7dc] outline-none transition placeholder:text-white/25 focus:border-b-2 sm:text-[15px]"
        style={{ borderBottomColor: undefined }}
        onFocus={(e) => {
          e.currentTarget.style.borderBottomColor = accent;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderBottomColor = "";
        }}
        placeholder={label}
      />
    </div>
  );
}
