/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_SUBJECTS } from './data';
import type { CharacterRecord } from './types';
import SubjectDossier from './components/SubjectDossier';
import DirectoryExplorer from './components/DirectoryExplorer';
import AIPresentationTerminal from './components/AIPresentationTerminal';
import { User, Shield, Terminal, RefreshCw, Layers } from 'lucide-react';

function isValidSubject(s: unknown): s is CharacterRecord {
  return !!(
    s &&
    s.meta &&
    typeof s.meta.character_id === 'string' &&
    s.identity &&
    typeof s.identity.name === 'string' &&
    typeof s.identity.alignment === 'string' &&
    typeof s.identity.background === 'string' &&
    typeof s.identity.species === 'string' &&
    s.description &&
    s.personality &&
    typeof s.notes === 'string' &&
    s.definition &&
    s.definition.abilityScoreGeneration &&
    s.definition.abilityScoreGeneration.scores &&
    s.proficiencies &&
    s.spellcasting &&
    s.currentState
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'SCANNER' | 'DIRECTORY' | 'SYNTHESIZER'
  >('SCANNER');
  const [subjects, setSubjects] = useState<CharacterRecord[]>(() => {
    const cached = localStorage.getItem('elden_chronos_subjects');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          const validated = parsed.filter(isValidSubject);
          if (validated.length > 0) {
            return validated;
          }
        }
      } catch (e) {
        console.error('Failed to restore subjects cache', e);
      }
    }
    return DEFAULT_SUBJECTS;
  });

  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => {
    const cachedId = localStorage.getItem('elden_chronos_active_id');
    if (
      cachedId &&
      subjects.some((s) => s && s.meta && s.meta.character_id === cachedId)
    ) {
      return cachedId;
    }
    return (
      subjects[0]?.meta?.character_id ||
      'uuid-09a8f2b7-846c-4b51-935f-359f63569720'
    );
  });

  const [isSyncing, setIsSyncing] = useState(false);

  // Sync state mutations cleanly to local storage
  useEffect(() => {
    localStorage.setItem('elden_chronos_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('elden_chronos_active_id', activeSubjectId);
  }, [activeSubjectId]);

  const activeSubject =
    subjects.find(
      (s) => s && s.meta && s.meta.character_id === activeSubjectId,
    ) ||
    subjects[0] ||
    DEFAULT_SUBJECTS[0];

  const updateActiveSubject = (updated: CharacterRecord) => {
    if (!updated || !updated.meta) return;
    setSubjects((prev) =>
      prev.map((s) =>
        s && s.meta && s.meta.character_id === updated.meta.character_id
          ? updated
          : s,
      ),
    );
  };

  const handleAddCustomSubject = (newSubject: CharacterRecord) => {
    if (newSubject && isValidSubject(newSubject)) {
      setSubjects((prev) => [...prev, newSubject]);
    }
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects((prev) => {
      const filtered = prev.filter(
        (s) => s && s.meta && s.meta.character_id !== id,
      );
      // Fallback active subject ID if currently active was deleted
      if (activeSubjectId === id) {
        const remaining =
          filtered[0]?.meta?.character_id ||
          'uuid-09a8f2b7-846c-4b51-935f-359f63569720';
        setActiveSubjectId(remaining);
      }
      return filtered;
    });
  };

  const triggerMockSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-parchment text-black antialiased py-2 selection:bg-black selection:text-parchment">
      {/* Top Banner Navigation Bar */}
      <header className="w-full max-w-4xl mx-auto px-6 py-4 flex justify-between items-center border-b border-black mb-12 select-none">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-xl font-black tracking-tighter leading-none text-black">
            ELDEN_RECORDS_V2.0
          </h1>
          <span className="font-mono text-[9px] font-bold text-[#5e5e5e] uppercase tracking-widest hidden sm:inline">
            Chronos Systems Interface // Level_Tome
          </span>
        </div>

        {/* Global Sync and diagnostic action buttons */}
        <div className="flex gap-4 items-center">
          <button
            onClick={triggerMockSync}
            disabled={isSyncing}
            className="p-1.5 border border-black hover:bg-black hover:text-parchment disabled:opacity-50 transition-colors cursor-pointer select-none"
            title="Calibrate Core Sensors"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`}
            />
          </button>

          <div className="h-5 w-[1px] bg-black/25 hidden sm:block" />

          {/* Tab Selection Portal Links */}
          <nav className="flex gap-1.5 font-mono text-[11px] font-bold uppercase">
            <button
              onClick={() => setActiveTab('SCANNER')}
              className={`px-3 py-1.5 border flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'SCANNER'
                  ? 'bg-black text-parchment border-black'
                  : 'bg-transparent text-black border-transparent hover:border-black/30'
              }`}
            >
              <User className="w-3.5 h-3.5" />{' '}
              <span className="hidden sm:inline">01_dossier</span>
            </button>
            <button
              onClick={() => setActiveTab('DIRECTORY')}
              className={`px-3 py-1.5 border flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'DIRECTORY'
                  ? 'bg-black text-parchment border-black'
                  : 'bg-transparent text-black border-transparent hover:border-black/30'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />{' '}
              <span className="hidden sm:inline">02_directory</span>
            </button>
            <button
              onClick={() => setActiveTab('SYNTHESIZER')}
              className={`px-3 py-1.5 border flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'SYNTHESIZER'
                  ? 'bg-black text-parchment border-black'
                  : 'bg-transparent text-black border-transparent hover:border-black/30'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />{' '}
              <span className="hidden sm:inline">03_synthesis</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Primary Dynamic Main Block Canvas */}
      <main className="w-full max-w-4xl mx-auto px-6 pb-24 flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'SCANNER' && (
            <motion.div
              key="scanner-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <SubjectDossier
                subject={activeSubject}
                onUpdateSubject={updateActiveSubject}
              />
            </motion.div>
          )}

          {activeTab === 'DIRECTORY' && (
            <motion.div
              key="directory-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <DirectoryExplorer
                subjects={subjects}
                activeSubjectId={activeSubjectId}
                onSelectSubject={(id) => {
                  setActiveSubjectId(id);
                  setActiveTab('SCANNER');
                }}
                onDeleteSubject={handleDeleteSubject}
              />
            </motion.div>
          )}

          {activeTab === 'SYNTHESIZER' && (
            <motion.div
              key="synthesizer-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AIPresentationTerminal
                onAddCustomSubject={handleAddCustomSubject}
                onNavigateToScanner={(id) => {
                  setActiveSubjectId(id);
                  setActiveTab('SCANNER');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Retro Page Footer */}
      <footer className="w-full border-t border-black/10 py-6 text-center select-none">
        <span className="font-mono text-[10px] text-[#5e5e5e] uppercase tracking-widest block">
          LORE DIGITIZATION WORKSPACE // ALL CHANNELS ENCRYPTED VIA CHRONOS
          CRYPTO
        </span>
      </footer>
    </div>
  );
}
