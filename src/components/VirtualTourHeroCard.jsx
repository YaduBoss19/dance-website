import React from "react";
import { Compass, Play, Sparkles } from "lucide-react";

/**
 * Floating 360° Virtual Studio & Stage Tour Card
 * Directly inspired by the floating virtual tour element on Sacred Heart College (shcollege.ac.in).
 * Floats on the hero banner with a live indicator, 360 degree compass, and click-to-preview.
 */
export default function VirtualTourHeroCard({ onOpenTour }) {
  return (
    <div
      onClick={onOpenTour}
      className="virtual-tour-card group cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 text-left"
      title="Experience 360° Classical Stage & Virtual Studio Tour"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenTour();
      }}
    >
      <div className="bg-[#151515]/95 backdrop-blur-xl border border-[#B99A63]/60 rounded-2xl p-2.5 sm:p-3 shadow-[0_15px_35px_rgba(0,0,0,0.5)] w-52 sm:w-60 overflow-hidden">
        {/* Header with Live Status Dot */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] font-serif-luxury">
              360° Stage &amp; Studio
            </span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
            TOUR
          </span>
        </div>

        {/* Thumbnail with 360 Overlay */}
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mt-2 bg-black">
          <img
            src="/images/malavika_dance_stage.jpg"
            alt="Virtual Studio and Stage Performance"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85 group-hover:opacity-100"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* 360 Degree Rotating Indicator Badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#151515]/80 border border-[#B99A63] text-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5 text-[#D4AF37] animate-spin" style={{ animationDuration: "12s" }} />
            </div>
          </div>

          {/* Bottom Badge */}
          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-[#F5F0E8] font-bold">
            <span className="flex items-center gap-1">
              <Play className="w-2.5 h-2.5 text-[#B99A63] fill-[#B99A63]" />
              <span>Watch Stage Recital</span>
            </span>
            <span className="text-[#D4AF37] text-[10px] font-mono">HD</span>
          </div>
        </div>

        {/* Caption */}
        <div className="pt-2 flex items-center justify-between text-[10px] text-slate-300">
          <span className="truncate">CCRT Scholar Stage Solo</span>
          <span className="text-[#B99A63] font-bold shrink-0 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Explore</span>
          </span>
        </div>
      </div>
    </div>
  );
}
