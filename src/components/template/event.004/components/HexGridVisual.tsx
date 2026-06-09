import React from 'react';
import { Compass, Layers, Network, Activity, MapPin } from 'lucide-react';

interface HexNode {
  id: string;
  name: string;
  q: number;
  r: number;
  s: number;
  layer: number;
  scale_miles?: number;
  scale_ft?: number;
  terrain: string;
  status: 'completed' | 'active' | 'locked';
  desc: string;
  runic_wind: string;
  etheric_pressure: string;
  relative_humidity: string;
  spectral_density: string;
  acoustic_echo: string;
  spawn_zones?: string[];
  registered_locations?: string[];
}

export const COORDINATE_LOCATIONS_BY_HEX: Record<string, string[]> = {
  'hex-00': [
    'Oakhaven Town Square',
    'Southern Farmlands',
    'Council High Hall',
    'Oakhaven Back-Alley Den',
    'Oakhaven Practice Ring',
    'Oakhaven Shrine Altar Box',
    'Oakhaven Council Vault',
    'Oakhaven Founders Memorial',
    'Oakhaven Guard Watchtower',
    "Oakhaven Elder's Private Chest",
  ],
  'hex-01': [
    'Damp Barrowmoors',
    'Highlands Cemetery',
    'Whispering Woods',
    'Barrowmoor Sunken Swampland',
    'Barrowmoor Cold Swamp Ridge',
    'Barrowmoor Whispering Mounds',
    'Barrowmoor Treehouse Blind',
    'Barrowmoor Wet Silt Reach',
  ],
  'hex-02': [
    "Vorgun's Sarcophagus Vault",
    "Vorgun's Burial Guard Chamber",
    "Vorgun's Deep Sarcophagus Alcove",
    "Vorgun's Tomb Inner Crypt",
    'The Forgotten Crypts',
  ],
  'hex-02-surface': [
    'Sentinel Stone Monoliths',
    'Barrowmoor Weeping Cairn Altar',
  ],
  'hex-sub-01': [
    'Barrowmoor Family Shrine Records',
    'Waterway Cargo Cache',
    "Smuggler's Distill Vault",
    'Charter-Thief Escape Shaft',
    'Sunken Basin Hideout',
    'Weeping Moss Garden',
  ],
  'hex-sub-02': [
    'Ancestral High Altar',
    'Damped Sieve Well',
    'Ossuary Custody Vault',
  ],
  'hex-ast-01': [
    'Western Leyline Conduit',
    'High Warding Shrines',
    'Aether Current Battery',
    'Runic Resonance Spire',
  ],
  'hex-ast-02': [
    'Lighthouse Citadel',
    'Garrison Watchtower',
    'Gravitational Anchoring Arch',
    'Solar Wind Collector Hub',
  ],
  'hex-ast-03': [],
};

export const COMBAT_SITES_BY_HEX: Record<string, string[]> = {
  'hex-00': ['Highlands Cemetery Outskirts'],
  'hex-01': [
    'Damp Barrowmoors',
    'Mistwood Wilds Swamp',
    'Elder-Lotus Glade',
    'Barrowmoor Smuggler Marsh-Hollow',
  ],
  'hex-02-surface': ['Burial Mound', 'Sentinel Stone Monoliths'],
  'hex-02': [
    'Inner Tomb Sarcophagus Chamber',
    'Ancient Spirit Throne Room',
    'The Forgotten Crypts',
  ],
  'hex-sub-01': ['Barrowmoor Smuggler Marsh-Hollow'],
  'hex-sub-02': ['The Forgotten Crypts'],
  'hex-ast-01': ['Western Leyline Conduit', 'Whispering Heath Summit'],
  'hex-ast-02': ['Whispering Heath Summit', 'Sentinel Stone Monoliths'],
  'hex-ast-03': ['Sentinel Stone Monoliths'],
};

