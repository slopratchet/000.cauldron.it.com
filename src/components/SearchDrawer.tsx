import React, { useState } from 'react';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Watch } from '../types';
import { WATCH_DATA } from '../data';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWatch: (watch: Watch) => void;
}

export default function SearchDrawer({
  isOpen,
  onClose,
  onSelectWatch,
}: SearchDrawerProps) {
  const [query, setQuery] = useState('');

  const filteredWatches = WATCH_DATA.filter((watch) => {
    if (
      watch.visible === false ||
      watch.enabled === false ||
      watch.disabled === true
    )
      return false;
    const term = query.toLowerCase();
    return (
      watch.name.toLowerCase().includes(term) ||
      watch.ref.toLowerCase().includes(term) ||
      watch.category.toLowerCase().includes(term) ||
      watch.tagline.toLowerCase().includes(term) ||
      Object.values(watch.specs).some((spec) =>
        spec.toLowerCase().includes(term),
      )
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel (Absolute Center Position) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-surface border-4 border-primary shadow-2xl flex flex-col p-6 font-label max-h-[85vh] z-10"
          >
            <div className="flex justify-between items-center border-b-2 border-primary pb-4 mb-6">
              <div className="font-headline font-black text-xl uppercase tracking-tighter text-primary">
                SYSTEM QUERY
              </div>
              <button
                onClick={onClose}
                className="p-1 border-2 border-primary hover:bg-primary hover:text-surface transition-colors duration-150 cursor-pointer"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="INPUT SEARCH QUERY..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-surface-container-low border-2 border-primary p-3 pl-10 pr-4 font-mono text-xs focus:outline-none focus:bg-surface-container-lowest focus:ring-0 text-primary placeholder-on-surface-variant/50"
                autoFocus
              />
              <SearchIcon
                size={16}
                className="absolute left-3 top-3.5 text-primary"
              />
            </div>

            {/* Results */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1 hide-scrollbar max-h-[45vh]">
              <div className="font-mono text-[10px] uppercase text-on-surface-variant/70 border-b border-primary/20 pb-1">
                Search Results ({filteredWatches.length})
              </div>

              {filteredWatches.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-primary/40 font-body text-sm text-on-surface-variant">
                  No matching records found in high-fidelity index.
                </div>
              ) : (
                filteredWatches.map((watch) => {
                  const isDisabled = watch.disabled === true;
                  return (
                    <div
                      key={watch.id}
                      onClick={() => {
                        if (!isDisabled) {
                          onSelectWatch(watch);
                          onClose();
                        }
                      }}
                      className={`group border-2 transition-all duration-200 ${
                        isDisabled
                          ? 'border-neutral-400 bg-neutral-100/50 text-neutral-400 opacity-65 cursor-not-allowed'
                          : 'border-primary bg-surface-container-lowest hover:bg-primary hover:text-surface cursor-pointer'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`font-mono text-[9px] px-1.5 py-0.5 border font-bold ${
                            isDisabled
                              ? 'bg-neutral-300 border-neutral-400 text-neutral-500'
                              : 'bg-[#8a752b] text-white border-black font-extrabold'
                          }`}
                        >
                          {watch.ref}
                        </span>
                        {isDisabled ? (
                          <span className="font-mono text-[9px] text-red-600 font-bold uppercase animate-pulse">
                            OFFLINE
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-on-surface-variant group-hover:text-surface/80">
                            {watch.category === 'Professional'
                              ? 'Mythic Raid Chrono-Gear'
                              : watch.category === 'Classic'
                                ? 'Classic Dungeon Relics'
                                : 'Legendary Covenant Cores'}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-headline font-black text-lg uppercase tracking-tight mb-1 ${isDisabled ? 'line-through text-neutral-400' : ''}`}
                      >
                        {watch.name}
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant group-hover:text-surface/90 line-clamp-2 mb-3">
                        {watch.tagline}
                      </p>
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold pt-2 border-t border-primary/10 group-hover:border-surface/20">
                        <span>
                          {isDisabled ? 'INDEX RESTRICTED' : 'SPEC SHEET'}
                        </span>
                        {!isDisabled && (
                          <ArrowRight
                            size={12}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Diagnostic info */}
            <div className="border-t-2 border-primary pt-4 mt-6 font-mono text-[9px] text-on-surface-variant space-y-1">
              <div>DATABASE ID: ARCHIVE_PROT_MAIN</div>
              <div>STATUS: COMPILATION SECURE</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
