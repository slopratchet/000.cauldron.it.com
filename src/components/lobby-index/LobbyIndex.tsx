import './styles/lobby-index.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';
import {
  INITIAL_SESSIONS,
  INITIAL_SYSTEM_LOGS,
  generateInitialSeats,
  ENCYCLOPEDIA_NOTES,
} from './data';
import type { SessionLog, Seat, SystemLogEntry } from './types';
import HeaderBanner from './HeaderBanner';
import LedgerTable from './LedgerTable';
import CommandPanel from './CommandPanel';
import ClerkDataSchema from './ClerkDataSchema';
import SchemaDatabase from './SchemaDatabase';
import TheaterMap from './TheaterMap';
import OperationalLandscape from './OperationalLandscape';
import MainCountdown from './MainCountdown';

const MAX_LOG_ENTRIES = 100;

interface SchemaState {
  systemName: string;
  operator: string;
  encryption: 'LEGACY-A' | 'SECURE-X' | 'UNENCRYPTED';
  capacityTarget: number;
  landscapeTitle?: string;
  landscapeImgRef?: string;
  visibleComponents: {
    headerBanner: boolean;
    landscapeImage: boolean;
    theaterMapping: boolean;
    systemDiagnostics: boolean;
    sessionRegistry: boolean;
    operationalLedger: boolean;
    inputOverride: boolean;
    systemLogs: boolean;
    appendixManual: boolean;
  };
  sessions: SessionLog[];
  seats: Seat[];
  systemLogs: SystemLogEntry[];
}

const getInitialSchemaState = (): SchemaState => ({
  systemName: 'THE TOME: 1970 Edition',
  operator: 'ADMIN_74',
  encryption: 'LEGACY-A',
  capacityTarget: 67,
  landscapeTitle: 'Operational Landscape',
  landscapeImgRef: 'IMG_REF_69.SYS',
  visibleComponents: {
    headerBanner: false,
    landscapeImage: true,
    theaterMapping: true,
    systemDiagnostics: false,
    sessionRegistry: false,
    operationalLedger: false,
    inputOverride: false,
    systemLogs: true,
    appendixManual: false,
  },
  sessions: INITIAL_SESSIONS,
  seats: generateInitialSeats(),
  systemLogs: INITIAL_SYSTEM_LOGS,
});

