import { BUY_BUTTONS } from "../../data/stripeBuyButtons";
import StripeBuyButton from "./StripeBuyButton";

export default function BusinessUnpluggedPackages({ embedded = false }) {
  return (
    <div
      className={
        embedded
          ? "rounded-xl border border-slate-200 bg-slate-50/80 p-4"
          : "bu-packages rounded-xl border border-[#e8e0d4] bg-[#faf7f2]/90 p-4 sm:p-5"
      }
    >
      <div className="mb-4">
        <h3
          className={
            embedded
              ? "text-sm font-semibold text-slate-800"
              : "text-sm font-semibold text-[#202124]"
          }
        >
          Vendor &amp; Speaker Packages
        </h3>
        <p
          className={
            embedded
              ? "mt-1 text-xs leading-relaxed text-slate-600"
              : "mt-1 text-xs leading-relaxed text-[#5f6368]"
          }
        >
          Want to showcase your business or speak at the event? Secure your spot
          with a paid package below.
        </p>
      </div>

      <div className="space-y-5">
        <PackageOption
          embedded={embedded}
          title="Speaker"
          description="Reserve a speaking slot at Business Unplugged."
          buyButtonId={BUY_BUTTONS.speaker}
        />
        <PackageOption
          embedded={embedded}
          title="Vendor Table + Speaker"
          description="Includes a vendor table and a speaking slot."
          buyButtonId={BUY_BUTTONS.vendorTableSpeaker}
        />
      </div>
    </div>
  );
}

function PackageOption({ embedded, title, description, buyButtonId }) {
  return (
    <div
      className={
        embedded
          ? "border-t border-slate-200 pt-5 first:border-t-0 first:pt-0"
          : "border-t border-[#e8e0d4] pt-5 first:border-t-0 first:pt-0"
      }
    >
      <p
        className={
          embedded
            ? "text-sm font-medium text-slate-800"
            : "text-sm font-medium text-[#202124]"
        }
      >
        {title}
      </p>
      <p
        className={
          embedded
            ? "mt-0.5 text-xs text-slate-600"
            : "mt-0.5 text-xs text-[#5f6368]"
        }
      >
        {description}
      </p>
      <div className="mt-3">
        <StripeBuyButton buyButtonId={buyButtonId} />
      </div>
    </div>
  );
}
