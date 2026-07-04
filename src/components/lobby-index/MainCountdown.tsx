import React from 'react';
import { motion } from 'motion/react';
import CornerAccents from './CornerAccents';

interface MainCountdownProps {
  timeInSeconds: number;
}

export default function MainCountdown({ timeInSeconds }: MainCountdownProps) {
  // Format seconds to DD, HH, MM, SS
  const days = Math.floor(timeInSeconds / (3600 * 24));
  const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  const formattedDays = formatNum(days);
  const formattedHours = formatNum(hours);
  const formattedMinutes = formatNum(minutes);
  const formattedSeconds = formatNum(seconds);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-fit mx-auto my-auto flex flex-col border-4 border-black bg-surface-container-low shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative p-[10px] overflow-hidden"
      id="main-countdown-container"
    >
      {/* Corner Accents */}
      <CornerAccents size="w-4 h-4" borderColor="border-black" />

      {/* Countdown Area with tight 10px padding and zero extra header/footer */}
      <div className="flex flex-col items-center justify-center relative">
        {/* Technical Sub-label with snug 33px margin bottom */}
        <div className="relative z-10 w-full text-center mb-[33px]">
          <h2 className="font-label text-black text-sm md:text-xl font-bold uppercase tracking-[0.4em] inline-block relative px-4">
            [countdown to play time]
            <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-black"></span>
          </h2>
        </div>

        {/* The Monolith Timer - Static, non-interactive layout */}
        <div className="relative z-10 flex items-center justify-center gap-2 md:gap-4 font-label font-black text-5xl sm:text-6xl md:text-[8rem] lg:text-[9rem] leading-none text-black tracking-tighter mb-[33px]">
          {/* Day Card */}
          <div className="flex flex-col items-center bg-[#e5e2db] p-3 md:p-5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span
              className="tabular-nums font-black select-all"
              id="timer-days"
            >
              {formattedDays}
            </span>
            <span className="text-xs md:text-lg font-bold tracking-[0.2em] mt-2 bg-black text-surface w-full text-center py-1 px-3 font-label">
              DAY
            </span>
          </div>

          {/* Blinking Colon 0 */}
          <div className="animate-pulse pb-8 md:pb-12 text-black font-bold">
            :
          </div>

          {/* Hours Card */}
          <div className="flex flex-col items-center bg-[#e5e2db] p-3 md:p-5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span
              className="tabular-nums font-black select-all"
              id="timer-hours"
            >
              {formattedHours}
            </span>
            <span className="text-xs md:text-lg font-bold tracking-[0.2em] mt-2 bg-black text-surface w-full text-center py-1 px-3 font-label">
              HRS
            </span>
          </div>

          {/* Blinking Colon 1 */}
          <div className="animate-pulse pb-8 md:pb-12 text-black font-bold">
            :
          </div>

          {/* Minutes Card */}
          <div className="flex flex-col items-center bg-[#e5e2db] p-3 md:p-5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span
              className="tabular-nums font-black select-all"
              id="timer-minutes"
            >
              {formattedMinutes}
            </span>
            <span className="text-xs md:text-lg font-bold tracking-[0.2em] mt-2 bg-black text-surface w-full text-center py-1 px-3 font-label">
              MIN
            </span>
          </div>

          {/* Blinking Colon 2 */}
          <div className="animate-pulse pb-8 md:pb-12 text-black font-bold">
            :
          </div>

          {/* Seconds Card */}
          <div className="flex flex-col items-center bg-[#e5e2db] p-3 md:p-5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span
              className="tabular-nums font-black select-all"
              id="timer-seconds"
            >
              {formattedSeconds}
            </span>
            <span className="text-xs md:text-lg font-bold tracking-[0.2em] mt-2 bg-black text-surface w-full text-center py-1 px-3 font-label">
              SEC
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
