import React from "react";
import { ArrowRight, Bell } from "lucide-react";

/**
 * Institutional Announcement Marquee Ticker
 * Inspired by prestigious academic portals like Sacred Heart College (shcollege.ac.in).
 * Features a high-contrast badge on the left with a smooth marquee of updates.
 */
export default function AnnouncementsTicker({ onAnnouncementClick }) {
  const announcements = [
    {
      id: "cohort-admissions",
      text: "Admissions Open: Limited 1-to-1 Studio Cohorts for 2026/27 – Book your diagnostic trial session",
      tag: "Admissions",
      target: "book-trial"
    },
    {
      id: "ccrt-honour",
      text: "Dr. Malavika M. Sunil honored with CCRT National Scholarship & 600+ Classical Stage Recitals",
      tag: "Milestone",
      target: "artistic-journey"
    },
    {
      id: "vocal-batch",
      text: "New Online Carnatic Vocal Shruti Alignment & Margam Adavu batches starting this month",
      tag: "Classes",
      target: "services-section"
    },
    {
      id: "kinesiology-workshop",
      text: "Physician-Led Dance Kinesiology & Injury Prevention Coaching mentored directly by Dr. Malavika (MBBS)",
      tag: "Anatomy",
      target: "meet-instructor"
    },
    {
      id: "global-flexibility",
      text: "Global Timezone Scheduling: Live online 1-to-1 private coaching across USA, UK, Europe, UAE & India",
      tag: "Global",
      target: "book-trial"
    }
  ];

  const handleClick = (item) => {
    if (onAnnouncementClick) {
      onAnnouncementClick(item.target);
    } else {
      const el = document.getElementById(item.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      aria-label="Latest academy announcements"
      className="w-full bg-[#151515] text-[#F5F0E8] border-y border-[#B99A63]/30 overflow-hidden flex items-stretch shadow-md select-none"
    >
      {/* Left Fixed Badge (like SH College's __title Announcements block) */}
      <div className="shrink-0 z-10 bg-[#B99A63] text-[#151515] px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#151515] animate-ping" />
        <Bell className="w-3.5 h-3.5 hidden xs:inline" />
        <span className="font-serif-luxury font-black">Announcements</span>
      </div>

      {/* Marquee Ticker Track */}
      <div className="flex-1 overflow-hidden relative flex items-center py-2 sm:py-2.5">
        <div className="animate-marquee whitespace-nowrap flex items-center hover:[animation-play-state:paused]">
          {[...announcements, ...announcements].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleClick(item)}
              className="inline-flex items-center gap-2.5 px-4 sm:px-6 cursor-pointer text-xs sm:text-sm text-slate-200 hover:text-[#D4AF37] transition-colors group"
            >
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-[#D4AF37] border border-[#B99A63]/30">
                {item.tag}
              </span>
              <span className="group-hover:underline underline-offset-4 decoration-[#B99A63]">
                {item.text}
              </span>
              <ArrowRight className="w-3 h-3 text-[#B99A63] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              <span className="text-[#B99A63]/50 pl-3">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
