import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL } from "../../utils/contact";
import { trackButtonClick } from "../../services/analytics";
import { SERVICES_NAV } from "../../data/servicesNav";
import { ABOUT_NAV } from "../../data/aboutNav";
import { TOOLS_NAV } from "../../data/toolsNav";
import { scrollToHashFromHref } from "../../utils/scrollToSection";
import SiteTopBanner from "../layout/SiteTopBanner";
import { SITE_TOP_BANNER } from "../../constants/siteBanner";
import { warmRoute } from "../../utils/prefetchAssets";
import { Magnetic } from "../signal/primitives";

const NAV = [
  { label: "Home", href: "/" },
  { ...ABOUT_NAV, label: "About" },
  SERVICES_NAV,
  TOOLS_NAV,
  { label: "Book a call", href: "/book" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  ["Instagram", "https://www.instagram.com/creativeiq.digitalmarketing/"],
  ["TikTok", "https://www.tiktok.com/@creativeiq.marketing"],
  ["YouTube", "https://www.youtube.com/@CreativeIQdigitalmarketing"],
  ["LinkedIn", "https://www.linkedin.com/company/creativeiqdigitalmarketing"],
  ["Facebook", "https://www.facebook.com/CreativeIQDigitalmarketing"],
];

function useSanAntonioTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const overlay = useRef(null);
  const tl = useRef(null);
  const last = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const time = useSanAntonioTime();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last.current + 2);
      if (y < last.current - 2 || y < 160) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { visibility: "visible" })
      .fromTo(
        el,
        { clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" },
        { clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)", duration: reduce ? 0 : 1, ease: "expo.inOut" },
      )
      .from(el.querySelectorAll("[data-menu-word]"), { yPercent: 110, stagger: 0.05, duration: reduce ? 0 : 0.9, ease: "expo.out" }, "-=0.45")
      .from(el.querySelectorAll("[data-menu-fade]"), { autoAlpha: 0, y: 16, stagger: 0.04, duration: reduce ? 0 : 0.6 }, "-=0.7");
    return () => tl.current?.kill();
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
      tl.current.timeScale(1).play();
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
      tl.current.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNav = (e, href) => {
    e?.preventDefault?.();
    trackButtonClick(href, "nav_link", "Header");
    setOpen(false);
    if (/^https?:\/\//i.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    if (href.includes("#")) {
      scrollToHashFromHref(href, location.pathname, navigate);
      return;
    }
    warmRoute(href);
    navigate(href);
  };

  const top = SITE_TOP_BANNER.enabled
    ? "top-[var(--header-nav-top)] lg:top-[var(--header-nav-top-with-banner)]"
    : "top-[var(--header-nav-top)]";
  const slide = `transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${hidden && !open ? "-translate-y-[140%]" : ""}`;

  return (
    <>
      <SiteTopBanner onNavigate={handleNav} />

      {/* Blend layer: always legible over light or dark pages. */}
      <div className={`pointer-events-none fixed inset-x-0 z-[60] mix-blend-difference ${top} ${slide}`}>
        <div className="s-container flex h-[var(--header-bar-height)] items-center justify-between text-white">
          <a
            href="/"
            onClick={(e) => handleNav(e, "/")}
            className="pointer-events-auto flex items-baseline gap-2 text-[1.35rem] font-bold tracking-[-0.05em]"
            aria-label="CreativeIQ home"
          >
            C<span className="s-serif -mx-[0.1em] text-[1.5rem] font-normal">i</span>Q
            <span className="s-label hidden text-[10px] font-normal tracking-[0.14em] opacity-60 sm:inline">
              CreativeIQ Marketing
            </span>
          </a>
          <span className="s-label hidden text-[10px] opacity-60 lg:inline">
            SATX {time} — Accepting projects
          </span>
          <span className="w-[9.5rem] sm:w-[16rem]" />
        </div>
      </div>

      <header className={`fixed inset-x-0 z-[70] ${top} ${slide}`}>
        <div className="s-container flex h-[var(--header-bar-height)] items-center justify-end gap-2">
          <a
            href="/book"
            onClick={(e) => {
              trackButtonClick("Book a call", "header_cta", "Header");
              handleNav(e, "/book");
            }}
            className={`hidden h-10 items-center rounded-full bg-[var(--s-signal)] px-5 text-[13px] font-semibold text-white transition hover:bg-[var(--s-signal-hot)] sm:inline-flex ${open ? "opacity-0" : ""}`}
          >
            Book a call
          </a>
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex h-10 items-center gap-3 rounded-full bg-[var(--s-paper)] pl-4 pr-3 text-[13px] font-semibold text-[var(--s-ink)] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)]"
            >
              <span className="s-btn__roll">
                <span className={open ? "-translate-y-full" : ""}>Menu</span>
                <span className={open ? "-translate-y-full" : ""}>Close</span>
              </span>
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-[2px] h-[1.5px] w-full bg-current transition duration-500 ${open ? "top-[5px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[8px] h-[1.5px] w-full bg-current transition duration-500 ${open ? "top-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      <div
        id="site-menu"
        ref={overlay}
        className="s-dark invisible fixed inset-0 z-[65] overflow-y-auto"
        data-lenis-prevent
        aria-hidden={!open}
      >
        <div className="s-container grid min-h-full gap-12 pb-10 pt-28 lg:grid-cols-[1.4fr_0.6fr] lg:pt-32">
          <nav aria-label="Main">
            <ul>
              {NAV.map((item, i) => (
                <li key={item.label} className="border-b border-[var(--s-line)] py-3 lg:py-4">
                  <div className="flex items-baseline gap-5">
                    <span className="s-mono w-6 text-[11px] text-[var(--s-signal)]">0{i + 1}</span>
                    <a
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      tabIndex={open ? 0 : -1}
                      className="group block overflow-hidden"
                    >
                      <span
                        data-menu-word
                        className="s-display block text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[0.95] text-[var(--s-paper)] transition-colors duration-300 group-hover:text-[var(--s-signal)]"
                      >
                        {item.label}
                      </span>
                    </a>
                  </div>
                  {item.children ? (
                    <div data-menu-fade className="mt-2 flex flex-wrap gap-x-5 gap-y-1 pl-11">
                      {item.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          tabIndex={open ? 0 : -1}
                          onClick={(e) => handleNav(e, c.href)}
                          className="s-mono text-[12px] text-[var(--s-paper-dim)] transition hover:text-[var(--s-paper)]"
                        >
                          ↳ {c.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <aside className="flex flex-col justify-end gap-10 lg:pb-4">
            <div data-menu-fade>
              <p className="s-label text-[var(--s-paper-ghost)]">Talk to a human</p>
              <a href={`tel:${PHONE_TEL}`} tabIndex={open ? 0 : -1} className="mt-3 block text-2xl font-semibold tracking-tight">
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} tabIndex={open ? 0 : -1} className="mt-1 block text-[var(--s-paper-dim)] hover:text-[var(--s-paper)]">
                {EMAIL}
              </a>
            </div>
            <div data-menu-fade>
              <p className="s-label text-[var(--s-paper-ghost)]">Follow the signal</p>
              <ul className="mt-3 grid grid-cols-2 gap-y-1">
                {SOCIALS.map(([l, h]) => (
                  <li key={l}>
                    <a href={h} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="text-[var(--s-paper-dim)] hover:text-[var(--s-paper)]">
                      {l} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p data-menu-fade className="s-label text-[var(--s-paper-ghost)]">
              San Antonio, TX · {time} CT
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
