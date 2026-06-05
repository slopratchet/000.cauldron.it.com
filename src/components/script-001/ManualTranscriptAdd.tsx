import React, { useState } from 'react';
import { Operation, ScriptLine, Character } from './types';
import { Plus } from 'lucide-react';

interface ManualTranscriptAddProps {
  operation: Operation;
  onUpdateLines: (lines: ScriptLine[]) => void;
  characters: Character[];
}

export default function ManualTranscriptAdd({
  operation,
  onUpdateLines,
  characters,
}: ManualTranscriptAddProps) {
  const [isAddingLine, setIsAddingLine] = useState(false);
  const [newLineType, setNewLineType] = useState<
    'heading' | 'action' | 'dialogue' | 'alert'
  >('dialogue');
  const [newCharacterName, setNewCharacterName] = useState('STEVE');
  const [newParenthetical, setNewParenthetical] = useState('');
  const [newLineText, setNewLineText] = useState('');

  const handleAddLineManual = () => {
    if (!newLineText) return;

    const newLine: ScriptLine = {
      id: `line_${Date.now()}`,
      type: newLineType,
      characterName:
        newLineType === 'dialogue' ? newCharacterName.toUpperCase() : undefined,
      parenthetical:
        newLineType === 'dialogue' && newParenthetical
          ? `(${newParenthetical})`
          : undefined,
      text: newLineText,
    };

    onUpdateLines([...operation.scriptLines, newLine]);
    setNewLineText('');
    setNewParenthetical('');
    setIsAddingLine(false);
  };

  return (
    <div className="border border-black bg-zinc-105 p-3.5 bg-zinc-100 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      {isAddingLine ? (
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-black text-white p-1 select-none font-bold">
            <span className="text-[10px] tracking-wide">ADD_LEDGER_BLOCK</span>
            <button
              onClick={() => setIsAddingLine(false)}
              className="text-[9px] px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-600 cursor-pointer"
            >
              CANCEL
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[9px] font-bold text-gray-500 mb-0.5">
                BLOCK TYPE:
              </label>
              <select
                value={newLineType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewLineType(
                    e.target.value as
                      | 'heading'
                      | 'action'
                      | 'dialogue'
                      | 'alert',
                  )
                }
                className="w-full border border-black bg-white p-1 text-[11px] focus:ring-1 focus:ring-black focus:outline-none font-bold"
                id="select-sidebar-line-type"
              >
                <option value="dialogue">DIALOGUE / VOICE</option>
                <option value="action">VISUAL ACTION</option>
                <option value="heading">TIMELINE HEADING</option>
                <option value="alert">CLASSIFIED ALERT</option>
              </select>
            </div>

            {newLineType === 'dialogue' && (
              <div>
                <label className="block text-[9px] font-bold text-gray-500 mb-0.5">
                  SPEAKER:
                </label>
                <input
                  type="text"
                  value={newCharacterName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewCharacterName(e.target.value)
                  }
                  className="w-full border border-black bg-white p-1 text-[11px] focus:ring-1 focus:ring-black focus:outline-none uppercase font-bold"
                  placeholder="e.g. STEVE, KLAUS, NED"
                  id="input-sidebar-speaker-name"
                />
              </div>
            )}
          </div>

          {newLineType === 'dialogue' && (
            <div>
              <label className="block text-[9px] font-bold text-gray-500 mb-0.5">
                PARENTHETICAL ACTORS:
              </label>
              <input
                type="text"
                value={newParenthetical}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewParenthetical(e.target.value)
                }
                placeholder="e.g. looking down slowly"
                className="w-full border border-black bg-white p-1 text-[11px] focus:ring-1 focus:ring-black focus:outline-none"
                id="input-sidebar-parenthetical"
              />
            </div>
          )}

          <div>
            <label className="block text-[9px] font-bold text-gray-500 mb-0.5">
              RAW TRANSCRIPT TEXT:
            </label>
            <textarea
              value={newLineText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNewLineText(e.target.value)
              }
              placeholder="Enter screenplay dialogue/action text..."
              className="w-full border border-black bg-white p-1.5 text-[11px] focus:ring-1 focus:ring-black focus:outline-none h-14"
              id="textarea-sidebar-line-text"
            />
          </div>

          <button
            onClick={handleAddLineManual}
            className="w-full bg-black text-white hover:bg-neutral-800 font-extrabold py-1.5 text-center flex items-center justify-center gap-1.5 cursor-pointer text-[10px] uppercase transition-colors"
            id="btn-sidebar-save-line"
          >
            <Plus className="w-3 h-3" /> ATTACH_BLOCK_TO_LEDGER
          </button>
        </div>
      ) : (
        <div className="flex justify-center select-none">
          <button
            onClick={() => setIsAddingLine(true)}
            className="w-full border border-dashed border-gray-400 hover:border-black bg-white hover:bg-neutral-50 py-2.5 font-mono text-[10px] uppercase font-bold text-gray-600 hover:text-black transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            id="btn-sidebar-trigger-add"
          >
            <Plus className="w-3.5 h-3.5 text-gray-600 group-hover:text-black" />{' '}
            ADD_MANUAL_TRANSCRIPT_LINE
          </button>
        </div>
      )}
    </div>
  );
}
