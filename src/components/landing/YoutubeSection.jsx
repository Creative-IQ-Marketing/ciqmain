import FadeUp from "../primitives/FadeUp";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@CreativeIQdigitalmarketing";
const FEATURED_VIDEO_ID = "cjWgPk4OL90";

export default function YoutubeSection() {
  return (
    <FadeUp
      as="section"
      id="youtube"
      className="overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-12 px-5 sm:px-6 lg:gap-16 lg:px-10">
        <div className="w-full lg:w-[min(100%,380px)] lg:shrink-0">
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            YouTube channel
          </p>
          <h2 className="font-sans text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0f0f0f]">
            We share what
            <br />
            <span className="text-[#3B6FF0]">actually works.</span>
          </h2>
          <p className="mt-5 max-w-sm font-sans text-[15px] leading-relaxed text-[#5c5c5c]">
            Free tactics, real case studies, and marketing breakdowns — straight
            from our team.
          </p>
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-sans text-sm font-medium text-[#252525] underline-offset-4 transition hover:underline"
          >
            Visit channel
          </a>
        </div>

        <div className="min-w-[280px] flex-1 overflow-hidden rounded-[22px] border border-black/[0.06] bg-black">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
              title="CreativeIQ — featured video"
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
