import React, { useState } from 'react';
import { manualSections } from './data/manualData';
import { ManualItem } from './types';
import {
  Search,
  UserPlus,
  Dice5,
  HelpCircle,
  Ship,
  BookOpen,
} from 'lucide-react';

interface IndexScreenProps {
  onSelectItem: (item: ManualItem) => void;
  onOpenDiceRoller: () => void;
  onJoinPartyClick: () => void;
}

export default function IndexScreen({
  onSelectItem,
  onOpenDiceRoller,
  onJoinPartyClick,
}: IndexScreenProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle lookup searching across all items
  const allItems = manualSections.flatMap((section) => section.items);
  const filteredItems = searchQuery
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const handleSearchSelect = (item: ManualItem) => {
    onSelectItem(item);
    setSearchQuery('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 select-none">
      {/* Main Title Banner */}
      <section className="my-8">
        <h2 className="font-accent text-6xl uppercase tracking-tighter text-black md:text-[110px] md:leading-[105px]">
          SYSTEM INDEX
        </h2>
        <div className="mt-2 flex flex-col justify-between font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500 sm:flex-row">
          <span>DATA STACK // REFERENCE MANUAL V.70 // ACCESS: GRANTED</span>
        </div>
        <div className="mt-4 h-1.5 bg-black" />
      </section>

      {/* Interactive Search Tool */}
      <div className="relative mb-8 w-full">
        <div className="flex border-2 border-[#1b1b1b] bg-white shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
          <input
            id="index-search-input"
            type="text"
            placeholder="TERM QUERY (e.g. Rage, Apocalypse, Dice)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full font-mono text-xs px-3 py-2 outline-none uppercase placeholder:text-neutral-400"
          />
          <div className="flex items-center gap-1.5 border-l-2 border-[#1b1b1b] bg-neutral-100 px-3 font-mono text-[10px] font-bold text-neutral-500">
            <Search className="h-3.5 w-3.5 text-neutral-400" /> QUERY
          </div>
        </div>

        {/* Search Results Dropdown Overlay */}
        {searchQuery && (
          <div className="absolute z-10 mt-2 w-full border-2 border-[#1b1b1b] bg-white p-2 font-mono shadow-[4px_4px_0px_0px_rgba(27,27,27,1)]">
            <p className="border-b border-[#1b1b1b]/10 pb-1 text-[10px] font-bold text-neutral-400 uppercase">
              QUERY REGISTER OUTCOME ({filteredItems.length} FOUND)
            </p>
            {filteredItems.length > 0 ? (
              <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearchSelect(item)}
                    className="flex w-full cursor-pointer justify-between py-2.5 px-1.5 text-left text-xs uppercase hover:bg-neutral-100 font-semibold text-[#1b1b1b]"
                  >
                    <span>{item.title}</span>
                    <span className="text-blood-red font-bold">
                      PAGE {item.page}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="p-3 text-center text-xs italic text-neutral-500">
                No archives match the query.
              </p>
            )}
          </div>
        )}
      </div>

      {/* SCRIPT Section Header */}
      <div className="mt-8">
        <h3 className="font-accent text-[84px] leading-none uppercase tracking-widest text-[#1b1b1b]">
          SCRIPT
        </h3>
      </div>

      {/* Informational Action Boxes */}
      <section className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Dice Tool Banner block */}
        <div className="flex items-start gap-4 border-2 border-[#1b1b1b] bg-[#e6e2d8]/20 p-5 shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]">
          <div className="border-2 border-[#1b1b1b] bg-white p-2 text-amber-700 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)] select-none">
            <Dice5 className="h-6 w-6 stroke-[2]" />
          </div>
          <div>
            <h4 className="font-accent text-lg uppercase tracking-wide text-[#1b1b1b]">
              primal mama
            </h4>
            <p className="font-serif text-sm text-neutral-600 mt-1">
              Roll real ten-sided dice inside our operational mainframe
              simulator. Test dice pools, target difficulties, and analyze
              cancellations.
            </p>
          </div>
        </div>

        {/* Character Directory Block */}
        <div className="flex items-start gap-4 border-2 border-[#1b1b1b] bg-[#e6e2d8]/20 p-5 shadow-[4px_4px_0px_0px_rgba(212,74,0,1)]">
          <div className="border-2 border-[#1b1b1b] bg-white p-2 text-blood-red shadow-[2px_2px_0px_0px_rgba(27,27,27,1)] select-none">
            <UserPlus className="h-6 w-6 stroke-[2]" />
          </div>
          <div>
            <h4 className="font-accent text-lg uppercase tracking-wide text-[#1b1b1b]">
              slopratchet
            </h4>
            <p className="font-serif text-sm text-neutral-600 mt-1">
              Connect your character file to the 1970 manual register. Unlock
              customized werewolf lineage records and tribe alignments.
            </p>
          </div>
        </div>
      </section>

      {/* Persistent Page Divider Bar */}
      <div className="mt-12 h-0.5 bg-[#1b1b1b]" />

      {/* 4-Column Table of Contents Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
        {/* ================= COLUMN 1 ================= */}
        <div className="flex flex-col">
          <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
            DECK_01 // KNOW
          </div>

          <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
            {/* Title Block with Red Page Number */}
            <div className="flex justify-between items-baseline border-b border-neutral-300 pb-3 mb-4">
              <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                Know
              </h3>
              <span className="font-accent text-[34px] text-blood-red select-none pl-2">
                09
              </span>
            </div>

            {/* List Items */}
            <div className="space-y-4">
              {/* Welcome to a Dying World */}
              <div
                id="item-welcome-to-a-dying-world"
                className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
              >
                <span className="font-semibold text-left underline-offset-4">
                  Welcome to a Dying World
                </span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  10
                </span>
              </div>

              {/* Walkers Between Worlds (Indented) */}
              <div
                id="item-walkers-between-worlds"
                className="group flex w-full items-end justify-between pl-6 font-serif text-[17px] text-neutral-600"
              >
                <span className="italic text-left">Walkers Between Worlds</span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/15" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  10
                </span>
              </div>

              {/* What Do Werewolves Do? */}
              <div
                id="item-what-do-werewolves-do"
                className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
              >
                <span className="font-semibold text-left">
                  What Do Werewolves Do?
                </span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  11
                </span>
              </div>

              {/* Storytelling Games */}
              <div className="space-y-3">
                <div
                  id="item-storytelling-games"
                  className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
                >
                  <span className="font-semibold text-left">
                    Storytelling Games
                  </span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    11
                  </span>
                </div>

                {/* The Storyteller (Indented) */}
                <div
                  id="item-the-storyteller"
                  className="group flex w-full items-end justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic text-left">The Storyteller</span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/15" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    11
                  </span>
                </div>

                {/* The Players (Indented) */}
                <div
                  id="item-the-players"
                  className="group flex w-full items-end justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic text-left">The Players</span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/15" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    12
                  </span>
                </div>
              </div>

              {/* Lexicon */}
              <div
                id="item-lexicon"
                className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] pt-2"
              >
                <span className="font-semibold text-left">Lexicon</span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  15
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2 ================= */}
        <div className="flex flex-col">
          <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
            DECK_02 // ACTOR
          </div>

          <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
            {/* Title block with Red Page number */}
            <div className="flex justify-between items-baseline border-b border-neutral-300 pb-3 mb-4">
              <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                Actor
              </h3>
              <span className="font-accent text-[34px] text-blood-red select-none pl-2">
                17
              </span>
            </div>

            {/* List Items */}
            <div className="space-y-5">
              {/* Age of Apocalypse */}
              <div>
                <div
                  id="item-age-of-apocalypse"
                  className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
                >
                  <span className="font-semibold text-left">
                    Age of Apocalypse
                  </span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    17
                  </span>
                </div>

                {/* Cometh the Hour (Indented) */}
                <div
                  id="item-cometh-the-hour"
                  className="group mt-2.5 flex w-full items-end justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic text-left">Cometh the Hour</span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/15" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    18
                  </span>
                </div>
              </div>

              {/* Endless Enemies */}
              <div className="space-y-4 pt-1">
                <div
                  id="item-endless-enemies"
                  className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
                >
                  <span className="font-semibold text-left">
                    Endless Enemies
                  </span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    30
                  </span>
                </div>

                {/* Agents of Entropy (Indented) */}
                <div
                  id="item-agents-of-entropy"
                  className="group flex w-full items-end justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic text-left">Agents of Entropy</span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/15" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    30
                  </span>
                </div>

                {/* Agents of Stasis (Indented) */}
                <div
                  id="item-agents-of-stasis"
                  className="group flex w-full items-end justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic text-left">Agents of Stasis</span>
                  <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/15" />
                  <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                    31
                  </span>
                </div>
              </div>

              {/* Graphic/Atmospheric spacing block with high-contrast text */}
              <div className="mt-8 border border-neutral-300 p-4 font-mono text-[11px] leading-relaxed text-neutral-500 bg-[#e6e2d8]/20 bg-[radial-gradient(#cfc4c5_1px,transparent_1px)] [background-size:12px_12px]">
                <p className="font-bold text-[#1b1b1b] uppercase">
                  MEM_INTEGRITY: OK
                </p>
                <p className="mt-1">
                  1970 System manual archives are loaded. Use the Term Query
                  input field above to find and view specific manual rules,
                  combat steps, or tribe definitions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 3 ================= */}
        <div className="flex flex-col">
          <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
            DECK_03 // ACTION
          </div>

          <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
            {/* Title block with Action (no page number) */}
            <div className="border-b border-neutral-300 pb-3 mb-4">
              <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                Action
              </h3>
            </div>

            {/* List with no page numbers as in screenshot */}
            <div className="space-y-4">
              {/* Time */}
              <div
                id="item-rule-time"
                className="group flex w-full justify-between font-serif text-[17px] font-semibold text-[#1b1b1b]"
              >
                <span>Time</span>
              </div>

              {/* Using Dice */}
              <div className="space-y-2">
                <div
                  id="item-rule-using-dice"
                  className="group flex w-full justify-between font-serif text-[17px] font-semibold text-[#1b1b1b]"
                >
                  <span>Using Dice</span>
                </div>

                {/* Simple Tests (Indented) */}
                <div
                  id="item-rule-simple-tests"
                  className="group flex w-full justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic">Simple Tests</span>
                </div>

                {/* Dice Pools (Indented) */}
                <div
                  id="item-rule-dice-pools"
                  className="group flex w-full justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic">Dice Pools</span>
                </div>
              </div>

              {/* The Golden Rule */}
              <div
                id="item-rule-the-golden-rule"
                className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
              >
                <span className="font-semibold text-left">The Golden Rule</span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  131
                </span>
              </div>

              {/* Ways of the Werewolves */}
              <div className="space-y-2 pt-1">
                <div
                  id="item-rule-ways-of-the-werewolves"
                  className="group flex w-full justify-between font-serif text-[17px] font-semibold text-[#1b1b1b]"
                >
                  <span>Ways of the Werewolves</span>
                </div>

                {/* Rage (Indented) */}
                <div
                  id="item-rule-rage"
                  className="group flex w-full justify-between pl-6 font-serif text-[17px] text-neutral-600"
                >
                  <span className="italic">Rage</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 4 ================= */}
        <div className="flex flex-col">
          <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
            DECK_04 // ARTEFACT
          </div>

          <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
            {/* Title block with Artefact and Page Number */}
            <div className="flex justify-between items-baseline border-b border-neutral-300 pb-3 mb-4">
              <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                Artefact
              </h3>
              <span className="font-accent text-[34px] text-blood-red select-none pl-2">
                180
              </span>
            </div>

            {/* List items for Artefact */}
            <div className="space-y-4">
              {/* Grandfang Glaive */}
              <div
                id="item-grandfang-glaive"
                className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
              >
                <span className="font-semibold text-left">
                  Grandfang Glaive
                </span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  180
                </span>
              </div>

              {/* Weaver's Collar */}
              <div
                id="item-weavers-collar"
                className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
              >
                <span className="font-semibold text-left">Weaver's Collar</span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  184
                </span>
              </div>

              {/* The Midnight Core */}
              <div
                id="item-midnight-core"
                className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b]"
              >
                <span className="font-semibold text-left">
                  The Midnight Core
                </span>
                <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors">
                  190
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright section is handled globally in App.tsx */}
    </div>
  );
}
