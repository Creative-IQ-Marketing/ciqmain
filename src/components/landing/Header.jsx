import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import mainLogo from "../../assets/mainLogo.webp";
import { PHONE_TEL } from "../../utils/contact";
import { trackButtonClick } from "../../services/analytics";
import { SERVICES_NAV } from "../../data/servicesNav";
import { ABOUT_NAV } from "../../data/aboutNav";
import { TOOLS_NAV } from "../../data/toolsNav";
import {
  scrollToHashFromHref,
  scrollToSection,
} from "../../utils/scrollToSection";
import SiteTopBanner from "../layout/SiteTopBanner";
import NavMegaMenu from "../layout/NavMegaMenu";
import MobileNavSheet from "../layout/MobileNavSheet";
import { SITE_TOP_BANNER } from "../../constants/siteBanner";
import { warmRoute } from "../../utils/prefetchAssets";

const ease = [0.22, 1, 0.36, 1];

const NAV = [
  { label: "Home", href: "/" },
  ABOUT_NAV,
  SERVICES_NAV,
  { label: "Book a call", href: "/book" },
  { label: "Contact", href: "/contact" },
  TOOLS_NAV,
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const lastScroll = useRef(0);
  const hideTimer = useRef(null);
  const menuTimer = useRef(null);
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
      clearTimeout(menuTimer.current);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenuId(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMobile = () => {
    setOpen(false);
  };

  const handleNav = (e, href) => {
    e.preventDefault();
    trackButtonClick(href, "nav_link", "Header");
    closeMobile();
    setOpenMenuId(null);

    if (/^https?:\/\//i.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    if (href.includes("#")) {
      scrollToHashFromHref(href, location.pathname, navigate);
      return;
    }
    if (href.startsWith("/")) {
      warmRoute(href);
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

  const openMenu = (id) => {
    clearTimeout(menuTimer.current);
    setOpenMenuId(id);
    const item = NAV.find((n) => n.id === id);
    if (item?.href) warmRoute(item.href);
  };
  const closeMenu = () => {
    menuTimer.current = setTimeout(() => setOpenMenuId(null), 120);
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
                ? "border-black/[0.08] bg-white shadow-[0_12px_40px_-18px_rgba(15,15,15,0.28)]"
                : "border-transparent bg-white/90"
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
                  width={40}
                  height={40}
                  className="h-6 w-6 object-contain brightness-0 invert sm:h-7 sm:w-7"
                  decoding="async"
                  fetchPriority="high"
                />
              </span>
              <span className="hidden font-sans text-[1.05rem] font-bold tracking-[-0.03em] text-[var(--c-ink)] sm:inline">
                Creative<span className="text-[var(--c-accent)]">IQ</span>
              </span>
            </a>

            <nav className="ml-2 hidden flex-1 items-center justify-center gap-0.5 md:flex">
              {NAV.map((item) => {
                if (!item.children) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      onMouseEnter={() => warmRoute(item.href)}
                      onFocus={() => warmRoute(item.href)}
                      className="rounded-full px-3.5 py-2 font-sans text-[13px] font-medium text-[var(--c-ink-soft)] transition hover:bg-black/[0.04] hover:text-[var(--c-ink)] lg:px-4 lg:text-[14px]"
                    >
                      {item.label}
                    </a>
                  );
                }
                const isOpen = openMenuId === item.id;
                const linkTone = item.accent
                  ? "text-[var(--c-accent)] hover:bg-[var(--c-accent)]/8 hover:text-[#2f5fd9]"
                  : "text-[var(--c-ink-soft)] hover:bg-black/[0.04] hover:text-[var(--c-ink)]";
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openMenu(item.id)}
                    onMouseLeave={closeMenu}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[13px] font-semibold transition lg:px-4 lg:text-[14px] ${linkTone}`}
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </a>
                    <NavMegaMenu
                      open={isOpen}
                      item={item}
                      onNavigate={handleNav}
                      onMouseEnter={() => openMenu(item.id)}
                      onMouseLeave={closeMenu}
                    />
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
                href="/book"
                onClick={(e) => {
                  trackButtonClick("Book a call", "header_cta", "Header");
                  handleNav(e, "/book");
                }}
                className="rounded-full bg-[var(--c-cta)] px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition hover:bg-[var(--c-cta-hover)]"
              >
                Book a call
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                if (open) closeMobile();
                else setOpen(true);
              }}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-[var(--c-ink)] transition hover:bg-black/[0.05] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileNavSheet
        open={open}
        nav={NAV}
        onClose={closeMobile}
        onNavigate={handleNav}
      />
    </>
  );
}
