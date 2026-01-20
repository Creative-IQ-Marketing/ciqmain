import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CreativeIQ Marketing",
      url: "https://creativeiq.marketing",
      logo: "https://creativeiq.marketing/logo.png",
      image: "https://creativeiq.marketing/og-image.jpg",
      description:
        "Award-winning digital marketing agency specializing in SEO, PPC, social media marketing, CRM solutions, and web development with 8+ years of experience serving 500+ clients in San Antonio, Texas",
      foundingDate: "2016",
      slogan: "Elevate Your Digital Presence",
      telephone: "+1-804-651-2531",
      email: "CiQ@creativeiq.marketing",
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Antonio",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        postalCode: "78XXX",
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
        telephone: "+1-210-XXX-XXXX",
        email: "[email protected]",
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
        "Digital marketing agency in San Antonio specializing in SEO, PPC, social media marketing, CRM solutions, and web development. 8+ years of experience with 500+ satisfied clients.",
      url: "https://creativeiq.marketing",
      telephone: "+1-804-651-2531",
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
        "Pay-Per-Click (PPC) Advertising",
        "Social Media Marketing",
        "Customer Relationship Management (CRM)",
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
        "Professional digital marketing services agency specializing in SEO, PPC, social media marketing, and web development",
      telephone: "+1-804-651-2531",
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
      organizationSchema,
      localBusinessSchema,
      professionalServiceSchema,
      breadcrumbSchema,
      servicesSchema,
    ];

    schemas.forEach((schema, index) => {
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
