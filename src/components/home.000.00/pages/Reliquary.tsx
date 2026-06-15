import React, { useState } from 'react';
import {
  ShieldAlert,
  BookOpen,
  Clock,
  BarChart3,
  Map,
  CheckCircle,
  Crosshair,
} from 'lucide-react';

interface ReliquaryProps {
  playClack: () => void;
}

export function Reliquary({ playClack }: ReliquaryProps) {
  // Navigation for ticket stubs activation
  const [activeStub, setActiveStub] = useState<'atrium' | 'chamber' | null>(
    'atrium',
  );

  // Tactical coordinate grid selector states
  const [selectedCoord, setSelectedCoord] = useState({ row: 'G', col: 12 });
  const [coordDetails, setCoordDetails] = useState({
    threatLevel: 'TACTICAL INFILTRATION VECTOR',
    spec: 'Sector representing primary operations for the Ashen Pilgrimage active crucible. Ground sensors indicate high bone-ash density, with local spell-burn decay registered at 10Hz frequency.',
    clearance: 'VIP EXTRACTION COVENANT',
  });

  const coordLookup: Record<
    string,
    Record<number, { threat: string; spec: string; clearance: string }>
  > = {
    G: {
      12: {
        threat: 'TACTICAL INFILTRATION VECTOR',
        spec: 'Sector representing primary operations for the Ashen Pilgrimage active crucible. Ground sensors indicate high bone-ash density, with local spell-burn decay registered at 10Hz frequency.',
        clearance: 'VIP EXTRACTION COVENANT',
      },
      8: {
        threat: 'RUSTED SPIRE DEEPMINE',
        spec: 'Flooded elevator shaft leading down to the original 1970 boiler core. Low-frequency feedback registered. Do not approach without eye-shields.',
        clearance: 'LEVEL-04 SECURED Only',
      },
    },
    D: {
      4: {
        threat: 'GILDED CRYPT FLANK',
        spec: 'Subterranean mausoleum sector. Contains the skeletal resting grounds for the Module 01 paladins. Bone dust registers anomalous positive resonance.',
        clearance: 'TACTICAL GLOVES REQUIRED',
      },
    },
    B: {
      9: {
        threat: 'CRUCIBLE OBSERVATION BOX',
        spec: 'God-Cam voyeur vantage point. Hosts high-strength audience receivers to transmit sabotage votes to the edge servers. Visual feeds are active.',
        clearance: 'GENERAL ADMISSION PASS',
      },
    },
  };

  const handleSelectCoord = (row: string, col: number) => {
    playClack();
    setSelectedCoord({ row, col });

    // Check if we have pre-defined telemetry specs
    if (coordLookup[row] && coordLookup[row][col]) {
      setCoordDetails(coordLookup[row][col]);
    } else {
      // Procedural generation of telemetry details for other boxes
      const threatLevels = [
        'PATROL CORRIDOR',
        'EDGE RUNNER GRID',
        'SKELETAL GRAVE COLD',
        'CORRUPTED MEMORY BLANK',
      ];
      const specs = [
        'Routine auxiliary sector. Scanning logs report minimal particulate activity with standard server latency.',
        'Anomalous electrical hum registered on local terminal loop. Safe zones have been systematically decommissioned.',
        'Low-frequency radiation signals floating on node frequencies. Standard-issue safety protocols recommend immediate bypass.',
        'Rusted support structures. Edge gears are locked to prevent accidental server cage collapses. Proceed with caution.',
      ];
      const clearances = [
        'STANDARD COVENANT',
        'VOYEUR PASS ONLY',
        'SECURE CLEARANCE LEVEL-02',
        'RESTRICTED SECTOR',
      ];

      const seed = (row.charCodeAt(0) + col) % 4;
      setCoordDetails({
        threatLevel: threatLevels[seed],
        spec: specs[seed],
        clearance: clearances[seed],
      });
    }
  };

  return (
    <main className="min-h-screen pb-20 bg-[#222222] text-[#E4DFD3] relative transition-all duration-300">
      {/* Decorative hexagon tile map backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div
          className="absolute inset-x-0 inset-y-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '14px 24.5px',
            transform: 'scaleY(1.3)',
          }}
        />
      </div>

      {/* Primary Dossier Frame (Beige/Parchment style) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 mt-6">
        {/* CASE FILE OVERVIEW MODULE */}
        <section className="bg-[#E4DFD3] text-obsidian border-4 border-obsidian p-6 md:p-10 mb-12 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] relative">
          {/* Top-Right Seal Box */}
          <div className="absolute top-6 right-6 w-12 h-12 border-2 border-obsidian hidden sm:flex items-center justify-center p-2 bg-white/40 shadow-inner">
            <ShieldAlert className="w-full h-full text-[#D32F2F]" />
          </div>

          <h1 className="font-archive text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.85] text-obsidian tracking-tighter uppercase mb-4">
            THE RELIQUARY
            <br />
            ARCHIVE
          </h1>

          <div className="font-mono-ui text-[10px] md:text-xs uppercase tracking-widest border-b-2 border-obsidian pb-2.5 mb-8 flex flex-wrap gap-4 font-bold text-obsidian/70">
            <span>CASE FILE: 70-PROD-ALPHA</span>
            <span className="hidden sm:inline">|</span>
            <span>ARCHIVE STATUS: SECURE</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-[#D32F2F] animate-pulse">
              ✓ VERIFIED BY ALLIGATOR INK
            </span>
          </div>

          {/* Operations Theater Imagery Block */}
          <div className="border-4 border-obsidian w-full relative mb-8 overflow-hidden bg-charcoal shadow-inner">
            <div className="absolute top-4 left-4 bg-[#E4DFD3] text-obsidian px-3 py-1 font-mono-ui text-[10px] font-bold uppercase z-10 border-2 border-obsidian shadow">
              REFERENCE LOGS: CORE PERFORMANCE SITE
            </div>
            <img
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Immersive Operations Theater"
              className="w-full h-[320px] object-cover mix-blend-luminosity opacity-75 scale-102 hover:scale-105 duration-700 transition-transform"
            />
          </div>

          {/* Two-Column Site Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b-2 border-obsidian pb-6 text-left">
            <div className="border-t-2 border-obsidian pt-3 space-y-2">
              <h4 className="font-archive text-xl tracking-wide mb-1 uppercase text-obsidian flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D32F2F]" />
                SITE PROTOCOL
              </h4>
              <p className="font-serif-body text-[13px] md:text-sm leading-relaxed text-obsidian/90 font-medium">
                All performances documented herein were subject to 1970 standard
                tabletop safety regulations. Note the target seat designations
                on the coordinate cartography grid below for VIP extraction
                protocols.
              </p>
            </div>
            <div className="border-t-2 border-obsidian pt-3 space-y-2">
              <h4 className="font-archive text-xl tracking-wide mb-1 uppercase text-obsidian flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#D32F2F]" />
                ARCHIVE INTEGRITY
              </h4>
              <p className="font-serif-body text-[13px] md:text-sm italic leading-relaxed text-obsidian/80 font-medium">
                Ink bleed and edge fraying are inherent to the aging process of
                the ledger. Handle with tactical latex gloves only. Do not
                attempt to decompile local rule matrices without direct server
                sync.
              </p>
            </div>
          </div>
        </section>

        {/* BRUTALIST TABULAR LEGACY STATS PANEL */}
        <section className="bg-charcoal text-bone border-4 border-obsidian p-6 md:p-8 mb-12 shadow-[8px_8px_0px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-4 mb-6 border-b border-bone/20 pb-3">
            <div className="w-10 h-10 border border-bone/35 flex items-center justify-center p-2.5 bg-black">
              <BarChart3 className="w-full h-full text-[#D4AF37]" />
            </div>
            <h2 className="font-archive text-3xl tracking-wider uppercase text-bone">
              LEGACY STATS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono-ui text-xs tracking-wider uppercase text-left">
            <div className="bg-black/40 p-4 border border-bone/10 relative">
              <span className="text-[9px] text-bone/50 block">
                TOTAL SHOWS RECORDED
              </span>
              <span className="font-archive text-3xl font-bold text-bone block mt-1">
                428
              </span>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#D32F2F] rounded-full animate-pulse"></div>
            </div>
            <div className="bg-black/40 p-4 border border-bone/10">
              <span className="text-[9px] text-bone/50 block">
                COVENANT TICKETS BOUND
              </span>
              <span className="font-archive text-3xl font-bold text-bone block mt-1">
                12,490
              </span>
            </div>
            <div className="bg-black/40 p-4 border border-[#D4AF37]/30">
              <span className="text-[9px] text-[#D4AF37] block font-bold">
                OPERATIONAL EFFICIENCY
              </span>
              <span className="font-archive text-3xl font-bold text-[#D4AF37] block mt-1">
                98.2%
              </span>
            </div>
          </div>
        </section>

        {/* CARTOGRAPHY GRID COMPONENT (A highly requested tactical map addition) */}
        <section className="bg-[#E4DFD3] text-obsidian border-4 border-obsidian p-5 md:p-8 mb-12 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] text-left space-y-6">
          <div className="border-b-2 border-obsidian pb-2 flex justify-between items-center bg-white/20 p-2 border">
            <h3 className="font-archive text-2xl uppercase flex items-center gap-1.5">
              <Map className="w-5 h-5 text-[#D32F2F]" />
              COORDINATE CARTOGRAPHY GRID
            </h3>
            <span className="font-mono-ui text-[8px] bg-obsidian text-bone px-1.5 py-0.5">
              MAP_MATRIX.EXE
            </span>
          </div>

          <p className="font-serif-body text-xs text-obsidian/85 max-w-xl font-medium">
            Select grid nodes within the theater diagram below to query
            real-time sector logs, threat telemetry, and deployment coordinates:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* The 8x8 Grid Selector */}
            <div className="md:col-span-7 bg-[#111] p-4 border-2 border-obsidian shadow-inner flex flex-col items-center">
              <div className="font-mono-ui text-[9px] text-bone/50 tracking-widest uppercase mb-2">
                COVENANT THEATER DEPLOYMENT PLAN
              </div>

              <div className="grid grid-cols-9 gap-1 font-mono-ui text-[10px] text-bone/80 font-bold max-w-[320px] w-full">
                {/* Empty corner helper */}
                <div className="w-6 h-6 flex items-center justify-center text-bone/30"></div>
                {/* Columns label indices */}
                {[2, 4, 6, 8, 10, 12, 14, 16].map((c) => (
                  <div
                    key={c}
                    className="w-6 h-6 flex items-center justify-center text-bone/45 text-[8px]"
                  >
                    {c}
                  </div>
                ))}

                {/* Rows Grid */}
                {['A', 'B', 'D', 'E', 'F', 'G', 'H', 'J'].map((r) => (
                  <React.Fragment key={r}>
                    {/* Row label */}
                    <div className="w-6 h-6 flex items-center justify-center text-bone/45 text-[8px]">
                      {r}
                    </div>
                    {[2, 4, 6, 8, 10, 12, 14, 16].map((c) => {
                      const isSelected =
                        selectedCoord.row === r && selectedCoord.col === c;
                      const hasPreset = coordLookup[r] && coordLookup[r][c];

                      return (
                        <button
                          key={c}
                          onClick={() => handleSelectCoord(r, c)}
                          className={`w-6 h-6 border transition-colors flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#D32F2F] text-bone border-bone font-extrabold shadow animate-pulse'
                              : hasPreset
                                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                                : 'bg-black text-bone hover:bg-zinc-800 border-zinc-800'
                          }`}
                          title={`Sector ${r}-${c}`}
                        >
                          {isSelected ? <Crosshair className="w-3 h-3" /> : '•'}
                        </button>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Readout stats box on the right */}
            <div className="md:col-span-5 border-2 border-obsidian bg-white p-4 font-mono-ui text-xs space-y-3.5 self-stretch flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-gray-500 uppercase block font-bold">
                  SECTOR READOUT TELEMETRY:
                </span>
                <p className="font-archive text-xl text-[#D32F2F] border-b border-gray-200 pb-1 mt-0.5">
                  SECTOR {selectedCoord.row}-{selectedCoord.col}
                </p>
                <div className="pt-2 text-[10px] space-y-1">
                  <span className="font-extrabold uppercase text-gray-700 block bg-[#E4DFD3]/50 px-1 py-0.5 border">
                    THREAT: {coordDetails.threatLevel}
                  </span>
                  <p className="text-gray-500 pt-1 leading-relaxed font-normal text-justify">
                    {coordDetails.spec}
                  </p>
                </div>
              </div>

              <div className="bg-[#111] text-bone p-2 text-[9px] border flex justify-between font-bold">
                <span>SECURITY CLEARANCE</span>
                <span className="text-[#D4AF37]">{coordDetails.clearance}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="flex justify-center items-center my-10 relative isolate">
          <div className="absolute w-full h-1 bg-[#444] z-0" />
          <div className="bg-[#222222] px-4 z-10">
            <h3 className="font-archive text-2xl text-[#E4DFD3] bg-[#333] border-4 border-obsidian px-6 py-2 shadow-md uppercase tracking-wider">
              THE ARCHIVE MODULES
            </h3>
          </div>
        </div>

        {/* PAST EVENT REGISTRY STUBS (IMAGE 3 - GILDED ATRIUM, SHADOW CHAMBER) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-obsidian">
          {/* Card 1: Gilded Atrium */}
          <article
            onClick={() => {
              playClack();
              setActiveStub('atrium');
            }}
            className={`bg-[#E4DFD3] border-4 border-obsidian p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] flex flex-col hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.85)] transition-all cursor-pointer text-left ${activeStub === 'atrium' ? 'ring-4 ring-[#D4AF37] border-obsidian' : ''}`}
          >
            <div className="flex justify-between items-start border-b-2 border-obsidian pb-1.5 mb-4 font-mono-ui text-xs font-bold uppercase">
              <span className="bg-[#D32F2F] text-bone px-2 py-0.5 text-[9px]">
                EVENT #204
              </span>
              <span>JUNE 14, 1970</span>
            </div>

            <h3 className="font-archive text-3.5xl leading-none mb-4 uppercase">
              THE GILDED ATRIUM
            </h3>

            <div className="border-2 border-dashed border-obsidian p-3.5 mb-5 relative bg-white/50">
              <span className="absolute -top-[9px] left-3 bg-[#E4DFD3] px-1.5 font-mono-ui text-[8px] text-obsidian/60 uppercase">
                Ticket Stub Reference
              </span>
              <h4 className="font-archive text-xl text-[#D32F2F] leading-none">
                ADMIT ONE
              </h4>
              <p className="font-mono-ui text-[9px] mt-1.5 uppercase font-bold">
                SECTOR ALPHA - ROW G - SEAT 12
              </p>
            </div>

            <div className="w-full aspect-square border-2 border-obsidian overflow-hidden bg-stone-300 relative">
              <img
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1551817958-c5b51e52bef5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Atrium schematic"
                className="w-full h-full object-cover mix-blend-luminosity opacity-70"
              />
            </div>
          </article>

          {/* Card 2: Shadow Chamber */}
          <article
            onClick={() => {
              playClack();
              setActiveStub('chamber');
            }}
            className={`bg-[#E4DFD3] border-4 border-obsidian p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] flex flex-col hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.85)] transition-all cursor-pointer text-left ${activeStub === 'chamber' ? 'ring-4 ring-[#D4AF37] border-obsidian' : ''}`}
          >
            <div className="flex justify-between items-start border-b-2 border-obsidian pb-1.5 mb-4 font-mono-ui text-xs font-bold uppercase">
              <span className="bg-obsidian text-bone px-2 py-0.5 text-[9px]">
                EVENT #205
              </span>
              <span>JULY 02, 1970</span>
            </div>

            <h3 className="font-archive text-3.5xl leading-none mb-4 uppercase">
              SHADOW CHAMBER
            </h3>

            <div className="border-2 border-dashed border-obsidian p-3.5 mb-5 relative bg-white/50">
              <span className="absolute -top-[9px] left-3 bg-[#E4DFD3] px-1.5 font-mono-ui text-[8px] text-obsidian/60 uppercase">
                Ticket Stub Reference
              </span>
              <h4 className="font-archive text-xl text-obsidian leading-none">
                VIP GUEST
              </h4>
              <p className="font-mono-ui text-[9px] mt-1.5 uppercase font-bold text-obsidian/75">
                BALCONY - BOX IV
              </p>
            </div>

            <div className="w-full aspect-square border-2 border-obsidian overflow-hidden bg-stone-300 relative">
              <img
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Chamber schematic"
                className="w-full h-full object-cover mix-blend-luminosity opacity-70"
              />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
