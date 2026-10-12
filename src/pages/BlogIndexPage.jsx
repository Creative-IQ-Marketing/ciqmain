import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import SEO from "../components/SEO";
import {
  BLOG_URL,
  categoryCounts,
  loadIndex,
  loadLiveIndex,
  peekIndex,
  primaryCategory,
} from "../services/blog";
import { PostImage, PostMeta, QueryChip } from "../components/blog/BlogParts";

const ease = [0.22, 1, 0.36, 1];
const PAGE = 12;

function matches(post, q) {
  if (!q) return true;
  const hay = [
    post.title,
    post.description,
    ...(post.tags || []),
    ...(post.categories || []).map((c) => c.label),
  ]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

export default function BlogIndexPage() {
  const [posts, setPosts] = useState(() => peekIndex() || []);
  const [ready, setReady] = useState(() => Boolean(peekIndex()));
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [visible, setVisible] = useState(PAGE);
  const topic = params.get("topic") || "all";

  useEffect(() => {
    let alive = true;
    loadIndex().then((list) => {
      if (!alive) return;
      setPosts(list);
      setReady(true);
      loadLiveIndex(list).then((merged) => alive && merged && setPosts(merged));
    });
    return () => {
      alive = false;
    };
  }, []);

  const counts = useMemo(() => categoryCounts(posts), [posts]);
  const topics = useMemo(() => {
    const seen = new Map();
    for (const p of posts) for (const c of p.categories) seen.set(c.slug, c);
    return [...seen.values()].sort((a, b) => (counts[b.slug] || 0) - (counts[a.slug] || 0));
  }, [posts, counts]);

  const popularQueries = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const p of posts) {
      const tag = p.tags?.[0];
      if (tag && tag.length < 36 && !seen.has(tag.toLowerCase())) {
        seen.add(tag.toLowerCase());
        out.push(tag);
      }
    }
    return out.slice(0, 5);
  }, [posts]);

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (topic === "all" || p.categories.some((c) => c.slug === topic)) &&
          matches(p, query.trim()),
      ),
    [posts, topic, query],
  );

  const browsing = topic === "all" && !query.trim();
  const featured = browsing ? filtered[0] : null;
  const list = browsing ? filtered.slice(1) : filtered;

  function setTopic(slug) {
    const next = new URLSearchParams(params);
    if (slug === "all") next.delete("topic");
    else next.set("topic", slug);
    setParams(next, { replace: true, preventScrollReset: true });
    setVisible(PAGE);
  }

  function runQuery(q) {
    setQuery(q);
    setVisible(PAGE);
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    setParams(next, { replace: true, preventScrollReset: true });
  }

  return (
    <>
      <SEO
        title="Blog | Websites, CRM & SEO for Texas Businesses | CreativeIQ"
        description="Straight answers on websites, CRM automation, local SEO, paid ads, and social media — written by the CreativeIQ team in San Antonio for businesses that want to be found."
        keywords="CreativeIQ blog, digital marketing blog San Antonio, local SEO Texas, CRM automation tips, missed call text back, Google Local Service Ads, PPC strategy, website conversion, GoHighLevel CRM"
        canonical={BLOG_URL}
        ogImageAlt="CreativeIQ Blog — websites, CRM and SEO insights"
      />

      <header className="relative border-b border-[var(--c-border)] bg-[var(--c-base)] pb-12 pt-[calc(var(--hero-header-offset)+2.5rem)] sm:pb-14">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-[var(--c-text-muted)]">CreativeIQ Blog</p>
            <h1 className="mt-3 text-[clamp(2.15rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--c-ink)] text-balance">
              Straight answers for businesses
              <span className="text-[var(--c-accent)]"> that want to be found.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--c-text-secondary)] text-pretty">
              Websites, CRM, local SEO, ads, and social — what works for San
              Antonio and Texas businesses, from the team that builds it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="mt-9 max-w-2xl"
          >
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative"
            >
              <label htmlFor="blog-search" className="sr-only">
                Search the blog
              </label>
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--c-accent)]"
                aria-hidden
              />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => runQuery(e.target.value)}
                placeholder={`Search ${posts.length || ""} articles`}
                autoComplete="off"
                className="h-14 w-full rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] bg-white pl-13 pr-12 text-base text-[var(--c-ink)] shadow-[var(--shadow-soft)] outline-none transition placeholder:text-[var(--c-text-muted)] focus:border-[var(--c-accent)] focus:ring-4 focus:ring-[var(--c-accent-dim)] [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => runQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[var(--c-text-muted)] transition hover:bg-[var(--c-surface-2)] hover:text-[var(--c-ink)]"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              ) : null}
            </form>
            {popularQueries.length ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium text-[var(--c-text-muted)]">
                  People search
                </span>
                {popularQueries.map((q) => (
                  <QueryChip key={q} size="sm" onClick={() => runQuery(q)}>
                    {q}
                  </QueryChip>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </header>

      {featured ? <FeaturedPost post={featured} counts={counts} /> : null}

      <section
        id="articles"
        aria-label="Articles"
        className="scroll-mt-24 bg-[var(--c-base)] py-[var(--section-pad)]"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
          <div className="flex flex-col gap-5 border-b border-[var(--c-border)] pb-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold tracking-[-0.035em] text-[var(--c-ink)]">
              {query.trim()
                ? `${filtered.length} result${filtered.length === 1 ? "" : "s"} for “${query.trim()}”`
                : topic === "all"
                  ? "Latest articles"
                  : topics.find((t) => t.slug === topic)?.label || "Articles"}
            </h2>
            <div
              className="-mx-[var(--container-pad)] flex gap-2 overflow-x-auto px-[var(--container-pad)] pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0"
              role="tablist"
              aria-label="Filter by topic"
            >
              {[{ slug: "all", label: "All" }, ...topics].map((t) => {
                const on = topic === t.slug;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTopic(t.slug)}
                    className={`shrink-0 rounded-[var(--radius-pill)] border px-3.5 py-1.5 text-[0.8125rem] font-semibold transition ${
                      on
                        ? "border-[var(--c-ink)] bg-[var(--c-ink)] text-white"
                        : "border-[var(--c-border-strong)] text-[var(--c-text-secondary)] hover:border-[var(--c-ink)] hover:text-[var(--c-ink)]"
                    }`}
                  >
                    {t.label}
                    {t.slug !== "all" ? (
                      <span className={`ml-1.5 tabular-nums ${on ? "text-white/60" : "text-[var(--c-text-muted)]"}`}>
                        {counts[t.slug]}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {ready && !list.length ? (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-[var(--c-ink)]">No articles match that yet.</p>
              <p className="mt-2 text-[var(--c-text-secondary)]">
                Try a broader search — or ask us directly.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    runQuery("");
                    setTopic("all");
                  }}
                  className="rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] px-5 py-2.5 text-sm font-semibold"
                >
                  Show all articles
                </button>
                <Link
                  to="/contact"
                  className="rounded-[var(--radius-pill)] bg-[var(--c-cta)] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Ask CreativeIQ
                </Link>
              </div>
            </div>
          ) : (
            <RankedList
              posts={list.slice(0, visible)}
              offset={browsing ? 1 : 0}
              counts={counts}
              listKey={`${topic}|${query}`}
            />
          )}

          {list.length > visible ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE)}
                className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--c-border-strong)] px-6 text-[0.95rem] font-semibold text-[var(--c-ink)] transition hover:border-[var(--c-ink)]"
              >
                Show more articles
                <span className="tabular-nums text-[var(--c-text-muted)]">{list.length - visible}</span>
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function FeaturedPost({ post, counts }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const category = primaryCategory(post, counts);

  return (
    <section ref={ref} aria-label="Latest article" className="bg-[var(--c-cream)] py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        <Link
          to={`/blog/${post.slug}`}
          className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--c-surface-2)] shadow-[var(--shadow-frame)] lg:col-span-7">
            <motion.div style={reduce ? undefined : { scale, y }} className="absolute inset-[-6%]">
              <PostImage post={post} eager sizes="(min-width:1024px) 58vw, 100vw" />
            </motion.div>
            <span className="absolute left-4 top-4 rounded-[var(--radius-pill)] bg-white/95 px-3 py-1 text-xs font-bold text-[var(--c-ink)] backdrop-blur">
              Latest
            </span>
          </div>
          <div className="lg:col-span-5">
            <PostMeta post={post} category={category} />
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-[var(--c-ink)] text-balance transition-colors group-hover:text-[var(--c-accent)]">
              {post.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--c-text-secondary)]">
              {post.description}
            </p>
            {post.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((t) => (
                  <QueryChip key={t} size="sm">
                    {t}
                  </QueryChip>
                ))}
              </div>
            ) : null}
            <span className="mt-7 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[var(--c-ink)]">
              Read the article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/**
 * Results list. A rail beside the rank numbers fills as you scroll through it —
 * the list "ranks up" as you read down.
 */
