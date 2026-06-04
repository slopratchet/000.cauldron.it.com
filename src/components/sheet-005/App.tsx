/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DEFAULT_SUBJECTS } from './data';
import SubjectDossier from '../sheet-000/components/SubjectDossier';

export default function App() {
  const activeSubject = DEFAULT_SUBJECTS[0];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-parchment text-black antialiased py-2 selection:bg-black selection:text-parchment">
      {/* Top Banner Non-interactive Navigation Bar */}
      <header className="w-full max-w-4xl mx-auto px-6 py-4 flex justify-between items-center border-b border-black mb-12 select-none">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-xl font-black tracking-tighter leading-none text-black">
            ELDEN_RECORDS_V2.0
          </h1>
          <span className="font-mono text-[9px] font-bold text-[#5e5e5e] uppercase tracking-widest hidden sm:inline">
            Chronos Systems Interface // Level_Tome
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-mono text-[9px] font-bold text-[#5e5e5e] uppercase tracking-widest bg-black text-[#F5F2E9] py-1 px-2">
            READ_ONLY_ARCHIVE
          </span>
        </div>
      </header>

      {/* Primary Static Main Block Canvas */}
      <main className="w-full max-w-4xl mx-auto px-6 pb-24 flex-1">
        <SubjectDossier subject={activeSubject} />
      </main>

      {/* Global Retro Page Footer */}
      <footer className="w-full border-t border-black/10 py-6 text-center select-none">
        <span className="font-mono text-[10px] text-[#5e5e5e] uppercase tracking-widest block">
          LORE DIGITIZATION WORKSPACE // ALL CHANNELS ENCRYPTED VIA CAMP CANDOR
        </span>
      </footer>
    </div>
  );
}
