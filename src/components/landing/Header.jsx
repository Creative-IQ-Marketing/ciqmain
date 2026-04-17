import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import mainLogo from "../../assets/mainLogo.png";
import { trackButtonClick } from "../../services/analytics";

const ease = [0.22, 1, 0.36, 1];

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "#about" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "/services#bundles" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(0);
  const hideTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 40) {
        setVisible(true);
        clearTimeout(hideTimer.current);
      } else if (y > lastScroll.current) {
        // scrolling down  hide
        setVisible(false);
        clearTimeout(hideTimer.current);
      } else if (y < lastScroll.current) {
        // scrolling up  show, auto-hide after 3s
        setVisible(true);
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
          if (window.scrollY > 40) setVisible(false);
        }, 3000);
      }
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNav = (e, href) => {
    e.preventDefault();
    trackButtonClick(href, "nav_link", "Header");
    setOpen(false);
    if (href.startsWith("/")) {
      if (href.includes("#")) {
        const [path, hash] = href.split("#");
        navigate(path);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 320);
      } else {
        navigate(href);
      }
      return;
    }
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 320);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, ease }}
          className="w-full max-w-6xl"
        >
          {/* Pill */}
          <div className="flex items-center h-[82px] px-6 rounded-full bg-white/95 backdrop-blur-2xl border border-black/[0.07] shadow-[0_8px_56px_rgba(0,0,0,0.14)]">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => handleNav(e, "/")}
              className="flex items-center gap-2.5 shrink-0 pr-5"
            >
              <img
                src={mainLogo}
                alt="CreativeIQ"
                className="w-11 h-11 object-contain"
              />
              <span
                className="text-[1.5rem] font-bold text-slate-900"
                style={{ letterSpacing: "-0.04em" }}
              >
                Creative<span className="text-[#3B6FF0]">IQ</span>
              </span>
            </a>

            {/* Divider */}
            <div className="hidden md:block h-5 w-px bg-slate-200 shrink-0" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center flex-1 justify-center gap-0">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={(e) => handleNav(e, n.href)}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease }}
                  whileHover={{ color: "#3B6FF0" }}
                  className="px-5 py-3 text-[1.1rem] font-medium text-slate-500"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-auto pl-4">
              <motion.a
                href="tel:2108380177"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36 }}
                className="px-7 py-3.5 text-[0.9rem] font-semibold rounded-full bg-[#3B6FF0] text-white hover:bg-[#3B6FF0] transition-colors duration-250 shadow-sm"
              >
                <span>
                  <Phone size={16} className="inline-block -mt-0.5 mr-2.5" />
                </span>
                Call us
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  trackButtonClick("Free Audit", "header_cta", "Header");
                  handleNav(e, "#contact");
                }}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.44,
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 text-[0.9rem] font-semibold rounded-full bg-slate-900 text-white hover:bg-[#3B6FF0] transition-colors duration-250 shadow-sm"
              >
                Free audit
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden ml-auto p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu drop */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.22, ease }}
                className="mt-2 rounded-3xl bg-white/97 backdrop-blur-2xl border border-black/[0.06] shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden"
              >
                <nav className="flex flex-col px-5 py-5 gap-0">
                  {NAV.map((n, i) => (
                    <motion.a
                      key={n.label}
                      href={n.href}
                      onClick={(e) => handleNav(e, n.href)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, ease }}
                      className="py-3.5 text-[0.95rem] font-medium text-slate-600 hover:text-[#3B6FF0] border-b border-slate-50 last:border-0 transition-colors"
                    >
                      {n.label}
                    </motion.a>
                  ))}
                  <a
                    href="#contact"
                    onClick={(e) => handleNav(e, "#contact")}
                    className="mt-4 py-3.5 w-full text-center text-[0.87rem] font-semibold rounded-full bg-slate-900 text-white"
                  >
                    Free audit
                  </a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
