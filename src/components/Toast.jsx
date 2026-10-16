import React from "react";
import { useAcademy } from "../context/AcademyContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useAcademy();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        let bg = "bg-emerald-600 text-white";
        let Icon = CheckCircle2;
        if (toast.type === "error") {
          bg = "bg-rose-600 text-white";
          Icon = AlertCircle;
        } else if (toast.type === "info") {
          bg = "bg-purple-900 text-white";
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${bg}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm font-medium leading-relaxed">{toast.text}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
