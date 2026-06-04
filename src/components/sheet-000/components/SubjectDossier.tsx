/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { CharacterRecord } from '../types';
import {
  Shield,
  Heart,
  Zap,
  Sword,
  BookOpen,
  Briefcase,
  Activity,
  Sparkles,
  RotateCcw,
  Terminal as TermIcon,
  Sliders,
  Compass,
  Dices,
  Skull,
  AlertTriangle,
  Eye,
  ShoppingBag,
  HelpCircle,
  Clock,
} from 'lucide-react';

interface SubjectDossierProps {
  subject: CharacterRecord;
  onUpdateSubject: (updated: CharacterRecord) => void;
}

export default function SubjectDossier({
  subject,
  onUpdateSubject,
}: SubjectDossierProps) {
  const [showLogs, setShowLogs] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState('');
  const [newActiveEffect, setNewActiveEffect] = useState('');

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setShowLogs((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 5)]);
  };

  // Helper to map item UUIDs to human-friendly names
  const getItemFriendlyName = (itemIdOrUuid: string): string => {
    // If it's a UUID in our inventory list, resolve it
    const inventoryItem = subject.currentState.inventory.items[itemIdOrUuid];
    const rawName = inventoryItem ? inventoryItem.item_id : itemIdOrUuid;
    return rawName.replace(/_/g, ' ').replace(/-/g, ' ').toUpperCase();
  };

  // State trigger functions for vital telemetry
  const adjustHp = (val: number) => {
    const nextHp = Math.max(0, subject.currentState.currentHp + val);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        currentHp: nextHp,
      },
    });
    addLog(
      `VITAL CODES RECALCULATING: CURRENT_HP SET TO ${nextHp} (DELTA: ${val > 0 ? '+' : ''}${val})`,
    );
  };

  const adjustTempHp = (val: number) => {
    const nextTempHp = Math.max(0, subject.currentState.temporaryHp + val);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        temporaryHp: nextTempHp,
      },
    });
    addLog(`SHIELD ATTENUATOR ADJUSTED: TEMPORARY_HP SET TO ${nextTempHp}`);
  };

  const adjustExhaustion = (val: number) => {
    const nextEx = Math.min(
      Math.max(0, subject.currentState.exhaustionLevel + val),
      6,
    );
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        exhaustionLevel: nextEx,
      },
    });
    addLog(`BIOMETRIC ALARM: EXHAUSTION LEVEL RESOLVED TO ${nextEx}`);
  };

  const toggleInspiration = () => {
    const nextInsp = !subject.currentState.inspiration;
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        inspiration: nextInsp,
      },
    });
    addLog(
      `MATRIX SIGNAL RECALIBRATED: INSPIRATION CONDUIT ${nextInsp ? 'ONLINE' : 'OFFLINE'}`,
    );
  };

  const adjustDeathSave = (type: 'successes' | 'failures', val: number) => {
    const currentCount = subject.currentState.deathSaves[type];
    const nextCount = Math.min(Math.max(0, currentCount + val), 3);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        deathSaves: {
          ...subject.currentState.deathSaves,
          [type]: nextCount,
        },
      },
    });
    addLog(
      `SYSTEM FAILURE TRACERS: DEATH_SAVES ${type.toUpperCase()} SET TO ${nextCount}`,
    );
  };

  const adjustHitDice = (diceType: string, val: number) => {
    const currentVal = subject.currentState.usedHitDice[diceType] || 0;
    const nextVal = Math.max(0, currentVal + val);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        usedHitDice: {
          ...subject.currentState.usedHitDice,
          [diceType]: nextVal,
        },
      },
    });
    addLog(
      `MATRIX CELL RESTORED: USED HIT DICE (${diceType.toUpperCase()}) RESET TO ${nextVal}`,
    );
  };

  const adjustResource = (resourceName: string, val: number) => {
    const currentVal = subject.currentState.usedResources[resourceName] || 0;
    const nextVal = Math.max(0, currentVal + val);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        usedResources: {
          ...subject.currentState.usedResources,
          [resourceName]: nextVal,
        },
      },
    });
    addLog(
      `RECONSTRUCTIVE ENGINE ENGAGED: RESOURCE "${resourceName.toUpperCase()}" SET TO ${nextVal}`,
    );
  };

  const adjustSpellSlot = (
    slotKey: keyof typeof subject.currentState.usedSpellSlots,
    val: number,
  ) => {
    const currentVal = subject.currentState.usedSpellSlots[slotKey] || 0;
    const nextVal = Math.max(0, currentVal + val);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        usedSpellSlots: {
          ...subject.currentState.usedSpellSlots,
          [slotKey]: nextVal,
        },
      },
    });
    addLog(
      `SLOT CONDUIT ALTERED: ${slotKey.replace(/_/g, ' ').toUpperCase()} SET TO ${nextVal}`,
    );
  };

  const adjustItemCharges = (itemUuid: string, val: number) => {
    const currentVal = subject.currentState.usedItemCharges[itemUuid] || 0;
    const nextVal = Math.max(0, currentVal + val);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        usedItemCharges: {
          ...subject.currentState.usedItemCharges,
          [itemUuid]: nextVal,
        },
      },
    });
    addLog(
      `HARDWARE DISCHARGE CODES: "${getItemFriendlyName(itemUuid)}" USED CHARGES ADJUSTED TO ${nextVal}`,
    );
  };

  const adjustCurrency = (
    coinType: keyof typeof subject.currentState.inventory.currency,
    val: number,
  ) => {
    const currentVal = subject.currentState.inventory.currency[coinType] || 0;
    const nextVal = Math.max(0, currentVal + val);
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        inventory: {
          ...subject.currentState.inventory,
          currency: {
            ...subject.currentState.inventory.currency,
            [coinType]: nextVal,
          },
        },
      },
    });
    addLog(
      `CAPITAL BUFFER MODIFIED: ${coinType.toUpperCase()} CONVERTED (NEW_BAL: ${nextVal})`,
    );
  };

  const changeItemQuantity = (itemUuid: string, val: number) => {
    const updatedItems = { ...subject.currentState.inventory.items };
    if (updatedItems[itemUuid]) {
      const nextQty = Math.max(0, updatedItems[itemUuid].quantity + val);
      if (nextQty === 0) {
        delete updatedItems[itemUuid];
        addLog(
          `ASSET DELETED: "${getItemFriendlyName(itemUuid)}" EXPUNGED FROM MEMORY CANVAS`,
        );
      } else {
        updatedItems[itemUuid].quantity = nextQty;
        addLog(
          `BUFF QUANTITY ALTERED: "${getItemFriendlyName(itemUuid)}" QUANTITY ADJUSTED TO ${nextQty}`,
        );
      }
      onUpdateSubject({
        ...subject,
        currentState: {
          ...subject.currentState,
          inventory: {
            ...subject.currentState.inventory,
            items: updatedItems,
          },
        },
      });
    }
  };

  const appendCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCondition.trim()) return;
    const cond = newCondition.trim();
    if (!subject.currentState.conditions.includes(cond)) {
      onUpdateSubject({
        ...subject,
        currentState: {
          ...subject.currentState,
          conditions: [...subject.currentState.conditions, cond],
        },
      });
      addLog(
        `BIOMETRIC FAULT INJECTED: CONDITION EFFECT "${cond.toUpperCase()}" ACTIVE`,
      );
    }
    setNewCondition('');
  };

  const removeCondition = (cond: string) => {
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        conditions: subject.currentState.conditions.filter((c) => c !== cond),
      },
    });
    addLog(
      `BIOMETRIC RESTORE: CONDITION EFFECT "${cond.toUpperCase()}" EXPUNGED`,
    );
  };

  const appendActiveEffect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActiveEffect.trim()) return;
    const effect = newActiveEffect.trim();
    if (!subject.currentState.activeEffects.includes(effect)) {
      onUpdateSubject({
        ...subject,
        currentState: {
          ...subject.currentState,
          activeEffects: [...subject.currentState.activeEffects, effect],
        },
      });
      addLog(
        `CONCURRENT SIGNAL REGISTERED: MAGIC EFFECT "${effect.toUpperCase()}" LOADED`,
      );
    }
    setNewActiveEffect('');
  };

  const removeActiveEffect = (eff: string) => {
    onUpdateSubject({
      ...subject,
      currentState: {
        ...subject.currentState,
        activeEffects: subject.currentState.activeEffects.filter(
          (e) => e !== eff,
        ),
      },
    });
    addLog(
      `CONCURRENT SIGNAL DISSIPATED: MAGIC EFFECT "${eff.toUpperCase()}" UNLOADED`,
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Meta Registry Banner (Identity Header) */}
      <div className="border border-black bg-black text-parchment p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute right-[-40px] top-[-10px] text-parchment/5 font-mono text-[90px] font-black pointer-events-none select-none tracking-tighter">
          CHRONOS
        </div>
        <div className="flex flex-col gap-1.5 z-10">
          <span className="font-mono text-[10px] text-dusty-gray tracking-widest uppercase font-bold">
            SUBJECT_SCAN // IDENTITY_PROTOCOL
          </span>
          <h1 className="font-sans text-3xl md:text-4.5xl font-black text-white tracking-widest leading-none">
            {subject.identity.name.toUpperCase()}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono font-medium mt-1">
            <span className="bg-white/10 px-2 py-0.5 border border-white/20 uppercase">
              {subject.identity.species} // {subject.identity.gender}
            </span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/20 uppercase">
              {subject.identity.background}
            </span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/20 uppercase font-bold text-amber-300">
              {subject.identity.alignment}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-[11px] font-mono border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-6 text-dusty-gray shrink-0 z-10">
          <div>
            <span className="text-white">character_id:</span>{' '}
            {subject.meta.character_id}
          </div>
          <div>
            <span className="text-white">user_id:</span> {subject.meta.user_id}
          </div>
          <div>
            <span className="text-white">schemaVersion:</span>{' '}
            {subject.meta.schemaVersion}
          </div>
          <div>
            <span className="text-white">active_sources:</span>{' '}
            {subject.meta.active_sources.join(', ')}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 flex flex-col gap-0.5">
            <div>createdAt: {subject.meta.createdAt}</div>
            <div>updatedAt: {subject.meta.updatedAt}</div>
          </div>
        </div>
      </div>

      {/* Terminal Live Diagnostics Panel */}
      <div className="border-2 border-black bg-black text-parchment font-mono text-[11px] p-4 flex flex-col gap-1 overflow-hidden select-none">
        <div className="flex justify-between items-center text-dusty-gray text-[9px] pb-1 border-b border-white/15 mb-1.5">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse" />
            CHRONOS_REACTIVE_DIAGNOSTICS_LIVE
          </span>
          <button
            onClick={() => setShowLogs([])}
            className="hover:underline text-white font-bold"
          >
            [CLEAR]
          </button>
        </div>
        {showLogs.length > 0 ? (
          showLogs.map((log, i) => (
            <div
              key={i}
              className={i === 0 ? 'text-amber-400 font-bold' : 'text-gray-300'}
            >
              {log}
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">
            SYSTEM LINKED AND STABLE. INTERACTIVE CONTROLS READY FOR
            BROADCASTING.
          </div>
        )}
      </div>

      {/* 2. Physical Description, Lore & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Dimensions Scan */}
        <div className="md:col-span-4 border border-black p-5 bg-black/5 flex flex-col justify-between">
          <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase block border-b border-black pb-1.5 mb-3">
            description
          </span>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">age:</span>
              <span>{subject.description.age}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">height:</span>
              <span>{subject.description.height}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">weight:</span>
              <span>{subject.description.weight}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">eyes:</span>
              <span>{subject.description.eyes}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">hair:</span>
              <span>{subject.description.hair}</span>
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-bold mb-1">skin:</span>
              <p className="text-[11px] leading-tight text-slate-800 italic">
                {subject.description.skin}
              </p>
            </div>
          </div>
        </div>

        {/* Notes details */}
        <div className="md:col-span-8 border border-black p-5 bg-white flex flex-col justify-between relative">
          <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase block border-b border-black pb-1.5 mb-3">
            notes
          </span>
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="font-sans text-lg font-black tracking-tight leading-snug">
              RECORD SUMMARY DETAILS
            </h3>
            <p className="font-serif text-base leading-relaxed text-slate-900 border-l-2 border-black pl-4">
              {subject.notes}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Personality Algorithms */}
      <div className="border border-black p-5 bg-black/5 flex flex-col gap-4">
        <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase border-b border-black pb-1.5 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5" /> personality
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-gray-600">traits:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.traits}
            </p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-gray-600">ideals:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.ideals}
            </p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-gray-600">bonds:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.bonds}
            </p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-gray-600">flaws:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.flaws}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Core Ability Scores (Ability Attribute Definition block) */}
      <div className="border border-black p-5 bg-white">
        <div className="flex justify-between items-end border-b border-black pb-2.5 mb-5">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-5 h-5" /> abilityScoreGeneration
          </h2>
          <span className="font-mono text-xs text-gray-500 bold uppercase">
            method: {subject.definition.abilityScoreGeneration.method}
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 font-mono">
          {Object.entries(subject.definition.abilityScoreGeneration.scores).map(
            ([attr, score]) => {
              const modifier = Math.floor((score - 10) / 2);
              return (
                <div
                  key={attr}
                  className="border-2 border-black p-3.5 flex flex-col items-center justify-center text-center relative group select-none hover:bg-black hover:text-parchment transition-all"
                >
                  <span className="text-[10px] font-bold uppercase text-gray-500 group-hover:text-dusty-gray tracking-wider">
                    {attr}
                  </span>
                  <span className="text-3xl font-black">{score}</span>
                  <span className="text-xs font-bold bg-black text-parchment group-hover:bg-parchment group-hover:text-black py-0.5 px-2 mt-1 border border-black transition-all">
                    {modifier >= 0 ? `+${modifier}` : modifier}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* 5. Telemetry & Live Variables State */}
      <div className="border border-black p-5 bg-[#eae7e7]/15">
        <div className="flex justify-between items-end border-b border-black pb-2.5 mb-5">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-5 h-5 text-black" /> currentState
          </h2>
          <span className="font-mono text-xs text-gray-500 bold">
            xp: {subject.currentState.xp.toLocaleString()}
          </span>
        </div>

        {/* Health, Exhaustion, Inspiration Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* HP Dynamic Core */}
          <div className="border-2 border-black p-4 flex flex-col justify-between bg-white relative">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold flex justify-between items-center pb-1 border-b border-black/10">
              currentHp
              <Heart className="w-3.5 h-3.5 fill-red-800 stroke-red-800" />
            </span>
            <div className="flex items-baseline justify-between mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                {subject.currentState.currentHp}
                <span className="text-xs text-gray-500 font-mono font-bold ml-1">
                  / 162
                </span>
              </span>
              <div className="flex gap-1 shrink-0 font-mono">
                <button
                  onClick={() => adjustHp(-5)}
                  className="px-1.5 py-0.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs"
                >
                  -5
                </button>
                <button
                  onClick={() => adjustHp(5)}
                  className="px-1.5 py-0.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs"
                >
                  +5
                </button>
              </div>
            </div>
            {/* Health Bar */}
            <div className="w-full h-2 bg-gray-200 mt-2 border border-black relative overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subject.currentState.currentHp / 162) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Temp HP core */}
          <div className="border-2 border-black p-4 flex flex-col justify-between bg-white">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold flex justify-between items-center pb-1 border-b border-black/10">
              temporaryHp
              <Shield className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-baseline justify-between mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                {subject.currentState.temporaryHp}
              </span>
              <div className="flex gap-1 shrink-0 font-mono">
                <button
                  onClick={() => adjustTempHp(-5)}
                  disabled={subject.currentState.temporaryHp === 0}
                  className="px-1.5 py-0.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs disabled:opacity-30"
                >
                  -5
                </button>
                <button
                  onClick={() => adjustTempHp(5)}
                  className="px-1.5 py-0.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs"
                >
                  +5
                </button>
              </div>
            </div>
            <span className="block font-mono text-[9px] text-gray-400 mt-2 uppercase">
              BARRIER DEFLECTION BUFFER
            </span>
          </div>

          {/* Exhaustion Levels */}
          <div className="border-2 border-black p-4 flex flex-col justify-between bg-white">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold flex justify-between items-center pb-1 border-b border-black/10">
              exhaustionLevel
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-baseline justify-between mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                LVL {subject.currentState.exhaustionLevel}
              </span>
              <div className="flex gap-1 shrink-0 font-mono">
                <button
                  onClick={() => adjustExhaustion(-1)}
                  disabled={subject.currentState.exhaustionLevel === 0}
                  className="px-1.5 py-0.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs disabled:opacity-30"
                >
                  -1
                </button>
                <button
                  onClick={() => adjustExhaustion(1)}
                  disabled={subject.currentState.exhaustionLevel === 6}
                  className="px-1.5 py-0.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs disabled:opacity-30"
                >
                  +1
                </button>
              </div>
            </div>
            <span className="block font-mono text-[9px] text-red-700 font-bold mt-2 uppercase">
              {subject.currentState.exhaustionLevel === 0
                ? 'STABLE STATE'
                : `ALARM: LEVEL ACTIVE`}
            </span>
          </div>

          {/* Spell casting Inspiration conduit trigger */}
          <button
            onClick={toggleInspiration}
            className={`border-2 border-black p-4 flex flex-col justify-between text-left transition-all select-none cursor-pointer ${
              subject.currentState.inspiration
                ? 'bg-black text-parchment'
                : 'bg-white text-black hover:bg-black/5'
            }`}
          >
            <span
              className={`font-mono text-[10px] uppercase font-bold flex justify-between items-center pb-1 border-b ${
                subject.currentState.inspiration
                  ? 'border-white/20 text-dusty-gray'
                  : 'border-black/10 text-gray-500'
              }`}
            >
              inspiration
              <Sparkles
                className={`w-3.5 h-3.5 ${subject.currentState.inspiration ? 'text-amber-400' : ''}`}
              />
            </span>
            <div className="flex justify-between items-end mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                {subject.currentState.inspiration ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
            <span
              className={`block font-mono text-[9px] uppercase mt-2 font-bold ${
                subject.currentState.inspiration
                  ? 'text-amber-300 animate-pulse'
                  : 'text-gray-400'
              }`}
            >
              CLICK TO SWITCH PORTAL
            </span>
          </button>
        </div>

        {/* Hit Dice and Death Saves tracker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Used Hit Dice */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              usedHitDice
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(subject.currentState.usedHitDice).map(
                ([dice, val]) => (
                  <div key={dice} className="flex justify-between items-center">
                    <span>{dice}:</span>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">{val} USED</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => adjustHitDice(dice, -1)}
                          disabled={val === 0}
                          className="px-1 border border-black hover:bg-black hover:text-parchment font-bold disabled:opacity-35"
                        >
                          -
                        </button>
                        <button
                          onClick={() => adjustHitDice(dice, 1)}
                          className="px-1 border border-black hover:bg-black hover:text-parchment font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Death Saves state */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              deathSaves
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 font-bold">successes:</span>
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm">
                    {subject.currentState.deathSaves.successes} / 3
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => adjustDeathSave('successes', -1)}
                      disabled={subject.currentState.deathSaves.successes === 0}
                      className="px-1.5 border border-black hover:bg-black hover:text-parchment font-bold disabled:opacity-35"
                    >
                      -
                    </button>
                    <button
                      onClick={() => adjustDeathSave('successes', 1)}
                      disabled={subject.currentState.deathSaves.successes === 3}
                      className="px-1.5 border border-black hover:bg-black hover:text-parchment font-bold disabled:opacity-35"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-red-800 font-bold">failures:</span>
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm">
                    {subject.currentState.deathSaves.failures} / 3
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => adjustDeathSave('failures', -1)}
                      disabled={subject.currentState.deathSaves.failures === 0}
                      className="px-1.5 border border-black hover:bg-black hover:text-parchment font-bold disabled:opacity-35"
                    >
                      -
                    </button>
                    <button
                      onClick={() => adjustDeathSave('failures', 1)}
                      disabled={subject.currentState.deathSaves.failures === 3}
                      className="px-1.5 border border-black hover:bg-black hover:text-parchment font-bold disabled:opacity-35"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources, Item charges, and Used spells blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Used Resources: (Sorcery points, Bardic Inspiration etc) */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              usedResources
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(subject.currentState.usedResources).map(
                ([resource, val]) => (
                  <div
                    key={resource}
                    className="flex justify-between items-center"
                  >
                    <span className="font-bold">{resource}:</span>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">{val} SPENT</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => adjustResource(resource, -1)}
                          disabled={val === 0}
                          className="px-1 border border-black hover:bg-black hover:text-parchment font-bold disabled:opacity-35"
                        >
                          -
                        </button>
                        <button
                          onClick={() => adjustResource(resource, 1)}
                          className="px-1 border border-black hover:bg-black hover:text-parchment font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Used Hardware Item Charges */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              usedItemCharges
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(subject.currentState.usedItemCharges).map(
                ([itemUuid, val]) => (
                  <div
                    key={itemUuid}
                    className="flex justify-between items-center"
                  >
                    <span className="font-bold">
                      {getItemFriendlyName(itemUuid)}:
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">
                        {val} CHARGES USED
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => adjustItemCharges(itemUuid, -1)}
                          disabled={val === 0}
                          className="px-1 border border-black hover:bg-black hover:text-parchment font-bold disabled:opacity-35"
                        >
                          -
                        </button>
                        <button
                          onClick={() => adjustItemCharges(itemUuid, 1)}
                          className="px-1 border border-black hover:bg-black hover:text-parchment font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Level Spell slots used registry */}
        <div className="border border-black p-4 bg-white font-mono text-xs mb-6">
          <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
            usedSpellSlots
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(
              Object.keys(subject.currentState.usedSpellSlots) as Array<
                keyof typeof subject.currentState.usedSpellSlots
              >
            ).map((slotKey) => {
              const val = subject.currentState.usedSpellSlots[slotKey];
              return (
                <div
                  key={slotKey}
                  className="border border-black/15 p-2 bg-black/5 flex flex-col justify-between items-center"
                >
                  <span className="font-bold text-[9px] text-gray-500 uppercase text-center block mb-1">
                    {slotKey}
                  </span>
                  <span className="font-black text-lg block mb-2">
                    {val} Spent
                  </span>
                  <div className="flex gap-1 w-full justify-center">
                    <button
                      onClick={() => adjustSpellSlot(slotKey, -1)}
                      disabled={val === 0}
                      className="px-1.5 py-0.5 border border-black bg-white hover:bg-black hover:text-parchment disabled:opacity-30"
                    >
                      -
                    </button>
                    <button
                      onClick={() => adjustSpellSlot(slotKey, 1)}
                      className="px-1.5 py-0.5 border border-black bg-white hover:bg-black hover:text-parchment"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Conditions and Active Effects Buffers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conditions Active List */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3 flex justify-between items-center">
              conditions
              <Skull className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-wrap gap-1.5 mb-3 min-h-12 items-start">
              {subject.currentState.conditions.length > 0 ? (
                subject.currentState.conditions.map((cond) => (
                  <span
                    key={cond}
                    className="bg-red-800 text-parchment font-bold px-2 py-0.5 flex items-center gap-1.5 border border-black rounded-none"
                  >
                    {cond.toUpperCase()}
                    <button
                      onClick={() => removeCondition(cond)}
                      className="hover:text-amber-300 font-black text-[9px] block"
                      title="Purge Vector"
                    >
                      ✕
                    </button>
                  </span>
                ))
              ) : (
                <div className="text-gray-400 italic py-2">
                  No system bio-fault conditions active.
                </div>
              )}
            </div>

            {/* Append conditions */}
            <form onSubmit={appendCondition} className="flex gap-1">
              <input
                type="text"
                placeholder="Ailment name..."
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                className="flex-1 bg-parchment border border-black px-2 py-1 text-[11px] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-black text-parchment font-bold px-3 py-1 text-[10px] uppercase"
              >
                LOG Condition
              </button>
            </form>
          </div>

          {/* Spell Active Effects List */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3 flex justify-between items-center">
              activeEffects
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-wrap gap-1.5 mb-3 min-h-12 items-start">
              {subject.currentState.activeEffects.length > 0 ? (
                subject.currentState.activeEffects.map((eff) => (
                  <span
                    key={eff}
                    className="bg-black text-parchment font-bold px-2 py-0.5 flex items-center gap-1.5 border border-black rounded-none"
                  >
                    {eff.toUpperCase()}
                    <button
                      onClick={() => removeActiveEffect(eff)}
                      className="hover:text-amber-300 font-black text-[9px] block"
                      title="Kill Signal"
                    >
                      ✕
                    </button>
                  </span>
                ))
              ) : (
                <div className="text-gray-400 italic py-2">
                  No concurrent magical signals active.
                </div>
              )}
            </div>

            {/* Append active effect */}
            <form onSubmit={appendActiveEffect} className="flex gap-1">
              <input
                type="text"
                placeholder="Effect process..."
                value={newActiveEffect}
                onChange={(e) => setNewActiveEffect(e.target.value)}
                className="flex-1 bg-parchment border border-black px-2 py-1 text-[11px] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-black text-parchment font-bold px-3 py-1 text-[10px] uppercase"
              >
                MOUNT SIGNAL
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 6. Proficiencies System */}
      <div className="border border-black p-5 bg-white">
        <h2 className="font-sans text-xl font-bold uppercase tracking-wider border-b border-black pb-2.5 mb-5 flex items-center gap-2">
          <Sword className="w-5 h-5 text-black" /> proficiencies
        </h2>

        {/* Skill subroutine metrics with mod list */}
        <div className="mb-6">
          <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase block border-b border-black/10 pb-1.5 mb-3">
            skills
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {subject.proficiencies.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex justify-between items-center border-b border-black/10 pb-2"
              >
                <div>
                  <span className="font-bold block text-sm">{skill.name}</span>
                  <span className="text-[10px] text-gray-500">
                    {skill.source}
                  </span>
                </div>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 font-bold uppercase ${
                    skill.modifier === 'expertise'
                      ? 'bg-black text-parchment'
                      : 'bg-black/10 text-black border border-black/25'
                  }`}
                >
                  {skill.modifier}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaponry, Armor, saving throws arrays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="flex flex-col gap-2">
            <div className="border-b border-black/10 pb-1">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                saving_throws
              </span>
              <div className="flex flex-wrap gap-1.5">
                {subject.proficiencies.saving_throws.map((save) => (
                  <span
                    key={save}
                    className="bg-black text-parchment px-2 py-0.5 text-[11px] font-bold uppercase"
                  >
                    {save}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-b border-black/10 pb-1 mt-2">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                armor
              </span>
              <div className="flex flex-wrap gap-1.5">
                {subject.proficiencies.armor.map((val) => (
                  <span
                    key={val}
                    className="border border-black font-bold px-2 py-0.5 text-[11px] uppercase bg-black/5"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-b border-black/10 pb-1 mt-2">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                languages
              </span>
              <div className="flex flex-wrap gap-1.5">
                {subject.proficiencies.languages.map((val) => (
                  <span
                    key={val}
                    className="border border-black font-bold px-2 py-0.5 text-[11px] uppercase bg-black/5"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="border-b border-black/10 pb-1">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                weapons
              </span>
              <p className="text-slate-800 text-xs leading-normal bg-black/5 border border-black p-2 uppercase">
                {subject.proficiencies.weapons.join(', ')}
              </p>
            </div>

            <div className="border-b border-black/10 pb-1 mt-1">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                tools
              </span>
              <p className="text-slate-800 text-xs leading-normal bg-black/5 border border-black p-2 uppercase">
                {subject.proficiencies.tools.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Spellcasting Matrix protocols */}
      <div className="border border-black p-5 bg-white">
        <h2 className="font-sans text-xl font-bold uppercase tracking-wider border-b border-black pb-2.5 mb-5 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-black" /> spellcasting
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          {subject.spellcasting.sources.map((src) => (
            <div
              key={src.source}
              className="border-l-4 border-black pl-4 flex flex-col gap-3"
            >
              <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
                <span className="font-sans text-lg font-black">
                  {src.source}
                </span>
                <span className="text-[10px] text-gray-500 uppercase">
                  ability: {src.ability}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 font-bold block mb-1">
                  cantrips
                </span>
                <p className="text-slate-800 leading-normal text-xs uppercase italic">
                  {src.cantrips.join(', ')}
                </p>
              </div>

              <div className="mt-1">
                <span className="text-[10px] text-gray-500 font-bold block mb-1">
                  known_spells
                </span>
                <p className="text-slate-800 leading-relaxed text-xs uppercase font-medium">
                  {src.known_spells.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Full Level 1 to 20 Progression Ledger */}
      <div className="border border-black p-5 bg-white">
        <h2 className="font-sans text-xl font-bold uppercase tracking-wider border-b border-black pb-2.5 mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5 text-black" /> levelProgression
        </h2>
        <div className="flex flex-col gap-3 font-mono text-xs">
          {Object.entries(subject.definition.levelProgression).map(
            ([lvl, info]) => {
              return (
                <div
                  key={lvl}
                  className="border-b border-black/10 pb-3 flex flex-col md:flex-row gap-2 md:items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="bg-black text-parchment font-black py-0.5 px-2.5 text-sm min-w-10 text-center">
                      {lvl}
                    </span>
                    <div>
                      <span className="font-black text-sm text-slate-950 uppercase">
                        {info.class}
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        LEDGER PROCESS REGISTERED
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 md:text-right flex flex-col gap-1 items-start md:items-end md:pl-8">
                    {info.choices ? (
                      info.choices.map((choice, choiceIdx) => (
                        <div key={choiceIdx} className="text-[11px]">
                          <span className="text-gray-500 font-bold uppercase tracking-wide mr-1.5">
                            {choice.type}:
                          </span>
                          <span className="font-semibold text-slate-800">
                            {choice.value ||
                              (choice.values && choice.values.join(', ')) ||
                              (choice.choice &&
                                (choice.choice.increases
                                  ? `${choice.choice.type} (${choice.choice.increases.map((inc) => `${inc.score} +${inc.value}`).join(', ')})`
                                  : choice.choice.type))}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">
                        No specific upgrade choices compiled
                      </span>
                    )}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* 9. Asset Manifest - Inventory and Currency buffer */}
      <div className="border border-black p-5 bg-[#eae7e7]/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-black pb-3 mb-5 gap-3">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> inventory
          </h2>
          <div className="flex gap-3 font-mono text-xs font-bold leading-none py-1 px-3 bg-black text-parchment">
            <span>CP: {subject.currentState.inventory.currency.cp}</span>
            <span>SP: {subject.currentState.inventory.currency.sp}</span>
            <span>GP: {subject.currentState.inventory.currency.gp}</span>
            <span>PP: {subject.currentState.inventory.currency.pp}</span>
          </div>
        </div>

        {/* Detailed currency adjustment bank */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 font-mono text-xs bg-white p-4 border border-black">
          {(
            Object.keys(subject.currentState.inventory.currency) as Array<
              keyof typeof subject.currentState.inventory.currency
            >
          ).map((coinType) => {
            const coinVal = subject.currentState.inventory.currency[coinType];
            return (
              <div
                key={coinType}
                className="flex justify-between items-center bg-black/5 p-2"
              >
                <span className="font-bold uppercase tracking-wider">
                  {coinType}:
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-black">{coinVal}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => adjustCurrency(coinType, -10)}
                      disabled={coinVal < 10}
                      className="px-1 py-px border border-black bg-white select-none hover:bg-black hover:text-parchment text-[10px]"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => adjustCurrency(coinType, 10)}
                      className="px-1 py-px border border-black bg-white select-none hover:bg-black hover:text-parchment text-[10px]"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Items buffer listing and pocket contents nested display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-xs mb-6">
          {/* Main items storage buffer with nested package items */}
          <div className="md:col-span-8 border border-black p-4 bg-white">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              items
            </span>
            <div className="flex flex-col gap-2">
              {Object.entries(subject.currentState.inventory.items).map(
                ([uuid, item]) => {
                  const subContents = item.contents;
                  return (
                    <div
                      key={uuid}
                      className="border-b border-black/10 pb-2.5 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-black text-sm block">
                            {item.item_id.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            UUID: {uuid}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black bg-black text-parchment py-0.5 px-2">
                            QTY: {item.quantity}
                          </span>
                          <div className="flex gap-1 select-none">
                            <button
                              onClick={() => changeItemQuantity(uuid, -1)}
                              className="px-1.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs"
                            >
                              -
                            </button>
                            <button
                              onClick={() => changeItemQuantity(uuid, 1)}
                              className="px-1.5 border border-black hover:bg-black hover:text-parchment font-bold text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Nested backpacking contents */}
                      {subContents && subContents.length > 0 && (
                        <div className="mt-1.5 bg-black/5 border border-black/15 p-2 flex flex-col gap-1 text-[10.5px]">
                          <span className="font-bold text-gray-500 block text-[9px] uppercase tracking-wider">
                            PACKAGE_ITEMS_CONTAINED_INSIDE:
                          </span>
                          <ul className="list-disc list-inside text-slate-800 space-y-0.5">
                            {subContents.map((insideUuid) => (
                              <li key={insideUuid} className="capitalize">
                                {getItemFriendlyName(insideUuid).toLowerCase()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Active Worn, Held and Attuned items ledger */}
          <div className="md:col-span-4 border border-black p-4 bg-white flex flex-col gap-4">
            <div>
              <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-2.5">
                worn
              </span>
              <ul className="space-y-1.5 font-bold uppercase text-[10px]">
                {subject.currentState.inventory.loadout.worn.map((wornUuid) => (
                  <li
                    key={wornUuid}
                    className="bg-black/5 p-1 border border-black/10"
                  >
                    {getItemFriendlyName(wornUuid)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-2.5">
                held
              </span>
              <div className="flex flex-col gap-2 font-mono text-[10.5px]">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">main_hand:</span>
                  <span className="font-black">
                    {getItemFriendlyName(
                      subject.currentState.inventory.loadout.held.main_hand,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">off_hand:</span>
                  <span className="font-black">
                    {getItemFriendlyName(
                      subject.currentState.inventory.loadout.held.off_hand,
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-2.5">
                attuned_items
              </span>
              <div className="flex flex-col gap-1.5 font-bold uppercase text-[10px]">
                {subject.currentState.inventory.loadout.attuned_items.map(
                  (uuid) => (
                    <div
                      key={uuid}
                      className="bg-black text-white p-1 border border-black flex justify-between items-center"
                    >
                      <span>{getItemFriendlyName(uuid)}</span>
                      <span className="text-[8px] bg-amber-400 text-black px-1 font-black">
                        ATTUNED
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
