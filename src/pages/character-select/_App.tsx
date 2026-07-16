import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { defaultCampaignData } from './_defaultData';
import type { CampaignDatabaseSchema } from './_types';
import CampaignSchemaConsole from './_components/CampaignSchemaConsole';

export default function App() {
  const [jsonParam, setJsonParam] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const json = params.get('json');
      if (json) return json;
      const actor = params.get('actor');
      if (actor) {
        const actorNum = parseInt(actor, 10);
        if (!isNaN(actorNum)) {
          return actorNum % 2 === 0
            ? 'charity-vaughn.json'
            : 'catharsis-gale.json';
        }
      }
    }
    return null;
  });

  const getStorageKey = (param: string | null) => {
    if (!param) return 'charity_vaughn_db';
    return `charity_vaughn_db_${param.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  };

  const activeStorageKey = getStorageKey(jsonParam);

  // Load initial state from local storage, or fall back to default structured data
  const [dbData, setDbData] = useState<CampaignDatabaseSchema>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(activeStorageKey);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse cached database schema', e);
        }
      }
    }
    return defaultCampaignData;
  });

  const [activePortrait, setActivePortrait] = useState<string>('');
  const [visibleStatTooltips, setVisibleStatTooltips] = useState<
    Record<string, boolean>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Detect ?db=true in search query params
  const [showConsole, setShowConsole] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('db') === 'true';
    }
    return false;
  });

  // Keep checking URL changes reactively (handles address bar edits, navigation)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      setShowConsole(params.get('db') === 'true');
      let resolvedJson = params.get('json');
      if (!resolvedJson) {
        const actor = params.get('actor');
        if (actor) {
          const actorNum = parseInt(actor, 10);
          if (!isNaN(actorNum)) {
            resolvedJson =
              actorNum % 2 === 0
                ? 'charity-vaughn.json'
                : 'catharsis-gale.json';
          }
        }
      }
      setJsonParam(resolvedJson);
    };
    window.addEventListener('popstate', handleUrlChange);
    const interval = setInterval(handleUrlChange, 1000);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      clearInterval(interval);
    };
  }, []);

  // Fetch JSON file dynamically if needed
  useEffect(() => {
    const storageKey = getStorageKey(jsonParam);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setDbData(JSON.parse(saved));
          setFetchError(null);
          return;
        } catch (e) {
          console.error(
            'Failed to parse cached database schema for ' + storageKey,
            e,
          );
        }
      }
    }

    if (!jsonParam) {
      setDbData(defaultCampaignData);
      setFetchError(null);
      return;
    }

    setLoading(true);
    setFetchError(null);

    const loadData = async () => {
      try {
        let data;
        const param = jsonParam.replace('.json', '');
        if (param === 'charity-vaughn') {
          data = (await import('./_data/charity-vaughn.json')).default;
        } else if (param === 'catharsis-gale') {
          data = (await import('./_data/catharsis-gale.json')).default;
        } else {
          throw new Error('Unknown character file');
        }
        setDbData(data);
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (err) {
        console.error('Error fetching json data file:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setFetchError(
          `Failed to load schema file for "${jsonParam}": ${errorMessage}`,
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [jsonParam]);

  // Sync selected portrait if the list of portraits changes
  useEffect(() => {
    const list = dbData.identity?.portraits || [];
    if (list.length > 0 && !list.includes(activePortrait)) {
      setActivePortrait(list[0]);
    }
  }, [dbData, activePortrait]);

  const toggleStatTooltip = (abbr: string) => {
    setVisibleStatTooltips((prev) => ({
      ...prev,
      [abbr]: !prev[abbr],
    }));
  };

  const handleResetDatabase = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the current database to original settings?',
      )
    ) {
      localStorage.removeItem(activeStorageKey);
      if (jsonParam) {
        setLoading(true);
        const loadData = async () => {
          try {
            let data;
            const param = jsonParam.replace('.json', '');
            if (param === 'charity-vaughn') {
              data = (await import('./_data/charity-vaughn.json')).default;
            } else if (param === 'catharsis-gale') {
              data = (await import('./_data/catharsis-gale.json')).default;
            } else {
              throw new Error('Unknown character file');
            }
            setDbData(data);
            localStorage.setItem(activeStorageKey, JSON.stringify(data));
            setFetchError(null);
          } catch (err) {
            console.error(err);
            const errorMessage =
              err instanceof Error ? err.message : String(err);
            setFetchError(
              `Failed to reset profile for "${jsonParam}": ${errorMessage}`,
            );
          } finally {
            setLoading(false);
          }
        };
        loadData();
      } else {
        setDbData(defaultCampaignData);
        setFetchError(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-tinos text-base selection:bg-ink selection:text-parchment pb-12">
      <a
        href="/lobby"
        className="fixed top-0 left-0 border-2 border-black bg-white hard-shadow-sm p-2 hover:bg-black hover:text-white transition-colors z-50 flex items-center justify-center cursor-pointer"
        title="Back to Lobby"
      >
        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
      </a>
      {/* Database Schema Console Panel at the very top */}
      {showConsole && (
        <div className="p-4 md:p-8 bg-zinc-100 border-b-4 border-ink">
          <CampaignSchemaConsole
            dbData={dbData}
            onDataChange={setDbData}
            onReset={handleResetDatabase}
            storageKey={activeStorageKey}
            jsonParam={jsonParam}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-parchment w-full max-w-7xl mx-auto">
        {fetchError && (
          <div className="mb-6 p-4 bg-rose-100 text-rose-800 border-l-[6px] border-rose-600 font-mono text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] flex justify-between items-center">
            <div>
              <p className="font-bold uppercase tracking-wider">
                // DYNAMIC DATA LOADING FAILURE:
              </p>
              <p className="mt-1">{fetchError}</p>
            </div>
            <button
              onClick={() => setFetchError(null)}
              className="text-rose-800 hover:text-rose-950 font-bold px-3 py-1 border border-rose-300 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        )}

        {loading && (
          <div className="mb-6 p-4 bg-zinc-100 text-zinc-800 border-l-[6px] border-zinc-600 font-mono text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-zinc-600 animate-ping"></span>
            <span className="font-bold uppercase tracking-widest">
              // SYNCHRONIZING REALTIME PROFILE DATA FILE...
            </span>
          </div>
        )}

        {/* Header Section */}
        <section className="relative mb-8 md:mb-12 border-b-4 border-ink pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/2 order-2 md:order-1 pt-6 md:pt-0">
              <div className="z-10 relative translate-y-[30%] -mb-6 md:-mb-12 md:ml-[-16px] lg:ml-[-24px] bg-ink inline-block px-4 py-2 self-start border-2 border-ink">
                <h1 className="font-anton text-[8vw] md:text-5xl lg:text-[76px] leading-[0.9] tracking-[-0.01em] uppercase text-parchment whitespace-nowrap">
                  {dbData.identity?.name || 'CHARITY VAUGHN'}
                </h1>
              </div>
              <div className="border-4 border-ink p-2 bg-white relative z-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative">
                  <img
                    alt={`${dbData.identity?.name || 'Charity Vaughn'} - Portrait`}
                    className="w-full aspect-square object-cover grayscale contrast-125 border-2 border-ink"
                    src={activePortrait || dbData.identity?.portraits?.[0]}
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white border-[3px] border-ink p-2 md:p-3 text-center">
                    <span className="font-anton text-xl md:text-2xl tracking-wide uppercase text-ink">
                      {dbData.identity?.title || 'SOCIAL CHAMELEON'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col justify-center pt-4 md:pl-12 lg:pl-20">
              <p className="font-mono text-xs md:text-[14px] font-bold uppercase tracking-[0.1em] bg-ink text-parchment px-4 py-2 inline-block self-start mb-6 border-2 border-ink">
                {dbData.identity?.tagline || 'THE IRON FIST IN A VELVET GLOVE'}
              </p>
              <p className="font-tinos text-lg md:text-[20px] leading-[1.6] italic font-medium">
                "{dbData.identity?.quote || ''}"
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {Array.from({ length: 7 }).map((_, i) => {
                  const img =
                    dbData.identity?.portraits?.[i] ||
                    dbData.identity?.portraits?.[
                      i % (dbData.identity?.portraits?.length || 1)
                    ];
                  const isActive = activePortrait === img;
                  return (
                    <button
                      key={i}
                      onClick={() => setActivePortrait(img)}
                      className="relative w-8 h-8 md:w-10 md:h-10 group outline-none border-0 bg-transparent cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-ink [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] translate-x-[2px] translate-y-[2px] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
                      <div className="absolute inset-0 bg-ink [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] z-10 transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px]"></div>
                      <div
                        className={`absolute inset-[2px] flex items-center justify-center font-mono text-sm font-bold [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] z-20 transition-transform group-hover:translate-x-[2px] group-hover:translate-y-[2px] ${isActive ? 'bg-ink text-parchment' : 'bg-white text-ink group-hover:bg-ink group-hover:text-parchment'}`}
                      >
                        {i + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  const targetParams = new URLSearchParams();
                  if (typeof window !== 'undefined') {
                    const currentParams = new URLSearchParams(
                      window.location.search,
                    );
                    for (const [key, value] of currentParams.entries()) {
                      if (
                        value.startsWith('http://') ||
                        value.startsWith('https://') ||
                        value.includes('://')
                      ) {
                        targetParams.set(key, value);
                      }
                    }
                  }
                  const queryString = targetParams.toString();
                  window.location.href = queryString
                    ? `/control?${queryString}`
                    : '/control';
                }}
                className="mt-6 block w-full bg-[#cc5500] text-parchment font-anton text-2xl md:text-3xl py-3 border-[3px] border-ink shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase cursor-pointer text-center"
              >
                {dbData.identity?.reserveButtonText || 'Play Charity'}
              </button>
              <div className="mt-4 relative">
                <select className="w-full appearance-none bg-white border-[3px] border-ink py-3 pl-4 pr-10 font-mono font-bold uppercase text-ink shadow-[4px_4px_0px_0px_#000000] cursor-pointer focus:outline-none focus:ring-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all">
                  {dbData.identity?.reservationOptions?.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink">
                  <svg
                    className="fill-current h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Left Column (Lore & Highlights) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="border-l-[6px] border-ink pl-6">
              <h2 className="font-anton text-4xl md:text-[48px] leading-[1.1] tracking-[0.01em] uppercase mb-6 text-ink">
                {dbData.lore?.sectionHeader || 'A MASTER OF PERSUASION'}
              </h2>

              <p className="font-tinos text-lg md:text-[18px] leading-[1.8] text-ink mb-4">
                {dbData.lore?.paragraphs?.[0] || ''}
              </p>

              {dbData.lore?.quoteBlock && (
                <blockquote className="font-anton text-2xl md:text-[28px] leading-[1.3] uppercase my-8 bg-ink text-[#cc5500] p-6 md:p-8 border-2 border-ink shadow-[4px_4px_0px_0px_#E6E2D8,6px_6px_0px_0px_#000]">
                  "{dbData.lore.quoteBlock}"
                </blockquote>
              )}

              {dbData.lore?.paragraphs?.slice(1).map((para, i) => (
                <p
                  key={i}
                  className="font-tinos text-lg md:text-[18px] leading-[1.8] text-ink mt-4"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="bg-[#e2e2e2] p-6 md:p-8 border-4 border-ink">
              <h3 className="font-anton text-2xl md:text-[28px] leading-[1.2] uppercase border-b-4 border-ink mb-6 pb-3 text-ink">
                PLAYER HIGHLIGHTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dbData.highlights?.map((h, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-text"
                  >
                    <p className="font-mono text-sm font-bold tracking-[0.1em] uppercase mb-3 border-b border-dashed border-ink/30 pb-2">
                      {h.title}
                    </p>
                    <p className="font-tinos text-[16px] leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-8">
            <div className="border-[6px] border-ink p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-anton text-[28px] leading-none uppercase border-b-4 border-ink pb-3 mb-6 bg-ink text-parchment px-3 pt-2 -mx-3 -mt-3">
                TECHNICAL DOSSIER
              </h3>

              <div className="font-mono text-[14px] font-bold uppercase mb-8 space-y-2 tracking-tight">
                <p className="flex justify-between border-b border-dotted border-ink/50 pb-1">
                  <span>LEVEL:</span>{' '}
                  <span>{dbData.technicalDossier?.level ?? 20}</span>
                </p>
                <p className="flex justify-between border-b border-dotted border-ink/50 pb-1">
                  <span>CLASS:</span>{' '}
                  <span>{dbData.technicalDossier?.class || ''}</span>
                </p>
                <p className="flex justify-between border-b border-dotted border-ink/50 pb-1">
                  <span>ARCHETYPE:</span>{' '}
                  <span>{dbData.technicalDossier?.archetype || ''}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 gap-y-6">
                {dbData.technicalDossier?.stats?.map((stat, i) => {
                  const isVisible = !!visibleStatTooltips[stat.abbr];
                  return (
                    <div
                      key={i}
                      className="border-4 border-ink p-2 text-center group hover:bg-ink hover:text-parchment transition-colors cursor-pointer relative"
                      onClick={() => toggleStatTooltip(stat.abbr)}
                    >
                      <p className="font-mono text-[11px] font-bold tracking-widest uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white group-hover:bg-ink px-2 border-x-2 border-t-2 border-ink transition-colors">
                        {stat.abbr}
                      </p>
                      <p className="font-anton text-[36px] leading-none pt-3">
                        {stat.value}
                      </p>
                      {isVisible && (
                        <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border-2 border-ink p-2 shadow-[4px_4px_0px_0px_#000] text-ink text-left text-xs font-mono lowercase">
                          {stat.detail}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-4 border-dashed border-ink bg-[#F3F3F3] relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-ink -translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-ink translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-ink -translate-x-1 translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-ink translate-x-1 translate-y-1"></div>

              <h3 className="font-mono text-[14px] font-bold uppercase mb-3 text-ink bg-white inline-block px-2 border-2 border-ink">
                {dbData.tacticalInsight?.title || 'TACTICAL INSIGHT'}
              </h3>
              <p className="font-tinos text-[16px] italic leading-relaxed text-ink mt-2">
                "{dbData.tacticalInsight?.quote || ''}"
              </p>
              <p className="text-right mt-6 font-mono text-[12px] font-bold uppercase tracking-widest border-t-2 border-dotted border-ink/30 pt-3">
                {dbData.tacticalInsight?.author || ''}
              </p>
            </div>
          </aside>
        </section>

        <a
          href="/character-profile"
          className="mt-8 w-full block bg-ink text-parchment font-anton text-2xl md:text-3xl py-4 border-[3px] border-ink shadow-[4px_4px_0px_0px_#cc5500] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#cc5500] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase cursor-pointer text-center"
        >
          {dbData.identity?.embraceButtonText || 'Embrace more of CHARITY'}
        </a>
      </main>
    </div>
  );
}
