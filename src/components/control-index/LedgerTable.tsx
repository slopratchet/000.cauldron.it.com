import { useState } from 'react';
import { Search, RotateCcw, AlertTriangle, Eye } from 'lucide-react';
import type { SessionLog, SessionStatus } from './types';

interface LedgerTableProps {
  sessions: SessionLog[];
  selectedSessionId: string | null;
  onSelectSession: (session: SessionLog) => void;
  onAddLog: (
    text: string,
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT',
  ) => void;
}

export default function LedgerTable({
  sessions,
  selectedSessionId,
  onSelectSession,
  onAddLog,
}: LedgerTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<SessionStatus | 'ALL'>(
    'ALL',
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filters sessions based on search & state selection
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.play.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.theater.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'ALL' || session.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination bounds
  const totalItems = filteredSessions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * itemsPerPage;
  const visibleSessions = filteredSessions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (direction: 'PREV' | 'NEXT') => {
    if (direction === 'PREV' && activePage > 1) {
      setCurrentPage(activePage - 1);
      onAddLog(`LEDGER BUFFER RETURNED TO PAGE ${activePage - 1}`, 'INFO');
    } else if (direction === 'NEXT' && activePage < totalPages) {
      setCurrentPage(activePage + 1);
      onAddLog(`LEDGER BUFFER ADVANCED TO PAGE ${activePage + 1}`, 'INFO');
    }
  };

  const handleStatusFilterChange = (status: SessionStatus | 'ALL') => {
    setFilterStatus(status);
    setCurrentPage(1);
    onAddLog(`LEDGER REGISTER FILTER RECONFIGURED TO [${status}]`, 'INFO');
  };

  const renderStatusBadge = (status: SessionStatus) => {
    switch (status) {
      case 'SUCCESS':
        return (
          <span className="bg-black text-[#E6E2D8] text-[10px] font-bold px-2.5 py-0.5 border border-black inline-block tracking-tight">
            SUCCESS
          </span>
        );
      case 'SYNCED':
        return (
          <span className="bg-zinc-700 text-white text-[10px] font-bold px-2.5 py-0.5 border border-zinc-700 inline-block tracking-tight">
            SYNCED
          </span>
        );
      case 'ALERT':
        return (
          <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 border border-amber-600 inline-block tracking-tight animate-pulse">
            ALERT
          </span>
        );
      case 'FAILURE':
        return (
          <span className="bg-red-700 text-white text-[10px] font-bold px-2.5 py-0.5 border border-red-700 inline-block tracking-tight">
            FAILURE
          </span>
        );
    }
  };

  return (
    <div
      id="operational-ledger-block"
      className="border-4 border-black bg-white hard-shadow relative z-10 overflow-x-auto"
    >
      {/* Table Header Section */}
      <div className="bg-black text-[#E6E2D8] px-4 py-2.5 text-sm font-mono uppercase tracking-widest flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 font-bold">✵</span>
          <span className="font-anton text-base tracking-widest">
            Operational History & Procedural Notes
          </span>
        </div>

        {/* Live Filter controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Quick Search */}
          <div className="relative border border-zinc-700 flex items-center bg-zinc-900 px-2 py-1">
            <Search className="w-3.5 h-3.5 mr-1 text-zinc-400" />
            <input
              type="text"
              placeholder="Query Ledger..."
              className="bg-transparent text-white focus:outline-hidden text-xs max-w-[130px] font-mono placeholder:opacity-50"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Quick status filters */}
          <div className="flex items-center border border-zinc-700 bg-zinc-900 p-0.5 text-[10px]">
            {(['ALL', 'SUCCESS', 'SYNCED', 'ALERT', 'FAILURE'] as const).map(
              (st) => (
                <button
                  key={st}
                  onClick={() => handleStatusFilterChange(st)}
                  type="button"
                  className={`px-1.5 py-0.5 tracking-tighter cursor-pointer ${
                    filterStatus === st
                      ? 'bg-zinc-100 text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Primary Data Grid */}
      <table className="w-full border-collapse font-mono text-xs">
        <thead className="bg-[#E6E2D8] text-black border-b-2 border-black">
          <tr>
            <th className="p-3 text-left border-r border-black font-bold w-32">
              SESSION ID
            </th>
            <th className="p-3 text-left border-r border-black font-bold w-28">
              DATE
            </th>
            <th className="p-3 text-left border-r border-black font-bold w-48">
              THEATER
            </th>
            <th className="p-3 text-left border-r border-black font-bold w-36">
              PLAY
            </th>
            <th className="p-3 text-left border-r border-black font-bold text-center w-20">
              SEAT
            </th>
            <th className="p-3 text-left border-r border-black font-bold">
              PROCEDURAL NOTES
            </th>
            <th className="p-3 text-center font-bold w-24">STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black">
          {visibleSessions.length > 0 ? (
            visibleSessions.map((session, index) => {
              const isSelected = selectedSessionId === session.id;
              return (
                <tr
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session);
                    onAddLog(
                      `INSPECTING SESSION INDEXED [${session.id}]`,
                      'INFO',
                    );
                  }}
                  className={`cursor-pointer transition-colors hover:bg-[#E6E2D8]/40 ${
                    isSelected
                      ? 'bg-amber-100'
                      : index % 2 === 1
                        ? 'bg-zinc-50'
                        : 'bg-white'
                  }`}
                >
                  <td className="p-3 border-r border-black font-bold select-all tabular-nums text-black flex items-center gap-1.5">
                    {isSelected && (
                      <span className="text-amber-600 font-bold animate-pulse">
                        ▶
                      </span>
                    )}
                    {session.id}
                  </td>
                  <td className="p-3 border-r border-black tracking-tighter text-zinc-700">
                    {session.date}
                  </td>
                  <td className="p-3 border-r border-black font-bold tracking-tight text-black">
                    {session.theater}
                  </td>
                  <td className="p-3 border-r border-black font-serif italic text-black font-semibold text-sm">
                    {session.play}
                  </td>
                  <td className="p-3 border-r border-black text-center font-bold font-mono text-zinc-900">
                    {session.seat}
                  </td>
                  <td className="p-3 border-r border-black font-serif text-zinc-800 text-sm opacity-90">
                    {session.notes}
                  </td>
                  <td className="p-3 text-center align-middle">
                    {renderStatusBadge(session.status)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={7}
                className="p-10 text-center font-mono text-zinc-500 bg-zinc-50 italic"
              >
                <AlertTriangle className="w-5 h-5 mx-auto mb-2 text-amber-500 inline mr-2" />
                No matching entry files returned on current grid vector.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination control footer */}
      <div className="p-4 bg-[#E6E2D8]/30 border-t-2 border-black flex justify-between items-center text-xs font-mono">
        <div className="uppercase opacity-75 select-text">
          Showing{' '}
          <span className="font-bold">
            {totalItems === 0 ? 0 : startIndex + 1}
          </span>{' '}
          to{' '}
          <span className="font-bold">
            {Math.min(startIndex + itemsPerPage, totalItems)}
          </span>{' '}
          of <span className="font-bold">{totalItems}</span> logged sessions{' '}
          {searchTerm || filterStatus !== 'ALL' ? '(filtered)' : ''}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handlePageChange('PREV')}
            disabled={activePage <= 1}
            className={`border border-black px-3 py-1 font-bold uppercase transition-all tracking-wider cursor-pointer ${
              activePage <= 1
                ? 'opacity-40 cursor-not-allowed bg-zinc-100 text-zinc-400'
                : 'bg-white hover:bg-black hover:text-white hover:translate-y-[-1px]'
            }`}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => handlePageChange('NEXT')}
            disabled={activePage >= totalPages}
            className={`border border-black px-3 py-1 font-bold uppercase transition-all tracking-wider cursor-pointer ${
              activePage >= totalPages
                ? 'opacity-40 cursor-not-allowed bg-zinc-100 text-zinc-400'
                : 'bg-black text-white hover:bg-zinc-800 hover:translate-y-[-1px]'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
