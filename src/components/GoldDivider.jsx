import React from "react";

export default function GoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 max-w-xl mx-auto py-3 opacity-85 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B99A63]/40 to-[#D4AF37]/70" />
      <div className="flex items-center gap-1.5 text-[#B99A63]">
        <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A63]/60" />
        <span className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37] shadow-xs shadow-[#D4AF37]/50" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A63]/60" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#B99A63]/40 to-[#D4AF37]/70" />
    </div>
  );
}
