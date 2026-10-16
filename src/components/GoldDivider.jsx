import React from "react";

export default function GoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 max-w-xl mx-auto py-2 opacity-80 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-amber-500/80" />
      <div className="flex items-center gap-1.5 text-amber-500">
        <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
        <span className="w-2.5 h-2.5 rotate-45 bg-amber-500 shadow-xs shadow-amber-400" />
        <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-400/50 to-amber-500/80" />
    </div>
  );
}
