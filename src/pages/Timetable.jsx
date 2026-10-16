import React, { useState } from "react";
import { useAcademy } from "../context/AcademyContext";
import AnimatedSection from "../components/AnimatedSection";
import {
  Clock,
  MapPin,
  User,
  Sparkles,
  Printer,
  CheckCircle
} from "lucide-react";

export default function Timetable() {
  const { timetable, navigateTo } = useAcademy();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSlots = timetable.filter((slot) => {
    if (selectedDay !== "All" && slot.day !== selectedDay) return false;
    if (selectedCategory !== "All" && slot.category !== selectedCategory) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 overflow-x-clip">
      {/* Header */}
      <section className="relative pt-10 sm:pt-12 pb-12 sm:pb-14 bg-gradient-to-b from-purple-100/50 via-slate-50 to-white text-center">
        <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
            Weekly Schedule & Studio Rooms
          </span>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Academy Class Timetable
          </h1>
          <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore daily batch times across our Dance and Music suites. New trial students can select any highlighted slot for their trial class!
          </p>
        </AnimatedSection>
      </section>

      {/* Control and Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection animation="fade-up" className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-md space-y-4 sm:space-y-5">
          {/* Day Tabs */}
          <div className="flex items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-slate-100 overflow-x-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
              <button
                onClick={() => setSelectedDay("All")}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer tap-bounce ${
                  selectedDay === "All"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Full Week
              </button>

              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer tap-bounce ${
                    selectedDay === day
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer shrink-0 tap-bounce"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Timetable</span>
            </button>
          </div>

          {/* Discipline Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Discipline:
              </span>
              {["All", "Dance", "Music"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer tap-bounce ${
                    selectedCategory === cat
                      ? "bg-rose-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat === "All" ? "All Disciplines" : cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              Showing <strong>{filteredSlots.length}</strong> scheduled sessions
            </span>
          </div>
        </AnimatedSection>
      </section>

      {/* Timetable List / Schedule Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {filteredSlots.length === 0 ? (
          <AnimatedSection animation="fade-up" className="p-12 sm:p-16 rounded-3xl bg-white border border-slate-100 shadow-sm text-center max-w-md mx-auto space-y-3">
            <p className="text-base font-bold text-slate-800">No classes scheduled for this selection</p>
            <p className="text-xs text-slate-500">Please choose a different day or category filter above.</p>
          </AnimatedSection>
        ) : (
          <div className="space-y-3.5 sm:space-y-4">
            {filteredSlots.map((slot, idx) => (
              <AnimatedSection
                key={slot.id}
                delay={idx * 40}
                className={`p-4 sm:p-6 rounded-2xl bg-white shadow-sm hover-lift-3d transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-left group ${
                  slot.teacher.includes("Malavika")
                    ? "border-2 border-amber-300 ring-2 ring-amber-50 shadow-amber-500/10"
                    : "border border-slate-100"
                }`}
              >
                {/* Time & Day */}
                <div className="md:w-56 shrink-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800">
                      {slot.day}
                    </span>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {slot.time}
                    </span>
                  </div>
                </div>

                {/* Class & Details */}
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {slot.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {slot.ageGroup}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      Level: {slot.level}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {slot.course}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Instructor: {slot.teacher}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {slot.room}
                    </span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                  <button
                    onClick={() =>
                      navigateTo("trial", {
                        title: slot.course,
                        category: slot.category,
                        preferredTime: `${slot.day} (${slot.time})`
                      })
                    }
                    className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:brightness-110 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer tap-bounce"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Book Trial for this Slot</span>
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* Academy Flexible Attendance Policy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection
          animation="zoom-in"
          className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Complimentary Makeup Classes
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Missed a session due to illness or exam preparation? Enjoy up to 2 flexible makeup sessions per term with zero penalty.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Sibling & Family Discounts
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Families enrolling two or more siblings receive a 10% reduction across all subsequent tuition packages.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Studio Practice Access
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enrolled students have free supervised access to open piano practice rooms and dance mirrors during non-peak studio hours.
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
