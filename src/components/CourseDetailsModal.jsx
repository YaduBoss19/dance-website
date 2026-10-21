import React from "react";
import { useAcademy } from "../context/AcademyContext";
import {
  X,
  Sparkles,
  Clock,
  Calendar,
  Award,
  CheckCircle2,
  Shirt,
  ArrowRight
} from "lucide-react";

export default function CourseDetailsModal() {
  const { selectedCourseModal, setSelectedCourseModal, navigateTo } = useAcademy();

  if (!selectedCourseModal) return null;

  const course = selectedCourseModal;

  const handleBookTrial = () => {
    setSelectedCourseModal(null);
    navigateTo("trial", course);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setSelectedCourseModal(null)}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedCourseModal(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer tap-bounce"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image (Approach B: Full uncropped letterbox) */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl bg-[#0f0e0d] flex items-center justify-center">
          <img
            src={course.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
            aria-hidden="true"
          />
          <img
            src={course.image}
            alt={course.title}
            className="relative z-10 w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none z-10" />

          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-900 backdrop-blur-md">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">
                {course.ageGroup}
              </span>
              {course.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
                  ★ {course.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-600" /> Duration
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">{course.duration}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-600" /> Frequency
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">{course.frequency || "2x / week"}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" /> Level
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">{course.level}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-semibold text-amber-800 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Mentorship
              </span>
              <p className="text-sm font-bold text-amber-900 mt-1">Dr. Malavika</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Course Overview
            </h4>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {course.description}
            </p>
          </div>

          {/* Syllabus / What You'll Learn */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100">
              <h4 className="text-sm font-bold text-purple-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" /> What You Will Master
              </h4>
              <ul className="space-y-2">
                {course.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dress Code / Equipment */}
          {course.dressCode && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <Shirt className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Attire & Gear Guidelines
                </h5>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {course.dressCode}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleBookTrial}
              className="w-full sm:flex-1 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book a Free Trial for this Class</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedCourseModal(null)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
