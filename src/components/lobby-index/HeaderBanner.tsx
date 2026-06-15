import { useState, useEffect } from 'react';
import { Shield, RefreshCw, Hourglass } from 'lucide-react';
import { Seat } from './types';

interface HeaderBannerProps {
  seats: Seat[];
  onAddLog: (
    text: string,
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT',
  ) => void;
  operator: string;
  onOperatorChange: (newVal: string) => void;
  encryption: 'LEGACY-A' | 'SECURE-X' | 'UNENCRYPTED';
  onEncryptionChange: (newVal: 'LEGACY-A' | 'SECURE-X' | 'UNENCRYPTED') => void;
  showDiagnostics?: boolean;
  showRegistry?: boolean;
}

export default function HeaderBanner({
  seats,
  onAddLog,
  operator,
  onOperatorChange,
  encryption,
  onEncryptionChange,
  showDiagnostics = true,
  showRegistry = true,
}: HeaderBannerProps) {
  const [uptimeSeconds, setUptimeSeconds] = useState(142 * 3600 + 55 * 60 + 9);
  const [isEditingOperator, setIsEditingOperator] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [tempOperator, setTempOperator] = useState(operator);

  useEffect(() => {
    setTempOperator(operator);
  }, [operator]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOperatorBlur = () => {
    const formatted = tempOperator
      .toUpperCase()
      .trim()
      .replace(/[^A-Z0-9_]/g, '');
    if (formatted) {
      onOperatorChange(formatted);
      onAddLog(`OPERATOR ACCESS TOKEN CHANGED TO ${formatted}`, 'INFO');
    } else {
      setTempOperator(operator);
    }
  };

  const cycleEncryption = () => {
    const options: ('LEGACY-A' | 'SECURE-X' | 'UNENCRYPTED')[] = [
      'LEGACY-A',
      'SECURE-X',
      'UNENCRYPTED',
    ];
    const nextIdx = (options.indexOf(encryption) + 1) % options.length;
    const nextVal = options[nextIdx];
    onEncryptionChange(nextVal);
    onAddLog(`SECURITY ENCRYPTION LEVEL SHIFTED TO [${nextVal}]`, 'WARNING');
  };

  const triggerManualSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    onAddLog('MANUAL LEDGER RESYNC COMMAND INITIATED', 'INFO');

    setTimeout(() => {
      setIsSyncing(false);
      onAddLog('TACTICAL DATA COUPLING RESYNC SUCCESSFUL', 'SUCCESS');
    }, 1200);
  };

  const totalSeats = seats.length;
  const occupiedSeatsCount = seats.filter(
    (s) => s.status === 'OCCUPIED',
  ).length;
  const capacityPct =
    totalSeats > 0 ? Math.round((occupiedSeatsCount / totalSeats) * 100) : 0;

  return (
    <div className="flex flex-col gap-4 font-mono w-full">
      {/* System Diagnostics Card */}
      {showDiagnostics && (
        <div
          id="system-diagnostics-card"
          className="border-2 border-black p-4 bg-[#E6E2D8]/50 bg-opacity-70 backdrop-blur-xs hard-shadow-sm flex-grow"
        >
          <h2 className="text-sm font-bold uppercase border-b-2 border-black pb-1 mb-3 flex items-center justify-between">
            <span>SYSTEM DIAGNOSTics</span>
            <Hourglass className="w-4 h-4 text-black" />
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-sm border-b border-black/10 pb-1">
              <span className="opacity-75">UPTIME</span>
              <span className="font-bold tabular-nums text-black">
                {formatUptime(uptimeSeconds)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-black/10 pb-1">
              <span className="opacity-75">OPERATOR</span>
              {isEditingOperator ? (
                <input
                  type="text"
                  maxLength={12}
                  className="w-24 bg-white border border-black px-1 py-0.5 text-xs text-right focus:outline-hidden uppercase font-mono"
                  value={tempOperator}
                  onChange={(e) => setTempOperator(e.target.value)}
                  onBlur={() => {
                    setIsEditingOperator(false);
                    handleOperatorBlur();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingOperator(false);
                      handleOperatorBlur();
                    }
                  }}
                  autoFocus
                />
              ) : (
                <button
                  type="button"
                  title="Click to rename"
                  onClick={() => setIsEditingOperator(true)}
                  className="font-bold underline cursor-pointer hover:bg-black/10 px-1 py-0.5"
                >
                  {operator}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center text-sm border-b border-black/10 pb-1">
              <span className="opacity-75">ENCRYPTION</span>
              <button
                type="button"
                onClick={cycleEncryption}
                className={`font-bold uppercase cursor-pointer hover:underline flex items-center gap-1 ${
                  encryption === 'LEGACY-A'
                    ? 'text-amber-600'
                    : encryption === 'SECURE-X'
                      ? 'text-emerald-700'
                      : 'text-rose-600'
                }`}
                title="Click to change encryption state"
              >
                <Shield className="w-3.5 h-3.5 inline" />
                {encryption}
              </button>
            </div>

            <button
              type="button"
              onClick={triggerManualSync}
              disabled={isSyncing}
              className={`w-full mt-4 p-2 bg-black text-[#E6E2D8] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest font-bold border border-black hover:bg-zinc-800 transition-colors ${
                isSyncing ? 'animate-pulse' : ''
              }`}
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`}
              />
              {isSyncing ? 'Syncing...' : 'Live Feed Synced'}
            </button>
          </div>
        </div>
      )}

      {/* Session Registry Tracker */}
      {showRegistry && (
        <div
          id="session-registry-card"
          className="border-2 border-black p-4 bg-white hard-shadow-sm w-full"
        >
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-black/15">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500 font-bold">✵</span>
              <h2 className="text-sm font-bold uppercase">Session Registry</h2>
            </div>
            <span className="text-[10px] bg-black text-[#E6E2D8] px-1.5 py-0.5 font-bold">
              S-MONITOR
            </span>
          </div>
          <p className="font-serif text-xs italic mb-3 opacity-80 leading-relaxed">
            Registry lock engaged for theater coordinates G-01 through Z-99.
          </p>
          <div className="h-4 w-full bg-zinc-200 border border-black relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-black transition-all duration-500 ease-out"
              style={{ width: `${capacityPct}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between items-center text-xs">
            <span className="opacity-60 font-serif">Occupancy ratio</span>
            <span className="font-bold">{capacityPct}% Capacity</span>
          </div>
        </div>
      )}
    </div>
  );
}
