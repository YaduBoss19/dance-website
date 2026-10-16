import React, { useEffect, useState, useRef } from "react";

/**
 * Luxury Golden Magnetic Follower Cursor (Desktop pointer only).
 * Disables on touch devices to preserve mobile performance and usability.
 */
export default function CustomCursor() {
  const [enabled] = useState(() => 
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState([]);

  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const mouse = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseDown = (e) => {
      setClicked(true);
      // Create a Thatte Mettu foot-stamp ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    const onMouseUp = () => setClicked(false);

    // Track hovering over clickable/interactive elements
    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        target.closest(".hover-lift-3d")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // Smooth RAF trailing animation
    const render = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.22;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Thatte Mettu Golden Foot-Stamp Shockwave Ripples */}
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className="fixed rounded-full pointer-events-none z-[9998] border border-[#B99A63]/70"
          style={{
            left: rip.x - 24,
            top: rip.y - 24,
            width: 48,
            height: 48,
            animation: "talam-stamp-ripple 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        />
      ))}

      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          hovered
            ? "w-12 h-12 -ml-6 -mt-6 border border-[#B99A63] bg-[#B99A63]/15 shadow-[0_0_20px_rgba(185,154,99,0.4)] backdrop-blur-[1px] scale-110"
            : clicked
            ? "w-7 h-7 -ml-3.5 -mt-3.5 border-2 border-[#D4AF37] bg-[#D4AF37]/20 scale-90"
            : "w-8 h-8 border border-[#B99A63]/60 shadow-[0_0_12px_rgba(185,154,99,0.25)]"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#B99A63] pointer-events-none z-[10000] transition-opacity duration-150 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
