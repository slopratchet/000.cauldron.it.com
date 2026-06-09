/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  TrendingUp,
  Sparkles,
  HeartHandshake,
  Flame,
  Clock,
  Award,
  Key,
  CheckCircle2,
  Compass,
} from 'lucide-react';

interface SubPathDetails {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  accentClass: string;
  badgeStyle: string;
  bgStyle: string;
  timeline: string[];
  resolvedQuests: { name: string; xp: number }[];
  unravelledSecrets: string[];
  combatsHandled: string[];
  bonusMilestones: string[];
  subtotalBreakdown: {
    quests: number;
    milestones: number;
    secrets: number;
    combat: number;
    total: number;
  };
}

const STAT_PATHS: SubPathDetails[] = [
  {
    id: 'path_completionist',
    name: 'The Completionist Scholar Path',
    description:
      'Unravel all hidden truths, decrypt every single lore secret, assist local factions, and fully conquer target mystical ruins.',
    icon: Sparkles,
    accentClass: 'text-indigo-700',
    badgeStyle: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    bgStyle: 'bg-indigo-50/10 border-indigo-200',
    timeline: [
      'Investigates the council rumors and warding stone at Oakhaven center',
      'Discovers and deciphers ALL 11 leyline secrets',
      'Assists council elder Elara and forge dynamic alliance with villagers',
      'Tracks down and defeats Barrow Ghoul & Lightning Mephits',
      'Overcomes the Barrowmoor Hag guarding the crypt gates',
      'Breaches burial vault, soothe and pacify Ghost of Vorgun peacefully',
    ],
    resolvedQuests: [
      { name: 'Interview Council Elder Elara', xp: 150 },
      { name: 'Inspect Warding Stone in Town Center', xp: 150 },
      { name: 'Translate Runes of Binding', xp: 250 },
      { name: 'Bypass/Defeat Barrowmoor Hag', xp: 350 },
      { name: 'Breach burial chamber vault', xp: 400 },
      { name: "Soothe/appease Vorgun's spirit", xp: 600 },
    ],
    unravelledSecrets: [
      'Vorguns True Death',
      'Smugglers Tunnel',
      'Ancient Pact',
      'Giant Guard Tactics',
      'Willow Wisp Mysteries',
      'Founders Betrayal',
      'Weeping Cairn History',
      'Hag Alliance Record',
      'Drowned Catacombs',
      'Vorgun Affinity Seal',
      'Star Map Coordinates',
    ],
    combatsHandled: [
      'Barrow Ghoul (Combat Defeated)',
      'Lightning Mephits (Combat Defeated)',
      'Barrowmoor Hag (Combat Defeated)',
    ],
    bonusMilestones: [
      'Social Stage Milestone Completed (+500 XP)',
      'Wilderness Stage Milestone Completed (+800 XP)',
      'Spirit Climax Stage Milestone Completed (+1500 XP)',
    ],
    subtotalBreakdown: {
      quests: 1900,
      milestones: 2800,
      secrets: 3300,
      combat: 1400,
      total: 9400,
    },
  },
  {
    id: 'path_pacifist',
    name: 'The Peaceful Diplomat Path',
    description:
      'Rely purely on high persuasion, social infiltration, historical lore, and peaceful warding rituals. Avoid all life-ending violence.',
    icon: HeartHandshake,
    accentClass: 'text-emerald-700',
    badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    bgStyle: 'bg-emerald-50/10 border-emerald-200',
    timeline: [
      'Conducts comprehensive investigation at Oakhaven council center',
      'Decrypts historical / spiritual secrets (no military tactics secrets)',
      'Charms the Sorrowful Wanderer in the Barrowmoor Mistwoods',
      'Secures peaceful treaty with Barrowmoor villagers',
      'Disarms the primary Coffin defenses via ancient star charts',
      "Performs ancient binding ritual of memory to tranquilize Vorgun's Ghost",
    ],
    resolvedQuests: [
      { name: 'Interview Council Elder Elara', xp: 150 },
      { name: 'Inspect Warding Stone in Town Center', xp: 150 },
      { name: 'Translate Runes of Binding', xp: 250 },
      { name: 'Breach burial chamber vault', xp: 400 },
      { name: "Soothe/appease Vorgun's spirit", xp: 600 },
    ],
    unravelledSecrets: [
      'Vorguns True Death',
      'Ancient Pact',
      'Willow Wisp Mysteries',
      'Weeping Cairn History',
      'Vorgun Affinity Seal',
      'Star Map Coordinates',
    ],
    combatsHandled: [
      'All Hostilities Safely Pacified or Parried (Peaceful Bonus Modifier Active)',
    ],
    bonusMilestones: [
      'Social Stage Milestone Completed (+500 XP)',
      'Spirit Climax Stage Milestone Completed (+1500 XP)',
    ],
    subtotalBreakdown: {
      quests: 1550,
      milestones: 2000,
      secrets: 1800,
      combat: 0,
      total: 5350,
    },
  },
  {
    id: 'path_slayer',
    name: 'The Swift Slayer Path',
    description:
      'Direct martial approach. Focus on eliminating immediate threats, overcoming monster guards, and claiming standard loot through physical force.',
    icon: Flame,
    accentClass: 'text-red-700',
    badgeStyle: 'bg-red-50 text-red-800 border-red-200',
    bgStyle: 'bg-red-50/10 border-red-200',
    timeline: [
      'Completes swift investigation and heads directly to wild lands',
      'Attacks and eliminates the undead Barrow Ghouls and Lightning Mephits',
      'Engages in mortal combat with the Barrowmoor Hag guarding the tombs',
      'Discovers basic tactical weaknesses via giant guard archives',
      'Enters outer burial chamber by force',
      "Slay Vorgun's restless spirit in a brutal climactic battle",
    ],
    resolvedQuests: [
      { name: 'Interview Council Elder Elara', xp: 150 },
      { name: 'Bypass/Defeat Barrowmoor Hag', xp: 350 },
      { name: 'Breach burial chamber vault', xp: 400 },
    ],
    unravelledSecrets: ['Giant Guard Tactics'],
    combatsHandled: [
      'Barrow Ghoul (Defeated - 400 XP)',
      'Lightning Mephit (Defeated - 400 XP)',
      'Barrowmoor Hag (Defeated - 600 XP)',
      'Vorguns Ghost Boss (Annihilated - 800 XP)',
    ],
    bonusMilestones: ['No Milestone Bonuses Earned (Martial Skip Mode active)'],
    subtotalBreakdown: {
      quests: 900,
      milestones: 0,
      secrets: 300,
      combat: 2200,
      total: 3400,
    },
  },
  {
    id: 'path_speedrunner',
    name: 'Minimalist Speedrun Path',
    description:
      'Execute the critical path. Complete bare-minimum requirements to trigger scene transitions as fast as possible.',
    icon: Clock,
    accentClass: 'text-amber-700',
    badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
    bgStyle: 'bg-amber-50/10 border-amber-200',
    timeline: [
      'Bypasses Oakhaven local discussions to travel with scouts',
      'Rushes through the Barrowmoors directly to burial entrance',
      'Bypasses optional sub-quests and ignores all secrets',
      'Triggers critical confrontation with Vanguard spirit in tomb',
      'Bypasses the spirit with minimal interaction or flees',
    ],
    resolvedQuests: [
      { name: 'Interview Council Elder Elara', xp: 150 },
      { name: 'Translate Runes of Binding', xp: 250 },
      { name: 'Breach burial chamber vault', xp: 400 },
    ],
    unravelledSecrets: ['None (All Cryptic Secrets Bypassed intentionally)'],
    combatsHandled: ['None (Combat encounters evaded via tactical maneuvers)'],
    bonusMilestones: [
      'None (No Milestones triggered - Minimalist Execution standard)',
    ],
    subtotalBreakdown: {
      quests: 800,
      milestones: 0,
      secrets: 0,
      combat: 0,
      total: 800,
    },
  },
];

