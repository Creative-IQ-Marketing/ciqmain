import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import mainLogo from "../../assets/mainLogo.png";
import { PHONE_TEL } from "../../utils/contact";
import { trackButtonClick } from "../../services/analytics";
import { SERVICES_NAV } from "../../data/servicesNav";
import { scrollToHashFromHref, scrollToSection } from "../../utils/scrollToSection";

const ease = [0.22, 1, 0.36, 1];

const NAV = [
  { label: "Home", href: "/" },
  SERVICES_NAV,
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
          transition={{ delay: isMobile ? i * 0.04 : 0.08 + i * 0.04, duration: 0.4, ease }}
          whileHover={isMobile ? undefined : { color: "#3B6FF0" }}
          className={
            isMobile
              ? "py-3.5 text-[0.95rem] font-medium text-slate-600 hover:text-[#3B6FF0] border-b border-slate-50 transition-colors"
              : "px-5 py-3 font-medium text-slate-500"
          }
          style={isMobile ? undefined : { fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
        >
          {item.label}
        </motion.a>
      );
    }

    if (isMobile) {
      return (
        <div key={item.label} className="border-b border-slate-50">
          <button
            type="button"
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="flex w-full items-center justify-between py-3.5 text-[0.95rem] font-medium text-slate-600"
          >
            {item.label}
            <ChevronDown
              size={16}
              className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {mobileServicesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-2 pl-3"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="block py-2 text-sm font-semibold text-[#3B6FF0]"
                >
                  All services
                </a>
                {item.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={(e) => handleNav(e, child.href)}
                    className="block py-2 text-sm text-slate-500 hover:text-slate-900"
                  >
                    {child.label}
                  </a>
                ))}
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
          className="inline-flex items-center gap-1 px-5 py-3 font-medium text-slate-500 hover:text-[#3B6FF0]"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18, ease }}
              className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2"
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
            >
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="block px-4 py-2.5 text-sm font-semibold text-[#3B6FF0] hover:bg-slate-50"
                >
                  All services
                </a>
                <div className="mx-3 border-t border-slate-100" />
                {item.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={(e) => handleNav(e, child.href)}
                    className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] hidden lg:block">
        <div className="mx-auto flex h-11 w-full items-center justify-center gap-4 bg-[#1a1410] px-8">
          <p className="text-sm font-semibold tracking-wide text-[#F3D56D]">
            You&apos;re invited — Business Unplugged · Aug 6 · Hotel Valencia Riverwalk
          </p>
          <a
            href="/business-unplugged"
            onClick={(e) => {
              trackButtonClick("Business Unplugged Banner", "top_banner_cta", "Header");
              handleNav(e, "/business-unplugged");
            }}
            className="rounded-full border-2 border-[#F3D56D] bg-[#F3D56D] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-[#1a1410] shadow-[0_3px_0_#b8943f] transition hover:bg-[#edd55c]"
          >
            RSVP Now
          </a>
        </div>
      </div>

      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:top-14">
        <motion.div
          initial={{ y: -240 }}
          animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 1 }}
          transition={{ duration: 0.45, ease }}
          className="w-full max-w-6xl"
        >
          <div
            className="flex items-center h-[82px] md:h-[82px] px-5 md:px-6 rounded-full bg-white/95 backdrop-blur-2xl border border-black/[0.07] shadow-[0_8px_56px_rgba(0,0,0,0.14)]"
            style={{ height: "clamp(60px, 12vw, 82px)" }}
          >
            <a
              href="/"
              onClick={(e) => handleNav(e, "/")}
              className="flex items-center gap-2.5 shrink-0 pr-5"
            >
              <img
                src={mainLogo}
                alt="CreativeIQ"
                className="w-11 h-11 object-contain"
                style={{
                  width: "clamp(40px, 8vw, 44px)",
                  height: "clamp(40px, 8vw, 44px)",
                }}
              />
              <span
                className="font-bold text-slate-900"
                style={{
                  letterSpacing: "-0.04em",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                }}
              >
                Creative<span className="text-[#3B6FF0]">IQ</span>
              </span>
            </a>

            <div className="hidden md:block h-5 w-px bg-slate-200 shrink-0" />

            <nav className="hidden md:flex items-center flex-1 justify-center gap-0">
              {NAV.map((item, i) => renderNavItem(item, i))}
            </nav>

            <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-auto pl-4">
              <motion.a
                href={`tel:${PHONE_TEL}`}
                onClick={() => {
                  trackButtonClick("Call CTA", "header_call", "Header");
                }}
                transition={{ delay: 0.36 }}
                className="px-7 py-3.5 text-[0.9rem] font-semibold rounded-full bg-[#3B6FF0] text-white hover:bg-[#3B6FF0] transition-colors duration-250 shadow-sm"
                style={{ border: "none", cursor: "pointer" }}
                aria-label="Call CreativeIQ"
              >
                <span>
                  <Phone
                    size={16}
                    className="inline-block -mt-0.5 mr-2.5"
                    aria-hidden="true"
                  />
                </span>
                Call us
              </motion.a>
              <motion.a
                href="/free-ai-seo-audit"
                onClick={(e) => {
                  trackButtonClick("Free Audit", "header_cta", "Header");
                  handleNav(e, "/free-ai-seo-audit");
                }}
                initial={{ opacity: 1, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.44,
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 text-[0.9rem] font-semibold rounded-full bg-slate-900 text-white hover:bg-[#3B6FF0] transition-colors duration-250 shadow-sm"
              >
                Audit My Site
              </motion.a>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden ml-auto p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 1, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 1, y: -10, scale: 0.97 }}
                transition={{ duration: 0.22, ease }}
                className="mt-2 rounded-3xl bg-white/97 backdrop-blur-2xl border border-black/[0.06] shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden"
              >
                <nav className="flex flex-col px-5 py-5 gap-0">
                  {NAV.map((item, i) => renderNavItem(item, i, true))}
                  <a
                    href="/free-ai-seo-audit"
                    onClick={(e) => handleNav(e, "/free-ai-seo-audit")}
                    className="mt-4 py-3.5 w-full text-center text-[0.87rem] font-semibold rounded-full bg-slate-900 text-white"
                  >
                    Audit My Site
                  </a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
