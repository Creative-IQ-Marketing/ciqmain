/**
 * Mobile-first plan switcher.
 * Shows one focused plan at a time instead of stacking every tier.
 */
export default function PlanRail({
  options,
  value,
  onChange,
  ariaLabel = "Choose a plan",
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className={`relative shrink-0 rounded-[var(--radius-pill)] px-4 py-2.5 text-left transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 ${
              selected
                ? "bg-[var(--c-ink)] text-white shadow-[var(--shadow-soft)]"
                : "border border-transparent bg-[var(--c-surface-2)] text-[var(--c-ink)] hover:bg-white hover:shadow-[inset_0_0_0_1px_var(--c-border-strong)]"
            }`}
          >
            {selected ? (
              <span
                className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-[var(--c-accent)]"
                aria-hidden
              />
            ) : null}
            <span className="block font-sans text-sm font-semibold leading-none tracking-[-0.01em]">
              {option.label}
            </span>
            {option.meta ? (
              <span
                className={`mt-1.5 block font-sans text-[11px] font-medium tabular-nums leading-none ${
                  selected ? "text-white/65" : "text-[var(--c-text-muted)]"
                }`}
              >
                {option.meta}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
