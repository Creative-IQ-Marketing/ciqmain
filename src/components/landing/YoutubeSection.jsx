import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const YOUTUBE_CHANNEL = "https://www.youtube.com/@CreativeIQdigitalmarketing";
const FEATURED_VIDEO_ID = "Mj1u1oMow9U";

export default function YoutubeSection() {
  return (
    <section id="youtube" style={{ background: "#F5F2EC", padding: "96px 0" }}>
      <style>{`
        .f-disp { font-family: 'Bricolage Grotesque', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          display: "flex",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT — text */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{ flex: "0 0 auto", width: "clamp(260px, 34%, 360px)" }}
        >
          <p
            className="f-body"
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#3B6FF0",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            YouTube
          </p>
          <h2
            className="f-disp"
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#0d0d0d",
            }}
          >
            We share what
            <br />
            <span style={{ color: "#3B6FF0" }}>actually works.</span>
          </h2>
          <p
            className="f-body"
            style={{
              fontSize: 14,
              color: "rgba(0,0,0,0.4)",
              lineHeight: 1.65,
              marginBottom: 32,
              maxWidth: 300,
            }}
          >
            Free tactics, real case studies, and marketing breakdowns — straight
            from our team.
          </p>
          <motion.a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="f-body"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 500,
              color: "#0d0d0d",
              textDecoration: "none",
            }}
          >
            Visit our channel <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

        {/* RIGHT — embed */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          style={{
            flex: 1,
            minWidth: 280,
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
          }}
        >
          <div style={{ paddingBottom: "56.25%", position: "relative" }}>
            <iframe
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}`}
              title="CreativeIQ — featured video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
