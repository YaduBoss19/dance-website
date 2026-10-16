import React, { useState, useRef, useEffect } from "react";
import { Volume2, Music } from "lucide-react";

/**
 * Native Web Audio API Tanpura & Shruti Drone Synthesizer.
 * Creates an authentic, gentle, meditative Indian classical drone (Sa - Pa - Sa')
 * with zero external MP3 assets, meaning 100% offline reliability.
 */
export default function TanpuraSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);

  // Frequencies for C# (typical classical Indian concert pitch, Sa = 138.59 Hz)
  const baseFreq = 138.59;
  const notes = [
    { freq: baseFreq * 1.5, name: "Pa (Fifth)", detune: -4 },
    { freq: baseFreq * 2.0, name: "Sa (Higher Octave)", detune: 2 },
    { freq: baseFreq * 2.0, name: "Sa (Middle)", detune: -2 },
    { freq: baseFreq, name: "Kharaj Sa (Root)", detune: 0 }
  ];

  const stopDrone = () => {
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
  };

  const startDrone = () => {
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

      // Filter to simulate the rich wooden acoustic body of the Tanpura
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);
      filter.connect(masterGain);

      oscillatorsRef.current = [];

      notes.forEach((note, idx) => {
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
    } catch (e) {
      console.warn("Web Audio autoplay prevented or not supported", e);
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  useEffect(() => {
    return () => {
      stopDrone();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40">
      <button
        onClick={toggleSound}
        className={`group flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer tap-bounce ${
          isPlaying
            ? "bg-slate-950/95 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-105"
            : "bg-white/95 border-amber-300/60 text-slate-700 hover:border-amber-400 hover:text-amber-800"
        }`}
        title="Experience Indian Classical Tanpura & Raga Shruti Drone"
        aria-label="Toggle Tanpura soundscape"
      >
        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-gradient-to-tr from-amber-500 to-rose-600 text-white animate-pulse"
              : "bg-amber-100 text-amber-700 group-hover:scale-105"
          }`}
        >
          {isPlaying ? <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
        </div>

        <div className="text-left text-[10px] sm:text-[11px] leading-tight pr-1">
          <p className="font-bold flex items-center gap-1">
            <span>Tanpura Drone</span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
            )}
          </p>
          <p className={`text-[8px] sm:text-[9px] ${isPlaying ? "text-amber-300/80" : "text-slate-500"}`}>
            {isPlaying ? "Classical Shruti Active" : "Tap for Sound"}
          </p>
        </div>
      </button>
    </div>
  );
}
