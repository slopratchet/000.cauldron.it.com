import React, { useState } from 'react';
import { manualSections } from '../data/manualData';
import { ManualItem } from '../types';
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
        <button
          onClick={onJoinPartyClick}
          className="text-left w-full flex items-start gap-4 border-2 border-[#1b1b1b] bg-[#e6e2d8]/20 p-5 shadow-[4px_4px_0px_0px_rgba(212,74,0,1)] hover:bg-[#e6e2d8]/40 transition-colors cursor-pointer"
        >
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
        </button>
      </section>

      {/* Persistent Page Divider Bar */}
      <div className="mt-12 h-0.5 bg-[#1b1b1b]" />

      {/* 2-Column Table of Contents Grid: exactly two decks per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        {manualSections.map((section) => (
          <div key={section.id} className="flex flex-col">
            <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
              {section.deckLabel}
            </div>

            <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)] relative">
              {/* Title Block with Red Page Number */}
              <div className="flex justify-between items-baseline border-b border-neutral-300 pb-3 mb-4">
                <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                  {section.title}
                </h3>
                <span className="font-accent text-[34px] text-blood-red select-none pl-2">
                  {section.page.toString().padStart(2, '0')}
                </span>
              </div>

              {/* List Items */}
              <div className="space-y-4">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`group flex w-full items-end justify-between font-serif text-[17px] hover:text-blood-red transition-colors ${
                      item.indent ? 'pl-6 text-neutral-600' : 'text-[#1b1b1b]'
                    }`}
                  >
                    <span
                      className={`text-left ${item.indent ? 'italic' : 'font-semibold'} group-hover:underline decoration-1 underline-offset-4`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`mx-2 mb-1 flex-grow border-b border-dotted ${item.indent ? 'border-[#1b1b1b]/15' : 'border-[#1b1b1b]/30'}`}
                    />
                    <span className="font-mono text-xs font-bold bg-neutral-200/50 px-1.5 transition-colors group-hover:bg-blood-red group-hover:text-white">
                      {item.page}
                    </span>
                  </button>
                ))}
              </div>

              {/* Optional Section Description / Note block (hardcoded in original for Deck 02, we can just do a check for it if needed or render a note from data if it exists) */}
              {section.id === 'deck_02' && (
                <div className="mt-6 border border-neutral-300 border-dashed p-3 font-mono text-[9px] leading-relaxed text-neutral-500 uppercase tracking-wide">
                  <p className="font-bold text-[#1b1b1b] mb-1">
                    MEM_INTEGRITY: OK
                  </p>
                  <p>
                    1970 System manual archives are loaded. Use the Term Query
                    input field above to find and view specific manual rules,
                    combat steps, or tribe definitions.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
