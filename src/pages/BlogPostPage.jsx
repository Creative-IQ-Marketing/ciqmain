import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Link2 } from "lucide-react";
import SEO from "../components/SEO";
import NotFoundPage from "./NotFoundPage";
import {
  BLOG_URL,
  categoryCounts,
  formatDate,
  loadIndex,
  loadPost,
  optimizeBodyImages,
  peekIndex,
  peekPost,
  primaryCategory,
} from "../services/blog";
import { ArticleCta, PostImage, PostMeta, QueryChip } from "../components/blog/BlogParts";
import { trackButtonClick } from "../services/analytics";
import logo from "../assets/mainLogo.webp";

const ease = [0.22, 1, 0.36, 1];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => peekPost(slug));
  const [index, setIndex] = useState(() => peekIndex() || []);
  const [status, setStatus] = useState(() => (peekPost(slug) ? "ready" : "loading"));

  useEffect(() => {
    let alive = true;
    const cached = peekPost(slug);
    setPost(cached);
    setStatus(cached ? "ready" : "loading");
    loadPost(slug).then((p) => {
      if (!alive) return;
      setPost(p);
      setStatus(p ? "ready" : "missing");
    });
    loadIndex().then((list) => alive && setIndex(list));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (status === "missing") return <NotFoundPage />;
  if (!post) return <div className="min-h-[80vh] bg-white" aria-busy="true" />;
  return <Article post={post} index={index} />;
}

function Article({ post, index }) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const articleRef = useRef(null);
  const counts = useMemo(() => categoryCounts(index.length ? index : [post]), [index, post]);
  const category = primaryCategory(post, counts);
  const url = `${BLOG_URL}/${post.slug}`;
  const html = useMemo(() => optimizeBodyImages(post.html), [post.html]);
  const updated =
    post.updatedAt &&
    new Date(post.updatedAt) - new Date(post.publishedAt) > 1000 * 60 * 60 * 24 * 2;

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0.25, 1], [1, 0.94]);
  const imgY = useTransform(scrollYProgress, [0.25, 1], ["0%", "5%"]);

  const related = useMemo(() => {
    const others = index.filter((p) => p.slug !== post.slug);
    const score = (p) =>
      p.categories.filter((c) => post.categories.some((pc) => pc.slug === c.slug)).length;
    return [...others].sort((a, b) => score(b) - score(a)).slice(0, 3);
  }, [index, post]);

  // Keep internal links inside the SPA.
  function onArticleClick(e) {
    const a = e.target.closest("a");
    const href = a?.getAttribute("href");
    if (!href || !href.startsWith("/") || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigate(href);
  }

  return (
    <>
      <SEO
        title={`${post.title} | CreativeIQ Blog`}
        description={post.description}
        keywords={[...(post.tags || []), ...post.categories.map((c) => c.label), "CreativeIQ"].join(", ")}
        canonical={url}
        ogImage={post.image || "/og-image.jpg"}
        ogImageAlt={post.imageAlt || post.title}
        pageType="article"
      />

      <article>
        <header className="bg-[var(--c-base)] pt-[calc(var(--hero-header-offset)+1.75rem)]">
          <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
            <nav aria-label="Breadcrumb" className="text-[0.8125rem] font-medium text-[var(--c-text-muted)]">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link to="/" className="transition hover:text-[var(--c-ink)]">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link to="/blog" className="transition hover:text-[var(--c-ink)]">Blog</Link>
                </li>
                {category ? (
                  <>
                    <li aria-hidden>/</li>
                    <li>
                      <Link
                        to={`/blog?topic=${category.slug}`}
                        className="transition hover:text-[var(--c-ink)]"
                      >
                        {category.label}
                      </Link>
                    </li>
                  </>
                ) : null}
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mt-8 max-w-4xl"
            >
              <PostMeta post={post} category={category} />
              <h1
                className="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-[var(--c-ink)] text-balance"
              >
                {post.title}
              </h1>
              <p
                className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-[var(--c-text-secondary)] text-pretty sm:text-lg"
              >
                {post.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-8 flex flex-col gap-6 border-t border-[var(--c-border)] pt-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt=""
                  width="40"
                  height="40"
                  className="h-10 w-10 rounded-full bg-[var(--c-ink)] object-contain"
                />
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-[var(--c-ink)]">
                    CreativeIQ Team
                  </p>
                  <p className="mt-0.5 text-[var(--c-text-muted)]">
                    {updated ? (
                      <>
                        Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                      </>
                    ) : (
                      "San Antonio, TX"
                    )}
                  </p>
                </div>
              </div>
              {post.tags?.length ? (
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <span className="mr-1 text-xs font-medium text-[var(--c-text-muted)]">
                    This article answers
                  </span>
                  {post.tags.slice(0, 3).map((t) => (
                    <QueryChip key={t} size="sm">{t}</QueryChip>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </div>
        </header>

        {post.image ? (
          <div ref={heroRef} className="bg-[var(--c-base)] pt-10">
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
              {/* GHL covers are often graphics with words in them — never crop: contain over a blurred fill. */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--c-surface-2)] shadow-[var(--shadow-frame)] lg:aspect-[2/1]">
                <PostImage
                  post={post}
                  sizes="10vw"
                  className="absolute inset-0 scale-110 opacity-60 blur-2xl saturate-150"
                />
                <motion.div
                  style={reduce ? undefined : { scale: imgScale, y: imgY }}
                  className="absolute inset-0"
                >
                  <PostImage
                    post={post}
                    eager
                    sizes="(min-width:1320px) 1240px, 100vw"
                    className="!object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-[var(--c-base)] py-[var(--section-pad)]">
          <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-[var(--container-pad)] lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[16rem_minmax(0,44rem)_1fr]">
            <Toc toc={post.toc} articleRef={articleRef} />

            <div className="min-w-0">
              <div
                ref={articleRef}
                className="ciq-prose"
                onClick={onArticleClick}
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <ArticleCta />

              <footer className="mt-10 border-t border-[var(--c-border)] pt-8">
                {post.categories.length ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-xs font-medium text-[var(--c-text-muted)]">Topics</span>
                    {post.categories.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/blog?topic=${c.slug}`}
                        className="rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] px-3 py-1 text-xs font-semibold text-[var(--c-text-secondary)] transition hover:border-[var(--c-ink)] hover:text-[var(--c-ink)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
                <Share url={url} title={post.title} />
                <Link
                  to="/blog"
                  className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--c-ink)] transition hover:text-[var(--c-accent)]"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden /> All articles
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </article>

      {related.length ? <Related posts={related} counts={counts} /> : null}
    </>
  );
}

/** Sticky contents with the active section highlighted. Mobile: collapsible. */
function Toc({ toc, articleRef }) {
  const [active, setActive] = useState(toc?.[0]?.id);

  useEffect(() => {
    const root = articleRef.current;
    if (!root || !toc?.length) return;
    const heads = toc.map((t) => root.querySelector(`#${CSS.escape(t.id)}`)).filter(Boolean);
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = heads[0]?.id;
      for (const h of heads) if (h.getBoundingClientRect().top <= line) current = h.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc, articleRef]);

  if (!toc?.length || toc.length < 2) return <div className="hidden lg:block" />;

  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const items = toc.map((t) => (
    <li key={t.id}>
      <a
        href={`#${t.id}`}
        onClick={(e) => go(e, t.id)}
        className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.8125rem] leading-snug transition-colors ${
          active === t.id
            ? "border-[var(--c-accent)] font-semibold text-[var(--c-ink)]"
            : "border-transparent text-[var(--c-text-muted)] hover:text-[var(--c-ink)]"
        }`}
      >
        {t.text}
      </a>
    </li>
  ));

  return (
    <aside aria-label="On this page">
      <details className="group rounded-[var(--radius-control)] border border-[var(--c-border-strong)] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-[var(--c-ink)]">
          On this page
          <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden />
        </summary>
        <ol className="mx-4 mb-4 border-l border-[var(--c-border)]">{items}</ol>
      </details>
      <div className="sticky top-[calc(var(--header-bar-height)+2rem)] hidden lg:block">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--c-text-muted)]">
          On this page
        </p>
        <ol className="max-h-[70vh] overflow-y-auto border-l border-[var(--c-border)]">{items}</ol>
      </div>
    </aside>
  );
}

function Share({ url, title }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { label: "Email", href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium text-[var(--c-text-muted)]">Share</span>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          });
          trackButtonClick("Copy link", "blog_share", "Blog");
        }}
        className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--c-surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--c-ink)] transition hover:bg-[var(--c-accent-dim)]"
      >
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Link2 className="h-3.5 w-3.5" aria-hidden />}
        {copied ? "Copied" : "Copy link"}
      </button>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackButtonClick(l.label, "blog_share", "Blog")}
          className="rounded-[var(--radius-pill)] bg-[var(--c-surface-2)] px-3 py-1.5 text-xs font-semibold text-[var(--c-ink)] transition hover:bg-[var(--c-accent-dim)]"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

function Related({ posts, counts }) {
  return (
    <section aria-label="Keep reading" className="border-t border-[var(--c-border)] bg-[var(--c-cream)] py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold tracking-[-0.035em] text-[var(--c-ink)]">
            Keep reading
          </h2>
          <Link to="/blog" className="hidden items-center gap-2 text-sm font-semibold text-[var(--c-ink)] transition hover:text-[var(--c-accent)] sm:inline-flex">
            All articles <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              <Link to={`/blog/${p.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--c-surface-2)]">
                  <PostImage
                    post={p}
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </div>
                <PostMeta post={p} category={primaryCategory(p, counts)} className="mt-4" />
                <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.02em] text-[var(--c-ink)] text-balance transition-colors group-hover:text-[var(--c-accent)]">
                  {p.title}
                </h3>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
