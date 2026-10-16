import React from "react";
import AnimatedSection from "./AnimatedSection";
import { Award, CheckCircle2, Sparkles } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

export default function DiplomaGoldSeal() {
  const { navigateTo } = useAcademy();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#140F24] via-[#0E0A1D] to-[#080512] text-white p-7 sm:p-14 border border-amber-500/30 shadow-2xl">
        {/* Theatrical spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-400/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <AnimatedSection animation="slide-left" className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Accredited Classical Education
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif-luxury leading-tight">
              Structured <span className="gold-foil-text">Bharatanatyam Diploma</span> Programme
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Curated by <strong>Dr. Malavika M. Sunil</strong> (CCRT Scholar). Our diploma initiative has been running for over 1.5 years in Georgia, offering an authentic, rigorous, and spiritually enriching pathway from basic Adavus to complete Margam stage presentation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "Preserving 21-year lineage of Dr. Sunil Nellay",
                "Graded practical & theoretical assessments",
                "Annual stage show performance in Georgia",
                "Recognized certification upon graduation",
                "Small batch size for individualized guidance",
                "Anatomical injury-prevention & yoga training"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                onClick={() => navigateTo("trial", { title: "Bharatanatyam Diploma & Certification", category: "Dance" })}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 text-white font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer tap-bounce"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Enrol in Diploma Batch</span>
              </button>

              <button
                onClick={() => navigateTo("courses")}
                className="px-6 py-4 rounded-2xl border border-amber-400/30 text-amber-200 hover:bg-white/5 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer tap-bounce"
              >
                <span>View Full Syllabus</span>
              </button>
            </div>
          </AnimatedSection>

          {/* Right Column: Luxury Certificate / Gold Seal Mockup */}
          <AnimatedSection animation="slide-right" className="lg:col-span-5 relative">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1C1635] to-[#0F0B1E] border-2 border-amber-400/40 shadow-2xl shadow-amber-500/10 text-center space-y-4 hover-lift-3d">
              {/* Outer decorative gold border */}
              <div className="absolute inset-2 border border-amber-400/20 rounded-2xl pointer-events-none" />

              {/* Gold Embossed Seal Emblem */}
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-1 shadow-xl flex items-center justify-center animate-glow-pulse">
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-amber-300 p-2 border border-amber-400/40">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-amber-200 mt-1">
                    DIPLOMA
                  </span>
                  <span className="text-[7px] text-amber-400/80 font-semibold tracking-tighter">
                    DancingRagas
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 block mb-1">
                  Official Credential
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-luxury">
                  Bharatanatyam Natya Visharad
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                  Conferred upon completion of the multi-tiered classical repertoire and Georgia stage recital.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 px-2">
                <div className="text-left">
                  <p className="text-slate-500">Mentorship</p>
                  <p className="font-bold text-slate-200">Dr. Malavika M. Sunil</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500">Location</p>
                  <p className="font-bold text-amber-300">Tbilisi, Georgia</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
