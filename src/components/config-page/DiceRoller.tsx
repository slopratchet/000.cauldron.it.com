import React, { useState, useRef, useEffect } from 'react';
import { Dices, Trash2, Volume2, VolumeX } from 'lucide-react';

interface DiceRollerProps {
  onRollComplete?: (result: string) => void;
  rollTrigger?: { formula: string; name: string; timestamp: number } | null;
}

export interface RollLog {
  id: string;
  timestamp: string;
  label: string;
  formula: string;
  rolls: number[];
  modifier: number;
  total: number;
  resultStr: string;
}

export default function DiceRoller({
  onRollComplete,
  rollTrigger,
}: DiceRollerProps) {
  const [logs, setLogs] = useState<RollLog[]>([]);
  const [modifier, setModifier] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [lastRollResult, setLastRollResult] = useState<number | null>(null);
  const [selectedDie, setSelectedDie] = useState<number>(20);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Parse and trigger roll when parent requests it (e.g. from a card's roll action)
  useEffect(() => {
    if (rollTrigger) {
      handleFormulaRoll(rollTrigger.formula, rollTrigger.name);
    }
  }, [rollTrigger]);

  useEffect(() => {
    // Scroll logs to bottom
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Synthesis of retro dice roll clattering using Web Audio API
  const playRollSound = (isFinish = false) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const duration = isFinish ? 0.25 : 0.08;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // White noise base
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = isFinish ? 400 : 1200;
      filter.Q.value = isFinish ? 3 : 8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isFinish ? 0.3 : 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration - 0.02,
      );

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      // Audio context might be blocked by browser user gesture policies
    }
  };

  const rollDie = (
    sides: number,
    count = 1,
  ): { rolls: number[]; total: number } => {
    const rolls: number[] = [];
    let total = 0;
    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }
    return { rolls, total };
  };

  const handleSingleDieRoll = (sides: number) => {
    if (isRolling) return;
    setIsRolling(true);
    setSelectedDie(sides);

    // Simulate tumble animations
    let clackCount = 0;
    const interval = setInterval(() => {
      setLastRollResult(Math.floor(Math.random() * sides) + 1);
      playRollSound(false);
      clackCount++;
      if (clackCount >= 5) {
        clearInterval(interval);

        const { rolls, total } = rollDie(sides, 1);
        const finalTotal = total + modifier;
        setLastRollResult(finalTotal);
        playRollSound(true);
        setIsRolling(false);

        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const modifierSign = modifier >= 0 ? `+${modifier}` : `${modifier}`;
        const formulaStr = `1d${sides}${modifier !== 0 ? modifierSign : ''}`;
        const label = `Standard d${sides} Cast`;
        const resultStr = `[${rolls.join(', ')}]${modifier !== 0 ? ` ${modifierSign}` : ''} = ${finalTotal}`;

        const newLog: RollLog = {
          id: `roll-${Date.now()}`,
          timestamp: timeStr,
          label,
          formula: formulaStr,
          rolls,
          modifier,
          total: finalTotal,
          resultStr,
        };

        setLogs((prev) => [...prev, newLog]);
        if (onRollComplete) {
          onRollComplete(`Rolled ${formulaStr}: ${resultStr}`);
        }
      }
    }, 70);
  };

  // Parses formulas like "2d10+4", "1d6", "1d20-3", "d12"
  const handleFormulaRoll = (formula: string, name: string) => {
    if (isRolling) return;
    setIsRolling(true);

    const cleanFormula = formula.replace(/\s+/g, '');
    const regex = /^(\d*)d(\d+)(?:([+-])(\d+))?$/i;
    const match = cleanFormula.match(regex);

    if (!match) {
      // Fallback
      setIsRolling(false);
      return;
    }

    const count = match[1] ? parseInt(match[1]) : 1;
    const sides = parseInt(match[2]);
    const sign = match[3] || '';
    const modValue = match[4] ? parseInt(match[4]) : 0;
    const formulaMod = sign === '-' ? -modValue : modValue;

    setSelectedDie(sides);

    let clackCount = 0;
    const interval = setInterval(() => {
      setLastRollResult(Math.floor(Math.random() * sides) + 1);
      playRollSound(false);
      clackCount++;

      if (clackCount >= 6) {
        clearInterval(interval);

        const { rolls, total } = rollDie(sides, count);
        const finalTotal = total + formulaMod;
        setLastRollResult(finalTotal);
        playRollSound(true);
        setIsRolling(false);

        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const resultStr = `[${rolls.join(', ')}]${formulaMod !== 0 ? ` ${sign}${modValue}` : ''} = ${finalTotal}`;

        const newLog: RollLog = {
          id: `roll-${Date.now()}`,
          timestamp: timeStr,
          label: name,
          formula,
          rolls,
          modifier: formulaMod,
          total: finalTotal,
          resultStr,
        };

        setLogs((prev) => [...prev, newLog]);
        if (onRollComplete) {
          onRollComplete(
            `Scribed action "${name}" cast ${formula}: ${resultStr}`,
          );
        }
      }
    }, 60);
  };

  const clearLogs = () => {
    setLogs([]);
    setLastRollResult(null);
  };

  const diceList = [4, 6, 8, 10, 12, 20, 100];

  return (
    <div
      id="dice-roller-box"
      className="border-2 border-primary bg-background-light dark:bg-background-dark text-primary dark:text-white p-4 flex flex-col gap-4 h-full"
    >
      <div className="flex justify-between items-center border-b-2 border-primary dark:border-white pb-2">
        <h3 className="font-display font-black text-lg uppercase tracking-wider flex items-center gap-2">
          <Dices className="w-5 h-5" /> The Oracle's Dice
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 border border-primary dark:border-white hover:bg-primary dark:hover:bg-white hover:text-background-light dark:hover:text-background-dark transition-colors"
            title={soundEnabled ? 'Mute roll sounds' : 'Enable roll sounds'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={clearLogs}
            disabled={logs.length === 0}
            className="p-1 border border-primary dark:border-white hover:bg-primary dark:hover:bg-white hover:text-background-light dark:hover:text-background-dark transition-colors disabled:opacity-35"
            title="Purge logs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Dice Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {diceList.map((sides) => (
          <button
            key={sides}
            disabled={isRolling}
            onClick={() => handleSingleDieRoll(sides)}
            className={`py-2 px-1 border-2 border-primary dark:border-white font-mono text-xs font-bold uppercase transition-colors hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedDie === sides && isRolling
                ? 'bg-primary text-white animate-bounce'
                : ''
            }`}
          >
            <span className="opacity-50 text-[9px]">D{sides}</span>
            <span className="font-display text-sm font-black">Roll</span>
          </button>
        ))}
        {/* Modifier Input Box */}
        <div className="border-2 border-primary dark:border-white p-1 flex flex-col items-center justify-center bg-white dark:bg-black/40">
          <span className="font-mono text-[8px] uppercase tracking-tighter text-primary/60 dark:text-white/60">
            Mod
          </span>
          <input
            type="number"
            min="-10"
            max="10"
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
            className="w-full text-center bg-transparent border-none focus:ring-0 font-mono text-sm font-black text-primary dark:text-white p-0"
          />
        </div>
      </div>

      {/* Display Screen */}
      <div className="border-2 border-primary dark:border-white bg-white dark:bg-black p-4 flex flex-col items-center justify-center min-h-[100px] text-center relative overflow-hidden">
        <div className="absolute top-1 left-2 font-mono text-[8px] opacity-45 uppercase">
          Chronos Cast
        </div>
        {isRolling ? (
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-3xl font-black animate-pulse text-primary/50 dark:text-white/50">
              {lastRollResult || '?'}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest animate-pulse">
              Tumbling d{selectedDie}...
            </span>
          </div>
        ) : lastRollResult !== null ? (
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl font-black tracking-tight animate-none">
              {lastRollResult}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest mt-1 text-emerald-700 dark:text-emerald-400 font-bold">
              Cast Complete
            </span>
          </div>
        ) : (
          <span className="font-serif italic text-sm text-primary/60 dark:text-white/60">
            Select a die or tap a heretical card action to consult the fates.
          </span>
        )}
      </div>

      {/* Chronicles Log */}
      <div className="flex-1 flex flex-col min-h-[140px] max-h-[220px]">
        <div className="font-mono text-[9px] uppercase tracking-widest text-primary/60 dark:text-white/60 mb-1">
          Chronicle Logs
        </div>
        <div
          ref={logContainerRef}
          className="flex-1 border-2 border-primary dark:border-white p-2 bg-white dark:bg-black/20 overflow-y-auto font-mono text-xs flex flex-col gap-2 scrollbar-thin"
        >
          {logs.length === 0 ? (
            <div className="text-primary/40 dark:text-white/40 italic text-center py-4">
              Chronicle is empty. No roll history recorded.
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="border-b border-primary/10 dark:border-white/10 pb-1 last:border-b-0 leading-tight"
              >
                <div className="flex justify-between text-[10px] text-primary/60 dark:text-white/60">
                  <span className="truncate max-w-[120px] font-bold">
                    {log.label}
                  </span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="mt-1 font-bold text-primary dark:text-white flex justify-between">
                  <span>Cast {log.formula}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">
                    {log.total}
                  </span>
                </div>
                <div className="text-[10px] opacity-75 mt-0.5">
                  {log.resultStr}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
