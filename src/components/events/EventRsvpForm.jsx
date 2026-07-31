import { useState } from "react";
import { MapPin, Car, Calendar, Clock } from "lucide-react";
import { ACTIVE_EVENT } from "../../data/activeEvent";
import { submitEventRsvp } from "../../services/ghl";
import EventRsvpSuccess from "./EventRsvpSuccess";

export default function EventRsvpForm({ embedded = false, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const {
    name,
    host,
    featuredLabel,
    featuredName,
    schedule,
    time,
    addressShort,
    perks,
    theme,
  } = ACTIVE_EVENT;

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
      <>
        {!embedded && (
          <div className="mb-5">
            <p
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: theme.accent }}
            >
              Free RSVP
            </p>
            <h2 className="mt-1.5 text-xl font-medium tracking-tight text-[#202124] sm:text-2xl">
              {name}
            </h2>
            {host ? (
              <p className="mt-1 text-sm text-[#5f6368]">
                Hosted by{" "}
                <span className="font-semibold text-[#202124]">{host}</span>
              </p>
            ) : null}
            {featuredName ? (
              <p className="mt-0.5 text-sm text-[#5f6368]">
                {featuredLabel || "Featuring"}{" "}
                <span className="font-semibold text-[#202124]">
                  {featuredName}
                </span>
              </p>
            ) : null}

            <ul className="mt-4 space-y-2 font-sans text-sm text-[#5f6368]">
              <li className="flex items-center gap-2">
                <Calendar
                  className="size-3.5 shrink-0"
                  style={{ color: theme.accent }}
                  strokeWidth={1.75}
                  aria-hidden
                />
                {schedule}
              </li>
              <li className="flex items-center gap-2">
                <Clock
                  className="size-3.5 shrink-0"
                  style={{ color: theme.accent }}
                  strokeWidth={1.75}
                  aria-hidden
                />
                {time}
              </li>
              <li className="flex items-center gap-2">
                <MapPin
                  className="size-3.5 shrink-0"
                  style={{ color: theme.accent }}
                  strokeWidth={1.75}
                  aria-hidden
                />
                {addressShort}
              </li>
              <li className="flex items-center gap-2">
                <Car
                  className="size-3.5 shrink-0"
                  style={{ color: theme.accent }}
                  strokeWidth={1.75}
                  aria-hidden
                />
                {perks.join(" · ")}
              </li>
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
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
            style={
              !embedded
                ? {
                    background: theme.ink,
                    boxShadow: `0 8px 24px ${theme.accentSoft}`,
                  }
                : undefined
            }
          >
            {status === "loading" ? "Submitting…" : "Confirm free RSVP"}
          </button>
          <p className="text-center font-sans text-[11px] text-[#5f6368]">
            No payment required. We&apos;ll email your confirmation.
          </p>
        </form>
      </>
    );

  if (embedded) return content;

  return (
    <div className="bu-surface-card w-full max-w-sm rounded-2xl p-6 sm:max-w-md sm:p-8">
      {content}
    </div>
  );
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
            ? "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2"
            : "bu-field-input w-full"
        }
        style={
          embedded
            ? undefined
            : {
                ["--tw-ring-color"]: accent,
              }
        }
        placeholder={label}
      />
    </div>
  );
}