export function AdventurePathCalculator({ subject }: { subject: any }) {
  return (
    <section
      id="section-adventurepath-calculator"
      className="border border-black p-6 rounded bg-[#FCFAF2] flex flex-col gap-6 select-all"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-700 animate-pulse" />
          <h2 className="font-serif text-xl font-black uppercase tracking-wide text-neutral-900">
            Adventure Path
          </h2>
        </div>
        <div className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-1 bg-stone-100 rounded text-stone-600 border border-stone-250">
          STATIC SIMULATION / NO INTERACTION MODE
        </div>
      </div>

      <p className="font-serif text-sm text-neutral-700 leading-relaxed">
        This high-accuracy static audit system breaks out the campaign's{' '}
        <strong>four archetypal routes</strong>. All player interactive
        controls, checkboxes, and sliders have been decommissioned to stabilize
        campaign reporting indices. All data arrays are fully expanded for
        continuous reading without local scrollbars.
      </p>

      {/* Subsections System Layout */}
      <div className="flex flex-col gap-8 font-mono text-[10.5px]">
        {STAT_PATHS.map((path) => {
          const PathIcon = path.icon;

          return (
            <div
              key={path.id}
              className={`border rounded p-5 ${path.bgStyle} flex flex-col gap-5`}
            >
              {/* Header block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-black/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded-sm bg-white border border-black/5`}
                  >
                    <PathIcon className={`w-5 h-5 ${path.accentClass}`} />
                  </div>
                  <div>
                    <h3 className="font-serif text-[15px] font-black text-neutral-950 uppercase tracking-tight leading-tight">
                      {path.name}
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-sans mt-0.5 max-w-2xl leading-snug">
                      {path.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-3 py-1.5 border rounded font-bold flex items-center gap-1.5 ${path.badgeStyle}`}
                >
                  <span>TOTAL ESTIMATED CAP:</span>
                  <span className="text-xs font-black">
                    {path.subtotalBreakdown.total} XP
                  </span>
                </div>
              </div>

              {/* Part 1: XP Balance Sheet (Full Width) */}
              <div className="bg-neutral-950 text-neutral-100 p-4 rounded border border-neutral-800 flex flex-col gap-3 font-mono">
                <div className="text-white uppercase font-black text-[9px] tracking-widest border-b border-stone-800 pb-1.5 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  D. XP Balance Sheet
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center text-[10px]">
                  <div className="flex flex-col border-r border-stone-800 pr-1">
                    <span className="text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                      Quest Completion:
                    </span>
                    <span className="font-extrabold text-white mt-0.5">
                      +{path.subtotalBreakdown.quests} XP
                    </span>
                  </div>
                  <div className="flex flex-col border-r border-stone-800 pr-1">
                    <span className="text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                      Secrets Matrix:
                    </span>
                    <span className="font-extrabold text-white mt-0.5">
                      +{path.subtotalBreakdown.secrets} XP
                    </span>
                  </div>
                  <div className="flex flex-col border-r border-stone-800 pr-1">
                    <span className="text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                      Combat Threats:
                    </span>
                    <span className="font-extrabold text-white mt-0.5">
                      +{path.subtotalBreakdown.combat} XP
                    </span>
                  </div>
                  <div className="flex flex-col border-r border-stone-800 pr-1 col-span-2 md:col-span-1">
                    <span className="text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                      Milestones:
                    </span>
                    <span className="font-extrabold text-white mt-0.5">
                      +{path.subtotalBreakdown.milestones} XP
                    </span>
                  </div>
                  <div className="bg-indigo-950/80 p-2 border border-indigo-800 rounded flex justify-between items-center text-[10px] font-black tracking-wide text-indigo-200 col-span-2 md:col-span-1">
                    <span className="text-[8px]">GRAND NET XP:</span>
                    <span className="text-amber-400 font-sans text-xs font-black">
                      +{path.subtotalBreakdown.total} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Part 2: Remaining Details in 3 Columns (A, B, C) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Col 1: Timeline flow */}
                <div className="bg-white/80 p-3.5 border border-neutral-200 rounded flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 border-b border-black/5 pb-1 text-neutral-500 uppercase font-black text-[9px] tracking-wider">
                    <Compass className="w-3.5 h-3.5" />
                    A. Narrative Sequence
                  </div>
                  <div className="flex flex-col gap-2">
                    {path.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-1.5 leading-snug">
                        <span className="text-neutral-400 font-bold shrink-0">
                          {idx + 1}.
                        </span>
                        <span className="text-neutral-700 text-[10px] select-all">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 2: Quests nodes completed */}
                <div className="bg-white/80 p-3.5 border border-neutral-200 rounded flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 border-b border-black/5 pb-1 text-neutral-500 uppercase font-black text-[9px] tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    B. Completed Objectives
                  </div>
                  <div className="flex flex-col gap-2">
                    {path.resolvedQuests.map((quest, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 bg-neutral-50/50 p-1.5 rounded border border-neutral-100"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-neutral-800 text-[10px] font-bold select-all leading-tight">
                            {quest.name}
                          </span>
                          <span className="text-[8px] text-neutral-400 font-mono">
                            +{quest.xp} XP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 3: Secrets decrypted & combats solved */}
                <div className="bg-white/80 p-3.5 border border-neutral-200 rounded flex flex-col gap-3">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5 border-b border-black/5 pb-1 text-neutral-500 uppercase font-black text-[9px] tracking-wider">
                      <Key className="w-3.5 h-3.5" />
                      C. Lore &amp; Danger Resolutions
                    </div>

                    {/* Secrets count */}
                    <div>
                      <span className="text-[8px] text-neutral-400 font-bold uppercase block mb-1">
                        Decrypted Lore Secrets:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {path.unravelledSecrets.map((sec, idx) => (
                          <span
                            key={idx}
                            className="bg-amber-50 text-amber-900 border border-amber-200/50 text-[8.5px] px-1.5 py-0.5 rounded capitalize select-all"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Combat hazards */}
                    <div className="border-t border-black/5 pt-2">
                      <span className="text-[8px] text-neutral-400 font-bold uppercase block mb-1">
                        Threat Status Solved:
                      </span>
                      <div className="flex flex-col gap-1">
                        {path.combatsHandled.map((cb, idx) => (
                          <div
                            key={idx}
                            className="text-[9.5px] text-neutral-600 leading-snug select-all"
                          >
                            &bull; {cb}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone Details row */}
              {path.bonusMilestones.length > 0 && (
                <div className="bg-white/60 p-2.5 rounded border border-black/5 text-[9.5px] text-neutral-500 uppercase flex items-center gap-1.5">
                  <span className="font-black text-neutral-400 tracking-wider">
                    Milestone Notes:
                  </span>
                  <div className="flex flex-wrap gap-2 text-neutral-700 font-bold select-all">
                    {path.bonusMilestones.map((bm, bIdx) => (
                      <span
                        key={bIdx}
                        className="bg-neutral-100 border border-neutral-300/60 px-1.5 py-0.5 rounded text-[8.5px]"
                      >
                        {bm}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
