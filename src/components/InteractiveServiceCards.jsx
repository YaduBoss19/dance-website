import React, { useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import StageSpotlightOverlay from "./StageSpotlightOverlay";
import { useAcademy } from "../context/AcademyContext";
import { playGhungrooChime } from "../utils/talamAudio";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Award,
  Music,
  Heart,
  Flame,
  Star,
  Users,
  Building,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Visual themes & prefilled WhatsApp messages for each of the 8 services
const SERVICE_THEMES = {
  "srv-bharatanatyam-diploma": {
    accentColor: "border-[#B99A63]/60 bg-gradient-to-br from-[#3B0B14]/10 to-transparent",
    pillBadge: "bg-[#3B0B14] text-[#D4AF37] border border-[#B99A63]/50",
    icon: Award,
    whatsappMsg:
      "Hello Dr. Malavika! I would love to enquire about enrolling in the Online Bharatanatyam Diploma Programme. Please share details on syllabus and trial availability."
  },
  "srv-carnatic-vocal": {
    accentColor: "border-[#B99A63]/50 bg-gradient-to-br from-[#3B0B14]/15 to-transparent",
    pillBadge: "bg-[#25060C] text-[#D4AF37] border border-[#B99A63]/40",
    icon: Music,
    whatsappMsg:
      "Hello Dr. Malavika! I am inquiring about Online Carnatic Vocal Music Classes (1-to-1). Could you please guide me on introductory sessions and shruti alignment?"
  },
  "srv-semiclassical-bollywood": {
    accentColor: "border-amber-500/40 bg-gradient-to-br from-amber-950/15 to-transparent",
    pillBadge: "bg-amber-950 text-amber-300 border border-amber-500/40",
    icon: Flame,
    whatsappMsg:
      "Hello Dr. Malavika! I am interested in joining the Online Semi-Classical and Bollywood Dance Classes for grace, fitness, and celebrations. What are the trial options?"
  },
  "srv-yoga-fitness": {
    accentColor: "border-emerald-500/40 bg-gradient-to-br from-emerald-950/15 to-transparent",
    pillBadge: "bg-emerald-950 text-emerald-300 border border-emerald-500/40",
    icon: Heart,
    whatsappMsg:
      "Hello Dr. Malavika! I would like to book an Online Physician-Led Yoga and Fitness Class for dancers. Please let me know your available schedule."
  },
  "srv-personalised-choreography": {
    accentColor: "border-rose-500/40 bg-gradient-to-br from-rose-950/15 to-transparent",
    pillBadge: "bg-rose-950 text-rose-300 border border-rose-500/40",
    icon: Star,
    whatsappMsg:
      "Hello Dr. Malavika! I need Personalised Dance Choreography for a custom song (wedding/sangeet/solo recital). Could we discuss concept details and timeline?"
  },
  "srv-stage-performance": {
    accentColor: "border-purple-500/40 bg-gradient-to-br from-purple-950/15 to-transparent",
    pillBadge: "bg-purple-950 text-purple-300 border border-purple-500/40",
    icon: Users,
    whatsappMsg:
      "Hello Dr. Malavika! We are seeking Stage Performance Choreography and artistic direction for an upcoming festival/competition stage production."
  },
  "srv-workshop-one-day": {
    accentColor: "border-orange-500/40 bg-gradient-to-br from-orange-950/15 to-transparent",
    pillBadge: "bg-orange-950 text-orange-300 border border-orange-500/40",
    icon: Building,
    whatsappMsg:
      "Hello Dr. Malavika! We represent an institution/organization interested in hosting your One-Day Classical Dance Masterclass Workshop. Could you share details?"
  },
  "srv-workshop-five-day": {
    accentColor: "border-[#B99A63]/60 bg-gradient-to-br from-[#151515]/30 to-transparent",
    pillBadge: "bg-[#151515] text-[#D4AF37] border border-[#B99A63]/60",
    icon: GraduationCap,
    whatsappMsg:
      "Hello Dr. Malavika! We would like to invite you for a 5-Day Intensive Dance Residency & Certification for our institution. Please share available dates and syllabus."
  }
};

export default function InteractiveServiceCards({ onSelectServiceForBooking }) {
  const { courses, setSelectedCourseModal, academyInfo } = useAcademy();
  const [filterPillar, setFilterPillar] = useState("all");
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    playGhungrooChime();
    if (!carouselRef.current) return;
    const scrollAmount = 370;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const pillars = [
    { id: "all", label: "All 8 Services" },
    { id: "Online Classical & Arts Academy", label: "Online Academy (1-to-1)" },
    { id: "Bespoke Choreography & Stage Direction", label: "Bespoke Choreography" },
    { id: "Workshops for Institutions", label: "Institutional Workshops" }
  ];

  const filteredCourses = courses.filter((c) => {
    if (filterPillar === "all") return true;
    return c.pillar === filterPillar;
  });

  const handleWhatsAppEnquiry = (course) => {
    playGhungrooChime();
    const meta = SERVICE_THEMES[course.id];
    const msg = meta ? meta.whatsappMsg : `Hello Dr. Malavika! I am interested in ${course.title}.`;
    const cleanNumber = academyInfo.whatsappNumber.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleBookingClick = (courseTitle) => {
    playGhungrooChime();
    if (onSelectServiceForBooking) {
      onSelectServiceForBooking(courseTitle);
    }
  };

  const handleViewSyllabus = (course) => {
    playGhungrooChime();
    setSelectedCourseModal(course);
  };

  return (
    <StageSpotlightOverlay className="py-10 xs:py-12 sm:py-16 lg:py-20 px-4 sm:px-8 border-b border-[#A9A49D]/20">
      <div id="services-section" className="max-w-7xl mx-auto space-y-6 sm:space-y-10 lg:space-y-12 relative z-20">
        {/* Section Heading */}
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515] text-[#F5F0E8] text-xs font-bold tracking-widest uppercase shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>Interactive Service Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#151515] font-serif-luxury">
            Eight Pathways to Mastery
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Each offering is tailored with dedicated 1-to-1 attention, structured curricula, flexible scheduling across global timezones, and direct personal mentorship by Dr. Malavika.
          </p>
        </AnimatedSection>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => {
                setFilterPillar(pillar.id);
                playGhungrooChime();
              }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer tap-bounce ${
                filterPillar === pillar.id
                  ? "bg-[#151515] text-[#F5F0E8] shadow-md shadow-[#151515]/20 scale-[1.02]"
                  : "bg-white text-slate-700 border border-[#A9A49D]/30 hover:border-[#B99A63] hover:bg-[#F5F0E8]"
              }`}
            >
              {pillar.label}
            </button>
          ))}
        </div>

        {/* Horizontal Navigation & Swipe Guidance */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#B99A63] animate-ping" />
            <span className="font-serif-luxury tracking-wider uppercase text-[#151515] text-[11px] sm:text-xs">
              Swipe Left / Right to Explore All 8 Offerings
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel("left")}
              aria-label="Previous pathway"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#151515] text-slate-700 hover:text-[#D4AF37] border border-[#A9A49D]/30 shadow-md flex items-center justify-center transition-all cursor-pointer tap-bounce"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              aria-label="Next pathway"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#151515] text-slate-700 hover:text-[#D4AF37] border border-[#A9A49D]/30 shadow-md flex items-center justify-center transition-all cursor-pointer tap-bounce"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 8 Distinct Interactive Service Cards - Horizontal Swipe Track */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-6 pt-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredCourses.map((course) => {
            const theme = SERVICE_THEMES[course.id] || {
              accentColor: "border-[#B99A63]/50",
              pillBadge: "bg-[#151515] text-[#D4AF37]",
              icon: Award,
              whatsappMsg: `Hello Dr. Malavika! I am interested in ${course.title}.`
            };
            const ServiceIcon = theme.icon;

            return (
              <div
                key={course.id}
                className="w-[82vw] max-w-[320px] sm:w-[340px] md:w-[370px] shrink-0 snap-start flex"
              >
                <div
                  className={`silk-pleat-card bg-white rounded-3xl overflow-hidden border ${theme.accentColor} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left group relative w-full`}
                >
                  <div>
                    {/* Card Thumbnail with Museum Border Frame */}
                    <div className="p-3 pb-0">
                      <div className="card-photo-frame aspect-[16/10] w-full bg-[#151515] relative overflow-hidden rounded-2xl">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/80 via-transparent to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#151515]/90 text-[#F5F0E8] backdrop-blur-xs border border-white/10">
                            {course.level}
                          </span>
                          {course.badge && (
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${theme.pillBadge}`}>
                              {course.badge}
                            </span>
                          )}
                        </div>

                        {/* Bottom Info Bar inside image */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 text-[10px] font-bold text-[#F5F0E8] tracking-wider uppercase">
                          <ServiceIcon className="w-3.5 h-3.5 text-[#B99A63]" />
                          <span>{course.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#B99A63]">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span className="truncate">{course.ageGroup}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#151515] font-serif-luxury group-hover:text-[#B99A63] transition-colors leading-snug">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Key syllabus preview points */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block">
                          Curriculum Highlights:
                        </span>
                        {course.syllabus.slice(0, 2).map((item, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B99A63] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer: Two Distinct Actions */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-3 space-y-2">
                    <div className="flex items-center justify-between gap-2 pt-3">
                      <button
                        onClick={() => handleViewSyllabus(course)}
                        className="text-xs font-bold text-slate-600 hover:text-[#151515] transition-colors underline-offset-4 hover:underline cursor-pointer"
                      >
                        View Syllabus
                      </button>

                      <button
                        onClick={() => handleBookingClick(course.title)}
                        className="silk-zari-btn px-4 py-2 rounded-full bg-[#151515] hover:bg-[#B99A63] text-[#F5F0E8] hover:text-[#151515] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer tap-bounce shadow-sm hover:shadow-md"
                      >
                        <span>Book 1-to-1</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Direct WhatsApp Action for this specific course */}
                    <button
                      onClick={() => handleWhatsAppEnquiry(course)}
                      className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer tap-bounce"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Enquire on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StageSpotlightOverlay>
  );
}
