import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Watch } from '../types';
import { getHexagonPatternDataUrl } from '../utils/hexagonPatterns';
import { getMasterDb } from '../dbStore';

interface WatchSectionProps {
  key?: string;
  watch: Watch;
  index: number;
  onDiscover: (watch: Watch) => void;
  onOpenFigure: (watch: Watch) => void;
}

export default function WatchSection({
  watch,
  index,
  onDiscover,
  onOpenFigure,
}: WatchSectionProps) {
  const isTootScute = watch.id === 'toot-and-scute-unusual-simulation-service';
  const isBlessed = watch.id === 'blessed-and-the-bounded';
  const isDisabled = watch.disabled === true;
  const alignRight = isTootScute || (isBlessed && isDisabled);
  const patternUrl = getHexagonPatternDataUrl(watch, index);

  return (
    <section
      id={watch.id}
      onClick={() => {
        if (!isDisabled) {
          onDiscover(watch);
        }
      }}
      className={`relative w-full border-b-4 border-primary bg-surface overflow-hidden transition-all duration-300 ${
        isDisabled
          ? 'opacity-55 cursor-not-allowed bg-surface-container-low/60 sepia-[20%] grayscale-[30%]'
          : 'group cursor-pointer hover:bg-surface-container-low/40'
      }`}
    >
      {/* Blueprint Grid Overlay with unique pattern per card */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        style={{
          backgroundImage: `url("${patternUrl}")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Narrative Panel - Full Width with beautiful custom padding */}
      <div className="w-full max-w-5xl mx-auto px-8 md:px-24 py-8 md:py-14 z-10 flex flex-col justify-center relative items-start text-left">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="bg-[#8a752b] text-white inline-block px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] w-fit border-2 border-black font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {watch.ref}
          </div>
          {isDisabled && (
            <span className="bg-red-600 text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 border-2 border-red-600 flex items-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>COOLDOWN OFFLINE // ACCESS DEACTIVATED</span>
            </span>
          )}
        </div>

        <h2
          className={`font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 ${
            isDisabled
              ? 'text-primary/70 line-through decoration-red-600/40 decoration-[6px]'
              : 'text-primary'
          }`}
        >
          {watch.name}
        </h2>

        <p className="font-body text-xl md:text-2xl text-primary max-w-2xl mb-10 leading-snug bg-white/70 border border-black/30 p-4 md:p-5 shadow-sm">
          {watch.tagline}
        </p>

        <div
          className={`font-label uppercase text-sm tracking-widest px-8 py-4 w-fit border-2 transition-all duration-300 flex items-center space-x-2 font-bold select-none shrink-0 ${
            alignRight ? 'self-end' : 'self-start'
          } ${
            isDisabled
              ? 'bg-neutral-300 text-neutral-500 border-neutral-400 cursor-not-allowed'
              : 'bg-primary text-surface border-[#8a752b]/70 group-hover:pl-10 group-hover:pr-6'
          }`}
        >
          <span>
            {isDisabled
              ? 'INDEX RESTRICTED'
              : getMasterDb()?.meta?.btnDiscoverMoreLabel || 'DISCOVER MORE'}
          </span>
          {!isDisabled && <ChevronRight size={16} className="text-[#8a752b]" />}
        </div>

        {/* Figure Label Tag inside the narrative block */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenFigure(watch);
          }}
          className={`absolute bottom-6 md:bottom-12 bg-surface border-2 border-[#8a752b]/70 hover:bg-[#8a752b] hover:text-white transition-all duration-300 p-3 font-mono text-xs font-bold shadow-md z-20 tracking-widest cursor-pointer ${
            alignRight ? 'left-6 md:left-12' : 'right-6 md:right-12'
          }`}
          aria-label={`Open large image of ${watch.figNum}`}
        >
          {watch.figNum}
        </button>
      </div>
    </section>
  );
}
