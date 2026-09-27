import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow, SignalButton } from "../signal/primitives";
import { trackButtonClick, trackServiceSelection } from "../../services/analytics";
import { normalizeFormInterest } from "../../data/serviceFormOptions";
import seoPoster from "../../assets/hero/hero-frame-seo.webp";
import socialPoster from "../../assets/hero/hero-frame-social.webp";
import contentPoster from "../../assets/hero/hero-frame-crm.webp";
import webPoster from "../../assets/hero/hero-frame-web.webp";
import semVideo from "../../assets/svid/seovid.mp4";
import smmVideo from "../../assets/svid/social media.mp4";
import contentVideo from "../../assets/svid/contentmgmt.mp4";
import webVideo from "../../assets/svid/webdev.mp4";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGES = [
  {
    id: "sem",
    verb: "Found",
    title: "Search Engine Marketing",
    body: "Technical SEO, AI-search readiness and paid search wired to analytics — so buyers already looking can find you, and machines can cite you.",
    tags: ["Technical SEO", "GEO / AI search", "Schema", "Google Ads"],
    contactValue: "bundle-launch",
    video: semVideo,
    poster: seoPoster,
  },
  {
    id: "content",
    verb: "Understood",
    title: "Content Marketing",
    body: "Editorial, video, email and long-form that teach buyers and give AI models something worth quoting. Stories with a commercial spine.",
    tags: ["Video", "Editorial", "Email", "Long-form"],
    contactValue: "video-production",
    video: contentVideo,
    poster: contentPoster,
  },
  {
    id: "smm",
    verb: "Chosen",
    title: "Social Media Marketing",
    body: "A consistent presence and paid amplification on the platforms your audience already lives on — aimed at pipeline, never vanity.",
    tags: ["Organic", "Paid social", "Reels", "Community"],
    contactValue: "social-starter",
    video: smmVideo,
    poster: socialPoster,
  },
  {
    id: "web",
    verb: "Converted",
    title: "Web & CRM Systems",
    body: "Fast conversion sites with clear offers, plus the CRM and automation that turn a visit into a booked call without anyone chasing it.",
    tags: ["Web design", "Development", "CRM", "Automation"],
    contactValue: "bundle-launch",
    video: webVideo,
    poster: webPoster,
  },
];

/** Card leans toward the pointer in 3D. */
function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return undefined;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
    gsap.set(el, { transformPerspective: 1100 });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 9);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return ref;
}

function StageVideo({ src, poster }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full scale-[1.15] object-cover"
      data-parallax
    />
  );
}

function TiltButton({ children, ...props }) {
  const ref = useTilt();
  return (
    <button ref={ref} type="button" {...props}>
      {children}
    </button>
  );
}

export default function SystemReel() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const navigate = useNavigate();

  const go = (value) => {
    trackServiceSelection(value);
    trackButtonClick(value, "service_card", "SystemReel");
    const interest = normalizeFormInterest(value) || value;
    navigate({ pathname: "/", search: `?interest=${encodeURIComponent(interest)}`, hash: "#contact" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() * 0.8}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        });
        gsap.utils.toArray("[data-stage]").forEach((stage) => {
          gsap.fromTo(
            stage.querySelector("[data-parallax]"),
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: stage, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.from(stage.querySelector("[data-clip]"), {
            clipPath: "inset(10% 14% 10% 14% round 24px)",
            ease: "none",
            scrollTrigger: { trigger: stage, containerAnimation: tween, start: "left right", end: "left 30%", scrub: true },
          });
          gsap.from(stage.querySelectorAll("[data-verb] .s-word"), {
            yPercent: 110,
            ease: "expo.out",
            duration: 1.1,
            scrollTrigger: { trigger: stage, containerAnimation: tween, start: "left 70%", toggleActions: "play none none reverse" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="s-dark relative overflow-hidden lg:h-[100svh]">
      <div className="s-container flex items-end justify-between gap-6 pt-20 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:pt-[calc(var(--hero-header-offset)+1rem)]">
        <Eyebrow index="02">The system — four stages, one stack</Eyebrow>
        <div className="hidden h-px w-56 bg-[var(--s-line)] lg:block">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-[var(--s-signal)]" />
        </div>
      </div>

      <div
        ref={track}
        className="flex flex-col gap-20 pb-20 pt-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:py-0"
      >
        <div className="s-container shrink-0 lg:w-[40vw] lg:pl-[max(2.75rem,calc((100vw-1480px)/2+2.75rem))] lg:pr-0">
          <h2 className="s-display text-[clamp(3rem,7vw,8rem)] text-[var(--s-paper)]">
            From noise
            <br />
            to <span className="s-serif text-[var(--s-signal)]">answer.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-[var(--s-paper-dim)]">
            Search, content, social and web run as a single system. Each stage feeds the next.
            Click any stage to start there.
          </p>
          <div className="mt-8">
            <SignalButton to="/services" variant="ghost">All services</SignalButton>
          </div>
        </div>

        {STAGES.map((s, i) => (
          <article
            key={s.id}
            data-stage
            className="s-container relative shrink-0 lg:flex lg:h-full lg:w-[76vw] lg:items-center lg:gap-[3.5vw] lg:px-[3vw] xl:w-[70vw]"
          >
            <TiltButton
              onClick={() => go(s.contactValue)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:aspect-[16/10] lg:aspect-auto lg:h-[64vh] lg:w-[48%] lg:shrink-0"
              aria-label={`Start with ${s.title}`}
            >
              <div data-clip className="s-stage-media absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0% 0% 0% 0% round 20px)" }}>
                <StageVideo src={s.video} poster={s.poster} />
                <div className="s-stage-media__tint" />
                <div className="s-stage-media__sheen" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <span className="s-label absolute left-5 top-5 text-white/80">Stage {String(i + 1).padStart(2, "0")} / 04</span>
              <span className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="s-mono rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
                    {t}
                  </span>
                ))}
              </span>
            </TiltButton>

            <div className="mt-8 lg:mt-0 lg:flex-1">
              <p className="s-mono text-[clamp(5rem,12vw,13rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(241,240,235,0.18)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 data-verb className="s-display mt-4 text-[clamp(2.6rem,5.2vw,6rem)] text-[var(--s-paper)]">
                <span className="s-word-mask">
                  <span className="s-word">
                    {s.verb}
                    <span className="text-[var(--s-signal)]">.</span>
                  </span>
                </span>
              </h3>
              <p className="s-label mt-4 text-[var(--s-signal-hot)]">{s.title}</p>
              <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-[var(--s-paper-dim)]">{s.body}</p>
            </div>
          </article>
        ))}
        <div className="hidden shrink-0 lg:block lg:w-[8vw]" />
      </div>
    </section>
  );
}
