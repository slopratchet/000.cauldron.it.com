/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Trophy,
  Sword,
  MessageSquare,
  Flame,
  HelpCircle,
  Dices,
  Award,
} from 'lucide-react';
import { CastMember } from './types';
import { CAST_DATA } from './data';

export default function CastScreen() {
  const [selectedCast, setSelectedCast] = useState<CastMember>(CAST_DATA[0]);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [targetAttackRoll, setTargetAttackRoll] = useState<number | null>(null);
  const [isDueling, setIsDueling] = useState(false);

  const triggerDuel = (member: CastMember) => {
    setIsDueling(true);
    setTargetAttackRoll(null);
    setCombatLog(['Challenging ' + member.name + ' to an initiative duel...']);

    let ticks = 0;
    const interval = setInterval(() => {
      setTargetAttackRoll(Math.floor(Math.random() * 20) + 1);
      ticks++;
      if (ticks > 10) {
        clearInterval(interval);

        const playerRoll = Math.floor(Math.random() * 20) + 1;
        const opponentRoll = Math.floor(Math.random() * 20) + 1;
        setTargetAttackRoll(opponentRoll);

        let resultMessage = '';
        const playerModifier = Math.floor((member.stats.INT - 10) / 2); // default INT check

        if (playerRoll > opponentRoll) {
          resultMessage = `⚔️ VICTORY! You rolled ${playerRoll} against ${member.name}'s ${opponentRoll}. The Archivist notes your outstanding tactical coordination!`;
        } else if (playerRoll === opponentRoll) {
          resultMessage = `🛡️ STALEMATE! Double ${playerRoll} rolled! Your weapons clash and echo across the rafters of the Tavern.`;
        } else {
          resultMessage = `💥 FAILURE! You rolled ${playerRoll} against ${member.name}'s ${opponentRoll}. The Archivist chuckles as you lose your grip on your dice.`;
        }

        setCombatLog([
          `Your Initiative Die: [ ${playerRoll} ]`,
          `${member.name}'s Defensive Initiative: [ ${opponentRoll} ]`,
          resultMessage,
        ]);
        setIsDueling(false);
      }
    }, 100);
  };

  // Helper inside segmented bars
  const renderHPBlocks = (hp: number, maxSegments = 16) => {
    // Generate bars representing segments of HP
    const activeBlocks = Math.ceil((hp / 120) * maxSegments);
    return (
      <div className="flex gap-[1px] bg-[#cfc4c5] p-1 border-2 border-black">
        {Array.from({ length: maxSegments }).map((_, idx) => (
          <div
            key={idx}
            className={`h-5 flex-1 ${
              idx < activeBlocks ? 'bg-black' : 'bg-parchment'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-parchment text-black py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Subsection Header */}
        <div className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#4c4546] border-b border-neutral-400 pb-2 mb-4 uppercase">
          REGISTER III / CHARACTER REFERENCE
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Cast quick-selector directory list */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="border-4 border-black bg-white p-5 shadow-brutalist">
              <h2 className="font-display text-3xl text-black border-b-2 border-black pb-1 mb-4 uppercase">
                THE GUILD ROSTER
              </h2>
              <p className="font-serif text-sm text-[#4c4546] leading-relaxed mb-4">
                These are the five legendary keystones who compose the on-stage
                cast of the Twenty-Sided Tavern. Select a name to read their
                stats, alignment index, and signature maneuvers.
              </p>

              {/* Roster Buttons List */}
              <div className="flex flex-col gap-2">
                {CAST_DATA.map((member) => {
                  const isSelected = selectedCast.id === member.id;
                  return (
                    <button
                      key={member.id}
                      onClick={() => {
                        setSelectedCast(member);
                        setCombatLog([]);
                        setTargetAttackRoll(null);
                      }}
                      className={`w-full text-left font-mono font-bold border-2 p-3 transition-colors duration-150 relative ${
                        isSelected
                          ? 'bg-black text-parchment border-black'
                          : 'bg-parchment hover:bg-parchment-deep text-charcoal border-black'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <span className="text-xs uppercase font-bold text-neutral-400 block tracking-widest">
                            {member.role}
                          </span>
                          <span className="text-sm font-black tracking-wide">
                            {member.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="bg-blood-red text-white text-[9px] px-1.5 py-0.5 uppercase tracking-widest leading-none shrink-0 border border-black">
                            ACTIVE
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Combat simulator log block */}
            <div className="border-4 border-black bg-black text-parchment p-5 shadow-brutalist">
              <h3 className="font-mono font-bold uppercase text-xs tracking-wider text-[#848484] border-b border-neutral-800 pb-1 mb-3 flex items-center justify-between">
                <span>INITIATIVE LOGS</span>
                <Dices className="h-4 w-4 text-blood-red" />
              </h3>

              {combatLog.length === 0 ? (
                <p className="font-serif italic text-xs text-[#848484]">
                  Initiate a friendly challenge against {selectedCast.name} to
                  view the outcome block.
                </p>
              ) : (
                <div className="font-mono text-2xs space-y-1.5 select-none leading-relaxed">
                  {combatLog.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.startsWith('⚔️') || log.startsWith('🛡️')
                          ? 'text-emerald-400 font-extrabold border border-emerald-950 p-1.5 bg-neutral-900'
                          : log.startsWith('💥')
                            ? 'text-rose-400 font-extrabold border border-rose-950 p-1.5 bg-neutral-900'
                            : 'text-[#848484]'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: The selected Cast Member Details Sheet */}
          <div className="lg:col-span-8">
            <div className="border-4 border-black bg-white p-6 md:p-8 shadow-brutalist relative">
              {/* Retro top corner overlay */}
              <div className="absolute top-0 right-0 border-l-4 border-b-4 border-black bg-parchment-deep py-1 px-4 font-mono text-[10px] text-black font-extrabold tracking-widest uppercase">
                {selectedCast.role}
              </div>

              {/* Main Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-neutral-200">
                {/* Woodcut Portrait */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="border-4 border-black p-2 bg-parchment rotate-[-2deg] shadow-brutalist">
                    <img
                      src={selectedCast.woodcutImg}
                      alt={selectedCast.name}
                      referrerPolicy="no-referrer"
                      className="border-2 border-black w-full aspect-[4/5] object-cover grayscale brightness-90 contrast-125"
                    />
                    <div className="font-mono text-[9px] text-center mt-1.5 font-bold uppercase tracking-wider text-neutral-500">
                      [CLASSIFIED_PORTRAIT]
                    </div>
                  </div>
                </div>

                {/* Character Header Details */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h3 className="font-display text-4xl leading-none text-black select-none">
                      {selectedCast.name}
                    </h3>
                    <span className="font-mono text-xs font-bold text-blood-red uppercase tracking-wider">
                      {selectedCast.title}
                    </span>
                  </div>

                  {/* Quote block */}
                  <div className="border-l-4 border-black pl-4 py-1 italic text-charcoal text-base">
                    "{selectedCast.quote}"
                  </div>

                  <p className="font-serif text-sm text-[#4c4546] leading-relaxed">
                    {selectedCast.bio}
                  </p>
                </div>
              </div>

              {/* RPG Stats and HP Indices */}
              <div className="py-6 space-y-6">
                {/* HP Block Bar layout */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs font-black text-black">
                    <span>STRENGTH OF VITALITY (HP CORE):</span>
                    <span className="text-black">
                      {selectedCast.maxHp} / {selectedCast.maxHp} HP
                    </span>
                  </div>
                  {renderHPBlocks(selectedCast.maxHp)}
                </div>

                {/* Attributes 6-Columns Grid */}
                <div>
                  <h4 className="font-mono font-black text-xs uppercase text-black border-b border-neutral-300 pb-1 mb-3">
                    GUILD STATS INDEX
                  </h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {Object.entries(selectedCast.stats).map(
                      ([statName, statVal]) => {
                        const val = statVal as number;
                        return (
                          <div
                            key={statName}
                            className="border-2 border-black bg-parchment p-2.5 text-center shadow-brutalist-sm"
                          >
                            <div className="font-mono text-2xs font-bold text-neutral-400">
                              {statName}
                            </div>
                            <div className="font-display text-2xl text-black font-bold">
                              {val}
                            </div>
                            <div className="font-mono text-[8px] uppercase text-neutral-500 font-extrabold">
                              {val >= 17
                                ? 'SUPERIOR'
                                : val >= 14
                                  ? 'MAJOR'
                                  : 'STANDARD'}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* Action Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
                  <div className="font-mono">
                    <span className="text-2xs text-[#848484] font-bold block uppercase pb-1">
                      SIGNATURE ABILITY:
                    </span>
                    <span className="text-xs font-black tracking-wider text-black bg-parchment-deep py-1 px-2 border border-black uppercase inline-block">
                      {selectedCast.signatureAbility}
                    </span>
                  </div>

                  <div className="flex md:justify-end items-center">
                    <button
                      id={`duel-trigger-btn-${selectedCast.id}`}
                      onClick={() => triggerDuel(selectedCast)}
                      disabled={isDueling}
                      className="border-2 border-black bg-black hover:bg-blood-red hover:border-blood-red text-parchment font-mono font-black text-xs py-2.5 px-5 uppercase tracking-wider shadow-brutalist-sm transition-colors"
                    >
                      {isDueling ? 'DUELING...' : 'CHALLENGE ABILITY!'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
