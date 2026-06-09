import React from 'react';
import { BookOpen, Map, ShieldCheck, ArrowRight, Star } from 'lucide-react';

interface PlotItem {
  id: string;
  stageName: string;
  title: string;
  sceneTarget: string;
  category: string;
  narrativeOverview: string;
  loreFleshOut: string;
  triggers: string[];
  mechanicalImpact: string;
  difficultyRating: string;
  rewardXP: number;
}

export function PlotFlowDetails() {
  const plotBeats: PlotItem[] = [
    {
      id: 'inciting_incident',
      stageName: 'Inciting Incident',
      title: 'The Missing Boy',
      sceneTarget: 'scene_arrival_at_oakhaven',
      category: 'Phase 1: Local Unrest',
      narrativeOverview:
        "Elder Elara's young grandson, Pip, has vanished in the dense twilight fog surrounding the Swamp Border Gates. Witnesses report a blinding flash of volatile violet lightning striking the village warding stones just moments before his disappearance.",
      loreFleshOut:
        'The warding stones of Oakhaven have stood for over three centuries, drawing on the ancient pact between the founding ancestors and Vorgun the Storm Giant. The localized structural failure of the southern stone sentinel has let acidic muck and minor lightning-wisps leak into the perimeter crops. Elara fears the boy fled into the moors out of fear, or was lured by the beckoning whispers of the shifting winds.',
      triggers: [
        "Completing the introduction sequence 'seq_elara_greeting' at Oakhaven Town Center.",
        'Inspecting the cracked southern boundary obelisk with an Arcana check (DC 10).',
        'Engaging in the social dialogue chain with Elder Elara regarding the family bloodline.',
      ],
      mechanicalImpact:
        "Unlocks the coordinate paths leading beyond Oakhaven's immediate borders. Adds the 'Weeping Willow Tavern' as the primary resting hub and grants access to basic local vendor supplies.",
      difficultyRating: 'Low (Investigative)',
      rewardXP: 150,
    },
    {
      id: 'plot_point_1',
      stageName: 'Plot Point 1',
      title: 'Entering the Moors',
      sceneTarget: 'scene_journey_barrowmoors',
      category: 'Phase 2: Wilderness Hopes',
      narrativeOverview:
        'Armed with guidance from Oakhaven, the faction guards open the rusty Palisade Gates. Players step directly into the waterlogged Barrowmoors—an ancient wetland graveyard plagued by wandering storm skeletons, biting marsh vapors, and heavy rain.',
      loreFleshOut:
        'The Barrowmoors once served as a neutral burial ground where both humans and giantkin were laid to rest. In recent nights, the natural dampness has turned toxic. The water glows with a faint electric blue residue, and corpses that have slept peacefully for centuries are being violently reanimated by high-frequency energy pulses radiating from the northern mountains.',
      triggers: [
        'Leaving Oakhaven via the Swamp Palisade with a party movement action.',
        'Surviving the cold waterlogs using Constitution saving throws (DC 11) or finding dry high ground.',
        'Locating the ruined Sentinel Guard campfire outpost in Hex grid cell [0, 1].',
      ],
      mechanicalImpact:
        "Applies the 'Drenched' environmental condition to all party members, reducing fire resistance but increasing lightning conductibility. Enables the random wilderness encounter generator.",
      difficultyRating: 'Medium (Survival & Skirmish)',
      rewardXP: 250,
    },
    {
      id: 'midpoint',
      stageName: 'Midpoint',
      title: "The Thieves' Diary",
      sceneTarget: 'scene_journey_barrowmoors',
      category: 'Phase 3: The Secret Conspiracy',
      narrativeOverview:
        'Deep within a half-sunken burial barge, the party discovers the water-damaged corpses of an infamous local relic-hunting syndicate. Among their skeletal remains lies a waterlogged leather notebook revealing a dark truth about the broken pact.',
      loreFleshOut:
        "The notebook details how rogue mercenaries, hired by a high-ranking Oakhaven councilman, breached the giant's external tomb structure to extract invaluable storm-infused sapphire gems. This greedy pillaging directly shattered the ancient treaty, causing Vorgun's dormant tomb spirit to wake in an agonizing protective fury. Pip's footprints are also noted here, implying he ran toward the tomb to seek a legendary shelter.",
      triggers: [
        'Unlocking the security safe-box from the sunken burial barge using Sleight of Hand (DC 12).',
        "Succeeding in a History or Society check (DC 13) to recognize the secret coat of arms on the corpse's signet rings.",
        "Reconciling the stolen crystal ledger entries with Corbin the Barkeep's local rumors.",
      ],
      mechanicalImpact:
        "Adds the conspiracy ledger to the party's critical quest item list. Decreases the difficulty of the ultimate tomb traversal by revealing secret pressure plate coordinates.",
      difficultyRating: 'Medium (Deductive Investigation)',
      rewardXP: 300,
    },
    {
      id: 'climax',
      stageName: 'Climax',
      title: 'The Moral Choice',
      sceneTarget: 'scene_burial_chamber_climax',
      category: 'Phase 4: Climax & Resolution',
      narrativeOverview:
        "The party breaches the inner wet stone vault. Vorgun's massive spirit hovers over a cracked sarcophagus, surrounded by unstable electric spheres. The missing boy Pip is safe but trapped in an energy stasis field behind the giant.",
      loreFleshOut:
        "Vorgun is not an evil entity; his spirit is merely trapped in a volatile loop of protective shielding and sorrow due to the stolen sapphires. The party faces an ultimate crossroads: Forcefully banish the spirit using divine power (destroying the giant forever but permanently scarring the local environment), or sacrifice Oakhaven's central focal talisman to heal the broken bond and safely pacify the giant.",
      triggers: [
        'Resolving the central energy puzzle of the wet stone pillars in the burial chamber.',
        "Engaging in the ultimate combat or diplomatic social challenge of the giant's ghost.",
        'Making the terminal moral alignment selection via the UI action screen.',
      ],
      mechanicalImpact:
        'Triggers the final campaign ending movie sequence. Banishment opens up path shortcuts (+Gold, but high subsequent storm frequency), while Pacification resolves the weather matrix completely (+Fame & safety bonus).',
      difficultyRating: 'High (Combat / Dilemma)',
      rewardXP: 500,
    },
  ];

  return (
    <div
      id="plot-flow-details-panel"
      className="border border-black p-6 rounded bg-stone-50/15 flex flex-col gap-6 w-full mt-6"
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black pb-4 gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-800" />
          <h3 className="font-serif text-lg font-black uppercase tracking-wide text-neutral-900">
            Plot Flow
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded">
          <span>
            Schema Model: <b>Dynamic Campaign Matrix</b>
          </span>
        </div>
      </div>

      <p className="font-sans text-xs text-neutral-600 leading-relaxed -mt-2">
        The complete sequence of chronological narrative milestones detailing
        story progression, player objectives, campaign history, and system
        triggers.
      </p>

      {/* Grid containing separate, static narrative blocks */}
      <div className="flex flex-col gap-8">
        {plotBeats.map((beat) => (
          <div
            key={beat.id}
            id={`plot-beat-card-${beat.id}`}
            className="border border-neutral-300 rounded bg-white shadow-sm overflow-hidden font-sans text-xs"
          >
            {/* Header section with specific stage and category */}
            <div className="bg-neutral-900 text-[#F5F2E9] px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="font-mono text-[9px] uppercase text-neutral-450 font-bold block opacity-90">
                  {beat.stageName} &bull; {beat.category}
                </span>
                <h4 className="font-serif font-black text-sm uppercase tracking-wide">
                  {beat.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/10 text-white font-mono text-[9px] px-2.5 py-0.5 rounded border border-white/20">
                  Difficulty:{' '}
                  <b className="text-[#FFC107]">{beat.difficultyRating}</b>
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[9px] px-2 py-0.5 rounded border border-emerald-500/30 font-bold flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-current" />+{beat.rewardXP}{' '}
                  XP
                </span>
              </div>
            </div>

            {/* Content box of the beat */}
            <div className="p-5 flex flex-col lg:flex-row gap-6">
              {/* Left narrative and lore description */}
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <span className="font-mono text-[8.5px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                    DRAMATIC NARRATIVE OVERVIEW
                  </span>
                  <p className="font-serif text-sm font-medium text-neutral-900 leading-relaxed italic">
                    &ldquo;{beat.narrativeOverview}&rdquo;
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-3">
                  <span className="font-mono text-[8.5px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                    ELABORATE CAMPAIGN HISTORY & DETAILS
                  </span>
                  <p className="text-neutral-600 leading-relaxed text-[11px]">
                    {beat.loreFleshOut}
                  </p>
                </div>
              </div>

              {/* Right gameplay conditions and objectives */}
              <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-4 lg:pt-0 lg:pl-6 bg-neutral-50/40 p-4 rounded-lg">
                {/* Associated Scene */}
                <div>
                  <span className="font-mono text-[8.5px] font-bold text-neutral-400 uppercase block mb-1">
                    TARGET CAMPAIGN SCENE
                  </span>
                  <div className="bg-white border border-neutral-200 rounded p-2.5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <Map className="w-3.5 h-3.5 text-indigo-700" />
                      <span className="font-bold text-neutral-700">
                        {beat.sceneTarget}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                  </div>
                </div>

                {/* Criteria */}
                <div>
                  <span className="font-mono text-[8.5px] font-bold text-neutral-400 uppercase block mb-1 font-semibold">
                    REQUIRED PROSECUTION CRITERIA
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {beat.triggers.map((trigger, i) => (
                      <li
                        key={i}
                        className="flex gap-2 items-start text-neutral-600 text-[10.5px] leading-tight font-mono"
                      >
                        <span className="text-indigo-700 font-bold shrink-0">
                          ◇
                        </span>
                        <span>{trigger}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Consequences */}
                <div className="border-t border-neutral-200/80 pt-3 mt-1">
                  <span className="font-mono text-[8.5px] font-bold text-neutral-400 uppercase block mb-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" /> SYSTEM
                    RESOLUTION EFFECTS:
                  </span>
                  <p className="text-neutral-700 text-[10.5px] font-mono leading-relaxed bg-[#FDFCF7] p-2.5 border border-amber-200/40 rounded italic shadow-sm">
                    {beat.mechanicalImpact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
