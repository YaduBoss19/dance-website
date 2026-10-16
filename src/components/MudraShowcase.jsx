import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Sparkles, ChevronRight, Award } from "lucide-react";

const MUDRAS = [
  {
    id: "pataka",
    sanskrit: "पताक (Patāka)",
    name: "The Flag Gesture",
    significance: "Victory, Clouds, Waves, Beginning of Dance",
    shloka: "Natyarambhe Varidharē Vanē Vasthu Nishedhanē",
    description: "All fingers extended straight and pressed together with thumb bent at the side. The fundamental starting hand gesture in Bharatanatyam.",
    visual: "✋"
  },
  {
    id: "tripataka",
    sanskrit: "त्रिपताक (Tripatāka)",
    name: "The Three-Part Flag",
    significance: "Crown, Lightning, Tree, Sacred Arrow",
    shloka: "Makutē Vruksha Bhavē Vajrē Tada Dharē Kusuma Dharē",
    description: "Third finger (ring finger) is bent downwards while all other fingers remain erect and joined.",
    visual: "👑"
  },
  {
    id: "mayura",
    sanskrit: "मयूर (Mayūra)",
    name: "The Peacock Gesture",
    significance: "Peacock Neck, Applying Tilak, Stroking Hair, Grace",
    shloka: "Mayurasyē Lathāyāñca Shakunē Vamanē Thathā",
    description: "The ring finger and thumb tips touch together while remaining fingers are extended straight like graceful peacock plumage.",
    visual: "🦚"
  },
  {
    id: "ardhachandra",
    sanskrit: "अर्धचन्द्र (Ardhachandra)",
    name: "The Crescent Moon",
    significance: "Lord Shiva's Crown, Crescent Moon, Prayer, Meditation",
    shloka: "Chandrē Thārāyathē Chōrdhvē Prarthanāyām Viseshathah",
    description: "The thumb is stretched out from the palm while all fingers form a curved crescent like the waxing moon.",
    visual: "🌙"
  },
  {
    id: "anjali",
    sanskrit: "अञ्जलि (Añjali)",
    name: "Devine Salutation",
    significance: "Namaskaram, Divine Reverence, Teacher Respect",
    shloka: "Dēvathā Guruviprāṇām Namaskarē Prayujyathē",
    description: "Both Pataka hands brought together in reverent prayer at the heart, forehead, or crown.",
    visual: "🙏"
  }
];

export default function MudraShowcase() {
  const [selectedMudra, setSelectedMudra] = useState(MUDRAS[0]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8">
      <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Language of Classical Dance
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif-luxury">
          The Art of <span className="gold-foil-text">Hastha Mudras</span>
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
          In Bharatanatyam, hands speak what words cannot. Explore the sacred hand gestures codified in the Natya Shastra taught in our diploma curriculum.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Mudra Navigation Pills */}
        <AnimatedSection animation="slide-left" className="lg:col-span-5 flex flex-col gap-2.5">
          {MUDRAS.map((m) => {
            const isSelected = selectedMudra.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMudra(m)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border cursor-pointer tap-bounce ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent border-amber-400 shadow-md shadow-amber-500/10 scale-[1.01]"
                    : "bg-white border-slate-100 hover:border-amber-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl p-2 rounded-xl bg-amber-50 border border-amber-100/80">
                    {m.visual}
                  </span>
                  <div>
                    <h3 className={`text-sm sm:text-base font-bold ${isSelected ? "text-amber-950 font-serif-luxury text-lg" : "text-slate-800"}`}>
                      {m.sanskrit}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{m.name}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-amber-600 translate-x-1" : "text-slate-300"}`} />
              </button>
            );
          })}
        </AnimatedSection>

        {/* Mudra Detailed Showcase Card */}
        <AnimatedSection animation="slide-right" className="lg:col-span-7">
          <div className="h-full rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-950 to-slate-900 text-white border border-amber-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden text-left">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                    Sanskrit Codification • Abhinaya Darpana
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury mt-1">
                    {selectedMudra.sanskrit}
                  </h3>
                  <p className="text-xs text-rose-300 font-semibold">{selectedMudra.name}</p>
                </div>
                <div className="text-4xl sm:text-5xl p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  {selectedMudra.visual}
                </div>
              </div>

              {/* Shloka callout */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-400 mb-1">
                  Classical Shloka Recitation:
                </span>
                <p className="font-serif-luxury italic text-sm sm:text-base text-amber-100">
                  "{selectedMudra.shloka}"
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technique & Physical Execution:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedMudra.description}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Poetic Significance & Expressions:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMudra.significance.split(", ").map((sig, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 text-white font-medium border border-white/10"
                    >
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 relative z-10">
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <Award className="w-4 h-4 text-amber-400" /> Taught in Bharatanatyam Diploma Term 1
              </span>
              <span className="text-slate-500">Natya Shastra Lineage</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
