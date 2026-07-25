import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';

interface CountdownClockProps {
  initialDays?: number;
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  titleLabel?: string;
  onIncreaseRunTime?: () => void;
  isButton?: boolean;
}

export default function CountdownClock({
  initialDays = 0,
  initialHours = 0,
  initialMinutes = 3,
  initialSeconds = 33,
  titleLabel = '[ INCREASE RUN TIME ]',
  onIncreaseRunTime,
  isButton = true,
}: CountdownClockProps) {
  const [addedSeconds, setAddedSeconds] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: String(initialDays).padStart(2, '0'),
    hours: String(initialHours).padStart(2, '0'),
    minutes: String(initialMinutes).padStart(2, '0'),
    seconds: String(initialSeconds).padStart(2, '0'),
  });

  // Sound generator on clicking button
  const playChimeSound = () => {
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Ignore audio policy issues
    }
  };

  useEffect(() => {
    // Calculate target timestamp based on initial offset + added seconds
    const totalSeconds =
      initialDays * 86400 +
      initialHours * 3600 +
      initialMinutes * 60 +
      initialSeconds +
      addedSeconds;

    const targetTime = Date.now() + totalSeconds * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((targetTime - now) / 1000));

      const d = Math.floor(remaining / 86400);
      const h = Math.floor((remaining % 86400) / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [initialDays, initialHours, initialMinutes, initialSeconds, addedSeconds]);

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedSeconds((prev) => prev + 900); // Add 15 minutes
    playChimeSound();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    if (onIncreaseRunTime) {
      onIncreaseRunTime();
    }
  };

  const formattedLabel = titleLabel.trim().startsWith('[')
    ? titleLabel
    : `[ ${titleLabel} ]`;

  return (
    <div className="w-full flex flex-col items-center justify-center py-1 my-1 select-none relative">
      {/* Toast notification badge on time increase */}
      {showToast && (
        <div className="absolute -top-3 z-30 bg-emerald-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow-md animate-bounce">
          +15 MINS RUN TIME ADDED!
        </div>
      )}

      {/* Clock display grid - FULL WIDTH */}
      <div className="w-full flex items-center justify-between gap-1 sm:gap-2">
        {/* DAY */}
        <div className="flex-1 flex flex-col items-center justify-between border border-primary dark:border-white shadow-[1px_1px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_rgba(255,255,255,1)] bg-[#e8e4d8] dark:bg-zinc-800 h-12 sm:h-14 overflow-hidden">
          <div className="flex-1 flex items-center justify-center font-mono font-black text-lg sm:text-xl tracking-tight text-primary dark:text-white pt-0.5">
            {timeLeft.days}
          </div>
          <div className="w-full bg-primary dark:bg-white text-background-light dark:text-background-dark font-mono text-[7px] sm:text-[8px] font-black uppercase py-0.5 text-center tracking-wider border-t border-primary dark:border-white">
            DAY
          </div>
        </div>

        {/* Colon */}
        <div className="shrink-0 flex flex-col gap-0.5 sm:gap-1 justify-center px-0.5">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary dark:bg-white" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary dark:bg-white" />
        </div>

        {/* HRS */}
        <div className="flex-1 flex flex-col items-center justify-between border border-primary dark:border-white shadow-[1px_1px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_rgba(255,255,255,1)] bg-[#e8e4d8] dark:bg-zinc-800 h-12 sm:h-14 overflow-hidden">
          <div className="flex-1 flex items-center justify-center font-mono font-black text-lg sm:text-xl tracking-tight text-primary dark:text-white pt-0.5">
            {timeLeft.hours}
          </div>
          <div className="w-full bg-primary dark:bg-white text-background-light dark:text-background-dark font-mono text-[7px] sm:text-[8px] font-black uppercase py-0.5 text-center tracking-wider border-t border-primary dark:border-white">
            HRS
          </div>
        </div>

        {/* Colon */}
        <div className="shrink-0 flex flex-col gap-0.5 sm:gap-1 justify-center px-0.5">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary dark:bg-white" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary dark:bg-white" />
        </div>

        {/* MIN */}
        <div className="flex-1 flex flex-col items-center justify-between border border-primary dark:border-white shadow-[1px_1px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_rgba(255,255,255,1)] bg-[#e8e4d8] dark:bg-zinc-800 h-12 sm:h-14 overflow-hidden">
          <div className="flex-1 flex items-center justify-center font-mono font-black text-lg sm:text-xl tracking-tight text-primary dark:text-white pt-0.5">
            {timeLeft.minutes}
          </div>
          <div className="w-full bg-primary dark:bg-white text-background-light dark:text-background-dark font-mono text-[7px] sm:text-[8px] font-black uppercase py-0.5 text-center tracking-wider border-t border-primary dark:border-white">
            MIN
          </div>
        </div>

        {/* Colon */}
        <div className="shrink-0 flex flex-col gap-0.5 sm:gap-1 justify-center px-0.5">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary dark:bg-white" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary dark:bg-white" />
        </div>

        {/* SEC */}
        <div className="flex-1 flex flex-col items-center justify-between border border-primary dark:border-white shadow-[1px_1px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_rgba(255,255,255,1)] bg-[#e8e4d8] dark:bg-zinc-800 h-12 sm:h-14 overflow-hidden">
          <div className="flex-1 flex items-center justify-center font-mono font-black text-lg sm:text-xl tracking-tight text-primary dark:text-white pt-0.5">
            {timeLeft.seconds}
          </div>
          <div className="w-full bg-primary dark:bg-white text-background-light dark:text-background-dark font-mono text-[7px] sm:text-[8px] font-black uppercase py-0.5 text-center tracking-wider border-t border-primary dark:border-white">
            SEC
          </div>
        </div>
      </div>

      {/* Button or Label placed UNDERNEATH timer */}
      <div className="w-full border-t border-primary/80 dark:border-white/80 pt-1.5 mt-2 flex justify-center">
        {isButton ? (
          <button
            type="button"
            onClick={handleIncrease}
            className="w-full py-1.5 px-2 border-2 border-primary dark:border-white bg-background-light dark:bg-zinc-800 hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary dark:text-white transition-all duration-150 cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_rgba(255,255,255,1)] active:translate-x-[1px] active:translate-y-[1px] z-20 flex items-center justify-center gap-1.5 group/timebtn"
            title="Click to increase countdown run time (+15 mins)"
          >
            <PlusCircle className="w-3 h-3 text-primary dark:text-white group-hover/timebtn:text-background-light dark:group-hover/timebtn:text-background-dark transition-colors shrink-0" />
            <span>{formattedLabel}</span>
          </button>
        ) : (
          <div className="w-full py-1.5 px-2 border-2 border-primary dark:border-white bg-black dark:bg-zinc-950 text-[#e8e4d8] dark:text-zinc-100 text-center font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shadow-[1px_1px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_rgba(255,255,255,1)] opacity-40">
            <span>{formattedLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
