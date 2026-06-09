/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DEFAULT_ADVENTURE } from './data';
import { Adventure } from './types';
import {
  HexGridVisual,
  COORDINATE_LOCATIONS_BY_HEX,
  COMBAT_SITES_BY_HEX,
} from './HexGridVisual';
import { StartingZone } from './StartingZone';
import { LLMTokenTelemetry } from './LLMTokenTelemetry';
import { GridZoneDetailsInspector } from './GridZoneDetailsInspector';
import { AdventurePathCalculator } from './AdventurePathCalculator';
import { TriggerMechanisms } from './TriggerMechanisms';
import { TensionComplicationCauses } from './TensionComplicationCauses';
import { PlotFlowDetails } from './PlotFlowDetails';
import { ScriptsRegistry } from './ScriptsRegistry';
import { MechanicalSkillChallenges } from './Impacts';
import { generateChallengeId, getImaginativeTitleFromId } from './utils';
import {
  ShieldAlert,
  Moon,
  Clock,
  Dice5,
  Volume2,
  Sun,
  Users,
  Compass,
  BookOpen,
  Sparkles,
  Database,
  Key,
  Code,
  Scroll,
  HelpCircle,
  FileText,
  Workflow,
  Flag,
  Globe,
  Map,
  Activity,
  Layers,
  Film,
  MessageSquare,
} from 'lucide-react';

// Helper helper to get type-safe entries of an object as any to avoid 'unknown' TS complaints
const entries = (obj: any): [string, any][] => Object.entries(obj || {});

