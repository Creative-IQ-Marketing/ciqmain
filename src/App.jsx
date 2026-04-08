import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import Clients from "./components/landing/Clients";
import Stats from "./components/landing/Stats";
import About from "./components/landing/About";
import Services from "./components/landing/Services";
import Testimonials from "./components/landing/Testimonials";
import Booking from "./components/landing/Booking";
import Contact from "./components/landing/Contact";
import Footer from "./components/landing/Footer";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";
import ContactPopup from "./components/ContactPopup";
import ServicesPage from "./pages/ServicesPage";
import { initializeAnalytics } from "./services/analytics";

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <StructuredData />
      <Header />
      <Hero />
      <Clients />
      <Stats />
      <About />
      <Services />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
      <ContactPopup />
    </div>
  );
}

function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
    </Routes>
  );
}

export default App;
