import React, { useState } from 'react';
import { Radio, Sliders, Volume2 } from 'lucide-react';

export default function NavConsoleCard() {
  const [sonarRange, setSonarRange] = useState(400);
  const [signalGain, setSignalGain] = useState(72);
  const [pingsActive, setPingsActive] = useState(false);

  return (
    <div className="border-2 border-black p-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2">
      {/* Gritty grayscale image from mock */}
      <div className="relative border-2 border-black bg-neutral-900 overflow-hidden group">
        <img
          className="w-full h-44 object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-500"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP3yknB98hwn1-OOt6r-E8v71C-6FFSKLtzQ1UvxOY-tZ6r2kOigw2g2OcREi970y7Tfl6zfgIqH66B0uABi2IfGMuXtgy8s_QMNMZEr1eq8DvHNioxIfReceHb3aFrH0TjZf401GOC_mlTtnIIJIg6xggBTn3kZEO36dQgXfEZY7k4V8LTmYLwmwl5cQLd2Chp73MvpADJqiKdaA2Vj1n5V-jWp6i0l6MHb6iR0Fpijo0EMt3-BM_qRpE4jLhxFJghQtdz6vhxWmI"
          alt="Vintage navigation panel gears"
          referrerPolicy="no-referrer"
        />

        {pingsActive && (
          <div className="absolute inset-0 bg-green-500/10 pointer-events-none flex items-center justify-center">
            <span className="text-[10px] text-green-400 font-mono tracking-widest border border-green-500 px-1 py-0.5 bg-black/80 animate-ping">
              ACTIVE_SCAN_PING
            </span>
          </div>
        )}

        <div className="absolute bottom-1 right-2 font-mono text-[9px] text-white/70 bg-black/65 px-1 py-0.2 select-none">
          CHRONOS ARCHIVE // CAM: 01
        </div>
      </div>

      <div className="text-center font-mono text-[10px] tracking-wide uppercase border-b border-black pb-1.5 font-bold">
        Fig 1. Belafonte Nav Console
      </div>

      {/* Interactive Controls */}
      <div className="font-mono text-[10px] text-black space-y-2">
        <div className="flex justify-between items-center text-zinc-600 font-bold">
          <span className="flex items-center gap-1">
            <Sliders className="w-3 h-3 text-black" /> METER_CONTROLS:
          </span>
          <span className="text-zinc-500 text-[9px]">SENSITIVITY // CALIBRATED</span>
        </div>

        {/* Sonar Depth Dial */}
        <div>
          <div className="flex justify-between text-[9px] mb-0.5 leading-none font-bold text-zinc-700">
            <span>DEPTH TARGET:</span>
            <span className="text-black font-extrabold">{sonarRange} METERS</span>
          </div>
          <input
            type="range"
            min="100"
            max="1200"
            step="50"
            value={sonarRange}
            onChange={(e) => setSonarRange(Number(e.target.value))}
            className="w-full accent-black cursor-ns-resize h-1 bg-parchment-deep rounded-none"
            id="slider-sonar-depth"
          />
        </div>

        {/* Signal Gain */}
        <div>
          <div className="flex justify-between text-[9px] mb-0.5 leading-none font-bold text-zinc-700">
            <span>RECEIVER GAIN:</span>
            <span className="text-black font-extrabold">{signalGain}% db</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={signalGain}
            onChange={(e) => setSignalGain(Number(e.target.value))}
            className="w-full accent-black cursor-ew-resize h-1 bg-parchment-deep rounded-none"
            id="slider-signal-gain"
          />
        </div>

        {/* Interactive Ping Toggle */}
        <div className="pt-1 select-none flex gap-1.5">
          <button
            onClick={() => setPingsActive(!pingsActive)}
            className={`w-1/2 text-[9px] uppercase font-bold py-1 px-1.5 transition-all text-center flex items-center justify-center gap-1 cursor-pointer border ${
              pingsActive
                ? 'bg-intel-orange text-black border-black border-2 animate-pulse shadow-sm'
                : 'bg-white text-zinc-500 border-gray-300 hover:border-black hover:text-black hover:bg-parchment-deep'
            }`}
            id="btn-sonar-ping"
          >
            <Radio className="w-3 h-3" /> {pingsActive ? 'ECHO_PING_ON' : 'TRIGGER_PING'}
          </button>

          <div className="w-1/2 border border-black/40 text-[9px] px-1 py-0.5 flex flex-col justify-center leading-normal bg-parchment-deep/30">
            <span className="text-zinc-500 font-bold block text-[8px] uppercase">Telemetry Signal:</span>
            <span className="font-bold font-mono text-[9px] text-black">
              {pingsActive ? `${(4.8 * (signalGain / 50)).toFixed(1)} Khz / OK` : 'IDLE // SILENT'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
