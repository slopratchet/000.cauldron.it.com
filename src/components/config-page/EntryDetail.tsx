import React from 'react';
import {
  X,
  Sword,
  ShieldAlert,
  Sparkles,
  Wand2,
  Skull,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { TomeEntry, GameAction } from './configTypes';
import CountdownClock from './CountdownClock';

interface EntryDetailProps {
  entry: TomeEntry | null;
  onClose: () => void;
  onActionTrigger: (formula: string, name: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function EntryDetail({
  entry,
  onClose,
  onActionTrigger,
  onPrev,
  onNext,
}: EntryDetailProps) {
  if (!entry) return null;

  const handleActionClick = (action: GameAction) => {
    onActionTrigger(action.formula, action.name);
  };

  const getCategoryIcon = () => {
    switch (entry.type) {
      case 'spell':
        return (
          <Wand2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        );
      case 'beast':
        return <Skull className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'relic':
        return (
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        );
      case 'class':
      default:
        return (
          <Sword className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end transition-opacity duration-300">
      {/* Background click listener to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Main Drawer Body */}
      <div className="relative w-full max-w-2xl bg-background-light dark:bg-background-dark text-primary dark:text-white h-full border-l-4 border-primary dark:border-white shadow-2xl flex flex-col overflow-y-auto scrollbar-thin z-10 p-6 md:p-8">
        {/* Header toolbar */}
        <div className="flex justify-between items-center border-b-2 border-primary dark:border-white pb-4 mb-6 gap-2">
          <div className="flex items-center gap-2">
            {getCategoryIcon()}
            <span className="font-mono text-xs font-black uppercase tracking-widest opacity-75">
              Archives / {entry.type} index
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onPrev && onNext && (
              <div className="flex items-center border border-primary dark:border-white font-mono text-xs font-bold uppercase">
                <button
                  onClick={onPrev}
                  className="p-1.5 hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors border-r border-primary dark:border-white cursor-pointer"
                  title="Previous REST API JSON Object"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={onNext}
                  className="p-1.5 hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors cursor-pointer"
                  title="Next REST API JSON Object"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors rounded-xs cursor-pointer"
              title="Close archives"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Main Title Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {entry.isWorld && (
                <span className="bg-sky-950 text-sky-300 border border-sky-800 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  source world
                </span>
              )}
              {entry.statusBadge && !entry.isWorld && (
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {entry.statusBadge}
                </span>
              )}
              {entry.isCustom && (
                <span className="inline-flex items-center gap-1 bg-indigo-600 text-white font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
                  <ShieldAlert className="w-3 h-3" /> Custom Scribed Page
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none break-words text-white">
              {entry.name}
            </h1>

            <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase opacity-75 mt-2 text-zinc-300">
              <span>REF: {entry.pageRef}</span>
              {entry.level && <span>• {entry.level}</span>}
              {entry.cr && <span>• {entry.cr}</span>}
              {entry.rarity && <span>• {entry.rarity}</span>}
              {entry.sessionAge && <span>• {entry.sessionAge}</span>}
            </div>
          </div>

          {/* Large High-Contrast Hand-Ink Illustration */}
          <div className="border-4 border-primary dark:border-white p-2 bg-white dark:bg-black/30">
            <div
              className="w-full h-64 md:h-80 bg-cover bg-center grayscale contrast-125 saturate-150"
              style={{
                backgroundImage: `url("${
                  entry.imageUrl ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK'
                }")`,
              }}
            />
          </div>

          {/* Italicized Flavor Quotation */}
          {entry.flavorText && (
            <div className="border-l-4 border-primary/40 dark:border-white/40 pl-4 py-1 my-2">
              <p className="font-serif italic text-base md:text-lg leading-relaxed opacity-90 text-primary/80 dark:text-white/90">
                {entry.flavorText}
              </p>
            </div>
          )}

          {/* Justified Core Mechanism Paragraph */}
          <div>
            <h3 className="font-display font-black text-sm uppercase tracking-wider border-b border-primary/20 dark:border-white/20 pb-1 mb-2">
              Core Paradigm
            </h3>
            <p className="justified-slab text-base font-serif leading-relaxed text-primary/90 dark:text-white/90">
              {entry.description}
            </p>
          </div>

          {/* Expanded Chronicles / Lore History */}
          {entry.expandedLore && (
            <div>
              <h3 className="font-display font-black text-sm uppercase tracking-wider border-b border-primary/20 dark:border-white/20 pb-1 mb-2">
                Expanded Chronicles
              </h3>
              <p className="justified-slab text-sm font-serif leading-relaxed opacity-90 text-primary/80 dark:text-white/80">
                {entry.expandedLore}
              </p>
            </div>
          )}

          {/* Combative/Mechanical Actions with Roll triggers */}
          {entry.actions && entry.actions.length > 0 && (
            <div className="mt-4 border-t-2 border-primary dark:border-white pt-6">
              <h3 className="font-display font-black text-base uppercase tracking-widest mb-3 flex items-center gap-2">
                <Sword className="w-4 h-4" /> Playable Combat Actions
              </h3>
              <p className="font-mono text-[9px] uppercase tracking-wide opacity-60 mb-4">
                Click any ritual action to consult the Oracle's Dice.
              </p>

              <div className="flex flex-col gap-3">
                {entry.actions.map((action, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleActionClick(action)}
                    className="border-2 border-primary dark:border-white p-3.5 bg-white dark:bg-black/10 hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-all duration-150 cursor-pointer group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="font-display font-bold text-sm uppercase group-hover:text-background-light dark:group-hover:text-background-dark flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-primary dark:bg-white rounded-full group-hover:bg-background-light dark:group-hover:bg-background-dark shrink-0" />
                        {action.name}
                      </div>
                      <p className="font-serif text-xs leading-normal mt-1 opacity-80">
                        {action.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <div className="font-mono text-[11px] font-black uppercase border border-current px-2.5 py-1.5 tracking-wider bg-primary/5 group-hover:bg-transparent">
                        Cast {action.formula}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countdown Clock for Grimoire & Mythrokahn */}
          {(entry.type === 'spell' ||
            entry.name.toLowerCase().includes('mythrokahn')) && (
            <div className="mt-6 border-t-2 border-primary dark:border-white pt-4 flex justify-center">
              <CountdownClock
                titleLabel={
                  entry.countdownTimerLabel ||
                  (entry.name.toLowerCase().includes('mythrokahn')
                    ? 'setting stirred'
                    : '[ INCREASE RUN TIME ]')
                }
                isButton={!entry.name.toLowerCase().includes('mythrokahn')}
              />
            </div>
          )}
        </div>

        {/* Footer info stamp */}
        <div className="border-t border-primary/20 dark:border-white/20 pt-6 mt-8 flex justify-between font-mono text-[9px] uppercase opacity-55">
          <span>Tome Archives ID: {entry.id}</span>
          <span>Aeon Digital Printing v1.07</span>
        </div>
      </div>
    </div>
  );
}
