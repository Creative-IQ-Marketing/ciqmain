import { createContext, lazy, Suspense, useCallback, useContext, useState } from "react";
import { trackGuideEvent } from "../services/analytics";

const GuideGateModal = lazy(() => import("../components/ui/GuideGateModal"));

const GuideGateContext = createContext(null);

export function GuideGateProvider({ children }) {
  const [source, setSource] = useState(null);

  const openGuideGate = useCallback((from = "unknown") => {
    trackGuideEvent("gate_open", from);
    setSource(from);
  }, []);
  const closeGuideGate = useCallback(() => setSource(null), []);

  return (
    <GuideGateContext.Provider value={{ openGuideGate }}>
      {children}
      {source ? (
        <Suspense fallback={null}>
          <GuideGateModal source={source} onClose={closeGuideGate} />
        </Suspense>
      ) : null}
    </GuideGateContext.Provider>
  );
}

export function useGuideGate() {
  const ctx = useContext(GuideGateContext);
  if (!ctx) {
    throw new Error("useGuideGate must be used within GuideGateProvider");
  }
  return ctx;
}
