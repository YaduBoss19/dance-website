import React, { useEffect, useRef } from "react";

/**
 * Stage Spotlight Golden Dust Particle Canvas.
 * Creates an opulent theatrical atmosphere with slow-floating gold flecks
 * that respond subtly to pointer movements on desktop.
 */
export default function GoldParticlesCanvas({ count = 35, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", onResize);

    const mouse = { x: width / 2, y: height / 2, active: false };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    canvas.parentElement.addEventListener("mousemove", onMouseMove);
    canvas.parentElement.addEventListener("mouseleave", onMouseLeave);

    // Particle pool
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      baseSpeedX: (Math.random() - 0.5) * 0.4,
      baseSpeedY: -Math.random() * 0.5 - 0.15,
      speedX: 0,
      speedY: 0,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      hue: Math.random() > 0.4 ? 43 : 36, // gold / amber
      saturation: Math.floor(Math.random() * 25 + 75),
      lightness: Math.floor(Math.random() * 30 + 55)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse opacity
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
        const boundedOpacity = Math.max(0.12, Math.min(0.85, p.opacity));

        // Subtle reaction to mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const angle = Math.atan2(dy, dx);
            const force = (140 - dist) / 140;
            p.x -= Math.cos(angle) * force * 1.4;
            p.y -= Math.sin(angle) * force * 1.4;
          }
        }

        p.x += p.baseSpeedX;
        p.y += p.baseSpeedY;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw glowing particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${boundedOpacity})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${boundedOpacity * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener("mousemove", onMouseMove);
        canvas.parentElement.removeEventListener("mouseleave", onMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
}
