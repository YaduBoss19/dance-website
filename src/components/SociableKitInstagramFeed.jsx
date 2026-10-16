import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, Check, Settings, Sparkles, AlertCircle } from "lucide-react";
import { playGhungrooChime } from "../utils/talamAudio";

function extractSociableKitId(rawInput) {
  if (!rawInput) return "";
  const cleaned = String(rawInput).trim();

  // Check data-embed-id attribute
  const dataEmbedMatch = cleaned.match(/data-embed-id=['"]([^'"]+)['"]/i);
  if (dataEmbedMatch) return dataEmbedMatch[1].trim();

  // Check iframe url path
  const iframeMatch = cleaned.match(/sociablekit\.com\/[^/]+\/iframe\/([a-zA-Z0-9_-]+)/i);
  if (iframeMatch) return iframeMatch[1].trim();

  // Check plain alphanumeric ID
  const plainMatch = cleaned.match(/^[a-zA-Z0-9_-]+$/);
  if (plainMatch) return plainMatch[0];

  return cleaned;
}

export default function SociableKitInstagramFeed({
  defaultWidgetId = "",
  fallbackGrid,
  className = ""
}) {
  const [widgetId, setWidgetId] = useState(() => {
    if (typeof window === "undefined") return "";
    return (
      defaultWidgetId ||
      import.meta.env.VITE_SOCIABLEKIT_WIDGET_ID ||
      localStorage.getItem("sociablekit_widget_id") ||
      ""
    );
  });

  const [inputVal, setInputVal] = useState(widgetId);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [useIframe, setUseIframe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const containerRef = useRef(null);

  // Dynamically load SociableKIT widget script when in script mode and widgetId is active
  useEffect(() => {
    if (!widgetId || useIframe) return;

    const scriptSrc = "https://widgets.sociablekit.com/instagram-feed/widget.js";
    let script = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      // Re-initialize if already injected
      try {
        if (window.SociableKIT && typeof window.SociableKIT.init === "function") {
          window.SociableKIT.init();
        }
      } catch {}
    }
  }, [widgetId, useIframe]);

  const handleSaveWidget = (e) => {
    if (e) e.preventDefault();
    playGhungrooChime();
    setIsLoading(true);
    setStatusMsg("");

    const extracted = extractSociableKitId(inputVal);
    if (extracted) {
      localStorage.setItem("sociablekit_widget_id", extracted);
      setWidgetId(extracted);
      setStatusMsg("SociableKIT Widget connected! Loading live Instagram feed...");
      setTimeout(() => {
        setIsLoading(false);
        setIsConfigOpen(false);
      }, 800);
    } else {
      localStorage.removeItem("sociablekit_widget_id");
      setWidgetId("");
      setIsLoading(false);
      setStatusMsg("SociableKIT ID cleared. Displaying verified classical archive.");
    }
  };

  const handleClear = () => {
    playGhungrooChime();
    setInputVal("");
    localStorage.removeItem("sociablekit_widget_id");
    setWidgetId("");
    setStatusMsg("Cleared SociableKIT Widget.");
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SociableKIT Control & Status Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#1E1B1B] border border-[#B99A63]/30 text-xs">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${widgetId ? "bg-emerald-400 animate-pulse" : "bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"}`} />
          <span className="font-semibold text-slate-200">
            {widgetId ? (
              <>
                SociableKIT Feed: <strong className="text-[#D4AF37]">Active (ID: {widgetId})</strong>
              </>
            ) : (
              <>
                Instagram Engine: <strong className="text-slate-300">SociableKIT Ready</strong>
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {widgetId && (
            <button
              onClick={() => setUseIframe(!useIframe)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[11px] cursor-pointer transition-colors"
              title="Toggle between SociableKIT Iframe and Script Embed mode"
            >
              Mode: {useIframe ? "Iframe Embed" : "Script Embed"}
            </button>
          )}

          <button
            onClick={() => {
              playGhungrooChime();
              setIsConfigOpen(!isConfigOpen);
            }}
            className="px-3.5 py-1.5 rounded-full bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer tap-bounce"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{widgetId ? "Change SociableKIT ID" : "Configure SociableKIT"}</span>
          </button>
        </div>
      </div>

      {/* Configuration Drawer / Modal */}
      {isConfigOpen && (
        <div className="p-6 rounded-3xl bg-[#1c1c1c] border border-[#B99A63]/50 shadow-2xl space-y-4 animate-silk-fan text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B99A63]" />
              <h4 className="text-sm sm:text-base font-bold font-serif-luxury text-[#F5F0E8]">
                Connect SociableKIT Instagram Feed
              </h4>
            </div>
            <button
              onClick={() => setIsConfigOpen(false)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            SociableKIT automates syncing Instagram posts and reels for <strong>@dancingragasbymalavika</strong> without Meta token expiration issues.
          </p>

          <form onSubmit={handleSaveWidget} className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
              SociableKIT Widget ID or Embed Code
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. 25512345 or paste <div class='sk-ww-instagram-feed'..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#151515] border border-[#B99A63]/40 text-xs text-[#F5F0E8] placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-[#B99A63] hover:bg-[#cca86d] text-[#151515] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer tap-bounce shrink-0 disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Connect Feed</span>
              </button>
              {widgetId && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-[#B99A63]" />
              <span>
                Don&apos;t have a widget yet? Create a free Instagram feed widget at{" "}
                <a
                  href="https://www.sociablekit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] underline font-semibold"
                >
                  SociableKIT.com
                </a>{" "}
                linking <em>@dancingragasbymalavika</em> and paste the embed ID here.
              </span>
            </div>
          </form>

          {statusMsg && (
            <div className="p-3 rounded-xl bg-[#151515] border border-white/10 text-xs text-[#D4AF37]">
              {statusMsg}
            </div>
          )}
        </div>
      )}

      {/* SociableKIT Active Embed View */}
      {widgetId ? (
        <div ref={containerRef} className="rounded-3xl overflow-hidden border border-[#B99A63]/30 bg-[#151515] p-2 min-h-[500px]">
          {useIframe ? (
            <iframe
              src={`https://widgets.sociablekit.com/instagram-feed/iframe/${widgetId}`}
              title="Dr. Malavika Sunil Instagram Feed by SociableKIT"
              frameBorder="0"
              width="100%"
              height="800"
              className="w-full rounded-2xl min-h-[600px] border-0"
              loading="lazy"
            />
          ) : (
            <div className="sk-ww-instagram-feed" data-embed-id={widgetId} />
          )}
        </div>
      ) : (
        /* Fallback Curated View with SociableKIT Link Pill */
        <div>
          {fallbackGrid}
        </div>
      )}
    </div>
  );
}
