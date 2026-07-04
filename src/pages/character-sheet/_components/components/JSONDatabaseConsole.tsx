/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CharacterRecord } from '../types';
import {
  Database,
  RotateCcw,
  Info,
  Code,
  Copy,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';

interface JSONDatabaseConsoleProps {
  subject: CharacterRecord;
  onSubjectChange: (updated: CharacterRecord) => void;
  onReset: () => void;
}

const TABS = [
  { id: 'FULL', label: '[FULL RECORD SCHEMA]' },
  { id: 'IDENTITY', label: '1. IDENTITY & DESCRIPTION' },
  { id: 'PERSONALITY', label: '2. PERSONALITY & VITALS' },
  { id: 'ABILITIES', label: '3. ABILITIES & PROGRESSION' },
  { id: 'PROFICIENCIES', label: '4. PROFICIENCIES' },
  { id: 'SPELLCASTING', label: '5. SPELLCASTING' },
  { id: 'CURRENT', label: '6. CURRENT & INVENTORY' },
  { id: 'ARSENAL', label: '7. ARSENAL & OUTFITTING' },
  { id: 'CAPABILITIES', label: '8. CAPABILITIES & AFFILIATIONS' },
  { id: 'PSYCHOLOGY', label: '9. PSYCHOLOGY & NOTES' },
];

export default function JSONDatabaseConsole({
  subject,
  onSubjectChange,
  onReset,
}: JSONDatabaseConsoleProps) {
  const [activeTab, setActiveTab] = useState('FULL');
  const [jsonText, setJsonText] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Extract the relevant JSON content based on the active tab
  const getSubObjectForTab = (
    tabId: string,
    currentSubject: CharacterRecord,
  ) => {
    switch (tabId) {
      case 'IDENTITY':
        return {
          identity: currentSubject.identity,
          description: currentSubject.description,
        };
      case 'PERSONALITY':
        return {
          personality: currentSubject.personality,
          vitalRecords: currentSubject.vitalRecords,
        };
      case 'ABILITIES':
        return {
          definition: currentSubject.definition,
        };
      case 'PROFICIENCIES':
        return {
          proficiencies: currentSubject.proficiencies,
        };
      case 'SPELLCASTING':
        return {
          spellcasting: currentSubject.spellcasting,
        };
      case 'CURRENT':
        return {
          current: currentSubject.current,
        };
      case 'ARSENAL':
        return {
          arsenal: currentSubject.arsenal,
          outfitting: currentSubject.outfitting,
        };
      case 'CAPABILITIES':
        return {
          capabilities: currentSubject.capabilities,
          registries: currentSubject.registries,
        };
      case 'PSYCHOLOGY':
        return {
          psychology: currentSubject.psychology,
          notes: currentSubject.notes,
        };
      case 'FULL':
      default:
        return currentSubject;
    }
  };

  // Merge edited sub-object back into parent subject
  const mergeSubObjectBack = (
    tabId: string,
    parsedJson: any,
    currentSubject: CharacterRecord,
  ): CharacterRecord => {
    const updated = { ...currentSubject };
    switch (tabId) {
      case 'IDENTITY':
        if (parsedJson.identity !== undefined)
          updated.identity = parsedJson.identity;
        if (parsedJson.description !== undefined)
          updated.description = parsedJson.description;
        break;
      case 'PERSONALITY':
        if (parsedJson.personality !== undefined)
          updated.personality = parsedJson.personality;
        if (parsedJson.vitalRecords !== undefined)
          updated.vitalRecords = parsedJson.vitalRecords;
        break;
      case 'ABILITIES':
        if (parsedJson.definition !== undefined)
          updated.definition = parsedJson.definition;
        break;
      case 'PROFICIENCIES':
        if (parsedJson.proficiencies !== undefined)
          updated.proficiencies = parsedJson.proficiencies;
        break;
      case 'SPELLCASTING':
        if (parsedJson.spellcasting !== undefined)
          updated.spellcasting = parsedJson.spellcasting;
        break;
      case 'CURRENT':
        if (parsedJson.current !== undefined)
          updated.current = parsedJson.current;
        break;
      case 'ARSENAL':
        if (parsedJson.arsenal !== undefined)
          updated.arsenal = parsedJson.arsenal;
        if (parsedJson.outfitting !== undefined)
          updated.outfitting = parsedJson.outfitting;
        break;
      case 'CAPABILITIES':
        if (parsedJson.capabilities !== undefined)
          updated.capabilities = parsedJson.capabilities;
        if (parsedJson.registries !== undefined)
          updated.registries = parsedJson.registries;
        break;
      case 'PSYCHOLOGY':
        if (parsedJson.psychology !== undefined)
          updated.psychology = parsedJson.psychology;
        if (parsedJson.notes !== undefined) updated.notes = parsedJson.notes;
        break;
      case 'FULL':
      default:
        return parsedJson as CharacterRecord;
    }
    return updated;
  };

  // Keep editor content in sync with the current subject prop when not focused or when tab changes
  useEffect(() => {
    if (!isFocused) {
      const dataToDisplay = getSubObjectForTab(activeTab, subject);
      setJsonText(JSON.stringify(dataToDisplay, null, 2));
      setIsValid(true);
      setValidationError('');
    }
  }, [subject, activeTab, isFocused]);

  // Handle manual code edits with instant real-time synchronization on valid JSON parsing
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setJsonText(newText);

    try {
      const parsed = JSON.parse(newText);
      setIsValid(true);
      setValidationError('');

      // Merge and update the main subject state in real-time!
      const updatedSubject = mergeSubObjectBack(activeTab, parsed, subject);
      // Only call onSubjectChange if it actually differs to avoid unneeded cycles
      if (JSON.stringify(updatedSubject) !== JSON.stringify(subject)) {
        onSubjectChange(updatedSubject);
      }
    } catch (err: any) {
      setIsValid(false);
      setValidationError(err.message || 'Invalid JSON syntax structure.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveAndSync = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setIsValid(true);
      setValidationError('');
      const updatedSubject = mergeSubObjectBack(activeTab, parsed, subject);
      onSubjectChange(updatedSubject);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err: any) {
      setIsValid(false);
      setValidationError(err.message || 'Cannot sync. Invalid JSON syntax.');
    }
  };

  const getFileNameForTab = (tabId: string) => {
    switch (tabId) {
      case 'IDENTITY':
        return 'identity-and-desc.json';
      case 'PERSONALITY':
        return 'personality-and-vitals.json';
      case 'ABILITIES':
        return 'abilities-and-progression.json';
      case 'PROFICIENCIES':
        return 'proficiencies.json';
      case 'SPELLCASTING':
        return 'spellcasting.json';
      case 'CURRENT':
        return 'current-and-inventory.json';
      case 'ARSENAL':
        return 'arsenal-and-outfitting.json';
      case 'CAPABILITIES':
        return 'capabilities-and-affiliations.json';
      case 'PSYCHOLOGY':
        return 'psychology-and-notes.json';
      case 'FULL':
      default:
        return 'all-modules-combined.json';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 mb-12 border-2 border-black bg-[#F5F2E9] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-sans">
      {/* Console Header Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-4 mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-black text-[#F5F2E9] p-2.5 rounded-none border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Database className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                CAMPAIGN SCHEMA CONSOLE
              </span>
              <span className="bg-[#e2f9f3] text-[#0d9488] font-mono text-[8px] font-black uppercase px-1.5 py-0.5 border border-[#99f6e4]">
                LIVE DB ENGINES
              </span>
            </div>
            <h1 className="font-sans text-2xl font-black tracking-tight leading-none text-black mt-1">
              JSON DATABASE SCHEMA SETTINGS
            </h1>
          </div>
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 bg-white hover:bg-red-50 text-red-700 hover:text-red-800 border border-red-300 font-mono text-xs font-bold py-2 px-4 transition-colors rounded-none shadow-[2px_2px_0px_0px_rgba(239,68,68,0.2)]"
        >
          <RotateCcw className="w-3.5 h-3.5" /> RESET DATABASE
        </button>
      </div>

      {/* Tabs Selector Label */}
      <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2.5">
        // SELECT DB MODULE OR FULL SCHEMA:
      </span>

      {/* Tab Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                // When we manually change tabs, release focus first so the content switches immediately
                setIsFocused(false);
              }}
              className={`font-mono text-[10px] font-black py-2.5 px-2 text-left uppercase transition-all border border-black/20 ${
                isActive
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-slate-700 hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Code Editor Frame */}
      <div className="flex flex-col border border-black bg-black text-[#F5F2E9] overflow-hidden">
        {/* Code Editor Header */}
        <div className="bg-[#1f1e1e] border-b border-black text-[#e4dede] px-4 py-2 font-mono text-[10.5px] font-bold flex justify-between items-center uppercase tracking-wider">
          <span className="flex items-center gap-2 text-green-400">
            <Code className="w-4 h-4" /> {getFileNameForTab(activeTab)}
          </span>
          <span className="font-mono text-[9px] text-[#f43f5e] font-black bg-[#f43f5e]/10 px-1.5 py-0.5 border border-[#f43f5e]/25">
            EDITS APPLY LIVE
          </span>
        </div>

        {/* Text Area Code Body */}
        <textarea
          value={jsonText}
          onChange={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={14}
          className="w-full bg-[#0d0d0d] text-[#22c55e] font-mono text-xs p-5 focus:outline-none focus:ring-0 leading-relaxed resize-y selection:bg-green-800 selection:text-white caret-green-400 scrollbar-thin"
          placeholder="Enter valid database JSON parameters..."
        />

        {/* Validation Notification Banner */}
        <div
          className={`px-4 py-2.5 font-mono text-xs flex items-center gap-2.5 border-t border-black ${
            isValid
              ? 'bg-[#e2f9f0] text-[#0f766e] border-t-teal-200'
              : 'bg-[#fff1f2] text-[#be123c] border-t-rose-200'
          }`}
        >
          {isValid ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>
                <strong>SYNTAX IS VALID:</strong> Schema parsing active. Safe to
                sync.
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 stroke-[2.5]" />
              <span className="truncate">
                <strong>INVALID JSON SYNTAX:</strong> {validationError}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons Footer row */}
      <div className="flex justify-end gap-3 mt-4">
        {/* Copy JSON */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 bg-white hover:bg-black/5 text-slate-800 border border-black font-mono text-xs font-bold py-2.5 px-4 transition-colors rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" /> COPIED!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> COPY JSON
            </>
          )}
        </button>

        {/* Force Sync / Save Database */}
        <button
          type="button"
          onClick={handleSaveAndSync}
          disabled={!isValid}
          className="flex items-center gap-2 bg-black hover:bg-black/90 text-[#F5F2E9] border border-black font-mono text-xs font-bold py-2.5 px-5 transition-colors rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-300" /> SAVED &amp;
              SYNCED
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" /> SAVE &amp; SYNC DATABASE
            </>
          )}
        </button>
      </div>
    </div>
  );
}
