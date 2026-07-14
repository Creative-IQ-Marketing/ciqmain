import { useState } from "react";
import FadeUp from "../primitives/FadeUp";

export default function Booking() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <FadeUp
      as="section"
      id="booking"
      className="relative overflow-hidden bg-[var(--c-base)] px-5 pb-16 pt-[calc(var(--hero-header-offset)+1.75rem)] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24"
    >
      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h1 className="font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-[-0.035em] text-[var(--c-ink)]">
            Schedule your{" "}
            <span className="text-[var(--c-accent)]">strategy call</span>
          </h1>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-[var(--c-text-secondary)]">
            Pick a time that works. We will discuss your goals and map a plan
            across SEO, web, content, and systems.
          </p>
        </div>

        <div className="relative mx-auto overflow-hidden border border-[var(--c-border)] bg-white">
          {!iframeLoaded && (
            <div className="absolute inset-0 z-20 flex min-h-[600px] flex-col items-center justify-center bg-white">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#e5e5e5] border-t-[var(--c-accent)]" />
              <p className="mt-4 font-sans text-sm text-[var(--c-text-muted)]">
                Loading calendar…
              </p>
            </div>
          )}

          <div className="min-h-[800px] w-full bg-white md:min-h-[700px]">
            <iframe
              src="https://link.creativeiq.marketing/widget/booking/ZeUt9pxYewU5fAJonRj2"
              className="h-full min-h-[800px] w-full border-0"
              scrolling="auto"
              id="ghl-booking-widget"
              title="Book a strategy call"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
