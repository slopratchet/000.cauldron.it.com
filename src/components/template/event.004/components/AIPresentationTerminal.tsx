/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import type { Adventure } from '../types';
import {
  Terminal,
  Cpu,
  Play,
  CheckCircle,
  AlertOctagon,
  HelpCircle,
} from 'lucide-react';

interface AIPresentationTerminalProps {
  onAddCustomAdventure: (newAdventure: Adventure) => void;
  onNavigateToScanner: () => void;
}

const ADVENTURE_PRESETS = [
  {
    name: 'CORRAL OF THE REEF GHOST',
    prompt:
      'A level 3-5 maritime fantasy adventure where players investigate a glowing, sub-aquatic giant temple that has raised out of the reefs.',
  },
  {
    name: 'LAVA FOUNDRY OF AZIMUTH',
    prompt:
      'An industrial retro-vault beneath active volcanic crags, focusing on clockwork automatons, magma hazard levels, and heat shielding keys.',
  },
  {
    name: 'SPARK DECEIT CLOUD CASTLE',
    prompt:
      'A high-altitude sky palace of a melancholic Storm Giant tyrant, focusing on unstable levitation pads, soundwave echo wards, and lightning runic locks.',
  },
  {
    name: 'CRYPTS OF WHISPERING OAK',
    prompt:
      'A moody wood druid cemetery haunted by spore blights, containing a memory ritual puzzle inside hollow gargantuan trees.',
  },
];

