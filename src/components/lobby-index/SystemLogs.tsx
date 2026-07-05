import { useRef } from 'react';
import { Trash2, Terminal, Pause, Play } from 'lucide-react';
import type { SystemLogEntry } from './types';

interface SystemLogsProps {
  logs: SystemLogEntry[];
  onClearLogs: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export default function SystemLogs({
  logs,
  onClearLogs,
  isPaused,
  onTogglePause,
}: SystemLogsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getLogColorClass = (type: SystemLogEntry['type']) => {
    switch (type) {
      case 'SUCCESS':
        return 'text-[#E6E2D8] opacity-80';
      case 'WARNING':
        return 'text-amber-500 font-semibold';
      case 'ALERT':
        return 'text-blood-red font-bold animate-pulse';
      case 'INFO':
      default:
        return 'text-[#E6E2D8] opacity-60';
    }
  };

  return (
    <div
      id="system-logs-card"
      className="p-4 bg-zinc-800 text-[#E6E2D8] flex flex-col font-mono border-t-2 border-black z-20"
    >
      <div className="flex items-center justify-between border-b border-[#E6E2D8]/20 pb-1.5 mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-amber-500" />
          <span></span>
        </h3>
        {/* Simple tactile Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onTogglePause}
            disabled={!isPaused}
            title="Resume Logging"
            className={`p-1 transition-colors border border-transparent rounded-sm ${
              !isPaused
                ? 'text-amber-500 cursor-default'
                : 'text-[#E6E2D8]/50 hover:text-[#E6E2D8] cursor-pointer hover:bg-[#E6E2D8]/10'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onTogglePause}
            disabled={isPaused}
            title="Pause Logging"
            className={`p-1 transition-colors border border-transparent rounded-sm ${
              isPaused
                ? 'text-amber-500 cursor-default'
                : 'text-[#E6E2D8]/50 hover:text-[#E6E2D8] cursor-pointer hover:bg-[#E6E2D8]/10'
            }`}
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClearLogs}
            title="Clear Buffer Logs"
            className="hover:bg-[#E6E2D8]/10 p-1 text-[#E6E2D8]/50 hover:text-[#E6E2D8] transition-colors border border-transparent rounded-sm cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="font-mono text-[11px] space-y-1.5 overflow-y-auto overflow-x-hidden h-48 scrollbar-hide select-text pr-1.5"
        style={{ scrollBehavior: 'smooth' }}
      >
        {logs.map((log, idx) => (
          <p key={idx} className="leading-normal flex items-start gap-1">
            <span className="opacity-40 select-none font-sans shrink-0">
              [{log.timestamp}]
            </span>
            <span className={`${getLogColorClass(log.type)} break-all`}>
              - {log.text}
            </span>
          </p>
        ))}
        {logs.length === 0 && (
          <p className="text-[#E6E2D8]/30 italic text-center py-10 select-none">
            - System buffer records purged or idle. Log terminal waiting...
          </p>
        )}
      </div>
    </div>
  );
}
