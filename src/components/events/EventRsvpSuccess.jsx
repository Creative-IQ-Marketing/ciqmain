import { ACTIVE_EVENT } from "../../data/activeEvent";

export default function EventRsvpSuccess({
  firstName,
  onReset,
  embedded = false,
  onClose,
}) {
  const { name, schedule, time, addressShort, featuredName } = ACTIVE_EVENT;

  if (embedded) {
    return (
      <div className="py-2 text-center">
        <h3 className="text-xl font-medium text-slate-900 sm:text-2xl">
          You&apos;re on the list{firstName ? `, ${firstName}` : ""}!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Thanks for RSVPing to {name}
          {featuredName ? ` — live music by ${featuredName}` : ""}.
        </p>
        <button
          type="button"
          onClick={onClose || onReset}
          className="mt-5 h-11 w-full rounded-xl bg-[#1a1410] px-6 text-sm font-semibold text-white"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d4b37a]">
        Confirmed
      </p>
      <h3 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.05] tracking-tight text-[#ece7dc]">
        You&apos;re on the list{firstName ? `, ${firstName}` : ""}.
      </h3>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#c9c2b4]">
        Thanks for RSVPing to {name}. Confirmation is on the way.
      </p>
      <div className="mt-8 border-y border-white/10 py-5 text-sm leading-relaxed text-[#ece7dc]">
        {schedule}
        <br />
        {time}
        <br />
        {addressShort}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#d4b37a] underline-offset-4 hover:underline"
      >
        Submit another RSVP
      </button>
    </div>
  );
}