export default function AIPresentationTerminal({
  onAddCustomAdventure,
  onNavigateToScanner,
}: AIPresentationTerminalProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedAdventure, setGeneratedAdventure] =
    useState<Adventure | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const runLogSequence = async (newAdventure: Adventure) => {
    const logSteps = [
      'SYNAPSE_SOCKET: PIPELINE SECURE...',
      'DIAGNOSTIC: VERIFYING TABLETOP SRD 5.2 RULES SCHEMATICS...',
      'CHRONOS_LOAD: GRAPH-NODE HEXMAP DIRECTORIES COMPILATION COMMENCING...',
      `PARSER: IDENTIFIED HEXES LOCATED {hex-00: village, hex-01: swamp, hex-02: tomb}...`,
      'CHRONOS_LOAD: LOADING INTEGRATED SCREENPLAYS INTRO / RESOLUTION SYSTEMS...',
      `SCHEMA_MAPPER: ENCODED MONSTER ${Object.keys(newAdventure.definitions.entities.monsters)[0] || 'enemy'} HP LEVELS...`,
      'CHRONOS_LOAD: TRANSLATING BRANCHING DIALOGUE NODES HUB FOR AGENT INTERFACE...',
      'SYNCHRONIZER: ALL HARDWARE DIAGNOSTICS DEPLOYED WITH SUCCESS.',
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogs((prev) => [...prev, `>>> ${logSteps[i]}`]);
    }

    // Conclude Generation
    onAddCustomAdventure(newAdventure);
    setGeneratedAdventure(newAdventure);
    setIsGenerating(false);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedAdventure(null);
    setErrorMsg('');
    setLogs([
      'STATUS_PING: CONNECTING TO CHRONOS AI ARCHITECTURE PIPELINE...',
      `>>> EMITTING PROMPT: "${prompt.trim()}"`,
      'STATUS_PING: FIRING PROXY LINK ENDPOINT /api/records/generate...',
    ]);

    try {
      const resp = await fetch('/api/records/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(
          errJson.error ||
            `Proxy connection error (Status code ${resp.status})`,
        );
      }

      const advData = (await resp.json()) as Adventure;

      // Update metadata IDs securely
      advData.meta.adventure_id =
        'GEN-' + Math.floor(100 + Math.random() * 900);

      // Print simulated retro VTT system logs
      await runLogSequence(advData);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.message || 'Failed to compile custom AI Adventure module.',
      );
      setLogs((prev) => [
        ...prev,
        '!!! EXCEPTION_TRAPPED: EMISSION PIPELINE ABORTED.',
        `!!! DUMPCAUSE: ${err.message || 'Unmapped core hardware response'}`,
      ]);
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 border-b border-black pb-6">
        <div className="flex justify-between items-end">
          <h2 className="font-sans text-2xl font-black uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-500 animate-pulse" />
            CHRONOS_AI_ADVENTURE_SYNTHESIZER
          </h2>
          <span className="font-mono text-xs text-gray-500 font-bold">
            GEMINI-3.5-FLASH // COMPILE_ONLINE
          </span>
        </div>
        <p className="font-serif text-base text-[#4c4546]">
          Leverage server-side artificial intelligence to generate an entire
          operational adventure module (including full interactive storylines,
          content filters, tension pools, celestial constraints, screenplays,
          custom hex grids, and branching dialogue nodes) on demand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* INPUT PANEL PROMPT GRID */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <form
            onSubmit={handleGenerate}
            className="border border-black p-5 rounded bg-white/20 flex flex-col gap-4"
          >
            <div className="font-mono text-xs text-gray-500 font-bold uppercase tracking-widest border-b border-black/15 pb-2">
              1.0 Define Campaign Narrative Specs
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-serif font-black text-sm text-black">
                Adventure Concept or Campaign Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal adventure module in detail. e.g., 'A flooded, bioluminescent cave maze ruled by a tragic aboleth where characters face water rising hazards and sanity-testing hallucinations...'"
                rows={4}
                className="w-full bg-[#FAF7EF] border-2 border-black p-3 text-sm font-mono focus:ring-1 focus:ring-black focus:outline-none focus:bg-white resize-none"
                disabled={isGenerating}
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-black text-parchment font-mono font-bold text-xs py-3 hover:bg-neutral-800 transition-colors uppercase tracking-widest disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-emerald-500" />{' '}
                  COMPILING ADVENTURE RECORDS...
                </>
              ) : (
                '✕ ACTIVATE REVERIE GENERATOR'
              )}
            </button>
          </form>

          {/* PRESSET SYSTEM CLIPS */}
          <div className="flex flex-col gap-3 font-mono">
            <span className="text-[10px] text-[#5e5e5e] font-bold uppercase tracking-wider block">
              SUGGESTED RETRO MODULE PRESETS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADVENTURE_PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isGenerating) setPrompt(p.prompt);
                  }}
                  disabled={isGenerating}
                  className="p-3 border border-black hover:bg-neutral-50 text-left cursor-pointer transition-colors text-xs flex flex-col gap-1.5 rounded-sm group uppercase"
                >
                  <b className="font-bold text-amber-600 block leading-tight">
                    {p.name}
                  </b>
                  <p className="text-[10px] text-gray-500 normal-case line-clamp-2 leading-relaxed">
                    {p.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOG TERMINAL INTERFACE PANEL */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="border border-black bg-stone-950 text-stone-300 rounded overflow-hidden flex flex-col h-[340px] font-mono text-xs shadow-md">
            <div className="bg-[#121212] px-3.5 py-2 border-b border-stone-800 text-[10px] text-stone-500 font-bold flex justify-between items-center shrink-0">
              <span>COMPILE_CONSOLE // TERMINAL OUTPUT</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin text-[10px]">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`leading-normal ${
                    log.startsWith('!!!')
                      ? 'text-rose-500 animate-pulse font-bold'
                      : log.startsWith('>>>')
                        ? 'text-amber-400 font-medium'
                        : 'text-stone-400'
                  }`}
                >
                  {log}
                </div>
              ))}
              {isGenerating && (
                <div className="text-emerald-500 animate-pulse italic mt-1 font-bold">
                  * Connecting to Gemini models... mapping Relational Node
                  schemas on database...
                </div>
              )}
              {logs.length === 0 && (
                <div className="text-stone-600 italic">
                  Systems idle. Formulate narrative parameters in the prompt
                  field to engage the live AI synthesizer loop.
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* GENERATE STABILITY BANNER */}
          {generatedAdventure && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-2 border-emerald-600 bg-emerald-500/5 text-emerald-800 font-mono text-xs rounded flex flex-col gap-3.5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <b className="font-bold uppercase tracking-tight block">
                    MODULE LOADED SUCCESSFULLY!
                  </b>
                  <span>
                    "{generatedAdventure.meta.title}" is ready and buffered into
                    RAM channels.
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onNavigateToScanner}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 text-center rounded border border-emerald-700 cursor-pointer text-[10px] tracking-wider uppercase"
                >
                  LOAD INTO 01_DOSSIER
                </button>
              </div>
            </motion.div>
          )}

          {errorMsg && (
            <div className="p-4 border-2 border-rose-600 bg-rose-500/5 text-rose-800 font-mono text-xs rounded flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <b className="font-bold uppercase block">COMPILATION ERROR</b>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
