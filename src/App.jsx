import Header from "./components/landing/Header";
import Hero from "./components/landing/Hero";
import Stats from "./components/landing/Stats";
import About from "./components/landing/About";
import Services from "./components/landing/Services";
import Testimonials from "./components/landing/Testimonials";
import Contact from "./components/landing/Contact";
import Footer from "./components/landing/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
