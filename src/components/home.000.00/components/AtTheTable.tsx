import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, Share2 } from 'lucide-react';

interface AtTheTableProps {
  playClack: () => void;
  data?: {
    title?: string;
    heading?: string;
    paragraphs?: string[];
    subSections?: Array<{ title: string; description: string }>;
  };
}

export function AtTheTable({ playClack, data }: AtTheTableProps) {
  const title = data?.title || 'At the Table';
  const heading =
    data?.heading || 'Gather a group of friends at your gaming table.';
  const paragraphs = data?.paragraphs || [
    'Roleplaying games are traditionally played with a group of friends at a table (which is why its often called TTRPG or tabletop roleplaying games). Since the dawn of the hobby in the early 1970s, this has been the default way of experiencing the magic of roleplaying games around the world.',
    'If you have some friends that are interested in RPGs and a nice location to play, great! You have everything you need to start playing. But there are other venues where you can find players and games, such as gaming conventions and game stores. As roleplaying is an intrinsically social hobby, its often a great way to make new friends. Here are some suggestions to get started.',
  ];
  const subSections = data?.subSections || [
    {
      title: 'EVENTS',
      description:
        'There are tabletop gaming events hosted all round the world on a regular basis. Check your local listing and see what is available in your area. Gen Con in the USA, Essen Spiel in Germany and UK Games Expo in the UK are three big ones that we recommend that you seek out if you have the opportunity.',
    },
    {
      title: 'GAME STORES',
      description:
        "Another way to find a gaming table is to seek out a local gaming store and see if they have any slots open. It's a great way to try out something new and make new friends to boot.",
    },
    {
      title: 'SOCIAL MEDIA',
      description:
        'If you want to set up a local group by yourself, or join one, a good place to start are the many social media channels and online forums dedicated to Free League games.',
    },
    {
      title: 'BECOME A FREE AGENT',
      description:
        'Why not try to organize a game yourself? Our program for organized play at conventions and game stores is called the League of Free Agents and offer support and compensation for Gamesmasters running Free League games in public venues. Read more here.',
    },
  ];

  return (
    <section
      id="at-the-table"
      className="scroll-mt-36 bg-[#1C1C1C] text-[#F9F6EE] border-4 border-obsidian shadow-[6px_6px_0px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* Hero Banner header matching the style of the first screenshot */}
      <div className="relative h-44 sm:h-52 bg-slate-900 overflow-hidden border-b-4 border-obsidian">
        {/* Grayscale moody background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60 grayscale filter contrast-125 transition-transform duration-700 hover:scale-[1.03]"
          style={{
            backgroundImage: `url('/img/011.png')`,
          }}
        ></div>

        {/* Subtle red tint overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

        {/* Superimposed big title */}
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

      {/* Main Split-Grid Content */}
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column - Descriptive Reading */}
        <div className="md:col-span-7 space-y-8 text-left">
          <div className="space-y-4">
            <h3 className="font-serif-display text-3.5xl sm:text-4xl text-bone tracking-tight leading-tight">
              {heading}
            </h3>
            <div className="w-16 h-1.5 bg-[#D32F2F]"></div>
          </div>

          <div className="space-y-5 text-sm text-[#E4DFD3]/85 font-serif-body leading-relaxed font-normal normal-case">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Core Guidelines Subsections */}
          <div className="space-y-8 pt-6 border-t border-bone/15">
            {subSections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-archive text-base text-bone uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D32F2F] inline-block"></span>
                  {sec.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#E4DFD3]/85 font-serif-body leading-relaxed normal-case">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Media Interactive Zone (Non-interactive styled youtube player) */}
        <div className="md:col-span-5 space-y-4">
          {/* YouTube style frame (Completely non-interactive, as requested) */}
          <div className="bg-black border-4 border-obsidian shadow-[6px_6px_0px_rgba(0,0,0,1)] relative aspect-[16/10] overflow-hidden group">
            <div className="absolute inset-0 bg-[#252528] flex flex-col justify-between">
              {/* Thumbnail */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity brightness-95"
                style={{
                  backgroundImage: `url('/img/000.png')`,
                }}
              ></div>

              {/* YouTube video navigation overlay */}
              <div className="p-3 flex items-center justify-between z-10 w-full bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-800 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="font-mono-ui text-[10px] font-black text-white">
                      FL
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="block font-sans text-xs font-bold text-white truncate leading-tight w-48 sm:w-64 max-w-full">
                      Introduction to tabletop roleplaying games
                    </span>
                    <span className="block font-mono-ui text-[9px] text-gray-300 leading-none mt-0.5">
                      Free League Publishing
                    </span>
                  </div>
                </div>
                <div className="text-white opacity-80 shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
              </div>

              {/* Red play emblem */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-11 bg-[#D32F2F] rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#FF0000]">
                  <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Bottom footer bar */}
              <div className="p-3 z-10 w-full flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent text-left">
                <div className="text-white/80 text-[10px] font-mono-ui font-semibold">
                  Ellinor DiLorenzo
                </div>
                <div className="bg-black/75 text-white py-1 px-2 border border-white/25 text-[9px] rounded uppercase font-bold flex items-center gap-1">
                  Watch on YouTube{' '}
                  <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left mt-2">
            <p className="font-archive text-sm font-semibold tracking-wide text-bone uppercase">
              Check out Ellinor’s introduction to RPGs!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
