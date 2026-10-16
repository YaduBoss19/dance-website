import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Sparkles, Award, Music, Film, Stethoscope, Globe, ChevronRight } from "lucide-react";

const MILESTONES = [
  {
    year: "2003 – Present",
    period: "21+ Years",
    title: "Bharatanatyam Discipline & Margam Mastery",
    guru: "Dr. Sunil Nellay (Father & Master Guru)",
    institution: "Nellay Nrithya Kalalayam",
    category: "Dance",
    icon: Sparkles,
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    quote: "Dance is not an external routine; it is an inward sadhana passed down from father to daughter.",
    description:
      "Initiated into classical Bharatanatyam at early childhood under Dr. Sunil Nellay. Mastered the pure technical precision of Adavus, intricate Talam calculations, and the complete classical Margam repertoire (Alarippu, Jathiswaram, Shabdam, Varnam, Padam, Thillana).",
    achievements: [
      "Rigorous Gurukula-style discipline under master Dr. Sunil Nellay",
      "Full classical Margam mastery and traditional Arangetram debut",
      "Foundation for lifelong aesthetic integrity and pedagogical purity"
    ]
  },
  {
    year: "2008 – Present",
    period: "16+ Years",
    title: "Carnatic Vocal Lineage & Shruti Sadhana",
    guru: "Resmi Narayanan (Mother & Vocal Mentor)",
    institution: "Hereditary Vocal Lineage",
    category: "Music",
    icon: Music,
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    quote: "A dancer without swara knowledge is like a temple without a flame.",
    description:
      "Nurtured from childhood in the divine traditions of Carnatic vocal music by mother Resmi Narayanan. Steeped in shruti alignment, swara mathematical patterns (Sarali, Janta, Dhatu), foundational ragas, complex Varnams, and expressive devotional Keerthanas.",
    achievements: [
      "16+ continuous years of classical vocal practice",
      "Mastery of Tala-Raga synchronization for classical dance accompaniment",
      "Direct one-to-one vocal pedagogy focusing on pitch resonance and breath control"
    ]
  },
  {
    year: "2008",
    period: "National Honour",
    title: "CCRT National Scholarship Awardee",
    guru: "Government of India",
    institution: "Centre for Cultural Resources & Training (Ministry of Culture)",
    category: "Accreditation",
    icon: Award,
    badgeColor: "bg-[#B99A63]/20 text-[#D4AF37] border-[#B99A63]/50",
    quote: "Recognised nationally at age 12 among India's most promising young classical artists.",
    description:
      "Selected at the age of 12 for the coveted National Cultural Talent Search Scholarship by CCRT (Ministry of Culture, Govt. of India). This national fellowship supported advanced masterclasses, repertoire development, and participation in premier national cultural festivals.",
    achievements: [
      "Conferred National Scholar status in Bharatanatyam",
      "Represented young classical talent at state & national conclaves",
      "Certified benchmark of classical excellence recognised globally"
    ]
  },
  {
    year: "2004 – 2008",
    period: "Silver Screen",
    title: "Child Actress in 5 Landmark Malayalam Films",
    guru: "Malayalam Cinema",
    institution: "Collaborations with Mohanlal, Mammootty & Sathyan Anthikad",
    category: "Cinema",
    icon: Film,
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    quote: "Cinema taught me authentic emotive abhinaya—living the character without artificial pretense.",
    description:
      "Featured as a celebrated child artist in 5 iconic Malayalam feature films alongside titans of Indian cinema: Mohanlal, Mammootty, Urvashi, and master director Sathyan Anthikad. Cultivated naturalistic Navarasa emotive depth that elevates her classical abhinaya today.",
    achievements: [
      "Starred in Achuvinte Amma, Rasathanthram, Raappakal, Vinodayathra & Innathe Chinthavishayam",
      "Collaborated closely with legendary cinema legends and award-winning directors",
      "Seamlessly translated silver-screen emotive subtlety into classical dance storytelling"
    ]
  },
  {
    year: "2018 – 2024",
    period: "Medical Science",
    title: "MBBS Physician & Certified Yoga Educator",
    guru: "Tbilisi State Medical University, Georgia",
    institution: "Anatomical Kinesiology & Biomechanics",
    category: "Science",
    icon: Stethoscope,
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    quote: "Understanding human anatomy transforms dance from repetitive strain into lifelong healing.",
    description:
      "Graduated as a medical doctor (MBBS) in Georgia and qualified as a certified yoga instructor. Bridges ancient Indian classical techniques with clinical biomechanics—preventing knee and meniscus stress in Aramandi, rehabilitating dancer spine posture, and engineering safe vocal stamina.",
    achievements: [
      "Doctor of Medicine (MBBS) with deep training in musculoskeletal anatomy",
      "Certified Yoga instructor specialising in alignment, flexibility & core stability",
      "Pioneered injury-prevention coaching for dancers and vocal fatigue mitigation"
    ]
  },
  {
    year: "2020 – Present",
    period: "Global Reach",
    title: "600+ Stage Recitals & International Productions",
    guru: "Global Stages & DancingRagas",
    institution: "20+ Productions in Georgia & Worldwide 1-to-1 Studio",
    category: "Global",
    icon: Globe,
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    quote: "Art knows no geographical boundaries. Today, our 1-to-1 students connect from 12+ nations.",
    description:
      "Over 600 stage recitals across India and Europe, and founder of DancingRagas. Directed 20+ major cultural productions and university workshops in Georgia. Now dedicating her expertise to mentoring private 1-to-1 students worldwide with personalised attention.",
    achievements: [
      "600+ live stage recitals and classical concert performances",
      "Directed 20+ stage productions and institutional masterclasses across Georgia",
      "Online 1-to-1 mentorship for students in North America, Europe, the Gulf & Asia"
    ]
  }
];

