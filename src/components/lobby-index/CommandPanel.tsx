import { useState, FormEvent } from 'react';
import { PlaySquare, Save, Terminal } from 'lucide-react';
import type { SessionLog, SessionStatus } from './types';

interface CommandPanelProps {
  onExecuteQuery: (query: string) => void;
  onInsertSession: (session: SessionLog) => void;
  onAddLog: (
    text: string,
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT',
  ) => void;
}

export default function CommandPanel({
  onExecuteQuery,
  onInsertSession,
  onAddLog,
}: CommandPanelProps) {
  const [queryId, setQueryId] = useState('');
  const [showOverrideCreator, setShowOverrideCreator] = useState(false);

  // New session injector form states
  const [play, setPlay] = useState('');
  const [theater, setTheater] = useState('GLOBE THEATRE');
  const [seatNum, setSeatNum] = useState('G-14');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<SessionStatus>('SUCCESS');

  const handleSubmitQuery = (e: FormEvent) => {
    e.preventDefault();
    const clean = queryId.trim().toUpperCase();
    if (clean) {
      onExecuteQuery(clean);
    }
  };

  const handleCreateOverride = (e: FormEvent) => {
    e.preventDefault();
    if (!play.trim()) {
      onAddLog(
        'ERROR: COMPILATION DENIED. PLAY TITLE MANDATORY SEED OBJECT.',
        'ALERT',
      );
      return;
    }

    // Generate random 1974-themed Session ID in same format
    const randomSuffix = Math.floor(Math.random() * 900 + 100);
    const alphabet = 'ABC';
    const randChar = alphabet.charAt(
      Math.floor(Math.random() * alphabet.length),
    );
    const generatedId = `T-740${randomSuffix}-${randChar}`;

    const newLog: SessionLog = {
      id: generatedId,
      date: '14 JUN 74',
      theater: theater.toUpperCase(),
      play: play.toUpperCase(),
      seat: seatNum.toUpperCase(),
      notes:
        notes.trim() || 'MANUAL SESSION DECLARED VIA EXECUTIVE CONSOLE BYPASS.',
      status: status,
    };

    onInsertSession(newLog);
    onAddLog(
      `SESSION ${generatedId} SUCCESSFULLY REGISTERED INTO HISTORIC DATA STACK`,
      'SUCCESS',
    );

    // Reset fields
    setPlay('');
    setNotes('');
  };

  return (
    <div
      id="command-root-box"
      className="border-2 border-black p-4 bg-white hard-shadow-sm flex flex-col justify-between font-mono h-auto"
    >
      <div>
        <h3 className="text-sm font-bold uppercase border-b-2 border-black pb-1.5 mb-3 flex items-center justify-between">
          <span>Input Override</span>
          <Terminal className="w-4 h-4 text-black" />
        </h3>

        {/* Form 1: Standard Query Selection */}
        <form onSubmit={handleSubmitQuery} className="mt-2 space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase text-zinc-700 mb-1">
              Manual Session ID or Coordinate
            </label>
            <input
              type="text"
              className="w-full border-2 border-black px-2 pb-1.5 pt-1 text-sm bg-zinc-50 uppercase tracking-widest text-black focus:outline-hidden focus:bg-amber-50"
              placeholder="T-740921-A"
              value={queryId}
              onChange={(e) => setQueryId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-[#E6E2D8] py-2 text-xs font-bold uppercase hover:bg-neutral-800 tracking-wider transition-colors cursor-pointer border border-black press-interaction"
          >
            Execute Query
          </button>
        </form>

        {/* Divider and Toggle for Injector Tool */}
        <div className="border-t border-black/15 my-4 pt-3">
          <button
            type="button"
            onClick={() => setShowOverrideCreator(!showOverrideCreator)}
            className="text-[11px] font-bold uppercase tracking-tight text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>✵</span>{' '}
            {showOverrideCreator
              ? 'Hide Manual Override Configurator'
              : 'Inject Custom Event Segment...'}
          </button>
        </div>

        {/* Form 2: Injection Override Panel */}
        {showOverrideCreator ? (
          <form
            onSubmit={handleCreateOverride}
            className="space-y-2 mt-2 bg-zinc-50 p-2 border border-dashed border-black/30"
          >
            <div>
              <label className="block text-[9px] font-bold text-zinc-500 uppercase">
                Target Play *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. MACBETH"
                className="w-full bg-white border border-black px-1.5 py-0.5 text-xs text-black uppercase focus:outline-hidden"
                value={play}
                onChange={(e) => setPlay(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-zinc-500 uppercase">
                  Theater
                </label>
                <select
                  className="w-full bg-white border border-black p-0.5 text-xs focus:outline-hidden"
                  value={theater}
                  onChange={(e) => setTheater(e.target.value)}
                >
                  <option value="GLOBE THEATRE">GLOBE THEATRE</option>
                  <option value="ROYAL PLAYHOUSE">ROYAL PLAYHOUSE</option>
                  <option value="TUGURIPEL RECTOR">TUGURIPEL RECTOR</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-zinc-500 uppercase">
                  Seat Coordinate
                </label>
                <input
                  type="text"
                  placeholder="G-14"
                  maxLength={4}
                  className="w-full bg-white border border-black px-1 py-0.5 text-xs uppercase text-center focus:outline-hidden"
                  value={seatNum}
                  onChange={(e) => setSeatNum(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-zinc-500 uppercase">
                Status
              </label>
              <select
                className="w-full bg-white border border-black p-0.5 text-xs focus:outline-hidden"
                value={status}
                onChange={(e) => setStatus(e.target.value as SessionStatus)}
              >
                <option value="SUCCESS">SUCCESS</option>
                <option value="SYNCED">SYNCED</option>
                <option value="ALERT">ALERT</option>
                <option value="FAILURE">FAILURE</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-zinc-500 uppercase">
                Procedural Log Entry
              </label>
              <textarea
                rows={2}
                placeholder="Describe sync readings or anomalies..."
                className="w-full bg-white border border-black px-1.5 py-0.5 text-xs focus:outline-hidden"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-1.5 text-[10px] font-bold uppercase hover:bg-amber-700 tracking-wider transition-colors cursor-pointer border border-amber-700"
            >
              <Save className="w-3.5 h-3.5 inline mr-1" />
              Commit Manual Override
            </button>
          </form>
        ) : (
          <div className="hidden md:block text-[10px] text-zinc-500 font-serif leading-relaxed italic border border-zinc-100 p-2 mt-4">
            Type a recorded coordinate (G-01 to G-40) or session sequence key,
            then fire Execute to locate or verify database sectors.
          </div>
        )}
      </div>
    </div>
  );
}
