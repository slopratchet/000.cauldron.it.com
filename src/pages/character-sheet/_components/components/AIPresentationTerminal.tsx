/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CharacterRecord } from '../types';
import { Terminal, Cpu, Play, CheckCircle, AlertOctagon } from 'lucide-react';

interface AIPresentationTerminalProps {
  onAddCustomSubject: (newSubject: CharacterRecord) => void;
  onNavigateToScanner: (id: string) => void;
}

const ARCHETYPE_PRESETS = [
  {
    name: 'GOTHIC BLOOD CLERIC',
    prompt:
      'A lawful evil blood cleric human resurrected in a gothic sunken cathedral, equipped with ancient brass scales',
  },
  {
    name: 'CLOCKWORK TINKERER',
    prompt:
      'An energetic chaotic good rock gnome wizard clockwork tinkerer carrying steam-whistles and copper wires',
  },
  {
    name: 'MISTY MOORS WARDEN',
    prompt:
      'A solitary neutral good wood elf ranger misty moors beastmaster carrying mossy hunting traps',
  },
  {
    name: 'ABYSSAL REAVER WARLOCK',
    prompt:
      'A cynical chaotic neutral tiefling warlock of the abyssal oceans with barnacle-covered leather armor',
  },
];

export default function AIPresentationTerminal({
  onAddCustomSubject,
  onNavigateToScanner,
}: AIPresentationTerminalProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedSubject, setGeneratedSubject] =
    useState<CharacterRecord | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const runLogSequence = async (newSubject: CharacterRecord) => {
    const scores = newSubject.definition.abilityScoreGeneration.scores;
    const itemsCount = Object.keys(newSubject.current.inventory.items).length;
    const logSteps = [
      'STATUS_PING: NEURAL PIPELINE ESTABLISHED...',
      'DIAGNOSTIC: LOADING UNIFIED D&D 5E PROTOCOLS via GEMINI-3.5-FLASH...',
      'CHRONOS_LINK: ATTEMPTING METADATA SWAP [HOST-PING 12ms]...',
      `DIAGNOSTIC: RESOLVING ABILITY VECTORS... STR=${scores.Strength}, INT=${scores.Intelligence}...`,
      `INVENTORY_COMPILE: LOADING ASSETS... ${itemsCount} HARDWARE SPECIFICATIONS COMPILED...`,
      'DIAGNOSTIC: COMPILING LORE ANOMALY MAPPER...',
      `ALIGNED_VEC: ${newSubject.identity.alignment.toUpperCase()} LOGGED SUCCESSFULLY.`,
      'CHRONOS_LINK: CHARACTER SYNTHESIS SECURE.',
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLogs((prev) => [...prev, `>>> ${logSteps[i]}`]);
    }

    // Conclude Generation
    onAddCustomSubject(newSubject);
    setGeneratedSubject(newSubject);
    setIsGenerating(false);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedSubject(null);
    setErrorMsg('');
    setLogs([
      'STATUS_PING: INITIALIZING CHRONOS COMPILATION SEQUENCE...',
      `>>> USER_PROMPT_EMITTED: "${prompt.trim()}"`,
      'STATUS_PING: RESOLVING PROXY LINK AT URL /api/records/generate...',
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
          errJson.error || `Proxy socket failure (Status ${resp.status})`,
        );
      }

      const charData = (await resp.json()) as CharacterRecord;
      const customId = 'custom_' + Date.now();

      // Update metadata IDs securely
      charData.meta.character_id = customId;
      charData.is_custom = true;

      // Slowly print console logs to look like an authentic retro interface
      await runLogSequence(charData);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to process Neural generation.');
      setLogs((prev) => [
        ...prev,
        '!!! EXCEPTION_TRAPPED: SYNTHESIS COMPILATION HALTED.',
        `!!! CAUSE_DUMP: ${err.message || 'Unknown hardware response state'}`,
      ]);
      setIsGenerating(false);
    }
  };

  const loadPreset = (presetText: string) => {
    if (isGenerating) return;
    setPrompt(presetText);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Banner / Guide */}
      <div className="flex flex-col gap-4 border-b border-black pb-6">
        <div className="flex justify-between items-end">
          <h2 className="font-sans text-2xl font-black uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-6 h-6 stroke-2" /> NEW_RECORD_SYNTHESIS
          </h2>
          <span className="font-mono text-xs text-[#5e5e5e] font-bold">
            NEURAL_MODALITY: FLASH_2.5_PRO // ONLINE
          </span>
        </div>
        <p className="font-serif text-base text-[#4c4546]">
          Establish a neural link with the{' '}
          <strong>Chronos Generation Matrix</strong> to synthesize completely
          custom, lore-authentic tabletop character records. Type an imaginative
          concept or use one of our archetypal core directives to initiate
          printing.
        </p>
      </div>

      {/* Preset Archetype Buttons */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-bold text-[#5e5e5e] uppercase tracking-wider block">
          SELECT_PRESET_DIRECTIVE_VECTOR:
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ARCHETYPE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => loadPreset(preset.prompt)}
              disabled={isGenerating}
              className="border border-black px-3 py-2 text-left bg-black/5 hover:bg-black hover:text-parchment transition-all text-[11px] font-mono leading-tight disabled:opacity-35 disabled:pointer-events-none uppercase font-bold"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Compiler Console Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Prompt Input Form */}
        <form
          onSubmit={handleGenerate}
          className="lg:col-span-5 flex flex-col gap-4 border border-black p-5 bg-[#eae7e7]/10"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5e5e5e] uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" /> DIRECTIVE_PROMPT_INPUT
          </div>

          <textarea
            placeholder="Describe your subject: age, abilities, race, weapons, background, unique quirks, specific items or visual characteristics..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            rows={5}
            className="w-full bg-parchment border-2 border-black p-3 text-sm font-mono focus:ring-1 focus:ring-black focus:outline-none resize-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-black text-parchment hover:bg-black/90 font-bold py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
          >
            <Play className="w-4.5 h-4.5 fill-current" />{' '}
            {isGenerating ? 'SYNTHESIZING...' : 'PRINT_NEW_DOSSIER_FILE'}
          </button>

          <span className="font-mono text-[10px] text-[#5e5e5e] uppercase text-center mt-1">
            Gemini key secures secure fullstack transit.
          </span>
        </form>

        {/* Live Terminal Output Console */}
        <div className="lg:col-span-7 flex flex-col border-2 border-black bg-black text-[#F5F2E9] font-mono text-[11px] h-80 relative overflow-hidden">
          <div className="bg-[#303030] border-b border-black text-[#f3f0f0] px-4 py-2 font-bold flex justify-between items-center text-[10px] uppercase">
            <span>CHRONOS_PRINTER_TERMINAL_V1.9</span>
            <span className="flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-orange-600 block" />{' '}
              LINE_ENGAGED
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 leading-relaxed font-mono">
            {logs.map((log, index) => (
              <div
                key={index}
                className={
                  log.startsWith('!!!')
                    ? 'text-orange-500 font-bold'
                    : log.startsWith('STATUS_PING')
                      ? 'text-teal-400'
                      : log.includes('SUCCESS') || log.includes('SECURE')
                        ? 'text-green-400 font-bold'
                        : 'text-gray-300'
                }
              >
                {log}
              </div>
            ))}
            {isGenerating && (
              <div className="text-amber-500 font-bold animate-pulse">
                &gt;&gt;&gt; COMPILING NEURAL TRANSLATIONS TO PHYSICAL MATRIX...{' '}
                <span className="inline-block animate-bounce">_</span>
              </div>
            )}
            {logs.length === 0 && (
              <div className="text-gray-500 italic text-center py-16 uppercase">
                Terminal clear. Awaiting directives...
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* Generated Record Receipt View */}
      {generatedSubject && (
        <div className="border-4 border-double border-black p-6 bg-[#eae7e7]/20 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-12 h-12 text-green-800 shrink-0 mt-1" />
            <div>
              <span className="font-mono text-xs font-bold text-green-800 uppercase tracking-widest mb-1">
                COMPILATION COMPLETE_SUCCESS
              </span>
              <h2 className="font-sans text-2xl font-black uppercase">
                {generatedSubject.identity.name}
              </h2>
              <p className="font-mono text-xs uppercase text-[#5e5e5e] mb-2">
                {generatedSubject.identity.species} //{' '}
                {generatedSubject.identity.background}
              </p>
              <p className="font-serif text-sm max-w-lg leading-relaxed text-slate-800">
                {generatedSubject.notes.substring(0, 150)}...
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              onNavigateToScanner(generatedSubject.meta.character_id)
            }
            className="w-full md:w-auto bg-black text-parchment hover:bg-black/95 font-bold px-6 py-3 text-xs uppercase tracking-wider text-center shrink-0 cursor-pointer"
          >
            [LOAD IN DOSSIER SCANNER]
          </button>
        </div>
      )}

      {/* API Key Instructions fallback */}
      {errorMsg.toLowerCase().includes('key') && (
        <div className="border border-orange-800 bg-orange-50/50 p-4 font-mono text-xs text-orange-800 flex gap-3">
          <AlertOctagon className="w-5 h-5 text-orange-800 shrink-0" />
          <div>
            <span className="font-bold block uppercase mb-1">
              PROMPT SECRET ERROR TRAPPED
            </span>
            Your application's Gemini API call needs an API Key. We've set up
            your API key automatically. If you encounter missing credentials,
            make sure your key is populated in the{' '}
            <strong>Settings &gt; Secrets</strong> workspace registry.
          </div>
        </div>
      )}
    </div>
  );
}
