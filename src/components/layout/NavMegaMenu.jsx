import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

/**
 * Minimal premium desktop dropdown. Labels only.
 */
export default function NavMegaMenu({
  open,
  item,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}) {
  if (!item?.children?.length) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.16, ease }}
          className="absolute left-0 top-full z-50 hidden w-[18rem] pt-3 md:block lg:w-[20rem]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="border border-[var(--c-border)] bg-white py-2 shadow-[0_20px_50px_-30px_rgba(15,15,15,0.35)]">
            <a
              href={item.href}
              onClick={(e) => onNavigate(e, item.href)}
              className="mx-2 mb-1 block border-b border-[var(--c-border)] px-3 pb-3 pt-2 font-sans text-[13px] font-semibold tracking-[-0.01em] text-[var(--c-ink)] transition hover:text-[var(--c-accent)]"
            >
              {item.overviewLabel || item.label}
            </a>
            <div className="px-1 py-1">
              {item.children.map((child) => (
                <a
                  key={child.href}
                  href={child.href}
                  onClick={(e) => onNavigate(e, child.href)}
                  className="block px-4 py-2.5 font-sans text-[14px] font-medium tracking-[-0.015em] text-[var(--c-ink)] transition hover:bg-[var(--c-surface-2)]"
                >
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
