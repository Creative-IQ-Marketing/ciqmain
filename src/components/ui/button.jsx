import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[15px] font-semibold transition-[background-color,border-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "rounded-[var(--radius-pill)] bg-[var(--c-accent)] text-white hover:bg-[#2f5fd9]",
        secondary:
          "rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] bg-white text-[var(--c-ink)] hover:border-[var(--c-ink)]/40",
        accent:
          "rounded-[var(--radius-pill)] bg-[var(--c-accent)] text-white hover:bg-[#2f5fd9]",
        ghost:
          "rounded-[var(--radius-pill)] text-[var(--c-ink)] hover:bg-black/[0.04]",
        link: "rounded-none font-medium text-[var(--c-accent)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-11 px-7",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const Button = forwardRef(
  (
    { className, variant, size, asChild = false, type = "button", ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
