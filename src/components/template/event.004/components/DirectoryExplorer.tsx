/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Adventure,
  SceneRecord,
  DialogueTree,
  DialogueNode,
  Handout,
  Monster,
} from '../types';
import { applyArachnophobiaFilter, sanitizeLabel } from '../utils';
import {
  Map,
  MapPin,
  ShieldAlert,
  Compass,
  MessageSquare,
  Eye,
  FileText,
  Sparkles,
  BookOpen,
  Dices,
  CheckCircle,
  Sword,
  Play,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

interface DirectoryExplorerProps {
  subject: Adventure;
  onUpdateSubject: (updated: Adventure) => void;
  filterArachnophobia: boolean;
}

export default function DirectoryExplorer({
  subject,
  onUpdateSubject,
  filterArachnophobia,
}: DirectoryExplorerProps) {
  // Navigation / Tab states in board
  const [activeBoardSection, setActiveBoardSection] = useState<
    'MAP' | 'SCREENPLAY' | 'DIALOGUE' | 'HANDOUTS'
  >('MAP');

  // Dice roller popup state
  const [isRollingDice, setIsRollingDice] = useState(false);
  const [diceRollTarget, setDiceRollTarget] = useState<{
    name: string;
    dc: number;
    skill: string;
    onSuccess: () => void;
  } | null>(null);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [diceMod, setDiceMod] = useState(3); // Mock skill score modifier
  const [rollPassed, setRollPassed] = useState<boolean | null>(null);

  // Screenplay runner state
  const [activeScreenplayKey, setActiveScreenplayKey] = useState<string>(
    'sp_vorguns_resolution',
  );
  const [isPlayingScreenplay, setIsPlayingScreenplay] = useState(false);
  const [screenplayIndex, setScreenplayIndex] = useState(0);

  // Dialogue Tree runner state
  const [activeNodeKey, setActiveNodeKey] = useState<string>('start');
  const [dialogueHistory, setDialogueHistory] = useState<
    Array<{ sender: string; text: string }>
  >([]);

  // Combat Tracking State (Vorgun Ghost HP)
  const [vorgunGhostHp, setVorgunGhostHp] = useState(75);

  // Directory notification logs
  const [activityLogs, setActivityLogs] = useState<string[]>([]);

  const scrub = (txt: string) => {
    const config =
      subject.safety_and_accessibility.dynamic_filters.filter_arachnophobia;
    return applyArachnophobiaFilter(txt, filterArachnophobia, config);
  };

  const addLog = (msg: string) => {
    const timeStr = new Date().toLocaleTimeString();
    setActivityLogs((prev) => [`[${timeStr}] ${msg}`, ...prev.slice(0, 10)]);
  };

  const activeSceneKey = subject.world_state.active_scene;
  const activeScene =
    subject.scenes[activeSceneKey] || Object.values(subject.scenes)[0];
  const activeLocation = subject.locations[activeScene.location_id];

  // Resolve current background lighting or details
  const triggerHexNavigation = (hexId: string) => {
    // Look up scene belonging to this location
    const matchedLoc = Object.values(subject.locations).find(
      (l) => l.hexmap_id === hexId,
    );
    if (!matchedLoc) return;

    const matchedScene = Object.values(subject.scenes).find(
      (s) => s.location_id === matchedLoc.id,
    );
    if (!matchedScene) return;

    onUpdateSubject({
      ...subject,
      world_state: {
        ...subject.world_state,
        active_scene: matchedScene.id,
      },
    });

    addLog(
      `HEX NAVIGATION: TRAVELLED TO ${matchedLoc.name.toUpperCase()} (SCENE '${matchedScene.id}')`,
    );

    // Clear Dialogue history when loading scenes
    setDialogueHistory([]);
    setActiveNodeKey('start');
  };

  // Dice Roller Execution
  const triggerDiceRoll = (
    name: string,
    dc: number,
    skill: string,
    onSuccess: () => void,
  ) => {
    setDiceRollTarget({ name, dc, skill, onSuccess });
    setIsRollingDice(true);
    setDiceResult(null);
    setRollPassed(null);
  };

  const executeDiceRollValue = () => {
    if (!diceRollTarget) return;
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + diceMod;
    const passed = total >= diceRollTarget.dc;
    setDiceResult(d20);
    setRollPassed(passed);

    setTimeout(() => {
      if (passed) {
        diceRollTarget.onSuccess();
        addLog(
          `DICE ROLL SUCCESS: GATHERED Check total of ${total} against DC ${diceRollTarget.dc} for ${diceRollTarget.name}`,
        );
      } else {
        addLog(
          `DICE ROLL FAILURE: Rolled total of ${total} against DC ${diceRollTarget.dc} for ${diceRollTarget.name}`,
        );
      }
    }, 1000);
  };

  // Dialogue Trees Runner
  const elaraDialogue: DialogueTree =
    subject.definitions.dialogue_trees.dt_elara_hub;
  const currentNode: DialogueNode =
    elaraDialogue.nodes[activeNodeKey] || elaraDialogue.nodes['start'];

  const handleDialogueChoice = (option: {
    text: string;
    next_node: string;
    trigger_script?: string;
  }) => {
    // Add player entry to conversation dialogue history
    const nextHist = [
      ...dialogueHistory,
      { sender: 'PLAYER', text: option.text },
      {
        sender: 'ELARA',
        text:
          elaraDialogue.nodes[option.next_node]?.npc_text ||
          '[Conversation Ended]',
      },
    ];
    setDialogueHistory(nextHist);

    if (option.next_node === 'exit_dialogue') {
      addLog(`CONVERSATION COMPLETED WITH ELARA`);
      setActiveNodeKey('start');
    } else {
      setActiveNodeKey(option.next_node);
    }

    // Trigger logical script sequences if defined
    if (option.trigger_script) {
      if (option.trigger_script === 'seq_accept_main_quest') {
        // Complete node_1, activate node_2, set flags
        onUpdateSubject({
          ...subject,
          journal: {
            ...subject.journal,
            main_quest: {
              ...subject.journal.main_quest,
              stages: {
                ...subject.journal.main_quest.stages,
                node_1: {
                  ...subject.journal.main_quest.stages.node_1,
                  state: 'completed',
                },
                node_2: {
                  ...subject.journal.main_quest.stages.node_2,
                  state: 'active',
                },
              },
            },
          },
          world_state: {
            ...subject.world_state,
            flags: {
              ...subject.world_state.flags,
              main_quest_accepted: true,
            },
          },
        });
        addLog(
          `SCRIPT EXECUTION: Quest sequence accepted fully. Main Quest Journal updated!`,
        );
      }
    }
  };

  // Screenplay cutscene simulator ticker
  const selectedScreenplay =
    subject.definitions.screenplays[activeScreenplayKey];

  const handleNextScreenplayBlock = () => {
    if (!selectedScreenplay) return;
    if (screenplayIndex < selectedScreenplay.screenplay_blocks.length - 1) {
      setScreenplayIndex((prev) => prev + 1);

      const nextBlock =
        selectedScreenplay.screenplay_blocks[screenplayIndex + 1];
      if (nextBlock.type === 'vtt_animation') {
        addLog(
          `VTT ANIMATION TRIGGERED: ${nextBlock.target_id} -> ${nextBlock.animation_clip}`,
        );
      }
    } else {
      // Loop or stop
      setIsPlayingScreenplay(false);
      setScreenplayIndex(0);
      addLog(`SCREENPLAY CINEMATICS DISPLAY RE-SYNCHRONIZED`);
    }
  };

  const startScreenplayPlayer = (key: string) => {
    setActiveScreenplayKey(key);
    setIsPlayingScreenplay(true);
    setScreenplayIndex(0);
    setActiveBoardSection('SCREENPLAY');
    addLog(`DM CAM: RUNNING DRAMATIC SCREENPLAY '${key}'`);
  };

  // Combat HP handler
  const hurtVorgungsGhost = (damage: number) => {
    const nextHp = Math.max(0, vorgunGhostHp - damage);
    setVorgunGhostHp(nextHp);
    addLog(
      `COMBAT DEALT: GHOST OF VORGUN HIT FOR ${damage} HP (CURRENT: ${nextHp}/75)`,
    );

    // Add tension die as configured inside on_actor_takes_damage rule
    if (subject.world_state.tension_pool_current_dice < 6) {
      onUpdateSubject({
        ...subject,
        world_state: {
          ...subject.world_state,
          tension_pool_current_dice:
            subject.world_state.tension_pool_current_dice + 1,
        },
      });
      addLog(
        `COMBAT REACTION: Vorgun's spiritual distress inserted 1 Seed into the Tension Pool!`,
      );
    }

    if (nextHp === 0) {
      addLog(
        `VICTORY REPORT: SPATIAL DISTURBANCE CEASED. Vorgun is vanquished or freed!`,
      );
    }
  };

  const resetVorgunGhost = () => {
    setVorgunGhostHp(75);
    addLog(`COMBAT RESET: GHOST SPECS REBORN TO 75/75`);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* DICE ROLLER POPUP MODAL */}
      <AnimatePresence>
        {isRollingDice && diceRollTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-parchment max-w-sm w-full border-4 border-black p-6 shadow-xl flex flex-col gap-4 text-black font-mono text-center"
            >
              <h4 className="font-serif font-black text-xl border-b-2 border-black pb-2 uppercase text-center flex justify-center items-center gap-2">
                <Dices className="w-5 h-5 text-rose-500 animate-bounce" /> Skill
                Check Challenge
              </h4>
              <p className="text-sm">
                ROLLING: <b>{diceRollTarget.name}</b>
              </p>
              <div className="flex justify-between items-center text-xs bg-black/5 p-3 rounded text-left">
                <div>
                  <span className="text-gray-500 block">REQUISITE SKILL</span>
                  <span className="font-bold">
                    {diceRollTarget.skill.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block">
                    DC CHALLENGE Target
                  </span>
                  <span className="font-bold text-rose-600 text-lg">
                    DC {diceRollTarget.dc}
                  </span>
                </div>
              </div>

              {/* RENDER DICE SCORE */}
              <div className="my-4 py-4 border-y border-dashed border-black/30">
                {diceResult === null ? (
                  <button
                    onClick={executeDiceRollValue}
                    className="mx-auto w-32 h-12 bg-black text-parchment font-black hover:bg-neutral-800 tracking-wider text-sm flex items-center justify-center gap-1.5 cursor-pointer rounded shadow-md"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin" /> ROLL d20
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="text-5xl font-black text-emerald-600 tracking-tight flex items-center justify-center gap-2">
                      {diceResult}{' '}
                      <span className="text-sm text-gray-400 font-normal">
                        +{diceMod} Mod
                      </span>
                    </div>
                    <div className="text-xl font-bold">
                      TOTAL SUM: {diceResult + diceMod}
                    </div>
                    <div className="text-xs uppercase mt-1 font-bold">
                      {rollPassed ? (
                        <span className="bg-emerald-500/20 text-emerald-700 px-3 py-1 rounded inline-block animate-bounce border border-emerald-500/30">
                          SUCCESS! CHALLENGE MET
                        </span>
                      ) : (
                        <span className="bg-rose-500/20 text-rose-600 px-3 py-1 rounded inline-block border border-rose-500/30">
                          FAILURE! CHALLENGE MISSED
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsRollingDice(false)}
                className="w-full bg-black/10 py-2 border-2 border-black hover:bg-black/15 font-bold cursor-pointer transition-colors text-xs rounded"
              >
                CLOSE VIEW
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP NAVIGATION TABS ON SCENE BOARD */}
      <div className="flex flex-col gap-4 border-b border-black pb-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
          <div className="flex flex-col">
            <h2 className="font-sans text-2xl font-black uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-6 h-6 text-emerald-500" />
              CHRONOS_VTT_SCENARIO_RUNNER
            </h2>
            <p className="font-serif text-base text-[#4c4546]">
              Navigate hex coords, stage checks, launch dialogue matrix panels,
              or step through dramatic screenplays.
            </p>
          </div>
          <span className="font-mono text-xs text-gray-500 font-bold shrink-0">
            LOCATION: {activeLocation?.name.toUpperCase()} (HEX-ID:{' '}
            {activeLocation?.hexmap_id})
          </span>
        </div>

        {/* Mini Tab Links */}
        <div className="flex flex-wrap gap-1 bg-black/5 p-1 rounded font-mono text-[11px] font-bold">
          <button
            onClick={() => setActiveBoardSection('MAP')}
            className={`px-3 py-1.5 flex items-center gap-1.5 cursor-pointer rounded-sm ${
              activeBoardSection === 'MAP'
                ? 'bg-black text-parchment'
                : 'text-black hover:bg-black/10'
            }`}
          >
            <Map className="w-3.5 h-3.5" /> MAP & ACTIVE ENVIRONMENT
          </button>
          <button
            onClick={() => setActiveBoardSection('SCREENPLAY')}
            className={`px-3 py-1.5 flex items-center gap-1.5 cursor-pointer rounded-sm ${
              activeBoardSection === 'SCREENPLAY'
                ? 'bg-black text-parchment'
                : 'text-black hover:bg-black/10'
            }`}
          >
            <Play className="w-3.5 h-3.5" /> SCREENPLAY READER
          </button>
          <button
            onClick={() => setActiveBoardSection('DIALOGUE')}
            className={`px-3 py-1.5 flex items-center gap-1.5 cursor-pointer rounded-sm ${
              activeBoardSection === 'DIALOGUE'
                ? 'bg-black text-parchment'
                : 'text-black hover:bg-black/10'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> BRANCHING NPC DIALOGUES
          </button>
          <button
            onClick={() => setActiveBoardSection('HANDOUTS')}
            className={`px-3 py-1.5 flex items-center gap-1.5 cursor-pointer rounded-sm ${
              activeBoardSection === 'HANDOUTS'
                ? 'bg-black text-parchment'
                : 'text-black hover:bg-black/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> HANDOUT DOCUMENTS
          </button>
        </div>
      </div>

      {/* PRIMARY ACTIVE INTERFACE BENTO SHIELD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ROW-LEFT (2 COLUMNS): CURRENT SECTION DETAILS */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* TAB SECTION 1: INTERACTIVE SVG HEX MAP & STATE */}
          {activeBoardSection === 'MAP' && (
            <div className="flex flex-col gap-6">
              {/* SVG Hexmap Component */}
              <div className="border-2 border-black p-4 rounded bg-stone-100 flex flex-col items-center justify-center relative min-h-[300px]">
                <div className="absolute top-3 left-3 font-mono text-[9px] uppercase font-black tracking-widest text-[#5e5e5e]">
                  VTT_HEXMAP_GRAPHICAL_OVERVIEW
                </div>

                <div className="absolute top-3 right-3 font-mono text-[10px] text-gray-500 font-bold">
                  Scale: 1 hex = 6 miles OR 5 ft
                </div>

                <svg viewBox="0 0 500 280" className="w-full max-w-md h-auto">
                  {/* Hex geometry renderers (Flat-topped hex layouts) */}
                  <g className="translate-y-5">
                    {/* HEX 00: Oakhaven Village (q=0, r=0) */}
                    <g
                      onClick={() => triggerHexNavigation('hex-00')}
                      className="cursor-pointer group"
                    >
                      <polygon
                        points="150,80 200,50 250,80 250,140 200,170 150,140"
                        className={`stroke-2 transition-colors ${
                          activeLocation?.hexmap_id === 'hex-00'
                            ? 'fill-emerald-500/20 stroke-emerald-600 font-bold text-lg'
                            : 'fill-parchment stroke-black hover:fill-amber-100/40'
                        }`}
                      />
                      <text
                        x="200"
                        y="100"
                        textAnchor="middle"
                        className="font-mono text-[11px] font-black fill-black uppercase tracking-tight"
                      >
                        LOC-00
                      </text>
                      <text
                        x="200"
                        y="120"
                        textAnchor="middle"
                        className="font-serif text-[10px] italic font-bold fill-gray-500"
                      >
                        Oakhaven (Settlement)
                      </text>
                    </g>

                    {/* HEX 01: The Barrowmoors (q=1, r=-1) */}
                    <g
                      onClick={() => triggerHexNavigation('hex-01')}
                      className="cursor-pointer group"
                    >
                      <polygon
                        points="260,110 310,80 360,110 360,170 310,200 260,170"
                        className={`stroke-2 transition-colors ${
                          activeLocation?.hexmap_id === 'hex-01'
                            ? 'fill-emerald-500/20 stroke-emerald-600'
                            : 'fill-parchment stroke-black hover:fill-amber-100/40'
                        }`}
                      />
                      <text
                        x="310"
                        y="130"
                        textAnchor="middle"
                        className="font-mono text-[11px] font-black fill-black uppercase tracking-tight"
                      >
                        LOC-01
                      </text>
                      <text
                        x="310"
                        y="150"
                        textAnchor="middle"
                        className="font-serif text-[10px] italic font-bold fill-gray-500"
                      >
                        Barrowmoors (Wilds)
                      </text>
                    </g>

                    {/* HEX 02: Vorgun's Tomb (q=3, r=-2) */}
                    <g
                      onClick={() => triggerHexNavigation('hex-02')}
                      className="cursor-pointer group"
                    >
                      <polygon
                        points="370,50 420,20 470,50 470,110 420,140 370,110"
                        className={`stroke-2 transition-colors ${
                          activeLocation?.hexmap_id === 'hex-02'
                            ? 'fill-emerald-500/20 stroke-emerald-600'
                            : 'fill-parchment stroke-black hover:fill-amber-100/40'
                        }`}
                      />
                      <text
                        x="420"
                        y="70"
                        textAnchor="middle"
                        className="font-mono text-[11px] font-black fill-black uppercase tracking-tight"
                      >
                        LOC-02
                      </text>
                      <text
                        x="420"
                        y="90"
                        textAnchor="middle"
                        className="font-serif text-[10px] italic font-bold fill-gray-500"
                      >
                        Giant Tomb (Tomb)
                      </text>
                    </g>

                    {/* Connection dotted vectors */}
                    <line
                      x1="225"
                      y1="110"
                      x2="285"
                      y2="140"
                      stroke="black"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      className="opacity-40"
                    />
                    <line
                      x1="335"
                      y1="140"
                      x2="395"
                      y2="80"
                      stroke="black"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      className="opacity-40"
                    />
                  </g>
                </svg>

                <div className="font-mono text-[10px] text-gray-500 text-center uppercase tracking-wide gap-2">
                  <span className="inline-block w-3.5 h-3.5 bg-emerald-500/20 border border-emerald-500 rounded-sm mr-1" />{' '}
                  Active Location Highlight | Click on adjacent hexes to
                  navigate party!
                </div>
              </div>

              {/* ACTIVE SCENE DETAIL BLOCK */}
              <div className="border border-black p-5 rounded flex flex-col gap-4">
                <div className="flex justify-between items-start border-b border-black/15 pb-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase text-gray-500 font-bold">
                      CURRENT ACTIVE SCENE SPECIFICATION
                    </span>
                    <h3 className="font-serif text-lg font-bold">
                      {sanitizeLabel(activeSceneKey)}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-black bg-stone-100 uppercase tracking-widest rounded-sm">
                    {activeLocation?.type.toUpperCase()}
                  </span>
                </div>

                <p className="font-sans text-xs text-neutral-600 leading-relaxed -mt-1 pb-1">
                  This active screen tracks all friendly councilmen or
                  quest-giving entities (actors) and looming dangerous creatures
                  (enemies) discovered within the current coordinate sector.
                </p>

                {/* List actors / quest givers nearby */}
                {activeScene.actors && activeScene.actors.length > 0 && (
                  <div className="p-3 bg-neutral-500/5 border border-black/10 rounded flex flex-col gap-2">
                    <span className="font-mono text-[10px] uppercase text-gray-500 font-bold block">
                      DRAMATIS PERSONAE / ACTORS PRESENT
                    </span>
                    <div className="flex flex-col gap-2 text-xs font-mono">
                      {activeScene.actors.map((actor) => {
                        const definition =
                          subject.definitions.entities.npcs[actor.id];
                        return (
                          <div
                            key={actor.id}
                            className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-black/5 pb-2"
                          >
                            <div>
                              <b className="text-current border-b border-current/25">
                                {definition?.name || actor.id}
                              </b>
                              <span className="text-gray-400 capitalize">
                                {' '}
                                ({actor.role})
                              </span>
                            </div>
                            <div className="flex gap-2 mt-1.5 sm:mt-0">
                              <button
                                onClick={() =>
                                  setActiveBoardSection('DIALOGUE')
                                }
                                className="px-2 py-1 border border-black bg-black text-parchment text-[10px] hover:bg-neutral-800 cursor-pointer font-bold rounded-sm tracking-wider"
                              >
                                ✕ CONVERSE
                              </button>
                              <button
                                onClick={() =>
                                  startScreenplayPlayer(
                                    Object.keys(
                                      subject.definitions.screenplays,
                                    )[0] || 'sp_vorguns_resolution',
                                  )
                                }
                                className="px-2 py-1 border border-black text-[10px] hover:bg-neutral-100 cursor-pointer text-black font-bold rounded-sm"
                              >
                                PLAY CINEMATIC
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Combats / Monsters nearby */}
                {activeScene.encounters && (
                  <div className="p-3 bg-stone-50 border-2 border-rose-600/30 rounded-sm flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] uppercase text-rose-600 font-black tracking-wider flex items-center gap-1 leading-none">
                        <Sword className="w-3.5 h-3.5" /> HOSTILE COMBAT MATRIX
                        LOADED
                      </span>
                      {vorgunGhostHp === 0 ? (
                        <button
                          onClick={resetVorgunGhost}
                          className="font-mono text-[10px] px-2 py-0.5 border border-black hover:bg-black hover:text-white cursor-pointer"
                        >
                          RESPAWN MONSTER
                        </button>
                      ) : null}
                    </div>

                    {activeScene.encounters.map((encounter) => {
                      const entityKey =
                        encounter.actors[0].entity_id.split('.')[1]; // e.g. "vorguns_ghost"
                      const monsterSpec =
                        subject.definitions.entities.monsters[entityKey];
                      return (
                        <div
                          key={encounter.id}
                          className="font-mono text-xs flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-sm font-serif italic text-black font-semibold">
                              {scrub(monsterSpec?.name || 'Attacking Phantom')}
                            </span>
                            <span className="text-rose-600">
                              {vorgunGhostHp} / {monsterSpec?.hp} HP
                            </span>
                          </div>

                          {/* HP progress slide bar */}
                          <div className="w-full bg-stone-200 h-2 rounded overflow-hidden border border-black/15">
                            <div
                              className="bg-rose-600 h-full transition-all duration-300"
                              style={{
                                width: `${(vorgunGhostHp / monsterSpec?.hp) * 100}%`,
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-1 border-t border-black/10 pt-2 text-[10px]">
                            <div>
                              SIZE:{' '}
                              <span className="font-bold">
                                {monsterSpec?.size}
                              </span>
                            </div>
                            <div>
                              STAT_BLOCK:{' '}
                              <span className="font-bold uppercase text-gray-500">
                                {monsterSpec?.base_stat_block}
                              </span>
                            </div>
                          </div>

                          {/* Trigger damage tests */}
                          {vorgunGhostHp > 0 ? (
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={() => hurtVorgungsGhost(10)}
                                className="flex-1 bg-rose-600 text-white py-1.5 hover:bg-rose-500 font-bold border border-rose-700 cursor-pointer rounded-sm"
                              >
                                SLAYER HITS (-10 HP)
                              </button>
                              <button
                                onClick={() => hurtVorgungsGhost(25)}
                                className="flex-1 bg-red-800 text-white py-1.5 hover:bg-red-700 font-bold border border-red-900 cursor-pointer rounded-sm"
                              >
                                METEOR CRITICAL (-25 HP)
                              </button>
                            </div>
                          ) : (
                            <div className="text-center py-2 bg-emerald-500/10 text-emerald-700 font-bold rounded border border-emerald-500/25">
                              VICTORY! Ghost of Vorgun is pacified. Peace
                              restored!
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Interactables Checks checklist */}
                {activeScene.interactables &&
                  activeScene.interactables.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] uppercase text-gray-500 font-bold">
                        ENVIRONMENTAL INTERACTION MODULE
                      </span>
                      <div className="flex flex-col gap-2">
                        {activeScene.interactables.map((item) => {
                          const check = item.script_on_interact;
                          return (
                            <div
                              key={item.id}
                              className="p-3 border border-black/10 rounded flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                            >
                              <div className="font-mono text-xs">
                                <span className="font-bold text-sm block font-serif italic text-black">
                                  {scrub(item.name)}
                                </span>
                                {check ? (
                                  <span className="text-gray-500">
                                    Prerequisite: Challenge DC {check.dc}{' '}
                                    {check.skill.toUpperCase()}
                                  </span>
                                ) : (
                                  <span className="text-emerald-600">
                                    Static Object Interacted
                                  </span>
                                )}
                              </div>

                              {check && (
                                <button
                                  onClick={() =>
                                    triggerDiceRoll(
                                      item.name,
                                      check.dc,
                                      check.skill,
                                      () => {
                                        if (
                                          check.on_success.action ===
                                          'grant_handout'
                                        ) {
                                          onUpdateSubject({
                                            ...subject,
                                            world_state: {
                                              ...subject.world_state,
                                              discovered_clues: [
                                                ...subject.world_state
                                                  .discovered_clues,
                                                check.on_success.handout_id ||
                                                  'handout_thieves_diary',
                                              ],
                                            },
                                          });
                                        } else if (
                                          check.on_success.action ===
                                          'update_world_state'
                                        ) {
                                          onUpdateSubject({
                                            ...subject,
                                            world_state: {
                                              ...subject.world_state,
                                              flags: {
                                                ...subject.world_state.flags,
                                                [check.on_success.key]:
                                                  check.on_success.value,
                                              },
                                            },
                                          });
                                        }
                                      },
                                    )
                                  }
                                  className="bg-emerald-600 text-white hover:bg-emerald-500 font-mono text-[11px] font-bold px-3 py-1.5 border border-emerald-700 cursor-pointer shrink-0 rounded-sm"
                                >
                                  ✕ TEST SKILL DC
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* TAB SECTION 2: INTERACTIVE SCREENPLAY CINEMATIC RUNNER */}
          {activeBoardSection === 'SCREENPLAY' && (
            <div className="border border-black p-5 rounded flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-black/15 pb-2">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase text-gray-500 font-bold">
                    CINEMATICAL AUTOMATION PIPELINE
                  </span>
                  <h3 className="font-serif text-lg font-bold">
                    {scrub(selectedScreenplay?.id || 'System Clip')}
                  </h3>
                </div>

                {/* Switch between screenplays */}
                <select
                  value={activeScreenplayKey}
                  onChange={(e) => {
                    setActiveScreenplayKey(e.target.value);
                    setIsPlayingScreenplay(false);
                    setScreenplayIndex(0);
                  }}
                  className="bg-parchment font-mono text-xs border border-black px-2 py-1 cursor-pointer focus:outline-none"
                >
                  {Object.keys(subject.definitions.screenplays).map((k) => (
                    <option key={k} value={k}>
                      {k.replace('sp_', '').toUpperCase()} SCREENPLAY
                    </option>
                  ))}
                </select>
              </div>

              {/* SCREENPLAY CONTROLS BAR */}
              <div className="bg-black/5 p-3 rounded flex justify-between items-center font-mono text-xs border border-black/10">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsPlayingScreenplay(true);
                      setScreenplayIndex(0);
                    }}
                    className="bg-black text-white px-3 py-1 hover:bg-neutral-800 cursor-pointer font-bold rounded-sm"
                  >
                    START PLAYBACK
                  </button>
                  <button
                    onClick={() => {
                      setIsPlayingScreenplay(false);
                      setScreenplayIndex(0);
                    }}
                    className="border border-black px-3 py-1 hover:bg-gray-100 cursor-pointer rounded-sm"
                  >
                    RESET
                  </button>
                </div>
                <div className="text-gray-500">
                  BLOCK {screenplayIndex + 1} /{' '}
                  {selectedScreenplay?.screenplay_blocks.length}
                </div>
              </div>

              {/* SCRIPT STAGE PLAYBACK PANEL */}
              <div className="bg-stone-900 text-stone-100 p-6 font-mono text-xs min-h-[180px] rounded flex flex-col justify-between border-2 border-black relative">
                {/* Slugline Header */}
                <div className="border-b border-stone-800 pb-2.5 mb-4 text-stone-400 text-[10px] flex justify-between items-center">
                  <span>SLUGLINE: {selectedScreenplay?.slugline.text}</span>
                  {selectedScreenplay?.slugline.vtt_automation && (
                    <span className="text-[9px] px-1 bg-[#1E1B4B] text-amber-400 uppercase rounded border border-amber-400/20">
                      Automation Loaded
                    </span>
                  )}
                </div>

                {/* Render active cinematic screenplay step block ticker */}
                <div className="flex-1 flex flex-col justify-center gap-4 py-2">
                  {isPlayingScreenplay ? (
                    (() => {
                      const curBlock =
                        selectedScreenplay.screenplay_blocks[screenplayIndex];
                      return (
                        <motion.div
                          key={screenplayIndex}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col gap-2 text-center"
                        >
                          {curBlock.type === 'action_line' && (
                            <p className="text-stone-300 italic text-base font-serif px-4">
                              {scrub(curBlock.text || '')}
                            </p>
                          )}
                          {curBlock.type === 'character' && (
                            <div className="font-black text-amber-500 text-sm uppercase tracking-widest mt-2 block">
                              &mdash; {curBlock.name} &mdash;
                            </div>
                          )}
                          {curBlock.type === 'parenthetical' && (
                            <p className="text-stone-400 italic text-xs">
                              ({curBlock.text})
                            </p>
                          )}
                          {curBlock.type === 'dialogue' && (
                            <p className="text-stone-100 text-lg px-6 leading-relaxed my-2 font-serif font-black">
                              &ldquo;{scrub(curBlock.text || '')}&rdquo;
                            </p>
                          )}
                          {curBlock.type === 'vtt_animation' && (
                            <div className="py-2.5 px-4 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded mx-auto text-[10px] uppercase max-w-sm">
                              [VTT EVENT: TRIGGER ANIMATION CLIPPED{' '}
                              {curBlock.animation_clip} TARGET{' '}
                              {curBlock.target_id}]
                            </div>
                          )}
                        </motion.div>
                      );
                    })()
                  ) : (
                    <div className="text-center py-6 text-stone-500 italic">
                      Cinema Player Standby. Select "START PLAYBACK" above to
                      render the theatrical scripting.
                    </div>
                  )}
                </div>

                {/* Bottom Step advances clicker */}
                {isPlayingScreenplay && (
                  <button
                    onClick={handleNextScreenplayBlock}
                    className="w-full bg-[#312E81] text-amber-400 hover:bg-[#3730A3] font-bold text-center py-2.5 mt-4 cursor-pointer outline-none flex justify-center items-center gap-1 border border-indigo-900/40 rounded shadow-md font-mono"
                  >
                    NEXT ACT SCENE STEP <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Slug rules summary log */}
              <div className="text-[10px] font-mono leading-tight text-gray-500 bg-black/5 p-3 rounded">
                <span className="font-bold text-black block mb-1">
                  VTT DIRECT AUTOMATIONS TRIGGERED ON SPEC
                </span>
                * Ext Slugline Dusk triggers: Lighting State <b>village_dusk</b>{' '}
                (#4A5568) & VFX particles <b>heavy_rain_particle</b>.<br />* Int
                Slugline Tomb triggers: Lighting State <b>tomb_interior</b>{' '}
                (#1A1A24) & looping choral choir melodies.
              </div>
            </div>
          )}

          {/* TAB SECTION 3: DIALOGUE TREE PLAYER */}
          {activeBoardSection === 'DIALOGUE' && (
            <div className="border border-black p-5 rounded flex flex-col gap-4">
              <div className="flex gap-2 items-center border-b border-black/15 pb-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                  Converse with Elara (Dialogue Tree Client)
                </h3>
              </div>

              {/* Simulated chat terminal console */}
              <div className="bg-stone-50 border border-black/10 rounded overflow-hidden flex flex-col h-72">
                <div className="bg-black/5 px-3 py-2 font-mono text-[9px] uppercase font-bold text-gray-500 border-b border-black/10">
                  Target_NPC: elara // Dialogue_Model: dt_elara_hub // Node:{' '}
                  {activeNodeKey}
                </div>

                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                  {dialogueHistory.length === 0 ? (
                    <div className="bg-white border p-3.5 rounded shadow-xs font-mono text-xs flex flex-col gap-1.5 max-w-md border-emerald-500/10">
                      <span className="font-bold text-amber-600 block">
                        [INIT GREETING]
                      </span>
                      <p className="font-serif text-sm text-black italic">
                        &ldquo;{scrub(currentNode.npc_text)}&rdquo;
                      </p>
                    </div>
                  ) : (
                    dialogueHistory.map((item, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded max-w-sm font-mono text-xs flex flex-col gap-1 ${
                          item.sender === 'PLAYER'
                            ? 'bg-black text-parchment ml-auto align-end text-right'
                            : 'bg-white text-black text-left border shadow-xs'
                        }`}
                      >
                        <span
                          className={`text-[9px] font-bold ${item.sender === 'PLAYER' ? 'text-amber-400' : 'text-amber-600'}`}
                        >
                          {item.sender === 'PLAYER' ? 'PLAYER PARTY' : 'ELARA'}
                        </span>
                        <p
                          className={`font-serif text-sm italic ${item.sender === 'PLAYER' ? 'normal-case text-amber-200' : 'text-neutral-800'}`}
                        >
                          {scrub(item.text)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* RENDER CURRENT PLAYER RESPONSE PATHS */}
              <div className="flex flex-col gap-2 font-mono">
                <span className="text-[10px] text-gray-500 block uppercase font-bold">
                  SELECT CONVERSATION RESPONSE NODE
                </span>
                {currentNode.player_options &&
                currentNode.player_options.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {currentNode.player_options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleDialogueChoice(option)}
                        className="w-full text-left bg-parchment hover:bg-neutral-50 px-4 py-2.5 border-2 border-black font-semibold text-xs transition-colors flex justify-between items-center cursor-pointer rounded-sm group uppercase"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {option.text}
                        </span>
                        <ChevronRight className="w-4 h-4 text-emerald-500 opacity-60" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setDialogueHistory([]);
                      setActiveNodeKey('start');
                    }}
                    className="w-full bg-black text-parchment py-2 text-center text-xs font-bold cursor-pointer rounded"
                  >
                    Conversation finished. CLICK TO RE-ENGAGE DIALOGUE
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB SECTION 4: HANDOUTS EXAMINER */}
          {activeBoardSection === 'HANDOUTS' && (
            <div className="flex flex-col gap-6">
              {Object.entries(subject.definitions.handouts).map(
                ([hKey, hand]) => {
                  const isDiscovered =
                    subject.world_state.discovered_clues.includes(hKey);
                  return (
                    <div
                      key={hKey}
                      className="border border-black p-5 rounded flex flex-col gap-4 relative overflow-hidden bg-white/20"
                    >
                      <div className="flex justify-between items-start border-b border-black/15 pb-2">
                        <div className="flex flex-col">
                          <span className="font-mono text-[9px] uppercase text-gray-500 font-bold block">
                            GRAL LORE DOCUMENT
                          </span>
                          <h3 className="font-serif text-lg font-bold uppercase">
                            {hKey.replace(/_/g, ' ')}
                          </h3>
                        </div>
                        <span
                          className={`font-mono text-[9px] px-2 py-0.5 border font-semibold rounded uppercase ${
                            isDiscovered
                              ? 'bg-emerald-500/10 border-emerald-600 text-emerald-600'
                              : 'bg-rose-500/10 border-rose-600 text-rose-600'
                          }`}
                        >
                          {isDiscovered ? 'CLUE DISCOVERED' : 'LOCKED / HIDDEN'}
                        </span>
                      </div>

                      {isDiscovered ? (
                        <div className="font-serif italic p-6 border-l-4 border-amber-600 bg-[#FAF7EF] rounded text-base text-stone-800 leading-relaxed shadow-xs">
                          &ldquo;{scrub(hand.content)}&rdquo;
                        </div>
                      ) : (
                        <div className="text-center py-6 bg-stone-100 border border-dashed border-stone-300 rounded text-xs font-mono text-gray-400">
                          This lore document hasn't been discovered in Oakhaven
                          moors camps yet.
                          <br />
                          Complete the dc-12 Investigation challenge skill check
                          on the campsite hex map component above to search.
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>

        {/* ROW-RIGHT (1 COLUMN): VTT ACTIVITY BUFFS LOGGER */}
        <div className="flex flex-col gap-6">
          {/* DIRECT LORE SECRETS LEDGER */}
          <div className="border border-black p-5 rounded flex flex-col gap-4">
            <div className="flex gap-2 items-center border-b border-black/15 pb-2">
              <Compass className="w-4 h-4 text-emerald-500" />
              <h3 className="font-serif font-bold text-lg uppercase tracking-wide">
                Secrets & Clues Ledger
              </h3>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              {Object.entries(subject.lore_web.secrets).map(
                ([sKey, secret]) => {
                  const cluesDiscovered =
                    subject.world_state.discovered_clues.length;
                  const isFullyUnlocked =
                    cluesDiscovered >= secret.clues_required;

                  return (
                    <div
                      key={sKey}
                      className="bg-neutral-500/5 p-3 rounded border border-black/10"
                    >
                      <div className="flex justify-between items-center border-b border-black/10 pb-1 mb-2">
                        <span className="font-bold text-amber-600 uppercase tracking-tight text-[11px]">
                          {secret.id.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          CLUES: {cluesDiscovered} / {secret.clues_required}
                        </span>
                      </div>

                      {isFullyUnlocked ? (
                        <p className="font-serif italic text-sm text-[#2C2115] leading-relaxed">
                          &ldquo;{scrub(secret.truth)}&rdquo;
                        </p>
                      ) : (
                        <p className="text-[10px] text-gray-400 italic">
                          Find {secret.clues_required - cluesDiscovered} more
                          lore clues to resolve truth matrix. Currently
                          discovered files: [
                          {subject.world_state.discovered_clues.join(', ') ||
                            'None'}
                          ]
                        </p>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* PARTY BACKGROUND COUPLING */}
          <div className="border border-black p-5 rounded flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase text-gray-500 block mb-1">
              D&D 5E CHARACTER COUPLING HOOKS
            </span>
            {Object.entries(subject.party_integration.background_hooks).map(
              ([bgk, hook]) => (
                <div
                  key={bgk}
                  className="font-mono text-xs p-3 bg-neutral-500/10 border border-black/10 rounded flex flex-col gap-1.5 leading-snug"
                >
                  <b className="uppercase text-amber-600 font-bold border-b border-black/10 pb-1 flex justify-between items-center">
                    <span>⚓ BACKGROUND: {bgk}</span>
                    <span className="text-[9px] px-1 bg-black text-parchment font-bold rounded">
                      SRD 5.2
                    </span>
                  </b>
                  <p className="font-serif italic text-[11px] text-stone-700 leading-tight">
                    Linked Secret: {hook.linked_secret}
                  </p>
                  <div className="text-[10px] text-[indigo-800] bg-indigo-50 border border-indigo-100 rounded-sm p-1.5 mt-1">
                    <b>MECHANICAL BONUS:</b> {hook.bonus}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* DIRECT LORE ENCOUNTER CHANNELS */}
          <div className="border border-black p-5 rounded flex flex-col gap-3">
            <span className="font-mono text-[9px] uppercase tracking-widest font-black text-gray-500 block mb-1">
              7.1 Real-time Scene Actions Log
            </span>
            <div className="flex flex-col gap-2 h-44 overflow-y-auto scrollbar-none font-mono text-[10px]">
              {activityLogs.length === 0 ? (
                <div className="text-gray-400 italic">
                  Logs clean. Roll dice, switch scenes, or navigate the hex maps
                  above to register automation triggers.
                </div>
              ) : (
                activityLogs.map((item, i) => (
                  <div
                    key={i}
                    className="py-1 border-b border-black/5 text-[#5e5e5e] leading-snug"
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
