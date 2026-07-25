import React, { useState, useEffect } from 'react';
import { Search, MapPin, Heart, Sparkles, Tent } from 'lucide-react';
import { Watch, SavedConfig } from '../../types';
import { WATCH_DATA } from '../../data';
import WatchSection from '../../components/WatchSection';
import DiscoverModal from '../../components/DiscoverModal';
import ConfigureModal from '../../components/ConfigureModal';
import SearchDrawer from '../../components/SearchDrawer';
import WishlistDrawer from '../../components/WishlistDrawer';
import ManifestoModal from '../../components/ManifestoModal';
import Footer from '../../components/Footer';
import FigureModal from '../../components/FigureModal';
import DatabaseConsole from '../../components/DatabaseConsole';
import { getMasterDb, parseTickerTape } from '../../dbStore';

function getOverlayPositionClasses(positionString: string) {
  const pos = (positionString || '').toLowerCase().trim();

  if (pos.includes('top')) {
    if (pos.includes('right')) return 'top-3 right-3 items-end';
    if (pos.includes('center') || pos.includes('middle'))
      return 'top-3 left-1/2 -translate-x-1/2 items-center';
    return 'top-3 left-3 items-start';
  }

  if (pos.includes('bottom')) {
    if (pos.includes('right')) return 'bottom-3 right-3 items-end';
    if (pos.includes('center') || pos.includes('middle'))
      return 'bottom-3 left-1/2 -translate-x-1/2 items-center';
    return 'bottom-3 left-3 items-start';
  }

  if (pos.includes('middle') || pos.includes('center')) {
    if (pos.includes('right'))
      return 'top-1/2 -translate-y-1/2 right-3 items-end';
    if (pos.includes('left'))
      return 'top-1/2 -translate-y-1/2 left-3 items-start';
    return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center';
  }

  return 'top-3 left-3 items-start';
}

function MarqueeOverlayBox({
  label,
  position,
  show,
  hasLineAccent = true,
  linePlacement = 'top',
}: {
  label: string;
  position: string;
  show: boolean;
  hasLineAccent?: boolean;
  linePlacement?: 'top' | 'bottom' | string;
}) {
  if (!show) return null;

  const posClasses = getOverlayPositionClasses(position);
  const isBottomPlacement = (linePlacement || '').toLowerCase() === 'bottom';

  const accentElement = hasLineAccent && (
    <div
      className={`w-full flex flex-col gap-[2px] ${isBottomPlacement ? 'mt-1' : 'mb-1'}`}
    >
      <div className="relative w-full h-[1px] flex items-center justify-between">
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-black" />
        <div className="relative z-10 w-0.5 h-0.5 rounded-full bg-black -ml-[1px] shrink-0" />
        <div className="relative z-10 w-0.5 h-0.5 rounded-full bg-black -mr-[1px] shrink-0" />
      </div>
      <div className="relative w-full h-[1px] flex items-center justify-between">
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-black/80" />
        <div className="relative z-10 w-0.5 h-0.5 rounded-full bg-black/80 -ml-[1px] shrink-0" />
        <div className="relative z-10 w-0.5 h-0.5 rounded-full bg-black/80 -mr-[1px] shrink-0" />
      </div>
    </div>
  );

  return (
    <div
      className={`absolute ${posClasses} z-10 flex flex-col pointer-events-none select-none max-w-[85%]`}
    >
      {!isBottomPlacement && accentElement}
      <div className="bg-black px-2 py-0.5 sm:px-2.5 sm:py-0.5 border border-yellow-500/30 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.9)]">
        <span className="text-yellow-400 font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
          {label || 'TITLE HERE'}
        </span>
      </div>
      {isBottomPlacement && accentElement}
    </div>
  );
}

