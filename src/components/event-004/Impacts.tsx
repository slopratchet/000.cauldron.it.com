import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Compass,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react';
import { generateChallengeId, getImaginativeTitleFromId } from './utils';

interface MechanicalChallengeItem {
  id: string;
  sceneId: string;
  sceneName: string;
  npcOrHazard: string;
  context: string;
  type: 'social' | 'exploration';
  skill: string;
  dc: number;
  successOutcome: string;
  failureOutcome: string;
}

function getImaginativeTitle(item: MechanicalChallengeItem): string {
  return getImaginativeTitleFromId(item.id, item.npcOrHazard, item.skill);
}

function getAlignedScriptsAndSequences(challengeId: string): {
  sequences: string[];
  signatures: string[];
} {
  const id = challengeId.toUpperCase();

  if (id.includes('ELARA') && id.includes('INSIGHT')) {
    return {
      sequences: ['seq_elara_greeting', 'seq_accept_main_quest'],
      signatures: [
        'initiate_dialogue',
        'update_journal_node',
        'update_world_state',
      ],
    };
  }
  if (id.includes('ARGUN') && id.includes('PERSUASION')) {
    return {
      sequences: ['seq_appease_village_council'],
      signatures: ['grant_currency', 'update_faction_relation'],
    };
  }
  if (id.includes('ARGUN') && id.includes('INTIMIDATION')) {
    return {
      sequences: ['seq_appease_village_council'],
      signatures: ['update_faction_relation'],
    };
  }
  if (id.includes('REYNA') && id.includes('HISTORY')) {
    return {
      sequences: ['seq_accept_main_quest'],
      signatures: ['update_world_state', 'update_journal_node'],
    };
  }
  if (id.includes('BARKEEP')) {
    return {
      sequences: ['seq_accept_main_quest'],
      signatures: ['grant_item', 'update_world_state'],
    };
  }
  if (id.includes('NEXUS') && id.includes('ARCANA')) {
    return {
      sequences: ['seq_summon_weather_ward', 'seq_wild_magic_surge'],
      signatures: ['consume_spell_slot', 'spawn_entity', 'apply_vfx'],
    };
  }
  if (id.includes('WANDERER') && id.includes('PERSUASION')) {
    return {
      sequences: ['seq_guardian_peace'],
      signatures: ['update_faction_relation', 'play_cutscene'],
    };
  }
  if (id.includes('WANDERER') && id.includes('HISTORY')) {
    return {
      sequences: ['seq_guardian_peace', 'seq_activate_monolith'],
      signatures: ['update_world_state'],
    };
  }
  if (id.includes('CORBIN') && id.includes('DECEPTION')) {
    return {
      sequences: ['seq_accept_main_quest'],
      signatures: ['grant_item', 'update_world_state'],
    };
  }
  if (id.includes('CARGO') && id.includes('ATHLETICS')) {
    return {
      sequences: ['seq_disarm_coffin_trap'],
      signatures: ['grant_item', 'update_journal_node'],
    };
  }
  if (id.includes('CARGO') && id.includes('THIEVES_TOOLS')) {
    return {
      sequences: ['seq_disarm_coffin_trap'],
      signatures: ['disable_entity', 'grant_item', 'update_journal_node'],
    };
  }

  return {
    sequences: ['seq_accept_main_quest'],
    signatures: ['update_world_state'],
  };
}

function getFailureSignatures(challengeId: string): string[] {
  const id = challengeId.toUpperCase();

  if (id.includes('ELARA') && id.includes('INSIGHT')) {
    return [
      'decrease_faction_relation',
      'apply_status_effect',
      'update_journal_node',
    ];
  }
  if (id.includes('ARGUN') && id.includes('PERSUASION')) {
    return [
      'trigger_environment_hazard',
      'raise_alarm',
      'decrease_faction_relation',
    ];
  }
  if (id.includes('ARGUN') && id.includes('INTIMIDATION')) {
    return ['spawn_entity', 'start_combat', 'raise_alarm'];
  }
  if (id.includes('REYNA') && id.includes('HISTORY')) {
    return [
      'update_world_state',
      'apply_status_effect',
      'decrease_faction_relation',
    ];
  }
  if (id.includes('BARKEEP')) {
    return ['decrease_faction_relation', 'raise_alarm', 'apply_status_effect'];
  }
  if (id.includes('NEXUS') && id.includes('ARCANA')) {
    return [
      'spawn_entity',
      'apply_vfx',
      'apply_status_effect',
      'consume_spell_slot',
    ];
  }
  if (id.includes('WANDERER') && id.includes('PERSUASION')) {
    return ['spawn_entity', 'start_combat', 'decrease_faction_relation'];
  }
  if (id.includes('WANDERER') && id.includes('HISTORY')) {
    return [
      'decrease_faction_relation',
      'apply_status_effect',
      'update_world_state',
    ];
  }
  if (id.includes('CORBIN') && id.includes('DECEPTION')) {
    return ['raise_alarm', 'spawn_entity', 'decrease_faction_relation'];
  }
  if (id.includes('CARGO') && id.includes('ATHLETICS')) {
    return [
      'trigger_environment_hazard',
      'apply_status_effect',
      'update_journal_node',
    ];
  }
  if (id.includes('CARGO') && id.includes('THIEVES_TOOLS')) {
    return [
      'trigger_environment_hazard',
      'apply_status_effect',
      'update_journal_node',
    ];
  }

  return ['apply_status_effect', 'update_world_state'];
}

