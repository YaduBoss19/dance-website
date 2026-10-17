import React, { useState, useRef, useEffect, useCallback } from "react";
import AnimatedSection from "./AnimatedSection";
import { PERFORMANCE_REELS } from "../data/initialData";
import {
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  ArrowRight,
  Film,
  Heart,
  Eye,
  ExternalLink,
  Grid,
  Video,
  MessageCircle,
  Camera,
  Maximize2
} from "lucide-react";

// Continuous stream of curated classical moments (Photos and Videos)
const INFINITE_STREAM_ITEMS = [
  {
    id: "stream-01",
    type: "video",
    reelIndex: 0,
    title: "Margam Classical Recital",
    subtitle: "Sacred Alarippu Invocation",
    category: "Bharatanatyam",
    imageUrl: "/images/malavika_dance_stage.jpg",
    videoUrl: "/videos/performance.mp4",
    duration: "Live Recital",
    badge: "Stage Recital"
  },
  {
    id: "stream-02",
    type: "photo",
    title: "Carnatic Vocal & Shruti Sadhana",
    subtitle: "Resmi Narayanan Hereditary Lineage",
    category: "Carnatic Vocal",
    imageUrl: "/images/malavika_vocal.jpg",
    duration: "16+ Yrs",
    badge: "Hereditary Shruti"
  },
  {
    id: "stream-03",
    type: "photo",
    title: "Temple Recital & Salangai Bells",
    subtitle: "Alarippu Invocation to Nataraja",
    category: "Bharatanatyam",
    imageUrl: "/images/malavika_dance_pose.jpg",
    duration: "Classical Pose",
    badge: "Sacred Mudra"
  },
  {
    id: "stream-04",
    type: "video",
    reelIndex: 4,
    title: "Tbilisi International Residency",
    subtitle: "20+ Productions Across Georgia",
    category: "Global Stage",
    imageUrl: "/images/malavika_dance_stage.jpg",
    videoUrl: "/videos/performance.mp4",
    duration: "Stage Symphony",
    badge: "Tbilisi Concert"
  },
  {
    id: "stream-05",
    type: "photo",
    title: "Physician & Classical Dancer",
    subtitle: "MBBS Graduation & Dance Synthesis",
    category: "Doctor & Dancer",
    imageUrl: "/images/malavika_portrait.jpg",
    duration: "MBBS Doctor",
    badge: "Medical Graduate"
  },
  {
    id: "stream-06",
    type: "video",
    reelIndex: 2,
    title: "Doctor's Kinesiology & Knee Safety",
    subtitle: "Araimandi Patellar Biomechanics",
    category: "Injury Prevention",
    imageUrl: "/images/malavika_portrait.jpg",
    videoUrl: "/videos/performance.mp4",
    duration: "Physician Guide",
    badge: "Anatomy Safety"
  },
  {
    id: "stream-07",
    type: "photo",
    title: "Silver Screen Cinema Abhinaya",
    subtitle: "Kaazhcha & Thanmathra Classics",
    category: "Malayalam Cinema",
    imageUrl: "/images/malavika_dance_pose.jpg",
    duration: "5 Films",
    badge: "Cinema Heritage"
  },
  {
    id: "stream-08",
    type: "video",
    reelIndex: 5,
    title: "1-to-1 Private Online Studio",
    subtitle: "Live Tanpura & Personal Feedback",
    category: "Online Academy",
    imageUrl: "/images/malavika_vocal.jpg",
    videoUrl: "/videos/performance.mp4",
    duration: "1-on-1 Studio",
    badge: "Global Mentorship"
  }
];

