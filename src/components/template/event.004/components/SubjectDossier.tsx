/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Adventure } from '../types';
import { applyArachnophobiaFilter, sanitizeLabel } from '../utils';
import {
  ShieldAlert,
  HelpCircle,
  Moon,
  Clock,
  Dice5,
  Volume2,
  VolumeX,
  Sun,
  Users,
  Compass,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Square,
  Play,
  RotateCcw,
  Database,
  Key,
  Code,
  Scroll,
  Search,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
} from 'lucide-react';

interface SubjectDossierProps {
  subject: Adventure;
  onUpdateSubject: (updated: Adventure) => void;
  filterArachnophobia: boolean;
  setFilterArachnophobia: (val: boolean) => void;
}

export default function SubjectDossier({
  subject,
  onUpdateSubject,
  filterArachnophobia,
  setFilterArachnophobia,
}: SubjectDossierProps) {
  // Soundscape audio simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioKey, setActiveAudioKey] =
    useState<string>('bgm_storm_exterior');
  const [audioVolume, setAudioVolume] = useState(50);

  // Schema Manifest System states
  const [manifestActiveTab, setManifestActiveTab] = useState<
    'LORE' | 'ENTITIES' | 'SYSTEM' | 'RAW_GRAPH'
  >('RAW_GRAPH');
  const [revealedSecrets, setRevealedSecrets] = useState<
    Record<string, boolean>
  >({});
  const [jsonSearchQuery, setJsonSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    meta: true,
    definitions: true,
    world_state: true,
  });

  // Tension pool states
  const [rollingTension, setRollingTension] = useState(false);
  const [tensionRollResults, setTensionRollResults] = useState<number[]>([]);
  const [tensionComplicationTriggered, setTensionComplicationTriggered] =
    useState(false);
  const [historyLogs, setHistoryLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timeStr = new Date().toLocaleTimeString();
    setHistoryLogs((prev) => [`[${timeStr}] ${msg}`, ...prev.slice(0, 15)]);
  };

  // Helper to scrub text using the current filter state
  const scrub = (txt: string) => {
    const config =
      subject.safety_and_accessibility.dynamic_filters.filter_arachnophobia;
    return applyArachnophobiaFilter(txt, filterArachnophobia, config);
  };

  // Manage Soundscape playback transitions
  const triggerAudioToggle = () => {
    setIsPlayingAudio((prev) => !prev);
    addLog(
      `SOUNDSCAPE TRANSITION: ${!isPlayingAudio ? `PLAYING TRACK "${activeAudioKey.toUpperCase()}"` : 'SOUNDSCAPE PAUSED'}`,
    );
  };

  const changeAudioTrack = (key: string) => {
    setActiveAudioKey(key);
    setIsPlayingAudio(true);
    addLog(`SOUNDSCAPE: ENGAGED SYSTEM TRACK "${key.toUpperCase()}"`);
  };

  // Time navigation functions
  const advanceTime = (hours: number) => {
    const [hStr, mStr] = subject.world_state.current_time_of_day.split(':');
    let h = parseInt(hStr);
    const m = parseInt(mStr);

    h = (h + hours) % 24;
    const nextTimeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    const nextElapsed = subject.world_state.time_elapsed_hours + hours;

    // Check procedures on dawn/dusk / transitions
    let sideEffect = '';
    if (h >= 18 && parseInt(hStr) < 18) {
      sideEffect = ` [PROCEDURAL ALERT: Dusk trigger triggered '${subject.chronology.daily_cycle.on_dusk.proc_id}']`;
      addLog(`ENVIRONMENT: Sunset crossing recorded. Storm intensity rising!`);
    } else if (h >= 6 && parseInt(hStr) < 6) {
      sideEffect = ` [PROCEDURAL ALERT: Dawn trigger triggered '${subject.chronology.daily_cycle.on_dawn.proc_id}']`;
      addLog(
        `ENVIRONMENT: Sunrise crossing recorded. Leyline resonance spiking!`,
      );
    }

    onUpdateSubject({
      ...subject,
      world_state: {
        ...subject.world_state,
        current_time_of_day: nextTimeStr,
        time_elapsed_hours: nextElapsed,
      },
    });

    addLog(
      `TIME TRAVEL: ADVANCED ${hours} HOUR(S). TIME NOW: ${nextTimeStr} (TOTAL: ${nextElapsed} HRS)${sideEffect}`,
    );
  };

  // Roll Tension Pool
  const rollTensionPool = () => {
    if (rollingTension) return;
    setRollingTension(true);
    setTensionComplicationTriggered(false);
    addLog(
      `TENSION SEED: INITIATING CORES LEVEL SCAN AGAINST ${subject.world_state.tension_pool_current_dice} d6 COGNIZANCES...`,
    );

    setTimeout(() => {
      const results: number[] = [];
      const count = subject.world_state.tension_pool_current_dice;
      let hasOne = false;

      for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        results.push(roll);
        if (roll === 1) hasOne = true;
      }

      setTensionRollResults(results);
      setRollingTension(false);

      if (hasOne) {
        setTensionComplicationTriggered(true);
        addLog(
          `!!! TENSION FAILURE: ROLLED A '1' IN THE POOL! COMPLICATION '${subject.tension_engine.pool_mechanic.on_roll_complication.proc_id}' DETECTED !!!`,
        );

        // Dynamic complication modifier
        setTimeout(() => {
          setTensionComplicationTriggered(false);
        }, 4000);
      } else {
        addLog(`TENSION STABLE: POOL RESOLVED SAFELY [${results.join(', ')}]`);
      }
    }, 1200);
  };

  const addTensionDie = () => {
    const current = subject.world_state.tension_pool_current_dice;
    const max = subject.tension_engine.pool_mechanic.max_dice;
    if (current >= max) {
      addLog(`WARNING: Tension Pool saturated at max limits [${max} dice]`);
      return;
    }
    const nextCount = current + 1;
    onUpdateSubject({
      ...subject,
      world_state: {
        ...subject.world_state,
        tension_pool_current_dice: nextCount,
      },
    });
    addLog(
      `TENSION INCREMENT: Seed inserted manually. Pool count now at ${nextCount}/${max}`,
    );
  };

  const removeTensionDie = () => {
    const current = subject.world_state.tension_pool_current_dice;
    if (current <= 1) return;
    const nextCount = current - 1;
    onUpdateSubject({
      ...subject,
      world_state: {
        ...subject.world_state,
        tension_pool_current_dice: nextCount,
      },
    });
    addLog(
      `TENSION DECREMENT: Seed pruned manually. Pool count now at ${nextCount}`,
    );
  };

  // Toggle Quest Node Stage
  const toggleQuestNode = (nodeKey: string) => {
    const currentStage = subject.journal.main_quest.stages[nodeKey];
    const statesOrder: Array<'locked' | 'active' | 'completed'> = [
      'locked',
      'active',
      'completed',
    ];
    const nextStateIndex =
      (statesOrder.indexOf(currentStage.state) + 1) % statesOrder.length;
    const nextState = statesOrder[nextStateIndex];

    onUpdateSubject({
      ...subject,
      journal: {
        ...subject.journal,
        main_quest: {
          ...subject.journal.main_quest,
          stages: {
            ...subject.journal.main_quest.stages,
            [nodeKey]: {
              ...currentStage,
              state: nextState,
            },
          },
        },
      },
    });

    addLog(
      `JOURNAL ENGINE: QUEST NODE '${nodeKey}' TRANSITIONED TO ${nextState.toUpperCase()}`,
    );
  };

  const toggleWorldFlag = (flagKey: string) => {
    const updatedFlags = {
      ...subject.world_state.flags,
      [flagKey]: !subject.world_state.flags[flagKey],
    };
    onUpdateSubject({
      ...subject,
      world_state: {
        ...subject.world_state,
        flags: updatedFlags,
      },
    });
    addLog(
      `WORLD FLAGS: '${flagKey}' FLIPPED TO ${!subject.world_state.flags[flagKey]}`,
    );
  };

  const cycleLighting = () => {
    const keys = Object.keys(subject.audiovisual_cues.lighting_states);
    // Find active scene default or current approximation
    const activeScene = subject.scenes[subject.world_state.active_scene];
    const defaultLightString = activeScene?.on_load?.script_id || keys[0];
    addLog(
      `VTT DIRECTORIAL: Recalibrating light sensors across moors system...`,
    );
  };

  // Build temporary lighting style based on chosen presets matching active scenery
  const currentLightingKey =
    subject.locations[
      subject.scenes[subject.world_state.active_scene]?.location_id
    ]?.default_lighting || 'lighting_states.village_dusk';
  const getLightingStyles = () => {
    if (currentLightingKey.includes('tomb_interior')) {
      return {
        bg: 'bg-[#1A1A24] text-white border-blue-900/40',
        shadow: 'shadow-[inset_0_0_40px_rgba(30,41,59,0.9)]',
      };
    } else if (currentLightingKey.includes('bright_warm_light')) {
      return {
        bg: 'bg-[#FDF9ED] text-[#2C2115] border-[#D6C2A1]',
        shadow: 'shadow-[inset_0_0_30px_rgba(250,214,165,0.2)]',
      };
    } else {
      // village_dusk / default
      return { bg: 'bg-[#F5F2E9] text-black border-black', shadow: '' };
    }
  };

  const styleConfig = getLightingStyles();

  return (
    <div
      className={`border-2 p-6 flex flex-col gap-8 transition-colors duration-500 rounded relative overflow-hidden ${styleConfig.bg} ${styleConfig.shadow}`}
    >
      {/* Complication Overlay Flasher */}
      <AnimatePresence>
        {tensionComplicationTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-600 pointer-events-none z-50 animate-pulse"
          />
        )}
      </AnimatePresence>

      {/* HEADER SPECS */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between border-b border-current pb-6 gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 bg-current text-parchment font-bold tracking-widest shrink-0 rounded-sm">
              {subject.meta.adventure_id}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-gray-500">
              VTT ENGINE {subject.meta.schemaVersion}
            </span>
          </div>
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight leading-none">
            {scrub(subject.meta.title)}
          </h2>
          <p className="font-mono text-xs text-gray-500 mt-1">
            WRITTEN BY: {subject.meta.authors.join(', ')} | FOCUS:{' '}
            {subject.meta.character_levels} ARCHETYPES
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1.5 shrink-0 text-left md:text-right font-mono text-[11px]">
          <div className="px-3 py-1.5 border border-current font-bold flex items-center gap-2 alert-ambient uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {sanitizeLabel(subject.world_state.active_scene)}
          </div>
          <div className="text-gray-500">SYSTEM: {subject.meta.system}</div>
        </div>
      </div>

      {/* THREE-COLUMN BENTO BLOCKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* COLUMN 1: INTEL, MORAL DIRECTION, SAFETY CORES */}
        <div className="flex flex-col gap-6 md:col-span-2">
          {/* THE SYNOPSIS CONTAINER */}
          <div className="border border-current p-5 rounded flex flex-col gap-4">
            <div className="flex gap-2 items-center border-b border-current/25 pb-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                1.0 Narrative Paradigm
              </h3>
            </div>
            <p className="font-serif text-[15px] italic leading-relaxed">
              &ldquo;{scrub(subject.theme.core_concept)}&rdquo; &mdash;{' '}
              {scrub(subject.narrative.synopsis)}
            </p>

            <div className="mt-2 bg-neutral-500/10 p-3 border border-current/20 rounded">
              <span className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                The Core Moral Question
              </span>
              <p className="font-serif text-[14px] font-bold text-current italic">
                &ldquo;{scrub(subject.theme.moral_question)}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 pt-2 border-t border-current/15 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">
                  ATMOSPHERIC MOOD INDEX
                </span>
                <span className="font-serif text-sm italic font-medium">
                  {scrub(subject.theme.mood)}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">DESIGN DESIGNATION</span>
                <span>{subject.meta.design_philosophy}</span>
              </div>
            </div>
          </div>

          {/* SAFETY CORE & ACCESS MODULE */}
          <div className="border border-current p-5 rounded flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-current/25 pb-2">
              <div className="flex gap-2 items-center">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                  2.0 Safety & Sensory Filters
                </h3>
              </div>

              {/* ARACHNOPHOBIA TOGGLE CONTROL */}
              <button
                onClick={() => {
                  setFilterArachnophobia(!filterArachnophobia);
                  addLog(
                    `SAFETY SHIELD: ARACHNOPHOBIA TEXT FILTER MOVED TO ${!filterArachnophobia ? 'ARMED' : 'BYPASSED'}`,
                  );
                }}
                className={`font-mono text-[10px] px-2.5 py-1 border transition-colors cursor-pointer rounded-sm ${
                  filterArachnophobia
                    ? 'bg-rose-600 text-white font-bold border-rose-600'
                    : 'bg-transparent text-gray-500 border-current hover:bg-current hover:text-parchment'
                }`}
              >
                ARACHNOPHOBIA SHIELD: {filterArachnophobia ? 'ARMED' : 'OFF'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-gray-500 block mb-1">
                  CONSTRUCT CONTENT WARNINGS (DM ADVISORY)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {subject.safety_and_accessibility.content_warnings.map(
                    (warn, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] px-2 py-0.5 bg-rose-500/10 text-rose-600 border border-rose-500/20 rounded-sm font-bold uppercase"
                      >
                        {warn}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-gray-500 block mb-1">
                  ACTIVE TEXT REDISTRIBUTION LAYER
                </span>
                {filterArachnophobia ? (
                  <p className="font-mono text-[10px] leading-tight text-emerald-600 border border-emerald-500/30 p-2 bg-emerald-500/5 rounded">
                    SYS_OK: Swapping all occurrences of{' '}
                    <b className="underline">Giant Spiders</b> with{' '}
                    <b className="underline">Venomous Vine Blights</b>.
                    Scrubbing webs, skittering, spinnerets, eight legs tags.
                  </p>
                ) : (
                  <p className="font-mono text-[10px] leading-tight text-gray-500 border border-current/10 p-2 rounded">
                    STANDBY: Native monster schemas active. Toggle the shield
                    above to apply the Dynamic Filter rule from safety
                    specification json.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* DYNAMIC METRIC/WORLD FLAGS */}
          <div className="border border-current p-5 rounded flex flex-col gap-4">
            <div className="flex gap-2 items-center border-b border-current/25 pb-2">
              <Users className="w-4 h-4 text-amber-500" />
              <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                3.0 Narrative Ledger & Factions
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quest Stages Tracker */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                  MAIN QUEST JOURNAL STEPS
                </span>
                <div className="flex flex-col gap-1.5">
                  {Object.entries(subject.journal.main_quest.stages).map(
                    ([k, step]) => (
                      <button
                        key={k}
                        onClick={() => toggleQuestNode(k)}
                        className="text-left font-mono text-xs flex gap-2 items-start border border-current/20 p-2 hover:bg-current/5 rounded cursor-pointer transition-colors"
                        title="Click to cycle Quest node state"
                      >
                        <span className="mt-0.5">
                          {step.state === 'completed' ? (
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : step.state === 'active' ? (
                            <span className="w-3.5 h-3.5 border-2 border-amber-500 rounded-sm inline-block shrink-0 animate-pulse bg-amber-500/10" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          )}
                        </span>
                        <div className="flex-1">
                          <div className="font-bold uppercase tracking-tight flex justify-between items-start leading-snug">
                            <span className="block w-[140px]">
                              {k === 'Social Investigation' ? (
                                <>
                                  SOCIAL
                                  <br />
                                  INVESTIGATION
                                </>
                              ) : k === 'Wilderness Exploration' ? (
                                <>
                                  WILDERNESS
                                  <br />
                                  EXPLORATION
                                </>
                              ) : k === 'Spirit Climax Resolution' ? (
                                <>
                                  SPIRIT
                                  <br />
                                  CLIMAX
                                  <br />
                                  RESOLUTION
                                </>
                              ) : (
                                k.toUpperCase()
                              )}
                            </span>
                            <div className="flex flex-col items-end gap-1 shrink-0 ml-1">
                              <span
                                className={`text-[9px] px-1 font-mono rounded ${
                                  step.state === 'completed'
                                    ? 'bg-emerald-500/20 text-emerald-600'
                                    : step.state === 'active'
                                      ? 'bg-amber-500/20 text-amber-600'
                                      : 'bg-gray-500/10 text-gray-400'
                                }`}
                              >
                                {step.state}
                              </span>
                              {step.xp_reward && (
                                <span className="text-[8.5px] font-bold text-emerald-700">
                                  {step.xp_reward} XP
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1">
                            {scrub(step.objective)}
                          </p>
                          {step.sub_nodes && step.sub_nodes.length > 0 && (
                            <div className="mt-1.5 pt-1.5 border-t border-current/10 flex flex-col gap-1">
                              {step.sub_nodes.map((sub: any) => {
                                const subIcon =
                                  sub.state === 'completed'
                                    ? '☑'
                                    : sub.state === 'active'
                                      ? '⚬'
                                      : '◽';
                                const subColor =
                                  sub.state === 'completed'
                                    ? 'text-emerald-700 font-medium'
                                    : sub.state === 'active'
                                      ? 'text-amber-700 font-semibold animate-pulse'
                                      : 'text-gray-400';
                                return (
                                  <div
                                    key={sub.id}
                                    className={`font-mono text-[9px] flex justify-between items-center gap-1.5 ${subColor}`}
                                  >
                                    <div className="flex gap-1.5 items-center">
                                      <span>{subIcon}</span>
                                      <span>{scrub(sub.objective)}</span>
                                    </div>
                                    {sub.xp_reward && (
                                      <span className="text-[8px] bg-emerald-500/10 text-emerald-800 border border-emerald-600/25 px-1 rounded font-bold">
                                        +{sub.xp_reward} XP
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Factions and World Flags */}
              <div className="flex flex-col gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-2">
                    ACTIVE WORLD STATE FLAGS
                  </span>
                  <div className="flex flex-col gap-1.5 font-mono text-xs">
                    {Object.entries(subject.world_state.flags).map(
                      ([fKey, active]) => (
                        <button
                          key={fKey}
                          onClick={() => toggleWorldFlag(fKey)}
                          className={`flex justify-between items-center p-2 border cursor-pointer rounded transition-colors ${
                            active
                              ? 'border-emerald-600/40 bg-emerald-500/5 text-emerald-600'
                              : 'border-current/15 text-gray-500 hover:border-current/30'
                          }`}
                        >
                          <span className="text-[11px] uppercase tracking-wider">
                            {fKey.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-neutral-200 text-black font-semibold uppercase rounded">
                            {active ? 'TRUE (CEASE)' : 'FALSE'}
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                    FACTION DISPOSITIONS
                  </span>
                  <div className="flex flex-col gap-1 text-xs font-mono">
                    {Object.entries(subject.factions).map(([fk, fac]) => {
                      const dynamicAttitude =
                        subject.world_state.dynamic_factions[fk]
                          ?.attitude_to_party || 'Neutral';
                      return (
                        <div
                          key={fk}
                          className="flex justify-between items-center py-1 border-b border-current/10"
                        >
                          <span className="font-semibold">{fac.name}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              dynamicAttitude === 'Friendly'
                                ? 'bg-emerald-500/10 text-emerald-600'
                                : dynamicAttitude === 'Hostile'
                                  ? 'bg-rose-500/10 text-rose-600'
                                  : 'bg-neutral-500/10 text-gray-500'
                            }`}
                          >
                            {dynamicAttitude.toUpperCase()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2 (RIGHT): TENSION ENGINE, CHRONO SCANNER, SOUNDSCAPE */}
        <div className="flex flex-col gap-6">
          {/* TENSION ENGINE CORE */}
          <div className="border border-current p-5 rounded flex flex-col gap-4">
            <div className="flex gap-2 items-center border-b border-current/25 pb-2">
              <Dice5 className="w-4 h-4 text-rose-500" />
              <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                4.0 Tension Engine
              </h3>
            </div>

            <div className="text-center py-2 relative">
              <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-1">
                TENSION POOL POTENCY
              </div>

              {/* PHYSICAL DIE BOX RENDERING */}
              <div className="flex justify-center flex-wrap gap-2 my-3">
                {Array.from({
                  length: subject.world_state.tension_pool_current_dice,
                }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={
                      rollingTension
                        ? {
                            rotate: [0, 90, 180, 270, 360],
                            scale: [1, 1.1, 0.9, 1.1, 1],
                            y: [0, -10, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      repeat: rollingTension ? Infinity : 0,
                    }}
                    className="w-10 h-10 border-2 border-current rounded flex items-center justify-center font-mono font-black text-lg bg-neutral-500/5 relative shadow-sm"
                  >
                    {rollingTension ? '?' : tensionRollResults[i] || 'd6'}
                  </motion.div>
                ))}
              </div>

              <div className="text-xs font-mono mb-2">
                SEED COUNT:{' '}
                <span className="font-bold text-lg">
                  {subject.world_state.tension_pool_current_dice}
                </span>{' '}
                / {subject.tension_engine.pool_mechanic.max_dice} MAX
              </div>

              {/* MANUAL SEED BUTTONS */}
              <div className="flex justify-center gap-2 mb-4">
                <button
                  onClick={removeTensionDie}
                  className="px-2 py-1 border border-current hover:bg-current hover:text-parchment text-xs font-mono cursor-pointer rounded-sm"
                  title="Remove Tension Die"
                >
                  - PRUNE
                </button>
                <button
                  onClick={addTensionDie}
                  className="px-2 py-1 border border-current hover:bg-current hover:text-parchment text-xs font-mono cursor-pointer rounded-sm"
                  title="Add Tension Die"
                >
                  + HARVEST
                </button>
              </div>

              {/* ROLL THE POOL TRIGGER */}
              <button
                onClick={rollTensionPool}
                disabled={rollingTension}
                className="w-full bg-rose-600 text-white font-mono font-bold uppercase text-xs py-2.5 border-2 border-rose-700 hover:bg-rose-500 cursor-pointer transition-colors shadow-sm tracking-wider rounded"
              >
                {rollingTension ? 'CYCLES COLLATING...' : '✕ ROLL TENSION POOL'}
              </button>
            </div>

            {/* Tension failure notes */}
            <div className="font-mono text-[9px] text-gray-500 leading-tight bg-black/5 p-2 rounded border border-current/10">
              <span className="font-bold block text-current">
                ON COMPLICATION RULE
              </span>
              Any roll containing <b className="underline">1</b> triggers
              procedure:{' '}
              <b className="text-rose-600">
                {
                  subject.tension_engine.pool_mechanic.on_roll_complication
                    .proc_id
                }
              </b>
              , escalating the supernatural local storm!
            </div>
          </div>

          {/* CHRONOLOGY DECK */}
          <div className="border border-current p-5 rounded flex flex-col gap-4">
            <div className="flex gap-2 items-center border-b border-current/25 pb-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                5.0 Chronos & Tides
              </h3>
            </div>

            <div className="flex items-center justify-between font-mono text-sm">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase">
                  CALENDAR CLOCK
                </span>
                <span className="font-bold text-base flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-current" />
                  {subject.world_state.current_time_of_day}
                </span>
                <span className="text-[9px] text-current/60 uppercase">
                  ACTIVE ELAPSED: {subject.world_state.time_elapsed_hours} HOURS
                </span>
              </div>

              {/* Time advancement widget */}
              <div className="flex gap-1.5 font-mono">
                <button
                  onClick={() => advanceTime(1)}
                  className="px-2 py-1.5 border border-current hover:bg-current hover:text-parchment text-[11px] font-bold cursor-pointer transition-colors rounded-sm"
                  title="Travel forward 1 Hour"
                >
                  +1H
                </button>
                <button
                  onClick={() => advanceTime(4)}
                  className="px-2 py-1.5 border border-current hover:bg-current hover:text-parchment text-[11px] font-bold cursor-pointer transition-colors rounded-sm"
                  title="Travel forward 4 Hours"
                >
                  +4H
                </button>
              </div>
            </div>

            {/* Astral configuration */}
            <div className="border-t border-current/15 pt-3 font-mono text-xs flex flex-col gap-2">
              <span className="text-[10px] uppercase text-gray-500">
                CELESTIAL CONFIGURATIONS
              </span>
              {subject.chronology.celestial_bodies.map((body, index) => (
                <div
                  key={index}
                  className="bg-neutral-500/5 p-2.5 rounded border border-current/10"
                >
                  <div className="flex justify-between items-center border-b border-current/15 pb-1 mb-1.5">
                    <span className="font-bold text-sm uppercase flex items-center gap-1 text-amber-500">
                      <Moon className="w-3.5 h-3.5" /> {body.name}
                    </span>
                    <span className="text-[10px] px-1 bg-current text-parchment uppercase rounded-sm">
                      {body.current_phase}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    {body.mechanical_impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AUDIOVISUAL CORES MIXER */}
          <div className="border border-current p-5 rounded flex flex-col gap-4">
            <div className="flex gap-2 items-center border-b border-current/25 pb-2">
              <Volume2 className="w-4 h-4 text-emerald-500" />
              <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                6.0 Soundscapes & VTT
              </h3>
            </div>

            {/* MOCK PLAYER CONTROL BAR */}
            <div className="bg-black/5 p-3.5 rounded border border-current/15 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase">
                    VTT DIRECT INTERFACE
                  </span>
                  <span className="font-bold">
                    {activeAudioKey.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>

                {/* Play pausing button */}
                <button
                  onClick={triggerAudioToggle}
                  className="p-1.5 border border-current hover:bg-current hover:text-parchment transition-colors rounded cursor-pointer"
                  title="Transmit or mute audio"
                >
                  {isPlayingAudio ? (
                    <Volume2 className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* PROGRESS BAR SIMULATOR */}
              <div className="w-full bg-current/20 h-1 relative roundedoverflow-hidden">
                <motion.div
                  className="bg-emerald-500 h-full"
                  animate={isPlayingAudio ? { width: ['0%', '100%'] } : {}}
                  transition={
                    isPlayingAudio
                      ? { duration: 40, repeat: Infinity, ease: 'linear' }
                      : { width: '0%' }
                  }
                />
              </div>

              {/* VOLUME SLIDER */}
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-500">ATTENUATION GAIN</span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audioVolume}
                    onChange={(e) => setAudioVolume(parseInt(e.target.value))}
                    className="w-16 h-1 bg-current accent-emerald-500 cursor-pointer"
                  />
                  <span>{audioVolume}%</span>
                </div>
              </div>
            </div>

            {/* SOUND CUE LIST */}
            <div className="flex flex-col gap-1.5 text-xs font-mono">
              <span className="text-[10px] uppercase text-gray-500 block mb-1">
                AVAILABLE AUDIO TRANSCEIVERS
              </span>
              {Object.entries(subject.audiovisual_cues.soundscapes).map(
                ([k, meta]) => (
                  <button
                    key={k}
                    onClick={() => changeAudioTrack(k)}
                    className={`px-2 py-1.5 border text-left flex justify-between items-center transition-all cursor-pointer rounded ${
                      activeAudioKey === k && isPlayingAudio
                        ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600 font-bold'
                        : 'border-current/15 text-gray-500 hover:border-current/30'
                    }`}
                  >
                    <span>
                      {k
                        .replace(/bgm_|sfx_/g, '')
                        .replace(/_/g, ' ')
                        .toUpperCase()}
                    </span>
                    <span className="text-[9px] border border-current/25 px-1 font-mono rounded">
                      {meta.loop ? 'LOOP' : 'ONESHOT'}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER DIAGNOSTICS LOG BUFFER */}
      <div className="border border-current p-4 rounded font-mono text-[11px] flex flex-col gap-2 bg-black/5">
        <div className="flex justify-between items-center border-b border-current/10 pb-1.5 text-gray-500">
          <span className="uppercase tracking-widest font-bold">
            7.0 Core Terminal Systems Logs
          </span>
          <span>BUFFER_SIZE: {historyLogs.length} LOGS</span>
        </div>
        <div className="flex flex-col gap-1 scrollbar-none h-32 overflow-y-auto font-mono text-[10px] divide-y divide-current/5">
          {historyLogs.length === 0 ? (
            <div className="text-gray-400 italic">
              No operational logs recorded. Interact with the metrics panel
              above to generate active scanning logs.
            </div>
          ) : (
            historyLogs.map((log, i) => (
              <div key={i} className="py-1 text-gray-500 leading-normal">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 8.0: SYSTEM SCHEMA ARCHITECTURE MANIFEST */}
      <div className="border border-current p-5 rounded flex flex-col gap-6 mt-2 relative bg-neutral-500/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-current/20 pb-4 gap-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-500 animate-[pulse_3s_infinite]" />
            <div>
              <h3 className="font-serif font-black text-lg uppercase tracking-wide">
                8.0 System Manifest Diagnostics & GM Controller
              </h3>
              <p className="font-mono text-[10px] text-gray-500 uppercase leading-none">
                Interactive Parameter Verification & Live Relational Schema
                Explorer
              </p>
            </div>
          </div>

          {/* Tab toggler for section 8 */}
          <div className="flex flex-wrap gap-1 font-mono text-[10px] font-bold uppercase">
            {(['RAW_GRAPH', 'LORE', 'ENTITIES', 'SYSTEM'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setManifestActiveTab(tab);
                    addLog(`DIAGNOSTICS: Loaded sub-panel '${tab}'`);
                  }}
                  className={`px-2.5 py-1.5 border transition-all cursor-pointer rounded-sm ${
                    manifestActiveTab === tab
                      ? 'bg-black text-parchment border-black'
                      : 'bg-transparent text-gray-500 border-current/20 hover:border-current/40'
                  }`}
                >
                  {tab.replace('_', ' ')}
                </button>
              ),
            )}
          </div>
        </div>

        {/* TAB PANELS RENDERING */}
        {manifestActiveTab === 'RAW_GRAPH' && (
          <div className="flex flex-col gap-4 font-mono">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-black/5 p-3 rounded border border-current/10">
              <div className="flex-1 w-full relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Filter parameters by name or value (e.g. 'vorgun', 'schema', 'dusk')..."
                  value={jsonSearchQuery}
                  onChange={(e) => setJsonSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF7EF] border border-current/20 pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-current"
                />
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(subject, null, 2),
                    );
                    addLog(
                      'SYS_CLIPBOARD: Copied complete adventure schema JSON successfully.',
                    );
                    alert(
                      'Complete Adventure Schema JSON copied to clipboard!',
                    );
                  }}
                  className="px-3 py-1.5 border border-current hover:bg-black hover:text-parchment text-[10px] font-bold cursor-pointer transition-colors uppercase rounded-sm"
                >
                  COPY RAW SCHEMA JSON
                </button>
                <button
                  onClick={() => {
                    const allKeys: Record<string, boolean> = {
                      root: true,
                      'root.meta': true,
                      'root.definitions': true,
                      'root.world_state': true,
                      'root.journal': true,
                      'root.lore_web': true,
                      'root.safety_and_accessibility': true,
                      'root.party_integration': true,
                      'root.chronology': true,
                      'root.tension_engine': true,
                      'root.audiovisual_cues': true,
                      'root.factions': true,
                      'root.locations': true,
                      'root.scenes': true,
                    };
                    setExpandedNodes(allKeys);
                    setJsonSearchQuery('');
                    addLog(
                      'SYS_GRAPH: Restored structural manifest index tree views.',
                    );
                  }}
                  className="px-2.5 py-1.5 border border-current/20 text-gray-500 hover:border-current text-[10px] cursor-pointer transition-all rounded-sm"
                  title="Expand major structural blocks"
                >
                  RESET BLOCKS
                </button>
              </div>
            </div>

            <div className="bg-[#FAF7EF]/40 border border-current/15 rounded p-4 max-h-[380px] overflow-y-auto scrollbar-thin flex flex-col gap-1.5">
              {/* Start recursive root tree render */}
              {(() => {
                const helper = (
                  val: any,
                  nodeKey: string = 'root',
                  path: string = '',
                ): React.ReactNode => {
                  const currentPath = path ? `${path}.${nodeKey}` : nodeKey;
                  const isExpanded = expandedNodes[currentPath];

                  if (val === null) {
                    return (
                      <div
                        key={currentPath}
                        className="pl-4 font-mono text-[11px] text-gray-500"
                      >
                        <span className="text-amber-700 font-bold">
                          {nodeKey}
                        </span>
                        : <span className="text-stone-400">null</span>
                      </div>
                    );
                  }

                  if (typeof val !== 'object') {
                    const displayValue =
                      typeof val === 'string' ? `"${val}"` : String(val);
                    const valColor =
                      typeof val === 'string'
                        ? 'text-emerald-700 font-medium'
                        : 'text-purple-700 font-medium';

                    if (jsonSearchQuery) {
                      const matches =
                        nodeKey
                          .toLowerCase()
                          .includes(jsonSearchQuery.toLowerCase()) ||
                        String(val)
                          .toLowerCase()
                          .includes(jsonSearchQuery.toLowerCase());
                      if (!matches) return null;
                    }

                    return (
                      <div
                        key={currentPath}
                        className="pl-4 font-mono text-[11px] hover:bg-black/5 py-0.5 rounded-sm transition-colors flex items-start gap-1"
                      >
                        <span className="text-amber-800 font-bold shrink-0">
                          {nodeKey}:
                        </span>
                        <span className={`${valColor} break-all`}>
                          {scrub(displayValue)}
                        </span>
                      </div>
                    );
                  }

                  const isArray = Array.isArray(val);
                  const keys = Object.keys(val);

                  let shouldRender = true;
                  if (jsonSearchQuery) {
                    const matchInSelf = nodeKey
                      .toLowerCase()
                      .includes(jsonSearchQuery.toLowerCase());
                    const matchInChildren = JSON.stringify(val)
                      .toLowerCase()
                      .includes(jsonSearchQuery.toLowerCase());
                    shouldRender = matchInSelf || matchInChildren;
                  }
                  if (!shouldRender) return null;

                  return (
                    <div
                      key={currentPath}
                      className="pl-4 font-mono text-[11px] flex flex-col"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedNodes((prev) => ({
                            ...prev,
                            [currentPath]: !prev[currentPath],
                          }));
                        }}
                        className="flex items-center gap-1.5 hover:text-black hover:bg-black/5 text-left py-1 text-gray-600 cursor-pointer rounded-sm"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        )}
                        <span className="text-stone-800 font-black uppercase tracking-tight">
                          {nodeKey}
                        </span>
                        <span className="text-stone-400 text-[9px] font-bold">
                          {isArray
                            ? `[${val.length} entries]`
                            : `{${keys.length} values}`}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="border-l border-black/10 ml-1.5 pl-2 flex flex-col gap-0.5">
                          {keys.map((k) => helper(val[k], k, currentPath))}
                        </div>
                      )}
                    </div>
                  );
                };
                return helper(subject, 'campaign_manifest');
              })()}
            </div>
          </div>
        )}

        {manifestActiveTab === 'LORE' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* LORE SECRETS DB */}
            <div className="flex flex-col gap-3.5 border border-current/15 p-4 rounded bg-[#FAF7EF]/20">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-current/10 pb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-500" />
                LORE SECRETS DICTIONARY (lore_web.secrets)
              </span>
              <div className="flex flex-col gap-3">
                {subject.lore_web?.secrets &&
                Object.entries(subject.lore_web.secrets).length > 0 ? (
                  Object.entries(subject.lore_web.secrets).map(
                    ([sKey, value]: any) => {
                      const activeSecret = value;
                      const isRevealed =
                        revealedSecrets[sKey] ||
                        subject.world_state.unlocked_secrets?.includes(sKey);
                      const clueLocs = activeSecret.clue_locations || [];

                      return (
                        <div
                          key={sKey}
                          className="border border-current/10 p-3 rounded bg-black/5 flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-center bg-black/10 px-2 py-1 rounded gap-1.5">
                            <span className="font-bold text-amber-700 font-mono text-[10px] uppercase truncate">
                              {sKey.replace(/_/g, ' ')}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {activeSecret.xp_reward && (
                                <span className="text-[8.5px] font-bold text-emerald-700">
                                  {activeSecret.xp_reward} XP
                                </span>
                              )}
                              <span
                                className={`text-[9px] px-1 font-bold ${isRevealed ? 'bg-emerald-500/20 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}
                              >
                                {isRevealed ? 'DECRYPTED' : 'SEALED'}
                              </span>
                            </div>
                          </div>

                          {isRevealed ? (
                            <div className="p-2 border-l-2 border-emerald-500 bg-emerald-500/5 text-[11px] italic font-serif leading-relaxed text-slate-800">
                              &ldquo;{scrub(activeSecret.truth)}&rdquo;
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] text-gray-500 leading-tight">
                                Truth hidden behind cryptographic locks.
                                Under-the-hook clues linked in database:
                                <span className="text-amber-600 font-bold block">
                                  {clueLocs.join(', ') || '[No clues]'}
                                </span>
                              </span>
                              <button
                                onClick={() => {
                                  setRevealedSecrets((prev) => ({
                                    ...prev,
                                    [sKey]: true,
                                  }));
                                  addLog(
                                    `LORE_DEC: Bypassed cryptography locks on lore node [${sKey}].`,
                                  );
                                }}
                                className="self-start text-[9px] px-2 py-1 border border-current hover:bg-black hover:text-parchment transition-all cursor-pointer rounded"
                              >
                                ✕ FORCE DECRYPT COGNIZANCE_KEY
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    },
                  )
                ) : (
                  <span className="text-gray-400 italic">
                    No lore secrets loaded in operational matrix.
                  </span>
                )}
              </div>
            </div>

            {/* CLASS/BACKGROUND HOOKS */}
            <div className="flex flex-col gap-3.5 border border-current/15 p-4 rounded bg-[#FAF7EF]/20">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-current/10 pb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                PARTY INTEGRATION PROFILE HOOKS
              </span>
              <div className="flex flex-col gap-2.5">
                {subject.party_integration?.background_hooks &&
                Object.entries(subject.party_integration.background_hooks)
                  .length > 0 ? (
                  Object.entries(
                    subject.party_integration.background_hooks,
                  ).map(([bgName, value]: any) => (
                    <div
                      key={bgName}
                      className="border border-current/10 p-3 rounded"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-emerald-700 text-xs uppercase">
                          {bgName} ARCHETYPE
                        </span>
                        <span className="text-[9px] text-gray-400 font-mono">
                          Linked: {value.linked_secret || 'N/A'}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed italic text-[#4c4546] font-serif">
                        &ldquo;{scrub(value.bonus)}&rdquo;
                      </p>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 italic">
                    No archetype dynamic hooks compiled.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {manifestActiveTab === 'ENTITIES' && (
          <div className="flex flex-col gap-6 font-mono text-xs">
            {/* NPCS & ITEMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NPC REGISTRY */}
              <div className="flex flex-col gap-3 border border-current/15 p-4 rounded bg-[#FAF7EF]/20">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-current/10 pb-1 flex items-center gap-1.5">
                  <Play className="w-3 h-3 text-emerald-500 rotate-90" />
                  CAMPAIGN DRAMATIS DIRECTORY (npcs)
                </span>
                <div className="flex flex-col gap-3">
                  {subject.definitions?.entities?.npcs &&
                  Object.entries(subject.definitions.entities.npcs).length >
                    0 ? (
                    Object.entries(subject.definitions.entities.npcs).map(
                      ([nKey, value]: any) => (
                        <div
                          key={nKey}
                          className="border border-current/10 p-2.5 rounded bg-black/5"
                        >
                          <div className="font-bold text-emerald-800 text-xs mb-1 uppercase">
                            {scrub(value.name)}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-current/10 pt-1 mt-1 font-mono text-gray-500">
                            <div>
                              IDEAL:{' '}
                              <b className="text-black">
                                {scrub(value.roleplaying?.ideal || 'Unmapped')}
                              </b>
                            </div>
                            <div>
                              FLAW:{' '}
                              <b className="text-black">
                                {scrub(value.roleplaying?.flaw || 'Unmapped')}
                              </b>
                            </div>
                          </div>
                        </div>
                      ),
                    )
                  ) : (
                    <span className="text-gray-400 italic">
                      No NPCs registered.
                    </span>
                  )}
                </div>
              </div>

              {/* ITEMS REGISTRY */}
              <div className="flex flex-col gap-3 border border-current/15 p-4 rounded bg-[#FAF7EF]/20">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-current/10 pb-1 flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5 text-amber-500" />
                  LEGENDARY ITEM & EQUIPMENT DATABASE (items)
                </span>
                <div className="flex flex-col gap-3">
                  {subject.definitions?.entities?.items &&
                  Object.entries(subject.definitions.entities.items).length >
                    0 ? (
                    Object.entries(subject.definitions.entities.items).map(
                      ([iKey, value]: any) => (
                        <div
                          key={iKey}
                          className="border border-current/10 p-2.5 rounded bg-black/5"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-amber-800 text-xs uppercase">
                              {scrub(value.name)}
                            </span>
                            <span className="text-[9px] px-1 bg-amber-500/10 text-amber-600 rounded">
                              {value.type || 'Unique Item'}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 leading-normal font-serif italic pt-1 border-t border-current/10">
                            PROPERTIES: {scrub(value.properties || 'None')}
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <span className="text-gray-400 italic">
                      No magic inventory registered in database.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* DYNAMIC MONSTERS COMBAT & VTT BIO CONTROLLER */}
            <div className="border border-current/15 p-4 rounded bg-[#FAF7EF]/20 flex flex-col gap-3">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-current/10 pb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-[spin_4s_linear_infinite]" />
                MONSTER VTT TRACKER MATRIX (definitions.entities.monsters)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subject.definitions?.entities?.monsters &&
                Object.entries(subject.definitions.entities.monsters).length >
                  0 ? (
                  Object.entries(subject.definitions.entities.monsters).map(
                    ([mKey, mon]: any) => {
                      const mId = mKey;
                      return (
                        <div
                          key={mId}
                          className="border border-current/20 p-3 rounded bg-white flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-start gap-1">
                            <div>
                              <span className="font-bold text-current text-xs uppercase leading-tight block">
                                {scrub(mon.name)}
                              </span>
                              <span className="text-[9px] text-gray-500 uppercase">
                                {mon.size} {mon.base_stat_block}
                              </span>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="text-[9px] font-mono px-1 bg-red-500/10 text-red-600">
                                VTT_ACTIVE
                              </span>
                              {mon.xp_reward && (
                                <span className="text-[8.5px] font-bold text-emerald-700">
                                  {mon.xp_reward} XP
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 bg-black/5 p-2 rounded">
                            <div className="flex justify-between items-center font-mono text-[10px]">
                              <span>HEALTH POINTS (HP):</span>
                              <span className="font-bold text-red-600 font-sans text-xs">
                                {mon.hp} / {mon.hp} Max
                              </span>
                            </div>
                            <div className="w-full bg-current/10 h-1.5 rounded overflow-hidden">
                              <div className="bg-red-500 h-full w-full" />
                            </div>
                          </div>

                          <div className="text-[9.5px] leading-tight text-gray-500 font-mono">
                            DEF_VFX:{' '}
                            <b className="text-neutral-700 bg-neutral-200/50 px-1 rounded inline-block">
                              {mon.default_vfx || 'None'}
                            </b>
                          </div>
                        </div>
                      );
                    },
                  )
                ) : (
                  <span className="text-gray-400 italic">
                    No monster entities defined in matrix.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {manifestActiveTab === 'SYSTEM' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* LIVE SYSTEM TABLES */}
            <div className="flex flex-col gap-4 border border-current/15 p-4 rounded bg-[#FAF7EF]/20">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-current/10 pb-1 flex items-center gap-1.5">
                <Dice5 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                DICE TABLES & ENCOUNTER GENERATORS (definitions.tables)
              </span>

              {subject.definitions?.tables &&
              Object.entries(subject.definitions.tables).length > 0 ? (
                Object.entries(subject.definitions.tables).map(
                  ([tName, table]: any) => (
                    <div
                      key={tName}
                      className="border border-current/10 p-3 rounded bg-black/5 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center border-b border-current/10 pb-1.5">
                        <div>
                          <span className="font-bold text-amber-800 text-xs uppercase">
                            {table.name}
                          </span>
                          <span className="text-[9px] text-gray-400 font-mono block">
                            TRIGGER: {table.auto_trigger?.type || 'None'} (
                            {table.auto_trigger?.event_name})
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (!table.entries || table.entries.length === 0)
                              return;
                            const entriesCount = table.entries.length;
                            const randIdx = Math.floor(
                              Math.random() * entriesCount,
                            );
                            const chosen = table.entries[randIdx];
                            const rolledVal = chosen.roll || randIdx + 1;
                            addLog(
                              `SYS_ROLL: Ran custom table [${table.name}] roll d${entriesCount} result [${rolledVal}]: "${chosen.name}"`,
                            );
                            alert(
                              `[TABLE '${table.name.toUpperCase()}']\nROLLED: ${rolledVal}\nOUTCOME: ${chosen.name}`,
                            );
                          }}
                          className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold rounded shadow-sm cursor-pointer border border-amber-700"
                        >
                          ✕ ROLL ON TABLE
                        </button>
                      </div>

                      <div className="flex flex-col gap-1 text-[10.5px]">
                        {table.entries?.map((ent: any, i: number) => (
                          <div
                            key={i}
                            className="flex justify-between items-center py-0.5 border-b border-current/5"
                          >
                            <span className="text-amber-700 font-bold">
                              [{ent.roll}]
                            </span>
                            <span className="flex-1 pl-2 truncate">
                              {scrub(ent.name)}
                            </span>
                            <span className="text-[9px] text-gray-400">
                              Script: {ent.script_id || 'None'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )
              ) : (
                <span className="text-gray-400 italic">
                  No custom roller tables found.
                </span>
              )}
            </div>

            {/* ACTION SCRIPTS AND PROCEDURES DIRECTORY */}
            <div className="flex flex-col gap-4 border border-current/15 p-4 rounded bg-[#FAF7EF]/20">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-b border-current/10 pb-1 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-emerald-500" />
                VTT LOGIC DIRECTORY (procedures & scripts)
              </span>

              {/* Procedures List */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] uppercase text-gray-400 font-bold block">
                  1.0 REGISTERED PROCEDURES (procedures)
                </span>
                {subject.procedures &&
                Object.keys(subject.procedures).length > 0 ? (
                  Object.entries(subject.procedures).map(
                    ([pKey, pVal]: any) => (
                      <div
                        key={pKey}
                        className="p-2 border border-current/10 rounded flex justify-between items-center bg-black/5"
                      >
                        <span className="font-bold text-slate-700 text-[11px] font-mono">
                          {pKey}
                        </span>
                        <span className="text-[9px] px-1.5 bg-emerald-500/10 text-emerald-600 rounded">
                          PROCEDURAL_MACRO
                        </span>
                      </div>
                    ),
                  )
                ) : (
                  <div className="p-2.5 border border-current/5 rounded text-gray-400 italic">
                    No executable procedures loaded. System operates on
                    client-side state hooks.
                  </div>
                )}
              </div>

              {/* Scripts List */}
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-[9px] uppercase text-gray-400 font-bold block">
                  2.0 ACTIONS SEQUENCES (scripts)
                </span>
                {subject.scripts && Object.keys(subject.scripts).length > 0 ? (
                  Object.entries(subject.scripts).map(([sKey, sVal]: any) => (
                    <div
                      key={sKey}
                      className="p-2 border border-current/10 rounded bg-black/5 flex flex-col gap-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700 text-[11px] font-mono">
                          {sKey}
                        </span>
                        <span className="text-[9px] text-gray-400 font-mono">
                          Steps: {sVal.sequence?.length || 0}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 italic">
                    No action sequences registered.
                  </span>
                )}
              </div>

              {/* Daily system cycle definitions */}
              <div className="flex flex-col gap-2 mt-2 border-t border-current/10 pt-2 text-[10.5px]">
                <span className="text-[9.5px] uppercase text-current/60 font-black block">
                  3.0 CHRONO METRIC CYCLES (chronology.daily_cycle)
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1 bg-black/5 p-2 rounded">
                  <div>
                    DAWN:{' '}
                    <b className="text-black">
                      {subject.chronology?.daily_cycle?.dawn || '06:00'}
                    </b>
                  </div>
                  <div>
                    DUSK:{' '}
                    <b className="text-black">
                      {subject.chronology?.daily_cycle?.dusk || '18:00'}
                    </b>
                  </div>
                  <div className="col-span-2 text-[9px] text-gray-400 border-t border-current/5 pt-1 mt-1 flex flex-col gap-1">
                    <div>
                      Sunrise Trigger Procedure:{' '}
                      <b className="text-emerald-600 font-bold">
                        {subject.chronology?.daily_cycle?.on_dawn?.proc_id ||
                          'None'}
                      </b>
                    </div>
                    <div>
                      Sunset Trigger Procedure:{' '}
                      <b className="text-rose-600 font-bold">
                        {subject.chronology?.daily_cycle?.on_dusk?.proc_id ||
                          'None'}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
