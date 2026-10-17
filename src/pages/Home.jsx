import React, { useState, useRef } from "react";
import { useAcademy } from "../context/AcademyContext";
import AnimatedSection from "../components/AnimatedSection";
import CinematicReelsShowcase from "../components/CinematicReelsShowcase";
import GoldParticlesCanvas from "../components/GoldParticlesCanvas";
import ArtisticJourneyTimeline from "../components/ArtisticJourneyTimeline";
import InteractiveServiceCards from "../components/InteractiveServiceCards";
import ImmersiveArtForms from "../components/ImmersiveArtForms";
import NavarasaWheel from "../components/NavarasaWheel";
import SacredMandalaScroll from "../components/SacredMandalaScroll";
import StageSpotlightOverlay from "../components/StageSpotlightOverlay";
import GoldDivider from "../components/GoldDivider";
import { playGhungrooChime } from "../utils/talamAudio";
import { FAQS, TESTIMONIALS } from "../data/initialData";
import {
  Sparkles,
  ArrowRight,
  Star,
  Award,
  MessageCircle,
  Send,
  Heart,
  ChevronDown,
  Play,
  Film,
  UserCheck
} from "lucide-react";

export default function Home() {
  const {
    setLightboxItem,
    academyInfo,
    addEnquiry,
    showToast
  } = useAcademy();

  // Booking Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    discipline: "Bharatanatyam Classical Dance",
    level: "Complete Beginner (No prior experience)",
    preferredTime: "Weekday Evening",
    timezone: "Europe / Georgia (GET)",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Full-Bleed Cinematic Background Video State & Handlers
  const bgVideoRef = useRef(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const openTheatreModal = () => {
    playGhungrooChime();
    setLightboxItem({
      id: "theatre-performance-intro",
      title: "Dr. Malavika M. Sunil — Classical Bharatanatyam Margam",
      category: "Classical Performance",
      videoSrc: "/videos/performance.mp4",
      caption:
        "Full studio recital by Dr. Malavika M. Sunil. Filmed on stage with authentic Carnatic orchestral accompaniment, presenting the intricate geometric footwork (Nritta) and emotional depth (Abhinaya) of the Pandanallur lineage."
    });
  };

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setHeroTilt({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      showToast("Please provide your name, email, and contact number.", "error");
      return;
    }

    playGhungrooChime();
    setIsSubmitting(true);
    setTimeout(() => {
      addEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: "trial",
        courseInterest: formData.discipline,
        notes: `Level: ${formData.level} | Preferred Time: ${formData.preferredTime} (${formData.timezone}) | Goals: ${formData.notes || "None specified"}`,
        status: "New"
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      playGhungrooChime();
      showToast("Your 1-to-1 trial request has been submitted! Dr. Malavika will confirm your slot shortly.", "success");
    }, 600);
  };

  const openWhatsAppBooking = () => {
    playGhungrooChime();
    const msg = `Hello Dr. Malavika! I would like to book a 1-to-1 trial session.%0A%0A*Name:* ${formData.name || "Student"}%0A*Discipline:* ${formData.discipline}%0A*Level:* ${formData.level}%0A*Preferred Time:* ${formData.preferredTime}`;
    const url = `https://wa.me/${academyInfo.whatsappNumber.replace(/[^0-9]/g, "")}?text=${msg}`;
    window.open(url, "_blank");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectServiceForBooking = (serviceTitle) => {
    setFormData((prev) => ({ ...prev, discipline: serviceTitle }));
    scrollToSection("book-trial");
  };

  return (
    <div className="bg-[#F5F0E8] text-[#151515] selection:bg-[#B99A63]/30 selection:text-[#151515] overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC 3D HERO SECTION: Full-Bleed Video Background + Multi-Stop Luxury Overlay
      ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-8 border-b border-[#B99A63]/30 overflow-hidden bg-[#151515] text-[#F5F0E8]">
        {/* Full-Bleed Ambient Performance Video Background */}
        <video
          ref={bgVideoRef}
          src="/videos/performance.mp4"
          poster="/images/malavika_dance_stage.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105 transition-opacity duration-1000"
        />

        {/* Multi-Stop Luxury Dual-Tone Gradient Vignette Overlay (Ensures crystal-clear text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515]/95 via-[#24050B]/85 to-[#151515]/55 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(21,21,21,0.75)_85%)] pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F5F0E8] via-[#151515]/80 to-transparent pointer-events-none z-10" />

        {/* Stage Gold Particles Background Canvas & Parallax Sacred Temple Yantra */}
        <GoldParticlesCanvas count={42} className="opacity-75 z-10" />
        <div
          style={{
            transform: `translate3d(${heroTilt.x * -1.8}px, ${heroTilt.y * -1.8}px, 0)`,
            transition: heroTilt.x === 0 ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
          }}
          className="absolute -right-24 -top-20 pointer-events-none z-10"
        >
          <SacredMandalaScroll className="opacity-[0.09]" size={640} />
        </div>

        <div className="max-w-7xl mx-auto relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Headline & Pitch */}
            <AnimatedSection animation="fade-up" className="lg:col-span-7 text-left space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515]/90 backdrop-blur-md text-[#D4AF37] border border-[#B99A63]/60 text-xs font-bold tracking-widest uppercase shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Strictly Limited 1-to-1 Studio Cohorts · 2026/27</span>
                </div>

                <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-[#B99A63]/80 italic">
                  यतो हस्तस्ततो दृष्टिः · Natya Shastra
                </span>
              </div>

              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F0E8] leading-[1.08] font-serif-luxury drop-shadow-lg">
                Your Passion. <br />
                Your Pace. <br />
                <span className="italic text-[#D4AF37]">Your Personal Coach.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                A personal sanctuary for classical dance, music, and artistic mastery. Learn Bharatanatyam, Carnatic vocal music, and custom choreography through <strong>online, one-to-one private lessons</strong> mentored directly by <strong>Dr. Malavika M. Sunil</strong>.
              </p>

              {/* Two Required Prominent CTAs: Explore Classes & Meet the Artist */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => {
                    playGhungrooChime();
                    scrollToSection("services-section");
                  }}
                  className="silk-zari-btn px-8 py-4 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-sm sm:text-base shadow-xl shadow-[#B99A63]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer tap-bounce"
                >
                  <Sparkles className="w-4 h-4 text-[#151515]" />
                  <span>Explore Classes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    playGhungrooChime();
                    scrollToSection("artistic-journey");
                  }}
                  className="silk-zari-gold-sweep px-7 py-4 rounded-full bg-[#151515]/80 hover:bg-[#252525] text-[#F5F0E8] border border-[#B99A63]/50 font-bold text-sm sm:text-base shadow-md backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer tap-bounce"
                >
                  <UserCheck className="w-4 h-4 text-[#B99A63]" />
                  <span>Meet the Artist</span>
                </button>
              </div>

              {/* 4 Value Pillars Banner: Glassmorphic Cards with Depth */}
              <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                {[
                  { title: "Online 1-to-1", desc: "Live, personalised lessons worldwide.", tag: "Global" },
                  { title: "Personal Coaching", desc: "Syllabus tailored to your anatomy.", tag: "Doctor-Led" },
                  { title: "Flexible Timing", desc: "Request times around your routine.", tag: "Self-Paced" },
                  { title: "Dance & Music", desc: "Bharatanatyam, Carnatic & Yoga.", tag: "Living Lineage" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#B99A63]/60 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="text-[10px] font-mono tracking-widest text-[#B99A63] uppercase mb-1">
                      {item.tag}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#F5F0E8] group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right Visual Frame: Museum Spotlight Frame with Multi-Plane 3D Tilt */}
            <AnimatedSection animation="fade-up" delay={150} className="lg:col-span-5 relative perspective-scene">
              <div
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${heroTilt.y}deg) rotateY(${heroTilt.x}deg)`,
                  transition: heroTilt.x === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
                }}
                className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none transition-transform will-change-transform"
              >
                <div className="museum-frame group shadow-2xl">
                  <div className="museum-frame-inner aspect-[4/5] bg-[#151515] relative overflow-hidden rounded-2xl">
                    <img
                      src="/images/malavika_dance_stage.jpg"
                      alt="Dr. Malavika M. Sunil Bharatanatyam Margam"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay & Fullscreen Theatre Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/30 to-transparent flex flex-col justify-between p-6">
                      {/* Top Tag */}
                      <div className="self-end flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#151515]/90 backdrop-blur-md text-[#D4AF37] border border-[#B99A63]/60 flex items-center gap-1.5 shadow-lg">
                          <Film className="w-3.5 h-3.5 text-[#B99A63]" />
                          <span>Performance Reel</span>
                        </span>
                      </div>

                      {/* Center Glowing Play Button for Theatre Fullscreen */}
                      <div className="self-center flex flex-col items-center gap-3">
                        <button
                          onClick={openTheatreModal}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] flex items-center justify-center shadow-2xl shadow-[#B99A63]/50 group-hover:scale-110 active:scale-95 transition-all cursor-pointer tap-bounce"
                          title="Watch Full Performance with Sound"
                          aria-label="Watch Full Performance with Sound"
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#151515] ml-1" />
                        </button>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5F0E8] bg-[#151515]/85 px-3.5 py-1 rounded-full border border-[#B99A63]/40 backdrop-blur-xs">
                          Watch with Sound (Theatre Mode)
                        </span>
                      </div>

                      {/* Bottom Visual Label */}
                      <div className="text-left text-[#F5F0E8]">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#B99A63] text-[#151515] uppercase tracking-wider inline-block mb-1.5">
                          Classical Margam & Vocal Intro
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#F5F0E8]">
                          Dr. Malavika M. Sunil
                        </h3>
                        <p className="text-xs text-[#A9A49D] mt-0.5">
                          CCRT Scholar · 21 Years Lineage · MBBS Physician
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top-Right Floating 3D Badge: CCRT Scholar */}
                <div
                  style={{
                    transform: "translateZ(45px)"
                  }}
                  className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 bg-[#151515]/95 text-[#F5F0E8] border border-[#B99A63]/70 px-4 py-2.5 rounded-2xl shadow-2xl text-left flex items-center gap-2.5 z-30 backdrop-blur-md hover:scale-105 transition-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#D4AF37]">
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">CCRT National Scholar</div>
                    <div className="text-[10px] text-[#A9A49D]">Govt. of India · Age 12</div>
                  </div>
                </div>

                {/* Bottom-Left Floating 3D Badge: 600+ Recitals & 5 Films */}
                <div
                  style={{
                    transform: "translateZ(50px)"
                  }}
                  className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 bg-[#24050B]/95 text-[#F5F0E8] border border-[#B99A63]/70 px-4 py-2.5 rounded-2xl shadow-2xl text-left flex items-center gap-2.5 z-30 backdrop-blur-md hover:scale-105 transition-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-[#3B0B14] flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D4AF37]">600+ Recitals · 5 Films</div>
                    <div className="text-[10px] text-slate-300">21+ Yrs Classical Lineage</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Theatrical Antique Gold Transition Divider */}
      <div className="bg-[#151515] py-2">
        <GoldDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STORYTELLING THROUGH SCROLL: The Artistic Journey Timeline
      ───────────────────────────────────────────────────────────── */}
      <ArtisticJourneyTimeline />

      <div className="bg-[#FAF7F2] py-2">
        <GoldDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MEET YOUR INSTRUCTOR: Personal spotlight on Dr. Malavika
      ───────────────────────────────────────────────────────────── */}
      <section id="meet-instructor" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-[#A9A49D]/20 relative overflow-hidden">
        {/* Sacred Temple Yantra Mandala Background */}
        <SacredMandalaScroll className="absolute -left-28 -bottom-24 opacity-[0.05] -z-10" size={540} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Instructor Portrait with Museum Frame */}
            <AnimatedSection animation="fade-up" className="lg:col-span-5 relative">
              <div className="museum-frame group">
                <div className="museum-frame-inner aspect-[4/5] bg-[#151515] relative">
                  <img
                    src="/images/malavika_portrait.jpg"
                    alt="Dr. Malavika M. Sunil Portrait"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/90 via-[#151515]/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#B99A63]">
                      Your Personal Mentor
                    </span>
                    <h3 className="text-2xl font-bold font-serif-luxury text-[#F5F0E8]">
                      Dr. Malavika M. Sunil
                    </h3>
                    <p className="text-xs text-[#A9A49D] mt-1">
                      Disciple of Dr. Sunil Nellay & Resmi Narayanan
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Biography, Credentials & Philosophy */}
            <AnimatedSection animation="fade-up" delay={100} className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] bg-[#B99A63]/10 px-3.5 py-1 rounded-full border border-[#B99A63]/30">
                  Meet Your Instructor
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151515] font-serif-luxury">
                  Rooted in Sacred Tradition. <br />
                  <span className="italic text-[#B99A63]">Guided by Anatomical Science.</span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Welcome to a private space where classical dance and music are taught as living arts. I began my Bharatanatyam journey over 21 years ago under my father and master guru, <strong>Dr. Sunil Nellay</strong>, and trained for 16+ years in Carnatic vocal music under my mother, <strong>Resmi Narayanan</strong>. At age 12, I was honored with the prestigious <strong>CCRT National Scholarship</strong> by the Government of India.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Alongside 600+ stage recitals and starring in 5 Malayalam feature films (including <em>Kaazhcha</em>), I completed my medical degree (<strong>MBBS</strong>) in Tbilisi, Georgia, and became a certified yoga instructor. This unique intersection of medicine and movement allows me to coach you with biomechanical precision—preventing dance injuries, strengthening posture, and developing vocal endurance safely.
              </p>

              {/* Teaching Philosophy Callout */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#151515] text-[#F5F0E8] border border-[#B99A63]/40 space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-[#B99A63] flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 fill-[#B99A63]" />
                  <span>My Teaching Philosophy</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "No two bodies or voices are identical. In 1-to-1 private coaching, we discard one-size-fits-all group drill pressures. We progress at your exact pace, aligning rhythm, anatomy, and soulful expression so you truly own your art."
                </p>
              </div>

              {/* 4 Key Milestone Accolades */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-[#A9A49D]/20 text-center">
                  <div className="text-xl font-black text-[#151515] font-serif-luxury">21+ Yrs</div>
                  <div className="text-[11px] text-slate-600 font-medium">Bharatanatyam</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#A9A49D]/20 text-center">
                  <div className="text-xl font-black text-[#B99A63] font-serif-luxury">CCRT</div>
                  <div className="text-[11px] text-slate-600 font-medium">National Scholar</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#A9A49D]/20 text-center">
                  <div className="text-xl font-black text-[#151515] font-serif-luxury">MBBS</div>
                  <div className="text-[11px] text-slate-600 font-medium">Physician & Yoga</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#A9A49D]/20 text-center">
                  <div className="text-xl font-black text-[#B99A63] font-serif-luxury">600+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Stage Recitals</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE 8 SERVICE CARDS: Dedicated Identities & WhatsApp Actions
      ───────────────────────────────────────────────────────────── */}
      <InteractiveServiceCards onSelectServiceForBooking={selectServiceForBooking} />

      <div className="bg-[#151515] py-2">
        <GoldDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. IMMERSIVE ART-FORM TRANSITIONS: 4 Interactive Disciplines
      ───────────────────────────────────────────────────────────── */}
      <ImmersiveArtForms />

      <div className="bg-[#151515] py-2">
        <GoldDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5B. INTERACTIVE NAVARASA EMOTION WHEEL: The 9 Sentiments of Abhinaya
      ───────────────────────────────────────────────────────────── */}
      <NavarasaWheel />

      <div className="bg-[#FAF7F2] py-2">
        <GoldDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. THE 1-TO-1 EXPERIENCE: The Process Explained
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 border-b border-[#A9A49D]/20">
        <div className="max-w-7xl mx-auto space-y-12">
          <AnimatedSection animation="fade-up" className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] bg-[#B99A63]/10 px-3.5 py-1 rounded-full border border-[#B99A63]/30">
              Personalized Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151515] font-serif-luxury">
              The 1-to-1 Experience
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              How private online mentorship works — from your first trial consultation to stage mastery.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-left">
            {[
              {
                step: "01",
                title: "Choose Discipline",
                desc: "Select Bharatanatyam, Carnatic vocal music, Bollywood, or yoga conditioning based on your passion."
              },
              {
                step: "02",
                title: "Discuss Your Goals",
                desc: "A brief private assessment to understand your physical posture, vocal pitch, and musical dreams."
              },
              {
                step: "03",
                title: "Book Flexible Time",
                desc: "Schedule sessions that suit your personal timezone in North America, Europe, Middle East, or Asia."
              },
              {
                step: "04",
                title: "Live 1-to-1 Lesson",
                desc: "Direct, undivided attention with Dr. Malavika. Immediate correction of mudras, tala rhythm, and shruti."
              },
              {
                step: "05",
                title: "Personal Feedback",
                desc: "Receive customized video practice clips and constructive notes after every session for steady progress."
              }
            ].map((step, idx) => (
              <AnimatedSection
                key={step.step}
                delay={idx * 60}
                className="p-6 rounded-2xl bg-white border border-[#A9A49D]/20 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-[#B99A63] font-serif-luxury mb-3">
                    {step.step}
                  </div>
                  <h4 className="text-base font-bold text-[#151515] mb-1.5">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. GALLERY & ACHIEVEMENTS: Two-Panel Cinematic Hero + Infinite Reels
      ───────────────────────────────────────────────────────────── */}
      <CinematicReelsShowcase
        onExploreClick={() => scrollToSection("services-section")}
        onMeetArtistClick={() => scrollToSection("artistic-journey")}
        onPhotoClick={(item) => setLightboxItem(item)}
      />

      {/* ─────────────────────────────────────────────────────────────
          8. STUDENT TESTIMONIALS: Genuine 1-to-1 Feedback
      ───────────────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-[#A9A49D]/20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto space-y-12">
          <AnimatedSection animation="fade-up" className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] bg-[#B99A63]/10 px-3.5 py-1 rounded-full border border-[#B99A63]/30">
              Student Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151515] font-serif-luxury">
              Student & Parent Stories
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              What it feels like to learn directly from a dedicated private mentor.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <AnimatedSection
                key={t.id}
                delay={idx * 80}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-[#A9A49D]/20 shadow-sm flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#B99A63] mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B99A63]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#B99A63]/40"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#151515]">{t.name}</h4>
                    <p className="text-[11px] text-[#B99A63] font-medium">{t.relation}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#151515] py-2">
        <GoldDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          9. BOOK A TRIAL SESSION (PRIMARY CONVERSION SECTION)
      ───────────────────────────────────────────────────────────── */}
      <StageSpotlightOverlay>
        <section id="book-trial" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-[#A9A49D]/20 bg-[#151515] text-[#F5F0E8] relative overflow-hidden">
        {/* Sacred Temple Yantra Mandala Background */}
        <SacredMandalaScroll className="absolute -right-24 -top-24 opacity-[0.06] -z-10" size={540} />

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B0B14]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B99A63]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] bg-[#B99A63]/15 px-3.5 py-1.5 rounded-full border border-[#B99A63]/40 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
              <span>Zero-Commitment Trial</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F0E8] font-serif-luxury">
              Book a 1-to-1 Trial Session
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Meet Dr. Malavika M. Sunil for a private 45-minute video consultation and movement/vocal assessment. Share your goals, ask questions, and discover your personalized learning pathway.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-semibold tracking-wider uppercase text-[#B99A63]">
              <span className="px-3.5 py-1.5 rounded-full bg-[#B99A63]/10 border border-[#B99A63]/30 backdrop-blur-xs flex items-center gap-1.5">
                <span className="text-[#D4AF37]">✦</span> By Private Consultation &amp; Mentorship
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <span className="text-[#D4AF37]">✦</span> Flexible Global Cohorts (USA, UK, UAE &amp; India)
              </span>
            </div>
          </AnimatedSection>

          {/* Form Card */}
          <div className="museum-frame-dark bg-[#1f1f1f]/95 rounded-3xl p-6 sm:p-10 border border-[#B99A63]/35 shadow-2xl text-left relative overflow-hidden">
            {submittedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#B99A63]/20 text-[#B99A63] flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-[#B99A63]" />
                </div>
                <h3 className="text-2xl font-bold font-serif-luxury text-[#F5F0E8]">
                  Trial Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Dr. Malavika has received your request for <strong>{formData.discipline}</strong>. You will receive an email and WhatsApp confirmation to finalize your exact video session slot.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={openWhatsAppBooking}
                    className="silk-zari-btn px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 tap-bounce"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Instantly via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Student Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Student's Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Ananya Nair"
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-[#A9A49D]/30 text-white text-sm focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="e.g. ananya@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-[#A9A49D]/30 text-white text-sm focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Phone / WhatsApp (with country code) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-[#A9A49D]/30 text-white text-sm focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>

                  {/* Discipline Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Discipline of Interest *
                    </label>
                    <select
                      name="discipline"
                      value={formData.discipline}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-[#A9A49D]/30 text-white text-sm focus:outline-none focus:border-[#B99A63]"
                    >
                      <option value="Online Bharatanatyam Diploma Programme">Online Bharatanatyam Diploma Programme</option>
                      <option value="Online Carnatic Vocal Music Classes">Online Carnatic Vocal Music Classes</option>
                      <option value="Online Semi-Classical and Bollywood Dance Classes">Online Semi-Classical & Bollywood Dance</option>
                      <option value="Online Yoga and Fitness Classes">Online Yoga & Fitness for Dancers</option>
                      <option value="Personalised Dance Choreography">Personalised Dance Choreography (Custom Songs)</option>
                      <option value="Stage Performance Choreography">Stage Performance Choreography</option>
                      <option value="One-Day Dance Workshops for Institutions">One-Day Dance Workshop for Institutions</option>
                      <option value="Five-Day Dance Workshops for Institutions">Five-Day Dance Workshop for Institutions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Experience Level */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Current Experience Level
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-[#A9A49D]/30 text-white text-sm focus:outline-none focus:border-[#B99A63]"
                    >
                      <option value="Complete Beginner (No prior experience)">Complete Beginner (Starting from zero)</option>
                      <option value="Some Prior Lessons (Basic Adavus / Sarali Varisais)">Some Prior Lessons (Basic foundation)</option>
                      <option value="Intermediate Dancer / Singer">Intermediate (Seeking refinement & repertoire)</option>
                      <option value="Advanced / Arangetram / Stage Performer">Advanced / Arangetram / Stage Performer</option>
                    </select>
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Preferred Session Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-[#A9A49D]/30 text-white text-sm focus:outline-none focus:border-[#B99A63]"
                    >
                      <option value="Weekday Morning">Weekday Morning</option>
                      <option value="Weekday Afternoon">Weekday Afternoon</option>
                      <option value="Weekday Evening">Weekday Evening</option>
                      <option value="Weekend Morning">Weekend Morning</option>
                      <option value="Weekend Afternoon / Evening">Weekend Afternoon / Evening</option>
                    </select>
                  </div>
                </div>

                {/* Goals & Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Your Creative Goals & Questions (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="e.g. Preparing for a family sangeet, starting Bharatanatyam as an adult beginner, or seeking posture-safe training..."
                    className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-[#A9A49D]/30 text-white text-sm focus:outline-none focus:border-[#B99A63]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="silk-zari-btn w-full sm:flex-1 py-4 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-sm sm:text-base shadow-xl shadow-[#B99A63]/30 transition-all cursor-pointer flex items-center justify-center gap-2 tap-bounce disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#151515]" />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsAppBooking}
                    className="silk-zari-btn w-full sm:w-auto px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 tap-bounce cursor-pointer shadow-lg shadow-emerald-900/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Directly</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      </StageSpotlightOverlay>

      <div className="bg-[#FAF7F2] py-2">
        <GoldDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          10. FAQS & REASSURANCE
      ───────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-20 sm:py-28 px-4 sm:px-8 border-b border-[#A9A49D]/20">
        <div className="max-w-4xl mx-auto space-y-12">
          <AnimatedSection animation="fade-up" className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B99A63] bg-[#B99A63]/10 px-3.5 py-1 rounded-full border border-[#B99A63]/30">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#151515] font-serif-luxury">
              Everything You Need to Know
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear answers about online setup, flexible timezones, adult beginner pacing, and cancellations.
            </p>
          </AnimatedSection>

          <div className="space-y-4 text-left">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <AnimatedSection
                  key={idx}
                  delay={idx * 40}
                  className="rounded-2xl bg-white border border-[#A9A49D]/20 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#151515] font-serif-luxury">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#B99A63] shrink-0 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
