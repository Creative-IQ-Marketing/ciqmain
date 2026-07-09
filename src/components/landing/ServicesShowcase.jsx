import {
  ArrowUpRight,
  FileText,
  LayoutTemplate,
  Search,
  Share2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { trackButtonClick, trackServiceSelection } from "../../services/analytics";
import { normalizeFormInterest } from "../../data/serviceFormOptions";
import FadeUp from "../primitives/FadeUp";

const SERVICES = [
  {
    id: "sem",
    title: "Search Engine Marketing",
    contactValue: "bundle-essential",
    summary:
      "SEO, paid search, and analytics — built to get you found by buyers ready to act.",
    Icon: Search,
  },
  {
    id: "smm",
    title: "Social Media Marketing",
    contactValue: "social-starter",
    summary:
      "Campaigns and content that keep your brand top-of-mind across every major platform.",
    Icon: Share2,
  },
  {
    id: "content",
    title: "Content Marketing",
    contactValue: "video-production",
    summary:
      "Blogs, video, email, and copy that turn attention into qualified pipeline.",
    Icon: FileText,
  },
  {
    id: "web",
    title: "Web Design & Development",
    contactValue: "bundle-essential",
    summary:
      "Fast, conversion-focused sites — modern stacks, sharp UX, performance included.",
    Icon: LayoutTemplate,
  },
];

export default function ServicesShowcase() {
  const navigate = useNavigate();

  const goToContact = (serviceValue) => {
    trackServiceSelection(serviceValue);
    trackButtonClick(serviceValue, "service_card", "ServicesShowcase");
    const interest = normalizeFormInterest(serviceValue) || serviceValue;
    navigate(`/?interest=${interest}#contact`);
  };

  return (
    <FadeUp
      as="section"
      id="services"
      className="border-t border-black/[0.05] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            What we do
          </p>
          <h2 className="font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
            Marketing systems that grow revenue
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-[#5c5c5c]">
            Search, social, content, and websites — one team building the full
            stack your business needs to turn attention into customers.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-black/[0.06] border-y border-black/[0.06]">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => goToContact(service.contactValue)}
                className="group flex w-full gap-5 py-7 text-left transition-colors hover:bg-neutral-50/80 sm:items-center sm:justify-between sm:gap-10 sm:py-8"
              >
                <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center sm:gap-5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#3B6FF0] sm:mt-0">
                    <service.Icon size={18} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="max-w-xl min-w-0">
                    <h3 className="font-sans text-lg font-semibold tracking-[-0.02em] text-[#0f0f0f] sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[15px] leading-relaxed text-[#5c5c5c]">
                      {service.summary}
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 font-sans text-sm font-medium text-[#737373] transition group-hover:text-[#0f0f0f]">
                  Learn more
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.75}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/services"
            onClick={() =>
              trackButtonClick(
                "Browse Services",
                "services_cta",
                "ServicesShowcase",
              )
            }
            className="inline-flex items-center justify-center rounded-full bg-[#18181b] px-7 py-3 font-sans text-[15px] font-semibold text-white transition hover:bg-[#2a2a2a]"
          >
            Browse services
          </Link>
          <Link
            to="/book"
            onClick={() =>
              trackButtonClick("Book a call", "services_cta", "ServicesShowcase")
            }
            className="inline-flex items-center justify-center rounded-full border border-[#d4d4d4] bg-white px-7 py-3 font-sans text-[15px] font-medium text-[#252525] transition hover:border-[#aaa]"
          >
            Book a call
          </Link>
        </div>
      </div>
    </FadeUp>
  );
}
