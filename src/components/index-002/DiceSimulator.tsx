import React, { useState } from 'react';
import { DiceResult } from './types';
import { Flame, RefreshCw, Layers, Sliders, History, Info } from 'lucide-react';

export default function DiceSimulator() {
  const [poolSize, setPoolSize] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<number>(6);
  const [currentRoll, setCurrentRoll] = useState<DiceResult | null>(null);
  const [rollHistory, setRollHistory] = useState<DiceResult[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const dice: number[] = [];
      for (let i = 0; i < poolSize; i++) {
        dice.push(Math.floor(Math.random() * 10) + 1);
      }

      // Rules:
      // - Each die >= Difficulty is a success.
      // - Each '1' cancels out one success.
      // - If there are zero successes AND at least one '1', it is a Botch!
      let baseSuccesses = 0;
      let onesCount = 0;

      dice.forEach((d) => {
        if (d >= difficulty) baseSuccesses++;
        if (d === 1) onesCount++;
      });

      const netSuccesses = Math.max(0, baseSuccesses - onesCount);
      const isBotch = baseSuccesses === 0 && onesCount > 0;

      const result: DiceResult = {
        dice: dice.sort((a, b) => b - a), // Sort descending for better alignment
        successes: isBotch ? -1 : netSuccesses,
        difficulty,
        difficultyMet: netSuccesses > 0,
        timestamp: new Date().toLocaleTimeString(),
      };

      setCurrentRoll(result);
      setRollHistory((prev) => [result, ...prev.slice(0, 4)]);
      setIsRolling(false);
    }, 400);
  };

  const clearHistory = () => {
    setRollHistory([]);
    setCurrentRoll(null);
  };

  const getSuccessLabel = (successes: number) => {
    if (successes === -1)
      return {
        text: 'BOTCH! SPECTACULAR FAILURE',
        color: 'text-blood-red bg-blood-red/10 border-blood-red',
      };
    if (successes === 0)
      return {
        text: 'FAILURE. NO OUTCOMES',
        color: 'text-neutral-500 bg-neutral-100 border-neutral-400',
      };
    if (successes === 1)
      return {
        text: 'MARGINAL SUCCESS',
        color: 'text-neutral-800 bg-parchment-deep/30 border-neutral-800',
      };
    if (successes === 2)
      return {
        text: 'MODERATE SUCCESS',
        color: 'text-neutral-900 bg-neutral-200 border-neutral-900',
      };
    if (successes === 3 || successes === 4)
      return {
        text: 'COMPLETE & STABLE SUCCESS',
        color: 'text-neutral-900 font-bold bg-neutral-200 border-neutral-900',
      };
    return {
      text: 'LEGENDARY TRIUMPH!',
      color: 'text-amber-700 bg-amber-500/10 border-amber-600',
    };
  };

  return (
    <div
      id="dice-simulator"
      className="border-4 border-[#1b1b1b] bg-white p-6 font-mono text-[#1b1b1b] shadow-[4px_4px_0px_0px_rgba(27,27,27,1)]"
    >
      {/* Header and Title */}
      <div className="mb-6 flex flex-col justify-between border-b-2 border-[#1b1b1b] pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#1b1b1b]/50">
            SYS_MODULE: // RE_ROLL_D10
          </span>
          <h2 className="font-accent text-3xl uppercase tracking-wider text-[#1b1b1b]">
            CHRONOS mainframe d10 roller
          </h2>
        </div>
        <div className="mt-2 flex items-center gap-2 sm:mt-0">
          <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-blood-red" />
          <span className="text-xs uppercase tracking-wider">
            SYSTEM CONNECTED
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Side: Setup Roll */}
        <div className="lg:col-span-5 flex flex-col justify-between border-b-2 border-neutral-200 pb-6 lg:border-b-0 lg:border-r-2 lg:pb-0 lg:pr-6">
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 border-b border-[#1b1b1b] pb-2 text-sm font-bold uppercase tracking-wider">
              <Sliders className="h-4 w-4" /> Parameters Configuration
            </h3>

            {/* Slider 1: Dice Pool Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>DICE POOL SIZE (ATT + ABIL):</span>
                <span className="bg-[#1b1b1b] px-2 py-0.5 text-white">
                  {poolSize} d10
                </span>
              </div>
              <input
                id="dice-pool-range"
                type="range"
                min="1"
                max="10"
                value={poolSize}
                onChange={(e) => setPoolSize(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none bg-neutral-200 accent-[#1b1b1b]"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>1 DIE (RAW INSTINCT)</span>
                <span>10 DICE (MAX LEVEL)</span>
              </div>
            </div>

            {/* Range 2: Target Difficulty */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>TARGET DIFFICULTY:</span>
                <span className="bg-blood-red px-2 py-0.5 text-white">
                  DIFF {difficulty}
                </span>
              </div>
              <input
                id="difficulty-range"
                type="range"
                min="3"
                max="10"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none bg-neutral-200 accent-blood-red"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>3 (EASY ACTIONS)</span>
                <span>10 (NEAR IMPOSSIBLE)</span>
              </div>
            </div>

            {/* Rules Quick Info */}
            <div className="bg-parchment p-3 text-xs border border-neutral-300">
              <p className="flex gap-2 font-bold uppercase mb-1">
                <Info className="h-3 w-4 shrink-0 mt-0.5" /> Tabletop Rules:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                <li>
                  Each die showing{' '}
                  <strong className="text-neutral-900">{`>= Difficulty`}</strong>{' '}
                  is a success.
                </li>
                <li>
                  Each die showing{' '}
                  <strong className="text-blood-red">"1"</strong> cancels out
                  one success.
                </li>
                <li>
                  Rolling zero successes and at least one{' '}
                  <strong className="text-blood-red">"1"</strong> causes a
                  spectacular <strong className="text-blood-red">Botch!</strong>
                </li>
              </ul>
            </div>
          </div>

          <button
            id="roll-action-button"
            onClick={rollDice}
            disabled={isRolling}
            className={`mt-6 w-full cursor-pointer border-2 border-[#1b1b1b] bg-[#1b1b1b] py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-neutral-800 disabled:opacity-50 ${
              isRolling
                ? 'translate-y-1'
                : 'active:-translate-y-0.5 active:translate-y-0 shadow-[2px_2px_0px_0px_rgba(212,74,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(212,74,0,1)]'
            }`}
          >
            {isRolling ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" /> ENGAGING
                SYSTEMS...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Flame className="h-4 w-4 fill-blood-red stroke-white" /> ROLL
                DICE POOL
              </span>
            )}
          </button>
        </div>

        {/* Right Side: Current Action & Outcomes */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 border-b border-[#1b1b1b] pb-2 text-sm font-bold uppercase tracking-wider">
              <Layers className="h-4 w-4" /> Operations Terminal Output
            </h3>

            {/* Console Screen */}
            <div className="min-h-[180px] border-2 border-[#1b1b1b] bg-neutral-900 p-4 text-emerald-400 shadow-inner">
              {currentRoll ? (
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-emerald-800 pb-1 text-xs">
                    <span>TIME: {currentRoll.timestamp}</span>
                    <span>DIFFICULTY: {currentRoll.difficulty}</span>
                  </div>

                  {/* Dice Results Visual Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {currentRoll.dice.map((die, i) => {
                      const isSuccess = die >= currentRoll.difficulty;
                      const isOne = die === 1;
                      let badgeStyle =
                        'bg-neutral-800 border-neutral-700 text-neutral-400';
                      if (isSuccess)
                        badgeStyle =
                          'bg-emerald-500 border-emerald-400 text-neutral-900 font-bold scale-105';
                      if (isOne)
                        badgeStyle =
                          'bg-blood-red border-red-500 text-white font-bold animate-pulse';

                      return (
                        <div
                          key={i}
                          className={`flex h-11 w-11 flex-col items-center justify-center border-2 text-sm rounded ${badgeStyle}`}
                          title={
                            isSuccess
                              ? 'Success!'
                              : isOne
                                ? 'Cancels Success (1)'
                                : 'Below Difficulty'
                          }
                        >
                          <span className="text-base font-bold leading-none">
                            {die}
                          </span>
                          <span className="text-[8px] tracking-tighter opacity-80 mt-0.5">
                            {isSuccess ? 'SUCC' : isOne ? 'CANC' : 'FAIL'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Operational Outcome Message */}
                  <div
                    className={`mt-4 border p-2 text-xs uppercase leading-relaxed ${getSuccessLabel(currentRoll.successes).color}`}
                  >
                    <p className="font-bold text-sm tracking-wide">
                      {getSuccessLabel(currentRoll.successes).text}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-neutral-800">
                      {currentRoll.successes === -1
                        ? 'A dramatic failure has corrupted the operation! Backfire penalty triggered.'
                        : currentRoll.successes === 0
                          ? 'No outcomes calculated. The effort yielded zero material effect.'
                          : `Calculated successfully! Net Success count: ${currentRoll.successes} (base successes adjusted for critical ones).`}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[140px] flex-col items-center justify-center text-center text-emerald-600/70">
                  <p className="text-sm font-bold tracking-widest uppercase">
                    TERMINAL STANDBY // WAITING ON INPUTS
                  </p>
                  <p className="mt-2 text-xs">
                    Adjust your slider pools on the left and engage the system
                    starter.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Roll History Tracker */}
          <div className="mt-6">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1 text-xs">
              <span className="flex items-center gap-1.5 font-bold uppercase text-neutral-600">
                <History className="h-3 w-3" /> Historic Register (Last 4)
              </span>
              {rollHistory.length > 0 && (
                <button
                  id="clear-history-button"
                  onClick={clearHistory}
                  className="cursor-pointer text-[10px] uppercase underline hover:text-[#1b1b1b]"
                >
                  PURGE LIST
                </button>
              )}
            </div>

            {rollHistory.length > 0 ? (
              <div className="mt-2 divide-y divide-neutral-200">
                {rollHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5 text-xs"
                  >
                    <span className="text-neutral-500">[{item.timestamp}]</span>
                    <span className="font-semibold text-neutral-700">
                      Pool {item.dice.length}d10 (Diff {item.difficulty})
                    </span>
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.successes === -1
                          ? 'bg-blood-red/15 text-blood-red'
                          : item.successes === 0
                            ? 'bg-neutral-200 text-neutral-600'
                            : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.successes === -1
                        ? 'BOTCH'
                        : item.successes === 0
                          ? 'FAIL'
                          : `${item.successes} SUCC`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-center text-[11px] italic text-[#1b1b1b]/40">
                History registry is empty.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
