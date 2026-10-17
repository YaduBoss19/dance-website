import React, { useState, useEffect } from "react";
import { useAcademy } from "../context/AcademyContext";
import { playGhungrooChime } from "../utils/talamAudio";
import { Sparkles, ChevronRight } from "lucide-react";

export default function Navbar() {
  const { currentPage, navigateTo } = useAcademy();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: "about", label: "About", target: "meet-instructor" },
    { id: "journey", label: "Journey", target: "artistic-journey" },
    { id: "classes", label: "Classes", target: "services-section" },
    { id: "art-forms", label: "Art Forms", target: "art-forms" },
    { id: "navarasa", label: "Navarasa", target: "navarasa-section" },
    { id: "gallery", label: "Gallery", target: "gallery-section" },
    { id: "contact", label: "Contact", target: "book-trial" }
  ];

  const handleNavClick = (linkItem) => {
    playGhungrooChime();
    setMobileMenuOpen(false);
    if (typeof linkItem === "string") {
      navigateTo(linkItem);
      return;
    }

    if (currentPage === "home") {
      const el = document.getElementById(linkItem.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // If not on home, or target not found, navigate to corresponding page
    if (linkItem.id === "classes" || linkItem.id === "art-forms") {
      navigateTo("courses");
    } else if (linkItem.id === "about" || linkItem.id === "journey") {
      navigateTo("about");
    } else if (linkItem.id === "gallery") {
      navigateTo("gallery");
    } else if (linkItem.id === "contact") {
      navigateTo("contact");
    } else {
      navigateTo("home");
    }
  };

  const handleBookTrialClick = () => {
    playGhungrooChime();
    setMobileMenuOpen(false);
    if (currentPage === "home") {
      const el = document.getElementById("book-trial");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigateTo("trial");
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Pristine Single Navigation Bar (No cluttered utility bar) */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#F5F0E8]/98 text-[#151515] backdrop-blur-md shadow-md py-2.5 sm:py-3 border-b border-[#B99A63]/40"
            : "bg-[#F5F0E8]/95 text-[#151515] backdrop-blur-md py-3.5 sm:py-4 border-b border-[#A9A49D]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo & Instructor Brand Name */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none tap-bounce"
            aria-label="Dr. Malavika M. Sunil Home"
          >
            {/* Prominent, clean logo without any black background or clipping circle */}
            <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo_transparent.png"
                alt="Dr. Malavika M. Sunil Logo"
                className="h-full w-auto object-contain drop-shadow-xs"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight font-serif-luxury text-[#151515] leading-tight">
                  Dr. Malavika M. Sunil
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#B99A63] uppercase">
                Dance & Music · 1-to-1 Studio
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer text-[#151515]/85 hover:text-[#B99A63] hover:bg-black/5 ${
                    isActive ? "text-[#B99A63] font-bold" : ""
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Primary CTA: Book a Trial */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleBookTrialClick}
              className="silk-zari-btn px-6 py-2.5 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-sm tracking-wide shadow-md shadow-[#B99A63]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer tap-bounce flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#151515]" />
              <span>Book a Trial</span>
            </button>
          </div>

          {/* Mobile Actions: CTA Button & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleBookTrialClick}
              className="px-3.5 py-1.5 rounded-full bg-[#B99A63] text-[#151515] text-xs font-bold shadow-xs tap-bounce"
            >
              Book Trial
            </button>

            {/* Smooth Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors focus:outline-none tap-bounce text-[#151515] hover:bg-black/5"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 rounded-full bg-[#151515] transition-all duration-300 ${
                  mobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 rounded-full bg-[#151515] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 rounded-full bg-[#151515] transition-all duration-300 ${
                  mobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay (matches exact navbar height) */}
            <div
              className="fixed inset-0 top-16 bg-[#151515]/70 backdrop-blur-xs z-30 lg:hidden animate-in fade-in duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="relative z-40 lg:hidden border-t border-[#A9A49D]/20 bg-[#F5F0E8] px-5 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-300 max-h-[calc(100vh-70px)] overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all text-left cursor-pointer min-h-[46px] tap-bounce ${
                        isActive
                          ? "text-[#151515] bg-[#B99A63]/20 font-black"
                          : "text-[#151515]/85 hover:bg-black/5 hover:text-[#151515]"
                      }`}
                    >
                      <span className="font-serif-luxury text-lg">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#A9A49D]" />
                    </button>
                  );
                })}

                <div className="pt-5 mt-2 border-t border-[#A9A49D]/20">
                  <button
                    onClick={handleBookTrialClick}
                    className="silk-zari-btn w-full py-3.5 rounded-full bg-[#B99A63] text-[#151515] font-extrabold text-sm text-center shadow-md shadow-[#B99A63]/25 flex items-center justify-center gap-2 cursor-pointer tap-bounce"
                  >
                    <Sparkles className="w-4 h-4 text-[#151515]" />
                    <span>Book a 1-to-1 Trial Session</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
