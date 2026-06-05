/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CharacterRecord } from '../types';
import { Search, Shield, User } from 'lucide-react';

interface DirectoryExplorerProps {
  subjects: CharacterRecord[];
  activeSubjectId: string;
  onSelectSubject: (id: string) => void;
  onDeleteSubject?: (id: string) => void;
}

export default function DirectoryExplorer({
  subjects,
  activeSubjectId,
  onSelectSubject,
  onDeleteSubject,
}: DirectoryExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlignment, setSelectedAlignment] = useState('ALL');
  const [selectedSpecies, setSelectedSpecies] = useState('ALL');

  // Filter computation logic for directory data
  const filteredSubjects = subjects.filter((subj) => {
    const titleText = `${subj.identity.species} ${subj.identity.background}`;
    const descText = `${subj.description.skin} ${subj.description.hair} ${subj.personality.traits} ${subj.notes}`;
    const matchesSearch =
      subj.identity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      descText.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlignment =
      selectedAlignment === 'ALL' ||
      subj.identity.alignment === selectedAlignment;

    const matchesSpecies =
      selectedSpecies === 'ALL' ||
      subj.identity.species.toLowerCase() === selectedSpecies.toLowerCase();

    return matchesSearch && matchesAlignment && matchesSpecies;
  });

  const alignmentOptions = Array.from(
    new Set(subjects.map((s) => s.identity.alignment)),
  );
  const speciesOptions = Array.from(
    new Set(subjects.map((s) => s.identity.species)),
  );

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search Header and Quick Facts */}
      <div className="flex flex-col gap-4 border-b border-black pb-6">
        <div className="flex justify-between items-end">
          <h2 className="font-sans text-2xl font-black uppercase tracking-wider">
            CHRONOS_DIRECTORY
          </h2>
          <span className="font-mono text-xs text-[#5e5e5e] font-bold">
            ENTRIES_BUFFERED: {filteredSubjects.length} // ALL_LOADED
          </span>
        </div>
        <p className="font-serif text-base text-[#4c4546]">
          Search our catalog or filter by Alignment Vectors / Genomes. Click on
          any record row to load its biometric sensors onto the central scan
          engine.
        </p>
      </div>

      {/* Database Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Keyword Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5e5e5e]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search name, species, traits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-parchment border-2 border-black pl-9 pr-3 py-2 text-sm font-mono focus:ring-1 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Alignment Matrix Filter */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5e5e5e]">
            <Shield className="w-4 h-4" />
          </span>
          <select
            value={selectedAlignment}
            onChange={(e) => setSelectedAlignment(e.target.value)}
            className="w-full bg-parchment border-2 border-black pl-9 pr-3 py-2 text-sm font-mono focus:ring-1 focus:ring-black focus:outline-none appearance-none cursor-pointer"
          >
            <option value="ALL">ALL_ALIGNMENTS</option>
            {alignmentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Origins Matrix Filter */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5e5e5e]">
            <User className="w-4 h-4" />
          </span>
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="w-full bg-parchment border-2 border-black pl-9 pr-3 py-2 text-sm font-mono focus:ring-1 focus:ring-black focus:outline-none appearance-none cursor-pointer"
          >
            <option value="ALL">ALL_SPECIES</option>
            {speciesOptions.map((term) => (
              <option key={term} value={term}>
                {term.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* High Density Table Records */}
      <div className="border-2 border-black overflow-hidden">
        <div className="grid grid-cols-12 bg-black text-parchment font-mono text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 border-b border-black">
          <div className="col-span-4 md:col-span-3">subject_name</div>
          <div className="col-span-5 md:col-span-4">
            classification_species_bg
          </div>
          <div className="col-span-3">alignment</div>
          <div className="hidden md:block col-span-2">sync_status</div>
        </div>

        <div className="divide-y divide-black/30 font-mono text-sm">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subj) => {
              const charId = subj.meta.character_id;
              const isActive = charId === activeSubjectId;
              const title = `${subj.identity.species} // ${subj.identity.background}`;
              return (
                <div
                  key={charId}
                  onClick={() => onSelectSubject(charId)}
                  className={`grid grid-cols-12 py-3 px-4 items-center cursor-pointer transition-colors ${
                    isActive ? 'bg-black text-parchment' : 'hover:bg-black/5'
                  }`}
                >
                  <div className="col-span-4 md:col-span-3 font-semibold tracking-wide flex items-center gap-1.5 uppercase">
                    {subj.identity.name}
                    {subj.is_custom && (
                      <span
                        className={`text-[9px] px-1 font-bold ${isActive ? 'bg-parchment text-black' : 'bg-black text-parchment'}`}
                      >
                        GEN
                      </span>
                    )}
                  </div>
                  <div className="col-span-5 md:col-span-4 text-xs font-medium uppercase text-[#5e5e5e]">
                    <span
                      className={isActive ? 'text-[#c9c6be]' : 'text-[#5e5e5e]'}
                    >
                      {title}
                    </span>
                  </div>
                  <div className="col-span-3 text-xs uppercase">
                    {subj.identity.alignment}
                  </div>
                  <div className="col-span-12 md:col-span-2 flex justify-between items-center text-[11px] font-light mt-1 md:mt-0">
                    <span
                      className={isActive ? 'text-[#c9c6be]' : 'text-[#5e5e5e]'}
                    >
                      {new Date(subj.meta.updatedAt).toLocaleDateString()}
                    </span>
                    {subj.is_custom && onDeleteSubject && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSubject(charId);
                        }}
                        className={`text-[9.5px] uppercase hover:underline ml-2 ${
                          isActive ? 'text-orange-300' : 'text-orange-800'
                        }`}
                      >
                        [PURGE]
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-[#5e5e5e] font-serif uppercase tracking-widest text-sm bg-white">
              No matching records registered in Sector database.
            </div>
          )}
        </div>
      </div>

      {/* Directory Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-black p-4 bg-black/5 flex flex-col justify-between">
          <span className="font-mono text-[10px] font-bold text-[#5e5e5e] uppercase tracking-wider mb-2">
            DATABASE_METRICS_STATUS
          </span>
          <div className="flex justify-between items-baseline text-sm font-mono">
            <span>CORE_NODES_CLUSTER:</span>
            <span className="font-bold">ACTIVE // STABLE</span>
          </div>
          <div className="flex justify-between items-baseline text-sm font-mono pt-1">
            <span>GRID_RESOLUTION_VEC:</span>
            <span className="font-bold">ORTHOGONAL // MITERED</span>
          </div>
          <div className="flex justify-between items-baseline text-sm font-mono pt-1">
            <span>OFF-GRID_PING_STATE:</span>
            <span className="font-bold text-teal-800 font-bold">
              SECURE_LINK
            </span>
          </div>
        </div>

        <div className="border border-black p-4 bg-black/5 flex flex-col justify-between">
          <span className="font-mono text-[10px] font-bold text-[#5e5e5e] uppercase tracking-wider mb-2">
            D&amp;D_RECORD_REGISTRY_COMPLIANCE
          </span>
          <p className="font-serif text-xs text-[#5e5e5e] leading-relaxed">
            Record definitions comply with standard D&amp;D 5.1 schemas.
            Subroutines and matrix allocations track character features from
            core active source files. Generated AI vectors compile cleanly with
            full structural validation.
          </p>
        </div>
      </div>
    </div>
  );
}
