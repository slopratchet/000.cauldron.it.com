import React, { useState, useEffect } from 'react';
import {
  Database,
  RotateCcw,
  Check,
  AlertTriangle,
  Copy,
  Save,
  Terminal,
  Zap,
  Clock,
  ArrowLeftRight,
  Sliders,
  Play,
} from 'lucide-react';
import {
  getMasterDb,
  saveMasterDb,
  resetMasterDb,
  MasterDb,
  DEFAULT_MASTER_DB,
  parseTickerTape,
} from '../dbStore';

interface DatabaseConsoleProps {
  onBackToApp?: () => void;
}

type SchemaComponentKey =
  | 'FULL'
  | 'META'
  | 'CARD_ORDER'
  | 'WATCHES'
  | 'SPECS'
  | 'CASES'
  | 'DIALS'
  | 'BEZELS'
  | 'STRAPS'
  | 'SAVED_CONFIGS'
  | 'TICKERTAPES';

export default function DatabaseConsole({ onBackToApp }: DatabaseConsoleProps) {
  const [db, setDb] = useState<MasterDb>(DEFAULT_MASTER_DB);
  const [activeComponent, setActiveComponent] =
    useState<SchemaComponentKey>('FULL');
  const [selectedTapeKey, setSelectedTapeKey] = useState<string>('main');
  const [editorText, setEditorText] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>(
    'idle',
  );
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  // Load database on mount
  useEffect(() => {
    const loaded = getMasterDb();
    setDb(loaded);
  }, []);

  // Update editor text when active component or database changes
  useEffect(() => {
    let dataToDisplay: any = db;

    switch (activeComponent) {
      case 'META':
        dataToDisplay = db.meta;
        break;
      case 'CARD_ORDER':
        dataToDisplay = db.card_order || db.watches.map((w) => w.id);
        break;
      case 'WATCHES':
        dataToDisplay = db.watches;
        break;
      case 'SPECS':
        dataToDisplay = db.watches.map((w) => ({
          watchId: w.id,
          name: w.name,
          specs: w.specs,
        }));
        break;
      case 'CASES':
        dataToDisplay = db.config_options.cases;
        break;
      case 'DIALS':
        dataToDisplay = db.config_options.dials;
        break;
      case 'BEZELS':
        dataToDisplay = db.config_options.bezels;
        break;
      case 'STRAPS':
        dataToDisplay = db.config_options.straps;
        break;
      case 'SAVED_CONFIGS':
        dataToDisplay = db.saved_configs;
        break;
      case 'TICKERTAPES': {
        const formattedTapes: Record<string, any> = {};
        Object.keys(db.tickertapes).forEach((key) => {
          const info = parseTickerTape(db.tickertapes[key]);
          formattedTapes[key] = {
            speed_seconds: info.speedSeconds,
            flow_direction: info.direction,
            show_overlay_text: info.showOverlayText,
            overlay_label: info.overlayLabel,
            ...(info.overlayLabels && info.overlayLabels.length > 0
              ? { overlay_labels: info.overlayLabels }
              : {}),
            overlay_position: info.overlayPosition,
            ...(info.overlayPositions && info.overlayPositions.length > 0
              ? { overlay_positions: info.overlayPositions }
              : {}),
            overlay_line_accent: info.overlayLineAccent,
            overlay_line_placement: info.overlayLinePlacement,
            items:
              info.rawItems && info.rawItems.length > 0
                ? info.rawItems.map((ri) =>
                    ri.label === info.overlayLabel &&
                    ri.position === info.overlayPosition &&
                    ri.showOverlayText === info.showOverlayText &&
                    ri.linePlacement === info.overlayLinePlacement
                      ? ri.src
                      : {
                          src: ri.src,
                          ...(ri.label !== info.overlayLabel
                            ? { label: ri.label }
                            : {}),
                          ...(ri.position !== info.overlayPosition
                            ? { position: ri.position }
                            : {}),
                          ...(ri.showOverlayText !== info.showOverlayText
                            ? { show: ri.showOverlayText }
                            : {}),
                          ...(ri.linePlacement !== info.overlayLinePlacement
                            ? { line_placement: ri.linePlacement }
                            : {}),
                        },
                  )
                : info.items,
          };
        });
        dataToDisplay = formattedTapes;
        break;
      }
      case 'FULL':
      default:
        dataToDisplay = db;
        break;
    }

    setEditorText(JSON.stringify(dataToDisplay, null, 2));
    setIsValid(true);
    setValidationError('');
    setSaveStatus('idle');
  }, [activeComponent, db]);

  // Handle textarea changes and perform real-time validation
  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setEditorText(val);
    setSaveStatus('idle');

    try {
      JSON.parse(val);
      setIsValid(true);
      setValidationError('');
    } catch (err: any) {
      setIsValid(false);
      setValidationError(err.message || 'Invalid JSON syntax');
    }
  };

  // Reset Master DB to Default
  const handleReset = () => {
    if (
      confirm(
        'Are you sure you want to reset the database schema to factory defaults? All manual customizations will be overwritten.',
      )
    ) {
      resetMasterDb();
      const fresh = { ...DEFAULT_MASTER_DB };
      setDb(fresh);
      setActiveComponent('FULL');
      setSaveStatus('idle');
    }
  };

  // Copy JSON to Clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorText);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Save changes and merge them into the master database
  const handleSave = () => {
    try {
      const parsed = JSON.parse(editorText);
      let updatedDb: MasterDb = { ...db };

      switch (activeComponent) {
        case 'META':
          updatedDb.meta = parsed;
          break;
        case 'CARD_ORDER': {
          if (Array.isArray(parsed)) {
            updatedDb.card_order = parsed;
            const orderMap = new Map(
              parsed.map((id: string, index: number) => [id, index]),
            );
            updatedDb.watches = [...updatedDb.watches].sort((a, b) => {
              const idxA = orderMap.has(a.id) ? orderMap.get(a.id)! : 999;
              const idxB = orderMap.has(b.id) ? orderMap.get(b.id)! : 999;
              return idxA - idxB;
            });
          }
          break;
        }
        case 'WATCHES':
          updatedDb.watches = parsed;
          break;
        case 'SPECS':
          // Re-map specs changes back to watches
          if (Array.isArray(parsed)) {
            updatedDb.watches = updatedDb.watches.map((originalWatch) => {
              const matchingParsed = parsed.find(
                (p: any) => p.watchId === originalWatch.id,
              );
              if (matchingParsed && matchingParsed.specs) {
                return {
                  ...originalWatch,
                  specs: matchingParsed.specs,
                };
              }
              return originalWatch;
            });
          }
          break;
        case 'CASES':
          updatedDb.config_options.cases = parsed;
          break;
        case 'DIALS':
          updatedDb.config_options.dials = parsed;
          break;
        case 'BEZELS':
          updatedDb.config_options.bezels = parsed;
          break;
        case 'STRAPS':
          updatedDb.config_options.straps = parsed;
          break;
        case 'SAVED_CONFIGS':
          updatedDb.saved_configs = parsed;
          break;
        case 'TICKERTAPES': {
          updatedDb.tickertapes = parsed;
          break;
        }
        case 'FULL':
        default:
          updatedDb = parsed as MasterDb;
          break;
      }

      saveMasterDb(updatedDb);
      setDb(updatedDb);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      setSaveStatus('error');
      setValidationError(err.message || 'Failed to save due to parsing error');
    }
  };

  return (
    <div className="bg-[#f3f0e7] min-h-screen py-10 px-4 md:px-8 font-label text-black flex flex-col items-center justify-start select-none">
      <div className="w-full max-w-4xl bg-[#fbf9f4] border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col space-y-6">
        {/* Link back to live app option for easier routing testing */}
        {onBackToApp && (
          <button
            onClick={onBackToApp}
            className="absolute top-4 right-4 text-xs font-mono tracking-wider text-neutral-500 hover:text-black cursor-pointer border border-neutral-300 px-2 py-1 hover:border-black transition-colors"
          >
            ← GO TO CATALOG
          </button>
        )}

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-[2px] border-black pb-6 space-y-4 md:space-y-0">
          <div className="flex items-start space-x-4">
            <div className="bg-black text-white p-3 flex items-center justify-center shrink-0">
              <Database size={28} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  CHRONO-RAID PROTOCOL CONSOLE
                </span>
                <span className="bg-[#def7ec] text-[#03543f] text-[9px] font-mono uppercase tracking-wider font-extrabold px-2 py-0.5 border border-[#84e1bc] animate-pulse">
                  LIVE REGISTRY
                </span>
              </div>
              <h1 className="font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter leading-tight mt-1 text-black">
                THE ARCHIVE DATABASE SCHEMA INTERFACE
              </h1>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center justify-center space-x-2 border-2 border-red-600 bg-white hover:bg-red-50 text-red-600 px-4 py-2 font-mono text-xs font-bold uppercase transition-all shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] cursor-pointer self-start md:self-center"
          >
            <RotateCcw size={14} />
            <span>RESET ARCHIVE DATABASE</span>
          </button>
        </div>

        {/* Selection Schema Component Heading */}
        <div className="font-mono text-xs uppercase text-neutral-500 tracking-wider">
          // SELECT SCHEMA COMPONENT:
        </div>

        {/* Schema Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Full Schema Button */}
          <button
            onClick={() => setActiveComponent('FULL')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-extrabold uppercase transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'FULL'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>[FULL ARCHIVE SCHEMA]</span>
            {activeComponent === 'FULL' && (
              <Terminal size={14} className="text-white" />
            )}
          </button>

          {/* Component 1 */}
          <button
            onClick={() => setActiveComponent('META')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'META'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>1. CATALOG IDENTITY & STATUS</span>
            {activeComponent === 'META' && <Terminal size={14} />}
          </button>

          {/* Component 2 */}
          <button
            onClick={() => setActiveComponent('WATCHES')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'WATCHES'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>2. WATCH COLLECTION INVENTORY</span>
            {activeComponent === 'WATCHES' && <Terminal size={14} />}
          </button>

          {/* Component 3 */}
          <button
            onClick={() => setActiveComponent('SPECS')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'SPECS'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>3. CHRONOMETER SPECIFICATIONS</span>
            {activeComponent === 'SPECS' && <Terminal size={14} />}
          </button>

          {/* Component 4 */}
          <button
            onClick={() => setActiveComponent('CASES')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'CASES'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>4. CASE ALLOY REGISTRY</span>
            {activeComponent === 'CASES' && <Terminal size={14} />}
          </button>

          {/* Component 5 */}
          <button
            onClick={() => setActiveComponent('DIALS')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'DIALS'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>5. DIAL COLOR & VELUM CORES</span>
            {activeComponent === 'DIALS' && <Terminal size={14} />}
          </button>

          {/* Component 6 */}
          <button
            onClick={() => setActiveComponent('BEZELS')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'BEZELS'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>6. BEZEL FOCUS SHIELDS</span>
            {activeComponent === 'BEZELS' && <Terminal size={14} />}
          </button>

          {/* Component 7 */}
          <button
            onClick={() => setActiveComponent('STRAPS')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'STRAPS'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>7. STRAP & BINDING OPTIONS</span>
            {activeComponent === 'STRAPS' && <Terminal size={14} />}
          </button>

          {/* Component 8 */}
          <button
            onClick={() => setActiveComponent('SAVED_CONFIGS')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'SAVED_CONFIGS'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>8. USER SAVED CONFIGS</span>
            {activeComponent === 'SAVED_CONFIGS' && <Terminal size={14} />}
          </button>

          {/* Component 9 */}
          <button
            onClick={() => setActiveComponent('TICKERTAPES')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'TICKERTAPES'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>9. TICKERTAPE MARQUEE CORE</span>
            {activeComponent === 'TICKERTAPES' && <Terminal size={14} />}
          </button>

          {/* Component 10 */}
          <button
            onClick={() => setActiveComponent('CARD_ORDER')}
            className={`text-left p-3 border-2 border-black font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeComponent === 'CARD_ORDER'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            <span>10. CONTENT CARDS ORDER INDEX</span>
            {activeComponent === 'CARD_ORDER' && <Terminal size={14} />}
          </button>
        </div>

        {/* Code Editor Container */}
        <div className="border-[3px] border-black flex flex-col bg-[#111111] overflow-hidden">
          {/* Editor Header Bar */}
          <div className="bg-[#1b1b1b] border-b-[2px] border-black px-4 py-3 flex flex-wrap items-center justify-between gap-2 select-none">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#4ade80] font-bold">
              <span>&lt;/&gt;</span>
              <span>
                {activeComponent === 'FULL'
                  ? 'ARCHIVE-PROTOCOL-SCHEMA.JSON'
                  : `${activeComponent.toLowerCase()}-schema-node.json`}
              </span>
            </div>

            {/* Display Active Ticker Tape Metrics in Header if TICKERTAPES is active */}
            {activeComponent === 'TICKERTAPES' &&
              (() => {
                const activeInfo = parseTickerTape(
                  db.tickertapes[selectedTapeKey],
                );
                return (
                  <div className="flex items-center space-x-2 font-mono text-[11px] bg-black/80 border border-[#4ade80]/40 px-2.5 py-1 text-[#4ade80]">
                    <span className="text-neutral-400">
                      TAPE:{' '}
                      <strong className="text-white">{selectedTapeKey}</strong>
                    </span>
                    <span className="text-neutral-600">|</span>
                    <span>
                      SPEED:{' '}
                      <strong className="text-white font-bold">
                        {activeInfo.speedSeconds}s
                      </strong>
                    </span>
                    <span className="text-neutral-600">|</span>
                    <span>
                      FLOW:{' '}
                      <strong className="text-white font-black uppercase">
                        [{activeInfo.direction.toUpperCase()}]
                      </strong>
                    </span>
                  </div>
                );
              })()}
          </div>

          {/* Ticker Tape Local Selector & Quick Controls Banner */}
          {activeComponent === 'TICKERTAPES' &&
            (() => {
              const tapeKeys = Object.keys(db.tickertapes);
              const activeKey = tapeKeys.includes(selectedTapeKey)
                ? selectedTapeKey
                : tapeKeys[0] || 'main';
              const activeInfo = parseTickerTape(db.tickertapes[activeKey]);

              const updateLocalTapeMetrics = (
                newSpeed: number,
                newDir: 'left' | 'right',
              ) => {
                const currentRaw = db.tickertapes[activeKey];
                const items = parseTickerTape(currentRaw).items;
                const updatedTapeObj = {
                  speed_seconds: Math.max(1, newSpeed),
                  flow_direction: newDir,
                  items,
                };
                const updatedTickertapes = {
                  ...db.tickertapes,
                  [activeKey]: updatedTapeObj,
                };
                const updatedDb = {
                  ...db,
                  tickertapes: updatedTickertapes,
                };
                saveMasterDb(updatedDb);
                setDb(updatedDb);
              };

              return (
                <div className="bg-[#18181b] border-b-2 border-black font-mono text-xs text-white flex flex-col">
                  {/* Tape Selector Tabs */}
                  <div className="p-3 border-b border-neutral-800 flex flex-wrap items-center gap-2 bg-[#121214]">
                    <span className="text-[#4ade80] font-bold text-[11px] uppercase tracking-wider flex items-center space-x-1 mr-1">
                      <Sliders size={13} className="text-[#4ade80]" />
                      <span>TICKER TAPES:</span>
                    </span>
                    {tapeKeys.map((key) => {
                      const info = parseTickerTape(db.tickertapes[key]);
                      const isSelected = key === activeKey;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedTapeKey(key)}
                          className={`px-3 py-1 text-[11px] font-mono font-bold uppercase transition-all cursor-pointer border flex items-center ${
                            isSelected
                              ? 'bg-[#4ade80] text-black border-[#4ade80] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                              : 'bg-[#27272a] hover:bg-[#3f3f46] text-neutral-300 border-neutral-700'
                          }`}
                        >
                          <span>{key}</span>
                          <span
                            className={`ml-1.5 text-[9px] ${isSelected ? 'text-black/80 font-black' : 'text-[#4ade80]'}`}
                          >
                            ({info.speedSeconds}s{' '}
                            {info.direction === 'right' ? '►' : '◄'})
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Local Tape Metrics Control Strip */}
                  <div className="p-3.5 flex flex-wrap items-center justify-between gap-4 bg-[#18181b]">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center space-x-1.5 text-[#4ade80] font-bold uppercase tracking-wider">
                        <Zap
                          size={14}
                          className="animate-pulse text-[#4ade80]"
                        />
                        <span>
                          LOCAL METRICS FOR{' '}
                          <strong className="text-white font-extrabold underline">
                            [{activeKey}]
                          </strong>
                          :
                        </span>
                      </div>

                      {/* Speed Control Box */}
                      <div className="bg-[#27272a] border border-[#4ade80]/40 px-3 py-1.5 font-mono text-xs flex items-center space-x-2">
                        <Clock size={13} className="text-[#4ade80]" />
                        <span className="text-neutral-400">TIMING:</span>

                        <button
                          onClick={() =>
                            updateLocalTapeMetrics(
                              activeInfo.speedSeconds - 5,
                              activeInfo.direction,
                            )
                          }
                          className="bg-black hover:bg-neutral-800 text-[#4ade80] px-1.5 py-0.5 border border-[#4ade80]/40 text-[10px] font-bold cursor-pointer"
                          title="Decrease speed by 5s"
                        >
                          -5s
                        </button>

                        <input
                          type="number"
                          min="1"
                          max="300"
                          value={activeInfo.speedSeconds}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val > 0) {
                              updateLocalTapeMetrics(val, activeInfo.direction);
                            }
                          }}
                          className="w-14 bg-black border border-[#4ade80]/60 text-[#4ade80] font-bold text-center py-0.5 px-1 text-xs focus:outline-none"
                        />
                        <span className="text-white font-bold">SEC</span>

                        <button
                          onClick={() =>
                            updateLocalTapeMetrics(
                              activeInfo.speedSeconds + 5,
                              activeInfo.direction,
                            )
                          }
                          className="bg-black hover:bg-neutral-800 text-[#4ade80] px-1.5 py-0.5 border border-[#4ade80]/40 text-[10px] font-bold cursor-pointer"
                          title="Increase speed by 5s"
                        >
                          +5s
                        </button>

                        {/* Speed Presets */}
                        <div className="hidden sm:flex items-center space-x-1 ml-2 border-l border-neutral-700 pl-2">
                          {[10, 20, 35, 54, 75].map((preset) => (
                            <button
                              key={preset}
                              onClick={() =>
                                updateLocalTapeMetrics(
                                  preset,
                                  activeInfo.direction,
                                )
                              }
                              className={`px-1.5 py-0.5 text-[9px] font-mono cursor-pointer border ${
                                activeInfo.speedSeconds === preset
                                  ? 'bg-[#4ade80] text-black font-extrabold border-[#4ade80]'
                                  : 'bg-black text-neutral-400 border-neutral-800 hover:text-white'
                              }`}
                            >
                              {preset}s
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Flow Direction Box */}
                      <div className="bg-[#27272a] border border-[#4ade80]/40 px-3 py-1.5 font-mono text-xs flex items-center space-x-2">
                        <ArrowLeftRight size={13} className="text-[#4ade80]" />
                        <span className="text-neutral-400">FLOW:</span>
                        <button
                          onClick={() =>
                            updateLocalTapeMetrics(
                              activeInfo.speedSeconds,
                              activeInfo.direction === 'right'
                                ? 'left'
                                : 'right',
                            )
                          }
                          className="bg-black hover:bg-neutral-800 text-white border border-[#4ade80]/60 px-2.5 py-0.5 text-[11px] font-extrabold uppercase cursor-pointer transition-colors flex items-center space-x-1"
                        >
                          <span className="text-[#4ade80]">
                            {activeInfo.direction === 'right'
                              ? 'RIGHT ►'
                              : 'LEFT ◄'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Live Animated Marquee Preview for Active Tape */}
                  <div className="bg-[#0c0c0e] border-t border-neutral-800 py-2.5 px-4 overflow-hidden select-none relative flex flex-col space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="text-[#4ade80] font-bold tracking-wider uppercase flex items-center space-x-1.5">
                        <Play
                          size={10}
                          className="fill-[#4ade80] text-[#4ade80]"
                        />
                        <span>
                          LIVE PREVIEW FEED FOR:{' '}
                          <strong className="text-white font-extrabold">
                            [{activeKey}]
                          </strong>
                        </span>
                      </span>
                      <span className="font-mono text-[10px] text-neutral-300">
                        SPEED:{' '}
                        <strong className="text-white">
                          {activeInfo.speedSeconds}s
                        </strong>{' '}
                        | FLOW DIRECTION:{' '}
                        <strong className="text-[#4ade80] uppercase">
                          [{activeInfo.direction.toUpperCase()}]
                        </strong>
                      </span>
                    </div>

                    <div className="w-full overflow-hidden bg-black border border-neutral-800 py-2 px-2">
                      <div
                        style={{
                          animationDuration: `${activeInfo.speedSeconds}s`,
                        }}
                        className={`inline-flex items-center space-x-8 ${
                          activeInfo.direction === 'right'
                            ? 'animate-[marquee-reverse_54s_linear_infinite]'
                            : 'animate-[marquee_54s_linear_infinite]'
                        } whitespace-nowrap font-mono text-xs text-[#4ade80] tracking-widest font-bold uppercase`}
                      >
                        {(activeInfo.items || [])
                          .concat(activeInfo.items || [])
                          .map((item, idx) => {
                            const isImg =
                              typeof item === 'string' &&
                              (item.startsWith('/') ||
                                item.startsWith('http') ||
                                item.startsWith('data:image') ||
                                /\.(svg|png|jpg|jpeg|webp)$/i.test(item));
                            return (
                              <React.Fragment key={idx}>
                                {isImg ? (
                                  <img
                                    src={item}
                                    alt="tape item"
                                    className="h-6 w-auto inline-block border border-neutral-800"
                                  />
                                ) : (
                                  <span>{item}</span>
                                )}
                                <span className="text-neutral-600">•</span>
                              </React.Fragment>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          {/* Card Order Quick Reorder Controls Banner */}
          {activeComponent === 'CARD_ORDER' &&
            (() => {
              const currentOrder: string[] =
                db.card_order || db.watches.map((w) => w.id);

              const moveCard = (index: number, direction: 'up' | 'down') => {
                const newOrder = [...currentOrder];
                const targetIdx = direction === 'up' ? index - 1 : index + 1;
                if (targetIdx < 0 || targetIdx >= newOrder.length) return;

                // Swap items
                const temp = newOrder[index];
                newOrder[index] = newOrder[targetIdx];
                newOrder[targetIdx] = temp;

                const orderMap = new Map(newOrder.map((id, i) => [id, i]));
                const updatedWatches = [...db.watches].sort((a, b) => {
                  const idxA = orderMap.has(a.id) ? orderMap.get(a.id)! : 999;
                  const idxB = orderMap.has(b.id) ? orderMap.get(b.id)! : 999;
                  return idxA - idxB;
                });

                const updatedDb: MasterDb = {
                  ...db,
                  card_order: newOrder,
                  watches: updatedWatches,
                };

                saveMasterDb(updatedDb);
                setDb(updatedDb);
              };

              const toggleVisibility = (cardId: string) => {
                const updatedWatches = db.watches.map((w) => {
                  if (w.id === cardId) {
                    const currentlyVisible =
                      w.visible !== false && w.enabled !== false && !w.disabled;
                    return {
                      ...w,
                      visible: !currentlyVisible,
                      enabled: !currentlyVisible,
                      disabled: currentlyVisible,
                    };
                  }
                  return w;
                });

                const updatedDb: MasterDb = {
                  ...db,
                  watches: updatedWatches,
                };

                saveMasterDb(updatedDb);
                setDb(updatedDb);
              };

              return (
                <div className="bg-[#18181b] border-b-2 border-black font-mono text-xs text-white p-4 flex flex-col space-y-3">
                  <div className="flex items-center space-x-2 text-[#4ade80] font-bold uppercase tracking-wider">
                    <Sliders size={14} className="text-[#4ade80]" />
                    <span>REORDER & TOGGLE VISIBILITY FOR CONTENT CARDS:</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {currentOrder.map((id, index) => {
                      const watch = db.watches.find((w) => w.id === id);
                      const name = watch ? watch.name : id;
                      const isVisible = watch
                        ? watch.visible !== false &&
                          watch.enabled !== false &&
                          !watch.disabled
                        : true;
                      const isFirst = index === 0;
                      const isLast = index === currentOrder.length - 1;

                      return (
                        <div
                          key={id}
                          className="bg-[#27272a] border border-neutral-700 p-2.5 flex flex-wrap items-center justify-between gap-2"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="bg-[#4ade80] text-black font-extrabold text-[10px] px-2 py-0.5 border border-black">
                              #{index + 1}
                            </span>
                            <span className="text-[#4ade80] font-bold text-xs">
                              {id}
                            </span>
                            <span className="text-neutral-400 text-xs hidden sm:inline">
                              — {name}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 border font-bold ${
                                isVisible
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                                  : 'bg-red-950 text-red-400 border-red-600'
                              }`}
                            >
                              {isVisible
                                ? 'VISIBLE: TRUE'
                                : 'VISIBLE: FALSE (REMOVED)'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleVisibility(id)}
                              className={`px-3 py-1 font-mono text-[10px] font-bold uppercase border cursor-pointer ${
                                isVisible
                                  ? 'bg-red-950 hover:bg-red-900 text-red-300 border-red-600'
                                  : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-600'
                              }`}
                            >
                              {isVisible
                                ? 'HIDE CARD (SET FALSE)'
                                : 'SHOW CARD (SET TRUE)'}
                            </button>
                            <button
                              onClick={() => moveCard(index, 'up')}
                              disabled={isFirst}
                              className={`px-3 py-1 font-mono text-[10px] font-bold uppercase border cursor-pointer ${
                                isFirst
                                  ? 'bg-neutral-800 text-neutral-600 border-neutral-700 cursor-not-allowed'
                                  : 'bg-black hover:bg-neutral-800 text-[#4ade80] border-[#4ade80]/60'
                              }`}
                            >
                              ▲ MOVE UP
                            </button>
                            <button
                              onClick={() => moveCard(index, 'down')}
                              disabled={isLast}
                              className={`px-3 py-1 font-mono text-[10px] font-bold uppercase border cursor-pointer ${
                                isLast
                                  ? 'bg-neutral-800 text-neutral-600 border-neutral-700 cursor-not-allowed'
                                  : 'bg-black hover:bg-neutral-800 text-[#4ade80] border-[#4ade80]/60'
                              }`}
                            >
                              ▼ MOVE DOWN
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          {/* Text Area */}
          <textarea
            value={editorText}
            onChange={handleEditorChange}
            className="w-full h-96 bg-[#121212] text-[#4ade80] p-4 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed overflow-y-auto selection:bg-[#4ade80]/25 selection:text-white"
            spellCheck="false"
          />

          {/* Real-time Syntax Validation Bar */}
          <div
            className={`px-4 py-3 border-t-[2px] border-black flex items-center space-x-2 font-mono text-xs ${
              isValid
                ? 'bg-[#def7ec] text-[#03543f] border-[#84e1bc]'
                : 'bg-[#fde8e8] text-[#9b1c1c] border-[#f8b4b4]'
            }`}
          >
            {isValid ? (
              <>
                <Check size={16} className="text-[#0e9f6e] shrink-0" />
                <span className="font-extrabold">SYNTAX IS VALID:</span>
                <span>Database parsing active. Live feedback secured.</span>
              </>
            ) : (
              <>
                <AlertTriangle
                  size={16}
                  className="text-[#e02424] shrink-0 animate-bounce"
                />
                <span className="font-extrabold">SYNTAX INVALID:</span>
                <span className="truncate">{validationError}</span>
              </>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="bg-white hover:bg-neutral-100 text-black border-2 border-black font-mono text-xs font-bold uppercase py-3 px-6 flex items-center justify-center space-x-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <Copy size={14} />
            <span>{copyStatus ? 'COPIED!' : 'COPY JSON'}</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`border-2 border-black font-mono text-xs font-bold uppercase py-3 px-6 flex items-center justify-center space-x-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
              !isValid
                ? 'bg-neutral-300 text-neutral-500 border-neutral-400 cursor-not-allowed shadow-none active:translate-y-0'
                : saveStatus === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <Save size={14} />
            <span>
              {saveStatus === 'success'
                ? 'COUPLED & SYNCED SUCCESSFULLY!'
                : saveStatus === 'error'
                  ? 'SAVE ERROR'
                  : 'SAVE & COUPL DATABASE'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
