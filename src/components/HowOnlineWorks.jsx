import React from "react";
import AnimatedSection from "./AnimatedSection";
import { Video, UserCheck, PlayCircle, Award, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

const STEPS = [
  {
    step: "01",
    icon: Video,
    title: "Dual-Angle HD Live Class",
    tag: "Visual Clarity",
    description:
      "Crystal-clear live streaming with dedicated camera framing capturing both full-body footwork (Aramandi depth & Talam stamping) and facial expressions simultaneously.",
    benefit: "Ensures every Adavu is visible with zero blind spots."
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Real-Time 1-on-1 Correction",
    tag: "Individual Focus",
    description:
      "No passive recorded lectures. Dr. Malavika personally watches each student, offering real-time verbal and rhythmic corrections to posture, mudras, and timing.",
    benefit: "Strictly limited batch sizes (max 6-8 students) for precision guidance."
  },
  {
    step: "03",
    icon: PlayCircle,
    title: "Mirrored Video Practice Guides",
    tag: "Daily Homework",
    description:
      "After each session, students receive custom mirrored video guides with slow-motion tempo breakdowns, practice beats, and lyrics to practice effortlessly at home.",
    benefit: "Retain 100% of the lessons between weekly live classes."
  },
  {
    step: "04",
    icon: Award,
    title: "Global Recitals & Diploma Viva",
    tag: "Stage & Accreditation",
    description:
      "Students participate in international virtual recitals (Baithak), stage opportunities in Georgia, and formal graded theory and practical examinations for their accredited diploma.",
    benefit: "Formal diploma certification recognized across international boundaries."
  }
];

export default function HowOnlineWorks() {
  const { navigateTo } = useAcademy();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl p-6 sm:p-12 lg:p-14 bg-gradient-to-b from-white via-slate-50 to-amber-50/20 border border-slate-200/80 shadow-lg space-y-10">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Virtual Classroom Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif-luxury">
            How <span className="gold-foil-text">Online Training</span> Works
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
            Can classical arts be learned authentically online? Yes. Our structured virtual studio delivers the discipline of traditional Gurukul training directly into your living room anywhere in the world.
          </p>
        </AnimatedSection>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <AnimatedSection
                key={s.step}
                delay={idx * 120}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover-lift flex flex-col justify-between text-left space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 font-black text-xs flex items-center justify-center border border-amber-500/20">
                      {s.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {s.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-luxury">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{s.benefit}</span>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <AnimatedSection
          animation="zoom-in"
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-rose-500/10 border border-amber-300/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif-luxury">
              Ready to Experience an Interactive Session?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Book a complimentary private assessment with Dr. Malavika. No special equipment needed.
            </p>
          </div>
          <button
            onClick={() => navigateTo("trial")}
            className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-2 cursor-pointer tap-bounce"
          >
            <span>Book Level Assessment</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}
