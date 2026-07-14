import { useEffect } from "react";
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
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import BookPage from "./pages/BookPage";
import FreeSeoAuditPage from "./pages/FreeSeoAuditPage";
import BusinessUnpluggedPage from "./pages/BusinessUnpluggedPage";
import NewsletterPage from "./pages/NewsletterPage";
import UnsubscribedPage from "./pages/UnsubscribedPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { NewsletterProvider } from "./context/NewsletterContext";
import NewsletterPopup from "./components/ui/NewsletterPopup";
import SocialMediaFreeTrialPage from "./pages/SocialMediaFreeTrialPage";
import { initializeAnalytics } from "./services/analytics";
import {
  NEWSLETTER_POPUP_ENABLED,
  SITE_TOP_BANNER,
} from "./constants/siteBanner";
import ScrollProgress from "./components/layout/ScrollProgress";

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
        <Outlet />
        <Footer />
        {NEWSLETTER_POPUP_ENABLED ? <NewsletterPopup /> : null}
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
  );
}

export default App;
