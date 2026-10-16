import React, { useEffect, useRef, useState } from "react";

/**
 * Animated number counter that counts up smoothly when scrolled into view.
 * Handles integer and decimal numbers with optional prefixes/suffixes.
 */
export default function AnimatedCounter({
  target = 0,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = ""
}) {
  const [displayValue, setDisplayValue] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return parseFloat(target) || 0;
    }
    return 0;
  });
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const startVal = 0;
          const endVal = parseFloat(target) || 0;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = startVal + (endVal - startVal) * easeProgress;

            setDisplayValue(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(endVal);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? Number(displayValue).toFixed(decimals)
      : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
