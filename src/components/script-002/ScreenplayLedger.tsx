import React, { useEffect, useRef } from 'react';
import type { Operation, ScriptLine } from './types';
import { Paperclip, Printer } from 'lucide-react';

interface ScreenplayLedgerProps {
  operations: Operation[];
  onUpdateOpLines: (opId: string, lines: ScriptLine[]) => void;
  activeOpId: string;
  setActiveOpId: (id: string) => void;
}

export default function ScreenplayLedger({
  operations,
  onUpdateOpLines,
  activeOpId,
  setActiveOpId,
}: ScreenplayLedgerProps) {
  const isProgrammaticScroll = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Easing transition: Scroll active operation sheet to view when selected programmatically
  useEffect(() => {
    const targetElement = document.getElementById(
      `operation-sheet-${activeOpId}`,
    );
    if (targetElement) {
      isProgrammaticScroll.current = true;

      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000); // Allow ample time for the easing animation curve to settle
    }
  }, [activeOpId]);

  // Scrollspy: Sync left sidebar highlight (activeOpId) on manual wheel scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        // Find which sheet is intersecting at the top portion of the viewport
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const opId = visibleEntry.target.getAttribute('data-op-id');
          if (opId && opId !== activeOpId) {
            setActiveOpId(opId);
          }
        }
      },
      {
        root: null, // Viewport
        rootMargin: '-20% 0px -60% 0px', // Focused band near upper middle
        threshold: 0,
      },
    );

    operations.forEach((op) => {
      const el = document.getElementById(`operation-sheet-${op.id}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [operations, activeOpId, setActiveOpId]);

  const handlePrint = () => {
    window.print();
  };

  const handleRemoveLine = (
    opId: string,
    lineId: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    const op = operations.find((o) => o.id === opId);
    if (op) {
      onUpdateOpLines(
        opId,
        op.scriptLines.filter((l) => l.id !== lineId),
      );
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      {operations.map((op, index) => {
        const isActive = op.id === activeOpId;
        const isFirstPage = index === 0;
        return (
          <article
            key={op.id}
            id={`operation-sheet-${op.id}`}
            data-op-id={op.id}
            className={`w-full h-auto lg:min-h-[900px] border-4 border-black bg-white p-6 md:p-12 relative flex flex-col justify-between transition-all duration-300 overflow-visible rounded-none ${
              isActive
                ? 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ring-3 ring-black ring-offset-2'
                : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] opacity-85 hover:opacity-100 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Script Accoutrements Top Right */}
            <div
              className={`absolute top-4 right-4 flex gap-2 z-10 print:hidden select-none transition-opacity duration-305 ${
                isFirstPage ? 'opacity-100' : 'opacity-0 hover:opacity-100'
              }`}
            >
              {isActive && isFirstPage && (
                <div className="hidden sm:flex items-center mr-2 animate-pulse">
                  <span className="text-[9px] font-mono border-2 border-blood-red text-blood-red px-1.5 py-0.5 tracking-wider font-extrabold uppercase bg-red-50 rotate-[-2deg]">
                    &gt;&gt; ACTIVE_TRANSCRIPT &lt;&lt;
                  </span>
                </div>
              )}
              <button
                onClick={() =>
                  alert(
                    `Dossier telemetry attached for ${op.title}. Files are locked and ready in the archives.`,
                  )
                }
                className="p-1 hover:bg-parchment-deep border-2 border-black transition-all bg-white active:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                title="Attach files to dossier"
              >
                <Paperclip className="w-4 h-4 text-black font-extrabold" />
              </button>
              <button
                onClick={handlePrint}
                className="p-1 hover:bg-parchment-deep border-2 border-black transition-all bg-white active:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                title="Print Screenplay Layout"
              >
                <Printer className="w-4 h-4 text-black" />
              </button>
            </div>

            <div className="flex flex-col flex-grow pr-1">
              {isFirstPage && (
                <div className="border-b-4 border-black pb-4 mb-6 select-none">
                  <h1 className="font-anton font-normal text-3xl md:text-5xl uppercase tracking-tighter leading-none text-black mb-1">
                    {op.title || 'OPERATION: UNNAMED'}
                  </h1>
                  <p className="font-mono text-xs uppercase text-gray-500 font-bold tracking-widest">
                    TRANSCRIPT LOG: {op.metadataCode || 'N/A'}
                  </p>
                </div>
              )}

              <div className="screenplay-text relative text-sm text-black flex-grow">
                {/* Rotated left margin stamp on desktop */}
                {isFirstPage && (
                  <span className="red-ink absolute left-[-42px] top-[140px] transform -rotate-90 origin-top-left text-[9px] tracking-widest select-none hidden lg:block uppercase font-bold text-blood-red/80">
                    &gt;&gt; ALIGNMENT CHECK: NEGATIVE &lt;&lt;
                  </span>
                )}

                {/* Script Output Flow */}
                <div className="space-y-6 pt-2 pb-6">
                  {op.scriptLines.map((line) => {
                    if (line.type === 'heading') {
                      const words = line.text.split(/(\s+)/);
                      return (
                        <div
                          key={line.id}
                          className="relative group text-center uppercase font-mono font-extrabold border-y-2 border-black py-1.5 w-11/12 md:w-3/4 mx-auto bg-zinc-100 tracking-tight"
                        >
                          <span className="inline-block relative">
                            {words.map((part, widx) => {
                              if (/\s+/.test(part)) {
                                return part;
                              }
                              return (
                                <span
                                  key={widx}
                                  className="relative group/word inline-block cursor-pointer mx-0.5"
                                  onClick={(e) =>
                                    handleRemoveLine(op.id, line.id, e)
                                  }
                                >
                                  <span className="hover:text-blood-red transition-colors duration-150">
                                    {part}
                                  </span>
                                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blood-red text-white text-[9px] font-mono px-1.5 py-0.5 pointer-events-none opacity-0 group-hover/word:opacity-100 transition-all duration-150 uppercase font-bold whitespace-nowrap z-20 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-75 group-hover/word:scale-100">
                                    DELETE
                                  </span>
                                </span>
                              );
                            })}
                          </span>
                          <button
                            onClick={(e) => handleRemoveLine(op.id, line.id, e)}
                            className="absolute right-2 top-1.5 opacity-0 group-hover:opacity-100 text-blood-red hover:bg-red-100 px-1 text-[9px] print:hidden cursor-pointer"
                            title="Delete line"
                          >
                            X
                          </button>
                        </div>
                      );
                    }

                    if (line.type === 'action') {
                      const textParts = line.text.split('mast.');
                      return (
                        <div
                          key={line.id}
                          className="relative group px-4 md:px-12 leading-relaxed text-slate-800 text-justify font-serif text-[13px] md:text-sm"
                        >
                          {textParts.length > 1 ? (
                            <>
                              {textParts[0]}
                              <span className="bg-yellow-200 text-black px-1 font-semibold border-b border-yellow-400">
                                mast.
                              </span>
                              {textParts[1]}
                            </>
                          ) : (
                            line.text
                          )}
                          <button
                            onClick={(e) => handleRemoveLine(op.id, line.id, e)}
                            className="absolute right-4 top-0 opacity-0 group-hover:opacity-100 text-blood-red hover:bg-red-100 px-1 text-[9px] print:hidden cursor-pointer"
                          >
                            DELETE
                          </button>
                        </div>
                      );
                    }

                    if (line.type === 'dialogue') {
                      const isFriendUnderlined = line.text
                        .toLowerCase()
                        .includes('ate my friend');
                      const dialogueText = isFriendUnderlined
                        ? "Let me tell you about my boat. She's a good ship. A little tired, maybe. But she's seen things. Like the thing that ate my friend."
                        : line.text;
                      const words = dialogueText.split(/(\s+)/);

                      return (
                        <div
                          key={line.id}
                          className="relative group md:w-3/4 mx-auto py-1"
                        >
                          <div className="text-center font-mono font-extrabold text-[11px] uppercase tracking-wide mb-1 leading-none text-black">
                            {line.characterName}
                          </div>
                          {line.parenthetical && (
                            <div className="text-center font-serif italic text-xs text-zinc-600 mb-0.5 leading-none">
                              {line.parenthetical}
                            </div>
                          )}
                          <div className="text-left text-[13px] md:text-sm font-serif px-8 leading-relaxed max-w-sm mx-auto">
                            {words.map((part, widx) => {
                              if (/\s+/.test(part)) {
                                return part;
                              }
                              const isUnderlinePart =
                                isFriendUnderlined && widx >= 38;
                              return (
                                <span
                                  key={widx}
                                  className={`relative group/word inline-block cursor-pointer mx-0.5 ${
                                    isUnderlinePart
                                      ? 'red-ink underline decoration-wavy font-semibold text-blood-red/90'
                                      : ''
                                  }`}
                                  onClick={(e) =>
                                    handleRemoveLine(op.id, line.id, e)
                                  }
                                >
                                  <span className="hover:text-blood-red transition-colors duration-150">
                                    {part}
                                  </span>
                                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blood-red text-white text-[9px] font-mono px-1.5 py-0.5 pointer-events-none opacity-0 group-hover/word:opacity-100 transition-all duration-150 uppercase font-bold whitespace-nowrap z-20 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-75 group-hover/word:scale-100">
                                    DELETE
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                          <button
                            onClick={(e) => handleRemoveLine(op.id, line.id, e)}
                            className="absolute right-0 top-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blood-red px-1 text-[9px] print:hidden cursor-pointer"
                          >
                            X
                          </button>
                        </div>
                      );
                    }

                    if (line.type === 'alert') {
                      return (
                        <div
                          key={line.id}
                          className="relative group px-4 md:px-12 leading-relaxed text-slate-800 text-justify font-serif text-[13px] md:text-sm"
                        >
                          {line.text}
                          <button
                            onClick={(e) => handleRemoveLine(op.id, line.id, e)}
                            className="absolute right-4 top-0 opacity-0 group-hover:opacity-100 text-blood-red hover:bg-red-100 px-1 text-[9px] print:hidden cursor-pointer"
                          >
                            DELETE
                          </button>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Decorative letterhead footer block */}
            <div className="border-t-2 border-black/40 pt-2.5 mt-4 select-none print:hidden flex justify-between items-center font-mono text-[9px] text-gray-400">
              <span>AUTHENTIC 1970 EXPEDITION PAPERWORK // MISSION CONFIG</span>
              <span>PAGE: {index + 1}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
