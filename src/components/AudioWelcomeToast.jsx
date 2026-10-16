import React, { useState, useEffect } from "react";
import { Headphones, X, Sparkles, Volume2 } from "lucide-react";
import { playGhungrooChime } from "../utils/talamAudio";

/**
 * Soundscape Welcome Toast for First-Time Visitors.
 * Tastefully introduces the browser-synthesized Tanpura & Ghungroo audio
 * without intrusive auto-play popups, respecting user privacy.
 */
export default function AudioWelcomeToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      const dismissed = sessionStorage.getItem("dancingragas_audio_dismissed");
      if (!dismissed) {
        const timer = setTimeout(() => {
          setVisible(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case sessionStorage is blocked
    }
  }, []);

  const handleEnableAudio = () => {
    playGhungrooChime();
    window.dispatchEvent(new CustomEvent("start-tanpura-drone"));
    handleDismiss();
  };

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("dancingragas_audio_dismissed", "true");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto max-w-md animate-silk-fan"
    >
      <div className="bg-[#151515]/95 text-[#F5F0E8] border border-[#B99A63]/60 rounded-full py-2.5 px-4 sm:px-5 shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Icon */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#B99A63]/20 border border-[#B99A63]/50 flex items-center justify-center text-[#D4AF37] animate-pulse">
            <Headphones className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold font-serif-luxury text-[#F5F0E8] flex items-center gap-1.5 leading-tight">
              <span>Experience with Classical Audio</span>
              <Sparkles className="w-3 h-3 text-[#B99A63]" />
            </p>
            <p className="text-[10px] text-slate-300 leading-tight">
              Tanpura drone & brass Ghungroo bells
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleEnableAudio}
            className="px-3.5 py-1.5 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer tap-bounce"
            title="Turn on classical audio"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Enable Sound</span>
            <span className="xs:hidden">Sound</span>
          </button>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss sound notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
