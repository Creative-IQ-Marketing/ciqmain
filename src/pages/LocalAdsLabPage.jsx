import { useRef } from "react";
import { Link } from "react-router-dom";
import { m as motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { trackButtonClick } from "../services/analytics";

const LAL_URL =
  "https://localadslab.com/?utm_source=creativeiqmarketing&utm_medium=partner_page&utm_campaign=ciq_partnership";
const LAL_COACHING_URL =
  "https://localadslab.com/meta-ads-coaching-program?utm_source=creativeiqmarketing&utm_medium=partner_page&utm_campaign=ciq_partnership";
const ADS_CONTACT = "/contact?interest=paid-ads";
const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    n: "01",
    who: "Local Ads Lab",
    tone: "ink",
    title: "Reach",
    body: "Facebook and Instagram ads built around a clear offer, aimed at the local customers most likely to call.",
  },
  {
    n: "02",
    who: "CreativeIQ",
    tone: "accent",
    title: "Convert",
    body: "A fast site and landing pages that match the ad, with SEO and AEO so you also get found without paying for every click.",
  },
  {
    n: "03",
    who: "CreativeIQ",
    tone: "accent",
    title: "Follow up",
    body: "A CRM that answers new leads quickly, so the money spent on ads turns into customers instead of unanswered forms.",
  },
];

// Published by Local Ads Lab on their Meta ads coaching page (client names withheld).
const RESULTS = [
  {
    stat: "$1.55",
    unit: "per lead",
    label: "Land sales company",
    detail:
      "919 leads on $1,426.60 of ad spend, with Spanish-language lead ads.",
  },
  {
    stat: "$14,725",
    unit: "in closed sales",
    label: "Local service business",
    detail:
      "36 leads at $42.92 each on $1,545.17 of ad spend. Sales reported by the client.",
  },
  {
    stat: "$3.47",
    unit: "per 1,000 reached",
    label: "Local furniture store",
    detail: "Two sale campaigns reached 54,021 and 83,845 people on $500 each.",
  },
];

const FAQ = [
  {
    q: "What does Local Ads Lab do?",
    a: "Local Ads Lab is a San Antonio agency that runs Meta (Facebook and Instagram) ads for local businesses. Its founder, Angele, has run Meta ads for 11 years across more than 20 industries.",
  },
  {
    q: "How do CreativeIQ and Local Ads Lab work together?",
    a: "They are separate companies that work side by side. Local Ads Lab handles the ads. CreativeIQ handles the website, search visibility, content and CRM that those ads send people to.",
  },
  {
    q: "Can ads guarantee results?",
    a: "No. Results depend on the business, offer, budget and how fast leads are followed up. The numbers on this page are examples published by Local Ads Lab, not promises.",
  },
  {
    q: "I'd rather run my own ads. Is there help for that?",
    a: "Yes. Local Ads Lab also offers weekly Meta ads coaching for owners who want to run their own campaigns. See their coaching page for current details.",
  },
];

const EYEBROW =
  "font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--c-text-muted)]";
const H2 =
  "mt-3 font-sans text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance";
const BODY =
  "font-sans text-[15px] leading-relaxed text-[var(--c-text-secondary)]";

/** Every section after the hero: heading on the left, content on the right. */
function Section({ eyebrow, title, intro, children }) {
  return (
    <section className="border-t border-[var(--c-border)] bg-white">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-[var(--container-pad)] py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <p className={EYEBROW}>{eyebrow}</p>
          <h2 className={H2}>{title}</h2>
          {intro ? (
            <div className={`mt-5 max-w-md ${BODY}`}>{intro}</div>
          ) : null}
        </div>
        <div className="lg:col-span-7">{children}</div>
      </div>
    </section>
  );
}

