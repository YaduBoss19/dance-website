import React, { useState } from "react";
import { useAcademy } from "../context/AcademyContext";
import AnimatedSection from "../components/AnimatedSection";
import {
  Play,
  Maximize2,
  Video,
  Camera
} from "lucide-react";

export default function Gallery() {
  const { gallery, setLightboxItem } = useAcademy();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Performances",
    "Dance",
    "Music",
    "Kids Spotlight",
    "Studio Life"
  ];

  const filteredGallery = gallery.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 overflow-x-clip">
      {/* Header */}
      <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-amber-50/70 via-slate-50 to-white text-center">
        <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Moments of Grace & Melody
          </span>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-serif-luxury">
            Performance, Recitals & <span className="gold-foil-text italic">Artistry</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Glimpses into our stage productions in Georgia, classical Baithak vocal concerts, masterclass workshops, and personal mentorship under Dr. Malavika M. Sunil.
          </p>
        </AnimatedSection>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection animation="fade-up" className="flex items-center sm:justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-3xl mx-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap tap-bounce ${
                activeCategory === cat
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat === "All" ? "All Moments" : cat}
            </button>
          ))}
        </AnimatedSection>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredGallery.map((item, idx) => (
            <AnimatedSection
              key={item.id}
              delay={idx * 60}
              className="group relative rounded-3xl overflow-hidden bg-slate-950 aspect-[4/3] shadow-md hover-lift-3d transition-all duration-300 cursor-pointer text-left tap-bounce"
              onClick={() => setLightboxItem(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top media pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                  {item.category}
                </span>

                {item.type === "video" ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-rose-600 text-white flex items-center gap-1 shadow-sm">
                    <Video className="w-3 h-3" /> Video
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Photo
                  </span>
                )}
              </div>

              {/* Maximize icon */}
              <div className="absolute top-4 right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/60 group-hover:bg-purple-600 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Play icon centered for videos */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 text-white">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-snug group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Recital Production Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection
          animation="zoom-in"
          className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Professional Stage Experience
          </span>
          <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
            Professional Theater Light, Sound & High-Res Archiving
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All our annual recitals and chamber concerts are recorded by professional cinema videographers. High-definition performance footage and digital photo albums are gifted free of charge to all participating student families.
          </p>
        </AnimatedSection>
      </section>
    </div>
  );
}
