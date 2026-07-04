import React, { useState, useEffect } from 'react';
import {
  Database,
  RotateCcw,
  Info,
  Copy,
  Save,
  Code,
  Check,
} from 'lucide-react';
import type { CampaignDatabaseSchema } from '../_types';

interface CampaignSchemaConsoleProps {
  dbData: CampaignDatabaseSchema;
  onDataChange: (newData: CampaignDatabaseSchema) => void;
  onReset: () => void;
  storageKey?: string;
  jsonParam?: string | null;
}

const modules = [
  {
    id: 'all',
    label: '[FULL DATABASE SCHEMA]',
    filename: 'ALL-MODULE-COMBINED.JSON',
  },
  {
    id: 'identity',
    label: '1. IDENTITY & PORTRAITS',
    filename: 'IDENTITY-PORTRAITS.JSON',
  },
  { id: 'lore', label: '2. LORE & QUOTES', filename: 'LORE-AND-QUOTES.JSON' },
  {
    id: 'highlights',
    label: '3. HIGHLIGHTS',
    filename: 'PLAYER-HIGHLIGHTS.JSON',
  },
  {
    id: 'technicalDossier',
    label: '4. TECHNICAL DOSSIER',
    filename: 'TECHNICAL-DOSSIER.JSON',
  },
  {
    id: 'tacticalInsight',
    label: '5. TACTICAL INSIGHT',
    filename: 'TACTICAL-INSIGHT.JSON',
  },
  { id: 'reviews', label: '6. REVIEWS', filename: 'REVIEWS.JSON' },
];

const getSliceString = (data: CampaignDatabaseSchema, tab: string) => {
  switch (tab) {
    case 'identity':
      return JSON.stringify(data.identity, null, 2);
    case 'lore':
      return JSON.stringify(data.lore, null, 2);
    case 'highlights':
      return JSON.stringify(data.highlights, null, 2);
    case 'technicalDossier':
      return JSON.stringify(data.technicalDossier, null, 2);
    case 'tacticalInsight':
      return JSON.stringify(data.tacticalInsight, null, 2);
    case 'reviews':
      return JSON.stringify(data.reviews, null, 2);
    case 'all':
    default:
      return JSON.stringify(data, null, 2);
  }
};

export default function CampaignSchemaConsole({
  dbData,
  onDataChange,
  onReset,
  storageKey,
  jsonParam,
}: CampaignSchemaConsoleProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [inputText, setInputText] = useState<string>('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Sync internal string whenever database data or active tab changes
  useEffect(() => {
    setInputText(getSliceString(dbData, activeTab));
    setJsonError(null);
  }, [activeTab, dbData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);

    try {
      const parsed = JSON.parse(val);
      setJsonError(null);

      let updatedData = { ...dbData };

      if (activeTab === 'all') {
        updatedData = parsed as CampaignDatabaseSchema;
      } else {
        (updatedData as Record<string, unknown>)[activeTab] = parsed;
      }

      // Sync database live
      onDataChange(updatedData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Invalid JSON format';
      setJsonError(errorMessage);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleSave = () => {
    if (jsonError) {
      setSaveStatus('Cannot save: Syntax error exists.');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }
    try {
      localStorage.setItem(
        storageKey || 'charity_vaughn_db',
        JSON.stringify(dbData),
      );
      setSaveStatus('Database successfully synchronized!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('Error saving to storage.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const currentModule = modules.find((m) => m.id === activeTab) || modules[0];

  return (
    <section className="relative w-full max-w-7xl mx-auto mb-8 bg-[#FAF8F5] border-4 border-ink p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-ink pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-ink text-parchment border-2 border-ink shadow-[2px_2px_0px_0px_#000]">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase text-ink tracking-widest">
                CAMPAIGN SCHEMA CONSOLE
              </span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded tracking-wider">
                LIVE DB ENGINES
              </span>
            </div>
            <h2 className="font-anton text-2xl md:text-3xl leading-none tracking-wide uppercase text-ink mt-1">
              JSON DATABASE SCHEMA SETTINGS
            </h2>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-ink font-mono font-bold text-xs bg-white text-ink hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> RESET DATABASE
        </button>
      </div>

      {/* Sub-module Selector Label */}
      <div className="mt-8">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70 mb-3">
          // SELECT DB MODULE OR FULL SCHEMA:
        </p>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {modules.map((m) => {
            const isSelected = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`border-2 border-ink py-2 px-3 font-mono text-[11px] md:text-xs font-bold uppercase transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-ink text-parchment shadow-none'
                    : 'bg-white text-ink hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Editor Window */}
      <div className="mt-8 border-4 border-ink bg-[#0B0F12] text-emerald-400 font-mono text-sm overflow-hidden flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-zinc-900 border-b-2 border-ink px-4 py-3 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-300">
          <span className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />{' '}
            {currentModule.filename}
          </span>
          <span className="text-zinc-400 font-mono text-[10px] bg-zinc-800 px-2.5 py-1 rounded tracking-wider">
            EDITS APPLY LIVE
          </span>
        </div>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          className="w-full h-[32rem] bg-[#0B0F12] text-emerald-400 p-6 focus:outline-none resize-y font-mono font-medium leading-relaxed"
          spellCheck={false}
          id="campaign-json-editor"
        />
      </div>

      {/* Validation Banner */}
      <div
        className={`p-4 border-2 border-ink font-mono text-xs md:text-sm font-bold flex items-center gap-3 mt-4 ${
          !jsonError
            ? 'bg-emerald-50 text-emerald-800 border-emerald-500'
            : 'bg-rose-50 text-rose-800 border-rose-500'
        }`}
      >
        <span
          className={`w-3 h-3 rounded-full shrink-0 ${
            !jsonError
              ? 'bg-emerald-500 animate-pulse'
              : 'bg-rose-500 animate-pulse'
          }`}
        ></span>
        <span>
          {!jsonError
            ? 'SYNTAX IS VALID: Schema parsing active. Safe to sync.'
            : `SYNTAX ERROR: ${jsonError}`}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-between items-center">
        <p className="font-mono text-xs text-ink/60 font-medium">
          {saveStatus ? (
            <span
              className={
                saveStatus.includes('successfully')
                  ? 'text-emerald-700 font-bold'
                  : 'text-rose-700 font-bold'
              }
            >
              {saveStatus}
            </span>
          ) : (
            'Make live changes by editing raw JSON keys above.'
          )}
        </p>
        <div className="flex gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 border-2 border-ink font-mono font-bold text-xs bg-white text-ink hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> COPIED!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> COPY JSON
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            disabled={!!jsonError}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border-2 border-ink font-mono font-bold text-xs text-parchment hover:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer ${
              jsonError
                ? 'bg-zinc-400 text-zinc-600 cursor-not-allowed opacity-50 shadow-none hover:translate-none'
                : 'bg-ink'
            }`}
          >
            <Save className="w-4 h-4" /> SAVE & SYNC DATABASE
          </button>
        </div>
      </div>
    </section>
  );
}
