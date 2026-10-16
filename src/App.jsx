import React from "react";
import { AcademyProvider, useAcademy } from "./context/AcademyContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import AudioWelcomeToast from "./components/AudioWelcomeToast";
import CourseDetailsModal from "./components/CourseDetailsModal";
import LightboxModal from "./components/LightboxModal";

// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import BookTrial from "./pages/BookTrial";
import ContactUs from "./pages/ContactUs";
import AdminDashboard from "./pages/AdminDashboard";

import CustomCursor from "./components/CustomCursor";
import TanpuraSoundscape from "./components/TanpuraSoundscape";
import MobileBottomBar from "./components/MobileBottomBar";
import { MessageCircle } from "lucide-react";
import "./App.css";

function AppContent() {
  const { currentPage, academyInfo } = useAcademy();

  const openWhatsApp = () => {
    const url = `https://wa.me/${academyInfo.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      academyInfo.whatsappDefaultMsg
    )}`;
    window.open(url, "_blank");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "about":
      case "teachers":
        return <AboutUs />;
      case "courses":
      case "timetable":
        return <Courses />;
      case "gallery":
        return <Gallery />;
      case "trial":
        return <BookTrial />;
      case "contact":
        return <ContactUs />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#151515] font-sans selection:bg-[#B99A63]/30 selection:text-[#151515]">
      {/* Luxury Magnetic Follower Cursor (Desktop) */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main View Area with mobile bottom padding */}
      <main className="flex-1 w-full pb-16 lg:pb-0">
        {renderPage()}
      </main>

      {/* Floating Action Buttons (Desktop only, mobile uses MobileBottomBar) */}
      {currentPage !== "admin" && (
        <>
          <TanpuraSoundscape />

          <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
            {/* Quick WhatsApp Floating Button (Desktop) */}
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#151515] hover:bg-[#B99A63] text-[#F5F0E8] hover:text-[#151515] font-bold text-sm shadow-xl shadow-black/20 hover:scale-105 border border-[#B99A63]/40 transition-all cursor-pointer group tap-bounce"
              title="Chat directly with Dr. Malavika on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="font-bold tracking-wide">WhatsApp Dr. Malavika</span>
            </button>
          </div>

          {/* Mobile Bottom Navigation & Action Bar */}
          <MobileBottomBar />
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <AudioWelcomeToast />
      <CourseDetailsModal />
      <LightboxModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AcademyProvider>
      <AppContent />
    </AcademyProvider>
  );
}
