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
import Testimonials from "./components/landing/Testimonials";
import YoutubeSection from "./components/landing/YoutubeSection";
import Booking from "./components/landing/Booking";
import Contact from "./components/landing/Contact";
import Footer from "./components/landing/Footer";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import FreeSeoAuditPage from "./pages/FreeSeoAuditPage";
import UnsubscribedPage from "./pages/UnsubscribedPage";
import { initializeAnalytics } from "./services/analytics";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
      <Footer />
      {/* <ContactPopup /> */}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <SEO />
      <StructuredData />
      <Hero />
      {/* <StoryStrip /> */}
      {/* <SectionGlide /> */}
      <Clients />
      <SectionGlide flip />
      <About />
      <SectionGlide />
      <ServicesShowcase />
      <SectionGlide flip />
      <Stats />
      <GHLValueTable />
      <SectionGlide />
      <Testimonials />
      <YoutubeSection />
      <Booking />
      <Contact />
    </>
  );
}

function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/free-ai-seo-audit" element={<FreeSeoAuditPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/newsletter/unsubscribed" element={<UnsubscribedPage />} />
      </Route>
    </Routes>
  );
}

export default App;
