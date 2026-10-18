import React, { useState, useEffect, useRef } from "react";

const HERO_SLIDES = [
  {
    id: "slide-stage",
    image: "/images/malavika_dance_stage.jpg",
    alt: "Dr. Malavika M. Sunil — Classical Bharatanatyam Margam",
    title: "Dr. Malavika M. Sunil",
    role: "Classical Bharatanatyam Margam"
  },
  {
    id: "slide-pose",
    image: "/images/malavika_dance_pose.jpg",
    alt: "Dr. Malavika M. Sunil — Sacred Mudras and Classical Natya",
    title: "Dr. Malavika M. Sunil",
    role: "Sacred Mudras & Abhinaya"
  },
  {
    id: "slide-portrait",
    image: "/images/malavika_portrait.jpg",
    alt: "Dr. Malavika M. Sunil — MBBS Physician and Classical Dancer",
    title: "Dr. Malavika M. Sunil",
    role: "MBBS Physician & Movement Mentor"
  },
  {
    id: "slide-vocal",
    image: "/images/malavika_vocal.jpg",
    alt: "Dr. Malavika M. Sunil — Carnatic Vocal Music Lineage",
    title: "Dr. Malavika M. Sunil",
    role: "Carnatic Vocal & Shruti Sadhana"
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
      {/* Museum Frame Container — Pure Photo Display Without Cluttering Overlays */}
      <div className="museum-frame group shadow-2xl relative">
        <div
          onClick={handleSlideClick}
          className="museum-frame-inner aspect-[4/5] max-h-[280px] xs:max-h-[320px] sm:max-h-[460px] lg:max-h-[520px] bg-[#151515] relative overflow-hidden rounded-2xl cursor-pointer"
        >
          {/* Images with Smooth Fade Transition */}
          {HERO_SLIDES.map((slide, idx) => {
            const isVisible = idx === activeIdx;
            return (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105 pointer-events-none"
                }`}
              />
            );
          })}

          {/* Minimal Bottom Pagination Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-[#151515]/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-xs">
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
                    ? "w-4 h-1.5 bg-[#B99A63]"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
