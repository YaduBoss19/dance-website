import React from "react";
import { ArrowRight, Bell, Calendar } from "lucide-react";
import { playGhungrooChime } from "../utils/talamAudio";

/**
 * Institutional Announcement Marquee Ticker
 * Displays active updates in an infinite marquee.
 * Clicking anywhere on the announcements takes the user directly to the Announcement section.
 */
export default function AnnouncementsTicker({ onAnnouncementClick }) {
  const announcements = [
    {
      id: "cohort-admissions",
      text: "Admissions Open: Studio Cohorts & Masterclasses for 2026/27 – Reserve your slot",
      tag: "Admissions",
      target: "academy-events"
    },
    {
      id: "navarasa-masterclass",
      text: "Upcoming: Navarasa Abhinaya Intensive Masterclass – Expressive depth in classical Margam repertoire",
      tag: "Masterclass",
      target: "academy-events"
    },
    {
      id: "kinesiology-clinic",
      text: "Physician-Led Dance Kinesiology & Araimandi Joint Safety Clinic mentored by Dr. Malavika (MBBS)",
      tag: "Anatomy",
      target: "academy-events"
    },
    {
      id: "vocal-shruti",
      text: "Carnatic Vocal Shruti Alignment & Tala Mathematics for Classical Dancers enrolling now",
      tag: "Vocal",
      target: "academy-events"
    },
    {
      id: "global-flexibility",
      text: "Global Timezone Scheduling: Live online and studio coaching across USA, UK, Europe, UAE & India",
      tag: "Global",
      target: "academy-events"
    }
  ];

  const handleClick = (e) => {
    if (e) e.preventDefault();
    playGhungrooChime();
    const targetId = "academy-events";
    if (onAnnouncementClick) {
      onAnnouncementClick(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      aria-label="Latest academy announcements"
      className="w-full bg-[#151515] text-[#F5F0E8] border-y border-[#B99A63]/30 overflow-hidden flex items-stretch shadow-md select-none group"
    >
      {/* Left Fixed Badge */}
      <button
        type="button"
        onClick={handleClick}
        title="View Announcements"
        className="shrink-0 z-10 bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] px-3 sm:px-5 py-2.5 sm:py-3 flex items-center gap-1.5 sm:gap-2 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-all active:scale-95"
      >
        <span className="w-2 h-2 rounded-full bg-[#151515] animate-ping" />
        <Bell className="w-3.5 h-3.5 hidden xs:inline" />
        <span className="font-serif-luxury font-black">Announcements</span>
        <Calendar className="w-3 h-3 opacity-70 hidden sm:inline" />
      </button>

      {/* Marquee Ticker Track (Clickable, pauses on hover) */}
      <div
        onClick={handleClick}
        title="Click to view Announcements"
        className="flex-1 overflow-hidden relative flex items-center py-2 sm:py-2.5 cursor-pointer"
      >
        <div className="animate-marquee whitespace-nowrap flex items-center hover:[animation-play-state:paused]">
          {[...announcements, ...announcements].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="inline-flex items-center gap-2.5 px-4 sm:px-6 text-xs sm:text-sm text-slate-200 hover:text-[#D4AF37] transition-colors group/item"
            >
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-[#D4AF37] border border-[#B99A63]/30">
                {item.tag}
              </span>
              <span className="group-hover/item:underline underline-offset-4 decoration-[#B99A63]">
                {item.text}
              </span>
              <ArrowRight className="w-3 h-3 text-[#B99A63] opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
              <span className="text-[#B99A63]/50 pl-3">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
