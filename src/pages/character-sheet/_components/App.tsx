/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DEFAULT_SUBJECTS } from './data';
import SubjectDossier from './components/SubjectDossier';
import JSONDatabaseConsole from './components/JSONDatabaseConsole';
import { CharacterRecord } from './types';

const STORAGE_KEY = 'elden_records_active_subject_v2';

export default function App() {
  const [subject, setSubject] = useState<CharacterRecord>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to parse stored subject data', e);
      }
    }
    return DEFAULT_SUBJECTS[0];
  });

  const [lastLoadedJson, setLastLoadedJson] = useState<string | null>(null);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    const checkQuery = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      setShowConsole(searchParams.get('db') === 'true');

      const jsonParam = searchParams.get('json');
      if (jsonParam && jsonParam !== lastLoadedJson) {
        setLastLoadedJson(jsonParam);
        let fetchUrl = jsonParam;
        if (!fetchUrl.endsWith('.json')) {
          fetchUrl += '.json';
        }
        // Ensure relative URLs are fetched correctly from the root
        if (!fetchUrl.startsWith('/') && !fetchUrl.startsWith('http')) {
          fetchUrl = '/' + fetchUrl;
        }

        try {
          const response = await fetch(fetchUrl);
          if (response.ok) {
            const data = await response.json();
            if (data && data.meta && data.identity) {
              setSubject(data);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
              console.log(
                'Successfully loaded character record from:',
                fetchUrl,
              );
            } else {
              console.error(
                'Fetched JSON is not a valid character record:',
                data,
              );
            }
          } else {
            console.error(
              'Failed to fetch character record. Status:',
              response.status,
            );
          }
        } catch (err) {
          console.error('Error fetching character record:', err);
        }
      }
    };

    checkQuery();

    // Listen for custom navigation or popstate changes
    window.addEventListener('popstate', checkQuery);
    // Standard event trigger when url search parameters change locally (if any helper uses pushState)
    window.addEventListener('hashchange', checkQuery);

    // Check periodically in case url changes via pushState without triggering popstate in dev iframe
    const interval = setInterval(checkQuery, 1000);

    return () => {
      window.removeEventListener('popstate', checkQuery);
      window.removeEventListener('hashchange', checkQuery);
      clearInterval(interval);
    };
  }, [lastLoadedJson]);

  const handleSubjectChange = (updatedSubject: CharacterRecord) => {
    setSubject(updatedSubject);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubject));
    } catch (e) {
      console.error('Failed to save subject data to localStorage', e);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the campaign database to default records?',
      )
    ) {
      setSubject(DEFAULT_SUBJECTS[0]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Failed to remove stored subject data', e);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-parchment text-black antialiased py-2 selection:bg-black selection:text-parchment">
      {/* JSON Database Console (rendered at the very top, toggled by ?db=true query parameter) */}
      {showConsole && (
        <div className="w-full bg-parchment border-b-2 border-black mb-6">
          <JSONDatabaseConsole
            subject={subject}
            onSubjectChange={handleSubjectChange}
            onReset={handleReset}
          />
        </div>
      )}

      {/* Top Banner Non-interactive Navigation Bar */}
      <header className="w-full max-w-4xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-black mb-12 gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-xl font-black tracking-tighter leading-none text-black">
            ACTOR_RECORDS_V0.0
          </h1>
          <span className="font-mono text-[9px] font-bold text-[#5e5e5e] uppercase tracking-widest">
            Camp Candor
          </span>
        </div>
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto justify-between md:justify-end">
          {/* Quick file switcher */}
          <div className="flex gap-1.5 bg-black/5 p-1 border border-black/10 items-center">
            <span className="font-mono text-[8px] font-bold text-gray-500 uppercase tracking-tighter px-1">
              JSON_VAR:
            </span>
            <button
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('json', 'elias-thorne');
                window.history.pushState({}, '', url.toString());
                window.dispatchEvent(new Event('popstate'));
              }}
              className="font-mono text-[9px] font-bold uppercase tracking-widest bg-white hover:bg-black hover:text-white text-black border border-black/20 py-0.5 px-2 transition-all cursor-pointer"
            >
              ELIAS
            </button>
            <button
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('json', 'catharsis-gale');
                window.history.pushState({}, '', url.toString());
                window.dispatchEvent(new Event('popstate'));
              }}
              className="font-mono text-[9px] font-bold uppercase tracking-widest bg-white hover:bg-black hover:text-white text-[#1e40af] border border-black/20 py-0.5 px-2 transition-all cursor-pointer"
            >
              GALE
            </button>
          </div>

          <div className="flex gap-2 items-center">
            {/* Helper DB Mode toggle link for quick discovery inside the preview */}
            <button
              onClick={() => {
                const url = new URL(window.location.href);
                if (showConsole) {
                  url.searchParams.delete('db');
                } else {
                  url.searchParams.set('db', 'true');
                }
                window.history.pushState({}, '', url.toString());
                window.dispatchEvent(new Event('popstate'));
              }}
              className="font-mono text-[9px] font-bold text-black uppercase tracking-widest border border-black hover:bg-black hover:text-parchment py-1 px-2 transition-colors cursor-pointer"
            >
              {showConsole ? 'HIDE CONSOLE' : 'DEVELOPER_DB'}
            </button>
            <span className="font-mono text-[9px] font-bold text-[#5e5e5e] uppercase tracking-widest bg-black text-[#F5F2E9] py-1 px-2 hidden sm:inline">
              READ_ONLY_ARCHIVE
            </span>
          </div>
        </div>
      </header>

      {/* Primary Static Main Block Canvas */}
      <main className="w-full max-w-4xl mx-auto px-6 pb-24 flex-1">
        <SubjectDossier subject={subject} />
      </main>

      {/* Global Retro Page Footer */}
      <footer className="w-full border-t border-black/10 py-6 text-center">
        <span className="font-mono text-[10px] text-[#5e5e5e] uppercase tracking-widest block">
          LORE DIGITIZATION WORKSPACE // ALL CHANNELS ENCRYPTED VIA CAMP CANDOR
        </span>
      </footer>
    </div>
  );
}
