import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import MudraShowcase from "./MudraShowcase";
import GamakaWaveform from "./GamakaWaveform";
import DoctorAnatomyShowcase from "./DoctorAnatomyShowcase";
import FilmArchiveShowcase from "./FilmArchiveShowcase";
import { Sparkles, Music, Activity, Clapperboard } from "lucide-react";

export default function ImmersiveArtForms() {
  const [activeTab, setActiveTab] = useState("bharatanatyam");

  const tabs = [
    {
      id: "bharatanatyam",
      label: "Bharatanatyam",
      tagline: "Sacred Mudras & Classical Margam",
      icon: Sparkles,
      color: "from-amber-600 to-amber-900",
      accent: "#B99A63"
    },
    {
      id: "carnatic",
      label: "Carnatic Vocal",
      tagline: "Shruti Resonance & Live Drone",
      icon: Music,
      color: "from-amber-800 to-slate-900",
      accent: "#D4AF37"
    },
    {
      id: "cinema",
      label: "Bollywood & Screen",
      tagline: "5 Feature Films & Emotive Grace",
      icon: Clapperboard,
      color: "from-rose-700 to-slate-900",
      accent: "#f43f5e"
    },
    {
      id: "anatomy",
      label: "Physician & Yoga",
      tagline: "MBBS Biomechanics & Joint Health",
      icon: Activity,
      color: "from-emerald-700 to-slate-900",
      accent: "#10b981"
    }
  ];

  return (
    <section id="art-forms" className="py-10 xs:py-12 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#FAF7F2] border-b border-[#A9A49D]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 lg:space-y-12">
        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515] text-[#F5F0E8] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>Interactive Art-Form Immersion</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#151515] font-serif-luxury">
            Experience the Four Pillars of <br />
            <span className="italic text-[#B99A63]">DancingRagas</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Switch between disciplines below to interact with hand gestures (Mudras), an authentic acoustic Tanpura drone synthesizer, silver-screen cinema heritage, and physician-guided anatomical alignment.
          </p>
        </AnimatedSection>

        {/* 4 Interactive Tab Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {tabs.map((tab) => {
            const isCurrent = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer tap-bounce ${
                  isCurrent
                    ? "bg-[#151515] text-[#F5F0E8] border-[#B99A63] shadow-xl shadow-[#151515]/20 scale-[1.02]"
                    : "bg-white text-slate-700 border-[#A9A49D]/25 hover:border-[#B99A63]/60 hover:bg-[#F5F0E8]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isCurrent ? "bg-[#B99A63] text-[#151515]" : "bg-slate-100 text-[#151515]"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                  </div>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-[#B99A63] animate-pulse" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-bold font-serif-luxury">{tab.label}</h4>
                  <p
                    className={`text-[11px] mt-0.5 line-clamp-1 ${
                      isCurrent ? "text-[#B99A63]" : "text-slate-500"
                    }`}
                  >
                    {tab.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tab Interactive Content Display */}
        <div className="transition-all duration-500">
          {activeTab === "bharatanatyam" && (
            <AnimatedSection animation="fade-up" className="space-y-8">
              <div className="bg-[#151515] text-[#F5F0E8] rounded-3xl p-6 sm:p-10 border border-[#B99A63]/30 shadow-2xl space-y-8">
                <div className="max-w-3xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63]">
                    Sacred Mudra Alphabet
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F5F0E8]">
                    The Language of Bharatanatyam Hasthas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Click each sacred hand gesture to explore its Sanskrit shloka, poetic significance, and how Dr. Malavika breaks down every finger placement in private 1-to-1 video coaching.
                  </p>
                </div>

                <MudraShowcase />
              </div>
            </AnimatedSection>
          )}

          {activeTab === "carnatic" && (
            <AnimatedSection animation="fade-up" className="space-y-8">
              <div className="bg-[#151515] text-[#F5F0E8] rounded-3xl p-6 sm:p-10 border border-[#B99A63]/30 shadow-2xl space-y-6">
                <div className="max-w-3xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63]">
                    Sacred Shruti Resonance
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F5F0E8]">
                    Carnatic Vocal Shruti Alignment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Visualizing the sacred harmonics of the 4 classical Tanpura strings tuned to <strong>C# (138.6 Hz)</strong>. In 1-to-1 coaching, Dr. Malavika trains your vocal pitch against this exact acoustic foundation.
                  </p>
                </div>

                <div className="rounded-2xl bg-black/60 p-5 border border-[#B99A63]/30">
                  <GamakaWaveform isPlaying={true} height={80} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    { note: "Pa (Fifth)", freq: "207.9 Hz", role: "Acoustic Anchor" },
                    { note: "Tāra Sa (High)", freq: "277.2 Hz", role: "Upper Octave" },
                    { note: "Madhya Sa (Mid)", freq: "138.6 Hz", role: "Vocal Ground" },
                    { note: "Mandra Sa (Root)", freq: "69.3 Hz", role: "Sub-harmonic" }
                  ].map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
                      <div className="text-xs font-bold text-[#D4AF37]">{s.note}</div>
                      <div className="text-[10px] text-[#B99A63] font-mono">{s.freq}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {activeTab === "cinema" && (
            <AnimatedSection animation="fade-up" className="space-y-8">
              <div className="bg-[#151515] text-[#F5F0E8] rounded-3xl p-6 sm:p-10 border border-[#B99A63]/30 shadow-2xl space-y-8">
                <div className="max-w-3xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63]">
                    Silver-Screen Pedigree
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F5F0E8]">
                    5 Malayalam Feature Films & Classical Cinema
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Explore the landmark films starring young Malavika alongside Indian cinema legends Mohanlal and Mammootty. Learn how cinematic Navarasa storytelling brings modern vitality to her dance classes.
                  </p>
                </div>

                <FilmArchiveShowcase />
              </div>
            </AnimatedSection>
          )}

          {activeTab === "anatomy" && (
            <AnimatedSection animation="fade-up" className="space-y-8">
              <div className="bg-[#151515] text-[#F5F0E8] rounded-3xl p-6 sm:p-10 border border-[#B99A63]/30 shadow-2xl space-y-8">
                <div className="max-w-3xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63]">
                    Physician Perspective
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F5F0E8]">
                    Medical Biomechanics & Dance Injury Prevention
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Interactive clinical analysis of Aramandi hip-rotations, patellar knee protection, lumbar spinal health, and diaphragmatic breathing coached with physician expertise.
                  </p>
                </div>

                <DoctorAnatomyShowcase />
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
