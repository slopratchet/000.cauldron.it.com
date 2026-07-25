import React, { useState } from 'react';
import {
  ArrowRight,
  Trash2,
  ShieldAlert,
  Skull,
  Sword,
  Wand2,
  Sparkles,
  FlaskConical,
  Bone,
  Clock,
  Play,
  BookOpen,
  Edit3,
  PlusCircle,
  Swords,
  Plus,
} from 'lucide-react';
import { TomeEntry, Encounter } from './configTypes';

interface EntryCardProps {
  key?: React.Key;
  entry: TomeEntry;
  onClick: () => void;
  onDelete?: () => void;
  onActionTrigger?: (formula: string, name: string) => void;
  onAccess?: () => void;
  onEditWorld?: (entry: TomeEntry) => void;
  onStartCampaign?: (entry: TomeEntry) => void;
  onResumeSession?: (entry: TomeEntry) => void;
  onViewLog?: (entry: TomeEntry) => void;
  onToggleEncounter?: (encounterId: string) => void;
  onAddEncounter?: (adventureId: string, encounterName: string) => void;
}

export default function EntryCard({
  entry,
  onClick,
  onDelete,
  onActionTrigger,
  onAccess,
  onEditWorld,
  onStartCampaign,
  onResumeSession,
  onViewLog,
  onToggleEncounter,
  onAddEncounter,
}: EntryCardProps) {
  const [showAddEnc, setShowAddEnc] = useState(false);
  const [newEncName, setNewEncName] = useState('');

  const [editingEncId, setEditingEncId] = useState<string | null>(null);
  const [editEncName, setEditEncName] = useState('');
  const [editEncStatus, setEditEncStatus] = useState('in progress');
  const [encountersState, setEncountersState] = useState<Encounter[]>(
    entry.encounters || [],
  );

  React.useEffect(() => {
    setEncountersState(entry.encounters || []);
  }, [entry.encounters]);

  const handleSaveEnc = (encId: string) => {
    if (!editEncName.trim()) return;
    const updated = encountersState.map((enc) =>
      enc.id === encId
        ? { ...enc, name: editEncName.trim(), status: editEncStatus }
        : enc,
    );
    setEncountersState(updated);
    entry.encounters = updated;
    entry.clearedEncounters = updated.filter(
      (e) => e.status === 'cleared',
    ).length;

    // Sync with REST API
    fetch(`/api/entries/${entry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    }).catch((err) => console.error('REST API encounter update error:', err));

    setEditingEncId(null);
  };

  const isWorld = entry.isWorld || entry.name.toLowerCase() === 'mythrokahn';
  const isChild = !!entry.parentWorldId || entry.statusBadge === 'running';

  const encounters = entry.encounters || [];
  const hasEncounters = encounters.length > 0 || entry.type === 'beast';
  const clearedCount =
    entry.clearedEncounters ??
    encounters.filter((e) => e.status === 'cleared').length;
  const totalCount = entry.totalEncounters ?? encounters.length;

  const renderIcon = () => {
    const type =
      entry.iconType ||
      (isWorld ? 'skull' : entry.type === 'spell' ? 'flask' : 'bone');
    switch (type) {
      case 'skull':
        return <Skull className="w-6 h-6 text-primary dark:text-white" />;
      case 'flask':
        return (
          <FlaskConical className="w-6 h-6 text-primary dark:text-white" />
        );
      case 'bone':
        return <Bone className="w-6 h-6 text-primary dark:text-white" />;
      case 'sparkles':
      case 'relic':
        return (
          <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        );
      case 'wand':
      case 'spell':
        return (
          <Wand2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        );
      default:
        return (
          <Sword className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        );
    }
  };

  const statusBadge =
    entry.statusBadge ||
    (isWorld ? 'source world' : isChild ? 'running' : null);
  const sessionAge =
    entry.sessionAge || (isChild ? 'Session running for 3 days 11 hrs' : null);

  const primaryLabel =
    entry.primaryButtonLabel ||
    (isWorld
      ? 'Edit world'
      : isChild
        ? 'Resume session'
        : 'Experience Setting');

  const secondaryLabel =
    entry.secondaryButtonLabel ||
    (isWorld
      ? 'Start new campaign'
      : isChild
        ? 'View log'
        : 'Configure Campaign');

  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWorld && onEditWorld) {
      onEditWorld(entry);
    } else if (onResumeSession) {
      onResumeSession(entry);
    } else if (onActionTrigger) {
      onActionTrigger('1d20+2', primaryLabel);
    } else {
      onClick();
    }
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWorld && onStartCampaign) {
      onStartCampaign(entry);
    } else if (onViewLog) {
      onViewLog(entry);
    } else if (onActionTrigger) {
      onActionTrigger('1d20', secondaryLabel);
    } else {
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      className={`border-2 border-primary dark:border-white bg-background-light dark:bg-background-dark/30 hover:bg-white dark:hover:bg-black/50 transition-colors cursor-pointer relative group overflow-hidden p-5 flex flex-col justify-between gap-4 ${
        entry.isCustom
          ? 'border-dashed border-indigo-600 dark:border-indigo-400'
          : ''
      }`}
    >
      {/* Scribed Custom Seal */}
      {entry.isCustom && (
        <div className="absolute top-0 right-0 bg-indigo-600 dark:bg-indigo-400 text-white dark:text-black font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 z-10 font-bold flex items-center gap-1">
          <ShieldAlert className="w-2.5 h-2.5" />
          <span>Scribed</span>
        </div>
      )}

      <div>
        {/* Header section with category icon box, title, and status badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Dark/Light Iconic Box replacing ambiguous '+' */}
            <div className="w-12 h-12 shrink-0 border-2 border-primary dark:border-white bg-white dark:bg-zinc-900 flex items-center justify-center">
              {renderIcon()}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-primary dark:text-white break-words">
                {entry.name}
              </h3>
              <span className="font-mono text-[10px] text-primary/60 dark:text-white/60 uppercase tracking-wider block">
                {entry.pageRef}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          {statusBadge && (
            <div className="shrink-0 pt-0.5 font-mono text-[10px] uppercase font-bold tracking-wider">
              {statusBadge === 'source world' ? (
                <span className="border border-sky-600 dark:border-sky-400 text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5">
                  source world
                </span>
              ) : statusBadge === 'running' ? (
                <span className="border border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5">
                  running
                </span>
              ) : (
                <span className="border border-primary dark:border-white text-primary dark:text-white px-2 py-0.5">
                  {statusBadge}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Description text */}
        <p className="justified-slab text-sm leading-snug font-serif text-primary/80 dark:text-white/80 line-clamp-3 mb-3">
          {entry.description}
        </p>

        {/* Time reads as session age (replacing bomb countdown timer) */}
        {sessionAge && (
          <div className="flex items-center gap-1.5 font-mono text-xs text-primary/80 dark:text-white/80 mb-3 bg-primary/5 dark:bg-white/5 p-2 border border-primary/20 dark:border-white/20">
            <Clock className="w-3.5 h-3.5 shrink-0 text-primary dark:text-white opacity-80" />
            <span>{sessionAge}</span>
          </div>
        )}

        {/* CHILD ENCOUNTERS BLOCK (FOR ADVENTURES) */}
        {hasEncounters && (
          <div className="border-t border-primary/20 dark:border-white/20 pt-3 mt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold uppercase tracking-wider text-[10px] text-primary/70 dark:text-white/70 flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5 text-primary dark:text-white" />
                <span>Encounters ({totalCount})</span>
              </span>
              <span className="font-semibold text-[10px] text-primary/80 dark:text-white/80">
                {clearedCount} of {totalCount} cleared
              </span>
            </div>

            {/* List of Encounters as compressed single rows */}
            <div className="flex flex-col gap-1.5 my-1">
              {encounters.map((enc) => {
                const isCleared = enc.status === 'cleared';
                const isInProgress = enc.status === 'in progress';

                if (editingEncId === enc.id) {
                  return (
                    <div
                      key={enc.id}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 border-2 border-primary dark:border-white bg-white dark:bg-zinc-900 flex flex-col gap-1.5 font-mono text-xs"
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        Edit Encounter:
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editEncName}
                          onChange={(e) => setEditEncName(e.target.value)}
                          className="flex-1 bg-background-light dark:bg-background-dark border border-primary dark:border-white p-1 text-xs font-mono text-primary dark:text-white focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEnc(enc.id);
                          }}
                        />
                        <select
                          value={editEncStatus}
                          onChange={(e) => setEditEncStatus(e.target.value)}
                          className="bg-background-light dark:bg-background-dark border border-primary dark:border-white p-1 text-xs font-mono text-primary dark:text-white focus:outline-none uppercase"
                        >
                          <option value="in progress">In Progress</option>
                          <option value="cleared">Cleared</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      <div className="flex gap-2 text-[10px]">
                        <button
                          type="button"
                          onClick={() => handleSaveEnc(enc.id)}
                          className="flex-1 py-1 bg-primary text-background-light dark:bg-white dark:text-background-dark font-bold uppercase hover:opacity-90 cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingEncId(null)}
                          className="px-2 py-1 border border-primary dark:border-white font-bold uppercase hover:bg-primary/10 dark:hover:bg-white/10 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={enc.id}
                    className={`flex items-center justify-between p-2 px-2.5 border transition-all rounded-none font-mono text-xs font-semibold ${
                      isCleared
                        ? 'bg-primary/5 dark:bg-white/5 border-primary/20 dark:border-white/20 text-primary/50 dark:text-white/50 line-through'
                        : isInProgress
                          ? 'bg-sky-100/80 dark:bg-sky-950/50 border-sky-600 dark:border-sky-400 text-primary dark:text-white'
                          : 'bg-background-light dark:bg-background-dark border border-primary/30 dark:border-white/30 text-primary dark:text-white'
                    } hover:border-primary dark:hover:border-white`}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleEncounter) onToggleEncounter(enc.id);
                      }}
                      className="flex items-center gap-2 min-w-0 pr-2 cursor-pointer flex-1"
                      title="Click to toggle encounter status"
                    >
                      <Swords className="w-3 h-3 shrink-0 opacity-80" />
                      <span className="truncate">{enc.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingEncId(enc.id);
                          setEditEncName(enc.name);
                          setEditEncStatus(enc.status);
                        }}
                        className="px-1.5 py-0.5 border border-primary/30 dark:border-white/30 hover:border-primary dark:hover:border-white bg-background-light dark:bg-background-dark text-[9px] uppercase font-bold tracking-wider flex items-center gap-1 text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white cursor-pointer no-underline"
                        title="Edit encounter details"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>Edit encounter</span>
                      </button>

                      {/* Status Pill */}
                      {isCleared ? (
                        <span className="border border-primary/30 dark:border-white/30 text-primary/50 dark:text-white/50 bg-primary/5 dark:bg-white/5 text-[9px] px-1.5 py-0.5 uppercase font-bold tracking-wider shrink-0 no-underline">
                          cleared
                        </span>
                      ) : isInProgress ? (
                        <span className="border border-sky-600 dark:border-sky-400 text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 text-[9px] px-1.5 py-0.5 uppercase font-bold tracking-wider shrink-0 no-underline">
                          in progress
                        </span>
                      ) : (
                        <span className="border border-primary/40 dark:border-white/40 text-primary/70 dark:text-white/70 text-[9px] px-1.5 py-0.5 uppercase font-bold tracking-wider shrink-0 no-underline">
                          {enc.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* + Add Encounter control */}
            {showAddEnc ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="p-2 border border-dashed border-primary dark:border-white bg-background-light dark:bg-background-dark flex flex-col gap-1.5 font-mono text-xs"
              >
                <input
                  type="text"
                  value={newEncName}
                  onChange={(e) => setNewEncName(e.target.value)}
                  placeholder="New encounter name..."
                  className="bg-white dark:bg-background-dark border border-primary dark:border-white px-2 py-1 text-xs font-mono text-primary dark:text-white focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newEncName.trim()) {
                      if (onAddEncounter)
                        onAddEncounter(entry.id, newEncName.trim());
                      setNewEncName('');
                      setShowAddEnc(false);
                    }
                  }}
                />
                <div className="flex gap-2 text-[10px]">
                  <button
                    type="button"
                    onClick={() => {
                      if (newEncName.trim() && onAddEncounter) {
                        onAddEncounter(entry.id, newEncName.trim());
                      }
                      setNewEncName('');
                      setShowAddEnc(false);
                    }}
                    className="flex-1 py-1 bg-primary text-background-light dark:bg-white dark:text-background-dark font-bold uppercase hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddEnc(false)}
                    className="px-2 py-1 border border-primary dark:border-white font-bold uppercase hover:bg-primary/10 dark:hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddEnc(true);
                }}
                className="py-1 px-2 border border-dashed border-primary/40 dark:border-white/40 hover:border-primary dark:hover:border-white font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white"
              >
                <Plus className="w-3 h-3" />
                <span>+ Add encounter</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons styled in previous brutalist grimoire aesthetic */}
      <div className="mt-auto pt-4 border-t border-primary/20 dark:border-white/20 flex flex-col sm:flex-row gap-2 w-full font-mono text-[10px] uppercase">
        <button
          type="button"
          onClick={handlePrimaryClick}
          className="flex-1 py-2 px-3 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-all duration-150 flex items-center justify-center gap-1.5 font-bold tracking-wider cursor-pointer focus:outline-none"
        >
          {isWorld ? (
            <Edit3 className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          <span>{primaryLabel}</span>
        </button>

        <button
          type="button"
          onClick={handleSecondaryClick}
          className="flex-1 py-2 px-3 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-all duration-150 flex items-center justify-center gap-1.5 font-bold tracking-wider cursor-pointer focus:outline-none"
        >
          {isWorld ? (
            <PlusCircle className="w-3.5 h-3.5" />
          ) : (
            <BookOpen className="w-3.5 h-3.5" />
          )}
          <span>{secondaryLabel}</span>
        </button>

        {entry.isCustom && onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 border border-primary/20 hover:border-rose-600 dark:border-white/20 dark:hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            title="Delete custom entry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