export default function App() {
  // Database Console Mode State
  const [isDbMode, setIsDbMode] = useState(false);

  useEffect(() => {
    const checkDbMode = () => {
      const params = new URLSearchParams(window.location.search);
      setIsDbMode(params.get('db') === 'true');
    };
    checkDbMode();

    // Dynamically set page title from the master database JSON
    try {
      const dbData = getMasterDb();
      if (dbData && dbData.meta && dbData.meta.name) {
        document.title = dbData.meta.name;
      }
    } catch (e) {
      console.error(e);
    }

    window.addEventListener('popstate', checkDbMode);
    return () => window.removeEventListener('popstate', checkDbMode);
  }, [isDbMode]);

  const handleBackToCatalog = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('db');
    window.history.pushState({}, '', url.pathname);
    setIsDbMode(false);
  };

  // Navigation & Filtering
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Classic' | 'Professional' | 'Watches by Theme'
  >('All');

  // Drawer States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  // Modal States
  const [discoverWatch, setDiscoverWatch] = useState<Watch | null>(null);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);

  const [figureWatch, setFigureWatch] = useState<Watch | null>(null);
  const [isFigureOpen, setIsFigureOpen] = useState(false);

  const [configureWatch, setConfigureWatch] = useState<Watch | null>(null);
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const [customizerPreset, setCustomizerPreset] = useState<
    | undefined
    | {
        caseMaterial: string;
        dialColor: string;
        bezelStyle: string;
        strapType: string;
      }
  >(undefined);

  // Saved Data / Wishlist States
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);

  // Hydrate favorites and configs from localStorage on mount
  useEffect(() => {
    const storedFavs = localStorage.getItem('archive_protocol_favorites');
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (e) {
        console.error('Error loading favorites from storage', e);
      }
    }

    const storedConfigs = localStorage.getItem('archive_protocol_configs');
    if (storedConfigs) {
      try {
        setSavedConfigs(JSON.parse(storedConfigs));
      } catch (e) {
        console.error('Error loading custom configurations', e);
      }
    }
  }, []);

  // Update favorites storage
  const handleToggleFavorite = (watchId: string) => {
    const updated = favorites.includes(watchId)
      ? favorites.filter((id) => id !== watchId)
      : [...favorites, watchId];

    setFavorites(updated);
    localStorage.setItem('archive_protocol_favorites', JSON.stringify(updated));
  };

  const handleRemoveFavorite = (watchId: string) => {
    const updated = favorites.filter((id) => id !== watchId);
    setFavorites(updated);
    localStorage.setItem('archive_protocol_favorites', JSON.stringify(updated));
  };

  // Update configurations storage
  const handleSaveConfig = (
    newConfig: Omit<SavedConfig, 'id' | 'createdAt'>,
  ) => {
    const fullConfig: SavedConfig = {
      ...newConfig,
      id: `config_${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [fullConfig, ...savedConfigs];
    setSavedConfigs(updated);
    localStorage.setItem('archive_protocol_configs', JSON.stringify(updated));
  };

  const handleRemoveConfig = (configId: string) => {
    const updated = savedConfigs.filter((cfg) => cfg.id !== configId);
    setSavedConfigs(updated);
    localStorage.setItem('archive_protocol_configs', JSON.stringify(updated));
  };

  // Trigger configure modal directly
  const handleOpenConfigure = () => {
    setCustomizerPreset(undefined);
    const activeWatches = WATCH_DATA.filter(
      (w) => !w.disabled && w.visible !== false && w.enabled !== false,
    );
    const defaultWatch =
      activeWatches.length > 0 ? activeWatches[0] : WATCH_DATA[0];
    setConfigureWatch(defaultWatch);
    setIsConfigureOpen(true);
  };

  // Load a saved configuration to the customizer
  const handleLoadConfig = (saved: SavedConfig) => {
    const watch =
      WATCH_DATA.find((w) => w.id === saved.watchId) || WATCH_DATA[0];
    setConfigureWatch(watch);
    setCustomizerPreset({
      caseMaterial: saved.caseMaterial,
      dialColor: saved.dialColor,
      bezelStyle: saved.bezelStyle,
      strapType: saved.strapType,
    });
    setIsConfigureOpen(true);
  };

  // Filter watches to display
  const filteredWatches = WATCH_DATA.filter(
    (watch) =>
      (activeCategory === 'All' || watch.category === activeCategory) &&
      watch.visible !== false &&
      watch.enabled !== false &&
      watch.disabled !== true,
  );

  const dbData = getMasterDb();

  if (isDbMode) {
    return <DatabaseConsole onBackToApp={handleBackToCatalog} />;
  }

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col antialiased selection:bg-primary selection:text-surface">
      {/* Minimalist Action Control Bar */}
      <div className="bg-black text-white w-full py-4 px-6 z-40 sticky top-0 flex items-center justify-center border-b border-neutral-900 select-none relative">
        <div className="absolute left-6 font-mono text-[10px] tracking-widest text-neutral-500 hidden lg:block">
          TITAN PROTOCOL ACCESS // RAID DATABASE
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-5 text-white items-center">
            {dbData.meta.showButtonCamp !== false && (
              <button
                className="hover:opacity-70 transition-opacity p-1 cursor-pointer flex items-center justify-center"
                title="Camp base coordinates"
                onClick={(e) => {
                  const targetUrl =
                    dbData.meta.campUrl ||
                    dbData.meta.targetUrl ||
                    'https://campcandor.com';
                  window.dispatchEvent(
                    new CustomEvent('open_external_url', {
                      detail: {
                        url: targetUrl,
                        source: 'TOP_BAR_CAMP_ICON',
                        timestamp: new Date().toISOString(),
                      },
                      bubbles: true,
                      cancelable: true,
                    }),
                  );
                  window.open(targetUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <Tent size={20} />
              </button>
            )}

            {dbData.meta.showButtonSearch !== false && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-70 transition-opacity p-1 cursor-pointer flex items-center justify-center"
                title="Search database"
              >
                <Search size={20} />
              </button>
            )}

            {dbData.meta.showButtonShowroom !== false && (
              <button
                className="hover:opacity-70 transition-opacity p-1 cursor-pointer flex items-center justify-center"
                title="Show showrooms"
                onClick={() =>
                  alert(
                    'Showroom Map Matrix: Coordinates mapped to Basel, Switzerland. Showroom active.',
                  )
                }
              >
                <MapPin size={20} />
              </button>
            )}

            {dbData.meta.showButtonSaved !== false && (
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="hover:opacity-70 transition-opacity p-1 cursor-pointer relative flex items-center justify-center"
                title="Open saved specifications"
              >
                <Heart size={20} />
                {favorites.length + savedConfigs.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-black font-mono text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {favorites.length + savedConfigs.length}
                  </span>
                )}
              </button>
            )}
          </div>

          {dbData.meta.showButtonConfigure !== false && (
            <a
              href="/log-in"
              className="font-mono uppercase text-xs tracking-widest text-white hover:bg-white hover:text-black transition-colors px-6 py-2 border-2 border-white font-bold shrink-0 cursor-pointer flex items-center space-x-2"
            >
              <Sparkles
                size={12}
                className="text-white group-hover:text-black transition-colors"
              />
              <span>CONFIGURE</span>
            </a>
          )}
        </div>
      </div>

      {/* Hero Welcome banner if viewing all */}
      {activeCategory === 'All' &&
        (() => {
          const mainTape = parseTickerTape(
            getMasterDb().tickertapes.main,
            20,
            'left',
          );
          return (
            <div className="w-full border-b-4 border-primary bg-surface p-2 text-center select-none overflow-hidden">
              <div
                style={{ animationDuration: `${mainTape.speedSeconds}s` }}
                className={`inline-flex space-x-12 ${
                  mainTape.direction === 'right'
                    ? 'animate-[marquee-reverse_20s_linear_infinite]'
                    : 'animate-[marquee_20s_linear_infinite]'
                } whitespace-nowrap text-[8px] font-mono tracking-widest text-on-surface-variant font-bold uppercase`}
              >
                {(mainTape.items || []).map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span>{item}</span>
                    <span>•</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })()}

      {/* Main Content Sections */}
      <main className="flex-grow flex flex-col w-full">
        {filteredWatches.length === 0 ? (
          <div className="flex-grow flex items-center justify-center p-12 min-h-[50vh]">
            <div className="max-w-md p-8 border-4 border-primary text-center bg-surface-container-low font-label">
              <span className="bg-primary text-surface px-3 py-1 font-mono text-xs uppercase font-bold border border-primary inline-block mb-4">
                ERROR 404
              </span>
              <h3 className="font-headline text-2xl font-black uppercase mb-2">
                Category Mismatch
              </h3>
              <p className="font-body text-sm text-on-surface-variant mb-6">
                No active records matching the selected collection filter are
                currently indexed in this protocol cluster.
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="bg-primary text-surface px-6 py-2 uppercase font-mono text-xs border-2 border-primary hover:bg-surface hover:text-primary transition-colors"
              >
                Reset Database Filter
              </button>
            </div>
          </div>
        ) : (
          filteredWatches.map((watch, index) => (
            <React.Fragment key={watch.id}>
              <WatchSection
                watch={watch}
                index={index}
                onDiscover={(w) => {
                  setDiscoverWatch(w);
                  setIsDiscoverOpen(true);
                }}
                onOpenFigure={(w) => {
                  setFigureWatch(w);
                  setIsFigureOpen(true);
                }}
              />
              {(() => {
                const currentDb = getMasterDb();
                const meta = currentDb.meta;
                const rawTape = currentDb.tickertapes[watch.id];
                const tapeInfo = parseTickerTape(
                  rawTape,
                  watch.marqueeSpeedSeconds ?? meta.marqueeSpeedSeconds ?? 54,
                  watch.marqueeDirection ?? meta.marqueeDirection ?? 'left',
                  meta.showOverlayTextBoxes ?? true,
                  meta.overlayTextLabel ?? 'TITLE HERE',
                  meta.overlayTextPosition ?? 'top-left',
                  meta.overlayTextLineAccent ?? true,
                  meta.overlayTextLinePlacement ?? 'top',
                );
                const list = tapeInfo.items;
                const isDisabled = watch.disabled === true;
                if (isDisabled) return null;

                const direction = tapeInfo.direction;
                const speedSeconds = tapeInfo.speedSeconds || 30;
                const isReverse = direction === 'right';

                // Extract image items or default to color block images
                const imageItems = list.filter(
                  (item: string) =>
                    typeof item === 'string' &&
                    (item.startsWith('/') ||
                      item.startsWith('http') ||
                      item.startsWith('data:image') ||
                      /\.(svg|png|jpg|jpeg|webp)$/i.test(item)),
                );

                const baseBlocks =
                  imageItems.length === 1
                    ? Array(6).fill(imageItems[0])
                    : imageItems.length > 1
                      ? imageItems
                      : [
                          '/block-red.svg',
                          '/block-green.svg',
                          '/block-blue.svg',
                          '/block-olive.svg',
                          '/block-red.svg',
                          '/block-green.svg',
                        ];

                // Duplicate array for seamless infinite marquee loop
                const displayBlocks = [...baseBlocks, ...baseBlocks];

                // Extract text items for subtitle lettering
                const textItems = list.filter(
                  (item: string) =>
                    typeof item === 'string' &&
                    !(
                      item.startsWith('/') ||
                      item.startsWith('http') ||
                      item.startsWith('data:image') ||
                      /\.(svg|png|jpg|jpeg|webp)$/i.test(item)
                    ),
                );

                const subtitleText =
                  textItems.length > 0
                    ? textItems.join(' // ')
                    : `${watch.ref} // ${watch.tagline}`;

                return (
                  <div className="relative w-full h-28 sm:h-36 md:h-44 overflow-hidden border-t-2 border-b-2 border-black bg-black select-none">
                    {/* Moving flat colored image blocks with thin black outline dividers between them */}
                    <div className="overflow-hidden w-full h-full">
                      <div
                        className={`flex h-full items-stretch ${isReverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                        style={{ animationDuration: `${speedSeconds}s` }}
                      >
                        {displayBlocks.map((imgSrc: string, idx: number) => {
                          const rawItem =
                            tapeInfo.rawItems.length > 0
                              ? tapeInfo.rawItems[
                                  idx % tapeInfo.rawItems.length
                                ]
                              : null;
                          const itemShow = rawItem
                            ? rawItem.showOverlayText
                            : (tapeInfo.showOverlayText ??
                              meta.showOverlayTextBoxes ??
                              true);
                          const defaultBirdLabels = [
                            'PEREGRINE FALCON',
                            'GREAT HORNED OWL',
                            'GOLDEN EAGLE',
                            'OSPREY',
                            'RAVEN',
                            'GYRFALCON',
                            'BARN OWL',
                            'SNOWY OWL',
                            'CEDAR WAXWING',
                            'KINGFISHER',
                          ];
                          const itemLabel =
                            rawItem?.label ||
                            (tapeInfo.overlayLabels &&
                            tapeInfo.overlayLabels.length > 0
                              ? tapeInfo.overlayLabels[
                                  idx % tapeInfo.overlayLabels.length
                                ]
                              : undefined) ||
                            tapeInfo.overlayLabel ||
                            meta.overlayTextLabel ||
                            defaultBirdLabels[idx % defaultBirdLabels.length];

                          const defaultStaggerPos = [
                            'top-left',
                            'bottom-left',
                            'top-right',
                            'bottom-right',
                          ][idx % 4];
                          const itemPos =
                            rawItem?.position ||
                            (tapeInfo.overlayPositions &&
                            tapeInfo.overlayPositions.length > 0
                              ? tapeInfo.overlayPositions[
                                  idx % tapeInfo.overlayPositions.length
                                ]
                              : undefined) ||
                            tapeInfo.overlayPosition ||
                            defaultStaggerPos;
                          const itemAccent = rawItem
                            ? rawItem.hasLineAccent
                            : (tapeInfo.overlayLineAccent ??
                              meta.overlayTextLineAccent ??
                              true);
                          const itemPlacement = rawItem
                            ? rawItem.linePlacement
                            : (tapeInfo.overlayLinePlacement ??
                              meta.overlayTextLinePlacement ??
                              'top');

                          return (
                            <div
                              key={idx}
                              className="w-48 sm:w-64 md:w-80 h-full shrink-0 border-r-2 border-black overflow-hidden relative"
                            >
                              <img
                                src={imgSrc}
                                alt={`${watch.name} Block ${idx + 1}`}
                                className="w-full h-full object-cover block"
                              />
                              <MarqueeOverlayBox
                                show={itemShow}
                                label={itemLabel}
                                position={itemPos}
                                hasLineAccent={itemAccent}
                                linePlacement={itemPlacement}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Black Box at the bottom - height is exactly 20% of the total height of the image behind it */}
                    <div
                      className="absolute bottom-0 left-0 right-0 w-full bg-black flex items-center justify-between px-4 sm:px-6 md:px-8 z-10 border-t border-yellow-500/30 shadow-lg overflow-hidden"
                      style={{ height: '20%' }}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden w-full h-full">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-400 animate-pulse shrink-0 z-20" />
                        <div className="overflow-hidden w-full h-full flex items-center relative">
                          <div
                            className={`flex items-center whitespace-nowrap ${isReverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                            style={{
                              animationDuration: `${Math.max(12, speedSeconds * 0.5)}s`,
                            }}
                          >
                            {[0, 1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className="text-yellow-400 font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase select-none leading-none pr-8 flex items-center space-x-3"
                              >
                                <span>{subtitleText}</span>
                                <span className="text-yellow-500/50">•</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center text-yellow-400/90 font-mono text-[10px] md:text-xs tracking-widest shrink-0 pl-4 border-l border-yellow-500/20 font-bold bg-black z-20 h-full">
                        <span>{watch.ref}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </React.Fragment>
          ))
        )}
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Search Drawer Component */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectWatch={(watch) => {
          setDiscoverWatch(watch);
          setIsDiscoverOpen(true);
        }}
      />

      {/* Artistic Manifesto Modal Component */}
      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* Wishlist/Saved Specifications Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favorites}
        savedConfigs={savedConfigs}
        onRemoveFavorite={handleRemoveFavorite}
        onRemoveConfig={handleRemoveConfig}
        onSelectWatch={(watch) => {
          setDiscoverWatch(watch);
          setIsDiscoverOpen(true);
        }}
        onLoadConfig={handleLoadConfig}
      />

      {/* Discover Detail Modal */}
      <DiscoverModal
        watch={discoverWatch}
        isOpen={isDiscoverOpen}
        onClose={() => setIsDiscoverOpen(false)}
        isFavorited={
          discoverWatch ? favorites.includes(discoverWatch.id) : false
        }
        onToggleFavorite={() =>
          discoverWatch && handleToggleFavorite(discoverWatch.id)
        }
        onOpenConfigurator={() => {
          if (discoverWatch) {
            setConfigureWatch(discoverWatch);
            setCustomizerPreset(undefined);
            setIsDiscoverOpen(false);
            setIsConfigureOpen(true);
          }
        }}
        onOpenFigure={(w) => {
          setFigureWatch(w);
          setIsFigureOpen(true);
        }}
      />

      {/* Customize Configurator Modal */}
      <ConfigureModal
        watch={configureWatch}
        isOpen={isConfigureOpen}
        onClose={() => setIsConfigureOpen(false)}
        onSaveConfig={handleSaveConfig}
        initialPreset={customizerPreset}
      />

      {/* Single Large Figure Focus Modal */}
      <FigureModal
        watch={figureWatch}
        isOpen={isFigureOpen}
        onClose={() => setIsFigureOpen(false)}
      />

      {/* CSS keyframe for banner marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}
