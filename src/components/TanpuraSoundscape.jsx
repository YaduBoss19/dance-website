import React, { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, Music, Bell, BellOff } from "lucide-react";
import GamakaWaveform from "./GamakaWaveform";
import { playGhungrooChime, toggleTalamSound, isTalamSoundEnabled } from "../utils/talamAudio";

/**
 * Native Web Audio API Tanpura & Shruti Drone Synthesizer with Gamaka Waveform.
 * Synthesizes an authentic Indian classical drone (Sa - Pa - Sa')
 * with real-time Carnatic Gamaka harmonic oscillations.
 */

// Frequencies for C# (typical classical Indian concert pitch, Sa = 138.59 Hz)
const BASE_FREQ = 138.59;
const TANPURA_NOTES = [
  { freq: BASE_FREQ * 1.5, name: "Pa (Fifth)", detune: -4 },
  { freq: BASE_FREQ * 2.0, name: "Sa' (Higher Octave)", detune: 2 },
  { freq: BASE_FREQ * 2.0, name: "Sa (Middle)", detune: -2 },
  { freq: BASE_FREQ, name: "Kharaj Sa (Root)", detune: 0 }
];

export default function TanpuraSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bellsActive, setBellsActive] = useState(isTalamSoundEnabled());

  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);

  const stopDrone = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        oscillatorsRef.current = [];
        setIsPlaying(false);
      }, 850);
    } else {
      setIsPlaying(false);
    }
  }, []);

  const startDrone = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioContext();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 1.2); // Gentle, subtle volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Filter simulating rich acoustic gourd body
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);
      filter.connect(masterGain);

      oscillatorsRef.current = [];

      TANPURA_NOTES.forEach((note, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Sawtooth + Sine blended harmonics for rich Tanpura jawari buzz
        osc.type = idx === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime);
        osc.detune.setValueAtTime(note.detune, ctx.currentTime);

        // LFO for rhythmic plucking strumming effect
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.25 + idx * 0.12, ctx.currentTime); // Slow undulating cycles
        lfoGain.gain.setValueAtTime(0.35, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(noteGain.gain);

        noteGain.gain.setValueAtTime(0.25, ctx.currentTime);
        osc.connect(filter);

        osc.start();
        lfo.start();
        oscillatorsRef.current.push(osc, lfo);
      });

      setIsPlaying(true);
      playGhungrooChime();
    } catch (e) {
      console.warn("Web Audio autoplay prevented or not supported", e);
      setIsPlaying(false);
    }
  }, []);

  const toggleSound = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  const handleToggleBells = (e) => {
    e.stopPropagation();
    const newState = toggleTalamSound();
    setBellsActive(newState);
    if (newState) {
      playGhungrooChime();
    }
  };

  useEffect(() => {
    const handleStartEvent = () => {
      if (!isPlaying) {
        startDrone();
      }
    };
    window.addEventListener("start-tanpura-drone", handleStartEvent);

    return () => {
      window.removeEventListener("start-tanpura-drone", handleStartEvent);
      stopDrone();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, [isPlaying, startDrone, stopDrone]);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {/* Expanded Gamaka Harmonic Visualizer Modal / Panel */}
      {isExpanded && (
        <div className="w-[calc(100vw-2rem)] max-w-xs sm:w-80 p-4 rounded-2xl bg-[#151515]/95 border border-[#B99A63]/50 shadow-2xl backdrop-blur-xl text-left space-y-3 animate-silk-fan">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B99A63] animate-ping" />
              <span className="text-xs font-bold text-[#F5F0E8] font-serif-luxury tracking-wide">
                Carnatic Gamaka Oscillations
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#A9A49D] hover:text-white text-xs p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] text-slate-300 leading-snug">
            Real-time sine-wave visualization of the 4 sacred Tanpura strings tuned to <strong>C# (138.6 Hz)</strong>.
          </p>

          <div className="rounded-xl bg-black/60 p-2.5 border border-[#B99A63]/30">
            <GamakaWaveform isPlaying={isPlaying} height={60} />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#B99A63] pt-1 border-t border-white/10">
            <span>Jawari Buzz: Pure Acoustic</span>
            <button
              onClick={handleToggleBells}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#3B0B14] hover:bg-[#4A0E17] text-[#D4AF37] border border-[#B99A63]/40 cursor-pointer"
            >
              {bellsActive ? <Bell className="w-3 h-3 text-[#D4AF37]" /> : <BellOff className="w-3 h-3 text-slate-400" />}
              <span>{bellsActive ? "Ghungroo Audio: ON" : "Ghungroo: Muted"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Controller Button with Shruti Breathing Pulse */}
      <div className="relative">
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-[#B99A63]/30 blur-md pointer-events-none shruti-pulse-active" />
        )}
        <button
          onClick={toggleSound}
          className={`w-12 h-12 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer tap-bounce flex items-center justify-center relative group ${
            isPlaying
              ? "bg-[#3B0B14] border-[#B99A63] text-[#D4AF37] shadow-[0_0_20px_rgba(185,154,99,0.5)] scale-105"
              : "bg-[#151515] border-[#B99A63]/50 text-[#B99A63] hover:text-[#D4AF37] hover:border-[#D4AF37] hover:scale-110"
          }`}
          title={isPlaying ? "Tanpura Classical Drone Active (Click to Mute)" : "Play Indian Classical Tanpura Drone"}
          aria-label={isPlaying ? "Mute Tanpura Drone" : "Play Tanpura Drone"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          ) : (
            <Music className="w-5 h-5 text-[#B99A63] group-hover:scale-110 transition-transform" />
          )}
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#B99A63] border-2 border-[#151515] animate-ping" />
          )}
        </button>
      </div>
    </div>
  );
}
