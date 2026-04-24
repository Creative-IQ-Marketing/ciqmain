import { useState } from "react";
import { Facebook, Linkedin, Instagram, Youtube, ArrowUpRight } from "lucide-react";
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
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    trackButtonClick("Newsletter Subscribe", "footer_newsletter", "Footer");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#050B1B] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#3B6FF0]/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#3B6FF0]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 lg:px-8">
        <div id="footer-newsletter" className="rounded-[28px] border border-white/15 bg-white/[0.06] p-7 backdrop-blur-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                Newsletter
              </p>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
                High-level growth insights, straight to your inbox.
              </h3>
              <p className="mt-4 max-w-xl text-sm text-white/75 sm:text-base">
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
                  className="h-12 flex-1 rounded-full border border-white/30 bg-white/95 px-5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#3B6FF0] px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#2f5de0]"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-xs font-medium text-blue-200">
                  Thanks for subscribing. You are in.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.1fr_auto_auto]">
          <div>
            <a href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <img src={mainLogo} alt="CreativeIQ" className="h-6 w-6 object-contain" />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                CreativeIQ
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Performance-first digital growth systems built for compounding visibility and revenue.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-blue-300 hover:text-blue-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid gap-3 text-sm text-white/75">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
            <a href="#footer-newsletter" className="transition hover:text-white">
              Newsletter
            </a>
            <a href="/newsletter/unsubscribed" className="inline-flex items-center gap-1 text-white/60 transition hover:text-white">
              Unsubscribe Page <ArrowUpRight size={14} />
            </a>
          </nav>

          <div className="text-sm text-white/75">
            <p>San Antonio, Texas</p>
            <a className="mt-2 block transition hover:text-white" href="tel:2108380177">
              (210) 838-0177
            </a>
            <a className="mt-2 block transition hover:text-white" href="mailto:CiQ@creativeiq.marketing">
              CiQ@creativeiq.marketing
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>{new Date().getFullYear()} CreativeIQ Marketing. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {NAV.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => trackButtonClick(label, "footer_nav", "Footer")}
                className="transition hover:text-white/80"
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
