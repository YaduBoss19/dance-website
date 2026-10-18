import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { playGhungrooChime } from "../utils/talamAudio";
import { Sparkles, Eye, Heart, Compass, Shield, Flame, Smile, Wind, Moon } from "lucide-react";

const NAVARASAS = [
  {
    id: "shringara",
    name: "Shringara",
    sanskrit: "शृङ्गार",
    emotion: "Love, Beauty & Divine Devotion",
    deity: "Vishnu",
    colorHex: "#D4AF37",
    colorName: "Shyama · Rose Gold & Pale Green",
    sthayiBhava: "Rati (Affection / Erotic & Spiritual Love)",
    shloka: "शृङ्गारः शुचिरुज्ज्वलः — Natya Shastra VI.45",
    icon: Heart,
    bgGradient: "from-amber-950/40 via-[#3B0B14]/40 to-[#151515]",
    accentBorder: "border-[#D4AF37]",
    abhinaya:
      "Raised graceful eyebrows, gentle Kataksha (sidelong glance), relaxed lips with subtle smile, and rhythmic breathing expressing tender adoration for the Divine."
  },
  {
    id: "hasya",
    name: "Hasya",
    sanskrit: "हास्य",
    emotion: "Mirth, Joy & Playful Laughter",
    deity: "Pramatha",
    colorHex: "#F59E0B",
    colorName: "Sita · Radiant Pure White & Gold",
    sthayiBhava: "Hasa (Amusement / Cosmic Play)",
    shloka: "हास्यो नाम प्रहसनस्वभावः — Natya Shastra VI.49",
    icon: Smile,
    bgGradient: "from-amber-900/30 via-yellow-950/20 to-[#151515]",
    accentBorder: "border-amber-400",
    abhinaya:
      "Sparkling narrowed eyes, lifted cheek muscles, vibrating chin, and buoyant head nods capturing lighthearted irony or divine Leela."
  },
  {
    id: "karuna",
    name: "Karuna",
    sanskrit: "करुण",
    emotion: "Compassion, Pathos & Deep Grief",
    deity: "Yama",
    colorHex: "#A9A49D",
    colorName: "Kapota · Dove Grey & Soft Muted Slate",
    sthayiBhava: "Shoka (Heartfelt Sorrow / Empathy)",
    shloka: "करुणस्तु शोकात्मकः — Natya Shastra VI.61",
    icon: Moon,
    bgGradient: "from-slate-800/40 via-stone-900/40 to-[#151515]",
    accentBorder: "border-stone-400",
    abhinaya:
      "Drooping eyelids, unblinking moist eyes, trembling lower lip, deep suspended exhalation, and a softly tilted neck reflecting profound sorrow."
  },
  {
    id: "raudra",
    name: "Raudra",
    sanskrit: "रौद्र",
    emotion: "Fierce Wrath & Righteous Fury",
    deity: "Rudra (Shiva)",
    colorHex: "#EF4444",
    colorName: "Rakta · Blazing Crimson Red",
    sthayiBhava: "Krodha (Indignation & Righteous Anger)",
    shloka: "रौद्रः क्रोधात्मको भवेत् — Natya Shastra VI.63",
    icon: Flame,
    bgGradient: "from-rose-950/50 via-red-950/30 to-[#151515]",
    accentBorder: "border-rose-500",
    abhinaya:
      "Piercing wide glare, tightly knitted eyebrows, flared nostrils, clenched teeth, and firm Thatte Mettu foot-stamps driving rhythmic fire."
  },
  {
    id: "veera",
    name: "Veera",
    sanskrit: "वीर",
    emotion: "Heroism, Courage & Regal Valour",
    deity: "Indra",
    colorHex: "#F97316",
    colorName: "Gaura · Saffron Gold & Bright Ochre",
    sthayiBhava: "Utsaha (Boundless Vigour & Resolve)",
    shloka: "वीरस्त्वथ उत्साहात्मकः — Natya Shastra VI.66",
    icon: Shield,
    bgGradient: "from-orange-950/40 via-amber-950/30 to-[#151515]",
    accentBorder: "border-orange-500",
    abhinaya:
      "Unflinching straight gaze, chest prominently expanded, resolute squared jaw, and stately poised hand gestures depicting the righteous protector."
  },
  {
    id: "bhayanaka",
    name: "Bhayanaka",
    sanskrit: "भयानक",
    emotion: "Terror, Dread & Cosmic Trepidation",
    deity: "Kala (Time)",
    colorHex: "#6366F1",
    colorName: "Asikni · Deep Midnight Indigo",
    sthayiBhava: "Bhaya (Apprehension of the Unknown)",
    shloka: "भयानको नाम भयस्थायीभावः — Natya Shastra VI.68",
    icon: Wind,
    bgGradient: "from-indigo-950/40 via-slate-950 to-[#151515]",
    accentBorder: "border-indigo-400",
    abhinaya:
      "Trembling restless pupils darting side-to-side, recoiling posture, rapid shallow breath, and hands held in defensive protective mudras."
  },
  {
    id: "bibhatsa",
    name: "Bibhatsa",
    sanskrit: "बीभत्स",
    emotion: "Aversion & Disgust for the Base",
    deity: "Mahakala",
    colorHex: "#8B5CF6",
    colorName: "Neela · Deep Ocean Violet",
    sthayiBhava: "Jugupsa (Revulsion against impurity)",
    shloka: "बीभत्सस्तु जुगुप्सात्मकः — Natya Shastra VI.72",
    icon: Compass,
    bgGradient: "from-purple-950/40 via-violet-950/20 to-[#151515]",
    accentBorder: "border-purple-400",
    abhinaya:
      "Wrinkled nasal bridge, averted gaze, curled upper lip, and hands positioned outward rejecting worldly illusion and unrighteousness."
  },
  {
    id: "adbhuta",
    name: "Adbhuta",
    sanskrit: "अद्भुत",
    emotion: "Wonder, Marvel & Cosmic Awe",
    deity: "Brahma",
    colorHex: "#EAB308",
    colorName: "Peeta · Solar Golden Light",
    sthayiBhava: "Vismaya (Awe-inspiring Astonishment)",
    shloka: "अद्भुतो विस्मयात्मकः — Natya Shastra VI.74",
    icon: Sparkles,
    bgGradient: "from-yellow-950/40 via-amber-950/30 to-[#151515]",
    accentBorder: "border-yellow-400",
    abhinaya:
      "Eyes opened wide with arched brows, round motionless pupils, gently parted lips, and soft gasps of disbelief at witnessing the infinite universe."
  },
  {
    id: "shanta",
    name: "Shanta",
    sanskrit: "शान्त",
    emotion: "Tranquility, Stillness & Absolute Peace",
    deity: "Shiva (Yogeshwara)",
    colorHex: "#E2E8F0",
    colorName: "Dhavala · Pure Celestial Ivory White",
    sthayiBhava: "Sama (Calm Equilibrium / Moksha)",
    shloka: "शान्तो नाम शमस्थायिभावात्मकः — Natya Shastra VI.83",
    icon: Eye,
    bgGradient: "from-slate-900/60 via-stone-900 to-[#151515]",
    accentBorder: "border-white/60",
    abhinaya:
      "Half-closed serene eyes in Nasikagra Drishti (gaze on nose tip), serene unmoving countenance, rhythmic yogic breath, radiating total peace."
  }
];