function RankedList({ posts, offset, counts, listKey }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute bottom-0 left-[1.15rem] top-0 hidden w-px bg-[var(--c-border)] md:block"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-top bg-[var(--c-accent)]"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />
      </div>
      <ol key={listKey} className="divide-y divide-[var(--c-border)]">
        {posts.map((post, i) => (
          <PostRow key={post.slug} post={post} rank={i + 1 + offset} counts={counts} />
        ))}
      </ol>
    </div>
  );
}

function PostRow({ post, rank, counts }) {
  const category = primaryCategory(post, counts);
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group grid grid-cols-1 gap-5 py-8 md:grid-cols-[2.5rem_1fr_15rem] md:gap-8 lg:grid-cols-[2.5rem_1fr_17rem]"
      >
        <span
          className="relative z-[1] hidden h-fit w-fit bg-[var(--c-base)] py-1 text-sm font-bold tabular-nums text-[var(--c-text-muted)] transition-colors group-hover:text-[var(--c-accent)] md:block"
          aria-hidden
        >
          {String(rank).padStart(2, "0")}
        </span>
        <div className="order-2 min-w-0 md:order-none">
          <PostMeta post={post} category={category} />
          <h3 className="mt-2.5 text-[clamp(1.2rem,2vw,1.5rem)] font-bold leading-[1.25] tracking-[-0.025em] text-[var(--c-ink)] text-balance transition-colors group-hover:text-[var(--c-accent)]">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--c-text-secondary)]">
            {post.description}
          </p>
          {post.tags?.[0] ? (
            <div className="mt-4">
              <QueryChip size="sm">{post.tags[0]}</QueryChip>
            </div>
          ) : null}
        </div>
        <div className="order-1 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--c-surface-2)] md:order-none">
          <PostImage
            post={post}
            sizes="(min-width:1024px) 17rem, (min-width:768px) 15rem, 100vw"
            className="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        </div>
      </Link>
    </motion.li>
  );
}
