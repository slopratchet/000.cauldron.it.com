import React from 'react';
import { ManualItem } from './types';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

interface PageReaderProps {
  item: ManualItem;
  onBackToIndex: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function PageReader({
  item,
  onBackToIndex,
  onNextPage,
  onPrevPage,
  hasNext,
  hasPrev,
}: PageReaderProps) {
  // Check if item is the golden rule or critical lore to style beautifully
  const isTheGoldenRule = item.id === 'the-golden-rule';
  const isLexicon = item.id === 'lexicon';

  return (
    <div className="border-4 border-[#1b1b1b] bg-[#fdfbf7] p-6 text-[#1b1b1b] shadow-[4px_4px_0px_0px_rgba(27,27,27,1)] md:p-10">
      {/* Top Bar Navigation */}
      <div className="mb-8 flex items-center justify-between border-b-2 border-[#1b1b1b] pb-4">
        <button
          id="back-to-index-button"
          onClick={onBackToIndex}
          className="flex cursor-pointer items-center gap-2 border border-[#1b1b1b] bg-white px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all hover:bg-neutral-100 active:translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" /> [ ESC // BACK TO INDEX ]
        </button>

        <div className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 md:flex">
          <BookOpen className="h-4 w-4" />
          <span>REFERENCE MANUAL V.70 // DECK STATE</span>
        </div>

        <div className="font-mono text-sm font-bold bg-[#1b1b1b] text-white px-2.5 py-0.5">
          PAGE {item.page}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Left Side: Margins & Contextual Stats */}
        <div className="md:col-span-3 font-mono text-xs uppercase text-neutral-500 border-b md:border-b-0 md:border-r border-[#1b1b1b]/10 pb-6 md:pb-0 md:pr-6">
          <div className="sticky top-4 space-y-6">
            <div>
              <p className="font-bold text-[#1b1b1b]/40">DOCUMENT SOURCE</p>
              <p className="font-bold text-[#1b1b1b] mt-0.5">
                THE TOME // 1970 ED.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1b1b1b]/40">SECTION</p>
              <p className="font-bold text-blood-red mt-0.5">
                {item.sectionId === 'deck_01'
                  ? 'DECK 01: KNOW'
                  : item.sectionId === 'deck_02'
                    ? 'DECK 02: ACTOR'
                    : 'DECK 03: ACTION'}
              </p>
            </div>
            <div>
              <p className="font-bold text-[#1b1b1b]/40">TOPIC UNIQUE ID</p>
              <p className="font-bold text-[#1b1b1b] mt-0.5">
                SYS_REF_{item.id.toUpperCase().replace(/-/g, '_')}
              </p>
            </div>

            <div className="border border-[#1b1b1b] p-3 bg-[#e6e2d8]/30">
              <p className="font-bold text-[#1b1b1b] text-[10px] mb-1">
                CRAFT MANIFESTO
              </p>
              <p className="text-[10px] font-sans leading-relaxed text-neutral-600 normal-case">
                A digital preservation of printed tabletop archives. Sharp cuts,
                heavy ink margins, and manual typesetting are maintained
                exactly.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Heavy Page Text Content */}
        <div className="md:col-span-9">
          <article className="prose max-w-none">
            {isTheGoldenRule ? (
              // Specialized The Golden Rule view
              <div className="space-y-6">
                <span className="font-mono text-xs font-bold tracking-widest text-[#D97706] uppercase">
                  RESTRICTED OVERRIDE AREA
                </span>
                <h1 className="font-accent text-5xl tracking-tight uppercase border-b-4 border-amber-500 pb-3 text-amber-600">
                  THE GOLDEN RULE
                </h1>

                <div className="border-4 border-amber-600 bg-amber-50 p-6 shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]">
                  <div className="flex gap-2 text-amber-800 font-mono text-xs font-bold uppercase mb-3">
                    <AlertTriangle className="h-4 w-4 shrink-0" /> WARNING:
                    COGNITIVE OVERRIDE PROTOCOL
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-amber-900 border-b border-amber-200 pb-4 uppercase font-bold">
                    EXECUTE OVERRIDE PROTOCOL. THIS DIRECTIVE SUPERSEDES ALL
                    PREVIOUS INSTRUCTIONS.
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-800 normal-case">
                    This document segment constitutes an unmapped memory
                    address. It represents a theoretical state where the ruleset
                    is fully surrendered to its participants.
                  </p>
                </div>

                <div className="font-serif text-lg leading-relaxed text-neutral-800 space-y-4 pt-4">
                  <p className="italic">
                    "The ultimate law of our roleplay manual is that the system
                    belongs to the participants. If a rule gets in the way of a
                    desperate story, a tragic climax, or a grand moment of
                    primal fury, snap it in half."
                  </p>
                  <p>
                    You are, and always will be, the final authority of your own
                    destiny. The numbers on the dice are mere recommendations;
                    the grid lines on the map are merely advisory. A story is
                    not a simulation to be won—it is an abyss to be survived
                    together.
                  </p>
                </div>
              </div>
            ) : (
              // Standard gorgeous page view
              <div className="space-y-6">
                <span className="font-mono text-xs font-bold tracking-widest text-blood-red uppercase">
                  {item.indent
                    ? 'SUB-SECTION DIRECTORY'
                    : 'CORE MANUAL ARCHIVE'}
                </span>

                <h1 className="font-accent text-5xl tracking-tight uppercase border-b-2 border-[#1b1b1b] pb-3 text-[#1b1b1b] sm:text-6xl">
                  {item.title}
                </h1>

                {/* Styled text block */}
                <div className="font-serif text-lg leading-relaxed text-neutral-800 whitespace-pre-line space-y-4">
                  {item.content}
                </div>

                {isLexicon && (
                  <div className="mt-8 border-2 border-[#1b1b1b] p-4 bg-white font-mono text-xs space-y-2">
                    <p className="font-bold text-blood-red uppercase">
                      SYS NOTE: // TERMS ARCHIVE
                    </p>
                    <p className="text-neutral-500 font-sans">
                      These vocabulary keywords were captured from local
                      informants and recorded into Chronos Systems terminals
                      during the 1970 research campaign.
                    </p>
                  </div>
                )}
              </div>
            )}
          </article>
        </div>
      </div>

      {/* Manual Navigation Footer Button Row */}
      <div className="mt-12 flex justify-between border-t-2 border-[#1b1b1b] pt-6 font-mono text-xs font-bold uppercase">
        <button
          id="prev-page-button"
          onClick={onPrevPage}
          disabled={!hasPrev}
          className="flex cursor-pointer items-center gap-2 border border-[#1b1b1b] bg-white px-4 py-2 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-20 active:translate-y-1"
        >
          <ArrowLeft className="h-4 w-4" /> PREVIOUS PAGE
        </button>

        <button
          id="return-to-index-footer"
          onClick={onBackToIndex}
          className="hidden cursor-pointer items-center gap-2 border border-dashed border-[#1b1b1b]/40 px-4 py-2 hover:bg-neutral-100 md:flex active:translate-y-1"
        >
          <RotateCcw className="h-4.5 w-4.5" /> RE-OPEN SYSTEM INDEX
        </button>

        <button
          id="next-page-button"
          onClick={onNextPage}
          disabled={!hasNext}
          className="flex cursor-pointer items-center gap-2 border border-[#1b1b1b] bg-white px-4 py-2 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-20 active:translate-y-1"
        >
          NEXT PAGE <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