export default function ArtisticJourneyTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeMilestone = MILESTONES[activeIdx];
  const IconComponent = activeMilestone.icon;

  return (
    <section id="artistic-journey" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#151515] text-[#F5F0E8] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#3B0B14] rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#B99A63]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-14">
        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B0B14] border border-[#B99A63]/40 text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>Storytelling Through Scroll</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F0E8] font-serif-luxury">
            The Artistic Journey of <br />
            <span className="italic text-[#B99A63]">Dr. Malavika M. Sunil</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Explore the formative chapters of an artist shaped by 21 years of classical Gurukula discipline, hereditary music, national recognition, cinema, and medical science.
          </p>
        </AnimatedSection>

        {/* Milestone Selector Tabs for Mobile and Desktop */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none px-1">
          {MILESTONES.map((m, idx) => {
            const isSelected = idx === activeIdx;
            const MIcon = m.icon;
            return (
              <button
                key={m.title}
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 px-4 py-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 cursor-pointer tap-bounce ${
                  isSelected
                    ? "bg-[#3B0B14] border-[#B99A63] text-white shadow-xl shadow-[#3B0B14]/60 scale-100"
                    : "bg-[#1E1B1B] border-[#A9A49D]/20 text-slate-400 hover:text-white hover:border-[#B99A63]/50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isSelected ? "bg-[#B99A63] text-[#151515]" : "bg-white/5 text-[#B99A63]"
                  }`}
                >
                  <MIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#B99A63] uppercase tracking-wider">
                    {m.period}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold truncate max-w-[140px] sm:max-w-[180px]">
                    {m.category}: {m.title.split("&")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Milestone Card (Interactive Spotlight) */}
        <AnimatedSection animation="fade-up" key={activeIdx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Detail Card */}
          <div className="lg:col-span-7 bg-[#1E1B1B] border border-[#B99A63]/30 rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#3B0B14]/40 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeMilestone.badgeColor}`}>
                  {activeMilestone.period} · {activeMilestone.year}
                </span>

                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B99A63] animate-pulse" />
                  <span>{activeMilestone.institution}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-luxury text-[#F5F0E8] leading-tight">
                  {activeMilestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#B99A63] font-semibold mt-1">
                  Mentor / Lineage: {activeMilestone.guru}
                </p>
              </div>

              <blockquote className="border-l-2 border-[#B99A63] pl-4 py-1 italic text-xs sm:text-sm text-slate-300 bg-white/[0.02] rounded-r-xl">
                "{activeMilestone.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeMilestone.description}
              </p>

              {/* Accolades checklist */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold tracking-widest uppercase text-[#B99A63]">
                  Key Milestones & Impact:
                </h4>
                <ul className="space-y-1.5">
                  {activeMilestone.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <ChevronRight className="w-3.5 h-3.5 text-[#B99A63] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Next/Prev Navigation */}
            <div className="pt-6 mt-6 border-t border-[#A9A49D]/20 flex items-center justify-between">
              <button
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                className="text-xs font-bold text-slate-400 hover:text-[#B99A63] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                ← Previous Chapter
              </button>
              <span className="text-xs font-semibold text-[#A9A49D]">
                Chapter {activeIdx + 1} of {MILESTONES.length}
              </span>
              <button
                disabled={activeIdx === MILESTONES.length - 1}
                onClick={() => setActiveIdx((prev) => Math.min(MILESTONES.length - 1, prev + 1))}
                className="text-xs font-bold text-[#B99A63] hover:text-[#D4AF37] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Next Chapter</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right: Visual Story Feature Card */}
          <div className="lg:col-span-5 bg-[#250810] border border-[#B99A63]/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#151515]/60 to-[#151515] z-10 pointer-events-none" />

            <div className="relative z-20 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#B99A63] text-[#151515] flex items-center justify-center shadow-lg">
                <IconComponent className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">
                  Pedagogy Principle
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#F5F0E8] mt-1">
                  1-to-1 Mastery, Not Batch Uniformity
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Because Dr. Malavika spent over two decades learning directly from lineage masters rather than impersonal mass batches, she preserves that sacred 1-to-1 intimacy for every student online.
              </p>
            </div>

            <div className="relative z-20 pt-6 mt-6 border-t border-[#B99A63]/30 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-[#151515]/80 p-3 rounded-2xl border border-[#B99A63]/30">
                  <div className="text-xl font-bold text-[#D4AF37] font-serif-luxury">21+ Yrs</div>
                  <div className="text-[10px] text-slate-400">Bharatanatyam</div>
                </div>
                <div className="bg-[#151515]/80 p-3 rounded-2xl border border-[#B99A63]/30">
                  <div className="text-xl font-bold text-[#D4AF37] font-serif-luxury">16+ Yrs</div>
                  <div className="text-[10px] text-slate-400">Carnatic Vocal</div>
                </div>
              </div>

              <a
                href="#book-trial"
                className="w-full py-3.5 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg tap-bounce cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Begin Your 1-to-1 Journey With Dr. Malavika</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
