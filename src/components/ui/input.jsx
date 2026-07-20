import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-control)] border border-[var(--c-border-strong)] bg-white px-3.5 py-2 font-sans text-[15px] text-[var(--c-ink)] shadow-none transition-[border-color,box-shadow] placeholder:text-[var(--c-text-muted)] focus-visible:border-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]/25 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
