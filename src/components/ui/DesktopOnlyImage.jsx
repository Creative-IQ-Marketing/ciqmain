/**
 * Desktop-only imagery: skips network fetch below lg via picture media.
 * Parent should use `hidden lg:block` so mobile layout gains no scroll height.
 */
const EMPTY =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";

export default function DesktopOnlyImage({
  src,
  alt = "",
  width,
  height,
  className = "",
  imgClassName = "h-full w-full object-cover",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 1px",
}) {
  return (
    <picture className={className}>
      <source
        media="(min-width: 1024px)"
        srcSet={src}
        type="image/webp"
        sizes={sizes}
      />
      <img
        src={EMPTY}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
