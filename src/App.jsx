import { lazy, Suspense, useEffect } from "react";
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
const NewsletterPopup = lazy(() => import("./components/ui/NewsletterPopup"));

function RouteFallback() {
  return <div className="min-h-[40vh] bg-white" aria-hidden />;
}

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <NewsletterProvider>
      <div
        className={`min-h-screen bg-white${
          SITE_TOP_BANNER.enabled
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
  return (
    <>
      <SEO canonical="https://creativeiq.marketing/" />
      <StructuredData />
      <Hero />
      <Clients />
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
