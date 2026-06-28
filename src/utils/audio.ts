// Browser Web Audio API sound generator for tactile feedback.
// Safe to import anywhere, checks for browser environment.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function playBeep(
  frequency = 800,
  duration = 0.08,
  type: OscillatorType = 'sine',
  volume = 0.1,
) {
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === 'suspended') return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    // Smooth release
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + duration,
    );

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silence errors in unsupported environments
    console.warn('Audio feedback failed:', e);
  }
}

export function playClick() {
  playBeep(1200, 0.03, 'triangle', 0.15);
}

export function playSuccess() {
  const ctx = getAudioContext();
  if (!ctx) return;
  playBeep(600, 0.1, 'sine', 0.1);
  setTimeout(() => playBeep(800, 0.1, 'sine', 0.1), 100);
  setTimeout(() => playBeep(1200, 0.2, 'sine', 0.15), 200);
}

export function playDenied() {
  playBeep(220, 0.15, 'sawtooth', 0.12);
  setTimeout(() => playBeep(180, 0.2, 'sawtooth', 0.15), 150);
}

export function playAlarm() {
  playBeep(440, 0.2, 'square', 0.08);
  setTimeout(() => playBeep(330, 0.2, 'square', 0.08), 250);
}
