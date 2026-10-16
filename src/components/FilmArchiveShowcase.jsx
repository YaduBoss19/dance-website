import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Film, Clapperboard } from "lucide-react";

const FILMS = [
  {
    title: "Achuvinte Amma",
    year: "2005",
    director: "Sathyan Anthikad",
    starring: "Urvashi, Meera Jasmine, Narain",
    accolades: "National Film Award & Filmfare Award Winner",
    role: "Child Actress",
    desc: "A celebrated Malayalam family drama touching hearts across generations, marking one of Malavika's memorable childhood performances on the silver screen.",
    badge: "National Award Winning Film"
  },
  {
    title: "Rasathanthram",
    year: "2006",
    director: "Sathyan Anthikad",
    starring: "Mohanlal, Meera Jasmine, Bharath Gopi",
    accolades: "Blockbuster Classic & Kerala State Film Awards",
    role: "Child Actress",
    desc: "Sharing the screen alongside legendary Malayalam superstar Mohanlal in an iconic classic celebrated for its heart-touching rural storytelling.",
    badge: "All-Time Superhit"
  },
  {
    title: "Raappakal",
    year: "2005",
    director: "Kamal",
    starring: "Mammootty, Nayanthara, Sharada",
    accolades: "Critical Acclaim & Box Office Superhit",
    role: "Child Actress",
    desc: "Appearing alongside megastar Mammootty in this deeply emotional family drama exploring unconditional love and familial bond.",
    badge: "Cinematic Classic"
  },
  {
    title: "Vinodayathra",
    year: "2007",
    director: "Sathyan Anthikad",
    starring: "Dileep, Meera Jasmine, Mukesh",
    accolades: "Blockbuster Comedy-Drama",
    role: "Child Actress",
    desc: "A warm, light-hearted journey celebrating youth, personal transformation, and innocence, starring Malavika as part of an acclaimed ensemble.",
    badge: "Family Blockbuster"
  },
  {
    title: "Innathe Chinthavishayam",
    year: "2008",
    director: "Sathyan Anthikad",
    starring: "Mohanlal, Meera Jasmine, Sukanya",
    accolades: "Kerala State Film Award for Best Film with Popular Appeal",
    role: "Child Actress",
    desc: "Another collaboration with Mohanlal and master director Sathyan Anthikad, exploring modern relationships and reconciliation.",
    badge: "State Award Winner"
  }
];

const ALBUMS = [
  {
    title: "Mizhiazhagu Nirayum Radha",
    type: "Devotional Music Album",
    description: "Soul-stirring classical devotional album celebrating the divine melodies and eternal grace of Radha and Krishna.",
    visual: "🪈"
  },
  {
    title: "Devapamba",
    type: "Devotional Music Album",
    description: "Sacred devotional recording echoing with Carnatic melodic beauty, spiritual resonance, and pure traditional devotion.",
    visual: "🕉️"
  }
];

export default function FilmArchiveShowcase() {
  const [activeFilmIdx, setActiveFilmIdx] = useState(0);
  const activeFilm = FILMS[activeFilmIdx];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl p-6 sm:p-12 bg-gradient-to-b from-[#130E26] via-[#0D081B] to-[#080512] text-white border border-amber-500/20 shadow-2xl relative overflow-hidden">
        {/* Theatrical lighting */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-10">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full">
              <Clapperboard className="w-3.5 h-3.5 text-amber-400" /> Silver Screen & Devotional Discography
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif-luxury">
              A Childhood on the <span className="gold-foil-text">Silver Screen</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
              Before founding DancingRagas, Dr. Malavika M. Sunil captured hearts as a child actress in five landmark Malayalam films alongside legends Mohanlal and Mammootty, alongside devotional albums and commercial productions.
            </p>
          </AnimatedSection>

          {/* Film selector pills */}
          <AnimatedSection animation="fade-up" className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-2">
            {FILMS.map((film, idx) => (
              <button
                key={film.title}
                onClick={() => setActiveFilmIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap tap-bounce flex items-center gap-2 border ${
                  activeFilmIdx === idx
                    ? "bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 scale-[1.02]"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>{film.title}</span>
                <span className="text-[10px] opacity-75 font-normal">({film.year})</span>
              </button>
            ))}
          </AnimatedSection>

          {/* Active Film Showcase Spotlight Card */}
          <AnimatedSection animation="zoom-in" className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-10 rounded-3xl bg-white/5 border border-amber-500/30 backdrop-blur-md relative overflow-hidden text-left hover-lift-3d">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 inline-block mb-2">
                    {activeFilm.badge}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white font-serif-luxury">
                    {activeFilm.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Directed by <strong className="text-slate-200">{activeFilm.director}</strong> • Released {activeFilm.year}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">Featured Role</span>
                  <span className="text-lg font-black text-white">{activeFilm.role}</span>
                </div>
              </div>

              <div className="py-5 space-y-4">
                <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-light">
                  {activeFilm.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Starring Cast:</span>
                    <span className="font-semibold text-slate-200">{activeFilm.starring}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Honours & Reception:</span>
                    <span className="font-semibold text-amber-300">{activeFilm.accolades}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Devotional Music Albums Strip */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 text-center mb-5">
              Devotional Albums & Recording Contributions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {ALBUMS.map((alb, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 text-left hover-lift"
                >
                  <span className="text-3xl p-2.5 rounded-xl bg-white/10 border border-white/10 shrink-0">
                    {alb.visual}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {alb.type}
                    </span>
                    <h5 className="text-base font-bold text-white font-serif-luxury mt-0.5">{alb.title}</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alb.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
