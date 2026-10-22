import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Globe, MapPin, Award, Sparkles, ArrowRight } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

const CHAPTERS = [
  {
    id: "kerala",
    chapter: "Chapter I",
    title: "Kerala, India — The Lineage & Silver Screen",
    location: "Kerala, South India",
    years: "2000 — 2017",
    icon: Award,
    badge: "21 Yrs Guru Parampara",
    summary:
      "Trained for 21 years under her father, Dr. Sunil Nellay, and 16 years in Carnatic vocal under her mother, Resmi Narayanan. Awarded the prestigious CCRT Scholarship at age 12, Malavika performed on over 600 stages across South India.",
    highlights: [
      "CCRT National Scholarship Recipient in Bharatanatyam at age 12",
      "Trained in pure Tanjore tradition under father Dr. Sunil Nellay",
      "Child actress in 5 landmark Malayalam films alongside Mohanlal and Mammootty",
      "Lead artist in celebrated devotional albums (Mizhiazhagu Nirayum Radha, Devapamba)"
    ],
    quote: "“Art was not merely taught in our home; it was the atmosphere we breathed.”"
  },
  {
    id: "georgia",
    chapter: "Chapter II",
    title: "Tbilisi, Georgia — Medicine & International Stages",
    location: "Tbilisi, Georgia (Eastern Europe)",
    years: "2018 — Present",
    icon: MapPin,
    badge: "MBBS & 20+ Stage Shows",
    summary:
      "Pursued her MBBS medical degree in Georgia while pioneering Indian classical arts in Eastern Europe. Conducted 15+ offline masterclasses, choreographed for Georgian television, judged university competitions, and produced 20+ live stage shows.",
    highlights: [
      "Completed MBBS medical degree at ALTE University, Georgia",
      "Directed 20+ Indian classical stage productions in Georgia",
      "Choreographed for Georgian reality television dance series",
      "Organized 'Rhythmic Raga' & judged prestigious 'Ignite' competition at TSMU",
      "Conducted 15+ high-impact offline classical dance workshops"
    ],
    quote: "“Bringing the sacred mudras and ragas of India to the grand stages of Tbilisi was a life-defining revelation.”"
  },
  {
    id: "global",
    chapter: "Chapter III",
    title: "The Global Academy — DancingRagas Across Borders",
    location: "Global Online Studio (5+ Countries)",
    years: "Present & Future",
    icon: Globe,
    badge: "Accredited Diploma Network",
    summary:
      "Founded 5 years ago, DancingRagas has grown into a world-class institution offering accredited Bharatanatyam diplomas, Carnatic vocal training, bespoke choreography, and institutional residencies to learners across the globe.",
    highlights: [
      "Structured Bharatanatyam Diploma running successfully for 1.5+ years",
      "Students actively enrolled across Georgia, India, UAE, UK, and USA",
      "Certified Yoga Teacher combining anatomical alignment with spiritual discipline",
      "Global virtual recitals (Baithak) and international examination pathways"
    ],
    quote: "“Rooted in tradition, shaped by dedication, and carried across borders through the language of art.”"
  }
];

export default function InternationalChronicle() {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);
  const { navigateTo } = useAcademy();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl p-6 sm:p-12 lg:p-14 bg-gradient-to-b from-[#130E26] via-[#0D081B] to-[#080512] text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Theatrical lighting */}
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[350px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* Header */}
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-300 bg-amber-400/10 border border-amber-400/25 px-4 py-1.5 rounded-full">
              <Globe className="w-3.5 h-3.5 text-amber-400" /> A Journey Across Continents
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif-luxury">
              The <span className="gold-foil-text">International Chronicle</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
              From childhood film sets in Kerala and 600+ South Indian stages, to medical school and 20+ stage productions in Georgia, follow the journey of Dr. Malavika M. Sunil.
            </p>
          </AnimatedSection>

          {/* 3 Chapter Tabs */}
          <AnimatedSection animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {CHAPTERS.map((chap) => {
              const isSelected = activeChapter.id === chap.id;
              const IconComp = chap.icon;
              return (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapter(chap)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer tap-bounce flex items-start gap-3.5 ${
                    isSelected
                      ? "bg-gradient-to-br from-amber-500/20 via-rose-500/15 to-transparent border-amber-400 shadow-xl shadow-amber-500/15 scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-400/30 text-slate-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-amber-500 text-slate-950 font-black" : "bg-white/10 text-amber-300"
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                      {chap.chapter} · {chap.years}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white font-serif-luxury">
                      {chap.location}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{chap.badge}</p>
                  </div>
                </button>
              );
            })}
          </AnimatedSection>

          {/* Active Chapter In-Depth Plate */}
          <AnimatedSection animation="fade-up" className="p-6 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {activeChapter.chapter}
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white font-serif-luxury mt-1">
                  {activeChapter.title}
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold self-start sm:self-auto">
                {activeChapter.badge}
              </span>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {activeChapter.summary}
            </p>

            {/* Bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeChapter.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-400/20 italic text-amber-200 text-xs sm:text-sm">
              {activeChapter.quote}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => navigateTo("about")}
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer tap-bounce"
              >
                <span>Read Full 20-Year Autobiography</span>
                <ArrowRight className="w-4 h-4 text-rose-600" />
              </button>

              <button
                onClick={() => navigateTo("trial", { title: "International Batch Enrolment", category: "Dance" })}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer tap-bounce"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Join Global Cohort</span>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
