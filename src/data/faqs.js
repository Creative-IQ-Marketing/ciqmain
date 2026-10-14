/**
 * FAQ content — single source of truth for:
 *   • the visible FAQ sections (src/components/services/ServiceFaq.jsx)
 *   • FAQPage JSON-LD injected into prerendered HTML (scripts/prerender-routes.mjs)
 *   • the "Frequently asked questions" block in llms.txt (scripts/generate-seo-files.mjs)
 *
 * Plain ESM with no imports so Vite and Node can both read it.
 *
 * Writing rules (answer-engine friendly):
 *   1. The question is phrased the way a buyer or an AI assistant would ask it.
 *   2. The first sentence answers it on its own, with the entity named.
 *   3. Specifics (prices, counts, what's included) come from the live pages —
 *      update both when pricing changes.
 *   4. No guarantees about rankings or AI placement.
 */

export const FAQ_GROUPS = {
  seo: {
    id: "seo",
    title: "SEO & AI search (AEO)",
    blurb: "Search engines, AI assistants, and how we get you found in both.",
    href: "/services#website-seo",
    items: [
      {
        q: "What does SEO include at CreativeIQ?",
        a: "CreativeIQ's SEO comes in four tiers — Foundation ($299/mo), Growth ($499/mo), Authority ($799/mo), and Dominance ($999+/mo). Foundation fixes sitemaps, indexing, crawl errors, and speed. Growth adds Core Web Vitals and crawl-budget work. Authority adds schema and AI-search answers, and Dominance adds ongoing technical audits and entity mapping.",
        link: { label: "Compare the SEO tiers", href: "/services#growth-infra" },
      },
      {
        q: "What is answer engine optimization (AEO)?",
        a: "Answer engine optimization (AEO) is structuring your website so search features and AI assistants — Google's AI summaries, ChatGPT, Gemini, Perplexity — can lift a clear answer from your pages and cite you. It relies on question-and-answer content, schema markup such as FAQPage and Service, and consistent business details. CreativeIQ includes AEO in AEO Authority and in the Authority bundle.",
        link: { label: "See AEO Authority", href: "/services#growth-infra" },
      },
      {
        q: "How is AEO different from traditional SEO?",
        a: "Traditional SEO earns a ranking in a list of links; AEO earns a place inside the answer itself. The two share a foundation — fast, crawlable, well-structured pages — but AEO adds direct-answer writing, FAQ and entity schema, and clear expertise signals so an AI can quote you accurately.",
      },
      {
        q: "Can you guarantee my business will show up in ChatGPT or Google's AI answers?",
        a: "No one can honestly guarantee placement in AI answers, and CreativeIQ doesn't promise it. What we do is remove the reasons an AI would skip you: unclear services, missing schema, thin answers, inconsistent business details, and slow or uncrawlable pages. Then we track visibility so you can see what's changing.",
      },
      {
        q: "How do I know if my website is ready for AI search?",
        a: "Run the free CreativeIQ AI SEO audit. It reads your page title, meta description, headings, image alt text, links, sitemap, and robots.txt, then adds mobile-friendliness, page speed, and structured-data checks. The report is emailed to you, and each email can request two free reports per month.",
        link: { label: "Run the free audit", href: "/free-ai-seo-audit" },
      },
      {
        q: "How long does SEO take to show results?",
        a: "Most CreativeIQ clients see measurable movement in 60–90 days, and stronger compounding usually arrives in the 3–6 month window as technical fixes, content, and systems mature. Timelines vary with your starting point and competition, so we report on leading indicators — indexing, speed, and visibility — along the way.",
      },
      {
        q: "Does CreativeIQ build websites too?",
        a: "Yes. CreativeIQ builds fully coded websites and includes them in the growth bundles: Launch includes 1 page, Growth 2–3 pages, and Authority 4–6 pages. Additional pages are $999 each. Every site ships with the SEO foundations — indexing, speed, and mobile — already in place.",
        link: { label: "See the growth bundles", href: "/bundles" },
      },
    ],
  },

  social: {
    id: "social",
    title: "Social media",
    blurb: "Content, posting, and the free trial.",
    href: "/services#content-creation",
    items: [
      {
        q: "What social media packages does CreativeIQ offer?",
        a: "CreativeIQ offers five social packages: Social Starter ($569/mo, up to 2 platforms, 8 posts), The Classic ($999/mo, 12 posts with short-form video), The Refined ($1,469/mo, 15 posts), The Signature ($2,369/mo, up to 4 platforms, 18 posts), and Elite Social ($2,999/mo, up to 5 platforms, 27 posts with social SEO and DM flows).",
        link: { label: "Compare social packages", href: "/services#content-creation" },
      },
      {
        q: "Is there a free trial for social media management?",
        a: "Yes. CreativeIQ offers a 30-day free trial of the Social Starter package — professional posting, captions, and cross-platform formatting on up to 2 platforms. You can cancel anytime during the trial with no obligation, and it continues at $569/mo only if you choose to keep going.",
        link: { label: "Start the free trial", href: "/social-media-free-trial" },
      },
      {
        q: "Which social platforms do you manage?",
        a: "CreativeIQ manages Instagram, Facebook, LinkedIn, TikTok, and YouTube, alongside Google, email, websites, and CRM platforms. The mix follows where your buyers actually spend time and what converts, not a fixed template.",
      },
      {
        q: "Can I approve social posts before they go live?",
        a: "Yes. Approval can cover every asset, or a lighter cadence with CreativeIQ managing day-to-day. Either way, content stays aligned to your brand voice and visual identity.",
      },
      {
        q: "Does social media help SEO and AI search?",
        a: "Social posting doesn't directly rank a page, but consistent content builds branded searches, site traffic, and public mentions that search engines and AI assistants use to understand who you are. CreativeIQ ties social content back to your website and CRM so attention has somewhere to land.",
        link: { label: "How our SEO tiers work", href: "/services#growth-infra" },
      },
    ],
  },

  crm: {
    id: "crm",
    title: "CRM & automation",
    blurb: "Capturing, answering, and booking every lead.",
    href: "/services#crm-solutions",
    items: [
      {
        q: "What does CreativeIQ's CRM include and what does it cost?",
        a: "CreativeIQ's CRM comes in three plans: DIY CRM Starter ($97/mo) for lead capture, missed-call text-back, and a basic pipeline; CRM Pro ($397/mo) adding workflow automation, deal tracking, funnels, and review requests; and CRM Elite ($497/mo) adding AI agents, AI chat, drip campaigns, and client portals.",
        link: { label: "See the CRM plans", href: "/services#crm-solutions" },
      },
      {
        q: "What is a CRM, in plain terms?",
        a: "A CRM (customer relationship management system) is the one place that captures every lead, runs your follow-up, books appointments, and tracks revenue, so marketing spend isn't lost in a voicemail or an inbox. It turns visitors into contacts, contacts into conversations, and conversations into clients.",
        link: { label: "What is CRM?", href: "/services/what-is-crm" },
      },
      {
        q: "What is missed-call text-back?",
        a: "Missed-call text-back automatically sends a text to anyone who calls your business and doesn't get an answer, so the conversation continues instead of disappearing. It's included from the DIY CRM Starter plan and works alongside call tracking and recording.",
      },
      {
        q: "Does your CRM use AI?",
        a: "Yes, on CRM Elite. It includes AI agents that respond to and qualify leads, plus an AI chat widget on your website. CRM Pro and the Authority bundle add AI chat and automated review generation as you move up.",
      },
      {
        q: "Can the CRM help me get more Google reviews?",
        a: "Yes. CRM Pro sends Google Business Profile review requests and monitors them, and CRM Elite automates review generation. Reviews are a trust signal for both customers and search, so they feed your SEO as well.",
        link: { label: "Why reviews matter for SEO", href: "/services#growth-infra" },
      },
    ],
  },

  consulting: {
    id: "consulting",
    title: "Consulting",
    blurb: "Strategy time without a full retainer.",
    href: "/services#consulting",
    items: [
      {
        q: "What consulting options does CreativeIQ offer?",
        a: "CreativeIQ offers three consulting options: Strategy Sessions ($699/year for 6 one-hour sessions), Implementation Support ($999/year for 12 one-hour sessions with more hands-on guidance), and Unlimited Access ($499/month for ongoing strategic access).",
        link: { label: "See consulting options", href: "/services#consulting" },
      },
      {
        q: "Who is consulting a good fit for?",
        a: "Consulting suits teams that want a sounding board for planning, content, and execution without committing to a full retainer — for example, marketers handling their own campaigns who want expert review and direction.",
      },
    ],
  },

  other: {
    id: "other",
    title: "Brand identity & paid advertising",
    blurb: "Brand kits and ad management.",
    href: "/services",
    items: [
      {
        q: "How much does paid advertising management cost?",
        a: "CreativeIQ's paid advertising starts from $599 for setup, then $299/mo for management. That covers campaign setup, audience targeting, ad creative optimization, conversion tracking, and ongoing monitoring. Ad spend itself is billed separately.",
      },
      {
        q: "What does the Brand Identity package include?",
        a: "Brand Identity is a one-time $550 package: custom logo design, brand discovery and creative direction, multiple initial concepts, professional revisions, and final high-resolution, vector, and social-ready files for web and print.",
      },
    ],
  },

  bundles: {
    id: "bundles",
    title: "Growth bundles",
    blurb: "Launch, Growth, and Authority.",
    href: "/bundles",
    items: [
      {
        q: "What are the CreativeIQ growth bundles?",
        a: "The CreativeIQ growth bundles are three all-in-one systems combining website, SEO, social, and CRM: Launch at $1,198/mo, Growth at $1,999/mo, and Authority at $2,999/mo. Each is priced below buying the same services separately.",
      },
      {
        q: "What's the difference between Launch, Growth, and Authority?",
        a: "Launch ($1,198/mo) gets you found with a 1-page site, SEO setup, 8 social posts, and a starter CRM. Growth ($1,999/mo) adds 2–3 pages, Core Web Vitals, 12+ posts, and CRM funnels and booking. Authority ($2,999/mo) adds 4–6 pages, schema and AEO, and CRM with AI chat and reviews.",
      },
      {
        q: "How much do the bundles save compared to buying separately?",
        a: "Launch saves $154/mo (a $1,332/mo value), Growth saves $295/mo ($2,294/mo value), and Authority saves $498/mo ($3,497/mo value). Launch is a 6-month structure.",
      },
      {
        q: "Which bundle includes AEO and AI-search optimization?",
        a: "The Authority bundle ($2,999/mo) includes advanced SEO with schema, AEO, and technical optimization, so your pages are structured for both Google and AI assistants. Growth includes Core Web Vitals and crawl fixes; Launch covers indexing, speed, and mobile.",
        link: { label: "Learn about AEO and SEO tiers", href: "/services#growth-infra" },
      },
      {
        q: "Can I add more website pages to a bundle?",
        a: "Yes. Additional coded pages are $999 each on any bundle.",
      },
    ],
  },

  "crm-basics": {
    id: "crm-basics",
    title: "CRM basics",
    blurb: "What a CRM does and whether you need one.",
    href: "/services#crm-solutions",
    items: [
      {
        q: "What does CRM stand for?",
        a: "CRM stands for Customer Relationship Management. In practice it is the operating system that captures leads, runs follow-up, books appointments, and tracks revenue.",
      },
      {
        q: "Do I need a CRM if I already run ads or SEO?",
        a: "Yes — traffic without a system becomes a brochure. A CRM turns visitors into contacts and contacts into booked conversations, so the ads and SEO you're paying for don't leak leads between a form, a missed call, and an inbox.",
        link: { label: "See how SEO and CRM work together", href: "/bundles" },
      },
      {
        q: "How much is CreativeIQ's CRM?",
        a: "CreativeIQ's CRM starts at $97/mo (DIY CRM Starter), with CRM Pro at $397/mo and CRM Elite at $497/mo. The Launch, Growth, and Authority bundles include CRM alongside your website, SEO, and social.",
        link: { label: "View CRM packages", href: "/services#crm-solutions" },
      },
      {
        q: "What is missed-call text-back?",
        a: "Missed-call text-back automatically texts anyone who calls and isn't answered, so the lead keeps moving instead of ending in voicemail. It's included from the Starter plan.",
      },
    ],
  },

  trial: {
    id: "trial",
    title: "The 30-day social trial",
    blurb: "What you get, what it costs afterward, how to leave.",
    href: "/social-media-free-trial",
    items: [
      {
        q: "What's included in the 30-day social media free trial?",
        a: "The trial is the full Social Starter package: professional posting, captions and hashtags, and cross-platform formatting on up to 2 platforms, at 8 posts per month.",
      },
      {
        q: "What does it cost after the free trial?",
        a: "After 30 days, Social Starter is $569/mo if you choose to continue. If you don't, you owe nothing.",
      },
      {
        q: "Can I cancel during the trial?",
        a: "Yes. You can cancel anytime during the 30 days with no obligation.",
      },
      {
        q: "Who is Social Starter best for?",
        a: "Social Starter is built for businesses that need consistency before growth — a steady, professional presence on up to 2 platforms. When you're ready for more volume or platforms, The Classic, The Refined, and larger packages build on it.",
        link: { label: "Compare all social packages", href: "/services#content-creation" },
      },
    ],
  },

  audit: {
    id: "audit",
    title: "The free audit",
    blurb: "What it checks and how you get it.",
    href: "/free-ai-seo-audit",
    items: [
      {
        q: "What does the free AI SEO audit check?",
        a: "The CreativeIQ audit crawls your page for its title, meta description, headings, image alt text, and links, checks your sitemap and robots.txt, and adds page-speed, mobile-friendliness, and structured-data results. An AI-written report then explains what to fix first.",
        link: { label: "How CreativeIQ approaches SEO", href: "/services#growth-infra" },
      },
      {
        q: "What do I need to submit?",
        a: "Your name, email, and the website URL. The request takes less than a minute.",
      },
      {
        q: "Why confirm before the report is finished?",
        a: "We accept the request first, then process asynchronously so you are not waiting on the page. The finished report arrives by email.",
      },
      {
        q: "How many free reports can I request?",
        a: "Two free reports per email each month. Need more? Contact us for ongoing access.",
      },
      {
        q: "Will the audit tell me if I'm ready for AI search?",
        a: "It checks the signals AI assistants lean on — clear page titles and descriptions, heading structure, and structured data — and flags what's missing. It's a starting point; our AEO Authority tier turns the findings into schema and answer-ready content.",
        link: { label: "See AEO Authority", href: "/services#growth-infra" },
      },
    ],
  },
};

/** Which FAQ groups appear on which page, in order. Keys are route paths. */
export const PAGE_FAQS = {
  "/services": ["seo", "social", "crm", "consulting", "other"],
  "/bundles": ["bundles"],
  "/services/what-is-crm": ["crm-basics"],
  "/social-media-free-trial": ["trial"],
  "/free-ai-seo-audit": ["audit"],
};

export function faqGroupsForPage(path) {
  return (PAGE_FAQS[path] || []).map((id) => FAQ_GROUPS[id]).filter(Boolean);
}

export function faqItemsForPage(path) {
  return faqGroupsForPage(path).flatMap((g) => g.items);
}

/** Highest-value cross-site answers, surfaced in llms.txt. */
export const LLMS_FAQ_PICKS = [
  ["seo", 0],
  ["seo", 1],
  ["seo", 4],
  ["social", 1],
  ["crm", 0],
  ["bundles", 0],
  ["bundles", 3],
];