/** The partnership at a glance: one vertical line that draws through three steps. */
function PartnershipCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const show = reduce || inView;

  return (
    <div
      ref={ref}
      className="rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-surface-2)] p-6 sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--c-border)] pb-5">
        <p className="font-sans text-lg font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
          Creative<span className="text-[var(--c-accent)]">IQ</span>
          <span className="mx-2 font-light text-[var(--c-text-muted)]">×</span>
          Local Ads Lab
        </p>
        <p className="hidden font-sans text-xs text-[var(--c-text-muted)] sm:block">
          San Antonio, TX
        </p>
      </div>

      <ol className="relative mt-7 space-y-8">
        <motion.span
          aria-hidden
          className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-[var(--c-border-strong)]"
          initial={false}
          animate={{ scaleY: show ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 1.1, ease: EASE }}
        />
        {STEPS.map((step, i) => (
          <li key={step.n} className="relative pl-11">
            <motion.span
              aria-hidden
              className={`absolute left-0 top-0.5 flex size-6 items-center justify-center rounded-full ring-4 ring-[var(--c-surface-2)] ${
                step.tone === "ink"
                  ? "bg-[var(--c-ink)]"
                  : "bg-[var(--c-accent)]"
              }`}
              initial={false}
              animate={{ scale: show ? 1 : 0, opacity: show ? 1 : 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.4, delay: 0.2 + i * 0.4, ease: EASE }
              }
            >
              <span className="size-1.5 rounded-full bg-white" />
            </motion.span>
            <p
              className={`font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${
                step.tone === "ink"
                  ? "text-[var(--c-ink)]"
                  : "text-[var(--c-accent)]"
              }`}
            >
              {step.who}
            </p>
            <h3 className="mt-1 font-sans text-xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
              {step.title}
            </h3>
            <p className={`mt-1.5 ${BODY}`}>{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function LocalAdsLabPage() {
  return (
    <main>
      <SEO
        title="Local Ads Lab | CreativeIQ's Meta Ads Partner in San Antonio"
        description="CreativeIQ partners with Local Ads Lab, a San Antonio Meta ads agency. They run the Facebook and Instagram ads. We build the website, SEO, and CRM that turn those clicks into customers."
        keywords="Local Ads Lab, Facebook ads agency San Antonio, Meta ads San Antonio, CreativeIQ partner, Instagram ads for local business, paid social San Antonio"
        canonical="https://creativeiqmarketing.com/partners/local-ads-lab"
      />

      {/* Hero */}
      <section className="bg-white pb-16 pt-[calc(var(--hero-header-offset)+2rem)] sm:pb-20 lg:pb-24">
        <div className="mx-auto grid max-w-[var(--container-max)] items-center gap-12 px-[var(--container-pad)] lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className={EYEBROW}>Our ads partner</p>
            <h1 className="mt-4 font-sans text-[clamp(2.2rem,4.1vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-[var(--c-ink)] text-balance">
              Local Ads Lab runs the ads.
              <br />
              <span className="text-[var(--c-accent)]">
                We build what happens next.
              </span>
            </h1>
            <p className={`mt-6 max-w-xl text-base ${BODY}`}>
              CreativeIQ has teamed up with Local Ads Lab, a San Antonio Meta
              ads agency, so local businesses get one team for attention and one
              for conversion.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link
                  to={ADS_CONTACT}
                  onClick={() =>
                    trackButtonClick(
                      "Talk to us about ads",
                      "lal_hero",
                      "LocalAdsLab",
                    )
                  }
                >
                  Talk to us about ads
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <a
                  href={LAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackButtonClick(
                      "Visit Local Ads Lab",
                      "lal_hero",
                      "LocalAdsLab",
                    )
                  }
                >
                  Visit Local Ads Lab
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <PartnershipCard />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Meet Local Ads Lab"
        title="Ads read from the numbers, not from a hunch."
        intro={
          <p>
            Founder Angele has run Meta ads for local businesses for 11 years,
            across insurance agencies, home services, med spas, trades, and
            professional services. Every recommendation starts with what leads
            cost and what changed.
          </p>
        }
      >
        <dl className="grid grid-cols-3 border-b border-[var(--c-border)] pb-8">
          {[
            ["11", "years running Meta ads"],
            ["20+", "industries served"],
            ["Master's", "in Marketing Intelligence"],
          ].map(([k, v]) => (
            <div key={v}>
              <dt className="font-sans text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold tracking-[-0.04em] text-[var(--c-ink)]">
                {k}
              </dt>
              <dd className="mt-1 font-sans text-xs text-[var(--c-text-muted)]">
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 font-sans text-sm font-semibold text-[var(--c-ink)]">
          Campaigns they&apos;ve managed
        </p>
        <ul className="mt-2">
          {RESULTS.map((r) => (
            <li
              key={r.label}
              className="grid gap-1 border-b border-[var(--c-border)] py-5 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <div>
                <p className="font-sans text-[1.75rem] font-extrabold leading-none tracking-[-0.04em] text-[var(--c-accent)]">
                  {r.stat}
                </p>
                <p className="mt-1 font-sans text-xs text-[var(--c-text-muted)]">
                  {r.unit}
                </p>
              </div>
              <div>
                <p className="font-sans text-[15px] font-semibold text-[var(--c-ink)]">
                  {r.label}
                </p>
                <p className={`mt-1 text-sm ${BODY}`}>{r.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-sans text-xs leading-relaxed text-[var(--c-text-muted)]">
          Figures published by Local Ads Lab. Client names withheld. Results
          vary by business, offer, budget, and follow-up. They show what&apos;s
          possible, not a promise.
        </p>
      </Section>

      <Section
        eyebrow="Where to start"
        title="Two ways in, one team behind you."
      >
        <div className="border-t border-[var(--c-border)]">
          <div className="grid gap-5 border-b border-[var(--c-border)] py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
            <div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
                Already advertising?
              </p>
              <h3 className="mt-2 font-sans text-xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
                Add the site and CRM behind your ads.
              </h3>
              <p className={`mt-2 max-w-md ${BODY}`}>
                If Local Ads Lab is already sending you traffic, we build the
                pages, search presence, and follow-up system behind it.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link
                to="/contact"
                onClick={() =>
                  trackButtonClick(
                    "Talk to CreativeIQ",
                    "lal_audience_ads",
                    "LocalAdsLab",
                  )
                }
              >
                Schedule a call
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 border-b border-[var(--c-border)] py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
            <div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--c-accent)]">
                Need ads handled?
              </p>
              <h3 className="mt-2 font-sans text-xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
                Start with us and we&apos;ll bring in the ad team.
              </h3>
              <p className={`mt-2 max-w-md ${BODY}`}>
                Tell us about your business. We&apos;ll plan the whole path from
                ad to customer, with Local Ads Lab running the campaigns.
              </p>
              <a
                href={LAL_COACHING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackButtonClick(
                    "Meta ads coaching",
                    "lal_audience_coaching",
                    "LocalAdsLab",
                  )
                }
                className="mt-3 inline-flex items-center gap-1 font-sans text-sm font-semibold text-[var(--c-accent)] underline-offset-4 hover:underline"
              >
                Prefer to run your own? See their coaching
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
            <Button asChild>
              <Link
                to={ADS_CONTACT}
                onClick={() =>
                  trackButtonClick(
                    "Get ads handled",
                    "lal_audience_new",
                    "LocalAdsLab",
                  )
                }
              >
                Plan my ads
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Questions about the partnership.">
        <div className="border-t border-[var(--c-border)]">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group border-b border-[var(--c-border)] py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-sans text-[16px] font-semibold text-[var(--c-ink)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="text-xl font-light text-[var(--c-text-muted)] transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className={`mt-3 max-w-xl ${BODY}`}>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-5 font-sans text-xs text-[var(--c-text-muted)]">
          Local Ads Lab is a separate company. Its results and claims are its
          own.{" "}
          <a
            href={LAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--c-accent)] underline-offset-4 hover:underline"
          >
            localadslab.com
          </a>
        </p>
      </Section>
    </main>
  );
}
