import React, { useState, useEffect } from 'react';
import { Database, AlertTriangle, Check, RefreshCw } from 'lucide-react';

interface FullSchemaDatabaseProps {
  playClack: () => void;
  jsonData: any;
  onUpdateJsonData: (newData: any) => void;
  onResetToDefault: () => void;
  schemaSource?: 'loading' | 'api' | 'fallback_local' | 'fallback_embedded';
}

export function FullSchemaDatabase({
  playClack,
  jsonData,
  onUpdateJsonData,
  onResetToDefault,
  schemaSource = 'loading',
}: FullSchemaDatabaseProps) {
  const [inputText, setInputText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Sync state whenever parent data changes externally (e.g. from UI toggles)
  useEffect(() => {
    setInputText(JSON.stringify(jsonData, null, 2));
    setJsonError(null);
  }, [jsonData]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);

    try {
      const parsed = JSON.parse(text);
      setJsonError(null);
      // Valid JSON parsed, update the parent state in real time!
      onUpdateJsonData(parsed);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  return (
    <div
      id="schema-database-panel"
      className="border-[3px] border-dashed border-[#8C867A] bg-[#FFFDF5] p-6 text-[#1B1B1B] shadow-[6px_6px_0px_rgba(0,0,0,0.15)] rounded-sm"
    >
      {/* HEADER SECTION */}
      <div className="flex items-start gap-4 text-left select-none pb-4">
        <div className="p-3 bg-obsidian text-white border border-obsidian rounded-sm shrink-0">
          <Database className="w-8 h-8 text-amber-400 stroke-[2.5]" />
        </div>

        <div className="space-y-1 flex-1">
          <h2 className="font-sans text-xl sm:text-2xl font-black text-obsidian tracking-tight leading-none uppercase">
            FULL SCHEMA DATABASE
          </h2>
          <p className="font-mono text-[9px] sm:text-[10px] text-stone-500 font-bold tracking-wider leading-none">
            ALL PARAMETERS, STRUCTURAL COORDINATES AND NESTED OBJECTS DISCLOSED
            BELOW
          </p>

          <div className="inline-flex items-center gap-1.5 border border-obsidian/30 bg-[#FFF9EA] px-2.5 py-1 text-stone-700 font-mono text-[9px] tracking-wide mt-2 uppercase font-extrabold rounded-sm">
            SYSTEM ROOT DECK // SCROLL TO EXPLAIN
          </div>
        </div>

        {/* Reset component button */}
        <button
          onClick={() => {
            playClack();
            onResetToDefault();
          }}
          className="bg-white hover:bg-stone-100 text-stone-800 border-2 border-obsidian p-2 font-mono text-[10px] uppercase font-bold tracking-widest transition-all shadow-sm shrink-0 self-start flex items-center gap-1"
          title="Reset schema parameters to standard"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">RESET SCHEMA</span>
        </button>
      </div>

      {/* DIVIDER LINE */}
      <div className="border-t border-obsidian/80 my-2"></div>

      {/* INTERACTIVE TEXTAREA CONTAINER */}
      <div className="border-2 border-obsidian bg-white relative p-4 mt-4 text-left rounded-sm">
        {/* Status indicator tag absolutely positioned in the top right of the box */}
        <div className="absolute top-3 right-3 z-10 flex flex-wrap gap-2 justify-end max-w-[70%]">
          {schemaSource === 'api' && (
            <div className="inline-flex items-center gap-1 border border-emerald-600 bg-emerald-50 px-2 py-0.5 font-mono text-[9px] text-emerald-800 font-extrabold uppercase rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              REST API CONNECTED
            </div>
          )}
          {schemaSource === 'fallback_local' && (
            <div className="inline-flex items-center gap-1 border border-amber-500 bg-amber-50 px-2 py-0.5 font-mono text-[9px] text-amber-800 font-extrabold uppercase rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              REST OFFLINE // LOCAL CACHE OVERRIDE
            </div>
          )}
          {schemaSource === 'fallback_embedded' && (
            <div className="inline-flex items-center gap-1 border border-rose-500 bg-rose-50 px-2 py-0.5 font-mono text-[9px] text-rose-800 font-extrabold uppercase rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              REST OFFLINE // USING EMBEDDED FALLBACK
            </div>
          )}
          {schemaSource === 'loading' && (
            <div className="inline-flex items-center gap-1 border border-blue-500 bg-blue-50 px-2 py-0.5 font-mono text-[9px] text-blue-800 font-extrabold uppercase rounded-sm animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              RETRIEVING REST SCHEMA...
            </div>
          )}

          {jsonError ? (
            <div className="inline-flex items-center gap-1 border border-red-500 bg-red-100 px-2 py-0.5 font-mono text-[9px] text-red-700 font-extrabold uppercase rounded-sm animate-pulse">
              <AlertTriangle className="w-3 h-3 text-red-500" />
              SYNTAX DEVIANT // ERROR
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 border border-[#8C867A]/30 bg-[#EFEFEF] px-2 py-0.5 font-mono text-[9px] text-stone-700 font-bold uppercase rounded-sm">
              <Check className="w-3 h-3 text-emerald-600 font-bold" />
              UTF-8 // JSON FORMAT
            </div>
          )}
        </div>

        {/* Main interactive JSON terminal textarea */}
        <textarea
          value={inputText}
          onChange={handleTextChange}
          placeholder="Loading master schema parameters..."
          spellCheck={false}
          className="w-full h-[320px] font-mono text-[12px] p-2 pr-28 leading-relaxed outline-none border-none select-text resize-y text-stone-900 bg-white scrollbar"
        />

        {/* Live helper tip for syntax correctness */}
        {jsonError && (
          <div className="mt-2 border-t border-red-200 pt-2 font-mono text-[10px] text-red-600 leading-tight">
            <strong>PARSING FAULT REGISTERED:</strong> {jsonError}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row justify-between text-stone-500 font-mono text-[8px] select-none uppercase tracking-widest text-left gap-1">
        <span>
          * EDIT PARAMETERS DIRECTLY TO INJECT COMPONENT STATE IN REAL TIME
        </span>
        <span>MAMA_MATRIX_v35.8</span>
      </div>
    </div>
  );
}
