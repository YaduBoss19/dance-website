import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Activity, ShieldCheck, Heart, Sparkles, Stethoscope, ChevronRight } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

const BIOMECHANIC_POINTS = [
  {
    id: "aramandi",
    title: "Aramandi Biomechanics & Patellar Health",
    short: "Knee & Hip Rotation",
    icon: ShieldCheck,
    tag: "Orthopedic Safety",
    doctorPerspective:
      "Traditional Aramandi (demi-plié) is often mispracticed by forcing feet turnout from the knees, causing strain. Under Dr. Malavika’s medical eye, students learn to initiate external rotation strictly from the hip joints, maintaining knee-over-toe alignment to preserve the meniscus and ligaments.",
    benefits: [
      "Zero strain on knee ligaments (ACL/MCL protection)",
      "Balanced adductor and abductor muscular activation",
      "Stable grounding center of gravity for rapid footwork"
    ]
  },
  {
    id: "spine",
    title: "Neutral Spine & Core Lumbar Stabilization",
    short: "Spinal Ergonomics",
    icon: Activity,
    tag: "Posture Correction",
    doctorPerspective:
      "Classical dance requires dramatic chest opening without hyperextending the lower back. Applying anatomical kinesiology, Dr. Malavika trains deep transverse abdominal engagement to protect the lumbar vertebrae during intense Araimandi and leaps.",
    benefits: [
      "Correction of modern slouching, rounded shoulders, and text-neck",
      "Core spinal decompression and functional posture elegance",
      "Even weight distribution across the plantar fascia of the feet"
    ]
  },
  {
    id: "cardio",
    title: "Pranayama & Diaphragmatic Cardiovascular Stamina",
    short: "Breath & Endurance",
    icon: Heart,
    tag: "Cardiopulmonary Training",
    doctorPerspective:
      "A full Bharatanatyam recital requires immense cardiovascular endurance equivalent to continuous aerobic sprinting. We integrate traditional Yogic Pranayama with medical cardiopulmonary pacing to synchronize breath with complex rhythmic jathis without hyperventilation.",
    benefits: [
      "Increased VO2 lung capacity and steady oxygenation",
      "Prevention of sudden fatigue during fast Tisra/Chatusra speeds",
      "Calm mental focus under the physical demands of live stage recitals"
    ]
  },
  {
    id: "neurology",
    title: "Fine-Motor Dexterity & Neural Synaptic Activation",
    short: "Mudras & Neurology",
    icon: Sparkles,
    tag: "Neuro-Motor Development",
    doctorPerspective:
      "The 28 single-hand Hastha Mudras stimulate the sensory and motor homunculus in the cerebral cortex. Rapid transitions between mudras, facial expressions, and counter-rhythmic footwork create dense neuroplastic connections, boosting memory and fine-motor coordination.",
    benefits: [
      "Enhanced cognitive multitasking and spatial memory in children",
      "Therapeutic finger and wrist joint flexibility, counteracting screen fatigue",
      "Emotional regulation through classical Navarasa facial neuro-muscular control"
    ]
  }
];

export default function DoctorAnatomyShowcase() {
  const [activeTab, setActiveTab] = useState(BIOMECHANIC_POINTS[0]);
  const { navigateTo } = useAcademy();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl p-6 sm:p-12 lg:p-14 bg-gradient-to-b from-white via-amber-50/30 to-amber-100/20 border border-amber-200/80 shadow-xl relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* Header with Physician & Artist Badges */}
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" /> The Physician's Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif-luxury">
              Where <span className="gold-foil-text">Anatomical Science</span> Meets Sacred Art
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              Dr. Malavika M. Sunil is both an <strong>MBBS Physician</strong> and an accomplished <strong>Bharatanatyam Master</strong>. Our pedagogy is uniquely designed to ensure injury-free, ergonomically safe, and lifelong classical practice.
            </p>
          </AnimatedSection>

          {/* Interactive 4-Pillar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Nav List */}
            <AnimatedSection animation="slide-left" className="lg:col-span-5 flex flex-col gap-3">
              {BIOMECHANIC_POINTS.map((item) => {
                const isSelected = activeTab.id === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item)}
                    className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border cursor-pointer tap-bounce ${
                      isSelected
                        ? "bg-white border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.02] ring-1 ring-amber-400"
                        : "bg-white/70 border-slate-200 hover:border-amber-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                          {item.tag}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.short}</h3>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-amber-600 translate-x-1" : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </AnimatedSection>

            {/* Right Detail Card */}
            <AnimatedSection animation="slide-right" className="lg:col-span-7">
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                      {activeTab.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Doctor-Led Pedagogy
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif-luxury">
                    {activeTab.title}
                  </h3>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <p className="font-medium text-slate-800">{activeTab.doctorPerspective}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Clinical & Artistic Advantages:
                    </h4>
                    <ul className="space-y-2">
                      {activeTab.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                            ✓
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Trust Note */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">Taught Personally by Dr. Malavika</p>
                    <p className="text-[11px] text-slate-500">MBBS (Georgia) · Yoga Teacher · 21 Yrs Bharatanatyam</p>
                  </div>
                  <button
                    onClick={() => navigateTo("trial", { title: "Doctor-Guided Classical Training", category: "Dance" })}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer tap-bounce"
                  >
                    <span>Schedule Personal Consultation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
