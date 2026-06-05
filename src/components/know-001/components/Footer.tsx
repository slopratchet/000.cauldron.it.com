/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Hammer, Compass, Eye } from 'lucide-react';

export default function Footer() {
  const [currentUtc, setCurrentUtc] = useState('2026-06-04 16:45:19 UTC');

  useEffect(() => {
    // Keep a simulated chronological timer in perfect vintage format
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentUtc(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black text-[#848484] border-t-4 border-black py-4 font-mono text-2xs md:text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left select-none">
        {/* Left Side System Copyright */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Terminal className="h-4.5 w-4.5 text-[#D97706] animate-pulse" />
          <span className="text-parchment font-bold">
            THE TOME © 1974 - 1979 CHRONOS SYSTEMS
          </span>
          <span className="text-neutral-600">|</span>
          <span>REGISTERED USER:</span>
          <span className="text-parchment font-bold underline decoration-[#D97706]">
            ADMIN_elliot
          </span>
        </div>

        {/* Center Indicators */}
        <div className="hidden lg:flex items-center gap-4 text-center">
          <div className="flex items-center gap-1 bg-[#1b1b1b] px-2 py-0.5 border border-neutral-800">
            <Shield className="h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500 text-[10px] font-bold">
              CORE_INTEG: 100%
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#1b1b1b] px-2 py-0.5 border border-neutral-800">
            <Compass className="h-3 w-3 text-amber-500" />
            <span className="text-amber-500 text-[10px] font-bold">
              REGION: COLD RUN
            </span>
          </div>
          <div className="text-[11px] text-neutral-400">{currentUtc}</div>
        </div>

        {/* Right Side Stats */}
        <div className="flex items-center gap-3">
          <span className="text-[#D97706] font-bold">PAGE 112 OF 666</span>
          <span className="text-neutral-600">|</span>
          <span className="hover:text-parchment cursor-pointer uppercase transition-colors flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> LEGAL LORE
          </span>
        </div>
      </div>
    </footer>
  );
}
