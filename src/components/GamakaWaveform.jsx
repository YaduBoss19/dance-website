import React, { useEffect, useRef } from "react";

/**
 * Animated Carnatic Gamaka Waveform Visualizer.
 * Renders the graceful sinusoidal micro-tonal oscillations (Gamakas: Kampita, Sphurita, Nokku)
 * of the 4 classical Tanpura strings: Pa (Fifth), Sa' (High Octave), Sa (Middle Octave), Kharaj Sa (Root).
 */
export default function GamakaWaveform({ isPlaying = false, height = 54, className = "" }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = canvas.clientWidth;
    let canvasHeight = height;

    const resize = () => {
      if (!canvas) return;
      width = canvas.clientWidth;
      canvas.width = width * dpr;
      canvas.height = canvasHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // 4 strings configuration: Pa, Sa', Sa, Kharaj Sa
    const strings = [
      { name: "Pa", baseFreq: 0.016, amp: isPlaying ? 12 : 3, speed: 0.045, color: "rgba(212, 175, 55, 0.85)", width: 1.8 },
      { name: "Sa'", baseFreq: 0.022, amp: isPlaying ? 9 : 2.5, speed: 0.06, color: "rgba(185, 154, 99, 0.7)", width: 1.5 },
      { name: "Sa", baseFreq: 0.02, amp: isPlaying ? 10 : 2.5, speed: 0.035, color: "rgba(226, 192, 107, 0.6)", width: 1.2 },
      { name: "Kharaj", baseFreq: 0.009, amp: isPlaying ? 14 : 3.5, speed: 0.025, color: "rgba(146, 114, 52, 0.5)", width: 2.0 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, canvasHeight);
      phaseRef.current += isPlaying ? 0.05 : 0.015;

      const midY = canvasHeight / 2;

      strings.forEach((str, strIdx) => {
        ctx.beginPath();
        ctx.lineWidth = str.width;
        ctx.strokeStyle = str.color;

        // Gamaka oscillation modulation: compound sine wave imitating Carnatic Kampita gamaka
        for (let x = 0; x <= width; x += 3) {
          const mainWave = Math.sin(x * str.baseFreq + phaseRef.current * str.speed * 40 + strIdx);
          const subWave = Math.cos(x * str.baseFreq * 0.5 - phaseRef.current * 0.4);
          const y = midY + mainWave * str.amp + subWave * (str.amp * 0.35);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isPlaying, height]);

  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: `${height}px` }}
        className="block"
      />
      {/* Harmonic Notation Overlay */}
      <div className="absolute inset-x-0 bottom-0.5 px-3 flex items-center justify-between pointer-events-none text-[9px] font-mono tracking-widest text-[#B99A63]/70 uppercase">
        <span>Pa · पंचम</span>
        <span>Tāra Sa · तार षड्ज</span>
        <span>Madhya Sa · मध्य</span>
        <span>Mandra Sa · मन्द्र</span>
      </div>
    </div>
  );
}
