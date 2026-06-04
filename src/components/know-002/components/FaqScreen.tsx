/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Gamepad2,
  Sparkles,
  AlertTriangle,
  GraduationCap,
  Ticket,
  Camera,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { FAQItem } from '../types';
import { FAQ_DATA, SYSTEM_WARNING, TOUR_DATA } from '../data';

interface FaqScreenProps {
  searchQuery: string;
  onNavigateToTour: () => void;
  onOpenPortal: () => void;
}

export default function FaqScreen({
  searchQuery,
  onNavigateToTour,
  onOpenPortal,
}: FaqScreenProps) {
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

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

  const handleShare = (question: string) => {
    navigator.clipboard.writeText(question);
    setCopiedText(question);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Helper to render bolded words
  const renderTextWithHighlights = (text: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) return text;
    const result = text;
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

            {/* DYNAMIC FAQ CARDS */}
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                id={`faq-card-${faq.id}`}
                className="border-4 border-black bg-white p-6 shadow-brutalist relative hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 transition-transform cursor-default"
              >
                <div className="flex flex-col gap-3">
                  <div className="font-mono text-xs font-bold text-[#848484] uppercase tracking-widest flex items-center justify-between border-b-2 border-black pb-2">
                    <span className="flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4" />
                      {faq.category}
                    </span>
                    <button
                      onClick={() => handleShare(faq.question)}
                      className="hover:text-blood-red hover:bg-neutral-100 p-1 border border-transparent hover:border-black transition-colors"
                      title="Copy Question"
                    >
                      {copiedText === faq.question ? (
                        <span className="text-blood-red">COPIED</span>
                      ) : (
                        '[SHARE]'
                      )}
                    </button>
                  </div>
                  <h3 className="font-display text-4xl leading-none text-black uppercase">
                    {faq.question}
                  </h3>
                  <div className="font-serif text-lg text-charcoal leading-relaxed pt-1">
                    {renderTextWithHighlights(faq.answer, faq.highlightWords)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT CONTAINER LAYER: Side widgets */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Caution Banner */}
            <div
              id="warning-caution-box"
              className="border-4 border-black bg-black text-parchment p-5 shadow-brutalist"
            >
              <div className="flex items-center gap-2 mb-3 border-b border-parchment/30 pb-2">
                <AlertTriangle className="h-5 w-5 text-blood-red" />
                <span className="font-mono font-black text-blood-red tracking-widest text-xs uppercase animate-pulse">
                  SYSTEM WARNING
                </span>
              </div>
              <p className="font-mono text-[11px] leading-relaxed uppercase">
                Note to players: The Tavern is a high-interactivity zone. Your
                choices carry weight and may result in unforeseen consequences.
                Entry implies acceptance of all fates determined by the roll of
                the twenty-sided die. Exercise extreme caution when suggesting
                reckless actions to the heroes.
              </p>
            </div>

            {/* Tour Mini Widget */}
            <div
              id="national-tour-card"
              className="border-4 border-black bg-white shadow-brutalist"
            >
              <div className="bg-black text-white p-3 border-b-4 border-black flex justify-between items-center">
                <h3 className="font-display text-xl uppercase tracking-wider">
                  NATIONAL TOUR
                </h3>
                <Ticket className="h-5 w-5 text-blood-red" />
              </div>

              <div className="divide-y-2 divide-neutral-200">
                {TOUR_DATA.slice(0, 3).map((tour) => (
                  <div
                    key={tour.id}
                    className="p-3 hover:bg-neutral-100 transition-colors cursor-pointer group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-mono font-bold text-[#848484] text-[10px] uppercase">
                        {tour.dateStr}
                      </div>
                      {tour.status === 'SOLD OUT' ? (
                        <div className="bg-blood-red text-white py-1.5 px-3 border border-black font-extrabold tracking-widest text-[10px] animate-pulse shadow-brutalist-sm rotate-[-2deg] select-none shrink-0 uppercase">
                          {tour.status}
                        </div>
                      ) : (
                        <div className="font-mono font-bold text-emerald-700 text-[10px] uppercase">
                          {tour.status}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="font-black text-black tracking-wide text-[13px]">
                          {tour.city}
                        </div>
                        <div className="font-serif italic text-charcoal text-xs">
                          {tour.venue}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-parchment-deep border-t-2 border-black">
                <button
                  id="view-schedule-redirect-btn"
                  onClick={onNavigateToTour}
                  className="mt-6 w-full border-2 border-black bg-black hover:bg-blood-red hover:border-blood-red text-parchment font-mono font-black text-xs py-3 px-4 uppercase tracking-wider shadow-brutalist transition-colors duration-150 hover:translate-x-[1px] hover:translate-y-[1px] select-none"
                >
                  VIEW TOUR ROUTE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
