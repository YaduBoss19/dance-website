import React, { useState, useRef, useEffect, useCallback } from "react";
import AnimatedSection from "./AnimatedSection";
import { PERFORMANCE_REELS } from "../data/initialData";
import {
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  ArrowRight,
  Film
} from "lucide-react";

export default function CinematicReelsShowcase({
  reels = PERFORMANCE_REELS,
  gallery,
  onPhotoClick,
  onExploreClick,
  onMeetArtistClick
}) {
  const publishedReels = reels.filter((r) => r.published !== false);
  const totalReels = publishedReels.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [leftParallax, setLeftParallax] = useState({ x: 0, y: 0 });

  const videoRef = useRef(null);
  const hideControlsTimerRef = useRef(null);

  const activeReel = publishedReels[currentIndex] || publishedReels[0];

  // Stop video safely when switching reels
  const stopCurrentVideo = useCallback(() => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {}
    }
    setIsPlaying(false);
  }, []);

  const goToNextReel = useCallback(() => {
    stopCurrentVideo();
    setCurrentIndex((prev) => (prev + 1) % totalReels);
    setControlsVisible(true);
  }, [stopCurrentVideo, totalReels]);

  const goToPrevReel = useCallback(() => {
    stopCurrentVideo();
    setCurrentIndex((prev) => (prev - 1 + totalReels) % totalReels);
    setControlsVisible(true);
  }, [stopCurrentVideo, totalReels]);

  const scheduleAutoHideControls = useCallback(() => {
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 2000);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setControlsVisible(true);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          scheduleAutoHideControls();
        })
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                scheduleAutoHideControls();
              })
              .catch(() => {});
          }
        });
    }
  }, [isPlaying, scheduleAutoHideControls]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReelTouchOrClick = () => {
    setControlsVisible(true);
    if (isPlaying) {
      scheduleAutoHideControls();
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setControlsVisible(true);
  };

  // Parallax on Left Hero Panel
  const handleLeftMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setLeftParallax({ x, y });
  };

  const handleLeftMouseLeave = () => {
    setLeftParallax({ x: 0, y: 0 });
  };

  // Keyboard navigation when focused/hovered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (isHovered) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goToNextReel();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToPrevReel();
        } else if (e.key === " ") {
          e.preventDefault();
          togglePlayPause();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, goToNextReel, goToPrevReel, togglePlayPause]);

  useEffect(() => {
    return () => {
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, []);

  // Arrow visibility requirement:
  // Hidden when video is playing; visible when paused, stopped, tapped or hovered
  const showArrows = !isPlaying && (isHovered || controlsVisible);

  const formattedCounter = `${String(currentIndex + 1).padStart(2, "0")} / ${String(totalReels).padStart(2, "0")}`;

  return (
    <section
      id="gallery-section"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#151515] text-[#F5F0E8] border-b border-[#A9A49D]/20 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3B0B14]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#B99A63]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Heading Tag */}
        <AnimatedSection animation="fade-up" className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B0B14] border border-[#B99A63]/40 text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>Cinematic Performance Wall</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F0E8] font-serif-luxury">
            Gallery & Achievements
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A continuous stream of stage recitals, vocal concerts, and international productions featuring Dr. Malavika M. Sunil.
          </p>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════════
            TWO-PANEL CINEMATIC COMPOSITION
            Left (55-60%): Cinematic Artist Hero with Burgundy Gradient
            Right (40-45%): Infinite Instagram-Style Reels Carousel (9:16)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ─────────────────────────────────────────────────────────────
              LEFT PANEL: Full-screen Cinematic Artist Hero (58% width)
          ───────────────────────────────────────────────────────────── */}
          <div
            onMouseMove={handleLeftMouseMove}
            onMouseLeave={handleLeftMouseLeave}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#B99A63]/40 relative min-h-[500px] sm:min-h-[580px] lg:min-h-[660px] flex flex-col justify-between p-8 sm:p-12 shadow-2xl group transition-all"
          >
            {/* Background Performance Photograph with Subtle Parallax */}
            <div
              style={{
                transform: `scale(1.05) translate(${leftParallax.x * -1}px, ${leftParallax.y * -1}px)`,
                transition: "transform 0.25s ease-out"
              }}
              className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
            >
              <img
                src="/images/malavika_dance_stage.jpg"
                alt="Dr. Malavika Sunil Bharatanatyam Performance"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Sophisticated Dark Burgundy & Charcoal Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#151515] via-[#24050B]/85 to-[#3B0B14]/75 pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-radial-to-r from-transparent via-[#151515]/40 to-[#151515]/80 pointer-events-none" />

            {/* Top Brand Credential */}
            <div className="relative z-20 space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515]/90 border border-[#B99A63]/50 text-[#D4AF37] text-[11px] font-bold tracking-widest uppercase backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
                <span>DancingRagas</span>
                <span>•</span>
                <span className="text-slate-300">Art · Rhythm · Tradition</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#B99A63] uppercase">
                Dr. Malavika M. Sunil
              </p>
            </div>

            {/* Center-Bottom Headline & Value Pitch */}
            <div className="relative z-20 space-y-6 text-left my-auto pt-16 pb-8">
              <div className="space-y-3">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F0E8] font-serif-luxury leading-[1.08]">
                  Where Rhythm <br />
                  <span className="italic text-[#D4AF37]">Meets Tradition.</span>
                </h3>
                <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-300 uppercase">
                  Bharatanatyam · Music · Movement
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg font-normal drop-shadow-sm">
                Experience classical Indian arts as living, breathing expressions. From 21+ years of pure Bharatanatyam Margam to hereditary Carnatic vocals and physician-guided kinesiology.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (onExploreClick) onExploreClick();
                    else {
                      const el = document.getElementById("services-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-[#B99A63]/25 hover:scale-[1.02] active:scale-95 transition-all tap-bounce cursor-pointer"
                >
                  <span>Explore the Art</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (onMeetArtistClick) onMeetArtistClick();
                    else {
                      const el = document.getElementById("artistic-journey");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#151515]/90 hover:bg-[#202020] border border-[#B99A63]/50 text-[#F5F0E8] font-bold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all tap-bounce cursor-pointer"
                >
                  <span>Meet the Artist</span>
                </button>
              </div>
            </div>

            {/* Bottom Accolades Strip */}
            <div className="relative z-20 pt-6 border-t border-[#B99A63]/30 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#D4AF37]">21+ Yrs</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Bharatanatyam</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#D4AF37]">16+ Yrs</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Carnatic Vocal</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#D4AF37]">600+</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Stage Recitals</div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT PANEL: Infinite Instagram-Style Reels Carousel (42% width)
              9:16 Vertical Portrait Experience with Exact Arrow Visibility
          ───────────────────────────────────────────────────────────── */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-5 flex flex-col justify-between space-y-4"
          >
            {/* Top Carousel Status Bar */}
            <div className="flex items-center justify-between px-2 text-left">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#B99A63] flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#B99A63]" />
                  <span>Performance Reel</span>
                </span>
              </div>

              {/* Counter Display: 01 / 06 */}
              <div className="px-3.5 py-1 rounded-full bg-[#1E1B1B] border border-[#B99A63]/40 text-[#D4AF37] font-serif-luxury text-sm font-bold tracking-wider shadow-sm">
                {formattedCounter}
              </div>
            </div>

            {/* 9:16 Instagram-Style Reel Card */}
            <div
              onClick={handleReelTouchOrClick}
              className="relative w-full aspect-[9/16] max-h-[640px] rounded-3xl overflow-hidden bg-[#0d0d0d] border-2 border-[#B99A63]/60 shadow-2xl group/reel cursor-pointer mx-auto flex items-center justify-center select-none"
            >
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                src={activeReel.videoUrl}
                poster={activeReel.posterImage}
                playsInline
                loop={false}
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover"
              />

              {/* Gradient Scrims for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-[#151515]/60 pointer-events-none" />

              {/* Top Reel Info Strip */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#151515]/85 border border-[#B99A63]/50 text-[#D4AF37] backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#B99A63]" />
                  <span>{activeReel.tag}</span>
                </span>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="p-2 rounded-full bg-[#151515]/80 hover:bg-[#151515] text-[#F5F0E8] border border-white/20 backdrop-blur-md shadow-md pointer-events-auto transition-transform active:scale-90"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-slate-300" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#B99A63]" />
                  )}
                </button>
              </div>

              {/* ─────────────────────────────────────────────────────────
                  CENTER PLAY / PAUSE BUTTON OVERLAY
                  Visible when video is paused or during tap interaction
              ───────────────────────────────────────────────────────── */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-[#151515]/40 backdrop-blur-[2px] transition-all">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    aria-label="Play performance reel"
                    className="w-20 h-20 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] flex items-center justify-center shadow-2xl shadow-[#B99A63]/60 transform hover:scale-110 active:scale-95 transition-all cursor-pointer tap-bounce"
                  >
                    <Play className="w-8 h-8 fill-[#151515] ml-1" />
                  </button>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5F0E8] bg-[#151515]/85 px-4 py-1.5 rounded-full border border-[#B99A63]/40 shadow-lg">
                    Watch Reel {activeReel.reelNumber}
                  </span>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────
                  CRITICAL ARROW NAVIGATION BEHAVIOUR
                  1. Hidden completely when video is playing
                  2. Visible when paused, stopped, or on hover
              ───────────────────────────────────────────────────────── */}
              <div
                className={`absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-30 transition-all duration-300 ${
                  showArrows
                    ? "opacity-100 pointer-events-auto scale-100"
                    : "opacity-0 pointer-events-none scale-95"
                }`}
              >
                {/* Previous Reel Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevReel();
                  }}
                  aria-label="Previous Performance Reel"
                  className="w-11 h-11 rounded-full bg-[#151515]/90 hover:bg-[#B99A63] text-[#F5F0E8] hover:text-[#151515] border border-[#B99A63]/50 shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-90 cursor-pointer tap-bounce"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Reel Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextReel();
                  }}
                  aria-label="Next Performance Reel"
                  className="w-11 h-11 rounded-full bg-[#151515]/90 hover:bg-[#B99A63] text-[#F5F0E8] hover:text-[#151515] border border-[#B99A63]/50 shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-90 cursor-pointer tap-bounce"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Reel Description Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-left pointer-events-none">
                <div className="space-y-1 bg-[#151515]/80 p-3.5 rounded-2xl border border-[#B99A63]/30 backdrop-blur-md shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#B99A63] uppercase tracking-wider">
                      {activeReel.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {activeReel.duration}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold font-serif-luxury text-[#F5F0E8] leading-snug">
                    {activeReel.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {activeReel.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Carousel Controls & Helper Text */}
            <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400">
              <span className="text-[11px] italic text-[#A9A49D]">
                {isPlaying ? "Playing · Controls hidden for cinematic immersion" : "Paused · Use arrows to browse reels"}
              </span>

              <div className="flex items-center gap-1.5">
                {publishedReels.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      stopCurrentVideo();
                      setCurrentIndex(dotIdx);
                    }}
                    aria-label={`Go to reel ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      dotIdx === currentIndex
                        ? "w-6 bg-[#B99A63]"
                        : "w-1.5 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PHOTOGRAPHIC ARCHIVE & STAGE MOMENTS (WITH LIGHTBOX)
        ═══════════════════════════════════════════════════════════════ */}
        {gallery && gallery.length > 0 && (
          <div className="pt-10 border-t border-[#A9A49D]/20 space-y-6">
            <div className="flex items-center justify-between text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63]">
                  Archival Photography
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#F5F0E8]">
                  Curated Stage & Studio Moments
                </h4>
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline-block">
                Click any portrait to inspect in full resolution
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onPhotoClick && onPhotoClick(item)}
                  className="card-photo-frame aspect-square bg-[#1E1B1B] group cursor-pointer shadow-lg hover:border-[#B99A63] transition-all tap-bounce border border-[#B99A63]/30 rounded-2xl overflow-hidden relative"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left text-white">
                    <span className="text-[10px] font-bold text-[#B99A63] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <p className="text-xs font-bold truncate text-[#F5F0E8]">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