// Curated collection of 9 verified Instagram Posts & Reels for @dancingragasbymalavika
const INSTAGRAM_WALL_ITEMS = [
  {
    id: "insta-01",
    type: "reel",
    reelIndex: 0,
    title: "Margam Classical Recital",
    caption: "Rooted in 21 years of sacred Bharatanatyam discipline. Perfecting the foundational Araimandi posture and classical Abhinaya. #dancingragas #bharatanatyam #margam #classicaldance",
    imageUrl: "/images/malavika_dance_stage.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Original Audio · dancingragasbymalavika",
    likes: "2.8k",
    comments: "142",
    views: "38.2k",
    tag: "Reel",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-02",
    type: "reel",
    reelIndex: 1,
    title: "Carnatic Vocal & Shruti Sadhana",
    caption: "16+ years of hereditary vocal lineage under mother Resmi Narayanan. Daily shruti alignment, swara riyaz, and raga bhava. #carnaticmusic #vocal #shruti #ragas",
    imageUrl: "/images/malavika_vocal.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Raga Mayamalavagowla Alapana · Dr. Malavika",
    likes: "2.1k",
    comments: "98",
    views: "31.5k",
    tag: "Reel",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-03",
    type: "reel",
    reelIndex: 2,
    title: "Anatomy & Knee Biomechanics",
    caption: "Doctor's perspective (MBBS): Preventing patellar strain in Araimandi by initiating external hip rotation safely. #danceinjuryprevention #mbbs #kinesiology #anatomy",
    imageUrl: "/images/malavika_portrait.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Doctor's Movement Breakdown · dancingragasbymalavika",
    likes: "3.6k",
    comments: "215",
    views: "52.4k",
    tag: "Reel",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-04",
    type: "reel",
    reelIndex: 3,
    title: "Silver Screen Cinema Abhinaya",
    caption: "Childhood memories from Malayalam cinema classics alongside Mammootty and Mohanlal. Natural emotive abhinaya across 5 feature films. #malayalamcinema #kaazhcha #thanmathra #abhinaya",
    imageUrl: "/images/malavika_dance_pose.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Cinema Classical Score · Archival Heritage",
    likes: "5.2k",
    comments: "320",
    views: "74.1k",
    tag: "Reel",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-05",
    type: "reel",
    reelIndex: 4,
    title: "Tbilisi International Residency",
    caption: "International cultural bridge in Georgia: 20+ stage productions and university workshops sharing Indian classical art worldwide. #tbilisi #globaldance #culturaldiplomacy",
    imageUrl: "/images/malavika_dance_stage.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Live Stage Symphony · Tbilisi Concert",
    likes: "2.4k",
    comments: "104",
    views: "36.8k",
    tag: "Reel",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-06",
    type: "reel",
    reelIndex: 5,
    title: "1-to-1 Private Online Studio",
    caption: "Every body and voice is unique. In 1-to-1 coaching, we progress at your exact pace with live tanpura drone and personalized feedback. #onlinedance #1to1 #privatecoaching",
    imageUrl: "/images/malavika_portrait.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Private Studio Sadhana · dancingragasbymalavika",
    likes: "3.1k",
    comments: "167",
    views: "44.6k",
    tag: "Reel",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-07",
    type: "post",
    reelIndex: 0,
    title: "Traditional Temple Recital Pose",
    caption: "Alarippu rhythmic invocation. Dedicated to Lord Nataraja and the unbroken lineage of Nellay Nrithya Kalalayam. Salangai bells blessed. #classicaldance #tradition #nataraja",
    imageUrl: "/images/malavika_dance_pose.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Sacred Temple Nadaswaram & Chimes",
    likes: "2.3k",
    comments: "88",
    views: "29.2k",
    tag: "Post",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-08",
    type: "reel",
    reelIndex: 1,
    title: "Swara Patterns & Tala Calculation",
    caption: "Interactive Carnatic session teaching Sarali and Janta varisais with hand talam precision in Adi Talam. Pitch perfection and swara clarity. #carnaticsinging #ragas #talam",
    imageUrl: "/images/malavika_vocal.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Swara Sadhana Drills · Dr. Malavika",
    likes: "2.7k",
    comments: "116",
    views: "39.0k",
    tag: "Reel",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  },
  {
    id: "insta-09",
    type: "post",
    reelIndex: 2,
    title: "Doctor & Dancer Graduation",
    caption: "Two parallel journeys, one soul. Bridging medical graduation (MBBS) in Georgia with 21 years of sacred Bharatanatyam devotion. Moving with anatomical safety. #doctorsofinstagram #artist #mbbs",
    imageUrl: "/images/malavika_portrait.jpg",
    videoUrl: "/videos/performance.mp4",
    audio: "Graduation Symphony & Temple Bells",
    likes: "4.8k",
    comments: "254",
    views: "66.5k",
    tag: "Post",
    instagramUrl: "https://www.instagram.com/dancingragasbymalavika/"
  }
];

