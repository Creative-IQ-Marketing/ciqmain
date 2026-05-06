import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1];

const YOUTUBE_CHANNEL = "https://www.youtube.com/@CreativeIQdigitalmarketing";
const FEATURED_VIDEO_ID = "cjWgPk4OL90";

export default function YoutubeSection() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.92, 1, 1, 0.92],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease },
    },
  };

  return (
    <section
      ref={ref}
      id="youtube"
      style={{
        background:
          "linear-gradient(135deg, #F5F2EC 0%, #FAF9F6 50%, #F0EEEA 100%)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <style>{`
        .f-disp { font-family: 'Bricolage Grotesque', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .youtube-video-container {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08),
                      0 8px 16px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.8);
          transition: box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .youtube-video-container:hover {
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12),
                      0 12px 24px rgba(0, 0, 0, 0.06);
        }
        .video-aspect-ratio {
          padding-bottom: 56.25%;
          position: relative;
          background: #000;
        }
        .video-aspect-ratio iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
      `}</style>

      <motion.div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          display: "flex",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "center",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* LEFT — text */}
        <motion.div
          style={{ flex: "0 0 auto", width: "clamp(260px, 34%, 380px)" }}
          variants={itemVariants}
        >
          <motion.p
            className="f-body"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#3B6FF0",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
              opacity: 0.9,
            }}
            variants={itemVariants}
          >
            ▸ YouTube Channel
          </motion.p>

          <motion.h2
            className="f-disp"
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#0d0d0d",
            }}
            variants={itemVariants}
          >
            We share what
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #3B6FF0 0%, #2851C6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              actually works.
            </span>
          </motion.h2>

          <motion.p
            className="f-body"
            style={{
              fontSize: 15,
              color: "rgba(0,0,0,0.55)",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 320,
              fontWeight: 400,
            }}
            variants={itemVariants}
          >
            Free tactics, real case studies, and marketing breakdowns — straight
            from our team. Weekly insights that move the needle.
          </motion.p>

          <motion.a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6, gap: 10 }}
            whileTap={{ scale: 0.94 }}
            className="f-body"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 600,
              color: "#0d0d0d",
              textDecoration: "none",
              padding: "12px 20px",
              borderRadius: 100,
              background: "rgba(59, 111, 240, 0.08)",
              border: "1px solid rgba(59, 111, 240, 0.2)",
              transition: "all 0.3s ease",
            }}
            onHoverStart={(e) => {
              e.currentTarget.style.background = "rgba(59, 111, 240, 0.15)";
            }}
            onHoverEnd={(e) => {
              e.currentTarget.style.background = "rgba(59, 111, 240, 0.08)";
            }}
          >
            Visit channel <ArrowUpRight size={16} strokeWidth={2.5} />
          </motion.a>
        </motion.div>

        {/* RIGHT — embed */}
        <motion.div
          style={{
            flex: 1,
            minWidth: 280,
            opacity,
            y,
            scale,
          }}
          variants={itemVariants}
          className="youtube-video-container"
        >
          <div className="video-aspect-ratio">
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
              title="CreativeIQ — featured video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
