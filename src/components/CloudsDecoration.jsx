import { motion } from "framer-motion";

const CloudsDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top right floating clouds */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-20 text-blue-400"
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 60" fill="currentColor" opacity="0.08">
          <path d="M 20 40 Q 15 40 15 35 Q 15 25 25 20 Q 30 15 38 15 Q 42 8 50 8 Q 60 8 65 15 Q 75 15 80 25 Q 85 30 85 40 Q 85 50 75 50 L 20 50 Q 10 50 10 40 Q 10 30 20 30 Q 20 25 20 20" />
        </svg>
      </motion.div>

      {/* Bottom left floating clouds */}
      <motion.div
        className="absolute bottom-20 -left-10 w-48 h-24 text-slate-400"
        animate={{ x: [0, -30, 0], y: [0, 15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg viewBox="0 0 100 60" fill="currentColor" opacity="0.06">
          <path d="M 20 40 Q 15 40 15 35 Q 15 25 25 20 Q 30 15 38 15 Q 42 8 50 8 Q 60 8 65 15 Q 75 15 80 25 Q 85 30 85 40 Q 85 50 75 50 L 20 50 Q 10 50 10 40 Q 10 30 20 30 Q 20 25 20 20" />
        </svg>
      </motion.div>

      {/* Middle right small cloud */}
      <motion.div
        className="absolute top-1/2 right-0 w-32 h-16 text-blue-300"
        animate={{ x: [0, 15, 0], rotate: [0, 2, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg viewBox="0 0 100 60" fill="currentColor" opacity="0.05">
          <path d="M 20 40 Q 15 40 15 35 Q 15 25 25 20 Q 30 15 38 15 Q 42 8 50 8 Q 60 8 65 15 Q 75 15 80 25 Q 85 30 85 40 Q 85 50 75 50 L 20 50 Q 10 50 10 40 Q 10 30 20 30 Q 20 25 20 20" />
        </svg>
      </motion.div>
    </div>
  );
};

export default CloudsDecoration;
