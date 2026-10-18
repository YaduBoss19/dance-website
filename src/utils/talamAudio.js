// Web Audio API Synthesized Ghungroo (Brass Ankle Bell) & Talam Sound Generator
// Generates authentic acoustic brass bell resonance with zero external MP3 assets

let audioCtx = null;
let soundEnabled = false;

export const toggleTalamSound = (enable) => {
  if (typeof enable === "boolean") {
    soundEnabled = enable;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
};

export const isTalamSoundEnabled = () => soundEnabled;

export const playGhungrooChime = () => {
  // Silent by default per user preference
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtx || audioCtx.state === "closed") {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Brass bells have dual high-pitch metallic resonant spikes (2800Hz & 3700Hz)
    const bellFrequencies = [2850, 3620, 4400];

    bellFrequencies.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 40, now);

      // High-Q bandpass for metallic ring
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(18, now);

      // Rapid initial attack, gentle metallic shimmer decay
      const peakVol = 0.025 / (idx + 1);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(peakVol, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28 + idx * 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    });
  } catch {
    // Graceful fallback if audio context is blocked
  }
};
