import React, { useState, useEffect } from 'react';
import { ArrowUp, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { getMasterDb } from '../dbStore';

export default function Footer() {
  const [latency, setLatency] = useState(24);

  // Dispatcher function that dispatches a CustomEvent and opens the new URL
  const handleCampCandorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const dbData = getMasterDb();
    const targetUrl =
      dbData?.meta?.campUrl ||
      dbData?.meta?.targetUrl ||
      'https://campcandor.com';

    // 1. Dispatch custom DOM event
    const customEvent = new CustomEvent('open_external_url', {
      detail: {
        url: targetUrl,
        source: 'CAMP_CANDOR_SYSTEMS_FOOTER',
        timestamp: new Date().toISOString(),
      },
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(customEvent);

    // 2. Open new URL in a new window/tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Dynamic ping updates for the live terminal indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = prev + delta;
        return next > 12 && next < 45 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(
      'THE CHRONO-RAID PROTOCOL // RAID GEAR RULES\n\n' +
        '1. All calibration logs are saved locally to your client storage.\n' +
        '2. Device verification certificates are cryptographically locked under guild vault Node 0x82A.',
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-white/20 w-full z-40 mt-auto font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Origin Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <button
            onClick={handleCampCandorClick}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/20 active:scale-95 px-3 py-1 border border-[#8a752b]/50 hover:border-[#8a752b] font-bold tracking-wider text-[11px] uppercase text-white shadow-[0_0_8px_rgba(138,117,43,0.15)] cursor-pointer transition-all group"
            title="Open CAMP CANDOR SYSTEMS website"
          >
            <Terminal
              size={14}
              className="text-[#8a752b] group-hover:scale-110 transition-transform"
            />
            <span>CAMP CANDOR SYSTEMS</span>
          </button>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-[11px] text-white/70 tracking-widest uppercase font-mono">
            PRINTED IN THE KINGDOM OF MANOR
          </span>
        </div>

        {/* Live System Diagnostics & Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] tracking-wider uppercase">
          {/* Status Badge */}
          <div className="flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-3 py-1 font-mono font-bold tracking-widest">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>STATUS: ONLINE</span>
          </div>

          {/* Latency */}
          <div className="hidden sm:flex items-center space-x-1.5 text-white/70">
            <Activity size={12} className="text-white/50" />
            <span>LATENCY: {latency}MS</span>
          </div>

          {/* Node */}
          <div className="hidden md:flex items-center space-x-1.5 text-white/70">
            <ShieldCheck size={12} className="text-white/50" />
            <span>NODE: 0X82A</span>
          </div>

          {/* Privacy Link */}
          <a
            href="#privacy"
            onClick={handlePrivacyClick}
            className="text-white/80 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors cursor-pointer"
          >
            PRIVACY PROTOCOL
          </a>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 bg-white/10 hover:bg-white hover:text-black border border-white/30 px-3 py-1 transition-all duration-200 cursor-pointer font-bold tracking-wider"
            title="Return to top of page"
          >
            <span>TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
