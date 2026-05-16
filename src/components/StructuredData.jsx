import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    // WebSite Schema for Sitelinks Search Box and AI understanding
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://creativeiq.marketing/#website",
      name: "CreativeIQ Marketing",
      url: "https://creativeiq.marketing",
      description:
        "AI-ready SEO, conversion-focused websites, social media marketing, and CRM automation designed for modern digital discovery and real business growth.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://creativeiq.marketing/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    };

    // Person / Founder Schema
    const founderSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "CreativeIQ Founder",
      jobTitle: "Founder & Chief Marketing Strategist",
      worksFor: {
        "@type": "Organization",
        name: "CreativeIQ Marketing",
        url: "https://creativeiq.marketing",
      },
      knowsAbout: [
        "AI SEO",
        "Generative Engine Optimization",
        "Digital Marketing Strategy",
        "Conversion Rate Optimization",
        "CRM Automation",
        "Social Media Marketing",
        "Pay-Per-Click Advertising",
        "Website Development",
      ],
    };

    // FAQ Schema — high-value questions for featured snippets
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is AI SEO and why does it matter for my business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI SEO (also called Generative Engine Optimization or GEO) is the practice of optimizing your content and website to appear in AI-powered search engines like ChatGPT, Google Gemini, Claude, and Perplexity — not just traditional Google. As more users discover businesses through AI platforms, showing up in those results is critical. CreativeIQ builds AI-ready SEO ecosystems that target both traditional and AI-powered discovery.",
          },
        },
        {
          "@type": "Question",
          name: "What digital marketing services does CreativeIQ offer in San Antonio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CreativeIQ is San Antonio's leading digital marketing agency offering: AI SEO & technical SEO, social media marketing (Facebook, Instagram, LinkedIn), PPC/Google Ads management, conversion-focused website development, CRM automation (GoHighLevel), email marketing, and Google Business Profile optimization. We serve businesses across Texas and nationally.",
          },
        },
        {
          "@type": "Question",
          name: "How does CreativeIQ help businesses rank on Google in San Antonio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CreativeIQ uses a full-stack SEO approach: keyword research, technical SEO audits, on-page optimization, local SEO (Google Business Profile), schema markup, content strategy, and link building. Our AI-ready SEO methodology ensures you rank on Google and appear on AI platforms like ChatGPT and Perplexity.",
          },
        },
        {
          "@type": "Question",
          name: "What is CRM automation and how does it help my business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CRM automation connects your marketing, sales, and customer follow-up into a single automated workflow. CreativeIQ builds GoHighLevel CRM systems that automatically nurture leads, send follow-up emails and texts, schedule appointments, and track your pipeline — so no lead falls through the cracks.",
          },
        },
        {
          "@type": "Question",
          name: "How much does digital marketing cost in San Antonio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Digital marketing costs vary based on services and goals. CreativeIQ offers customized packages for SEO, social media, PPC, and CRM automation. Contact us at creativeiq.marketing to discuss your business goals and get a strategy tailored to your budget.",
          },
        },
        {
          "@type": "Question",
          name: "Does CreativeIQ work with businesses outside of San Antonio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! While CreativeIQ is headquartered in San Antonio, TX, we serve businesses across Austin, Dallas, Houston, and throughout the United States. Our digital-first approach means we can build AI-ready SEO, manage social media, run PPC campaigns, and automate CRM systems for any business, anywhere.",
          },
        },
      ],
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CreativeIQ Marketing",
      url: "https://creativeiq.marketing",
      logo: "https://creativeiq.marketing/logo.png",
      image: "https://creativeiq.marketing/og-image.jpg",
      description:
        "CreativeIQ Digital Marketing engineers AI-ready SEO, social media marketing, conversion-focused websites, chat experiences, and CRM automation designed for AI-driven discovery and real conversions.",
      foundingDate: "2016",
      slogan: "Elevate Your Digital Presence",
      telephone: "+1-210-838-0177",
      email: "CiQ@creativeiq.marketing",
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Antonio",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        postalCode: "78205",
        addressCountry: "US",
      },
      sameAs: [
        "https://www.facebook.com/creativeiqmarketing",
        "https://www.instagram.com/creativeiqmarketing",
        "https://www.linkedin.com/company/creativeiqmarketing",
        "https://www.twitter.com/creativeiqmkt",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: "+1-210-838-0177",
        email: "CiQ@creativeiq.marketing",
        availableLanguage: "en",
      },
    };

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://creativeiq.marketing",
      name: "CreativeIQ Marketing",
      image: "https://creativeiq.marketing/og-image.jpg",
      description:
        "Digital marketing agency specializing in AI-ready SEO, social media marketing, conversion websites, chat experiences, and CRM automation that turns visitors into qualified leads.",
      url: "https://creativeiq.marketing",
      telephone: "+1-210-838-0177",
      email: "CiQ@creativeiq.marketing",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Antonio",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        postalCode: "78205",
        addressCountry: "US",
      },
      areaServed: [
        {
          "@type": "City",
          name: "San Antonio",
        },
        {
          "@type": "State",
          name: "Texas",
        },
        {
          "@type": "Country",
          name: "United States",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "500",
      },
      knowsAbout: [
        "Search Engine Optimization (SEO)",
        "AI Search Optimization",
        "Technical SEO",
        "Conversion Rate Optimization (CRO)",
        "Pay-Per-Click (PPC) Advertising",
        "Social Media Marketing",
        "Customer Relationship Management (CRM)",
        "Marketing Automation",
        "Web Development",
        "Digital Marketing Strategy",
        "Content Marketing",
        "Email Marketing",
      ],
    };

    // Professional Service Schema
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "CreativeIQ Marketing",
      url: "https://creativeiq.marketing",
      image: "https://creativeiq.marketing/og-image.jpg",
      description:
        "Professional digital marketing services specializing in AI-ready SEO, PPC, social media, conversion websites, and CRM automation.",
      telephone: "+1-210-838-0177",
      email: "CiQ@creativeiq.marketing",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: [
        "San Antonio",
        "Austin",
        "Dallas",
        "Houston",
        "Texas",
        "United States",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "500",
      },
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://creativeiq.marketing",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://creativeiq.marketing#services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "About",
          item: "https://creativeiq.marketing#about",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Contact",
          item: "https://creativeiq.marketing#contact",
        },
      ],
    };

    // Services Schema
    const servicesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Service",
          name: "Search Engine Optimization",
          description:
            "Professional SEO services to improve your website visibility and organic search rankings",
          provider: {
            "@type": "Organization",
            name: "CreativeIQ Marketing",
          },
        },
        {
          "@type": "Service",
          name: "Pay-Per-Click Advertising",
          description:
            "Targeted PPC campaigns on Google, Facebook, and other platforms to drive qualified leads",
          provider: {
            "@type": "Organization",
            name: "CreativeIQ Marketing",
          },
        },
        {
          "@type": "Service",
          name: "Social Media Marketing",
          description:
            "Strategic social media management and advertising to build brand awareness and engagement",
          provider: {
            "@type": "Organization",
            name: "CreativeIQ Marketing",
          },
        },
        {
          "@type": "Service",
          name: "Web Development",
          description:
            "Custom website design and development to create professional online presence",
          provider: {
            "@type": "Organization",
            name: "CreativeIQ Marketing",
          },
        },
        {
          "@type": "Service",
          name: "CRM Solutions",
          description:
            "Customer relationship management systems to streamline business operations",
          provider: {
            "@type": "Organization",
            name: "CreativeIQ Marketing",
          },
        },
      ],
    };

    const schemas = [
      websiteSchema,
      founderSchema,
      faqSchema,
      organizationSchema,
      localBusinessSchema,
      professionalServiceSchema,
      breadcrumbSchema,
      servicesSchema,
    ];

    schemas.forEach((schema) => {
      let script = document.querySelector(
        `script[data-schema-type="${schema["@type"]}"]`,
      );

      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-schema-type", schema["@type"]);
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schema);
    });
  }, []);

  return null;
}
