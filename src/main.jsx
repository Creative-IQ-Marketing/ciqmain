import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion } from "framer-motion";
import "./input.css";
import "./styles/tokens.css";
import "./styles/blog.css";
import App from "./App.jsx";

// Animation features load after first render so they stay out of the
// critical bundle; `m` components render their initial state until then.
const loadMotionFeatures = () =>
  import("./lib/motionFeatures.js").then((mod) => mod.default);

// In production the stylesheet is loaded without blocking first paint (see
// asyncCssPlugin in vite.config.js). Hold the first render until it is
// applied so the app never paints unstyled.
function stylesReady() {
  const link = document.querySelector("link[data-async-css]");
  if (!link || link.media === "all") return Promise.resolve();
  return new Promise((resolve) => {
    link.addEventListener("load", resolve, { once: true });
    link.addEventListener("error", resolve, { once: true });
    setTimeout(resolve, 3000);
  });
}

stylesReady().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <LazyMotion features={loadMotionFeatures}>
          <App />
        </LazyMotion>
      </BrowserRouter>
    </StrictMode>,
  );
});
