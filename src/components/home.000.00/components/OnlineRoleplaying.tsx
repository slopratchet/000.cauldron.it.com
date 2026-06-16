import React from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Play,
  Share2,
  Compass,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

interface OnlineRoleplayingProps {
  playClack: () => void;
  data?: {
    title?: string;
    heading?: string;
    description?: string;
  };
}

export function OnlineRoleplaying({ playClack, data }: OnlineRoleplayingProps) {
  const title = data?.title || 'Online Roleplaying';
  const heading =
    data?.heading || 'Play with online friends without leaving your home.';
  const description =
    data?.description ||
    "It can seem daunting to take your cozy, analogue tabletop roleplaying game that you have experienced around a table with friends face to face into an online, digital format. But these days it really is easier than ever before! Can't gather a group of physical friends together? Online virtual tabletop servers, digital sheets, and audio-connected video channels make group campaigns spectacular. Play with anyone, anywhere!";

  return (
    <section
      id="online-roleplaying"
      className="scroll-mt-36 bg-[#1C1C1C] text-[#F9F6EE] border-4 border-obsidian shadow-[6px_6px_0px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* Hero Header Banner */}
      <div className="relative h-44 sm:h-52 bg-slate-900 overflow-hidden border-b-4 border-obsidian">
        {/* Grayscale tech-forward sci-fi tabletop grid visual overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60 grayscale filter contrast-125 transition-transform duration-700 hover:scale-[1.03]"
          style={{
            backgroundImage: `url('/img/006.png')`,
          }}
        ></div>

        {/* Dark vignette gradient overlay */}
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
        <div className="md:col-span-7 space-y-8 text-left">
          <div className="space-y-4">
            <h3 className="font-serif-display text-3.5xl sm:text-4xl text-bone tracking-tight leading-tight">
              {heading}
            </h3>
            <div className="w-16 h-1.5 bg-[#D32F2F]"></div>
            <p className="text-[#E4DFD3]/85 font-serif-body text-sm leading-relaxed normal-case pr-4">
              {description}
            </p>
          </div>

          {/* Guidelines list */}
          <div className="space-y-8 pt-6 border-t border-bone/15">
            {/* FINDING PLAYERS */}
            <div className="space-y-2">
              <h4 className="font-archive text-base text-bone uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#D32F2F] inline-block"></span>
                FINDING PLAYERS
              </h4>
              <p className="text-xs sm:text-sm text-[#E4DFD3]/80 font-serif-body leading-relaxed normal-case">
                Playing online can be a great way to keep a regular game going
                with friends of you can&apos;t meet physically – but it&apos;s
                also a great way to meet new players! If you are looking for a
                group, there are platforms dedicated to finding other players,
                such as{' '}
                <span className="text-[#D4AF37] font-bold underline cursor-pointer">
                  StartPlaying
                </span>
                .
              </p>
            </div>

            {/* PLAYING ONLINE */}
            <div className="space-y-2">
              <h4 className="font-archive text-base text-bone uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#D32F2F] inline-block"></span>
                PLAYING ONLINE
              </h4>
              <p className="text-xs sm:text-sm text-[#E4DFD3]/80 font-serif-body leading-relaxed normal-case">
                There are many tools available to make the transition as smooth
                as possible and the actual play experience as close to real life
                meeting as possible. You might not even need anything more than
                a video call and perhaps a shared space to doodle in.
              </p>
              <p className="text-xs sm:text-sm text-[#E4DFD3]/80 font-serif-body leading-relaxed normal-case">
                However, if you feel like you would like some more tools at your
                fingertips, there are a number of virtual tabletop platforms
                (VTTs) available for you to explore. All of them come with
                tutorials to teach you the ins and outs.
              </p>
            </div>

            {/* VIRTUAL TABLETOP PLATFORMS */}
            <div className="space-y-2">
              <h4 className="font-archive text-base text-bone uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#D32F2F] inline-block"></span>
                VIRTUAL TABLETOP PLATFORMS
              </h4>
              <p className="text-xs sm:text-sm text-[#E4DFD3]/80 font-serif-body leading-relaxed normal-case">
                However, if you feel like you would like some more tools at your
                fingertips, there are a number of virtual tabletop platforms
                (VTTs) available for you to explore. All of them come with
                tutorials to teach you the ins and outs. What you need to get
                started is a stable broadband connection, a decent computer and
                mic and speakers (or a headset).
              </p>
            </div>

            {/* FREE LEAGUE VTT MODULES */}
            <div className="space-y-2">
              <h4 className="font-archive text-base text-bone uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#D32F2F] inline-block"></span>
                FREE LEAGUE VTT MODULES
              </h4>
              <p className="text-xs sm:text-sm text-[#E4DFD3]/80 font-serif-body leading-relaxed normal-case">
                Many Free League titles are available as VTT modules, with all
                of the contents already adapted for the virtual tabletop and
                ready to use – either via the VTT marketplace or, in the case of
                Foundry, right here in our own{' '}
                <span className="text-[#D4AF37] font-bold underline cursor-pointer">
                  webshop
                </span>
                .
              </p>
            </div>

            {/* FOUNDRY (Static accordion representation) */}
            <div className="border border-bone/20 p-4 bg-[#111111]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-archive text-sm text-bone tracking-wider uppercase font-bold">
                  FOUNDRY VTT ENGINE SUPPORT
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-bone/60" />
            </div>
          </div>
        </div>

        {/* Right Column - Non-interactive custom visual cards strictly derived from the screenshot */}
        <div className="md:col-span-5 space-y-6">
          {/* Card 1: StartPlaying Banner */}
          <div className="bg-[#1A2639] border-4 border-obsidian p-4 text-left shadow-[4px_4px_0px_rgba(0,0,0,1)] flex justify-between items-center relative overflow-hidden group">
            <div className="space-y-1 z-10">
              <h4 className="font-archive text-base text-white tracking-wide font-black">
                StartPlaying
              </h4>
              <p className="font-serif-body text-[10px] text-gray-300 normal-case leading-tight font-normal">
                Tabletop RPGs Run by Professional Game Masters
              </p>
              <div className="pt-2">
                <span className="bg-[#00D2FF] text-slate-950 font-mono-ui text-[9px] font-bold py-1 px-3.5 uppercase tracking-widest inline-block border border-black/20">
                  Find game &gt;
                </span>
              </div>
            </div>

            {/* Visual background splash */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/3 bg-cover bg-center brightness-50 opacity-40 grayscale"
              style={{
                backgroundImage: `url('/img/011.png')`,
              }}
            ></div>
          </div>

          {/* Card 2: Foundry VTT video card */}
          <div className="space-y-1.5 text-left">
            <div className="bg-black border-4 border-obsidian shadow-[4px_4px_0px_rgba(0,0,0,1)] relative aspect-[21/10] overflow-hidden">
              <div className="absolute inset-0 bg-[#1D1B26]">
                {/* Simulated Thumbnail */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 grayscale filter brightness-75 contrasts-110"
                  style={{
                    backgroundImage: `url('/img/001.png')`,
                  }}
                ></div>

                {/* Top Nav details */}
                <div className="p-2 flex items-center justify-between z-10 w-full absolute top-0 bg-gradient-to-b from-black/90 to-transparent">
                  <div className="flex items-center gap-1.5 w-full">
                    <div className="w-5 h-5 rounded-full bg-[#E57373] flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-black font-sans text-white">
                        FD
                      </span>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-white truncate w-56">
                      Foundry Virtual Tabletop - 2023 Overview
                    </span>
                  </div>
                </div>

                {/* Simulated Red Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 text-white fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom specs */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[8px] font-mono-ui font-semibold text-white/70">
                  <span>Foundry Virtual Tabletop</span>
                  <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/10 uppercase">
                    Watch on YouTube
                  </span>
                </div>
              </div>
            </div>
            <p className="font-archive text-xs font-bold tracking-wider text-bone/90 uppercase">
              Overview of Foundry VTT
            </p>
          </div>

          {/* Card 3: Free League Nexus video card */}
          <div className="space-y-1.5 text-left">
            <div className="bg-black border-4 border-obsidian shadow-[4px_4px_0px_rgba(0,0,0,1)] relative aspect-[21/10] overflow-hidden">
              <div className="absolute inset-0 bg-[#0E1726]">
                {/* Simulated Thumbnail */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 grayscale filter brightness-75 contrast-115"
                  style={{
                    backgroundImage: `url('/img/009.png')`,
                  }}
                ></div>

                {/* Top Nav details */}
                <div className="p-2 flex items-center justify-between z-10 w-full absolute top-0 bg-gradient-to-b from-black/90 to-transparent">
                  <div className="flex items-center gap-1.5 w-full">
                    <div className="w-5 h-5 rounded-full bg-[#4FC3F7] flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-black font-sans text-white">
                        DP
                      </span>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-white truncate w-56">
                      Free League Nexus Announcement Trailer
                    </span>
                  </div>
                </div>

                {/* Simulated Red Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 text-white fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom specs */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[8px] font-mono-ui font-semibold text-white/70">
                  <span>Demiplane</span>
                  <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/10 uppercase">
                    Watch on YouTube
                  </span>
                </div>
              </div>
            </div>
            <p className="font-archive text-xs font-bold tracking-wider text-bone/90 uppercase">
              Demiplane Free League Nexus Announcement Trailer
            </p>
          </div>

          {/* Card 4: Alchemy Devlog video card */}
          <div className="space-y-1.5 text-left">
            <div className="bg-black border-4 border-obsidian shadow-[4px_4px_0px_rgba(0,0,0,1)] relative aspect-[21/10] overflow-hidden">
              <div className="absolute inset-0 bg-[#2C1D21]">
                {/* Simulated Thumbnail */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 grayscale filter brightness-75 contrast-110"
                  style={{
                    backgroundImage: `url('/img/000.png')`,
                  }}
                ></div>

                {/* Top Nav details */}
                <div className="p-2 flex items-center justify-between z-10 w-full absolute top-0 bg-gradient-to-b from-black/90 to-transparent">
                  <div className="flex items-center gap-1.5 w-full">
                    <div className="w-5 h-5 rounded-full bg-[#AED581] flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-black font-sans text-white">
                        AC
                      </span>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-white truncate w-56">
                      Alchemy Devlog - Episode 23: Vaesen RPG
                    </span>
                  </div>
                </div>

                {/* Simulated Red Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 text-white fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom specs */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[8px] font-mono-ui font-semibold text-white/70">
                  <span>Alchemy RPG</span>
                  <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/10 uppercase">
                    Watch on YouTube
                  </span>
                </div>
              </div>
            </div>
            <p className="font-archive text-xs font-bold tracking-wider text-bone/90 uppercase">
              Alchemy Devlog – Vaesen RPG System Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
