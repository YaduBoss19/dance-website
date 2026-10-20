import React, { useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { playGhungrooChime } from "../utils/talamAudio";
import {
  Play,
  Sparkles,
  Clock,
  Eye,
  Award,
  Film,
  Music,
  GraduationCap,
  Calendar,
  ExternalLink,
  AlertCircle
} from "lucide-react";

function InstagramIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// Complete archive of authentic performances, recitals, concerts, and workshops
const PERFORMANCE_ARCHIVE = [
  // ── CLASSICAL DANCE ──────────────────────────────────────────────
  {
    id: "vid-classical-01",
    title: "Bharatanatyam — Live Stage Performance",
    subtitle: "Sacred Margam Invocations & Intricate Adavu Precision",
    category: "Classical Dance",
    duration: "14:20",
    views: "18.4K",
    date: "Oct 2026",
    thumbnail: "/images/malavika_dance_stage.jpg",
    videoUrl: "/videos/performance.mp4",
    description:
      "A full-length live Margam stage performance featuring intricate Adavu footwork, crisp Aramandi stance, and evocative Abhinaya in traditional temple silk attire.",
    featuredBadge: "Featured Masterwork"
  },
  {
    id: "vid-classical-02",
    title: "Margam Varnam & Expressive Abhinaya Recital",
    subtitle: "Rhythmic Footwork & Deep Emotional Resonance",
    category: "Classical Dance",
    duration: "18:45",
    views: "12.8K",
    date: "Sep 2026",
    thumbnail: "/images/stage_shows/stage_01.jpg",
    videoUrl: "/videos/recital_live_01.mp4",
    description:
      "Dr. Malavika presents the cornerstone of the Bharatanatyam Margam — the Varnam — harmonizing brisk rhythmic jathis with nuanced emotional storytelling.",
    featuredBadge: "Classical Recital"
  },
  {
    id: "vid-classical-03",
    title: "Alarippu Invocation & Hastha Mudra Showcase",
    subtitle: "Sacred Dedication to Lord Nataraja",
    category: "Classical Dance",
    duration: "08:15",
    views: "9.6K",
    date: "Aug 2026",
    thumbnail: "/images/malavika_dance_pose.jpg",
    videoUrl: "/videos/recital_live_03.mp4",
    description:
      "The traditional opening prayer piece of the Margam repertoire, showcasing precise eye gestures (Drishti Bhedas), neck movements, and foundational postures.",
    featuredBadge: "Temple Invocation"
  },

  // ── CARNATIC MUSIC ───────────────────────────────────────────────
  {
    id: "vid-music-01",
    title: "Carnatic Vocal Shruti Alignment & Raga Alapana",
    subtitle: "16+ Years Hereditary Lineage under Resmi Narayanan",
    category: "Carnatic Music",
    duration: "16:30",
    views: "11.2K",
    date: "Oct 2026",
    thumbnail: "/images/music_and_dance/music_01.jpg",
    videoUrl: "/videos/performance.mp4",
    description:
      "Rooted in hereditary musical lineage, this session demonstrates foundational Sa-Pa-Sa' Tanpura alignment, Sarali Varisais, and soulful raga elaboration.",
    featuredBadge: "Vocal Sadhana"
  },
  {
    id: "vid-music-02",
    title: "Geetham & Keerthanam Vocal Concert Recital",
    subtitle: "Devotional Compositions & Rhythmic Precision",
    category: "Carnatic Music",
    duration: "21:10",
    views: "8.7K",
    date: "Sep 2026",
    thumbnail: "/images/malavika_vocal.jpg",
    videoUrl: "/videos/recital_live_02.mp4",
    description:
      "Live acoustic vocal recital featuring classic Purandara Dasa and Tyagaraja compositions with pure Shruti discipline and tala clarity.",
    featuredBadge: "Concert Rendition"
  },
  {
    id: "vid-music-03",
    title: "Tala Mathematics & Swara Sadhana for Dancers",
    subtitle: "Connecting Vocal Music with Stage Footwork",
    category: "Carnatic Music",
    duration: "11:45",
    views: "7.9K",
    date: "Aug 2026",
    thumbnail: "/images/music_and_dance/music_03.jpg",
    videoUrl: "/videos/recital_live_01.mp4",
    description:
      "Exploring the vital bridge between Carnatic rhythmic calculation and dancer footwork across the 7 principal Tala cycles.",
    featuredBadge: "Rhythm Masterclass"
  },

  // ── STAGE PERFORMANCES ───────────────────────────────────────────
  {
    id: "vid-stage-01",
    title: "Grand Auditorium Stage Choreography Production",
    subtitle: "Intricate Rhythm Patterns & Dramatic Illumination",
    category: "Stage Performances",
    duration: "24:50",
    views: "22.1K",
    date: "Oct 2026",
    thumbnail: "/images/stage_shows/stage_03.jpg",
    videoUrl: "/videos/recital_live_02.mp4",
    description:
      "An ensemble stage choreography under theatrical illumination, highlighting spatial blocking, dynamic spins (chakkars), and synchrony.",
    featuredBadge: "Auditorium Symphony"
  },
  {
    id: "vid-stage-02",
    title: "Tbilisi International Cultural Festival & Stage Showcase",
    subtitle: "20+ Productions Across Georgia & Global Venues",
    category: "Stage Performances",
    duration: "29:15",
    views: "26.3K",
    date: "Sep 2026",
    thumbnail: "/images/stage_shows/stage_06.jpg",
    videoUrl: "/videos/performance.mp4",
    description:
      "Highlights from 20+ stage productions directed and choreographed across Georgia and international venues, introducing classical Indian arts to global audiences.",
    featuredBadge: "International Showcase"
  },
  {
    id: "vid-stage-03",
    title: "Solo Thillana Climax & Pure Rhythmic Nritta",
    subtitle: "The Rhythmic Splendor of Classical Margam",
    category: "Stage Performances",
    duration: "10:15",
    views: "15.4K",
    date: "Aug 2026",
    thumbnail: "/images/stage_shows/stage_05.jpg",
    videoUrl: "/videos/recital_live_03.mp4",
    description:
      "The high-energy finale of the Bharatanatyam Margam repertoire celebrating crisp footwork, statuesque poses, and joyous musical energy.",
    featuredBadge: "Stage Climax"
  },

  // ── WORKSHOPS & MASTERCLASSES ────────────────────────────────────
  {
    id: "vid-workshop-01",
    title: "International Masterclass: Araimandi Technique & Formations",
    subtitle: "Biomechanics, Joint Safety & Postural Rigor",
    category: "Workshops & Masterclasses",
    duration: "15:20",
    views: "14.6K",
    date: "Oct 2026",
    thumbnail: "/images/workshops/workshop_01.jpg",
    videoUrl: "/videos/workshop_reel.mp4",
    description:
      "Hands-on masterclass focusing on core Bharatanatyam posture, knee angles, spine alignment, and group stage movement drills.",
    featuredBadge: "Student Workshop"
  },
  {
    id: "vid-workshop-02",
    title: "Youth Classical Dance Foundation Residency",
    subtitle: "Adavu Precision, Mudras & Talam Control",
    category: "Workshops & Masterclasses",
    duration: "13:40",
    views: "10.8K",
    date: "Sep 2026",
    thumbnail: "/images/workshops/workshop_02.jpg",
    videoUrl: "/videos/workshop_reel.mp4",
    description:
      "Highlights from a multi-day youth intensive focusing on Adavu discipline, hand gestures (Hastha Mudras), and musical ear training.",
    featuredBadge: "Foundation Intensive"
  },
  {
    id: "vid-workshop-03",
    title: "Navarasa Abhinaya Clinic: 9 Classical Expressions",
    subtitle: "Facial Aesthetics, Drishti Bhedas & Emotional Truth",
    category: "Workshops & Masterclasses",
    duration: "19:30",
    views: "16.9K",
    date: "Jul 2026",
    thumbnail: "/images/workshops/workshop_03.jpg",
    videoUrl: "/videos/recital_live_01.mp4",
    description:
      "A clinical breakdown of the Natyashastra's nine emotional states (Rasas) for stage performers, taught with anatomical and somatic awareness.",
    featuredBadge: "Abhinaya Clinic"
  },

  // ── INTERVIEWS & BEHIND THE SCENES ───────────────────────────────
  {
    id: "vid-bts-01",
    title: "Physician & Artist: Bridging MBBS Medical Science & Natya",
    subtitle: "Dance Kinesiology, Spine Health & Endurance",
    category: "Interviews & Behind the Scenes",
    duration: "17:15",
    views: "31.2K",
    date: "Oct 2026",
    thumbnail: "/images/malavika_portrait.jpg",
    videoUrl: "/videos/performance.mp4",
    description:
      "Dr. Malavika discusses how her medical degree (MBBS) directly informs dance biomechanics, preventing repetitive strain injuries and enhancing dancer stamina.",
    featuredBadge: "Physician Perspective"
  },
  {
    id: "vid-bts-02",
    title: "Behind the Stage: Costume, Temple Silk & Aharya Abhinaya",
    subtitle: "Pre-Performance Preparation & Sacred Rituals",
    category: "Interviews & Behind the Scenes",
    duration: "09:45",
    views: "14.3K",
    date: "Aug 2026",
    thumbnail: "/images/stage_shows/stage_08.jpg",
    videoUrl: "/videos/recital_live_03.mp4",
    description:
      "An intimate look at pre-concert dressing rituals, temple jewelry arrangement, ghungroo tying, and mental focus before stepping under stage spotlights.",
    featuredBadge: "Backstage Access"
  },

  // ── CINEMA & PRODUCTIONS ─────────────────────────────────────────
  {
    id: "vid-cinema-01",
    title: "Malayalam Cinema Archive & Child Artiste Retrospective",
    subtitle: "Memories from Innathe Chinthavishayam, Rasathanthram & Raappakal",
    category: "Cinema & Productions",
    duration: "14:10",
    views: "38.7K",
    date: "Sep 2026",
    thumbnail: "/images/stage_shows/stage_11.jpg",
    videoUrl: "/videos/recital_live_02.mp4",
    description:
      "A reflective retrospective on Dr. Malavika's childhood roles in 5 celebrated Malayalam feature films alongside iconic directors and legends.",
    featuredBadge: "Cinema Heritage"
  },
  {
    id: "vid-cinema-02",
    title: "Contemporary & Semi-Classical Fusion Choreography",
    subtitle: "Expressive Movements Set to Modern Orchestrations",
    category: "Cinema & Productions",
    duration: "12:55",
    views: "19.5K",
    date: "Jul 2026",
    thumbnail: "/images/stage_shows/stage_10.jpg",
    videoUrl: "/videos/performance.mp4",
    description:
      "Blending traditional mudras with lyrical choreography and dynamic spins, tailored for contemporary celebrations and stage galas.",
    featuredBadge: "Fusion Showcase"
  }
];

const CATEGORIES = [
  "All Videos",
  "Classical Dance",
  "Carnatic Music",
  "Stage Performances",
  "Workshops & Masterclasses",
  "Interviews & Behind the Scenes",
  "Cinema & Productions"
];

const CREDENTIAL_HIGHLIGHTS = [
  {
    icon: Award,
    value: "21+ Years",
    label: "Bharatanatyam Margam",
    detail: "Under father Dr. Sunil Nellay"
  },
  {
    icon: Music,
    value: "16+ Years",
    label: "Carnatic Vocal Lineage",
    detail: "Under mother Resmi Narayanan"
  },
  {
    icon: Calendar,
    value: "600+ Stages",
    label: "Classical Concerts",
    detail: "Across India, Georgia & UAE"
  },
  {
    icon: Sparkles,
    value: "CCRT Scholar",
    label: "National Scholarship",
    detail: "Govt. of India (since age 12)"
  },
  {
    icon: Film,
    value: "5 Movies",
    label: "Malayalam Cinema",
    detail: "Celebrated child artiste roles"
  },
  {
    icon: GraduationCap,
    value: "MBBS Physician",
    label: "Dance Kinesiology",
    detail: "Doctor-guided joint safety"
  }
];

export default function CinematicReelsShowcase({
  onExploreClick,
  onMeetArtistClick,
  _onPhotoClick
}) {
  const [selectedVideo, setSelectedVideo] = useState(PERFORMANCE_ARCHIVE[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Videos");
  const [videoError, setVideoError] = useState(false);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const featuredPlayerRef = useRef(null);
  const videoElementRef = useRef(null);

  // Filter video collection
  const filteredVideos =
    activeCategory === "All Videos"
      ? PERFORMANCE_ARCHIVE
      : PERFORMANCE_ARCHIVE.filter((vid) => vid.category === activeCategory);

  // Auto-advance preview photo every 4.8 seconds when idle (not playing video and not hovered)
  useEffect(() => {
    if (isPlaying || isHovered || !filteredVideos || filteredVideos.length <= 1) return;
    const timer = setInterval(() => {
      setSelectedVideo((prev) => {
        const idx = filteredVideos.findIndex((v) => v.id === prev.id);
        const nextIdx = (idx + 1) % filteredVideos.length;
        return filteredVideos[nextIdx];
      });
    }, 4800);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, filteredVideos]);

  // Switch active video in player
  const handleSelectVideo = (video) => {
    playGhungrooChime();
    setVideoError(false);
    setSelectedVideo(video);
    setIsPlaying(true);

    // Smooth scroll to the top of the featured player so user immediately sees playback
    if (featuredPlayerRef.current) {
      featuredPlayerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }

    // Trigger video playback if HTML5 video ref is mounted
    setTimeout(() => {
      if (videoElementRef.current) {
        videoElementRef.current.currentTime = 0;
        videoElementRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Auto-play blocked or failed:", err);
            setIsPlaying(false);
          });
      }
    }, 150);
  };

  const handlePlayButtonClick = () => {
    playGhungrooChime();
    setVideoError(false);
    setIsPlaying(true);
    if (videoElementRef.current) {
      videoElementRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Video playback error:", err);
          setVideoError(true);
        });
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsPlaying(false);
  };

  // Automatically advance and play next video when current video finishes
  const handleVideoEnded = () => {
    if (!autoPlayNext) {
      setIsPlaying(false);
      return;
    }
    const currentIdx = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
    const nextIdx = (currentIdx + 1) % filteredVideos.length;
    const nextVideo = filteredVideos[nextIdx];
    handleSelectVideo(nextVideo);
  };

  return (
    <section
      id="gallery-section"
      className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#121111] text-[#F5F0E8] border-b border-[#A9A49D]/20 relative overflow-hidden select-none"
    >
      {/* Sophisticated Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3B0B14]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#B99A63]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">
        {/* ═══════════════════════════════════════════════════════════════
            1. SECTION HEADING (Strictly as specified)
        ═══════════════════════════════════════════════════════════════ */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F191A] border border-[#B99A63]/40 text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>The Performance Archive</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F0E8] font-serif-luxury">
            The Performance Archive
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            “Discover the performances, music, and artistic moments that bring DancingRagas to life.”
          </p>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════════
            2. FEATURED 16:9 LANDSCAPE VIDEO PLAYER (Framed & Compact)
        ═══════════════════════════════════════════════════════════════ */}
        <div
          ref={featuredPlayerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="max-w-4xl mx-auto space-y-4"
        >
          {/* Museum Frame Container — Styled exactly like the Hero Section */}
          <div className="museum-frame group relative p-1.5 sm:p-2.5 rounded-3xl bg-[#151515] border-2 border-[#B99A63] shadow-2xl transition-all">
            <div className="museum-frame-inner relative aspect-video w-full rounded-2xl overflow-hidden bg-[#181616] border border-[#B99A63]/45 shadow-inner">
              {/* If video has an active error state */}
              {videoError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#181616]/95 z-20 space-y-3">
                  <AlertCircle className="w-12 h-12 text-amber-500 animate-pulse" />
                  <h4 className="text-lg font-bold font-serif-luxury text-[#F5F0E8]">
                    Video Stream Unavailable
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                    The requested performance recording is currently being archived. Please choose another recital from the gallery below or visit our Instagram archive.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoError(false);
                      setIsPlaying(false);
                    }}
                    className="px-4 py-2 rounded-full bg-[#B99A63] text-[#151515] font-bold text-xs hover:bg-[#cca86d] transition-all cursor-pointer"
                  >
                    Return to Thumbnail
                  </button>
                </div>
              ) : isPlaying ? (
                /* Active Video Playback */
                <div className="w-full h-full relative bg-black">
                  {selectedVideo.youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <video
                      ref={videoElementRef}
                      src={selectedVideo.videoUrl}
                      poster={selectedVideo.thumbnail}
                      controls
                      autoPlay
                      playsInline
                      onError={handleVideoError}
                      onEnded={handleVideoEnded}
                      className="w-full h-full object-contain bg-black"
                    />
                  )}
                </div>
              ) : (
                /* High-Quality Video Thumbnail with Centered Play Button & Auto-previewing */
                <div
                  onClick={handlePlayButtonClick}
                  className="w-full h-full relative cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${selectedVideo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePlayButtonClick();
                    }
                  }}
                >
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Atmospheric Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121111]/95 via-[#121111]/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors pointer-events-none" />

                  {/* Top Badges & Autoplay Toggle */}
                  <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-3 py-1.5 rounded-full bg-[#151515]/90 text-[#D4AF37] border border-[#B99A63]/50 text-[10px] sm:text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-md">
                      {selectedVideo.featuredBadge || selectedVideo.category}
                    </span>

                    <div className="flex items-center gap-2 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAutoPlayNext((prev) => !prev);
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer backdrop-blur-md border ${
                          autoPlayNext
                            ? "bg-[#B99A63] text-[#151515] border-[#B99A63] shadow-sm hover:bg-[#cca86d]"
                            : "bg-black/70 text-slate-400 border-white/10 hover:text-white"
                        }`}
                        title="Automatically play next video when current finishes"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${autoPlayNext ? "bg-[#151515] animate-ping" : "bg-slate-500"}`} />
                        <span>Autoplay {autoPlayNext ? "ON" : "OFF"}</span>
                      </button>

                      <span className="px-2 py-1 rounded-md bg-black/80 text-[#F5F0E8] font-mono text-[11px] sm:text-xs font-semibold backdrop-blur-xs flex items-center gap-1 border border-white/10">
                        <Clock className="w-3 h-3 text-[#B99A63]" />
                        {selectedVideo.duration}
                      </span>
                    </div>
                  </div>

                  {/* Centered Luxury Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                      <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#B99A63] group-hover:bg-[#cca86d] text-[#151515] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/40 ring-6 ring-[#B99A63]/25">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#151515] translate-x-0.5" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-[#151515]/85 text-[#F5F0E8] text-[11px] sm:text-xs font-bold tracking-wider border border-[#B99A63]/40 backdrop-blur-md shadow-md">
                        Play Performance
                      </span>
                    </div>
                  </div>

                  {/* Auto-slideshow Indicator Badge when Idle */}
                  <div className="absolute bottom-14 sm:bottom-16 left-3 sm:left-4 z-10 pointer-events-none hidden xs:block">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Auto-previewing Photos</span>
                    </span>
                  </div>

                  {/* Bottom Overlay Title Bar */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 pointer-events-none text-left">
                    <h3 className="text-base sm:text-xl font-bold font-serif-luxury text-[#F5F0E8] drop-shadow-md truncate">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 truncate font-normal">
                      {selectedVideo.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Video Metadata & Actions Bar (YouTube Style) */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#181616] border border-[#B99A63]/25 flex flex-col md:flex-row md:items-start justify-between gap-4 text-left shadow-lg">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#B99A63]/20 text-[#D4AF37] border border-[#B99A63]/40 text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                  {selectedVideo.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#B99A63]" />
                  {selectedVideo.views} views
                </span>
                <span className="text-xs text-slate-400">• {selectedVideo.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif-luxury text-[#F5F0E8]">
                {selectedVideo.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-3xl">
                {selectedVideo.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0 pt-1 md:pt-0">
              <a
                href="https://www.instagram.com/dancingragasbymalavika/reels/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playGhungrooChime()}
                className="px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-700/80 via-pink-700/80 to-amber-600/80 hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer tap-bounce shadow-md"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram Archive</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              {onMeetArtistClick && (
                <button
                  type="button"
                  onClick={() => {
                    playGhungrooChime();
                    onMeetArtistClick();
                  }}
                  className="px-3.5 py-2 rounded-full bg-[#1F1C1C] hover:bg-[#2A2626] border border-[#B99A63]/40 text-[#D4AF37] text-xs font-bold transition-all cursor-pointer tap-bounce shadow-md"
                >
                  Meet Dr. Malavika
                </button>
              )}

              {onExploreClick && (
                <button
                  type="button"
                  onClick={() => {
                    playGhungrooChime();
                    onExploreClick();
                  }}
                  className="px-4 py-2 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] text-xs font-bold transition-all cursor-pointer tap-bounce shadow-md"
                >
                  Book Trial
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            3. VIDEO CATEGORY FILTERS (Horizontally scrollable on mobile)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between gap-2 px-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              Browse by Category
            </span>
            <span className="text-[11px] text-slate-400">
              Showing {filteredVideos.length} performance {filteredVideos.length === 1 ? "video" : "videos"}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playGhungrooChime();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer tap-bounce shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#B99A63] text-[#151515] shadow-md shadow-[#B99A63]/30 scale-[1.02]"
                    : "bg-[#1E1B1B] hover:bg-[#282424] text-slate-300 hover:text-white border border-white/10 hover:border-[#B99A63]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            4. RESPONSIVE VIDEO THUMBNAIL GRID (Desktop 3-4, Tablet 2, Mobile 1-2)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 text-left">
          {filteredVideos.map((video) => {
            const isCurrent = selectedVideo.id === video.id;

            return (
              <div
                key={video.id}
                onClick={() => handleSelectVideo(video)}
                className={`group rounded-2xl overflow-hidden bg-[#181616] border transition-all duration-300 cursor-pointer tap-bounce flex flex-col justify-between shadow-lg ${
                  isCurrent
                    ? "border-[#B99A63] ring-2 ring-[#B99A63]/50 shadow-[#B99A63]/15"
                    : "border-[#B99A63]/25 hover:border-[#B99A63]/70 hover:shadow-2xl"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectVideo(video);
                  }
                }}
              >
                {/* 16:9 Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Left Category Badge */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase border border-white/10 backdrop-blur-xs">
                    {video.category}
                  </span>

                  {/* Duration Pill in Bottom Right (YouTube Style) */}
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/90 text-white font-mono text-[10px] font-bold tracking-wide border border-white/10">
                    {video.duration}
                  </span>

                  {/* Hover Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-10 h-10 rounded-full bg-[#B99A63] text-[#151515] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-4 h-4 fill-[#151515] translate-x-0.5" />
                    </div>
                  </div>

                  {/* Active "Now Playing" Marker */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#B99A63] text-[#151515] text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#151515] animate-ping" />
                      <span>Active</span>
                    </div>
                  )}
                </div>

                {/* Card Content & Metadata */}
                <div className="p-3.5 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold font-serif-luxury text-[#F5F0E8] group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 font-normal mt-1 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Bottom Stats Strip */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#B99A63]" />
                      {video.views}
                    </span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            5. ACHIEVEMENT HIGHLIGHTS (Compact Understated Gold Strip)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="pt-6 border-t border-[#A9A49D]/20">
          <div className="p-5 sm:p-7 rounded-2xl bg-[#181616] border border-[#B99A63]/30 shadow-xl space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B99A63]" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
                  Artistic &amp; Academic Distinction
                </h4>
              </div>
              <p className="text-[11px] text-slate-400">
                Verified performance and institutional credentials of Dr. Malavika M. Sunil
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {CREDENTIAL_HIGHLIGHTS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#1F1C1C] border border-white/5 flex flex-col justify-between space-y-1 hover:border-[#B99A63]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <IconComponent className="w-4 h-4 text-[#B99A63]" />
                    </div>
                    <div className="text-base sm:text-lg font-bold font-serif-luxury text-[#F5F0E8] leading-tight">
                      {item.value}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-300 leading-snug">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
