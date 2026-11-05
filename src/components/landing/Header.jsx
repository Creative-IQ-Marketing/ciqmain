import { useEffect, useRef, useState } from "react";
import { m as motion } from "framer-motion";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import mainLogo from "../../assets/mainLogo.webp";
import { PHONE_DISPLAY, PHONE_TEL } from "../../utils/contact";
import { trackButtonClick } from "../../services/analytics";
import { BUNDLES_NAV, SERVICES_NAV } from "../../data/servicesNav";
import { ABOUT_NAV } from "../../data/aboutNav";
import { SOCIALS } from "../../data/socials";
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

// The logo already links home and the "Book a call" button is on the right,
// so the desktop bar skips both; the mobile sheet keeps Home.
const NAV = [
  { label: "Home", href: "/" },
  ABOUT_NAV,
  BUNDLES_NAV,
  SERVICES_NAV,
  { label: "Blog", href: "/blog" },
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
        <div
          className={`border-b backdrop-blur-xl transition-colors duration-300 ${
            scrolled
              ? "border-black/[0.07] bg-white/90"
              : "border-transparent bg-white/70"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center gap-6 px-[var(--container-pad)]">
            <a
              href="/"
              onClick={(e) => handleNav(e, "/")}
              className="flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2"
            >
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[var(--c-ink)]">
                <img
                  src={mainLogo}
                  alt="CreativeIQ"
                  width={40}
                  height={40}
                  className="h-6 w-6 object-contain brightness-0 invert"
                  decoding="async"
                  fetchPriority="low"
                />
              </span>
              <span className="hidden font-sans text-[1.05rem] font-bold tracking-[-0.03em] text-[var(--c-ink)] sm:inline">
                Creative<span className="text-[var(--c-accent)]">IQ</span>
              </span>
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-1 md:flex" aria-label="Primary">
              {NAV.filter((n) => n.href !== "/").map((item) => {
                const isActive =
                  item.href === "/"
                    ? false
                    : location.pathname === item.href ||
                      location.pathname.startsWith(`${item.href}/`);
                if (!item.children) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      onMouseEnter={() => warmRoute(item.href)}
                      onFocus={() => warmRoute(item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-full px-3.5 py-2 font-sans text-[14px] font-medium whitespace-nowrap transition hover:bg-black/[0.04] hover:text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] ${
                        isActive
                          ? "bg-black/[0.05] text-[var(--c-ink)]"
                          : "text-[var(--c-text-secondary)]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                }
                const isOpen = openMenuId === item.id;
                const linkTone = item.accent
                  ? "text-[var(--c-accent)] hover:bg-[var(--c-accent)]/8 hover:text-[#2f5fd9]"
                  : isActive
                    ? "bg-black/[0.05] text-[var(--c-ink)]"
                    : "text-[var(--c-text-secondary)] hover:bg-black/[0.04] hover:text-[var(--c-ink)]";
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
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[14px] font-medium whitespace-nowrap transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] ${linkTone}`}
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

            <div className="ml-auto hidden items-center gap-1 md:flex">
              <div className="hidden items-center min-[1180px]:flex">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onClick={() =>
                      trackButtonClick(label, "header_social", "Header")
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--c-text-muted)] transition hover:bg-black/[0.04] hover:text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                  >
                    <Icon size={14} strokeWidth={1.75} aria-hidden />
                  </a>
                ))}
                <span className="mx-3 h-5 w-px bg-black/10" aria-hidden />
              </div>
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={() =>
                  trackButtonClick("Call CTA", "header_call", "Header")
                }
                aria-label="Call us"
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 font-sans text-[14px] font-medium tabular-nums text-[var(--c-text-secondary)] transition hover:bg-black/[0.04] hover:text-[var(--c-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
              >
                <Phone size={15} strokeWidth={1.75} aria-hidden />
                <span className="hidden min-[1366px]:inline">{PHONE_DISPLAY.replace("+1 ", "")}</span>
              </a>
              <a
                href="/book"
                onClick={(e) => {
                  trackButtonClick("Book a call", "header_cta", "Header");
                  handleNav(e, "/book");
                }}
                className="ml-2 inline-flex h-10 items-center whitespace-nowrap rounded-full bg-[var(--c-accent)] px-5 font-sans text-[14px] font-semibold text-white transition hover:bg-[#2f5fd9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)] focus-visible:ring-offset-2"
              >
                Book a call
              </a>
            </div>

            <a
              href="/search"
              onClick={(e) => handleNav(e, "/search")}
              aria-label="Search the site"
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-[var(--c-ink)] transition hover:bg-black/[0.05] md:hidden"
            >
              <Search className="h-5 w-5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => {
                if (open) closeMobile();
                else setOpen(true);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--c-ink)] transition hover:bg-black/[0.05] md:hidden"
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
