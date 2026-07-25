import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Skull,
  FlaskConical,
  BookOpen,
  Sword,
  Play,
  Edit3,
  PlusCircle,
  Clock,
  Swords,
  Plus,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { TomeEntry, Adventure, Encounter } from './configTypes';

interface NestedHierarchyCardProps {
  worldEntry: TomeEntry;
  campaigns: TomeEntry[];
  hideWorld?: boolean;
  hideCampaigns?: boolean;
  onSelectEntry: (entry: TomeEntry) => void;
  onEditWorld?: (entry: TomeEntry) => void;
  onStartCampaign?: (entry: TomeEntry) => void;
  onResumeSession?: (entry: TomeEntry) => void;
  onViewLog?: (entry: TomeEntry) => void;
  onAddAdventure?: (campaignId: string, adventureName: string) => void;
  onToggleEncounter?: (
    campaignId: string,
    adventureId: string,
    encounterId: string,
  ) => void;
  onNotification?: (msg: string) => void;
}

function CampaignTimer({ initialSeconds = 157 }: { initialSeconds?: number }) {
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTotalSeconds((prev) => prev + 3600);
  };

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const pad = (n: number, digits: number = 2) =>
    String(n).padStart(digits, '0');

  return (
    <div className="mt-2 pt-1 select-none" onClick={(e) => e.stopPropagation()}>
      <hr className="border-t border-primary/30 dark:border-white/30 mb-3" />

      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {/* DAY */}
        <div className="flex-1 border-2 border-primary dark:border-white bg-[#e6e2d8] dark:bg-[#1a1a18] flex flex-col items-center overflow-hidden">
          <div className="py-2 text-xl sm:text-2xl font-mono font-black text-primary dark:text-white tracking-widest">
            {pad(days, 3)}
          </div>
          <div className="w-full bg-primary dark:bg-black text-background-light dark:text-white text-center py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase border-t border-primary dark:border-white">
            DAY
          </div>
        </div>

        <span className="font-mono font-black text-lg sm:text-xl text-primary dark:text-white">
          :
        </span>

        {/* HRS */}
        <div className="flex-1 border-2 border-primary dark:border-white bg-[#e6e2d8] dark:bg-[#1a1a18] flex flex-col items-center overflow-hidden">
          <div className="py-2 text-xl sm:text-2xl font-mono font-black text-primary dark:text-white tracking-widest">
            {pad(hours)}
          </div>
          <div className="w-full bg-primary dark:bg-black text-background-light dark:text-white text-center py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase border-t border-primary dark:border-white">
            HRS
          </div>
        </div>

        <span className="font-mono font-black text-lg sm:text-xl text-primary dark:text-white">
          :
        </span>

        {/* MIN */}
        <div className="flex-1 border-2 border-primary dark:border-white bg-[#e6e2d8] dark:bg-[#1a1a18] flex flex-col items-center overflow-hidden">
          <div className="py-2 text-xl sm:text-2xl font-mono font-black text-primary dark:text-white tracking-widest">
            {pad(mins)}
          </div>
          <div className="w-full bg-primary dark:bg-black text-background-light dark:text-white text-center py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase border-t border-primary dark:border-white">
            MIN
          </div>
        </div>

        <span className="font-mono font-black text-lg sm:text-xl text-primary dark:text-white">
          :
        </span>

        {/* SEC */}
        <div className="flex-1 border-2 border-primary dark:border-white bg-[#e6e2d8] dark:bg-[#1a1a18] flex flex-col items-center overflow-hidden">
          <div className="py-2 text-xl sm:text-2xl font-mono font-black text-primary dark:text-white tracking-widest">
            {pad(secs)}
          </div>
          <div className="w-full bg-primary dark:bg-black text-background-light dark:text-white text-center py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase border-t border-primary dark:border-white">
            SEC
          </div>
        </div>
      </div>

      <hr className="border-t border-primary/30 dark:border-white/30 my-3" />

      <motion.button
        type="button"
        whileTap={{ x: [-6, 6, -4, 4, -2, 2, 0], scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onClick={handleIncrease}
        className="w-full border-2 border-primary dark:border-white bg-[#e6e2d8] dark:bg-[#1a1a18] hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors py-2 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
      >
        <PlusCircle className="w-4 h-4 shrink-0" />
        <span>[ INCREASE RUN TIME ]</span>
      </motion.button>
    </div>
  );
}

export default function NestedHierarchyCard({
  worldEntry,
  campaigns,
  hideWorld = false,
  hideCampaigns = false,
  onSelectEntry,
  onEditWorld,
  onStartCampaign,
  onResumeSession,
  onViewLog,
  onAddAdventure,
  onToggleEncounter,
  onNotification,
}: NestedHierarchyCardProps) {
  const [localCampaigns, setLocalCampaigns] = useState<TomeEntry[]>(campaigns);

  React.useEffect(() => {
    setLocalCampaigns(campaigns);
  }, [campaigns]);
  const [newAdvInput, setNewAdvInput] = useState<Record<string, string>>({});
  const [newAdvStatus, setNewAdvStatus] = useState<Record<string, string>>({});
  const [showAddForm, setShowAddForm] = useState<Record<string, boolean>>({});

  const [editingAdvId, setEditingAdvId] = useState<string | null>(null);
  const [editAdvName, setEditAdvName] = useState<string>('');
  const [editAdvStatus, setEditAdvStatus] = useState<string>('active');

  const [editingEncId, setEditingEncId] = useState<string | null>(null);
  const [editEncName, setEditEncName] = useState<string>('');
  const [editEncStatus, setEditEncStatus] = useState<string>('in progress');

  // Sync prop changes if campaigns update
  React.useEffect(() => {
    setLocalCampaigns(campaigns);
  }, [campaigns]);

  const handleSaveAdventure = (campaignId: string, adventureId: string) => {
    if (!editAdvName.trim()) return;
    setLocalCampaigns((prev) =>
      prev.map((camp) => {
        if (camp.id !== campaignId || !camp.adventures) return camp;
        const updatedAdventures = camp.adventures.map((adv) => {
          if (adv.id !== adventureId) return adv;
          return {
            ...adv,
            name: editAdvName.trim(),
            statusBadge: editAdvStatus,
          };
        });
        const updated = { ...camp, adventures: updatedAdventures };

        fetch(`/api/entries/${campaignId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((err) =>
          console.error('REST API adventure update error:', err),
        );

        return updated;
      }),
    );

    if (onNotification) {
      onNotification(`Adventure updated: "${editAdvName.trim()}"`);
    }
    setEditingAdvId(null);
  };

  const handleSaveEncounter = (
    campaignId: string,
    adventureId: string,
    encounterId: string,
  ) => {
    if (!editEncName.trim()) return;
    setLocalCampaigns((prev) =>
      prev.map((camp) => {
        if (camp.id !== campaignId || !camp.adventures) return camp;
        const updatedAdventures = camp.adventures.map((adv) => {
          if (adv.id !== adventureId) return adv;
          const updatedEncounters = adv.encounters.map((enc) => {
            if (enc.id !== encounterId) return enc;
            return {
              ...enc,
              name: editEncName.trim(),
              status: editEncStatus,
            };
          });
          const clearedCount = updatedEncounters.filter(
            (e) => e.status === 'cleared',
          ).length;
          return {
            ...adv,
            encounters: updatedEncounters,
            clearedEncounters: clearedCount,
          };
        });
        const updated = { ...camp, adventures: updatedAdventures };

        fetch(`/api/entries/${campaignId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((err) =>
          console.error('REST API encounter update error:', err),
        );

        return updated;
      }),
    );

    if (onNotification) {
      onNotification(
        `Encounter updated: "${editEncName.trim()}" (${editEncStatus})`,
      );
    }
    setEditingEncId(null);
  };

  const handleToggleEnc = (
    campaignId: string,
    adventureId: string,
    encounterId: string,
  ) => {
    setLocalCampaigns((prev) =>
      prev.map((camp) => {
        if (camp.id !== campaignId || !camp.adventures) return camp;
        const updatedAdventures = camp.adventures.map((adv) => {
          if (adv.id !== adventureId) return adv;
          const updatedEncounters = adv.encounters.map((enc) => {
            if (enc.id !== encounterId) return enc;
            const newStatus =
              enc.status === 'cleared' ? 'in progress' : 'cleared';
            if (onNotification) {
              onNotification(
                `Encounter "${enc.name}" updated to: ${newStatus}`,
              );
            }
            return { ...enc, status: newStatus };
          });
          const clearedCount = updatedEncounters.filter(
            (e) => e.status === 'cleared',
          ).length;
          return {
            ...adv,
            encounters: updatedEncounters,
            clearedEncounters: clearedCount,
          };
        });
        return { ...camp, adventures: updatedAdventures };
      }),
    );

    if (onToggleEncounter) {
      onToggleEncounter(campaignId, adventureId, encounterId);
    }
  };

  const handleCreateAdventure = (campaignId: string) => {
    const advName = newAdvInput[campaignId]?.trim();
    if (!advName) return;

    const advStatus = newAdvStatus[campaignId] || 'pending';

    const newAdv: Adventure = {
      id: `adv-${Date.now()}`,
      name: advName,
      statusBadge: advStatus,
      clearedEncounters: 0,
      totalEncounters: 2,
      encounters: [
        {
          id: `enc-${Date.now()}-1`,
          name: 'Initial Vanguard',
          status: 'in progress',
        },
        {
          id: `enc-${Date.now()}-2`,
          name: 'Chamber Threshold',
          status: 'pending',
        },
      ],
    };

    setLocalCampaigns((prev) =>
      prev.map((camp) => {
        if (camp.id !== campaignId) return camp;
        const currentAdvs = camp.adventures || [];
        return { ...camp, adventures: [...currentAdvs, newAdv] };
      }),
    );

    if (onAddAdventure) {
      onAddAdventure(campaignId, advName);
    }

    if (onNotification) {
      onNotification(`New adventure "${advName}" added to campaign!`);
    }

    setNewAdvInput((prev) => ({ ...prev, [campaignId]: '' }));
    setShowAddForm((prev) => ({ ...prev, [campaignId]: false }));
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-primary dark:text-white">
      {/* =========================================================================
          LEVEL 1: WORLD (source world)
         ========================================================================= */}
      {!hideWorld && (
        <div>
          <div className="text-primary/70 dark:text-white/70 text-xs font-mono mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-sky-600 dark:bg-sky-400 animate-pulse rounded-full"></span>
            <span className="font-bold uppercase tracking-wider">
              World · original setting
            </span>
          </div>

          <div
            onClick={() => onSelectEntry(worldEntry)}
            className="border-2 border-primary dark:border-white bg-background-light dark:bg-background-dark/30 p-5 rounded-none relative group cursor-pointer hover:bg-white dark:hover:bg-black/50 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-12 h-12 shrink-0 border-2 border-primary dark:border-white bg-white dark:bg-background-dark flex items-center justify-center">
                  <Skull className="w-6 h-6 text-primary dark:text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-primary dark:text-white">
                    {worldEntry.name}
                  </h3>
                  <span className="font-mono text-[10px] text-primary/60 dark:text-white/60 uppercase tracking-wider block">
                    {worldEntry.pageRef || 'PAGE 112'}
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <span className="shrink-0 border border-sky-600 dark:border-sky-400 text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider">
                {worldEntry.statusBadge || 'source world'}
              </span>
            </div>

            {/* Description */}
            <p className="justified-slab text-sm leading-snug font-serif text-primary/80 dark:text-white/80 mb-4">
              {worldEntry.description}
            </p>

            {/* Buttons */}
            <div className="pt-3 border-t border-primary/20 dark:border-white/20 flex flex-col sm:flex-row gap-2 font-mono text-[10px] uppercase">
              <motion.button
                type="button"
                whileTap={{ x: [-6, 6, -4, 4, -2, 2, 0], scale: 0.97 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onEditWorld) onEditWorld(worldEntry);
                }}
                className="flex-1 py-2 px-3 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{worldEntry.primaryButtonLabel || 'Edit world'}</span>
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ x: [-6, 6, -4, 4, -2, 2, 0], scale: 0.97 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onStartCampaign) onStartCampaign(worldEntry);
                }}
                className="flex-1 py-2 px-3 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>
                  {worldEntry.secondaryButtonLabel || 'Start new campaign'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONNECTOR LEVEL 1 -> 2: "↳ Campaign cloned from this world"
         ========================================================================= */}
      {!hideWorld && !hideCampaigns && (
        <div className="text-primary/70 dark:text-white/70 text-xs font-mono my-1 flex items-center gap-2 pl-2">
          <span className="text-primary dark:text-white font-bold text-base">
            ↳
          </span>
          <span className="font-bold uppercase tracking-wider">
            Campaign cloned from this world
          </span>
        </div>
      )}

      {/* =========================================================================
          LEVEL 2: CAMPAIGN (running)
         ========================================================================= */}
      {!hideCampaigns && (
        <div className="flex flex-col gap-4 pl-0 md:pl-0">
          {localCampaigns.map((camp) => {
            const adventures = camp.adventures || [];
            return (
              <div
                key={camp.id}
                className="border-2 border-primary dark:border-white bg-background-light dark:bg-background-dark/50 p-5 rounded-none flex flex-col gap-4"
              >
                {/* Campaign Header */}
                <div
                  onClick={() => onSelectEntry(camp)}
                  className="cursor-pointer group flex items-start justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 shrink-0 border-2 border-primary dark:border-white bg-white dark:bg-background-dark flex items-center justify-center">
                      <FlaskConical className="w-6 h-6 text-primary dark:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-black uppercase tracking-tight text-primary dark:text-white group-hover:underline">
                        {camp.name}
                      </h3>
                      <p className="justified-slab text-sm font-serif leading-snug text-primary/80 dark:text-white/80 line-clamp-2 mt-0.5">
                        {camp.description}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className="shrink-0 border border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider">
                    {camp.statusBadge || 'running'}
                  </span>
                </div>

                {/* Session Age Row */}
                <div className="flex items-center gap-1.5 font-mono text-xs text-primary/80 dark:text-white/80 bg-primary/5 dark:bg-white/5 p-2 border border-primary/20 dark:border-white/20">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {camp.sessionAge || 'Session running for 3 days 11 hrs'}
                  </span>
                </div>

                {/* Campaign Buttons: Edit world, View campaign log & + Add adventure */}
                <div className="pt-3 border-t border-primary/20 dark:border-white/20 flex flex-col sm:flex-row gap-2 font-mono text-[10px] uppercase">
                  <motion.button
                    type="button"
                    whileTap={{ x: [-6, 6, -4, 4, -2, 2, 0], scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEditWorld) onEditWorld(camp);
                    }}
                    className="flex-1 py-2 px-3 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit world</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{ x: [-6, 6, -4, 4, -2, 2, 0], scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewLog) onViewLog(camp);
                    }}
                    className="flex-1 py-2 px-3 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {camp.primaryButtonLabel || 'View campaign log'}
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{ x: [-6, 6, -4, 4, -2, 2, 0], scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddForm((prev) => ({
                        ...prev,
                        [camp.id]: !prev[camp.id],
                      }));
                    }}
                    className="flex-1 py-2 px-3 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>
                      {camp.secondaryButtonLabel || '+ Add adventure'}
                    </span>
                  </motion.button>
                </div>

                {/* =========================================================================
                  CONNECTOR LEVEL 2 -> 3: "↳ Adventures in this campaign"
                 ========================================================================= */}
                {(adventures.length > 0 || showAddForm[camp.id]) && (
                  <div className="border-t border-primary/20 dark:border-white/20 pt-3">
                    <div className="text-primary/70 dark:text-white/70 text-xs font-mono mb-3 flex items-center gap-2 pl-1">
                      <span className="text-primary dark:text-white font-bold text-base">
                        ↳
                      </span>
                      <span className="font-bold uppercase tracking-wider">
                        Adventures in this campaign
                      </span>
                    </div>

                    {/* =========================================================================
                    LEVEL 3: ADVENTURE (active)
                   ========================================================================= */}
                    <div className="flex flex-col gap-3 pl-2 md:pl-4">
                      {adventures.map((adv) => {
                        const encounters = adv.encounters || [];
                        const clearedCount =
                          adv.clearedEncounters ??
                          encounters.filter((e) => e.status === 'cleared')
                            .length;
                        const totalCount =
                          adv.totalEncounters ?? encounters.length;

                        return (
                          <div
                            key={adv.id}
                            className="border-2 border-primary dark:border-white bg-background-light dark:bg-background-dark/80 p-4 rounded-none flex flex-col gap-3"
                          >
                            {/* Adventure Header */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <BookOpen className="w-5 h-5 text-primary dark:text-white shrink-0" />
                                <div>
                                  <h4 className="font-display font-bold text-base uppercase tracking-tight text-primary dark:text-white">
                                    {adv.name}
                                  </h4>
                                  {/* Progress Rolls Up */}
                                  <span className="font-mono text-xs text-primary/70 dark:text-white/70 block font-semibold">
                                    {clearedCount} of {totalCount} encounters
                                    cleared
                                  </span>
                                </div>
                              </div>

                              {/* Status Badge */}
                              {(() => {
                                const status = (
                                  adv.statusBadge || 'active'
                                ).toLowerCase();
                                let colorClasses =
                                  'border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60';
                                if (
                                  status === 'pending' ||
                                  status === 'inactive' ||
                                  status === 'queued'
                                ) {
                                  colorClasses =
                                    'border-amber-600 dark:border-amber-400 text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60';
                                } else if (status === 'locked') {
                                  colorClasses =
                                    'border-rose-600 dark:border-rose-400 text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60';
                                } else if (
                                  status === 'cleared' ||
                                  status === 'completed'
                                ) {
                                  colorClasses =
                                    'border-primary/40 dark:border-white/40 text-primary/70 dark:text-white/70 bg-primary/10 dark:bg-white/10';
                                }
                                return (
                                  <span
                                    className={`border px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider shrink-0 ${colorClasses}`}
                                  >
                                    {adv.statusBadge || 'active'}
                                  </span>
                                );
                              })()}
                            </div>

                            {/* =========================================================================
                            LEVEL 4: ENCOUNTERS (compressed to single rows)
                           ========================================================================= */}
                            <div className="flex flex-col gap-1.5 my-1">
                              {encounters.map((enc) => {
                                const isCleared = enc.status === 'cleared';
                                const isInProgress =
                                  enc.status === 'in progress';

                                if (editingEncId === enc.id) {
                                  return (
                                    <div
                                      key={enc.id}
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-2 border-2 border-primary dark:border-white bg-white dark:bg-zinc-900 flex flex-col gap-2 font-mono text-xs"
                                    >
                                      <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                                        Edit Encounter:
                                      </div>
                                      <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                          type="text"
                                          value={editEncName}
                                          onChange={(e) =>
                                            setEditEncName(e.target.value)
                                          }
                                          placeholder="Encounter name..."
                                          className="flex-1 bg-background-light dark:bg-background-dark border border-primary dark:border-white p-1 text-xs font-mono text-primary dark:text-white focus:outline-none"
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter')
                                              handleSaveEncounter(
                                                camp.id,
                                                adv.id,
                                                enc.id,
                                              );
                                          }}
                                        />
                                        <select
                                          value={editEncStatus}
                                          onChange={(e) =>
                                            setEditEncStatus(e.target.value)
                                          }
                                          className="bg-background-light dark:bg-background-dark border border-primary dark:border-white p-1 text-xs font-mono text-primary dark:text-white focus:outline-none uppercase"
                                        >
                                          <option value="in progress">
                                            In Progress
                                          </option>
                                          <option value="cleared">
                                            Cleared
                                          </option>
                                          <option value="pending">
                                            Pending
                                          </option>
                                        </select>
                                      </div>
                                      <div className="flex gap-2 text-[10px]">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleSaveEncounter(
                                              camp.id,
                                              adv.id,
                                              enc.id,
                                            )
                                          }
                                          className="flex-1 py-1 bg-primary text-background-light dark:bg-white dark:text-background-dark font-bold uppercase hover:opacity-90 cursor-pointer"
                                        >
                                          Save Encounter
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setEditingEncId(null)}
                                          className="px-3 py-1 border border-primary dark:border-white font-bold uppercase hover:bg-primary/10 dark:hover:bg-white/10 cursor-pointer"
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
                                    className={`flex items-center justify-between p-2 px-3 border transition-all rounded-none font-mono text-xs font-semibold ${
                                      isCleared
                                        ? 'bg-primary/5 dark:bg-white/5 border-primary/20 dark:border-white/20 text-primary/50 dark:text-white/50 line-through'
                                        : isInProgress
                                          ? 'bg-sky-100/80 dark:bg-sky-950/50 border-sky-600 dark:border-sky-400 text-primary dark:text-white'
                                          : 'bg-background-light dark:bg-background-dark border border-primary/30 dark:border-white/30 text-primary dark:text-white'
                                    } hover:border-primary dark:hover:border-white`}
                                  >
                                    <div
                                      onClick={() =>
                                        handleToggleEnc(camp.id, adv.id, enc.id)
                                      }
                                      className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 pr-2"
                                      title="Click to toggle encounter status"
                                    >
                                      <Swords className="w-3.5 h-3.5 shrink-0 opacity-80" />
                                      <span className="truncate">
                                        {enc.name}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingEncId(enc.id);
                                          setEditEncName(enc.name);
                                          setEditEncStatus(enc.status);
                                        }}
                                        className="px-2 py-0.5 border border-primary/30 dark:border-white/30 hover:border-primary dark:hover:border-white bg-background-light dark:bg-background-dark text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white cursor-pointer no-underline"
                                        title="Edit encounter details"
                                      >
                                        <Edit3 className="w-2.5 h-2.5" />
                                        <span>Edit encounter</span>
                                      </button>

                                      {/* Encounters Status Pill */}
                                      {isCleared ? (
                                        <span className="border border-primary/30 dark:border-white/30 text-primary/50 dark:text-white/50 bg-primary/5 dark:bg-white/5 text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider shrink-0 no-underline">
                                          cleared
                                        </span>
                                      ) : isInProgress ? (
                                        <span className="border border-sky-600 dark:border-sky-400 text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider shrink-0 no-underline">
                                          in progress
                                        </span>
                                      ) : (
                                        <span className="border border-primary/40 dark:border-white/40 text-primary/70 dark:text-white/70 text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider shrink-0 no-underline">
                                          {enc.status}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Buttons: Resume Adventure & Edit Adventure */}
                            {editingAdvId === adv.id ? (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="p-3 border-2 border-primary dark:border-white bg-white dark:bg-zinc-900 flex flex-col gap-2 font-mono text-xs mt-1"
                              >
                                <span className="font-bold uppercase text-[10px] tracking-wider text-sky-600 dark:text-sky-400">
                                  Edit Adventure Parameters:
                                </span>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <input
                                    type="text"
                                    value={editAdvName}
                                    onChange={(e) =>
                                      setEditAdvName(e.target.value)
                                    }
                                    placeholder="Adventure name..."
                                    className="flex-1 bg-background-light dark:bg-background-dark border border-primary dark:border-white p-1.5 text-xs font-mono text-primary dark:text-white focus:outline-none"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter')
                                        handleSaveAdventure(camp.id, adv.id);
                                    }}
                                  />
                                  <select
                                    value={editAdvStatus}
                                    onChange={(e) =>
                                      setEditAdvStatus(e.target.value)
                                    }
                                    className="bg-background-light dark:bg-background-dark border border-primary dark:border-white p-1.5 text-xs font-mono text-primary dark:text-white focus:outline-none uppercase"
                                  >
                                    <option value="active">Active</option>
                                    <option value="cleared">Cleared</option>
                                    <option value="in progress">
                                      In Progress
                                    </option>
                                    <option value="pending">Pending</option>
                                  </select>
                                </div>
                                <div className="flex gap-2 text-[10px]">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSaveAdventure(camp.id, adv.id)
                                    }
                                    className="flex-1 py-1.5 bg-primary text-background-light dark:bg-white dark:text-background-dark font-bold uppercase hover:opacity-90 transition-opacity cursor-pointer"
                                  >
                                    Save Adventure
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingAdvId(null)}
                                    className="px-3 py-1.5 border border-primary dark:border-white font-bold uppercase hover:bg-primary/10 dark:hover:bg-white/10 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <motion.button
                                type="button"
                                whileTap={{
                                  x: [-6, 6, -4, 4, -2, 2, 0],
                                  scale: 0.97,
                                }}
                                transition={{ duration: 0.25 }}
                                onClick={() => {
                                  if (onResumeSession) onResumeSession(camp);
                                  if (onNotification)
                                    onNotification(
                                      `Resuming adventure: "${adv.name}"`,
                                    );
                                }}
                                className="w-full py-2 px-3 border border-primary dark:border-white bg-background-light dark:bg-background-dark font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors cursor-pointer mt-1"
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>Resume adventure</span>
                              </motion.button>
                            )}
                          </div>
                        );
                      })}

                      {/* Inline Add Adventure Form */}
                      {showAddForm[camp.id] ? (
                        <div className="p-3 border-2 border-dashed border-primary dark:border-white bg-background-light dark:bg-background-dark rounded-none flex flex-col gap-2 font-mono text-xs">
                          <span className="font-bold uppercase text-[10px] tracking-wider text-sky-600 dark:text-sky-400">
                            New Adventure Parameters:
                          </span>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              value={newAdvInput[camp.id] || ''}
                              onChange={(e) =>
                                setNewAdvInput((prev) => ({
                                  ...prev,
                                  [camp.id]: e.target.value,
                                }))
                              }
                              placeholder="e.g. Sepulcher of the Forgotten"
                              className="flex-1 bg-white dark:bg-background-dark border border-primary dark:border-white px-2 py-1 text-xs font-mono text-primary dark:text-white focus:outline-none"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter')
                                  handleCreateAdventure(camp.id);
                              }}
                            />
                            <select
                              value={newAdvStatus[camp.id] || 'pending'}
                              onChange={(e) =>
                                setNewAdvStatus((prev) => ({
                                  ...prev,
                                  [camp.id]: e.target.value,
                                }))
                              }
                              className="bg-white dark:bg-background-dark border border-primary dark:border-white px-2 py-1 text-xs font-mono text-primary dark:text-white focus:outline-none uppercase"
                            >
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="locked">Locked</option>
                              <option value="cleared">Cleared</option>
                            </select>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleCreateAdventure(camp.id)}
                                className="px-3 py-1 bg-primary text-background-light dark:bg-white dark:text-background-dark font-bold uppercase hover:opacity-90 transition-opacity cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setShowAddForm((prev) => ({
                                    ...prev,
                                    [camp.id]: false,
                                  }))
                                }
                                className="px-2 py-1 border border-primary dark:border-white font-bold uppercase hover:bg-primary/10 dark:hover:bg-white/10 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                {/* Campaign Run Time Digital Counter */}
                <CampaignTimer initialSeconds={157} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