export function HexGridVisual() {
  // Layer 0: Surface
  const surfaceHexes: HexNode[] = [
    {
      id: 'hex-00',
      name: 'Village (Oakhaven)',
      q: 0,
      r: 0,
      s: 0,
      layer: 0,
      scale_miles: 6,
      terrain: 'village',
      status: 'completed',
      desc: 'An ancient woodland settlement currently plagued by unnatural tempest storms.',
      runic_wind: 'Gentle Climatic Breeze',
      etheric_pressure: '1.00 atm (Standard)',
      relative_humidity: '42% (Normal)',
      spectral_density: '1.2% Spore Ratio (Clear)',
      acoustic_echo: 'Open Field Free Resonance',
      spawn_zones: ['Highlands Cemetery Outskirts'],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-00'],
    },
    {
      id: 'hex-01',
      name: 'Swamps (Barrowmoors)',
      q: 1,
      r: -1,
      s: 0,
      layer: 0,
      scale_miles: 6,
      terrain: 'swamp',
      status: 'active',
      desc: 'Drowned lowlands thick with choking storm-mists and aggressive undead shadows.',
      runic_wind: 'Erratic Gale Soughs',
      etheric_pressure: '1.08 atm (Damp)',
      relative_humidity: '93% (Saturating Fog)',
      spectral_density: '45% Poison Spore Spikes',
      acoustic_echo: 'Muffled & Squelched Mud Dampening',
      spawn_zones: [
        'Damp Barrowmoors',
        'Mistwood Wilds Swamp',
        'Elder-Lotus Glade',
        'Barrowmoor Smuggler Marsh-Hollow',
      ],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-01'],
    },
    {
      id: 'hex-02-surface',
      name: 'Stone Tomb (Surface Entrance)',
      q: 3,
      r: -2,
      s: -1,
      layer: 0,
      scale_miles: 6,
      terrain: 'worked_stone (Surface Entrance)',
      status: 'active',
      desc: "The monumental surface entrance structure to Vorgun's resting place.",
      runic_wind: 'Severe Gale-Force Wind Blasts',
      etheric_pressure: '1.05 atm',
      relative_humidity: '85% (Storm-struck Peaks)',
      spectral_density: '3.5% Arcane Static Spores',
      acoustic_echo: 'Deep howling mountain echo resonance',
      spawn_zones: ['Burial Mound', 'Sentinel Stone Monoliths'],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-02-surface'],
    },
  ];

  // Layer -1: Subterranean
  const subterraneanHexes: HexNode[] = [
    {
      id: 'hex-02',
      name: "Stone Tomb (Vorgun's Tomb)",
      q: 3,
      r: -2,
      s: -1,
      layer: -1,
      scale_ft: 5,
      terrain: 'worked_stone (Subterranean Tomb)',
      status: 'locked',
      desc: "The ancient monumental vault where Vorgun's restless spirit laments eternally.",
      runic_wind: 'Chill Static Chamber Draft',
      etheric_pressure: '0.95 atm (Underground)',
      relative_humidity: '65% (Dank Crypt Vapors)',
      spectral_density: '15% Ectoplasmic Mist Index',
      acoustic_echo: 'Extreme Stonework Feedback Echo',
      spawn_zones: [
        'Inner Tomb Sarcophagus Chamber',
        'Ancient Spirit Throne Room',
        'The Forgotten Crypts',
      ],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-02'],
    },
    {
      id: 'hex-sub-01',
      name: "Misty Hollow Smugglers' Grotto",
      q: 2,
      r: -2,
      s: 0,
      layer: -1,
      scale_ft: 10,
      terrain: 'subterranean_cave',
      status: 'active',
      desc: "Smugglers' cavern network. Contains water channels that bypass overland marsh patrols.",
      runic_wind: 'Faint drafts carrying moss scent',
      etheric_pressure: '1.02 atm (Damp Cavity)',
      relative_humidity: '90% (Wet Cave Walls)',
      spectral_density: '8.5% Spore Glow',
      acoustic_echo: 'Low dripping cavern echo',
      spawn_zones: ['Barrowmoor Smuggler Marsh-Hollow'],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-sub-01'],
    },
    {
      id: 'hex-sub-02',
      name: 'Forgotten Crypts / Family Crypt',
      q: 4,
      r: -3,
      s: -1,
      layer: -1,
      scale_ft: 10,
      terrain: 'subterranean_vaults',
      status: 'locked',
      desc: 'Sealed crypt networks where ancient clan ancestors are enshrined in rune-bolted stone pillars.',
      runic_wind: 'Muted Static Chamber draft',
      etheric_pressure: '0.98 atm',
      relative_humidity: '72% (Stagnant)',
      spectral_density: '32% Ghost-Mist Ratio',
      acoustic_echo: 'Delayed Hollow Vault Reverberation',
      spawn_zones: ['The Forgotten Crypts'],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-sub-02'],
    },
  ];

  // Layer 1: Astral/Planar
  const astralHexes: HexNode[] = [
    {
      id: 'hex-ast-01',
      name: 'Astral Leyline Nexus',
      q: 0,
      r: 1,
      s: -1,
      layer: 1,
      scale_miles: 1,
      terrain: 'astral_conduit',
      status: 'active',
      desc: 'The ethereal intersection points feeding high runic resonance directly into the Oakhaven wards.',
      runic_wind: 'Sub-harmonic Leyline Screams',
      etheric_pressure: '0.45 atm (Planar Distortion)',
      relative_humidity: '5% (Desiccated Vacuum)',
      spectral_density: '98% High Arcane Particle Flow',
      acoustic_echo: 'Aetheric crackling noise resonance',
      spawn_zones: ['Western Leyline Conduit', 'Whispering Heath Summit'],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-ast-01'],
    },
    {
      id: 'hex-ast-02',
      name: 'Sky Ruins Monolith Peak',
      q: -1,
      r: 0,
      s: 1,
      layer: 1,
      scale_miles: 2,
      terrain: 'planar_cliffs',
      status: 'locked',
      desc: 'Eroding peaks hovering above the valley, where gravitational force lines decay.',
      runic_wind: 'Gravitational Shear Hurricanes',
      etheric_pressure: '0.75 atm (Unstable Air)',
      relative_humidity: '12% (Thin Frigid Atmosphere)',
      spectral_density: '64% Gravitational Field Dust',
      acoustic_echo: 'Screaming whistling altitude feedback',
      spawn_zones: ['Whispering Heath Summit', 'Sentinel Stone Monoliths'],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-ast-02'],
    },
    {
      id: 'hex-ast-03',
      name: 'Aether Void Rift / Twilight Conduit',
      q: 1,
      r: 0,
      s: -1,
      layer: 1,
      scale_miles: 2,
      terrain: 'planar_rift',
      status: 'locked',
      desc: 'The glowing rift where excess atmospheric lightning is discharged into stellar vacuum currents.',
      runic_wind: 'Gravitational Shear storms',
      etheric_pressure: '0.35 atm',
      relative_humidity: '0% (Absolute Zero)',
      spectral_density: '99% Raw Plasma Discharge',
      acoustic_echo: 'Deep stellar hum resonance',
      spawn_zones: ['Sentinel Stone Monoliths'],
      registered_locations: COORDINATE_LOCATIONS_BY_HEX['hex-ast-03'],
    },
  ];

  const renderHexCards = (hexes: HexNode[], colorScheme: string) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hexes.map((hex) => (
          <div
            key={hex.id}
            className="p-5 bg-white border border-stone-300 rounded flex flex-col justify-between shadow-xs select-all"
          >
            <div>
              <div className="flex justify-between items-baseline mb-2 pb-1.5 border-b border-stone-100">
                <span className="font-serif font-black text-xs uppercase tracking-wider text-black select-all">
                  {hex.name.toUpperCase()}
                </span>
                <span
                  className={`font-mono text-[9.5px] font-black uppercase select-all ${colorScheme}`}
                >
                  {hex.id}
                </span>
              </div>
              <p className="font-sans text-xs text-neutral-600 mb-4 leading-relaxed select-all">
                {hex.desc}
              </p>

              {/* ENCOUNTER SPAWN ZONES IN GRID REGISTRY CARDS */}
              {hex.spawn_zones && hex.spawn_zones.length > 0 && (
                <div className="mb-3">
                  <span className="font-mono text-[9.5px] font-black text-red-700 uppercase tracking-wider block mb-1 flex items-center gap-1 select-all">
                    ⚔️ Combat Sites:
                  </span>
                  <div className="flex flex-wrap gap-1 leading-normal select-all">
                    {hex.spawn_zones.map((zone, idx) => (
                      <span
                        key={idx}
                        className="bg-red-50 text-red-900 border border-red-200/60 text-[9.5px] px-2 py-0.5 rounded font-mono font-bold select-all"
                      >
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* REGISTERED ADVENTURE LOCATIONS WITHIN NODE */}
              {hex.registered_locations &&
                hex.registered_locations.length > 0 && (
                  <div className="mb-4">
                    <span className="font-mono text-[9.5px] font-black text-emerald-800 uppercase tracking-wider block mb-1 flex items-center gap-1 select-all">
                      📍 Coordinate Locations:
                    </span>
                    <div className="flex flex-wrap gap-1 leading-normal select-all">
                      {hex.registered_locations.map((loc, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-50 text-emerald-950 border border-emerald-250/20 text-[9.5px] px-2 py-0.5 rounded font-mono font-bold select-all"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Tree hierarchy display replicated precisely from reference screenshot */}
            <div className="border-t border-dashed border-stone-200 pt-3 flex flex-col gap-1 font-mono text-[10.5px] select-all">
              <div className="flex justify-between items-center text-stone-500 select-all">
                <span>Grid Coordinates:</span>
                <b className="text-black font-extrabold select-all">
                  ({hex.q}, {hex.r}, {hex.s})
                </b>
              </div>
              <div className="border-t border-neutral-150 my-1"></div>
              <div className="flex justify-between items-center text-stone-800 font-bold mb-0.5 select-all">
                <span>Bounds Weight:</span>
                <b className="text-black select-all">
                  {hex.scale_miles
                    ? `${hex.scale_miles} Miles`
                    : `${hex.scale_ft} Ft`}
                </b>
              </div>
              <div className="flex justify-between items-center text-stone-500 pl-2 select-all">
                <span>├ Wind Pattern:</span>
                <span className="text-neutral-700 text-right select-all">
                  {hex.runic_wind}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-500 pl-2 select-all">
                <span>├ Etheric Pressure:</span>
                <span className="text-neutral-700 text-right select-all">
                  {hex.etheric_pressure}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-500 pl-2 select-all">
                <span>├ Rel. Humidity:</span>
                <span className="text-neutral-700 text-right select-all">
                  {hex.relative_humidity}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-500 pl-2 select-all">
                <span>├ Spectral Density:</span>
                <span className="text-neutral-700 text-right select-all">
                  {hex.spectral_density}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-500 pl-2 select-all">
                <span>└ Acoustic Echo:</span>
                <span className="text-neutral-700 text-right select-all">
                  {hex.acoustic_echo}
                </span>
              </div>

              <div className="border-t border-dashed border-stone-200 my-1 pt-1.5 flex justify-between items-center font-bold text-[9px] text-neutral-500 select-all">
                <span>STATUS:</span>
                <span className="text-black font-extrabold uppercase select-all">
                  {hex.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      id="hex-interactive-map-panel"
      className="border border-black p-6 rounded bg-stone-50/10 flex flex-col gap-8 w-full select-all"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black pb-4 gap-2 select-all">
        <div className="flex items-center gap-2 select-all">
          <Layers className="w-5 h-5 text-neutral-800" />
          <h3 className="font-serif text-lg font-black uppercase tracking-wide select-all">
            Grid Zone Display
          </h3>
        </div>
      </div>

      {/* THREE SEPARATE DETAILS LEDGERS DISPLAYED CLEARLY AS DESIGNED IN THE IMAGE */}
      <div className="flex flex-col gap-10 mt-1 select-all font-mono">
        {/* DISPLAY 1: SURFACE LAYER */}
        <div className="border border-stone-300 p-6 rounded bg-stone-50/20 flex flex-col gap-4 select-all">
          <div className="flex justify-between items-center border-b border-stone-300 pb-3 select-all">
            <span className="font-mono text-[10.5px] font-black text-black flex items-center gap-1.5 uppercase tracking-wide select-all">
              <Compass className="w-4 h-4 text-neutral-750" /> SURFACE 0.0
              COORDINATES REGISTRY
            </span>
            <span className="font-mono text-[9px] bg-[#FEF3C7] text-amber-900 border border-amber-300/40 font-bold px-2 py-0.5 rounded uppercase tracking-wider select-all">
              LAYER 0
            </span>
          </div>

          {/* Graphical Inverted-V custom grid layout matching the reference image */}
          <div className="flex flex-col items-center justify-center my-6 z-0 select-all">
            {/* Top Card: hex-00 */}
            <div className="border border-black bg-white px-10 py-5 text-center w-52 mb-[-1px] relative z-10 select-all">
              <span className="font-mono text-[10px] font-bold text-amber-900 block uppercase tracking-wide select-all">
                hex-00
              </span>
              <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                Village
              </span>
              <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                (q:0, r:0, s:0)
              </span>
            </div>
            {/* Bottom Row: hex-01 swamps & hex-02-surface stone tomb */}
            <div className="flex justify-center select-all">
              <div className="border border-black bg-white px-10 py-5 text-center w-52 mr-[-1px] relative z-0 select-all">
                <span className="font-mono text-[10px] font-bold text-teal-800 block uppercase tracking-wide select-all">
                  hex-01
                </span>
                <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                  Swamps
                </span>
                <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                  (q:1, r:-1, s:0)
                </span>
              </div>
              <div className="border border-black bg-white px-10 py-5 text-center w-52 relative z-0 select-all">
                <span className="font-mono text-[10px] font-bold text-neutral-850 text-neutral-900 block uppercase tracking-wide select-all">
                  hex-02-surface
                </span>
                <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                  Stone Tomb
                </span>
                <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                  (q:3, r:-2, s:-1)
                </span>
              </div>
            </div>
          </div>

          {/* Cards grid list for Surface */}
          {renderHexCards(surfaceHexes, 'text-amber-800')}
        </div>

        {/* DISPLAY 2: SUBTERRANEAN LAYER */}
        <div className="border border-stone-300 p-6 rounded bg-stone-50/20 flex flex-col gap-4 select-all">
          <div className="flex justify-between items-center border-b border-stone-300 pb-3 select-all">
            <span className="font-mono text-[10.5px] font-black text-black flex items-center gap-1.5 uppercase tracking-wide select-all">
              <Network className="w-4 h-4 text-neutral-750" /> SUBTERRANEAN -1.0
              COORDINATES REGISTRY
            </span>
            <span className="font-mono text-[9px] bg-purple-100 text-purple-900 border border-purple-300/40 font-bold px-2 py-0.5 rounded uppercase tracking-wider select-all">
              LAYER -1
            </span>
          </div>

          {/* Graphical Inverted-V custom grid layout matching surface, aligned nicely */}
          <div className="flex flex-col items-center justify-center my-6 z-0 select-all">
            {/* Top Card: hex-02 */}
            <div className="border border-black bg-white px-10 py-5 text-center w-52 mb-[-1px] relative z-10 select-all">
              <span className="font-mono text-[10px] font-bold text-fuchsia-900 block uppercase tracking-wide select-all">
                hex-02
              </span>
              <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                Vorgun's Tomb
              </span>
              <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                (q:3, r:-2, s:-1)
              </span>
            </div>
            {/* Bottom Row: hex-sub-01 smugglers & hex-sub-02 forgotten crypt */}
            <div className="flex justify-center select-all">
              <div className="border border-black bg-white px-10 py-5 text-center w-52 mr-[-1px] relative z-0 select-all">
                <span className="font-mono text-[10px] font-bold text-purple-800 block uppercase tracking-wide select-all">
                  hex-sub-01
                </span>
                <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                  Smugglers' Grotto
                </span>
                <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                  (q:2, r:-2, s:0)
                </span>
              </div>
              <div className="border border-black bg-white px-10 py-5 text-center w-52 relative z-0 select-all">
                <span className="font-mono text-[10px] font-bold text-pink-700 block uppercase tracking-wide select-all">
                  hex-sub-02
                </span>
                <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                  Forgotten Crypts
                </span>
                <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                  (q:4, r:-3, s:-1)
                </span>
              </div>
            </div>
          </div>

          {renderHexCards(subterraneanHexes, 'text-purple-800')}
        </div>

        {/* DISPLAY 3: PLANAR ASTRAL LAYER */}
        <div className="border border-stone-300 p-6 rounded bg-stone-50/20 flex flex-col gap-4 select-all">
          <div className="flex justify-between items-center border-b border-stone-300 pb-3 select-all">
            <span className="font-mono text-[10.5px] font-black text-black flex items-center gap-1.5 uppercase tracking-wide select-all">
              <Activity className="w-4 h-4 text-neutral-750" /> PLANAR ASTRAL
              +1.0 COORDINATES REGISTRY
            </span>
            <span className="font-mono text-[9px] bg-indigo-100 text-indigo-900 border border-indigo-300/40 font-bold px-2 py-0.5 rounded uppercase tracking-wider select-all">
              LAYER +1
            </span>
          </div>

          {/* Graphical Inverted-V custom grid layout matching surface, aligned nicely */}
          <div className="flex flex-col items-center justify-center my-6 z-0 select-all">
            {/* Top Card: hex-ast-01 */}
            <div className="border border-black bg-white px-10 py-5 text-center w-52 mb-[-1px] relative z-10 select-all">
              <span className="font-mono text-[10px] font-bold text-indigo-700 block uppercase tracking-wide select-all">
                hex-ast-01
              </span>
              <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                Leyline Nexus
              </span>
              <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                (q:0, r:1, s:-1)
              </span>
            </div>
            {/* Bottom Row: hex-ast-02 & hex-ast-03 */}
            <div className="flex justify-center select-all">
              <div className="border border-black bg-white px-10 py-5 text-center w-52 mr-[-1px] relative z-0 select-all">
                <span className="font-mono text-[10px] font-bold text-pink-700 block uppercase tracking-wide select-all">
                  hex-ast-02
                </span>
                <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                  Sky Ruins
                </span>
                <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                  (q:-1, r:0, s:1)
                </span>
              </div>
              <div className="border border-black bg-white px-10 py-5 text-center w-52 relative z-0 select-all">
                <span className="font-mono text-[10px] font-bold text-sky-700 block uppercase tracking-wide select-all">
                  hex-ast-03
                </span>
                <span className="font-serif font-black text-xs uppercase block tracking-wider mt-1 select-all">
                  Void Rift
                </span>
                <span className="font-mono text-[9px] text-neutral-500 block mt-1 select-all">
                  (q:1, r:0, s:-1)
                </span>
              </div>
            </div>
          </div>

          {renderHexCards(astralHexes, 'text-indigo-800')}
        </div>
      </div>
    </div>
  );
}
