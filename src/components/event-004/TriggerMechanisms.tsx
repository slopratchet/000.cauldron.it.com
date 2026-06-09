import React from 'react';
import {
  Zap,
  Activity,
  Clock,
  Flame,
  ShieldAlert,
  Sparkles,
  Volume2,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  Skull,
  TrendingUp,
  Compass,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface SystemTriggerDetail {
  id: string;
  triggerName: string;
  triggeringCause: string;
  executionFrequency: string;
  resultingImpact: string;
  icon: React.ElementType;
  badgeStyle: string;
  cardStyle: string;
  conditionCheck?: string;
}

const DETAILED_TRIGGERS: SystemTriggerDetail[] = [
  {
    id: 'per_hour_outdoor',
    triggerName: 'Trigger: per_hour_outdoor',
    triggeringCause:
      'Party travels over coordinates on the outdoor hex grid, or is actively moving within wilderness locations. Each simulated clock hour advancement triggers this check.',
    executionFrequency:
      'Every 1 hour of simulated campaign travel or outdoor exploration time.',
    resultingImpact:
      'Drives atmospheric shifts, updates weather intensity vectors (such as escalating the Runic Tempest levels), and rolls for random environmental encounters.',
    icon: Clock,
    badgeStyle: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    cardStyle: 'border-indigo-150 bg-indigo-50/10',
    conditionCheck: "is_outdoors == true AND travel_activity == 'active'",
  },
  {
    id: 'nighttime_check',
    triggerName: 'Trigger: nighttime_check',
    triggeringCause:
      'The active clock shifts past 18:00 (Evening) or the party initiates a prolonged rest segment in the open wilderness without proper protective magical safety wards.',
    executionFrequency:
      'Triggered instantly at the transition check block from daylight to night status.',
    resultingImpact:
      'Initiates specialized night phase tables. Restless phantoms/apparitions manifest, local monster detection ranges double, and ambient lighting is dynamically dimmed.',
    icon: Moon,
    badgeStyle: 'bg-purple-50 border-purple-200 w-max text-purple-700',
    cardStyle: 'border-purple-150 bg-purple-50/10',
    conditionCheck: 'game_time >= 18:00 OR duration_hours >= 6',
  },
  {
    id: 'dawn_automation',
    triggerName: 'Trigger: dawn_automation_action',
    triggeringCause:
      'The active simulator master clock reaches exactly 06:00 (Dawn). Sunlight begins to rise and break through local heavy cloud covers.',
    executionFrequency:
      'Runs exactly once per simulated day cycle at dawn transition (06:00).',
    resultingImpact:
      'Clears night phase sneaking attributes, resets standard character search action pools, and sweeps low-grade night apparitions from tactical grid zones.',
    icon: Sun,
    badgeStyle: 'bg-amber-50 border-amber-200 text-amber-700 w-max',
    cardStyle: 'border-amber-150 bg-amber-50/10',
    conditionCheck: 'game_time == 06:00 AND cycle_complete == false',
  },
  {
    id: 'dusk_automation',
    triggerName: 'Trigger: dusk_automation_action',
    triggeringCause:
      'The active simulator master clock reaches exactly 18:00 (Dusk) as daytime light fades out entirely.',
    executionFrequency:
      'Runs exactly once per simulated day cycle at dusk transition (18:00).',
    resultingImpact:
      'Dims localized lighting layers, deploys town active lantern assets, triggers night patrols, and shifts character stealth and visibility thresholds.',
    icon: Moon,
    badgeStyle: 'bg-zinc-100 border-zinc-200 text-zinc-700 w-max',
    cardStyle: 'border-zinc-200 bg-zinc-50/10',
    conditionCheck: 'game_time == 18:00 AND cycle_complete == false',
  },
  {
    id: 'spellcast_detected',
    triggerName: 'Trigger: spellcast_detected',
    triggeringCause:
      'An active spell or runic ritual is cast within the boundaries of the electrified storm domain. The high spell energy acts as an antenna drawing local magic particles.',
    executionFrequency:
      'Immediately upon casting any dynamic level spell or activating Leyline artifacts.',
    resultingImpact:
      'Triggers a Wild Magic surge probability matrix. Results in runic electromagnetic interference, flashing aurora discharges, or flickering static fields.',
    icon: Sparkles,
    badgeStyle: 'bg-blue-50 border-blue-2 w-max text-blue-700',
    cardStyle: 'border-blue-150 bg-blue-50/10',
    conditionCheck:
      'arcane_power_expended > 0 AND magical_suppression_active == false',
  },
  {
    id: 'every_six_turns',
    triggerName: 'Trigger: every_six_turns',
    triggeringCause:
      'Sloppy, static pacing, extreme physical stagnation, or excessive checking of identical spots within the grid-based dungeon rooms.',
    executionFrequency:
      'Checked once every six consecutive game turns during stagnant exploration status.',
    resultingImpact:
      'Fires structural stress responses. Prompts geological tremor events, ceiling dust collapse warnings, or shifting brick structures to force progression.',
    icon: Activity,
    badgeStyle: 'bg-rose-50 border-rose-2 w-max text-rose-700',
    cardStyle: 'border-rose-150 bg-rose-50/10',
    conditionCheck: 'consecutive_idle_turns >= 6',
  },
  {
    id: 'per_round_combat',
    triggerName: 'Trigger: per_round_combat',
    triggeringCause:
      'Entering active combat state against elite threats. Aggressive combat actions or clashes generate severe weapon and magical field friction.',
    executionFrequency:
      'Fired automatically at the completion of each individual combat initiative round.',
    resultingImpact:
      'Localized lightning bolts strike metallic high points randomly, imposing heavy kinetic lightning hazards on combatants regardless of position.',
    icon: Flame,
    badgeStyle: 'bg-red-50 border-red-2 w-max text-red-700',
    cardStyle: 'border-red-150 bg-red-50/10',
    conditionCheck:
      "combat_state == 'active' AND is_environmental_round == true",
  },
  {
    id: 'pool_reaches_max',
    triggerName: 'Trigger: pool_reaches_max',
    triggeringCause:
      'Tension dice accumulate in the pool (due to stealth check failures or overly long rests) up to the absolute limit set by the current tier guidelines.',
    executionFrequency:
      'Instantly fires once the current dice count matches the pool maximum capacity (Max: 6, 8 or 10).',
    resultingImpact:
      'Forces an immediate maximum-tension bypass cascade. The entire accumulated pool must be rolled immediately, provoking severe complications.',
    icon: ShieldAlert,
    badgeStyle: 'bg-amber-50 border-amber-2 w-max text-amber-700',
    cardStyle: 'border-amber-150 bg-amber-50/10',
    conditionCheck: 'current_tension_pool_dice >= maximum_die_capacity',
  },
  {
    id: 'loud_noise',
    triggerName: 'Trigger: player_action:loud_noise',
    triggeringCause:
      'Uncaring or clumsy actions by characters, such as blowing open stone crypt doors with gunpowder, detonating sonic wards, or shouting close to echo-chambers.',
    executionFrequency:
      'Fires in real-time each time an acoustic-breaching activity occurs.',
    resultingImpact:
      'Instantly alerts nearby wandering monsters, adds permanent penalties to subsequent party stealth checks, and triggers immediate stress checks.',
    icon: Volume2,
    badgeStyle: 'bg-emerald-50 border-emerald-2 w-max text-emerald-700',
    cardStyle: 'border-emerald-150 bg-emerald-50/10',
    conditionCheck:
      'acoustic_decibel_level > 80 AND detection_immunity == false',
  },
  // --- TEN NEW DEDICATED TRIGGERS ---
  {
    id: 'trap_triggered',
    triggerName: 'Trigger: player_action:trigger_trap',
    triggeringCause:
      'Rolling below the required disarm safety margin on physical traps, or stepping blind onto pressure-actuated obsidian floor stone plates.',
    executionFrequency:
      'Evaluated instantaneously on physical zone cell intersection check.',
    resultingImpact:
      'Launches heavy iron spikes, floods the room coordinates with sleeping gas, or triggers a localized ceiling cave-in hazard screen.',
    icon: Skull,
    badgeStyle: 'bg-red-100 border-red-350 text-red-800',
    cardStyle: 'border-red-200 bg-red-50/5',
    conditionCheck:
      'trap_detection_check_failed == true AND mechanical_disarm_failed == true',
  },
  {
    id: 'rest_interrupted',
    triggerName: 'Trigger: rest_interrupted',
    triggeringCause:
      'Setting camp inside designated red high-risk lair segments without placing tripwire wards or maintaining awake watch schedules.',
    executionFrequency: 'Checked once per 4 hours of sleeping status.',
    resultingImpact:
      'Interrupts healing loops, cancels temporary stamina buffs, and initiates a surprise combat segment with nearby skirmishers.',
    icon: AlertTriangle,
    badgeStyle: 'bg-rose-100 border-rose-300 text-rose-800',
    cardStyle: 'border-rose-150 bg-rose-50/5',
    conditionCheck: 'wilderness_rest_ongoing == true AND shelter_level < 3',
  },
  {
    id: 'leyline_resonance',
    triggerName: 'Trigger: leyline_resonance',
    triggeringCause:
      'Approaching ancient standing stone obelisks or runic circle formations while transporting high-concentrate charged magic catalyst crystals.',
    executionFrequency:
      'Fires instantly when entering coordinates adjacent to standing monolith structures.',
    resultingImpact:
      "Increases the caster's magical spell power by +2 ranks while doubling wild spellcasting anomaly risks for standard combat turns.",
    icon: Sparkles,
    badgeStyle: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    cardStyle: 'border-cyan-150 bg-cyan-50/5',
    conditionCheck:
      'leyline_overload_ratio >= 0.50 AND crystal_charge_level > 0',
  },
  {
    id: 'stealth_detection',
    triggerName: 'Trigger: stealth_detection_check',
    triggeringCause:
      'Sneaking directly into the visual arc vectors of guards while wearing noisy heavy metal plate mail or carrying exposed torch flames.',
    executionFrequency:
      'Checked during each movement tick across targeted hostile security zones.',
    resultingImpact:
      'Blows character cover completely, triggers localized warning sirens, and shifts active monsters into search-and-destroy protocols.',
    icon: Shield,
    badgeStyle: 'bg-amber-100 border-amber-300 text-amber-800',
    cardStyle: 'border-amber-150 bg-amber-50/5',
    conditionCheck: 'stealth_roll_result < target_perception_rating',
  },
  {
    id: 'temperature_drop',
    triggerName: 'Trigger: temperature_drop_check',
    triggeringCause:
      'Reaching subterranean flooded tomb coordinates far below ground levels, or when external mountain blizzards transition into violent storms.',
    executionFrequency: 'Checked once every hour of deep exploration.',
    resultingImpact:
      'Inflicts cold-exposure fatigue. Disables standard passive health regeneration until warm campfires are stoked or insulated cloaks are donned.',
    icon: ShieldAlert,
    badgeStyle: 'bg-blue-100 border-blue-200 text-blue-800',
    cardStyle: 'border-blue-100 bg-blue-50/5',
    conditionCheck:
      'subterranean_depth_meters >= 100 OR blizzard_storm_active == true',
  },
  {
    id: 'item_identified',
    triggerName: 'Trigger: player_action:identify_artifact',
    triggeringCause:
      'Employing specialized high-level appraisal scrolls or holding relics under holy cleansing fonts built in village centers.',
    executionFrequency: 'Fires on user command resolution.',
    resultingImpact:
      'Unlocks bonus lore narratives, details weapon combat statistics, and screens for deep soul-bound curses before equipping items.',
    icon: Lightbulb,
    badgeStyle: 'bg-emerald-100 border-emerald-250 text-emerald-800',
    cardStyle: 'border-emerald-150 bg-emerald-50/5',
    conditionCheck:
      'appraisal_tool_present == true OR sanctuary_font_active == true',
  },
  {
    id: 'threat_escalation',
    triggerName: 'Trigger: threat_escalation',
    triggeringCause:
      'Allowing alert level gauges in security networks to reach maximum threshold, such as repeatedly raising tension parameters.',
    executionFrequency: 'Instantly upon alert gauges reaching level 5.',
    resultingImpact:
      'Spawns heavy iron Vanguard patrols, strengthens secondary lock defenses on doors, and doubles loot parameters for high-risk payouts.',
    icon: TrendingUp,
    badgeStyle: 'bg-orange-50 border-orange-200 text-orange-850',
    cardStyle: 'border-orange-100 bg-orange-50/5',
    conditionCheck: 'security_network_alert_level >= 5',
  },
  {
    id: 'flee_attempt',
    triggerName: 'Trigger: player_action:flee_combat',
    triggeringCause:
      'Declaring a desperate escape retreat during active skirmish steps when current hitpoints reach a critically low state.',
    executionFrequency: 'Checked in real-time when the flee command triggers.',
    resultingImpact:
      'Triggers immediate free opportunity attacks for surrounding foes, and drops random non-equipped items to facilitate escape speed.',
    icon: Compass,
    badgeStyle: 'bg-violet-100 border-violet-250 text-violet-850',
    cardStyle: 'border-violet-150 bg-violet-50/5',
    conditionCheck:
      'combat_flee_declared == true AND surrounding_foes_count > 0',
  },
  {
    id: 'merchant_refresh',
    triggerName: 'Trigger: village_stock_refresh',
    triggeringCause:
      'Advancing the core story quest stages to new chapters or returning after major victories over legendary tomb entities.',
    executionFrequency:
      'Fired upon entering hamlet cells after key quest updates.',
    resultingImpact:
      'Restores empty vendor supply sheets with superior grade potions, higher quality shields, and enchanted materials.',
    icon: HelpCircle,
    badgeStyle: 'bg-teal-50 border-teal-200 text-teal-850',
    cardStyle: 'border-teal-100 bg-teal-50/5',
    conditionCheck:
      'major_quest_stage_updated == true OR returning_from_completed_tomb == true',
  },
  {
    id: 'npc_hostility',
    triggerName: 'Trigger: npc_hostility_check',
    triggeringCause:
      'Failing high-stakes persuasion checks, uttering physical threats, or attempting to pickpocket regional quest givers during active dialog loops.',
    executionFrequency: 'Checked at dialogue node termination.',
    resultingImpact:
      'Shifts regional faction standing instantly to hostile, prevents future trade, and disables primary dialogue paths within Oakhaven village.',
    icon: Activity,
    badgeStyle: 'bg-stone-200 border-stone-300 text-stone-800',
    cardStyle: 'border-stone-200 bg-stone-100/10',
    conditionCheck:
      'dialog_persuasion_failed == true OR critical_theft_failure == true',
  },
  {
    id: 'per_hex_traveled',
    triggerName: 'Trigger: per_hex_traveled',
    triggeringCause:
      'The party-controlled token moves exactly one hex coordinate block across the outdoor regional map layer.',
    executionFrequency:
      'Checked once per hex cell boundary crossed during active wilderness travel states.',
    resultingImpact:
      'Prompts a roll on the Storm Echoes Table, potentially inducing mystical atmospheric shifts, lightning flashes, or sound echoes.',
    icon: Compass,
    badgeStyle: 'bg-teal-50 border-teal-200 text-teal-800',
    cardStyle: 'border-teal-150 bg-teal-50/5',
    conditionCheck:
      'hex_boundary_crossed == true AND current_movement_speed > 0',
  },
  {
    id: 'on_failed_navigation',
    triggerName: 'Trigger: on_failed_navigation',
    triggeringCause:
      'The party rolls a failure margin on their wilderness orientation check or pathfinding attempt.',
    executionFrequency:
      'Occurs immediately upon declaring a failed coordinate pathfinding outcome.',
    resultingImpact:
      'Forces an instant roll on the Wilderness Hazards Table, triggering swamp gas pockets, quicksand, or spore eruptions.',
    icon: AlertTriangle,
    badgeStyle: 'bg-rose-50 border-rose-200 text-rose-800',
    cardStyle: 'border-rose-150 bg-rose-50/5',
    conditionCheck: 'pathfinding_roll_result < 10',
  },
  {
    id: 'on_investigate_barrow_grave',
    triggerName: 'Trigger: on_investigate_barrow_grave',
    triggeringCause:
      'A character deploys physical inspection, archeological digging, or magical scanning tools on any tomb or grave coordinate.',
    executionFrequency:
      'Checked on completing a full search Action block inside old barrow graves.',
    resultingImpact:
      'Initiates a lookup on the Ancient Barrows Treasure Cache roll matrix to distribute historical findings and magical relic items.',
    icon: Sparkles,
    badgeStyle: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    cardStyle: 'border-indigo-150 bg-indigo-50/5',
    conditionCheck:
      'search_action_duration_hours >= 1 AND barrow_coordinate_match == true',
  },
  // --- SIX NEW SPECIFIC TRIGGERS FOR THE USER REQUEST ---
  {
    id: 'on_touch_giant_effigy',
    triggerName: 'Trigger: on_touch_giant_effigy',
    triggeringCause:
      'Direct physical touch or interaction sequence with a consecrated monument effigy of the sleeping giants.',
    executionFrequency:
      'Checked instantly upon player touch attempt inputs without prior neutralizing rituals.',
    resultingImpact:
      'Triggers electric feedback shock hazards or reveals hidden passcodes to sealed chambers.',
    icon: Zap,
    badgeStyle: 'bg-blue-50 border-blue-200 text-blue-700',
    cardStyle: 'border-blue-150 bg-blue-50/5',
    conditionCheck: 'is_outdoors == true AND has_relic_shield == false',
  },
  {
    id: 'on_failed_stealth_tomb',
    triggerName: 'Trigger: on_failed_stealth_tomb',
    triggeringCause:
      "Stealth check roll falls below the tomb's ambient sound-dampening acoustic barrier margin.",
    executionFrequency:
      'Evaluated instantly on failed active sneak maneuvers inside subterranean burial crypt cells.',
    resultingImpact:
      'Alerts resting tomb guardian skeletal forces and adds +1 die to the active Tension Pool.',
    icon: ShieldAlert,
    badgeStyle: 'bg-red-50 border-red-2 w-max text-red-700',
    cardStyle: 'border-red-150 bg-red-50/5',
    conditionCheck:
      "stealth_roll_result < 12 AND location_type == 'subterranean_tomb'",
  },
  {
    id: 'on_forage_swamp',
    triggerName: 'Trigger: on_forage_swamp',
    triggeringCause:
      'Engaging in foraging activities for wild mosses or spell reagents in the damp boglands.',
    executionFrequency:
      'Evaluated during active resource-gathering action phases in swamp coordinates.',
    resultingImpact:
      'Yields swamp mushrooms (+3 Alchemy Reagents) or triggers deep silt sinkhole hazard rolls.',
    icon: Compass,
    badgeStyle: 'bg-teal-50 border-teal-200 text-teal-800',
    cardStyle: 'border-teal-150 bg-teal-50/5',
    conditionCheck:
      "action_type == 'forage_reagents' AND weather_intensity_severity >= 3",
  },
  {
    id: 'on_entering_undiscovered_crypt',
    triggerName: 'Trigger: on_entering_undiscovered_crypt',
    triggeringCause:
      'Crossing boundary thresholds into a newly mapped crypt location marker structure.',
    executionFrequency:
      'Fires exactly once when exploring previously hidden underground barrow coordinates.',
    resultingImpact:
      'Distributes discovery XP, deploys ambient dim light effects, and loads initial room monster arrays.',
    icon: Sparkles,
    badgeStyle: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    cardStyle: 'border-indigo-150 bg-indigo-50/5',
    conditionCheck:
      'crypt_mapped_state == false AND party_hex_intersection == crypt_entrance',
  },
  {
    id: 'on_decipher_runes',
    triggerName: 'Trigger: on_decipher_runes',
    triggeringCause:
      'Attempting to read or translate the glowing ancient monumental runic scripts inscribed on tomb walls.',
    executionFrequency: 'Checked on active investigation command completion.',
    resultingImpact:
      'Reveals ancient giant history archives, lore snippets, or misfires a minor explosive runes trap.',
    icon: Lightbulb,
    badgeStyle: 'bg-emerald-100 border-emerald-250 text-emerald-800',
    cardStyle: 'border-emerald-150 bg-emerald-50/5',
    conditionCheck:
      'character_language_comprehension_skills.giant_dialect >= 1',
  },
  {
    id: 'hourly_climate_shift',
    triggerName: 'Trigger: hourly_climate_shift',
    triggeringCause:
      'The automated regional calendar clock advances by exactly one full weather scheduling hour.',
    executionFrequency:
      'Evaluated every 60 real-time simulated environment explorer ticks.',
    resultingImpact:
      'Cycles outdoor atmospheric weather states, drifting storm centers and updating ambient mist densities.',
    icon: Clock,
    badgeStyle: 'bg-zinc-100 border-zinc-200 text-zinc-700 w-max',
    cardStyle: 'border-zinc-200 bg-zinc-50/10',
    conditionCheck:
      "simulation_ticks % 60 == 0 AND current_zone_layer == 'outdoor_wilderness'",
  },
];

const TRIGGER_LABELS: Record<string, string> = {
  per_hour_outdoor: 'HOURLY TRAVEL',
  nighttime_check: 'NIGHT PHASE',
  dawn_automation: 'DAWN RESET',
  dusk_automation: 'DUSK PHASE',
  spellcast_detected: 'ARCANE DETECT',
  every_six_turns: 'PACE INTERVAL',
  per_round_combat: 'ROUND DYNAMICS',
  pool_reaches_max: 'TENSION REACH',
  loud_noise: 'ACOUSTIC ALERT',
  trap_triggered: 'HAZARD ACTION',
  rest_interrupted: 'REST INTERRUPT',
  leyline_resonance: 'LEYLINE GAIN',
  stealth_detection: 'STEALTH STATE',
  temperature_drop: 'CLIMATE UPDATE',
  item_identified: 'APPRAISAL CMD',
  threat_escalation: 'VANGUARD SPAWN',
  flee_attempt: 'TACTICAL FLEE',
  merchant_refresh: 'STOCK RESTOCK',
  npc_hostility: 'NPC DIALOGUE',
  per_hex_traveled: 'HEX STEPPING',
  on_failed_navigation: 'NAVIGATION FAIL',
  on_investigate_barrow_grave: 'GRAVE EXPLORE',
  on_touch_giant_effigy: 'EFFIGY REACTION',
  on_failed_stealth_tomb: 'TOMB ALERT',
  on_forage_swamp: 'SWAMP FORAGE',
  on_entering_undiscovered_crypt: 'CRYPT EXP XP',
  on_decipher_runes: 'RUNES TRANSLATE',
  hourly_climate_shift: 'WEATHER CYCLE',
};

export function TriggerMechanisms({ subject }: { subject: unknown }) {
  // Sort the triggers list alphabetically by clean display name
  const sortedTriggers = [...DETAILED_TRIGGERS].sort((a, b) => {
    const nameA = a.triggerName
      .replace(/^Trigger:\s*/i, '')
      .replace(/^Script:\s*/i, '')
      .toLowerCase();
    const nameB = b.triggerName
      .replace(/^Trigger:\s*/i, '')
      .replace(/^Script:\s*/i, '')
      .toLowerCase();
    return nameA.localeCompare(nameB);
  });

  // Split the triggers list evenly into 2 columns for a clean sidebar-free grid
  const midIndex = Math.ceil(sortedTriggers.length / 2);
  const column1Triggers = sortedTriggers.slice(0, midIndex);
  const column2Triggers = sortedTriggers.slice(midIndex);

  return (
    <section
      id="section-trigger-mechanisms"
      className="border border-black p-6 rounded bg-[#FCFAF2] flex flex-col gap-6 select-all"
    >
      <div className="flex items-center gap-2 border-b border-black pb-3">
        <Zap className="w-5 h-5 text-indigo-700 animate-pulse" />
        <h2 className="font-serif text-xl font-black uppercase tracking-wide text-neutral-900">
          Triggers
        </h2>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-[10px]">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          {column1Triggers.map((t) => {
            const IconComponent = t.icon;
            return (
              <div
                key={t.id}
                className={`p-4 rounded border border-neutral-900 bg-white ${t.cardStyle.replace(/border-[a-z0-9-]+/g, '')} flex flex-col gap-2.5 transition-all shadow-xs`}
              >
                <div className="flex justify-between items-start gap-1">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-neutral-800" />
                    <span className="font-black text-neutral-900 leading-tight uppercase select-all">
                      {t.triggerName
                        .replace(/^Trigger:\s*/i, '')
                        .replace(/^Script:\s*/i, '')}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] font-mono px-1.5 py-0.5 border rounded uppercase font-bold text-center ${t.badgeStyle}`}
                  >
                    {TRIGGER_LABELS[t.id] || 'ACTIVE PROTOCOL'}
                  </span>
                </div>

                <div className="text-neutral-700 select-all leading-relaxed">
                  <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                    Triggering Cause:
                  </span>
                  {t.triggeringCause}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-black/5 pt-2">
                  <div>
                    <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                      Check Frequency:
                    </span>
                    <span className="text-neutral-600 select-all">
                      {t.executionFrequency}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                      System Consequence:
                    </span>
                    <span className="text-neutral-600 select-all">
                      {t.resultingImpact}
                    </span>
                  </div>
                </div>

                {t.conditionCheck && (
                  <div className="border-t border-black/5 pt-2 flex flex-col gap-0.5">
                    <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                      Condition check:
                    </span>
                    <code className="text-rose-700 bg-rose-50/50 px-1.5 py-0.5 rounded border border-rose-200/50 text-[9px] font-bold w-fit font-mono">
                      {t.conditionCheck}
                    </code>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          {column2Triggers.map((t) => {
            const IconComponent = t.icon;
            return (
              <div
                key={t.id}
                className={`p-4 rounded border border-neutral-900 bg-white ${t.cardStyle.replace(/border-[a-z0-9-]+/g, '')} flex flex-col gap-2.5 transition-all shadow-xs`}
              >
                <div className="flex justify-between items-start gap-1">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-neutral-800" />
                    <span className="font-black text-neutral-900 leading-tight uppercase select-all">
                      {t.triggerName
                        .replace(/^Trigger:\s*/i, '')
                        .replace(/^Script:\s*/i, '')}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] font-mono px-1.5 py-0.5 border rounded uppercase font-bold text-center ${t.badgeStyle}`}
                  >
                    {TRIGGER_LABELS[t.id] || 'ACTIVE PROTOCOL'}
                  </span>
                </div>

                <div className="text-neutral-700 select-all leading-relaxed">
                  <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                    Triggering Cause:
                  </span>
                  {t.triggeringCause}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-black/5 pt-2">
                  <div>
                    <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                      Check Frequency:
                    </span>
                    <span className="text-neutral-600 select-all">
                      {t.executionFrequency}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                      System Consequence:
                    </span>
                    <span className="text-neutral-600 select-all">
                      {t.resultingImpact}
                    </span>
                  </div>
                </div>

                {t.conditionCheck && (
                  <div className="border-t border-black/5 pt-2 flex flex-col gap-0.5">
                    <span className="font-bold text-neutral-400 uppercase text-[8px] block">
                      Condition check:
                    </span>
                    <code className="text-rose-700 bg-rose-50/50 px-1.5 py-0.5 rounded border border-rose-200/50 text-[9px] font-bold w-fit font-mono">
                      {t.conditionCheck}
                    </code>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Timecoded Triggers Ledger Section */}
      <div className="border bg-white mt-4 p-5 rounded border-neutral-300 shadow-sm font-sans">
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2.5 mb-4">
          <Clock className="w-4 h-4 text-indigo-700" />
          <h3 className="font-serif text-sm font-black uppercase text-neutral-900 tracking-wide">
            Timecoded Triggers
          </h3>
        </div>
        <p className="text-neutral-600 text-[11px] mb-4 leading-relaxed">
          The following diagnostic ledger maps active system triggers onto
          specific campaign timeframes and operational scenarios, helping path
          planners anticipate real-time game state updates.
        </p>

        <div className="flex flex-col gap-6">
          {[
            {
              categoryName: 'Campaign Daily Cycles',
              description:
                'Scheduled automation events triggered as the campaign master clock moves through day and night phases.',
              triggers: [
                {
                  timecode: '06:00:00',
                  name: 'Dawn Phase Automation Reset',
                  id: 'dawn_automation',
                },
                {
                  timecode: '12:00:00',
                  name: 'Spontaneous Merchant Inventory Refresh',
                  id: 'merchant_refresh',
                },
                {
                  timecode: '18:00:00',
                  name: 'Dusk Phase Lamp Deployments',
                  id: 'dusk_automation',
                },
                {
                  timecode: '22:00:00',
                  name: 'Nighttime Apparition Wilderness Spawns',
                  id: 'nighttime_check',
                },
              ],
            },
            {
              categoryName: 'Combat Round Increments',
              description:
                'Real-time action increments and stalemate breakers checked during active skirmish tracking.',
              triggers: [
                {
                  timecode: 'T+0:00:06 (Round 1)',
                  name: 'Dynamic Lightning Bolt Strike Hazard',
                  id: 'per_round_combat',
                },
                {
                  timecode: 'T+0:00:36 (Round 6)',
                  name: 'Dungeon Ceiling Tremor Event Check',
                  id: 'every_six_turns',
                },
                {
                  timecode: 'T+0:01:00 (Round 10)',
                  name: 'Vanguard Patrol Spawns & Lock Reinforcement',
                  id: 'threat_escalation',
                },
                {
                  timecode: 'T+0:01:12 (Round 12)',
                  name: 'Desperate Retreat Counter Opportunity Attack',
                  id: 'flee_attempt',
                },
              ],
            },
            {
              categoryName: 'Hazard & Exploration Intervals',
              description:
                'Interval triggers that track party resource depletion, noise levels, and spatial security parameters.',
              triggers: [
                {
                  timecode: 'T+0:10:00',
                  name: 'Acoustic Breaching Detection Alert',
                  id: 'player_action:loud_noise',
                },
                {
                  timecode: 'T+0:30:00',
                  name: 'Pressure Plate Actuator Activation',
                  id: 'player_action:trigger_trap',
                },
                {
                  timecode: 'T+1:00:00',
                  name: 'Cold Exposure Fatigue Status Update',
                  id: 'temperature_drop_check',
                },
                {
                  timecode: 'T+4:00:00',
                  name: 'Unwarded Rest Complication Sweep',
                  id: 'rest_interrupted',
                },
              ],
            },
          ].map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="bg-neutral-50/70 p-4 border border-neutral-200 rounded flex flex-col gap-3"
            >
              <div>
                <span className="font-mono font-bold text-neutral-400 uppercase text-[8px] tracking-[0.05em] block">
                  Category:
                </span>
                <span className="font-serif font-black text-xs text-neutral-900 uppercase">
                  {group.categoryName}
                </span>
                <p className="text-[10px] text-neutral-500 mt-0.5 leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-col border border-neutral-200 rounded bg-white overflow-hidden font-mono text-[10.5px]">
                {group.triggers.map((trigger, triggerIdx) => (
                  <div
                    key={trigger.id}
                    className={`grid grid-cols-1 md:grid-cols-2 items-center hover:bg-neutral-50/50 transition-colors ${
                      triggerIdx !== group.triggers.length - 1
                        ? 'border-b border-neutral-200'
                        : ''
                    }`}
                  >
                    {/* Timecode Column */}
                    <div className="p-3 bg-neutral-50 border-r border-neutral-200 flex items-center gap-2">
                      <span className="text-neutral-400 text-[8.5px] font-bold">
                        TIMECODE
                      </span>
                      <code className="bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded leading-none text-[9.5px] font-bold">
                        {trigger.timecode}
                      </code>
                    </div>

                    {/* Name & ID Column */}
                    <div className="p-3 flex justify-between items-center gap-4 flex-wrap">
                      <div className="flex flex-col select-all">
                        <span className="font-bold text-neutral-900 font-sans">
                          {trigger.name}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">
                            ID:
                          </span>
                          <code className="text-[9px] bg-neutral-100 text-neutral-600 px-1 py-0.1 rounded font-bold">
                            {trigger.id}
                          </code>
                        </div>
                      </div>
                      <span className="text-[8px] bg-indigo-50 border border-indigo-200/50 text-indigo-700 px-1.5 py-0.5 rounded font-bold leading-none uppercase">
                        SCHEDULED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
