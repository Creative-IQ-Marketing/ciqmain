import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Music2,
} from "lucide-react";
import mainLogo from "../../assets/mainLogo.png";
import { trackButtonClick } from "../../services/analytics";
import { useNewsletter } from "../../context/NewsletterContext";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "../../utils/contact";

import { SERVICES_NAV } from "../../data/servicesNav";

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

const LINKS = [
  { label: "Home", href: "/" },
  SERVICES_NAV,
  { label: "Free SEO Audit", href: "/free-ai-seo-audit" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const { openNewsletter } = useNewsletter();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="/" className="inline-flex items-center gap-2.5">
              <img
                src={mainLogo}
                alt="CreativeIQ"
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-bold tracking-tight">CreativeIQ</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Performance-first digital growth systems for brands that want
              compounding visibility and revenue.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-2.5 text-sm text-slate-600">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Navigate
            </p>
            {LINKS.map((item) =>
              item.children ? (
                <div key={item.label} className="space-y-2">
                  <a
                    href={item.href}
                    onClick={() =>
                      trackButtonClick(item.label, "footer_nav", "Footer")
                    }
                    className="font-medium text-slate-800 transition hover:text-slate-900"
                  >
                    {item.label}
                  </a>
                  <div className="space-y-1.5 border-l border-slate-200 pl-3">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={() =>
                          trackButtonClick(child.label, "footer_nav", "Footer")
                        }
                        className="block text-slate-500 transition hover:text-slate-900"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() =>
                    trackButtonClick(item.label, "footer_nav", "Footer")
                  }
                  className="transition hover:text-slate-900"
                >
                  {item.label}
                </a>
              ),
            )}
            <button
              type="button"
              onClick={() => {
                trackButtonClick("Newsletter", "footer_newsletter", "Footer");
                openNewsletter();
              }}
              className="text-left transition hover:text-slate-900"
            >
              Newsletter
            </button>
          </nav>

          <div className="text-sm text-slate-600">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contact
            </p>
            <a
              className="mt-3 block transition hover:text-slate-900"
              href={`tel:${PHONE_TEL}`}
            >
              {PHONE_DISPLAY}
            </a>
            <a
              className="mt-2 block transition hover:text-slate-900"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
            <p className="mt-2 text-slate-500">International clients welcome</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-500">
          <p>
            {new Date().getFullYear()} CreativeIQ Marketing. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/terms" className="transition hover:text-slate-900">
              Terms
            </a>
            <a href="/privacy" className="transition hover:text-slate-900">
              Privacy
            </a>
            <a
              href="/newsletter/unsubscribed"
              className="transition hover:text-slate-900"
            >
              Unsubscribe
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
