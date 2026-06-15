import React from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

interface PlaySoloProps {
  playClack: () => void;
  data?: {
    title?: string;
    heading?: string;
    paragraphs?: string[];
    bulletHeading?: string;
    bulletItems?: string[];
    note?: string;
  };
}

export function PlaySolo({ playClack, data }: PlaySoloProps) {
  const title = data?.title || 'Play Solo';
  const heading =
    data?.heading || 'Explore the joys of roleplaying by yourself.';
  const paragraphs = data?.paragraphs || [
    'Roleplaying is traditionally played with a group of people. However, these days solo roleplaying is increasingly popular. Maybe you want to experience a game inbetween regular sessions with your friends. Or maybe you do not have the opportunity to participate in group games at all.',
    "Either way, solo roleplaying can be a rewarding and uniquely creative way to experience tabletop roleplaying games. We offer solo modules for several of our games that make it easier than ever to get started playing right away. It's also a great way to learn the rules by your own by actually playing them.",
  ];
  const bulletHeading =
    data?.bulletHeading ||
    'Currently we offer solo modules for the following games:';
  const bulletItems = data?.bulletItems || [
    'Dragonbane (included in the Core Boxed Set)',
    'The Walking Dead Universe (included in the Core Rulebook)',
    'Twilight: 2000 (included in the Core Boxed Set)',
    'The One Ring™ (available as a digital PDF from DrivethruRPG)',
    'Vaesen – Nordic Horror Roleplaying (available as a digital PDF from DrivethruRPG)',
    'Forbidden Lands (available in The Book of Beasts)',
  ];
  const note =
    data?.note ||
    'Please note that you need to have access to the base game itself in those cases where the solo rules are offered separately.';

  return (
    <section
      id="play-solo"
      className="scroll-mt-36 bg-[#1C1C1C] text-[#F9F6EE] border-4 border-obsidian shadow-[6px_6px_0px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* Hero Header Banner */}
      <div className="relative h-44 sm:h-52 bg-stone-900 overflow-hidden border-b-4 border-obsidian">
        {/* Grayscale moody equestrian sketch representation overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60 grayscale filter contrast-110 transition-transform duration-700 hover:scale-[1.03]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
          }}
        ></div>

        {/* Dark warm vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

        {/* Title */}
        <div className="absolute bottom-6 left-6 md:left-10 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-bone leading-none tracking-tight font-black"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {/* Path Breadcrumb Bar */}
      <div className="bg-[#111111] px-6 py-2.5 border-b border-obsidian text-[10px] font-mono-ui tracking-widest text-[#D32F2F] font-bold">
        START / {title.toUpperCase()}
      </div>

      {/* Split Layout content */}
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column - Documentation reading */}
        <div className="md:col-span-7 space-y-6 text-left">
          <div className="space-y-4">
            <h3 className="font-serif-display text-3.5xl sm:text-4xl text-bone tracking-tight leading-tight">
              {heading}
            </h3>
            <div className="w-16 h-1.5 bg-[#D32F2F]"></div>
          </div>

          <div className="space-y-4 text-sm text-[#E4DFD3]/85 font-serif-body leading-relaxed font-normal normal-case">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <p className="font-bold text-[#F9F6EE] pt-2">{bulletHeading}</p>
          </div>

          {/* List layout of Solo modules available */}
          <ul className="space-y-2.5 pl-2 text-xs sm:text-sm text-[#E4DFD3]/85 font-serif-body leading-relaxed font-normal normal-case">
            {bulletItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#D32F2F] mt-1.5 shrink-0">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-bone/15 mt-4 text-xs text-[#E4DFD3]/65 font-serif-body italic normal-case">
            {note}
          </div>
        </div>

        {/* Right Column - Non-interactive custom visual cards strictly derived from the screenshot */}
        <div className="md:col-span-5 space-y-4">
          {/* Card: Dragonbane Solo YouTube style card */}
          <div className="space-y-2 text-left">
            <div className="bg-black border-4 border-obsidian shadow-[5px_5px_0px_rgba(0,0,0,1)] relative aspect-[21/10] sm:aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 bg-[#281c1c]">
                {/* Simulated Thumbnail */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 grayscale filter brightness-75 contrast-115"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')`,
                  }}
                ></div>

                {/* Top Nav details */}
                <div className="p-2.5 flex items-center justify-between z-10 w-full absolute top-0 bg-gradient-to-b from-black/90 to-transparent">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-6 h-6 rounded-full bg-[#E57373] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-black font-sans text-white">
                        DB
                      </span>
                    </div>
                    <span className="font-sans text-[11px] font-bold text-white truncate w-64">
                      Dragonbane Solo: Alone in Deepfall
                    </span>
                  </div>
                </div>

                {/* Simulated Red Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-9 bg-[#D32F2F] rounded-lg flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 text-white fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom specs */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center text-[9px] font-mono-ui font-semibold text-white/70">
                  <span>Me, Myself and Die!</span>
                  <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 uppercase">
                    Watch on YouTube
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left mt-2">
            <p className="font-archive text-sm font-semibold tracking-wide text-bone uppercase">
              Dragonbane Solo Gameplay Overview
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
