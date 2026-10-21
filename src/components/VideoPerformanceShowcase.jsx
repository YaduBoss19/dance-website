import React, { useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { Play, Pause, Volume2, VolumeX, Sparkles, AlertCircle, Film } from "lucide-react";

/**
 * Mobile-optimized video showcase component.
 * Supports HTML5 MP4 (with H.264 codec detection and friendly error recovery)
 * as well as YouTube/Vimeo embeds.
 */
export default function VideoPerformanceShowcase({
  videoSrc = "/videos/performance.mp4",
  posterImage = "/images/malavika_dance_stage.jpg",
  title = "Margam Stage Performance Recital",
  subtitle = "Dr. Malavika M. Sunil live in concert (Tbilisi & Kerala)",
  youtubeId = null
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay/play failed:", err);
          setIsPlaying(false);
          setHasError(true);
          setErrorMessage(
            "This MP4 file uses a video codec (like HEVC / H.265) that your browser cannot play directly. Please convert it to standard H.264 MP4."
          );
        });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVideoError = () => {
    setHasError(true);
    setErrorMessage(
      "Unsupported media codec or video file not found in public/videos/. Browsers require H.264 (AVC) encoded MP4 files."
    );
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-8">
      <AnimatedSection animation="fade-up" className="text-center space-y-3 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] bg-[#B99A63]/15 px-3.5 py-1.5 rounded-full border border-[#B99A63]/40 inline-flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
          <span>Cinematic Studio Prelude</span>
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#151515] tracking-tight font-serif-luxury">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          {subtitle}
        </p>
      </AnimatedSection>

      <div className="museum-frame max-w-4xl mx-auto group">
        <div className="museum-frame-inner aspect-video bg-[#151515] relative">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Approach B: Ambient blurred backdrop */}
            <img
              src={posterImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
              aria-hidden="true"
            />

            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterImage}
              playsInline
              preload="metadata"
              onError={handleVideoError}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="relative z-10 w-full h-full object-contain bg-black/40"
            />

            {/* Error Overlay Fallback */}
            {hasError && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm p-6 sm:p-10 flex flex-col items-center justify-center text-center text-white z-30">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                  MP4 Video Codec Notice
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-4 leading-relaxed">
                  {errorMessage}
                </p>
                <div className="p-3 rounded-xl bg-white/10 text-left text-xs text-amber-200 border border-white/10 max-w-md mb-4 space-y-1">
                  <p className="font-semibold text-white">How to fix this quickly:</p>
                  <p>1. Open your MP4 in any converter (like CloudConvert or HandBrake).</p>
                  <p>2. Select format: <strong>MP4 with H.264 (AVC) video + AAC audio</strong>.</p>
                  <p>3. Place the exported file in: <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">public/videos/performance.mp4</code></p>
                </div>
                <button
                  onClick={() => {
                    setHasError(false);
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Retry Loading Video
                </button>
              </div>
            )}

            {/* Overlay Play/Pause Trigger if not error */}
            {!hasError && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-center justify-center cursor-pointer transition-opacity"
              >
                {!isPlaying && (
                  <button
                    aria-label="Play performance video"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-2xl shadow-rose-600/40 group-hover:scale-110 active:scale-95 transition-all"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                  </button>
                )}

                {/* Bottom Video Info & Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white pointer-events-auto">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <span className="text-[11px] sm:text-xs font-semibold text-amber-200 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>Classical Repertoire</span>
                  </span>
                </div>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </section>
  );
}
