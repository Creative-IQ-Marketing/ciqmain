import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { trackButtonClick } from "../../services/analytics";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "../../utils/contact";
import { SERVICES_NAV } from "../../data/servicesNav";
import { SignalButton } from "../signal/primitives";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOCIALS = [
  ["Facebook", "https://www.facebook.com/CreativeIQDigitalmarketing"],
  ["Instagram", "https://www.instagram.com/creativeiq.digitalmarketing/"],
  ["TikTok", "https://www.tiktok.com/@creativeiq.marketing"],
  ["YouTube", "https://www.youtube.com/@CreativeIQdigitalmarketing"],
  ["LinkedIn", "https://www.linkedin.com/company/creativeiqdigitalmarketing"],
];

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/creativeiq" },
  { label: "Services", href: "/services" },
  { label: "SEO Audit by CIQ", href: "/free-ai-seo-audit" },
  { label: "Events by CIQ", href: "https://events.creativeiqmarketing.com", external: true },
  { label: "Book a call", href: "/book" },
  { label: "Contact", href: "/contact" },
  { label: "Newsletter", href: "/newsletter" },
];

export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-mark] > span", {
          yPercent: 100,
          stagger: 0.06,
          ease: "expo.out",
          duration: 1.4,
          scrollTrigger: { trigger: "[data-mark]", start: "top 95%", once: true },
        });
        gsap.fromTo(
          "[data-footer-cta]",
          { yPercent: 30, autoAlpha: 0.2 },
          { yPercent: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 30%", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const link = "text-[var(--s-paper-dim)] transition hover:text-[var(--s-paper)]";

  return (
    <footer ref={root} className="s-dark relative overflow-hidden">
      <div className="s-container border-t border-[var(--s-line)] pt-[clamp(5rem,10vw,9rem)]">
        <div data-footer-cta className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <p className="s-display text-[clamp(3rem,8vw,8.5rem)] text-[var(--s-paper)]">
            Let&rsquo;s make the
            <br />
            answer <span className="s-serif text-[var(--s-signal)]">you.</span>
          </p>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <SignalButton to="/book" onClick={() => trackButtonClick("Book a call", "footer_cta", "Footer")}>
              Book a call
            </SignalButton>
            <SignalButton to="/contact" variant="ghost" onClick={() => trackButtonClick("Start a project", "footer_cta", "Footer")}>
              Start a project
            </SignalButton>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-[var(--s-line)] pt-10 text-[15px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="s-label mb-4 text-[var(--s-paper-ghost)]">Studio</p>
            <p className="max-w-xs leading-relaxed text-[var(--s-paper-dim)]">
              Performance-first growth systems: SEO, web, content and CRM built to rank and convert. San Antonio, TX —
              international clients welcome.
            </p>
          </div>
          <nav>
            <p className="s-label mb-4 text-[var(--s-paper-ghost)]">Navigate</p>
            <ul className="space-y-2">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className={link}
                    onClick={() => trackButtonClick(n.label, "footer_nav", "Footer")}
                    {...(n.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav>
            <p className="s-label mb-4 text-[var(--s-paper-ghost)]">Services</p>
            <ul className="space-y-2">
              {SERVICES_NAV.children?.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className={link} onClick={() => trackButtonClick(c.label, "footer_nav", "Footer")}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="s-label mb-4 text-[var(--s-paper-ghost)]">Contact</p>
            <a href={`tel:${PHONE_TEL}`} className={`block ${link}`}>
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className={`block break-all ${link}`}>
              {EMAIL}
            </a>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
              {SOCIALS.map(([l, h]) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noopener noreferrer" aria-label={l} className={`s-mono text-[12px] ${link}`}>
                    {l} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p
        data-mark
        aria-hidden
        className="s-display mt-16 flex select-none justify-center overflow-hidden whitespace-nowrap px-2 pb-[0.06em] text-[17vw] leading-[0.9] tracking-[-0.07em] text-[var(--s-paper)]"
      >
        {"Creative".split("").map((c, i) => (
          <span key={i} className="inline-block">
            {c}
          </span>
        ))}
        <span className="s-serif inline-block text-[var(--s-signal)]">IQ</span>
      </p>

      <div className="s-container flex flex-col gap-3 border-t border-[var(--s-line)] py-6 text-[12px] text-[var(--s-paper-ghost)] sm:flex-row sm:justify-between">
        <p className="s-mono">© {new Date().getFullYear()} CreativeIQ Marketing. All rights reserved.</p>
        <div className="s-mono flex gap-5">
          <a href="/terms" className="hover:text-[var(--s-paper)]">Terms</a>
          <a href="/privacy" className="hover:text-[var(--s-paper)]">Privacy</a>
          <button
            type="button"
            className="hover:text-[var(--s-paper)]"
            onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
