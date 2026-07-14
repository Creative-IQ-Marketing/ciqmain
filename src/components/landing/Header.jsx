import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import mainLogo from "../../assets/mainLogo.png";
import { PHONE_TEL } from "../../utils/contact";
import { trackButtonClick } from "../../services/analytics";
import { SERVICES_NAV } from "../../data/servicesNav";
import {
  scrollToHashFromHref,
  scrollToSection,
} from "../../utils/scrollToSection";
import SiteTopBanner from "../layout/SiteTopBanner";
import { SITE_TOP_BANNER } from "../../constants/siteBanner";

const ease = [0.22, 1, 0.36, 1];

const NAV = [
  { label: "Home", href: "/" },
  SERVICES_NAV,
  { label: "Book a call", href: "/book" },
  { label: "Contact", href: "/contact" },
  { label: "Free SEO Audit", href: "/free-ai-seo-audit" },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const lastScroll = useRef(0);
  const hideTimer = useRef(null);
  const servicesTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y <= 40) {
        setVisible(true);
        clearTimeout(hideTimer.current);
      } else if (y > lastScroll.current) {
        setVisible(false);
        clearTimeout(hideTimer.current);
      } else if (y < lastScroll.current) {
        setVisible(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
          if (window.scrollY > 40) setVisible(false);
        }, 3200);
      }
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const handleNav = (e, href) => {
    e.preventDefault();
    trackButtonClick(href, "nav_link", "Header");
    setOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);

    if (href.includes("#")) {
      scrollToHashFromHref(href, location.pathname, navigate);
      return;
    }
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => scrollToSection(id, 80), 350);
      return;
    }
    scrollToSection(id, 80);
  };

  const openServicesMenu = () => {
    clearTimeout(servicesTimer.current);
    setServicesOpen(true);
  };
  const closeServicesMenu = () => {
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const headerNavTopClass = SITE_TOP_BANNER.enabled
    ? "top-[var(--header-nav-top)] lg:top-[var(--header-nav-top-with-banner)]"
    : "top-[var(--header-nav-top)]";

  return (
    <>
      <SiteTopBanner onNavigate={handleNav} />

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: visible ? 0 : -110 }}
        transition={{ duration: 0.4, ease }}
        className={`fixed inset-x-0 z-50 ${headerNavTopClass}`}
      >
        <div className="mx-auto max-w-[1400px] px-3 pt-2 sm:px-4 lg:px-6">
          <div
            className={`flex h-14 items-center gap-3 rounded-[var(--radius-pill)] border px-3 transition-all duration-300 sm:h-[3.6rem] sm:px-4 ${
              scrolled
                ? "border-black/[0.08] bg-white/85 shadow-[0_12px_40px_-18px_rgba(15,15,15,0.28)] backdrop-blur-xl"
                : "border-transparent bg-white/55 backdrop-blur-md"
            }`}
          >
            <a
              href="/"
              onClick={(e) => handleNav(e, "/")}
              className="flex shrink-0 items-center gap-2.5 pl-1"
            >
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[var(--c-ink)] sm:h-10 sm:w-10">
                <img
                  src={mainLogo}
                  alt="CreativeIQ"
                  className="h-6 w-6 object-contain brightness-0 invert sm:h-7 sm:w-7"
                />
              </span>
              <span className="hidden font-sans text-[1.05rem] font-bold tracking-[-0.03em] text-[var(--c-ink)] sm:inline">
                Creative<span className="text-[var(--c-accent)]">IQ</span>
              </span>
            </a>

            <nav className="ml-2 hidden flex-1 items-center justify-center gap-0.5 md:flex">
              {NAV.map((item, i) => {
                if (!item.children) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className="rounded-full px-3.5 py-2 font-sans text-[13px] font-medium text-[var(--c-ink-soft)] transition hover:bg-black/[0.04] hover:text-[var(--c-ink)] lg:px-4 lg:text-[14px]"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={closeServicesMenu}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[13px] font-medium text-[var(--c-ink-soft)] transition hover:bg-black/[0.04] hover:text-[var(--c-ink)] lg:px-4 lg:text-[14px]"
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </a>
                    <AnimatePresence>
                      {servicesOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease }}
                          className="absolute left-1/2 top-full z-50 w-[18rem] -translate-x-1/2 pt-3"
                          onMouseEnter={openServicesMenu}
                          onMouseLeave={closeServicesMenu}
                        >
                          <div className="overflow-hidden rounded-[var(--radius-card)] border border-black/[0.07] bg-white/95 p-2 shadow-[0_20px_50px_-20px_rgba(15,15,15,0.35)] backdrop-blur-xl">
                            <a
                              href={item.href}
                              onClick={(e) => handleNav(e, item.href)}
                              className="block rounded-[12px] px-3 py-2.5 text-[13px] font-semibold text-[var(--c-accent)] transition hover:bg-[var(--c-accent-dim)]"
                            >
                              All services
                            </a>
                            <div className="my-1.5 border-t border-black/[0.06]" />
                            {item.children.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={(e) => handleNav(e, child.href)}
                                className="block rounded-[12px] px-3 py-2.5 text-[13px] text-[var(--c-text-secondary)] transition hover:bg-black/[0.035] hover:text-[var(--c-ink)]"
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
            </nav>

            <div className="ml-auto hidden items-center gap-2 md:flex">
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={() =>
                  trackButtonClick("Call CTA", "header_call", "Header")
                }
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-sans text-[13px] font-medium text-[var(--c-text-muted)] transition hover:bg-black/[0.04] hover:text-[var(--c-ink)]"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden />
                Call us
              </a>
              <a
                href="/free-ai-seo-audit"
                onClick={(e) => {
                  trackButtonClick("Free Audit", "header_cta", "Header");
                  handleNav(e, "/free-ai-seo-audit");
                }}
                className="rounded-full bg-[var(--c-cta)] px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition hover:bg-[var(--c-cta-hover)]"
              >
                Audit My Site
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-[var(--c-ink)] transition hover:bg-black/[0.05] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease }}
              className="mx-3 mt-2 overflow-hidden rounded-[var(--radius-card)] border border-black/[0.07] bg-white/95 shadow-[0_20px_50px_-20px_rgba(15,15,15,0.3)] backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col px-3 py-3">
                {NAV.map((item) => {
                  if (!item.children) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleNav(e, item.href)}
                        className="rounded-[12px] px-3 py-3 font-sans text-[15px] font-medium text-[var(--c-ink)] transition hover:bg-black/[0.04]"
                      >
                        {item.label}
                      </a>
                    );
                  }
                  return (
                    <div key={item.label} className="border-t border-black/[0.05]">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex w-full items-center justify-between rounded-[12px] px-3 py-3 font-sans text-[15px] font-medium text-[var(--c-ink)]"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pb-2 pl-2"
                          >
                            <a
                              href={item.href}
                              onClick={(e) => handleNav(e, item.href)}
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[var(--c-accent)]"
                            >
                              All services
                            </a>
                            {item.children.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={(e) => handleNav(e, child.href)}
                                className="block rounded-lg px-3 py-2 text-sm text-[var(--c-text-secondary)]"
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <a
                  href="/free-ai-seo-audit"
                  onClick={(e) => handleNav(e, "/free-ai-seo-audit")}
                  className="mt-2 rounded-full bg-[var(--c-cta)] py-3.5 text-center font-sans text-sm font-semibold text-white"
                >
                  Audit My Site
                </a>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
