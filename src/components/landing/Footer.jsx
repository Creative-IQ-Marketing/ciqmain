import { useState } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Music2,
  ArrowUpRight,
} from "lucide-react";
import mainLogo from "../../assets/mainLogo.png";
import { trackButtonClick } from "../../services/analytics";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

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
  { Icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@creativeiq.marketing" },
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

export default function Footer() {
  const [email, setEmail] = useState("");
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    trackButtonClick("Newsletter Subscribe", "footer_newsletter", "Footer");
    setSubscribed(true);
    setEmail("");
  };

  const onUnsubscribe = (e) => {
    e.preventDefault();
    if (!unsubscribeEmail.trim()) return;
    trackButtonClick("Newsletter Unsubscribe", "footer_unsubscribe", "Footer");
    setUnsubscribed(true);
    setUnsubscribeEmail("");
  };

  return (
    <footer className="relative bg-white text-slate-900">
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div
          id="footer-newsletter"
          className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
                Newsletter
              </p>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
                High-level growth insights, straight to your inbox.
              </h3>
              <p className="mt-4 max-w-xl text-sm text-slate-600 sm:text-base">
                One concise weekly email with sharp strategy, channel signals,
                and practical execution ideas.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your best email"
                  className="h-12 flex-1 rounded-full border border-slate-300 bg-white px-5 text-sm text-slate-900 outline-none transition focus:border-[#3B6FF0]"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#3B6FF0] px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#2F5FE6]"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-xs font-medium text-[#3B6FF0]">
                  Thanks for subscribing. You are in.
                </p>
              )}
            </form>
          </div>

          <form onSubmit={onUnsubscribe} className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-xs text-slate-500">
              Prefer not to receive newsletter emails?
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={unsubscribeEmail}
                onChange={(e) => setUnsubscribeEmail(e.target.value)}
                placeholder="Email to unsubscribe"
                className="h-10 flex-1 rounded-full border border-slate-300 bg-white px-4 text-xs text-slate-700 outline-none transition focus:border-[#3B6FF0]"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600 transition hover:border-[#3B6FF0] hover:text-[#3B6FF0]"
              >
                Unsubscribe
              </button>
            </div>
            {unsubscribed && (
              <p className="mt-2 text-xs text-slate-500">
                Request captured. You can also confirm on the unsubscribe page.
              </p>
            )}
          </form>
        </div>

        <div className="mt-14 grid gap-10 border-t border-slate-200 pt-10 lg:grid-cols-[1.1fr_auto_auto]">
          <div>
            <a href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B6FF0]">
                <img
                  src={mainLogo}
                  alt="CreativeIQ"
                  className="h-6 w-6 object-contain"
                />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                CreativeIQ
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Performance-first digital growth systems built for compounding
              visibility and revenue.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition hover:border-[#3B6FF0] hover:text-[#3B6FF0]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid gap-3 text-sm text-slate-600">
            <a href="#services" className="transition hover:text-slate-900">
              Services
            </a>
            <a href="#contact" className="transition hover:text-slate-900">
              Contact
            </a>
            <a
              href="#footer-newsletter"
              className="transition hover:text-slate-900"
            >
              Newsletter
            </a>
            <a
              href="/newsletter/unsubscribed"
              className="inline-flex items-center gap-1 text-slate-500 transition hover:text-slate-900"
            >
              Unsubscribe <ArrowUpRight size={14} />
            </a>
          </nav>

          <div className="text-sm text-slate-600">
            <p>San Antonio, Texas</p>
            <a
              className="mt-2 block transition hover:text-slate-900"
              href="tel:2108380177"
            >
              (210) 838-0177
            </a>
            <a
              className="mt-2 block transition hover:text-slate-900"
              href="mailto:CiQ@creativeiq.marketing"
            >
              CiQ@creativeiq.marketing
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>
            {new Date().getFullYear()} CreativeIQ Marketing. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {NAV.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => trackButtonClick(label, "footer_nav", "Footer")}
                className="transition hover:text-slate-900"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
