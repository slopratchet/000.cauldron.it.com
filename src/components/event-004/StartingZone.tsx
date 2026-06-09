import React from 'react';
import { Compass, Shield, Home, Info, HelpCircle } from 'lucide-react';

export function StartingZone() {
  return (
    <div
      id="starting-zone-panel"
      className="border border-black p-6 rounded bg-amber-50/10 flex flex-col gap-6 w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black pb-4 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-800 animate-spin-slow" />
          <h3 className="font-serif text-lg font-black uppercase tracking-wide text-neutral-950">
            Starting Zone
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] text-amber-800 uppercase bg-amber-100/50 px-2 py-1 rounded border border-amber-200">
          <span>
            Deployment Status: <b>Ready</b>
          </span>
        </div>
      </div>

      {/* [Inciting Incitant] of the Adventure at the top of the Starting Zone stack */}
      <div className="border border-[#7C2D12]/20 p-5 rounded-lg bg-[#7C2D12]/5 shadow-xs flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#7C2D12]" />
          <span className="font-bold text-[#7C2D12] uppercase tracking-widest text-[10px] font-mono">
            [Inciting Incitant] of the Adventure
          </span>
        </div>
        <h4 className="font-serif font-black text-sm text-neutral-900 uppercase">
          The Dying Pillar & Blind Beasts
        </h4>
        <p className="font-sans text-xs text-neutral-800 leading-relaxed italic bg-amber-50/60 p-3 border border-amber-900/10 rounded">
          &ldquo;Three days ago, the central ward monolith in Oakhaven sparked
          pale violet before turning cold. Several elder cows in the lowland
          barrows went blind over the same night, and local guards hear a
          distant, static storm-lament rising from the eastern peaks.&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono text-xs text-neutral-850">
        {/* Core Geography Card */}
        <div className="border border-neutral-350 p-4 rounded-lg bg-white/60 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-bold text-neutral-505 uppercase tracking-widest text-[9px] block mb-2 font-mono flex items-center gap-1.5 text-neutral-500">
              <Compass className="w-3.5 h-3.5 text-neutral-505" /> opening
              position
            </span>
            <h4 className="font-serif font-black text-sm text-neutral-900 uppercase">
              Sentinel Valley (Oakhaven Borderland)
            </h4>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-2">
              The geographical valley point surrounding Oakhaven. It forms the
              physical and spiritual anchor protecting the mortal settlement
              from lightning-laden tempest storms, wandering storm-elementals,
              and the chaotic magic of Vorgun's restless giant spirit.
            </p>
          </div>
          <div className="border-t border-neutral-200 pt-3 mt-4 text-[10.5px]">
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">Coordinate Location:</span>
              <b className="text-black font-extrabold">(q:0, r:0, s:0)</b>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">Elevation:</span>
              <b className="text-black">1,420 Ft (Mountain Pass)</b>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">Security Index:</span>
              <b className="text-emerald-700 font-bold uppercase">
                High Protection
              </b>
            </div>
          </div>
        </div>

        {/* Faction Holdings & Sanctuary Card */}
        <div className="border border-neutral-350 p-4 rounded-lg bg-white/60 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-bold text-neutral-505 uppercase tracking-widest text-[9px] block mb-2 font-mono flex items-center gap-1.5 text-neutral-500">
              <Home className="w-3.5 h-3.5 text-neutral-505" /> Stations &
              Outposts
            </span>
            <h4 className="font-serif font-black text-sm text-neutral-900 uppercase">
              Safe Havens & Guardposts
            </h4>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-2">
              Fortified settlements and camps where the party can safely rest,
              replenish rations, and consult with guild councilmen.
            </p>
          </div>
          <div className="border-t border-neutral-200 pt-3 mt-4 text-[10.5px] flex flex-col gap-0.5">
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">Local Safe Haven:</span>
              <span className="text-black font-bold">
                Weeping Willow Tavern
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">Primary Outpost:</span>
              <span className="text-black font-bold">
                Sentinel Guard cantonment
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">High Pass Camp:</span>
              <span className="text-black font-bold">
                Looming Peak Watchers
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-neutral-500">Druid Grove:</span>
              <span className="text-black font-bold">
                Elder Elara's Sanctuary
              </span>
            </div>
            <div className="flex justify-between py-0.5 text-rose-800 border-t border-neutral-100 mt-1 pt-1">
              <span className="text-neutral-500">Nearest Risk:</span>
              <span className="font-extrabold uppercase">
                Swamp Border Gates
              </span>
            </div>
          </div>
        </div>

        {/* Deployed Gear Cache and Coordinate location Column */}
        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          {/* Coordinate Location Content Box */}
          <div className="border border-amber-600/35 p-4 rounded-lg bg-amber-50/15 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-bold text-amber-950 uppercase tracking-widest text-[9px] block mb-2 font-mono flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-700" /> STARTING
                COORDINATE LOCATION
              </span>
              <h4 className="font-serif font-black text-xs text-neutral-950 uppercase">
                Initiation Spawn Point
              </h4>
              <p className="font-sans text-[11px] text-neutral-600 leading-relaxed mt-1">
                The characters initiate their adventure within this local
                deployment coordinate.
              </p>
              <div className="mt-3 font-mono text-[10px] bg-white/70 p-2 rounded border border-amber-200/60 flex justify-between items-center">
                <span className="text-neutral-500 font-bold uppercase">
                  COORDINATE REF:
                </span>
                <b className="text-amber-850 font-black tracking-wide text-[11px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">
                  (q: 0, r: 0, s: 0)
                </b>
              </div>
            </div>
          </div>

          {/* Deployed Gear Cache */}
          <div className="border border-neutral-350 p-4 rounded-lg bg-white/60 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <span className="font-bold text-neutral-505 uppercase tracking-widest text-[9px] block mb-2 font-mono flex items-center gap-1.5 text-neutral-500">
                <Shield className="w-3.5 h-3.5 text-neutral-505" /> Immediate
                Ground Supplies
              </span>
              <h4 className="font-serif font-black text-sm text-neutral-900 uppercase">
                Deployed Gear Cache
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-2">
                Vitals and equipment distributed by the Guild elders before
                sending the caravan out.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-[11px] mt-4">
              <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded inline-block text-[10px] border border-neutral-250">
                🎒 2x Hardened short-rest rations (Runic)
              </span>
              <span className="bg-indigo-100/50 text-indigo-800 px-2 py-1 rounded inline-block text-[10px] border border-indigo-200">
                🔮 1x Glass translation lens (for giant scripts)
              </span>
              <span className="bg-emerald-100/40 text-emerald-800 px-2 py-1 rounded inline-block text-[10px] border border-emerald-250">
                🧭 1x Quartz leyline compass (+1 Navigation)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
