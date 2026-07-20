export const HEADER_SCROLL_OFFSET = 120;

export function scrollToSection(id, offset = HEADER_SCROLL_OFFSET) {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  return true;
}

export function scrollToHashFromHref(href, pathname, navigate, offset = HEADER_SCROLL_OFFSET) {
  if (!href.includes("#")) {
    navigate(href);
    return;
  }

  const [path, hash] = href.split("#");
  const targetPath = path || pathname;

  const scrollToHash = () => scrollToSection(hash, offset);

  if (pathname === targetPath) {
    // Update hash so selective views (e.g. Services lanes) can react.
    // Falling back to scroll if the target id already exists in the DOM.
    if (window.location.hash !== `#${hash}`) {
      navigate(`${targetPath}#${hash}`);
    } else {
      scrollToHash();
    }
    return;
  }

  navigate(`${targetPath}#${hash}`);
  window.setTimeout(scrollToHash, 350);
}