export default function App() {
  // Read active adventure (cached or fallback to default)
  const [activeAdventure] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('elden_chronos_adventure');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed?.meta?.adventure_id) {
            if (parsed.meta.adventure_id === 'VS-01') {
              return DEFAULT_ADVENTURE;
            }
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse cached adventure.', e);
        }
      }
    }
    return DEFAULT_ADVENTURE;
  });

  // Track currently highlighted screenplay and active preview script
  const [selectedScreenplayId, setSelectedScreenplayId] = useState<string>(
    'sp_vorguns_resolution',
  );

  // Track the active triggered environment preset group
  const [activePresetId, setActivePresetId] = useState<string>(
    'preset_stormy_village',
  );

  return (
    <div className="min-h-screen bg-[#F5F2E9] text-black font-sans antialiased py-8 px-6 selection:bg-black selection:text-[#F5F2E9]">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* ================= HEADER SECTION ================= */}
        <header
          id="campaign-header"
          className="border-b-4 border-double border-black pb-8 flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
            <div>
              <span className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                Schedule: June 15, 2026 at 18:00 UT
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                {activeAdventure.meta.title}
              </h1>
            </div>
            <div className="flex flex-col md:items-end font-mono text-[11px] font-semibold text-neutral-600 bg-neutral-200/50 p-3 rounded border border-neutral-300/40">
              <span>
                MODULE_ID:{' '}
                <b className="text-black">
                  {activeAdventure.meta.adventure_id}
                </b>
              </span>
              <span>
                SCHEMA_VER:{' '}
                <b className="text-black">
                  {activeAdventure.meta.schemaVersion}
                </b>
              </span>
              <span>
                SYSTEM:{' '}
                <b className="text-black">{activeAdventure.meta.system}</b>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10">
            <div>
              <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase block">
                1.1 Authors & Custodians
              </span>
              <p className="font-serif text-sm font-bold text-neutral-800 mt-1">
                {activeAdventure.meta.authors.join(', ')}
              </p>
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase block">
                1.2 Intended Party Level
              </span>
              <p className="font-serif text-sm font-bold text-neutral-800 mt-1">
                Levels {activeAdventure.meta.character_levels}
              </p>
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase block">
                1.3 Estimated Length of Play
              </span>
              <p className="font-serif text-sm font-medium text-neutral-800 mt-1 leading-snug">
                {activeAdventure.meta.design_philosophy}
              </p>
            </div>
          </div>
        </header>

        {/* ================= COMPREHENSIVE RECORDS SHEET ================= */}
        <main className="flex flex-col gap-12">
          {/* SECTION 1: THEMATIC PILLARS & CORE SYNOPSIS */}
          <section
            id="section-thematic-pillars"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Scroll className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Concepts
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="border-l-2 border-amber-600 pl-4 py-1">
                  <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase">
                    Core Narrative Theme
                  </span>
                  <p className="font-serif text-base font-bold text-neutral-800 mt-1">
                    {activeAdventure.theme.core_concept}
                  </p>
                </div>
                <div className="border-l-2 border-amber-600 pl-4 py-1">
                  <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase">
                    Mystery to Solve
                  </span>
                  <p className="font-serif text-sm font-medium italic text-neutral-700 mt-1 leading-snug">
                    &ldquo;{activeAdventure.theme.moral_question}&rdquo;
                  </p>
                </div>
                <div className="border-l-2 border-amber-600 pl-4 py-1">
                  <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase">
                    Dramatic Atmospheric Mood
                  </span>
                  <p className="font-sans text-xs font-bold text-neutral-800 mt-1 uppercase tracking-wide">
                    {activeAdventure.theme.mood}
                  </p>
                </div>
              </div>
              <div className="md:col-span-8 flex flex-col justify-center">
                <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase block mb-2">
                  Synopsis Overview
                </span>
                <p className="font-serif text-lg leading-relaxed text-neutral-900 selection:bg-neutral-800 selection:text-white mb-6">
                  {activeAdventure.narrative.synopsis}
                </p>

                {activeAdventure.narrative.dramatis_personae && (
                  <div className="border-t border-black/10 pt-4 mt-2">
                    <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase block mb-3">
                      Key Dramatis Personae
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {entries(activeAdventure.narrative.dramatis_personae).map(
                        ([pKey, pDesc]) => (
                          <div
                            key={pKey}
                            className="bg-white/40 border border-neutral-300 p-3 rounded font-mono text-xs"
                          >
                            <span className="font-serif font-black text-neutral-950 uppercase block mb-1">
                              🎭 {pKey}
                            </span>
                            <p className="font-serif italic text-neutral-700 leading-snug">
                              {pDesc}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 2: SAFETY COGNIZANCE & FILTERS */}
          <section
            id="section-safety-guardrails"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <ShieldAlert className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Filter Parameters
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                  Registered Content Warning Flags
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeAdventure.safety_and_accessibility.content_warnings.map(
                    (warn: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-rose-500/10 border border-rose-600/30 text-rose-800 text-[10px] font-mono font-bold uppercase tracking-wider rounded"
                      >
                        ⚠ {warn}
                      </span>
                    ),
                  )}
                </div>
                <p className="font-sans text-xs text-neutral-500 leading-normal mt-1">
                  These warning directives are baked into the core adventure
                  schema to assist the Game Master in preparing appropriate
                  players expectations before running this quest.
                </p>
              </div>

              <div className="flex flex-col gap-3 border border-neutral-300 rounded p-4 bg-neutral-200/20">
                <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                  Dynamic Content Filters Configuration
                </span>
                {entries(
                  activeAdventure.safety_and_accessibility.dynamic_filters,
                ).map(([fKey, filter]) => (
                  <div
                    key={fKey}
                    className="flex flex-col gap-2 font-mono text-[11px] text-neutral-700"
                  >
                    <div className="flex justify-between border-b border-neutral-300 pb-1.5 font-bold">
                      <span className="text-neutral-900 uppercase">
                        {fKey.replace(/_/g, ' ')}
                      </span>
                      <span className="text-emerald-700 font-bold">
                        SAFE_SUBSTITUTION_ENGAGED
                      </span>
                    </div>
                    <div>
                      Target Node Entity ID:{' '}
                      <b className="text-black font-semibold">
                        {filter.target_entity}
                      </b>
                    </div>
                    <div>
                      Safe Alternative Entity Replacement:{' '}
                      <b className="text-black font-semibold">
                        {filter.replacement_entity}
                      </b>
                    </div>
                    <div className="mt-1">
                      <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1">
                        Scrub Word Blacklist Phrases
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {filter.text_scrub_array.map(
                          (scrubWord: any, sIdx: number) => (
                            <span
                              key={sIdx}
                              className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-600 text-[8.5px] rounded"
                            >
                              &quot;{scrubWord}&quot;
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: WORLD STATE, CHRONOLOGY & ASTRONOMICAL METRICS */}
          <section
            id="section-chronology-clocks"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Clock className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Chronology
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Block 1: Calendar */}
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                  Aviation Time Records
                </span>
                <div className="bg-neutral-100 border border-neutral-300 rounded p-4 flex flex-col gap-3 font-mono text-xs">
                  <div>
                    <span className="text-neutral-400 uppercase text-[12px] block">
                      Total Hours Elapsed
                    </span>
                    <b className="text-neutral-800 text-[18.6px] font-bold font-sans">
                      {activeAdventure.world_state.time_elapsed_hours} Hours
                    </b>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase text-[9px] block">
                      Calendar Regulation System
                    </span>
                    <b className="text-neutral-800 text-sm font-bold font-sans">
                      {activeAdventure.chronology.calendar_system} (Year{' '}
                      {activeAdventure.chronology.year},{' '}
                      {activeAdventure.chronology.month},{' '}
                      {activeAdventure.chronology.day_of_week})
                    </b>
                  </div>
                  <div>
                    <span className="text-neutral-400 uppercase text-[9px] block">
                      Current Time Counter
                    </span>
                    <b className="text-neutral-800 text-sm font-bold font-sans">
                      {activeAdventure.world_state.current_time_of_day} h (
                      {activeAdventure.chronology.day_of_week})
                    </b>
                  </div>
                </div>
              </div>

              {/* Block 2: Celestial Alignment */}
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                  Active Celestial Bodies Track
                </span>
                {activeAdventure.chronology.celestial_bodies.map(
                  (body: any, bIdx: number) => (
                    <div
                      key={bIdx}
                      className="bg-neutral-100 border border-neutral-300 rounded p-4 flex flex-col gap-2 font-mono text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-neutral-900 flex items-center gap-1">
                          <Moon className="w-3.5 h-3.5 text-indigo-500" />{' '}
                          {body.name}
                        </span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-700 px-1 rounded uppercase font-bold">
                          {body.current_phase}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-serif leading-relaxed mt-1.5 border-t border-neutral-200 pt-1.5">
                        <b>Rule Modification Impact:</b>{' '}
                        {body.mechanical_impact}
                      </p>
                    </div>
                  ),
                )}
              </div>

              {/* Block 3: Daily Systems Cycle Trigger */}
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                  Solar Interval triggers Configuration
                </span>
                <div className="bg-neutral-100 border border-neutral-300 rounded p-4 flex flex-col gap-3 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-neutral-400 uppercase text-[9px] block">
                        Dawn Limit
                      </span>
                      <b className="text-neutral-800 text-sm">
                        {activeAdventure.chronology.daily_cycle.dawn} AM
                      </b>
                    </div>
                    <div>
                      <span className="text-neutral-400 uppercase text-[9px] block">
                        Dusk Limit
                      </span>
                      <b className="text-neutral-800 text-sm">
                        {activeAdventure.chronology.daily_cycle.dusk} PM
                      </b>
                    </div>
                  </div>
                  <div className="border-t border-neutral-300 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div className="flex flex-col gap-1">
                      <span className="text-neutral-400 uppercase text-[9px] block">
                        On Dawn Automation Action
                      </span>
                      <div>
                        Type:{' '}
                        <code className="text-emerald-800 font-bold">
                          {activeAdventure.chronology.daily_cycle.on_dawn
                            ?.action || 'None'}
                        </code>
                      </div>
                      <div>
                        Target ID:{' '}
                        <code className="text-[#3b82f6] font-bold">
                          {activeAdventure.chronology.daily_cycle.on_dawn
                            ?.proc_id || 'None'}
                        </code>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-neutral-300 pt-3 sm:pt-0 sm:pl-3">
                      <span className="text-neutral-400 uppercase text-[9px] block">
                        On Dusk Automation Action
                      </span>
                      <div>
                        Type:{' '}
                        <code className="text-amber-800 font-bold">
                          {activeAdventure.chronology.daily_cycle.on_dusk
                            ?.action || 'None'}
                        </code>
                      </div>
                      <div>
                        Target ID:{' '}
                        <code className="text-[#3b82f6] font-bold">
                          {activeAdventure.chronology.daily_cycle.on_dusk
                            ?.proc_id || 'None'}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: NARRATIVE BEATS & ACTIVE JOURNAL GOALS */}
          <section
            id="section-narrative-beats-ledger"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-8"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Workflow className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Plot
              </h2>
            </div>

            <div className="border border-neutral-300 rounded-lg p-5 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-700 shrink-0" />
                <div>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                    QUEST CATEGORY
                  </span>
                  <h4 className="font-serif font-black text-sm uppercase text-neutral-900 mt-0.5 tracking-tight">
                    {activeAdventure.journal.main_quest.title}
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[8.5px] font-mono font-semibold text-neutral-500 uppercase">
                  SYSTEM ID:
                </span>
                <code className="text-[9.5px] bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-neutral-[#4A4A4A] rounded font-mono font-bold uppercase">
                  {activeAdventure.journal.main_quest.id}
                </code>
              </div>
            </div>

            {/* EXPANDED PLOT FLOW DETAILS */}
            <PlotFlowDetails />
          </section>

          {/* STARTING ZONE SPECIAL INFO PANEL */}
          <StartingZone />

          {/* HEX GRID VISUAL MULTI-SCALE DASHBOARD PANEL */}
          <HexGridVisual />

          {/* SECTION 12: CHRONOS HEX SYSTEM AND COORDINATES VIEW */}
          <section
            id="section-hexmap-grids"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Map className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Coordinate Map
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Graphic Hex layout render */}
              <div className="md:col-span-4 hidden justify-center py-6">
                <div className="relative w-[280px] h-[240px] select-none font-mono text-[10px]">
                  {/* Hex hex-00 village */}
                  <div className="absolute left-[80px] top-[10px] w-[110px] h-[100px] border border-black flex flex-col items-center justify-center p-2 rounded bg-amber-50 shadow-sm leading-tight text-center">
                    <span className="font-serif font-black text-xs text-amber-800 block">
                      hex-00
                    </span>
                    <span className="text-neutral-505 font-bold uppercase mt-1">
                      Village
                    </span>
                    <span className="text-[9px] text-neutral-400 mt-1">
                      (q:0, r:0, s:0)
                    </span>
                  </div>
                  {/* Hex hex-01 swamp */}
                  <div className="absolute left-[30px] top-[110px] w-[110px] h-[100px] border border-black flex flex-col items-center justify-center p-2 rounded bg-emerald-50 shadow-sm leading-tight text-center">
                    <span className="font-serif font-black text-xs text-emerald-800 block">
                      hex-01
                    </span>
                    <span className="text-neutral-505 font-bold uppercase mt-1">
                      Swamps
                    </span>
                    <span className="text-[9px] text-neutral-400 mt-1">
                      (q:1, r:-1, s:0)
                    </span>
                  </div>
                  {/* Hex hex-02 barrow tomb */}
                  <div className="absolute left-[140px] top-[110px] w-[110px] h-[100px] border border-black flex flex-col items-center justify-center p-2 rounded bg-slate-150 shadow-sm leading-tight text-center">
                    <span className="font-serif font-black text-xs text-slate-800 block">
                      hex-02
                    </span>
                    <span className="text-neutral-505 font-bold uppercase mt-1">
                      Stone Tomb
                    </span>
                    <span className="text-[9px] text-neutral-400 mt-1">
                      (q:3, r:-2, s:-1)
                    </span>
                  </div>
                </div>
              </div>

              {/* coordinates details have been moved directly into respective items under the Anchor Directory below */}
            </div>

            {/* Location Anchors Directory */}
            <div className="border-t border-black/10 pt-6 mt-4">
              <span className="font-bold text-neutral-500 uppercase tracking-widest text-[10px] block mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-neutral-600" />
                Anchor Directory
              </span>

              <div className="flex flex-col gap-4 w-full">
                {entries(activeAdventure.locations).map(([locId, loc]) => {
                  // Lookup hex details
                  const hex =
                    activeAdventure.definitions?.hexmaps?.[loc.hexmap_id];

                  // Lookup lighting details
                  const lightKey = loc.default_lighting?.replace(
                    'lighting_states.',
                    '',
                  );
                  const light =
                    activeAdventure.audiovisual_cues?.lighting_states?.[
                      lightKey
                    ];

                  // Find scenes associated with this location
                  const linkedScenes = entries(
                    activeAdventure.scenes || {},
                  ).filter(([_, scene]) => scene.location_id === locId);

                  // Style variants by type
                  const typeStyles: Record<
                    string,
                    { border: string; bg: string; badge: string; text: string }
                  > = {
                    settlement: {
                      border: 'border-l-4 border-l-emerald-600',
                      bg: 'bg-emerald-500/5',
                      badge:
                        'bg-emerald-100 text-emerald-800 border-emerald-300',
                      text: 'text-emerald-700',
                    },
                    wilderness: {
                      border: 'border-l-4 border-l-amber-600',
                      bg: 'bg-amber-500/5',
                      badge: 'bg-amber-100 text-amber-800 border-amber-300',
                      text: 'text-amber-700',
                    },
                    dungeon: {
                      border: 'border-l-4 border-l-rose-700',
                      bg: 'bg-rose-500/5',
                      badge: 'bg-rose-100 text-rose-800 border-rose-300',
                      text: 'text-rose-700',
                    },
                  };

                  const style = typeStyles[loc.type] || {
                    border: 'border-l-4 border-l-neutral-600',
                    bg: 'bg-neutral-100/50',
                    badge: 'bg-neutral-200 text-neutral-800 border-neutral-300',
                    text: 'text-neutral-700',
                  };

                  return (
                    <div
                      key={locId}
                      className={`border border-neutral-300 rounded p-5 bg-white shadow-sm flex flex-col gap-4 ${style.border}`}
                    >
                      {/* Top Header Row */}
                      <div
                        id={`loc-card-header-${locId}`}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-200 pb-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${style.badge}`}
                          >
                            {loc.type}
                          </span>
                          <h3 className="font-serif font-black text-lg text-neutral-900 tracking-tight">
                            {loc.name}
                          </h3>
                        </div>
                        <div className="flex gap-1.5 items-center font-mono text-[10px] bg-neutral-100 px-2.5 py-1 rounded border border-neutral-250">
                          <span className="text-neutral-400">ANCHOR_ID</span>
                          <code className="text-black font-bold uppercase">
                            {locId}
                          </code>
                        </div>
                      </div>

                      {/* Vital details grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                        {/* DEMOGRAPHICS & TEXTURES */}
                        <div className="flex flex-col gap-1.5 border-r border-neutral-150 pr-4">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block border-b border-neutral-100 pb-1 mb-1">
                            Spatial Map Anchor & Terrain
                          </span>
                          <div className="flex flex-col gap-1.5 text-neutral-700">
                            <div className="flex justify-between items-baseline text-[10px] text-neutral-500 mb-0.5">
                              <span>UUID Specifier:</span>
                              <code className="bg-neutral-100 border border-neutral-250 px-1 py-0.5 text-[9px] text-black font-semibold rounded font-mono select-all">
                                {loc.uuid ||
                                  '8f1b2c4d-a9f8-4e31-a8b2-19a6b5c3d2e1'}
                              </code>
                            </div>
                            <div className="flex justify-between">
                              <span>Hex Placement:</span>
                              <span className="font-bold text-black">
                                {loc.hexmap_id || 'None Assigned'}
                              </span>
                            </div>
                            {hex && (
                              <>
                                <div className="flex justify-between mt-1 pt-1 border-t border-dashed border-neutral-300">
                                  <span className="text-neutral-500 font-semibold">
                                    Grid Coordinates:
                                  </span>
                                  <b className="text-neutral-800">
                                    ({hex.q}, {hex.r}, {hex.s})
                                  </b>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-neutral-500 font-semibold">
                                    Bounds Weight:
                                  </span>
                                  <b className="text-neutral-850 font-bold">
                                    {hex.scale_miles
                                      ? `${hex.scale_miles} Miles`
                                      : `${hex.scale_ft} Ft`}
                                  </b>
                                </div>

                                {hex.runic_wind && (
                                  <div className="flex justify-between text-[9.5px] pl-2 text-stone-500">
                                    <span>├ Wind Pattern:</span>
                                    <span className="text-neutral-700 text-right">
                                      {hex.runic_wind}
                                    </span>
                                  </div>
                                )}
                                {hex.etheric_pressure && (
                                  <div className="flex justify-between text-[9.5px] pl-2 text-stone-500">
                                    <span>├ Etheric Pressure:</span>
                                    <span className="text-neutral-700 text-right">
                                      {hex.etheric_pressure}
                                    </span>
                                  </div>
                                )}
                                {hex.relative_humidity && (
                                  <div className="flex justify-between text-[9.5px] pl-2 text-stone-500">
                                    <span>├ Rel. Humidity:</span>
                                    <span className="text-neutral-700 text-right">
                                      {hex.relative_humidity}
                                    </span>
                                  </div>
                                )}
                                {hex.spectral_density && (
                                  <div className="flex justify-between text-[9.5px] pl-2 text-stone-500">
                                    <span>├ Spectral Density:</span>
                                    <span className="text-neutral-700 text-right">
                                      {hex.spectral_density}
                                    </span>
                                  </div>
                                )}
                                {hex.acoustic_echo && (
                                  <div className="flex justify-between text-[9.5px] pl-2 text-stone-500">
                                    <span>└ Acoustic Echo:</span>
                                    <span className="text-neutral-700 text-right">
                                      {hex.acoustic_echo}
                                    </span>
                                  </div>
                                )}

                                <div className="border-t border-neutral-200 my-1 pb-1"></div>
                                <div className="flex justify-between">
                                  <span>Terrain:</span>
                                  <span className="font-semibold text-neutral-800 uppercase text-[10px]">
                                    {hex.terrain_override || 'None'}
                                  </span>
                                </div>
                                <div className="flex justify-between mb-1.5">
                                  <span>Atmospheric Layer:</span>
                                  <span
                                    className={`font-semibold px-1 rounded text-[10px] ${hex.layer === 0 ? 'bg-amber-100 text-amber-850' : 'bg-purple-100 text-purple-850'}`}
                                  >
                                    Level{' '}
                                    {hex.layer === 0
                                      ? '0.0 (Surface)'
                                      : '-1.0 (Subterranean)'}
                                  </span>
                                </div>

                                {/* CORE EXTRAS FOR MORE TREMENDOUS DETAILS */}
                                <div className="flex justify-between items-center text-[10px] text-indigo-700 font-bold">
                                  <span>Ley Line Resonance:</span>
                                  <span className="text-right">
                                    {loc.type === 'dungeon'
                                      ? 'Necrotic Abyss (Active)'
                                      : loc.type === 'settlement'
                                        ? 'Abjuration Safe Ground'
                                        : 'Primal Storm Ley Link'}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-neutral-600 font-medium">
                                  <span>Hazard Threat Rating:</span>
                                  <span className="font-bold">
                                    {loc.type === 'dungeon'
                                      ? 'Danger Class IV'
                                      : loc.type === 'settlement'
                                        ? 'Danger Class I'
                                        : 'Danger Class II'}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-neutral-600">
                                  <span>Move Friction Cost:</span>
                                  <span className="font-bold">
                                    {loc.type === 'dungeon'
                                      ? '0.25x (Foul)'
                                      : loc.type === 'settlement'
                                        ? '1.00x (Standard)'
                                        : '0.50x (Mist)'}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* GEOGRAPHICAL HIERARCHY */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block border-b border-neutral-100 pb-1 mb-1">
                            Paths
                          </span>
                          <div className="flex flex-col gap-1.5 text-neutral-700">
                            <div className="flex justify-between">
                              <span>Parent Area:</span>
                              <span className="font-medium">
                                {loc.parent_id ? (
                                  <span className="text-blue-700 font-bold underline decoration-blue-500/30">
                                    {activeAdventure.locations?.[loc.parent_id]
                                      ?.name || loc.parent_id}
                                  </span>
                                ) : (
                                  <span className="text-neutral-400 italic">
                                    None (Root Location)
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="flex flex-col mt-1 bg-neutral-50 p-2 rounded border border-neutral-200">
                              <span className="text-[8.5px] text-neutral-400 uppercase font-black">
                                Breadcrumb Path
                              </span>
                              <span className="text-[10px] font-semibold text-neutral-800 mt-1 flex items-center gap-1.5 flex-wrap">
                                {loc.parent_id ? (
                                  <>
                                    <Compass className="w-3 h-3 text-neutral-550" />
                                    <span>
                                      {
                                        activeAdventure.locations?.[
                                          loc.parent_id
                                        ]?.name
                                      }
                                    </span>
                                    <span className="text-neutral-400">➔</span>
                                    <span className="text-neutral-900 font-bold">
                                      {loc.name}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Compass className="w-3 h-3 text-neutral-550" />
                                    <span className="text-neutral-900 font-bold">
                                      {loc.name}
                                    </span>
                                  </>
                                )}
                              </span>
                            </div>

                            {/* Dynamic Coordinate Locations list */}
                            {loc.hexmap_id &&
                              COORDINATE_LOCATIONS_BY_HEX[loc.hexmap_id] && (
                                <div className="flex flex-col mt-1 bg-stone-55 border border-stone-200 p-2 rounded bg-stone-50/50">
                                  <span className="text-[8.5px] text-emerald-800 uppercase font-black tracking-wider block mb-1">
                                    📍 Coordinate Locations (
                                    {
                                      COORDINATE_LOCATIONS_BY_HEX[loc.hexmap_id]
                                        .length
                                    }
                                    )
                                  </span>
                                  <div className="flex flex-wrap gap-1 leading-normal pt-0.5">
                                    {COORDINATE_LOCATIONS_BY_HEX[
                                      loc.hexmap_id
                                    ].map((subLoc, idx) => (
                                      <span
                                        key={idx}
                                        className="bg-emerald-50 text-emerald-950 border border-emerald-250/20 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold select-all"
                                      >
                                        {subLoc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {/* Dynamic Combat Sites list */}
                            {loc.hexmap_id &&
                              COMBAT_SITES_BY_HEX[loc.hexmap_id] &&
                              COMBAT_SITES_BY_HEX[loc.hexmap_id].length > 0 && (
                                <div className="flex flex-col mt-1 bg-red-50/35 border border-red-200/50 p-2 rounded">
                                  <span className="text-[8.5px] text-red-800 uppercase font-black tracking-wider block mb-1">
                                    ⚔️ Combat Sites (
                                    {COMBAT_SITES_BY_HEX[loc.hexmap_id].length})
                                  </span>
                                  <div className="flex flex-wrap gap-1 leading-normal pt-0.5">
                                    {COMBAT_SITES_BY_HEX[loc.hexmap_id].map(
                                      (site, idx) => (
                                        <span
                                          key={idx}
                                          className="bg-red-50 text-red-950 border border-red-250/20 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold select-all"
                                        >
                                          {site}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>

                        {/* LIGHTING & CLIMATE CONTROL */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block border-b border-neutral-100 pb-1 mb-1">
                            VTT Ambient Light & Climate Engine
                          </span>
                          <div className="flex flex-col gap-1.5 text-neutral-700">
                            <div className="flex justify-between">
                              <span>Lighting Link:</span>
                              <span className="text-amber-800 font-bold break-all max-w-[150px] truncate">
                                {loc.default_lighting ||
                                  'None (Default Sunlight)'}
                              </span>
                            </div>
                            {light ? (
                              <div className="bg-neutral-50 p-2.5 rounded border border-neutral-200 flex flex-col gap-1.5 shadow-inner">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span>Color Token:</span>
                                  <div className="flex items-center gap-1.5 font-bold text-black font-mono">
                                    <span
                                      className="w-3"
                                      style={{
                                        height: '12px',
                                        width: '12px',
                                        borderRadius: '50%',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        display: 'inline-block',
                                        backgroundColor: light.ambient_light,
                                      }}
                                    />
                                    <code>{light.ambient_light}</code>
                                  </div>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                  <span>Light Intensity:</span>
                                  <span className="font-bold text-neutral-900">
                                    {light.intensity * 100}%
                                  </span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                  <span>Fog Overlay:</span>
                                  <span
                                    className={`font-bold ${light.fog_of_war ? 'text-indigo-600' : 'text-neutral-400'}`}
                                  >
                                    {light.fog_of_war ? 'Enabled' : 'Disabled'}
                                  </span>
                                </div>
                                {light.directional_light && (
                                  <div className="flex justify-between text-[10px]">
                                    <span>Light Direction:</span>
                                    <code className="text-neutral-800 font-mono">
                                      {light.directional_light}
                                    </code>
                                  </div>
                                )}

                                {/* Extended Climate Engine Information */}
                                <div className="mt-1.5 pt-1.5 border-t border-neutral-200 flex flex-col gap-1.5 text-[9.5px]">
                                  <div className="flex justify-between text-stone-600">
                                    <span>🌡️ VTT Temp Calibration:</span>
                                    <span className="font-bold text-neutral-850 font-mono">
                                      {light.vtt_temperature_c !== undefined
                                        ? `${light.vtt_temperature_c}°C`
                                        : 'N/A'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-stone-600">
                                    <span>⚡ Grid Interference:</span>
                                    <span className="font-bold text-neutral-850 font-mono">
                                      {light.grid_interference_pct !== undefined
                                        ? `${light.grid_interference_pct}% distortion`
                                        : '0%'}
                                    </span>
                                  </div>
                                  <div className="flex flex-col text-stone-600 mt-0.5">
                                    <span className="text-stone-400 uppercase text-[8px] font-extrabold tracking-wide">
                                      Chromatic Dispersion Matrix
                                    </span>
                                    <span className="font-semibold text-neutral-800 break-words font-mono text-[9px] mt-0.5 bg-neutral-100 p-1 rounded border border-neutral-150">
                                      {light.chromatic_dispersion_index ||
                                        'Standard Rayleigh (Stable)'}
                                    </span>
                                  </div>
                                  <div className="flex flex-col text-stone-600 mt-0.5">
                                    <span className="text-stone-400 uppercase text-[8px] font-extrabold tracking-wide">
                                      Atmospheric Phenomenon / Weather
                                    </span>
                                    <span className="font-sans text-neutral-700 italic leading-relaxed mt-0.5 text-[9.5px]">
                                      {light.climate_phenomenon ||
                                        'Standard daylight convective cycle.'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-[10px] text-neutral-400 italic">
                                Defaulting to standard system daylight settings
                                (100% Intensity, Warm Amber background warmth).
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* LINKED SCENES & ENCOUNTERS */}
                      <div className="border-t border-neutral-100 pt-3 flex flex-col gap-2">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono tracking-wider">
                          Active ({linkedScenes.length})
                        </span>
                        {linkedScenes.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {linkedScenes.map(([sceneId, scene]) => {
                              const actorCount = scene.actors?.length || 0;
                              const hasEncounter =
                                scene.encounters && scene.encounters.length > 0;

                              return (
                                <div
                                  key={sceneId}
                                  className="border border-neutral-250 p-3 bg-neutral-50/70 rounded-md font-mono text-[11px] flex flex-col gap-1.5"
                                >
                                  <div className="flex justify-between items-baseline border-b border-neutral-200 pb-1">
                                    <span className="font-bold text-neutral-800 truncate max-w-[170px]">
                                      🎥{' '}
                                      {sceneId
                                        .replace(/_/g, ' ')
                                        .replace('scene ', '')}
                                    </span>
                                    <code className="text-[9px] bg-neutral-200 text-neutral-600 px-1 py-0.5 rounded">
                                      {sceneId}
                                    </code>
                                  </div>

                                  <div className="text-[10px] text-neutral-600 flex flex-wrap gap-x-3 gap-y-1">
                                    <span>
                                      Actors:{' '}
                                      <b className="text-black font-semibold">
                                        {actorCount}
                                      </b>
                                    </span>
                                    <span>
                                      Enemies:{' '}
                                      <b
                                        className={`font-semibold ${hasEncounter ? 'text-red-700' : 'text-black'}`}
                                      >
                                        {hasEncounter ? 'Yes' : 'None'}
                                      </b>
                                    </span>
                                  </div>

                                  {(scene.description ||
                                    (scene.actors &&
                                      scene.actors.length > 0)) && (
                                    <div className="text-[9.5px] text-neutral-500 pt-1 border-t border-dashed border-neutral-200">
                                      Description:{' '}
                                      <span className="text-neutral-700 leading-normal block mt-0.5">
                                        {scene.description ||
                                          scene.actors
                                            .map(
                                              (a: any) => `${a.id} (${a.role})`,
                                            )
                                            .join(', ')}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs italic text-neutral-400 font-mono">
                            No active scene storyboard nodes map to this exact
                            location anchor.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION: GRID ZONE DIRECTORY & BIOMETRIC LEDGER */}
          <GridZoneDetailsInspector />

          {/* SECTION 5: PARTY INTEGRATION */}
          <section
            id="section-party-integration"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Users className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Party Backgrounds
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                Class-Specific Background Hooks
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entries(
                  activeAdventure.party_integration.background_hooks,
                ).map(([archetype, hook]) => (
                  <div
                    key={archetype}
                    className="border border-neutral-300 p-4 rounded bg-white/50 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center border-b border-neutral-200 pb-1 font-mono text-[11px]">
                      <span className="font-bold text-indigo-700 uppercase">
                        {archetype} Archetype Profile
                      </span>
                      <code className="text-[9px] text-neutral-500 uppercase">
                        Links: {hook.linked_secret}
                      </code>
                    </div>
                    <p className="font-serif text-sm text-neutral-800 italic leading-snug mt-1">
                      &ldquo;{hook.bonus}&rdquo;
                    </p>
                    {hook.location && (
                      <div className="mt-2 pt-1.5 border-t border-dashed border-neutral-200 flex justify-between items-center font-mono text-[10.5px]">
                        <span className="text-neutral-400">
                          Primary Location:
                        </span>
                        <span className="text-indigo-800 font-bold">
                          {hook.location}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: FACTION ALIGNMENT MAPS */}
          <section
            id="section-factions-profiles"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Users className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Faction Profiles
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                Factions Alignment Maps
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entries(activeAdventure.factions).map(([fKey, faction]) => (
                  <div
                    key={fKey}
                    className="border border-neutral-300 p-4 rounded bg-white/50 flex flex-col gap-2.5"
                  >
                    <div className="flex justify-between items-center bg-white/40 -mx-4 -mt-4 p-3 border-b border-neutral-200 rounded-t">
                      <span className="font-serif text-base font-black text-neutral-900 uppercase">
                        {faction.name}
                      </span>
                      <code className="text-[9px] font-mono bg-neutral-200 px-1 py-0.5 text-neutral-600 uppercase rounded">
                        {fKey}
                      </code>
                    </div>
                    {faction.description && (
                      <p className="text-[11px] text-neutral-700 font-sans leading-relaxed">
                        {faction.description}
                      </p>
                    )}
                    <div className="font-mono text-[10px] text-neutral-600 flex flex-col gap-1 pt-2 border-t border-neutral-200">
                      <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1">
                        Affiliated Alignments Map
                      </span>
                      {entries(faction.relations).map(
                        ([targetFaction, relation]) => {
                          const relColor =
                            relation === 'Hostile'
                              ? 'bg-rose-500/15 text-rose-800'
                              : relation === 'Friendly'
                                ? 'bg-emerald-500/15 text-emerald-800'
                                : 'bg-amber-500/15 text-amber-800';

                          return (
                            <div
                              key={targetFaction}
                              className="flex justify-between items-center py-1"
                            >
                              <span className="text-[10px] tracking-tight">
                                {targetFaction.replace(/_/g, ' ')}:
                              </span>
                              <span
                                className={`text-[9.5px] px-1.5 font-bold uppercase rounded ${relColor}`}
                              >
                                {relation}
                              </span>
                            </div>
                          );
                        },
                      )}
                    </div>
                    {faction.controlled_areas &&
                      faction.controlled_areas.length > 0 && (
                        <div className="pt-2 border-t border-dashed border-neutral-200 mt-1">
                          <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1.5 font-mono">
                            Controlled Territories
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {faction.controlled_areas.map((area, index) => (
                              <span
                                key={index}
                                className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[9.5px] border border-neutral-250 font-mono tracking-wide"
                              >
                                📍 {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: THE CRYPTIC LORE WEB SECRETS */}
          <section
            id="section-secrets-web"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Key className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Secrets
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                Lore Registry Database (lore_web.secrets)
              </span>
              <div className="grid grid-cols-1 gap-6">
                {entries(activeAdventure.lore_web.secrets).map(
                  ([secKey, sValue]) => (
                    <div
                      key={secKey}
                      className="border border-neutral-350 p-6 bg-stone-900 text-stone-200 rounded-lg flex flex-col gap-4 font-mono shadow-md"
                    >
                      <div className="flex justify-between items-center border-b border-stone-700 pb-3">
                        <span className="text-amber-400 font-bold text-sm uppercase leading-none tracking-wider">
                          {secKey.replace(/_/g, ' ')}
                        </span>
                        <div className="flex items-center gap-2">
                          {sValue.xp_reward && (
                            <span className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 uppercase rounded font-bold">
                              +{sValue.xp_reward} XP
                            </span>
                          )}
                          <code className="text-[10px] bg-stone-800 px-2.5 py-1 text-stone-300 uppercase rounded font-bold">
                            REGISTRY_ID: {sValue.id}
                          </code>
                        </div>
                      </div>

                      <p className="font-serif italic text-stone-100 text-[14px] leading-relaxed py-2 pl-3 border-l-2 border-amber-500/50 bg-stone-950/40 rounded-r">
                        &ldquo;{sValue.truth}&rdquo;
                      </p>

                      <div className="flex flex-col sm:flex-row justify-between sm:items-center text-[11px] border-t border-stone-800/80 pt-3.5 mt-1 text-stone-400 gap-2">
                        <div className="flex items-center gap-1.5">
                          <span>Associated Clues Required to Discover:</span>
                          <span className="text-stone-100 bg-stone-800 px-2 py-0.5 rounded font-black text-xs font-sans">
                            {sValue.clues_required}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <span>Spatial Search Coordinates:</span>
                          <code className="text-amber-400 bg-stone-800/80 px-2 py-0.5 rounded border border-amber-500/20">
                            {sValue.clue_locations.join(', ')}
                          </code>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* SECTION 7: HAZARD TENSION ENGINE */}
          <section
            id="section-hazard-tension-engine"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Dice5 className="w-5 h-5 text-rose-800" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Complications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Stat Card */}
              <div className="md:col-span-4 bg-neutral-100 border border-neutral-300 rounded p-4 flex flex-col gap-3 font-mono text-xs">
                <span className="text-neutral-500 font-bold uppercase text-[9px]">
                  Tension Engine Core Variables
                </span>
                <div>
                  <span className="text-neutral-400 uppercase text-[9px] block">
                    Max Hazard Bounds
                  </span>
                  <b className="text-neutral-800 text-sm">
                    {activeAdventure.tension_engine.pool_mechanic.max_dice} Dice
                    ({activeAdventure.tension_engine.pool_mechanic.die_type})
                  </b>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase text-[9px] block">
                    Current Dice Seed Level
                  </span>
                  <b className="text-neutral-800 text-sm">
                    {activeAdventure.world_state.tension_pool_current_dice} /{' '}
                    {activeAdventure.tension_engine.pool_mechanic.max_dice}{' '}
                    Active Dice
                  </b>
                </div>
              </div>

              {/* Logic Arrays */}
              <div className="md:col-span-8 flex flex-col gap-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Triggers Add */}
                  <div className="border border-neutral-300 p-3 rounded bg-white/40">
                    <span className="font-bold text-neutral-800 uppercase text-[9.5px] block border-b border-neutral-300 pb-1 mb-2">
                      Triggers to Add Hazard seeds
                    </span>
                    <ul className="list-disc list-inside flex flex-col gap-1 text-[11px] text-neutral-600">
                      {activeAdventure.tension_engine.pool_mechanic.triggers_to_add_die.map(
                        (trig: any, idx: number) => (
                          <li key={idx}>
                            <code>{trig}</code>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Triggers Roll */}
                  <div className="border border-neutral-300 p-3 rounded bg-white/40">
                    <span className="font-bold text-neutral-800 uppercase text-[9.5px] block border-b border-neutral-300 pb-1 mb-2">
                      Triggers to Force Hazard check rolls
                    </span>
                    <ul className="list-disc list-inside flex flex-col gap-1 text-[11px] text-neutral-600">
                      {activeAdventure.tension_engine.pool_mechanic.triggers_to_roll_pool.map(
                        (trig: any, idx: number) => (
                          <li key={idx}>
                            <code>{trig}</code>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                {/* Complication Trigger on Roll Containing 1 */}
                <div className="border border-rose-200 p-3.5 bg-rose-50 border-l-4 border-l-rose-600 rounded">
                  <span className="font-bold text-rose-800 uppercase text-[10px] block mb-1">
                    Tension Pool Critical Fallback Complication Rule
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10.5px] text-rose-700 leading-snug font-mono mt-1 pt-1.5 border-t border-rose-250">
                    <div>
                      Condition:{' '}
                      <code className="text-black font-semibold">
                        {activeAdventure.tension_engine.pool_mechanic
                          .on_roll_complication?.condition || 'None'}
                      </code>
                    </div>
                    <div>
                      Action:{' '}
                      <code className="text-black font-semibold">
                        {activeAdventure.tension_engine.pool_mechanic
                          .on_roll_complication?.action || 'None'}
                      </code>
                    </div>
                    <div>
                      Target Macro:{' '}
                      <code className="text-[#bf1e2e] font-bold">
                        {activeAdventure.tension_engine.pool_mechanic
                          .on_roll_complication?.proc_id || 'None'}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Grouped Campaign Complications Library */}
                {activeAdventure.tension_engine.categories && (
                  <div className="border border-neutral-300 p-4 rounded bg-white/45 flex flex-col gap-3 w-full">
                    <span className="font-bold text-neutral-800 uppercase text-[10px] block border-b border-neutral-200 pb-1">
                      Grouped Campaign Complications Library
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      {activeAdventure.tension_engine.categories.map(
                        (cat: any, cIdx: number) => (
                          <div
                            key={cIdx}
                            className="border border-neutral-250 p-3 rounded bg-white flex flex-col gap-2"
                          >
                            <div className="flex flex-col">
                              <span className="font-bold text-neutral-900 text-[11px] uppercase tracking-wide">
                                {cat.category_name}
                              </span>
                              <span className="text-[10px] text-neutral-500 italic mt-0.5">
                                {cat.description}
                              </span>
                            </div>
                            <div className="flex flex-col gap-1.5 border-t border-neutral-150 pt-2 mt-1">
                              {cat.sub_complications.map(
                                (sub: any, sIdx: number) => (
                                  <div
                                    key={sIdx}
                                    className="text-[10.5px] leading-snug flex items-start gap-1 justify-between"
                                  >
                                    <div>
                                      <span className="font-semibold text-neutral-850">
                                        ⚫ {sub.name}:
                                      </span>{' '}
                                      <span className="text-neutral-600 font-sans">
                                        {sub.description}
                                      </span>
                                    </div>
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase shrink-0 ${
                                        sub.severity === 'High'
                                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                          : sub.severity === 'Medium'
                                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      }`}
                                    >
                                      {sub.severity}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 8: AUDIOVISUAL ENVIRONMENTS */}
          <section
            id="section-audiovisual-assets"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Sun className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Environment
              </h2>
            </div>

            {/* Environment Presets (Group Trigger) */}
            {activeAdventure.audiovisual_cues.environment_groups && (
              <div className="border border-neutral-300 p-4 rounded bg-white/45 flex flex-col gap-3 font-mono text-xs w-full">
                <span className="font-bold text-neutral-800 uppercase text-[9.5px] block border-b border-neutral-200 pb-2">
                  Unified Environment Presets (Global Group Trigger)
                </span>
                <p className="text-neutral-500 text-[10px] italic leading-relaxed font-sans">
                  Triggering an environment preset synchronizes soundscapes,
                  lighting states, and particle VFX settings simultaneously for
                  efficiency.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1.5">
                  {entries(
                    activeAdventure.audiovisual_cues.environment_groups,
                  ).map(([presetId, preset]: any) => {
                    const isSelected = presetId === activePresetId;
                    return (
                      <div
                        key={presetId}
                        className={`p-3 rounded border text-left flex flex-col gap-1 transition-all duration-150 ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-600/50 text-emerald-950 font-bold shadow-xs scale-[1.01]'
                            : 'bg-white border-neutral-300 text-neutral-750'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-bold text-[11px] uppercase tracking-wide text-neutral-900">
                            {preset.name}
                          </span>
                          {isSelected && (
                            <span className="bg-emerald-600 rounded-full text-white text-[8px] px-1.5 py-0.5 tracking-wider uppercase font-extrabold shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-500 leading-snug mt-0.5 font-sans leading-tight font-normal">
                          {preset.description}
                        </span>
                        <div className="text-[8.5px] text-neutral-400 mt-2 flex flex-col gap-0.5 border-t border-neutral-150 pt-2 bg-neutral-50/50 p-1.5 rounded font-normal">
                          <div>
                            🔊 BGM: <b>{preset.soundscape_id}</b>
                          </div>
                          <div>
                            💡 Light: <b>{preset.lighting_id}</b>
                          </div>
                          <div>
                            ✨ VFX: <b>{preset.vfx_id}</b>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {/* Soundscape loops */}
              <div className="border border-neutral-300 p-4 rounded bg-white/50 flex flex-col gap-3">
                <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9.5px] border-b border-neutral-200 pb-1.5 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-emerald-600" /> SOUNDSCAPES
                  DIRECTORY (soundscapes)
                </span>
                <div className="flex flex-col gap-3">
                  {entries(activeAdventure.audiovisual_cues.soundscapes).map(
                    ([k, sc]) => {
                      const activePreset =
                        activeAdventure.audiovisual_cues.environment_groups?.[
                          activePresetId
                        ];
                      const isPresetMatch = activePreset?.soundscape_id === k;
                      return (
                        <div
                          key={k}
                          className={`p-2.5 rounded border transition-all duration-150 ${
                            isPresetMatch
                              ? 'border-emerald-600 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-xs'
                              : 'bg-neutral-100 border-neutral-350'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-neutral-900 leading-none text-[11px] uppercase truncate">
                              {k.replace(/_/g, ' ')}
                            </div>
                            {isPresetMatch && (
                              <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded uppercase font-bold shrink-0">
                                Active preset stem
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono mt-1 truncate">
                            File:{' '}
                            <span className="text-emerald-800">
                              /{sc.asset_path}
                            </span>
                          </div>
                          <div className="text-[9px] text-neutral-400 mt-0.5">
                            Looping Stem:{' '}
                            <span className="text-black font-bold uppercase">
                              {String(sc.loop)}
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Lighting Overlays */}
              <div className="border border-neutral-300 p-4 rounded bg-white/50 flex flex-col gap-3">
                <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9.5px] border-b border-neutral-200 pb-1.5 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" /> LIGHTING OVERLAYS
                  (lighting_states)
                </span>
                <div className="flex flex-col gap-3">
                  {entries(
                    activeAdventure.audiovisual_cues.lighting_states,
                  ).map(([k, sc]) => {
                    const activePreset =
                      activeAdventure.audiovisual_cues.environment_groups?.[
                        activePresetId
                      ];
                    const isPresetMatch = activePreset?.lighting_id === k;
                    return (
                      <div
                        key={k}
                        className={`p-2.5 rounded border flex flex-col gap-1.5 transition-all duration-150 ${
                          isPresetMatch
                            ? 'border-emerald-600 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-xs'
                            : 'bg-neutral-100 border-neutral-350'
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-neutral-900 text-[10.5px] uppercase">
                              {k.replace(/_/g, ' ')}
                            </span>
                            {isPresetMatch && (
                              <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded uppercase font-bold shrink-0">
                                Preset Layer
                              </span>
                            )}
                          </div>
                          <div
                            className="w-3.5 h-3.5 border border-black/10 rounded-full shrink-0"
                            style={{ backgroundColor: sc.ambient_light }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[9.5px] text-neutral-600 border-t border-neutral-250 pt-1.5">
                          <div>
                            Ambient Color:{' '}
                            <b className="text-black">{sc.ambient_light}</b>
                          </div>
                          <div>
                            Intensity:{' '}
                            <b className="text-black">{sc.intensity}</b>
                          </div>
                          <div className="col-span-2">
                            Fog Overlay:{' '}
                            <b className="text-black">
                              {String(sc.fog_of_war)}
                            </b>
                          </div>
                          {sc.directional_light && (
                            <div className="col-span-2 mt-0.5">
                              Light Direction:{' '}
                              <b className="text-black">
                                {sc.directional_light}
                              </b>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* VFX Particles */}
              <div className="border border-neutral-350 p-4 rounded bg-white/50 flex flex-col gap-3">
                <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9.5px] border-b border-neutral-200 pb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" /> SPECIAL VFX
                  CORES (vfx_states)
                </span>
                <div className="flex flex-col gap-3">
                  {entries(activeAdventure.audiovisual_cues.vfx_states).map(
                    ([k, sc]) => {
                      const activePreset =
                        activeAdventure.audiovisual_cues.environment_groups?.[
                          activePresetId
                        ];
                      const isPresetMatch = activePreset?.vfx_id === k;
                      return (
                        <div
                          key={k}
                          className={`p-2.5 rounded border transition-all duration-150 ${
                            isPresetMatch
                              ? 'border-emerald-600 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-xs'
                              : 'bg-neutral-100 border-neutral-350'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-bold text-neutral-900 leading-none text-[11px] uppercase truncate">
                              {k.replace(/_/g, ' ')}
                            </div>
                            {isPresetMatch && (
                              <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded uppercase font-bold shrink-0">
                                Preset core
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-500 mt-1 truncate">
                            Asset Resource:{' '}
                            <span className="text-rose-800">
                              /{sc.asset_path}
                            </span>
                          </div>
                          <div className="text-[9px] text-neutral-400 mt-0.5">
                            Density Rate:{' '}
                            <span className="text-black font-semibold">
                              {sc.density * 100}% Saturated
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 10: MONSTERS, NPCS & EQUIPMENTS (DEFINITIONS INDEX) */}
          <section
            id="section-definitions-entities"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Scroll className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Entities
              </h2>
            </div>

            <div className="flex flex-col gap-8 font-mono text-xs">
              {/* SUBSECTION 10.1: Combat Monster Stats Entries */}
              <div
                id="subsection-10-1-monsters"
                className="border border-neutral-300 p-5 rounded bg-white/55 flex flex-col gap-4 shadow-sm"
              >
                <span className="font-bold text-neutral-600 uppercase text-[10.5px] tracking-widest block border-b border-neutral-250 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  Conflict Blocks
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entries(activeAdventure.definitions.entities.monsters).map(
                    ([mKey, mon]) => (
                      <div
                        key={mKey}
                        className="p-4 bg-neutral-100 border border-neutral-300 rounded flex flex-col gap-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-serif font-black text-base text-neutral-900 block leading-tight">
                              {mon.name}
                            </span>
                            <span className="text-[9.5px] text-neutral-500 uppercase font-bold">
                              {mon.size} &bull; {mon.base_stat_block}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {mon.xp_reward && (
                              <span className="text-[9px] bg-emerald-500/15 text-emerald-800 border border-emerald-500/25 px-1.5 py-0.5 uppercase font-bold leading-none rounded">
                                +{mon.xp_reward} XP
                              </span>
                            )}
                            <span className="text-[9px] bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-red-700 font-bold uppercase rounded leading-none">
                              VTT_HOSTILE_CORE
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[10.5px] text-neutral-600 font-mono pt-3 border-t border-neutral-250 mt-1">
                          <div>
                            HIT POINTS:{' '}
                            <b className="text-red-700 text-sm font-sans font-black">
                              {mon.hp} HP
                            </b>
                          </div>
                          <div>
                            VFX Aura Particle:{' '}
                            <b className="text-neutral-800">
                              {mon.default_vfx || 'None Assigned'}
                            </b>
                          </div>
                        </div>
                        {mon.locations && mon.locations.length > 0 && (
                          <div className="pt-2 border-t border-dashed border-neutral-250 mt-1">
                            <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1">
                              Combat Sites
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {mon.locations.map(
                                (loc: string, lIdx: number) => (
                                  <span
                                    key={lIdx}
                                    className="bg-red-50 text-red-800 border border-red-200/55 rounded px-2 py-0.5 text-[9.5px]"
                                  >
                                    ⚔️ {loc}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* SUBSECTION 10.2: Campaign Non-Player Characters (NPCs) */}
              <div
                id="subsection-10-2-npcs"
                className="border border-neutral-300 p-5 rounded bg-[#FAF7EF]/60 flex flex-col gap-4 shadow-sm"
              >
                <span className="font-bold text-neutral-600 uppercase text-[10.5px] tracking-widest block border-b border-neutral-250 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  NPCs
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entries(activeAdventure.definitions.entities.npcs).map(
                    ([nKey, npc]) => (
                      <div
                        key={nKey}
                        className="p-4 bg-white border border-neutral-350 rounded"
                      >
                        <div className="flex justify-between items-center mb-1 pb-1.5 border-b border-neutral-100">
                          <span className="font-serif text-base font-black text-neutral-900 uppercase">
                            {npc.name}
                          </span>
                          <code className="text-[9px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded">
                            ENTITY_ID: {nKey}
                          </code>
                        </div>
                        <div className="flex flex-col gap-2 text-[10px] mt-2.5 font-mono text-neutral-600 leading-snug">
                          <div className="flex justify-between border-b border-dashed border-neutral-150 pb-1">
                            <span className="text-neutral-500 font-sans">
                              Ideal Principle:
                            </span>
                            <b className="text-black font-extrabold text-right">
                              {npc.roleplaying.ideal}
                            </b>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-neutral-150 pb-1">
                            <span className="text-neutral-500 font-sans">
                              Deep Roleplay Flaw:
                            </span>
                            <b className="text-[#a13b3c] font-extrabold text-right">
                              {npc.roleplaying.flaw}
                            </b>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500 font-sans">
                              Stationed Location:
                            </span>
                            <b className="text-emerald-800 font-extrabold text-right">
                              {npc.location || 'Unspecified'}
                            </b>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* SUBSECTION 10.3: Legendary Weapons & Artifacts (Items) */}
              <div
                id="subsection-10-3-items"
                className="border border-neutral-300 p-5 rounded bg-white/55 flex flex-col gap-4 shadow-sm"
              >
                <span className="font-bold text-neutral-600 uppercase text-[10.5px] tracking-widest block border-b border-neutral-250 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  Artefacts
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entries(activeAdventure.definitions.entities.items).map(
                    ([iKey, item]) => (
                      <div
                        key={iKey}
                        className="p-4 bg-neutral-100 border border-neutral-300 rounded flex flex-col gap-2"
                      >
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-serif text-base font-bold text-neutral-900">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.xp_reward && (
                              <span className="text-[9px] bg-emerald-500/15 text-emerald-800 border border-emerald-500/25 px-1.5 py-0.5 rounded uppercase font-bold leading-none">
                                +{item.xp_reward} XP
                              </span>
                            )}
                            <span className="text-[9.5px] bg-amber-500/10 text-amber-800 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-bold leading-none">
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <p className="font-mono text-xs text-neutral-750 mt-1 leading-relaxed">
                          <b>Magic Status Properties:</b> {item.properties}
                        </p>
                        <div className="text-[10px] font-mono text-neutral-500 mt-1 flex justify-between items-center">
                          <span>
                            Discovered At:{' '}
                            <b className="text-amber-800 font-bold uppercase">
                              {item.location || 'Unspecified'}
                            </b>
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 11: CAMPAIGN SCENARIOS & ENCOUNTERS */}
          <section
            id="section-scenarios-scenes"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Compass className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Scenes
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {entries(activeAdventure.scenes).map(([scId, scene]) => (
                <div
                  key={scId}
                  className="border border-neutral-300 rounded overflow-hidden shadow-sm bg-white font-mono text-xs animate-none"
                >
                  <div className="bg-neutral-800 text-neutral-100 px-4 py-2.5 flex justify-between items-center text-[11px]">
                    <span className="font-bold text-amber-400 font-mono tracking-wide uppercase">
                      SCENE: {scId.toUpperCase().replace(/_/g, ' ')}
                    </span>
                    <span className="bg-neutral-700 text-neutral-300 px-1.5 py-0.5 rounded uppercase text-[9px]">
                      Location Anchor: {scene.location_id}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-4">
                    {/* AV cues load block */}
                    {scene.on_load_av && (
                      <div className="bg-neutral-50 px-3 py-1.5 rounded border border-neutral-250 text-[10px] text-neutral-600">
                        Scene Ambient Cue BGM:{' '}
                        <span className="text-emerald-700 font-bold">
                          {scene.on_load_av.play_bgm}
                        </span>
                      </div>
                    )}

                    {/* Constraints Fulfilled */}
                    <div>
                      <span className="text-neutral-500 uppercase text-[9px] font-extrabold tracking-wide block mb-1.5">
                        [Constraints Fulfilled]
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(
                          scene.constraints_fulfilled || [
                            'State: Initial Adventure Setup',
                            'Roleplaying: General Criteria Mastered',
                          ]
                        ).map((constraint: string, cIdx: number) => (
                          <span
                            key={cIdx}
                            className="bg-emerald-500/10 border border-emerald-600/20 text-emerald-800 px-2.5 py-1 rounded text-[10px] font-mono font-semibold flex items-center gap-1"
                          >
                            ✓ {constraint}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Combat Encounters Matrix */}
                      {scene.encounters && scene.encounters.length > 0 && (
                        <div className="border border-neutral-250 p-3 rounded bg-red-50/20">
                          <span className="font-bold text-red-800 text-[10px] uppercase block border-b border-red-200 pb-1 mb-2">
                            Combat Encounters
                          </span>
                          <div className="flex flex-col gap-2">
                            {scene.encounters.map(
                              (encNode: any, eIdx: number) => (
                                <div
                                  key={eIdx}
                                  className="bg-white border border-neutral-200 p-2.5 rounded text-[10.5px]"
                                >
                                  <div>
                                    Encounter: <b>{encNode.id}</b>
                                  </div>
                                  {encNode.actors.map(
                                    (mob: any, mIdx: number) => (
                                      <div
                                        key={mIdx}
                                        className="text-neutral-600 mt-0.5"
                                      >
                                        Mob: <b>{mob.entity_id}</b> (qty:{' '}
                                        {mob.quantity})
                                      </div>
                                    ),
                                  )}
                                  <div className="text-[9px] text-red-600 mt-1.5 border-t border-black/5 pt-1.5">
                                    Takes damage triggers:{' '}
                                    <b>
                                      {encNode.on_actor_takes_damage?.action ||
                                        'None'}
                                    </b>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* Social & Conversational Encounters Matrix */}
                      {scene.social_encounters &&
                        scene.social_encounters.length > 0 && (
                          <div className="border border-blue-200 p-3 rounded bg-blue-50/15 col-span-1 md:col-span-2">
                            <span className="font-bold text-blue-900 text-[10px] uppercase block border-b border-blue-200 pb-1 mb-2 flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-blue-800 animate-pulse" />{' '}
                              Conversational Encounters
                            </span>
                            <div className="flex flex-col gap-3">
                              {scene.social_encounters.map(
                                (socNode: any, sIdx: number) => (
                                  <div
                                    key={sIdx}
                                    className="bg-white border border-blue-250 p-3 rounded text-[10.5px]"
                                  >
                                    <div className="flex justify-between items-baseline mb-1">
                                      <span className="font-sans font-bold text-xs text-blue-900">
                                        {socNode.npc_name}
                                      </span>
                                      <code className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded uppercase font-bold font-mono">
                                        ID: {socNode.npc_id}
                                      </code>
                                    </div>
                                    <p className="text-neutral-700 italic border-l-2 border-blue-200 pl-2.5 py-1 my-2 bg-neutral-50/50 leading-relaxed font-sans">
                                      {socNode.context}
                                    </p>

                                    <div className="mt-2 flex flex-col gap-2">
                                      <span className="text-[9.5px] text-neutral-450 uppercase font-black tracking-wide font-sans">
                                        Mechanical Skill Challenges
                                      </span>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {socNode.skill_challenges.map(
                                          (chal: any, cIdx: number) => {
                                            const challengeId =
                                              generateChallengeId(
                                                scId,
                                                'soc',
                                                socNode.id || socNode.npc_id,
                                                chal.skill,
                                              );
                                            return (
                                              <div
                                                key={cIdx}
                                                id={`scene-challenge-anchor-${challengeId}`}
                                                className="bg-neutral-955 text-[#F5F2E9] p-3 rounded-lg border border-neutral-800 flex flex-col justify-between gap-2 cursor-default transition-all shadow-sm select-all text-left scroll-mt-24"
                                              >
                                                <div className="flex justify-between items-center text-stone-400 font-extrabold uppercase tracking-widest text-[8px] border-b border-neutral-800/80 pb-1.5">
                                                  <span>🎯 {chal.skill}</span>
                                                  <span className="text-amber-400">
                                                    DC {chal.dc}
                                                  </span>
                                                </div>
                                                <div className="font-serif font-black text-xs text-amber-300 bg-black/45 px-2.5 py-1.5 rounded border border-neutral-900 text-center tracking-wide select-all leading-snug">
                                                  {getImaginativeTitleFromId(
                                                    challengeId,
                                                    socNode.npc_name ||
                                                      socNode.npc_id,
                                                    chal.skill,
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>

                                    {socNode.dialogue_tree_id && (
                                      <div className="mt-2.5 pt-2.5 border-t border-dashed border-blue-100 flex items-center gap-2 text-[9.5px] text-blue-800">
                                        <Workflow className="w-3.5 h-3.5 text-blue-600" />
                                        <span>
                                          Branching Dialog Tree Anchor:{' '}
                                        </span>
                                        <code className="font-bold underline uppercase bg-blue-50 px-1 py-0.5 rounded text-blue-900">
                                          {socNode.dialogue_tree_id}
                                        </code>
                                      </div>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                      {/* Exploration Encounters Matrix */}
                      {scene.exploration_encounters &&
                        scene.exploration_encounters.length > 0 && (
                          <div className="border border-emerald-200 p-3 rounded bg-emerald-50/15 col-span-1 md:col-span-2">
                            <span className="font-bold text-emerald-900 text-[10px] uppercase block border-b border-emerald-200 pb-1 mb-2 flex items-center gap-1.5">
                              <Compass className="w-3.5 h-3.5 text-emerald-800 animate-pulse" />{' '}
                              Exploration Encounters
                            </span>
                            <div className="flex flex-col gap-3">
                              {scene.exploration_encounters.map(
                                (expNode: any, eSIdx: number) => (
                                  <div
                                    key={eSIdx}
                                    className="bg-white border border-emerald-250 p-3 rounded text-[10.5px]"
                                  >
                                    <div className="flex justify-between items-baseline mb-1">
                                      <span className="font-sans font-bold text-xs text-emerald-900">
                                        {expNode.name}
                                      </span>
                                      <code className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded uppercase font-bold font-mono">
                                        HAZARD / FEATURE:{' '}
                                        {expNode.hazard_or_feature}
                                      </code>
                                    </div>
                                    <p className="text-neutral-700 italic border-l-2 border-emerald-200 pl-2.5 py-1 my-2 bg-neutral-50/50 leading-relaxed font-sans">
                                      {expNode.context}
                                    </p>

                                    <div className="mt-2 flex flex-col gap-2">
                                      <span className="text-[9.5px] text-neutral-450 uppercase font-black tracking-wide font-sans">
                                        Mechanical Skill Challenges
                                      </span>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {expNode.skill_challenges.map(
                                          (chal: any, cIdx: number) => {
                                            const challengeId =
                                              generateChallengeId(
                                                scId,
                                                'exp',
                                                expNode.id || expNode.name,
                                                chal.skill,
                                              );
                                            return (
                                              <div
                                                key={cIdx}
                                                id={`scene-challenge-anchor-${challengeId}`}
                                                className="bg-neutral-955 text-[#F5F2E9] p-3 rounded-lg border border-neutral-800 flex flex-col justify-between gap-2 cursor-default transition-all shadow-sm select-all text-left scroll-mt-24"
                                              >
                                                <div className="flex justify-between items-center text-stone-400 font-extrabold uppercase tracking-widest text-[8px] border-b border-neutral-800/80 pb-1.5">
                                                  <span>🎯 {chal.skill}</span>
                                                  <span className="text-amber-400">
                                                    DC {chal.dc}
                                                  </span>
                                                </div>
                                                <div className="font-serif font-black text-xs text-amber-300 bg-black/45 px-2.5 py-1.5 rounded border border-neutral-900 text-center tracking-wide select-all leading-snug">
                                                  {getImaginativeTitleFromId(
                                                    challengeId,
                                                    expNode.name || expNode.id,
                                                    chal.skill,
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          },
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Connected Screenplays */}
                    {scene.screenplays_attached &&
                      scene.screenplays_attached.length > 0 && (
                        <div className="border-t border-neutral-200 pt-3 flex flex-col gap-1.5 text-[10.5px]">
                          <span className="text-neutral-600 uppercase text-[9px] font-extrabold tracking-wide block">
                            Connected Screenplays (
                            {scene.screenplays_attached.length})
                          </span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {scene.screenplays_attached.map((spId: string) => {
                              const screenInfo =
                                activeAdventure.definitions.screenplays[spId];
                              return (
                                <div
                                  key={spId}
                                  className="px-2 py-0.5 rounded border text-[9.5px] font-mono bg-neutral-100 border-neutral-250 text-neutral-700 flex items-center gap-1.5 font-semibold"
                                >
                                  🎥 <span>{screenInfo?.name || spId}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    {/* Scene Transition list */}
                    {scene.outcomes && scene.outcomes.length > 0 && (
                      <div className="border-t border-neutral-200 pt-3 flex flex-col gap-1 text-[10.5px] text-neutral-500">
                        <span className="text-neutral-600 uppercase text-[9px] font-extrabold tracking-wide block">
                          Scripted Scene Transition Paths Outcomes
                          Quick-Reference
                        </span>
                        {scene.outcomes.map((out: any, oIdx: number) => (
                          <div key={oIdx} className="flex gap-2 items-center">
                            <span className="bg-neutral-100 border px-1 rounded text-black text-[9px]">
                              IF
                            </span>
                            <span className="font-bold text-neutral-800">
                              {out.condition}
                            </span>
                            <span className="text-neutral-400">
                              → Transition:
                            </span>
                            {out.next_scene_id && (
                              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 rounded border border-emerald-200">
                                {out.next_scene_id}
                              </span>
                            )}
                            {out.script_id && (
                              <span className="text-indigo-700 font-bold bg-indigo-50 px-1.5 rounded border border-indigo-200">
                                Execute Script [{out.script_id}]
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 11.5: MECHANICAL SKILL CHALLENGES MATRIX */}
          <MechanicalSkillChallenges activeAdventure={activeAdventure} />

          {/* SECTION 13: INTEGRATED SCREENPLAY PERFORMANCE BLOCKS */}
          <section
            id="section-screenplays"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Film className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                screenplay
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entries(activeAdventure.definitions.screenplays).map(
                ([spId, screen]) => (
                  <div
                    key={spId}
                    className="border border-neutral-350 bg-white rounded p-4 shadow-2xs flex flex-col gap-3 font-mono"
                  >
                    <div className="border-b border-neutral-200 pb-2 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-[10px] font-bold uppercase text-amber-800 tracking-wider">
                          Cinematic
                        </span>
                        <span className="font-mono text-[9px] uppercase font-bold text-neutral-400">
                          ID: {spId}
                        </span>
                      </div>
                      <h3 className="font-serif text-sm font-black text-neutral-900">
                        &ldquo;{screen.name}&rdquo;
                      </h3>
                      <div className="font-mono text-[9px] text-neutral-700 bg-neutral-100 uppercase px-1.5 py-0.5 rounded w-fit tracking-wider mt-1">
                        Scene Location:{' '}
                        <b className="text-black">{screen.slugline.text}</b>
                      </div>
                      {screen.slugline.vtt_automation && (
                        <div className="flex flex-wrap gap-1.5 text-[8.5px] font-mono mt-1.5 text-neutral-500">
                          {screen.slugline.vtt_automation.lighting &&
                            screen.slugline.vtt_automation.lighting !==
                              'bright_warm_light' && (
                              <span className="bg-amber-100/60 text-amber-800 px-1.5 py-0.5 rounded">
                                💡 LGT:{' '}
                                <b>{screen.slugline.vtt_automation.lighting}</b>
                              </span>
                            )}
                          {screen.slugline.vtt_automation.sfx &&
                            screen.slugline.vtt_automation.sfx !==
                              'sfx_storm_fading' && (
                              <span className="bg-emerald-100/60 text-emerald-800 px-1.5 py-0.5 rounded">
                                🔊 SFX:{' '}
                                <b>{screen.slugline.vtt_automation.sfx}</b>
                              </span>
                            )}
                          {screen.slugline.vtt_automation.vfx && (
                            <span className="bg-rose-100/60 text-rose-800 px-1.5 py-0.5 rounded">
                              ✨ VFX:{' '}
                              <b>{screen.slugline.vtt_automation.vfx}</b>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 text-[10px] leading-relaxed bg-neutral-50/50 p-2.5 rounded border border-neutral-200">
                      {screen.screenplay_blocks.map(
                        (block: any, bIdx: number) => {
                          if (block.type === 'character') {
                            return (
                              <div
                                key={bIdx}
                                className="text-center font-bold text-neutral-950 uppercase mt-1.5 tracking-wide font-sans"
                              >
                                {block.name}
                              </div>
                            );
                          }
                          if (block.type === 'dialogue') {
                            return (
                              <div
                                key={bIdx}
                                className="text-center font-sans px-4 text-neutral-800 italic leading-snug"
                              >
                                &ldquo;{block.text}&rdquo;
                              </div>
                            );
                          }
                          if (block.type === 'action_line') {
                            return (
                              <div
                                key={bIdx}
                                className="text-neutral-600 leading-normal pl-2 border-l border-neutral-300 font-sans my-0.5"
                              >
                                {block.text}
                              </div>
                            );
                          }
                          if (block.type === 'parenthetical') {
                            return (
                              <div
                                key={bIdx}
                                className="text-center text-neutral-500 italic text-[9px] -mt-1 font-sans"
                              >
                                ({block.text})
                              </div>
                            );
                          }
                          if (block.type === 'vtt_animation') {
                            return (
                              <div
                                key={bIdx}
                                className="text-[8.5px] bg-neutral-100 text-neutral-500 uppercase px-1.5 py-0.5 rounded flex items-center justify-center gap-1 border border-dashed border-neutral-200 italic mt-1 self-center"
                              >
                                💡 Play {block.animation_clip} on{' '}
                                {block.target_id || 'Any'}
                              </div>
                            );
                          }
                          return null;
                        },
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* SECTION 14: BRANCH CONVERSATIONAL DIALOGUE TREES */}
          <section
            id="section-dialogue-trees"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <MessageSquare className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Dialectical Trees
              </h2>
            </div>

            <div className="flex flex-col gap-4 font-mono text-xs">
              <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9.5px]">
                Dialogue Trees Maps Matrix
              </span>
              {entries(activeAdventure.definitions.dialogue_trees).map(
                ([treeId, tree]) => (
                  <div
                    key={treeId}
                    className="border border-neutral-300 rounded overflow-hidden shadow-inner bg-white/80 font-mono"
                  >
                    <div className="bg-neutral-800 text-amber-500 px-4 py-2 font-bold text-[10.5px]">
                      TREE SCHEMA ID: {treeId.toUpperCase()}
                    </div>

                    <div className="p-4 flex flex-col gap-6">
                      {entries(tree.nodes).map(([nodeKey, node]) => (
                        <div
                          key={nodeKey}
                          className="border-l-4 border-neutral-700 pl-4 py-1.5 flex flex-col gap-2.5"
                        >
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-neutral-900 uppercase tracking-wide">
                              Conversation Key: [&apos;{nodeKey}&apos;]
                            </span>
                          </div>
                          {node.speaking_intent && (
                            <div className="text-[10px] text-amber-800 font-semibold bg-amber-500/10 border border-amber-600/20 px-2.5 py-1 rounded font-mono flex items-center gap-1.5 self-start">
                              🗣️ Intent:{' '}
                              <span className="font-sans font-medium text-neutral-700 normal-case">
                                {node.speaking_intent}
                              </span>
                            </div>
                          )}
                          <div className="font-serif text-[12.5px] italic text-[#4c4546] bg-[#fafafa] rounded p-3 leading-relaxed border border-neutral-200">
                            Proposal: &ldquo;{node.npc_text}&rdquo;
                          </div>
                          <div className="flex flex-col gap-1.5 pl-2 mt-1">
                            <span className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider mb-1 block">
                              Player Option Speeches
                            </span>
                            {node.player_options.map(
                              (opt: any, oIdx: number) => (
                                <div
                                  key={oIdx}
                                  className="bg-neutral-50 border border-neutral-200/50 p-2.5 rounded text-[10.5px] flex flex-col gap-1.5 leading-snug font-mono"
                                >
                                  <span className="font-serif text-xs font-bold text-slate-800">
                                    &ldquo;{opt.text}&rdquo;
                                  </span>

                                  <div className="flex gap-4 text-[9px] text-neutral-500 uppercase mt-1 pt-1 border-t border-black/5">
                                    <span>
                                      Target next Node:{' '}
                                      <b className="text-black">
                                        {opt.next_node}
                                      </b>
                                    </span>
                                    {opt.trigger_script && (
                                      <span>
                                        Macro script loop:{' '}
                                        <b className="text-indigo-600 font-bold">
                                          {opt.trigger_script}
                                        </b>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* SECTION 15: HANDOUT CONSOLE & TEXTS */}
          <section
            id="section-handouts"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <FileText className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Handouts
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                Clue Prop Handout Matrices
              </span>
              <div className="flex flex-col gap-4">
                {entries(activeAdventure.definitions.handouts).map(
                  ([hKey, hand]) => (
                    <div
                      key={hKey}
                      className="border-2 border-[#d97706]/40 p-6 rounded bg-[#faf7ef] flex gap-4 items-start shadow-sm"
                    >
                      <FileText className="w-7 h-7 text-[#d97706] shrink-0 mt-1" />
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-[#d97706]/20 pb-1.5 font-mono text-xs">
                          <span className="font-black text-[#b45309] uppercase">
                            {hKey.replace(/_/g, ' ')}
                          </span>
                          <code className="text-[10px] bg-amber-500/10 text-amber-800 px-1.5 py-0.5 rounded uppercase font-bold">
                            TYPE: {hand.type}
                          </code>
                        </div>
                        <p className="font-serif italic text-neutral-800 text-base leading-relaxed leading-7 pl-2 border-l-2 border-[#d97706]/20">
                          &ldquo;{hand.content}&rdquo;
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* SECTION 16.5: GLOBAL TRIGGER PROCEDURES */}
          <section
            id="section-global-procedures"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Sparkles className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Procedures
              </h2>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs w-full">
              <span className="font-bold text-neutral-500 uppercase text-[9.5px] border-b border-neutral-200 pb-1 flex items-center gap-1.5">
                Environmental & System Procedural Schedules
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entries(activeAdventure.procedures).map(([pKey, pVal]) => (
                  <div
                    key={pKey}
                    className="p-4 bg-[#FAF7EF] border border-[#d97706]/40 rounded flex flex-col gap-3 font-mono shadow-xs"
                  >
                    <div className="flex justify-between items-baseline border-b border-neutral-300 pb-1.5 font-mono">
                      <span className="font-bold text-neutral-900 text-sm font-serif uppercase">
                        {pVal.name}
                      </span>
                      <code className="text-[9px] bg-[#d97706]/10 text-[#d97706] px-2 py-0.5 font-bold uppercase rounded">
                        {pKey}
                      </code>
                    </div>
                    <div className="text-[11px] text-neutral-700 leading-snug font-mono">
                      {pVal.description && (
                        <p className="font-sans text-neutral-500 italic text-[11px] leading-snug mb-3 p-2 bg-[#F5F2E9]/60 border border-amber-600/10 rounded">
                          {pVal.description}
                        </p>
                      )}
                      <div className="flex justify-between mb-1.5">
                        <span className="text-neutral-500">
                          Trigger Mechanism:
                        </span>
                        <b className="text-black font-semibold uppercase">
                          {pVal.trigger.type}
                        </b>
                      </div>
                      <div className="mt-2 pt-2 border-t border-dashed border-neutral-250">
                        {(() => {
                          const assocSeqId = pVal.script_assoc;
                          return (
                            <div className="flex justify-between items-baseline">
                              <span className="text-[9.5px] uppercase font-bold text-indigo-750 font-mono">
                                Sequence:
                              </span>
                              <span className="text-[10px] text-neutral-850 font-bold lowercase select-all font-mono">
                                {assocSeqId || 'None'}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 16: PROGRAMMATIC ACTION SEQUENCES */}
          <section
            id="section-automation-logic"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Code className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Sequences
              </h2>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {entries(activeAdventure.scripts)
                  .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
                  .map(([sKey, sValue]) => (
                    <div
                      key={sKey}
                      className="p-4 bg-white border border-neutral-300 rounded flex flex-col gap-2 shadow-xs"
                    >
                      <div className="flex justify-between items-baseline border-b border-neutral-200 pb-1.5 mb-1.5">
                        <span className="font-bold text-indigo-900 text-sm">
                          {sKey}
                        </span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-800 px-1.5 py-0.5 rounded font-bold uppercase">
                          {sValue.sequence?.length || 0} step(s)
                        </span>
                      </div>
                      {sValue.description && (
                        <p className="font-sans text-neutral-500 italic text-[11px] leading-snug mb-1">
                          {sValue.description}
                        </p>
                      )}
                      <div className="grid grid-cols-1 gap-3 pl-1.5">
                        {sValue.sequence?.map((step: any, sIdx: number) => (
                          <div
                            key={sIdx}
                            className="text-[10px] text-neutral-600 bg-neutral-50/70 border border-neutral-200 p-2.5 rounded flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex justify-between font-bold text-neutral-800 text-[10.5px] border-b border-neutral-200 pb-1 mb-1">
                                <span>Step {sIdx + 1}</span>
                                <code className="text-indigo-700 font-bold uppercase">
                                  {step.type}
                                </code>
                              </div>

                              {step.effect && (
                                <div className="mb-2 bg-indigo-50/50 border border-indigo-100/40 p-2 rounded text-[10px] text-indigo-900 italic font-mono leading-normal">
                                  <span className="font-extrabold uppercase text-[8.5px] text-indigo-700 not-italic block mb-0.5 font-sans">
                                    Effect:
                                  </span>
                                  &ldquo;{step.effect}&rdquo;
                                </div>
                              )}

                              <div className="font-mono text-[9.5px] text-neutral-500 max-w-full break-all whitespace-pre-wrap leading-tight mt-1 flex flex-col gap-1">
                                {entries(step)
                                  .filter(
                                    ([k]) => k !== 'type' && k !== 'effect',
                                  )
                                  .map(([k, v]) => (
                                    <div
                                      key={k}
                                      className="flex justify-between gap-2 border-b border-neutral-100/30 pb-0.5"
                                    >
                                      <span className="text-neutral-450 font-bold uppercase text-[8.5px] shrink-0">
                                        {k}:
                                      </span>
                                      <span className="text-neutral-800 text-right font-semibold">
                                        {typeof v === 'object'
                                          ? JSON.stringify(v)
                                          : String(v)}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* SECTION 17D: SCRIPT SIGNATURES REGISTRY */}
          <ScriptsRegistry />

          {/* SECTION 17: TABLE MATRIX & LORE ROLLS */}
          <section
            id="section-dice-tables"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Scroll className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Roll Tables
              </h2>
            </div>

            <div className="flex flex-col gap-4 font-mono text-xs">
              {entries(activeAdventure.definitions.tables).map(
                ([tableName, table]) => (
                  <div
                    key={tableName}
                    className="border border-neutral-300 rounded overflow-hidden shadow-sm bg-white"
                  >
                    <div className="bg-neutral-800 text-amber-500 border-b border-neutral-300 px-4 py-2 flex justify-between items-center text-[10.5px] font-bold">
                      <span>
                        TABLE_ID: {tableName.toUpperCase()} ({table.name})
                      </span>
                      <span className="text-stone-300 uppercase py-0.5 font-mono text-[9px]">
                        DICE: {table.roll_type}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 font-mono">
                      <span className="text-[9.5px] uppercase font-bold text-neutral-400 block border-b border-neutral-200 pb-1">
                        Matrix Rows Outcome list
                      </span>
                      <div className="flex flex-col gap-1.5 text-[10.5px] text-neutral-700 font-mono">
                        {table.entries.map((ent: any, eIdx: number) => (
                          <div
                            key={eIdx}
                            className="flex justify-between items-center py-1 border-b border-neutral-100 last:border-b-0"
                          >
                            <div className="flex gap-3">
                              <span className="text-amber-700 font-bold w-12 text-left bg-amber-50 border border-amber-200/50 rounded text-center block">
                                [{ent.roll}]
                              </span>
                              <span className="font-serif font-medium text-neutral-900">
                                {ent.name}
                              </span>
                            </div>
                            <span className="text-[9px] text-neutral-400">
                              Affiliated script ID:{' '}
                              <code className="text-black">
                                {ent.script_id
                                  ? ent.script_id.replace(/^script_/, '')
                                  : 'None'}
                              </code>
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-neutral-200 pt-3 mt-1.5">
                        <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1">
                          Automated Roll Hook Coordinates
                        </span>
                        <div className="bg-neutral-100 p-2 border rounded text-xs text-neutral-600 truncate">
                          Trigger:{' '}
                          <span className="font-bold text-black">
                            {table.auto_trigger.event_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* SECTION 17C: REACTIVE TRIGGER MECHANISMS (PROCEDURES, COMPLICATIONS, ENVIRONMENT) */}
          <TriggerMechanisms subject={activeAdventure} />

          {/* SECTION 11.5: SCRIPTED STORY TRANSITION PATHS & DIRECTORIAL OUTCOMES */}
          <section
            id="section-story-transitions"
            className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-black pb-3">
              <Workflow className="w-5 h-5 text-neutral-700" />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                Scripted Paths
              </h2>
            </div>

            <p className="font-serif text-sm text-neutral-700 leading-relaxed">
              This panel aggregates and maps the full narrative
              finite-state-machine of the campaign. Under critical parameters
              (such as accepted quests, resolved secrets, or boss defeat
              conditions), directional pointers navigate players to the next
              stage within the global Campaign Master coordinates.
            </p>

            <div className="grid grid-cols-1 gap-4 font-mono text-xs">
              {entries(activeAdventure.scenes).map(([scId, scene]) => (
                <div
                  key={scId}
                  className="border border-neutral-300 rounded p-4 bg-white/85 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex flex-col gap-1 w-full md:w-1/4">
                    <span className="font-serif font-black text-sm uppercase text-neutral-900">
                      {scId.replace('scene_', '').replace(/_/g, ' ')}
                    </span>
                    <span className="text-[9px] text-neutral-500 uppercase font-bold select-none">
                      Anchor ID:{' '}
                      <code className="text-neutral-850 text-[9.5px] uppercase">
                        {scId}
                      </code>
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-2.5 w-full md:max-w-2xl">
                    {scene.outcomes && scene.outcomes.length > 0 ? (
                      scene.outcomes.map((out: any, oIdx: number) => (
                        <div
                          key={oIdx}
                          className="bg-neutral-50 border border-neutral-250 p-2.5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[10px]"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-neutral-800 text-neutral-200 px-1 py-0.25 rounded text-[8.5px] font-bold tracking-wider">
                              IF STATE PARAMETER
                            </span>
                            <code className="bg-stone-100 text-stone-800 font-bold px-1.5 py-0.5 rounded border border-neutral-300 font-mono text-[9.5px]">
                              {out.condition}
                            </code>
                          </div>
                          <div className="flex items-center gap-1.5 self-end sm:self-auto">
                            <span className="text-neutral-400">
                              ➔ Route Link:
                            </span>
                            {out.next_scene_id && (
                              <span className="text-emerald-800 font-sans font-bold bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300 text-[10.5px]">
                                Scene:{' '}
                                {out.next_scene_id
                                  .replace('scene_', '')
                                  .replace(/_/g, ' ')}
                              </span>
                            )}
                            {out.script_id && (
                              <span className="text-indigo-800 font-sans font-semibold bg-indigo-100/60 px-2 py-0.5 rounded border border-indigo-300 text-[10.5px]">
                                Script: {out.script_id}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-neutral-400 italic text-[10px] self-end md:self-auto select-none">
                        &bull; Programmatic End-Point Terminus
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 17D: TENSION & COMPLICATION CAUSES */}
          <TensionComplicationCauses subject={activeAdventure} />

          {/* SECTION 18: DYNAMIC WORKPLACE STATE PARAMETERS */}
          <section
            id="section-world-state-ledger"
            className="border border-black p-6 rounded bg-stone-900 text-stone-200 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 border-b border-stone-700 pb-3">
              <Activity
                className="w-5 h-5 text-indigo-400 animate-pulse"
                strokeWidth={2.5}
              />
              <h2 className="font-serif text-xl font-black uppercase tracking-wide text-white">
                Event State
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
              {/* parameters lists */}
              <div className="flex flex-col gap-3">
                <span className="font-bold text-indigo-400 uppercase tracking-wider text-[9.5px] block border-b border-stone-800 pb-1 mb-1">
                  Primitive Variables Directory
                </span>
                <div className="bg-stone-950 p-4 border border-stone-800 rounded flex flex-col gap-2.5 font-mono text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-400">TIME_ELAPSED:</span>
                    <b className="text-white text-sans">
                      {activeAdventure.world_state.time_elapsed_hours} Hours
                    </b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">CURRENT_TIME_CLOCK:</span>
                    <b className="text-white text-sans">
                      {activeAdventure.world_state.current_time_of_day} h
                    </b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">
                      TENSION_POOL_DICE_COUNT:
                    </span>
                    <b className="text-rose-400 text-sans font-bold">
                      {activeAdventure.world_state.tension_pool_current_dice} /
                      d6
                    </b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">
                      ACTIVE_RUNNING_SCENE:
                    </span>
                    <b className="text-[#3b82f6] text-mono">
                      {activeAdventure.world_state.active_scene}
                    </b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">
                      ACTIVE_ENVIRONMENT_PRESET:
                    </span>
                    <b className="text-emerald-400 text-mono">
                      {activePresetId}
                    </b>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-stone-800 pt-2 mt-1">
                    <span className="text-stone-500 uppercase text-[9px] block">
                      Completed Scenes List
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {activeAdventure.world_state.completed_scenes.map(
                        (cs: any, idx: number) => (
                          <span
                            key={idx}
                            className="bg-stone-800 px-1.5 py-0.5 rounded text-[10px] text-stone-300 font-mono"
                          >
                            {cs}
                          </span>
                        ),
                      )}
                    </div>

                    <span className="text-stone-500 uppercase text-[9px] block mt-2.5 border-t border-stone-850 pt-2">
                      Discovered Clues List
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {activeAdventure.world_state.discovered_clues &&
                      activeAdventure.world_state.discovered_clues.length >
                        0 ? (
                        activeAdventure.world_state.discovered_clues.map(
                          (clue: any, idx: number) => (
                            <span
                              key={idx}
                              className="bg-stone-800 px-1.5 py-0.5 rounded text-[10px] text-amber-400 font-mono"
                            >
                              {clue}
                            </span>
                          ),
                        )
                      ) : (
                        <span className="text-stone-500 italic text-[10px]">
                          None
                        </span>
                      )}
                    </div>

                    <span className="text-stone-500 uppercase text-[9px] block mt-2.5 border-t border-stone-850 pt-2">
                      Unlocked Secrets List
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {activeAdventure.world_state.unlocked_secrets &&
                      activeAdventure.world_state.unlocked_secrets.length >
                        0 ? (
                        activeAdventure.world_state.unlocked_secrets.map(
                          (sec: any, idx: number) => (
                            <span
                              key={idx}
                              className="bg-stone-800 px-1.5 py-0.5 rounded text-[10px] text-rose-400 font-mono"
                            >
                              {sec}
                            </span>
                          ),
                        )
                      ) : (
                        <span className="text-stone-500 italic text-[10px]">
                          None
                        </span>
                      )}
                    </div>

                    <span className="text-stone-500 uppercase text-[9px] block mt-2.5 border-t border-stone-850 pt-2">
                      Active Global Effects List
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {activeAdventure.world_state.active_global_effects &&
                      activeAdventure.world_state.active_global_effects.length >
                        0 ? (
                        activeAdventure.world_state.active_global_effects.map(
                          (eff: any, idx: number) => (
                            <span
                              key={idx}
                              className="bg-stone-800 px-1.5 py-0.5 rounded text-[10px] text-emerald-400 font-mono"
                            >
                              {eff}
                            </span>
                          ),
                        )
                      ) : (
                        <span className="text-stone-500 italic text-[10px]">
                          None
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* flags array block and attitudes */}
              <div className="flex flex-col gap-3">
                <span className="font-bold text-indigo-400 uppercase tracking-wider text-[9.5px] block border-b border-stone-800 pb-1 mb-1">
                  Active Flag configurations & alignment
                </span>
                <div className="bg-stone-950 p-4 border border-stone-800 rounded flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-indigo-400 uppercase text-[9px] block font-bold tracking-widest">
                      Global Alignment Parameters
                    </span>
                    <div className="flex flex-col gap-2 text-[10px] text-stone-300 font-mono">
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Weather alignment:
                        </span>
                        <b className="text-amber-400 text-right">
                          {activeAdventure.world_state.weather_vector || 'None'}
                        </b>
                      </div>
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Leyline Arcane Sync:
                        </span>
                        <b className="text-[#38bdf8] text-right">
                          {activeAdventure.world_state.leyline_resonance ||
                            '0% Ratio'}
                        </b>
                      </div>
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Party Challenge level:
                        </span>
                        <b className="text-amber-500 text-right">
                          {activeAdventure.world_state.challenge_rating_tier ||
                            'Level 4 Challenge'}
                        </b>
                      </div>
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Tomb Collapse Tracker:
                        </span>
                        <b className="text-rose-400 text-right">
                          {activeAdventure.world_state
                            .time_before_tomb_collapse || 'Infinite'}
                        </b>
                      </div>
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Incident Threat vector:
                        </span>
                        <b className="text-emerald-400 text-right">
                          {activeAdventure.world_state.critical_doom_factor ||
                            'Green Level 1'}
                        </b>
                      </div>
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Planar Reality Stability:
                        </span>
                        <b className="text-violet-400 text-right">
                          {activeAdventure.world_state.planar_instability ||
                            '100% Stable'}
                        </b>
                      </div>
                      <div className="flex justify-between border-b border-stone-900/60 pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Sanctuary Ward Power:
                        </span>
                        <b className="text-blue-400 text-right">
                          {activeAdventure.world_state.sanctuary_ward_level ||
                            'Ward Offline'}
                        </b>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-stone-500 font-medium font-sans">
                          Local Gravity Anomaly:
                        </span>
                        <b className="text-[#e0f2fe] text-right">
                          {activeAdventure.world_state
                            .anomaly_gravitational_pull || '1.00g Normal'}
                        </b>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 border-t border-stone-800 pt-3">
                    <span className="text-stone-500 uppercase text-[9px] block">
                      Flags values matrix
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-300">
                      {entries(activeAdventure.world_state.flags).map(
                        ([flag, val]) => (
                          <div
                            key={flag}
                            className="flex justify-between border-b border-stone-900 pb-1"
                          >
                            <span className="text-stone-500">{flag}:</span>
                            <b
                              className={
                                val
                                  ? 'text-emerald-400 font-bold'
                                  : 'text-stone-500 font-normal'
                              }
                            >
                              {String(val)}
                            </b>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 border-t border-stone-800 pt-2.5">
                    <span className="text-stone-500 uppercase text-[9px] block">
                      Factions Attitudes map
                    </span>
                    {entries(activeAdventure.world_state.dynamic_factions).map(
                      ([fName, val]) => (
                        <div
                          key={fName}
                          className="flex justify-between text-[10px] text-stone-300 pb-1 font-mono"
                        >
                          <span className="text-stone-500">
                            {fName.replace(/_/g, ' ')}:
                          </span>
                          <b className="text-emerald-400 uppercase">
                            {val.attitude_to_party}
                          </b>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Clues matrix */}
              <div className="col-span-1 md:col-span-2 border-t border-stone-800 pt-3">
                <div className="flex flex-col gap-2">
                  <span className="text-stone-500 uppercase text-[9.5px] font-bold block mb-1">
                    Discovered Clue Keys
                  </span>
                  <div className="flex flex-wrap gap-2 animate-none">
                    {activeAdventure.world_state.discovered_clues.map(
                      (clue: any, idx: number) => (
                        <span
                          key={idx}
                          className="bg-stone-800 border border-stone-700 px-2 py-1 text-[10px] text-indigo-300 font-bold rounded"
                        >
                          ✓ {clue}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 19: UNCOLLAPSED RAW SCHEMA DUMP CODEBLOCK */}
          <section
            id="section-source-json-dump"
            className="border-2 border-dashed border-black p-6 rounded bg-[#ededed]/15 flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-black/10 pb-4 gap-2">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-neutral-800" />
                <div>
                  <h2 className="font-serif text-xl font-black uppercase tracking-wide">
                    Full Schema
                  </h2>
                  <p className="font-mono text-[9px] text-neutral-500 uppercase mt-0.5 leading-none">
                    Every Parameter, Variable, Nested Coordinate and Logic
                    Branch is Represented Below
                  </p>
                </div>
              </div>
              <span className="font-mono text-[9.5px] bg-black text-amber-500 px-2.5 py-0.5 rounded font-bold uppercase">
                COMPLETE RAW DATA // READY TO READ
              </span>
            </div>

            <p className="font-serif text-sm text-neutral-600 leading-relaxed negative-margins">
              As requested, the code block below renders the complete
              uncollapsed RPG Adventure Campaign state database tree. This
              guarantees absolute verification that every system configuration,
              timeline coordinate, screenplay line, and dialogue choice is
              accounted for under the hood. You can copy the code directly or
              use standard find queries across the entire parameters dictionary.
            </p>

            <div className="relative border border-black bg-stone-950 font-mono text-[10.5px] leading-relaxed text-stone-200 rounded p-5 overflow-auto max-h-[580px] scrollbar-thin shadow-2xl">
              <div className="absolute right-4 top-4 text-[9px] uppercase font-bold text-stone-500 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded select-none">
                UTF-8 // JSON FORMAT
              </div>
              <pre className="whitespace-pre select-text text-stone-300 font-mono">
                {JSON.stringify(activeAdventure, null, 2)}
              </pre>
            </div>
          </section>

          {/* SECTION 17B: ADVENTURE EXPERIENCE & PATH CALCULATOR SIMULATOR */}
          <AdventurePathCalculator subject={activeAdventure} />

          {/* LLM TELEMETRY & CONTEXT CAPACITY SECTION */}
          <LLMTokenTelemetry />
        </main>

        {/* ================= FOOTER CREDIT TAG ================= */}
        <footer
          id="campaign-footer"
          className="text-center border-t border-black/15 py-8 mt-6 font-mono text-[9px] uppercase tracking-widest text-[#5e5e5e]"
        >
          © 2026 Camp Candor
        </footer>
      </div>
    </div>
  );
}
