import React, { useState } from 'react';
import type { Character } from '../types';
import {
  UserPlus,
  Sparkles,
  Trash2,
  HeartCrack,
  Skull,
  CircleDot,
  RefreshCw,
  Send,
} from 'lucide-react';

interface PsychProfilesProps {
  characters: Character[];
  onUpdateCharacters: (chars: Character[]) => void;
  onSelectCharacter?: (charName: string) => void;
}

export default function PsychProfiles({
  characters,
  onUpdateCharacters,
  onSelectCharacter,
}: PsychProfilesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState<string | null>(null);

  // Form states
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState<
    'ACTIVE' | 'DECEASED' | 'MIA' | 'CLASSIFIED'
  >('ACTIVE');

  const handleAddSubject = () => {
    if (!newName) return;
    const cleanName = newName.toUpperCase().replace('SUBJECT_', '');
    const finalSubjectName = `SUBJECT_0${characters.length + 1}: ${cleanName}`;

    const newChar: Character = {
      id: `char_${Date.now()}`,
      name: finalSubjectName,
      role: newRole || 'Operative',
      description: 'Awaiting psychologal telemetry analysis...',
      notes: '>> Note: Diagnostic logs unparsed.',
      status: newStatus,
    };

    onUpdateCharacters([...characters, newChar]);
    setIsAdding(false);
    setNewName('');
    setNewRole('');
    setNewStatus('ACTIVE');
  };

  const handleRemoveSubject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateCharacters(characters.filter((c) => c.id !== id));
  };

  const handleAiScan = async (char: Character, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoadingAi(char.id);
    try {
      // Striking out 'SUBJECT_X: ' prefix to get cleaner context
      const pureName = char.name.split(':').pop()?.trim() || char.name;
      const res = await fetch('/api/generate-psych', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: pureName,
          role: char.role,
          status: char.status,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const updated = characters.map((c) => {
          if (c.id === char.id) {
            return {
              ...c,
              description: data.description,
              notes: data.notes,
            };
          }
          return c;
        });
        onUpdateCharacters(updated);
      } else {
        alert(data.error || 'Diagnostic Scan failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Network failure connecting to dossier analysis suite.');
    } finally {
      setIsLoadingAi(null);
    }
  };

  return (
    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
      <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-1">
        <h2 className="font-mono text-xs font-bold text-black tracking-widest flex items-center gap-1.5">
          <CircleDot className="w-3.5 h-3.5 text-black" />
          PSYCH_PROFILES
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="font-mono text-[10px] uppercase font-bold border border-black px-1.5 py-0.5 bg-parchment-deep hover:bg-black hover:text-parchment-deep transition-all duration-100 flex items-center gap-1 cursor-pointer"
          id="btn-add-profile"
        >
          <UserPlus className="w-3 h-3" /> ADD_SUBJ
        </button>
      </div>

      {isAdding && (
        <div className="border border-black p-3 bg-parchment-deep/30 space-y-2.5 font-mono text-xs">
          <div>
            <label className="block text-[10px] font-bold text-gray-700">
              SUBJECT NAME:
            </label>
            <input
              type="text"
              placeholder="e.g. Ned Plimpton"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-black bg-white p-1 focus:ring-1 focus:ring-black focus:outline-none uppercase"
              id="new-subj-name"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-700">
              ROLE / CALLSIGN:
            </label>
            <input
              type="text"
              placeholder="e.g. Co-Pilot / Camera Operative"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border border-black bg-white p-1 focus:ring-1 focus:ring-black focus:outline-none"
              id="new-subj-role"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-700">
                STATUS:
              </label>
              <select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(
                    e.target.value as 'alive' | 'deceased' | 'mia' | 'unknown',
                  )
                }
                className="w-full border border-black bg-white p-1 text-xs focus:ring-1 focus:ring-black focus:outline-none"
                id="new-subj-status"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="DECEASED">DECEASED</option>
                <option value="MIA">MIA</option>
                <option value="CLASSIFIED">CLASSIFIED</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddSubject}
                className="w-full border-2 border-black bg-black text-white hover:bg-white hover:text-black font-bold p-1 transition-colors text-center text-[10px] cursor-pointer"
                id="btn-confirm-subj"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
        {characters.map((char) => {
          const pureName = char.name.split(':').pop()?.trim() || char.name;
          const subjectCode = char.name.split(':')[0] || 'SUBJECT';

          return (
            <div
              key={char.id}
              onClick={() => onSelectCharacter?.(pureName)}
              className="border-b border-gray-200 pb-3 last:border-0 hover:bg-parchment-deep/20 p-1.5 transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-mono text-[10px] text-gray-500 font-bold block leading-none">
                    {subjectCode}
                  </span>
                  <h3 className="font-mono text-xs font-bold text-black tracking-tight group-hover:text-blood-red transition-colors">
                    {pureName}
                  </h3>
                  <span className="font-mono text-[10px] italic text-zinc-600 block">
                    {char.role}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[9px] px-1 py-0.5 border font-bold flex items-center gap-1 ${
                      char.status === 'DECEASED'
                        ? 'border-blood-red text-blood-red bg-red-100/30'
                        : char.status === 'ACTIVE'
                          ? 'border-black text-black bg-zinc-100'
                          : 'border-yellow-600 text-yellow-600 bg-yellow-50'
                    }`}
                  >
                    {char.status === 'DECEASED' && (
                      <Skull className="w-2.5 h-2.5" />
                    )}
                    {char.status === 'ACTIVE' && (
                      <HeartCrack className="w-2.5 h-2.5" />
                    )}
                    {char.status}
                  </span>
                  <button
                    onClick={(e) => handleRemoveSubject(char.id, e)}
                    className="p-1 hover:text-blood-red hover:bg-red-50 text-gray-400 opacity-20 group-hover:opacity-100 transition-opacity"
                    title="Remove dossier entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="border-l-2 border-black pl-2 py-0.5 my-1.5">
                <p className="font-serif text-xs text-black leading-relaxed">
                  {char.description}
                </p>
              </div>

              {char.notes && (
                <div className="red-ink text-[10px] mt-1 pr-1 font-mono leading-tight">
                  {char.notes}
                </div>
              )}

              {/* AI Scan trigger */}
              <div className="mt-2 text-right">
                <button
                  onClick={(e) => handleAiScan(char, e)}
                  disabled={isLoadingAi !== null}
                  className="font-mono text-[9px] uppercase tracking-normal border border-dashed border-gray-300 hover:border-black hover:bg-black hover:text-white text-gray-500 transition-all font-bold px-1.5 py-0.5 inline-flex items-center gap-1 cursor-pointer"
                  id={`ai-scan-${char.id}`}
                >
                  {isLoadingAi === char.id ? (
                    <>
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />{' '}
                      SCANNING...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-2.5 h-2.5 text-intel-orange" />{' '}
                      AI_DIAGNOSTIC_SCAN
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
