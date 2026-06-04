/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, Ticket, Zap } from 'lucide-react';
import { FAQ_DATA, TOUR_DATA } from '../data';

interface FaqScreenProps {
  searchQuery: string;
  onNavigateToTour: () => void;
}

export default function FaqScreen({
  searchQuery,
  onNavigateToTour,
}: FaqScreenProps) {
  // Filter based on search query
  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
    );
  });

  // Helper to render bolded words
  const renderTextWithHighlights = (text: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) return text;
    // Simple block render
    const parts = text.split(new RegExp(`(${highlights.join('|')})`, 'g'));
    return parts.map((part, idx) => {
      const isPick = highlights.includes(part);
      return isPick ? (
        <span
          key={idx}
          className="bg-black text-parchment px-1.5 py-0.5 mx-0.5 font-bold uppercase inline-block leading-none border border-black select-none font-sans"
        >
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  return (
    <div className="bg-parchment text-black min-h-screen font-serif px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Classification Header */}
        <div className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#4c4546] border-b border-neutral-400 pb-2 uppercase mb-4">
          CLASSIFICATION: ADMINISTRATIVE / PROCEDURAL
        </div>

        {/* Hero Title Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
          <div className="lg:col-span-8">
            <h1
              aria-label="{TITLE OF KNOWLEDGE}"
              className="font-display text-5xl md:text-8xl leading-[0.85] tracking-tighter text-black select-none flex flex-col uppercase"
            >
              <span>TITLE OF</span>
              <span>KNOWLEDGE</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-14">
            <div className="border-l-4 border-black pl-4 py-1">
              <p className="font-serif italic text-lg md:text-xl text-[#4c4546] leading-relaxed">
                "A compendium of queries for the curious adventurer,
                meticulously recorded by the Archive's guild."
              </p>
            </div>
          </div>
        </div>

        {/* Search Helper Tag */}
        {searchQuery && (
          <div className="mb-6 bg-parchment-deep border-2 border-black p-3 font-mono text-xs flex items-center justify-between">
            <div>
              <span>SEARCH FILTER ACTIVE: </span>
              <span className="text-blood-red font-bold">"{searchQuery}"</span>
              <span> ({filteredFaqs.length} entries found)</span>
            </div>
            {filteredFaqs.length === 0 && (
              <span className="text-blood-red animate-pulse font-bold">
                [ARCHIVIST ALMANAC DEFENSE OVERRIDE]
              </span>
            )}
          </div>
        )}

        {/* Outer 2-Column Grid matching Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTAINER LAYER: The FAQs Grid (Cards) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* If no items match the search query */}
            {filteredFaqs.length === 0 && (
              <div className="border-4 border-dashed border-blood-red bg-white p-6 text-center shadow-brutalist">
                <AlertTriangle className="h-10 w-10 text-blood-red mx-auto mb-3" />
                <h3 className="font-display text-2xl text-blood-red uppercase mb-2">
                  ANOMALY DETECTED IN INDEX
                </h3>
                <p className="font-serif text-charcoal max-w-lg mx-auto mb-4">
                  "Dear seeker, our scribe could not locate items pertaining to
                  your term. However, the stars suggest you may find luck with
                  these standard scrolls instead."
                </p>
                <div className="font-mono text-xs bg-parchment p-3 border-2 border-black text-left inline-block max-w-md">
                  <div className="text-blood-red font-bold mb-1">
                    ARCHIVIST TIPS:
                  </div>
                  • Try query elements like "dnd", "merch", "battery", "photos",
                  or "dress".
                  <br />• Clear the query on the top right to restore all ledger
                  cards!
                </div>
              </div>
            )}

            {filteredFaqs.map((f, idx) => (
              <div
                key={f.id}
                id={`faq-card-${f.id}`}
                className="border-4 border-black bg-white p-6 shadow-brutalist relative hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 transition-transform cursor-default"
              >
                {idx === 0 && (
                  <div className="absolute top-0 right-0 border-l-4 border-b-4 border-black bg-parchment-deep w-12 h-12 flex items-center justify-center font-display text-4xl text-black">
                    ?
                  </div>
                )}
                <div className="font-mono text-xs font-bold text-neutral-500 mb-2">
                  {f.category}
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-black tracking-tight mb-4 uppercase">
                  {f.question}
                </h2>
                <div className="text-[#1b1b1b] font-serif text-lg leading-relaxed pr-6 space-y-4 max-w-full">
                  <p className="whitespace-pre-wrap">
                    {renderTextWithHighlights(f.answer, f.highlightWords)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT CONTAINER LAYER: Side widgets */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* SIDE BOX A: SYSTEM WARNING (Caution Adventurer) */}
            <div
              id="warning-caution-box"
              className="border-4 border-black bg-white p-6 shadow-brutalist relative"
            >
              {/* Heavy warning system outline banner */}
              <div className="border-2 border-blood-red p-4 bg-orange-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blood-red shrink-0" />
                  <span className="font-mono font-black text-blood-red tracking-widest text-xs uppercase animate-pulse">
                    CAUTION ADVENTURER
                  </span>
                </div>
                <div className="font-mono text-xs text-blood-red font-bold uppercase mb-3 border-b border-blood-red pb-1">
                  TACTICAL ENGAGEMENT ZONE
                </div>
                <p className="font-serif italic text-sm text-neutral-800 leading-relaxed">
                  Note to players: The Tavern is a high-interactivity zone. Your
                  choices carry weight and may result in unforeseen
                  consequences. Entry implies acceptance of all fates determined
                  by the roll of the twenty-sided die. Exercise extreme caution
                  when suggesting reckless actions to the heroes.
                </p>
              </div>

              {/* Small structural stamp */}
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-neutral-400">
                <span>SEAL_CODE: D20-1970</span>
                <span>ARCHIVE_OFFICIAL</span>
              </div>
            </div>

            {/* SIDE BOX B: NATIONAL TOUR CARD */}
            <div
              id="national-tour-card"
              className="border-4 border-black bg-white p-5 shadow-brutalist"
            >
              <h3 className="font-display text-2xl text-black border-b-4 border-black pb-1 mb-4 uppercase flex items-center gap-2 justify-between">
                <span>NATIONAL TOUR</span>
                <Ticket className="h-5 w-5 text-black" />
              </h3>

              {/* List of dates resembling the mockup and details */}
              <div className="divide-y-2 divide-neutral-200">
                {TOUR_DATA.slice(0, 4).map((tour) => {
                  const isSoldOut = tour.status === 'SOLD OUT';
                  return (
                    <div
                      key={tour.id}
                      className="py-3 flex items-center justify-between font-mono text-xs leading-none"
                    >
                      <div className="space-y-1 pr-2">
                        <div className="font-black text-black tracking-wide text-[13px]">
                          {tour.city}
                        </div>
                        <div className="text-[10px] text-neutral-500 uppercase">
                          {tour.venue}
                        </div>
                      </div>

                      {isSoldOut ? (
                        <div className="bg-blood-red text-white py-1.5 px-3 border border-black font-extrabold tracking-widest text-[10px] animate-pulse shadow-brutalist-sm rotate-[-2deg] select-none shrink-0 uppercase">
                          SOLD OUT
                        </div>
                      ) : (
                        <div className="border border-black bg-parchment-deep text-black font-extrabold font-mono py-1 px-2.5 text-[10px] shrink-0 uppercase">
                          {tour.dateStr
                            .replace('OCT', 'OCT')
                            .replace('NOV 2024', 'NOV')
                            .replace('DEC 2024', 'DEC')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* View Schedule redirection button */}
              <button
                id="view-schedule-redirect-btn"
                onClick={onNavigateToTour}
                className="mt-6 w-full border-2 border-black bg-black hover:bg-blood-red hover:border-blood-red text-parchment font-mono font-black text-xs py-3 px-4 uppercase tracking-wider shadow-brutalist transition-colors duration-150 hover:translate-x-[1px] hover:translate-y-[1px] select-none"
              >
                VIEW FULL SCHEDULE
              </button>
            </div>

            {/* SIDE BOX C: REAL-TIME STATISTICS MONITOR (Added flavor fitting the theme perfectly) */}
            <div className="border-2 border-black bg-parchment-deep p-4 font-mono text-2xs md:text-xs">
              <div className="text-black font-black uppercase mb-2 border-b border-black pb-1 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-blood-red" /> TAVERN SENSORS
              </div>
              <ul className="space-y-1 text-charcoal font-bold p-1">
                <li className="flex justify-between">
                  <span>D20 HEAT RATE:</span>
                  <span className="text-black">1.43 ROLLS/SEC</span>
                </li>
                <li className="flex justify-between">
                  <span>GOLD RECOVERY:</span>
                  <span className="text-emerald-700">+3,450 GP</span>
                </li>
                <li className="flex justify-between">
                  <span>CRITICAL FAILS:</span>
                  <span className="text-blood-red">49 Tenday avg</span>
                </li>
                <li className="flex justify-between">
                  <span>DRAGON ALERT:</span>
                  <span className="text-amber-600 bg-amber-100 px-1 border border-amber-300">
                    MEDIUM RISK
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
