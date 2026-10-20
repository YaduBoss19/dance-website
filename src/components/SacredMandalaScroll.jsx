import React, { useEffect, useRef } from "react";

/**
 * Sacred Temple Yantra & Nataraja Mandala Vector.
 * Features counter-rotating concentric geometry and hardware-accelerated
 * subtle parallax scroll effect for divine aesthetic depth.
 */
export default function SacredMandalaScroll({ className = "", size = 480, parallaxSpeed = 0.05 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let rafId;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const yOffset = scrollY * parallaxSpeed;
      const rot = (scrollY * 0.012) % 360;
      containerRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) rotate(${rot}deg)`;
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-[0.07] will-change-transform transition-transform duration-100 ease-out ${className}`}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Ring: Rotating Clockwise */}
        <g className="animate-mandala" style={{ transformOrigin: "250px 250px" }}>
          <circle cx="250" cy="250" r="230" stroke="#B99A63" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="215" stroke="#D4AF37" strokeWidth="1" />
          
          {/* 16 Outer Lotus Petal Points */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={`petal-${i}`} transform={`rotate(${angle} 250 250)`}>
                <path
                  d="M250 20 C240 50, 240 70, 250 90 C260 70, 260 50, 250 20 Z"
                  stroke="#B99A63"
                  strokeWidth="1.2"
                  fill="rgba(185, 154, 99, 0.05)"
                />
                <circle cx="250" cy="55" r="2" fill="#D4AF37" />
              </g>
            );
          })}
        </g>

        {/* Middle Ring: Counter-Rotating */}
        <g className="animate-mandala-rev" style={{ transformOrigin: "250px 250px" }}>
          <circle cx="250" cy="250" r="160" stroke="#B99A63" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="145" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />

          {/* 8 Interlocking Yantra Triangles */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <polygon
                key={`poly-${i}`}
                points="250,110 330,250 170,250"
                stroke="#B99A63"
                strokeWidth="0.9"
                fill="none"
                transform={`rotate(${angle} 250 250)`}
              />
            );
          })}
        </g>

        {/* Inner Core: Concentric Sacred Bindu */}
        <g style={{ transformOrigin: "250px 250px" }}>
          <circle cx="250" cy="250" r="80" stroke="#B99A63" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="60" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="250" cy="250" r="40" stroke="#B99A63" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="20" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="5" fill="#D4AF37" />
          
          {/* Inner 8 Ray Flares */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <line
                key={`ray-${i}`}
                x1="250"
                y1="230"
                x2="250"
                y2="190"
                stroke="#B99A63"
                strokeWidth="1.5"
                transform={`rotate(${angle} 250 250)`}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
