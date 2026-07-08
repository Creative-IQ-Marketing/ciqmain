export default function BusinessUnpluggedSuccess({
  firstName,
  onReset,
  embedded = false,
  onClose,
}) {
  return (
    <div className="py-2 text-center">
      <div
        className={
          embedded
            ? "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 ring-1 ring-green-100"
            : "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 shadow-[0_1px_2px_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]"
        }
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#137333"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h3 className="text-xl font-medium text-slate-900 sm:text-2xl">
        You&apos;re on the list{firstName ? `, ${firstName}` : ""}!
      </h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
        Thank you for RSVPing. We&apos;ll send a confirmation shortly — see you
        at Business Unplugged.
      </p>

      <div className="mt-5 flex flex-col items-center gap-2">
        {embedded && onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-full rounded-xl bg-[#1a1410] px-6 text-sm font-semibold text-white transition hover:bg-[#2a211a]"
          >
            Done
          </button>
        ) : null}
        <button
          type="button"
          onClick={onReset}
          className={embedded ? "text-sm font-medium text-[#b8943f] hover:underline" : "bu-btn-text"}
        >
          Submit another RSVP
        </button>
      </div>
    </div>
  );
}
