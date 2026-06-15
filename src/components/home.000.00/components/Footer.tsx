import React from 'react';
import { User, Users, Video } from 'lucide-react';

interface FooterProps {
  playClack: () => void;
}

export function Footer({ playClack }: FooterProps) {
  return (
    <footer className="w-full bg-[#111] text-[#E4DFD3] border-t-4 border-obsidian relative mt-auto overflow-hidden">
      {/* Background hexagon grids for brutalist tactical atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '14px 24.5px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Logomark + Brand Typography */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Free League Mandala Vector */}
            <div className="w-10 h-10 bg-[#E4DFD3] text-[#111] rounded-full flex items-center justify-center p-1.5 shadow">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-none stroke-current"
                strokeWidth="6"
              >
                <circle cx="50" cy="50" r="42" />
                <circle cx="50" cy="50" r="28" strokeDasharray="10 10" />
                <path d="M50 8 C50 8, 25 35, 50 50 C75 35, 50 8, 50 8 Z" />
                <path
                  d="M50 92 C50 92, 25 65, 50 50 C75 65, 50 92, 50 92 Z"
                  strokeWidth="5"
                />
                <path
                  d="M8 50 C8 50, 35 25, 50 50 C35 75, 8 50, 8 50 Z"
                  strokeWidth="5"
                />
                <path
                  d="M92 50 C92 50, 65 25, 50 50 C65 75, 92 50, 92 50 Z"
                  strokeWidth="5"
                />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-archive text-2xl tracking-[0.05em] text-[#E4DFD3]">
                CAMP CANDOR
              </span>
              <span className="font-mono-ui text-[7px] leading-[1.2] text-[#E4DFD3]/60 max-w-[200px] break-words">
                Massive Multi-Player Online Role Play Gaming Inspirational
                Technology COM.
              </span>
            </div>
          </div>
          <p className="font-serif-body text-[13px] text-[#E4DFD3]/80 leading-relaxed max-w-xs italic mb-4">
            Creator of immersive, award-winning tabletop roleplaying games and
            books set in wondrous, deep-lore worlds.
          </p>

          {/* Social Media Link Icon Grid (Image 3 section) */}
          <div className="flex gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              onClick={playClack}
              className="w-10 h-10 bg-[#222] border border-[#E4DFD3]/15 hover:border-[#D32F2F] hover:bg-[#D32F2F]/10 focus:outline-none flex items-center justify-center transition-colors text-bone"
              title="Instagram"
            >
              <User className="w-5 h-5 text-[#E4DFD3]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              onClick={playClack}
              className="w-10 h-10 bg-[#222] border border-[#E4DFD3]/15 hover:border-[#D32F2F] hover:bg-[#D32F2F]/10 focus:outline-none flex items-center justify-center transition-colors text-bone"
              title="Facebook"
            >
              <Users className="w-5 h-5 text-[#E4DFD3]" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              onClick={playClack}
              className="w-10 h-10 bg-[#222] border border-[#E4DFD3]/15 hover:border-[#D32F2F] hover:bg-[#D32F2F]/10 focus:outline-none flex items-center justify-center transition-colors text-bone"
              title="YouTube"
            >
              <Video className="w-5 h-5 text-[#E4DFD3]" />
            </a>
          </div>
        </div>

        {/* Central Columns: Newsletter Form and Support directories */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-end">
          <div className="grid grid-cols-2 gap-6 md:gap-12 border-t border-[#E4DFD3]/10 pt-6">
            {/* Column A: Social Media Directory List */}
            <div>
              <h5 className="font-archive text-xs tracking-wider text-[#D4AF37] mb-3 uppercase">
                SOCIAL MEDIA
              </h5>
              <div className="flex flex-col gap-2 font-mono-ui text-[11px] uppercase tracking-wide">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  X (formerly Twitter)
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>

            {/* Column B: Support Directory List */}
            <div>
              <h5 className="font-archive text-xs tracking-wider text-[#D4AF37] mb-3 uppercase">
                SUPPORT
              </h5>
              <div className="flex flex-col gap-2 font-mono-ui text-[11px] uppercase tracking-wide">
                <a
                  href="#faq"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  FAQ & Contact
                </a>
                <a
                  href="#shipping"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  Shipping Rates
                </a>
                <a
                  href="#returns"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  Returns & Refunds
                </a>
                <a
                  href="#privacy"
                  onClick={playClack}
                  className="text-[#E4DFD3]/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative original quote: "To play is to bleed. To bleed is to author the lore." — THE METATRON ARCHIVIST */}
      <div className="border-t border-[#E4DFD3]/10 bg-black/60 py-6 text-center px-4">
        <blockquote className="font-serif-body text-xs text-[#E4DFD3]/60 italic max-w-lg mx-auto">
          "To play is to bleed. To bleed is to author the lore."
          <span className="font-mono-ui text-[9px] text-[#D32F2F] mt-1 block uppercase">
            — THE METATRON ARCHIVIST, PROTOCOL 1970
          </span>
        </blockquote>
      </div>

      {/* Copyright Ticker Ribbon */}
      <div className="w-full bg-obsidian py-3 px-6 border-t border-[#E4DFD3]/10 flex flex-col md:flex-row justify-between items-center text-center gap-2">
        <span className="font-mono-ui text-[9px] text-[#E4DFD3]/40 tracking-widest uppercase">
          &copy; 1970 - 2026 CAMP CANDOR Massive Multi-Player Online Role
          Playing Gaming Inspirational Technology / ALLIGATOR INK. ALL RIGHTS
          RESERVED.
        </span>
        <div className="font-mono-ui text-[9px] text-[#D32F2F] tracking-widest flex items-center justify-center gap-2 font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse"></span>
          HEATBEAT SIGNAL: 10HZ
        </div>
      </div>
    </footer>
  );
}
