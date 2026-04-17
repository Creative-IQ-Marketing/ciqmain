import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import Clients from "./components/landing/Clients";
import About from "./components/landing/About";
import Services from "./components/landing/Services";
import Testimonials from "./components/landing/Testimonials";
import YoutubeSection from "./components/landing/YoutubeSection";
import Booking from "./components/landing/Booking";
import Contact from "./components/landing/Contact";
import Footer from "./components/landing/Footer";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";
import ContactPopup from "./components/ContactPopup";
import ServicesPage from "./pages/ServicesPage";
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
      <ContactPopup />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <SEO />
      <StructuredData />
      <Hero />
      <Clients />
      <About />
      <Services />
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
        <Route path="/services" element={<ServicesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
