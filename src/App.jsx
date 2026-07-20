import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import Clients from "./components/landing/Clients";
import About from "./components/landing/About";
import ServicesShowcase from "./components/landing/ServicesShowcase";
import Stats from "./components/landing/Stats";
import Testimonials from "./components/landing/Testimonials";
import Contact from "./components/landing/Contact";
import Footer from "./components/landing/Footer";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";
import { NewsletterProvider } from "./context/NewsletterContext";
import { initializeAnalytics } from "./services/analytics";
import {
  NEWSLETTER_POPUP_ENABLED,
  SITE_TOP_BANNER,
} from "./constants/siteBanner";
import ScrollProgress from "./components/layout/ScrollProgress";
import { scrollToSection } from "./utils/scrollToSection";
import VilmaIntro from "./components/landing/VilmaIntro";
import { warmRoute } from "./utils/prefetchAssets";

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BookPage = lazy(() => import("./pages/BookPage"));
const FreeSeoAuditPage = lazy(() => import("./pages/FreeSeoAuditPage"));
const BusinessUnpluggedPage = lazy(() => import("./pages/BusinessUnpluggedPage"));
const NewsletterPage = lazy(() => import("./pages/NewsletterPage"));
const UnsubscribedPage = lazy(() => import("./pages/UnsubscribedPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage"),
);
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const SocialMediaFreeTrialPage = lazy(
  () => import("./pages/SocialMediaFreeTrialPage"),
);
const AboutCiqPage = lazy(() => import("./pages/AboutCiqPage"));
const AboutVilmaPage = lazy(() => import("./pages/AboutVilmaPage"));
const NewsletterPopup = lazy(() => import("./components/ui/NewsletterPopup"));

function RouteFallback() {
  return <div className="min-h-[40vh] bg-white" aria-hidden />;
}

function Layout() {
  const { pathname } = useLocation();
  const [bannerPad, setBannerPad] = useState(() => {
    if (!SITE_TOP_BANNER.enabled) return false;
    try {
      return sessionStorage.getItem("ciq_site_banner_dismissed") !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const onBanner = (e) => setBannerPad(Boolean(e.detail?.visible));
    window.addEventListener("ciq-site-banner", onBanner);
    return () => window.removeEventListener("ciq-site-banner", onBanner);
  }, []);

  useEffect(() => {
    const routes = [
      "/services",
      "/about/vilma",
      "/about/creativeiq",
      "/free-ai-seo-audit",
      "/contact",
      "/book",
    ];
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => routes.forEach(warmRoute), {
            timeout: 2500,
          })
        : window.setTimeout(() => routes.forEach(warmRoute), 1800);
    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, []);

  return (
    <NewsletterProvider>
      <div
        className={`min-h-screen bg-white${
          bannerPad
            ? " pb-[calc(var(--site-mobile-banner-height)+env(safe-area-inset-bottom,0px))] lg:pb-0"
            : ""
        }`}
      >
        <ScrollProgress />
        <Header />
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
        <Footer />
        {NEWSLETTER_POPUP_ENABLED ? (
          <Suspense fallback={null}>
            <NewsletterPopup />
          </Suspense>
        ) : null}
      </div>
    </NewsletterProvider>
  );
}

function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const timer = window.setTimeout(() => scrollToSection(id), 300);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <SEO
        title="CreativeIQ | AI Digital Marketing Agency San Antonio"
        description="AI-ready SEO, social, websites, and CRM systems that convert. CreativeIQ helps brands rank, get recommended by AI platforms, and turn traffic into revenue."
        keywords="AI SEO agency San Antonio, digital marketing San Antonio, GEO optimization, ChatGPT SEO, website development, CRM automation, social media marketing, CreativeIQ"
        canonical="https://creativeiq.marketing/"
      />
      <StructuredData />
      <Hero />
      <Clients />
      <VilmaIntro />
      <ServicesShowcase />
      <Stats />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}

function App() {
  useEffect(() => {
    initializeAnalytics();
    document.dispatchEvent(new Event("prerender-ready"));
  }, []);

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/free-ai-seo-audit" element={<FreeSeoAuditPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about/creativeiq" element={<AboutCiqPage />} />
          <Route path="/about/vilma" element={<AboutVilmaPage />} />
          <Route
            path="/social-media-free-trial"
            element={<SocialMediaFreeTrialPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/newsletter/unsubscribed" element={<UnsubscribedPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Route>
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/business-unplugged" element={<BusinessUnpluggedPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
