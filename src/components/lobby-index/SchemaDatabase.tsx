import { useState, useEffect, ChangeEvent } from 'react';
import { Database, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface SchemaDatabaseProps {
  jsonValue: string;
  onJsonChange: (newValue: string) => void;
  onReset: () => void;
}

export default function SchemaDatabase({
  jsonValue,
  onJsonChange,
  onReset,
}: SchemaDatabaseProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  // Validate on change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onJsonChange(text);

    try {
      if (text.trim() === '') {
        throw new Error('JSON is empty');
      }
      JSON.parse(text);
      setErrorMsg(null);
      setIsValid(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Invalid JSON syntax');
      setIsValid(false);
    }
  };

  // Re-run validation when external updates sync into jsonValue
  useEffect(() => {
    try {
      JSON.parse(jsonValue);
      setErrorMsg(null);
      setIsValid(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Invalid JSON syntax');
      setIsValid(false);
    }
  }, [jsonValue]);

  return (
    <div
      id="full-schema-database-editor"
      className="border-2 border-dashed border-zinc-600 p-4 mb-8 bg-[#E6E2D8]/20 relative z-10 transition-colors font-mono"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-black">
            <Database className="w-4 h-4 text-black inline" />
            <span className="font-anton text-base tracking-widest">
              FULL SCHEMA DATABASE
            </span>
          </h3>
          <p className="text-[10px] text-zinc-600 uppercase font-bold pr-2 leading-tight">
            ALL PARAMETERS, STRUCTURAL COORDINATES AND NESTED OBJECTS DISCLOSED
            BELOW
          </p>
        </div>

        {/* Info label sub-tab */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] bg-[#E6E2D8] border border-black px-2 py-0.5 font-bold uppercase text-zinc-800">
            SYSTEM ROOT DECK // SCROLL TO EXPLAIN
          </span>
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] bg-black text-[#E6E2D8] border border-black hover:bg-zinc-800 px-2.5 py-0.5 font-bold uppercase cursor-pointer flex items-center gap-1"
            title="Reset Database Schema to Initial Default 1974 values"
          >
            <RefreshCw className="w-3 h-3 hover:rotate-45 transition-transform" />
            Re-Seed Default
          </button>
        </div>
      </div>

      {/* Editor Box Container */}
      <div className="border-2 border-black bg-white p-4 relative flex flex-col hard-shadow-sm">
        {/* Format indicators */}
        <div className="absolute top-2.5 right-3.5 z-20 flex items-center gap-2">
          {isValid ? (
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-600 text-[9px] font-bold px-1.5 py-0.5 tracking-tighter flex items-center gap-1">
              <CheckCircle className="w-2.5 h-2.5" /> LIVE
            </span>
          ) : (
            <span className="bg-rose-100 text-rose-800 border border-rose-600 text-[9px] font-bold px-1.5 py-0.5 tracking-tighter flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-2.5 h-2.5" /> FAULT
            </span>
          )}
          <span className="bg-[#E6E2D8] text-zinc-800 text-[10px] font-bold px-2 py-0.5 border border-black tracking-tight select-none">
            UTF-8 // JSON FORMAT
          </span>
        </div>

        {/* Text Area */}
        <textarea
          id="schema-raw-textarea"
          className="w-full h-80 font-mono text-[11px] leading-relaxed p-2 border border-zinc-300 bg-zinc-50 text-black focus:outline-hidden focus:bg-white resize-y font-bold select-text"
          value={jsonValue}
          onChange={handleChange}
          spellCheck={false}
          placeholder="Loading operational state coordinates database payload..."
        />

        {/* Diagnostic Syntax Log */}
        {errorMsg && (
          <div className="mt-3 p-2 bg-red-50 border border-red-600 text-[11px] text-red-800 font-bold flex items-start gap-2 select-text">
            <span className="font-anton select-none text-red-700">FAULT:</span>
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <p className="mt-2 text-[10px] text-zinc-500 italic">
        * Pro-tip: You can manually toggle page visibility directly in the JSON
        state using boolean keys inside the
        <strong className="text-black font-mono">
          {' '}
          "visibleComponents"
        </strong>{' '}
        block (e.g. set
        <span className="text-[#D10919] font-mono font-bold">
          {' '}
          "headerBanner": false
        </span>
        ). All active data-grids and visual maps automatically react instantly
        to values modified here.
      </p>
    </div>
  );
}
