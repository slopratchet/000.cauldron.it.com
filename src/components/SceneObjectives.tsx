import React, { useState } from 'react';
import type { SceneObjective } from '../types';
import {
  CheckSquare,
  Square,
  AlertTriangle,
  ListChecks,
  Plus,
  Trash2,
} from 'lucide-react';

interface SceneObjectivesProps {
  objectives: SceneObjective[];
  onUpdateObjectives: (objs: SceneObjective[]) => void;
  onArmedChange?: (isArmed: boolean) => void;
}

export default function SceneObjectives({
  objectives,
  onUpdateObjectives,
  onArmedChange,
}: SceneObjectivesProps) {
  const [newObjectiveText, setNewObjectiveText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleObjective = (id: string) => {
    const updated = objectives.map((obj) => {
      if (obj.id === id) {
        const nextState = !obj.checked;
        // Trigger specific weapon siren checks
        if (obj.isCritical) {
          onArmedChange?.(nextState);
        }
        return { ...obj, checked: nextState };
      }
      return obj;
    });
    onUpdateObjectives(updated);
  };

  const handleAddObjective = () => {
    if (!newObjectiveText) return;
    const isWeapons = newObjectiveText.toLowerCase().includes('weapon');
    const newObj: SceneObjective = {
      id: `obj_${Date.now()}`,
      text: newObjectiveText,
      checked: false,
      isCritical: isWeapons,
    };
    onUpdateObjectives([...objectives, newObj]);
    setNewObjectiveText('');
    setIsAdding(false);
  };

  const deleteObjective = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const original = objectives.find((o) => o.id === id);
    if (original?.isCritical && original.checked) {
      onArmedChange?.(false);
    }
    onUpdateObjectives(objectives.filter((obj) => obj.id !== id));
  };

  return (
    <div className="border-2 border-black bg-black text-parchment-deep p-4 shadow-[8px_8px_0px_0px_rgba(209,9,25,1)] relative transition-all">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
        <h2 className="font-mono text-xs font-bold text-intel-orange tracking-wider flex items-center gap-1.5">
          <ListChecks className="w-3.5 h-3.5 text-intel-orange" />
          SCENE_OBJECTIVES_CRITICAL
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-[9px] uppercase font-mono px-1 bg-zinc-800 text-parchment-deep border border-gray-600 hover:bg-white hover:text-black transition-colors cursor-pointer"
          id="btn-add-objective"
        >
          + ADD
        </button>
      </div>

      {isAdding && (
        <div className="border border-zinc-700 p-2.5 bg-zinc-900 mb-3 space-y-2 text-xs font-mono">
          <input
            type="text"
            placeholder="e.g. Evacuate through escape hatch"
            value={newObjectiveText}
            onChange={(e) => setNewObjectiveText(e.target.value)}
            className="w-full border border-gray-600 bg-black text-white p-1 focus:outline-none"
            id="input-obj-text"
          />
          <button
            onClick={handleAddObjective}
            className="w-full bg-intel-orange text-black py-0.5 font-bold hover:bg-white transition-colors cursor-pointer"
            id="btn-confirm-objective"
          >
            CONFIRM OBJ
          </button>
        </div>
      )}

      <ul className="space-y-2.5 font-mono text-[11px] tracking-tight">
        {objectives.map((obj) => (
          <li
            key={obj.id}
            onClick={() => toggleObjective(obj.id)}
            className="flex items-start justify-between gap-1.5 group cursor-pointer hover:bg-zinc-900/40 p-1"
          >
            <div className="flex items-start gap-2 max-w-[85%]">
              <span className="mt-0.5 select-none text-zinc-400 group-hover:text-white transition-colors">
                {obj.checked ? (
                  <CheckSquare
                    className={`w-4 h-4 ${obj.isCritical ? 'text-blood-red' : 'text-intel-orange'}`}
                  />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </span>
              <span
                className={`${obj.checked ? 'line-through text-zinc-500' : 'text-parchment-deep'} ${
                  obj.isCritical ? 'text-blood-red font-bold' : ''
                }`}
              >
                {obj.text}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {obj.isCritical && (
                <span
                  className="text-blood-red animate-pulse"
                  title="System critical warning"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                </span>
              )}
              <button
                onClick={(e) => deleteObjective(obj.id, e)}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
