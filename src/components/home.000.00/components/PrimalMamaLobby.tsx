import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Users,
  MessageSquare,
  Dices,
  Shield,
  Send,
  Terminal,
  Sparkles,
  Hash,
  Volume2,
} from 'lucide-react';

interface PrimalMamaLobbyProps {
  playClack: () => void;
  onBack: () => void;
}

interface GameTable {
  id: string;
  name: string;
  dm: string;
  playersCount: number;
  playersMax: number;
  status: 'RECRUITING' | 'IN PLAY' | 'FULL';
  level: string;
  system: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  role: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

const INITIAL_TABLES: GameTable[] = [
  {
    id: '1',
    name: 'The Core Fissure Raid',
    dm: 'Alistair_Vane',
    playersCount: 4,
    playersMax: 5,
    status: 'RECRUITING',
    level: 'Levels 3-5',
    system: 'Primal Mama v1',
  },
  {
    id: '2',
    name: 'Echoes of the Great Canopy',
    dm: 'Gwyneira_Dawn',
    playersCount: 3,
    playersMax: 6,
    status: 'IN PLAY',
    level: 'Level 1 (New players!)',
    system: 'Primal Mama v1',
  },
  {
    id: '3',
    name: 'Ruins of Candor Core',
    dm: 'GM_Kasper',
    playersCount: 5,
    playersMax: 5,
    status: 'FULL',
    level: 'Levels 8-10',
    system: 'Primal Mama v1',
  },
  {
    id: '4',
    name: 'The Sunderer Outpost',
    dm: 'Brontes_Sledge',
    playersCount: 1,
    playersMax: 4,
    status: 'RECRUITING',
    level: 'Levels 2-4',
    system: 'Primal Mama v1',
  },
];

const CHAT_SAMPLES = [
  {
    sender: 'Alistair_Vane',
    role: 'Game Master',
    text: 'Roll for Core Ingress. We need a DC 14 Fortitude save!',
  },
  {
    sender: 'Sunderer_99',
    role: 'Player',
    text: 'I got a 17! Plus my +3 Mantle bonus means a 20 total. Am I safe?',
  },
  {
    sender: 'Gwyneira_Dawn',
    role: 'Game Master',
    text: 'Yes, the tectonic tremors bypass your personal shield completely.',
  },
  {
    sender: 'WordWeaver',
    role: 'Player',
    text: 'Casting Level 2 Core-Siphon on the anomalist generator. Hopefully we get some power.',
  },
  {
    sender: 'MantleMaster',
    role: 'Player',
    text: 'Let’s play with standard Primal rules tonight. No mutant cards.',
  },
  {
    sender: 'Alistair_Vane',
    role: 'Game Master',
    text: 'Agreed. Pure Primal Mama core mechanics today.',
  },
];

export function PrimalMamaLobby({ playClack, onBack }: PrimalMamaLobbyProps) {
  const [tables, setTables] = useState<GameTable[]>(INITIAL_TABLES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'System Node',
      role: 'SYS',
      text: 'Welcome to Primal Mama Online Lobby. Node #099 Online.',
      timestamp: '15:42',
      isSystem: true,
    },
    {
      id: 'init-2',
      sender: 'Alistair_Vane',
      role: 'Game Master',
      text: 'Hey all! Recruiting for a quick Fissure Raid tonight. High-altitude gear required.',
      timestamp: '15:43',
    },
    {
      id: 'init-3',
      sender: 'WordWeaver',
      role: 'Player',
      text: 'Sweet, count me in. I’ll bring my Anomalist.',
      timestamp: '15:44',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [playerName, setPlayerName] = useState('Anomalist_Recruit');
  const [characterClass, setCharacterClass] = useState('Word-Weaver');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [joinedTableId, setJoinedTableId] = useState<string | null>(null);

  // Tactical Dice Roller
  const [diceHistory, setDiceHistory] = useState<
    { id: string; type: string; result: number; timestamp: string }[]
  >([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Simulate scrolling chat inputs occasionally to make it feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      const sample =
        CHAT_SAMPLES[Math.floor(Math.random() * CHAT_SAMPLES.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      setChatMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: sample.sender,
          role: sample.role,
          text: sample.text,
          timestamp: timeStr,
        },
      ]);
    }, 14000); // Send message every 14s

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    playClack();

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: playerName,
        role: characterClass,
        text: userInput.trim(),
        timestamp: timeStr,
      },
    ]);
    setUserInput('');
  };

  const handleJoinTable = (tableId: string) => {
    playClack();
    const targetTable = tables.find((t) => t.id === tableId);
    if (!targetTable) return;

    if (joinedTableId === tableId) {
      // Leave
      setTables((prev) =>
        prev.map((t) => {
          if (t.id === tableId) {
            return {
              ...t,
              playersCount: Math.max(0, t.playersCount - 1),
              status: 'RECRUITING',
            };
          }
          return t;
        }),
      );
      setJoinedTableId(null);

      setChatMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'Lobby Arbiter',
          role: 'SYS',
          text: `${playerName} (${characterClass}) left game table: ${targetTable.name}`,
          timestamp: 'Now',
          isSystem: true,
        },
      ]);
    } else {
      // Join
      if (targetTable.playersCount >= targetTable.playersMax) {
        alert('This gaming station is currently full!');
        return;
      }
      setTables((prev) =>
        prev.map((t) => {
          if (t.id === tableId) {
            const newCount = t.playersCount + 1;
            const newStatus = newCount >= t.playersMax ? 'FULL' : t.status;
            return { ...t, playersCount: newCount, status: newStatus };
          }
          return t;
        }),
      );
      setJoinedTableId(tableId);

      setChatMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'Lobby Arbiter',
          role: 'SYS',
          text: `${playerName} (${characterClass}) connected successfully to Table: ${targetTable.name}. Prepare character logs.`,
          timestamp: 'Now',
          isSystem: true,
        },
      ]);
    }
  };

  // Roll standard dice (polyhedral)
  const rollDice = (sides: number) => {
    playClack();
    setIsRolling(true);
    setCurrentRoll(null);

    setTimeout(() => {
      const result = Math.floor(Math.random() * sides) + 1;
      setCurrentRoll(result);
      setIsRolling(false);

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setDiceHistory((prev) => [
        {
          id: Math.random().toString(),
          type: `D${sides}`,
          result,
          timestamp: timeStr,
        },
        ...prev.slice(0, 9),
      ]);

      // Output to chat if joined a table
      if (joinedTableId) {
        const activeTable = tables.find((t) => t.id === joinedTableId);
        setChatMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: playerName,
            role: characterClass,
            text: `[DICE ROLL] Rolled a ${result} on a D${sides} for Table: ${activeTable?.name}`,
            timestamp: timeStr.substring(0, 5),
          },
        ]);
      }
    }, 450);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in text-[#050505]"
      id="primal-mama-online-lobby-panel"
    >
      {/* Back Header navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-obsidian pb-6">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#050505] hover:text-[#D32F2F] transition-colors leading-none font-bold"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO CORE TERMINAL</span>
          </button>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#053a24] animate-pulse"></span>
            <h1 className="font-serif-display text-4xl md:text-5xl tracking-normal text-[#053a24] uppercase font-black">
              PRIMAL MAMA LOBBY
            </h1>
          </div>
        </div>

        {/* Connection status tag */}
        <div className="bg-emerald-100 border-2 border-emerald-800 text-emerald-900 px-4 py-2 font-mono text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-2 rounded">
          <Terminal className="w-3.5 h-3.5 text-emerald-800 animate-pulse" />
          <span>STATION HOST: ONLINE_SECURE_99</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLUMN 1: LEFT SIDEBAR - CHARACTER LOGS (Col span 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#151515] p-5 border-4 border-obsidian text-bone shadow-[6px_6px_0px_rgba(0,0,0,0.85)] rounded-none">
            <div className="flex items-center gap-2 border-b border-bone/15 pb-3 mb-4">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-archive text-xs tracking-wider uppercase text-[#D4AF37] font-extrabold">
                CHARACTER CREDS
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-wider text-bone/60 mb-1.5">
                  PLAYER ALIAS
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                    playClack();
                  }}
                  className="w-full bg-[#222] border-2 border-bone/20 p-2 text-xs font-mono text-bone focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Enter alias"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-wider text-bone/60 mb-1.5">
                  ACTIVE ROLE / CLASS
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'Word-Weaver',
                    'Sunderer',
                    'Anomalist',
                    'Mantle Guardian',
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCharacterClass(c);
                        playClack();
                      }}
                      className={`text-[10px] font-mono p-2 border-2 text-center transition-all ${characterClass === c ? 'bg-[#D4AF37] text-obsidian border-[#D4AF37] font-bold' : 'bg-transparent text-bone/80 border-bone/20 hover:border-bone/50'}`}
                    >
                      {c.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-bone/10 pt-3 mt-4 space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-bone/60 font-mono">STATUS:</span>
                  <span className="text-emerald-400 font-mono font-bold uppercase">
                    Ready for Deployment
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-bone/60 font-mono">
                    ACTIVE GAME TABLE:
                  </span>
                  <span className="text-white font-mono font-bold">
                    {joinedTableId
                      ? tables.find((t) => t.id === joinedTableId)?.name
                      : 'NONE CONNECTED'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ADVANCED DICE ROLLING RIG */}
          <div className="bg-[#EAE5D9] p-5 border-4 border-obsidian text-obsidian shadow-[6px_6px_0px_rgba(0,0,0,0.85)] rounded-none">
            <div className="flex items-center gap-2 border-b-2 border-obsidian pb-3 mb-4">
              <Dices className="w-5 h-5 text-[#053a24]" />
              <h3 className="font-archive text-xs tracking-wider uppercase text-[#053a24] font-extrabold">
                TACTICAL DICE ROLLER
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[20, 12, 10, 8, 6, 4].map((sides) => (
                <button
                  key={sides}
                  onClick={() => rollDice(sides)}
                  disabled={isRolling}
                  className="bg-white hover:bg-[#053a24] hover:text-white border-2 border-obsidian p-2.5 font-mono text-[11px] font-bold tracking-tight text-center transition-colors shadow-sm disabled:opacity-50"
                >
                  D{sides}
                </button>
              ))}
            </div>

            {/* Display active rolling state */}
            <div className="mt-5 bg-[#053a24] text-[#D4AF37] border-2 border-obsidian p-4 text-center relative overflow-hidden min-h-[90px] flex flex-col justify-center items-center">
              {isRolling ? (
                <div className="space-y-1">
                  <span className="inline-block animate-spin text-xl">🎲</span>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37]/80 animate-pulse">
                    Rolling core dice...
                  </p>
                </div>
              ) : currentRoll !== null ? (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-0.5"
                >
                  <span className="font-mono text-[10px] text-bone uppercase tracking-widest font-bold">
                    OUTCOME
                  </span>
                  <div className="font-archive text-4xl font-black text-white leading-none tracking-tighter">
                    {currentRoll}
                  </div>
                </motion.div>
              ) : (
                <div className="text-bone/60 font-mono text-[10px] italic">
                  Tap any die above to cast roll
                </div>
              )}
            </div>

            {/* Roll log */}
            {diceHistory.length > 0 && (
              <div className="mt-4 border-t border-obsidian/20 pt-3">
                <div className="text-[9px] font-mono uppercase text-obsidian/60 tracking-wider mb-2">
                  My Roll History:
                </div>
                <div className="max-h-[100px] overflow-y-auto space-y-1 text-xs font-mono">
                  {diceHistory.map((h) => (
                    <div
                      key={h.id}
                      className="flex justify-between border-b border-obsidian/5 pb-1"
                    >
                      <span className="text-[#053a24] font-bold">{h.type}</span>
                      <span className="text-gray-600 italic text-[10px]">
                        {h.timestamp}
                      </span>
                      <span className="font-bold">➔ {h.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 2: MIDDLE - AVAILABLE CAMPAIGN TABLES (Col span 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#EAE5D9] p-5 border-4 border-obsidian flex-grow flex flex-col justify-between shadow-[6px_6px_0px_rgba(0,0,0,0.85)] rounded-none">
            <div>
              <div className="flex items-center justify-between border-b-2 border-obsidian pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#053a24]" />
                  <h3 className="font-archive text-xs tracking-wider uppercase text-[#053a24] font-extrabold">
                    ACTIVE TABLES
                  </h3>
                </div>
                <span className="font-mono text-[9px] bg-[#053a24] text-white px-2 py-0.5 font-bold">
                  {tables.length} STATIONS
                </span>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {tables.map((table) => {
                  const isCurrent = joinedTableId === table.id;
                  return (
                    <div
                      key={table.id}
                      onClick={() => {
                        playClack();
                        setSelectedTable(table.id);
                      }}
                      className={`border-2 p-3 transition-all cursor-pointer ${isCurrent ? 'bg-[#053a24]/10 border-[#053a24]' : selectedTable === table.id ? 'bg-white border-obsidian' : 'bg-white/60 border-obsidian/15 hover:border-obsidian/45'}`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-archive text-[12px] font-bold tracking-tight uppercase text-obsidian">
                          {table.name}
                        </h4>
                        <span
                          className={`font-mono text-[8px] px-1.5 py-0.5 rounded font-extrabold ${
                            table.status === 'RECRUITING'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : table.status === 'FULL'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                          }`}
                        >
                          {table.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-2 pt-2 border-t border-dotted border-obsidian/10 text-[10px] font-mono text-gray-700">
                        <div>
                          <span className="text-gray-400">HOST:</span>{' '}
                          {table.dm}
                        </div>
                        <div className="text-right">
                          <span className="text-gray-400">LEVELS:</span>{' '}
                          {table.level.split(' ')[0]}
                        </div>
                        <div>
                          <span className="text-gray-400">SEATS:</span>{' '}
                          {table.playersCount}/{table.playersMax}
                        </div>
                        <div className="text-right">
                          <span className="text-[#053a24] font-extrabold">
                            D&D / PRIMAL
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinTable(table.id);
                          }}
                          className={`w-full font-mono text-[9px] uppercase tracking-widest py-1.5 px-2 border-2 font-black transition-colors ${
                            isCurrent
                              ? 'bg-red-700 text-white border-red-700 hover:bg-black hover:border-black'
                              : table.status === 'FULL'
                                ? 'bg-gray-200 text-gray-500 border-gray-200 pointer-events-none'
                                : 'bg-white hover:bg-black hover:text-white border-obsidian'
                          }`}
                        >
                          {isCurrent
                            ? 'DISCONNECT FROM TABLE'
                            : 'INITIALIZE CONNECT ➔'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-dashed border-obsidian/15 mt-4">
              <button
                onClick={() => {
                  playClack();
                  const nName =
                    prompt('Enter custom Table/Campaign name:') ||
                    'Uncharted Core Run';
                  const nDM = playerName;
                  const nMax =
                    parseInt(prompt('Max Seats (2-6):') || '4', 10) || 4;
                  const nLvl =
                    prompt('Eligible levels (e.g. Level 1, Levels 3-5):') ||
                    'Level 1';

                  const newTable: GameTable = {
                    id: (tables.length + 1).toString(),
                    name: nName,
                    dm: nDM,
                    playersCount: 1,
                    playersMax: nMax,
                    status: 'RECRUITING',
                    level: nLvl,
                    system: 'Primal Mama v1',
                  };
                  setTables((prev) => [...prev, newTable]);
                  setJoinedTableId(newTable.id);
                  setChatMessages((prev) => [
                    ...prev,
                    {
                      id: Math.random().toString(),
                      sender: 'Lobby Arbiter',
                      role: 'SYS',
                      text: `Broadcasting new table frequency node: ${nName} (Hosted by GM ${nDM}). playersCount initialized.`,
                      timestamp: 'Now',
                      isSystem: true,
                    },
                  ]);
                }}
                className="w-full bg-[#053a24] text-white font-mono text-[10px] tracking-wider py-3 border-2 border-[#053a24] hover:bg-transparent hover:text-[#053a24] transition-all font-black uppercase rounded shadow-sm"
              >
                + ALLOCATE NEW SERVER TABLE
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 3: RIGHT SIDEBAR - REAL-TIME LOBBY CHAT (Col span 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#151515] p-5 border-4 border-obsidian text-bone shadow-[6px_6px_0px_rgba(0,0,0,0.85)] h-[578px] flex flex-col justify-between rounded-none">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-bone/15 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-archive text-xs tracking-wider uppercase text-bone font-extrabold">
                    TACTICAL_CHAT_FEED
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase">
                    LIVE FEED
                  </span>
                </div>
              </div>
            </div>

            {/* Feed Scroll */}
            <div className="flex-grow my-4 overflow-y-auto space-y-3 pr-1 text-xs">
              <AnimatePresence initial={false}>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-2 border rounded-sm font-mono ${
                      msg.isSystem
                        ? 'bg-amber-950/20 border-amber-900/30 text-[#D4AF37]/90 text-[10px] border-l-4 border-l-[#D4AF37]'
                        : msg.sender === playerName
                          ? 'bg-neutral-800/40 border-emerald-800/30 text-bone'
                          : 'bg-neutral-900/50 border-neutral-800 text-bone/95'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1 border-b border-white/5 pb-0.5 text-[9px]">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${msg.isSystem ? 'text-amber-400' : msg.sender === playerName ? 'text-emerald-400' : 'text-cyan-400'}`}
                        >
                          {msg.sender}
                        </span>
                        {!msg.isSystem && (
                          <span className="px-1 text-white bg-slate-800/60 rounded text-[7px] font-extrabold uppercase scale-90">
                            {msg.role}
                          </span>
                        )}
                      </div>
                      <span className="text-stone-500 text-[8px]">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="normal-case leading-snug break-words font-sans text-stone-200 text-xs mt-1">
                      {msg.text}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-bone/15 pt-3"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Chat as ${playerName}...`}
                  className="flex-grow bg-[#222] border border-bone/20 p-2.5 text-xs text-bone font-mono focus:border-[#D4AF37] focus:outline-none"
                  maxLength={180}
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-obsidian border border-[#D4AF37] px-3.5 hover:bg-neutral-300 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[8px] font-mono text-stone-400 mt-2 text-right uppercase tracking-wider">
                Max length 180 characters // Station #099
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER STATS INFO BANNER */}
      <div className="border-4 border-obsidian p-6 bg-charcoal text-bone flex flex-col md:flex-row justify-between items-center gap-4 shadow-[8px_8px_0px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[#D4AF37] animate-pulse" />
          <div className="text-left">
            <h4 className="font-archive text-xs font-bold tracking-widest text-bone uppercase">
              AUTOMATED GAMEPLAY HARMONIZER
            </h4>
            <p className="font-serif-body text-[11px] text-bone/70 normal-case">
              Simulated real-time dice-modulators are synchronized via Camp
              Candor Inspirational Technology core algorithms.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            playClack();
            const seed = Math.floor(Math.random() * 1000);
            setChatMessages((prev) => [
              ...prev,
              {
                id: Math.random().toString(),
                sender: 'Lobby Arbiter',
                role: 'SYS',
                text: `Platform Sync success! Seed: [${seed}]. Rerouting virtual networks through server local time.`,
                timestamp: 'Now',
                isSystem: true,
              },
            ]);
          }}
          className="bg-white hover:bg-[#D4AF37] hover:text-obsidian px-5 py-2.5 text-obsidian font-mono text-[9px] uppercase tracking-wider font-extrabold shadow border-2 border-transparent transition-all"
        >
          FORCE SERVER RE-SYNC
        </button>
      </div>
    </div>
  );
}