export function MechanicalSkillChallenges({
  activeAdventure,
}: {
  activeAdventure: unknown;
}) {
  // Helper to get type-safe entries of an object
  const entries = (obj: unknown): [string, unknown][] =>
    Object.entries(obj || {});

  // Extract all mechanical skill challenges dynamically from all active scenes
  const challengesList: MechanicalChallengeItem[] = [];

  if (activeAdventure && activeAdventure.scenes) {
    entries(activeAdventure.scenes).forEach(([sceneId, scene]) => {
      const sceneTitleClean = sceneId
        .replace('scene_', '')
        .replace(/_/g, ' ')
        .toUpperCase();

      // Process Social / Conversational Encounters
      if (scene.social_encounters && Array.isArray(scene.social_encounters)) {
        scene.social_encounters.forEach((soc: unknown) => {
          if (soc.skill_challenges && Array.isArray(soc.skill_challenges)) {
            soc.skill_challenges.forEach((chal: unknown) => {
              const mscId = generateChallengeId(
                sceneId,
                'soc',
                soc.id || soc.npc_id,
                chal.skill,
              );
              challengesList.push({
                id: mscId,
                sceneId,
                sceneName: sceneTitleClean,
                npcOrHazard: soc.npc_name || soc.npc_id,
                context: soc.context,
                type: 'social',
                skill: chal.skill,
                dc: chal.dc,
                successOutcome: chal.success_outcome,
                failureOutcome: chal.failure_outcome,
              });
            });
          }
        });
      }

      // Process Exploration Encounters
      if (
        scene.exploration_encounters &&
        Array.isArray(scene.exploration_encounters)
      ) {
        scene.exploration_encounters.forEach((exp: unknown) => {
          if (exp.skill_challenges && Array.isArray(exp.skill_challenges)) {
            exp.skill_challenges.forEach((chal: unknown) => {
              const mscId = generateChallengeId(
                sceneId,
                'exp',
                exp.id || exp.name,
                chal.skill,
              );
              challengesList.push({
                id: mscId,
                sceneId,
                sceneName: sceneTitleClean,
                npcOrHazard: exp.name || exp.hazard_or_feature,
                context: exp.context,
                type: 'exploration',
                skill: chal.skill,
                dc: chal.dc,
                successOutcome: chal.success_outcome,
                failureOutcome: chal.failure_outcome,
              });
            });
          }
        });
      }
    });
  }

  return (
    <section
      id="section-mechanical-challenges"
      className="border border-black p-6 rounded bg-amber-50/15 flex flex-col gap-6 select-all w-full mt-6"
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black pb-4 gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-800 animate-pulse" />
          <h2 className="font-serif text-xl font-black uppercase tracking-wide text-neutral-900">
            Mechanical Skill Challenges
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-250 px-2.5 py-1 rounded">
          <span>
            Active Challenge Nodes:{' '}
            <b>{challengesList.length} Integrated Matrices</b>
          </span>
        </div>
      </div>

      {/* Grid of Challenges */}
      {challengesList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...challengesList]
            .sort((a, b) =>
              getImaginativeTitle(a).localeCompare(getImaginativeTitle(b)),
            )
            .map((item) => {
              const alignedScripts = getAlignedScriptsAndSequences(item.id);

              return (
                <div
                  key={item.id}
                  id={`mechanical-challenge-card-${item.id}`}
                  className="border-2 border-stone-300 rounded-lg bg-white p-5 shadow-sm flex flex-col justify-between scroll-mt-24 cursor-default select-none text-left"
                >
                  <div className="flex flex-col gap-2.5">
                    {/* Header scene label & type badge (Moved above Title box) */}
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                      <span className="font-mono text-[8.5px] text-neutral-400 font-bold tracking-widest block uppercase">
                        🎬 {item.sceneName}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border flex items-center gap-1 ${
                          item.type === 'social'
                            ? 'bg-blue-50 border-blue-200 text-blue-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}
                      >
                        {item.type === 'social' ? (
                          <>
                            <MessageSquare className="w-3 h-3 text-blue-700" />
                            SOCIAL ENCOUNTER
                          </>
                        ) : (
                          <>
                            <Compass className="w-3 h-3 text-emerald-700" />
                            EXPLORATION
                          </>
                        )}
                      </span>
                    </div>

                    {/* DYNAMIC IMAGINATIVE TITLE HEADER PANEL */}
                    <div className="bg-neutral-900 text-[#F5F2E9] p-3.5 rounded-lg border border-neutral-800/85 -mx-1 flex items-center justify-between shadow-sm">
                      <div className="font-serif font-black text-amber-300 text-xs sm:text-[13.5px] tracking-wide select-all leading-snug">
                        {getImaginativeTitle(item)}
                      </div>
                    </div>

                    {/* Challenge Target and DC Box */}
                    <div className="flex flex-col gap-1 bg-amber-50/20 p-2.5 rounded border border-amber-900/10">
                      <span className="font-mono text-[8px] font-black text-neutral-400 uppercase tracking-wider block">
                        Mechanical Check Target
                      </span>
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-black text-sm text-neutral-900 uppercase">
                          {item.skill}
                        </span>
                        <span className="font-mono text-3xl font-black text-amber-900 bg-amber-100/60 border border-amber-300/60 px-3 py-1.5 rounded">
                          DC {item.dc}
                        </span>
                      </div>
                      {item.context && (
                        <p className="mt-1.5 text-xl text-neutral-600 italic leading-relaxed border-t border-amber-900/5 pt-2">
                          📄 Context: {item.context}
                        </p>
                      )}
                    </div>

                    {/* Associated Encounter or NPC */}
                    <div className="flex items-center gap-1.5 font-sans text-xs">
                      <span className="font-mono text-[8.5px] text-neutral-400 uppercase font-medium">
                        ASSOCIATED ENCOUNTER:
                      </span>
                      <span className="font-mono text-[9px] text-stone-700 font-bold">
                        {item.npcOrHazard}
                      </span>
                    </div>

                    {/* Outcomes */}
                    <div className="flex flex-col gap-2 mt-1">
                      {/* Success State */}
                      <div className="bg-emerald-500/[0.02] border border-emerald-500/15 p-3 rounded-lg flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold text-emerald-800">
                          <span>🟢</span> <span>ON SUCCESS ROUTINE</span>
                        </div>
                        <p className="font-sans text-xs text-neutral-700 leading-relaxed italic">
                          &ldquo;{item.successOutcome}&rdquo;
                        </p>

                        {/* Connected Scripts & Sequences List */}
                        <div className="border-t border-emerald-500/10 pt-2 mt-1 flex flex-col gap-2">
                          {/* Sequences listed first */}
                          {alignedScripts.sequences &&
                            alignedScripts.sequences.length > 0 && (
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[8px] font-extrabold text-neutral-400 uppercase tracking-wider block">
                                  Connected Sequences
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {alignedScripts.sequences.map((seqId) => (
                                    <code
                                      key={seqId}
                                      className="text-[8.5px] bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-1.5 py-0.5 rounded font-mono font-bold"
                                    >
                                      {seqId}
                                    </code>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Automated Script Signatures listed second (below Sequences) */}
                          {alignedScripts.signatures &&
                            alignedScripts.signatures.length > 0 && (
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[8px] font-extrabold text-neutral-400 uppercase tracking-wider block">
                                  Automated Script Signatures
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {alignedScripts.signatures.map((sigId) => (
                                    <code
                                      key={sigId}
                                      className="text-[8.5px] bg-amber-50 text-amber-800 border border-amber-200/50 px-1.5 py-0.5 rounded font-mono font-bold"
                                    >
                                      {sigId}
                                    </code>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Failure State */}
                      <div className="bg-rose-500/[0.02] border border-rose-500/15 p-3 rounded-lg flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold text-rose-800">
                          <span>🔴</span> <span>ON FAILURE ROUTINE</span>
                        </div>
                        <p className="font-sans text-xs text-[#8c3535] leading-relaxed italic">
                          &ldquo;{item.failureOutcome}&rdquo;
                        </p>

                        {/* Connected Failure Script Signatures */}
                        {getFailureSignatures(item.id) &&
                          getFailureSignatures(item.id).length > 0 && (
                            <div className="border-t border-rose-500/10 pt-2 mt-1 flex flex-col gap-1">
                              <span className="font-mono text-[8px] font-extrabold text-neutral-400 uppercase tracking-wider block">
                                Automated Script Signatures
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {getFailureSignatures(item.id).map((sigId) => (
                                  <code
                                    key={sigId}
                                    className="text-[8.5px] bg-rose-50 text-rose-800 border border-rose-200/50 px-1.5 py-0.5 rounded font-mono font-bold"
                                  >
                                    {sigId}
                                  </code>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Footer descriptor */}
                  <div className="mt-4 pt-3 border-t border-dashed border-neutral-150 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                    <span>NODE_REF: {item.id.substring(0, 24)}...</span>
                    <span className="uppercase text-[8.5px] bg-neutral-100 text-neutral-500 px-1 py-0.5 rounded border border-neutral-200">
                      Dual-Consequence matrix
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="border border-dashed border-neutral-300 p-8 rounded text-center text-neutral-500 font-sans text-xs bg-white flex flex-col items-center gap-2">
          <AlertCircle className="w-5 h-5 text-neutral-400" />
          <p className="font-bold">No mechanical skill challenges cataloged</p>
        </div>
      )}
    </section>
  );
}

// Alias to maintain compatibility with any external default reference or App.tsx imports originally referencing Impacts
export const Impacts = MechanicalSkillChallenges;
