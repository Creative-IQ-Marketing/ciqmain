import { forwardRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Clean professional field — white surface, hairline border, quiet focus.
 */
const fieldBase =
  "w-full rounded-[var(--radius-control)] border border-[var(--c-border-strong)] bg-white font-sans text-[15px] leading-normal text-[var(--c-ink)] shadow-none transition-[border-color,box-shadow] placeholder:text-[var(--c-text-muted)] hover:border-[var(--c-ink)]/20 focus-visible:border-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--c-accent)]/15 disabled:cursor-not-allowed disabled:bg-[var(--c-surface-2)] disabled:opacity-60";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("flex h-11 px-3.5", fieldBase, className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input, fieldBase };
