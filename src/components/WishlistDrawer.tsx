import React from 'react';
import { X, Trash2, ArrowRight, Eye, Calendar, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Watch, SavedConfig } from '../types';
import { WATCH_DATA } from '../data';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  savedConfigs: SavedConfig[];
  onRemoveFavorite: (watchId: string) => void;
  onRemoveConfig: (configId: string) => void;
  onSelectWatch: (watch: Watch) => void;
  onLoadConfig: (config: SavedConfig) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  favorites,
  savedConfigs,
  onRemoveFavorite,
  onRemoveConfig,
  onSelectWatch,
  onLoadConfig,
}: WishlistDrawerProps) {
  const favoriteWatches = WATCH_DATA.filter(
    (w) =>
      favorites.includes(w.id) &&
      w.visible !== false &&
      w.enabled !== false &&
      w.disabled !== true,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-surface border-l-4 border-primary h-full shadow-2xl flex flex-col p-6 font-label z-10"
          >
            <div className="flex justify-between items-center border-b-2 border-primary pb-4 mb-6">
              <div className="font-headline font-black text-xl uppercase tracking-tighter text-primary">
                SAVED ARCHIVES
              </div>
              <button
                onClick={onClose}
                className="p-1 border-2 border-primary hover:bg-primary hover:text-surface transition-colors duration-150"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-8 pr-1 hide-scrollbar">
              {/* Section: Favorite Models */}
              <div>
                <div className="font-mono text-[10px] uppercase text-on-surface-variant/70 border-b border-primary/20 pb-1 mb-3 flex justify-between">
                  <span>FAVORITED CATALOG MODELS</span>
                  <span>({favoriteWatches.length})</span>
                </div>

                {favoriteWatches.length === 0 ? (
                  <div className="p-4 text-center border border-dashed border-primary/30 font-body text-xs text-on-surface-variant">
                    No standard reference models bookmarked yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {favoriteWatches.map((watch) => {
                      const isDisabled = watch.disabled === true;
                      return (
                        <div
                          key={watch.id}
                          className={`border-2 p-3 flex justify-between items-center ${
                            isDisabled
                              ? 'border-neutral-400 bg-neutral-100/50 text-neutral-400 opacity-60'
                              : 'border-primary bg-surface-container-lowest'
                          }`}
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`font-mono text-[8px] font-bold px-1 py-0.2 border ${
                                  isDisabled
                                    ? 'bg-neutral-300 border-neutral-400 text-neutral-500'
                                    : 'bg-[#8a752b] text-white border-black font-extrabold'
                                }`}
                              >
                                {watch.ref}
                              </span>
                              <h4
                                className={`font-headline font-bold text-sm uppercase ${isDisabled ? 'line-through' : ''}`}
                              >
                                {watch.name}
                              </h4>
                            </div>
                            <p className="font-body text-xs text-on-surface-variant line-clamp-1 mt-1">
                              {isDisabled
                                ? 'COOLDOWN OFFLINE // REGISTER DEACTIVATED'
                                : watch.tagline}
                            </p>
                          </div>
                          <div className="flex space-x-1 ml-4 shrink-0">
                            <button
                              onClick={() => {
                                if (!isDisabled) {
                                  onSelectWatch(watch);
                                  onClose();
                                }
                              }}
                              disabled={isDisabled}
                              className={`p-1.5 border-2 ${
                                isDisabled
                                  ? 'border-neutral-300 text-neutral-400 cursor-not-allowed'
                                  : 'border-primary hover:bg-primary hover:text-surface transition-colors cursor-pointer'
                              }`}
                              title={
                                isDisabled
                                  ? 'Reference Offline'
                                  : 'View details'
                              }
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => onRemoveFavorite(watch.id)}
                              className="p-1.5 border-2 border-primary text-red-700 hover:bg-red-700 hover:text-surface transition-colors cursor-pointer"
                              title="Remove bookmark"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Section: Custom Configurations */}
              <div>
                <div className="font-mono text-[10px] uppercase text-on-surface-variant/70 border-b border-primary/20 pb-1 mb-3 flex justify-between">
                  <span>CUSTOM SPEC BUILDS</span>
                  <span>({savedConfigs.length})</span>
                </div>

                {savedConfigs.length === 0 ? (
                  <div className="p-4 text-center border border-dashed border-primary/30 font-body text-xs text-on-surface-variant">
                    No custom configuration specs generated yet. Use the
                    CONFIGURATOR to forge bespoke specs.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedConfigs.map((config) => (
                      <div
                        key={config.id}
                        className="border-2 border-primary p-4 bg-surface-container-low"
                      >
                        <div className="flex justify-between items-start mb-2 pb-2 border-b border-primary/10">
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <Sparkles size={12} className="text-primary" />
                              <h4 className="font-headline font-bold text-sm uppercase">
                                Bespoke {config.watchName}
                              </h4>
                            </div>
                            <div className="flex items-center space-x-1 text-on-surface-variant text-[9px] font-mono mt-0.5">
                              <Calendar size={10} />
                              <span>{config.createdAt}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveConfig(config.id)}
                            className="p-1 border-2 border-primary text-red-700 hover:bg-red-700 hover:text-surface transition-colors shrink-0"
                            title="Discard config"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        {/* Spec List */}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[10px] text-on-surface-variant mb-3 bg-surface-container-lowest p-2 border border-primary/20">
                          <div>
                            CASE:{' '}
                            <span className="text-primary font-bold">
                              {config.caseMaterial}
                            </span>
                          </div>
                          <div>
                            DIAL:{' '}
                            <span className="text-primary font-bold">
                              {config.dialColor}
                            </span>
                          </div>
                          <div>
                            BEZEL:{' '}
                            <span className="text-primary font-bold">
                              {config.bezelStyle}
                            </span>
                          </div>
                          <div>
                            STRAP:{' '}
                            <span className="text-primary font-bold">
                              {config.strapType}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onLoadConfig(config);
                            onClose();
                          }}
                          className="w-full flex items-center justify-center space-x-1 bg-primary text-surface text-xs font-mono py-1.5 uppercase border-2 border-primary hover:bg-surface hover:text-primary transition-colors"
                        >
                          <span>LOAD PROTOCOL ENGINE</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Diagnostic info */}
            <div className="border-t-2 border-primary pt-4 mt-auto font-mono text-[9px] text-on-surface-variant space-y-1">
              <div>STORAGE SYNC: LOCAL_ENCRYPTED</div>
              <div>PROTOCOL BLOCK: 0x9B4E32</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
