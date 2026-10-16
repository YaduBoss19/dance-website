import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Sparkles, ArrowRight, Award } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

const MARGAM_STAGES = [
  {
    step: "01",
    sanskrit: "अलारिप्पु",
    name: "Alarippu",
    translation: "The Floral Blossom",
    focus: "Nritta (Pure Technique & Rhythm)",
    tempo: "Tisra / Chatusra Eka Talam",
    image: "/images/malavika_dance_stage.jpg",
    description:
      "The ritualistic opening invocation. Beginning with the eyes, neck movements (Griva Bheda), and shoulder articulations, the dancer gradually blooms like a sacred temple lotus into full Aramandi footwork.",
    significance: "Warms up the body, seeks divine blessings from Lord Nataraja, the Guru, and the audience."
  },
  {
    step: "02",
    sanskrit: "जातिस्वरम्",
    name: "Jathiswaram",
    translation: "Melody Weaved in Rhythm",
    focus: "Pure Geometric Footwork (Swara Jathis)",
    tempo: "Ragamalika / Rupaka or Adi Talam",
    image: "/images/malavika_dance_pose.jpg",
    description:
      "A vibrant synchronization of solfa syllables (Sa Ri Ga Ma Pa Dha Ni) with crisp Adavus and complex rhythmic cross-beats, devoid of lyrical storytelling.",
    significance: "Demonstrates physical stamina, mathematical precision, and musical harmony."
  },
  {
    step: "03",
    sanskrit: "शब्दम्",
    name: "Shabdam",
    translation: "The Sacred Verse",
    focus: "First Introduction to Abhinaya (Expression)",
    tempo: "Misra Chapu Talam (7-beat cycle)",
    image: "/images/malavika_portrait.jpg",
    description:
      "The first item where poetry and emotional storytelling (Abhinaya) enter the recital. Alternates between rhythmic Korvais and narrative verses praising deities or divine grace.",
    significance: "Transitions the dancer from purely physical geometry to emotive spiritual expression."
  },
  {
    step: "04",
    sanskrit: "वर्णम्",
    name: "Varnam",
    translation: "The Crown Jewel of Margam",
    focus: "Endurance, Complex Jathis & Deep Bhava",
    tempo: "45-Minute Classical Masterpiece",
    image: "/images/malavika_dance_stage.jpg",
    description:
      "The grand centerpiece of the Bharatanatyam Margam. Demands immense cardiovascular stamina, flawless rhythmic speed shifts (Kaalams), and nuanced theatrical storytelling.",
    significance: "The true benchmark of an accomplished classical artist's technical and emotional mastery."
  },
  {
    step: "05",
    sanskrit: "पदम् / कीर्तनम्",
    name: "Padam & Keerthanam",
    translation: "The Devotional Poetry",
    focus: "Subtle Facial Expressions (Satvika Abhinaya)",
    tempo: "Vilambita (Slow, Soulful Laya)",
    image: "/images/malavika_dance_pose.jpg",
    description:
      "Intensely lyrical devotional pieces exploring divine love (Bhakti and Sringara), the Nayika-Nayaka relationship, and philosophical metaphors from ancient epics.",
    significance: "Demonstrates the artist's mature capability to communicate soul-stirring rasa to the audience."
  },
  {
    step: "06",
    sanskrit: "तिल्लाना",
    name: "Thillana",
    translation: "The Sculptural Climax",
    focus: "High-Energy Rhythm & Temple Sculpture Poses",
    tempo: "Druta Laya (Fast, Joyous Tempo)",
    image: "/images/malavika_dance_stage.jpg",
    description:
      "A burst of rhythmic joy featuring rapid sculptural freezes reminiscent of Chola bronzes and ancient temple pillars, celebrated for its aesthetic beauty.",
    significance: "The ecstatic visual and auditory celebration before concluding the recital."
  },
  {
    step: "07",
    sanskrit: "मङ्गलम्",
    name: "Mangalam",
    translation: "The Sacred Benediction",
    focus: "Prayer, Humility & Universal Peace",
    tempo: "Gentle Reverent Laya",
    image: "/images/malavika_portrait.jpg",
    description:
      "The final blessing offering unconditional gratitude to Mother Earth, Nataraja, the Guru, the accompanying musicians, and every spectator present.",
    significance: "Returns the sacred energy back to the cosmos in universal harmony."
  }
];

export default function MargamWalkthrough() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { navigateTo } = useAcademy();
  const current = MARGAM_STAGES[activeIdx];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl p-6 sm:p-12 lg:p-14 bg-gradient-to-b from-[#140F24] via-[#0E0A1D] to-[#090614] text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Theatrical golden ambient glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-gradient-to-b from-amber-500/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8 sm:space-y-10">
          {/* Header */}
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-300 bg-amber-400/10 border border-amber-400/25 px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> The Sacred Repertory Suite
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif-luxury">
              The Path of the <span className="gold-foil-text">Margam</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
              Bharatanatyam is not simply dance routines; it is an ancient 7-tier spiritual pilgrimage codified in the Tanjore tradition. Each stage in our diploma program guides the student along this sacred architectural progression.
            </p>
          </AnimatedSection>

          {/* Step Selector Horizontal Bar */}
          <AnimatedSection animation="fade-up" className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
            {MARGAM_STAGES.map((stage, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border cursor-pointer tap-bounce ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-500 to-rose-600 text-white border-amber-300 shadow-lg shadow-amber-500/30 scale-105"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-amber-400/40"
                  }`}
                >
                  <span className={`text-[10px] font-black ${isSelected ? "text-amber-200" : "text-amber-400/80"}`}>
                    {stage.step}
                  </span>
                  <span>{stage.name}</span>
                </button>
              );
            })}
          </AnimatedSection>

          {/* Active Stage Detail Plate */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
            {/* Left Photo Arch */}
            <AnimatedSection animation="slide-left" className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border-2 border-amber-400/30 shadow-2xl group">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-[360px] sm:h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-amber-400/30 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                        Stage {current.step} of 07
                      </span>
                      <h4 className="text-base font-bold font-serif-luxury">{current.sanskrit} · {current.name}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                      {current.translation}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Information Column */}
            <AnimatedSection animation="slide-right" className="lg:col-span-7 space-y-5 text-left">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-400 font-serif-luxury text-xl font-bold">{current.sanskrit}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    {current.translation}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
                  {current.name}: {current.focus}
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              {/* Key Attributes Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Pedagogical Focus
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">{current.focus}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    Rhythmic Cycle (Talam)
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">{current.tempo}</p>
                </div>
              </div>

              {/* Spiritual Significance Quote */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-400/20">
                <p className="text-xs sm:text-sm italic text-amber-100 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Spiritual Dimension:</strong> {current.significance}</span>
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => navigateTo("trial", { title: "Bharatanatyam Diploma & Margam", category: "Dance" })}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer tap-bounce"
                >
                  <Award className="w-4 h-4 text-amber-200" />
                  <span>Begin Your Diploma Training</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo("courses")}
                  className="px-5 py-3.5 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 font-bold text-xs sm:text-sm transition-all text-center cursor-pointer tap-bounce"
                >
                  View Full 8 Offerings
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
