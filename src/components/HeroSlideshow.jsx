import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Award, Maximize2 } from "lucide-react";

const HERO_SLIDES = [
  {
    id: "slide-stage",
    image: "/images/malavika_dance_stage.jpg",
    alt: "Dr. Malavika M. Sunil — Classical Bharatanatyam Margam",
    title: "Dr. Malavika M. Sunil",
    role: "Classical Bharatanatyam Margam",
    badge: "21+ Yrs Lineage · Stage Recital",
    accolade: "CCRT National Scholar",
    subAccolade: "Govt. of India · Age 12"
  },
  {
    id: "slide-pose",
    image: "/images/malavika_dance_pose.jpg",
    alt: "Dr. Malavika M. Sunil — Sacred Mudras and Classical Natya",
    title: "Dr. Malavika M. Sunil",
    role: "Sacred Mudras & Abhinaya",
    badge: "Precision Adavu Technique",
    accolade: "Margam Repertoire",
    subAccolade: "Alarippu to Thillana"
  },
  {
    id: "slide-portrait",
    image: "/images/malavika_portrait.jpg",
    alt: "Dr. Malavika M. Sunil — MBBS Physician and Classical Dancer",
    title: "Dr. Malavika M. Sunil",
    role: "MBBS Physician & Movement Mentor",
    badge: "Doctor-Led Anatomy & Safety",
    accolade: "Medical Physician",
    subAccolade: "MBBS · Yoga Instructor"
  },
  {
    id: "slide-vocal",
    image: "/images/malavika_vocal.jpg",
    alt: "Dr. Malavika M. Sunil — Carnatic Vocal Music Lineage",
    title: "Dr. Malavika M. Sunil",
    role: "Carnatic Vocal & Shruti Sadhana",
    badge: "16+ Yrs Hereditary Music Lineage",
    accolade: "Vocal Lineage",
    subAccolade: "Resmi Narayanan Disciple"
  }
];

export default function HeroSlideshow({ onPhotoClick }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[activeIdx];

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-play slideshow every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides]);

  const handleSlideClick = () => {
    if (onPhotoClick) {
      onPhotoClick({
        id: currentSlide.id,
        title: currentSlide.title,
        category: currentSlide.role,
        image: currentSlide.image,
        caption: `${currentSlide.title} — ${currentSlide.role}. Discipleship of 21+ years, CCRT National Scholar, MBBS Physician.`
      });
    }
  };

  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      if (diffX > 40) {
        prevSlide();
      } else if (diffX < -40) {
        nextSlide();
      }
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative mx-auto max-w-[280px] xs:max-w-xs sm:max-w-md lg:max-w-none transition-transform will-change-transform select-none"
    >
      {/* Museum Frame Container */}
      <div className="museum-frame group shadow-2xl relative">
        <div className="museum-frame-inner aspect-[4/5] max-h-[250px] xs:max-h-[290px] sm:max-h-[440px] lg:max-h-[500px] bg-[#151515] relative overflow-hidden rounded-2xl">
          {/* Images with Smooth Fade Transition */}
          {HERO_SLIDES.map((slide, idx) => {
            const isVisible = idx === activeIdx;
            return (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                onClick={handleSlideClick}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 cursor-pointer ${
                  isVisible
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-105 pointer-events-none"
                }`}
              />
            );
          })}

          {/* Luxury Vignette & Artist Information Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/25 to-transparent flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
            {/* Top Row: Artist Tag & Slide Counter */}
            <div className="flex items-center justify-between w-full pointer-events-auto">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#151515]/90 backdrop-blur-md text-[#D4AF37] border border-[#B99A63]/60 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 text-[#B99A63]" />
                <span>Artist &amp; Mentor</span>
              </span>

              {/* Slide Counter Badge (e.g. 01 / 04) */}
              <div className="px-2.5 py-1 rounded-full bg-[#151515]/90 backdrop-blur-md border border-[#B99A63]/50 text-[10px] sm:text-xs font-mono font-bold text-[#D4AF37] shadow-lg">
                <span>0{activeIdx + 1}</span>
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-slate-400">0{totalSlides}</span>
              </div>
            </div>

            {/* Middle Hover Zoom Prompt */}
            <div
              onClick={handleSlideClick}
              className="self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer"
            >
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#F5F0E8] bg-[#151515]/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#B99A63]/50 backdrop-blur-xs shadow-xl flex items-center gap-1.5">
                <Maximize2 className="w-3 h-3 text-[#B99A63]" />
                <span>View Full Photo</span>
              </span>
            </div>

            {/* Bottom Info & Caption */}
            <div className="text-left text-[#F5F0E8] space-y-1">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#B99A63] text-[#151515] uppercase tracking-wider inline-block">
                {currentSlide.badge}
              </span>
              <h3 className="text-lg sm:text-2xl font-bold font-serif-luxury text-[#F5F0E8] leading-tight">
                {currentSlide.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#D4AF37] font-medium leading-snug">
                {currentSlide.role}
              </p>
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#151515]/85 hover:bg-[#B99A63] text-[#F5F0E8] hover:text-[#151515] border border-[#B99A63]/50 shadow-xl flex items-center justify-center transition-all cursor-pointer tap-bounce z-20"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#151515]/85 hover:bg-[#B99A63] text-[#F5F0E8] hover:text-[#151515] border border-[#B99A63]/50 shadow-xl flex items-center justify-center transition-all cursor-pointer tap-bounce z-20"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-[#151515]/75 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === activeIdx
                    ? "w-5 h-1.5 bg-[#B99A63]"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Top-Right Floating Badge: Dynamic per slide */}
      <div className="absolute -top-3 right-1 sm:-top-4 sm:-right-3 bg-[#151515]/95 text-[#F5F0E8] border border-[#B99A63]/70 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-2xl text-left flex items-center gap-2 z-30 backdrop-blur-md">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold leading-tight">{currentSlide.accolade}</div>
          <div className="text-[8px] sm:text-[9px] text-[#A9A49D] leading-tight">{currentSlide.subAccolade}</div>
        </div>
      </div>

      {/* Bottom-Left Floating Badge: 600+ Recitals & 5 Films */}
      <div className="absolute -bottom-3 left-1 sm:-bottom-4 sm:-left-3 bg-[#24050B]/95 text-[#F5F0E8] border border-[#B99A63]/70 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-2xl text-left flex items-center gap-2 z-30 backdrop-blur-md">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#3B0B14] flex items-center justify-center text-[#D4AF37] shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] leading-tight">600+ Recitals · 5 Films</div>
          <div className="text-[8px] sm:text-[9px] text-slate-300 leading-tight">21+ Yrs Classical Lineage</div>
        </div>
      </div>
    </div>
  );
}
