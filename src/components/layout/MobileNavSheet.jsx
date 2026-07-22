import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1];

/**
 * Mobile bottom sheet with accordion children.
 */
export default function MobileNavSheet({
  open,
  nav,
  onClose,
  onNavigate,
  ctaHref = "/book",
  ctaLabel = "Book a call",
}) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <AnimatePresence
      onExitComplete={() => setExpandedId(null)}
    >
      {open ? (
        <motion.div
          key="mobile-nav-sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] md:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[var(--c-ink)]/40"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.32, ease }}
            className="absolute inset-x-0 bottom-0 top-[18%] flex flex-col overflow-hidden rounded-t-[1.5rem] bg-white"
          >
            <div className="flex items-center justify-between border-b border-[var(--c-border)] px-5 py-4">
              <p className="font-sans text-sm font-semibold tracking-[-0.01em] text-[var(--c-ink)]">
                Menu
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full text-[var(--c-ink)]"
                aria-label="Close"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-1">
              {nav.map((item) => {
                if (!item.children) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => onNavigate(e, item.href)}
                      className="block border-b border-[var(--c-border)] px-4 py-5 font-sans text-[1.25rem] font-semibold tracking-[-0.03em] text-[var(--c-ink)]"
                    >
                      {item.label}
                    </a>
                  );
                }

                const expanded = expandedId === item.id;
                return (
                  <div
                    key={item.label}
                    className="border-b border-[var(--c-border)]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId((id) =>
                          id === item.id ? null : item.id,
                        )
                      }
                      className="flex w-full items-center justify-between px-4 py-5 text-left"
                      aria-expanded={expanded}
                    >
                      <span
                        className={`font-sans text-[1.25rem] font-semibold tracking-[-0.03em] ${
                          item.accent
                            ? "text-[var(--c-accent)]"
                            : "text-[var(--c-ink)]"
                        }`}
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`size-4 text-[var(--c-text-muted)] transition-transform duration-200 ${
                          expanded ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-2">
                            {item.overviewLabel ? (
                              <a
                                href={item.href}
                                onClick={(e) => onNavigate(e, item.href)}
                                className="block px-4 py-3 font-sans text-[15px] font-semibold text-[var(--c-accent)]"
                              >
                                {item.overviewLabel}
                              </a>
                            ) : null}
                            {item.children.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={(e) => onNavigate(e, child.href)}
                                {...(child.external
                                  ? { target: "_blank", rel: "noopener noreferrer" }
                                  : {})}
                                className="block px-4 py-3 font-sans text-[15px] font-medium text-[var(--c-ink)]"
                              >
                                {child.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}

              <a
                href={ctaHref}
                onClick={(e) => onNavigate(e, ctaHref)}
                className="mx-4 mt-8 mb-2 block rounded-[var(--radius-pill)] bg-[var(--c-cta)] py-4 text-center font-sans text-[15px] font-semibold text-white"
              >
                {ctaLabel}
              </a>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
