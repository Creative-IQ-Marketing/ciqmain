export const SITE_URL = "https://creativeiqmarketing.com";
export const SITE_NAME = "CreativeIQ Marketing";
export const LEGAL_NAME = "CreativeIQ Marketing";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOGO = `${SITE_URL}/logo.png`;
export const PHONE = "+1 (830) 355-6028";
export const PHONE_TEL = "+18303556028";
export const EMAIL = "CiQ@creativeiq.marketing";
export const ORG_TYPE = "ProfessionalService";
export const AREA_SERVED = "San Antonio, Texas";

function crumbs(...parts) {
  return parts.map(([label, href]) => ({ label, href }));
}

export function toCanonical(path) {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SEO_PAGES = [
  {
    path: "/",
    title: "CreativeIQ | AI Digital Marketing Agency San Antonio",
    description:
      "AI-ready SEO, social, websites, and CRM systems that convert. CreativeIQ helps brands rank, get recommended by AI platforms, and turn traffic into revenue.",
    keywords:
      "AI SEO agency San Antonio, digital marketing San Antonio, GEO optimization, ChatGPT SEO, website development, CRM automation, social media marketing, CreativeIQ",
    pageType: "website",
    priority: "1.0",
    changefreq: "weekly",
    schemaType: "WebPage",
    ogImageAlt: "CreativeIQ Marketing — AI SEO and digital marketing agency in San Antonio",
  },
  {
    path: "/book",
    title: "Book a Strategy Call | CreativeIQ",
    description:
      "Schedule a strategy call with CreativeIQ. Discuss your growth goals and map a plan for SEO, web, content, and marketing systems.",
    keywords:
      "book marketing strategy call, CreativeIQ consultation, SEO strategy call, digital marketing consultation San Antonio",
    pageType: "website",
    priority: "0.8",
    changefreq: "monthly",
    breadcrumbs: crumbs(["Book a Strategy Call", "/book"]),
    schemaType: "ContactPage",
    ogImageAlt: "Book a strategy call with CreativeIQ Marketing",
  },
  {
    path: "/free-ai-seo-audit",
    title: "Free AI SEO Audit Tool | CreativeIQ Marketing",
    description:
      "Get a free AI-powered SEO audit for your website in seconds. Identify performance issues, ranking gaps, and conversion problems instantly.",
    keywords:
      "free SEO audit, AI SEO audit, website SEO report, technical SEO audit, SEO analysis tool, CreativeIQ SEO audit, AI search optimization audit",
    pageType: "website",
    priority: "0.9",
    changefreq: "weekly",
    breadcrumbs: crumbs(["Free AI SEO Audit", "/free-ai-seo-audit"]),
    schemaType: "WebPage",
    ogImageAlt: "Free AI SEO audit tool from CreativeIQ Marketing",
  },
  {
    path: "/ai-seo-guide",
    title: "AI SEO Growth Guide | CreativeIQ",
    description:
      "Get the CreativeIQ AI SEO Growth Guide in your inbox. Enter your name and email — the playbook for ranking on Google and showing up in AI answers.",
    keywords:
      "AI SEO guide, SEO growth guide, ChatGPT SEO, GEO, CreativeIQ PDF",
    pageType: "website",
    priority: "0.85",
    changefreq: "monthly",
    breadcrumbs: crumbs(["AI SEO Growth Guide", "/ai-seo-guide"]),
    schemaType: "WebPage",
    ogImageAlt: "CreativeIQ AI SEO Growth Guide",
  },
  {
    path: "/services",
    title: "Digital Marketing Services | SEO, Social, CRM | CreativeIQ",
    description:
      "Choose a growth lane: website & SEO systems, social content packages, consulting, or CRM automation. Clear tiers for brands ready to scale.",
    keywords:
      "digital marketing services, SEO services San Antonio, social media packages, CRM automation GoHighLevel, marketing consulting, CreativeIQ services",
    pageType: "website",
    priority: "0.9",
    changefreq: "weekly",
    breadcrumbs: crumbs(["Services", "/services"]),
    schemaType: "Service",
    ogImageAlt: "CreativeIQ digital marketing, SEO, social media, and CRM services",
  },
  {
    path: "/services/what-is-crm",
    title: "What is CRM? | CreativeIQ Growth Systems",
    description:
      "CRM is your business operating system for leads, clients, and revenue. See what CIQ CRM includes versus buying HubSpot, Mailchimp, ads tools, and more separately.",
    keywords:
      "what is CRM, CRM automation, GoHighLevel alternative, lead capture system, CreativeIQ CRM, missed call text back",
    pageType: "website",
    priority: "0.75",
    changefreq: "monthly",
    breadcrumbs: crumbs(
      ["Services", "/services"],
      ["What is CRM?", "/services/what-is-crm"],
    ),
    schemaType: "Service",
    ogImageAlt: "CreativeIQ CRM growth systems explained",
  },
  {
    path: "/about/creativeiq",
    title: "About CreativeIQ | Growth Systems Built on Trust",
    description:
      "CreativeIQ builds AI-ready marketing ecosystems so businesses earn confidence from customers, search engines, and intelligent systems.",
    keywords:
      "about CreativeIQ, AI digital marketing agency, AEO, SEO systems, San Antonio marketing",
    pageType: "website",
    priority: "0.85",
    changefreq: "monthly",
    breadcrumbs: crumbs(["About", "/about/creativeiq"], ["CreativeIQ", "/about/creativeiq"]),
    schemaType: "AboutPage",
    ogImageAlt: "About CreativeIQ Marketing and its trust-first growth systems",
  },
  {
    path: "/about/vilma",
    title: "About Vilma Tovar | Founder & CEO of CreativeIQ",
    description:
      "Vilma Tovar is Founder and CEO of CreativeIQ Marketing. AI strategist, speaker, and growth consultant building trust-first digital ecosystems.",
    keywords:
      "Vilma Tovar, CreativeIQ founder, AI marketing strategist, neuromarketing, San Antonio entrepreneur",
    pageType: "profile",
    priority: "0.85",
    changefreq: "monthly",
    breadcrumbs: crumbs(["About", "/about/creativeiq"], ["Vilma Tovar", "/about/vilma"]),
    schemaType: "ProfilePage",
    ogImageAlt: "Vilma Tovar, founder and CEO of CreativeIQ Marketing",
  },
  {
    path: "/social-media-free-trial",
    title: "30-Day Social Media Free Trial | CreativeIQ",
    description: "Try CreativeIQ's Social Starter package free for 30 days.",
    keywords: "social media free trial, social media management",
    pageType: "website",
    priority: "0.85",
    changefreq: "monthly",
    breadcrumbs: crumbs(["Social Media Free Trial", "/social-media-free-trial"]),
    schemaType: "Service",
    ogImageAlt: "CreativeIQ 30-day social media free trial",
  },
  {
    path: "/contact",
    title: "Contact CreativeIQ | Get Your Digital Marketing Strategy",
    description:
      "Ready to grow? Contact CreativeIQ Marketing in San Antonio for a free strategy session.",
    keywords:
      "contact marketing agency, San Antonio marketing, digital marketing strategy",
    pageType: "website",
    priority: "0.8",
    changefreq: "monthly",
    breadcrumbs: crumbs(["Contact", "/contact"]),
    schemaType: "ContactPage",
    ogImageAlt: "Contact CreativeIQ Marketing in San Antonio",
  },
  {
    path: "/newsletter",
    title: "Newsletter | CreativeIQ",
    description:
      "Subscribe to CreativeIQ's newsletter for digital marketing insights, growth strategies, and industry updates — delivered weekly to your inbox.",
    keywords: "newsletter, marketing insights, digital marketing tips",
    pageType: "website",
    priority: "0.6",
    changefreq: "monthly",
    breadcrumbs: crumbs(["Newsletter", "/newsletter"]),
    schemaType: "WebPage",
    ogImageAlt: "CreativeIQ digital marketing newsletter",
  },
  {
    path: "/newsletter/unsubscribed",
    title: "Unsubscribed | CreativeIQ",
    description:
      "You have been successfully unsubscribed from CreativeIQ marketing emails.",
    keywords: "CreativeIQ newsletter preferences, unsubscribe",
    pageType: "website",
    priority: "0.1",
    changefreq: "yearly",
    breadcrumbs: crumbs(
      ["Newsletter", "/newsletter"],
      ["Unsubscribed", "/newsletter/unsubscribed"],
    ),
    schemaType: "WebPage",
    ogImageAlt: "CreativeIQ newsletter preferences",
    noindex: true,
    sitemap: false,
  },
  {
    path: "/terms",
    title: "Terms & Conditions | CreativeIQ Marketing",
    description:
      "Read CreativeIQ's terms and conditions governing our digital marketing services including SEO, PPC, social media, and CRM automation in San Antonio.",
    keywords:
      "terms and conditions, terms of service, legal terms, CreativeIQ",
    pageType: "website",
    priority: "0.3",
    changefreq: "yearly",
    breadcrumbs: crumbs(["Terms & Conditions", "/terms"]),
    schemaType: "WebPage",
    ogImageAlt: "CreativeIQ Marketing terms and conditions",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | CreativeIQ Marketing",
    description:
      "Read CreativeIQ's privacy policy to understand how we collect and protect your personal data as San Antonio's leading digital marketing agency.",
    keywords: "privacy policy, data protection, GDPR, privacy, CreativeIQ",
    pageType: "website",
    priority: "0.3",
    changefreq: "yearly",
    breadcrumbs: crumbs(["Privacy Policy", "/privacy"]),
    schemaType: "WebPage",
    ogImageAlt: "CreativeIQ Marketing privacy policy",
  },
  {
    path: "/lets-connect",
    title: "Let's Connect | Key Partner Network — RSVP Free",
    description:
      "RSVP for Let's Connect hosted by Key Partner Network. Wednesday, August 19, 2026, 6:30–9:30 PM at 520 E Grayson St. Live music by Austin Ausley. Free entry and parking.",
    keywords:
      "Let's Connect, Key Partner Network, KPN, Austin Ausley, San Antonio networking, Smash'd event, free networking San Antonio",
    pageType: "website",
    priority: "0.95",
    changefreq: "weekly",
    breadcrumbs: crumbs(["Let's Connect", "/lets-connect"]),
    schemaType: "WebPage",
    ogImage: `${SITE_URL}/og-lets-connect.jpg`,
    ogImageAlt:
      "Let's Connect by Key Partner Network featuring live music by Austin Ausley — free entry and parking",
  },
  {
    path: "/paymentform",
    title: "Payment Form | CreativeIQ",
    description:
      "Securely submit your payment details to CreativeIQ for account billing authorization.",
    keywords: "CreativeIQ payment form",
    pageType: "website",
    priority: "0.1",
    changefreq: "yearly",
    breadcrumbs: crumbs(["Payment Form", "/paymentform"]),
    schemaType: "WebPage",
    ogImageAlt: "CreativeIQ secure payment form",
    noindex: true,
    sitemap: false,
  },
];

export const IMAGE_SITEMAP = [
  {
    path: "/",
    images: [{ loc: OG_IMAGE, title: "CreativeIQ Marketing" }],
  },
  {
    path: "/lets-connect",
    images: [
      {
        loc: `${SITE_URL}/og-lets-connect.jpg`,
        title: "Let's Connect by Key Partner Network — Austin Ausley",
      },
    ],
  },
];
