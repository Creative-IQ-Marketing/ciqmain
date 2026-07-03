import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import flyerImg from "../../assets/rsvp.jpeg";
import BusinessUnpluggedForm from "./BusinessUnpluggedForm";

export default function BusinessUnplugged() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#0e0c0a]">
      <img
        src={flyerImg}
        alt="Business Unplugged — August 6 at Hotel Valencia Riverwalk"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-10 mt-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full justify-center"
        >
          <BusinessUnpluggedForm />
        </motion.div>
      </div>

      <Link
        to="/"
        className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#1a1410] shadow-[0_2px_8px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:bg-white sm:left-6 sm:top-6"
      >
        ← Back to Creative IQ
      </Link>
    </div>
  );
}
