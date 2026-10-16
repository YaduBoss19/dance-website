import React, { useState, useRef, useEffect } from "react";

/**
 * Floating Golden Stage Spotlight Overlay.
 * Simulates a classical theatrical stage follow-spotlight that illuminates
 * the stage floor and card borders with antique gold as the visitor moves their cursor.
 */
export default function StageSpotlightOverlay({ children, className = "" }) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, opacity: 0 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHoveredRef.current = true;
        setPosition({ x, y, opacity: 1 });
      });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      setPosition((prev) => ({ ...prev, opacity: 0 }));
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Golden Stage Spotlight follow layer */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ease-out will-change-[background]"
        style={{
          opacity: position.opacity,
          background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(185, 154, 99, 0.14), rgba(212, 175, 55, 0.04) 40%, transparent 75%)`
        }}
        aria-hidden="true"
      />

      {/* Subtle stage footlight ambient beam */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#B99A63]/5 to-transparent z-10"
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
