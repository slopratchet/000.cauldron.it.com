/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import {
  Sparkles,
  Shield,
  User,
  RefreshCw,
  Star,
  Flame,
  Trophy,
  Scroll,
  Compass,
} from 'lucide-react';
import { PlayerCharacter, CharacterClass } from './types';
import { CHARACTER_CLASSES } from './data';

interface HomeScreenProps {
  onJoinParty: () => void;
  onNavigateToFaq: () => void;
}

export default function HomeScreen({
  onJoinParty,
  onNavigateToFaq,
}: HomeScreenProps) {
  const [character, setCharacter] = useState<PlayerCharacter | null>(null);
  const [selectedClass, setSelectedClass] = useState<CharacterClass>(
    CHARACTER_CLASSES[0],
  );
  const [characterName, setCharacterName] = useState('');
  const [isRolling, setIsRolling] = useState(false);
  const [diceHistory, setDiceHistory] = useState<number[]>([]);
  const [drawnDieValue, setDrawnDieValue] = useState<number | null>(null);

  // Roll standard 3d6 (or similar modifiers based on class)
  const rollStat = (multiplier: number, bias = 0) => {
    const r1 = Math.floor(Math.random() * 6) + 1;
    const r2 = Math.floor(Math.random() * 6) + 1;
    const r3 = Math.floor(Math.random() * 6) + 1;
    return r1 + r2 + r3 + bias;
  };

  const generateCharacter = () => {
    setIsRolling(true);
    setDrawnDieValue(null);

    // Simulate dice rolling animation with timer loops
    let ticks = 0;
    const interval = setInterval(() => {
      setDrawnDieValue(Math.floor(Math.random() * 20) + 1);
      ticks++;
      if (ticks > 12) {
        clearInterval(interval);

        const finalD20 = Math.floor(Math.random() * 20) + 1;
        setDrawnDieValue(finalD20);
        setDiceHistory((prev) => [finalD20, ...prev].slice(0, 5));

        const baseStats = selectedClass.abilities;
        const rolledStats = {
          STR: rollStat(1, baseStats.STR > 12 ? 2 : 0),
          DEX: rollStat(1, baseStats.DEX > 12 ? 2 : 0),
          CON: rollStat(1, baseStats.CON > 12 ? 2 : 0),
          INT: rollStat(1, baseStats.INT > 12 ? 2 : 0),
          WIS: rollStat(1, baseStats.WIS > 12 ? 2 : 0),
          CHA: rollStat(1, baseStats.CHA > 12 ? 2 : 0),
        };

        const finalHp =
          selectedClass.baseHp +
          Math.floor(finalD20 * 0.5 * selectedClass.perD20Multiplier);

        const names = [
          'Sir Elliot of Cloud Run',
          'Balthazar the Loud',
          'Anya Swiftblade',
          'Deacon Roderick',
          'Orpheus of Neverwinter',
        ];
        const actualName =
          characterName.trim() ||
          names[Math.floor(Math.random() * names.length)];

        // Select funny vintage backstory based on rolled stats
        const backstories = [
          "Left their home village after accidentally setting the guild's local harvest barn on fire during a magic rehearsal.",
          "Banished from the High Archmage's court for correcting the Archmage's grammar during a solemn treaty ceremony.",
          'Spent three consecutive winters in a mountain cave arguing with a small stone that they believed was a sleeping elemental.',
          'Joined the Twenty-Sided Tavern because of an unpaid tab of 480 silver pieces at the Drunken Wyvern Lodge.',
          'Earned their armor by defeating a minor goblin chieftain in a three-round culinary contest involving questionable mushrooms.',
        ];
        const backstory =
          backstories[Math.floor(Math.random() * backstories.length)];

        const signatureSpell = selectedClass.specialMove;

        setCharacter({
          name: actualName,
          classType: selectedClass.name,
          hp: finalHp,
          stats: rolledStats,
          backstory,
          signatureSpell,
          diceRollsHistory: [finalD20],
        });
        setIsRolling(false);
      }
    }, 85);
  };

  // Helper inside segmented bars
  const renderHPBlocks = (hp: number, maxSegments = 15) => {
    const blocksCount = Math.min(Math.ceil(hp / 8), maxSegments);
    return (
      <div className="flex gap-[2px] bg-parchment-deep p-1.5 border-2 border-black">
        {Array.from({ length: maxSegments }).map((_, idx) => (
          <div
            key={idx}
            className={`h-6 flex-1 border ${
              idx < blocksCount
                ? 'bg-black border-black'
                : 'bg-[#e5e5e5] border-neutral-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-parchment text-black py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: The Vintage Book cover overview */}
        <div className="lg:col-span-5 border-4 border-black bg-white p-8 shadow-brutalist relative">
          {/* Subtle design corners to simulate heavy cardboard rules handbook */}
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-black/20 pointer-events-none" />

          <div className="text-center space-y-6 pt-4 relative">
            <span className="font-mono text-xs tracking-widest bg-black text-parchment py-1 px-3 border border-black uppercase font-bold select-none">
              ★ ADVANCED GUILD RULES ★
            </span>

            <h1 className="font-display text-5xl md:text-6xl tracking-tighter text-black select-none leading-none pt-4 uppercase">
              THE TOME:
              <br />
              <span className="text-blood-red text-6xl md:text-7.5xl">
                1970 EDITION
              </span>
            </h1>

            <div className="flex justify-center py-4">
              <div className="border-4 border-black p-4 bg-parchment inline-block rotate-[-1deg] shadow-brutalist-sm">
                <Scroll className="h-16 w-16 text-black" />
              </div>
            </div>

            <p className="font-serif italic text-md text-[#4c4546] leading-relaxed max-w-sm mx-auto">
              "An interactive tactical gate designed to record, authenticate,
              and coordinate consensus choices during live stage encounters.
              Proceed with caution."
            </p>

            <div className="border-t-2 border-b-2 border-black py-4 my-6">
              <h3 className="font-mono uppercase font-black text-xs tracking-widest text-[#4c4546] mb-3">
                TABLE OF CONTENTS & STATUS
              </h3>
              <ul className="text-left font-mono text-xs space-y-2 font-bold max-w-xs mx-auto text-charcoal">
                <li className="flex justify-between items-center decoration-dotted decoration-neutral-400 border-b border-dashed border-neutral-300 pb-1">
                  <span>SECTION I: RULES INDEX</span>
                  <button
                    onClick={onNavigateToFaq}
                    className="text-blood-red hover:underline uppercase"
                  >
                    [OPEN FAQ]
                  </button>
                </li>
                <li className="flex justify-between items-center border-b border-dashed border-neutral-300 pb-1">
                  <span>SECTION II: THE GUILD CAST</span>
                  <span className="text-neutral-500">READY</span>
                </li>
                <li className="flex justify-between items-center border-b border-dashed border-neutral-300 pb-1">
                  <span>SECTION III: TOUR REGISTER</span>
                  <span className="text-neutral-500">LIVE NOW</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>SECTION IV: SOVEREIGN RECOVERIES</span>
                  <span className="text-emerald-700 font-bold">
                    100% ONLINE
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick action button block */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                id="home-learn-rules-btn"
                onClick={onNavigateToFaq}
                className="border-2 border-black bg-white hover:bg-parchment-deep text-black font-mono font-bold text-xs py-2.5 px-5 uppercase tracking-wider transition-colors duration-150"
              >
                CONSULT RULES (FAQ)
              </button>
              <button
                id="home-pledge-fealty-btn"
                onClick={onJoinParty}
                className="border-2 border-black bg-black hover:bg-blood-red hover:border-blood-red text-parchment font-mono font-extrabold text-xs py-2.5 px-5 uppercase tracking-widest shadow-brutalist-sm transition-colors duration-150"
              >
                PLEDGE FEALTY
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Character Sheet generator */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Block Header */}
          <div className="border-4 border-black bg-white p-6 shadow-brutalist">
            <h2 className="font-display text-3xl md:text-4xl text-black uppercase mb-2 border-b-2 border-black pb-2 flex justify-between items-center">
              <span>CHARACTER ACCREDITATION</span>
              <User className="h-7 w-7 text-black shrink-0" />
            </h2>
            <p className="font-serif text-[#4c4546] text-md leading-relaxed mb-6">
              Establish your sovereign identity before entering the Twenty-Sided
              Tavern arena. Roll a 20-sided die to determine your vital HP pool
              and attributes dynamically.
            </p>

            {/* Entry fields: name and class pick */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Name field */}
              <div className="space-y-1">
                <label className="font-mono text-xs font-black uppercase text-charcoal block">
                  ADVENTURER NOMINATIVE:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sir Elliot of Cloud Run"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  className="w-full border-2 border-black bg-parchment focus:bg-white text-sm font-mono font-bold tracking-wider py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blood-red"
                />
              </div>

              {/* Class selection dropdown */}
              <div className="space-y-1">
                <label className="font-mono text-xs font-black uppercase text-charcoal block">
                  SELECT SPECIALIZED CALLING:
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedClass.name}
                    onChange={(e) => {
                      const found = CHARACTER_CLASSES.find(
                        (c) => c.name === e.target.value,
                      );
                      if (found) setSelectedClass(found);
                    }}
                    className="w-full border-2 border-black bg-parchment text-sm font-mono font-bold py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blood-red"
                  >
                    {CHARACTER_CLASSES.map((cls) => (
                      <option key={cls.name} value={cls.name}>
                        {cls.name} — [HP: {cls.baseHp}]
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Class description microcard */}
            <div className="border-2 border-black bg-parchment p-3 mb-6 font-mono text-xs text-charcoal">
              <span className="text-blood-red font-black uppercase block mb-1">
                CLASS OVERVIEW ({selectedClass.name}):
              </span>
              <p className="font-serif italic text-sm">
                {selectedClass.description}
              </p>
              <div className="mt-2 font-mono text-[10px] text-neutral-500 flex justify-between">
                <span>
                  D20 HP MULTIPLIER: {selectedClass.perD20Multiplier}X
                </span>
                <span>SIGNATURE: {selectedClass.specialMove}</span>
              </div>
            </div>

            {/* Roll Dice Trigger Area */}
            <div className="flex items-center gap-6 border-2 border-black p-4 bg-parchment-deep justify-between">
              <div className="space-y-1">
                <h4 className="font-mono font-black text-xs uppercase text-black">
                  ROLL THE TWENTY-SIDED DIE
                </h4>
                <p className="font-serif italic text-xs text-[#4c4546]">
                  A roll is required to forge your stats and structural
                  lifeforce.
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Visual rolling dice representation */}
                <div
                  className={`relative border-2 border-black bg-white w-12 h-12 flex items-center justify-center font-mono font-black text-lg shadow-brutalist-sm select-none ${isRolling ? 'animate-bounce' : ''}`}
                >
                  {drawnDieValue !== null ? drawnDieValue : 'D20'}
                </div>

                <button
                  id="roll-acc-character-btn"
                  onClick={generateCharacter}
                  disabled={isRolling}
                  className="border-2 border-black bg-black hover:bg-blood-red hover:border-blood-red disabled:bg-neutral-600 text-parchment text-xs font-mono font-black py-2.5 px-4 uppercase tracking-wider transition-colors shadow-brutalist-sm"
                >
                  {isRolling ? 'ROLLING...' : 'ROLL SHEET!'}
                </button>
              </div>
            </div>
          </div>

          {/* Render Result Card details when character is generated */}
          {character && (
            <div
              id="resulted-character-sheet"
              className="border-4 border-black bg-white p-6 shadow-brutalist relative border-t-blood-red border-t-8"
            >
              {/* Badge Badge */}
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 border-2 border-emerald-800 font-mono font-extrabold text-[10px] px-2.5 py-1 uppercase rotate-[4deg]">
                APPROVED BY THE ARCHIVIST
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-4xl text-black leading-none mb-1">
                    {character.name}
                  </h3>
                  <div className="font-mono font-bold text-xs text-neutral-500 uppercase flex items-center gap-2">
                    <span>LEVEL 1 {character.classType}</span>
                    <span>•</span>
                    <span>TAVERN CONSENSUS REGISTERED</span>
                  </div>
                </div>

                {/* HP Block Section */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs font-black text-black">
                    <span>LIFELONG STAMINA INDEX (HP):</span>
                    <span className="text-blood-red font-black">
                      {character.hp} / {character.hp} HP
                    </span>
                  </div>
                  {renderHPBlocks(character.hp)}
                  <span className="font-mono text-[9px] text-neutral-400 block">
                    * SEGMENTS CONSTRUCTED OF SOLID BLACK BLOCKS SEPARATED BY
                    1PX OF PARCHMENT
                  </span>
                </div>

                {/* RPG Attributes Grid */}
                <div>
                  <h4 className="font-mono font-black text-xs uppercase text-black border-b border-neutral-300 pb-1 mb-3">
                    SOVEREIGN CORE ATTRIBUTES (3D6 ROLLS)
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    {Object.entries(character.stats).map(([stat, val]) => {
                      const numVal = val as number;
                      return (
                        <div
                          key={stat}
                          className="border-2 border-black bg-parchment p-2 text-center shadow-brutalist-sm"
                        >
                          <div className="font-mono text-2xs font-bold text-neutral-400">
                            {stat}
                          </div>
                          <div className="font-display text-2xl text-black font-black">
                            {numVal}
                          </div>
                          <div className="font-mono text-[9px] text-[#4c4546] font-extrabold">
                            {numVal >= 15 ? '+3' : numVal >= 12 ? '+1' : '0'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lore and Special Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-200 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-[#4c4546] font-black uppercase text-2xs block">
                      SIGNATURE MOVE:
                    </span>
                    <span className="text-blood-red font-black tracking-wide uppercase">
                      {character.signatureSpell}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#4c4546] font-black uppercase text-2xs block animate-pulse">
                      INITIATIVE DICE SEED:
                    </span>
                    <span className="text-black font-black">
                      NATURAL {character.diceRollsHistory[0]} (d20)
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-black pl-4 py-1 italic text-sm text-[#4c4546] leading-relaxed">
                  "{character.backstory}"
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
