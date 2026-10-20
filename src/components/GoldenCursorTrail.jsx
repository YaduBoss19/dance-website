import React, { useEffect, useRef } from "react";

/**
 * GoldenCursorTrail
 * High-performance, ethereal golden dust cursor trail for luxury classical aesthetics.
 * - Hardware-accelerated canvas
 * - Automatically pauses rendering when cursor is idle (0% CPU impact)
 * - Excludes touch/mobile devices via (pointer: fine) check
 * - Respects prefers-reduced-motion
 */
export default function GoldenCursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop/laptops with fine pointers
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isRunning = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const particles = [];
    const GOLD_COLORS = [
      "rgba(212, 175, 55, ",   // Classic Antique Gold
      "rgba(229, 184, 66, ",   // Bright Zari Gold
      "rgba(245, 208, 97, ",   // Shimmer Champagne
      "rgba(185, 154, 99, "    // Deep Muted Gold
    ];

    let lastX = -100;
    let lastY = -100;

    const spawnParticle = (x, y) => {
      const colorBase = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
      const size = Math.random() * 2.2 + 0.8;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.2;

      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.2, // subtle gravity drift
        size,
        colorBase,
        alpha: Math.random() * 0.4 + 0.5,
        decay: Math.random() * 0.025 + 0.02
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${p.alpha})`;
        ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn when cursor moves sufficiently
      if (dist > 3) {
        const count = Math.min(Math.floor(dist / 8) + 1, 3);
        for (let i = 0; i < count; i++) {
          spawnParticle(e.clientX, e.clientY);
        }
        lastX = e.clientX;
        lastY = e.clientY;
        startLoop();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    />
  );
}
