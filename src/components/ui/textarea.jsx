import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { fieldBase } from "./input";

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn("flex min-h-[7.5rem] px-3.5 py-3", fieldBase, className)}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
