import React, { useState } from "react";
import { useAcademy } from "../context/AcademyContext";
import AnimatedSection from "../components/AnimatedSection";
import {
  Search,
  ArrowRight,
  GraduationCap
} from "lucide-react";

export default function Teachers() {
  const { teachers, navigateTo } = useAcademy();
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachers.filter((t) => {
    if (selectedDept !== "All" && t.department !== selectedDept) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchRole = t.role.toLowerCase().includes(q);
      const matchSpec = t.specialisation.toLowerCase().includes(q);
      return matchName || matchRole || matchSpec;
    }
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 overflow-x-clip">
      {/* Header */}
      <section className="relative pt-10 sm:pt-12 pb-12 sm:pb-14 bg-gradient-to-b from-purple-100/50 via-slate-50 to-white text-center">
        <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
            World-Class Mentorship
          </span>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Meet Our Master Instructors
          </h1>
          <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our faculty combines international concert hall and stage careers with compassionate, patient teaching methodologies for both young beginners and seasoned adults.
          </p>
        </AnimatedSection>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection animation="fade-up" className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Department Tabs */}
          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto max-w-full">
            {["All", "Dance", "Music"].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap tap-bounce ${
                  selectedDept === dept
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {dept === "All" ? "All Faculty" : `${dept} Faculty`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name or style..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Teacher Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredTeachers.map((teacher, idx) => (
            <AnimatedSection
              key={teacher.id}
              delay={idx * 80}
              className={`bg-white rounded-3xl overflow-hidden shadow-md hover-lift-3d transition-all duration-300 flex flex-col sm:flex-row text-left group relative ${
                teacher.id === "t-malavika-sunil"
                  ? "border-2 border-amber-400 shadow-xl shadow-amber-500/10 ring-4 ring-amber-100"
                  : "border border-slate-100"
              }`}
            >
              {/* Photo */}
              <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden bg-slate-900 shrink-0 hover-img-zoom">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 sm:from-transparent via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300">
                  {teacher.department}
                </div>
                {teacher.id === "t-malavika-sunil" && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    ★ Founder & Director
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md">
                      {teacher.experience}
                    </span>
                    {teacher.id === "t-malavika-sunil" && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        CCRT Scholar
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-bold text-purple-700 mt-0.5 mb-3">{teacher.role}</p>

                  {/* Accreditations */}
                  {teacher.qualifications && (
                    <div className="flex items-start gap-2 mb-3 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <GraduationCap className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{teacher.qualifications}</span>
                    </div>
                  )}

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {teacher.bio}
                  </p>

                  {/* Specialisation */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Specialisation:
                    </span>
                    <p className="text-xs font-semibold text-slate-800">
                      {teacher.specialisation}
                    </p>
                  </div>

                  {/* Classes Taught */}
                  {teacher.classes && teacher.classes.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {teacher.classes.map((cls, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 text-[11px] font-semibold"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Book Class CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Trial Class Available</span>
                  <button
                    onClick={() => navigateTo("trial", { title: teacher.classes ? teacher.classes[0] : teacher.specialisation, category: teacher.department })}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-purple-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer tap-bounce"
                  >
                    <span>Book Trial with {teacher.name.startsWith("Dr.") ? teacher.name.split(" ")[1] : teacher.name.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Guest Artists & Masterclasses Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection
          animation="zoom-in"
          className="rounded-3xl bg-slate-900 text-white p-6 sm:p-12 border border-slate-800 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Visiting Faculty Program
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Guest Masterclasses & Seasonal Residencies
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Throughout each academic year, we invite international Broadway choreographers, London West End soloists, and classical touring maestros to conduct weekend intensive workshops for our students.
            </p>
          </div>
          <button
            onClick={() => navigateTo("trial")}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 transition-all shrink-0 cursor-pointer tap-bounce"
          >
            Enrol for Next Masterclass
          </button>
        </AnimatedSection>
      </section>
    </div>
  );
}
