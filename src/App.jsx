import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import Clients from "./components/landing/Clients";
import About from "./components/landing/About";
import StoryStrip from "./components/landing/StoryStrip";
import SectionGlide from "./components/landing/SectionGlide";
import ServicesShowcase from "./components/landing/ServicesShowcase";
import Stats from "./components/landing/Stats";
import GHLValueTable from "./components/landing/GHLValueTable";
import GuideDownload from "./components/landing/GuideDownload";
import Testimonials from "./components/landing/Testimonials";
import FAQ from "./components/landing/FAQ";
import YoutubeSection from "./components/landing/YoutubeSection";
import Booking from "./components/landing/Booking";
import Contact from "./components/landing/Contact";
import ExploreFurther from "./components/landing/ExploreFurther";
import Footer from "./components/landing/Footer";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import FreeSeoAuditPage from "./pages/FreeSeoAuditPage";
import BusinessUnpluggedPage from "./pages/BusinessUnpluggedPage";
import NewsletterPage from "./pages/NewsletterPage";
import UnsubscribedPage from "./pages/UnsubscribedPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { NewsletterProvider } from "./context/NewsletterContext";
import NewsletterPopup from "./components/ui/NewsletterPopup";
import NewsletterAutoOpen from "./components/ui/NewsletterAutoOpen";
import SocialMediaFreeTrialPage from "./pages/SocialMediaFreeTrialPage";
import { initializeAnalytics } from "./services/analytics";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <NewsletterProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Outlet />
        <Footer />
        <NewsletterPopup />
        <NewsletterAutoOpen />
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
      {/* <StoryStrip /> */}
      {/* <SectionGlide /> */}
      <Clients />
      <About />
      <SectionGlide />
      <ServicesShowcase />
      <SectionGlide flip />
      <Stats />
      <GHLValueTable />
      <SectionGlide />
      <Testimonials />
      <FAQ />
      <YoutubeSection />
      <Booking />
      <GuideDownload />
      <Contact />
      {/* <ExploreFurther /> */}
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
        <Route path="/free-ai-seo-audit" element={<FreeSeoAuditPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/social-media-free-trial" element={<SocialMediaFreeTrialPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/newsletter/unsubscribed" element={<UnsubscribedPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
      </Route>
      {/* Standalone page routes (no header/footer) */}
      <Route path="/newsletter" element={<NewsletterPage />} />
      <Route path="/business-unplugged" element={<BusinessUnpluggedPage />} />
    </Routes>
  );
}

export default App;
