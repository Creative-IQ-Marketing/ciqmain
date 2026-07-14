import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
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
        }, 3000);
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

  const renderNavItem = (item, i, isMobile = false) => {
    if (!item.children) {
      return (
        <motion.a
          key={item.label}
          href={item.href}
          onClick={(e) => handleNav(e, item.href)}
          initial={isMobile ? { opacity: 1, x: -8 } : { opacity: 1, y: -5 }}
          animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
          transition={{
            delay: isMobile ? i * 0.04 : 0.08 + i * 0.04,
            duration: 0.4,
            ease,
          }}
          whileHover={isMobile ? undefined : { color: "#111" }}
          className={
            isMobile
              ? "block w-full border-b border-slate-200/50 py-3.5 text-[15px] font-medium text-[#444] transition hover:text-[#111]"
              : "px-4 py-2 font-sans text-[15px] font-medium text-[#252525] transition-colors duration-200 hover:text-[#111]"
          }
        >
          {item.label}
        </motion.a>
      );
    }

    if (isMobile) {
      return (
        <div key={item.label} className="border-b border-slate-200/50">
          <button
            type="button"
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="f-body flex w-full items-center justify-between py-3.5 text-[0.9rem] font-medium text-slate-700"
          >
            {item.label}
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {mobileServicesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-3 pl-1"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="f-body block rounded-lg px-3 py-2 text-sm font-semibold text-[#3B6FF0]"
                >
                  All services
                </a>
                <div className="mt-1 grid grid-cols-1 gap-0.5">
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={(e) => handleNav(e, child.href)}
                      className="f-body block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-white/70 hover:text-slate-900"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={openServicesMenu}
        onMouseLeave={closeServicesMenu}
      >
        <motion.a
          href={item.href}
          onClick={(e) => handleNav(e, item.href)}
          initial={{ opacity: 1, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease }}
          className="inline-flex items-center gap-1 px-4 py-2 font-sans text-[15px] font-medium text-[#252525] transition-colors duration-200 hover:text-[#111]"
        >
          {item.label}
          <ChevronDown
            size={14}
            className={`mt-0.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
          />
        </motion.a>

        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.16, ease }}
              className="absolute left-1/2 top-full z-50 w-[17.5rem] -translate-x-1/2 pt-2"
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
            >
              <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-2 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="f-body block rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#3B6FF0] transition hover:bg-white/80"
                >
                  All services
                </a>
                <div className="my-1.5 border-t border-slate-200/50" />
                <div className="grid grid-cols-1 gap-0.5">
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={(e) => handleNav(e, child.href)}
                      className="f-body block rounded-xl px-3 py-2.5 text-[13px] font-normal text-slate-600 transition hover:bg-white/80 hover:text-slate-900"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const headerNavTopClass = SITE_TOP_BANNER.enabled
    ? "top-[var(--header-nav-top)] lg:top-[var(--header-nav-top-with-banner)]"
    : "top-[var(--header-nav-top)]";

  return (
    <>
      <SiteTopBanner onNavigate={handleNav} />

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease }}
        className={`fixed inset-x-0 z-50 bg-white ${headerNavTopClass}`}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center px-5 sm:px-6 lg:px-10">
          <a
            href="/"
            onClick={(e) => handleNav(e, "/")}
            className="flex shrink-0 items-center gap-2.5"
          >
            <img
              src={mainLogo}
              alt="CreativeIQ"
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            />
            <span className="font-sans text-[clamp(1.15rem,2vw,1.4rem)] font-bold tracking-[-0.03em] text-[#0f0f0f]">
              Creative<span className="text-[#3B6FF0]">IQ</span>
            </span>
          </a>

          <nav className="hidden flex-1 items-center justify-center md:flex">
            {NAV.map((item, i) => renderNavItem(item, i))}
          </nav>

          <div className="hidden items-center gap-5 md:ml-auto md:flex">
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() =>
                trackButtonClick("Call CTA", "header_call", "Header")
              }
              className="inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-[#737373] transition-colors duration-200 hover:text-[#252525]"
            >
              <Phone size={15} strokeWidth={1.75} aria-hidden />
              Call us
            </a>
            <a
              href="/free-ai-seo-audit"
              onClick={(e) => {
                trackButtonClick("Free Audit", "header_cta", "Header");
                handleNav(e, "/free-ai-seo-audit");
              }}
              className="rounded-full bg-[#18181b] px-6 py-2.5 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a]"
            >
              Audit My Site
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="ml-auto rounded-lg p-2.5 text-slate-700 transition hover:bg-slate-900/5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease }}
              className="overflow-hidden border-t border-black/[0.06] bg-white md:hidden"
            >
              <nav className="mx-auto flex max-w-[1320px] flex-col px-5 py-4">
                {NAV.map((item, i) => renderNavItem(item, i, true))}
                <a
                  href="/free-ai-seo-audit"
                  onClick={(e) => handleNav(e, "/free-ai-seo-audit")}
                  className="f-body mt-4 rounded-full bg-[#3B6FF0] py-3.5 text-center text-sm font-semibold text-white"
                >
                  Audit My Site
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
