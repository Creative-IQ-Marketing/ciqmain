import { useState } from "react";
import FadeUp from "../primitives/FadeUp";

export default function Booking() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <FadeUp
      as="section"
      id="booking"
      className="relative overflow-hidden bg-white px-5 pb-20 pt-[calc(var(--hero-header-offset)+2rem)] sm:px-6 sm:pb-24 lg:px-10 lg:pb-28"
    >
      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3B6FF0]">
            Book a call
          </p>
          <h1 className="font-sans text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-[-0.03em] text-[#0f0f0f]">
            Schedule your{" "}
            <span className="text-[#3B6FF0]">strategy call</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-[#5c5c5c]">
            Select a time that works for you. We will discuss your growth goals
            and map out a plan to achieve them.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_20px_48px_-20px_rgba(0,0,0,0.12)]">
          {!iframeLoaded && (
            <div className="absolute inset-0 z-20 flex min-h-[600px] flex-col items-center justify-center bg-white">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4d4d4] border-t-[#3B6FF0]" />
              <p className="mt-4 font-sans text-sm text-[#737373]">
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
              onLoad={() => setIframeLoaded(true)}
              title="Book a Strategy Call"
            />
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