export default function LobbyIndex() {
  // Main Unified Schema State
  const [schema, setSchema] = useState<SchemaState>(getInitialSchemaState());

  // Log pausing state
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const logBufferRef = useRef<SystemLogEntry[]>([]);

  // Countdown timer state
  const [timeInSeconds, setTimeInSeconds] = useState<number>(3 * 60 + 33);
  const [isTimerRunning] = useState<boolean>(true);

  // Decrement Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    'T-740921-A',
  );
  const [activeManualTopic, setActiveManualTopic] = useState<number | null>(
    null,
  );

  // Schema DB Viewer visibility state driven by URL variable (?schema=true, ?db=true, ?editor=true, ?database=true)
  const [showDbEditor, setShowDbEditor] = useState(false);

  // Raw text value for the editable JSON database representation
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(getInitialSchemaState(), null, 2),
  );

  // Sound/Vibe indicator
  const [, setActionPulse] = useState(false);

  // To prevent circular re-stringification on user typing edits
  const isInternalUpdatingRef = useRef(false);

  // Detect URL parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasParam =
      params.get('schema') === 'true' ||
      params.get('editor') === 'true' ||
      params.get('database') === 'true' ||
      params.get('db') === 'true';
    setShowDbEditor(hasParam);
  }, []);

  const toggleDbEditor = () => {
    const nextVal = !showDbEditor;
    setShowDbEditor(nextVal);

    // Update URL query parameters seamlessly without page reload
    const params = new URLSearchParams(window.location.search);
    if (nextVal) {
      params.set('schema', 'true');
    } else {
      params.delete('schema');
      params.delete('editor');
      params.delete('database');
      params.delete('db');
    }
    const newRelativePathQuery =
      window.location.pathname +
      (params.toString() ? '?' + params.toString() : '');
    window.history.pushState(null, '', newRelativePathQuery);

    handleAddLog(
      `SCHEMA DATABASE VIEWPORT ${nextVal ? 'ACTIVATED' : 'DEACTIVATED'} via URL STATE`,
      'INFO',
    );
  };

  // Sync state changes from components back to JSON text
  const syncSchemaToText = useCallback((updatedSchema: SchemaState) => {
    isInternalUpdatingRef.current = true;
    setJsonText(JSON.stringify(updatedSchema, null, 2));
    isInternalUpdatingRef.current = false;
  }, []);

  // Dynamic timing generator for logging
  const getSimulatedTime = () => {
    const d = new Date();
    const hrs = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
    const secs = d.getSeconds().toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleAddLog = useCallback(
    (text: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' = 'INFO') => {
      const timestamp = getSimulatedTime();
      const nextLog: SystemLogEntry = {
        timestamp,
        text: text.toUpperCase(),
        type,
      };

      if (isPaused) {
        logBufferRef.current.push(nextLog);
        if (logBufferRef.current.length > MAX_LOG_ENTRIES) {
          logBufferRef.current = logBufferRef.current.slice(-MAX_LOG_ENTRIES);
        }
        return;
      }

      setSchema((prev) => {
        const updated = {
          ...prev,
          systemLogs: [nextLog, ...prev.systemLogs].slice(0, MAX_LOG_ENTRIES),
        };
        syncSchemaToText(updated);
        return updated;
      });
    },
    [syncSchemaToText, isPaused],
  );

  // Listen for external logs from the main page (e.g. WebSocket messages)
  useEffect(() => {
    const handleExternalLog = (event: Event) => {
      const customEvent = event as CustomEvent<{
        text: string;
        type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
      }>;
      if (customEvent.detail && customEvent.detail.text) {
        handleAddLog(
          customEvent.detail.text,
          customEvent.detail.type || 'INFO',
        );
      }
    };

    window.addEventListener('lobby-system-log', handleExternalLog);
    return () => {
      window.removeEventListener('lobby-system-log', handleExternalLog);
    };
  }, [handleAddLog]);

  // Toggle seat occupancy
  const handleToggleSeat = (seatId: string) => {
    setSchema((prev) => {
      const prevSeats = prev.seats;
      const idx = prevSeats.findIndex((s) => s.id === seatId);
      if (idx === -1) return prev;

      const updatedSeats = [...prevSeats];
      const target = updatedSeats[idx];
      const nextStatus = target.status === 'OCCUPIED' ? 'VACANT' : 'OCCUPIED';

      updatedSeats[idx] = {
        ...target,
        status: nextStatus,
        sessionId:
          nextStatus === 'OCCUPIED'
            ? `T-74092${Math.floor(Math.random() * 5 + 1)}-A`
            : undefined,
      };

      const nextLogText = `SEAT COORDINATE ${seatId} MODIFIED: STATUS SET TO [${nextStatus}]`;
      const nextLog: SystemLogEntry = {
        timestamp: getSimulatedTime(),
        text: nextLogText.toUpperCase(),
        type: nextStatus === 'OCCUPIED' ? 'SUCCESS' : 'WARNING',
      };

      if (isPaused) {
        logBufferRef.current.push(nextLog);
        if (logBufferRef.current.length > MAX_LOG_ENTRIES) {
          logBufferRef.current = logBufferRef.current.slice(-MAX_LOG_ENTRIES);
        }
        const updated = {
          ...prev,
          seats: updatedSeats,
        };
        syncSchemaToText(updated);
        return updated;
      }

      const updated = {
        ...prev,
        seats: updatedSeats,
        systemLogs: [nextLog, ...prev.systemLogs].slice(0, MAX_LOG_ENTRIES),
      };

      syncSchemaToText(updated);
      return updated;
    });

    // Make UI pulse visually briefly on seat toggle
    setActionPulse(true);
    setTimeout(() => setActionPulse(false), 200);
  };

  // Click seat logs coordinates
  const handleSelectSeatCoordinate = (id: string) => {
    handleAddLog(`TARGET VECTOR SECTOR REGISTERED ON SEGMENT: [${id}]`, 'INFO');

    const match = schema.seats.find((s) => s.id === id);
    if (match && match.sessionId) {
      const matchingSession = schema.sessions.find(
        (s) => s.id === match.sessionId,
      );
      if (matchingSession) {
        setSelectedSessionId(matchingSession.id);
        handleAddLog(
          `VECTOR MATCH KEY LOCATED: ASSOCIATED TO SESSION [${match.sessionId}]`,
          'SUCCESS',
        );
      }
    }
  };

  // Execute manual query override form
  const handleExecuteQuery = (query: string) => {
    handleAddLog(
      `COMMAND INJECTOR: EXECUTING VECTOR OVERRIDE ON SEQUENCE [${query}]`,
      'INFO',
    );

    const isSeatId = /^G-\d{2}$/i.test(query) || /^\d{2}$/.test(query);
    if (isSeatId) {
      const formattedSeat = query.startsWith('G-')
        ? query.toUpperCase()
        : `G-${query.padStart(2, '0')}`;
      const seatExists = schema.seats.find((s) => s.id === formattedSeat);
      if (seatExists) {
        handleToggleSeat(formattedSeat);
        handleAddLog(
          `QUERY HIT: CHANGER APPLIED TO SECTOR MAPPING COORDINATE [${formattedSeat}]`,
          'SUCCESS',
        );
        return;
      }
    }

    const matchingSession = schema.sessions.find(
      (s) => s.id.toUpperCase() === query,
    );
    if (matchingSession) {
      setSelectedSessionId(matchingSession.id);
      handleAddLog(
        `QUERY HIT: SESSION SEQUENCE KEY PINNED ON LEDGER ROW [${query}]`,
        'SUCCESS',
      );
    } else {
      handleAddLog(
        `QUERY FAULT: TARGET METRIC [${query}] IS NOT ALLOCATED IN REGISTER`,
        'ALERT',
      );
    }
  };

  // Inject user-authored override log
  const handleInsertSession = (newLog: SessionLog) => {
    setSchema((prev) => {
      const nextSessions = [newLog, ...prev.sessions];

      const targetSeat = newLog.seat.toUpperCase();
      const updatedSeats = [...prev.seats];
      const seatIdx = updatedSeats.findIndex((s) => s.id === targetSeat);
      if (seatIdx !== -1) {
        updatedSeats[seatIdx] = {
          ...updatedSeats[seatIdx],
          status: 'OCCUPIED',
          sessionId: newLog.id,
        };
      }

      const nextLog: SystemLogEntry = {
        timestamp: getSimulatedTime(),
        text: `SESSION ${newLog.id} SUCCESSFULLY REGISTERED INTO HISTORIC DATA STACK`,
        type: 'SUCCESS',
      };

      if (isPaused) {
        logBufferRef.current.push(nextLog);
        if (logBufferRef.current.length > MAX_LOG_ENTRIES) {
          logBufferRef.current = logBufferRef.current.slice(-MAX_LOG_ENTRIES);
        }
        const updated = {
          ...prev,
          sessions: nextSessions,
          seats: updatedSeats,
        };
        syncSchemaToText(updated);
        setSelectedSessionId(newLog.id);
        return updated;
      }

      const updated = {
        ...prev,
        sessions: nextSessions,
        seats: updatedSeats,
        systemLogs: [nextLog, ...prev.systemLogs].slice(0, MAX_LOG_ENTRIES),
      };

      syncSchemaToText(updated);
      setSelectedSessionId(newLog.id);
      return updated;
    });
  };

  const handleClearLogs = () => {
    logBufferRef.current = [];
    setSchema((prev) => {
      const updated = {
        ...prev,
        systemLogs: [
          {
            timestamp: getSimulatedTime(),
            text: 'SYSTEM TERMINAL BUFFER RESOLVED & PURGED.',
            type: 'INFO' as const,
          },
        ],
      };
      syncSchemaToText(updated);
      return updated;
    });
  };

  const handleTogglePause = () => {
    if (isPaused) {
      // Resuming - flush buffer
      const buffered = [...logBufferRef.current];
      logBufferRef.current = [];
      setSchema((prev) => {
        const updated = {
          ...prev,
          systemLogs: [...[...buffered].reverse(), ...prev.systemLogs].slice(
            0,
            MAX_LOG_ENTRIES,
          ),
        };
        syncSchemaToText(updated);
        return updated;
      });
    }
    setIsPaused(!isPaused);
  };

  // Called when user edits the raw JSON text editor manually
  const handleJsonTextChange = (newText: string) => {
    setJsonText(newText);

    if (isInternalUpdatingRef.current) return;

    try {
      const parsed = JSON.parse(newText);
      if (parsed && typeof parsed === 'object') {
        const safeParsed: SchemaState = {
          systemName: parsed.systemName || 'THE TOME: 1970 Edition',
          operator: parsed.operator || 'ADMIN_74',
          encryption: parsed.encryption || 'LEGACY-A',
          capacityTarget:
            typeof parsed.capacityTarget === 'number'
              ? parsed.capacityTarget
              : 67,
          landscapeTitle: parsed.landscapeTitle || 'Operational Landscape',
          landscapeImgRef: parsed.landscapeImgRef || 'IMG_REF_69.SYS',
          visibleComponents: {
            headerBanner: false,
            landscapeImage: true,
            theaterMapping: true,
            systemDiagnostics: false,
            sessionRegistry: false,
            operationalLedger: false,
            inputOverride: false,
            systemLogs: true,
            appendixManual: false,
            ...(parsed.visibleComponents || {}),
          },
          sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
          seats: Array.isArray(parsed.seats) ? parsed.seats : [],
          systemLogs: Array.isArray(parsed.systemLogs) ? parsed.systemLogs : [],
        };

        setSchema(safeParsed);
      }
    } catch (err) {
      // Handled inside SchemaDatabase validation component dynamically
    }
  };

  // Reset database back to default initial values
  const handleResetDatabase = () => {
    const fresh = getInitialSchemaState();
    setSchema(fresh);
    setJsonText(JSON.stringify(fresh, null, 2));
    setSelectedSessionId('T-740921-A');
    setActiveManualTopic(null);
  };

  // Sync callbacks from inner widgets up to main Schema
  const handleOperatorChange = (newVal: string) => {
    setSchema((prev) => {
      const updated = { ...prev, operator: newVal };
      syncSchemaToText(updated);
      return updated;
    });
  };

  const handleEncryptionChange = (
    newVal: 'LEGACY-A' | 'SECURE-X' | 'UNENCRYPTED',
  ) => {
    setSchema((prev) => {
      const updated = { ...prev, encryption: newVal };
      syncSchemaToText(updated);
      return updated;
    });
  };

  // Derived visible variables from schema visibleComponents block
  const isHeaderVisible = schema.visibleComponents.headerBanner !== false;
  const isLandscapeVisible = schema.visibleComponents.landscapeImage !== false;
  const isTheaterMappingVisible =
    schema.visibleComponents.theaterMapping !== false;
  const isDiagnosticsVisible =
    schema.visibleComponents.systemDiagnostics !== false;
  const isRegistryVisible = schema.visibleComponents.sessionRegistry !== false;
  const isLedgerVisible = schema.visibleComponents.operationalLedger !== false;
  const isInputVisible = schema.visibleComponents.inputOverride !== false;
  const isLogsVisible = schema.visibleComponents.systemLogs !== false;
  const isManualVisible = schema.visibleComponents.appendixManual !== false;

  return (
    <div
      id="application-container"
      className="min-h-screen relative flex flex-col p-4 md:p-8 bg-parchment-deep selection:bg-black selection:text-parchment-deep"
    >
      {/* Background scanline/dots authenticity overlay */}
      <div className="dot-matrix-overlay absolute inset-0 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col relative z-10">
        {/* Simple Utility Navigation Rail */}
        {isHeaderVisible && (
          <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-anton tracking-widest text-[#000000] flex items-center gap-1.5">
                ⊞ {schema.systemName}
              </span>
              <span className="text-[10px] bg-black text-[#E6E2D8] px-1.5 py-0.5 font-mono tracking-tighter">
                TACTICAL PERFORMANCE CONSOLE
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono font-bold mt-2 sm:mt-0 opacity-75">
              <span className="flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />{' '}
                SECURE_NODE_ONLINE
              </span>
              <span>COOR_GRID: G-01 // Z-99</span>
            </div>
          </header>
        )}

        {/* 1. SCHEMA DATABASE EDITOR AT THE TOP */}
        {showDbEditor && (
          <SchemaDatabase
            jsonValue={jsonText}
            onJsonChange={handleJsonTextChange}
            onReset={handleResetDatabase}
          />
        )}

        {/* COUNTDOWN CLOCK */}
        <div className="mb-8">
          <MainCountdown timeInSeconds={timeInSeconds} />
        </div>

        {/* 2. UPPER REGISTRY & IMAGING PANEL */}
        {(isLandscapeVisible ||
          isTheaterMappingVisible ||
          isDiagnosticsVisible ||
          isRegistryVisible) && (
          <section
            id="upper-grid-deck"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8"
          >
            {/* Left side: Operational Landscape Image */}
            {isLandscapeVisible && (
              <div
                className={`${isTheaterMappingVisible || isDiagnosticsVisible || isRegistryVisible ? 'lg:col-span-8' : 'lg:col-span-12'}`}
              >
                <OperationalLandscape
                  title={schema.landscapeTitle}
                  imgRef={schema.landscapeImgRef}
                  logs={schema.systemLogs}
                  onClearLogs={handleClearLogs}
                  isPaused={isPaused}
                  onTogglePause={handleTogglePause}
                  isLogsVisible={isLogsVisible}
                />
              </div>
            )}

            {/* Right side: Theater Map & Diagnostics & Registry */}
            {(isTheaterMappingVisible ||
              isDiagnosticsVisible ||
              isRegistryVisible) && (
              <div
                className={`${isLandscapeVisible ? 'lg:col-span-4' : 'lg:col-span-12'} flex flex-col gap-4`}
              >
                {isTheaterMappingVisible && (
                  <TheaterMap
                    seats={schema.seats}
                    onToggleSeat={handleToggleSeat}
                    onSelectSeatCoordinate={handleSelectSeatCoordinate}
                  />
                )}

                {(isDiagnosticsVisible || isRegistryVisible) && (
                  <HeaderBanner
                    seats={schema.seats}
                    onAddLog={handleAddLog}
                    operator={schema.operator}
                    onOperatorChange={handleOperatorChange}
                    encryption={schema.encryption}
                    onEncryptionChange={handleEncryptionChange}
                    showDiagnostics={isDiagnosticsVisible}
                    showRegistry={isRegistryVisible}
                  />
                )}
              </div>
            )}
          </section>
        )}

        {/* 3. LEDGER ARCHIVES TABLE */}
        {isLedgerVisible && (
          <section id="ledger-history-section" className="mb-8">
            <LedgerTable
              sessions={schema.sessions}
              selectedSessionId={selectedSessionId}
              onSelectSession={(session) => setSelectedSessionId(session.id)}
              onAddLog={handleAddLog}
            />
          </section>
        )}

        {/* 4. DYNAMIC SHREDDED GRID SYSTEM */}
        {(isInputVisible || isLogsVisible) && (
          <section
            id="coordinate-diagnostics-deck"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8"
          >
            {/* INPUT FORMS OVERRIDE */}
            {isInputVisible && (
              <div
                className={`${isLogsVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <CommandPanel
                  onExecuteQuery={handleExecuteQuery}
                  onInsertSession={handleInsertSession}
                  onAddLog={handleAddLog}
                />
              </div>
            )}

            {/* SYSTEM EVENT LOGS */}
            {isLogsVisible && (
              <div
                className={`${isInputVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <ClerkDataSchema />
              </div>
            )}
          </section>
        )}

        {/* 5. MANUAL RETRO ENCYCLOPEDIA */}
        {isManualVisible && (
          <footer
            id="procedural-encyclopedia-block"
            className="border-2 border-black bg-[#E6E2D8]/40 p-4 font-mono text-xs hard-shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-black/15">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <h4 className="font-bold uppercase tracking-wider text-black">
                Procedural Manual & Operational Appendix
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ENCYCLOPEDIA_NOTES.map((manual, keyIdx) => (
                <div key={keyIdx} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveManualTopic(
                        activeManualTopic === keyIdx ? null : keyIdx,
                      );
                      handleAddLog(
                        `Appendix category read: ${manual.topic}`,
                        'INFO',
                      );
                    }}
                    className="font-bold underline text-black cursor-pointer hover:text-amber-800 text-left block w-full"
                  >
                    § {manual.topic}{' '}
                    {activeManualTopic === keyIdx ? '[-]' : '[+]'}
                  </button>
                  <div
                    className={`text-zinc-700 font-serif leading-relaxed text-xs ${activeManualTopic === keyIdx ? 'block' : 'hidden md:block opacity-85'}`}
                  >
                    {manual.notes}
                  </div>
                </div>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
