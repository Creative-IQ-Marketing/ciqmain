import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Music2,
  Phone,
  Youtube,
} from "lucide-react";
import mainLogo from "../../assets/mainLogo.png";
import { trackButtonClick } from "../../services/analytics";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "../../utils/contact";
import { SERVICES_NAV } from "../../data/servicesNav";
import footerVoid from "../../assets/sections/section-footer-void.jpg";

const SOCIALS = [
  {
    Icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/CreativeIQDigitalmarketing",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/creativeiq.digitalmarketing/",
  },
  {
    Icon: Music2,
    label: "TikTok",
    href: "https://www.tiktok.com/@creativeiq.marketing",
  },
  {
    Icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@CreativeIQdigitalmarketing",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/creativeiqdigitalmarketing",
  },
];

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book a call", href: "/book" },
  { label: "Free SEO Audit", href: "/free-ai-seo-audit" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--c-base)]">
      <div className="relative overflow-hidden border-t border-[var(--c-border)]">
        <img
          src={footerVoid}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[var(--c-ink)]/75" />
        <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col items-start justify-between gap-10 px-[var(--container-pad)] py-20 sm:py-24 md:flex-row md:items-end lg:py-28">
          <div className="max-w-2xl">
            <p className="font-sans text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-white text-balance">
              Ready to build systems that convert?
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/book"
              onClick={() =>
                trackButtonClick("Book a call", "footer_cta", "Footer")
              }
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-white px-8 py-3.5 font-sans text-[15px] font-semibold text-[var(--c-ink)] transition hover:bg-white/90"
            >
              Book a call
            </Link>
            <Link
              to="/contact"
              onClick={() =>
                trackButtonClick("Start a project", "footer_cta", "Footer")
              }
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-white/30 bg-transparent px-8 py-3.5 font-sans text-[15px] font-medium text-white transition hover:border-white"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[var(--c-footer)] text-white">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-14 lg:py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.1fr]">
            <div>
              <a href="/" className="inline-flex items-center gap-2.5">
                <img
                  src={mainLogo}
                  alt="CreativeIQ"
                  className="h-9 w-9 object-contain brightness-0 invert"
                />
                <span className="font-sans text-xl font-bold tracking-[-0.03em]">
                  Creative<span className="text-[#6B9AFF]">IQ</span>
                </span>
              </a>
              <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-white/55">
                Performance-first growth systems: SEO, web, content, and CRM
                built to rank and convert.
              </p>
              <div className="mt-6 flex gap-2">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>

            <nav className="font-sans text-sm">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Navigate
              </p>
              <ul className="space-y-2.5">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() =>
                        trackButtonClick(item.label, "footer_nav", "Footer")
                      }
                      className="text-white/65 transition hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/newsletter"
                    className="text-white/65 transition hover:text-white"
                  >
                    Newsletter
                  </a>
                </li>
              </ul>
            </nav>

            <nav className="font-sans text-sm">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Services
              </p>
              <ul className="space-y-2.5">
                {SERVICES_NAV.children?.map((child) => (
                  <li key={child.href}>
                    <a
                      href={child.href}
                      onClick={() =>
                        trackButtonClick(child.label, "footer_nav", "Footer")
                      }
                      className="text-white/65 transition hover:text-white"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="font-sans text-sm">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Contact
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center gap-2.5 text-white/65 transition hover:text-white"
                  >
                    <Phone
                      size={15}
                      strokeWidth={1.75}
                      className="text-[#6B9AFF]"
                    />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2.5 break-all text-white/65 transition hover:text-white"
                  >
                    <Mail
                      size={15}
                      strokeWidth={1.75}
                      className="shrink-0 text-[#6B9AFF]"
                    />
                    {EMAIL}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-white/45">International clients welcome</p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 font-sans text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {new Date().getFullYear()} CreativeIQ Marketing. All rights
              reserved.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="/terms" className="transition hover:text-white/80">
                Terms
              </a>
              <a href="/privacy" className="transition hover:text-white/80">
                Privacy
              </a>
              <a
                href="/newsletter/unsubscribed"
                className="transition hover:text-white/80"
              >
                Unsubscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