export default function NavarasaWheel() {
  const [selectedRasa, setSelectedRasa] = useState(NAVARASAS[0]);

  const handleSelectRasa = (rasa) => {
    setSelectedRasa(rasa);
    playGhungrooChime();
  };

  const ActiveIcon = selectedRasa.icon;

  return (
    <section id="navarasa-section" className="py-10 xs:py-12 sm:py-16 lg:py-20 px-4 sm:px-8 border-b border-[#A9A49D]/20 bg-[#151515] text-[#F5F0E8] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#3B0B14]/30 via-[#B99A63]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 lg:space-y-12 relative z-10">
        {/* Header Title */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] bg-[#B99A63]/15 px-3.5 py-1.5 rounded-full border border-[#B99A63]/40 inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>Natya Shastra · 9 Aesthetic Sentiments</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F0E8] font-serif-luxury">
            The Interactive Navarasa Dial
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            In classical Bharatanatyam, true mastery is not merely technical footwork, but <em>Abhinaya</em>—the ability to channel the nine timeless emotional states of human existence. Tap each Rasa to explore its facial gestures, Sanskrit scripture, and sacred deity.
          </p>
        </AnimatedSection>

        {/* 9 Rasas Selector Tabs / Lotus Petal Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {NAVARASAS.map((rasa) => {
            const isCurrent = selectedRasa.id === rasa.id;
            const RasaIcon = rasa.icon;
            return (
              <button
                key={rasa.id}
                onClick={() => handleSelectRasa(rasa)}
                className={`group px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer tap-bounce ${
                  isCurrent
                    ? "bg-[#B99A63] text-[#151515] shadow-lg shadow-[#B99A63]/30 scale-105"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:border-[#B99A63]/50 hover:bg-white/10"
                }`}
              >
                <RasaIcon className={`w-3.5 h-3.5 ${isCurrent ? "text-[#151515]" : "text-[#B99A63]"}`} />
                <span>{rasa.name}</span>
                <span className={`text-[10px] font-normal ${isCurrent ? "text-stone-800" : "text-slate-400"}`}>
                  {rasa.sanskrit}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Rasa Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div
            key={selectedRasa.id}
            className={`rounded-3xl p-6 sm:p-10 border ${selectedRasa.accentBorder} bg-gradient-to-br ${selectedRasa.bgGradient} shadow-2xl transition-all duration-500 animate-silk-fan text-left`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Sanskrit Callout & Icon */}
              <div className="md:col-span-5 space-y-4 border-b md:border-b-0 md:border-r border-white/15 pb-6 md:pb-0 md:pr-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#B99A63] shadow-inner">
                  <ActiveIcon className="w-8 h-8" style={{ color: selectedRasa.colorHex }} />
                </div>

                <div>
                  <span className="text-4xl sm:text-5xl font-black font-serif-luxury text-[#F5F0E8] block tracking-wide">
                    {selectedRasa.sanskrit}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury mt-1" style={{ color: selectedRasa.colorHex }}>
                    {selectedRasa.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    {selectedRasa.emotion}
                  </p>
                </div>

                <div className="pt-2 space-y-1.5 text-xs text-slate-300 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Presiding Deity:</span>
                    <span className="font-bold text-white">{selectedRasa.deity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Colour Association:</span>
                    <span className="font-bold text-white">{selectedRasa.colorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sthayi Bhava:</span>
                    <span className="font-bold text-white">{selectedRasa.sthayiBhava}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Abhinaya Technique Breakdown */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#B99A63] block mb-1">
                    Scriptural Foundation
                  </span>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-[#D4AF37] italic">
                    "{selectedRasa.shloka}"
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                    <Eye className="w-4 h-4 text-[#B99A63]" />
                    <span>Abhinaya & Facial Choreography:</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                    {selectedRasa.abhinaya}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[11px] text-[#A9A49D]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B99A63] shrink-0" />
                  <span>Taught systematically in Dr. Malavika's Online Bharatanatyam Diploma curriculum.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
