import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import { blogImage, blogSrcSet, formatDate } from "../../services/blog";
import { trackButtonClick } from "../../services/analytics";

/**
 * The blog's one idea: every article answers a search. Each post shows the
 * queries it is written to rank for, styled like a search field.
 */
export function QueryChip({ children, size = "md", onClick }) {
  const cls = `inline-flex max-w-full items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] bg-white text-[var(--c-text-secondary)] ${
    size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-[0.8125rem]"
  }`;
  const inner = (
    <>
      <Search className="h-3.5 w-3.5 shrink-0 text-[var(--c-accent)]" aria-hidden />
      <span className="truncate">{children}</span>
    </>
  );
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${cls} transition hover:border-[var(--c-border-bright)] hover:text-[var(--c-ink)]`}
      >
        {inner}
      </button>
    );
  }
  return <span className={cls}>{inner}</span>;
}

export function PostMeta({ post, category, className = "" }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] font-medium text-[var(--c-text-muted)] ${className}`}
    >
      {category ? (
        <span className="font-semibold text-[var(--c-accent)]">{category.label}</span>
      ) : null}
      {category ? <span aria-hidden>·</span> : null}
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span>{post.readMinutes} min read</span>
    </p>
  );
}

export function PostImage({ post, className = "", sizes, eager = false }) {
  if (!post.image) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--c-surface-2)] text-sm font-semibold text-[var(--c-text-muted)] ${className}`}
        aria-hidden
      >
        CreativeIQ
      </div>
    );
  }
  return (
    <img
      src={blogImage(post.image, 1200)}
      srcSet={blogSrcSet(post.image)}
      alt={post.imageAlt || post.title}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      sizes={sizes}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/** End-of-article prompt — the site's left-rule card, not another dark band. */
export function ArticleCta({ source = "blog_post" }) {
  return (
    <aside className="mt-14 rounded-r-[var(--radius-card)] border-l-[3px] border-[var(--c-accent)] bg-[var(--c-surface-2)] px-6 py-7 sm:px-8">
      <p className="text-sm font-medium text-[var(--c-text-muted)]">Put it to work</p>
      <p className="mt-2 text-[1.35rem] font-extrabold leading-snug tracking-[-0.03em] text-[var(--c-ink)] text-balance">
        Reading is step one. We build the system — website, CRM, and SEO
        working as one.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/book"
          onClick={() => trackButtonClick("Book a call", source, "Blog CTA")}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--c-cta)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--c-cta-hover)]"
        >
          Book a call <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          to="/free-ai-seo-audit"
          onClick={() => trackButtonClick("Free SEO audit", source, "Blog CTA")}
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] bg-white px-5 text-sm font-semibold text-[var(--c-ink)] transition hover:border-[var(--c-ink)]"
        >
          Free SEO audit
        </Link>
      </div>
    </aside>
  );
}
