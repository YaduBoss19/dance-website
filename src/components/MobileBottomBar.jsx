import React from "react";
import { useAcademy } from "../context/AcademyContext";
import { playGhungrooChime } from "../utils/talamAudio";
import { MessageCircle, Sparkles, Phone, Compass } from "lucide-react";

/**
 * Mobile-first sticky bottom action bar.
 * Provides thumb-friendly 1-tap access to WhatsApp, Free Trial, and Lessons.
 * Hidden on desktop (lg:hidden) to keep desktop navigation spacious and clean.
 */
export default function MobileBottomBar() {
  const { currentPage, navigateTo, academyInfo } = useAcademy();

  // Hide on admin portal
  if (currentPage === "admin") return null;

  const openWhatsApp = () => {
    playGhungrooChime();
    const url = `https://wa.me/${academyInfo.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      academyInfo.whatsappDefaultMsg
    )}`;
    window.open(url, "_blank");
  };

  const handleTrialClick = () => {
    playGhungrooChime();
    if (currentPage === "home") {
      const el = document.getElementById("book-trial");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigateTo("trial");
  };

  const handleLessonsClick = () => {
    playGhungrooChime();
    if (currentPage === "home") {
      const el = document.getElementById("dance-lessons");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigateTo("courses");
  };

  return (
    <aside aria-label="Mobile quick actions" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#151515]/95 text-[#F5F0E8] backdrop-blur-md border-t border-[#B99A63]/30 px-3 py-2 shadow-[0_-8px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5 items-center">
        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-emerald-400 hover:text-emerald-300 transition-colors tap-bounce"
          aria-label="Chat with Dr. Malavika on WhatsApp"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-0.5">
            <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </button>

        {/* Call Button */}
        <a
          href={`tel:${academyInfo.directPhone.replace(/[^0-9+]/g, "")}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-300 hover:text-white transition-colors tap-bounce"
          aria-label="Call Instructor"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4 text-[#B99A63]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Call</span>
        </a>

        {/* Lessons */}
        <button
          onClick={handleLessonsClick}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-300 hover:text-[#B99A63] transition-colors tap-bounce"
          aria-label="Explore Lessons"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-0.5">
            <Compass className="w-4 h-4 text-[#B99A63]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Lessons</span>
        </button>

        {/* Trial Hero Button */}
        <button
          onClick={handleTrialClick}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] shadow-md shadow-[#B99A63]/25 tap-bounce"
          aria-label="Book Trial Session"
        >
          <div className="w-8 h-8 rounded-full bg-[#151515]/20 flex items-center justify-center text-[#151515] mb-0.5">
            <Sparkles className="w-4 h-4 text-[#151515]" />
          </div>
          <span className="text-[10px] font-extrabold tracking-tight">Book Trial</span>
        </button>
      </div>
    </aside>
  );
}
