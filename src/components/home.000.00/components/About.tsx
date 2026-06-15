import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Compass, Award, Trophy, Users } from 'lucide-react';

interface AboutProps {
  playClack: () => void;
  data?: {
    title?: string;
    subtitle?: string;
    paragraphs?: string[];
  };
}

export function About({ playClack, data }: AboutProps) {
  const title = data?.title || 'About Camp Candor';
  const subtitle = data?.subtitle || 'OUR MISSION & ORIGINS / AT THE CORE';
  const paragraphs = data?.paragraphs || [
    'Welcome to Camp Candor, creator of tabletop games and books set in wondrous, literary-rich worlds.',
    'You can meet us at conventions, festivals, and industry gatherings, to discover our games, meet the people behind them, and experience our worlds firsthand.',
    'From demos and previews to talks and tournaments, our presence at events is about sharing stories, connecting with players, and celebrating roleplaying wherever it thrives.',
    'Check back here to see where we’re heading next.',
  ];

  return (
    <section
      id="about"
      className="scroll-mt-36 bg-[#EBDCB9]/40 border-4 border-obsidian p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] text-left space-y-10 relative overflow-hidden"
    >
      {/* Decorative architectural layout element */}
      <div className="absolute top-0 right-0 w-32 h-32 border-l-2 border-b-2 border-dashed border-obsidian/10 pointer-events-none"></div>

      {/* Header Title with Subtext */}
      <div className="border-b-2 border-obsidian/20 pb-4">
        <span className="font-mono-ui text-[10px] text-[#D32F2F] tracking-widest block uppercase font-bold">
          {subtitle}
        </span>
        <h3 className="font-serif-display text-4.5xl text-obsidian capitalize mt-1 font-black">
          {title}
        </h3>
      </div>

      {/* Main Split Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left column: Brand Ethos Statement */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h4 className="font-serif-display text-2xl sm:text-3xl text-obsidian/95 leading-tight font-medium">
              {paragraphs[0]}
            </h4>
            <div className="w-16 h-1 bg-[#D32F2F]"></div>
          </div>

          <div className="font-serif-body text-[15px] sm:text-[16px] text-obsidian/85 leading-relaxed space-y-4 normal-case">
            {paragraphs.slice(1).map((p, idx) => (
              <p
                key={idx}
                className={
                  idx === paragraphs.length - 2
                    ? 'italic font-medium text-obsidian/75'
                    : ''
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right column: Value Pillars Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Pillar 1: Literary Richness */}
          <div className="bg-white border-2 border-obsidian p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.85)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.85)] hover:-translate-y-0.5 transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2 border border-obsidian/25 bg-[#EBDCB9] rounded shrink-0">
                <BookOpen className="w-5 h-5 text-obsidian" />
              </div>
              <div className="space-y-1">
                <h5 className="font-archive text-xs uppercase tracking-wider text-obsidian">
                  LITERARY WORLD BUILDING
                </h5>
                <p className="font-serif-body text-[11px] text-obsidian/75 leading-relaxed normal-case">
                  We draft deep histories, maps, and lore lines designed with
                  prose weight and intellectual gravity.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 2: Peerless Design */}
          <div className="bg-white border-2 border-obsidian p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.85)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.85)] hover:-translate-y-0.5 transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2 border border-obsidian/25 bg-[#EBDCB9] rounded shrink-0">
                <Compass className="w-5 h-5 text-obsidian" />
              </div>
              <div className="space-y-1">
                <h5 className="font-archive text-xs uppercase tracking-wider text-obsidian">
                  INTEGRATED ECOSYSTEMS
                </h5>
                <p className="font-serif-body text-[11px] text-obsidian/75 leading-relaxed normal-case">
                  Providing elegant physical manuals, interactive digital
                  interfaces, and robust solo modules.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 3: Inclusive Assembly */}
          <div className="bg-white border-2 border-obsidian p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.85)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.85)] hover:-translate-y-0.5 transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2 border border-obsidian/25 bg-[#EBDCB9] rounded shrink-0">
                <Users className="w-5 h-5 text-obsidian" />
              </div>
              <div className="space-y-1">
                <h5 className="font-archive text-xs uppercase tracking-wider text-obsidian">
                  OPEN PLAYFRONT COVENANT
                </h5>
                <p className="font-serif-body text-[11px] text-obsidian/75 leading-relaxed normal-case">
                  Supporting creators, local stores, and inclusive tabletop
                  sessions globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
