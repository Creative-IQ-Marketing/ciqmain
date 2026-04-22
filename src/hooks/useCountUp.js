import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `target` over `duration` ms using an
 * easeOutCubic curve. Starts when `inView` becomes true.
 *
 * @param {number} target     - Final value to count to
 * @param {number} duration   - Animation duration in ms
 * @param {boolean} inView    - Trigger flag; starts on true
 * @param {number} [decimals] - Decimal places (0 = integer)
 * @returns {string} formatted count value
 */
export function useCountUp(
  target,
  duration = 1500,
  inView = false,
  decimals = 0,
) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = eased * target;
      setCount(current);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration]);

  return decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
}
