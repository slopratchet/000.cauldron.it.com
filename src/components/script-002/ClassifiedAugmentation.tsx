import React, { useState } from 'react';
import { Operation, ScriptLine, Character } from '../../types002';
import { Command, Sparkles, RefreshCw } from 'lucide-react';

interface ClassifiedAugmentationProps {
  operation: Operation;
  onUpdateLines: (lines: ScriptLine[]) => void;
  characters: Character[];
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
}

export default function ClassifiedAugmentation({
  operation,
  onUpdateLines,
  characters,
  aiPrompt,
  setAiPrompt,
}: ClassifiedAugmentationProps) {
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleAiExpand = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/generate-scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operationTitle: operation.title,
          location: operation.location,
          target: operation.target,
          characters: characters,
          prompt: aiPrompt,
          previousLines: operation.scriptLines,
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.scriptBlocks)) {
        // Map generated objects to ensure unique keys
        const mappedBlocks: ScriptLine[] = data.scriptBlocks.map(
          (b: Partial<ScriptLine>, index: number) => ({
            id: `ai_line_${Date.now()}_${index}`,
            type: b.type || 'dialogue',
            characterName: b.characterName?.toUpperCase(),
            parenthetical: b.parenthetical,
            text: b.text || '',
          }),
        );

        onUpdateLines([...operation.scriptLines, ...mappedBlocks]);
        setAiPrompt('');
      } else {
        alert(
          data.error || 'The script engine was unable to parse that frequency.',
        );
      }
    } catch (err) {
      console.error(err);
      alert('Toll telemetry error connecting to screenwriting module.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const preloadPrompt = (promptSuggestion: string) => {
    setAiPrompt(promptSuggestion);
  };

  return (
    <div className="border border-black bg-zinc-100 p-4 font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-extrabold text-[#FFAA00] tracking-widest flex items-center gap-1 select-none">
          <Command className="w-3.5 h-3.5 text-[#FFAA00]" />
          CREATIVE SCRIPT AUGMENTATION PROTOCOL
        </span>
        <span className="text-[8px] text-gray-400 select-none">
          SECURE DIRECT COUPLING
        </span>
      </div>

      <p className="font-serif text-[11px] text-zinc-600 mb-3 leading-relaxed">
        Instruct the server-side Gemini 3.5 engine to automatically craft and
        append the next sequence in strict 1970s screenplay alignment code.
      </p>

      <div className="flex gap-1.5 mb-3 select-none flex-wrap">
        <span className="text-[9px] text-gray-500 self-center">
          Quick Presets:
        </span>
        <button
          onClick={() =>
            preloadPrompt(
              'Spot the rogue submarine on radar, Steve panics slightly.',
            )
          }
          className="text-[8.5px] p-1 bg-white border border-gray-300 hover:border-black text-black font-semibold transition-colors cursor-pointer"
          id="preset-1"
        >
          Spot Submarine
        </button>
        <button
          onClick={() =>
            preloadPrompt(
              'Klaus feels ignored and claims Ned is trying to steal his captain.',
            )
          }
          className="text-[8.5px] p-1 bg-white border border-gray-300 hover:border-black text-black font-semibold transition-colors cursor-pointer"
          id="preset-2"
        >
          Klaus Siblings
        </button>
        <button
          onClick={() =>
            preloadPrompt(
              'A sudden mechanical alarm starts buzzing, orange tracking lights flicker.',
            )
          }
          className="text-[8.5px] p-1 bg-white border border-gray-300 hover:border-black text-black font-semibold transition-colors cursor-pointer"
          id="preset-3"
        >
          Alarm Buzz
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          placeholder="e.g. Klaus is looking through radar scope, spots a school of neon jellyfish..."
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          className="w-full border border-black p-2 bg-white text-xs font-mono focus:ring-1 focus:ring-black focus:outline-none min-h-[96px] h-24 resize-none"
          id="input-ai-prompt"
          rows={3}
        />
        <button
          onClick={handleAiExpand}
          disabled={isLoadingAi || !aiPrompt.trim()}
          className="w-full bg-black hover:bg-neutral-800 text-white font-mono font-bold text-[10px] py-1.5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed uppercase"
          id="btn-intel-ai-augment"
        >
          {isLoadingAi ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" /> WRITING...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#FFAA00]" /> AUGMENT_SCRIPT
            </>
          )}
        </button>
      </div>
    </div>
  );
}