// Interactive Instagram Wall Card with Hover Video Preview
function InstagramWallCard({ item, onPlayInCinema }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlayingPreview(true))
          .catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlayingPreview(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-3xl overflow-hidden bg-[#1E1B1B] border border-[#B99A63]/30 shadow-xl group hover:border-[#B99A63] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Visual Thumbnail Frame with Hover Video Play */}
      <div className="aspect-[4/5] bg-[#0d0d0d] relative overflow-hidden">
        {/* Hover-activated HTML5 Video */}
        <video
          ref={videoRef}
          src={item.videoUrl || "/videos/performance.mp4"}
          poster={item.imageUrl}
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-all duration-500 absolute inset-0 ${
            isPlayingPreview ? "opacity-100 scale-105" : "opacity-0"
          }`}
        />

        {/* Poster Image */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isPlayingPreview ? "opacity-0" : "opacity-100 group-hover:scale-105"
          }`}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-[#151515]/60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#151515]/90 border border-[#B99A63]/40 text-[#D4AF37] backdrop-blur-xs flex items-center gap-1.5 shadow-md">
            {isPlayingPreview ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-white font-bold">Playing Live</span>
              </>
            ) : item.type === "reel" ? (
              <>
                <Video className="w-3 h-3 text-[#B99A63]" />
                <span>Reel</span>
              </>
            ) : (
              <>
                <Film className="w-3 h-3 text-[#B99A63]" />
                <span>Post</span>
              </>
            )}
          </span>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#B99A63]" />
            <span>{item.views}</span>
          </span>
        </div>

        {/* Hover Engagement Overlay */}
        <div
          className={`absolute inset-0 bg-[#151515]/75 p-6 flex flex-col justify-between items-center text-center z-20 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-4 text-white my-auto">
            <span className="flex items-center gap-1.5 font-bold text-sm bg-black/50 px-3 py-1 rounded-full border border-white/10">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{item.likes}</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-sm bg-black/50 px-3 py-1 rounded-full border border-white/10">
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>{item.comments}</span>
            </span>
          </div>

          <div className="space-y-2 w-full">
            <button
              onClick={() => onPlayInCinema(item.reelIndex)}
              className="w-full py-2.5 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg tap-bounce cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-[#151515]" />
              <span>Play in Cinema Player</span>
            </button>

            <a
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F0E8] font-bold text-xs flex items-center justify-center gap-1.5 backdrop-blur-md tap-bounce"
            >
              <span>View on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Card Caption Info */}
      <div className="p-5 space-y-2 text-left">
        <div className="flex items-center justify-between text-[11px] text-[#B99A63] font-bold">
          <span>@dancingragasbymalavika</span>
          <span className="text-slate-400 capitalize">{item.tag || item.type}</span>
        </div>

        <h4 className="text-base font-bold font-serif-luxury text-[#F5F0E8] line-clamp-1">
          {item.title}
        </h4>

        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {item.caption}
        </p>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
          <span className="truncate max-w-[190px] italic">
            🎵 {item.audio || "Original Audio · dancingragasbymalavika"}
          </span>
          <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
            ▶ Hover to Play
          </span>
        </div>
      </div>
    </div>
  );
}

// Interactive Infinite Stream Card (Photo & Video)
function InfiniteStreamCard({ item, onPlayInCinema, onPhotoClick }) {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlayingPreview(true)).catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (item.type === "video" && videoRef.current) {
      setIsPlayingPreview(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (item.type === "video") {
      onPlayInCinema(item.reelIndex || 0);
    } else if (onPhotoClick) {
      onPhotoClick({
        id: item.id,
        title: item.title,
        url: item.imageUrl,
        category: item.category,
        caption: item.subtitle
      });
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="w-[280px] sm:w-[320px] shrink-0 rounded-3xl overflow-hidden bg-[#1E1B1B] border border-[#B99A63]/30 shadow-xl group hover:border-[#B99A63] transition-all duration-300 cursor-pointer flex flex-col justify-between select-none relative tap-bounce"
    >
      <div className="aspect-[16/11] bg-[#0d0d0d] relative overflow-hidden">
        {item.type === "video" && (
          <video
            ref={videoRef}
            src={item.videoUrl || "/videos/performance.mp4"}
            poster={item.imageUrl}
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
              isPlayingPreview ? "opacity-100 scale-105" : "opacity-0"
            }`}
          />
        )}

        <img
          src={item.imageUrl}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isPlayingPreview ? "opacity-0" : "opacity-100 group-hover:scale-105"
          }`}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#151515]/90 border border-[#B99A63]/40 text-[#D4AF37] backdrop-blur-xs flex items-center gap-1 shadow-md">
            {isPlayingPreview ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-white font-bold">Playing Live</span>
              </>
            ) : item.type === "video" ? (
              <>
                <Video className="w-3 h-3 text-[#B99A63]" />
                <span>Live Video</span>
              </>
            ) : (
              <>
                <Camera className="w-3 h-3 text-[#B99A63]" />
                <span>Photo Gallery</span>
              </>
            )}
          </span>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-slate-200 backdrop-blur-xs">
            {item.badge}
          </span>
        </div>

        {/* Center Hover Action Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-[#B99A63] text-[#151515] font-bold text-xs shadow-xl flex items-center gap-1.5">
            {item.type === "video" ? (
              <>
                <Play className="w-3.5 h-3.5 fill-[#151515]" />
                <span>Watch Video</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect Photo</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="p-4 text-left space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A63]">
          {item.category}
        </span>
        <h4 className="text-sm font-bold font-serif-luxury text-[#F5F0E8] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
          {item.title}
        </h4>
        <p className="text-[11px] text-slate-400 line-clamp-1">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function CinematicReelsShowcase({
  reels = PERFORMANCE_REELS,
  onExploreClick,
  onMeetArtistClick,
  onPhotoClick
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
  const reelsTopRef = useRef(null);

  const activeReel = publishedReels[currentIndex] || publishedReels[0];

  // Initialize Instagram official embed processor if available
  useEffect(() => {
    if (window.instgrm && window.instgrm.Embeds) {
      try {
        window.instgrm.Embeds.process();
      } catch {}
    }
  }, []);

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

  const [wallFilter, setWallFilter] = useState("all");
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const playReelFromWall = (reelIdx) => {
    stopCurrentVideo();
    setCurrentIndex(reelIdx);
    if (reelsTopRef.current) {
      reelsTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 450);
  };

  const filteredWallItems = INSTAGRAM_WALL_ITEMS.filter((item) => {
    if (wallFilter === "reels") return item.type === "reel";
    if (wallFilter === "posts") return item.type === "post";
    return true;
  });

  return (
    <section
      id="gallery-section"
      ref={reelsTopRef}
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#151515] text-[#F5F0E8] border-b border-[#A9A49D]/20 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3B0B14]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#B99A63]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* ═══════════════════════════════════════════════════════════════
            OFFICIAL INSTAGRAM EMBED BANNER (@dancingragasbymalavika)
        ═══════════════════════════════════════════════════════════════ */}
        <AnimatedSection
          animation="fade-up"
          className="rounded-3xl bg-gradient-to-r from-[#1c1c1c] via-[#240c14] to-[#1c1c1c] border border-[#B99A63]/40 p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5"
        >
          {/* Instagram Account Avatar & Bio */}
          <div className="flex items-center gap-4 text-left">
            <a
              href="https://www.instagram.com/dancingragasbymalavika/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 group tap-bounce"
            >
              {/* Instagram Story Gradient Ring */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#151515] p-0.5">
                  <img
                    src="/images/logo_transparent.png"
                    alt="DancingRagas Instagram"
                    className="w-full h-full object-contain bg-[#F5F0E8] rounded-full"
                  />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#151515] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </span>
            </a>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/dancingragasbymalavika/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-lg sm:text-xl text-[#F5F0E8] font-serif-luxury hover:text-[#B99A63] transition-colors flex items-center gap-1.5"
                >
                  <span>@dancingragasbymalavika</span>
                  <ExternalLink className="w-4 h-4 text-[#B99A63]" />
                </a>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B99A63] text-[#151515] uppercase tracking-wider">
                  Official Profile
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                DANCINGRAGAS DANCE AND MUSIC ACADEMY
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 max-w-xl">
                Bharatanatyam · Semi-Classical · Bollywood · Carnatic Vocal · Mentored by Dr. Malavika M. Sunil
              </p>
            </div>
          </div>

          {/* Followers & Follow Button */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-[#D4AF37]">103+ Followers</div>
              <div className="text-[10px] text-slate-400">9 Posts & Reels</div>
            </div>

            <a
              href="https://www.instagram.com/dancingragasbymalavika/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-[#ee2a7b] to-[#6228d7] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 tap-bounce transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </AnimatedSection>

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
                alt="Dr. Malavika M. Sunil Bharatanatyam Performance"
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
              <a
                href={activeReel.instagramUrl || "https://www.instagram.com/dancingragasbymalavika/"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#B99A63] flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#B99A63]" />
                  <span>Performance Reel</span>
                </span>
              </a>

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
                <a
                  href="https://www.instagram.com/dancingragasbymalavika/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#151515]/85 border border-[#B99A63]/50 text-[#D4AF37] backdrop-blur-md shadow-md flex items-center gap-1.5 pointer-events-auto hover:bg-[#B99A63] hover:text-[#151515] transition-all"
                >
                  <span>@dancingragasbymalavika</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

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

              {/* Bottom Reel Description Overlay & Stats */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-left pointer-events-none">
                <div className="space-y-2 bg-[#151515]/85 p-3.5 rounded-2xl border border-[#B99A63]/30 backdrop-blur-md shadow-lg pointer-events-auto">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#B99A63] uppercase tracking-wider">
                      {activeReel.category}
                    </span>

                    {/* Instagram Stats Display */}
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <span className="flex items-center gap-1 text-[10px]">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        <span>{activeReel.likes || "2.4k"}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Eye className="w-3 h-3 text-[#B99A63]" />
                        <span>{activeReel.views || "34.8k"}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold font-serif-luxury text-[#F5F0E8] leading-snug">
                      {activeReel.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mt-0.5">
                      {activeReel.description}
                    </p>
                  </div>

                  {/* Audio indicator & direct Instagram link */}
                  <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[170px] italic">
                      🎵 {activeReel.audio || "Original Audio · dancingragasbymalavika"}
                    </span>
                    <a
                      href="https://www.instagram.com/dancingragasbymalavika/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1 shrink-0"
                    >
                      <span>Open Reel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
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
            INFINITE PHOTO GALLERY & RECITAL VIDEO STREAM
            Continuous auto-scrolling loop with hover video preview
        ═══════════════════════════════════════════════════════════════ */}
        <div className="pt-10 border-t border-[#A9A49D]/20 space-y-6 text-left">
          {/* Header & Marquee Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B99A63] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63]">
                  Continuous Classical Stream
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F5F0E8] mt-1">
                Infinite Photo Gallery & Recital Videos
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Hover any video to preview live or click to expand in cinema definition.
              </p>
            </div>

            {/* Marquee Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsMarqueePaused((prev) => !prev)}
                className="px-3.5 py-1.5 rounded-xl bg-[#1E1B1B] hover:bg-[#252222] border border-[#B99A63]/40 text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5 cursor-pointer tap-bounce transition-all shadow-sm"
              >
                {isMarqueePaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    <span>Resume Stream</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Stream</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Seamless Infinite Auto-Scrolling Track */}
          <div className="overflow-hidden relative py-2 -mx-4 sm:mx-0 px-4 sm:px-0">
            {/* Gradient Edge Masks for High-End Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#151515] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#151515] to-transparent z-20 pointer-events-none" />

            <div
              className={`flex gap-6 ${isMarqueePaused ? "pause-marquee" : "animate-infinite-marquee"}`}
            >
              {/* Double array for uninterrupted seamless loop */}
              {INFINITE_STREAM_ITEMS.concat(INFINITE_STREAM_ITEMS).map((item, idx) => (
                <InfiniteStreamCard
                  key={`${item.id}-${idx}`}
                  item={item}
                  onPlayInCinema={playReelFromWall}
                  onPhotoClick={onPhotoClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            INSTAGRAM REELS & POSTS WALL (@dancingragasbymalavika)
            Native, instant, responsive 9-post archival grid with Hover Play
        ═══════════════════════════════════════════════════════════════ */}
        <div className="pt-12 border-t border-[#A9A49D]/20 space-y-8 text-left">
          {/* Wall Header & Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63]">
                  Instagram Feed & Reels Wall
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F5F0E8] mt-1">
                Explore @dancingragasbymalavika on Site
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Hover over any video to play live instantly or click to watch on Instagram.
              </p>
            </div>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-1.5 bg-[#1E1B1B] p-1.5 rounded-2xl border border-[#B99A63]/30 shrink-0">
              <button
                onClick={() => setWallFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer tap-bounce ${
                  wallFilter === "all"
                    ? "bg-[#B99A63] text-[#151515] shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All ({filteredWallItems.length})</span>
              </button>

              <button
                onClick={() => setWallFilter("reels")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer tap-bounce ${
                  wallFilter === "reels"
                    ? "bg-[#B99A63] text-[#151515] shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Reels</span>
              </button>

              <button
                onClick={() => setWallFilter("posts")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer tap-bounce ${
                  wallFilter === "posts"
                    ? "bg-[#B99A63] text-[#151515] shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Posts</span>
              </button>
            </div>
          </div>

          {/* 9-Post Responsive Grid with Hover Play */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWallItems.map((item) => (
              <InstagramWallCard
                key={item.id}
                item={item}
                onPlayInCinema={playReelFromWall}
              />
            ))}
          </div>

          {/* Follow CTA Strip */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1c1c1c] border border-[#B99A63]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-lg sm:text-xl font-bold font-serif-luxury text-[#F5F0E8]">
                Join 100+ Dance Connoisseurs on Instagram
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Get behind-the-scenes rehearsal clips, classical mudra guides, and workshop updates every week.
              </p>
            </div>

            <a
              href="https://www.instagram.com/dancingragasbymalavika/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all shrink-0 tap-bounce"
            >
              <span>Follow @dancingragasbymalavika</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
