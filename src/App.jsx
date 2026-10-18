import React from "react";
import { AcademyProvider, useAcademy } from "./context/AcademyContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
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

          <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end">
            {/* Quick WhatsApp Floating Button (Desktop - Icon Only) */}
            <button
              onClick={openWhatsApp}
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl shadow-black/30 hover:scale-110 border border-white/20 transition-all cursor-pointer group tap-bounce"
              title="Chat directly with Dr. Malavika on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6 fill-white text-white" />
            </button>
          </div>

          {/* Mobile Bottom Navigation & Action Bar */}
          <MobileBottomBar />
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
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
