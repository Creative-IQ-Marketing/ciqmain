import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import PageHeader, {
  PageCtaPrimary,
  PageCtaSecondary,
} from "../components/layout/PageHeader";
import { Button } from "../components/ui/button";
import vilmaBw from "../assets/vilma/vilma-bw-work.webp";
import vilmaCreative from "../assets/vilma/vilma-creative.webp";

const FOCUS = [
  "SEO & AEO",
  "Neuromarketing",
  "AI ecosystems",
  "CRM automation",
  "Brand & web",
  "Growth strategy",
];

const COMMUNITY = [
  {
    title: "Dominion Rotary Club",
    body: "Serves as Chair, supporting community initiatives and professional development across San Antonio.",
  },
  {
    title: "Student mentorship",
    body: "Mentors high school and undergraduate students through Hallmark University, Harmony Public Schools, and Texas A&M programs.",
  },
  {
    title: "Public speaking",
    body: "Speaks on entrepreneurship, AI, neuromarketing, digital strategy, and leadership at universities and business forums.",
  },
  {
    title: "Regional networks",
    body: "Active in Key Partner Networking Group, South Texas Business Partnership, and Stone Oak business organizations.",
  },
];

export default function AboutVilmaPage() {
  return (
    <main>
      <SEO
        title="About Vilma Tovar | Founder & CEO of CreativeIQ"
        description="Vilma Tovar is Founder and CEO of CreativeIQ Marketing. AI strategist, speaker, and growth consultant building trust-first digital ecosystems."
        keywords="Vilma Tovar, CreativeIQ founder, AI marketing strategist, neuromarketing, San Antonio entrepreneur"
        canonical="https://creativeiqmarketing.com/about/vilma"
      />

      <PageHeader
        title="Vilma Tovar"
        titleAccent="builds trust systems"
        description="Founder and CEO of CreativeIQ. AI digital marketing strategist, speaker, and growth consultant with over a decade building scalable marketing ecosystems."
      >
        <PageCtaPrimary to="/contact">Work with Vilma</PageCtaPrimary>
        <PageCtaSecondary to="/about/creativeiq">
          About CreativeIQ
        </PageCtaSecondary>
      </PageHeader>

      <section className="border-b border-[var(--c-border)]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[52vh] bg-[var(--c-ink)] lg:min-h-[640px]">
            <img
              src={vilmaBw}
              alt="Vilma Tovar reviewing work on her phone"
              width={720}
              height={960}
              className="absolute inset-0 size-full object-cover object-[center_15%] grayscale"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="flex flex-col justify-center px-[var(--container-pad)] py-14 lg:px-14 lg:py-20">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--c-accent)]">
              Origin
            </p>
            <h2 className="mt-3 font-sans text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--c-ink)] text-balance">
              Marketing started as necessity. It became a craft.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              As a teenager, Vilma helped market her father&apos;s business when
              advertising budgets were limited. Without paid media to lean on,
              she became obsessed with how people searched, how trust was built
              online, and how businesses could earn customers organically.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              She taught herself SEO, website optimization, and social media
              years before many small businesses understood their importance.
              Those early years became the foundation of CreativeIQ.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--c-border)] bg-white py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="font-sans text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
                Marketing is not about getting attention.{" "}
                <span className="text-[var(--c-accent)]">
                  It is about earning trust.
                </span>
              </h2>
            </div>
            <div className="space-y-5">
              <p className="font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
                That philosophy is rooted in neuromarketing: how people think,
                feel, remember, and decide. Every website, ad, video, landing
                page, email, and customer interaction either builds confidence
                or creates friction.
              </p>
              <p className="font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
                Rather than guesswork, Vilma combines psychology, behavioral
                science, and data-driven marketing to design journeys that feel
                intuitive and valuable. Successful businesses do not manipulate
                people. They remove uncertainty and reduce cognitive overload.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {FOCUS.map((item) => (
              <span
                key={item}
                className="rounded-[var(--radius-pill)] border border-[var(--c-border)] bg-[var(--c-surface-2)] px-4 py-2 font-sans text-sm font-medium text-[var(--c-ink)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--c-border)]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 flex flex-col justify-center bg-[var(--c-surface-2)] px-[var(--container-pad)] py-14 lg:order-1 lg:px-14 lg:py-20">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--c-accent)]">
              AI-ready ecosystems
            </p>
            <h2 className="mt-3 font-sans text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--c-ink)] text-balance">
              Understood by humans and intelligent systems.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              While traditional marketing focused on ranking in search engines,
              modern businesses must now be understood by both people and
              artificial intelligence. CreativeIQ builds interconnected
              infrastructures where websites, structured data, local SEO, brand
              authority, content, reputation, social, automation, and customer
              interactions work as one ecosystem.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              The mission stays the same: empower businesses with strategies
              rooted in psychology, technology, and human connection.
            </p>
          </div>
          <div className="relative order-1 min-h-[48vh] lg:order-2 lg:min-h-full">
            <img
              src={vilmaCreative}
              alt="Vilma Tovar in a creative outdoor setting"
              width={720}
              height={900}
              className="absolute inset-0 size-full object-cover object-[center_18%]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--c-border)] bg-white py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="max-w-2xl">
            <h2 className="font-sans text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)]">
              Leadership beyond the agency
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
              Community service, mentorship, and athletics shaped how Vilma
              leads: with resilience, responsibility, and a bias toward building
              systems that hold up under pressure.
            </p>
          </div>

          <div className="mt-10 grid gap-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] sm:grid-cols-2">
            {COMMUNITY.map((item, i) => (
              <article
                key={item.title}
                className={`bg-white p-6 sm:p-7 ${
                  i % 2 === 0 ? "sm:border-r border-[var(--c-border)]" : ""
                } ${i < 2 ? "border-b border-[var(--c-border)]" : ""}`}
              >
                <p className="font-sans text-[11px] font-bold tabular-nums text-[var(--c-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-sans text-lg font-bold tracking-[-0.02em] text-[var(--c-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--c-text-secondary)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-[var(--c-text-muted)]">
            Before entrepreneurship, Vilma competed as an NCAA collegiate soccer
            player and later played rugby at the University of Mary Washington.
            Teamwork, adaptability, and perseverance from athletics still shape
            how she leads and mentors.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--c-border)] bg-[var(--c-ink)] py-[var(--section-pad)] text-white">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="max-w-2xl">
            <h2 className="font-sans text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-balance">
              Built for lasting systems.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/65">
              Resilience and responsibility shape how Vilma leads CreativeIQ.
              That standard shows up in every engagement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <Link to="/contact">
                  Start a conversation{" "}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5"
              >
                <Link to="/services">View services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
